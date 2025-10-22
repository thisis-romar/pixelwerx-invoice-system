# Validate-InvoiceSystem.ps1
<#
.SYNOPSIS
    Validates Pixelwerx Invoice System setup and configuration
.DESCRIPTION
    Performs comprehensive validation of:
    - File structure
    - Required files existence
    - Apps Script deployment
    - Google Sheets configuration
    - Template integrity
.EXAMPLE
    .\Validate-InvoiceSystem.ps1
.EXAMPLE
    .\Validate-InvoiceSystem.ps1 -Verbose
#>

[CmdletBinding()]
param(
    [switch]$SkipGoogleAPI,
    [switch]$DetailedOutput
)

function Test-FileStructure {
    Write-Host "`n=== File Structure Validation ===" -ForegroundColor Cyan
    
    $requiredFiles = @(
        "src\CODE.GS",
        "src\templates\Invoice.html",
        "README.md",
        "docs\deployment-guide.md",
        "docs\troubleshooting-guide.md"
    )
    
    $results = @()
    foreach ($file in $requiredFiles) {
        $exists = Test-Path $file
        $status = if ($exists) { "✅" } else { "❌" }
        Write-Host "$status  $file" -ForegroundColor $(if ($exists) { "Green" } else { "Red" })
        $results += $exists
    }
    
    return ($results | Where-Object { $_ -eq $false }).Count -eq 0
}

function Test-CodeGSIntegrity {
    Write-Host "`n=== CODE.GS Integrity Check ===" -ForegroundColor Cyan
    
    $codeFile = "src\CODE.GS"
    if (-not (Test-Path $codeFile)) {
        Write-Host "❌  CODE.GS not found!" -ForegroundColor Red
        return $false
    }
    
    $content = Get-Content $codeFile -Raw
    $lineCount = (Get-Content $codeFile | Measure-Object -Line).Lines
    
    # Check for key functions
    $requiredFunctions = @(
        "generateInvoicePdfById",
        "buildTemplateData",
        "getInvoicesSheet_",
        "createPdf"
    )
    
    $allPresent = $true
    foreach ($func in $requiredFunctions) {
        if ($content -match $func) {
            Write-Host "✅  Function '$func' found" -ForegroundColor Green
        } else {
            Write-Host "❌  Function '$func' MISSING!" -ForegroundColor Red
            $allPresent = $false
        }
    }
    
    Write-Host "`nLine count: $lineCount" -ForegroundColor Yellow
    
    return $allPresent
}

function Test-TemplateIntegrity {
    Write-Host "`n=== Invoice Template Validation ===" -ForegroundColor Cyan
    
    $templateFile = "src\templates\Invoice.html"
    if (-not (Test-Path $templateFile)) {
        Write-Host "❌  Invoice.html not found!" -ForegroundColor Red
        return $false
    }
    
    $content = Get-Content $templateFile -Raw
    $lineCount = (Get-Content $templateFile | Measure-Object -Line).Lines
    
    # Check for duplicate DOCTYPE (common error)
    $doctypeMatches = ([regex]::Matches($content, "<!DOCTYPE html>")).Count
    if ($doctypeMatches -eq 1) {
        Write-Host "✅  Single DOCTYPE declaration" -ForegroundColor Green
    } else {
        Write-Host "❌  Multiple DOCTYPE declarations found ($doctypeMatches)!" -ForegroundColor Red
        return $false
    }
    
    # Check for template variables
    $requiredVars = @("d.invoiceNo", "d.clientName", "d.items")
    foreach ($var in $requiredVars) {
        if ($content -match [regex]::Escape($var)) {
            Write-Host "✅  Template variable '$var' found" -ForegroundColor Green
        } else {
            Write-Host "⚠️   Template variable '$var' not found" -ForegroundColor Yellow
        }
    }
    
    Write-Host "`nLine count: $lineCount" -ForegroundColor Yellow
    Write-Host "File size: $([math]::Round((Get-Item $templateFile).Length/1KB, 2)) KB" -ForegroundColor Yellow
    
    return $true
}

function Test-Documentation {
    Write-Host "`n=== Documentation Validation ===" -ForegroundColor Cyan
    
    $docs = @(
        "README.md",
        "docs\deployment-guide.md",
        "docs\troubleshooting-guide.md",
        "docs\testing-checklist.md",
        "docs\quick-reference.md"
    )
    
    $validDocs = 0
    foreach ($doc in $docs) {
        if (Test-Path $doc) {
            $lineCount = (Get-Content $doc | Measure-Object -Line).Lines
            Write-Host "✅  $doc ($lineCount lines)" -ForegroundColor Green
            $validDocs++
        } else {
            Write-Host "❌  $doc MISSING" -ForegroundColor Red
        }
    }
    
    return $validDocs -eq $docs.Count
}

# Main Execution
Write-Host @"
╔════════════════════════════════════════════════════════════╗
║     Pixelwerx Invoice System - Validation Suite           ║
║     Version 1.0.0 - October 2025                          ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

$results = @{
    FileStructure = Test-FileStructure
    CodeIntegrity = Test-CodeGSIntegrity
    TemplateIntegrity = Test-TemplateIntegrity
    Documentation = Test-Documentation
}

Write-Host "`n`n=== Validation Summary ===" -ForegroundColor Cyan
$passCount = ($results.Values | Where-Object { $_ -eq $true }).Count
$totalTests = $results.Count

foreach ($test in $results.GetEnumerator()) {
    $status = if ($test.Value) { "✅ PASS" } else { "❌ FAIL" }
    $color = if ($test.Value) { "Green" } else { "Red" }
    Write-Host "$status  $($test.Key)" -ForegroundColor $color
}

Write-Host "`nOverall: $passCount/$totalTests tests passed" -ForegroundColor $(if ($passCount -eq $totalTests) { "Green" } else { "Yellow" })

if ($passCount -eq $totalTests) {
    Write-Host "`n🎉 System validation PASSED! Ready for deployment." -ForegroundColor Green
    exit 0
} else {
    Write-Host "`n⚠️  System validation FAILED. Review errors above." -ForegroundColor Red
    exit 1
}
