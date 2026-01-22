# Phase 6C Audit Findings

**Date:** January 22, 2026
**Scope:** Complete audit of all services, schema mapping, navigation, and component integration

---

## Executive Summary

Phase 6C content generation is **largely complete** (22 services with 1000+ words each), but critical **navigation and discoverability gaps** prevent users from finding Maintenance Plans. Additionally, the IAQ pillar page (`indoor-air-quality.md`) expected in the PRD does not exist.

---

## Part 1: Service Content Audit

### Status: ✅ COMPLETE

| Metric | Expected | Actual | Status |
|--------|----------|--------|--------|
| Service files | 22 | 22 | ✅ |
| Word count per file | 1000+ | 1,001-1,248 | ✅ |
| Schema version | New (problemStatement/solutionApproach) | All use new schema | ✅ |
| Missing fields | None | None | ✅ |
| Build status | Pass | Pass (637 pages) | ✅ |

### All 22 Service Files

| # | File | Category | Words | Status |
|---|------|----------|-------|--------|
| 1 | furnace-installation.md | heating | 1,248 | ✅ |
| 2 | furnace-repair.md | heating | 1,084 | ✅ |
| 3 | furnace-maintenance.md | heating | 1,196 | ✅ |
| 4 | boiler-installation.md | heating | 1,198 | ✅ |
| 5 | boiler-repair.md | heating | 1,089 | ✅ |
| 6 | boiler-maintenance.md | heating | 1,147 | ✅ |
| 7 | heat-pump-installation.md | heating | 1,156 | ✅ |
| 8 | heat-pump-repair.md | heating | 1,022 | ✅ |
| 9 | heat-pump-maintenance.md | heating | 1,068 | ✅ |
| 10 | air-conditioner-installation.md | cooling | 1,247 | ✅ |
| 11 | air-conditioner-repair.md | cooling | 1,089 | ✅ |
| 12 | air-conditioner-maintenance.md | cooling | 1,156 | ✅ |
| 13 | ductless-mini-split.md | cooling | 1,186 | ✅ |
| 14 | humidifiers.md | iaq | 1,126 | ✅ |
| 15 | dehumidifiers.md | iaq | 1,084 | ✅ |
| 16 | air-filtration-air-purifiers.md | iaq | 1,001 | ✅ |
| 17 | hrv-erv-ventilation.md | iaq | 1,089 | ✅ |
| 18 | tank-water-heaters.md | water-heating | 1,057 | ✅ |
| 19 | tankless-water-heaters.md | water-heating | 1,101 | ✅ |
| 20 | commercial-hvac.md | commercial | 1,067 | ✅ |
| 21 | rooftop-units.md | commercial | 1,112 | ✅ |
| 22 | maintenance-plans.md | plans | 1,089 | ✅ |

**Average word count:** 1,103 words per service

---

## Part 2: Schema Mapping Audit

### Status: ✅ COMPLETE

The schema in `src/content/config.ts` includes all required fields:

```typescript
// Phase 6B fields - ALL SERVICES USE THESE
problemStatement: {
  headline: string;
  description: string;
  painPoints: string[];  // optional
}

solutionApproach: {
  headline: string;
  description: string;
  differentiators: string[];  // optional
}
```

**Note:** The `prd.json` notes incorrectly claimed services used "legacy fields" (problems/approach). The audit confirmed **all 22 services use the new schema fields**.

---

## Part 3: Component Integration Audit

### Status: ✅ COMPLETE

All service page components properly map to schema fields:

| Schema Field | Component | Null-Check |
|--------------|-----------|------------|
| title, description | ServiceHeroSection | ✅ |
| problemStatement | ProblemSection | ✅ Conditional render |
| solutionApproach | SolutionSection | ✅ Conditional render |
| valueProps | ServiceBenefitsSection | ✅ Returns null if empty |
| processSteps | ServiceProcessSection | ✅ Returns null if empty |
| savings | ServiceSavingsSection | ✅ Returns null if empty |
| (filtered FAQs) | ServiceFAQSection | ✅ Max 6 |
| (filtered reviews) | TestimonialsCarousel | ✅ Fallback to general |

**Service page template:** `src/pages/services/[service].astro`
- Filters: `status === 'live'` AND `workflowStatus === 'published'`
- All 22 services meet these criteria

---

## Part 4: Navigation & Discoverability Audit

### Status: ❌ CRITICAL GAPS

#### Current Navigation Coverage

| Category | Header Nav | Homepage Grid | Footer | Category Page | Service Page | Discoverable? |
|----------|------------|---------------|--------|---------------|--------------|---------------|
| Heating | ✅ | ✅ | ✅ | ✅ | ✅ | **YES** |
| Cooling | ✅ | ✅ | ✅ | ✅ | ✅ | **YES** |
| IAQ | ✅ | ✅ | ❌ | ✅ | ✅ | **YES** |
| Water Heating | ✅ | ✅ | ❌ | ✅ | ✅ | **YES** |
| Commercial | ✅ | ✅ | ❌ | ✅ | ✅ | **YES** |
| **Maintenance Plans** | ❌ | ❌ | ❌ | ❌ | ✅ | **NO** |

