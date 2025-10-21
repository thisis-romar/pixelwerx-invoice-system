# 🎯 QUICK REFERENCE - COPY & PASTE READY

**Version:** 1.1.0 | [Full Documentation](README.md) | [Deployment Guide](docs/deployment-guide.md) | [CHANGELOG](CHANGELOG.md)

---

## 📁 FILES TO DEPLOY

### 1. CODE.GS ✅
**Source:** `src/CODE.GS`  
**Lines:** 520 (includes copyright header)  
**Status:** ✅ READY - All bugs fixed

### 2. Invoice.html ✅
**Source:** `src/templates/Invoice.html`  
**Lines:** 602  
**Status:** ✅ READY - Duplicate DOCTYPE fixed

---

## ⚡ 5-MINUTE DEPLOYMENT

### Step 1: Open Apps Script
```
Google Sheets → Extensions → Apps Script
```

### Step 2: Deploy CODE.GS
1. Select CODE.GS file in Apps Script editor
2. Ctrl+A (select all)
3. Delete
4. Open: `src/CODE.GS` in your file explorer
5. Ctrl+A, Ctrl+C (copy all)
6. Paste into Apps Script
7. Ctrl+S (save)

### Step 3: Deploy Invoice.html
1. In Apps Script, click **+** → **HTML** 
2. Name it exactly: `Invoice` (case-sensitive!)
3. Open: `src/templates/Invoice.html` in your file explorer
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

---

## 🚨 TROUBLESHOOTING

### Error: "No HTML file named Invoice was found"

**Problem:** HTML template exists locally but not uploaded to Apps Script project.

**Solution (4 Steps):**

1. **Open Apps Script Editor**
   - Open your Google Sheet
   - Click: **Extensions** → **Apps Script**

2. **Add HTML File**
   - Click **"+"** next to **Files** (left sidebar)
   - Select **"HTML"**
   - Name it: **`Invoice`** (exactly - capital I, lowercase rest)
   - Click **Create**

3. **Copy Content**
   - Open local file: `src/templates/Invoice.html`
   - Copy ALL content (Ctrl+A, Ctrl+C)
   - In Apps Script, select `Invoice.html`
   - Delete placeholder content
   - Paste (Ctrl+V)
   - Save (Ctrl+S)

4. **Test**
   - Go back to Google Sheet
   - Click: **Extensions** → **PixelWerx Invoice** → **Generate by InvoiceId…**
   - Enter: `INV001`
   - ✅ Should see: "PDF created. File ID: ..."

### Error: "Cannot call SpreadsheetApp.getUi() from this context"

**Problem:** CODE.GS line 496 tries to call getUi() in context where UI is unavailable.

**Solution:** Already fixed in current `src/CODE.GS` with try-catch wrapper:

```javascript
try {
  SpreadsheetApp.getUi().alert('Workbook ready...');
} catch (e) {
  Logger.log('setupWorkbook: Complete. Alert skipped (no UI context available).');
}
```

### Error: Duplicate HTML Content in PDF

**Problem:** Old INVOICE.HTML had duplicated content (2 DOCTYPE declarations).

**Solution:** Already fixed! Use `src/templates/Invoice.html` (602 lines, single DOCTYPE).

**Before (BROKEN):**
```html
<!DOCTYPE html><!DOCTYPE html>
<html lang="en"><html lang="en">
```

**After (FIXED):**
```html
<!DOCTYPE html>
<html lang="en">
```

---

## 📖 Additional Resources

- **Detailed Deployment:** `docs/deployment-guide.md`
- **Testing Procedures:** `docs/testing-checklist.md`
- **Troubleshooting:** `docs/troubleshooting-guide.md`
- **Historical Analysis:** `docs/archive/` (bug reports, code changes)

---

**Deploy now and start generating beautiful invoices!** 🚀
