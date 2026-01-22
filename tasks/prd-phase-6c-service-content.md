# PRD: Phase 6C - Service Content Generation

## Introduction

Phase 6C generates SEO-optimized content for all 22 service pages using the keyword strategy and brand voice defined in Phase 6A. This phase populates the new schema fields added in Phase 6B (problemStatement, solutionApproach) and creates comprehensive, conversion-focused content for each HVAC service.

**Problem:** Service pages currently lack structured problem/solution content and need SEO-optimized copy that resonates with affluent homeowners researching high-ticket installations ($10K-$15K+).

**Solution:** Use `/seo-content` skill to generate premium-but-approachable content informed by keyword research and brand voice guidelines. Content will be batched by service category (Heating, Cooling+IAQ, Water+Commercial) for efficient generation.

---

## Goals

- Generate SEO-optimized content for all 22 service pages
- Populate new schema fields: problemStatement, solutionApproach, benefits, process steps, savings info
- Ensure content follows brand voice: premium but NOT stuffy, confident but NOT arrogant, warm but professional
- Target installation-focused keywords (NOT emergency/repair urgency)
- Create service-specific FAQ content that references existing FAQ entries
- Maintain consistent quality across all services (automated validation via build + word count)
- Support lead conversion for affluent homeowners in research mode

---

## User Stories

### US-001: Service Content - Heating (9 services)
**Description:** As a content strategist, I need SEO-optimized content for all 9 heating services so that homeowners researching furnace, boiler, and heat pump installations find valuable, conversion-focused information.

**Acceptance Criteria:**
- [ ] **Schema Validation**: Read `src/content/config.ts` and confirm `problemStatement`, `solutionApproach` fields exist in services collection schema
- [ ] **Read Strategy Docs**: Read `docs/project/phase-6/keyword-strategy.md` and `docs/project/phase-6/brand-voice.md` to inform content generation
- [ ] **MANDATORY**: Use `/seo-content` skill to generate content for EACH of the 9 heating services (let Ralph/agent decide optimal batching approach)
- [ ] **Input to /seo-content skill**: Service name, target keywords from keyword-strategy.md (installation-focused), brand voice guidelines from brand-voice.md
- [ ] **Generate for each service**:
  - `problemStatement`: Object with `headline` (string), `description` (string), `painPoints` (array of 3-5 strings)
  - `solutionApproach`: Object with `headline` (string), `description` (string), `differentiators` (array of 3-5 strings showcasing B.A.P expertise)
  - `benefits`: Array of 4-6 benefit objects with `title`, `description`, `icon` (emoji or Lucide icon name)
  - `processSteps`: Array of numbered steps explaining installation/service process
  - `savings`: Object with rebate/financing information (mention Enbridge rebates, financing options)
  - `faqs`: Array of FAQ objects referencing existing FAQ entries from `src/content/faqs/` collection (link to relevant FAQs by ID or slug)
- [ ] **Update 9 MD files** in `src/content/services/`:
  - `furnace-installation.md`
  - `furnace-repair.md`
  - `furnace-maintenance.md`
  - `boiler-installation.md`
  - `boiler-repair.md`
  - `boiler-maintenance.md`
  - `heat-pump-installation.md`
  - `heat-pump-repair.md`
  - `heat-pump-maintenance.md`
- [ ] **Content Replacement**: Completely replace frontmatter with new generated content (preserve filename/slug only)
- [ ] **Automated Validation**: Run word count check - each problemStatement.description + solutionApproach.description should total 300+ words minimum
- [ ] **Build Validation**: `pnpm build` passes with no errors

**Dependencies:** Phase 6A (keyword-strategy.md, brand-voice.md) and Phase 6B (schema updates) must be complete

---

### US-002: Service Content - Cooling + IAQ (7 services)
**Description:** As a content strategist, I need SEO-optimized content for all cooling and indoor air quality services so that homeowners researching AC, ductless systems, and IAQ solutions find valuable information.

