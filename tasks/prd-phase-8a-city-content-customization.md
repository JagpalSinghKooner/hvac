# PRD: Phase 8A - City-Level Content Customization

## Introduction

Transform 550 service-city pages from 50% generic content to 80%+ city-specific content with E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) compliance for Google's quality guidelines. This phase adds 6 new schema fields, updates 7 components, fixes a critical LocationServicesGrid bug, adds LocalBusiness structured data, and generates **3,850 unique keyword-researched headings** across all pages with ~1,000 words per page.

**Core Problem:** Current service-city pages lack:
- City-specific headings (risk of duplicate content penalties)
- Experience signals (installation counts, years in area)
- Sufficient word count for E-E-A-T compliance (~1,000 words needed)
- Premium positioning (currently missing trust/expertise language)
- LocalBusiness structured data per page

**Solution:** Add schema fields for city-specific content, update components to render city-specific data, generate unique keyword-researched content for all 25 cities (22 services each), and enforce quality gates (heading uniqueness, word count, premium positioning).

## Goals

- Add 6 new schema fields to service-city collection (hero, finalCta, benefitsHeadline, contextHeadline, experienceStats, remove processSteps)
- Update 7 components to accept and render city-specific props
- Fix LocationServicesGrid bug (currently shows same services globally, must filter by city)
- Create LocalBusinessSchema component with schema.org JSON-LD
- Generate 3,850 unique keyword-researched headings (7 per page × 550 pages, zero duplicates)
- Achieve ~1,000 words per page for E-E-A-T compliance
- Enforce premium positioning (NO emergency/urgency language in H1s)
- Add experience stats (installation counts, years serving area) visible on all pages
- Create utility provider reference for rebate accuracy
- Verify all internal links work (parent service, location hub, cross-links)

## User Stories

### US-000: Cleanup & Reset (COMPLETE ✅)

**Description:** As a developer, I need the codebase reset from Phase 7B to prepare for Phase 8A fresh start.

**Status:** COMPLETE (reference only, already done)

**What was completed:**
- Deleted 4 Phase 7B scripts (add-trust-openers-guelph.ts, add-problem-sections-guelph.ts, add-solution-sections-guelph.ts, add-benefits-guelph.mjs)
- Deleted 5 guelph-*.md documentation files
- Reset 22 Guelph service-city files to minimal frontmatter
- Created scripts/phase8/ directory
- Updated AGENTS.md, CLAUDE.md, HOMEPAGE-REDESIGN docs
- Verified build passes (639 pages)

**Acceptance Criteria:**
- [x] All Phase 7B scripts deleted
- [x] All guelph-*.md docs deleted
- [x] 22 Guelph files reset to minimal frontmatter
- [x] scripts/phase8/ directory created
- [x] Documentation updated
- [x] pnpm build passes (639 pages)

---

### US-001: Add Schema Fields

**Description:** As a developer, I need to add 6 new fields to the service-city schema so city-specific content can be stored and rendered.

**Acceptance Criteria:**
- [ ] Open src/content/config.ts (service-city collection, lines 556-659)
- [ ] Add `hero` object with fields: title (string), description (string), both optional
- [ ] Add `finalCta` object with fields: headline (string), copy (string), both optional
- [ ] Add `benefitsHeadline` field (string, optional)
- [ ] Add `contextHeadline` field (string, optional)
- [ ] Add `experienceStats` object with fields: installationsInCity (number, optional), yearsSinceCityStart (number, optional)
- [ ] Remove `processSteps` field from schema (inherit from parent service)
- [ ] Verify schema.org definitions match lines 248-278 of PHASE-8-CITY-CONTENT-CUSTOMIZATION.md
- [ ] pnpm build passes (639 pages expected, 0 errors)
- [ ] No TypeScript errors in VSCode

---

### US-002: Update Components for City-Specific Content

**Description:** As a developer, I need to update 4 Astro components to accept and render city-specific props so pages can display unique content per city.

