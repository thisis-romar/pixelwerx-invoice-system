# 🚀 DEPLOY FIXED CODE - 3 Steps

**Time Required:** 2 minutes  
**Status:** ✅ Code ready to deploy

---

## Step 1: Copy CODE.GS (30 seconds)

1. **Open this file:** `h:\- emblem.iO -\pixel_werk_INVOICE\CODE.GS`
2. **Select All:** `Ctrl+A`
3. **Copy:** `Ctrl+C`

---

## Step 2: Paste to Apps Script (30 seconds)

1. **Open your Google Sheet:** [PixelWerx Invoicing](https://docs.google.com/spreadsheets/d/1HyPJ3Iho4rN_R5eEAR1_0RYA-8OuGYZs5NiTSbJp4hc/edit?gid=0#gid=0)
2. **Menu:** Extensions → Apps Script
3. **Files Panel:** Click `CODE.GS`
4. **Delete old code:** `Ctrl+A` then `Delete`
5. **Paste new code:** `Ctrl+V`
6. **Save:** `Ctrl+S` (or click disk icon)
7. **Close Apps Script tab**

---

## Step 3: Test (1 minute)

1. **Back in Google Sheets:**
   - Menu: Extensions → PixelWerx Invoice → **Generate Invoice by ID**

2. **In popup dialog:**
   - Enter: `INV001`
   - Click: **OK**

3. **Expected Result:**
   ```
   ✅ Success!
   PDF created. File ID: abc123xyz
   ```

4. **Check Google Drive:**
   - File: `Invoice_PX-2025-001.pdf` should be there!

---

## ✅ Success Indicators

| Check | What to See |
|-------|-------------|
| ✅ Dialog | "PDF created. File ID: ..." |
| ✅ Drive | New PDF file appears |
| ✅ _Logs | New row with "generateInvoicePdfById" success |
| ✅ Invoice Sheet | Status changes to "Generated" |

---

## ❌ If Something Goes Wrong

**Error Dialog Appears?**
- Copy the FULL error message
- Check _Logs sheet for details
- Report exact error text

**No Dialog at All?**
- Check if CODE.GS was saved (should have no red squiggles)
- Try: Extensions → Apps Script → Run → generateInvoicePdfById
- Check Execution Log in Apps Script

**"Authorization Required" Dialog?**
- Click "Review Permissions"
- Choose your Google account
- Click "Advanced" → "Go to PixelWerx Invoice (unsafe)"
- Click "Allow"
- Try again

---

## 🐛 What Was Fixed

1. **TermsJSON = 3 Error**
   - Old: `JSON.parse(3)` crashed
   - New: Safe parser checks type first

2. **Date Timestamps**
   - Old: "2025-10-18T04:00:00.000Z" in PDF
   - New: "2025-10-18" or "2025-10-17 14:00"

3. **Misleading Errors**
   - Old: "Not found: INV001" (wrong!)
   - New: Shows actual error message

**Full details:** See `BUGS_FIXED.md`

---

## 📞 Still Having Issues?

1. **Check _Logs sheet** - Shows detailed error info
2. **Share _Logs** - Copy last 5 rows and send to support
3. **Run Diagnostic** - See `DIAGNOSTIC_SCRIPT.js`

---

**Ready?** Go to Step 1! 🚀
