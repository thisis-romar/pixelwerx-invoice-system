/**** CONFIG (defaults; you can override tab names in Settings — see below) ****/
const TABS = {
  invoices: 'Invoices',     // will also accept: Invoice  (or an override in Settings: Tab.Invoices)
  items:    'LineItems',    // will also accept: Line Items / Lineitems / Lineltems (common typo)
  clients:  'Clients',      // will also accept: Client
  settings: 'Settings'      // used for optional overrides + company/tax config
};
const LOG_SHEET = '_Logs';  // logs go here (auto-created)

/**** LOGGING (console + sheet) ****/
function ensureLogSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(LOG_SHEET);
  if (!sh) {
    sh = ss.insertSheet(LOG_SHEET);
    sh.getRange(1,1,1,6).setValues([['Time','Level','Scope','Message','DataJSON','Ms']]);
    sh.setFrozenRows(1);
  }
  return sh;
}
function writeLog_(level, scope, message, data, ms) {
  try {
    const tag = `[${level}] ${scope}`;
    if (level === 'ERROR') console.error(tag, message, data || {});
    else if (level === 'WARN') console.warn(tag, message, data || {});
    else console.log(tag, message, data || {});
    ensureLogSheet_().appendRow([
      new Date(),
      level,
      scope,
      String(message || ''),
      data ? JSON.stringify(data) : '',
      typeof ms === 'number' ? ms : ''
    ]);
  } catch (e) { /* best-effort */ }
}
const log = {
  info : (s,m,d,ms)=>writeLog_('INFO', s, m, d, ms),
  warn : (s,m,d,ms)=>writeLog_('WARN', s, m, d, ms),
  error: (s,m,d,ms)=>writeLog_('ERROR',s, m, d, ms),
};
const withLog = (scope, fn) => (...args) => {
  const t0 = Date.now();
  log.info(scope, 'start', { args });
  try {
    const out = fn(...args);
    log.info(scope, 'ok',   { result: safeStr_(out) }, Date.now()-t0);
    return out;
  } catch (e) {
    log.error(scope,'fail', { err:String(e), stack:e?.stack }, Date.now()-t0);
    throw e;
  }
};
const safeStr_ = x => { try { return JSON.stringify(x)?.slice(0,800); } catch { return String(x); } };

/**** SHEET HELPERS (table/filter safe + SMART TAB RESOLUTION) ****/
const SS = () => SpreadsheetApp.getActiveSpreadsheet();
const S  = name => SS().getSheetByName(name);

// read whole used rectangle (works with filters/tables)
function getAllValues_(sheet) {
  const r = sheet.getLastRow(), c = sheet.getLastColumn();
  if (!r || !c) return [];
  return sheet.getRange(1,1,r,c).getValues();
}
function rowsByHeader(sheet) {
  if (!sheet) throw new Error('rowsByHeader: sheet is null');
  const values = getAllValues_(sheet);
  if (!values.length) return [];
  let hi = 0;
  while (hi < values.length && values[hi].every(v => String(v ?? '').trim() === '')) hi++;
  const header = (values[hi] || []).map(h => String(h ?? '').trim());
  const idx = Object.fromEntries(header.map((h,i)=>[h,i]));
  const out = [];
  for (let r = hi+1; r < values.length; r++) {
    const row = values[r];
    if (!row || row.every(v => String(v ?? '').trim()==='')) continue;
    const obj = {};
    for (const [k,i] of Object.entries(idx)) obj[k] = row[i];
    out.push(obj);
  }
  return out;
}
function headerMeta(sheet) {
  const values = getAllValues_(sheet);
  let hi = 0;
  while (hi < values.length && values[hi].every(v => String(v ?? '').trim() === '')) hi++;
  const header = (values[hi] || []).map(h => String(h ?? '').trim());
  const idx = Object.fromEntries(header.map((h,i)=>[h,i]));
  return { values, hi, header, idx };
}
function ensureSheet(name, headers) {
  let sh = S(name);
  if (!sh) sh = SS().insertSheet(name);
  if (headers?.length) {
    const want = headers.map(x => String(x ?? '').trim());
    const have = (sh.getRange(1,1,1,want.length).getValues()[0] || []).map(x => String(x ?? '').trim());
    if (have.join('␟') !== want.join('␟')) {
      sh.clear();
      sh.getRange(1,1,1,want.length).setValues([want]);
      sh.setFrozenRows(1);
    }
  }
  return sh;
}

