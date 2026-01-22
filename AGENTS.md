# AGENTS.md - Codebase Institutional Memory

> This file is automatically read by Claude Code at session start.
> Update this file with discovered patterns, gotchas, and conventions during Ralph iterations.
> This provides "institutional memory" across fresh context windows.

---

## Project Overview

**Stack:** Astro 5.0 + React 19 + TypeScript + Tailwind CSS + shadcn/ui
**Content:** 573 pages (23 services + 550 service-city + supporting pages)
**Build command:** `pnpm build` (runs astro check + astro build)

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

### 2. Schema Field Names (Phase 7A Unified)

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

**Pattern:** Both collections now use unified field names for shared components.

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

## Current Phase: 7B Content Generation

**Branch:** feature/phase-7b-content-guelph
**Goal:** Generate SEO-optimized, city-specific content for all 22 service-city pages in Guelph, ON

**Completed:**
- US-001 through US-009: Guelph batch (orchestrator, keyword research, positioning, brand voice, content generation, quality verification)

**In Progress:**
- US-010: Documentation

**Key Files:**
- `prd.json` - Story tracking
- `docs/project/ralph/progress.txt` - Implementation notes
- `docs/project/ralph/guelph-keywords.md` - Keyword research (PERMANENT reference)
- `docs/project/ralph/guelph-positioning.md` - Positioning angles (PERMANENT reference)
- `docs/project/ralph/brand-voice.md` - Brand voice profile (applies to ALL 25 cities)
- `scripts/add-trust-openers-guelph.ts` - Reusable script template
- `scripts/add-problem-sections-guelph.ts` - Reusable script template
- `scripts/add-solution-sections-guelph.ts` - Reusable script template
- `scripts/add-benefits-guelph.mjs` - Reusable script template

---

## Phase 7B: Content Generation Patterns (Guelph Batch)

### Overview

Phase 7B generates city-specific content for 550 service-city pages (22 services × 25 cities). Guelph was the first batch, establishing the workflow for remaining 24 cities.

**Time investment (Guelph batch):** ~8 hours total for 20 services, 80+ content pieces
- Setup (orchestrator, keyword research, positioning, brand voice): ~2 hours
- Content generation (trustOpener, problem, solution, benefits): ~6 hours

### Mandatory Skill Pipeline

**CRITICAL:** ALL content generation MUST follow this skill sequence. NO exceptions.

```
Step 1: /orchestrator (diagnoses task, routes to correct skills)
Step 2: /keyword-research (identifies target keywords for city + all services)
Step 3: /positioning-angles (finds city-specific differentiation angles)
Step 4: /brand-voice (extracts/validates voice profile) [RUN ONCE, applies to all 25 cities]
Step 5: /seo-content (generates problem, solution sections with keywords)
Step 6: /direct-response-copy (generates trustOpener, benefits with conversion focus)
```

**Context Passing Strategy:**
- FULL CONTEXT to all skills: brand-voice.md (applies to all cities)
- FULL CONTEXT to content skills: city-specific keyword research, positioning angles
- LIGHT CONTEXT: Positioning summary to /seo-content (avoid over-contexted output)
- LIGHT CONTEXT: Keyword highlights to /direct-response-copy (main terms only)

**Quality Gates:**
- NO em dashes (--) in any content field [automated grep check]
- Uniqueness verification [manual sample review of 5 services]
- City-specificity check [content references local housing, climate, tenure]
- Build passes [pnpm build must succeed with 0 errors]

### Content Field Types & Complexity

| Field | Time | Structure | Skill | Notes |
|-------|------|-----------|-------|-------|
| trustOpener | ~37 min | 2-3 sentences | /direct-response-copy | Trust signal, local tenure emphasis |
| problem | ~107 min | headline + description + 3-4 issues | /seo-content | Highest uniqueness requirement, technical depth |
| solution | ~90 min | headline + description | /seo-content | Positioning angle integration, methodology focus |
| benefits | ~115 min | 3-4 benefits (title, description, icon) | /direct-response-copy | Icon distribution, NO duplication with solution |

**Batching Strategy:** Generate all 22 services in single batch per content field type (NOT service-by-service). This ensures consistency and efficient skill usage.

### City-Specific Research Requirements

**BEFORE generating content for any city**, research these factors:

1. **Housing Stock:**
   - Heritage vs. modern construction
   - Common architectural types (limestone, brick, siding, etc.)
   - Unique challenges (narrow basements, no ductwork, preservation guidelines)
   - Neighborhood names for geographic authenticity

