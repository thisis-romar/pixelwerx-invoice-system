# Visual Setup Guide - PixelWerx Invoice Generator

**Quick visual reference for setup and usage**

---

## 🎯 Setup Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    SETUP WORKFLOW                            │
└─────────────────────────────────────────────────────────────┘

Step 1: Open Google Sheet
   │
   ├─ Go to: Extensions → Apps Script
   │
   v
Step 2: Upload CODE.GS
   │
   ├─ Paste content into Code.gs file
   ├─ Save (Ctrl+S)
   │
   v
Step 3: Add Invoice.html ⚠️ CRITICAL STEP
   │
   ├─ Click "+" next to Files
   ├─ Select "HTML"
   ├─ Name: "Invoice" (exactly)
   ├─ Paste INVOICE.HTML content
   ├─ Save (Ctrl+S)
   │
   v
Step 4: Run setupWorkbook
   │
   ├─ Select function: setupWorkbook
   ├─ Click Run (▶️)
   ├─ Authorize permissions
   │
   v
Step 5: Verify Sheets Created
   │
   ├─ ✓ Invoices
   ├─ ✓ LineItems
   ├─ ✓ Clients
   ├─ ✓ Settings
   └─ ✓ _Logs
   │
   v
Step 6: Configure Settings
   │
   ├─ Update company info
   ├─ Set logo URL
   ├─ Configure tax profiles
   │
   v
Step 7: Add Test Data
   │
   ├─ Add client
   ├─ Add invoice
   ├─ Add line items
   │
   v
Step 8: Generate Test Invoice
   │
   ├─ Select invoice row
   ├─ Menu: Generate PDF
   ├─ Check Drive for PDF
   │
   v
✅ READY FOR PRODUCTION
```

---

## 📊 Data Relationship Diagram

```
┌──────────────────┐
│  SETTINGS        │  (Configuration)
│  ─────────────   │
│  CompanyName     │ ────┐
│  CompanyEmail    │     │
│  TaxProfiles     │     │
│  LogoUrl         │     │
└──────────────────┘     │
                         │
                         v
┌──────────────────┐   ┌──────────────────────────┐
│  CLIENTS         │   │  INVOICE GENERATOR       │
│  ─────────────   │   │  ──────────────────────  │
│  ClientId  ◄─────┼───┤  • Reads client info     │
│  ClientName      │   │  • Reads settings        │
│  Email           │   │  • Calculates tax        │
│  Address         │   │  • Builds PDF            │
└──────────────────┘   │  • Saves to Drive        │
                       │  • Sends email (opt)     │
┌──────────────────┐   └──────────────────────────┘
│  INVOICES        │                 │
│  ─────────────   │                 │
│  InvoiceId ──────┼─────────────────┤
│  ClientId  ──────┼─────────────────┤
│  TaxProfile      │                 │
│  InvoiceNo       │                 v
│  Venue, Dates... │         ┌──────────────────┐
└──────────────────┘         │  OUTPUT          │
        │                    │  ──────────────  │
        │                    │  • PDF in Drive  │
        v                    │  • Email to      │
┌──────────────────┐         │    client        │
│  LINE ITEMS      │         │  • Log entry     │
│  ─────────────   │         │  • Status update │
│  InvoiceId ──────┼─────────┤                  │
│  LineNo          │         └──────────────────┘
│  Title           │
│  Qty, Rate       │
│  Taxable         │
└──────────────────┘
```

---

## 🔄 Invoice Generation Flow

```
USER ACTION: Generate Invoice
   │
   v
┌────────────────────────────────────────┐
│ 1. LOOKUP INVOICE                      │
│    • Find by InvoiceId or InvoiceNo    │
│    • Normalize key (uppercase, etc)    │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 2. GATHER DATA                         │
│    • Get invoice row                   │
│    • Get client (by ClientId)          │
│    • Get line items (by InvoiceId)     │
│    • Get settings (company, tax)       │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 3. CALCULATE TOTALS                    │
│    • Subtotal = Σ(Qty × Rate)          │
│    • Tax Base = Σ(taxable items)       │
│    • Tax = Tax Base × Tax Rate         │
│    • Total = Subtotal + Tax            │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 4. BUILD TEMPLATE DATA                 │
│    • Map to template variables         │
│    • Format currency values            │
│    • Build event details               │
│    • Prepare terms & badges            │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 5. RENDER HTML                         │
│    • Load Invoice.html template        │
│    • Inject data (<?= d.field ?>)      │
│    • Execute loops (items, terms)      │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 6. CONVERT TO PDF                      │
│    • HtmlService evaluates template    │
│    • Generate PDF blob                 │
│    • Name: Invoice_{InvoiceNo}.pdf     │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 7. SAVE TO DRIVE                       │
│    • Get output folder (or root)       │
│    • Create file                       │
│    • Return file ID                    │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 8. SEND EMAIL? (Optional)              │
│    • Get client email                  │
│    • Attach PDF                        │
│    • Send via Gmail                    │
└────────────────────────────────────────┘
   │
   v
