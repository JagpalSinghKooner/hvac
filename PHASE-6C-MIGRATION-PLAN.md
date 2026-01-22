# Phase 6C Migration Plan - Complete Fix

**Date:** January 22, 2026
**Status:** Ready for Execution
**Method:** Ralph workflow (PRD → prd.json → pnpm ralph)

---

## Executive Summary

The audit findings incorrectly stated "all services use new schema." **Reality: ALL 22 services still use LEGACY schema.** The new components exist and work, but have no data to render because content files use old field names.

---

## Root Cause Analysis

### ✅ What's Working:

1. **Template Integration** - [service].astro correctly renders ProblemSection/SolutionSection (lines 115-131)
2. **Component Implementation** - Both components exist with proper design (split layouts, placeholders)
3. **Schema Definition** - New schema defined in config.ts (lines 335-349)

### ❌ What's Broken:

1. **Content Migration** - All 22 services use legacy `problems` + `approach`, NOT `problemStatement` + `solutionApproach`
2. **Navigation Gaps** - Maintenance Plans missing from Header, Homepage, and has no category page
3. **Missing Content** - `indoor-air-quality.md` service page doesn't exist
4. **Orphan Risk** - Maintenance Plans is unreachable except via direct URL

---

## Schema Comparison

### Legacy Schema (Currently in all 22 services):

```yaml
problems:
  - title: 'Skyrocketing Energy Bills'
    description: '...'
    icon: 'cost'
  - title: 'Breakdown Risk in Mid-Winter'
    description: '...'
    icon: 'warning'

approach:
  headline: 'Right-Sized Equipment, Installed Right'
  description: '...'
  quote: '...'
  quotePerson: 'Paul Palmer, Owner'
```

### New Schema (What template expects):

```yaml
problemStatement:
  headline: 'Is Your Furnace Struggling to Keep Up?'
  description: 'Rising energy bills, uneven heating, and strange noises...'
  painPoints:
    - 'Energy bills increasing every winter'
    - 'Some rooms too cold, others too hot'
    - 'Strange noises or odors from furnace'
    - 'Furnace is 15+ years old'

solutionApproach:
  headline: 'The B.A.P Approach to Furnace Installation'
  description: 'We don't just replace equipment—we design heating solutions...'
  differentiators:
    - 'TSSA Certified Technicians'
    - '10-Year Warranty'
    - 'Free Load Calculation'
    - 'Rebate Assistance'
```

---

## Migration Strategy

### Content Transformation Rules:

| Legacy Field | → | New Field | Transformation |
|--------------|---|-----------|----------------|
| `problems[0].title` + `problems[0].description` | → | `problemStatement.headline` | Use first problem title as headline, combine descriptions into description |
| `problems[].title` | → | `problemStatement.painPoints[]` | Extract all problem titles as bullet points |
| `approach.headline` | → | `solutionApproach.headline` | Direct copy |
| `approach.description` + `approach.quote` | → | `solutionApproach.description` | Combine description + quote |
| Brand signals | → | `solutionApproach.differentiators[]` | Extract trust signals: "TSSA Certified", "10-Year Warranty", etc. |

### Keep Legacy Schema During Migration:

**DO NOT delete legacy schema** until ALL content is migrated. Both schemas will coexist temporarily in config.ts.

---

## Required Fixes

### 1. Content Migration (22 services)

| # | Service | Category | Migration Needed |
|---|---------|----------|------------------|
| 1 | furnace-installation | heating | ✅ Legacy → New |
| 2 | furnace-repair | heating | ✅ Legacy → New |
| 3 | furnace-maintenance | heating | ✅ Legacy → New |
| 4 | boiler-installation | heating | ✅ Legacy → New |
| 5 | boiler-repair | heating | ✅ Legacy → New |
| 6 | boiler-maintenance | heating | ✅ Legacy → New |
| 7 | heat-pump-installation | heating | ✅ Legacy → New |
| 8 | heat-pump-repair | heating | ✅ Legacy → New |
| 9 | heat-pump-maintenance | heating | ✅ Legacy → New |
| 10 | air-conditioner-installation | cooling | ✅ Legacy → New |
| 11 | air-conditioner-repair | cooling | ✅ Legacy → New |
| 12 | air-conditioner-maintenance | cooling | ✅ Legacy → New |
| 13 | ductless-mini-split | cooling | ✅ Legacy → New |
| 14 | humidifiers | iaq | ✅ Legacy → New |
| 15 | dehumidifiers | iaq | ✅ Legacy → New |
| 16 | air-filtration-air-purifiers | iaq | ✅ Legacy → New |
| 17 | hrv-erv-ventilation | iaq | ✅ Legacy → New |
| 18 | tank-water-heaters | water-heating | ✅ Legacy → New |
| 19 | tankless-water-heaters | water-heating | ✅ Legacy → New |
| 20 | commercial-hvac | commercial | ✅ Legacy → New |
| 21 | rooftop-units | commercial | ✅ Legacy → New |
| 22 | maintenance-plans | plans | ✅ Legacy → New |

