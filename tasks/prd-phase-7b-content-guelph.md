# PRD: Phase 7B - Guelph Content Generation

## Introduction

Generate SEO-optimized, city-specific content for all 22 service-city pages in Guelph, ON using the mandatory skill pipeline. This addresses the critical issue where 550 service-city pages are missing required content fields (`problem`, `solution`, `benefits`), causing all city pages to display duplicate parent service content with zero local SEO differentiation.

**Problem:** Phase 7A only handled infrastructure. Service-city content files are missing fields, triggering fallback logic that renders generic content across all 25 cities.

**Solution:** Use `/orchestrator` → skill chain workflow to generate unique, Guelph-specific content for each service. Content must pass strict quality gates: NO AI slop, NO em dashes (--), proper sentences only.

## Goals

- Generate unique, SEO-optimized content for 22 Guelph service-city pages
- Establish keyword research and positioning angles for Guelph market
- Validate brand voice consistency across all generated content
- Create PERMANENT documentation files for reference across all 25 city batches
- Ensure NO em dashes (--) in any generated content
- Achieve 100% unique content (NO city-swapping or templating)
- Pass build verification (639 pages, 0 errors)

## User Stories

### US-001: Run Orchestrator for Guelph Content Strategy
**Description:** As a content strategist, I need the orchestrator skill to diagnose the Guelph content generation task and recommend the correct skill sequence so that content generation follows the proper marketing workflow.

**Acceptance Criteria:**
- [ ] Run `/orchestrator` skill with task: "Generate SEO-optimized content for 22 service-city pages in Guelph, ON"
- [ ] Orchestrator diagnoses need and recommends skill sequence
- [ ] Document recommended skill chain in `docs/project/ralph/progress.txt`
- [ ] Output confirms workflow: orchestrator → keyword-research → positioning-angles → brand-voice → seo-content → direct-response-copy
- [ ] pnpm build passes

### US-002: Keyword Research for Guelph Market
**Description:** As an SEO specialist, I need comprehensive keyword research for all 22 Guelph services so that content targets the right search terms and ranks for local queries.

**Acceptance Criteria:**
- [ ] Run `/keyword-research` skill (as routed by orchestrator from US-001)
- [ ] Target: Guelph + all 22 services (e.g., "furnace installation guelph", "heat pump guelph", "air conditioner installation guelph")
- [ ] Identify primary, secondary, and long-tail keywords for each service
- [ ] Output: Keyword map for all 22 Guelph service-city pages
- [ ] Create `docs/project/ralph/guelph-keywords.md` (⚠️ PERMANENT reference file - NEVER delete)
- [ ] Verify file contains at least 22 service entries with keyword data
- [ ] Commit: `git add docs/project/ralph/guelph-keywords.md && git commit -m "docs: add Guelph keyword research (US-002)"`
- [ ] pnpm build passes

### US-003: Positioning Angles for Guelph Market
**Description:** As a marketing strategist, I need unique positioning angles for the Guelph market so that B.A.P differentiates from competitors based on local factors.

**Acceptance Criteria:**
- [ ] Run `/positioning-angles` skill (as routed by orchestrator from US-001)
- [ ] Identify unique positioning for Guelph market (climate, housing stock, demographics, local challenges)
- [ ] Differentiate B.A.P from competitors in Guelph area
- [ ] Output: 3-5 positioning angles specific to Guelph
- [ ] Create `docs/project/ralph/guelph-positioning.md` (⚠️ PERMANENT reference file - NEVER delete)
- [ ] Verify file contains concrete positioning statements (NOT generic)
- [ ] Commit: `git add docs/project/ralph/guelph-positioning.md && git commit -m "docs: add Guelph positioning angles (US-003)"`
- [ ] pnpm build passes

### US-004: Brand Voice Validation
**Description:** As a brand manager, I need to validate the brand voice from existing service pages so that all generated content maintains consistent tone and messaging.

**Acceptance Criteria:**
- [ ] Run `/brand-voice` skill (as routed by orchestrator from US-001)
- [ ] Extract or validate brand voice from existing service pages (e.g., `src/content/services/furnace-installation.md`)
- [ ] Ensure voice guide exists and is complete (tone, style, language patterns)
- [ ] Output: Brand voice profile document
- [ ] Create `docs/project/ralph/brand-voice.md` (⚠️ PERMANENT reference file - NEVER delete, applies to ALL 25 city batches)
- [ ] Verify file contains specific voice guidelines (NOT vague descriptions)
- [ ] Commit: `git add docs/project/ralph/brand-voice.md && git commit -m "docs: add brand voice guide (US-004)"`
- [ ] pnpm build passes