/** Allow tab overrides from Settings:
 *  Settings keys (optional):
 *    - Tab.Invoices
 *    - Tab.LineItems
 *    - Tab.Clients
 */
function readTabOverrides_() {
  try {
    const sh = smartSheet_([TABS.settings], ['Key','Value']);
    if (!sh) return {};
    const kv = Object.fromEntries(rowsByHeader(sh).map(r=>[r.Key, r.Value]));
    return {
      invoices: kv['Tab.Invoices'] || null,
      items:    kv['Tab.LineItems'] || null,
      clients:  kv['Tab.Clients'] || null
    };
  } catch { return {}; }
}

// Smarter sheet finder: tries overrides → exact → aliases → fuzzy contains → header signature
function smartSheet_(namesOrAliases, headerMustContain) {
  const ss = SS();
  const all = ss.getSheets();
  const candidates = (Array.isArray(namesOrAliases) ? namesOrAliases : [namesOrAliases])
    .filter(Boolean).map(s => String(s).trim()).filter(Boolean);

  // exact match
  let sh = all.find(s => candidates.includes(s.getName()));
  if (sh) return sh;

  // case-insensitive exact
  const want = candidates.map(s => s.toLowerCase());
  sh = all.find(s => want.includes(s.getName().toLowerCase()));
  if (sh) return sh;

  // name contains any candidate token (prefer one that contains the word)
  sh = all.find(s => want.some(w => s.getName().toLowerCase().includes(w)));
  if (sh && headerSignatureOk_(sh, headerMustContain)) return sh;

  // fallback: any sheet that has the header signature
  for (const s of all) {
    if (headerSignatureOk_(s, headerMustContain)) return s;
  }
  return null;
}
function headerSignatureOk_(sheet, headerMustContain) {
  if (!headerMustContain?.length) return true;
  const c = sheet.getLastColumn();
  if (!c) return false;
  const header = sheet.getRange(1,1,1,c).getValues()[0].map(v => String(v ?? '').trim());
  return headerMustContain.every(h => header.includes(h));
}

// Public getters that log what was picked, and try common aliases:
function getInvoicesSheet_() {
  const ov = readTabOverrides_();
  const aliases = [
    ov.invoices, TABS.invoices, 'Invoice', 'Invoices', 'invoice', 'invoices'
  ].filter(Boolean);
  const sh = smartSheet_(aliases, ['InvoiceId','InvoiceNo']);
  if (!sh) throw new Error(`Cannot find Invoices tab (tried: ${aliases.join(', ')}).`);
  return sh;
}
function getItemsSheet_() {
  const ov = readTabOverrides_();
  const aliases = [
    ov.items, TABS.items, 'Line Items', 'Lineitems', 'Lineltems', 'Items'
  ].filter(Boolean);
  const sh = smartSheet_(aliases, ['InvoiceId','LineNo']);
  if (!sh) throw new Error(`Cannot find LineItems tab (tried: ${aliases.join(', ')}).`);
  return sh;
}
function getClientsSheet_() {
  const ov = readTabOverrides_();
  const aliases = [ov.clients, TABS.clients, 'Client', 'Clients'].filter(Boolean);
  const sh = smartSheet_(aliases, ['ClientId','ClientName']);
  if (!sh) throw new Error(`Cannot find Clients tab (tried: ${aliases.join(', ')}).`);
  return sh;
}
function getSettingsSheet_() {
  const sh = smartSheet_([TABS.settings], ['Key','Value']);
  if (!sh) throw new Error(`Cannot find Settings tab.`);
  return sh;
}

