# 🎨 COLOR BADGES QUICK GUIDE

**Time:** 2 minutes  
**Optional Feature:** Add colored dots to equipment items

---

## 🟤🔴🟠 What Are Color Badges?

Color badges are small colored circles that appear before equipment titles in your invoice, helping identify equipment boxes at a glance.

**Example:**
```
🟤🔴🟠 PixelWerx LED Video Wall - 3 Box Configuration
```

This shows the equipment uses 3 boxes: Brown, Red, and Orange.

---

## ✅ Step 1: Add Badges Column (30 seconds)

1. **Open Google Sheets:** PixelWerx Invoicing
2. **Go to:** LineItems sheet
3. **Insert new column** (anywhere, recommended after "LineNo"):
   - Column name: **Badges**
4. **Done!**

---

## ✏️ Step 2: Add Badge Values (1 minute)

### Format:
```
Badge1,Badge2,Badge3
```

### Available Colors:
- `Brown` 🟤
- `Red` 🔴
- `Orange` 🟠
- `Yellow` 🟡
- `Green` 🟢
- `Blue` 🔵
- `Purple` 🟣
- `Pink` 🩷
- `Grey` ⚫
- `Black` ⚫

### Examples:

| Item Title | Badges Column | Result |
|------------|---------------|--------|
| LED Video Wall - 3 Box | `Brown,Red,Orange` | 🟤🔴🟠 LED Video Wall |
| Power Distribution | `Yellow` | 🟡 Power Distribution |
| Audio System | `Green,Blue` | 🟢🔵 Audio System |
| Lighting Package | *(leave empty)* | Lighting Package |

---

## 📋 Example LineItems Sheet:

| InvoiceId | LineNo | **Badges** | Title | Description | Qty | Rate | Taxable |
|-----------|--------|------------|-------|-------------|-----|------|---------|
| INV001 | 1 | **Brown,Red,Orange** | PixelWerx LED Video Wall | High-brightness panels... | 1 | 8500 | TRUE |
| INV001 | 2 | **Yellow** | Power Distribution | 30A service... | 1 | 450 | TRUE |
| INV001 | 3 | *(empty)* | On-Site Tech Support | 8 hours setup... | 8 | 85 | TRUE |

---

## 🎨 Result in PDF:

```
Equipment & Services
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Description                                Qty    Rate       Amount
─────────────────────────────────────────────────────────────────
🟤🔴🟠 PixelWerx LED Video Wall             1     $8,500.00  $8,500.00
High-brightness LED panels...

🟡 Power Distribution                       1     $450.00    $450.00
30A service...

On-Site Tech Support                       8     $85.00     $680.00
8 hours setup...
```

---

## 🎯 Use Cases

### 1. **Equipment Box Identification**
```
Brown,Red,Orange → Identifies which boxes contain panels
```

### 2. **Department/Category Color Coding**
```
Video Equipment: Red
Audio Equipment: Blue
Lighting Equipment: Yellow
Power/Staging: Green
```

### 3. **Priority/Tier Levels**
```
Premium Service: Gold (Yellow)
Standard Service: Blue
Basic Service: Grey
```

### 4. **Status Indicators**
```
New Equipment: Green
Refurbished: Orange
Rental: Blue
```

---

## ⚠️ Important Notes

### ✅ DO:
- Use comma-separated values: `Brown,Red,Orange`
- Capitalize first letter: `Brown` not `brown`
- Leave empty if no badges needed
- Use 1-5 badges per item (more = cluttered)

### ❌ DON'T:
- Use spaces: `Brown, Red` → Shows as `badge-brown-` ❌
- Use underscores: `Dark_Blue` → Won't render ❌
- Use numbers: `1,2,3` → Won't render ❌
- Use special characters: `Brown!` → Won't render ❌

---

## 🧪 Testing

### Test with INV001:

1. **Add Badges column** to LineItems sheet
2. **Enter test values:**
   - Row 1: `Brown,Red,Orange`
   - Row 2: `Yellow`
   - Row 3: Leave empty
3. **Generate invoice:**
   - Extensions → Generate Invoice by ID
   - Enter: `INV001`
4. **Check PDF:**
   - Row 1: Should show 🟤🔴🟠 before title
   - Row 2: Should show 🟡 before title
   - Row 3: No badges (normal)

---

## 🎨 Custom Colors (Advanced)

Want custom colors? Edit `invoice.html` CSS:

```css
/* Add your custom color */
.badge-gold { background-color: #ffd700; }
.badge-silver { background-color: #c0c0c0; }
.badge-teal { background-color: #008080; }
```

Then use in sheet:
```
Badges: Gold,Silver
```

---

## 📖 Real-World Example

**PixelWerx Video Wall System:**

```
LineItems Sheet:
┌──────────┬────────┬─────────────────┬──────────────────────────────────────┐
│ InvoiceId│ LineNo │ Badges          │ Title                                │
├──────────┼────────┼─────────────────┼──────────────────────────────────────┤
│ INV001   │ 1      │ Brown,Red,Orange│ PixelWerx LED Video Wall - 3 Boxes   │
│ INV001   │ 2      │ Blue            │ Video Processing & Control System    │
│ INV001   │ 3      │ Grey            │ Rigging & Support Structure          │
│ INV001   │ 4      │ Yellow          │ Power Distribution                   │
│ INV001   │ 5      │ Green           │ On-Site Technical Support            │
│ INV001   │ 6      │                 │ Transportation & Logistics           │
└──────────┴────────┴─────────────────┴──────────────────────────────────────┘

PDF Result:
🟤🔴🟠 PixelWerx LED Video Wall - 3 Boxes
🔵 Video Processing & Control System
⚫ Rigging & Support Structure
🟡 Power Distribution
🟢 On-Site Technical Support
Transportation & Logistics
```

**Benefits:**
- Client sees which boxes contain which equipment
- Fast visual identification during setup
- Professional appearance
- Matches physical box labels

---

## ❓ FAQ

**Q: Do I HAVE to add badges?**  
A: No! They're optional. Leave Badges column empty and invoices work normally.

**Q: Can I use different badges for each invoice?**  
A: Yes! Badges are per line item, not per invoice.

**Q: What if I type a color that doesn't exist?**  
A: Badge won't render (no error). Only supported colors work.

**Q: Can I have different numbers of badges per item?**  
A: Yes! Item 1 can have 3 badges, Item 2 can have 1, Item 3 can have none.

**Q: Will old invoices break?**  
A: No! If Badges column doesn't exist, invoices render normally without badges.

---

## ✅ That's It!

Color badges are now ready to use. Add them when needed, skip them when not.

**Quick reference:**
- Brown, Red, Orange, Yellow, Green, Blue, Purple, Pink, Grey, Black
- Format: `Color1,Color2,Color3`
- Optional: Leave empty for no badges

🎨 **Enjoy your professional color-coded invoices!**
