# PRD: Phase 6B - Lead Conversion Page Architecture

## Introduction

Phase 6B redesigns service and service-city pages with a proper lead conversion flow. This phase implements the technical architecture (schemas, components, templates) that will later be filled with content in subsequent phases.

**Current Problem:** Service and service-city pages have content in boxes but lack a defined lead conversion flow. Users see information but don't experience a story that builds trust and drives phone calls.

**Solution:** Create alternating split layouts (TEXT-LEFT/IMAGE-RIGHT → IMAGE-LEFT/TEXT-RIGHT) that tell a story as users scroll, replacing grid-based "boxes" with a flowing narrative structure.

**Reference:** Full architectural specifications in [PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md](../../../PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md)

---

## Goals

- **Visual Structure:** Implement alternating split layouts for lead conversion storytelling
- **Schema Foundation:** Add structured content fields to support new page sections
- **Component Library:** Create 7 new components + redesign 2 existing components
- **Template Integration:** Update service and service-city page templates with new flow
- **Quality Gates:** All components pass build + 3 skills + accessibility audit
- **No Manual Work:** Every story enforces mandatory skills workflow

---

## User Stories

### US-001: Update Service Schema

**Description:** As a developer, I need to add problemStatement and solutionApproach fields to the services collection so service pages can display problem → solution narrative flow.

**Acceptance Criteria:**
- [ ] Open `src/content/config.ts`
- [ ] Locate `services` collection schema (search for `const services = defineCollection`)
- [ ] Add `problemStatement` field as optional Zod object with: `headline` (string), `description` (string), `painPoints` (optional array of strings)
- [ ] Add `solutionApproach` field as optional Zod object with: `headline` (string), `description` (string), `differentiators` (optional array of strings)
- [ ] Schema structure:
  ```typescript
  problemStatement: z.object({
    headline: z.string(),
    description: z.string(),
    painPoints: z.array(z.string()).optional(),
  }).optional(),

  solutionApproach: z.object({
    headline: z.string(),
    description: z.string(),
    differentiators: z.array(z.string()).optional(),
  }).optional(),
  ```
- [ ] Run `pnpm build` - must pass with zero errors (validates schema)
- [ ] Verify build output shows 628+ pages generated successfully

**Technical Notes:**
- No skills required for schema-only changes
- All fields are optional to avoid breaking existing 22 service pages
- Content will be added in Phase 6C

---

### US-002: Update Service-City Schema

**Description:** As a developer, I need to add local-context fields to service-city collection so city-specific pages can display local trust, problems, solutions, galleries, and savings information.

**Acceptance Criteria:**
- [ ] Open `src/content/config.ts`
- [ ] Locate `serviceCity` collection schema (search for `const serviceCity = defineCollection`)
- [ ] Add `localTrustOpener` field as optional string (100-150 words about why city trusts B.A.P)
- [ ] Add `localProblem` field as optional Zod object with: `headline` (string), `description` (string), `citySpecificIssues` (optional array of strings)
- [ ] Add `localSolution` field as optional Zod object with: `headline` (string), `description` (string)
- [ ] Add `localBenefits` field as optional array of objects with: `title` (string), `description` (string), `icon` (string) - allows city-specific benefit overrides
- [ ] Add `localSavings` field as optional Zod object with: `headline` (string), `description` (string), `localRebates` (optional string)
- [ ] Add `localGalleryImages` field as optional array of objects with: `src` (string - image path), `alt` (string - accessibility), `caption` (optional string)
- [ ] Full schema additions:
  ```typescript
  localTrustOpener: z.string().optional(),

  localProblem: z.object({
    headline: z.string(),
    description: z.string(),
    citySpecificIssues: z.array(z.string()).optional(),
  }).optional(),

  localSolution: z.object({
    headline: z.string(),
    description: z.string(),
  }).optional(),

  localBenefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
  })).optional(),

  localSavings: z.object({
    headline: z.string(),
    description: z.string(),
    localRebates: z.string().optional(),
  }).optional(),

  localGalleryImages: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).optional(),
  ```
- [ ] Run `pnpm build` - must pass with zero errors
- [ ] Verify build output shows 628+ pages generated successfully

**Technical Notes:**
- `localGalleryImages.src` contains placeholder image paths initially (e.g., `/images/projects/guelph-furnace-1.jpg`)
- Client replaces placeholder paths with real photo URLs later
- Component will render actual `<img>` tags with these `src` values, never hardcoded placeholder divs
- All fields optional to avoid breaking existing 550 service-city pages

---

### US-003: Create ProblemSection Component