**Acceptance Criteria:**
- [ ] Run /frontend-design skill before modifying components (output: design spec for prop changes)
- [ ] Update ServiceHeroSection.astro: Add optional `cityHero` prop {title: string, description: string}, use cityHero.title as H1 when available, use cityHero.description when available, fallback to service-level title/description
- [ ] Update FinalCTASection.astro: Add optional props {headline: string, copy: string, cityName: string}, use city-specific content when available, fallback to generic business profile copy
- [ ] Update ServiceBenefitsSection.astro: Add optional `benefitsHeadline` prop (string), render as H2 when available
- [ ] Update ContextSection.astro: Add optional `contextHeadline` prop (string), render as H2 when available
- [ ] Verify ONLY ONE H1 per page (ServiceHeroSection only, audit all components)
- [ ] Add internal linking: Parent service link ("Learn more about [Service]" → /services/[service-slug]), Location hub link ("See all services in [City]" → /locations/[city-slug])
- [ ] Run /web-design-guidelines review for all 4 modified .astro files
- [ ] Run /agent-browser test on 3 sample Guelph pages (furnace-installation-guelph-on, heat-pump-installation-guelph-on, air-conditioner-installation-guelph-on)
- [ ] Verify H1 renders from cityHero.title when present
- [ ] Verify internal links navigate correctly
- [ ] pnpm build passes

---

### US-003: Fix LocationServicesGrid Bug

**Description:** As a developer, I need to fix LocationServicesGrid to show only services available in the current city so users see relevant cross-links instead of a global service list.

**Current Bug:** LocationServicesGrid queries `services` collection globally and shows same 8 services on all city pages (ignores locationSlug parameter).

**Expected Behavior:** Query `service-city` collection filtered by locationSlug, show ALL services available in that city (no .slice(0, 8) limit).

**Acceptance Criteria:**
- [ ] Run /frontend-design skill before modifying component (output: design spec for query logic)
- [ ] Open src/components/sections/LocationServicesGrid.astro
- [ ] Replace line 33 query from `getCollection('services')` to `getCollection('service-city')`
- [ ] Add filter: `filter((entry) => entry.data.locationSlug === locationSlug)`
- [ ] Remove `.slice(0, 8)` limit (show all available services)
- [ ] Update sorting logic to work with service-city entries
- [ ] Run /web-design-guidelines review
- [ ] Run /agent-browser test on 3 cities (Guelph, Toronto, Cambridge)
- [ ] Verify Guelph shows only Guelph services
- [ ] Verify Toronto shows only Toronto services
- [ ] Verify different cities show different service counts
- [ ] pnpm build passes

---

### US-004: Add LocalBusiness Structured Data

**Description:** As a developer, I need to create a LocalBusinessSchema component so each service-city page has schema.org structured data for local SEO.

**Acceptance Criteria:**
- [ ] Run /frontend-design skill before creating component (output: design spec for schema structure)
- [ ] Create src/components/seo/LocalBusinessSchema.astro
- [ ] Accept props: serviceName (string), serviceDescription (string), cityName (string)
- [ ] Include schema.org JSON-LD with @type "LocalBusiness"
- [ ] Include areaServed field: {type: "City", name: cityName}
- [ ] Include makesOffer field: {type: "Offer", itemOffered: {type: "Service", name: serviceName, description: serviceDescription}}
- [ ] Include aggregateRating field: {type: "AggregateRating", ratingValue: "4.9", reviewCount: "200"}
- [ ] Add component to service-city page template (src/pages/services/[...slug].astro)
- [ ] Run /web-design-guidelines review
- [ ] Run /agent-browser to verify schema renders in page source (view-source or browser dev tools)
- [ ] Test on 3 sample Guelph pages
- [ ] pnpm build passes

---

### US-005: Create Utility Provider Reference Document