2. **Climate Factors:**
   - Temperature ranges (winter lows, summer highs)
   - Humidity conditions (river valleys, lake effects, continental dry)
   - Microclimates (valley vs. hilltop, urban vs. suburban)
   - Groundwater temperatures (affects heat pumps, geothermal)

3. **Local Tenure:**
   - Headquarters city (Guelph): "Headquartered at 25 Clearview St since 1994"
   - Service area cities (non-headquarters): "Serving [City] since 1994 from headquarters in Guelph"
   - Years in market: 30 years (since 1994)

4. **Water Conditions:**
   - Hard water (affects boilers, water heaters, humidifiers)
   - Mineral content
   - Treatment requirements

**Quality Rule:** Content must feel genuinely written by someone who knows the city. NOT generic city-name-swapping.

### Content Generation Workflow (Per City)

**Step 1: Setup (One-Time Per City)**
1. Run /orchestrator to confirm skill sequence
2. Run /keyword-research for city + all 22 services
3. Run /positioning-angles for city-specific differentiation
4. Create city-specific reference docs:
   - docs/project/ralph/[city]-keywords.md (PERMANENT, NEVER delete)
   - docs/project/ralph/[city]-positioning.md (PERMANENT, NEVER delete)

**Step 2: Generate Content (4 Batches Per City)**
1. **trustOpener:** Run /direct-response-copy with positioning summary → Create docs/project/ralph/[city]-trust-openers.md → Integrate via script
2. **problem:** Run /seo-content with keywords → Create docs/project/ralph/[city]-problem-sections.md → Integrate via script
3. **solution:** Run /seo-content with positioning → Create docs/project/ralph/[city]-solution-sections.md → Integrate via script
4. **benefits:** Run /direct-response-copy with accountability focus → Create docs/project/ralph/[city]-benefits.md → Integrate via script

**Step 3: Quality Verification**
1. Read 5 sample files (furnace, heat pump, AC, boiler, ductless)
2. Verify uniqueness (NO duplicate content across services)
3. Verify city-specificity (references local housing, climate, tenure)
4. Run em dash check: `grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'` (output must be empty)
5. Run build: `pnpm build` (must pass with 0 errors)
6. Visual test 3 pages with /agent-browser: furnace, heat pump, AC installation
7. Verify rendering: Problem, Solution, Benefits sections display correctly, city badge shows "Solution in [City]", trust indicator shows "Serving [City] Since 1994"

**Step 4: Commit**
- Commit content files: `git add src/content/service-city/ docs/project/ralph/ scripts/ && git commit -m 'feat: add complete content for [City] services (22 pages)'`

### Script Templates (Reusable Across Cities)

**YAML Escaping Rule:** Single quotes in YAML single-quoted strings must be doubled.
- WRONG: `trustOpener: 'City\'s homes'`
- RIGHT: `trustOpener: 'City''s homes'`
- JavaScript: `content.replace(/'/g, "''")`

**Script Patterns:**
1. **TypeScript (.ts) for Node v20+:** Used for US-005, US-006, US-007 (add-trust-openers, add-problem-sections, add-solution-sections)
2. **JavaScript (.mjs) for compatibility:** Used for US-008 (add-benefits) when TypeScript regex issues arise

**Script Template Locations:**
- `scripts/add-trust-openers-guelph.ts` - Insert trustOpener after seoDescription
- `scripts/add-problem-sections-guelph.ts` - Insert problem after trustOpener
- `scripts/add-solution-sections-guelph.ts` - Insert solution after problem issues array
- `scripts/add-benefits-guelph.mjs` - Insert benefits after solution section

**Duplication for New City:**
1. Copy script: `cp scripts/add-trust-openers-guelph.ts scripts/add-trust-openers-[city].ts`
2. Update city name in script: `'guelph'` → `'[city]'`
3. Update source markdown: `docs/project/ralph/guelph-trust-openers.md` → `docs/project/ralph/[city]-trust-openers.md`
4. Run script: `npx tsx scripts/add-trust-openers-[city].ts`

### Common Gotchas

**1. Em Dashes (--):**
- **Problem:** Skills (especially /direct-response-copy) often output em dashes in text
- **Solution:** Explicitly instruct skill: "NO em dashes (--) allowed - use proper sentences with periods, commas, semicolons"
- **Verification:** `grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'` (must be empty)

**2. YAML Single Quote Escaping:**
- **Problem:** Apostrophes in YAML single-quoted strings break parsing
- **Solution:** Double single quotes: `City''s homes` not `City\'s homes`
- **Script:** `content.replace(/'/g, "''")`

