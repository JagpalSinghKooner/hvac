# Phase 8A: City-Level Content Customization (E-E-A-T Enhanced)

## Executive Summary

Transform service-city pages from 50% generic content to 80%+ city-specific content with **3,850 unique keyword-researched headings** across 550 pages. This phase includes full E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) compliance for Google's quality guidelines.

**Goal:** Each city page demonstrates local expertise with UNIQUE content - no city-swap templates. Every heading (H1 + 6 H2s per page) must be keyword-researched and unique across the entire site.

**Key Deliverables:**
- 3,850 unique keyword-researched headings
- minimum ~1,000 words per page (E-E-A-T content depth)
- Experience signals (installation counts per city)
- LocalBusiness structured data per page
- Internal linking architecture
- Premium positioning (NOT emergency/repair messaging)

---

## E-E-A-T Requirements (Google Quality Guidelines)

### Experience (First "E" - CRITICAL)

Google's 2022 update prioritizes **first-hand experience**. Every page must demonstrate real local experience.

**Required Experience Signals:**
- Installation counts per city: "Over 200 furnace installations in Guelph"
- Years serving the area: "15+ years serving Guelph homeowners"
- Visible in `hero.description` AND `context` sections (not just structured data)

**Schema Addition:**
```typescript
experienceStats: z.object({
  installationsInCity: z.number().optional(),  // e.g., 200
  yearsSinceCityStart: z.number().optional(),  // e.g., 15
}).optional()
```

**Example hero.description:**
> "With over 200 furnace installations completed in Guelph and 15+ years serving local homeowners, B.A.P Heating & Cooling delivers premium HVAC solutions backed by real experience."

### Expertise, Authoritativeness, Trustworthiness

| Signal | Implementation |
|--------|----------------|
| Expertise | Technical accuracy, certifications mentioned |
| Authoritativeness | "Since 1994", license numbers, manufacturer certifications |
| Trustworthiness | Consistent NAP, review mentions, BBB membership |

---

## Critical SEO Requirements

### PREMIUM POSITIONING - NOT Emergency Messaging

**IMPORTANT:** CLAUDE.md explicitly states:
> **WRONG:** Emergency/repair messaging ("24/7", "Emergency", "Same-Day")
> **RIGHT:** Premium installation positioning ("Trusted", "Expert", "Since 1994")

**H1 Positioning Keywords:**
- ✅ USE: "Trusted", "Expert", "Professional", "Premium", "Quality"
- ✅ USE: "Since 1994", "30+ Years", "Established"
- ❌ NEVER: "24-Hour", "Emergency", "Same-Day", "Urgent"

### ALL Headings Must Be Unique + Keyword-Researched

**Rule:** Every heading (H1, H2) on every page must be:
1. **UNIQUE** across all 550 service-city pages (zero duplicates)
2. **Keyword-researched** using `/keyword-research` for local SEO long-tail opportunities
3. **Contain service + city** (or relevant local modifier)
4. **Premium positioning** (trust/expertise language, NOT urgency)

### Heading Inventory Per Page (7 headings) - PREMIUM EXAMPLES

| Section | Level | Example (Guelph Furnace Installation) |
|---------|-------|---------------------------------------|
| Hero | H1 | "Guelph's Trusted Furnace Installation Experts Since 1994" |
| Problem | H2 | "Why Guelph Homeowners Choose Professional Furnace Installation" |
| Solution | H2 | "B.A.P's Premium Furnace Installation Process in Guelph" |
| Benefits | H2 | "What Guelph Families Get with B.A.P Furnace Service" |
| Context | H2 | "Understanding Guelph's Unique Heating Requirements" |
| Savings | H2 | "Furnace Installation Rebates for Guelph Homeowners" |
| Final CTA | H2 | "Request Your Guelph Furnace Installation Quote" |

**Total unique headings:** 550 pages x 7 headings = **3,850 unique keyword-researched headings**

### The Problem with City-Swap Content

City-swap = same content template with city name changed. Google penalizes this as duplicate content.

