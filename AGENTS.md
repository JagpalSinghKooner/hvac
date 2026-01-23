# AGENTS.md - Codebase Institutional Memory

> This file is automatically read by Claude Code at session start.
> Update this file with discovered patterns, gotchas, and conventions during Ralph iterations.
> This provides "institutional memory" across fresh context windows.

---

## Project Overview

**Stack:** Astro 5.0 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
**Content:** 639 pages (23 services + 550 service-city + supporting pages)
**Build command:** `pnpm build` (runs astro check + astro build)
**Content Depth:** ~1,000 words per service-city page with E-E-A-T compliance

---

## Critical Patterns

### 1. Content Collections Structure

```
src/content/
├── services/           # 23 service definitions
├── service-city/       # 550 location-specific pages
├── locations/          # 25 city definitions
├── regions/            # 6 regional groupings
├── reviews/            # Customer testimonials
├── faqs/               # FAQ content
└── config.ts           # Zod schemas (single source of truth)
```

**Pattern:** Always check `src/content/config.ts` before modifying content structure.

### 2. Schema Field Names (Phase 7A Unified + Phase 8 Additions)

**Phase 7A Unified Fields:**

| Old Name | New Name | Collection |
|----------|----------|------------|
| problemStatement | problem | services |
| painPoints | issues | services (nested) |
| solutionApproach | solution | services |
| valueProps | benefits | services |
| images | galleryImages | services |
| localContext | context | service-city |
| localProof | proof | service-city |
| localTrustOpener | trustOpener | service-city |
| localProblem | problem | service-city |
| citySpecificIssues | issues | service-city (nested) |
| localSolution | solution | service-city |
| localBenefits | benefits | service-city |
| localSavings | savings | service-city |
| localRebates | rebateInfo | service-city (nested) |
| localGalleryImages | galleryImages | service-city |

**Phase 8 NEW Fields (service-city collection):**

| Field | Type | Purpose |
|-------|------|---------|
| hero.title | string | UNIQUE keyword-researched H1, PREMIUM positioning |
| hero.description | string | City-specific intro + experience stats (50-100 words) |
| benefitsHeadline | string | UNIQUE keyword-researched H2 for benefits section |
| contextHeadline | string | UNIQUE keyword-researched H2 for context section |
| finalCta.headline | string | UNIQUE keyword-researched H2 for final CTA |
| finalCta.copy | string | City-specific CTA copy (50-75 words) |
| experienceStats.installationsInCity | number | Installation count for E-E-A-T |
| experienceStats.yearsSinceCityStart | number | Years serving city for E-E-A-T |
| processSteps | REMOVED | Inherit from parent service page |

**Pattern:** Both collections now use unified field names for shared components. Phase 8 adds unique heading fields for SEO.

### 3. Typography System (Global)

**Single source of truth:** `src/styles/typography.css`

- Fonts: Playfair Display (headings) + Inter (body)
- Loaded via single `@import url()` in typography.css
- Imported into `globals.css` before Tailwind directives
- Utility classes: `.font-heading`, `.font-body`

**GOTCHA:** Never add `@import url('fonts.googleapis.com...')` to component `<style>` blocks. This causes duplicate font requests and performance issues.

**Pattern:** Use `class="font-heading"` for serif headings, body inherits Inter automatically.

### 4. Component Naming Conventions

| Pattern | Location | Example |
|---------|----------|---------|
| Section components | `src/components/sections/` | ProblemSection.astro |
| UI primitives | `src/components/ui/` | Button.tsx (shadcn) |
| Layout components | `src/layouts/` | BaseLayout.astro |

**GOTCHA:** "Local*" prefix components are being consolidated (Phase 7A). Don't create new Local* variants.

### 5. Build Verification

**Always run before committing:**
```bash
pnpm build
```

This runs:
1. `astro check` - TypeScript + Zod schema validation
2. `astro build` - Full static site generation (639 pages)