**Description:** As a user visiting a service page, I want to see the heating/cooling problem clearly explained so I understand why I need this service.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search queries: "badge", "card"
- [ ] Document which components are available for use

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide component specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 138-177
- [ ] ASCII layout reference:
  ```
  Split layout - Text LEFT, Image Placeholder RIGHT
  Background: bg-muted/30
  Grid: md:grid-cols-2 gap-8 md:gap-12 items-center
  ```
- [ ] Props interface:
  ```typescript
  interface Props {
    headline: string;
    description: string;
    painPoints: string[];
    imageAlt?: string;
    reversed?: boolean; // For future use
  }
  ```
- [ ] Design requirements: NO gradients, premium spacing, touch targets ≥ 44px
- [ ] Skill outputs complete implementation plan

**STEP 3: Implement component**
- [ ] Create `src/components/sections/ProblemSection.astro`
- [ ] Import shadcn components found in Step 1 (if using Card/Badge)
- [ ] Implement split layout: text left, image placeholder right
- [ ] Use placeholder image: `<div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground">{imageAlt || "Problem Illustration"}</div>`
- [ ] Render painPoints as list with bullets or check icons
- [ ] Background: `bg-muted/30`
- [ ] Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- [ ] Padding: `py-16 md:py-20 lg:py-24`
- [ ] Grid: `grid md:grid-cols-2 gap-8 md:gap-12 items-center`
- [ ] Mobile: Stack vertically (image below text)
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Start dev server: `pnpm dev` (localhost:4321)
- [ ] Create test page or use existing service page
- [ ] Test viewports:
  - Mobile (375px): Verify stack vertically, touch targets ≥ 44px
  - Tablet (768px): Verify split layout starts
  - Desktop (1024px): Verify full split layout, proper spacing
- [ ] Verify placeholder image renders correctly
- [ ] Verify text readability and hierarchy
- [ ] All viewports must render correctly

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check WCAG AA color contrast (text on bg-muted/30)
- [ ] Check heading hierarchy (h2 for headline, p for description)
- [ ] Check touch targets ≥ 44px
- [ ] Check keyboard navigation (if interactive elements)
- [ ] Fix ALL Critical/High issues found
- [ ] Re-test after fixes

**STEP 6: Commit and update**
- [ ] Verify all quality gates passed
- [ ] Verify `pnpm build` passes
- [ ] Run `git add src/components/sections/ProblemSection.astro`
- [ ] Run `git commit -m "feat: Create ProblemSection component for service pages"`
- [ ] Update this story in prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 138-177

---

### US-004: Create SolutionSection Component

**Description:** As a user viewing a service page, I want to see how B.A.P solves the problem so I understand their approach and expertise.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search query: "badge"
- [ ] Badge component will display differentiators (TSSA certified, 10-year warranty, etc.)

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide component specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 179-217
- [ ] ASCII layout: Image LEFT, Text RIGHT (alternates from ProblemSection)
- [ ] Props interface:
  ```typescript
  interface Props {
    headline: string;
    description: string;
    differentiators: string[]; // Rendered as badges
    imageAlt?: string;
    reversed?: boolean;
  }
  ```
- [ ] Design: Use shadcn Badge for differentiators display
- [ ] Background: `bg-background` (white)
- [ ] Skill outputs implementation plan

**STEP 3: Implement component**
- [ ] Create `src/components/sections/SolutionSection.astro`
- [ ] Import shadcn Badge component: `import { Badge } from '@/components/ui/badge'`
- [ ] Implement split layout: image placeholder left, text right
- [ ] Use placeholder: `<div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground">{imageAlt || "Solution Approach"}</div>`
- [ ] Render differentiators as Badge components in flex wrap
- [ ] Support `reversed` prop to flip sides (default: image left)
- [ ] Background: `bg-background`
- [ ] Same container/padding/grid as ProblemSection
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at 375px, 768px, 1024px
- [ ] Verify alternating pattern works (image left vs ProblemSection image right)
- [ ] Verify Badge components render correctly
- [ ] Verify responsive stacking on mobile

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check color contrast for Badge components
- [ ] Check heading hierarchy
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create SolutionSection component with Badge differentiators"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 179-217

---

### US-005: Create LocalTrustOpener Component

**Description:** As a user viewing a service-city page, I want to see why this city trusts B.A.P so I feel confident they serve my area.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search query: "badge"
- [ ] Badge will display rating and local stats

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 219-256
- [ ] Layout: Full-width banner, centered text
- [ ] Props interface:
  ```typescript
  interface Props {
    cityName: string;
    neighborhoods?: string[];
    rating?: number;
    localStats?: string; // "500+ local installs"
  }
  ```
- [ ] Background: `bg-primary/5`
- [ ] Skill outputs plan