**Description:** As a content writer, I need a reference document mapping all 25 cities to their utility providers so rebate information is accurate in city-specific content.

**Acceptance Criteria:**
- [ ] Create docs/reference/utility-providers.md
- [ ] Research electricity provider for all 25 cities in src/content/locations/
- [ ] Research gas provider for all 25 cities
- [ ] Document rebate programs per provider (Enbridge Save on Energy, utility-specific programs)
- [ ] Create markdown table with columns: City | Electricity Provider | Gas Provider | Notes
- [ ] Include Guelph (Guelph Hydro, Enbridge, municipal utility note)
- [ ] Include Burlington (Burlington Hydro, Enbridge)
- [ ] Include Oakville (Oakville Hydro, Enbridge)
- [ ] Include Cambridge (Energy+ Inc., Enbridge, unique LDC note)
- [ ] Include Kitchener (Kitchener-Wilmot Hydro, Enbridge)
- [ ] Include Waterloo (Waterloo North Hydro, Enbridge)
- [ ] Complete all 25 cities from locations collection
- [ ] pnpm build passes (documentation only, no schema impact)

---

### US-006: Guelph Content Generation (FRESH START)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for all 22 Guelph service-city pages so they rank well with unique, city-specific content.

**Scope:** 22 files, 154 unique keyword-researched headings (7 per page), ~1,000 words per page

**Acceptance Criteria:**
- [ ] Run /orchestrator skill to confirm skill sequence for content generation
- [ ] Run /keyword-research skill for Guelph + all 22 services (154 unique headings: 1 H1 + 6 H2s per page)
- [ ] Run /positioning-angles skill for Guelph-specific differentiation
- [ ] Validate docs/project/ralph/brand-voice.md is current and applies to Phase 8A
- [ ] Run /seo-content skill for problem.description, solution.description, context sections (using researched H2 keywords)
- [ ] Run /direct-response-copy skill for hero.title, hero.description, trustOpener, benefits, finalCta, savings.description (using researched keywords)
- [ ] All 22 Guelph service-city files contain Phase 8 schema fields (hero, finalCta, benefitsHeadline, contextHeadline, experienceStats)
- [ ] All 154 headings are UNIQUE (zero duplicates across all 22 Guelph pages)
- [ ] All H1s use PREMIUM positioning (NO "24/7", "Emergency", "Same-Day", "Urgent" language)
- [ ] H1 examples: "Guelph's Trusted Furnace Installation Experts Since 1994", not "24-Hour Emergency Furnace Repair"
- [ ] Word count ~1,000 per page verified (hero 50-100, trustOpener 50-100, problem 250-350, solution 250-350, benefits 120, context 200-400, savings 100-150, finalCta 50-75)
- [ ] Em dash check passes: `grep -r '\--' src/content/service-city/guelph*.md` returns 0 matches
- [ ] Experience stats added to all pages (installationsInCity, yearsSinceCityStart)
- [ ] Experience stats VISIBLE in hero.description: "Over [X] installations in Guelph"
- [ ] pnpm build passes (639 pages)
- [ ] Run /agent-browser on 3 sample pages (furnace-installation-guelph-on, heat-pump-installation-guelph-on, air-conditioner-installation-guelph-on)

---

### US-007: Burlington, Oakville, Milton Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Burlington, Oakville, and Milton service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**
- [ ] Run /orchestrator skill to confirm skill sequence
- [ ] Run /keyword-research skill for Burlington, Oakville, Milton + all 22 services (462 unique headings)
- [ ] Run /positioning-angles skill for city-specific differentiation (Burlington lakefront, Oakville affluence, Milton growth)
- [ ] Validate brand-voice.md applies
- [ ] Run /seo-content skill for problem, solution, context sections
- [ ] Run /direct-response-copy skill for hero, trustOpener, benefits, finalCta, savings
- [ ] All 66 files contain Phase 8 schema fields
- [ ] All 462 headings are UNIQUE (zero duplicates, including checking against existing Guelph headings)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (0 matches)
- [ ] Experience stats added and visible
- [ ] pnpm build passes
- [ ] Run /agent-browser on 3 sample pages (1 from each city)

