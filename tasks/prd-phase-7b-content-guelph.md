# PRD: Phase 7B — Content Generation (Guelph Batch)

## Introduction

Generate unique SEO content for all 22 service-city pages in Guelph. This is the first city batch of Phase 7B content generation, following the successful completion of Phase 7A infrastructure consolidation.

**Scope:** 22 service-city files in `src/content/service-city/*-guelph-on.md`

**City:** Guelph, Ontario (Core service area)

---

## Goals

- Generate unique `trustOpener` content for all 22 Guelph service pages
- Generate unique `problem` object (headline, description, issues) for all 22 pages
- Generate unique `solution` object (headline, description, differentiators) for all 22 pages
- Generate unique `benefits` array (3-4 items) for all 22 pages
- Generate unique `savings` object for all 22 pages
- Ensure NO city-swapping (each service gets unique Guelph-specific content)
- `pnpm build` passes with all updated pages

---

## User Stories

### US-001: Keyword Research for Guelph Services
**Description:** As a developer, I want to identify target keywords for Guelph HVAC services so that content is SEO-optimized.

**Acceptance Criteria:**
- [ ] Research primary keywords for each of the 22 services in Guelph market
- [ ] Identify local search intent (e.g., "furnace installation guelph", "ac repair guelph")
- [ ] Document keyword targets in a scratch file for content generation
- [ ] Include local modifiers (neighbourhoods: Ward, Riverside, South End, etc.)

**Required Skills:** `/keyword-research`

---

### US-002: Positioning Angles for Guelph Market
**Description:** As a developer, I want unique positioning angles for Guelph so that content differentiates B.A.P in this market.

**Acceptance Criteria:**
- [ ] Identify 3-5 unique angles for Guelph market positioning
- [ ] Consider: Victorian-era homes in the Ward, newer builds in South Guelph, University of Guelph area
- [ ] Document angles that can be woven into all 22 service pages
- [ ] Focus on trust and local expertise (NOT urgency/emergency)

**Required Skills:** `/positioning-angles`

---

### US-003: Brand Voice Profile
**Description:** As a developer, I want a consistent brand voice profile so that all Guelph content sounds like B.A.P.

**Acceptance Criteria:**
- [ ] Define B.A.P brand voice attributes (premium, trustworthy, accountable)
- [ ] Document tone guidelines for content generation
- [ ] Include phrases to USE and phrases to AVOID
- [ ] Voice should match existing site copy style

**Required Skills:** `/brand-voice`

---

### US-004: Generate trustOpener for Guelph Services (Batch 1: HVAC Core)
**Description:** As a developer, I want trustOpener content for core HVAC services in Guelph.

**Acceptance Criteria:**
- [ ] Generate unique trustOpener for: furnace-installation, furnace-repair, furnace-maintenance
- [ ] Generate unique trustOpener for: air-conditioner-installation, air-conditioner-repair, air-conditioner-maintenance
- [ ] Each trustOpener is 2-3 sentences, mentions Guelph specifically
- [ ] Each references local neighbourhoods or landmarks where appropriate
- [ ] Update YAML files in `src/content/service-city/`
- [ ] `pnpm build` passes

**Required Skills:** `/brand-voice`, `/direct-response-copy`

---

### US-005: Generate trustOpener for Guelph Services (Batch 2: Heat Pumps & Boilers)
**Description:** As a developer, I want trustOpener content for heat pumps and boilers in Guelph.

**Acceptance Criteria:**
- [ ] Generate unique trustOpener for: heat-pump-installation, heat-pump-repair, heat-pump-maintenance
- [ ] Generate unique trustOpener for: boiler-installation, boiler-repair, boiler-services
- [ ] Each trustOpener is 2-3 sentences, mentions Guelph specifically
- [ ] Update YAML files in `src/content/service-city/`
- [ ] `pnpm build` passes

**Required Skills:** `/brand-voice`, `/direct-response-copy`

---

### US-006: Generate trustOpener for Guelph Services (Batch 3: Water & Air Quality)
**Description:** As a developer, I want trustOpener content for water heaters and air quality services in Guelph.

**Acceptance Criteria:**
- [ ] Generate unique trustOpener for: water-heater-installation, water-heater-repair, tankless-water-heaters
- [ ] Generate unique trustOpener for: indoor-air-quality, duct-cleaning, humidifiers-dehumidifiers
- [ ] Each trustOpener is 2-3 sentences, mentions Guelph specifically
- [ ] Update YAML files in `src/content/service-city/`
- [ ] `pnpm build` passes

**Required Skills:** `/brand-voice`, `/direct-response-copy`

---

### US-007: Generate trustOpener for Guelph Services (Batch 4: Specialty)
**Description:** As a developer, I want trustOpener content for specialty services in Guelph.

