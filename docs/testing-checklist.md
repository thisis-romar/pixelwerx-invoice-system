# Testing Checklist - PixelWerx Invoice Generator

**Date:** October 20, 2025  
**Version:** 1.1.0  
**Purpose:** Comprehensive system verification

📋 [Back to README](../README.md) | 🚀 [Deployment Guide](deployment-guide.md) | 🐛 [Troubleshooting](troubleshooting-guide.md) | 📖 [CHANGELOG](../CHANGELOG.md)

---

## ☑️ Pre-Test Setup

### Apps Script Files
- [ ] `CODE.GS` exists in Apps Script project
- [ ] `Invoice.html` exists in Apps Script project
- [ ] File name is **exactly** `Invoice.html` (case-sensitive)

### Authorization
- [ ] Script is authorized (if first run, approve permissions)
- [ ] Gmail permission granted (for email function)
- [ ] Drive permission granted (for PDF creation)

---

## ☑️ Test 1: Setup Workbook

**Objective:** Verify automatic sheet creation works

### Steps:
1. Open Apps Script editor
2. Select function: `setupWorkbook`
3. Click Run (▶️)
4. Go back to Google Sheet

### Expected Results:
- [ ] `Invoices` sheet created with headers
- [ ] `LineItems` sheet created with headers
- [ ] `Clients` sheet created with headers
- [ ] `Settings` sheet created with Key/Value columns + default data
- [ ] `_Logs` sheet created with log headers

### Settings Sheet Should Have:
- [ ] CompanyName
- [ ] CompanyEmail
- [ ] CompanyPhone
- [ ] CompanyAddress
- [ ] HSTNumber
- [ ] LogoUrl
- [ ] DefaultCurrency = CAD
- [ ] TaxProfiles = `{"HST_ON":0.13,"NO_TAX":0}`
- [ ] OutputFolderId (can be empty)

---

## ☑️ Test 2: Add Test Data

### Clients Sheet - Add Row:
```
ClientId: CLI001
ClientName: Test Client Inc.
Attention: John Doe
Email: your-test-email@example.com
Phone: (416) 555-1234
BillingAddress: 123 Main Street
City: Toronto
ProvinceState: ON
PostalZip: M5H 1A1
Country: Canada
```

- [ ] Data entered
- [ ] Email is a real email you can check (for email test)

### LineItems Sheet - Add Rows:
```
Row 1:
InvoiceId: INV001
LineNo: 1
Title: LED Video Wall
Description: 10ft x 8ft display
Qty: 1
Rate: 2500.00
Taxable: TRUE
Badges: Premium

Row 2:
InvoiceId: INV001
LineNo: 2
Title: Installation & Setup
Description: On-site technician support
Qty: 4
Rate: 150.00
Taxable: TRUE
Badges: Labor
```

- [ ] Data entered
- [ ] Taxable is set to TRUE (for tax calculation test)

### Invoices Sheet - Add Row:
```
InvoiceId: INV001
InvoiceNo: PW-2025-0001
ClientId: CLI001
InvoiceDate: 2025-10-20
DueText: Upon Receipt
Currency: CAD
TaxProfile: HST_ON
Venue: Metro Toronto Convention Centre
Location: 255 Front St W, Toronto, ON
LoadIn: 2025-10-25 08:00
EventDate: 2025-10-25 18:00
LoadOut: 2025-10-26 02:00
DurationDays: 1
TermsJSON: (leave empty to use defaults)
PaymentMethodsCSV: E-Transfer,Credit Card,Corporate Check
Status: (leave empty - will be set by script)
```

- [ ] Data entered
- [ ] TaxProfile matches key in Settings (HST_ON)
- [ ] ClientId matches Clients sheet (CLI001)

---

## ☑️ Test 3: Sheet Detection

**Objective:** Verify smart sheet lookup works

### Steps:
1. Open Apps Script editor
2. Select function: `diagnoseLookup`
3. Click Run
4. Go to `_Logs` sheet

### Expected Log Entries:
- [ ] Level: INFO
- [ ] Scope: diagnoseLookup
- [ ] Message: summary
- [ ] DataJSON shows:
  - invoicesTab: "Invoices" (or your tab name)
  - rowCount: 1 (or number of test rows)
  - first3: shows INV001 data

**If Fails:**
- Check tab names match expected names
- OR add tab overrides in Settings sheet

---

## ☑️ Test 4: Generate PDF (From Sheet)

**Objective:** Verify PDF generation from menu

### Steps:
1. Go to Google Sheet
2. Click on row 2 in Invoices sheet (INV001 data row)
3. Click: **Invoices** menu → **Generate PDF for selected row**
4. Wait for completion

### Expected Results:
- [ ] Alert appears: "PDF created. File ID: [long ID string]"
- [ ] No error alert
- [ ] _Logs shows INFO level with "ok" message

