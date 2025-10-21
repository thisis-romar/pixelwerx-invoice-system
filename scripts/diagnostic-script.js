// DIAGNOSTIC SCRIPT - Copy this to Apps Script and run it
// This will show you exactly what's in your Invoice sheet

function diagnosticCheckInvoiceSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Try to find the Invoice/Invoices sheet
  let sheet = ss.getSheetByName('Invoice') || ss.getSheetByName('Invoices');
  
  if (!sheet) {
    Logger.log('ERROR: Cannot find Invoice or Invoices sheet!');
    const allSheets = ss.getSheets().map(s => s.getName()).join(', ');
    Logger.log('Available sheets: ' + allSheets);
    return;
  }
  
  Logger.log('✓ Found sheet: ' + sheet.getName());
  Logger.log('');
  
  // Get the header row (row 1)
  const lastCol = sheet.getLastColumn();
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  const headers = headerRange.getValues()[0];
  
  Logger.log('=== HEADER ROW (Row 1) ===');
  headers.forEach((header, index) => {
    const colLetter = String.fromCharCode(65 + index); // A, B, C, etc.
    const cleaned = String(header || '').trim();
    Logger.log(`Column ${colLetter}: "${header}" (cleaned: "${cleaned}")`);
  });
  Logger.log('');
  
  // Get first 3 data rows
  const dataRange = sheet.getRange(2, 1, Math.min(3, sheet.getLastRow() - 1), lastCol);
  const dataRows = dataRange.getValues();
  
  Logger.log('=== FIRST 3 DATA ROWS ===');
  dataRows.forEach((row, rowIndex) => {
    Logger.log(`Row ${rowIndex + 2}:`);
    row.forEach((cell, colIndex) => {
      const colLetter = String.fromCharCode(65 + colIndex);
      const header = headers[colIndex];
      Logger.log(`  ${colLetter} (${header}): "${cell}"`);
    });
    Logger.log('');
  });
  
  // Test the rowsByHeader function
  Logger.log('=== TESTING rowsByHeader ===');
  try {
    const values = sheet.getRange(1, 1, sheet.getLastRow(), lastCol).getValues();
    let hi = 0;
    while (hi < values.length && values[hi].every(v => String(v ?? '').trim() === '')) hi++;
    const header = (values[hi] || []).map(h => String(h ?? '').trim());
    const idx = Object.fromEntries(header.map((h,i)=>[h,i]));
    
    Logger.log('Header index map:');
    Logger.log(JSON.stringify(idx, null, 2));
    Logger.log('');
    
    const out = [];
    for (let r = hi+1; r < values.length && out.length < 3; r++) {
      const row = values[r];
      if (!row || row.every(v => String(v ?? '').trim()==='')) continue;
      const obj = {};
      for (const [k,i] of Object.entries(idx)) obj[k] = row[i];
      out.push(obj);
    }
    
    Logger.log('Parsed objects:');
    out.forEach((obj, i) => {
      Logger.log(`Row ${i + 2}:`);
      Logger.log(JSON.stringify(obj, null, 2));
    });
    
  } catch (e) {
    Logger.log('ERROR in rowsByHeader: ' + e.message);
    Logger.log(e.stack);
  }
  
  Logger.log('');
  Logger.log('=== DIAGNOSTIC COMPLETE ===');
  Logger.log('Check the Execution log above for results.');
}