---

### US-008: Georgetown, Acton, Rockwood Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Georgetown, Acton, and Rockwood service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**
- [ ] Run /orchestrator skill to confirm skill sequence
- [ ] Run /keyword-research skill for Georgetown, Acton, Rockwood + all 22 services (462 unique headings)
- [ ] Run /positioning-angles skill for city-specific differentiation
- [ ] Validate brand-voice.md applies
- [ ] Run /seo-content skill for problem, solution, context sections
- [ ] Run /direct-response-copy skill for hero, trustOpener, benefits, finalCta, savings
- [ ] All 66 files contain Phase 8 schema fields
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (0 matches)
- [ ] Experience stats added and visible
- [ ] pnpm build passes
- [ ] Run /agent-browser on 3 sample pages

---

### US-009: Cambridge, Kitchener, Waterloo Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Cambridge, Kitchener, and Waterloo service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**
- [ ] Run /orchestrator skill to confirm skill sequence
- [ ] Run /keyword-research skill for Cambridge, Kitchener, Waterloo + all 22 services (462 unique headings)
- [ ] Run /positioning-angles skill for city-specific differentiation (university cities, tech hubs)
- [ ] Validate brand-voice.md applies
- [ ] Run /seo-content skill for problem, solution, context sections
- [ ] Run /direct-response-copy skill for hero, trustOpener, benefits, finalCta, savings
- [ ] All 66 files contain Phase 8 schema fields
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (0 matches)
- [ ] Experience stats added and visible
- [ ] pnpm build passes
- [ ] Run /agent-browser on 3 sample pages

---

### US-010: Elmira, St. Jacobs, New Hamburg Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Elmira, St. Jacobs, and New Hamburg service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**

**STEP 0: Read Reference Files (MANDATORY)**
- [ ] Read `docs/reference/service-city-template.md` - canonical schema structure
- [ ] Read `docs/reference/utility-providers.md` - rebate info for these cities
- [ ] Read `docs/project/ralph/brand-voice.md` - voice consistency

**STEP 1: Keyword Research (Anti-Loop Pattern)**
- [ ] FOR EACH city (elmira, st-jacobs, new-hamburg):
  - [ ] Check if `docs/reference/[city]-keywords.md` exists
  - [ ] IF FILE EXISTS: Read file, verify 154 headings present, SKIP to STEP 2
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save to `docs/reference/[city]-keywords.md`

**STEP 2: Positioning Angles (Anti-Loop Pattern)**
- [ ] FOR EACH city:
  - [ ] Check if `docs/reference/[city]-positioning.md` exists
  - [ ] IF FILE EXISTS: Read file, verify positioning present, SKIP to STEP 3
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles (rural communities, Mennonite heritage), save output

**STEP 3: Content Generation**
- [ ] FOR EACH of 66 files:
  - [ ] Check if hero.title is populated (content exists)
  - [ ] IF POPULATED: SKIP to next file
  - [ ] IF EMPTY: Generate content using template structure (see service-city-template.md)
  - [ ] CRITICAL: Verify markdown body exists after `---` (file MUST NOT end with frontmatter)
  - [ ] CRITICAL: Include all 4 SEO fields (title, seoTitle, seoDescription, workflowStatus)

**STEP 4: Quality Verification**
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (only frontmatter delimiters)
- [ ] Experience stats visible in hero.description
- [ ] pnpm build passes (0 errors)
- [ ] Run /agent-browser on 3 sample pages (1 per city)

---

### US-011: Fergus, Elora, Arthur Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Fergus, Elora, and Arthur service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**