**Manual Calculation for Verification:**
```
Line 1: 1 × $2,500.00 = $2,500.00 (taxable)
Line 2: 4 × $150.00   = $600.00   (taxable)
Subtotal: $3,100.00
Tax (13% HST): $403.00
Total: $3,503.00
```

- [ ] Values match expected calculation

---

## ☑️ Test 5: Verify PDF in Drive

**Objective:** Check PDF file created and formatted correctly

### Steps:
1. Open Google Drive
2. Search for: `Invoice_PW-2025-0001.pdf`
3. Open the PDF

### PDF Content Checks:

**Header Section:**
- [ ] Logo displays (if LogoUrl is valid and public)
- [ ] "INVOICE" title visible
- [ ] Invoice #: PW-2025-0001
- [ ] Date: 2025-10-20
- [ ] Due: Upon Receipt

**From Section:**
- [ ] Company name: PixelWerx Inc. (or your value)
- [ ] Company address shows
- [ ] Email and phone show
- [ ] HST# shows

**Bill To Section:**
- [ ] Client name: Test Client Inc.
- [ ] Attn: John Doe
- [ ] Full billing address shows
- [ ] Email: your-test-email@example.com
- [ ] Phone: (416) 555-1234

**Event Details:**
- [ ] Venue: Metro Toronto Convention Centre
- [ ] Location: 255 Front St W, Toronto, ON
- [ ] Load-In: 2025-10-25 08:00
- [ ] Event Date: 2025-10-25 18:00
- [ ] Load-Out: 2025-10-26 02:00
- [ ] Duration: 1 Day

**Line Items Table:**
- [ ] Header row styled (dark background)
- [ ] Row 1: LED Video Wall | 1 | CAD 2,500.00 | CAD 2,500.00
- [ ] Row 2: Installation & Setup | 4 | CAD 150.00 | CAD 600.00
- [ ] Description text appears under title

**Totals Section:**
- [ ] Subtotal: CAD 3,100.00
- [ ] HST (13%): CAD 403.00
- [ ] Total Amount Due: CAD 3,503.00 CAD

**Terms Section:**
- [ ] Default terms display (8 bullet points)
- [ ] Payment method badges show: E-Transfer, Credit Card, Corporate Check

**Footer:**
- [ ] "Thank you for choosing PixelWerx..." message
- [ ] Email and phone in footer

**Design/Layout:**
- [ ] No overlapping text
- [ ] Logo displays without errors (or gracefully hidden if URL fails)
- [ ] Colors match brand (brown/orange theme)
- [ ] Professional appearance

---

## ☑️ Test 6: Generate by ID (Prompt)

**Objective:** Test direct generation by InvoiceId

### Steps:
1. In Google Sheet, click: **Invoices** menu → **Generate by InvoiceId…**
2. Enter: `INV001`
3. Click OK

### Expected Results:
- [ ] Alert: "PDF created. File ID: [ID]"
- [ ] No "not found" error
- [ ] _Logs shows successful generation

### Test Variations:
Try these input formats (all should work):
- [ ] `INV001` (exact)
- [ ] `inv001` (lowercase - should normalize)
- [ ] `INV-001` (with dash - should normalize)
- [ ] `PW-2025-0001` (InvoiceNo - should match)

---

## ☑️ Test 7: Email Function (Optional)

**Objective:** Verify email sending works

⚠️ **Warning:** This sends a REAL email. Use your own test email address!

### Steps:
1. Verify Clients sheet has YOUR email in CLI001 row
2. Click on Invoices sheet row 2 (INV001)
3. Click: **Invoices** menu → **Generate + Email for selected row**
4. Check your email inbox

### Expected Results:
- [ ] Alert: "Emailed & saved. File ID: [ID]"
- [ ] Email received in inbox
- [ ] Subject: "Invoice PW-2025-0001"
- [ ] Body: "Please find your invoice attached."
- [ ] PDF attachment present
- [ ] PDF opens correctly
- [ ] From: PixelWerx Inc. (or your CompanyName)

### _Logs Entry Should Show:
- [ ] Level: INFO
- [ ] Scope: generateInvoicePdfById
- [ ] Message: emailSent
- [ ] DataJSON: `{"to":"your-email@example.com"}`

---

## ☑️ Test 8: Error Handling

**Objective:** Verify graceful error handling

### Test 8a: Invalid InvoiceId
1. Click: **Invoices** menu → **Generate by InvoiceId…**
2. Enter: `INVALID123`

**Expected:**
- [ ] Alert shows: "Not found: 'INVALID123'"
- [ ] Alert shows examples of valid IDs
- [ ] _Logs shows ERROR level entry
- [ ] Script doesn't crash

### Test 8b: Missing Client Email
1. In Clients sheet, clear the Email field for CLI001
2. Try: **Generate + Email for selected row**

