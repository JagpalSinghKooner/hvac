# Service-City Content Template

> **CRITICAL:** Read this file BEFORE generating ANY service-city content.
> This is the canonical template - use EXACTLY this structure or build will fail.

## Template File Structure

```yaml
---
# ===========================================
# REQUIRED FIELDS - DO NOT OMIT ANY
# ===========================================
serviceSlug: '[service-slug]'          # Must match slug from services collection
locationSlug: '[city-slug]'            # Must match slug from locations collection
title: '[Service] in [City], ON'       # Generic title for breadcrumbs
seoTitle: '[Service] [City] ON | B.A.P Heating & Cooling'  # SEO title (50-60 chars)
seoDescription: 'Professional [service] in [City], ON. TSSA-certified technicians. Serving [City] since 1994.'  # SEO description (50-160 chars)
workflowStatus: 'published'            # REQUIRED enum - always 'published'

# ===========================================
# HERO SECTION (H1 + intro)
# ===========================================
hero:
  title: 'Trusted [Service] Services in [City] Since 1994'  # H1, PREMIUM positioning
  description: 'After over [X] [service] installations across [City] for 32 years, we know that [key insight about service]. From [neighborhood type] to [neighborhood type], expertise ensures [benefit].'  # 50-100 words

# ===========================================
# E-E-A-T EXPERIENCE STATS
# ===========================================
experienceStats:
  installationsInCity: 1200            # Scale from Guelph baseline (see table below)
  yearsSinceCityStart: 32              # All cities = 32 years (since 1994)

# ===========================================
# PROBLEM SECTION
# ===========================================
problem:
  headline: '[H2 from keyword research]'
  description: '[250-350 words about the problems this service solves]'
  issues:                              # CRITICAL: Array of STRINGS only - NOT objects
    - 'Issue description one (full sentence)'
    - 'Issue description two (full sentence)'
    - 'Issue description three (full sentence)'

# ===========================================
# SOLUTION SECTION
# ===========================================
solution:
  headline: '[H2 from keyword research]'
  description: '[250-350 words about how we solve these problems]'

# ===========================================
# TRUST OPENER
# ===========================================
trustOpener: 'Since 1994, B.A.P has been [serving/installing] [service] across [City]''s diverse properties, from [property type] to [property type]. Three decades and over [X] [installations/repairs] create pattern recognition—we know [specific local knowledge]. When you are investing $[X]-$[Y] in [service category], institutional knowledge matters.'  # 50-100 words

# ===========================================
# BENEFITS SECTION
# ===========================================
benefitsHeadline: '[H2 from keyword research]'
benefits:
  - title: 'Benefit Title One'         # 5-8 words
    description: 'Clear explanation of this benefit and why it matters to the homeowner.'  # 30-50 words
    icon: 'Calculator'                 # Lucide icon name
  - title: 'Benefit Title Two'
    description: 'Clear explanation of this benefit and why it matters to the homeowner.'
    icon: 'Shield'
  - title: 'Benefit Title Three'
    description: 'Clear explanation of this benefit and why it matters to the homeowner.'
    icon: 'Award'
  - title: 'Benefit Title Four'
    description: 'Clear explanation of this benefit and why it matters to the homeowner.'
    icon: 'DollarSign'

# ===========================================
# CONTEXT SECTION (City-Specific)
# ===========================================
contextHeadline: '[H2 from keyword research]'
context: |                             # CRITICAL: Multiline STRING with | - NOT object
  [City]''s [climate factor] demands [equipment capability]. [Property type] homes often have [specific challenge], requiring [specific approach].

  [Second paragraph about local housing stock, neighborhoods, or regional factors.]

  [Utility provider] provides [service type] making [equipment type] economical. [Technical detail about equipment]. With 32 years and over [X] installations serving [City], we understand how local housing stock affects [service] requirements.

# ===========================================
# SAVINGS SECTION
# ===========================================
savings:
  headline: '[H2 from keyword research]'
  description: '[100-150 words about cost savings, efficiency gains, and investment value]'
  rebateInfo: '[Rebate program name] provides up to $[X] for [equipment type] installed in [City] homes served by [utility provider].'  # CRITICAL: String INSIDE savings - NOT separate object

# ===========================================
# PROOF SECTION (Social Proof)
# ===========================================
proof:                                 # CRITICAL: Single OBJECT - NOT array
  testimonial: 'Our [X]-year-old [equipment] was [problem]. B.A.P installed a new [solution]. Our [metric] dropped by $[X] the first [period], and the [benefit]. The [rebate] made the investment very affordable.'
  customerName: 'First and Last Name'
  customerLocation: '[Neighborhood], [City]'
  result: '[Outcome metric] with [additional benefit]'

# ===========================================
# FINAL CTA SECTION
# ===========================================
finalCta:
  headline: '[H2 from keyword research]'
  copy: '[Service] is a [X]-year decision requiring expertise to get right the first time. We handle the technical complexity—[list of what we handle]—so your biggest decision is simply making the call. Over [X] [City] installations since 1994 provide the institutional knowledge that protects your investment. Located at 25 Clearview Street, serving [City] homeowners since 1994.'  # 50-75 words
---

# [Service] in [City], ON

Professional [service] for [City] homes. [Key benefit 1], [key benefit 2]. [Rebate program] rebates up to $[X] available, [efficiency improvement].
```