**Acceptance Criteria:**
- [ ] **Schema Validation**: Confirm services collection schema includes required fields (same as US-001)
- [ ] **Read Strategy Docs**: Read keyword-strategy.md and brand-voice.md
- [ ] **MANDATORY**: Use `/seo-content` skill to generate content for EACH of the 7 cooling + IAQ services
- [ ] **Generate same content structure** as US-001 (problemStatement, solutionApproach, benefits, processSteps, savings, faqs)
- [ ] **Update 7 MD files** in `src/content/services/`:
  - `ac-installation.md`
  - `ac-repair.md`
  - `ac-maintenance.md`
  - `ductless-mini-split.md`
  - `dehumidifiers.md`
  - `humidifiers.md`
  - `hrv-erv-systems.md`
- [ ] **Content Replacement**: Completely replace frontmatter with new generated content
- [ ] **Automated Validation**: Word count check - 300+ words minimum per service (problemStatement + solutionApproach descriptions)
- [ ] **Build Validation**: `pnpm build` passes with no errors

**Dependencies:** US-001 completion recommended (to establish content generation pattern)

---

### US-003: Service Content - Water + Commercial (6 services)
**Description:** As a content strategist, I need SEO-optimized content for water heating and commercial HVAC services so that homeowners and business owners researching these services find valuable information.

**Acceptance Criteria:**
- [ ] **Schema Validation**: Confirm services collection schema includes required fields (same as US-001)
- [ ] **Read Strategy Docs**: Read keyword-strategy.md and brand-voice.md
- [ ] **MANDATORY**: Use `/seo-content` skill to generate content for EACH of the 6 water + commercial services
- [ ] **Generate same content structure** as US-001 (problemStatement, solutionApproach, benefits, processSteps, savings, faqs)
- [ ] **Update 6 MD files** in `src/content/services/`:
  - `tank-water-heater.md`
  - `tankless-water-heater.md`
  - `air-filtration.md`
  - `indoor-air-quality.md`
  - `commercial-hvac.md`
  - `rooftop-units.md`
- [ ] **Content Replacement**: Completely replace frontmatter with new generated content
- [ ] **Automated Validation**: Word count check - 300+ words minimum per service (problemStatement + solutionApproach descriptions)
- [ ] **Special Note - Commercial Services**: Tone adapts to more technical audience while maintaining premium-but-approachable voice (per brand-voice.md guidelines)
- [ ] **Build Validation**: `pnpm build` passes with no errors

**Dependencies:** US-001, US-002 completion recommended (content generation pattern established)

---

## Functional Requirements

**FR-1: Schema Compliance**
- All generated content must conform to services collection schema in `src/content/config.ts`
- Required fields: `problemStatement` (object), `solutionApproach` (object), `benefits` (array), `processSteps` (array), `savings` (object), `faqs` (array)

**FR-2: SEO Content Skill Usage**
- The `/seo-content` skill must be used for ALL service content generation
- Input must include: service name, target keywords from keyword-strategy.md, brand voice from brand-voice.md
- Ralph/agent decides optimal batching approach (single service, multiple services per skill invocation, etc.)

**FR-3: Keyword Integration**
- Content must target installation-focused keywords from Phase 6A keyword strategy
- Primary keywords for each service category must appear in headlines and descriptions
- Avoid emergency/repair urgency language ("24/7", "3 slots available", scarcity tactics)

**FR-4: Brand Voice Consistency**
- All content must follow the 5 core personality traits from brand-voice.md:
  1. Seasoned Confidence (30+ years experience)
  2. Accountable Partner (peace of mind positioning)
  3. Research-Friendly Expert (expert guidance without condescension)
  4. Family-Business Warmth (personal touch)
  5. Premium Without Pretension (high-quality without being stuffy)
- Tone: Premium but NOT stuffy, confident but NOT arrogant, warm but professional

**FR-5: FAQ Integration**
- Each service must reference 3-5 relevant FAQ entries from existing `src/content/faqs/` collection
- FAQs should be linked by ID or slug (not duplicated content)
- Service-specific FAQs prioritized (e.g., furnace installation FAQs for furnace-installation.md)

**FR-6: Problem/Solution Structure**
- **problemStatement** must articulate:
  - What issue does this service solve?
  - Pain points affluent homeowners face (rising bills, comfort issues, equipment age)
  - Why this matters for high-ticket installations