**Pattern:** If build fails with Zod errors, check that content files match schema in `src/content/config.ts`.

### 6. Business Data

**Single source of truth:** `src/content/business/profile.yaml`

Contains: company name, phone numbers, service areas, hours, certifications.

**Pattern:** Never hardcode business data. Import from profile.yaml.

### 7. Page Templates

| Page Type | Template | URL Pattern |
|-----------|----------|-------------|
| Service | `src/pages/services/[service].astro` | /services/furnace-installation |
| Service-City | `src/pages/services/[serviceLocation].astro` | /services/furnace-installation-guelph-on |
| Location | `src/pages/locations/[location].astro` | /locations/guelph |

**Pattern:** Service-city pages fall back to service data when local data is missing.

---

## Common Gotchas

### 1. Font Imports in Components
**Problem:** Adding Google Fonts @import in component style blocks causes duplicate requests.
**Solution:** Use global typography.css classes (`.font-heading`, `.font-body`).

### 2. Schema/Content Mismatch
**Problem:** Build fails with "Invalid frontmatter" Zod errors.
**Solution:** Ensure content YAML matches schema in `src/content/config.ts`. Run migration script if fields renamed.

### 3. Component Renames
**Problem:** Renaming component file breaks imports.
**Solution:** Use `git mv` and update imports atomically in same commit.

### 4. Astro Check Warnings
**Problem:** `astro check` shows many warnings.
**Solution:** Warnings are acceptable. Only errors block build. Focus on errors first.

---

## Mandatory Skill Usage

### Development Skill Chain (ALWAYS follow this order)

1. `/prd` → Create PRD with user stories (INCLUDES skill requirements in acceptance criteria)
2. `/ralph` → Convert to prd.json (VALIDATES skill requirements exist)
3. `/frontend-design` → Design BEFORE coding (creates design spec)
4. Write code (following design spec)
5. `/vercel-react-best-practices` → Review .tsx files
6. `/web-design-guidelines` → Review .astro pages
7. `/agent-browser` → Visual testing (375px, 768px, 1024px viewports)
8. Commit only after all required skills pass

### Marketing Skill Chain (ORCHESTRATOR FIRST, ALWAYS)

1. `/orchestrator` → Diagnoses need, routes to correct skill(s)
2. Follow orchestrator's recommended skill sequence
3. **NEVER invoke marketing skills directly** — orchestrator first

**Marketing Flow:** `/orchestrator` → `/positioning-angles` → `/keyword-research` → `/brand-voice` → `/seo-content` → `/direct-response-copy`

### Skill Triggers Reference

| If you need to... | Use this skill |
|-------------------|---------------|
| Plan a feature | `/prd` |
| Start autonomous work | `/ralph` |
| Design a component | `/frontend-design` |
| Review React code | `/vercel-react-best-practices` |
| Review Astro pages | `/web-design-guidelines` |
| Test in browser | `/agent-browser` |
| ANY marketing/content task | `/orchestrator` (ALWAYS first) |

### Common Skill Mistakes

**WRONG:** "Write landing page copy" → directly writes copy
**RIGHT:** "Write landing page copy" → `/orchestrator` → `/positioning-angles` → `/brand-voice` → `/direct-response-copy`

**WRONG:** Create component → skip `/frontend-design` → write code
**RIGHT:** Create component → `/frontend-design` (design spec) → write code → `/web-design-guidelines` → `/agent-browser`

**WRONG:** Mark story `passes: true` without running required skills
**RIGHT:** Run ALL skills listed in acceptance criteria → verify outputs → then mark complete

---

## File Dependencies

### When modifying `src/content/config.ts`:
- All 573 content files must match the schema
- Run migration script if renaming fields
- Backup content before bulk changes

### When modifying section components:
- Check both `[service].astro` and `[serviceLocation].astro` for usage
- Components may be used in both templates