**BAD (City-Swap - Same Template):**
```
Guelph: "Common Furnace Problems in Guelph"
Burlington: "Common Furnace Problems in Burlington"
Oakville: "Common Furnace Problems in Oakville"
```

**GOOD (Unique Keyword-Researched):**
```
Guelph: "Why Guelph Furnaces Fail in January Cold Snaps"
Burlington: "Burlington Furnace Breakdowns: Lakefront Humidity Issues"
Oakville: "Oakville Heritage Home Furnace Problems & Solutions"
```

---

## Word Count Requirements (E-E-A-T Compliance)

**Target: ~1,000 words per service-city page**

Thin content hurts E-E-A-T, especially for YMYL topics (HVAC = safety + financial decisions).

| Section | Field | Min Words | Notes |
|---------|-------|-----------|-------|
| Hero | `hero.description` | 50-100 | Keyword-rich intro + experience stats |
| Trust | `trustOpener` | 50-100 | Credibility establishment |
| Problem | `problem.description` | 150-250 | Pain points need depth |
| Problem | `problem.issues[]` | 25 each (100 total) | 4 specific issues |
| Solution | `solution.description` | 150-250 | Solution must match problem depth |
| Benefits | `benefits[]` | 30 each (120 total) | 4 benefits with descriptions |
| Context | `context` | 200-400 | **E-E-A-T demonstration** (most important) |
| Savings | `savings.description` | 100-150 | Accurate rebate details |
| CTA | `finalCta.copy` | 50-75 | Action-oriented |
| **TOTAL** | | **~1,000 words** | Competitive content depth |

---

## Internal Linking Architecture

**Required links per page:**

1. **Parent service link** (in hero or footer)
   - "Learn more about [Service]" → `/services/[service-slug]`

2. **Location hub link** (in context or footer)
   - "See all services in [City]" → `/locations/[city-slug]`

3. **Related services in same city** (LocationServicesGrid)
   - Links to other service-city pages

4. **Blog content** (if relevant posts exist)
   - "Read: [Related Blog Post]" → `/blog/[slug]`

---

## LocalBusiness Structured Data

**Required per service-city page:**

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "B.A.P Heating & Cooling Services Ltd",
  "areaServed": {
    "@type": "City",
    "name": "Guelph"
  },
  "makesOffer": {
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": "Furnace Installation",
      "description": "Premium furnace installation for Guelph homeowners..."
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "200"
  }
}
```

---

## Current State Analysis

### FRESH START - Phase 7B Content Removed

**Status:** All Phase 7B Guelph content has been removed. Starting fresh for ALL 25 cities.

**Why:** Phase 7B content did NOT meet Phase 8 E-E-A-T requirements:
- H2 headlines missing city keywords
- Word counts not verified
- Missing new fields (hero, benefitsHeadline, contextHeadline, savings, finalCta, experienceStats)
- Solution headlines generic (not city-specific)

**Cleanup Completed:**
- ✅ Deleted 4 Phase 7B scripts
- ✅ Deleted 5 guelph-*.md documentation files
- ✅ Reset 22 Guelph service-city files to minimal frontmatter
- ✅ Build verified passing (639 pages)

### Current Guelph State (Minimal Frontmatter)
All 22 Guelph files now contain ONLY:
- `serviceSlug`
- `locationSlug`
- `title`
- `seoTitle`
- `seoDescription`
- `workflowStatus: 'draft'`

### Remaining Work (ALL 25 Cities - Fresh)
- Add schema fields (US-001)
- Update components (US-002)
- Fix LocationServicesGrid (US-003)
- Add LocalBusiness schema (US-004)
- Create utility reference (US-005)
- Generate content for Guelph (US-006) - 22 files, 154 headings
- Generate content for remaining 24 cities (US-007 to US-014) - 528 files, 3,696 headings
- Total: 550 pages x 7 unique headings = **3,850 unique headings**

---

## Critical Bug: LocationServicesGrid

**Current Behavior (WRONG):**
- `/services/furnace-repair-guelph-on` - Shows furnace, AC, heat pump, boiler, etc. (global priority list)
- `/services/furnace-repair-toronto-on` - Shows the SAME services (ignores city)

**Root Cause:**
```astro
// Line 33: Fetches ALL services globally
const allServices = await getCollection('services');