**STEP 3: Implement component**
- [ ] Create `src/components/sections/LocalTrustOpener.astro`
- [ ] Import Badge: `import { Badge } from '@/components/ui/badge'`
- [ ] Full-width banner with centered content
- [ ] Display: `"${cityName} Homeowners Trust B.A.P"` as h2
- [ ] Show neighborhoods if provided (comma-separated)
- [ ] Display rating and localStats as Badge components
- [ ] Background: `bg-primary/5`
- [ ] Padding: `py-20 md:py-28`
- [ ] Center all content: `text-center`
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at all viewports
- [ ] Verify full-width background color
- [ ] Verify centered text alignment
- [ ] Verify Badge components for rating/stats

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check contrast on `bg-primary/5` background
- [ ] Check heading hierarchy (h2 for city name)
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create LocalTrustOpener banner component"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 219-256

---

### US-006: Create LocalProblemSection Component

**Description:** As a user viewing a service-city page, I want to see city-specific heating/cooling challenges so I know B.A.P understands my local situation.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search queries: "badge", "card"

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 259-298
- [ ] Layout: Similar to ProblemSection but with city context
- [ ] Props interface:
  ```typescript
  interface Props {
    headline: string;
    description: string;
    citySpecificIssues: string[];
    cityName: string;
    imageAlt?: string;
  }
  ```
- [ ] Background: `bg-muted/30`

**STEP 3: Implement component**
- [ ] Create `src/components/sections/LocalProblemSection.astro`
- [ ] Import shadcn components if needed
- [ ] Split layout: text left, image placeholder right
- [ ] Integrate `cityName` into headline (e.g., "Heating Challenges in ${cityName}")
- [ ] Render citySpecificIssues as list
- [ ] Use placeholder image with city context
- [ ] Background: `bg-muted/30`
- [ ] Same spacing as ProblemSection
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at 375px, 768px, 1024px
- [ ] Verify city name integration
- [ ] Verify city-specific issues list

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create LocalProblemSection with city context"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 259-298

---

### US-007: Create LocalSolutionSection Component

**Description:** As a user viewing a service-city page, I want to see how B.A.P solves problems in my specific city so I understand their local expertise.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search query: "badge"

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 300-321
- [ ] Layout: Similar to SolutionSection with city context
- [ ] Props interface:
  ```typescript
  interface Props {
    headline: string;
    description: string;
    cityName: string;
    imageAlt?: string;
  }
  ```
- [ ] Background: `bg-background`

**STEP 3: Implement component**
- [ ] Create `src/components/sections/LocalSolutionSection.astro`
- [ ] Import Badge if needed
- [ ] Split layout: image left, text right (alternates from LocalProblemSection)
- [ ] Integrate cityName into content
- [ ] Use placeholder image
- [ ] Background: `bg-background`
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at all viewports
- [ ] Verify alternating pattern continues correctly

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create LocalSolutionSection with city integration"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 300-321

---

### US-008: Create LocalGallerySection Component

**Description:** As a user viewing a service-city page, I want to see completed projects in my city so I have visual proof of B.A.P's local work.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search query: "card"
- [ ] Card component will wrap each gallery image

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 324-393
- [ ] Layout: Grid of project images (3 cols desktop, 2 tablet, 1 mobile)
- [ ] Props interface:
  ```typescript
  interface GalleryImage {
    src: string;           // Image path from schema
    alt: string;           // Accessibility alt text
    caption?: string;      // Optional caption
  }

  interface Props {
    cityName: string;
    serviceType?: string;
    images: GalleryImage[];  // 6-8 images from schema
    headline?: string;       // Default: "Our Work in [City Name]"
    subheadline?: string;
  }
  ```
- [ ] **CRITICAL:** Component renders actual `<img>` tags with `src` from schema, NOT hardcoded placeholder divs
- [ ] Background: `bg-muted/30`

**STEP 3: Implement component**
- [ ] Create `src/components/sections/LocalGallerySection.astro`
- [ ] Import Card: `import { Card, CardContent } from '@/components/ui/card'`
- [ ] Grid layout: `grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- [ ] Default headline: `Our Work in ${cityName}`
- [ ] Map over `images` array from props
- [ ] Wrap each image in shadcn Card component
- [ ] Render actual `<img>` tags: `<img src={image.src} alt={image.alt} class="aspect-video object-cover rounded-md" />`
- [ ] Display caption below image if provided
- [ ] Background: `bg-muted/30`
- [ ] Padding: `py-16 md:py-24`
- [ ] **DO NOT** hardcode placeholder divs - always render `<img>` tags
- [ ] Image paths come from schema (frontmatter `localGalleryImages` field)
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test grid responsiveness:
  - Mobile (375px): 1 column
  - Tablet (768px): 2 columns
  - Desktop (1024px): 3 columns
- [ ] Verify Card components render correctly
- [ ] Verify images render (will show broken images until real photos added - this is expected)
- [ ] Verify captions display below images

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check all images have alt text
- [ ] Check grid spacing is adequate
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create LocalGallerySection with schema-driven images"`
- [ ] Update prd.json: `"passes": true`