### When modifying layouts:
- BaseLayout.astro is used by all pages
- ServicePageLayout.astro (Phase 7A) will be shared by service pages

---

## Ralph Loop Reminders

1. **One story per iteration** - Complete fully before moving to next
2. **Always run `pnpm build`** - Never commit without passing build
3. **Update this file** - Add patterns discovered during implementation
4. **Append to progress.txt** - Document learnings for context
5. **Atomic commits** - One story = one commit with descriptive message

---

## Current Phase: 8A City-Level Content Customization (E-E-A-T Enhanced)

**Branch:** feature/phase-8a-content-customization
**Goal:** Generate E-E-A-T compliant content for 550 service-city pages with 3,850 unique headings

**Status:** FRESH START for ALL 25 cities (Phase 7B content reset)

**Prerequisites (COMPLETE):**
- Phase 7A: Infrastructure (schema, components, typography)

**Phase 8A User Stories:**
- US-000: Cleanup & Reset (COMPLETE)
- US-001: Add Schema Fields (hero, finalCta, experienceStats, etc.)
- US-002: Update Components + Internal Linking
- US-003: Fix LocationServicesGrid Bug
- US-004: LocalBusiness Structured Data
- US-005: Utility Provider Reference Document
- US-006: Guelph Content Generation (FRESH START, 22 services, 154 headings)
- US-007 to US-014: City Content Generation (3 cities each, 8 stories)
- US-015: Automated Verification & Cleanup
- US-016: Experience Stats Population
- US-017: Internal Linking Audit

**Key Files:**
- `PHASE-8-CITY-CONTENT-CUSTOMIZATION.md` - Full specification
- `docs/reference/utility-providers.md` - Rebate info (create in US-005)
- `src/content/config.ts` - Schema updates (US-001)
- `docs/project/ralph/brand-voice.md` - Brand voice profile (applies to ALL 25 cities)

---

## Phase 8A: Required Skills Per Story Type

### Story Type Matrix

| Story Type | Stories | Required Skills | Notes |
|------------|---------|-----------------|-------|
| Schema/Component | US-001 to US-004 | `/frontend-design` → `/agent-browser` → `/web-design-guidelines` | Technical implementation |
| Reference Doc | US-005 | Research only | No skills required |
| Content Generation | US-006 to US-014 | `/orchestrator` → skill chain (see below) | Marketing/content workflow |
| Verification | US-015 to US-017 | `/agent-browser` | Visual testing |

### Content Generation Skill Chain (US-006 to US-014)

**CRITICAL:** ALL content generation MUST follow this sequence via `/orchestrator`:

```
Step 1: /orchestrator (diagnoses task, routes to skills)
Step 2: /keyword-research (city + all 22 services, unique long-tail keywords)
Step 3: /positioning-angles (city-specific differentiation)
Step 4: /brand-voice (ONE-TIME validation - already exists in brand-voice.md)
Step 5: /seo-content (problem, solution, context sections with keywords)
Step 6: /direct-response-copy (hero, trustOpener, benefits, finalCta with conversion focus)
```

**Context Passing Strategy:**
- FULL CONTEXT: brand-voice.md (applies to all cities)
- FULL CONTEXT: city-specific keyword research, positioning angles
- LIGHT CONTEXT: Positioning summary to /seo-content (avoid over-contexted output)
- LIGHT CONTEXT: Keyword highlights to /direct-response-copy (main terms only)

### Quality Gates (ALL Stories)

- NO em dashes (--) in any content field: `grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'`
- Heading uniqueness: Zero duplicates across all 550 pages
- Word count: ~1,000 words per page
- Build passes: `pnpm build` with 0 errors
- Visual test: `/agent-browser` on 3 sample pages

---

## Phase 8A: Heading Requirements (CRITICAL)

**Per Page (7 unique headings):**