**STEP 0: Read Reference Files (MANDATORY)**
- [ ] Read `docs/reference/service-city-template.md` - canonical schema structure
- [ ] Read `docs/reference/utility-providers.md` - rebate info for these cities
- [ ] Read `docs/project/ralph/brand-voice.md` - voice consistency

**STEP 1: Keyword Research (Anti-Loop Pattern)**
- [ ] FOR EACH city (fergus, elora, arthur):
  - [ ] Check if `docs/reference/[city]-keywords.md` exists
  - [ ] IF FILE EXISTS: Read file, verify 154 headings present, SKIP to STEP 2
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save to `docs/reference/[city]-keywords.md`

**STEP 2: Positioning Angles (Anti-Loop Pattern)**
- [ ] FOR EACH city:
  - [ ] Check if `docs/reference/[city]-positioning.md` exists
  - [ ] IF FILE EXISTS: Read file, verify positioning present, SKIP to STEP 3
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles (historic towns, Elora Gorge area), save output

**STEP 3: Content Generation**
- [ ] FOR EACH of 66 files:
  - [ ] Check if hero.title is populated (content exists)
  - [ ] IF POPULATED: SKIP to next file
  - [ ] IF EMPTY: Generate content using template structure (see service-city-template.md)
  - [ ] CRITICAL: Verify markdown body exists after `---` (file MUST NOT end with frontmatter)
  - [ ] CRITICAL: Include all 4 SEO fields (title, seoTitle, seoDescription, workflowStatus)

**STEP 4: Quality Verification**
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (only frontmatter delimiters)
- [ ] Experience stats visible in hero.description
- [ ] pnpm build passes (0 errors)
- [ ] Run /agent-browser on 3 sample pages (1 per city)

---

### US-012: Mount Forest, Orangeville, Shelburne Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Mount Forest, Orangeville, and Shelburne service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**

**STEP 0: Read Reference Files (MANDATORY)**
- [ ] Read `docs/reference/service-city-template.md` - canonical schema structure
- [ ] Read `docs/reference/utility-providers.md` - rebate info for these cities
- [ ] Read `docs/project/ralph/brand-voice.md` - voice consistency

**STEP 1: Keyword Research (Anti-Loop Pattern)**
- [ ] FOR EACH city (mount-forest, orangeville, shelburne):
  - [ ] Check if `docs/reference/[city]-keywords.md` exists
  - [ ] IF FILE EXISTS: Read file, verify 154 headings present, SKIP to STEP 2
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save to `docs/reference/[city]-keywords.md`

**STEP 2: Positioning Angles (Anti-Loop Pattern)**
- [ ] FOR EACH city:
  - [ ] Check if `docs/reference/[city]-positioning.md` exists
  - [ ] IF FILE EXISTS: Read file, verify positioning present, SKIP to STEP 3
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles, save output

**STEP 3: Content Generation**
- [ ] FOR EACH of 66 files:
  - [ ] Check if hero.title is populated (content exists)
  - [ ] IF POPULATED: SKIP to next file
  - [ ] IF EMPTY: Generate content using template structure (see service-city-template.md)
  - [ ] CRITICAL: Verify markdown body exists after `---` (file MUST NOT end with frontmatter)
  - [ ] CRITICAL: Include all 4 SEO fields (title, seoTitle, seoDescription, workflowStatus)

**STEP 4: Quality Verification**
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (only frontmatter delimiters)
- [ ] Experience stats visible in hero.description
- [ ] pnpm build passes (0 errors)
- [ ] Run /agent-browser on 3 sample pages (1 per city)

---

### US-013: Erin, Hillsburgh, Harriston Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Erin, Hillsburgh, and Harriston service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**

**STEP 0: Read Reference Files (MANDATORY)**
- [ ] Read `docs/reference/service-city-template.md` - canonical schema structure
- [ ] Read `docs/reference/utility-providers.md` - rebate info for these cities
- [ ] Read `docs/project/ralph/brand-voice.md` - voice consistency