**Technical Notes:**
- Images array comes from frontmatter `localGalleryImages` field (added in US-002)
- Schema contains placeholder image paths initially (e.g., `/images/projects/guelph-furnace-1.jpg`)
- Client replaces placeholder paths with real photo URLs later
- Component ALWAYS renders `<img>` tags, never hardcoded placeholder divs
- This maintains schema-driven architecture

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 324-393

---

### US-009: Create LocationServicesGrid Component

**Description:** As a user viewing a service-city page, I want to see other services available in my city so I can discover additional offerings.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search queries: "card", "button"
- [ ] Card for service cards, Button for "Learn More" CTAs

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Provide specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 397-463
- [ ] Layout: Grid of service cards (3 cols desktop, 2 tablet, 1 mobile)
- [ ] Props interface:
  ```typescript
  interface ServiceCard {
    slug: string;           // "furnace-installation"
    title: string;          // "Furnace Installation"
    icon: string;           // Emoji or Lucide icon name
    shortDescription: string; // 10-15 words
    href: string;           // "/services/furnace-installation-guelph-on"
  }

  interface Props {
    cityName: string;       // "Guelph"
    locationSlug: string;   // "guelph"
    services: ServiceCard[]; // Top 6-8 services
    allServicesCount: number; // 22
  }
  ```
- [ ] Background: `bg-muted/30`

**STEP 3: Implement component**
- [ ] Create `src/components/sections/LocationServicesGrid.astro`
- [ ] Import Card and Button: `import { Card, CardContent } from '@/components/ui/card'` and `import { Button } from '@/components/ui/button'`
- [ ] Headline: `More Services We Offer in ${cityName}`
- [ ] Grid: `grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- [ ] Fetch all services from services collection
- [ ] Filter to top 6-8 priority services (installations first)
- [ ] Build href by combining service slug + location slug: `/services/${service.slug}-${locationSlug}-on`
- [ ] Render each service in Card with icon, title, description, Button
- [ ] Add "View All 22 Services in ${cityName}" link to `/locations/${locationSlug}`
- [ ] Background: `bg-muted/30`
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test grid at 375px (1 col), 768px (2 cols), 1024px (3 cols)
- [ ] Verify service cards render correctly
- [ ] Click "Learn More" buttons - verify links work
- [ ] Click "View All" link - verify navigates to location page

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check Button touch targets ≥ 44px
- [ ] Check card spacing and readability
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Create LocationServicesGrid for cross-selling"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 397-463

---

### US-010: Redesign ServiceBenefitsSection

**Description:** As a user viewing a service page, I want benefits presented in an engaging split layout instead of a grid of boxes so the information flows naturally with the page story.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search queries: "card", Lucide "check" icon
- [ ] Card for rebate highlight, Check icon for benefit checkmarks

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Read current implementation: `src/components/sections/ServiceBenefitsSection.astro`
- [ ] Provide redesign specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 466-503
- [ ] **Current:** 4-column grid of cards (boxes)
- [ ] **New:** Split layout - Text LEFT, Image RIGHT (alternating pattern)
- [ ] Keep same Props interface:
  ```typescript
  interface Benefit {
    title: string;
    description: string;
    icon: string;
  }
  interface Props {
    benefits: Benefit[];
    headline?: string;
    imageAlt?: string; // NEW - for placeholder image
  }
  ```
- [ ] Layout: Benefits as checkmark list on left, image placeholder on right
- [ ] Background: `bg-background`

**STEP 3: Implement redesign**
- [ ] Read existing file: `src/components/sections/ServiceBenefitsSection.astro`
- [ ] Import Check icon: `import { Check } from 'lucide-react'`
- [ ] Keep existing Props interface, add `imageAlt?: string`
- [ ] Replace 4-column grid with split layout: `grid md:grid-cols-2 gap-8 md:gap-12 items-center`
- [ ] Left side: Map benefits array to list with Check icons
- [ ] Right side: Placeholder image `<div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground">{imageAlt || "Benefits Visual"}</div>`
- [ ] Each benefit: Check icon + title + description
- [ ] Background: `bg-background`
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at 375px, 768px, 1024px
- [ ] Verify split layout (text left, image right)
- [ ] Verify Check icons render correctly
- [ ] Verify mobile stacking

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check Check icon color contrast
- [ ] Check benefit text readability
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Redesign ServiceBenefitsSection to split layout"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 466-503

