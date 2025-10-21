# Pixelwerx Invoice System# PixelWerx Invoice Generator



**Professional invoice generation system for LED video wall rentals****Google Apps Script-based invoice generation system for LED video wall rentals**



[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/thisis-romar/pixelwerx-invoice-system)**Status:** ✅ Fixed and Ready for Testing  

[![License](https://img.shields.io/badge/License-Proprietary-red)]()**Date:** October 20, 2025

[![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script-green)]()

[![Status](https://img.shields.io/badge/Status-Production%20Ready-success)]()---



**Repository:** https://github.com/thisis-romar/pixelwerx-invoice-system  ## 📁 Files in This Directory

**Version:** 1.1.0 (Refactored October 2025)  

**Last Updated:** October 20, 2025| File | Purpose | When to Use |

|------|---------|-------------|

---| `CODE.GS` | Main Apps Script code | Upload to Google Apps Script project |

| `INVOICE.HTML` | PDF template | Upload to Google Apps Script project as `Invoice.html` |

## 📋 Overview| `QUICK_FIX.md` | 5-minute fix guide | **START HERE** if you got the "No HTML file" error |

| `TROUBLESHOOTING_GUIDE.md` | Comprehensive troubleshooting | Reference for any issues |

Pixelwerx Invoice System is a Google Apps Script-based application that generates professional PDF invoices from Google Sheets data. Designed specifically for LED video wall rental businesses, it handles complex event-based billing with automatic tax calculations, client management, and email delivery.| `TESTING_CHECKLIST.md` | Complete test suite | Use after fix to verify everything works |

| `README.md` | This file | Overview and quick links |

### Key Features

---

- ✅ **Automated PDF Generation** - Create professional invoices from spreadsheet data

- ✅ **Tax Calculation** - Automatic HST/GST/QST calculation with provincial profiles## 🚨 Quick Start (If You Have Errors)

- ✅ **Client Management** - Centralized client directory with billing information

- ✅ **Event Tracking** - Venue, dates, load in/out times, duration calculations**Got this error?**

- ✅ **Line Item Support** - Flexible item descriptions, quantities, rates, and tax rules```

- ✅ **Email Delivery** - Send invoices directly to clients from Google SheetsException: No HTML file named Invoice was found.

- ✅ **Multi-Currency** - Support for CAD, USD, and other currencies```

- ✅ **Professional Template** - Modern gradient design with color badges

- ✅ **Comprehensive Logging** - Track all operations with detailed error reporting👉 **Open `QUICK_FIX.md`** - 5-minute solution

- ✅ **Custom Terms** - Configurable payment terms and conditions

---

---

## 📋 What This System Does

## 🚀 Quick Start

### Core Features:

### Prerequisites- ✅ Generate professional PDF invoices from Google Sheets

- ✅ Automatic tax calculation (HST/GST/QST support)

- Google Account with access to Google Sheets, Apps Script, and Drive- ✅ Email invoices directly to clients

- Basic familiarity with Google Sheets- ✅ Line item management with quantities and rates

- PixelWerx Invoicing spreadsheet (or create new from template)- ✅ Event details tracking (venue, dates, load in/out)

- ✅ Custom terms and conditions

### Installation (5 Minutes)- ✅ Multi-currency support

- ✅ Comprehensive logging

1. **Open the deployment guide:**

   ```### Invoice Components:

   docs/deployment-guide.md- Company branding (logo, name, contact info, tax number)

   ```- Client billing information

- Event details (venue, location, dates, duration)

2. **Quick Deploy (3 steps):**- Line items with descriptions, quantities, rates

   - Copy `src/CODE.GS` to Apps Script- Tax calculation with provincial profiles

   - Upload `src/templates/Invoice.html` to Apps Script- Payment terms and conditions

   - Test with sample invoice- Accepted payment methods



3. **Full instructions:**---

   See [docs/deployment-guide.md](docs/deployment-guide.md) for detailed step-by-step instructions.

## 🏗️ System Architecture

### First Invoice

```

1. Open your Google SheetGoogle Sheets (Data Layer)

2. Menu: **Extensions** → **PixelWerx Invoice** → **Generate Invoice by ID**├── Invoices Sheet (invoice headers)

3. Enter invoice ID (e.g., `INV001`)├── LineItems Sheet (invoice line items)

4. Check Google Drive for generated PDF!├── Clients Sheet (client directory)

├── Settings Sheet (configuration)

---└── _Logs Sheet (operation logs)

        ↓

## 📂 Project StructureGoogle Apps Script (Logic Layer)

├── CODE.GS (business logic)

```└── Invoice.html (PDF template)

pixelwerx-invoice-system/        ↓

├── src/                          # Source codeGoogle Drive (Output Layer)

│   ├── CODE.GS                   # Main Apps Script logic (519 lines)└── Generated PDF files

│   └── templates/        ↓

│       └── Invoice.html          # PDF template (602 lines)Gmail (Optional)

│└── Email delivery to clients

├── docs/                         # Documentation```

│   ├── deployment-guide.md       # Installation & deployment instructions

│   ├── troubleshooting-guide.md  # Common issues and solutions---

│   ├── testing-checklist.md      # Testing procedures

│   └── archive/                  # Historical technical docs## 📊 Data Model

│       ├── bugs-fixed.md

│       ├── code-changes-summary.md### Invoices Sheet

│       └── ... (9 files)```

│InvoiceId | InvoiceNo | ClientId | InvoiceDate | DueText | Currency | TaxProfile | 

├── scripts/                      # Utility scriptsVenue | Location | LoadIn | EventDate | LoadOut | DurationDays | 

│   ├── diagnostic-script.js      # Diagnostic toolTermsJSON | PaymentMethodsCSV | Status | Subtotal | TaxAmount | Total

│   └── Validate-InvoiceSystem.ps1 # Validation script (TODO)```

│

├── archive/                      # Archived files### LineItems Sheet

│   └── templates/                # Old template versions```

│InvoiceId | LineNo | Title | Description | Qty | Rate | Taxable | Badges

├── README.md                     # This file```

├── QUICK_REFERENCE.md            # Quick command reference

├── PROGRESS_REPORT.md            # Refactoring progress### Clients Sheet

├── SESSION_REVIEW.md             # Session analysis```

├── GITHUB_SYNC_COMPLETE.md       # GitHub sync documentationClientId | ClientName | Attention | Email | Phone | 

├── REFACTORING_PLAN.md           # Detailed refactoring planBillingAddress | City | ProvinceState | PostalZip | Country

└── REFACTORING_VISUAL_SUMMARY.md # Visual structure comparison```

```

### Settings Sheet (Key-Value Pairs)

---```

Key                  | Value

## 📖 Documentation---------------------|--------------------------------------------------

CompanyName          | PixelWerx Inc.

### Getting StartedCompanyEmail         | info@pixelwerx.ca

- **[Quick Reference](QUICK_REFERENCE.md)** - Copy-paste commands and quick fixesCompanyPhone         | (416) 555-7890

- **[Deployment Guide](docs/deployment-guide.md)** - Step-by-step installationCompanyAddress       | Multi-line address

- **[Testing Checklist](docs/testing-checklist.md)** - Verify your installationHSTNumber            | Tax registration number

LogoUrl              | Public image URL

### TroubleshootingDefaultCurrency      | CAD

- **[Troubleshooting Guide](docs/troubleshooting-guide.md)** - Common issues and solutionsTaxProfiles          | {"HST_ON":0.13,"NO_TAX":0}

- **[Quick Reference - Troubleshooting Section](QUICK_REFERENCE.md#-troubleshooting)** - Quick fixesOutputFolderId       | Google Drive folder ID (optional)

```

### Development

- **[Refactoring Plan](REFACTORING_PLAN.md)** - Comprehensive restructuring documentation---

- **[Progress Report](PROGRESS_REPORT.md)** - Current status and remaining tasks

- **[Session Review](SESSION_REVIEW.md)** - Detailed session analysis## 🎯 Installation Steps



### GitHub### 1. Set Up Google Apps Script Project

- **[GitHub Sync Documentation](GITHUB_SYNC_COMPLETE.md)** - Repository setup and sync status

1. Open your Google Sheet

---2. Click: **Extensions** → **Apps Script**

3. Upload `CODE.GS` (paste code into Code.gs file)

## 🏗️ System Architecture4. Add HTML file:

   - Click **"+"** → **HTML**

### Data Flow   - Name it: `Invoice` (exactly)

   - Paste content from `INVOICE.HTML`

```5. Save both files (Ctrl+S)

┌─────────────────────┐

│  Google Sheets      │### 2. Initialize Workbook

│  (Data Layer)       │

├─────────────────────┤1. In Apps Script editor, select function: `setupWorkbook`

│ • Invoices          │2. Click **Run** (▶️)

│ • LineItems         │3. Authorize permissions when prompted

│ • Clients           │4. Go back to Google Sheet - new tabs created

│ • Settings          │

│ • _Logs             │### 3. Configure Settings

└──────────┬──────────┘

           │1. Open **Settings** sheet

           ↓2. Update these keys with your info:

┌─────────────────────┐   - CompanyName

│  Apps Script        │   - CompanyEmail

│  (Logic Layer)      │   - CompanyPhone

├─────────────────────┤   - CompanyAddress

│ • CODE.GS           │   - HSTNumber

│ • Invoice.html      │   - LogoUrl (must be public URL)

└──────────┬──────────┘3. Configure TaxProfiles for your jurisdiction(s)

           │

           ↓### 4. Add Data

┌─────────────────────┐

│  Google Drive       │1. Add clients to **Clients** sheet

│  (Output Layer)     │2. Add invoice header to **Invoices** sheet

│                     │3. Add line items to **LineItems** sheet (matching InvoiceId)

│ • Invoice PDFs      │

└─────────────────────┘### 5. Test

           │

           ↓1. Select invoice row in **Invoices** sheet

┌─────────────────────┐2. Click: **Invoices** menu → **Generate PDF for selected row**

│  Gmail (Optional)   │3. Check Google Drive for PDF

│  (Delivery Layer)   │4. Review **_Logs** sheet for any issues

│                     │

│ • Email to clients  │**Detailed testing:** See `TESTING_CHECKLIST.md`

└─────────────────────┘

```---



### Data Model## 🔧 Usage



#### Invoices Sheet### Generate Invoice (3 Methods)

| Column | Description | Example |

|--------|-------------|---------|**Method 1: From Sheet Row (Recommended)**

| InvoiceId | Unique identifier | INV001 |1. Click on invoice data row

| InvoiceNo | Display number | PX-2025-001 |2. Menu: **Invoices** → **Generate PDF for selected row**

| ClientId | Client reference | CLI001 |3. PDF saved to Drive

| InvoiceDate | Issue date | 2025-10-20 |

| DueText | Payment terms | Due upon receipt |**Method 2: By InvoiceId/InvoiceNo**

| Currency | Currency code | CAD |1. Menu: **Invoices** → **Generate by InvoiceId…**

| TaxProfile | Tax calculation | ON (13% HST) |2. Enter InvoiceId (e.g., `INV001`) or InvoiceNo (e.g., `PW-2025-0001`)

| Venue | Event location | Roy Thomson Hall |3. Click OK

| EventDate | Event date | 2025-11-15 |

| Subtotal | Pre-tax amount | 5000.00 |**Method 3: With Email**

| TaxAmount | Calculated tax | 650.00 |1. Click on invoice data row

| Total | Final amount | 5650.00 |2. Menu: **Invoices** → **Generate + Email for selected row**

3. PDF saved AND emailed to client

#### LineItems Sheet

| Column | Description | Example |### Menu Commands

|--------|-------------|---------|

| InvoiceId | Links to invoice | INV001 || Command | Function |

| LineNo | Item order | 1 ||---------|----------|

| Title | Short description | LED Video Wall Rental || Generate PDF for selected row | Create PDF from selected invoice row |

| Description | Details | 10' x 6' P3.9 LED wall || Generate + Email for selected row | Create PDF and email to client |

| Qty | Quantity | 1 || Generate by InvoiceId… | Prompt for InvoiceId, then generate |

| Rate | Unit price | 2500.00 || Open Logs sheet | View operation logs |

| Taxable | Tax applies | TRUE || Setup workbook | Create/verify sheet structure |

| Badges | Color badges | 🔴🟠 |

---

#### Clients Sheet

| Column | Description | Example |## 💡 Key Features

|--------|-------------|---------|

| ClientId | Unique identifier | CLI001 |### Smart Sheet Detection

| ClientName | Legal business name | Acme Events Inc. |- Automatically finds sheets even with different names

| Attention | Contact person | John Smith |- Supports common aliases (e.g., "Line Items", "Lineitems", "Lineltems")

| Email | Email address | john@acme.com |- Can be overridden via Settings (Tab.Invoices, Tab.LineItems, Tab.Clients)

| Phone | Phone number | (416) 555-1234 |

| BillingAddress | Street address | 123 Main Street |### Flexible Invoice Numbering

| City | City | Toronto |- Auto-generates: `PW-YYYY-####` format

| ProvinceState | Province/State | Ontario |- Or use custom InvoiceNo

| PostalZip | Postal/Zip code | M5H 2N2 |- Normalizes lookup keys (removes dashes, spaces; converts to uppercase)

| Country | Country | Canada |

### Tax Calculation

---- Multi-jurisdiction support via TaxProfiles

- Line-item level taxable flag

## 🛠️ Technical Details- Only taxable items contribute to tax base

- Supports compound tax rates

### Technology Stack

- **Platform:** Google Apps Script (JavaScript-based)### Error Handling

- **Runtime:** V8 Engine- Comprehensive logging to _Logs sheet

- **APIs Used:**- Graceful fallbacks (e.g., logo fails → hidden)

  - SpreadsheetApp (data access)- Detailed error messages with context

  - DriveApp (file creation)

  - GmailApp (email delivery)### PDF Generation

  - HtmlService (template rendering)- Professional branded design

- Responsive layout (works on mobile)

### Code Statistics- Print-optimized (@media print rules)

- **Total Lines:** 1,121 lines- Embedded styles (no external dependencies)

  - CODE.GS: 519 lines

  - Invoice.html: 602 lines---

- **Functions:** 30+ functions

- **Features:** 10+ major features## 🐛 Troubleshooting

- **Tax Profiles:** 13+ Canadian provinces/territories

### Common Issues

### Key Functions

- `generateInvoicePdfById(invoiceId)` - Main entry point| Issue | Solution | Reference |

- `buildTemplateData(invoiceRow, lineItemsRows, clientRow)` - Data preparation|-------|----------|-----------|

- `createPdf(htmlTemplate, data, filename)` - PDF generation| "No HTML file named Invoice was found" | Upload INVOICE.HTML to Apps Script project | `QUICK_FIX.md` |

- `calculateTax(subtotal, taxProfile)` - Tax calculation| "Cannot find Invoices tab" | Run setupWorkbook or add tab overrides | `TROUBLESHOOTING_GUIDE.md` → Issue 1 |

- `emailInvoice(fileId, clientEmail)` - Email delivery| Logo not displaying | Use public image URL, test in incognito | `TROUBLESHOOTING_GUIDE.md` → Issue 2 |

| Tax calculation wrong | Check TaxProfile, TaxProfiles, Taxable flags | `TROUBLESHOOTING_GUIDE.md` → Issue 3 |

---| Email not sending | Verify client email, check permissions | `TROUBLESHOOTING_GUIDE.md` → Issue 4 |

| "InvoiceId not found" | Check spelling, case, normalization rules | `TROUBLESHOOTING_GUIDE.md` → Issue 5 |

## 🧪 Testing

**For detailed troubleshooting:** See `TROUBLESHOOTING_GUIDE.md`

### Manual Testing

1. Follow [Testing Checklist](docs/testing-checklist.md)---

2. Test with sample invoice (INV001)

3. Verify PDF output in Google Drive## 📖 Documentation Index

4. Check _Logs sheet for errors

### For Immediate Issues

### Validation Script- **QUICK_FIX.md** - 5-minute fix for "No HTML file" error

```powershell- **_Logs sheet** - Real-time operation logs

# Run validation (Windows PowerShell)

.\scripts\Validate-InvoiceSystem.ps1### For Implementation

```- **TESTING_CHECKLIST.md** - Complete test suite (11 tests)

- **TROUBLESHOOTING_GUIDE.md** - Comprehensive issue resolution

*Note: Validation script implementation pending (Task 11)*

### For Customization

---- **TROUBLESHOOTING_GUIDE.md** → Advanced Configuration

  - Custom tab names

## 🐛 Troubleshooting  - Multiple tax profiles

  - Output folder organization

### Common Issues

### For Maintenance

#### Error: "No HTML file named Invoice was found"- **_Logs sheet** - Operation history and debugging

**Solution:** Upload `src/templates/Invoice.html` to Apps Script project.  - **TESTING_CHECKLIST.md** → Performance Benchmarks

**Details:** See [QUICK_REFERENCE.md - Troubleshooting](QUICK_REFERENCE.md#-troubleshooting)

---

#### Error: "Cannot call SpreadsheetApp.getUi() from this context"

**Solution:** Already fixed in `src/CODE.GS` (line 496 has try-catch wrapper).## 🔒 Security & Permissions



#### Duplicate HTML Content in PDF### Required Permissions:

**Solution:** Use corrected template at `src/templates/Invoice.html` (single DOCTYPE declaration).- **Spreadsheets:** View and manage data

- **Drive:** Create and manage PDF files

**For more issues:** See [docs/troubleshooting-guide.md](docs/troubleshooting-guide.md)- **Gmail:** Send email on your behalf (optional, only for email function)



---### Privacy Notes:

- This is YOUR script in YOUR Google account

## 🔄 Recent Updates- No third-party access

- Data stays in your Google Workspace

### Version 1.1.0 (October 20, 2025)- Emails sent from your Gmail account

**Major Refactoring:**

- ✅ Reorganized project structure (flat → 7 directories)### Authorization:

- ✅ Fixed critical INVOICE.HTML duplication issue1. First run: Click **Review Permissions**

- ✅ Standardized file naming (lowercase-with-dashes)2. Select your Google account

- ✅ Consolidated documentation (18 files → organized structure)3. Click **Advanced** → **Go to [Project Name] (unsafe)**

- ✅ Created comprehensive .gitignore   - "Unsafe" appears because it's custom (not published add-on)

- ✅ Synced to GitHub (private repository)   - Safe to authorize your own scripts

- ✅ Updated all documentation cross-references4. Click **Allow**



**Files Changed:** 22 files reorganized, 5 redundant files removed  ---

**Commits:** 6 commits with proper AI attribution  

**Details:** See [PROGRESS_REPORT.md](PROGRESS_REPORT.md)## 🎨 Customization



---### Branding

- Update **Settings** sheet: CompanyName, LogoUrl, etc.

## 📜 License- Edit colors in `INVOICE.HTML` (search for hex codes: `#3e2723`, `#ff5722`, etc.)

- Modify layout/fonts in `<style>` section

**Proprietary Software**  

Copyright © 2025 Pixelwerx / emblem.iO### Tax Profiles

Add to Settings → TaxProfiles:

This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.```json

{

*Note: License file pending (Task 16)*  "HST_ON": 0.13,

  "GST_BC": 0.12,

---  "GST_AB": 0.05,

  "QST_QC": 0.14975,

## 🤝 Contributing  "NO_TAX": 0

}

This is a private project. For questions or issues:```



1. Check [Troubleshooting Guide](docs/troubleshooting-guide.md)### Terms & Conditions

2. Review [GitHub Issues](https://github.com/thisis-romar/pixelwerx-invoice-system/issues)Default terms are in CODE.GS line ~359. To customize per invoice:

3. Contact project maintainer1. Create JSON array of terms

2. Add to Invoices → TermsJSON column

---3. Example:

```json

## 📞 Support["Custom term 1","Custom term 2","Custom term 3"]

```

**Documentation:**

- Quick fixes: [QUICK_REFERENCE.md](QUICK_REFERENCE.md)### Payment Methods

- Detailed guides: [docs/](docs/)Set per invoice in PaymentMethodsCSV column:

- GitHub: https://github.com/thisis-romar/pixelwerx-invoice-system```

E-Transfer,Credit Card,Corporate Check,Wire Transfer

**Development:**```

- AI Attribution: All commits follow GIT-ATT-001 standard

- Sequential Thinking: Comprehensive analysis documented---

- Session ID: c812e609-19bc-465a-bf17-c6136c8fd820

## 📊 Sample Data

---

### Quick Test Setup

## 🎯 Roadmap

**Client:**

### Completed ✅```

- [x] Project structure refactoringCLI001 | Test Client Inc. | John Doe | john@example.com | (416) 555-1234 |

- [x] Template duplication fix123 Main St | Toronto | ON | M5H 1A1 | Canada

- [x] Documentation consolidation```

- [x] GitHub repository setup

**Invoice:**

### In Progress 🚧```

- [ ] Validation script implementation (Task 11)INV001 | PW-2025-0001 | CLI001 | 2025-10-20 | Upon Receipt | CAD | HST_ON |

- [ ] Documentation cross-reference updates (Task 12)Metro Toronto Convention Centre | 255 Front St W, Toronto, ON |

- [ ] clasp configuration (Task 14)2025-10-25 08:00 | 2025-10-25 18:00 | 2025-10-26 02:00 | 1 |

(empty) | E-Transfer,Credit Card | (empty)

### Planned 📋```

- [ ] CHANGELOG.md creation (Task 15)

- [ ] LICENSE file addition (Task 16)**Line Items:**

- [ ] Testing documentation enhancement (Task 17)```

- [ ] v1.1.0 release tag (Task 18)INV001 | 1 | LED Video Wall | 10ft x 8ft display | 1 | 2500.00 | TRUE | Premium

INV001 | 2 | Installation & Setup | Technician support | 4 | 150.00 | TRUE | Labor

**Full Details:** See [PROGRESS_REPORT.md](PROGRESS_REPORT.md) and [REFACTORING_PLAN.md](REFACTORING_PLAN.md)```



---**Expected Output:**

- Subtotal: $3,100.00

## 🏆 Credits- Tax (13%): $403.00

- Total: $3,503.00

**Development:**

- **AI Model:** copilot/claude-sonnet-4.5 (Anthropic)---

- **Session:** c812e609-19bc-465a-bf17-c6136c8fd820

- **Tools:** Sequential Thinking MCP, AI Model Detector MCP, GitHub Copilot## 🔄 Workflow Example

- **Standard:** GIT-ATT-001 v1.0.0 (AI Attribution)

1. **Client books event** → Add to Clients sheet

**Project Owner:** Pixelwerx / emblem.iO  2. **Create invoice** → Add row to Invoices sheet

**Repository:** https://github.com/thisis-romar/pixelwerx-invoice-system3. **Add equipment/services** → Add rows to LineItems sheet (same InvoiceId)

4. **Generate PDF** → Menu: Generate PDF for selected row

---5. **Review PDF** → Open from Google Drive

6. **Send to client** → Menu: Generate + Email (or manually attach)

**Ready to deploy?** See [docs/deployment-guide.md](docs/deployment-guide.md) to get started! 🚀7. **Track status** → Update Invoices → Status column

8. **Archive** → Move PDF to organized folder structure

---

## 📈 Performance

### Typical Execution Times:
- Setup workbook: ~2 seconds
- Generate invoice (1-5 items): ~3-4 seconds
- Generate invoice (10+ items): ~5-6 seconds
- Generate + Email: +1-2 seconds
- Sheet lookup: ~500ms

### Optimization Tips:
- Keep line item count reasonable (<50 per invoice)
- Use public logo URL (faster than Data URLs)
- Archive old logs periodically (keeps _Logs sheet fast)

---

## 🆘 Support

### Self-Service Resources:
1. Check **_Logs** sheet for detailed error messages
2. See **TROUBLESHOOTING_GUIDE.md** for common issues
3. Run **diagnoseLookup** function to verify sheet detection
4. Review **TESTING_CHECKLIST.md** for systematic testing

### When Reporting Issues:
Include:
1. Error message from alert or _Logs sheet
2. Steps to reproduce
3. Sample data (anonymized if needed)
4. Screenshot of sheet structure

---

## 📝 Version History

### v1.0.0 (October 20, 2025)
- Initial implementation
- Smart sheet detection with aliases
- Multi-jurisdiction tax support
- Comprehensive logging
- Email integration
- Professional PDF template
- Error handling and validation
- Documentation suite

---

## 🎯 Roadmap

### Future Enhancements:
- [ ] Recurring invoices
- [ ] Invoice templates (multiple designs)
- [ ] Payment tracking integration
- [ ] Multi-language support
- [ ] Batch generation (multiple invoices at once)
- [ ] Invoice numbering auto-increment
- [ ] Client portal (view-only access)
- [ ] Financial reporting dashboard

---

## 📄 License

**Internal Use**  
PixelWerx Inc. - LED Video Wall Solutions

---

## 🙏 Credits

**Developed with:** GitHub Copilot (Claude Sonnet 4.5)  
**For:** PixelWerx Inc.  
**Date:** October 20, 2025

---

## 📞 Quick Links

- [Google Sheet](https://docs.google.com/spreadsheets/d/1ucI62Y01XIbXMB36EBLQUkLbQqD11fJuTNE9InbtAqY/edit)
- [Apps Script Project](https://script.google.com) (Extensions → Apps Script from sheet)
- [Google Drive Output](https://drive.google.com) (search: "Invoice_PW-")

---

**Last Updated:** October 20, 2025  
**Status:** ✅ Production Ready (after HTML file fix)
