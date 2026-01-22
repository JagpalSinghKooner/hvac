# PRD: Phase 7A Infrastructure — Design System Consolidation

## Introduction

Consolidate the B.A.P HVAC website's design system by unifying typography, schema, components, and layouts between service pages (23) and service-city pages (550). This eliminates duplicate code, reduces font requests from 9 to 1, and creates a single shared layout for both page types.

**Reference:** [PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md](../PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md) for full technical spec.

## Goals

- Reduce Google Font network requests from 9 to 1 (90% reduction)
- Unify schema fields between `services` and `service-city` collections
- Migrate 573 content files to use new unified field names
- Consolidate 10 components (rename 4, delete 2, merge 1, modify 3)
- Create single `ServicePageLayout.astro` for both page types
- Implement section background variant system
- Maintain zero visual regressions
- Build passes for all 573 pages

---

## User Stories

### US-001: Create Global Typography System
**Description:** As a developer, I want a single source of truth for fonts so that we eliminate duplicate font imports and improve page load performance.

**Acceptance Criteria:**
- [ ] Create `/src/styles/typography.css` with Playfair Display + Inter imports
- [ ] Add heading styles (h1-h6) using Playfair Display font-family
- [ ] Add body styles using Inter font-family
- [ ] Add utility classes `.font-heading` and `.font-body`
- [ ] `pnpm build` passes

**Required Skills:** None (CSS file creation)

---

### US-002: Import Typography in Globals
**Description:** As a developer, I want globals.css to import the typography system so that fonts are available globally.

**Acceptance Criteria:**
- [ ] Add `@import './typography.css';` at top of `/src/styles/globals.css` (before @tailwind)
- [ ] Remove any existing body font-family declarations in globals.css
- [ ] Remove any existing h1-h6 font styles in globals.css
- [ ] `pnpm build` passes

**Required Skills:** None (CSS modification)

---

### US-003: Remove Font Import from ProblemSection
**Description:** As a developer, I want to remove duplicate font imports from ProblemSection so that we use the global typography system.

**Acceptance Criteria:**
- [ ] Remove `@import url('https://fonts.googleapis.com/...')` from ProblemSection.astro style block
- [ ] Remove any `font-family: 'Playfair Display'` declarations
- [ ] Keep only component-specific animations/transitions in style block
- [ ] `pnpm build` passes
- [ ] Verify headings still render with Playfair Display font

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-004: Remove Font Import from SolutionSection
**Description:** As a developer, I want to remove duplicate font imports from SolutionSection.

**Acceptance Criteria:**
- [ ] Remove `@import url('https://fonts.googleapis.com/...')` from SolutionSection.astro style block
- [ ] Remove any `font-family` declarations for Playfair Display
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-005: Remove Font Import from LocalTrustOpener
**Description:** As a developer, I want to remove duplicate font imports from LocalTrustOpener.

**Acceptance Criteria:**
- [ ] Remove `@import` and font-family declarations from LocalTrustOpener.astro
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-006: Remove Font Import from LocalGallerySection
**Description:** As a developer, I want to remove duplicate font imports from LocalGallerySection.

**Acceptance Criteria:**
- [ ] Remove `@import` and `.font-serif` styles from LocalGallerySection.astro
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-007: Remove Font Import from ServiceBenefitsSection
**Description:** As a developer, I want to remove duplicate font imports from ServiceBenefitsSection.

**Acceptance Criteria:**
- [ ] Remove `@import` from ServiceBenefitsSection.astro
- [ ] Remove any inline `style="font-family:..."` attributes
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-008: Remove Font Import from ServiceSavingsSection
**Description:** As a developer, I want to remove duplicate font imports from ServiceSavingsSection.

**Acceptance Criteria:**
- [ ] Remove `<link>` tags for Google Fonts from ServiceSavingsSection.astro
- [ ] Remove any `@import` statements
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-009: Remove Font Import from LocationServicesGrid
**Description:** As a developer, I want to remove duplicate font imports from LocationServicesGrid.

**Acceptance Criteria:**
- [ ] Remove `@import` and `.font-serif` styles from LocationServicesGrid.astro
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-010: Remove Font Styles from Header
**Description:** As a developer, I want to remove inline font-family from Header so it uses global typography.