// Lines 48-66: Sorts by priority, ignores locationSlug
const sortedServices = allServices
  .sort(/* priority logic */)
  .slice(0, 8);  // Always shows same 8 services
```

**Expected Behavior:**
- Query `service-city` collection for entries matching locationSlug
- Show only services that exist in that city
- Remove `.slice(0, 8)` limit entirely

---

## Schema Changes Required

### Fields That Already Exist
- `problem.headline` (in problem object)
- `solution.headline` (in solution object)
- `savings.headline` (in savings object)

### Fields to Add

```typescript
// Add to service-city schema in src/content/config.ts

// Hero object for unique H1 + description
hero: z
  .object({
    title: z.string(),       // UNIQUE keyword-researched H1 (PREMIUM positioning)
    description: z.string(), // City-specific 2-3 sentences + experience stats
  })
  .optional(),

// Final CTA object
finalCta: z
  .object({
    headline: z.string(),   // UNIQUE keyword-researched H2
    copy: z.string(),       // City-specific CTA copy
  })
  .optional(),

// Standalone headline fields
benefitsHeadline: z.string().optional(),  // UNIQUE keyword-researched H2
contextHeadline: z.string().optional(),   // UNIQUE keyword-researched H2

// Experience stats for E-E-A-T
experienceStats: z
  .object({
    installationsInCity: z.number().optional(),  // e.g., 200
    yearsSinceCityStart: z.number().optional(),  // e.g., 15
  })
  .optional(),
```

### Fields to Remove
- `processSteps` - Inherit from parent service page (no city customization needed)

---

## Component Updates Required

### ServiceHeroSection.astro
- Add optional `cityHero` prop
- Use `cityHero.title` as H1 when available (unique long-tail keyword, PREMIUM positioning)
- Use `cityHero.description` when available (must include experience stats)
- Fallback to service-level title/description

### FinalCTASection.astro
- Add optional `headline`, `copy`, `cityName` props
- Use city-specific content when available
- Fallback to generic business profile copy

### ProblemSection, SolutionSection, BenefitsSection, ContextSection
- Ensure headline props are used correctly
- Verify only ONE H1 exists per page (audit all components)

### LocationServicesGrid.astro
- Fix query to filter by locationSlug
- Remove `.slice(0, 8)` limit entirely

### New: LocalBusinessSchema.astro
- Create component for structured data
- Include areaServed, Service, AggregateRating

---

## Workflow Prerequisites

**BEFORE starting Phase 8 implementation:**

### Step 1: Commit Staged Deletions

```bash
git add -A
git commit -m "chore: transition from Phase 7B to Phase 8 fresh start

