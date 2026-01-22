# PRD: Phase 6A - Keyword Strategy & Brand Voice

## Introduction

Phase 6A establishes the strategic foundation for all content generation in Phase 6. This phase creates comprehensive keyword research documentation and defines B.A.P Heating & Cooling's brand voice guidelines. These deliverables inform content creation for 22 service pages, 550 service-city pages, 25 location pages, and blog expansion in subsequent phases (6C-6E).

**Problem:** Content generation across 597+ pages requires consistent voice and SEO-optimized keyword targeting. Without strategic keyword research and brand voice definition, content risks being generic, off-brand, and ineffective for search rankings.

**Solution:** Use marketing skills workflow (orchestrator → keyword-research → brand-voice) to create two strategic documents that guide all future content creation.

---

## Goals

- Generate comprehensive keyword strategy covering all 22 HVAC services across 25 Southern Ontario cities
- Define premium-but-approachable brand voice that resonates with affluent homeowners in research mode
- Create reusable keyword clusters organized by service category, location, and user intent
- Establish voice guidelines with clear do's/don'ts to ensure content consistency across 597+ pages
- Produce documentation that /seo-content skill can reference during Phases 6C-6E content generation

---

## User Stories

### US-001: Comprehensive Keyword Research
**Description:** As a content strategist, I need comprehensive keyword research for HVAC installation services so that all 597+ pages target the right search terms and rank competitively.

**Acceptance Criteria:**
- [ ] **MANDATORY**: Invoke `/orchestrator` skill first with context: "Need keyword research for HVAC installation services across 22 services and 25 cities in Southern Ontario"
- [ ] Follow orchestrator's recommended skill sequence (expected: `/keyword-research` skill)
- [ ] Input business context: B.A.P Heating & Cooling, family-owned since 1994, Southern Ontario coverage (25 cities across 6 regions)
- [ ] Input service scope: All 22 services in one pass (furnace/boiler/heat-pump installation/repair/maintenance, AC services, IAQ, water heaters, commercial)
- [ ] Specify focus: Installation-focused keywords (NOT emergency/repair urgency tactics)
- [ ] Generate keyword clusters organized by:
  - Service category (heating, cooling, IAQ, water, commercial)
  - Location (city-level + regional keywords)
  - User intent (installation vs repair vs maintenance)
- [ ] Output includes:
  - Primary keywords for each service
  - Secondary keywords
  - Long-tail keywords (3-5 words)
  - Search volume estimates
  - Competition analysis (high/medium/low)
  - Content mapping recommendations
- [ ] Save output to `docs/project/phase-6/keyword-strategy.md`
- [ ] Format determined by skill (no specific template required)
- [ ] Document is actionable for Phases 6C-6E content generation
- [ ] `pnpm build` passes (no build impact, but verify no errors)

**Dependencies:** None - this is the first story in Phase 6A

**Estimated Scope:** Single focused session using `/orchestrator` → `/keyword-research` workflow

---

### US-002: Brand Voice Definition
**Description:** As a content writer, I need clear brand voice guidelines so that all 597+ pages sound consistently premium-but-approachable and resonate with affluent homeowners.

**Acceptance Criteria:**
- [ ] **MANDATORY**: Invoke `/orchestrator` skill first with context: "Need to define premium but approachable brand voice for affluent homeowners"
- [ ] Follow orchestrator's recommended skill sequence (expected: `/brand-voice` skill in "Build" mode)
- [ ] Input brand identity:
  - Family-owned business since 1994
  - Owner: Paul Palmer (30+ years experience)
  - Positioning: Accountability, peace of mind, standing behind work
  - NOT emergency/urgency-focused (no "24/7" or scarcity tactics)
- [ ] Input target audience:
  - Affluent homeowners (high-ticket $10K-$15K+ installations)
  - Research mode (not impulse buyers)
  - Value accountability over price
  - Want peace of mind, not decision-making burden
- [ ] Define tone requirements:
  - Premium but NOT stuffy
  - Confident but NOT arrogant
  - Warm but professional
  - Expert guidance without talking down
