# PixelWerx Invoice Generator - Apps Script Implementation

Complete Google Apps Script system for automated invoice PDF generation using bracket placeholder templates.

## 📋 Table of Contents
- [Overview](#overview)
- [Files Included](#files-included)
- [Installation](#installation)
- [Google Sheets Structure](#google-sheets-structure)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## Overview

This Apps Script implementation generates professional PDF invoices from Google Sheets data using a template-replacement pattern. The system reads invoice data from structured sheets, replaces bracket placeholders `[placeholder-name]` in the HTML template, and outputs formatted PDF files to Google Drive.

**Key Features:**
- ✅ Automated PDF generation from Google Sheets
- ✅ Template-based design (easy to customize)
- ✅ Support for up to 12 line items per invoice
- ✅ Dynamic calculations (subtotal, discount, HST, total)
- ✅ Custom menu integration in Google Sheets
- ✅ Organized PDF storage in Drive folders
- ✅ Professional card-style A4 invoice design

## Files Included

### 1. `Code.gs`
Main Apps Script file containing all business logic:
- `generateInvoicePDF(invoiceNumber)` - Main entry point
- `getInvoiceData(invoiceNumber)` - Reads invoice data from sheet
- `getLineItems(invoiceNumber)` - Reads line items from sheet
- `replacePlaceholders()` - Template replacement logic
- `calculateTotals()` - Financial calculations
- `createPDF()` - PDF generation and Drive storage
- `onOpen()` - Creates custom menu

### 2. `Invoice-AppScript-Template.html`
HTML template with bracket placeholders for:
- Invoice metadata (number, dates)
- From/Bill To information
- Event details
- 12 dynamic line items
- Financial totals
- Terms and payment methods

### 3. `appsscript.json`
Manifest file defining:
- OAuth scopes (Sheets and Drive access)
- Timezone (America/Toronto)
- Runtime version (V8)

## Installation

### Step 1: Create Google Sheet

1. Create new Google Sheet named "PixelWerx Invoices" (or your preferred name)
2. Create two sheets (tabs):
   - `Invoice_Data` (invoice header information)
   - `Line_Items` (line item details)

### Step 2: Set Up Sheet Structure

#### Invoice_Data Sheet
Create these columns (Row 1 headers):

| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | Invoice Number | Text | PX-2025-003 |
| B | Invoice Date | Date | 2025-01-15 |
| C | Invoice Due Date | Date | 2025-02-15 |
| D | From Company | Text | PixelWerx Events Inc. |
| E | From Address | Text | 123 Event Street, Toronto, ON M5V 2T6 |
| F | From Email | Email | billing@pixelwerx.com |
| G | From Phone | Text | (416) 555-0100 |
| H | From HST Number | Text | 123456789 RT0001 |
| I | Bill To Company | Text | Molson Canadian Amphitheatre |
| J | Bill To Attn | Text | John Smith, Event Manager |
| K | Bill To Address | Text | 909 Lake Shore Blvd W, Toronto, ON M6K 3L3 |
| L | Bill To Email | Email | events@amphitheatre.com |
| M | Bill To Phone | Text | (416) 555-0200 |
| N | Event Venue | Text | Budweiser Stage |
| O | Event Location | Text | 909 Lake Shore Blvd W, Toronto, ON |
| P | Event Load In | Text | July 19, 2025, 12:00 PM |
| Q | Event Date | Text | July 19, 2025, 7:00 PM |
| R | Event Load Out | Text | July 20, 2025, 2:00 AM |
| S | Event Rental Duration | Text | 2 days (July 19-20, 2025) |
| T | Discount | Number | 500.00 |
| U | HST Rate | Number | 13 |
| V | Terms Payment | Text | Payment due within 30 days of invoice date |
| W | Terms Cancellation | Text | 50% cancellation fee if cancelled within 7 days |
| X | Terms Technical | Text | Technical support included for event duration |
| Y | Payment Method eTransfer | Text | Interac e-Transfer |
| Z | Payment Method Credit Card | Text | Visa / Mastercard / Amex |
| AA | Payment Method Corporate Check | Text | Corporate Check (payable to PixelWerx Events Inc.) |
| AB | Notes | Text | Thank you for your business! |

#### Line_Items Sheet
Create these columns (Row 1 headers):

| Column | Header | Type | Example |
|--------|--------|------|---------|
| A | Invoice Number | Text | PX-2025-003 |
| B | Line Number | Number | 1 |
| C | Description | Text | PixelWerx LED Video Wall - 3 Box Configuration |
| D | Details | Text | High-brightness LED panels (9 × 4 configuration) |
| E | Quantity | Number | 1 |
| F | Rate | Number | 8500.00 |
| G | Amount | Number | 8500.00 |

**Note:** Each invoice can have multiple rows (up to 12 line items). Use Line Number 1-12 to control display order.

### Step 3: Install Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete the default `Code.gs` content
3. Create three files in the Apps Script project:

**File 1: Code.gs**
- Copy content from `Code.gs` file

**File 2: Invoice-AppScript-Template.html**
- Click **+** next to Files → **HTML**
- Name it `Invoice-AppScript-Template`
- Copy content from `Invoice-AppScript-Template.html` file

**File 3: appsscript.json**
- Click gear icon (⚙️) → **Show "appsscript.json" manifest file in editor**
- Copy content from `appsscript.json` file

4. Click **Save all** (💾)
5. Close Apps Script editor

### Step 4: Authorize Access

1. Refresh your Google Sheet (F5)
2. You should see a new menu: **PixelWerx**
3. Click **PixelWerx → Setup Output Folder**
4. Google will ask for permissions:
   - ✅ View and manage spreadsheets
   - ✅ View and manage files in Google Drive
5. Click **Allow**
6. A success message will show the output folder location

## Google Sheets Structure

### Sample Invoice Data Row

```
Invoice Number: PX-2025-003
Invoice Date: January 15, 2025
Invoice Due Date: February 15, 2025
From Company: PixelWerx Events Inc.
From Address: 123 Event Street, Toronto, ON M5V 2T6
...
(see table above for all fields)
```

### Sample Line Items (for Invoice PX-2025-003)

| Invoice Number | Line # | Description | Details | Qty | Rate | Amount |
|----------------|--------|-------------|---------|-----|------|--------|
| PX-2025-003 | 1 | LED Video Wall | 9×4 configuration | 1 | 8500.00 | 8500.00 |
| PX-2025-003 | 2 | Video Processor | Professional system | 1 | 1200.00 | 1200.00 |
| PX-2025-003 | 3 | Power Distribution | 30A service | 1 | 450.00 | 450.00 |
| PX-2025-003 | 4 | Rigging & Support | Truss system | 1 | 1800.00 | 1800.00 |
| PX-2025-003 | 5 | Transportation | GTA delivery | 1 | 650.00 | 650.00 |
| PX-2025-003 | 6 | Insurance | Liability coverage | 1 | 425.00 | 425.00 |
| PX-2025-003 | 7 | Technical Support | 8 hours | 8 | 85.00 | 680.00 |
| PX-2025-003 | 8 | Content Management | Testing | 1 | 350.00 | 350.00 |

**Calculations:**
- Subtotal: $14,055.00
- Discount: -$500.00
- After Discount: $13,555.00
- HST (13%): $1,762.15
- **Total: $15,317.15 CAD**

## Usage

### Generate Single Invoice

1. Open your Google Sheet with invoice data
2. Click **PixelWerx → Generate Invoice PDF**
3. Enter invoice number (e.g., `PX-2025-003`)
4. Click **OK**
5. Wait for success message (5-15 seconds)
6. Click link in success message to open PDF
7. PDF is saved to "PixelWerx Invoices" folder in your Drive

### Custom Menu Options

**PixelWerx Menu:**
- **Generate Invoice PDF** - Creates PDF for specific invoice number
- **Setup Output Folder** - Shows/creates Drive output folder
- **Test Template** - Validates template file is loaded correctly

### Output Location

PDFs are saved to:
```
Google Drive → PixelWerx Invoices → [invoice-number].pdf
```

Example: `PX-2025-003.pdf`

## Configuration

Edit `CONFIG` object in `Code.gs` to customize:

```javascript
const CONFIG = {
  INVOICE_SHEET: 'Invoice_Data',        // Sheet name for invoice data
  LINE_ITEMS_SHEET: 'Line_Items',       // Sheet name for line items
  OUTPUT_FOLDER_NAME: 'PixelWerx Invoices', // Drive folder name
  TEMPLATE_FILE: 'Invoice-AppScript-Template.html', // Template filename
  DATE_FORMAT: 'MMMM d, yyyy',          // Date format
  CURRENCY_FORMAT: '$#,##0.00'          // Currency format
};
```

### Customizing Sheet Names

If you want different sheet names:

1. Change `INVOICE_SHEET` and `LINE_ITEMS_SHEET` in CONFIG
2. Update your Google Sheets tab names to match
3. Save Apps Script

### Customizing Output Folder

1. Change `OUTPUT_FOLDER_NAME` in CONFIG
2. Run **PixelWerx → Setup Output Folder** to create new folder

## Troubleshooting

### Error: "Sheet not found: Invoice_Data"

**Cause:** Sheet tab name doesn't match CONFIG  
**Solution:** 
- Rename sheet tab to `Invoice_Data` (exact match)
- OR update `CONFIG.INVOICE_SHEET` in Code.gs

### Error: "Invoice not found: PX-2025-003"

**Cause:** Invoice number not in Invoice_Data sheet  
**Solution:**
- Check spelling of invoice number
- Verify row exists in Invoice_Data sheet
- Ensure Invoice Number column is correct

### Error: "No line items found for invoice"

**Cause:** No matching line items in Line_Items sheet  
**Solution:**
- Add at least 1 line item row with matching invoice number
- Check Invoice Number column in Line_Items matches exactly

### Error: "Template file not found"

**Cause:** HTML template not uploaded to Apps Script  
**Solution:**
1. Open Apps Script editor
2. Check if `Invoice-AppScript-Template.html` file exists
3. If missing, create HTML file and paste template content
4. Save all files

### Error: "Authorization required"

**Cause:** Apps Script not authorized yet  
**Solution:**
1. Click **PixelWerx → Setup Output Folder**
2. Click **Review permissions**
3. Select your Google account
4. Click **Allow**

### PDF Not Generating / Taking Too Long

**Cause:** Large template or slow processing  
**Solution:**
- Wait up to 30 seconds
- Check Apps Script logs: Extensions → Apps Script → Executions
- Look for error messages in log

### PDF Formatting Issues

**Cause:** Browser rendering differences  
**Solution:**
- Template uses standard HTML/CSS (works in all browsers)
- View PDF in Google Drive's PDF viewer
- Download PDF to view in Adobe Reader if needed

### Empty Line Items Showing in PDF

**Cause:** Line items not properly hidden  
**Solution:**
- Check Line Number column (should be 1-12)
- Verify script is setting `empty-row` class for unused lines
- Test with **PixelWerx → Test Template**

## Advanced Usage

### Batch Generate Invoices

To generate multiple invoices at once, create a custom function:

```javascript
function generateAllInvoices() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.INVOICE_SHEET);
  const data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    const invoiceNumber = data[i][0]; // Column A
    if (invoiceNumber) {
      try {
        generateInvoicePDF(invoiceNumber);
        Logger.log('Generated: ' + invoiceNumber);
      } catch (error) {
        Logger.log('Failed: ' + invoiceNumber + ' - ' + error.message);
      }
    }
  }
}
```

Add to custom menu:
```javascript
ui.createMenu('PixelWerx')
  .addItem('Generate Invoice PDF', 'showInvoiceDialog')
  .addItem('Generate ALL Invoices', 'generateAllInvoices') // NEW
  .addSeparator()
  .addItem('Setup Output Folder', 'setupOutputFolder')
  .addToUi();
```

### Email Invoice PDFs

Add email function:

```javascript
function emailInvoicePDF(invoiceNumber, recipientEmail) {
  const pdfUrl = generateInvoicePDF(invoiceNumber);
  const folder = getOrCreateFolder(CONFIG.OUTPUT_FOLDER_NAME);
  const files = folder.getFilesByName(invoiceNumber + '.pdf');
  
  if (files.hasNext()) {
    const file = files.next();
    MailApp.sendEmail({
      to: recipientEmail,
      subject: 'Invoice ' + invoiceNumber + ' from PixelWerx',
      body: 'Please find attached invoice ' + invoiceNumber + '.\n\nThank you for your business!',
      attachments: [file.getAs(MimeType.PDF)]
    });
  }
}
```

## Support

For issues or questions:
- Email: billing@pixelwerx.com
- Phone: (416) 555-0100

---

**Version:** 1.0.0  
**Last Updated:** October 22, 2025  
**Template:** Invoice-AppScript-Template.html  
**License:** Proprietary - PixelWerx Events Inc.