**Acceptance Criteria:**
- [ ] Remove `font-family: -apple-system, BlinkMacSystemFont...` from Header.astro style block
- [ ] Header should inherit from global body font (Inter)
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-011: Verify Typography Consolidation
**Description:** As a developer, I want to verify all font imports are removed and only 1 font request is made.

**Acceptance Criteria:**
- [ ] Run `grep -r "@import.*Playfair" src/components/` returns no results
- [ ] Run `grep -r "font-family.*Playfair" src/components/` returns no results
- [ ] Run `grep -r "<link.*fonts.googleapis" src/components/` returns no results
- [ ] `pnpm build` passes
- [ ] Verify in browser: Network tab shows only 1 Google Fonts request

**Required Skills:** `/agent-browser` (verify font requests in browser DevTools)

---

### US-012: Update Services Schema
**Description:** As a developer, I want to update the services schema to use unified field names.

**Acceptance Criteria:**
- [ ] In `/src/content/config.ts`, rename `problemStatement` → `problem`
- [ ] Rename nested `painPoints` → `issues` within problem object
- [ ] Rename `solutionApproach` → `solution`
- [ ] Rename `valueProps` → `benefits`
- [ ] Rename `images` → `galleryImages`
- [ ] Add optional `trustOpener`, `proof`, `context` fields
- [ ] `pnpm build` passes (will fail until content migrated)

**Required Skills:** None (TypeScript schema modification)

---

### US-013: Update Service-City Schema
**Description:** As a developer, I want to update the service-city schema to use unified field names.

**Acceptance Criteria:**
- [ ] In `/src/content/config.ts`, rename `localContext` → `context`
- [ ] Rename `localProof` → `proof`
- [ ] Rename `localTrustOpener` → `trustOpener`
- [ ] Rename `localProblem` → `problem` (with nested `citySpecificIssues` → `issues`)
- [ ] Rename `localSolution` → `solution`
- [ ] Rename `localBenefits` → `benefits`
- [ ] Rename `localSavings` → `savings` (with nested `localRebates` → `rebateInfo`)
- [ ] Rename `localGalleryImages` → `galleryImages`
- [ ] Add `processSteps` field (to match services)
- [ ] `pnpm build` passes (will fail until content migrated)

**Required Skills:** None (TypeScript schema modification)

---

### US-014: Create Content Migration Script
**Description:** As a developer, I want a migration script to rename fields in all 573 content files.

**Acceptance Criteria:**
- [ ] Create `/scripts/migrate-content-schema.ts`
- [ ] Script handles top-level field renames (e.g., `localContext` → `context`)
- [ ] Script handles nested property renames (e.g., `painPoints` → `issues`)
- [ ] Script supports `--dry-run` flag to preview changes
- [ ] Script supports `--execute` flag to apply changes
- [ ] Script supports `--collection=services` or `--collection=service-city` flag
- [ ] Script outputs count of files modified
- [ ] `pnpm build` passes

**Required Skills:** None (TypeScript script creation)

---

### US-015: Backup Content Before Migration
**Description:** As a developer, I want to backup content before running migration to prevent data loss.

**Acceptance Criteria:**
- [ ] Create `/backups/content-migration-2026-01-22/` directory
- [ ] Copy `src/content/services/` to backup directory
- [ ] Copy `src/content/service-city/` to backup directory
- [ ] Verify backup contains 573 files (23 services + 550 service-city)

**Required Skills:** None (file operations)

---

### US-016: Run Content Migration
**Description:** As a developer, I want to migrate all 573 content files to use unified field names.

**Acceptance Criteria:**
- [ ] Run migration script with `--dry-run` first to review changes
- [ ] Run migration script with `--execute` to apply changes
- [ ] Services (23 files): `problemStatement`→`problem`, `solutionApproach`→`solution`, `valueProps`→`benefits`, `images`→`galleryImages`
- [ ] Service-city (550 files): `localContext`→`context`, `localProof`→`proof`
- [ ] `pnpm build` passes with all 573 pages
- [ ] Commit: "chore: migrate content schema to unified fields"

**Required Skills:** None (script execution)

---

### US-017: Delete LocalProblemSection
**Description:** As a developer, I want to delete LocalProblemSection because it's 99% identical to ProblemSection.

**Acceptance Criteria:**
- [ ] Delete `/src/components/sections/LocalProblemSection.astro`
- [ ] Remove any imports of LocalProblemSection in templates
- [ ] `pnpm build` passes