- [ ] Output includes:
  - Voice attributes (3-5 core attributes)
  - Tone guidelines (how voice adapts across contexts)
  - Do's and don'ts (concrete examples)
  - Example copy in the defined voice
  - Voice vs. tone distinction
- [ ] Save output to `docs/project/phase-6/brand-voice.md`
- [ ] Format determined by skill (no specific template required)
- [ ] Document is actionable for Phases 6C-6E content generation
- [ ] `pnpm build` passes (no build impact, but verify no errors)

**Dependencies:** Can run in parallel with US-001 (keyword research)

**Estimated Scope:** Single focused session using `/orchestrator` → `/brand-voice` workflow

---

## Functional Requirements

**FR-1: Keyword Research Execution**
- The `/orchestrator` skill must determine the correct skill sequence for HVAC keyword research
- The `/keyword-research` skill (or orchestrator-recommended alternative) must generate keyword clusters by service category, location, and intent
- Keyword data must include search volume estimates and competition analysis
- Output must cover all 22 services across 25 cities

**FR-2: Brand Voice Execution**
- The `/orchestrator` skill must determine the correct skill sequence for brand voice definition
- The `/brand-voice` skill (or orchestrator-recommended alternative) must build voice from scratch using business context (NOT extract from existing content)
- Voice guidelines must define premium-but-approachable tone
- Output must include voice attributes, tone guidelines, do's/don'ts, and example copy

**FR-3: Output Documentation**
- Both deliverables must save to `docs/project/phase-6/` directory
- Filename: `keyword-strategy.md` (from US-001)
- Filename: `brand-voice.md` (from US-002)
- Format is flexible - determined by skills used
- Documents must be actionable references for content generation

**FR-4: Content Generation Integration**
- Both documents feed into Phase 6C (22 service pages)
- Both documents feed into Phase 6D (550 service-city pages)
- Both documents feed into Phase 6E (25 location pages + blog)
- `/seo-content` skill in Phases 6C-6E references these documents as input

---

## Non-Goals (Out of Scope)

- ❌ No content generation in this phase (happens in 6C-6E)
- ❌ No schema updates (completed in Phase 6B)
- ❌ No component creation (completed in Phase 6B)
- ❌ No template integration (completed in Phase 6B)
- ❌ No competitor analysis beyond keyword competition levels
- ❌ No paid search keyword recommendations (organic SEO only)
- ❌ No social media keyword strategy
- ❌ No emergency/repair urgency messaging (installation-focused)
- ❌ No automated keyword insertion into existing pages (manual content generation in 6C-6E)

---

## Design Considerations

### Keyword Research Strategy
- Focus on **installation intent** keywords (not emergency repair)
- Example primary keyword: "furnace installation Guelph" (NOT "emergency furnace repair Guelph")
- Cluster by service type for batched content generation (heating, cooling, IAQ, water, commercial)
- Include city-specific modifiers for 550 service-city pages
- Consider seasonal search patterns (heating keywords peak fall/winter, cooling keywords peak spring/summer)

### Brand Voice Strategy
- **Voice quote from project context:** "A wealthy homeowner chooses B.A.P because they don't want to manage decisions, risk, or follow-ups. They want a company with enough history and judgment to make the right call the first time, install it properly, and stand behind it years later without excuses."
- Voice must support the pivot from emergency/urgency to premium installation positioning
- Avoid: "24/7", "3 slots available", problem-agitation tactics
- Embrace: Expertise, accountability, peace of mind, family heritage (since 1994)

### Reference Materials
- Business profile: `src/content/business/profile.yaml`
- Architecture doc: `PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md` (lines 680-698 for Phase 6A specs)
- Homepage context: `HOMEPAGE-REDESIGN-FULL-AND-FINAL.md` (value proposition section)

---

## Technical Considerations

### Skill Workflow Dependencies
- **CRITICAL**: Both stories MUST start with `/orchestrator` skill
- `/orchestrator` determines the optimal skill sequence (may not be `/keyword-research` or `/brand-voice` - follow its recommendation)
- Skills may run in parallel (US-001 and US-002 are independent)
- No code changes required - output is markdown documentation only

