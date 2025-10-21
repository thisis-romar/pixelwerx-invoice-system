# 🚀 QUICK FIX GUIDE - Deploy to Apps Script NOW

**Date:** October 20, 2025  
**Time Required:** 5 minutes  
**Complexity:** ⭐ Easy

---

## 🎯 TWO PROBLEMS FIXED

### Problem #1: SpreadsheetApp.getUi() Error ❌
**Location:** CODE.GS line 496  
**Error:** "Cannot call SpreadsheetApp.getUi() from this context"

### Problem #2: Duplicate HTML Content ❌  
**Location:** invoice.html file  
**Error:** All content appears twice causing rendering failures

---

## ✅ SOLUTION - Deploy to Apps Script

### Step 1: Open Apps Script (30 seconds)

1. Open your Google Sheet: **PixelWerx Invoicing**
2. Click **Extensions** → **Apps Script**
3. You'll see the Apps Script editor open

---

### Step 2: Fix CODE.GS (2 minutes)

**Find line 496** (in `setupWorkbook()` function)

**CURRENT CODE (BROKEN):**
```javascript
function setupWorkbook() {
  // ... sheet creation code ...
  SpreadsheetApp.getUi().alert('Workbook ready.\nAdd data to the tabs and use the Invoices menu.');
}
```

**REPLACE WITH (FIXED):**
```javascript
function setupWorkbook() {
  // ... sheet creation code ...
  try {
    SpreadsheetApp.getUi().alert('Workbook ready.\nAdd data to the tabs and use the Invoices menu.');
  } catch (e) {
    // UI not available in this context (e.g., triggered by onOpen)
    Logger.log('setupWorkbook: Complete. Alert skipped (no UI context available).');
  }
}
```

**What this does:**
- Wraps the UI alert in try-catch
- If UI not available, logs message instead
- Prevents the error from stopping execution

---

### Step 3: Replace invoice.html (2 minutes)

#### Option A: Manual Copy-Paste (RECOMMENDED)

1. In Apps Script, find `invoice.html` file (or `invoice` HTML file)
2. Delete ALL existing content
3. Copy the clean HTML from `invoice_CLEAN.html` file
4. Paste into Apps Script
5. Save (Ctrl+S)

#### Option B: Create New File

1. In Apps Script, delete the old `invoice.html` file
2. Click **+** → **HTML** → Name it `invoice`
3. Copy clean content from local file
4. Paste
5. Save

---

### Step 4: Save and Test (30 seconds)

1. Click **Save** (💾 icon) or press Ctrl+S
2. Close Apps Script editor
3. Return to Google Sheets
4. **Test invoice generation:**
   - Extensions → Invoices → Generate by InvoiceId…
   - Enter: **INV001**
   - Should work! ✅

---

## 🔍 WHAT TO CHECK

### After Deployment:

1. **_Logs sheet** - Should show NO errors
2. **Google Drive** - PDF file should be created
3. **PDF content** - Should show modern design:
   - Gradient header (dark blue)
   - Clean professional layout
   - All data rendered correctly

---

## ⚠️ FILE CORRUPTION ISSUE EXPLAINED

**What happened:**
Your local `invoice.html` file became corrupted with duplicate content. Every line appeared twice:

```html
<!DOCTYPE html><!DOCTYPE html>
<html lang="en"><html lang="en">
```

**Why it matters:**
- Apps Script HTML parser fails with duplicate tags
- PDF generation crashes
- Rendering is impossible

**Solution:**
- Use the clean `invoice_CLEAN.html` template
- Copy ONLY that content to Apps Script
- Do NOT use the corrupted file

---

## 📋 CLEAN invoice.html LOCATION

**File Path:**
```
h:\- emblem.iO -\pixel_werk_INVOICE\invoice_CLEAN.html
```

**Verification:**
- First line should be: `<!DOCTYPE html>` (ONLY ONCE!)
- No duplicate content
- Apps Script syntax: `<?= ... ?>` and `<? ... ?>`

---

## 🎯 EXPECTED RESULT

### After Fix:

1. ✅ No `getUi()` errors in logs
2. ✅ Invoice generates successfully
3. ✅ PDF saved to Google Drive
4. ✅ Modern professional design renders correctly
5. ✅ All data displays (dates, amounts, client info)

---

## 🆘 IF PROBLEMS PERSIST

### Check:

1. **CODE.GS line 496** - Is try-catch in place?
2. **invoice.html in Apps Script** - No duplicate content?
3. **File name** - Must be lowercase `invoice` (not `Invoice`)
4. **_Logs sheet** - What exact error shows?

---

## 💡 BONUS FIX - AI Attribution

Since this was an AI-assisted fix, here's the commit message format:

```
fix(invoice): resolve getUi() context error and HTML template corruption

Fixed two critical bugs preventing invoice PDF generation:
1. Wrapped setupWorkbook() UI alert in try-catch for context safety
2. Replaced corrupted invoice.html with clean template

AI-Attribution:
- Model: copilot/claude-sonnet-4.5 (Anthropic)
- Session: [current-session-id]
- Context: Google Apps Script invoice generation debugging
- Tools: Sequential Thinking MCP, File Analysis

Co-authored-by: GitHub Copilot (copilot/claude-sonnet-4.5) <admin+llm-claude-sonnet-4-5@emblemprojects.com>
```

---

## 🚀 DEPLOY NOW

Total time: **5 minutes**

1. Open Apps Script ✓
2. Fix CODE.GS line 496 ✓
3. Replace invoice.html with clean content ✓
4. Save ✓
5. Test with INV001 ✓

**YOU'RE DONE!** 🎉