┌────────────────────────────────────────┐
│ 9. UPDATE INVOICE                      │
│    • Write back totals                 │
│    • Set status (Generated/Sent)       │
│    • Log operation                     │
└────────────────────────────────────────┘
   │
   v
✅ DONE - PDF Created & Logged
```

---

## 🎨 PDF Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓ Accent Line ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  HEADER (Brown Gradient)                        │   │
│  │  [Logo]                                         │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────┬──────────────────────────┐   │
│  │  INVOICE             │  #: PW-2025-0001         │   │
│  │                      │  Date: 2025-10-20        │   │
│  │                      │  Due: Upon Receipt       │   │
│  └──────────────────────┴──────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────┬──────────────────────────┐   │
│  │  FROM                │  BILL TO                 │   │
│  │  PixelWerx Inc.      │  Test Client Inc.        │   │
│  │  123 King St W       │  Attn: John Doe          │   │
│  │  info@pixelwerx.ca   │  john@client.com         │   │
│  │  HST# 12345...       │  123 Main St, Toronto    │   │
│  └──────────────────────┴──────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  EVENT DETAILS                                  │   │
│  │  Venue: Metro Toronto Convention Centre        │   │
│  │  Location: 255 Front St W, Toronto, ON         │   │
│  │  Load-In: 2025-10-25 08:00                      │   │
│  │  Event Date: 2025-10-25 18:00                   │   │
│  │  Load-Out: 2025-10-26 02:00                     │   │
│  │  Duration: 1 Day                                │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  EQUIPMENT & SERVICES                           │   │
│  │  ┌────────────┬────┬─────────┬─────────────┐   │   │
│  │  │Description │ Qty│   Rate  │    Amount   │   │   │
│  │  ├────────────┼────┼─────────┼─────────────┤   │   │
│  │  │LED Wall    │  1 │ 2,500.00│    2,500.00 │   │   │
│  │  │Install     │  4 │   150.00│      600.00 │   │   │
│  │  └────────────┴────┴─────────┴─────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  TOTALS (Gradient Background)                   │   │
│  │  Subtotal:                         CAD 3,100.00 │   │
│  │  HST (13%):                          CAD 403.00 │   │
│  │  ─────────────────────────────────────────────  │   │
│  │  TOTAL AMOUNT DUE:                CAD 3,503.00  │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  TERMS & CONDITIONS                             │   │
│  │  • 50% deposit due at booking...                │   │
│  │  • ≥14 days: 75% refund...                      │   │
│  │  • Client provides power...                     │   │
│  │  • ...                                          │   │
│  │                                                  │   │
│  │  Accepted Payment Methods:                      │   │
│  │  [E-Transfer] [Credit Card] [Corporate Check]  │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────┐   │
│  │  FOOTER (Brown Gradient)                        │   │
│  │  Thank you for choosing PixelWerx...            │   │
│  │  Questions? info@pixelwerx.ca • (416) 555-7890  │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓ Accent Line ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
└─────────────────────────────────────────────────────────┘

Color Scheme:
▓ Brown (#3e2723, #5d4037) - Headers, footers
▓ Orange (#ff5722) - Accents, borders, badges
▓ Cream (#fff3e0, #fafafa) - Backgrounds
▓ Dark Gray (#424242, #757575) - Text
```

---

## 🎛️ Menu Structure