### File System
- Output directory: `docs/project/phase-6/` (create if doesn't exist)
- No impact on build process (documentation files not imported by application)
- Verify `pnpm build` still passes as sanity check

### Content Generation Phases (Downstream)
- **Phase 6C** (service content): `/seo-content` skill uses keyword-strategy.md + brand-voice.md
- **Phase 6D** (service-city content): `/seo-content` skill uses keyword-strategy.md + brand-voice.md
- **Phase 6E** (location + blog): `/seo-content` skill uses keyword-strategy.md + brand-voice.md

---

## Success Metrics

- **SM-1**: Keyword strategy document covers 100% of 22 services
- **SM-2**: Keyword clusters include city-specific modifiers for all 25 cities
- **SM-3**: Brand voice guidelines include concrete do's/don'ts with examples
- **SM-4**: Both documents are referenced successfully in Phase 6C content generation (validation occurs in 6C, not 6A)
- **SM-5**: Content generated in Phases 6C-6E maintains consistent voice across 597+ pages
- **SM-6**: Installation-focused keywords drive qualified leads (measured post-launch, not in Phase 6A)

---

## Open Questions

**Q1**: Should keyword research prioritize high search volume or low competition?
- **Answer**: Balance both - prioritize installation-focused keywords with moderate competition and sufficient search volume to justify content creation for 597+ pages

**Q2**: Should brand voice vary by service type (e.g., commercial vs residential)?
- **Answer**: Core voice stays consistent, but tone may adapt (e.g., more technical for commercial HVAC while maintaining premium-but-approachable foundation)

**Q3**: Do we need separate keyword strategies for service pages vs service-city pages?
- **Answer**: Single unified strategy with city modifiers - service-city pages inherit service keywords + add location modifier (e.g., "furnace installation" → "furnace installation Guelph")

**Q4**: Should brand voice address seasonal messaging (winter heating vs summer cooling)?
- **Answer**: Not explicitly - voice is season-agnostic, but tone may adapt in content application (handled in 6C-6E content generation, not voice definition)

---

## Appendix: Service Coverage (All 22 Services)

**Heating (9 services):**
1. Furnace Installation
2. Furnace Repair
3. Furnace Maintenance
4. Boiler Installation
5. Boiler Repair
6. Boiler Maintenance
7. Heat Pump Installation
8. Heat Pump Repair
9. Heat Pump Maintenance

**Cooling (4 services):**
10. AC Installation
11. AC Repair
12. AC Maintenance
13. Ductless Mini-Split

**IAQ (5 services):**
14. Dehumidifiers
15. Humidifiers
16. HRV/ERV Systems
17. Air Filtration
18. Indoor Air Quality

**Water (2 services):**
19. Tank Water Heater Replacement
20. Tankless Water Heater Installation

**Commercial (2 services):**
21. Commercial HVAC
22. Rooftop Units

**Location Coverage:** 25 cities across 6 regions in Southern Ontario

---

## Appendix: Ralph Execution Notes

**Branch:** `feature/phase-6a-strategy`

**Execution Order:**
1. Phase 6B (architecture) - ✅ COMPLETE (14/14 stories)
2. **Phase 6A (strategy)** ← CURRENT (2 stories)
3. Phase 6C (service content) - After 6A complete
4. Phase 6D (service-city content) - After 6C complete
5. Phase 6E (locations + SEO) - Can run parallel with 6D

**Quality Gates:**
- Both stories must invoke `/orchestrator` first (MANDATORY)
- Both output files must exist in `docs/project/phase-6/`
- Both documents must be actionable for Phases 6C-6E
- `pnpm build` must pass (sanity check)

**Story Completion Criteria:**
- US-001 passes when `keyword-strategy.md` exists with comprehensive coverage
- US-002 passes when `brand-voice.md` exists with clear guidelines
- NO visual testing required (documentation only)
- NO accessibility review required (no UI changes)