/**** SETTINGS ****/
function getSettings() {
  const sh = getSettingsSheet_();
  const rows = rowsByHeader(sh);
  const kv = Object.fromEntries(rows.map(r => [r[Object.keys(r)[0]], r[Object.keys(r)[1]]]));
  let taxProfiles = {};
  try { taxProfiles = JSON.parse(kv.TaxProfiles || '{}'); }
  catch { log.warn('getSettings', 'TaxProfiles invalid JSON; default {}'); }
  const out = {
    outputFolderId: kv.OutputFolderId || null,
    currency: kv.DefaultCurrency || 'CAD',
    seller: {
      name: kv.CompanyName || 'PixelWerx Inc.',
      email: kv.CompanyEmail || 'info@pixelwerx.ca',
      phone: kv.CompanyPhone || '(416) 555-7890',
      address: kv.CompanyAddress || '',
      hstNumber: kv.HSTNumber || '123456789RT0001',
      logoUrl: kv.LogoUrl || 'https://raw.githubusercontent.com/thisis-romar/pixelwerx-video-walls/main/logo.png'
    },
    taxProfiles
  };
  log.info('getSettings', 'ok', out);
  return out;
}

/**** SMALL HELPERS ****/
function toMoney(n, c) {
  return new Intl.NumberFormat('en-CA', { style:'currency', currency:c })
    .format(+n || 0).replace(c,'').trim();
}
function normalizeKey(s) {
  let t = String(s ?? '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  const m = t.match(/^(INV)([A-Z0-9]+)$/);
  return m ? m[1] + m[2].replace(/O/g,'0') : t;
}
function formatDate(val) {
  if (!val) return '';
  if (val instanceof Date) return val.toLocaleDateString('en-CA');
  if (typeof val === 'string') return val;
  return String(val);
}
function formatDateTime(val) {
  if (!val) return '';
  if (val instanceof Date) return val.toLocaleString('en-CA', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit', hour12: false 
  });
  if (typeof val === 'string') return val;
  return String(val);
}
function safeParseJSON(val, defaultValue) {
  if (!val) return defaultValue;
  if (typeof val !== 'string') return defaultValue;
  try {
    return JSON.parse(val);
  } catch (e) {
    log.warn('safeParseJSON', 'parse failed', { val, err: String(e) });
    return defaultValue;
  }
}