---

### US-011: Redesign ServiceSavingsSection

**Description:** As a user viewing a service page, I want savings information presented in a split layout instead of centered stack so it matches the page's alternating flow.

**MANDATORY WORKFLOW - Follow all 6 steps:**

**STEP 1: Search shadcn components**
- [ ] Use `mcp__shadcn__search_items_in_registries` tool
- [ ] Search registries: `['@shadcn']`
- [ ] Search queries: "card", Lucide "check" icon
- [ ] Card for rebate highlight, Check for savings bullets

**STEP 2: Design component with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Read current implementation: `src/components/sections/ServiceSavingsSection.astro`
- [ ] Provide redesign specs from PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 506-545
- [ ] **Current:** Centered stack with bullets and card
- [ ] **New:** Split layout - Image LEFT, Text RIGHT (alternates from benefits)
- [ ] Keep same Props interface, add `imageAlt`:
  ```typescript
  interface Props {
    headline: string;
    description?: string;
    bullets?: string[];
    rebateInfo?: string;
    financingNote?: string;
    imageAlt?: string; // NEW
  }
  ```
- [ ] Background: `bg-primary/5`

**STEP 3: Implement redesign**
- [ ] Read existing file: `src/components/sections/ServiceSavingsSection.astro`
- [ ] Import Card and Check: `import { Card, CardContent } from '@/components/ui/card'` and `import { Check } from 'lucide-react'`
- [ ] Add `imageAlt?: string` to Props
- [ ] Replace centered stack with split layout: `grid md:grid-cols-2 gap-8 md:gap-12 items-center`
- [ ] Left side: Placeholder image
- [ ] Right side: headline, description, bullets with Check icons, rebateInfo as Card, financingNote
- [ ] Keep rebateInfo as Card highlight
- [ ] Background: `bg-primary/5`
- [ ] Run `pnpm build` - must pass

**STEP 4: Test visually with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test at 375px, 768px, 1024px
- [ ] Verify split layout (image left, text right)
- [ ] Verify alternating pattern works (opposite of benefits section)
- [ ] Verify Card rebate highlight renders

**STEP 5: Review accessibility with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check contrast on `bg-primary/5`
- [ ] Check Card component accessibility
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Redesign ServiceSavingsSection to split layout"`
- [ ] Update prd.json: `"passes": true`

**Reference:** PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md lines 506-545

---

### US-012: Update [service].astro Template

**Description:** As a developer, I need to integrate new Problem/Solution sections into service pages so the lead conversion flow is complete.

**MANDATORY WORKFLOW:**

**STEP 1: Read current template**
- [ ] Read file: `src/pages/services/[service].astro`
- [ ] Document current section order
- [ ] Identify where to insert ProblemSection and SolutionSection

**STEP 2: Design template updates with /frontend-design skill (if new layout)**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill if adding new layout patterns
- [ ] Plan section order:
  1. ServiceHeroSection (existing)
  2. **ProblemSection (NEW - position 2)**
  3. **SolutionSection (NEW - position 3)**
  4. BenefitsSection (redesigned in US-010)
  5. ProcessSection (existing)
  6. SavingsSection (redesigned in US-011)
  7. Testimonials, FAQ, RelatedServices, FinalCTA (existing)
- [ ] Verify alternating background pattern (muted → white → muted, etc.)

**STEP 3: Implement template updates**
- [ ] Import new components:
  ```typescript
  import ProblemSection from '@/components/sections/ProblemSection.astro';
  import SolutionSection from '@/components/sections/SolutionSection.astro';
  ```
- [ ] Get data from service entry:
  ```typescript
  const { problemStatement, solutionApproach } = service.data;
  ```
- [ ] Add ProblemSection after hero (position 2):
  ```astro
  {problemStatement && (
    <ProblemSection
      headline={problemStatement.headline}
      description={problemStatement.description}
      painPoints={problemStatement.painPoints || []}
    />
  )}
  ```
- [ ] Add SolutionSection after problem (position 3):
  ```astro
  {solutionApproach && (
    <SolutionSection
      headline={solutionApproach.headline}
      description={solutionApproach.description}
      differentiators={solutionApproach.differentiators || []}
    />
  )}
  ```
- [ ] Verify alternating background pattern visually
- [ ] Run `pnpm build` - must pass

**STEP 4: Test full page flow with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Navigate to example service page (e.g., /services/furnace-installation)
- [ ] Verify full page flow top to bottom
- [ ] Verify alternating pattern is visually clear
- [ ] Test at 375px, 768px, 1024px

**STEP 5: Review with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check entire page accessibility
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Add Problem-Solution flow to service pages"`
- [ ] Update prd.json: `"passes": true`

---

