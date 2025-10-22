/**
 * PixelWerx Invoice Generator
 * Google Apps Script for automated invoice PDF generation
 * 
 * Template: Invoice-AppScript-Template.html
 * Uses bracket placeholder replacement pattern
 * 
 * @version 1.0.0
 * @author PixelWerx Events Inc.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  INVOICE_SHEET: 'Invoice_Data',
  LINE_ITEMS_SHEET: 'Line_Items',
  OUTPUT_FOLDER_NAME: 'PixelWerx Invoices',
  TEMPLATE_FILE: 'Invoice-AppScript-Template.html',
  DATE_FORMAT: 'MMMM d, yyyy',
  CURRENCY_FORMAT: '$#,##0.00'
};

// ============================================================================
// MENU FUNCTIONS
// ============================================================================

/**
 * Creates custom menu when spreadsheet opens
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('PixelWerx')
    .addItem('Generate Invoice PDF', 'showInvoiceDialog')
    .addSeparator()
    .addItem('Setup Output Folder', 'setupOutputFolder')
    .addItem('Test Template', 'testTemplate')
    .addToUi();
}

/**
 * Shows dialog to select invoice number
 */
function showInvoiceDialog() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Generate Invoice PDF',
    'Enter Invoice Number (e.g., PX-2025-003):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (result.getSelectedButton() === ui.Button.OK) {
    const invoiceNumber = result.getResponseText().trim();
    if (invoiceNumber) {
      try {
        const pdfUrl = generateInvoicePDF(invoiceNumber);
        ui.alert(
          'Success!',
          'Invoice PDF generated successfully!\n\nFile: ' + invoiceNumber + '.pdf\n\nOpen PDF: ' + pdfUrl,
          ui.ButtonSet.OK
        );
      } catch (error) {
        ui.alert('Error', 'Failed to generate invoice:\n\n' + error.message, ui.ButtonSet.OK);
      }
    } else {
      ui.alert('Error', 'Please enter a valid invoice number.', ui.ButtonSet.OK);
    }
  }
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

/**
 * Main function to generate invoice PDF
 * @param {string} invoiceNumber - Invoice number to generate
 * @returns {string} URL of generated PDF
 */
function generateInvoicePDF(invoiceNumber) {
  Logger.log('Starting invoice generation for: ' + invoiceNumber);
  
  // 1. Load invoice data
  const invoiceData = getInvoiceData(invoiceNumber);
  if (!invoiceData) {
    throw new Error('Invoice not found: ' + invoiceNumber);
  }
  
  // 2. Load line items
  const lineItems = getLineItems(invoiceNumber);
  if (lineItems.length === 0) {
    throw new Error('No line items found for invoice: ' + invoiceNumber);
  }
  
  // 3. Calculate totals
  const totals = calculateTotals(lineItems, invoiceData.discount, invoiceData.hstRate);
  
  // 4. Load template
  const template = loadTemplate();
  
  // 5. Replace all placeholders
  let html = replacePlaceholders(template, invoiceData, lineItems, totals);
  
  // 6. Create PDF
  const pdfUrl = createPDF(html, invoiceNumber);
  
  Logger.log('Invoice generation complete: ' + pdfUrl);
  return pdfUrl;
}

// ============================================================================
// DATA RETRIEVAL FUNCTIONS
// ============================================================================

/**
 * Retrieves invoice data from Invoice_Data sheet
 * @param {string} invoiceNumber - Invoice number to retrieve
 * @returns {Object} Invoice data object
 */
function getInvoiceData(invoiceNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.INVOICE_SHEET);
  
  if (!sheet) {
    throw new Error('Sheet not found: ' + CONFIG.INVOICE_SHEET);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  // Find column indices
  const colMap = {};
  headers.forEach((header, index) => {
    colMap[header] = index;
  });
  
  // Find invoice row
  for (let i = 1; i < data.length; i++) {
    if (data[i][colMap['Invoice Number']] === invoiceNumber) {
      return {
        invoiceNumber: data[i][colMap['Invoice Number']],
        invoiceDate: formatDate(data[i][colMap['Invoice Date']]),
        invoiceDue: formatDate(data[i][colMap['Invoice Due Date']]),
        fromCompany: data[i][colMap['From Company']],
        fromAddress: data[i][colMap['From Address']],
        fromEmail: data[i][colMap['From Email']],
        fromPhone: data[i][colMap['From Phone']],
        fromHst: data[i][colMap['From HST Number']],
        billtoCompany: data[i][colMap['Bill To Company']],
        billtoAttn: data[i][colMap['Bill To Attn']],
        billtoAddress: data[i][colMap['Bill To Address']],
        billtoEmail: data[i][colMap['Bill To Email']],
        billtoPhone: data[i][colMap['Bill To Phone']],
        eventVenue: data[i][colMap['Event Venue']],
        eventLocation: data[i][colMap['Event Location']],
        eventLoadin: data[i][colMap['Event Load In']],
        eventDate: data[i][colMap['Event Date']],
        eventLoadout: data[i][colMap['Event Load Out']],
        eventRentalduration: data[i][colMap['Event Rental Duration']],
        discount: parseFloat(data[i][colMap['Discount']] || 0),
        hstRate: parseFloat(data[i][colMap['HST Rate']] || 13),
        termsPayment: data[i][colMap['Terms Payment']],
        termsCancellation: data[i][colMap['Terms Cancellation']],
        termsTechnical: data[i][colMap['Terms Technical']],
        pmEtransfer: data[i][colMap['Payment Method eTransfer']],
        pmCreditcard: data[i][colMap['Payment Method Credit Card']],
        pmCorporatecheck: data[i][colMap['Payment Method Corporate Check']],
        notes: data[i][colMap['Notes']] || ''
      };
    }
  }
  
  return null;
}