/**** DATA MAPPING FOR TEMPLATE ****/
function buildTemplateData(invRow) {
  const sets = getSettings();
  const currency = invRow.Currency || sets.currency;

  const items = rowsByHeader(getItemsSheet_())
    .filter(x => String(x.InvoiceId) === String(invRow.InvoiceId))
    .sort((a,b)=> Number(a.LineNo||0) - Number(b.LineNo||0));

  const client = rowsByHeader(getClientsSheet_())
    .find(c => String(c.ClientId) === String(invRow.ClientId)) || {};

  const subtotal = items.reduce((s,it)=> s + (Number(it.Qty||0) * Number(it.Rate||0)), 0);
  const taxableBase = items.reduce((s,it)=> {
    const t = (String(it.Taxable).toLowerCase()==='true' || it.Taxable===true);
    return s + (t ? Number(it.Qty||0)*Number(it.Rate||0) : 0);
  }, 0);
  const rate = (sets.taxProfiles[invRow.TaxProfile] ?? 0);
  const tax = taxableBase * rate;
  const total = subtotal + tax;

  const fmt = n => `${currency} ${toMoney(n,currency)}`;

  const d = {
    invoiceNo: invRow.InvoiceNo || `PW-${new Date().getFullYear()}-${String(invRow.InvoiceId).padStart(4,'0')}`,
    issueDate: formatDate(invRow.InvoiceDate) || formatDate(new Date()),
    dueText: invRow.DueText && typeof invRow.DueText === 'string' 
               ? invRow.DueText 
               : 'Upon Receipt',
    currency,
    seller: { ...sets.seller, addressHtml: (sets.seller.address||'').replace(/\n/g,'<br>') },
    client: {
      legalName: client.ClientName || '',
      attention: client.Attention || client.ClientName || '',
      email: client.Email || '',
      phone: client.Phone || '',
      addressHtml: [client.BillingAddress,client.City,client.ProvinceState,client.PostalZip,client.Country]
        .filter(Boolean).join('<br>')
    },
    event: {
      venue: invRow.Venue || '',
      location: invRow.Location || '',
      loadIn: formatDateTime(invRow.LoadIn),
      start: formatDate(invRow.EventDate),
      loadOut: formatDateTime(invRow.LoadOut),
      durationText: invRow.DurationDays ? `${invRow.DurationDays} Day${Number(invRow.DurationDays)==1?'':'s'}` : ''
    },
    items: items.map(it => ({
      title: it.Title,
      description: it.Description,
      qty: Number(it.Qty || 0),
      rateFormatted: fmt(it.Rate),
      amountFormatted: fmt(Number(it.Qty||0) * Number(it.Rate||0)),
      badges: (it.Badges || '').split(',').map(s => s.trim()).filter(Boolean)
    })),
    subtotalFormatted: fmt(subtotal),
    taxFormatted: fmt(tax),
    totalFormatted: fmt(total),
    taxLabel: invRow.TaxProfile ? `${invRow.TaxProfile} (${Math.round(rate*100)}%)` : 'Tax',
    terms: safeParseJSON(invRow.TermsJSON, [
      '50% deposit due at booking; balance due 48 hours before event.',
      '≥14 days: 75% refund; <14 days: non-refundable.',
      'Client provides 30A dedicated power; venue union may be required.',
      'Content due 72 hours prior in MP4/MOV/ProRes; client warrants rights to use.',
      'Damage/loss caused by client parties is billable.',
      'Force majeure and unsafe weather may delay/limit service.',
      'Interest 2%/mo on overdue balances; $50 NSF/chargeback fee.',
      'Ontario law governs; good-faith resolution before escalation.'
    ]),
    paymentMethods: (invRow.PaymentMethodsCSV || 'E-Transfer,Credit Card,Corporate Check')
      .split(',').map(x => x.trim())
  };

  log.info('buildTemplateData', 'mapped', {
    invoiceId: invRow.InvoiceId, invoiceNo: d.invoiceNo,
    client: d.client?.legalName, totals: { subtotal, tax, total }
  });

  return { d, totals: { subtotal, tax, total } };
}

/**** CORE: HTML → PDF → DRIVE (optional email) ****/
const generateInvoicePdfById = withLog('generateInvoicePdfById', (key, email=false) => {
  const invSh = getInvoicesSheet_();
  const itemsName   = getItemsSheet_().getName();
  const clientsName = getClientsSheet_().getName();
  const settingsNm  = getSettingsSheet_().getName();
  log.info('generateInvoicePdfById', 'sheets', {
    invoicesTab: invSh.getName(), itemsTab: itemsName, clientsTab: clientsName, settingsTab: settingsNm
  });

  const norm = normalizeKey(key);
  const rows = rowsByHeader(invSh);
  log.info('generateInvoicePdfById', 'lookup', { rawKey: key, normKey: norm, rows: rows.length });

  const inv = rows.find(r => {
    const id = normalizeKey(r.InvoiceId);
    const no = normalizeKey(r.InvoiceNo || '');
    return id === norm || no === norm;
  });
  if (!inv) throw new Error('InvoiceId not found: ' + key);

  const { d, totals } = buildTemplateData(inv);

  const t = HtmlService.createTemplateFromFile('invoice');
  t.d = d;
  const output  = t.evaluate().setTitle('Invoice');
  const pdfBlob = output.getBlob().setName(`Invoice_${d.invoiceNo}.pdf`).getAs('application/pdf');

  const sets   = getSettings();
  const folder = sets.outputFolderId ? DriveApp.getFolderById(sets.outputFolderId) : DriveApp.getRootFolder();
  const file   = folder.createFile(pdfBlob);
  log.info('generateInvoicePdfById', 'driveCreate', { fileId: file.getId(), folderId: sets.outputFolderId || 'root' });

  if (email) {
    const client = rowsByHeader(getClientsSheet_()).find(c => String(c.ClientId) === String(inv.ClientId)) || {};
    if (client.Email) {
      GmailApp.sendEmail(client.Email, `Invoice ${d.invoiceNo}`, 'Please find your invoice attached.', {
        attachments: [file.getBlob()],
        name: sets.seller.name || 'Billing'
      });
      log.info('generateInvoicePdfById', 'emailSent', { to: client.Email });
    } else {
      log.warn('generateInvoicePdfById', 'emailSkipped', { reason: 'missing client.Email', clientId: inv.ClientId });
    }
  }

  writeBack(invSh, inv.InvoiceId, {
    InvoiceNo: d.invoiceNo, Subtotal: totals.subtotal, TaxAmount: totals.tax,
    Total: totals.total, Status: email ? 'Sent' : 'Generated'
  });

  return file.getId();
});