**Batch Strategy:** Heating (9) → Cooling (4) → IAQ (4) → Water + Commercial + Plans (5)

---

### 2. Missing Content Creation

| File | Type | Purpose | Priority |
|------|------|---------|----------|
| `src/content/service-categories/plans.md` | Category Page | Enable `/services/category/plans` URL | **HIGH** |
| `src/content/services/indoor-air-quality.md` | Service Page | IAQ pillar page (2,500+ searches/mo) | **HIGH** |

#### plans.md Template:

```yaml
---
title: 'Maintenance Plans'
slug: 'plans'
description: 'Preventive maintenance plans to keep your HVAC system running efficiently year-round.'
order: 6
icon: 'calendar-check'
status: 'live'
workflowStatus: 'published'
seoTitle: 'HVAC Maintenance Plans | B.A.P Heating & Cooling'
seoDescription: 'Annual maintenance plans for residential and commercial HVAC systems. Priority service, discounted repairs, and peace of mind.'
---

# Maintenance Plans

Protect your investment with our comprehensive HVAC maintenance plans...
```

#### indoor-air-quality.md Template:

```yaml
---
title: 'Indoor Air Quality Solutions'
description: 'Comprehensive indoor air quality assessment and solutions for healthier home environments.'
category: 'iaq'
status: 'live'
priority: true
order: 1
serviceType: 'service'

problemStatement:
  headline: 'Is Poor Air Quality Affecting Your Family's Health?'
  description: 'Indoor air can be 2-5x more polluted than outdoor air...'
  painPoints:
    - 'Allergies and respiratory issues worsening indoors'
    - 'Dust accumulation within days of cleaning'
    - 'Stale or musty odors in your home'
    - 'Humidity issues causing mold growth'

solutionApproach:
  headline: 'Whole-Home Air Quality Solutions'
  description: 'We assess your home's air quality and implement tailored solutions...'
  differentiators:
    - 'Professional Air Quality Testing'
    - 'Customized Solution Design'
    - 'TSSA Certified Installation'
    - 'Ongoing Monitoring Support'

# ... rest of service content
---
```

---

### 3. Navigation Fixes

#### Fix 1: Header.astro - Add Maintenance Plans

**File:** `src/components/Header.astro`
**Line:** 15-21
**Change:**

```javascript
// BEFORE (5 categories)
const serviceCategories = [
  { name: 'Heating', href: '/services/category/heating' },
  { name: 'Cooling', href: '/services/category/cooling' },
  { name: 'Indoor Air Quality', href: '/services/category/iaq' },
  { name: 'Water Heating', href: '/services/category/water-heating' },
  { name: 'Commercial', href: '/services/category/commercial' },
];

// AFTER (6 categories)
const serviceCategories = [
  { name: 'Heating', href: '/services/category/heating' },
  { name: 'Cooling', href: '/services/category/cooling' },
  { name: 'Indoor Air Quality', href: '/services/category/iaq' },
  { name: 'Water Heating', href: '/services/category/water-heating' },
  { name: 'Commercial', href: '/services/category/commercial' },
  { name: 'Maintenance Plans', href: '/services/category/plans' }, // ← NEW
];
```

#### Fix 2: ServiceCategoriesGrid.astro - Show 6 Cards

**File:** `src/components/sections/ServiceCategoriesGrid.astro`
**Line:** 8
**Change:**

```javascript
// BEFORE - Excludes 6th category
const categories = businessProfile?.data.services?.navbar_categories?.slice(0, 5) || [];

// AFTER - Includes all 6
const categories = businessProfile?.data.services?.navbar_categories?.slice(0, 6) || [];
```

#### Fix 3: profile.yaml - Add IAQ Service Entry

**File:** `src/content/business/profile.yaml`
**Location:** `services.list.iaq`
**Add:**

```yaml
services:
  list:
    iaq:
      - title: 'Indoor Air Quality Solutions'
        slug: 'indoor-air-quality'
      - title: 'Humidifiers'
        slug: 'humidifiers'
      # ... existing services
```

---

### 4. Component Verification

Verify existing components match architecture specs:

| Component | Architecture Spec Match | Status |
|-----------|------------------------|--------|
| ProblemSection.astro | Split layout, painPoints bullets, placeholder image | ✅ VERIFIED |
| SolutionSection.astro | Split layout (reversed), differentiators badges | ⏳ NEED TO CHECK |
| ServiceBenefitsSection.astro | Should be redesigned to split layout (NOT 4-col grid) | ⏳ NEED TO CHECK |
| ServiceSavingsSection.astro | Should be redesigned to split layout (NOT centered stack) | ⏳ NEED TO CHECK |