**Required Skills:** None (file deletion)

---

### US-018: Update ProblemSection Props
**Description:** As a developer, I want ProblemSection to use unified prop names and support variants.

**Acceptance Criteria:**
- [ ] Rename prop `painPoints` → `issues` in ProblemSection.astro
- [ ] Add `variant?: 'default' | 'muted' | 'primary'` prop
- [ ] Implement `variantClasses` object for background colors
- [ ] Update section class to use `${variantClasses[variant]}`
- [ ] Default variant to `'muted'`
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component)

---

### US-019: Delete LocalSolutionSection
**Description:** As a developer, I want to delete LocalSolutionSection and merge its features into SolutionSection.

**Acceptance Criteria:**
- [ ] Delete `/src/components/sections/LocalSolutionSection.astro`
- [ ] Remove any imports of LocalSolutionSection in templates
- [ ] `pnpm build` passes

**Required Skills:** None (file deletion)

---

### US-020: Update SolutionSection with City Support
**Description:** As a developer, I want SolutionSection to support city badge and trust indicator (features from LocalSolutionSection).

**Acceptance Criteria:**
- [ ] Add `cityName?: string` prop to SolutionSection.astro
- [ ] Add `showTrustIndicator?: boolean` prop
- [ ] When `cityName` provided, show city badge: "Solution in {cityName}"
- [ ] When `showTrustIndicator && cityName`, show: "Serving {cityName} Since 1994"
- [ ] Add `variant?: 'default' | 'muted' | 'primary'` prop
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro component), `/frontend-design` (UI enhancement)

---

### US-021: Rename LocalTrustOpener to TrustOpenerSection (Atomic)
**Description:** As a developer, I want to rename LocalTrustOpener to TrustOpenerSection with imports updated atomically.

**Acceptance Criteria:**
- [ ] Run `git mv src/components/sections/LocalTrustOpener.astro src/components/sections/TrustOpenerSection.astro`
- [ ] Update import in `[serviceLocation].astro` to use TrustOpenerSection
- [ ] Add `variant` prop to TrustOpenerSection
- [ ] `pnpm build` passes
- [ ] Commit: "refactor: rename LocalTrustOpener to TrustOpenerSection"

**Required Skills:** `/web-design-guidelines` (review renamed .astro component)

---

### US-022: Rename LocalGallerySection to ServiceGallerySection (Atomic)
**Description:** As a developer, I want to rename LocalGallerySection to ServiceGallerySection with imports updated atomically.

**Acceptance Criteria:**
- [ ] Run `git mv src/components/sections/LocalGallerySection.astro src/components/sections/ServiceGallerySection.astro`
- [ ] Update import in `[serviceLocation].astro` to use ServiceGallerySection
- [ ] Add `variant` prop to ServiceGallerySection
- [ ] `pnpm build` passes
- [ ] Commit: "refactor: rename LocalGallerySection to ServiceGallerySection"

**Required Skills:** `/web-design-guidelines` (review renamed .astro component)

---

### US-023: Rename LocalProofSection to ProofSection (Atomic)
**Description:** As a developer, I want to rename LocalProofSection to ProofSection with imports updated atomically.

**Acceptance Criteria:**
- [ ] Run `git mv src/components/sections/LocalProofSection.astro src/components/sections/ProofSection.astro`
- [ ] Update import in `[serviceLocation].astro` to use ProofSection
- [ ] Add `variant` prop to ProofSection
- [ ] `pnpm build` passes
- [ ] Commit: "refactor: rename LocalProofSection to ProofSection"

**Required Skills:** `/web-design-guidelines` (review renamed .astro component)

---

### US-024: Rename LocalContextSection to ContextSection (Atomic)
**Description:** As a developer, I want to rename LocalContextSection to ContextSection with imports updated atomically.

**Acceptance Criteria:**
- [ ] Run `git mv src/components/sections/LocalContextSection.astro src/components/sections/ContextSection.astro`
- [ ] Update import in `[serviceLocation].astro` to use ContextSection
- [ ] Add `variant` prop to ContextSection
- [ ] `pnpm build` passes
- [ ] Commit: "refactor: rename LocalContextSection to ContextSection"

**Required Skills:** `/web-design-guidelines` (review renamed .astro component)

---

### US-025: Add Variant Props to Remaining Sections
**Description:** As a developer, I want all section components to support background variants for visual rhythm.

