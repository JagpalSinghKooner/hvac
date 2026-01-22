# PRD: Phase 6C Schema Migration & Content Completion

## Introduction

Phase 6C content audit revealed that all 22 service pages use legacy schema fields (`problems`, `approach`) instead of the new Phase 6B schema (`problemStatement`, `solutionApproach`). This causes ProblemSection and SolutionSection components to not render because the template's conditional checks fail.

Additionally, navigation gaps prevent users from discovering Maintenance Plans, and the IAQ pillar page (`indoor-air-quality.md`) is missing despite being a high-priority keyword target.

This PRD defines the complete migration from legacy to new schema, content creation for missing pages, navigation fixes, component verification/rebuild, and cleanup.

## Goals

- Migrate all 22 services from legacy schema to new schema using `/seo-content` skill
- Create missing content: `plans.md` category page and `indoor-air-quality.md` service page
- Fix navigation to include Maintenance Plans as 6th category in Header and Homepage
- Rebuild ServiceBenefitsSection and ServiceSavingsSection to match architecture specs
- Remove legacy schema from config.ts after migration complete
- Ensure all 23 services are discoverable via navigation with no orphan pages
- Verify `pnpm build` passes with 637+ pages

## User Stories

### Group 1: Content Migration with /seo-content Skill

#### US-001: Migrate Heating Services (9 files)

**Description:** As a content manager, I need heating services to use the new schema so ProblemSection and SolutionSection render correctly.

**Files to Migrate:**
- `src/content/services/furnace-installation.md`
- `src/content/services/furnace-repair.md`
- `src/content/services/furnace-maintenance.md`
- `src/content/services/boiler-installation.md`
- `src/content/services/boiler-repair.md`
- `src/content/services/boiler-maintenance.md`
- `src/content/services/heat-pump-installation.md`
- `src/content/services/heat-pump-repair.md`
- `src/content/services/heat-pump-maintenance.md`

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/seo-content` skill for EACH of the 9 services to generate new content
- [ ] Each service has `problemStatement` field with: headline, description, painPoints (3-5 items)
- [ ] Each service has `solutionApproach` field with: headline, description, differentiators (4-6 items)
- [ ] Legacy fields (`problems`, `approach`) REMOVED from all 9 files
- [ ] All existing fields preserved: valueProps, processSteps, savings, etc.
- [ ] `pnpm build` passes (0 errors)
- [ ] **Test EVERY file:** Verify all 9 services render in browser at `/services/[service]`
- [ ] ProblemSection renders with split layout (TEXT-LEFT / IMAGE-RIGHT)
- [ ] SolutionSection renders with split layout (IMAGE-LEFT / TEXT-RIGHT)
- [ ] Placeholder images show correct aspect ratio (aspect-video)
- [ ] Test viewports: 375px (mobile stack), 768px (tablet split starts), 1024px (desktop full split)
- [ ] Git commit: `feat: migrate heating services to new schema (US-001)`
- [ ] Update `prd.json`: `"passes": true` for US-001

---

#### US-002: Migrate Cooling Services (4 files)

**Description:** As a content manager, I need cooling services to use the new schema so ProblemSection and SolutionSection render correctly.

**Files to Migrate:**
- `src/content/services/air-conditioner-installation.md`
- `src/content/services/air-conditioner-repair.md`
- `src/content/services/air-conditioner-maintenance.md`
- `src/content/services/ductless-mini-split.md`

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/seo-content` skill for EACH of the 4 services
- [ ] Each service has `problemStatement` field with: headline, description, painPoints (3-5 items)
- [ ] Each service has `solutionApproach` field with: headline, description, differentiators (4-6 items)
- [ ] Legacy fields (`problems`, `approach`) REMOVED from all 4 files
- [ ] All existing fields preserved: valueProps, processSteps, savings, etc.
- [ ] `pnpm build` passes (0 errors)
- [ ] **Test EVERY file:** Verify all 4 services render in browser at `/services/[service]`
- [ ] ProblemSection renders with split layout
- [ ] SolutionSection renders with split layout
- [ ] Test viewports: 375px, 768px, 1024px
- [ ] Git commit: `feat: migrate cooling services to new schema (US-002)`
- [ ] Update `prd.json`: `"passes": true` for US-002

---

#### US-003: Migrate IAQ Services (4 files)