**Acceptance Criteria:**
- [ ] Generate unique trustOpener for: ductless-mini-splits, thermostats-controls
- [ ] Generate unique trustOpener for: gas-fireplaces, hvac-emergency-services
- [ ] Each trustOpener is 2-3 sentences, mentions Guelph specifically
- [ ] Update YAML files in `src/content/service-city/`
- [ ] `pnpm build` passes

**Required Skills:** `/brand-voice`, `/direct-response-copy`

---

### US-008: Generate problem Content for Guelph (Batch 1: HVAC Core)
**Description:** As a developer, I want problem section content for core HVAC services in Guelph.

**Acceptance Criteria:**
- [ ] Generate problem object (headline, description, issues array) for: furnace-installation, furnace-repair, furnace-maintenance
- [ ] Generate problem object for: air-conditioner-installation, air-conditioner-repair, air-conditioner-maintenance
- [ ] Each headline includes city name (e.g., "The Hidden Cost of an Aging Furnace in Guelph")
- [ ] Description references local challenges (Victorian homes, harsh winters)
- [ ] Issues array has 3-4 city-specific pain points
- [ ] Update YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-009: Generate problem Content for Guelph (Batch 2: Heat Pumps & Boilers)
**Description:** As a developer, I want problem section content for heat pumps and boilers in Guelph.

**Acceptance Criteria:**
- [ ] Generate problem object for: heat-pump-installation, heat-pump-repair, heat-pump-maintenance
- [ ] Generate problem object for: boiler-installation, boiler-repair, boiler-services
- [ ] Each headline includes city name
- [ ] Issues array has 3-4 city-specific pain points
- [ ] Update YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-010: Generate problem Content for Guelph (Batch 3: Water & Air Quality)
**Description:** As a developer, I want problem section content for water heaters and air quality in Guelph.

**Acceptance Criteria:**
- [ ] Generate problem object for: water-heater-installation, water-heater-repair, tankless-water-heaters
- [ ] Generate problem object for: indoor-air-quality, duct-cleaning, humidifiers-dehumidifiers
- [ ] Each headline includes city name
- [ ] Issues array has 3-4 city-specific pain points
- [ ] Update YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-011: Generate problem Content for Guelph (Batch 4: Specialty)
**Description:** As a developer, I want problem section content for specialty services in Guelph.

**Acceptance Criteria:**
- [ ] Generate problem object for: ductless-mini-splits, thermostats-controls
- [ ] Generate problem object for: gas-fireplaces, hvac-emergency-services
- [ ] Each headline includes city name
- [ ] Issues array has 3-4 city-specific pain points
- [ ] Update YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-012: Generate solution Content for Guelph (All Services)
**Description:** As a developer, I want solution section content for all 22 services in Guelph.

**Acceptance Criteria:**
- [ ] Generate solution object (headline, description, differentiators) for all 22 services
- [ ] Each headline positions B.A.P as local expert (e.g., "Professional Furnace Installation for Guelph Homes")
- [ ] Description mentions local expertise, permits, building codes
- [ ] Differentiators array has 3 city-relevant credentials
- [ ] Update all 22 YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-013: Generate benefits Content for Guelph (All Services)
**Description:** As a developer, I want benefits array content for all 22 services in Guelph.

**Acceptance Criteria:**
- [ ] Generate benefits array (3-4 items) for all 22 services
- [ ] Each benefit has: title, description, icon
- [ ] Benefits reference Guelph-specific value (local expertise, same-day service, energy savings)
- [ ] Icons selected from available set: map-pin, piggy-bank, clock, shield, thermometer, home, etc.
- [ ] Update all 22 YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-014: Generate savings Content for Guelph (All Services)
**Description:** As a developer, I want savings section content for all 22 services in Guelph.

**Acceptance Criteria:**
- [ ] Generate savings object (headline, description, bullets, rebateInfo, financingNote) for all 22 services
- [ ] Research current rebate programs: Enbridge, federal Greener Homes, local initiatives
- [ ] Each savings section mentions Guelph-specific programs where applicable
- [ ] Include financing note: "0% financing for 60 months OAC"
- [ ] Update all 22 YAML files
- [ ] `pnpm build` passes

**Required Skills:** `/seo-content`

---

### US-015: Visual Verification - Guelph Pages
**Description:** As a developer, I want to verify all Guelph service-city pages render correctly.

**Acceptance Criteria:**
- [ ] Start dev server: `pnpm dev`
- [ ] Navigate to `/services/furnace-installation-guelph-on`
- [ ] Verify trustOpener section renders with content
- [ ] Verify problem section renders with headline, description, issues
- [ ] Verify solution section renders with headline, description, differentiators
- [ ] Verify benefits section renders with 3-4 cards
- [ ] Verify savings section renders with rebate info
- [ ] Spot-check 3-4 other Guelph pages for consistency
- [ ] Test at 375px mobile viewport