**Expected:**
- [ ] PDF still generates
- [ ] _Logs shows: "emailSkipped" with reason "missing client.Email"
- [ ] No email sent (but no error thrown)

### Test 8c: Empty Row Selection
1. Click on Invoices header row (row 1)
2. Try: **Generate PDF for selected row**

**Expected:**
- [ ] Error alert: "Select a data row in the Invoices sheet."
- [ ] _Logs shows ERROR entry
- [ ] No PDF created

---

## ☑️ Test 9: Logs Review

**Objective:** Verify logging system works

### Steps:
1. Open `_Logs` sheet
2. Review recent entries

### Check These Patterns:

**Successful Generation:**
```
Level: INFO
Scope: generateInvoicePdfById
Message: start
(next row)
Level: INFO
Scope: generateInvoicePdfById
Message: ok
Ms: 3000-6000 (typical range)
```

**Failed Generation:**
```
Level: ERROR
Scope: generateInvoicePdfById
Message: fail
DataJSON: {"err":"...detailed error..."}
```

### Verify Log Completeness:
- [ ] Timestamps are accurate
- [ ] Scope shows correct function names
- [ ] DataJSON contains useful debugging info
- [ ] Ms column shows execution times
- [ ] No missing/corrupted entries

---

## ☑️ Test 10: Multi-Invoice Test

**Objective:** Verify system handles multiple invoices

### Steps:
1. Add second client in Clients sheet (CLI002)
2. Add second invoice in Invoices sheet (INV002) for CLI002
3. Add line items for INV002
4. Generate both invoices

### Expected Results:
- [ ] Both PDFs created with different filenames
- [ ] Client info correctly assigned to each invoice
- [ ] Line items correctly filtered by InvoiceId
- [ ] No data mixing between invoices

---

## ☑️ Test 11: Tax Calculations

**Objective:** Verify tax logic works correctly

### Test 11a: Mixed Taxable Items
Create Invoice INV003 with:
- Line 1: Qty=1, Rate=1000, Taxable=TRUE
- Line 2: Qty=1, Rate=500, Taxable=FALSE

**Expected:**
- [ ] Subtotal: $1,500.00
- [ ] Tax (13% on $1000 only): $130.00
- [ ] Total: $1,630.00

### Test 11b: No Tax Profile
Create Invoice INV004 with:
- TaxProfile: NO_TAX

**Expected:**
- [ ] Tax: $0.00
- [ ] Total = Subtotal

### Test 11c: All Non-Taxable
Create Invoice INV005 with:
- All line items Taxable=FALSE

**Expected:**
- [ ] Tax: $0.00
- [ ] Total = Subtotal

---

## ☑️ Performance Benchmarks

### Typical Execution Times (from _Logs Ms column):

- [ ] setupWorkbook: < 2000ms (2 seconds)
- [ ] diagnoseLookup: < 500ms
- [ ] generateInvoicePdfById: 3000-6000ms (3-6 seconds)
  - With 1-5 line items: ~3-4 seconds
  - With 10+ line items: ~5-6 seconds
  - With email: +1-2 seconds
- [ ] writeBack: < 200ms

**If significantly slower:**
- Check internet connection
- Check Google Drive storage quota
- Check for large embedded images in HTML

---

## ☑️ Final Verification

### System Stability:
- [ ] All 11 tests passed
- [ ] No unhandled errors in _Logs
- [ ] PDFs display correctly in all tests
- [ ] Email function works (if tested)

### Documentation:
- [ ] Settings sheet has accurate company info
- [ ] Logo URL is public and accessible
- [ ] Tax profiles configured for your jurisdictions
- [ ] Output folder set (if desired)

### Data Integrity:
- [ ] Invoice numbers follow consistent format
- [ ] Client IDs match between sheets
- [ ] Tax calculations are accurate
- [ ] No data corruption in multi-invoice scenarios

---

## 🎯 Success Criteria

✅ **READY FOR PRODUCTION** if:
1. All core tests (1-6) pass
2. PDF formatting looks professional
3. Tax calculations are accurate
4. No errors in _Logs for successful operations
5. Email function works (if using)

⚠️ **NEEDS ATTENTION** if:
- Any test fails consistently
- PDFs have layout issues
- Tax calculations incorrect
- Errors appear in _Logs for valid operations

---

## 📝 Test Results Log

**Tester:** ___________________  
**Date:** ___________________  
**Overall Result:** ⬜ PASS  ⬜ FAIL  ⬜ PARTIAL  

**Failed Tests:**
```
(List any tests that failed and notes on why)
```

**Notes:**
```
(Any observations, performance issues, or recommendations)
```

---

**Version:** 1.0.0  
**Last Updated:** October 20, 2025  
**Next Review:** After any code changes to CODE.GS or Invoice.html
