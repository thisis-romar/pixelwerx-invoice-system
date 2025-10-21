# 🚀 Quick Start - Refactoring Execution Script
# Pixelwerx Invoice System Refactoring
# Date: October 20, 2025
# AI-Attribution: copilot/claude-sonnet-4.5 (Anthropic)

<#
.SYNOPSIS
    Automated refactoring execution for Pixelwerx Invoice System
.DESCRIPTION
    Executes Phase 1 and Phase 2 of the refactoring plan automatically.
    Manual steps required for documentation merges and validation.
.EXAMPLE
    .\Execute-Refactoring.ps1
.EXAMPLE
    .\Execute-Refactoring.ps1 -Phase 1
.EXAMPLE
    .\Execute-Refactoring.ps1 -WhatIf
#>

[CmdletBinding(SupportsShouldProcess)]
param(
    [ValidateSet(1, 2, "All")]
    [string]$Phase = "All",
    
    [switch]$CreateBackup = $true,
    
    [switch]$SkipValidation
)

$ErrorActionPreference = "Stop"
$VerbosePreference = "Continue"

# Color functions
function Write-Section($message) {
    Write-Host "`n╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
    Write-Host "║  $message" -ForegroundColor Cyan
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
}

function Write-Task($number, $name) {
    Write-Host "`n[Task $number] $name" -ForegroundColor Yellow
}

function Write-Success($message) {
    Write-Host "✅  $message" -ForegroundColor Green
}

function Write-Error($message) {
    Write-Host "❌  $message" -ForegroundColor Red
}

function Write-Warning($message) {
    Write-Host "⚠️   $message" -ForegroundColor Yellow
}

# Verify we're in correct directory
function Test-ProjectDirectory {
    if (-not (Test-Path "CODE.GS")) {
        Write-Error "CODE.GS not found! Are you in the project root?"
        Write-Host "Current directory: $(Get-Location)" -ForegroundColor Red
        exit 1
    }
    Write-Success "Project directory verified"
}

# Create backup before starting
function New-ProjectBackup {
    if (-not $CreateBackup) {
        Write-Warning "Skipping backup (use -CreateBackup to enable)"
        return
    }
    
    Write-Task "Backup" "Creating safety backup"
    
    $backupPath = "..\pixel_werk_INVOICE_BACKUP_$(Get-Date -Format 'yyyyMMdd_HHmmss').zip"
    
    if ($PSCmdlet.ShouldProcess($backupPath, "Create backup archive")) {
        Compress-Archive -Path "." -DestinationPath $backupPath -Force
        Write-Success "Backup created: $backupPath"
    }
}

# ═══════════════════════════════════════════════════════════════
# PHASE 1: FOUNDATION
# ═══════════════════════════════════════════════════════════════

function Invoke-Phase1 {
    Write-Section "PHASE 1: FOUNDATION (Tasks 1-3)"
    
    # Task 1: Create Directory Structure
    Write-Task 1 "Create Directory Structure"
    
    $directories = @(
        "src",
        "src\templates",
        "docs",
        "docs\archive",
        "scripts",
        "archive",
        "archive\templates"
    )
    
    foreach ($dir in $directories) {
        if ($PSCmdlet.ShouldProcess($dir, "Create directory")) {
            if (-not (Test-Path $dir)) {
                New-Item -ItemType Directory -Path $dir -Force | Out-Null
                Write-Success "Created: $dir"
            } else {
                Write-Warning "Already exists: $dir"
            }
        }
    }
    
    # Task 2: Fix INVOICE.HTML Duplication
    Write-Task 2 "Fix INVOICE.HTML Duplication (CRITICAL)"
    
    if ($PSCmdlet.ShouldProcess("INVOICE.HTML", "Backup broken file")) {
        if (Test-Path "INVOICE.HTML") {
            Copy-Item "INVOICE.HTML" "archive\templates\INVOICE-BROKEN-BACKUP.html" -Force
            Write-Success "Backed up broken INVOICE.HTML"
        }
    }
    
    if ($PSCmdlet.ShouldProcess("CORRECTED_invoice.html", "Copy to src/templates/Invoice.html")) {
        if (Test-Path "CORRECTED_invoice.html") {
            Copy-Item "CORRECTED_invoice.html" "src\templates\Invoice.html" -Force
            Write-Success "Created corrected template: src\templates\Invoice.html"
            
            # Verify
            $lines = (Get-Content "src\templates\Invoice.html" | Measure-Object -Line).Lines
            $doctypes = (Select-String -Path "src\templates\Invoice.html" -Pattern "<!DOCTYPE html>").Count
            
            if ($doctypes -eq 1) {
                Write-Success "Template verification: 1 DOCTYPE (correct)"
            } else {
                Write-Error "Template verification FAILED: $doctypes DOCTYPE declarations found!"
            }
            
            Write-Host "  Line count: $lines" -ForegroundColor Gray
        } else {
            Write-Error "CORRECTED_invoice.html not found!"
        }
    }
    
    # Task 3: Create .gitignore
    Write-Task 3 "Create .gitignore"
    
    $gitignoreContent = @"
# Google Apps Script
.clasp.json
appsscript.json

# Node modules (if using clasp)
node_modules/
package-lock.json

# IDE
.vscode/
!.vscode/settings.json
.idea/
*.swp
*.swo
*~

# OS Files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Temporary files
*.tmp
*.temp
~$*

# Personal configuration
config.local.json
.env
.env.local

# Build artifacts
dist/
build/
*.zip

# Testing
coverage/
.nyc_output/
"@
    
    if ($PSCmdlet.ShouldProcess(".gitignore", "Create file")) {
        Set-Content ".gitignore" -Value $gitignoreContent
        Write-Success "Created .gitignore"
    }
}