- Remove deprecated Phase 7B scripts and reference docs
- Reset Guelph content to minimal frontmatter
- Update AGENTS.md, CLAUDE.md, HOMEPAGE-REDESIGN docs
- Add workflow prerequisites to Phase 8 specification
"
```

### Step 2: Create New Branch (Optional)

```bash
git checkout -b feature/phase-8a-content-customization
```

### Step 3: Create PRD via /prd Skill

```bash
/prd skill → Generate PRD with all 18 user stories
```

**IMPORTANT:** PRD MUST include required skills in acceptance criteria for each story (see Required Skills Per Story Type below).

### Step 4: Convert to prd.json via /ralph Skill

```bash
/ralph skill → Convert PRD to prd.json format
```

### Step 5: Execute via Ralph

```bash
pnpm ralph:20  # 20 iterations for 18 stories + buffer
```

---

## Required Skills Per Story Type

**CRITICAL:** All stories MUST include required skills in acceptance criteria per CLAUDE.md rules.

### Story Type Matrix

| Story Type | Stories | Required Skills | Acceptance Criteria MUST Include |
|------------|---------|-----------------|----------------------------------|
| **Schema/Component** | US-001 to US-004 | `/frontend-design` → `/agent-browser` → `/web-design-guidelines` | "Run /frontend-design before coding", "Run /agent-browser for visual testing", "Run /web-design-guidelines for .astro files" |
| **Reference Doc** | US-005 | Research only | "Research utility providers", "Document in markdown" |
| **Content Generation** | US-006 to US-014 | `/orchestrator` → skill chain | "Run /orchestrator first", "Follow skill chain for content" |
| **Verification** | US-015 to US-017 | `/agent-browser` | "Run /agent-browser for visual testing" |

### Content Generation Skill Chain (US-006 to US-014)

**CRITICAL:** ALL content generation MUST start with `/orchestrator`. NO direct skill invocation.

```
Step 1: /orchestrator (diagnoses task, routes to correct skills)
Step 2: /keyword-research (city + all 22 services, unique long-tail keywords for 7 headings)
Step 3: /positioning-angles (city-specific differentiation)
Step 4: /brand-voice (validate against existing brand-voice.md)
Step 5: /seo-content (problem, solution, context sections with keywords)
Step 6: /direct-response-copy (hero, trustOpener, benefits, finalCta, savings)
```

**Context Passing:**
- FULL CONTEXT: `docs/project/ralph/brand-voice.md` (applies to all 25 cities)
- FULL CONTEXT: City-specific keyword research, positioning angles
- LIGHT CONTEXT: Positioning summary to /seo-content (avoid over-contexted output)
- LIGHT CONTEXT: Keyword highlights to /direct-response-copy (main terms only)

### Example Acceptance Criteria for Content Story

```json
{
  "id": "US-006",
  "title": "Guelph Content Generation (FRESH START)",
  "acceptanceCriteria": [
    "Run /orchestrator to confirm skill sequence",
    "Run /keyword-research for Guelph + all 22 services (154 unique headings)",
    "Run /positioning-angles for Guelph-specific differentiation",
    "Validate brand-voice.md is current",
    "Run /seo-content for problem, solution, context sections",
    "Run /direct-response-copy for hero, trustOpener, benefits, finalCta, savings",
    "All 22 Guelph service-city files contain Phase 8 schema fields",
    "All 154 headings are unique (zero duplicates)",
    "Word count ~1,000 per page verified",
    "Em dash check passes (zero matches)",
    "pnpm build passes (639 pages)",
    "Run /agent-browser on 3 sample pages (furnace, heat pump, AC installation)"
  ]
}
```

---

## Implementation Phases

### Phase 8A: Content Generation (This Document) - 18 User Stories

**Story Overview:**
- US-000: Cleanup & Reset (COMPLETE ✅)
- US-001 to US-005: Schema, Components, Fixes, Structured Data, Reference Docs
- US-006 to US-014: City Content Generation (ALL 25 cities, FRESH START)
- US-015 to US-017: Verification & Audits

#### US-000: Cleanup & Reset (COMPLETE ✅)

**Status:** COMPLETE

**What was done:**
- Deleted old Phase 7B scripts (4 files):
  - `scripts/add-trust-openers-guelph.ts`
  - `scripts/add-problem-sections-guelph.ts`
  - `scripts/add-solution-sections-guelph.ts`
  - `scripts/add-benefits-guelph.mjs`
- Deleted associated documentation (5 files):
  - `docs/project/ralph/guelph-benefits.md`
  - `docs/project/ralph/guelph-keywords.md`
  - `docs/project/ralph/guelph-positioning.md`
  - `docs/project/ralph/guelph-problem-sections.md`
  - `docs/project/ralph/guelph-solution-sections.md`
- Reset 22 Guelph service-city files to minimal frontmatter
- Created `scripts/phase8/` directory for new E-E-A-T compliant scripts
- Updated documentation (AGENTS.md, CLAUDE.md, HOMEPAGE-REDESIGN-FULL-AND-FINAL.md)
- Verified build passes (639 pages)

**Commit staged changes:**
```bash
git add -A
git commit -m "chore: transition from Phase 7B to Phase 8 fresh start"
```

#### US-001: Add Schema Fields
**Type:** Schema/Component | **Skills:** `/frontend-design` (optional for schema-only)

- Add `hero` object (title, description)
- Add `finalCta` object (headline, copy)
- Add `benefitsHeadline` field
- Add `contextHeadline` field
- Add `experienceStats` object (installationsInCity, yearsSinceCityStart)
- Remove `processSteps` from schema
- Run `pnpm build` to verify

#### US-002: Update Components + Internal Linking
**Type:** Schema/Component | **Skills:** `/frontend-design` → `/agent-browser` → `/web-design-guidelines`

- Run `/frontend-design` before modifying components
- ServiceHeroSection: Add cityHero prop
- FinalCTASection: Add city-specific props
- Add internal linking components (parent service, location hub)
- Verify only ONE H1 per page
- Run `/agent-browser` to verify rendering
- Run `/web-design-guidelines` for .astro pages

#### US-003: Fix LocationServicesGrid Bug
**Type:** Schema/Component | **Skills:** `/frontend-design` → `/agent-browser`

- Run `/frontend-design` before modifying component
- Query service-city collection for this location
- Filter services to only those with entries in this city
- Remove `.slice(0, 8)` limit
- Run `/agent-browser` to test on Guelph, Toronto, Cambridge

#### US-004: LocalBusiness Structured Data
**Type:** Schema/Component | **Skills:** `/frontend-design` → `/agent-browser`

- Run `/frontend-design` before creating component
- Create LocalBusinessSchema.astro component
- Add schema.org LocalBusiness per page
- Include areaServed, Service, AggregateRating
- Run `/agent-browser` to verify structured data renders

#### US-005: Utility Provider Reference Document
**Type:** Reference Doc | **Skills:** Research only

- Create `docs/reference/utility-providers.md`
- Map all 25 cities to electricity + gas providers
- Include rebate program details

| City | Electricity | Gas | Notes |
|------|-------------|-----|-------|
| Guelph | Guelph Hydro | Enbridge | Municipal utility |
| Burlington | Burlington Hydro | Enbridge | |
| Oakville | Oakville Hydro | Enbridge | |
| Cambridge | Energy+ Inc. | Enbridge | Unique LDC |
| Kitchener | Kitchener-Wilmot Hydro | Enbridge | |
| Waterloo | Waterloo North Hydro | Enbridge | |
| ... | ... | ... | Complete for all 25 cities |

#### US-006 to US-014: City Content Generation (ALL 25 cities, FRESH START)
**Type:** Content Generation | **Skills:** `/orchestrator` → `/keyword-research` → `/positioning-angles` → `/seo-content` → `/direct-response-copy`

**IMPORTANT:** Guelph is now included in the content generation cycle (not a separate baseline). All 25 cities get fresh E-E-A-T compliant content.

| Story | Cities | Files | Unique Headings |
|-------|--------|-------|-----------------|
| **US-006** | **Guelph** (FRESH START) | 22 | 154 |
| US-007 | Burlington, Oakville, Milton | 66 | 462 |
| US-008 | Georgetown, Acton, Rockwood | 66 | 462 |
| US-009 | Cambridge, Kitchener, Waterloo | 66 | 462 |
| US-010 | Elmira, St. Jacobs, New Hamburg | 66 | 462 |
| US-011 | Fergus, Elora, Arthur | 66 | 462 |
| US-012 | Mount Forest, Orangeville, Shelburne | 66 | 462 |
| US-013 | Erin, Hillsburgh, Harriston | 66 | 462 |
| US-014 | Palmerston, Listowel, Drayton | 66 | 462 |

**Per-city workflow (MUST start with /orchestrator):**
1. `/orchestrator` to diagnose task and confirm skill sequence
2. `/keyword-research` for ALL headings: [city count] x 22 services x 7 headings = unique keywords
3. `/positioning-angles` for city-specific differentiation
4. `/brand-voice` validation (reference existing `docs/project/ralph/brand-voice.md`)
5. `/seo-content` for problem/solution/context (using researched H2 keywords)
6. `/direct-response-copy` for hero/trustOpener/finalCta/benefits (using researched keywords)
7. `/agent-browser` for visual testing on 3 sample pages

**Content to add per service-city file:**
- `hero.title` with UNIQUE keyword-researched H1 (PREMIUM positioning)
- `hero.description` with city-specific intro + experience stats
- `trustOpener` with city-specific credibility
- `problem.headline` with UNIQUE keyword-researched H2
- `problem.description` + `problem.issues[]` with city-specific pain points
- `solution.headline` with UNIQUE keyword-researched H2
- `solution.description` with city-specific solution
- `benefitsHeadline` with UNIQUE keyword-researched H2
- `benefits[]` with city-specific titles AND descriptions
- `contextHeadline` with UNIQUE keyword-researched H2
- `context` with city-specific E-E-A-T paragraph
- `savings.headline` with UNIQUE keyword-researched H2
- `savings.description` with city-specific rebate info
- `finalCta.headline` with UNIQUE keyword-researched H2
- `finalCta.copy` with city-specific CTA copy
- `experienceStats` with realistic installation counts

**H1 Examples - PREMIUM POSITIONING (Each must be UNIQUE across ALL 550 pages):**
- "Guelph's Trusted Furnace Installation Experts Since 1994"
- "Premium Heat Pump Installation for Burlington Homeowners"
- "Professional Air Conditioner Installation in Cambridge - Free Quotes"
- "Expert Boiler Services for Kitchener Homes - 30+ Years Experience"

**Word count target: ~1,000 words per page**

#### US-015 to US-017: Verification & Audits
**Type:** Verification | **Skills:** `/agent-browser` for visual testing

**CRITICAL - NO CITY-SWAP CONTENT:**
- Each page must be 80%+ unique
- H1 = long-tail keyword with service + city (unique per page, PREMIUM positioning)
- All H2s must contain service name OR city name
- Content must reference city-specific factors (neighborhoods, climate, housing stock)
- Experience stats must be realistic and visible

#### US-015: Automated Verification & Cleanup
**Type:** Verification | **Skills:** Script development (no marketing skills)

**Heading Uniqueness Verification (3,850 headings):**
- Extract ALL headings from 550 service-city files
- Verify ZERO duplicate headings across entire site
- Create report of any duplicate headings for manual fix

**Word Count Verification:**
- Verify ~1,000 words per page
- Flag pages below threshold

**Scripts to create:**
```bash
# Extract all H1s and check for duplicates
pnpm check:h1-uniqueness  # Must return 0 duplicates