**Description:** As a content manager, I need IAQ services to use the new schema so ProblemSection and SolutionSection render correctly.

**Files to Migrate:**
- `src/content/services/humidifiers.md`
- `src/content/services/dehumidifiers.md`
- `src/content/services/air-filtration-air-purifiers.md`
- `src/content/services/hrv-erv-ventilation.md`

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/seo-content` skill for EACH of the 4 services
- [ ] Each service has `problemStatement` field with: headline, description, painPoints (3-5 items)
- [ ] Each service has `solutionApproach` field with: headline, description, differentiators (4-6 items)
- [ ] Legacy fields (`problems`, `approach`) REMOVED from all 4 files
- [ ] All existing fields preserved: valueProps, processSteps, savings, etc.
- [ ] `pnpm build` passes (0 errors)
- [ ] **Test EVERY file:** Verify all 4 services render in browser at `/services/[service]`
- [ ] ProblemSection renders with split layout
- [ ] SolutionSection renders with split layout
- [ ] Test viewports: 375px, 768px, 1024px
- [ ] Git commit: `feat: migrate IAQ services to new schema (US-003)`
- [ ] Update `prd.json`: `"passes": true` for US-003

---

#### US-004: Migrate Water Heating + Commercial + Plans (5 files)

**Description:** As a content manager, I need water heating, commercial, and maintenance plan services to use the new schema.

**Files to Migrate:**
- `src/content/services/tank-water-heaters.md`
- `src/content/services/tankless-water-heaters.md`
- `src/content/services/commercial-hvac.md`
- `src/content/services/rooftop-units.md`
- `src/content/services/maintenance-plans.md`

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/seo-content` skill for EACH of the 5 services
- [ ] Each service has `problemStatement` field with: headline, description, painPoints (3-5 items)
- [ ] Each service has `solutionApproach` field with: headline, description, differentiators (4-6 items)
- [ ] Legacy fields (`problems`, `approach`) REMOVED from all 5 files
- [ ] All existing fields preserved: valueProps, processSteps, savings, etc.
- [ ] `pnpm build` passes (0 errors)
- [ ] **Test EVERY file:** Verify all 5 services render in browser at `/services/[service]`
- [ ] ProblemSection renders with split layout
- [ ] SolutionSection renders with split layout
- [ ] Test viewports: 375px, 768px, 1024px
- [ ] Git commit: `feat: migrate water heating, commercial, plans to new schema (US-004)`
- [ ] Update `prd.json`: `"passes": true` for US-004

---

### Group 2: Missing Content Creation

#### US-005: Create plans.md Category Page

**Description:** As a user, I need a Maintenance Plans category page so I can browse all maintenance-related services.

**Acceptance Criteria:**
- [ ] Create file: `src/content/service-categories/plans.md`
- [ ] Frontmatter includes: title: 'Maintenance Plans', slug: 'plans', order: 6, status: 'live', workflowStatus: 'published'
- [ ] Body content: 500+ words explaining preventive maintenance value
- [ ] Include: Annual plans, priority service, discounted repairs, peace of mind messaging
- [ ] seoTitle: 'HVAC Maintenance Plans | B.A.P Heating & Cooling'
- [ ] seoDescription: 150-160 chars with keyword and CTA
- [ ] `pnpm build` passes (0 errors)
- [ ] Verify page renders at `/services/category/plans`
- [ ] Shows correct heading, description, and links to maintenance-plans service
- [ ] Git commit: `feat: create plans category page (US-005)`
- [ ] Update `prd.json`: `"passes": true` for US-005

---

#### US-006: Create indoor-air-quality.md Service Page