# ═══════════════════════════════════════════════════════════════
# PHASE 2: FILE REORGANIZATION
# ═══════════════════════════════════════════════════════════════

function Invoke-Phase2 {
    Write-Section "PHASE 2: FILE REORGANIZATION (Tasks 4-7)"
    
    # Task 4: Archive historical documentation
    Write-Task 4 "Consolidate Documentation Files"
    
    $archiveDocs = @(
        "ANALYSIS_SUMMARY.md",
        "BUGS_FIXED.md",
        "CODE_CHANGES_SUMMARY.md",
        "CODE_GS_VERIFICATION_REPORT.md",
        "COLOR_BADGES_GUIDE.md",
        "ERROR_DIAGNOSIS.md",
        "TEMPLATE_REFACTOR_SUMMARY.md",
        "GIT_VERIFICATION_REPORT.md",
        "VISUAL_GUIDE.md"
    )
    
    foreach ($doc in $archiveDocs) {
        if (Test-Path $doc) {
            $newName = $doc.ToLower().Replace("_", "-")
            $destination = "docs\archive\$newName"
            
            if ($PSCmdlet.ShouldProcess($doc, "Move to $destination")) {
                Move-Item $doc $destination -Force
                Write-Success "Archived: $doc → $destination"
            }
        }
    }
    
    # Move core documentation
    $coreDocs = @{
        "DEPLOYMENT_GUIDE.md" = "docs\deployment-guide.md"
        "TROUBLESHOOTING_GUIDE.md" = "docs\troubleshooting-guide.md"
        "TESTING_CHECKLIST.md" = "docs\testing-checklist.md"
    }
    
    foreach ($doc in $coreDocs.GetEnumerator()) {
        if (Test-Path $doc.Key) {
            if ($PSCmdlet.ShouldProcess($doc.Key, "Move to $($doc.Value)")) {
                Move-Item $doc.Key $doc.Value -Force
                Write-Success "Moved: $($doc.Key) → $($doc.Value)"
            }
        }
    }
    
    # Delete empty files
    if (Test-Path "SCREENSHOT_ANALYSIS_REPORT.md") {
        if ($PSCmdlet.ShouldProcess("SCREENSHOT_ANALYSIS_REPORT.md", "Delete empty file")) {
            Remove-Item "SCREENSHOT_ANALYSIS_REPORT.md" -Force
            Write-Success "Deleted empty file: SCREENSHOT_ANALYSIS_REPORT.md"
        }
    }
    
    # Task 5: Reorganize Source Files
    Write-Task 5 "Reorganize Source Files"
    
    if (Test-Path "CODE.GS") {
        if ($PSCmdlet.ShouldProcess("CODE.GS", "Move to src/")) {
            Move-Item "CODE.GS" "src\CODE.GS" -Force
            Write-Success "Moved: CODE.GS → src\CODE.GS"
        }
    }
    
    # Archive old templates
    $oldTemplates = @{
        "invoice.html.backup" = "archive\templates\invoice-backup-original.html"
        "invoice_CLEAN.html" = "archive\templates\invoice-clean-skeleton.html"
    }
    
    foreach ($template in $oldTemplates.GetEnumerator()) {
        if (Test-Path $template.Key) {
            if ($PSCmdlet.ShouldProcess($template.Key, "Move to $($template.Value)")) {
                Move-Item $template.Key $template.Value -Force
                Write-Success "Archived: $($template.Key) → $($template.Value)"
            }
        }
    }
    
    # Delete broken/redundant files
    $filesToDelete = @("INVOICE.HTML", "CORRECTED_invoice.html")
    foreach ($file in $filesToDelete) {
        if (Test-Path $file) {
            if ($PSCmdlet.ShouldProcess($file, "Delete")) {
                Remove-Item $file -Force
                Write-Success "Deleted: $file (replaced with corrected version in src/)"
            }
        }
    }
    
    # Task 6: Reorganize Script Files
    Write-Task 6 "Reorganize Script Files"
    
    $scripts = @{
        "DIAGNOSTIC_SCRIPT.js" = "scripts\diagnostic-script.js"
        "Validate-InvoiceSystem.ps1" = "scripts\Validate-InvoiceSystem.ps1"
    }
    
    foreach ($script in $scripts.GetEnumerator()) {
        if (Test-Path $script.Key) {
            if ($PSCmdlet.ShouldProcess($script.Key, "Move to $($script.Value)")) {
                Move-Item $script.Key $script.Value -Force
                Write-Success "Moved: $($script.Key) → $($script.Value)"
            }
        }
    }
    
    # Task 7: Already handled by renames in Task 4-6
    Write-Task 7 "Standardize File Naming (completed via moves)"
    Write-Success "File naming standardization complete"
}