# Extract all H2s and check for duplicates
pnpm check:h2-uniqueness  # Must return 0 duplicates

# Check all headings contain service OR city keyword
pnpm check:heading-keywords  # Must return 100% compliance

# Word count verification
pnpm check:word-count  # Must return ~1,000 words per page

# Em-dash check
pnpm check:em-dashes  # Must return 0 matches
```

#### US-016: Experience Stats Population
**Type:** Content Generation | **Skills:** `/orchestrator` for data strategy

- Run `/orchestrator` to confirm approach
- Add realistic installation counts per city
- Calculate based on 30+ years (since 1994)
- Distribute across services proportionally
- Verify stats are visible in hero.description and context

#### US-017: Internal Linking Audit
**Type:** Verification | **Skills:** `/agent-browser` for link testing

- Run `/agent-browser` to verify all links work
- Verify all parent service links work
- Verify all location hub links work
- Check LocationServicesGrid cross-links

---

## Per-File Content Fields (16 total)

**ALL HEADINGS REQUIRE:**
- Unique across all 550 pages (no duplicates)
- Keyword research via `/keyword-research`
- Long-tail keyword with service + city
- PREMIUM positioning (no emergency/urgency language)

| Field | Type | Min Words | Requirement |
|-------|------|-----------|-------------|
| `hero.title` | **H1** | N/A | UNIQUE keyword-researched long-tail, PREMIUM |
| `hero.description` | Text | 50-100 | City-specific intro + experience stats |
| `trustOpener` | Text | 50-100 | City-specific credibility |
| `problem.headline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `problem.description` | Text | 150-250 | City-specific pain points |
| `problem.issues[]` | List | 25 each | 4 city-specific bullet points |
| `solution.headline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `solution.description` | Text | 150-250 | City-specific solution |
| `benefitsHeadline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `benefits[]` | Array | 30 each | City-specific titles AND descriptions |
| `contextHeadline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `context` | Text | 200-400 | City-specific E-E-A-T paragraph |
| `savings.headline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `savings.description` | Text | 100-150 | City-specific rebate info |
| `finalCta.headline` | **H2** | N/A | UNIQUE keyword-researched long-tail |
| `finalCta.copy` | Text | 50-75 | City-specific CTA copy |
| `experienceStats` | Object | N/A | installationsInCity, yearsSinceCityStart |