**Description:** As a user searching "indoor air quality solutions", I need a comprehensive IAQ pillar page to learn about whole-home air quality services.

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/seo-content` skill to generate complete service page
- [ ] Create file: `src/content/services/indoor-air-quality.md`
- [ ] Frontmatter: category: 'iaq', status: 'live', priority: true, order: 1, serviceType: 'service'
- [ ] **NEW SCHEMA:** problemStatement with headline, description, painPoints (5+ items about allergies, dust, mold, stale air)
- [ ] **NEW SCHEMA:** solutionApproach with headline, description, differentiators (testing, custom design, certified installation, monitoring)
- [ ] valueProps: 4-6 benefits of whole-home IAQ solutions
- [ ] processSteps: 4-5 steps from assessment to installation to monitoring
- [ ] savings: Energy savings, health benefits, rebates available
- [ ] seoTitle: 'Indoor Air Quality Solutions | IAQ Testing & Installation | B.A.P'
- [ ] seoDescription: Target keyword "indoor air quality solutions" with CTA
- [ ] Body content: 1000+ words
- [ ] `pnpm build` passes (0 errors)
- [ ] Verify page renders at `/services/indoor-air-quality`
- [ ] ProblemSection and SolutionSection both render correctly
- [ ] Test viewports: 375px, 768px, 1024px
- [ ] Git commit: `feat: create indoor air quality pillar page (US-006)`
- [ ] Update `prd.json`: `"passes": true` for US-006

---

### Group 3: Navigation Fixes

#### US-007: Add Maintenance Plans to Header Navigation

**Description:** As a user, I need to see Maintenance Plans in the header dropdown so I can easily navigate to that category.

**Acceptance Criteria:**
- [ ] Read file: `src/components/Header.astro`
- [ ] Update `serviceCategories` array (currently lines 15-21)
- [ ] Add 6th entry: `{ name: 'Maintenance Plans', href: '/services/category/plans' }`
- [ ] Verify array now has 6 items (was 5)
- [ ] `pnpm build` passes (0 errors)
- [ ] Verify in browser: Header "Services" dropdown shows 6 categories including "Maintenance Plans"
- [ ] Click "Maintenance Plans" link → navigates to `/services/category/plans`
- [ ] Test on mobile: Hamburger menu shows all 6 categories
- [ ] Git commit: `feat: add Maintenance Plans to header navigation (US-007)`
- [ ] Update `prd.json`: `"passes": true` for US-007

---

#### US-008: Update Homepage Grid to Show 6 Categories

**Description:** As a user on the homepage, I need to see all 6 service categories so I can discover Maintenance Plans.

**Acceptance Criteria:**
- [ ] Read file: `src/components/sections/ServiceCategoriesGrid.astro`
- [ ] Update line 8: Change `.slice(0, 5)` to `.slice(0, 6)`
- [ ] `pnpm build` passes (0 errors)
- [ ] Verify in browser: Homepage service grid shows 6 category cards
- [ ] 6th card is "Maintenance Plans" with correct icon, title, description
- [ ] Click 6th card → navigates to `/services/category/plans`
- [ ] Test responsive: 3 cols desktop, 2 cols tablet, 1 col mobile
- [ ] Git commit: `feat: show 6 categories on homepage grid (US-008)`
- [ ] Update `prd.json`: `"passes": true` for US-008

---

#### US-009: Add indoor-air-quality to profile.yaml

**Description:** As a developer, I need indoor-air-quality in the business profile services list so it appears in navigation and related services.

**Acceptance Criteria:**
- [ ] Read file: `src/content/business/profile.yaml`
- [ ] Locate `services.list.iaq` section
- [ ] Add entry at top of iaq array: `- title: 'Indoor Air Quality Solutions'` and `slug: 'indoor-air-quality'`
- [ ] Verify iaq array now has 5 items (was 4)
- [ ] `pnpm build` passes (0 errors)
- [ ] Verify indoor-air-quality appears in IAQ category page service list
- [ ] Git commit: `feat: add indoor air quality to profile services (US-009)`
- [ ] Update `prd.json`: `"passes": true` for US-009

---

### Group 4: Component Verification & Rebuild

#### US-010: Verify SolutionSection Component

**Description:** As a developer, I need to ensure SolutionSection matches Phase 6B architecture specs with split layout and differentiators badges.

**Acceptance Criteria:**
- [ ] Read file: `src/components/sections/SolutionSection.astro`
- [ ] Verify component structure:
  - [ ] Split layout: `grid md:grid-cols-2 gap-8 md:gap-12 items-center`
  - [ ] Image placeholder LEFT, text content RIGHT (reversed from ProblemSection)
  - [ ] `reversed` prop available to flip sides
  - [ ] Differentiators rendered as shadcn Badge components (not bullets)
  - [ ] Background: `bg-background` (white, alternating from ProblemSection)
  - [ ] Image placeholder: `bg-muted aspect-video rounded-xl`
- [ ] If ANY spec mismatches, document in `docs/project/ralph/progress.txt`
- [ ] `pnpm build` passes (0 errors)
- [ ] Test in browser at any service page: SolutionSection renders with image on left, text on right
- [ ] Differentiators show as badge pills (e.g., "TSSA Certified", "10-Year Warranty")
- [ ] Test viewports: 375px (stack), 768px (split starts), 1024px (full split)
- [ ] Git commit: `docs: verify SolutionSection matches architecture (US-010)`
- [ ] Update `prd.json`: `"passes": true` for US-010

---

#### US-011: Rebuild ServiceBenefitsSection Component

**Description:** As a developer, I need ServiceBenefitsSection to use split layout (not 4-column grid) per Phase 6B architecture.

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/frontend-design` skill with specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 476-525
- [ ] Search shadcn: `mcp__shadcn__search_items_in_registries` for "check" icon (Lucide)
- [ ] Read current: `src/components/sections/ServiceBenefitsSection.astro`
- [ ] **FULL REBUILD:** Replace 4-column grid with split layout
  - [ ] Layout: TEXT-LEFT / IMAGE-RIGHT (alternating pattern position 3)
  - [ ] Benefits list on LEFT with checkmark bullets (Lucide Check icon)
  - [ ] Image placeholder on RIGHT: `bg-muted aspect-video rounded-xl`
  - [ ] Background: `bg-background` (white)
  - [ ] Headline: "Why Choose B.A.P" (or pass via prop)
  - [ ] Benefits: Title + description with check icon prefix
