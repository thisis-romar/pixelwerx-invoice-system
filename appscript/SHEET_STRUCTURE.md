# Google Sheets Structure Reference

Detailed column definitions for the PixelWerx Invoice Generator Google Sheets setup.

## Sheet 1: Invoice_Data

**Purpose:** Stores invoice header information (one row per invoice)

### Column Structure

| Col | Header | Data Type | Required | Format | Example | Notes |
|-----|--------|-----------|----------|--------|---------|-------|
| **A** | Invoice Number | Text | ✅ Yes | PX-YYYY-NNN | PX-2025-003 | Unique identifier, used as primary key |
| **B** | Invoice Date | Date | ✅ Yes | MM/DD/YYYY | 01/15/2025 | Date invoice was created |
| **C** | Invoice Due Date | Date | ✅ Yes | MM/DD/YYYY | 02/15/2025 | Payment due date |
| **D** | From Company | Text | ✅ Yes | - | PixelWerx Events Inc. | Your company name |
| **E** | From Address | Text | ✅ Yes | - | 123 Event Street, Toronto, ON M5V 2T6 | Your full address |
| **F** | From Email | Email | ✅ Yes | email@domain.com | billing@pixelwerx.com | Your contact email |
| **G** | From Phone | Text | ✅ Yes | (###) ###-#### | (416) 555-0100 | Your phone number |
| **H** | From HST Number | Text | ✅ Yes | - | 123456789 RT0001 | Your HST/GST registration number |
| **I** | Bill To Company | Text | ✅ Yes | - | Molson Canadian Amphitheatre | Client company name |
| **J** | Bill To Attn | Text | ⚪ Optional | - | John Smith, Event Manager | Client contact person |
| **K** | Bill To Address | Text | ✅ Yes | - | 909 Lake Shore Blvd W, Toronto, ON M6K 3L3 | Client address |
| **L** | Bill To Email | Email | ✅ Yes | email@domain.com | events@amphitheatre.com | Client email |
| **M** | Bill To Phone | Text | ✅ Yes | (###) ###-#### | (416) 555-0200 | Client phone |
| **N** | Event Venue | Text | ⚪ Optional | - | Budweiser Stage | Event venue name |
| **O** | Event Location | Text | ⚪ Optional | - | 909 Lake Shore Blvd W, Toronto, ON | Event full address |
| **P** | Event Load In | Text | ⚪ Optional | - | July 19, 2025, 12:00 PM | Load-in date/time |
| **Q** | Event Date | Text | ⚪ Optional | - | July 19, 2025, 7:00 PM | Main event date/time |
| **R** | Event Load Out | Text | ⚪ Optional | - | July 20, 2025, 2:00 AM | Load-out date/time |
| **S** | Event Rental Duration | Text | ⚪ Optional | - | 2 days (July 19-20, 2025) | Rental period description |
| **T** | Discount | Number | ⚪ Optional | 0.00 | 500.00 | Discount amount (positive number) |
| **U** | HST Rate | Number | ✅ Yes | 0.00 | 13 | Tax rate percentage (13 = 13%) |
| **V** | Terms Payment | Text | ⚪ Optional | - | Payment due within 30 days of invoice date | Payment terms text |
| **W** | Terms Cancellation | Text | ⚪ Optional | - | 50% cancellation fee if cancelled within 7 days of event | Cancellation policy |
| **X** | Terms Technical | Text | ⚪ Optional | - | Technical support included for event duration | Technical terms |
| **Y** | Payment Method eTransfer | Text | ⚪ Optional | - | Interac e-Transfer | Payment method 1 label |
| **Z** | Payment Method Credit Card | Text | ⚪ Optional | - | Visa / Mastercard / Amex | Payment method 2 label |
| **AA** | Payment Method Corporate Check | Text | ⚪ Optional | - | Corporate Check (payable to PixelWerx Events Inc.) | Payment method 3 label |
| **AB** | Notes | Text | ⚪ Optional | - | Thank you for your business! | Additional notes/footer text |

### Data Validation Rules

**Invoice Number (Column A):**
- Must be unique (no duplicates)
- Recommended format: `PX-YYYY-###` (e.g., PX-2025-001)
- Used as foreign key in Line_Items sheet

**Dates (Columns B, C):**
- Must be valid dates
- Invoice Due Date should be after Invoice Date
- Format: Google Sheets will auto-format dates based on locale

**HST Rate (Column U):**
- Enter as whole number (13 for 13%, not 0.13)
- Common Canadian rates: 5% (GST), 13% (HST Ontario), 15% (HST Atlantic)

**Discount (Column T):**
- Enter as positive number (500 for $500 discount)
- Leave blank or 0 for no discount

### Sample Row (Invoice PX-2025-003)

```
A: PX-2025-003
B: 01/15/2025
C: 02/15/2025
D: PixelWerx Events Inc.
E: 123 Event Street, Toronto, ON M5V 2T6
F: billing@pixelwerx.com
G: (416) 555-0100
H: 123456789 RT0001
I: Molson Canadian Amphitheatre
J: John Smith, Event Manager
K: 909 Lake Shore Blvd W, Toronto, ON M6K 3L3
L: events@amphitheatre.com
M: (416) 555-0200
N: Budweiser Stage
O: 909 Lake Shore Blvd W, Toronto, ON
P: July 19, 2025, 12:00 PM
Q: July 19, 2025, 7:00 PM
R: July 20, 2025, 2:00 AM
S: 2 days (July 19-20, 2025)
T: 500
U: 13
V: Payment due within 30 days of invoice date
W: 50% cancellation fee if cancelled within 7 days of event
X: Technical support included for event duration
Y: Interac e-Transfer
Z: Visa / Mastercard / Amex
AA: Corporate Check (payable to PixelWerx Events Inc.)
AB: Thank you for your business! Questions? Contact billing@pixelwerx.com
```

---

## Sheet 2: Line_Items

**Purpose:** Stores invoice line items (multiple rows per invoice)

### Column Structure

| Col | Header | Data Type | Required | Format | Example | Notes |
|-----|--------|-----------|----------|--------|---------|-------|
| **A** | Invoice Number | Text | ✅ Yes | PX-YYYY-NNN | PX-2025-003 | Foreign key linking to Invoice_Data |
| **B** | Line Number | Number | ✅ Yes | 1-12 | 1 | Display order (1-12, determines position) |
| **C** | Description | Text | ✅ Yes | - | PixelWerx LED Video Wall - 3 Box Configuration | Item name/title |
| **D** | Details | Text | ⚪ Optional | - | High-brightness LED panels (9 × 4 configuration - 4.5m × 4.0m / 1152 × 1024px) | Item details/specifications |
| **E** | Quantity | Number | ✅ Yes | 0.00 | 1 | Number of units |
| **F** | Rate | Number | ✅ Yes | 0.00 | 8500.00 | Price per unit |
| **G** | Amount | Number | ✅ Yes | 0.00 | 8500.00 | Total (Quantity × Rate) |

### Data Validation Rules

**Invoice Number (Column A):**
- Must match an Invoice Number from Invoice_Data sheet
- Multiple line items can have same Invoice Number
- Used to group line items by invoice

**Line Number (Column B):**
- Must be integer 1-12
- Determines display order in PDF (1 = first line, 12 = last line)
- Can have gaps (e.g., lines 1, 2, 5, 8 will display in order, lines 3, 4, 6, 7 hidden)
- Cannot exceed 12 (template supports max 12 lines)

**Quantity (Column E):**
- Decimals allowed (e.g., 2.5 hours, 0.5 days)
- Must be positive number

**Rate (Column F):**
- Price per unit
- Enter as number without $ symbol (8500 not $8,500)

**Amount (Column G):**
- Should equal Quantity × Rate
- Apps Script uses this value directly (doesn't recalculate from Qty × Rate)
- Use formula: `=E2*F2` to auto-calculate

### Calculation Formulas (Optional)

To auto-calculate Amount column, use:
```
=E2*F2
```
(where E2 is Quantity, F2 is Rate, adjust row numbers as needed)

### Sample Line Items (Invoice PX-2025-003)

```
Row 2:
A: PX-2025-003 | B: 1 | C: PixelWerx LED Video Wall - 3 Box Configuration | D: High-brightness LED panels (9 × 4 configuration - 4.5m × 4.0m / 1152 × 1024px) | Color-coded boxes (Brown, Red, Orange) for fast deployment | Indoor/Outdoor rated | E: 1 | F: 8500.00 | G: 8500.00

Row 3:
A: PX-2025-003 | B: 2 | C: Video Processing & Control System | D: Professional LED processor, scaling, and content management system | E: 1 | F: 1200.00 | G: 1200.00

Row 4:
A: PX-2025-003 | B: 3 | C: Power Distribution | D: Professional power distribution, cabling, and amp requirements (approx. 30A service) | E: 1 | F: 450.00 | G: 450.00

Row 5:
A: PX-2025-003 | B: 4 | C: Rigging & Support Structure | D: Ground support or truss system with safety certification for venue requirements | E: 1 | F: 1800.00 | G: 1800.00

Row 6:
A: PX-2025-003 | B: 5 | C: Transportation & Logistics | D: Delivery, setup, and strike within Greater Toronto Area to Budweiser Stage | E: 1 | F: 650.00 | G: 650.00

Row 7:
A: PX-2025-003 | B: 6 | C: Insurance & Equipment Coverage | D: Liability and equipment insurance for rental period | E: 1 | F: 425.00 | G: 425.00

Row 8:
A: PX-2025-003 | B: 7 | C: On-Site Technical Support | D: Setup, operation, and strike with certified technician (8 hours) | E: 8 | F: 85.00 | G: 680.00

Row 9:
A: PX-2025-003 | B: 8 | C: Content Management & Testing | D: Pre-event content upload, testing, and technical consultation | E: 1 | F: 350.00 | G: 350.00
```

**Total:** 8 line items, Subtotal = $14,055.00

---

## Sheet Setup Checklist

### Initial Setup

- [ ] Create Google Sheet with name "PixelWerx Invoices"
- [ ] Create sheet tab named **exactly** `Invoice_Data`
- [ ] Create sheet tab named **exactly** `Line_Items`
- [ ] Add column headers to Invoice_Data (Row 1, columns A-AB)
- [ ] Add column headers to Line_Items (Row 1, columns A-G)
- [ ] Freeze header row (View → Freeze → 1 row)
- [ ] Format columns:
  - [ ] Invoice Date & Due Date: Format → Number → Date
  - [ ] Discount, HST Rate, Quantity, Rate, Amount: Format → Number → Number (2 decimals)

### Data Entry Template

**Invoice_Data Row 2+ (sample):**
```
PX-2025-001 | 01/10/2025 | 02/10/2025 | PixelWerx Events Inc. | [your address] | [your email] | [your phone] | [your HST#] | [client company] | [client contact] | [client address] | [client email] | [client phone] | [venue] | [location] | [load-in] | [event date] | [load-out] | [duration] | 0 | 13 | [terms payment] | [terms cancel] | [terms tech] | Interac e-Transfer | Visa/MC/Amex | Corporate Check | [notes]
```

**Line_Items Row 2+ (sample):**
```
PX-2025-001 | 1 | LED Video Wall | 9×4 panel configuration | 1 | 8500 | 8500
PX-2025-001 | 2 | Video Processor | Professional system | 1 | 1200 | 1200
PX-2025-001 | 3 | [item description] | [details] | [qty] | [rate] | [amount]
```

---

## Common Patterns

### Multiple Invoices

Add new rows to Invoice_Data sheet:
```
Row 2: PX-2025-001 (Client A, Jan 10)
Row 3: PX-2025-002 (Client B, Jan 15)
Row 4: PX-2025-003 (Client C, Jan 20)
```

Each invoice's line items go in Line_Items:
```
Rows 2-5: PX-2025-001 line items
Rows 6-10: PX-2025-002 line items
Rows 11-18: PX-2025-003 line items
```

### Hourly Services

```
Line_Items:
Invoice Number: PX-2025-004
Line Number: 1
Description: Technical Support Services
Details: On-site technician for event duration
Quantity: 8
Rate: 85.00
Amount: 680.00
```

### Discount Example

```
Invoice_Data:
Invoice Number: PX-2025-005
...
Discount: 1000
HST Rate: 13

Calculation:
Subtotal: $15,000.00
Discount: -$1,000.00
After Discount: $14,000.00
HST (13%): $1,820.00
Total: $15,820.00
```

---

## Tips & Best Practices

1. **Use Data Validation**
   - Set Invoice Number column to prevent duplicates
   - Set Line Number to allow only 1-12
   - Set date columns to accept only dates

2. **Consistent Formatting**
   - Always use same date format across all invoices
   - Format currency columns with 2 decimals
   - Use consistent naming for payment methods

3. **Backup Data**
   - Make copy of sheet before major changes
   - Use version history (File → Version history)

4. **Test First**
   - Create test invoice (e.g., TEST-001) with sample data
   - Generate PDF to verify formatting
   - Delete test invoice when confirmed working

5. **Line Item Details**
   - Keep Description short (1 line)
   - Use Details field for specifications/notes
   - Details field supports multi-line text (use Alt+Enter for line breaks)

---

**Last Updated:** October 22, 2025  
**Version:** 1.0.0