**Total: ~1,000 words per page**

---

## Content Quality Checklist (Per Page)

### E-E-A-T Signals
- [ ] Experience: Installation count mentioned ("200+ furnaces in Guelph")
- [ ] Experience: Years in area mentioned ("15+ years serving Guelph")
- [ ] Expertise: Technical details accurate
- [ ] Authoritativeness: "Since 1994", certifications referenced
- [ ] Trustworthiness: Consistent NAP, review mentions

### SEO Requirements
- [ ] H1: Unique, long-tail, PREMIUM positioning, contains service + city
- [ ] All H2s: Unique, contain service OR city keyword
- [ ] Word count: ~1,000 words
- [ ] Internal links: Parent service + location hub linked
- [ ] LocalBusiness schema: Present and accurate

### Local Signals
- [ ] City name in headings (7 instances)
- [ ] Neighborhood/area references where relevant
- [ ] Local utility providers mentioned (savings section)
- [ ] Local climate/housing stock context

### Positioning
- [ ] NO emergency/urgency language ("24-Hour", "Emergency", "Same-Day")
- [ ] Trust language used ("Trusted", "Expert", "Professional")
- [ ] Longevity emphasized ("Since 1994", "30+ Years")

---

## Verification Strategy

### After Schema Changes
- `pnpm build` passes