| Section | Level | Requirement |
|---------|-------|-------------|
| Hero | H1 | UNIQUE keyword-researched, PREMIUM positioning |
| Problem | H2 | UNIQUE keyword-researched long-tail |
| Solution | H2 | UNIQUE keyword-researched long-tail |
| Benefits | H2 | UNIQUE keyword-researched long-tail |
| Context | H2 | UNIQUE keyword-researched long-tail |
| Savings | H2 | UNIQUE keyword-researched long-tail |
| Final CTA | H2 | UNIQUE keyword-researched long-tail |

**Total:** 550 pages × 7 headings = **3,850 unique headings** (ZERO duplicates allowed)

### Premium Positioning Language

**USE these keywords:**
- "Trusted", "Expert", "Professional", "Premium", "Quality"
- "Since 1994", "30+ Years", "Established"

**NEVER use these keywords:**
- "24-Hour", "Emergency", "Same-Day", "Urgent", "Act Now"

---

## Phase 8A: E-E-A-T Signals

**Experience (First E - CRITICAL):**
- Installation counts per city in `hero.description` AND `context`
- Years serving city in `hero.description` AND `context`
- `experienceStats` populated for structured data

**Expertise:**
- Technical accuracy in problem/solution descriptions
- Certifications mentioned where relevant

**Authoritativeness:**
- "Since 1994" in hero
- License numbers where appropriate
- Manufacturer certifications

**Trustworthiness:**
- Consistent NAP across pages
- Review mentions
- BBB membership

---

## Phase 8A: Component Prop Patterns

### Optional City-Specific Props with Fallback
**Pattern:** All service-city components accept optional city-specific props that override service-level content.

**Example (ServiceHeroSection):**
```typescript
const displayTitle = cityHero?.title || title;  // City-specific OR fallback
```

**Components with this pattern:**
- ServiceHeroSection: `cityHero?: {title, description}`
- FinalCTASection: `headline?: string, copy?: string, cityName?: string`
- ServiceBenefitsSection: `benefitsHeadline?: string`
- ContextSection: `contextHeadline?: string`

**Why:** Graceful degradation - pages work with OR without city-specific content.

### Internal Linking Pattern
**Pattern:** Conditional rendering based on ALL required props present.

**Example:**
```typescript
const showInternalLinks = serviceSlug && locationSlug && cityName && serviceName;
{showInternalLinks && (<div>...internal links...</div>)}
```

**Why:** Internal links only appear on service-city pages where all data is available, NOT on service-level pages.

### SEO Schema Components (JSON-LD)
**Pattern:** Schema.org structured data components render JSON-LD in `<head>` via slot.

**Example (LocalBusinessSchema.astro):**
```typescript
// 1. Import business data from profile.yaml
const businessProfile = await getEntry('business', 'profile');
const business = businessProfile.data.business;

// 2. Build schema object
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": business.legal_name,
  // ... other fields
};

// 3. Render with set:html to prevent JS processing
<script is:inline type="application/ld+json" set:html={JSON.stringify(schema)} />
```

**Usage in page template:**
```astro
<ServicePageLayout ...props>
  <LocalBusinessSchema
    slot="head"
    serviceName={serviceData.title}
    cityName={locationData.title}
  />
</ServicePageLayout>
```

**Why:**
- `is:inline` prevents Astro from processing as JavaScript
- `set:html` safely injects JSON string
- Data sourced from profile.yaml ensures NAP consistency
- Slot="head" renders in document head for search engines

---

## Phase 8A: Common Gotchas

### 1. Em Dashes (--)
**Problem:** Skills (especially /direct-response-copy) often output em dashes
**Solution:** Explicitly instruct: "NO em dashes (--) - use periods, commas, semicolons"
**Check:** `grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'` (must be empty)

### 2. YAML Single Quote Escaping
**Problem:** Apostrophes in YAML single-quoted strings break parsing
**Solution:** Double single quotes: `City''s homes` not `City\'s homes`
**Script:** `content.replace(/'/g, "''")`

