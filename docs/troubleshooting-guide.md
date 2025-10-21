# PixelWerx Invoice Generator - Troubleshooting Guide

**Created:** October 20, 2025  
**Version:** 1.1.0  
**Status:** ✅ All Issues Resolved

📋 [Back to README](../README.md) | 🚀 [Deployment Guide](deployment-guide.md) | 🎯 [Quick Reference](../QUICK_REFERENCE.md) | 📖 [Testing](testing-checklist.md)

---

## 🚨 Problem Summary

**Error Message:**
```
Exception: No HTML file named Invoice was found.
at Code:330:25
```

**Root Cause:**  
The HTML template file `INVOICE.HTML` exists in your local file system but has **not been uploaded** to the Google Apps Script project. Google Apps Script cannot access local files - the HTML template must be part of the Apps Script project itself.

**Impact:**  
All invoice generation functions fail:
- Generate PDF for selected row ❌
- Generate + Email for selected row ❌
- Generate by InvoiceId ❌

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Open Apps Script Editor

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ucI62Y01XIbXMB36EBLQUkLbQqD11fJuTNE9InbtAqY/edit
2. Click **Extensions** → **Apps Script**
3. You should see `CODE.GS` in the Files list

### Step 2: Add HTML File

1. In the Apps Script editor, click the **"+"** button next to **Files** (left sidebar)
2. Select **"HTML"** from the dropdown menu
3. **Important:** Name the file exactly **`Invoice`** (capital I, lowercase nvoice)
   - Google Apps Script will automatically add the `.html` extension
   - Final name will show as `Invoice.html` in the file list
4. Click **"Create"**

### Step 3: Paste Template Content

1. Open the local file `INVOICE.HTML` (the one in your workspace)
2. Copy **ALL** the content (Ctrl+A, Ctrl+C)
3. In the Apps Script editor, select the new `Invoice.html` file
4. **Delete** all placeholder content
5. **Paste** the copied content (Ctrl+V)
6. **Save** (Ctrl+S or File → Save)

### Step 4: Verify Installation

Your Apps Script project should now have **2 files**:
- ✅ `CODE.GS` (the script)
- ✅ `Invoice.html` (the template)

---

## 🧪 Testing the Fix

### Test 1: Run Setup (Optional but Recommended)

1. In Apps Script editor, select function dropdown: **`setupWorkbook`**
2. Click **Run** (▶️ button)
3. **Authorize** the script if prompted (first-time only)
4. Check your Google Sheet - you should see tabs created:
   - Invoices
   - LineItems
   - Clients
   - Settings
   - _Logs

### Test 2: Add Sample Data

**In the Invoices sheet, add a test row:**

| InvoiceId | InvoiceNo | ClientId | InvoiceDate | DueText | Currency | TaxProfile | Venue | Location | LoadIn | EventDate | LoadOut | DurationDays |
|-----------|-----------|----------|-------------|---------|----------|------------|-------|----------|--------|-----------|---------|--------------|
| INV001 | PW-2025-0001 | CLI001 | 2025-10-20 | Upon Receipt | CAD | HST_ON | Test Venue | Toronto, ON | 2025-10-25 08:00 | 2025-10-25 18:00 | 2025-10-26 02:00 | 1 |

**In the LineItems sheet:**

| InvoiceId | LineNo | Title | Description | Qty | Rate | Taxable | Badges |
|-----------|--------|-------|-------------|-----|------|---------|--------|
| INV001 | 1 | LED Video Wall | 10ft x 8ft display | 1 | 2500.00 | TRUE | Premium |

**In the Clients sheet:**

| ClientId | ClientName | Attention | Email | Phone | BillingAddress | City | ProvinceState | PostalZip | Country |
|----------|------------|-----------|-------|-------|----------------|------|---------------|-----------|---------|
| CLI001 | Test Client Inc. | John Doe | john@testclient.com | (416) 555-1234 | 123 Main St | Toronto | ON | M5H 1A1 | Canada |

### Test 3: Generate Invoice