**STEP 1: Keyword Research (Anti-Loop Pattern)**
- [ ] FOR EACH city (erin, hillsburgh, harriston):
  - [ ] Check if `docs/reference/[city]-keywords.md` exists
  - [ ] IF FILE EXISTS: Read file, verify 154 headings present, SKIP to STEP 2
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save to `docs/reference/[city]-keywords.md`

**STEP 2: Positioning Angles (Anti-Loop Pattern)**
- [ ] FOR EACH city:
  - [ ] Check if `docs/reference/[city]-positioning.md` exists
  - [ ] IF FILE EXISTS: Read file, verify positioning present, SKIP to STEP 3
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles, save output

**STEP 3: Content Generation**
- [ ] FOR EACH of 66 files:
  - [ ] Check if hero.title is populated (content exists)
  - [ ] IF POPULATED: SKIP to next file
  - [ ] IF EMPTY: Generate content using template structure (see service-city-template.md)
  - [ ] CRITICAL: Verify markdown body exists after `---` (file MUST NOT end with frontmatter)
  - [ ] CRITICAL: Include all 4 SEO fields (title, seoTitle, seoDescription, workflowStatus)

**STEP 4: Quality Verification**
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (only frontmatter delimiters)
- [ ] Experience stats visible in hero.description
- [ ] pnpm build passes (0 errors)
- [ ] Run /agent-browser on 3 sample pages (1 per city)

---

### US-014: Palmerston, Listowel, Drayton Content (66 files, 462 headings)

**Description:** As a content writer, I need to generate E-E-A-T compliant content for Palmerston, Listowel, and Drayton service-city pages (3 cities × 22 services = 66 files).

**Scope:** 66 files, 462 unique keyword-researched headings, ~1,000 words per page

**Acceptance Criteria:**

**STEP 0: Read Reference Files (MANDATORY)**
- [ ] Read `docs/reference/service-city-template.md` - canonical schema structure
- [ ] Read `docs/reference/utility-providers.md` - rebate info for these cities
- [ ] Read `docs/project/ralph/brand-voice.md` - voice consistency

**STEP 1: Keyword Research (Anti-Loop Pattern)**
- [ ] FOR EACH city (palmerston, listowel, drayton):
  - [ ] Check if `docs/reference/[city]-keywords.md` exists
  - [ ] IF FILE EXISTS: Read file, verify 154 headings present, SKIP to STEP 2
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save to `docs/reference/[city]-keywords.md`

**STEP 2: Positioning Angles (Anti-Loop Pattern)**
- [ ] FOR EACH city:
  - [ ] Check if `docs/reference/[city]-positioning.md` exists
  - [ ] IF FILE EXISTS: Read file, verify positioning present, SKIP to STEP 3
  - [ ] IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles, save output

**STEP 3: Content Generation**
- [ ] FOR EACH of 66 files:
  - [ ] Check if hero.title is populated (content exists)
  - [ ] IF POPULATED: SKIP to next file
  - [ ] IF EMPTY: Generate content using template structure (see service-city-template.md)
  - [ ] CRITICAL: Verify markdown body exists after `---` (file MUST NOT end with frontmatter)
  - [ ] CRITICAL: Include all 4 SEO fields (title, seoTitle, seoDescription, workflowStatus)

**STEP 4: Quality Verification**
- [ ] All 462 headings are UNIQUE (zero duplicates globally)
- [ ] All H1s use PREMIUM positioning (NO emergency language)
- [ ] Word count ~1,000 per page verified
- [ ] Em dash check passes (only frontmatter delimiters)
- [ ] Experience stats visible in hero.description
- [ ] pnpm build passes (0 errors)
- [ ] Run /agent-browser on 3 sample pages (1 per city)

---

### US-015: Automated Verification & Cleanup Scripts

**Description:** As a developer, I need automated scripts to verify heading uniqueness, word counts, and content quality across all 550 service-city pages so quality gates are enforced.