- **solutionApproach** must articulate:
  - How B.A.P approaches this service differently
  - Differentiators (TSSA certified, 10-year warranty, 30+ years experience, etc.)
  - Peace of mind positioning (NOT emergency urgency)

**FR-7: Benefits Focus**
- 4-6 benefits per service with icons
- Focus on accountability, expertise, peace of mind (NOT price competition)
- Examples: "TSSA Certified Technicians", "10-Year Parts & Labour Warranty", "Rebate Maximization Experts", "Same-Day Quotes"

**FR-8: Savings Information**
- Mention Enbridge Gas rebates (where applicable)
- Reference financing options (link to /financing page)
- Focus on long-term value, not urgency discounts

**FR-9: Content Replacement Strategy**
- Completely replace all frontmatter fields with new generated content
- Preserve only: filename, slug
- Do NOT merge with existing content - full replacement per user decision (2A)

**FR-10: Automated Validation**
- Word count: Minimum 300 words per service (problemStatement.description + solutionApproach.description combined)
- Build validation: `pnpm build` must pass (Zod schema validation)
- No manual spot-checking required (per user decision 3B)

---

## Non-Goals (Out of Scope)

- ❌ No visual testing or `/agent-browser` validation (documentation/content only, no UI changes)
- ❌ No accessibility review with `/web-design-guidelines` skill (no UI changes)
- ❌ No manual content review (automated validation only)
- ❌ No emergency/repair urgency messaging ("24/7", "3 slots left", problem-agitation)
- ❌ No online booking CTAs (phone call only per business requirements)
- ❌ No price competition or discount urgency ("limited time", "special offer")
- ❌ No service-city content (Phase 6D)
- ❌ No location page expansion (Phase 6E)
- ❌ No blog content (Phase 6E)
- ❌ No schema markup implementation (Phase 6E)
- ❌ No meta description updates (Phase 6E)

---

## Design Considerations

### Content Strategy

**Installation-Focused Keywords:**
- Use keyword clusters from keyword-strategy.md organized by service category
- Example primary keywords:
  - Furnace: "furnace installation Guelph", "high-efficiency furnace", "furnace replacement"
  - Heat Pump: "heat pump installation", "cold climate heat pump", "heat pump rebates"
  - AC: "central air installation", "AC replacement", "air conditioning systems"
  - IAQ: "whole-home humidifier", "HRV installation", "air quality solutions"

**Voice Differentiation by Service Type:**
- **Residential services** (furnace, AC, water heaters): Warm, family-focused, peace of mind
- **Commercial services** (commercial HVAC, rooftop units): More technical while maintaining approachability
- Core voice stays consistent per brand-voice.md

### Content Structure Per Service

**Example: Furnace Installation**