**3. Grep False Positives:**
- **Problem:** Frontmatter delimiters `---` match `\--` regex
- **Solution:** Filter with `grep -v '^---'` or use field-specific grep

**4. Service Directory Name Mismatches:**
- **Problem:** Service directory names don't always match markdown heading names
  - Directory: `air-conditioner-installation`
  - Markdown heading: `Air Conditioner Installation` or `AC Installation`
- **Solution:** Manual mapping in scripts OR normalize heading names before matching

**5. Context Overload:**
- **Problem:** Passing full context (brand voice + keywords + positioning) to skills produces over-hedged, generic output
- **Solution:** Use LIGHT CONTEXT approach (summaries only) for boldness, FULL CONTEXT only for brand voice

**6. Build Failures After Content Integration:**
- **Problem:** Zod schema errors if YAML frontmatter invalid
- **Solution:** Test script on 1-2 files first, verify build passes, then run batch
- **Common causes:** Missing closing quotes, unescaped apostrophes, incorrect indentation

### Validation Checklist (Before Marking City Complete)

**Content Quality:**
- [ ] Read 5 sample files (furnace, heat pump, AC, boiler, ductless)
- [ ] Verify NO duplicate content across services (problem, solution, benefits unique per service)
- [ ] Verify city-specificity (references local housing, climate, tenure in EVERY service)
- [ ] Verify brand voice maintained (expertise-based, accountability-focused, educator NOT persuader)

**Technical Quality:**
- [ ] Run em dash check: `grep -r '\--' src/content/service-city/*/[city].md | grep -v '^---'` (output empty)
- [ ] Verify proper punctuation (periods, commas, semicolons - NO incomplete sentences)
- [ ] Run build: `pnpm build` (639 pages, 0 errors)
- [ ] Verify YAML escaping correct (doubled single quotes: `City''s`)

**Rendering Quality:**
- [ ] Visual test 3 pages with /agent-browser (furnace, heat pump, AC installation at localhost:4321)
- [ ] Verify Problem section renders (headline, description, 3-4 issues with icons)
- [ ] Verify Solution section renders (city badge shows "Solution in [City]", trust indicator shows "Serving [City] Since 1994")
- [ ] Verify Benefits section renders (3-4 benefits with icons, NO duplication with solution)
- [ ] Verify responsive layouts (375px mobile, 768px tablet, 1024px desktop)

**Uniqueness Verification:**
- [ ] Sample 5 random services
- [ ] Manually verify problem statements differ meaningfully across services
- [ ] Manually verify solution statements differ meaningfully across services
- [ ] Manually verify benefits differ meaningfully across services (NO generic copy)

### Efficiency Metrics (Guelph Batch)

**Time Investment by Story:**
- US-001 (Orchestrator): ~5 minutes
- US-002 (Keyword Research): ~60 minutes
- US-003 (Positioning Angles): ~45 minutes
- US-004 (Brand Voice): ~50 minutes [ONE-TIME, applies to all 25 cities]
- US-005 (trustOpener): ~37 minutes (22 services)
- US-006 (problem): ~107 minutes (20 services)
- US-007 (solution): ~90 minutes (20 services)
- US-008 (benefits): ~115 minutes (20 services, 80 benefits)
- US-009 (Quality Verification): ~45 minutes
- **Total: ~8 hours for first city batch**

**Expected Efficiency Gains for Remaining 24 Cities:**
- US-004 (Brand Voice): SKIP (already exists, applies to all cities)
- Script templates: Already created, just duplicate and modify city name
- Workflow established: No learning curve for cities 2-25
- **Estimated time per city (cities 2-25): ~6 hours** (saves 2 hours per city by skipping brand voice + reduced learning curve)

### Remaining Work

**Cities Remaining:** 24 (Guelph complete)
**Services Per City:** 22
**Total Service-City Pages Remaining:** 528 (24 cities × 22 services)

**Recommended Batching Strategy:**
1. **Region-based batching:** Group cities by region for positioning angle efficiency
   - Region 1 (Halton): Burlington, Oakville, Milton
   - Region 2 (Waterloo): Waterloo, Kitchener, Cambridge
   - Region 3 (Hamilton): Hamilton, Ancaster, Dundas, Stoney Creek
   - Etc.
2. **Positioning angle reuse:** Cities within same region share some positioning angles (climate, housing trends)
3. **Script reuse:** Duplicate Guelph scripts for each new city, minimal modifications

**Parallel Execution:** Ralph can process one city per PRD. Create separate PRDs for each city batch to enable parallel execution if needed.