/**
 * Retrieves line items for invoice
 * @param {string} invoiceNumber - Invoice number
 * @returns {Array} Array of line item objects
 */
function getLineItems(invoiceNumber) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.LINE_ITEMS_SHEET);
  
  if (!sheet) {
    throw new Error('Sheet not found: ' + CONFIG.LINE_ITEMS_SHEET);
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  
  const colMap = {};
  headers.forEach((header, index) => {
    colMap[header] = index;
  });
  
  const lineItems = [];
  
  for (let i = 1; i < data.length; i++) {
    if (data[i][colMap['Invoice Number']] === invoiceNumber) {
      lineItems.push({
        lineNumber: data[i][colMap['Line Number']],
        description: data[i][colMap['Description']],
        details: data[i][colMap['Details']] || '',
        quantity: parseFloat(data[i][colMap['Quantity']]),
        rate: parseFloat(data[i][colMap['Rate']]),
        amount: parseFloat(data[i][colMap['Amount']])
      });
    }
  }
  
  // Sort by line number
  lineItems.sort((a, b) => a.lineNumber - b.lineNumber);
  
  return lineItems;
}

// ============================================================================
// TEMPLATE FUNCTIONS
// ============================================================================

/**
 * Loads HTML template file
 * @returns {string} Template HTML
 */
function loadTemplate() {
  try {
    const template = HtmlService.createTemplateFromFile(CONFIG.TEMPLATE_FILE);
    return template.getRawContent();
  } catch (error) {
    throw new Error('Template file not found: ' + CONFIG.TEMPLATE_FILE + '\n\nMake sure the HTML file is uploaded to this Apps Script project.');
  }
}

/**
 * Replaces all placeholders in template
 * @param {string} template - HTML template
 * @param {Object} invoiceData - Invoice data
 * @param {Array} lineItems - Line items array
 * @param {Object} totals - Calculated totals
 * @returns {string} HTML with replaced placeholders
 */
function replacePlaceholders(template, invoiceData, lineItems, totals) {
  let html = template;
  
  // Replace invoice data placeholders
  html = html.replace(/\[invoice-number\]/g, invoiceData.invoiceNumber);
  html = html.replace(/\[invoice-date\]/g, invoiceData.invoiceDate);
  html = html.replace(/\[invoice-due\]/g, invoiceData.invoiceDue);
  
  // Replace from placeholders
  html = html.replace(/\[from-company\]/g, invoiceData.fromCompany);
  html = html.replace(/\[from-address\]/g, invoiceData.fromAddress);
  html = html.replace(/\[from-email\]/g, invoiceData.fromEmail);
  html = html.replace(/\[from-phone\]/g, invoiceData.fromPhone);
  html = html.replace(/\[from-hst\]/g, invoiceData.fromHst);
  
  // Replace bill to placeholders
  html = html.replace(/\[billto-company\]/g, invoiceData.billtoCompany);
  html = html.replace(/\[billto-attn\]/g, invoiceData.billtoAttn);
  html = html.replace(/\[billto-address\]/g, invoiceData.billtoAddress);
  html = html.replace(/\[billto-email\]/g, invoiceData.billtoEmail);
  html = html.replace(/\[billto-phone\]/g, invoiceData.billtoPhone);
  
  // Replace event placeholders
  html = html.replace(/\[event-venue\]/g, invoiceData.eventVenue);
  html = html.replace(/\[event-location\]/g, invoiceData.eventLocation);
  html = html.replace(/\[event-loadin\]/g, invoiceData.eventLoadin);
  html = html.replace(/\[event-date\]/g, invoiceData.eventDate);
  html = html.replace(/\[event-loadout\]/g, invoiceData.eventLoadout);
  html = html.replace(/\[event-rentalduration\]/g, invoiceData.eventRentalduration);
  
  // Replace line items (12 lines, hide empty ones)
  for (let i = 1; i <= 12; i++) {
    const lineItem = lineItems.find(item => item.lineNumber === i);
    
    if (lineItem) {
      // Line has data - show it
      html = html.replace(new RegExp(`\\[line${i}-class\\]`, 'g'), '');
      html = html.replace(new RegExp(`\\[line${i}-desc\\]`, 'g'), lineItem.description);
      html = html.replace(new RegExp(`\\[line${i}-details\\]`, 'g'), lineItem.details);
      html = html.replace(new RegExp(`\\[line${i}-qty\\]`, 'g'), lineItem.quantity);
      html = html.replace(new RegExp(`\\[line${i}-rate\\]`, 'g'), formatCurrency(lineItem.rate));
      html = html.replace(new RegExp(`\\[line${i}-amount\\]`, 'g'), formatCurrency(lineItem.amount));
    } else {
      // Line is empty - hide row
      html = html.replace(new RegExp(`\\[line${i}-class\\]`, 'g'), 'empty-row');
      html = html.replace(new RegExp(`\\[line${i}-desc\\]`, 'g'), '');
      html = html.replace(new RegExp(`\\[line${i}-details\\]`, 'g'), '');
      html = html.replace(new RegExp(`\\[line${i}-qty\\]`, 'g'), '');
      html = html.replace(new RegExp(`\\[line${i}-rate\\]`, 'g'), '');
      html = html.replace(new RegExp(`\\[line${i}-amount\\]`, 'g'), '');
    }
  }
  
  // Replace totals
  html = html.replace(/\[invoice-subtotal\]/g, formatCurrency(totals.subtotal));
  html = html.replace(/\[invoice-discount\]/g, formatCurrency(totals.discount));
  html = html.replace(/\[invoice-hst-rate\]/g, totals.hstRate + '%');
  html = html.replace(/\[invoice-hst-amount\]/g, formatCurrency(totals.hstAmount));
  html = html.replace(/\[invoice-total\]/g, formatCurrency(totals.total));
  
  // Replace terms
  html = html.replace(/\[terms-payment\]/g, invoiceData.termsPayment);
  html = html.replace(/\[terms-cancellation\]/g, invoiceData.termsCancellation);
  html = html.replace(/\[terms-technical\]/g, invoiceData.termsTechnical);
  
  // Replace payment methods
  html = html.replace(/\[pm-etransfer\]/g, invoiceData.pmEtransfer);
  html = html.replace(/\[pm-creditcard\]/g, invoiceData.pmCreditcard);
  html = html.replace(/\[pm-corporatecheck\]/g, invoiceData.pmCorporatecheck);
  
  // Replace notes
  html = html.replace(/\[invoice-notes\]/g, invoiceData.notes);
  
  return html;
}