**Acceptance Criteria:**
- [ ] Add `variant` prop to ServiceBenefitsSection.astro
- [ ] Add `variant` prop to ServiceProcessSection.astro
- [ ] Add `variant` prop to ServiceSavingsSection.astro
- [ ] Add `variant` prop to LocationServicesGrid.astro
- [ ] Each component implements `variantClasses` object
- [ ] `pnpm build` passes

**Required Skills:** `/web-design-guidelines` (review .astro components)

---

### US-026: Create ServicePageLayout
**Description:** As a developer, I want a shared layout component for both service and service-city pages.

**Acceptance Criteria:**
- [ ] Create `/src/layouts/ServicePageLayout.astro`
- [ ] Import all 15 section components (Hero, TrustOpener, Problem, Solution, Gallery, Benefits, Process, Proof, Context, ServicesGrid, Savings, FAQ, Testimonials, Related, CTA)
- [ ] Define Props interface with pageType, SEO fields, identity fields, section data, collections, business data
- [ ] Implement conditional rendering for optional sections (render only if data exists)
- [ ] Assign background variants per section (see Phase 7.6 spec)
- [ ] `pnpm build` passes

**Required Skills:** `/frontend-design` (layout design), `/web-design-guidelines` (review .astro layout)

---

### US-027: Update [service].astro to Use ServicePageLayout
**Description:** As a developer, I want the service page template to use the new shared layout.

**Acceptance Criteria:**
- [ ] Import ServicePageLayout in `/src/pages/services/[service].astro`
- [ ] Remove all inline section imports
- [ ] Pass all props to ServicePageLayout with `pageType="service"`
- [ ] Map data fields: `problem`, `solution`, `benefits`, `galleryImages`, etc.
- [ ] `pnpm build` passes
- [ ] Verify in browser: /services/furnace-installation renders correctly

**Required Skills:** `/web-design-guidelines` (review .astro page), `/agent-browser` (visual verification)

---

### US-028: Update [serviceLocation].astro to Use ServicePageLayout
**Description:** As a developer, I want the service-city page template to use the new shared layout.

**Acceptance Criteria:**
- [ ] Import ServicePageLayout in `/src/pages/services/[serviceLocation].astro`
- [ ] Remove all inline section imports
- [ ] Pass all props to ServicePageLayout with `pageType="service-city"`
- [ ] Implement fallback pattern: `benefits={serviceCity.data.benefits || service.data.benefits}`
- [ ] Pass `cityName` and `locationSlug` props
- [ ] `pnpm build` passes
- [ ] Verify in browser: /services/furnace-installation-guelph-on renders correctly

**Required Skills:** `/web-design-guidelines` (review .astro page), `/agent-browser` (visual verification)

---

### US-029: Visual Testing - Service Page
**Description:** As a developer, I want to verify no visual regressions on service pages.

**Acceptance Criteria:**
- [ ] Start dev server: `pnpm dev`
- [ ] Navigate to /services/furnace-installation
- [ ] Verify all 11 sections render correctly
- [ ] Verify headings use Playfair Display font
- [ ] Verify body text uses Inter font
- [ ] Test at 375px, 768px, 1024px, 1440px viewports
- [ ] Verify in browser using /agent-browser skill

**Required Skills:** `/agent-browser` (comprehensive visual testing)

---

### US-030: Visual Testing - Service-City Page
**Description:** As a developer, I want to verify no visual regressions on service-city pages.

**Acceptance Criteria:**
- [ ] Navigate to /services/furnace-installation-guelph-on
- [ ] Verify all 16 sections render correctly
- [ ] Verify city badge shows on Solution section
- [ ] Verify trust indicator shows "Serving Guelph Since 1994"
- [ ] Verify conditional sections hide when data missing
- [ ] Test at 375px, 768px, 1024px, 1440px viewports
- [ ] Verify in browser using /agent-browser skill

**Required Skills:** `/agent-browser` (comprehensive visual testing)

---

### US-031: Performance Verification
**Description:** As a developer, I want to verify font performance improvements.

**Acceptance Criteria:**
- [ ] Open browser DevTools Network tab
- [ ] Navigate to any service page
- [ ] Verify only 1 Google Fonts request (fonts.googleapis.com)
- [ ] Verify font payload < 150KB
- [ ] `pnpm build` completes successfully for all 573 pages