### US-013: Update [serviceLocation].astro Template

**Description:** As a developer, I need to integrate all new local-context sections into service-city pages so the city-specific lead conversion flow is complete.

**MANDATORY WORKFLOW:**

**STEP 1: Read current template**
- [ ] Read file: `src/pages/services/[serviceLocation].astro`
- [ ] Document current section order
- [ ] Identify LocalContextSection to be replaced

**STEP 2: Design template updates with /frontend-design skill**
- [ ] **MANDATORY:** Invoke `/frontend-design` skill
- [ ] Plan new section order (13 sections total):
  1. ServiceCityHeroSection (existing)
  2. **LocalTrustOpener (NEW - replaces LocalContextSection)**
  3. **LocalProblemSection (NEW)**
  4. **LocalSolutionSection (NEW)**
  5. **LocalGallerySection (NEW - position 5)**
  6. BenefitsSection (redesigned)
  7. ProcessSection (existing)
  8. LocalProofSection (existing)
  9. **LocationServicesGrid (NEW - position 9)**
  10. SavingsSection (redesigned)
  11. FAQSection (existing)
  12. RelatedServicesSection (existing)
  13. FinalCTASection (existing)
- [ ] Verify alternating flow pattern

**STEP 3: Implement template updates**
- [ ] Import new components:
  ```typescript
  import LocalTrustOpener from '@/components/sections/LocalTrustOpener.astro';
  import LocalProblemSection from '@/components/sections/LocalProblemSection.astro';
  import LocalSolutionSection from '@/components/sections/LocalSolutionSection.astro';
  import LocalGallerySection from '@/components/sections/LocalGallerySection.astro';
  import LocationServicesGrid from '@/components/sections/LocationServicesGrid.astro';
  ```
- [ ] Get data from serviceCity entry:
  ```typescript
  const { localTrustOpener, localProblem, localSolution, localGalleryImages } = serviceCity.data;
  ```
- [ ] Replace LocalContextSection with new sections
- [ ] Add LocalTrustOpener (position 2)
- [ ] Add LocalProblemSection (position 3)
- [ ] Add LocalSolutionSection (position 4)
- [ ] Add LocalGallerySection after LocalSolutionSection (position 5):
  ```astro
  {localGalleryImages && localGalleryImages.length > 0 && (
    <LocalGallerySection
      cityName={location.data.name}
      serviceType={service.data.name}
      images={localGalleryImages}
    />
  )}
  ```
- [ ] Add LocationServicesGrid after LocalProofSection (position 9):
  ```astro
  <LocationServicesGrid
    cityName={location.data.name}
    locationSlug={locationSlug}
    services={[]} // Will fetch inside component
    allServicesCount={22}
  />
  ```
- [ ] Integrate alternating flow with proper backgrounds
- [ ] Run `pnpm build` - must pass

**STEP 4: Test example page with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Navigate to example page (e.g., /services/furnace-installation-guelph-on)
- [ ] Verify full 13-section flow
- [ ] Verify LocalGallerySection renders images
- [ ] Verify LocationServicesGrid shows service cards
- [ ] Verify alternating pattern across full page
- [ ] Test at 375px, 768px, 1024px

**STEP 5: Review with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Check entire page accessibility
- [ ] Fix ALL Critical/High issues