---

### 5. Legacy Schema Cleanup (AFTER migration)

**File:** `src/content/config.ts`
**Lines to Remove:** 256-273 (after ALL 22 services migrated)

```typescript
// DELETE THESE AFTER MIGRATION COMPLETE:
problems: z.array(...).optional(),  // Lines 256-264
approach: z.object(...).optional(),  // Lines 266-273
```

**Verification before removal:**
```bash
# Ensure NO services use legacy schema
grep -l "^problems:" src/content/services/*.md  # Should return nothing
grep -l "^approach:" src/content/services/*.md  # Should return nothing
```

---

## Ralph Workflow

### Story Breakdown (15 stories):

#### Group 1: Content Migration (4 stories)
1. **Migrate Heating Services (9 files)** - furnace-*, boiler-*, heat-pump-*
2. **Migrate Cooling Services (4 files)** - AC-*, ductless
3. **Migrate IAQ Services (4 files)** - humidifiers, dehumidifiers, air-filtration, HRV/ERV
4. **Migrate Water + Commercial + Plans (5 files)** - tank/tankless, commercial, rooftop, maintenance-plans

#### Group 2: Missing Content (2 stories)
5. **Create plans.md category page**
6. **Create indoor-air-quality.md service page** (full content with new schema)

#### Group 3: Navigation (3 stories)
7. **Add Maintenance Plans to Header navigation**
8. **Update Homepage grid to show 6 categories**
9. **Add indoor-air-quality to profile.yaml services list**

#### Group 4: Component Verification (4 stories)
10. **Verify SolutionSection matches architecture spec**
11. **Redesign ServiceBenefitsSection** (if still 4-col grid)
12. **Redesign ServiceSavingsSection** (if still centered stack)
13. **Visual verification with /agent-browser** (all sections, all viewports)

#### Group 5: Cleanup (2 stories)
14. **Remove legacy schema from config.ts** (after migration verified)
15. **Build verification and documentation update**

---

## Acceptance Criteria

### Per Story:

- [ ] Content files updated with new schema fields
- [ ] `pnpm build` passes with 0 errors
- [ ] Visual verification with `/agent-browser` (375px, 768px, 1024px)
- [ ] `/web-design-guidelines` review passes (Critical/High fixed)
- [ ] Git commit with descriptive message
- [ ] Update prd.json: `passes: true`

### Phase Complete:

- [ ] All 22 services use NEW schema (`problemStatement`, `solutionApproach`)
- [ ] NO services use legacy schema (`problems`, `approach`)
- [ ] Legacy schema removed from config.ts
- [ ] `plans.md` category page exists and renders
- [ ] `indoor-air-quality.md` service page exists with full content
- [ ] Maintenance Plans appears in Header dropdown
- [ ] Homepage shows 6 category cards
- [ ] All 23 services discoverable via navigation
- [ ] `pnpm build` passes (637+ pages)
- [ ] No orphan pages

---

## Execution Commands

```bash
# 1. Create PRD
/prd skill

# 2. Convert to prd.json
/ralph skill

# 3. Execute (15 stories + buffer)
pnpm ralph:20

# 4. Monitor progress
cat docs/project/ralph/progress.txt
```

---

## Risk Mitigation

### Don't Delete Legacy Schema Too Early:
- Keep both schemas during migration
- Only remove after ALL 22 services verified

### Batch Validation:
- After each batch (Heating/Cooling/IAQ/etc), run build
- Verify at least 1 service renders properly before continuing

### Rollback Plan:
- Git branch: `feature/phase-6c-schema-migration`
- Each batch is a separate commit
- Can revert individual batches if needed

---

## Success Metrics

| Metric | Target | Verification |
|--------|--------|--------------|
| Services migrated | 22/22 | `grep -l "problemStatement:" src/content/services/*.md | wc -l` = 22 |
| Legacy schema removed | 0 files | `grep -l "^problems:" src/content/services/*.md | wc -l` = 0 |
| Build status | Pass | `pnpm build` = 0 errors |
| Pages generated | 637+ | Build output |
| ProblemSection renders | Yes | Visual check on /services/furnace-installation |
| SolutionSection renders | Yes | Visual check on /services/furnace-installation |
| Navigation complete | All 23 services | Header shows 6 categories, Homepage shows 6 cards |
| No orphans | 0 pages | All services reachable via navigation |

---

**Next Step:** Create PRD using `/prd` skill with above story breakdown.

---

**Document Created:** January 22, 2026
**Ready for Ralph Execution**
