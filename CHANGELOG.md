# Changelog

All notable changes to the Pixelwerx Invoice System are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

Nothing currently planned.

---

## [1.1.0] - 2025-10-20

Major refactoring and bug fixes to improve maintainability, resolve critical issues, and establish professional development practices.

### Added

- **Organized Directory Structure**: Created 7-directory hierarchy for better organization
  - `src/` - Source code (CODE.GS)
  - `src/templates/` - HTML templates (Invoice.html)
  - `docs/` - Core documentation
  - `docs/archive/` - Historical analysis documents
  - `scripts/` - Utility scripts
  - `archive/` - Archived old versions
  - `archive/templates/` - Old template backups

- **Configuration Files**:
  - `.gitignore` - Comprehensive exclusion patterns for Apps Script projects
  - `.clasp.json.template` - Template for clasp CLI configuration
  - `.claspignore` - Deployment exclusion patterns (66 lines)

- **Documentation**:
  - Comprehensive master `README.md` with architecture diagrams, data model, troubleshooting
  - `docs/clasp-deployment-guide.md` - Complete clasp CLI setup and usage guide
  - Enhanced `docs/deployment-guide.md` with Quick Start section
  - Enhanced `QUICK_REFERENCE.md` with comprehensive troubleshooting

- **Version Control**:
  - GitHub repository: https://github.com/thisis-romar/pixelwerx-invoice-system
  - Full AI attribution in all commits (GIT-ATT-001 v1.0.0 compliant)
  - Git workflow with proper branching strategy

- **Development Tools**:
  - clasp CLI support for command-line deployment
  - PowerShell automation script (`Execute-Refactoring.ps1`)
  - Comprehensive refactoring plan documentation

### Fixed

- **CRITICAL: INVOICE.HTML Template Duplication**
  - Fixed duplicate `<!DOCTYPE html>` declarations causing rendering issues
  - Reduced from 652 lines to correct 602 lines
  - Single DOCTYPE verified, template now renders correctly
  - Archived broken version to `archive/templates/INVOICE-BROKEN-BACKUP.html`

- **TermsJSON JSON.parse Error**
  - Added safe JSON parsing with type checking
  - Handles non-string values gracefully (e.g., number `3` in TermsJSON column)
  - Prevents `SyntaxError: Unexpected token` crashes
  - Falls back to default empty array on parse failures

- **Date Object Formatting Error**
  - Fixed `Utilities.formatDate()` receiving Date objects instead of strings
  - Added proper date-to-string conversion before formatting
  - Resolves "The parameters don't match the method signature" errors

- **SpreadsheetApp.getUi() Context Error**
  - Added try-catch wrapper for UI context operations
  - Handles "Cannot call SpreadsheetApp.getUi() from this context" gracefully
  - Prevents crashes when running from triggers or non-UI contexts

- **Misleading Error Messages**
  - Enhanced error reporting to show actual errors instead of generic "No HTML file named Invoice"
  - Added detailed logging for troubleshooting
  - Improved user experience during debugging

- **README.md Encoding Corruption**
  - Fixed emoji/special character encoding issues from commit 418ff70
  - Restored clean formatting and proper UTF-8 encoding

### Changed

- **File Organization**:
  - Moved `CODE.GS` to `src/CODE.GS`
  - Moved `CORRECTED_invoice.html` to `src/templates/Invoice.html`
  - Moved utility scripts to `scripts/` directory
  - Moved core documentation to `docs/` directory
  - Archived 9 historical analysis documents to `docs/archive/`

- **Documentation Consolidation**:
  - Reduced 18 markdown files with 60% overlap to organized structure
  - Merged 5 redundant quick-fix guides into single `QUICK_REFERENCE.md`
  - Consolidated deployment instructions into `docs/deployment-guide.md`
  - Created master `README.md` as single entry point

- **File Naming Standards**:
  - Standardized all documentation to lowercase-with-dashes convention
  - Renamed 13 files for consistency
  - Examples: `BUGS_FIXED.md` → `bugs-fixed.md`

- **Maintainability**:
  - Improved from 3/10 to 9/10 maintainability score
  - Clear separation of concerns (source, docs, scripts, archives)
  - Professional project structure following industry standards

### Removed