**Acceptance Criteria:**
- [ ] Create scripts/phase8/check-h1-uniqueness.ts: Extract all H1s from hero.title fields, detect duplicates, output report
- [ ] Create scripts/phase8/check-h2-uniqueness.ts: Extract all H2s (problem.headline, solution.headline, benefitsHeadline, contextHeadline, savings.headline, finalCta.headline), detect duplicates, output report
- [ ] Create scripts/phase8/check-heading-keywords.ts: Verify all headings contain service name OR city name, output compliance %
- [ ] Create scripts/phase8/check-word-count.ts: Count words per page (all text fields combined), flag pages <900 words, output report
- [ ] Create scripts/phase8/check-em-dashes.ts: Search all service-city files for em dashes (--), output matches
- [ ] Add package.json scripts: "check:h1-uniqueness": "tsx scripts/phase8/check-h1-uniqueness.ts"
- [ ] Add package.json scripts: "check:h2-uniqueness": "tsx scripts/phase8/check-h2-uniqueness.ts"
- [ ] Add package.json scripts: "check:heading-keywords": "tsx scripts/phase8/check-heading-keywords.ts"
- [ ] Add package.json scripts: "check:word-count": "tsx scripts/phase8/check-word-count.ts"
- [ ] Add package.json scripts: "check:em-dashes": "tsx scripts/phase8/check-em-dashes.ts"
- [ ] Run all 5 scripts and verify 100% compliance (0 H1 duplicates, 0 H2 duplicates, 100% keyword compliance, all pages ~1,000 words, 0 em dashes)
- [ ] pnpm build passes

---

### US-016: Experience Stats Population

**Description:** As a content writer, I need realistic installation count data added to all 550 service-city pages so experience signals are visible and credible.

**Acceptance Criteria:**
- [ ] Run /orchestrator skill to confirm data strategy for installation counts
- [ ] Calculate realistic installation counts per city based on 30+ years in business (since 1994)
- [ ] Distribute counts proportionally across services (furnace highest, boiler lowest)
- [ ] Add experienceStats object to all 550 service-city files
- [ ] Verify stats visible in hero.description: "Over [X] [service] installations in [City]"
- [ ] Verify stats visible in context section: "[X]+ years serving [City] homeowners"
- [ ] Stats must be realistic (Guelph higher counts, smaller towns lower counts)
- [ ] pnpm build passes

---

### US-017: Internal Linking Audit

**Description:** As a QA tester, I need to verify all internal links work correctly across service-city pages so users can navigate between related content.

**Acceptance Criteria:**
- [ ] Run /agent-browser to test internal links on 5 sample cities (Guelph, Burlington, Cambridge, Fergus, Orangeville)
- [ ] Verify parent service links work: furnace-installation-guelph-on → /services/furnace-installation
- [ ] Verify location hub links work: furnace-installation-guelph-on → /locations/guelph
- [ ] Verify LocationServicesGrid shows correct cross-links (only services in that city)
- [ ] Test on 5 cities × 3 services = 15 pages total
- [ ] All links resolve correctly (no 404s, no broken anchors)
- [ ] pnpm build passes

---

## Functional Requirements