### US-005: Generate trustOpener Content for All Guelph Services
**Description:** As a copywriter, I need to generate unique trustOpener statements for all 22 Guelph services so that each page opens with a city-specific trust signal.

**Acceptance Criteria:**
- [ ] Run `/orchestrator` → routes to `/direct-response-copy` skill for trustOpener field
- [ ] Generate unique 2-3 sentence trust statement for each of 22 Guelph services
- [ ] Content MUST reference Guelph-specific factors (e.g., climate, housing, local history) - NOT generic
- [ ] NO em dashes (--) allowed - if skill output contains em dashes, re-run with explicit "no em dashes" instruction
- [ ] Use proper sentences with correct punctuation (periods, commas, semicolons)
- [ ] Verify uniqueness: Run `grep -r "trustOpener:" src/content/service-city/*/guelph.md | sort | uniq -d` - output must be empty
- [ ] Update all 22 files in `src/content/service-city/*/guelph.md` with trustOpener field
- [ ] Run automated em dash check: `grep -r "\-\-" src/content/service-city/*/guelph.md` - output must be empty
- [ ] Commit: `git add src/content/service-city/ && git commit -m "feat: add trustOpener content for Guelph services (US-005)"`
- [ ] pnpm build passes (639 pages, 0 errors)

### US-006: Generate problem Content for All Guelph Services
**Description:** As an SEO content writer, I need to generate unique problem sections for all 22 Guelph services so that each page addresses city-specific HVAC challenges using target keywords.

**Acceptance Criteria:**
- [ ] Run `/orchestrator` → routes to `/seo-content` skill for problem section
- [ ] Use keywords from US-002 (guelph-keywords.md) to inform content
- [ ] Generate unique problem section for each of 22 Guelph services
- [ ] Each problem section MUST include: headline, description, 3-4 city-specific issues
- [ ] Content MUST reference Guelph-specific factors: climate (cold winters, humid summers), housing stock (mix of historic and new), local challenges
- [ ] NO em dashes (--) allowed - if skill output contains em dashes, re-run with explicit "no em dashes" instruction
- [ ] Use proper sentences with correct punctuation
- [ ] Verify uniqueness: Sample 5 random files and manually verify NO duplicate problem statements across services
- [ ] Update all 22 files with `problem` field (headline, description, issues array)
- [ ] Run automated em dash check: `grep -r "\-\-" src/content/service-city/*/guelph.md` - output must be empty
- [ ] Commit: `git add src/content/service-city/ && git commit -m "feat: add problem content for Guelph services (US-006)"`
- [ ] pnpm build passes (639 pages, 0 errors)

### US-007: Generate solution Content for All Guelph Services
**Description:** As an SEO content writer, I need to generate unique solution sections for all 22 Guelph services so that each page explains B.A.P's city-specific approach using positioning angles.

**Acceptance Criteria:**
- [ ] Run `/orchestrator` → routes to `/seo-content` skill for solution section
- [ ] Use positioning angles from US-003 (guelph-positioning.md) to inform content
- [ ] Generate unique solution section for each of 22 Guelph services
- [ ] Each solution section MUST include: headline, description
- [ ] Content MUST emphasize B.A.P's local expertise in Guelph (e.g., "Serving Guelph Since 1994", understanding local housing types)
- [ ] NO em dashes (--) allowed - if skill output contains em dashes, re-run with explicit "no em dashes" instruction
- [ ] Use proper sentences with correct punctuation
- [ ] Verify uniqueness: Sample 5 random files and manually verify NO duplicate solution statements across services
- [ ] Update all 22 files with `solution` field (headline, description)
- [ ] Run automated em dash check: `grep -r "\-\-" src/content/service-city/*/guelph.md` - output must be empty
- [ ] Commit: `git add src/content/service-city/ && git commit -m "feat: add solution content for Guelph services (US-007)"`
- [ ] pnpm build passes (639 pages, 0 errors)

### US-008: Generate benefits Content for All Guelph Services
**Description:** As a conversion copywriter, I need to generate unique benefits for all 22 Guelph services so that each page presents city-specific advantages that drive conversions.