**STEP 6: Commit and update**
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "feat: Add local lead conversion flow to service-city pages"`
- [ ] Update prd.json: `"passes": true`

---

### US-014: Visual Verification (All Sections)

**Description:** As a developer, I need to verify all new and redesigned sections work correctly across all viewports before marking Phase 6B complete.

**MANDATORY WORKFLOW:**

**STEP 1: Start dev server**
- [ ] Run `pnpm dev`
- [ ] Verify localhost:4321 is accessible

**STEP 2: Test with /agent-browser skill**
- [ ] **MANDATORY:** Invoke `/agent-browser` skill
- [ ] Test ALL new sections:
  - ProblemSection
  - SolutionSection
  - LocalTrustOpener
  - LocalProblemSection
  - LocalSolutionSection
  - LocalGallerySection
  - LocationServicesGrid
  - ServiceBenefitsSection (redesigned)
  - ServiceSavingsSection (redesigned)
- [ ] Test at three viewports:
  - **Mobile (375px):**
    - Verify all split layouts stack vertically
    - Verify grids become 1 column (LocalGallerySection, LocationServicesGrid)
    - Verify touch targets ≥ 44px
  - **Tablet (768px):**
    - Verify split layouts start (2 columns)
    - Verify grids become 2 columns
    - Verify spacing is adequate
  - **Desktop (1024px):**
    - Verify full split layouts
    - Verify 3-column grids (LocalGallerySection, LocationServicesGrid)
    - Verify proper spacing and alignment
- [ ] Verify alternating pattern is visually clear:
  - Service pages: Problem (muted bg) → Solution (white bg) → Benefits (white bg) → Savings (primary/5 bg)
  - Service-city pages: 13-section flow with proper alternation
- [ ] Check LocalGallerySection:
  - Verify images render (may be broken - expected until real photos added)
  - Verify captions display
  - Verify Card wrapper works
- [ ] Check LocationServicesGrid:
  - Verify service cards render
  - Click "Learn More" buttons - verify links work
  - Click "View All" link - verify navigation
  - Verify grid responsive at all viewports

**STEP 3: Final accessibility audit with /web-design-guidelines skill**
- [ ] **MANDATORY:** Invoke `/web-design-guidelines` skill
- [ ] Run comprehensive accessibility audit on:
  - One full service page
  - One full service-city page
- [ ] Check ALL sections for:
  - WCAG AA color contrast
  - Heading hierarchy (h2 → h3, no skips)
  - Touch targets ≥ 44px
  - Keyboard navigation
  - Image alt text (all images must have alt)
- [ ] Fix ALL remaining Critical/High issues
- [ ] Re-test after fixes

**STEP 4: Build verification**
- [ ] Run `pnpm build`
- [ ] Verify build passes with zero errors
- [ ] Verify 628+ pages generated successfully
- [ ] Check build output for any warnings

**STEP 5: Document findings**
- [ ] Create `docs/project/phase-6b/visual-verification.md`
- [ ] Document:
  - All sections tested
  - Viewport test results (375px, 768px, 1024px)
  - Accessibility audit results
  - Any remaining issues (non-Critical/High)
  - Screenshots or notes on visual quality

**STEP 6: Final commit**
- [ ] All quality gates passed
- [ ] All Critical/High accessibility issues fixed
- [ ] `pnpm build` passes
- [ ] Commit: `git commit -m "test: Complete visual verification for Phase 6B"`
- [ ] Update prd.json: `"passes": true`

**Success Criteria:**
- All 9 sections render correctly at all viewports
- Alternating pattern visually clear
- No Critical/High accessibility issues
- Build passes with 628+ pages
- All grids responsive (1, 2, 3 columns)
- All links and buttons functional

---

## Functional Requirements

### Schema Requirements
- **FR-1:** services collection must have optional `problemStatement` object with headline, description, painPoints array
- **FR-2:** services collection must have optional `solutionApproach` object with headline, description, differentiators array
- **FR-3:** serviceCity collection must have optional `localTrustOpener` string field
- **FR-4:** serviceCity collection must have optional `localProblem` object with headline, description, citySpecificIssues array
- **FR-5:** serviceCity collection must have optional `localSolution` object with headline, description
- **FR-6:** serviceCity collection must have optional `localBenefits` array of objects with title, description, icon
- **FR-7:** serviceCity collection must have optional `localSavings` object with headline, description, localRebates
- **FR-8:** serviceCity collection must have optional `localGalleryImages` array of objects with src, alt, caption

### Component Requirements
- **FR-9:** ProblemSection must render split layout (text left, image placeholder right) with painPoints list
- **FR-10:** SolutionSection must render split layout (image left, text right) with Badge differentiators
- **FR-11:** LocalTrustOpener must render full-width banner with city name, neighborhoods, rating, stats as Badges
- **FR-12:** LocalProblemSection must integrate cityName into content and render city-specific issues
- **FR-13:** LocalSolutionSection must integrate cityName and alternate layout (image left)
- **FR-14:** LocalGallerySection must render 3-column grid (responsive) with actual `<img>` tags from schema data, wrapped in Cards
- **FR-15:** LocationServicesGrid must fetch services, render 3-column grid of Cards with Button CTAs, link to service-city pages
- **FR-16:** ServiceBenefitsSection must render split layout (text left, image right) with Check icons
- **FR-17:** ServiceSavingsSection must render split layout (image left, text right) with Card rebate highlight

### Template Requirements
- **FR-18:** [service].astro must include ProblemSection at position 2, SolutionSection at position 3
- **FR-19:** [serviceLocation].astro must replace LocalContextSection with LocalTrustOpener + LocalProblemSection + LocalSolutionSection
- **FR-20:** [serviceLocation].astro must include LocalGallerySection at position 5
- **FR-21:** [serviceLocation].astro must include LocationServicesGrid at position 9
- **FR-22:** Both templates must maintain alternating background pattern for visual flow

### Quality Requirements
- **FR-23:** All components must use shadcn MCP components (Card, Badge, Button, Check icon)
- **FR-24:** All component work must follow 6-step mandatory workflow (shadcn search → /frontend-design → implement → /agent-browser → /web-design-guidelines → commit)
- **FR-25:** All Critical/High accessibility issues must be fixed before marking story complete
- **FR-26:** `pnpm build` must pass after every story with zero errors
- **FR-27:** All components must be responsive (375px, 768px, 1024px tested)
- **FR-28:** Touch targets must be ≥ 44px for all interactive elements

---

## Non-Goals (Out of Scope)

This phase focuses on architecture only. The following are explicitly out of scope:

- **Content Generation:** No content will be written for the new fields (Phase 6C, 6D, 6E)
- **Real Images:** No actual project photos will be added (client adds later)
- **SEO Schema:** No structured data markup (Phase 6E)
- **Analytics:** No tracking or conversion optimization
- **A/B Testing:** No variant testing of layouts
- **Performance Optimization:** Beyond basic build passing
- **Internationalization:** English only
- **Admin Interface:** No CMS or content editing UI

---

## Technical Considerations

### Dependencies
- All stories depend on US-001 and US-002 completing first (schema updates)
- Component stories (US-003 through US-011) can run in parallel after schemas
- Template stories (US-012, US-013) depend on all component stories completing
- Visual verification (US-014) must be last

### Integration Points
- LocalGallerySection reads `localGalleryImages` array from service-city schema
- LocationServicesGrid fetches services from services collection at runtime
- Both templates read from updated schemas (services, serviceCity collections)
- All components must work with Astro 5.0 + React 19 + shadcn/ui

### Performance Requirements
- `pnpm build` must complete in < 10 minutes for 628+ pages
- No runtime errors in browser console
- No hydration mismatches (Astro SSG)

### Compatibility
- Must work with existing Phase 5 design system (CSS variables, neutral theme)
- Must not break existing 628+ pages during build
- Must support Safari, Chrome, Firefox (latest 2 versions)

---

## Success Metrics

### Technical Success
- All 15 stories marked `"passes": true` in prd.json
- `pnpm build` passes with 628+ pages generated
- Zero Critical/High accessibility issues remaining
- All new components render correctly at 375px, 768px, 1024px

### Quality Success
- All component stories completed 6-step mandatory workflow
- All sections tested with `/agent-browser` skill
- All sections reviewed with `/web-design-guidelines` skill
- Visual verification documented in `docs/project/phase-6b/visual-verification.md`

### Deliverables
- 2 schema updates (services, serviceCity)
- 7 new components created
- 2 components redesigned
- 2 templates updated
- 1 visual verification report

---

## Open Questions

**None.** All architectural decisions have been finalized in PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md.

---

## Next Steps After Phase 6B

1. **Phase 6A** - Keyword research + brand voice (2 stories)
2. **Phase 6C** - Generate content for 22 service pages (3 stories)
3. **Phase 6D** - Generate content for 550 service-city pages (7 stories)
4. **Phase 6E** - Expand location content + SEO schema (5 stories)

**Total remaining:** 17 stories across 4 phases

---

## Appendix: Story Dependency Graph

```
US-001 (Service Schema) ────────┐
                                 │