```
Google Sheet Menu Bar
─────────────────────────────────────────────────────
File  Edit  View  Insert  Format  Data  Tools  Extensions  [INVOICES]  Help
                                                              │
                                                              ├─ Generate PDF for selected row
                                                              ├─ Generate + Email for selected row
                                                              ├─ ─────────────────────────────
                                                              ├─ Generate by InvoiceId…
                                                              ├─ ─────────────────────────────
                                                              ├─ Open Logs sheet
                                                              └─ Setup workbook (create tabs)
```

---

## 🗂️ File Organization in Apps Script

```
Apps Script Project: PixelWerx Invoice Generator
─────────────────────────────────────────────────
📁 Files
   ├─ 📄 Code.gs (CODE.GS)              ← Main script
   └─ 📄 Invoice.html (INVOICE.HTML)    ← PDF template ⚠️ MUST EXIST

⚠️ Common Error: Missing Invoice.html
   Symptom: "No HTML file named Invoice was found"
   Fix: Add HTML file (click "+" → HTML → name "Invoice")
```

---

## 📋 Sheet Structure Visual

```
INVOICES SHEET
┌─────────┬──────────┬─────────┬────────────┬─────────┬─────────┬──────────┬────────┐
│InvoiceId│InvoiceNo │ClientId │InvoiceDate │DueText  │Currency │TaxProfile│Venue   │
├─────────┼──────────┼─────────┼────────────┼─────────┼─────────┼──────────┼────────┤
│INV001   │PW-2025-1 │CLI001   │2025-10-20  │On Receipt│CAD     │HST_ON    │Metro...│
│INV002   │PW-2025-2 │CLI002   │2025-10-21  │Net 30   │CAD     │HST_ON    │Roy...  │
└─────────┴──────────┴─────────┴────────────┴─────────┴─────────┴──────────┴────────┘
                        │
                        │ ClientId links to Clients sheet
                        v
CLIENTS SHEET
┌────────┬───────────────┬──────────┬────────────────┬───────────┬────────────┐
│ClientId│ClientName     │Attention │Email           │Phone      │Address...  │
├────────┼───────────────┼──────────┼────────────────┼───────────┼────────────┤
│CLI001  │Test Client Inc│John Doe  │john@client.com │4165551234 │123 Main St │
└────────┴───────────────┴──────────┴────────────────┴───────────┴────────────┘

LINE ITEMS SHEET
┌─────────┬───────┬──────────────┬────────────────┬───┬──────┬───────┬──────┐
│InvoiceId│LineNo │Title         │Description     │Qty│Rate  │Taxable│Badges│
├─────────┼───────┼──────────────┼────────────────┼───┼──────┼───────┼──────┤
│INV001   │1      │LED Video Wall│10ft x 8ft      │1  │2500  │TRUE   │Premium│
│INV001   │2      │Installation  │Technician 4hrs │4  │150   │TRUE   │Labor │
└─────────┴───────┴──────────────┴────────────────┴───┴──────┴───────┴──────┘
    │
    │ InvoiceId links to Invoices sheet
    └─> Multiple line items per invoice

SETTINGS SHEET (Key-Value Store)
┌──────────────────┬────────────────────────────────────┐
│Key               │Value                               │
├──────────────────┼────────────────────────────────────┤
│CompanyName       │PixelWerx Inc.                      │
│CompanyEmail      │info@pixelwerx.ca                   │
│DefaultCurrency   │CAD                                 │
│TaxProfiles       │{"HST_ON":0.13,"NO_TAX":0}          │
│OutputFolderId    │1ABC...XYZ (Drive folder ID)        │
└──────────────────┴────────────────────────────────────┘

_LOGS SHEET (Auto-generated)
┌──────────────────┬──────┬──────────────────┬────────┬─────────────┬─────┐
│Time              │Level │Scope             │Message │DataJSON     │Ms   │
├──────────────────┼──────┼──────────────────┼────────┼─────────────┼─────┤
│2025-10-20 14:30  │INFO  │generateInvoice.. │ok      │{"invoice... │3842 │
│2025-10-20 14:27  │ERROR │generateInvoice.. │fail    │{"err":"No...│5837 │
└──────────────────┴──────┴──────────────────┴────────┴─────────────┴─────┘
```

---

## 🔍 Troubleshooting Decision Tree