### After Component Updates
- `/agent-browser` on 3 sample Guelph pages
- Verify only ONE H1 per page
- Verify LocalBusiness schema in page source

### After Each City Batch (66 files, 462 headings)
- `pnpm build` (0 errors)
- Em-dash check (0 matches)
- **Heading uniqueness:** Run `pnpm check:h1-uniqueness` and `pnpm check:h2-uniqueness`
- **Heading keywords:** Verify all 462 new headings contain service + city keywords
- **Word count:** Verify ~1,000 words per page
- Spot-check 3 random files for quality
- Verify experience stats are visible

### Final Verification (550 files, 3,850 headings)
- Full site build
- **Global uniqueness audit:** ALL 3,850 headings must be unique (0 duplicates)
- Visual audit of 5 cities x 3 services
- **Heading audit script:** Verify only ONE `<h1>` per page in rendered HTML
- **Duplicate content scan:** Compare body text across same service in different cities
- **E-E-A-T audit:** Verify experience stats visible on all pages

---

## Critical Files to Modify

### Schema
- `src/content/config.ts` (service-city collection, lines 556-659)

### Components
- `src/components/sections/LocationServicesGrid.astro` (bug fix)
- `src/components/sections/ServiceHeroSection.astro` (add cityHero prop)
- `src/components/sections/FinalCTASection.astro` (add city-specific props)
- `src/components/sections/ProblemSection.astro` (verify headline usage)
- `src/components/sections/SolutionSection.astro` (verify headline usage)
- `src/components/sections/ServiceBenefitsSection.astro` (add benefitsHeadline)
- `src/components/sections/ContextSection.astro` (add contextHeadline)
- **NEW:** `src/components/seo/LocalBusinessSchema.astro`