function writeBack(sh, invoiceId, obj) {
  const { values, hi, idx } = headerMeta(sh);
  for (let r = hi + 1; r < values.length; r++) {
    if (String(values[r][idx.InvoiceId]) === String(invoiceId)) {
      Object.entries(obj).forEach(([k,v]) => { if (k in idx) sh.getRange(r+1, idx[k]+1).setValue(v); });
      log.info('writeBack', 'updated', { row: r+1, invoiceId, fields: Object.keys(obj) });
      break;
    }
  }
}

/**** MENU ACTIONS ****/
const generateForActiveRow = withLog('generateForActiveRow', () => {
  const sh = getInvoicesSheet_();
  const { header, hi } = headerMeta(sh);
  const row = sh.getActiveRange().getRow();
  if (row <= hi + 1) throw new Error('Select a data row in the Invoices sheet.');
  const rec = Object.fromEntries(header.map((h,i)=>[h, sh.getRange(row, i+1).getValue()]));
  const id  = generateInvoicePdfById(rec.InvoiceId || rec.InvoiceNo, false);
  SpreadsheetApp.getUi().alert('PDF created. File ID: ' + id);
});

const generateAndEmailForActiveRow = withLog('generateAndEmailForActiveRow', () => {
  const sh = getInvoicesSheet_();
  const { header, hi } = headerMeta(sh);
  const row = sh.getActiveRange().getRow();
  if (row <= hi + 1) throw new Error('Select a data row in the Invoices sheet.');
  const rec = Object.fromEntries(header.map((h,i)=>[h, sh.getRange(row, i+1).getValue()]));
  const id  = generateInvoicePdfById(rec.InvoiceId || rec.InvoiceNo, true);
  SpreadsheetApp.getUi().alert('Emailed & saved. File ID: ' + id);
});

const promptGenerateById = withLog('promptGenerateById', () => {
  const ui = SpreadsheetApp.getUi();
  const res = ui.prompt('Generate Invoice', 'Enter InvoiceId or InvoiceNo:', ui.ButtonSet.OK_CANCEL);
  if (res.getSelectedButton() !== ui.Button.OK) return;
  const raw = (res.getResponseText() || '').trim();
  if (!raw) { ui.alert('No value entered.'); return; }
  try {
    const id = generateInvoicePdfById(raw, false);
    ui.alert('PDF created. File ID: ' + id);
  } catch (e) {
    log.error('promptGenerateById', 'generation failed', { raw, error: String(e) });
    const rows = rowsByHeader(getInvoicesSheet_());
    const sample = rows.slice(0, 20).map(r => `${r.InvoiceId} (${r.InvoiceNo||''})`).join('\n');
    ui.alert(`Error generating invoice "${raw}":\n\n${e.message}\n\nAvailable invoices:\n${sample}`);
    throw e;
  }
});