```
                   Invoice Generation Failed?
                            │
                            v
                  Check Error Message
                            │
        ┌───────────────────┼──────────────────┐
        v                   v                  v
  "No HTML file"      "Sheet not found"   "InvoiceId not found"
        │                   │                  │
        v                   v                  v
  QUICK_FIX.md       Run setupWorkbook    Check spelling
  Add Invoice.html   OR add overrides     Check _Logs for
                     in Settings          normalized key
        │                   │                  │
        v                   v                  v
    ✅ FIXED            ✅ FIXED           ✅ FIXED

                  PDF Generated but...
                            │
        ┌───────────────────┼──────────────────┐
        v                   v                  v
  Logo missing      Tax wrong             Email not sent
        │                   │                  │
        v                   v                  v
  Check LogoUrl     Check TaxProfile      Check client
  Must be public    Check Taxable flags   email exists
  Test in browser   Check TaxProfiles     Check _Logs
        │                   │                  │
        v                   v                  v
    ✅ FIXED            ✅ FIXED           ✅ FIXED
```

---

## 📊 Tax Calculation Example

```
Invoice: INV001
TaxProfile: HST_ON (13%)

Line Items:
┌──────────────────┬─────┬──────────┬────────────┬─────────┬─────────────┐
│ Item             │ Qty │   Rate   │  Extended  │ Taxable │ Tax Base    │
├──────────────────┼─────┼──────────┼────────────┼─────────┼─────────────┤
│ LED Video Wall   │  1  │ 2,500.00 │  2,500.00  │  TRUE   │  2,500.00   │
│ Installation     │  4  │   150.00 │    600.00  │  TRUE   │    600.00   │
│ Delivery Fee     │  1  │   100.00 │    100.00  │  FALSE  │      0.00   │
└──────────────────┴─────┴──────────┴────────────┴─────────┴─────────────┘
                                         │
                                         v
                            ┌─────────────────────────┐
                            │ CALCULATION STEPS       │
                            ├─────────────────────────┤
                            │ Subtotal:               │
                            │   2,500 + 600 + 100     │
                            │   = 3,200.00            │
                            │                         │
                            │ Tax Base (taxable only):│
                            │   2,500 + 600           │
                            │   = 3,100.00            │
                            │                         │
                            │ Tax (13% of base):      │
                            │   3,100 × 0.13          │
                            │   = 403.00              │
                            │                         │
                            │ Total:                  │
                            │   3,200 + 403           │
                            │   = 3,603.00            │
                            └─────────────────────────┘
```

---

## 🎯 One-Page Quick Reference

```
╔═══════════════════════════════════════════════════════════════════════╗
║                PIXELWERX INVOICE GENERATOR QUICK REF                  ║
╚═══════════════════════════════════════════════════════════════════════╝

🚨 ERROR: "No HTML file named Invoice was found"
   FIX: Apps Script → Click "+" → HTML → Name "Invoice" → Paste content

📁 Required Files in Apps Script:
   ✓ Code.gs (from CODE.GS)
   ✓ Invoice.html (from INVOICE.HTML)

📊 Required Sheets in Google Sheet:
   ✓ Invoices      ✓ LineItems      ✓ Clients
   ✓ Settings      ✓ _Logs (auto-created)

⚙️ Settings Sheet Keys:
   CompanyName, CompanyEmail, CompanyPhone, CompanyAddress
   HSTNumber, LogoUrl, DefaultCurrency, TaxProfiles

🎨 Generate Invoice:
   1. Select row in Invoices sheet
   2. Invoices menu → Generate PDF for selected row
   3. Check Drive for PDF

📧 Email Invoice:
   1. Ensure client has email in Clients sheet
   2. Invoices menu → Generate + Email for selected row

🔍 Debug:
   • Check _Logs sheet for errors
   • Run diagnoseLookup to verify sheet detection
   • See TROUBLESHOOTING_GUIDE.md

💡 Tax Calculation:
   Tax = (Sum of taxable items) × TaxProfile rate
   Only items with Taxable=TRUE contribute to tax base

📞 Key Documents:
   QUICK_FIX.md              → 5-min fix
   TROUBLESHOOTING_GUIDE.md  → Comprehensive help
   TESTING_CHECKLIST.md      → Full test suite
   README.md                 → Complete documentation

╚═══════════════════════════════════════════════════════════════════════╝
```

---

**Created:** October 20, 2025  
**Purpose:** Visual reference for setup and troubleshooting  
**See Also:** README.md, QUICK_FIX.md, TROUBLESHOOTING_GUIDE.md
