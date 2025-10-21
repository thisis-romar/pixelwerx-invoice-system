# 🚨 QUICK FIX - Invoice Generator Error

**Error:** "No HTML file named Invoice was found"  
**Time to Fix:** 5 minutes

---

## The Problem

Your HTML template exists **locally** but not in the **Google Apps Script project**.

Google Apps Script can only access files uploaded to its project - it cannot read local files.

---

## The Solution (4 Steps)

### 1️⃣ Open Apps Script Editor
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1ucI62Y01XIbXMB36EBLQUkLbQqD11fJuTNE9InbtAqY/edit
2. Click: **Extensions** → **Apps Script**

### 2️⃣ Add HTML File
1. Click **"+"** next to **Files** (left sidebar)
2. Select **"HTML"**
3. Name it: **`Invoice`** (exactly - capital I, lowercase rest)
4. Click **Create**

### 3️⃣ Copy Content
1. Open local file: `INVOICE.HTML`
2. Copy ALL content (Ctrl+A, Ctrl+C)
3. In Apps Script, select `Invoice.html`
4. Delete placeholder content
5. Paste (Ctrl+V)
6. Save (Ctrl+S)

### 4️⃣ Test
1. Go back to Google Sheet
2. Click: **Invoices** menu → **Generate by InvoiceId…**
3. Enter: `INV001` (or any InvoiceId from your sheet)
4. ✅ Should see: "PDF created. File ID: ..."

---

## Files Checklist

**Before Fix:**
- ✅ CODE.GS (in Apps Script)
- ❌ Invoice.html (MISSING - this is the problem!)

**After Fix:**
- ✅ CODE.GS (in Apps Script)
- ✅ Invoice.html (in Apps Script) ← YOU JUST ADDED THIS

---

## Still Not Working?

1. Check file name is **exactly** `Invoice.html` (not INVOICE.html)
2. Verify both files appear in Apps Script Files list
3. Refresh your Google Sheet (reload page)
4. Check **_Logs** sheet for detailed errors
5. See **TROUBLESHOOTING_GUIDE.md** for detailed help

---

## Next Steps After Fix

1. Run **setupWorkbook** function (creates required sheets)
2. Add test data to Invoices, LineItems, Clients sheets
3. Configure Settings sheet with company info
4. Generate test invoice

---

**Created:** October 20, 2025  
**See Also:** TROUBLESHOOTING_GUIDE.md (comprehensive documentation)