// ============================================================================
// CALCULATION FUNCTIONS
// ============================================================================

/**
 * Calculates invoice totals
 * @param {Array} lineItems - Line items array
 * @param {number} discount - Discount amount
 * @param {number} hstRate - HST rate percentage
 * @returns {Object} Totals object
 */
function calculateTotals(lineItems, discount, hstRate) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const afterDiscount = subtotal - discount;
  const hstAmount = afterDiscount * (hstRate / 100);
  const total = afterDiscount + hstAmount;
  
  return {
    subtotal: subtotal,
    discount: discount,
    hstRate: hstRate,
    hstAmount: hstAmount,
    total: total
  };
}

// ============================================================================
// PDF CREATION FUNCTION
// ============================================================================

/**
 * Creates PDF from HTML and saves to Drive
 * @param {string} html - HTML content
 * @param {string} invoiceNumber - Invoice number for filename
 * @returns {string} URL of created PDF
 */
function createPDF(html, invoiceNumber) {
  // Get or create output folder
  const folder = getOrCreateFolder(CONFIG.OUTPUT_FOLDER_NAME);
  
  // Create blob from HTML
  const blob = Utilities.newBlob(html, 'text/html', 'invoice.html');
  
  // Convert to PDF
  const pdf = blob.getAs('application/pdf');
  pdf.setName(invoiceNumber + '.pdf');
  
  // Save to Drive
  const file = folder.createFile(pdf);
  
  return file.getUrl();
}

/**
 * Gets or creates output folder in Drive
 * @param {string} folderName - Folder name
 * @returns {Folder} Drive folder object
 */
function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Formats date to readable string
 * @param {Date} date - Date object
 * @returns {string} Formatted date
 */
function formatDate(date) {
  if (!date) return '';
  return Utilities.formatDate(date, Session.getScriptTimeZone(), CONFIG.DATE_FORMAT);
}

/**
 * Formats number as currency
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount) {
  if (amount === 0) return '$0.00';
  if (!amount) return '';
  return '$' + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// ============================================================================
// SETUP FUNCTIONS
// ============================================================================

/**
 * Creates output folder and shows location
 */
function setupOutputFolder() {
  const folder = getOrCreateFolder(CONFIG.OUTPUT_FOLDER_NAME);
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    'Output Folder Setup Complete',
    'PDFs will be saved to:\n\n' + folder.getName() + '\n\nFolder ID: ' + folder.getId() + '\n\nOpen folder: ' + folder.getUrl(),
    ui.ButtonSet.OK
  );
}

/**
 * Tests template loading
 */
function testTemplate() {
  const ui = SpreadsheetApp.getUi();
  try {
    const template = loadTemplate();
    ui.alert(
      'Template Test Successful',
      'Template loaded successfully!\n\nTemplate size: ' + template.length + ' characters',
      ui.ButtonSet.OK
    );
  } catch (error) {
    ui.alert(
      'Template Test Failed',
      'Error loading template:\n\n' + error.message,
      ui.ButtonSet.OK
    );
  }
}