- FR-1: Service-city schema MUST include 6 new fields: hero {title, description}, finalCta {headline, copy}, benefitsHeadline, contextHeadline, experienceStats {installationsInCity, yearsSinceCityStart}
- FR-2: Service-city schema MUST remove processSteps field (inherit from parent service)
- FR-3: ServiceHeroSection component MUST accept cityHero prop and render cityHero.title as H1 when available
- FR-4: FinalCTASection component MUST accept headline, copy, cityName props and render city-specific content when available
- FR-5: ServiceBenefitsSection MUST accept benefitsHeadline prop and render as H2
- FR-6: ContextSection MUST accept contextHeadline prop and render as H2
- FR-7: LocationServicesGrid MUST query service-city collection filtered by locationSlug (not global services collection)
- FR-8: LocalBusinessSchema component MUST include schema.org LocalBusiness with areaServed, makesOffer, aggregateRating
- FR-9: All 550 service-city pages MUST have 7 unique keyword-researched headings (1 H1 + 6 H2s)
- FR-10: ALL 3,850 headings MUST be unique across entire site (zero duplicates)
- FR-11: All H1s MUST use premium positioning keywords: "Trusted", "Expert", "Professional", "Since 1994", "30+ Years"
- FR-12: All H1s MUST NOT include emergency/urgency keywords: "24/7", "24-Hour", "Emergency", "Same-Day", "Urgent"
- FR-13: All service-city pages MUST contain ~1,000 words (combined: hero 50-100, trustOpener 50-100, problem 250-350, solution 250-350, benefits 120, context 200-400, savings 100-150, finalCta 50-75)
- FR-14: Experience stats MUST be visible in hero.description AND context sections (not just structured data)
- FR-15: All pages MUST have parent service link and location hub link
- FR-16: NO content MUST contain em dashes (--), use en dashes or rephrase

## Non-Goals (Out of Scope)

- ❌ Gallery images (Phase 8C - deferred until real photos available)
- ❌ City-specific FAQs (Phase 8B - separate PRD, 825-1,375 new FAQs)
- ❌ City-specific reviews (Phase 8D - separate PRD, 5,500 reviews)
- ❌ Process steps customization (inherit from parent service page)
- ❌ Online booking forms (business model is phone calls only)
- ❌ Emergency/urgency messaging (contradicts premium positioning strategy)

## Design Considerations

- **Premium Positioning:** All H1s emphasize trust, expertise, longevity (NOT urgency, NOT emergency)
- **E-E-A-T Signals:** Experience stats must be prominent (hero + context sections), not hidden in structured data
- **NO City-Swap Templates:** Each heading must be unique, researched for local SEO long-tail keywords
- **Content Depth:** ~1,000 words per page required for YMYL topic authority (HVAC = safety + financial decisions)
- **Internal Linking:** Every page links to parent service + location hub for site architecture
- **Structured Data:** LocalBusiness schema per page for local search visibility

## Technical Considerations

- **Schema Changes:** Adding 6 fields, removing 1 field requires build verification (639 pages)
- **Component Updates:** 7 components affected, must verify only ONE H1 per page after changes
- **Content Generation:** 550 pages × 16 fields = 8,800 field values, requires skill chaining (/orchestrator → /keyword-research → /positioning-angles → /seo-content → /direct-response-copy)
- **Heading Uniqueness:** 3,850 headings require automated duplicate detection (manual review impractical)
- **Word Count:** Automated scripts required to verify ~1,000 words per page across 550 pages
- **Quality Gates:** Em dash check, heading keyword check, premium positioning check all automated
- **Build Performance:** 639 pages currently, no performance degradation expected
- **Proven Pattern:** Phase 7B Guelph execution validates skill chain and 10-story PRD approach

## Success Metrics

- ✅ All 550 service-city pages have city-specific content (not generic templates)
- ✅ 3,850 unique headings with zero duplicates globally
- ✅ All H1s and H2s contain service + city keywords (100% compliance)
- ✅ All H1s use premium positioning (0% emergency language)
- ✅ ~1,000 words per page average (E-E-A-T content depth)
- ✅ Experience stats visible on all pages (hero + context sections)
- ✅ LocalBusiness schema on all pages (structured data for local SEO)
- ✅ Internal links functional (parent service + location hub on all pages)
- ✅ LocationServicesGrid shows correct services per city (no global list)
- ✅ Zero em dashes in any content (automated check passes)
- ✅ pnpm build passes with 0 errors (639 pages)
- ✅ Visual testing confirms all sections render correctly (/agent-browser on samples)

## Open Questions

None - specification is complete and validated against Phase 7B execution patterns.