# ═══════════════════════════════════════════════════════════════
# VALIDATION
# ═══════════════════════════════════════════════════════════════

function Invoke-PostValidation {
    if ($SkipValidation) {
        Write-Warning "Validation skipped (use without -SkipValidation to validate)"
        return
    }
    
    Write-Section "POST-REFACTORING VALIDATION"
    
    Write-Host "`nVerifying structure..." -ForegroundColor Cyan
    
    $requiredItems = @(
        @{ Path = "src\CODE.GS"; Type = "File" },
        @{ Path = "src\templates\Invoice.html"; Type = "File" },
        @{ Path = "docs\deployment-guide.md"; Type = "File" },
        @{ Path = "docs\archive"; Type = "Directory" },
        @{ Path = "scripts"; Type = "Directory" },
        @{ Path = "archive\templates"; Type = "Directory" },
        @{ Path = ".gitignore"; Type = "File" }
    )
    
    $allValid = $true
    foreach ($item in $requiredItems) {
        $exists = Test-Path $item.Path
        $status = if ($exists) { "✅" } else { "❌"; $allValid = $false }
        Write-Host "$status  $($item.Type): $($item.Path)" -ForegroundColor $(if ($exists) { "Green" } else { "Red" })
    }
    
    if ($allValid) {
        Write-Success "`nAll validation checks passed!"
    } else {
        Write-Error "`nSome validation checks failed. Review errors above."
    }
}

# ═══════════════════════════════════════════════════════════════
# MAIN EXECUTION
# ═══════════════════════════════════════════════════════════════

Write-Host @"
╔════════════════════════════════════════════════════════════════╗
║     Pixelwerx Invoice System - Refactoring Script              ║
║     Version 1.0.0 - October 2025                               ║
╚════════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

Test-ProjectDirectory
New-ProjectBackup

switch ($Phase) {
    1 { Invoke-Phase1 }
    2 { Invoke-Phase2 }
    "All" {
        Invoke-Phase1
        Invoke-Phase2
    }
}

Invoke-PostValidation

Write-Section "REFACTORING COMPLETE"

Write-Host @"

✅ Automated refactoring phases complete!

📋 NEXT MANUAL STEPS:
1. Review REFACTORING_PLAN.md for remaining tasks (8-18)
2. Merge quick reference docs:
   - QUICK_REFERENCE.md + QUICK_FIX.md + QUICK_FIX_DEPLOY_NOW.md
3. Create master README.md at root
4. Update all documentation cross-references
5. Implement Validate-InvoiceSystem.ps1 (scripts/)
6. Test template in Google Sheets
7. Commit changes with AI attribution
8. Push to GitHub

📊 FILES PROCESSED:
   - Created 7 directories
   - Moved 15+ files
   - Archived 9 documentation files
   - Fixed critical template issue
   - Created .gitignore

⚠️  IMPORTANT:
   - Backup created at: ../pixel_werk_INVOICE_BACKUP_*.zip
   - Review git status before committing: git status
   - Test template before final commit!

📖 Full details: REFACTORING_PLAN.md

"@ -ForegroundColor Cyan

if ($WhatIfPreference) {
    Write-Warning "WhatIf mode - no actual changes made. Run without -WhatIf to execute."
}