- [ ] Keep same Props interface: `benefits: Benefit[]`, `headline?: string`
- [ ] `pnpm build` passes (0 errors)
- [ ] **MANDATORY:** Use `/agent-browser` skill to test at 375px, 768px, 1024px
- [ ] **MANDATORY:** Use `/web-design-guidelines` skill for accessibility review (fix Critical/High)
- [ ] Test in browser: Split layout renders, checkmarks visible, mobile stacks vertically
- [ ] Git commit: `feat: rebuild ServiceBenefitsSection with split layout (US-011)`
- [ ] Update `prd.json`: `"passes": true` for US-011

---

#### US-012: Rebuild ServiceSavingsSection Component

**Description:** As a developer, I need ServiceSavingsSection to use split layout (not centered stack) per Phase 6B architecture.

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/frontend-design` skill with specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 527-571
- [ ] Read current: `src/components/sections/ServiceSavingsSection.astro`
- [ ] **FULL REBUILD:** Replace centered stack with split layout
  - [ ] Layout: IMAGE-LEFT / TEXT-RIGHT (alternating pattern position 4)
  - [ ] Image placeholder on LEFT: `bg-muted aspect-video rounded-xl`
  - [ ] Savings content on RIGHT: headline, description, bullets with checkmarks, rebate Card
  - [ ] Background: `bg-primary/5` (light blue tint)
  - [ ] Bullets rendered with Lucide Check icon
  - [ ] rebateInfo rendered as shadcn Card highlight
- [ ] Keep same Props interface, add `imageAlt?: string`
- [ ] `pnpm build` passes (0 errors)
- [ ] **MANDATORY:** Use `/agent-browser` skill to test at 375px, 768px, 1024px
- [ ] **MANDATORY:** Use `/web-design-guidelines` skill for accessibility review (fix Critical/High)
- [ ] Test in browser: Split layout renders, image on left, savings on right, Card highlights rebate info
- [ ] Git commit: `feat: rebuild ServiceSavingsSection with split layout (US-012)`
- [ ] Update `prd.json`: `"passes": true` for US-012

---

#### US-013: Comprehensive Visual Verification

**Description:** As a QA engineer, I need to verify all new sections render correctly across all viewports and alternating pattern is visually clear.

**Acceptance Criteria:**
- [ ] **MANDATORY:** Use `/agent-browser` skill for ALL testing
- [ ] Test service page: `/services/furnace-installation` (representative of all services)
- [ ] **Section Rendering:**
  - [ ] ServiceHeroSection renders (existing, should work)
  - [ ] ProblemSection renders with TEXT-LEFT / IMAGE-RIGHT
  - [ ] SolutionSection renders with IMAGE-LEFT / TEXT-RIGHT (alternates)
  - [ ] ServiceBenefitsSection renders with TEXT-LEFT / IMAGE-RIGHT (alternates)
  - [ ] ServiceProcessSection renders (horizontal timeline, existing)
  - [ ] ServiceSavingsSection renders with IMAGE-LEFT / TEXT-RIGHT (alternates)
  - [ ] ServiceFAQSection renders (accordion, existing)
  - [ ] TestimonialsCarousel renders (existing)
  - [ ] RelatedServicesSection renders (grid, existing)
  - [ ] FinalCTASection renders (existing)
- [ ] **Viewport Testing (EVERY section):**
  - [ ] 375px (mobile): All sections stack vertically, single column
  - [ ] 768px (tablet): Split layouts start, 2-column grid for grids
  - [ ] 1024px (desktop): Full split layouts, 3-column grid for grids
- [ ] **Alternating Pattern:** Visually verify background colors alternate (white → muted/30 → white → primary/5)
- [ ] **Placeholder Images:** All show aspect-video ratio, rounded corners, centered text labels
- [ ] **Touch Targets:** All CTAs and links ≥ 44px tap target (mobile)
- [ ] **MANDATORY:** Use `/web-design-guidelines` skill for final accessibility audit across all sections
- [ ] Fix all remaining Critical/High accessibility issues
- [ ] `pnpm build` passes (0 errors)
- [ ] Git commit: `test: comprehensive visual verification all sections (US-013)`
- [ ] Update `prd.json`: `"passes": true` for US-013

---

### Group 5: Cleanup

#### US-014: Remove Legacy Schema from config.ts

**Description:** As a developer, I need to remove legacy schema fields after migration to prevent confusion and ensure only new schema is used going forward.

**Acceptance Criteria:**
- [ ] **BEFORE REMOVAL:** Verify NO services use legacy schema:
  - [ ] Run: `grep -l "^problems:" src/content/services/*.md` → Should return NOTHING
  - [ ] Run: `grep -l "^approach:" src/content/services/*.md` → Should return NOTHING
  - [ ] If ANY files found, STOP and fix those files first
- [ ] Read file: `src/content/config.ts`
- [ ] Remove lines 256-264: `problems: z.array(...).optional()`
- [ ] Remove lines 266-273: `approach: z.object(...).optional()`
- [ ] Leave comment: `// Legacy schema removed 2026-01-22 after Phase 6C migration`
- [ ] `pnpm build` passes (0 errors) - confirms no services reference legacy fields
- [ ] Git commit: `refactor: remove legacy schema after migration complete (US-014)`
- [ ] Update `prd.json`: `"passes": true` for US-014

---

#### US-015: Final Build Verification & Documentation Update

**Description:** As a project manager, I need to verify the complete migration is successful and update audit findings document.

**Acceptance Criteria:**
- [ ] Run `pnpm build` and verify:
  - [ ] Build completes with 0 errors
  - [ ] 637+ pages generated (including new plans category and indoor-air-quality service)
  - [ ] No warnings about missing schema fields
- [ ] **Service Count Verification:**
  - [ ] Run: `ls src/content/services/*.md | wc -l` → Should be 23 (was 22, added indoor-air-quality)
  - [ ] Run: `grep -l "problemStatement:" src/content/services/*.md | wc -l` → Should be 23
  - [ ] Run: `grep -l "solutionApproach:" src/content/services/*.md | wc -l` → Should be 23
- [ ] **Navigation Verification:**
  - [ ] Header dropdown shows 6 categories (including Maintenance Plans)
  - [ ] Homepage grid shows 6 category cards
  - [ ] All 23 services reachable via navigation (no orphans)
- [ ] **Update PHASE-6C-AUDIT-FINDINGS.md:**
  - [ ] Change status: "COMPLETE ✅"
  - [ ] Check all verification boxes
  - [ ] Add completion note with date
  - [ ] Document any deviations or notes for future phases
- [ ] Git commit: `docs: update audit findings - Phase 6C complete (US-015)`
- [ ] Update `prd.json`: `"passes": true` for US-015

---

## Functional Requirements

### Content Migration (FR-1 to FR-5)

- **FR-1:** All 22 existing services must be migrated from legacy schema (`problems`, `approach`) to new schema (`problemStatement`, `solutionApproach`)
- **FR-2:** New content must be generated using `/seo-content` skill for consistency and SEO optimization
- **FR-3:** Each service must have `problemStatement` with headline, description, and 3-5 painPoints
- **FR-4:** Each service must have `solutionApproach` with headline, description, and 4-6 differentiators
- **FR-5:** All existing fields (valueProps, processSteps, savings, etc.) must be preserved during migration

### Missing Content (FR-6 to FR-8)

- **FR-6:** `plans.md` category page must be created with 500+ words explaining maintenance plan value
- **FR-7:** `indoor-air-quality.md` service page must be created with full new schema and 1000+ words
- **FR-8:** Both new pages must use `/seo-content` skill for generation

### Navigation (FR-9 to FR-11)

- **FR-9:** Header navigation must display 6 categories including "Maintenance Plans" linking to `/services/category/plans`
- **FR-10:** Homepage ServiceCategoriesGrid must display 6 category cards (not 5)
- **FR-11:** `profile.yaml` services.list.iaq must include `indoor-air-quality` entry

### Component Architecture (FR-12 to FR-14)

- **FR-12:** ServiceBenefitsSection must use split layout (TEXT-LEFT / IMAGE-RIGHT) with Lucide Check icons, not 4-column grid
- **FR-13:** ServiceSavingsSection must use split layout (IMAGE-LEFT / TEXT-RIGHT) with Card highlight, not centered stack
- **FR-14:** All sections must follow alternating background pattern: `bg-background` → `bg-muted/30` → `bg-background` → `bg-primary/5`

### Testing & Validation (FR-15 to FR-18)

- **FR-15:** Every migrated service file must be visually tested in browser to verify sections render
- **FR-16:** All components must be tested at 375px, 768px, and 1024px viewports
- **FR-17:** `/agent-browser` skill must be used for all visual testing
- **FR-18:** `/web-design-guidelines` skill must be used for accessibility review with Critical/High issues fixed

### Schema Cleanup (FR-19 to FR-20)

- **FR-19:** Legacy schema fields (`problems`, `approach`) must be removed from `config.ts` only after all services migrated
- **FR-20:** Verification script must confirm zero services use legacy schema before removal

## Non-Goals (Out of Scope)

- ❌ Service-city page migration (550 files) - Deferred to Phase 6D
- ❌ LocalTrustOpener, LocalProblemSection, LocalSolutionSection components - Phase 6D
- ❌ LocalGallerySection, LocationServicesGrid components - Phase 6D
- ❌ Location page content expansion (25 files) - Phase 6E
- ❌ Blog content creation - Phase 6E
- ❌ Schema markup (Service, Article, BreadcrumbList) - Phase 6E
- ❌ Meta description audit - Phase 6E
- ❌ Real photography - Client provides after UI approval
- ❌ Content uniqueness audit for service-city pages - Phase 6D

## Design Considerations

### Alternating Layout Pattern

Per PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md, service pages follow strict alternating pattern:

```
Hero (full-width, centered)
ProblemSection (TEXT-LEFT / IMAGE-RIGHT, bg-muted/30)
SolutionSection (IMAGE-LEFT / TEXT-RIGHT, bg-background)
ServiceBenefitsSection (TEXT-LEFT / IMAGE-RIGHT, bg-background)
ServiceProcessSection (horizontal timeline, existing)
ServiceSavingsSection (IMAGE-LEFT / TEXT-RIGHT, bg-primary/5)
FAQs, Testimonials, Related, Final CTA (existing)
```

Key principles:
- Text/image sides flip each section
- Backgrounds alternate for visual rhythm
- Mobile: Stack vertically, all single column
- Desktop: Full split layouts, generous gaps (gap-12)

### Placeholder Images

All image areas use placeholder divs during development:

```astro
<div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground text-sm">
  Furnace Problem Image — 800×600
</div>
```

Client replaces with real photos post-approval.

### /seo-content Skill Usage

For ALL content generation (US-001 through US-006):
- Input: Service name, category, keywords from Phase 6A, brand voice
- Output: Complete service content with new schema fields
- Ensures consistent tone, SEO optimization, and brand voice adherence

### Component Rebuild with /frontend-design

For ServiceBenefitsSection and ServiceSavingsSection (US-011, US-012):
- Use `/frontend-design` skill with architecture specs
- Search shadcn components first (Check icon, Card, Badge)
- Implement from scratch following specs exactly
- Test with `/agent-browser` at all breakpoints
- Review with `/web-design-guidelines` for accessibility

## Technical Considerations

### Build Validation

Every story must pass `pnpm build` before marking complete. Build failure indicates:
- Schema validation errors (missing required fields)
- Type errors (incorrect field types)
- Broken imports or component references

### Testing Strategy (Choice 3A: Test Every File)

Unlike sample-based testing, we verify EVERY service file renders:
- US-001: Test all 9 heating services
- US-002: Test all 4 cooling services
- US-003: Test all 4 IAQ services
- US-004: Test all 5 water/commercial/plans services

This is thorough but slower—chosen for confidence given schema change criticality.

### Git Commit Strategy (Choice 5A: Per-Story)

Each user story gets its own commit:
- Enables granular rollback if issues found
- Clear commit history for review
- Easy to track progress via git log
- Total: 15 commits by completion

### Legacy Schema Coexistence

DO NOT remove legacy schema until US-014. Both schemas will coexist in `config.ts` during US-001 through US-004 to avoid breaking services during migration.

### Dependencies

- **US-001 through US-004 must complete** before US-014 (legacy schema removal)
- **US-005, US-006** can run parallel to migration stories
- **US-007, US-008, US-009** can run parallel to each other
- **US-010** must complete before US-011, US-012 (verify before rebuild)
- **US-013** must run after US-011, US-012 complete (visual verification needs all components ready)
- **US-014** must run after US-001 through US-004 complete (all services migrated)
- **US-015** must be last (final verification)

## Success Metrics

### Content Completeness
- 22/22 services migrated to new schema
- 23 total service pages (added indoor-air-quality)
- 6 service category pages (added plans.md)
- 0 services using legacy schema fields

### Navigation Discoverability
- 6/6 categories in Header dropdown
- 6/6 categories on Homepage grid
- 0 orphan pages (all reachable via navigation)

### Component Architecture Compliance
- ProblemSection: Split layout ✅
- SolutionSection: Split layout ✅
- ServiceBenefitsSection: Split layout (rebuilt)
- ServiceSavingsSection: Split layout (rebuilt)
- Alternating backgrounds: Visual rhythm clear

### Build & Performance
- `pnpm build` passes: 0 errors
- Pages generated: 637+ (was 622, added 15+ from new content)
- Build time: No significant regression

### Accessibility
- WCAG AA compliance: Critical/High issues fixed
- Touch targets: ≥ 44px on mobile
- Keyboard navigation: All interactive elements accessible
- Color contrast: Passes AA standards

## Open Questions

- **Q1:** Should we add visual regression testing screenshots for future comparison? (Optional enhancement)
- **Q2:** Should `indoor-air-quality.md` also link to individual IAQ services (humidifiers, dehumidifiers, etc.) in its body content? (Recommended)
- **Q3:** Should we create a migration verification script to automate schema checking? (Could be useful for Phase 6D service-city migration)
- **Q4:** Should we document the /seo-content skill inputs/outputs for future content generation consistency? (Recommended)

---

## Appendix: Schema Comparison Reference

### Legacy Schema (Old)
```yaml
problems:
  - title: 'Skyrocketing Energy Bills'
    description: 'Old furnaces operate at 60-80% efficiency...'
    icon: 'cost'
  - title: 'Breakdown Risk in Mid-Winter'
    description: 'Furnaces over 15 years old...'
    icon: 'warning'

approach:
  headline: 'Right-Sized Equipment, Installed Right'
  description: 'We start with a proper heat loss calculation...'
  quote: 'A properly sized furnace runs longer cycles...'
  quotePerson: 'Paul Palmer, Owner'
```

### New Schema (Current)
```yaml
problemStatement:
  headline: 'Is Your Furnace Struggling to Keep Up?'
  description: 'Rising energy bills, uneven heating, and strange noises are signs your furnace may be nearing the end of its life.'
  painPoints:
    - 'Energy bills increasing every winter'
    - 'Some rooms too cold, others too hot'
    - 'Strange noises or odors from furnace'
    - 'Furnace is 15+ years old'

solutionApproach:
  headline: 'The B.A.P Approach to Furnace Installation'
  description: 'We don't just replace equipment—we design heating solutions that match your home's specific needs.'
  differentiators:
    - 'TSSA Certified Technicians'
    - '10-Year Warranty'
    - 'Free Load Calculation'
    - 'Rebate Assistance'
```

---

**PRD Status:** Ready for Ralph Execution
**Branch:** `feature/phase-6c-migration`
**Estimated Stories:** 15
**Next Step:** Convert to `prd.json` using `/ralph` skill