### Reference Documents
- **NEW:** `docs/reference/utility-providers.md`

### Content Files
- `src/content/service-city/**/*.md` (550 files)

---

## Out of Scope (Phase 8A)

- ❌ Gallery images (Phase 8C - deferred until real photos available)
- ❌ City-specific FAQs (Phase 8B - separate PRD)
- ❌ City-specific reviews (Phase 8D - 5,500 reviews, separate PRD)
- ❌ Process steps customization (inherit from service page)

---

## Phase 8B: City-Specific FAQs (Separate PRD)

**Scope:**
- Extend FAQ schema to support location scopes
- Update ServiceFAQSection filtering logic
- Generate 3-5 FAQs per service per city (825-1,375 new FAQs)

**Deferred to keep Phase 8A focused on content generation.**

---

## Phase 8C: Gallery Images (Deferred)

**Rationale:**
- 1,100-1,650 images is impractical for Ralph loop
- ServiceGallerySection already shows graceful empty state
- Real photos preferred over AI-generated placeholders

**Future approach:**
- Add real project photos as they become available
- OR minimal stock photo approach (22 generic images reused)

---

## Phase 8D: City-Specific Reviews (NEW - Separate PRD)

**Scope:** 22 services x 25 cities x 10 reviews = **5,500 reviews**

**Storage:** NEW `reviews` array field (not existing `proof` section)

**Requirements per review:**
- SEO keyword-rich (service + city)
- Local intent (neighborhood mentions)
- Customer name + neighborhood when possible
- Specific project details (equipment model, challenge solved)
- 3-5 sentences each

**Schema:**
```typescript
reviews: z.array(z.object({
  customerName: z.string(),
  neighborhood: z.string().optional(),
  rating: z.number().min(1).max(5),
  text: z.string(),  // 3-5 sentences, keyword-rich
  date: z.string().optional(),
  projectType: z.string().optional(),  // "Furnace Installation"
})).optional()
```

---

## Quality Gates

- All 550 service-city pages have city-specific content
- **3,850 unique headings** with zero duplicates
- All H1s and H2s contain service + city keywords
- **All H1s use PREMIUM positioning** (no emergency language)
- **~1,000 words per page** (E-E-A-T content depth)
- **Experience stats visible** on all pages
- **LocalBusiness schema** on all pages
- **Internal links** to parent service and location hub
- LocationServicesGrid shows correct services per city
- NO em dashes in any content (automated check)
- NO city-swap content (manual sample check)
- `pnpm build` passes with 0 errors
- Visual testing confirms all sections render correctly

---

## Risk Mitigation

### Content Generation at Scale
**Risk:** 550 pages x 16 fields + 3,850 unique headings + ~1,000 words each
**Mitigation:**
- Batch by 3 cities at a time (smaller stories)
- Keyword research BEFORE content generation
- Quality checks after each batch
- Word count verification automated

### Duplicate Content
**Risk:** Google penalizes similar content across 25 city pages
**Mitigation:**
- 80%+ unique content target per city
- ZERO template headings (all keyword-researched)
- Automated uniqueness scripts
- Context section demonstrates unique local knowledge
- Experience stats create variation

### Heading Uniqueness
**Risk:** 3,850 headings may have accidental duplicates
**Mitigation:**
- Keyword research generates unique variations
- Automated duplicate detection scripts
- Manual review of flagged duplicates

### E-E-A-T Compliance
**Risk:** Thin content or missing signals
**Mitigation:**
- Word count minimums enforced (~1,000 per page)
- Experience stats required and visible
- LocalBusiness schema on every page
- Quality checklist per page

---

## Next Steps

1. ✅ **US-000 Complete** - Cleanup & Reset done
2. Create PRD using `/prd` skill with 18 user stories (including US-000 as complete)
3. Convert to prd.json using `/ralph` skill
4. Execute via `pnpm ralph:20`
5. Visual testing with `/agent-browser` after each batch
6. Update AGENTS.md with patterns discovered during implementation
