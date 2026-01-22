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

## Current Phase: 7A Infrastructure

**Branch:** feature/phase-7a-infrastructure
**Goal:** Consolidate typography, schema, components, and layouts

**Completed:**
- US-001 through US-015: Typography consolidation, schema updates, backup

**In Progress:**
- US-016+: Content migration, component consolidation, layout creation

**Key Files:**
- `prd.json` - Story tracking
- `docs/project/ralph/progress.txt` - Implementation notes
- `scripts/migrate-content-schema.ts` - Content migration tool