```yaml
---
title: "Furnace Installation Guelph | High-Efficiency Heating Systems"
slug: "furnace-installation"

problemStatement:
  headline: "Is Your Furnace Struggling to Keep Up?"
  description: "When your furnace starts showing its age—rising energy bills, uneven heating, strange noises—it's time to consider a replacement. A new high-efficiency furnace can cut heating costs by 30-40% while improving comfort throughout your home. But choosing the right system and installer matters. A poorly sized or installed furnace wastes thousands in energy costs and shortens equipment life."
  painPoints:
    - "Rising monthly heating bills despite regular maintenance"
    - "Cold spots and uneven temperatures throughout the home"
    - "Frequent repairs on aging equipment (15+ years old)"
    - "Uncertainty about system sizing and efficiency ratings"
    - "Concerns about installation quality and warranty coverage"

solutionApproach:
  headline: "The B.A.P Approach: Right-Sized, Right the First Time"
  description: "We've installed over 5,000 furnaces across Southern Ontario since 1994. Our process starts with a Manual J load calculation—not guesswork—to determine exactly what your home needs. We factor in insulation, windows, orientation, and your family's comfort preferences. Then we recommend systems from trusted brands, explain efficiency ratings in plain language, and maximize available rebates. Our TSSA-certified technicians install to manufacturer specs, test every component, and stand behind the work with a 10-year parts and labour warranty."
  differentiators:
    - "Manual J load calculation for precise sizing (not guesswork)"
    - "TSSA-certified technicians with 30+ years combined experience"
    - "10-year parts & labour warranty on all installations"
    - "Enbridge rebate maximization (up to $5,000 on qualifying systems)"
    - "Family-owned accountability—Paul Palmer personally oversees every project"

benefits:
  - title: "TSSA Certified Expertise"
    description: "All technicians hold current TSSA gas certifications and complete ongoing training on high-efficiency systems."
    icon: "shield-check"
  - title: "10-Year Comprehensive Warranty"
    description: "We stand behind our installations with a full decade of parts and labour coverage—no hidden exclusions."
    icon: "award"
  - title: "Rebate Maximization"
    description: "We handle all rebate paperwork and ensure you receive maximum Enbridge incentives (up to $5,000)."
    icon: "dollar-sign"
  - title: "Same-Day Quotes"
    description: "In-home assessments scheduled within 24 hours. Clear, detailed quotes with no pressure tactics."
    icon: "clock"

processSteps:
  - "Free in-home consultation: Manual J load calculation, system recommendations, rebate eligibility review"
  - "Transparent quote: Itemized pricing, equipment specs, warranty details, rebate amounts"
  - "Scheduled installation: Dedicated install team, respectful of your home, completed in 1 day for most systems"
  - "Quality assurance: Full system testing, airflow verification, thermostat setup, walkthrough with homeowner"
  - "Rebate submission: We complete all paperwork and submit to Enbridge on your behalf"
  - "Follow-up: 30-day check-in, ongoing maintenance reminders, 10-year warranty support"

savings:
  headline: "Save Up to $5,000 with Enbridge Rebates"
  description: "High-efficiency furnaces qualify for Enbridge Gas rebates ranging from $250 to $5,000 depending on AFUE rating and system type. We'll identify the maximum rebate you qualify for and handle all submission paperwork."
  rebates: "Enbridge Gas rebates: $250-$5,000 based on AFUE rating (95%+ systems qualify for top tier)"
  financing: "Flexible financing options available. Speak with our team about payment plans that fit your budget."

faqs:
  - id: "furnace-installation-cost"
  - id: "furnace-efficiency-ratings"
  - id: "furnace-sizing"
  - id: "enbridge-rebates-furnace"
  - id: "furnace-installation-time"
---
```

---

## Technical Considerations

### Content Generation Workflow

1. **Ralph determines batching approach** (per user decision 1C):
   - Option A: Generate all 9 heating services in one `/seo-content` skill invocation
   - Option B: Generate each service individually (9 separate skill calls)
   - Option C: Batch by sub-category (furnace services, boiler services, heat pump services)

2. **Schema validation first** (per user decision 5C):
   - Each story starts by reading `src/content/config.ts`
   - Verify `problemStatement`, `solutionApproach` fields exist
   - Confirm Zod schema structure matches generated content

3. **Strategy docs as input**:
   - Read `docs/project/phase-6/keyword-strategy.md` for target keywords
   - Read `docs/project/phase-6/brand-voice.md` for voice guidelines
   - Pass relevant sections to `/seo-content` skill