/**** MENU + INSTALL ****/
function onOpen(e) {
  ensureLogSheet_();
  try {
    log.info('onOpen', 'discovery', {
      invoices: getInvoicesSheet_().getName(),
      items:    getItemsSheet_().getName(),
      clients:  getClientsSheet_().getName(),
      settings: getSettingsSheet_().getName()
    });
  } catch (err) {
    log.warn('onOpen', 'discoveryFailed', { err: String(err) });
  }
  
  try {
    SpreadsheetApp.getUi()
      .createMenu('Invoices')
      .addItem('Generate PDF for selected row', 'generateForActiveRow')
      .addItem('Generate + Email for selected row', 'generateAndEmailForActiveRow')
      .addSeparator()
      .addItem('Generate by InvoiceId…', 'promptGenerateById')
      .addSeparator()
      .addItem('Open Logs sheet', 'openLogsSheet')
      .addItem('Setup workbook (create tabs)', 'setupWorkbook')
      .addToUi();
  } catch (e) {
    // UI not available in this context (e.g., running from Apps Script editor)
    Logger.log('onOpen: Menu creation skipped (no UI context available).');
  }
}
function onInstall(e) { onOpen(e); }
function openLogsSheet() { SpreadsheetApp.setActiveSheet(ensureLogSheet_()); }

/**** ONE-CLICK WORKBOOK SETUP ****/
function setupWorkbook() {
  ensureSheet(TABS.invoices, [
    'InvoiceId','InvoiceNo','ClientId','InvoiceDate','DueText','Currency','TaxProfile',
    'Venue','Location','LoadIn','EventDate','LoadOut','DurationDays','TermsJSON',
    'PaymentMethodsCSV','Status','Subtotal','TaxAmount','Total'
  ]);
  ensureSheet(TABS.items,   ['InvoiceId','LineNo','Title','Description','Qty','Rate','Taxable','Badges']);
  ensureSheet(TABS.clients, ['ClientId','ClientName','Attention','Email','Phone','BillingAddress','City','ProvinceState','PostalZip','Country']);

  const sh = ensureSheet(TABS.settings, ['Key','Value']);
  const defaults = new Map([
    ['CompanyName','PixelWerx Inc.'],
    ['CompanyEmail','info@pixelwerx.ca'],
    ['CompanyPhone','(416) 555-7890'],
    ['CompanyAddress','123 King St W Suite 400\nToronto ON M5H 3T9'],
    ['HSTNumber','123456789RT0001'],
    ['LogoUrl','https://raw.githubusercontent.com/thisis-romar/pixelwerx-video-walls/main/logo.png'],
    ['DefaultCurrency','CAD'],
    ['TaxProfiles','{"HST_ON":0.13,"NO_TAX":0}'],
    ['OutputFolderId',''],
    // Optional explicit tab overrides (use these if your tab names are different)
    ['Tab.Invoices',''],
    ['Tab.LineItems',''],
    ['Tab.Clients','']
  ]);
  const existing = rowsByHeader(sh).reduce((m,r)=> (m.set(r.Key, r.Value), m), new Map());
  const toWrite = [];
  defaults.forEach((v,k)=>{ if (!existing.has(k)) toWrite.push([k,v]); });
  if (toWrite.length) sh.getRange(sh.getLastRow()+1,1,toWrite.length,2).setValues(toWrite);

  try {
    SpreadsheetApp.getUi().alert('Workbook ready.\nAdd data to the tabs and use the Invoices menu.');
  } catch (e) {
    // UI not available in this context (e.g., triggered by onOpen)
    Logger.log('setupWorkbook: Complete. Alert skipped (no UI context available).');
  }
}

/**** QUICK DIAGNOSTIC you can run from Run menu ****/
function diagnoseLookup() {
  const invSh = getInvoicesSheet_();
  const rows  = rowsByHeader(invSh);
  log.info('diagnoseLookup', 'summary', {
    invoicesTab: invSh.getName(),
    rowCount: rows.length,
    first3: rows.slice(0,3).map(r => ({ InvoiceId:r.InvoiceId, InvoiceNo:r.InvoiceNo }))
  });
}