**Required Skills:** `/agent-browser` (performance verification via DevTools)

---

### US-032: Cleanup - Delete Migration Script
**Description:** As a developer, I want to delete the migration script after successful migration.

**Acceptance Criteria:**
- [ ] Verify all content files are migrated (no old field names)
- [ ] Delete `/scripts/migrate-content-schema.ts`
- [ ] `pnpm build` passes
- [ ] Commit: "chore: remove migration script after successful migration"

**Required Skills:** None (file deletion)

---

### US-033: Cleanup - Remove LocalProblemSection and LocalSolutionSection Font Imports
**Description:** As a developer, I want to ensure deleted components' font imports are gone.

**Acceptance Criteria:**
- [ ] Verify LocalProblemSection.astro is deleted
- [ ] Verify LocalSolutionSection.astro is deleted
- [ ] Run `grep -r "LocalProblemSection" src/` returns no results
- [ ] Run `grep -r "LocalSolutionSection" src/` returns no results
- [ ] `pnpm build` passes

**Required Skills:** None (verification)

---

### US-034: Final Build Verification
**Description:** As a developer, I want to verify the complete build passes with all changes.

**Acceptance Criteria:**
- [ ] Run `pnpm build`
- [ ] Build completes successfully
- [ ] All 573 pages generated (23 services + 550 service-city)
- [ ] No TypeScript errors
- [ ] No Zod validation errors
- [ ] Commit: "feat: complete Phase 7A infrastructure consolidation"

**Required Skills:** `/agent-browser` (final visual spot-check)

---

## Functional Requirements

- **FR-1:** Create `/src/styles/typography.css` with single Google Font import for Playfair Display and Inter
- **FR-2:** Remove all component-level font imports (9 components)
- **FR-3:** Update services schema: `problemStatement`→`problem`, `solutionApproach`→`solution`, `valueProps`→`benefits`, `images`→`galleryImages`
- **FR-4:** Update service-city schema: `localContext`→`context`, `localProof`→`proof`, `localProblem`→`problem`, etc.
- **FR-5:** Create migration script that handles both top-level and nested field renames
- **FR-6:** Migrate 573 content files (23 services + 550 service-city)
- **FR-7:** Delete LocalProblemSection.astro (duplicate of ProblemSection)
- **FR-8:** Delete LocalSolutionSection.astro (merge into SolutionSection)
- **FR-9:** Rename 4 components: LocalTrustOpener→TrustOpenerSection, LocalGallerySection→ServiceGallerySection, LocalProofSection→ProofSection, LocalContextSection→ContextSection
- **FR-10:** Create ServicePageLayout.astro with 16 sections and conditional rendering
- **FR-11:** Update [service].astro to use ServicePageLayout
- **FR-12:** Update [serviceLocation].astro to use ServicePageLayout with fallback pattern
- **FR-13:** Implement variant prop on all section components (default/muted/primary)

---

## Non-Goals (Out of Scope)

- Content generation for empty fields (Phase 7B)
- SEO content writing (Phase 7B)
- New component creation beyond ServicePageLayout
- Homepage or blog page changes
- Location page template changes
- Adding new section types
- Changing visual design or branding
- Mobile app or PWA features

---

## Technical Considerations

- **Atomic Commits:** Each component rename must be committed with its import updates to avoid build breaks
- **Migration Order:** Schema update → Content migration → Component changes → Layout creation
- **Backup Required:** Content files must be backed up before migration
- **Zod Validation:** Schema changes will cause build failures until content is migrated
- **TypeScript:** All components must pass `pnpm build` after changes

---

## Success Metrics

| Metric | Before | After | Target |
|--------|--------|-------|--------|
| Font requests | 9 | 1 | 1 |
| Font payload | ~350KB | ~140KB | <150KB |
| Duplicate components | 2 | 0 | 0 |
| Schema field mismatches | 12 | 0 | 0 |
| Build pages | 573 | 573 | 573 |
| Visual regressions | N/A | 0 | 0 |

---

## Open Questions

- None. All decisions made per user input:
  - Execution order: 7.1→7.7 as documented
  - Migration: Single script run with error check after
  - Renames: One atomic commit per rename
  - Verification: Each user story verified before next
  - Cleanup: Included as final stories

---

**PRD Created:** January 22, 2026
**Stories:** 34
**Reference:** [PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md](../PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md)