US-002 (ServiceCity Schema) ────┼─→ [Schemas Complete]
                                 │
                                 ├─→ US-003 (ProblemSection)
                                 ├─→ US-004 (SolutionSection)
                                 ├─→ US-005 (LocalTrustOpener)
                                 ├─→ US-006 (LocalProblemSection)
                                 ├─→ US-007 (LocalSolutionSection)
                                 ├─→ US-008 (LocalGallerySection)
                                 ├─→ US-009 (LocationServicesGrid)
                                 ├─→ US-010 (Redesign Benefits)
                                 └─→ US-011 (Redesign Savings)
                                      │
                                      ├─→ [Components Complete]
                                      │
                                      ├─→ US-012 ([service].astro)
                                      └─→ US-013 ([serviceLocation].astro)
                                           │
                                           └─→ [Templates Complete]
                                                │
                                                └─→ US-014 (Visual Verification)
                                                     │
                                                     └─→ [Phase 6B Complete]
```

---

## Ralph Execution Notes

**Branch:** `feature/phase-6b-architecture`

**Execution Command:** `pnpm ralph:17` (15 stories + 2 buffer)

**Story Order:**
1. US-001, US-002 run first (sequential, schemas)
2. US-003 through US-011 can run in parallel (components independent)
3. US-012, US-013 run after components (sequential, templates)
4. US-014 runs last (verification)

**Quality Gates Enforced:**
- Every component story requires 6-step workflow
- Every story requires `pnpm build` passing
- Every component story requires 3 skills (/frontend-design, /agent-browser, /web-design-guidelines)
- All Critical/High accessibility issues must be fixed

**Success Indicator:** All 15 stories show `"passes": true` in prd.json