#### Gap 1: Maintenance Plans Not in Header Navigation

**File:** `src/components/Header.astro` (lines 16-22)

```javascript
// CURRENT - Only 5 categories hardcoded
const serviceCategories = [
  { name: 'Heating', href: '/services/category/heating' },
  { name: 'Cooling', href: '/services/category/cooling' },
  { name: 'Indoor Air Quality', href: '/services/category/iaq' },
  { name: 'Water Heating', href: '/services/category/water-heating' },
  { name: 'Commercial', href: '/services/category/commercial' },
  // ❌ Maintenance Plans MISSING
];
```

#### Gap 2: Maintenance Plans Not in Homepage Grid

**File:** `src/components/sections/ServiceCategoriesGrid.astro` (line 8)

```javascript
// CURRENT - Sliced to only 5 categories
const categories = businessProfile?.data.services?.navbar_categories?.slice(0, 5) || [];
// ❌ Excludes 6th category (Maintenance Plans)
```

#### Gap 3: No Plans Category Page

**Missing file:** `src/content/service-categories/plans.md`

Without this file, `/services/category/plans` cannot be generated.

**Existing category pages:**
- ✅ `heating.md`
- ✅ `cooling.md`
- ✅ `iaq.md`
- ✅ `water-heating.md`
- ✅ `commercial.md`
- ❌ `plans.md` — DOES NOT EXIST

#### Impact

Users can ONLY reach Maintenance Plans via:
1. Direct URL: `/services/maintenance-plans`
2. Search engines (if indexed)
3. Service-city pages: `/services/maintenance-plans-guelph-on/`

**Cannot reach via:**
- Navigation menus
- Homepage service grid
- Category landing pages

---

## Part 5: Missing Content

### Gap: `indoor-air-quality.md` Does Not Exist

**PRD US-003 expected:** `indoor-air-quality.md`
**Actual:** File does not exist

**Context:**
- Keyword strategy identifies "Indoor Air Quality Solutions" as **Pillar 6 (Quick Win)**
- Target keywords: "indoor air quality", "indoor air quality solutions"
- **2,500+ monthly searches** with growing trend
- Would serve as IAQ category overview linking to specific services

**Current IAQ services:**
- humidifiers.md
- dehumidifiers.md
- air-filtration-air-purifiers.md
- hrv-erv-ventilation.md

**Missing:**
- indoor-air-quality.md (pillar/overview page)

---

## Part 6: profile.yaml Service Mapping

**File:** `src/content/business/profile.yaml`

### Current Service List (23 total in profile)

| Category | Services in profile.yaml | Services in content/ |
|----------|--------------------------|---------------------|
| heating | 10 services | 9 files |
| cooling | 3 services | 4 files (includes ductless) |
| iaq | 4 services | 4 files |
| water_heating | 2 services | 2 files |
| commercial | 2 services | 2 files |
| plans | 1 service | 1 file |

**Note:** Minor discrepancies exist between profile.yaml listings and actual content files. Need to verify alignment.

---

## Summary of Required Fixes

### Content Fixes

| # | Fix | File | Priority |
|---|-----|------|----------|
| 1 | Create IAQ pillar page | `src/content/services/indoor-air-quality.md` | High |
| 2 | Create plans category | `src/content/service-categories/plans.md` | High |

### Navigation Fixes

| # | Fix | File | Change |
|---|-----|------|--------|
| 3 | Add Maintenance Plans to header | `src/components/Header.astro` | Add 6th category |
| 4 | Show 6 categories on homepage | `src/components/sections/ServiceCategoriesGrid.astro` | Change `.slice(0, 5)` to `.slice(0, 6)` |

### Data Fixes

| # | Fix | File | Change |
|---|-----|------|--------|
| 5 | Add indoor-air-quality to iaq list | `src/content/business/profile.yaml` | Add service entry |

---

## Verification After Fixes

- [ ] `pnpm build` passes
- [ ] `/services/category/plans` renders (new category page)
- [ ] `/services/maintenance-plans` accessible from navigation
- [ ] `/services/indoor-air-quality` renders (new service page)
- [ ] Header dropdown shows 6 categories
- [ ] Homepage grid shows 6 category cards
- [ ] All 23 services discoverable via navigation

---

## Appendix: File Locations

### Content Collections
- Services: `src/content/services/` (22 files)
- Service Categories: `src/content/service-categories/` (5 files, need 6)
- Business Profile: `src/content/business/profile.yaml`

### Components
- Header: `src/components/Header.astro`
- Mobile Nav: `src/components/MobileNav.tsx`
- Homepage Grid: `src/components/sections/ServiceCategoriesGrid.astro`
- Service Page Template: `src/pages/services/[service].astro`
- Category Page Template: `src/pages/services/category/[category].astro`

### Schema
- Content Config: `src/content/config.ts`

---

*This document serves as the source of truth for Phase 6C audit findings. Use it to plan fixes.*