**Required Skills:** `/agent-browser`

---

### US-016: Content Quality Review
**Description:** As a developer, I want to verify content quality meets standards.

**Acceptance Criteria:**
- [ ] Review 5 random Guelph pages for unique content (NO city-swapping)
- [ ] Verify brand voice consistency across pages
- [ ] Verify NO emergency/urgency messaging ("24/7", "limited time")
- [ ] Verify all content positions B.A.P as premium, accountable
- [ ] `pnpm build` passes
- [ ] Commit: "feat: add Guelph service-city content (Phase 7B batch 1)"

**Required Skills:** `/web-design-guidelines`

---

## Functional Requirements

- **FR-1:** All 22 Guelph service-city files have populated `trustOpener` field
- **FR-2:** All 22 files have populated `problem` object with headline, description, issues
- **FR-3:** All 22 files have populated `solution` object with headline, description, differentiators
- **FR-4:** All 22 files have populated `benefits` array with 3-4 items
- **FR-5:** All 22 files have populated `savings` object with rebate information
- **FR-6:** Content is unique per service (NO templates with just city name swapped)
- **FR-7:** Content follows B.A.P brand voice (premium, trustworthy, NOT urgent)

---

## Non-Goals

- Generating content for other cities (separate PRDs per city batch)
- Modifying `galleryImages` (uses fallback pattern from parent service)
- Modifying `processSteps` (inherits from parent service)
- Adding new schema fields
- Modifying component behavior

---

## Technical Considerations

- **Schema:** Fields already exist in service-city schema (Phase 7A added them)
- **Validation:** Zod schema validates content structure
- **Build:** `pnpm build` must pass after each content batch
- **Files:** 22 files in `src/content/service-city/*-guelph-on.md`

---

## Success Metrics

- [ ] 22/22 Guelph files have all 5 content fields populated
- [ ] `pnpm build` passes (573 pages)
- [ ] Visual verification confirms rendering
- [ ] Brand voice review passes
- [ ] NO emergency/urgency messaging
- [ ] Content is unique (not city-swapped)

---

## Services List (22)

| # | Service | File |
|---|---------|------|
| 1 | Furnace Installation | furnace-installation-guelph-on.md |
| 2 | Furnace Repair | furnace-repair-guelph-on.md |
| 3 | Furnace Maintenance | furnace-maintenance-guelph-on.md |
| 4 | Air Conditioner Installation | air-conditioner-installation-guelph-on.md |
| 5 | Air Conditioner Repair | air-conditioner-repair-guelph-on.md |
| 6 | Air Conditioner Maintenance | air-conditioner-maintenance-guelph-on.md |
| 7 | Heat Pump Installation | heat-pump-installation-guelph-on.md |
| 8 | Heat Pump Repair | heat-pump-repair-guelph-on.md |
| 9 | Heat Pump Maintenance | heat-pump-maintenance-guelph-on.md |
| 10 | Boiler Installation | boiler-installation-guelph-on.md |
| 11 | Boiler Repair | boiler-repair-guelph-on.md |
| 12 | Boiler Services | boiler-services-guelph-on.md |
| 13 | Water Heater Installation | water-heater-installation-guelph-on.md |
| 14 | Water Heater Repair | water-heater-repair-guelph-on.md |
| 15 | Tankless Water Heaters | tankless-water-heaters-guelph-on.md |
| 16 | Indoor Air Quality | indoor-air-quality-guelph-on.md |
| 17 | Duct Cleaning | duct-cleaning-guelph-on.md |
| 18 | Humidifiers & Dehumidifiers | humidifiers-dehumidifiers-guelph-on.md |
| 19 | Ductless Mini Splits | ductless-mini-splits-guelph-on.md |
| 20 | Thermostats & Controls | thermostats-controls-guelph-on.md |
| 21 | Gas Fireplaces | gas-fireplaces-guelph-on.md |
| 22 | HVAC Emergency Services | hvac-emergency-services-guelph-on.md |

---

## City Batch Order Reference

This is batch 1 of 25 city batches. Full order:

| Priority | Cities |
|----------|--------|
| **High (1-7)** | Guelph, Kitchener, Cambridge, Waterloo, Hamilton, Burlington, Oakville |
| **Medium (8-14)** | Milton, Georgetown, Brampton, Brantford, Halton Hills, Caledon, Orangeville |
| **Standard (15-25)** | Remaining: Acton, Bolton, Breslau, Eden Mills, Elmira, Elora, Erin, Fergus, Grand Valley, Jerseyville, Rockwood, Shelburne |

---

**PRD Created:** January 22, 2026
**Batch:** 1 of 25 (Guelph)
**Stories:** 16
**Files:** 22 service-city YAML files
**Reference:** [PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md](../PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md)