4. **FAQ references**:
   - Read `src/content/faqs/` collection to identify relevant FAQ entries
   - Link to existing FAQs by ID or slug (don't duplicate content)
   - Generate service-specific FAQ IDs if new FAQs are needed

5. **Content replacement** (per user decision 2A):
   - Read existing service MD file
   - Extract filename/slug only
   - Replace entire frontmatter with new generated content
   - Overwrite file

6. **Automated validation**:
   - Count words in `problemStatement.description` + `solutionApproach.description`
   - Verify ≥ 300 words per service
   - Run `pnpm build` to validate Zod schema compliance

### File Structure

**Service MD files location:** `src/content/services/`

**Heating services (9 files):**
- furnace-installation.md
- furnace-repair.md
- furnace-maintenance.md
- boiler-installation.md
- boiler-repair.md
- boiler-maintenance.md
- heat-pump-installation.md
- heat-pump-repair.md
- heat-pump-maintenance.md

**Cooling + IAQ services (7 files):**
- ac-installation.md
- ac-repair.md
- ac-maintenance.md
- ductless-mini-split.md
- dehumidifiers.md
- humidifiers.md
- hrv-erv-systems.md

**Water + Commercial services (6 files):**
- tank-water-heater.md
- tankless-water-heater.md
- air-filtration.md
- indoor-air-quality.md
- commercial-hvac.md
- rooftop-units.md

**Total:** 22 service MD files

---

## Success Metrics

- **SM-1**: All 22 service pages have complete problemStatement and solutionApproach content
- **SM-2**: 100% of services meet minimum 300-word requirement (problemStatement + solutionApproach)
- **SM-3**: All services include 4-6 benefits with icons
- **SM-4**: All services reference 3-5 relevant FAQ entries from existing faqs collection
- **SM-5**: Content follows brand voice guidelines (verified by presence of differentiators like "TSSA certified", "10-year warranty", "family-owned since 1994")
- **SM-6**: `pnpm build` passes with zero schema validation errors
- **SM-7**: Installation-focused keywords appear in headlines and descriptions (NOT emergency/repair language)
- **SM-8**: Commercial services (commercial-hvac.md, rooftop-units.md) maintain premium voice while adapting tone for business audience

---

## Open Questions

**Q1**: Should `/seo-content` skill be invoked once per service or batched by category?
- **Answer**: Ralph/agent decides optimal batching approach (user decision 1C). Start with one service to establish pattern, then batch if efficient.

**Q2**: Do we need to preserve any existing frontmatter fields?
- **Answer**: No. Completely replace frontmatter with new generated content. Preserve filename/slug only (user decision 2A).

**Q3**: What manual review is required before marking stories complete?
- **Answer**: None. Automated validation only via `pnpm build` and word count checks (user decision 3B).

**Q4**: Should FAQs be generated or referenced from existing collection?
- **Answer**: Reference existing FAQ entries by ID/slug. Generate new FAQ IDs if needed, but link to existing content where possible (user decision 4A).

**Q5**: Is schema validation required as acceptance criteria?
- **Answer**: Yes. Each story starts by reading config.ts and confirming schema fields exist (user decision 5C).

**Q6**: How do we handle services with multiple variations (e.g., furnace installation vs. repair)?
- **Answer**: Each is a separate service with distinct problemStatement (installation: "old furnace failing", repair: "sudden breakdown"). Tone stays consistent but pain points differ.

---

## Appendix: All 22 Services by Category

### Heating (9 services)
1. Furnace Installation
2. Furnace Repair
3. Furnace Maintenance
4. Boiler Installation
5. Boiler Repair
6. Boiler Maintenance
7. Heat Pump Installation
8. Heat Pump Repair
9. Heat Pump Maintenance

### Cooling + IAQ (7 services)
10. AC Installation
11. AC Repair
12. AC Maintenance
13. Ductless Mini-Split
14. Dehumidifiers
15. Humidifiers
16. HRV/ERV Systems

### Water + Commercial (6 services)
17. Tank Water Heater
18. Tankless Water Heater
19. Air Filtration
20. Indoor Air Quality
21. Commercial HVAC
22. Rooftop Units

---

## Appendix: Ralph Execution Notes

**Branch:** `feature/phase-6c-services`

**Execution Order:**
1. Phase 6B (architecture) - ✅ COMPLETE (15/15 stories)
2. Phase 6A (strategy) - ✅ COMPLETE (2/2 stories)
3. **Phase 6C (service content)** ← CURRENT (3 stories)
4. Phase 6D (service-city content) - After 6C complete
5. Phase 6E (locations + SEO) - Can run parallel with 6D

**Story Dependencies:**
- US-001 → US-002 (recommended, not required)
- US-002 → US-003 (recommended, not required)
- All stories independent but sequential execution recommended to establish content generation pattern

**Quality Gates:**
- Schema validation before content generation (read config.ts)
- Word count check: 300+ words per service
- Build validation: `pnpm build` passes
- NO manual review required
- NO visual testing required (content only, no UI changes)

**Story Completion Criteria:**
- US-001 passes when all 9 heating service MD files updated with complete frontmatter
- US-002 passes when all 7 cooling + IAQ service MD files updated
- US-003 passes when all 6 water + commercial service MD files updated
- Build passes with zero errors for each story