### 3. City-Swap Content
**Problem:** Same headings with city name swapped (Google penalizes)
**Solution:** ALL 3,850 headings must be unique via `/keyword-research`

### 4. Build Failures After Content Integration
**Problem:** Zod schema errors if YAML frontmatter invalid
**Solution:** Test script on 1-2 files first, verify build passes, then run batch

### 5. Service-City Schema Structure (CRITICAL)
**Problem:** service-city schema is SIMPLER than services schema, easy to use wrong structure
**Solution:** ALWAYS reference `src/content/config.ts` lines 556-680 BEFORE generating content
**Key Differences:**
- `problem.issues`: array of STRINGS, NOT objects with title/description
- `context`: STRING directly, NOT object with description key
- `savings.rebateInfo`: STRING inside savings object, NOT separate top-level object
- `proof`: object with testimonial fields OR omit entirely (NOT array)

**Correct Schema Pattern:**
```yaml
problem:
  headline: "..."
  issues:
    - "Issue description one"
    - "Issue description two"
    - "Issue description three"

context: "Long markdown content string here without object wrapper..."

savings:
  headline: "..."
  description: "..."
  rebateInfo: "Save on Energy up to $6,200 via Guelph Hydro"

# proof: OMIT unless using testimonial (most service-city pages don't need this)
```

**Why This Matters:**
- Build will FAIL with Zod schema errors if structure wrong
- Components expect schema-compliant data structure
- Service-city pages use simpler schema than service pages (strings not nested objects)

### 6. Markdown Content Body Required (CRITICAL - US-008 Lesson)
**Problem:** Astro content collections require BOTH frontmatter AND markdown body content
**What Happened:** Ralph generated perfect YAML frontmatter but ended files with `---` and NO content after
**Build Error:** `workflowStatus: Required` (confusing error - real issue is missing markdown body)
**Solution:** EVERY .md file MUST have content after the closing `---`

**WRONG (File ends with frontmatter):**
```yaml
---
serviceSlug: 'furnace-maintenance'
title: 'Furnace Maintenance in Guelph, ON'
# ... all frontmatter fields ...
finalCta:
  headline: '...'
  copy: '...'
---
```

**RIGHT (Markdown content follows frontmatter):**
```yaml
---
serviceSlug: 'furnace-maintenance'
title: 'Furnace Maintenance in Guelph, ON'
# ... all frontmatter fields ...
finalCta:
  headline: '...'
  copy: '...'
---

# Furnace Maintenance in Guelph, ON

Professional furnace maintenance for Guelph homes. Annual tune-ups preserve efficiency, prevent breakdowns, and ensure safe operation throughout Ontario winters.
```

**Required Acceptance Criteria (add to ALL content generation stories):**
```
AFTER WRITING EACH FILE:
1. Verify frontmatter closes with ---
2. Verify markdown content exists AFTER ---
3. Minimum markdown: H1 (matches title) + 2-3 sentence description
4. Run pnpm build to verify file is valid
```

**Verification Command:**
```bash
# Check if file ends with --- (WRONG)
tail -1 file.md  # Should NOT be "---"

# Check markdown content exists
tail -5 file.md  # Should show H1 + description text
```

**Why This Matters:**
- Astro requires BOTH frontmatter AND body content
- Build fails with confusing error messages (says "Required" but real issue is missing body)
- 11 files failed in US-008 due to this (had to manually fix all)
- Must be part of PRD acceptance criteria to prevent future issues

---

## Phase 8A: Verification Scripts (US-015)

```bash
# Heading uniqueness verification
pnpm check:h1-uniqueness  # Must return 0 duplicates
pnpm check:h2-uniqueness  # Must return 0 duplicates

# Heading keyword compliance
pnpm check:heading-keywords  # Must return 100% compliance

# Word count verification
pnpm check:word-count  # Must return ~1,000 words per page

# Em-dash check
pnpm check:em-dashes  # Must return 0 matches
```