---

## Experience Stats Reference (Scale from Guelph)

| Service | Guelph Count | Smaller Cities | Notes |
|---------|--------------|----------------|-------|
| Furnace Installation | 1,200 | 800-1,000 | High volume, 32 years |
| Furnace Repair | 1,200 | 800-1,000 | Matches installation |
| Furnace Maintenance | 1,000 | 700-900 | Annual contracts |
| AC Installation | 900 | 600-800 | High demand |
| AC Repair | 900 | 600-800 | Matches installation |
| AC Maintenance | 800 | 500-700 | Annual contracts |
| Heat Pump Installation | 400 | 250-350 | Emerging service |
| Heat Pump Repair | 400 | 250-350 | Matches installation |
| Heat Pump Maintenance | 350 | 200-300 | Annual contracts |
| Boiler Installation | 150 | 100-130 | Specialty service |
| Boiler Repair | 150 | 100-130 | Matches installation |
| Boiler Maintenance | 130 | 80-110 | Annual contracts |
| Ductless Mini-Split | 200 | 130-180 | Growing demand |
| HRV/ERV Ventilation | 250 | 150-200 | Indoor air quality |
| Humidifiers | 250 | 150-200 | Winter comfort |
| Dehumidifiers | 250 | 150-200 | Summer comfort |
| Air Filtration | 300 | 200-250 | Health-focused |
| Tank Water Heaters | 400 | 250-350 | Common replacement |
| Tankless Water Heaters | 200 | 130-180 | Growing demand |
| Maintenance Plans | 600 | 400-500 | Contract-based |
| Commercial HVAC | 100 | 60-80 | Business clients |
| Rooftop Units | 80 | 50-70 | Commercial focus |

---

## Schema Gotchas (CRITICAL)

### 1. problem.issues - Array of STRINGS

**WRONG:**
```yaml
issues:
  - title: 'Issue Title'
    description: 'Issue description'
```

**RIGHT:**
```yaml
issues:
  - 'Full issue description as a string'
  - 'Second issue description as a string'
  - 'Third issue description as a string'
```

### 2. context - Multiline STRING (not object)

**WRONG:**
```yaml
context:
  description: 'Long text here...'
```

**RIGHT:**
```yaml
context: |
  First paragraph of context text.

  Second paragraph continues here.

  Third paragraph with utility provider info.
```

### 3. rebateInfo - String INSIDE savings

**WRONG:**
```yaml
savings:
  headline: '...'
  description: '...'
rebateInfo:
  primaryProgram: 'Enbridge'
  amount: '$2,500'
```

**RIGHT:**
```yaml
savings:
  headline: '...'
  description: '...'
  rebateInfo: 'Enbridge Home Efficiency Rebate Plus provides up to $2,500 for qualifying installations.'
```

### 4. proof - Single OBJECT (not array)

**WRONG:**
```yaml
proof:
  - type: 'testimonial'
    value: 'Quote here'
```

**RIGHT:**
```yaml
proof:
  testimonial: 'Quote here'
  customerName: 'Full Name'
  customerLocation: 'Neighborhood, City'
  result: 'Outcome summary'
```

### 5. Markdown Body REQUIRED

**WRONG (file ends here):**
```yaml
finalCta:
  headline: '...'
  copy: '...'
---
```

**RIGHT:**
```yaml
finalCta:
  headline: '...'
  copy: '...'
---

# [Service] in [City], ON

Brief markdown summary (2-3 sentences minimum).
```

### 6. Apostrophes in Single-Quoted YAML (CRITICAL - BUILD BREAKER)

In YAML single-quoted strings, apostrophes MUST be doubled (`''`). This is the #1 cause of build failures.

**WRONG (causes YAMLException: bad indentation):**
```yaml
headline: 'Connect With Elmira's Furnace Repair Specialists'
copy: 'Your home's comfort depends on...'
description: 'We've been serving the community...'
```

**RIGHT (double the apostrophe):**
```yaml
headline: 'Connect With Elmira''s Furnace Repair Specialists'
copy: 'Your home''s comfort depends on...'
description: 'We''ve been serving the community...'
```

**Common occurrences to watch for:**
- City possessives: `Elmira''s`, `Guelph''s`, `St. Jacob''s`
- Contractions: `don''t`, `won''t`, `it''s`, `we''ve`, `we''re`, `you''re`
- Possessives: `homeowner''s`, `B.A.P''s`, `home''s`, `system''s`

**Verification after writing:**
```bash
# This grep finds unescaped apostrophes (should return nothing)
grep -n "': '.*[^']'[^']" src/content/service-city/*/[city].md
```

---

## Premium Positioning Keywords

**USE these in H1s:**
- "Trusted", "Expert", "Professional", "Premium", "Quality"
- "Since 1994", "30+ Years", "Established"
- "[City]'s Most Experienced"

**NEVER use in H1s:**
- "24-Hour", "24/7", "Emergency", "Same-Day", "Urgent", "Act Now"
- "Fast", "Quick", "Immediate"

---

## Verification Commands

After writing each file:

```bash
# Check file doesn't end with ---
tail -5 src/content/service-city/[service]/[city].md

# Verify build passes
pnpm build

# Check em dashes (should only match frontmatter delimiters)
grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'
```
