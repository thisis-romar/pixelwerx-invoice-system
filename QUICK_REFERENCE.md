# 🎯 QUICK REFERENCE - COPY & PASTE READY

---

## 📁 FILES TO DEPLOY

### 1. CODE.GS ✅
**Source:** `h:\- emblem.iO -\pixel_werk_INVOICE\CODE.GS`  
**Lines:** 509  
**Change:** Line 496 try-catch wrapper  
**Status:** READY

### 2. invoice.html ✅
**Source:** `h:\- emblem.iO -\pixel_werk_INVOICE\CORRECTED_invoice.html`  
**Lines:** 587  
**Change:** Complete clean template  
**Status:** READY

---

## ⚡ 5-MINUTE DEPLOYMENT

### Step 1: Open Apps Script
```
Google Sheets → Extensions → Apps Script
```

### Step 2: Deploy CODE.GS
1. Select CODE.GS file
2. Ctrl+A (select all)
3. Delete
4. Open: h:\- emblem.iO -\pixel_werk_INVOICE\CODE.GS
5. Ctrl+A, Ctrl+C (copy all)
6. Paste into Apps Script
7. Ctrl+S (save)

### Step 3: Deploy invoice.html
1. Select invoice.html file (or create new HTML file named "invoice")
2. Ctrl+A (select all)
3. Delete
4. Open: h:\- emblem.iO -\pixel_werk_INVOICE\CORRECTED_invoice.html
5. Ctrl+A, Ctrl+C (copy all)
6. Paste into Apps Script
7. Ctrl+S (save)

### Step 4: Test
1. Close Apps Script
2. Reload Google Sheets (F5)
3. Extensions → Invoices → Generate by InvoiceId…
4. Enter: **INV001**
5. Click OK
6. Should see: "PDF created. File ID: [id]" ✅

---

## 🐛 WHAT WAS FIXED

### Bug #1: getUi() Context Error
```javascript
// BEFORE (LINE 496):
SpreadsheetApp.getUi().alert('Workbook ready...');

// AFTER (LINE 496):
try {
  SpreadsheetApp.getUi().alert('Workbook ready...');
} catch (e) {
  Logger.log('setupWorkbook: Complete. Alert skipped (no UI context available).');
}
```

### Bug #2: Duplicate HTML Content
```html
<!-- BEFORE (CORRUPTED): -->
<!DOCTYPE html><!DOCTYPE html>
<html lang="en"><html lang="en">

<!-- AFTER (CLEAN): -->
<!DOCTYPE html>
<html lang="en">
```

---

## ✅ VERIFICATION

### Check _Logs Sheet:
```
Extensions → Invoices → Open Logs sheet
Last row should show:
- Level: INFO
- Scope: generateInvoicePdfById
- Message: ok
```

### Check Google Drive:
```
Look for: Invoice_PX-2025-001.pdf
Open and verify modern gradient design
```

---

## 🆘 IF IT FAILS

### 1. Check Tab Names:
```
Required tabs:
- Invoices (or Invoice)
- LineItems (or Line Items)
- Clients (or Client)
- Settings
```

### 2. Verify Data:
```
Invoices sheet must have:
- InvoiceId: INV001
- ClientId: (matching Clients sheet)
- InvoiceDate: (any date)
```

### 3. Run Diagnostic:
```javascript
// In Apps Script, run this:
function testIt() {
  diagnoseLookup();
}
```

---

## 📊 EXPECTED RESULT

**PDF Features:**
- ✅ Modern gradient header (dark blue)
- ✅ Company logo (or name)
- ✅ HST# displayed
- ✅ Invoice number (PX-2025-001)
- ✅ Client info formatted
- ✅ Event details (if provided)
- ✅ Line items table
- ✅ Color badges (if Badges column used)
- ✅ Subtotal, tax, total
- ✅ Payment method badges
- ✅ Terms & conditions
- ✅ Professional footer

---

## 🎯 THAT'S IT!

**Total Time:** 5 minutes  
**Total Lines:** 1,096  
**Total Bugs Fixed:** 2  
**Status:** ✅ READY TO DEPLOY NOW

---

**Need help?** Check:
- `DEPLOYMENT_GUIDE.md` - Detailed steps
- `COMPLETE_SUMMARY.md` - Full technical details
- `ERROR_DIAGNOSIS.md` - Bug analysis

**Deploy now and start generating beautiful invoices!** 🚀