**Acceptance Criteria:**
- [ ] Run `/orchestrator` → routes to `/direct-response-copy` skill for benefits section
- [ ] Generate 3-4 unique benefits for each of 22 Guelph services
- [ ] Benefits MUST be city-specific (NOT generic parent benefits) - reference Guelph market, local response times, area expertise
- [ ] Each benefit MUST include: title, description, icon (e.g., 'award', 'clock', 'shield', 'star')
- [ ] NO em dashes (--) allowed - if skill output contains em dashes, re-run with explicit "no em dashes" instruction
- [ ] Use proper sentences with correct punctuation
- [ ] Verify uniqueness: Sample 5 random files and manually verify benefits differ meaningfully across services
- [ ] Update all 22 files with `benefits` field (array of benefit objects)
- [ ] Run automated em dash check: `grep -r "\-\-" src/content/service-city/*/guelph.md` - output must be empty
- [ ] Commit: `git add src/content/service-city/ && git commit -m "feat: add benefits content for Guelph services (US-008)"`
- [ ] pnpm build passes (639 pages, 0 errors)

### US-009: Content Quality Verification
**Description:** As a quality assurance lead, I need to verify all Guelph content meets quality standards so that pages are ready for production with no errors or duplicate content.

**Acceptance Criteria:**
- [ ] Read 5 sample Guelph service-city files (furnace-installation, heat-pump-installation, air-conditioner-installation, boiler-installation, ductless-mini-split)
- [ ] Verify NO duplicate content across different services (problem/solution/benefits must be unique per service)
- [ ] Verify NO city-swapping (content genuinely specific to Guelph, not templated)
- [ ] Verify NO em dashes (--) in any content field
- [ ] Verify proper sentences and grammar (no incomplete sentences, proper punctuation)
- [ ] Run `/agent-browser` to visually test 3 sample pages at 375px, 768px, 1024px viewports:
  - Test: localhost:4321/services/furnace-installation-guelph-on
  - Test: localhost:4321/services/heat-pump-installation-guelph-on
  - Test: localhost:4321/services/air-conditioner-installation-guelph-on
- [ ] Verify city-specific content appears correctly in rendered Problem, Solution, and Benefits sections
- [ ] Verify city badge shows "Solution in Guelph" in Solution section
- [ ] Verify trust indicator shows "Serving Guelph Since 1994" in Solution section
- [ ] Verify trustOpener content appears in TrustOpenerSection (if present)
- [ ] Run final automated em dash check: `grep -r "\-\-" src/content/service-city/*/guelph.md` - output MUST be empty
- [ ] pnpm build passes (639 pages, 0 errors)

### US-010: Update AGENTS.md with Content Generation Patterns
**Description:** As a future developer, I need documented patterns from the Guelph batch so that the remaining 24 city batches follow the same proven workflow.