**Option A: From the Sheet (Recommended)**
1. Go back to your Google Sheet
2. Click on any row in the **Invoices** sheet (e.g., row 2 with INV001)
3. Click **Invoices** menu → **Generate PDF for selected row**
4. ✅ Success message: "PDF created. File ID: [long ID]"

**Option B: From Apps Script Editor**
1. In Apps Script editor, select function: **`diagnoseLookup`**
2. Click **Run** - check _Logs sheet for successful sheet detection
3. Select function: **`promptGenerateById`**
4. Click **Run**
5. Enter `INV001` when prompted
6. ✅ Success message: "PDF created. File ID: [long ID]"

### Test 4: Verify PDF Output

1. Open Google Drive (https://drive.google.com)
2. Search for: `Invoice_PW-2025-0001.pdf`
3. Open the PDF and verify:
   - ✅ Logo displays (if LogoUrl is valid)
   - ✅ Company info shows
   - ✅ Client info shows
   - ✅ Event details show
   - ✅ Line items table displays
   - ✅ Tax calculation is correct (13% HST for ON)
   - ✅ Total matches expected amount

---

## 🔍 Verification Checklist

After completing the fix, verify these items:

### Files in Apps Script Project
- [ ] `CODE.GS` exists (337+ lines)
- [ ] `Invoice.html` exists (~150 lines)
- [ ] File name is **exactly** `Invoice.html` (not `INVOICE.html` or `invoice.html`)

### Sheet Structure
- [ ] Invoices sheet exists with correct headers
- [ ] LineItems sheet exists with correct headers
- [ ] Clients sheet exists with correct headers
- [ ] Settings sheet exists with Key/Value columns
- [ ] _Logs sheet exists (created automatically)

### Settings Configuration
Check Settings sheet has these keys with values:
- [ ] `CompanyName` = "PixelWerx Inc." (or your company name)
- [ ] `CompanyEmail` = "info@pixelwerx.ca" (or your email)
- [ ] `CompanyPhone` = phone number
- [ ] `CompanyAddress` = multi-line address
- [ ] `HSTNumber` = tax registration number
- [ ] `LogoUrl` = URL to company logo image
- [ ] `DefaultCurrency` = "CAD"
- [ ] `TaxProfiles` = `{"HST_ON":0.13,"NO_TAX":0}` (JSON format)
- [ ] `OutputFolderId` = (optional) Drive folder ID for PDFs

### Menu Items
In your Google Sheet, check the **Invoices** menu has:
- [ ] Generate PDF for selected row
- [ ] Generate + Email for selected row
- [ ] Generate by InvoiceId…
- [ ] Open Logs sheet
- [ ] Setup workbook (create tabs)

### Logging
- [ ] Open _Logs sheet
- [ ] Recent entries should show INFO/WARN/ERROR with timestamps
- [ ] Check for "ok" messages in successful operations

---

## 🐛 Common Issues & Solutions

### Issue 1: "Sheet not found" Errors

**Symptoms:**
```
Cannot find Invoices tab (tried: Invoices, Invoice, invoices)
```

**Solution:**
1. Run `setupWorkbook` function from Apps Script editor
2. OR manually create sheets with exact names: `Invoices`, `LineItems`, `Clients`, `Settings`
3. Ensure headers match exactly (case-sensitive)

**Alternative:** Use Settings sheet to override tab names:
```
Key: Tab.Invoices
Value: Your_Custom_Tab_Name
```

---

### Issue 2: Logo Not Displaying in PDF

**Symptoms:**
- PDF generates successfully but logo is missing/broken

**Possible Causes:**
1. `LogoUrl` in Settings is empty or invalid
2. Image URL is not publicly accessible
3. Image URL requires authentication

**Solution:**
1. Use a publicly accessible image URL (GitHub raw content, Imgur, Google Drive with public sharing)
2. Current default: `https://raw.githubusercontent.com/thisis-romar/pixelwerx-video-walls/main/logo.png`
3. Test URL by opening in incognito browser window

---

### Issue 3: Tax Calculation Incorrect

**Symptoms:**
- Tax amount doesn't match expected percentage

**Causes:**
1. `TaxProfiles` in Settings has wrong JSON format
2. `TaxProfile` in Invoice row doesn't match a key in TaxProfiles
3. Line items `Taxable` column has wrong values

**Solution:**
1. Check Settings → TaxProfiles = `{"HST_ON":0.13,"NO_TAX":0}`
2. In Invoice row, set TaxProfile = `HST_ON` (must match key exactly)
3. In LineItems, set Taxable = `TRUE` or `FALSE` (case-insensitive)
4. Tax only applies to items where Taxable = TRUE

**Example:**
```
Invoice: TaxProfile = "HST_ON"
Settings: TaxProfiles = {"HST_ON":0.13,"GST":0.05,"NO_TAX":0}
LineItem 1: Qty=1, Rate=1000, Taxable=TRUE  → adds $130 tax
LineItem 2: Qty=1, Rate=500,  Taxable=FALSE → adds $0 tax
Total Tax: $130
```

---

### Issue 4: Email Not Sending

**Symptoms:**
- PDF generates but email doesn't send
- No error message shown

**Check These:**
1. Client sheet has valid email address
2. Apps Script has Gmail permissions (authorize on first run)
3. Check _Logs sheet for "emailSkipped" warnings

**Common Log Messages:**
```
emailSkipped: missing client.Email
```
**Solution:** Add email address to Clients sheet

```
emailSent: to client@example.com
```
**Success:** Email was sent

---

### Issue 5: "InvoiceId not found" Error

**Symptoms:**
```
Not found: "INV001"
Check that it exists in the Invoices sheet.
```

**Causes:**
1. InvoiceId or InvoiceNo doesn't match exactly
2. Sheet lookup is case-sensitive for data (not tab names)
3. Extra spaces in cell values

**Solution:**
1. Check spelling/capitalization of InvoiceId
2. The script normalizes keys: removes non-alphanumeric, converts to uppercase, replaces 'O' with '0'
3. Examples that match:
   - `INV001` = `inv001` = `INV-001` = `INV 001`
   - `PW2025001` = `pw-2025-001` = `PW 2025 001`

---

### Issue 6: Authorization/Permission Errors

**Symptoms:**
```
Authorization required
The script requires authorization to access your data
```

**First-Time Setup:**
1. Click **Review Permissions**
2. Choose your Google account
3. Click **Advanced** → **Go to [Project Name] (unsafe)**
4. Click **Allow**

**Required Permissions:**
- View and manage spreadsheets
- View and manage your Drive files
- Send email on your behalf (for email function)

**Security Note:**
This is YOUR script in YOUR Google account. The "unsafe" warning appears because the script is not verified by Google (it's a custom script, not a published add-on). It's safe to authorize your own scripts.

---

## 📊 Understanding the Log Sheet

The `_Logs` sheet tracks all operations. Use it to debug issues.

**Columns:**
- **Time:** Timestamp of operation
- **Level:** INFO (success), WARN (warning), ERROR (failure)
- **Scope:** Function name (e.g., generateInvoicePdfById)
- **Message:** Status (start, ok, fail)
- **DataJSON:** Detailed data (parameters, results, errors)
- **Ms:** Execution time in milliseconds

**Example Log Entries:**

**Success:**
```
Time: 2025-10-20 14:30:15
Level: INFO
Scope: generateInvoicePdfById
Message: ok
DataJSON: {"invoiceId":"INV001","invoiceNo":"PW-2025-0001","client":"Test Client Inc.","totals":{"subtotal":2500,"tax":325,"total":2825}}
Ms: 3842
```

**Failure:**
```
Time: 2025-10-20 14:27:23
Level: ERROR
Scope: generateInvoicePdfById
Message: fail
DataJSON: {"err":"Exception: No HTML file named Invoice was found.","stack":"..."}
Ms: 5837
```

**How to Use Logs:**
1. Sort by Time (descending) to see recent operations
2. Filter by Level = ERROR to find failures
3. Check DataJSON for detailed error messages
4. Compare successful vs failed operations

---

## 🔧 Advanced Configuration

### Custom Tab Names

If your sheets have different names, add overrides to Settings:

```
Key: Tab.Invoices
Value: Your_Invoices_Sheet_Name

Key: Tab.LineItems
Value: Your_Items_Sheet_Name

Key: Tab.Clients
Value: Your_Clients_Sheet_Name
```

**Tab Name Aliases (Work Automatically):**
- Invoices: `Invoice`, `Invoices`, `invoice`, `invoices`
- LineItems: `Line Items`, `Lineitems`, `Lineltems`, `Items`
- Clients: `Client`, `Clients`

### Custom Output Folder

By default, PDFs save to Drive root. To organize them:

1. Create a folder in Google Drive (e.g., "PixelWerx Invoices")
2. Open the folder
3. Copy the folder ID from URL:
   ```
   https://drive.google.com/drive/folders/1ABC...XYZ
                                           ^^^^^^^^^ this is the ID
   ```
4. In Settings sheet:
   ```
   Key: OutputFolderId
   Value: 1ABC...XYZ
   ```

### Multiple Tax Profiles

For multi-jurisdiction invoicing:

```json
{
  "HST_ON": 0.13,
  "GST_BC": 0.12,
  "GST_AB": 0.05,
  "QST_QC": 0.14975,
  "NO_TAX": 0
}
```

In Invoice row, set `TaxProfile` to match a key (e.g., `GST_BC`).

---

## 📞 Support & Next Steps

### If Fix Doesn't Work

1. **Check _Logs sheet** for detailed error messages
2. **Run `diagnoseLookup`** function to verify sheet detection
3. **Verify file name** in Apps Script matches exactly: `Invoice.html`
4. **Re-save both files** (CODE.GS and Invoice.html) in Apps Script editor
5. **Refresh the Google Sheet** (reload the page)

### Testing Workflow

```
1. setupWorkbook (one-time)
2. Add test data to sheets
3. diagnoseLookup (verify sheet detection)
4. generateForActiveRow (test PDF generation)
5. Check _Logs for errors
6. Check Drive for PDF file
7. Test email function (optional)
```

### Best Practices

- ✅ Keep Settings sheet updated with accurate company info
- ✅ Use consistent InvoiceNo format (e.g., PW-YYYY-####)
- ✅ Set Taxable correctly on each line item
- ✅ Verify client email addresses before using email function
- ✅ Check _Logs sheet regularly for issues
- ✅ Backup your sheet before making structural changes

---

## 📝 File Checklist

**Local Files (for reference):**
- `CODE.GS` - Apps Script code (337 lines)
- `INVOICE.HTML` - HTML template (150 lines)
- `TROUBLESHOOTING_GUIDE.md` - This document

**Apps Script Project (must exist):**
- `CODE.GS` - Uploaded to Apps Script
- `Invoice.html` - Uploaded to Apps Script (from INVOICE.HTML)

**Google Sheet Tabs (auto-created by setupWorkbook):**
- `Invoices` - Invoice header data
- `LineItems` - Invoice line items
- `Clients` - Client directory
- `Settings` - Configuration key-value pairs
- `_Logs` - Operation logs

---

## ✅ Success Criteria

You'll know everything works when:

1. ✅ Apps Script project has both CODE.GS and Invoice.html
2. ✅ "Invoices" menu appears in Google Sheet
3. ✅ setupWorkbook creates all required sheets
4. ✅ diagnoseLookup logs successful sheet detection
5. ✅ Generate PDF creates file in Drive
6. ✅ PDF displays correctly with all data
7. ✅ Email function sends (if client email exists)
8. ✅ _Logs shows "ok" for operations

---

**Last Updated:** October 20, 2025  
**Version:** 1.0.0  
**Author:** Generated via GitHub Copilot (Claude Sonnet 4.5)