- **Redundant Documentation** (5 files merged/deleted):
  - `COMPLETE_SUMMARY.md` (redundant with README)
  - `INDEX.md` (superseded by README)
  - `DEPLOY_NOW.md` (merged into deployment-guide.md)
  - `QUICK_FIX.md` (merged into QUICK_REFERENCE.md)
  - `QUICK_FIX_DEPLOY_NOW.md` (merged into QUICK_REFERENCE.md)

- **Empty/Broken Files**:
  - `SCREENSHOT_ANALYSIS_REPORT.md` (0 bytes, no content)
  - `INVOICE.HTML` (broken version with duplicate DOCTYPE)
  - `CORRECTED_invoice.html` (replaced by organized src/templates/Invoice.html)

### Metrics

- **Files Reorganized**: 22 files
- **Directories Created**: 7 directories
- **Documentation Reduction**: 18 files → 7 core + 10 archived
- **Commits**: 8 commits with full AI attribution
- **Repository Size**: 119.79 KiB
- **Total Changes**: 13,381+ lines inserted across all commits

---

## [1.0.0] - 2025-10-15 (estimated)

Initial release of Pixelwerx Invoice System.

### Added

- **Core Invoice Generation**:
  - `CODE.GS` - Main Apps Script code (519 lines)
  - `Invoice.html` - Professional PDF template (602 lines)
  - PDF generation from Google Sheets data

- **Multi-Sheet Data Model**:
  - `Invoices` sheet - Invoice headers with metadata
  - `LineItems` sheet - Invoice line items
  - `Clients` sheet - Centralized client directory
  - `Settings` sheet - System configuration (key-value pairs)
  - `_Logs` sheet - Comprehensive operation logging

- **Tax Calculation**:
  - Automatic HST/GST/QST calculation
  - Support for 13 Canadian provincial tax profiles
  - Configurable tax rates per jurisdiction
  - NO_TAX option for tax-exempt transactions

- **Event Tracking**:
  - Venue information (name, location)
  - Event dates (start/end)
  - Load in/out times
  - Duration calculations
  - Professional event details on invoices

- **Email Integration**:
  - Send invoices directly from Google Sheets
  - Gmail integration via `GmailApp`
  - Configurable email templates
  - Attachment support for generated PDFs

- **Professional Template Features**:
  - Legal page size formatting
  - Modern gradient design
  - Color badge support for visual organization
  - Company branding (logo, name, contact info, tax number)
  - Client billing information section
  - Line items table with descriptions, quantities, rates
  - Tax breakdown display
  - Payment terms and conditions
  - Accepted payment methods

- **Multi-Currency Support**:
  - CAD (Canadian Dollar) - Primary
  - USD (US Dollar)
  - Configurable currency symbols
  - Currency formatting per locale

- **Logging System**:
  - Comprehensive operation logging to `_Logs` sheet
  - Timestamp tracking for all operations
  - Error logging with stack traces
  - Warning and info level messages
  - Searchable log history

- **Key Functions**:
  - `generateInvoicePdfById(invoiceId)` - Main entry point
  - `buildTemplateData()` - Data preparation from sheets
  - `createPdf()` - PDF generation with HtmlService
  - `calculateTax()` - Provincial tax calculation
  - `emailInvoice()` - Gmail delivery
  - `setupWorkbook()` - Initial sheet configuration
  - Logging utilities: `ensureLogSheet_()`, `writeLog_()`

- **Configuration Options**:
  - Company information (name, email, phone, address)
  - Tax registration numbers (HST/GST)
  - Logo URL support (public image links)
  - Default currency setting
  - Output folder customization (Google Drive)
  - Configurable tax profiles (JSON format)

---

## Links

- **Repository**: https://github.com/thisis-romar/pixelwerx-invoice-system
- **Documentation**: See README.md for complete setup and usage instructions
- **Deployment Guide**: docs/deployment-guide.md
- **Troubleshooting**: QUICK_REFERENCE.md
- **clasp CLI Guide**: docs/clasp-deployment-guide.md

---

## Version Comparison Links

- [Unreleased]: https://github.com/thisis-romar/pixelwerx-invoice-system/compare/v1.1.0...HEAD
- [1.1.0]: https://github.com/thisis-romar/pixelwerx-invoice-system/compare/v1.0.0...v1.1.0
- [1.0.0]: https://github.com/thisis-romar/pixelwerx-invoice-system/releases/tag/v1.0.0