**Acceptance Criteria:**
- [ ] Document skill pipeline used: orchestrator → keyword-research → positioning-angles → brand-voice → seo-content → direct-response-copy
- [ ] Add patterns discovered during Guelph batch execution (what worked, what didn't)
- [ ] Add content quality gotchas: "NO em dashes (--) - always check with grep after skill output"
- [ ] Add batching strategy: "All 22 services in single batch per content field type"
- [ ] Add validation steps: "Automated grep for em dashes + manual sample review"
- [ ] Update AGENTS.md section on content generation with reusable workflow for remaining 24 cities
- [ ] Commit: `git add AGENTS.md && git commit -m "docs: add Phase 7B content generation patterns (US-010)"`
- [ ] pnpm build passes

## Functional Requirements

**FR-1:** ALL content generation MUST use `/orchestrator` skill as entry point (MANDATORY for marketing tasks)

**FR-2:** Content MUST NOT contain em dashes (--) - use periods, commas, semicolons, or proper em dashes (—) instead

**FR-3:** Content MUST be unique per service-city combination (NO city-swapping or templating allowed)

**FR-4:** Content MUST incorporate keywords from `/keyword-research` output (guelph-keywords.md)

**FR-5:** Content MUST follow positioning angles from `/positioning-angles` output (guelph-positioning.md)

**FR-6:** Content MUST follow brand voice from `/brand-voice` output (brand-voice.md)

**FR-7:** Each story MUST update prd.json to `passes: true` only after ALL acceptance criteria are met

**FR-8:** Each story MUST run `pnpm build` and verify 0 errors before marking complete

**FR-9:** Final story (US-009) MUST run `/agent-browser` visual testing before marking complete

**FR-10:** Documentation files (guelph-keywords.md, guelph-positioning.md, brand-voice.md) are PERMANENT and MUST NEVER be deleted

**FR-11:** All 22 services MUST be processed in a single batch per content field type (US-005 through US-008)

**FR-12:** If skill output contains em dashes (--), immediately re-run skill with explicit "no em dashes" instruction

**FR-13:** Content files MUST be committed immediately after each story completes (US-002, US-003, US-004, US-005, US-006, US-007, US-008)

## Non-Goals (Out of Scope)

- **Gallery images** - Can be added in future iteration (galleryImages field is optional)
- **processSteps customization** - Can inherit from parent service (processSteps field is optional)
- **Other 24 cities** - Will be separate batches (Kitchener, Cambridge, Waterloo, Burlington, etc.)
- **Content for non-Guelph locations** - This PRD is Guelph-only
- **Manual content creation** - All content generated via skill pipeline
- **Performance testing** - Focus is on content quality, not page load performance
- **SEO meta tags** - Already handled by templates

## Design Considerations

**NOT APPLICABLE** - This is a content generation task with NO UI changes. Templates and layouts already exist from Phase 7A.

## Technical Considerations

**Content File Structure:**
```yaml
# src/content/service-city/furnace-installation/guelph.md
serviceSlug: 'furnace-installation'
locationSlug: 'guelph'
title: 'Furnace Installation in Guelph, ON'
context: 'Guelph's diverse housing stock...' # (existing)
proof: # (existing)
  testimonial: '...'
  customerName: 'Margaret & David Chen'
trustOpener: 'NEW FIELD - Added in US-005'
problem: # NEW FIELD - Added in US-006
  headline: 'Heating Challenges in Guelph'
  description: 'Guelph-specific climate and housing factors...'
  issues:
    - title: 'Cold Winters in Southern Ontario'
      description: 'Guelph winters require...'
    - title: 'Historic Home Heating Challenges'
      description: 'Many Guelph homes date back...'
solution: # NEW FIELD - Added in US-007
  headline: 'Our Approach in Guelph'
  description: 'B.A.P has served Guelph since 1994...'
benefits: # NEW FIELD - Added in US-008
  - title: 'Local Expertise in Guelph'
    description: 'Deep understanding of Guelph climate and housing'
    icon: 'award'
  - title: 'Fast Response in Guelph Area'
    description: 'Same-day consultations available'
    icon: 'clock'
workflowStatus: 'published'
```

**Schema Validation:**
- All fields are `.optional()` in config.ts (Phase 7A design)
- Build will pass even with missing fields
- Quality verification is manual + automated grep

**Fallback Logic:**
- Templates use: `const benefits = serviceCityData.benefits || serviceData.benefits`
- After Phase 7B: serviceCityData.benefits will exist, no fallback needed

**Git Branch:**
- Create branch: `feature/phase-7b-content-guelph`
- All commits go to this branch
- Merge to main after US-010 complete

## Success Metrics

**Content Quality:**
- ✅ All 22 Guelph service-city files have unique `trustOpener`, `problem`, `solution`, `benefits` fields
- ✅ 0 em dashes (--) detected in any content field
- ✅ Content passes SEO validation (keywords naturally integrated from guelph-keywords.md)
- ✅ Content passes brand voice validation (consistent tone from brand-voice.md)
- ✅ Content passes uniqueness validation (NO duplicate problem statements across services)

**Build Verification:**
- ✅ pnpm build passes with 0 errors (639 pages generated)
- ✅ No Zod validation errors

**Visual Verification:**
- ✅ 3 sample pages tested with `/agent-browser` at 3 viewports (375px, 768px, 1024px)
- ✅ City-specific content renders correctly in Problem, Solution, Benefits sections
- ✅ City badge and trust indicator display correctly

**Documentation:**
- ✅ 3 PERMANENT documentation files created (guelph-keywords.md, guelph-positioning.md, brand-voice.md)
- ✅ AGENTS.md updated with reusable workflow for remaining 24 cities

## Open Questions

**None** - All execution details clarified via user responses (1A, 2A, 3A, 4A, 5A):
- ✅ Validation approach: Automated (grep) + sample review
- ✅ Batching strategy: All 22 services in single batch per story
- ✅ Em dash fix strategy: Immediately re-run skill
- ✅ Commit strategy: Immediately after each skill output
- ✅ Priority: Quality first (Ralph can take 20+ iterations if needed)
