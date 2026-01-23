# Phase 9: Homepage Component Build — PRD Reference

**Status:** Ready for Ralph when current tasks complete
**Branch:** `feature/phase-9-homepage-components`
**Prerequisite:** Phase 9 Content Prep COMPLETE ✅

---

## Content Prep Status: COMPLETE ✅

| Task | Status | Output |
|------|--------|--------|
| US-001: Extend locations schema | ✅ | `src/content/config.ts` |
| US-002: Create ontario.md skeleton | ✅ | `src/content/locations/ontario.md` |
| US-003: Rebate research | ✅ | `docs/reference/rebate-deadlines.md` |
| US-004: City stats | ✅ | `src/content/business/profile.yaml` |
| US-005: Marketing copy | ✅ | `ontario.md` updated via `/direct-response-copy` |

---

## PRD: Phase 9 Homepage Component Rebuild

### Overview

Rebuild all 12 homepage section components using shadcn MCP and `/frontend-design` skill. Components read from `ontario.md` (where `isLandingPage: true`).

### Required Skills Per Story

| Skill | When |
|-------|------|
| `/frontend-design` | BEFORE writing any component |
| `/agent-browser` | AFTER implementation for visual testing |
| `/web-design-guidelines` | BEFORE committing .astro files |

---

## Component Exploration Summary

Explored existing homepage components to prepare for Phase 9 component build.

### Current Homepage Structure (14 sections)

| # | Component | Data Source | Notes |
|---|-----------|-------------|-------|
| 1 | HeroSection | profile.yaml | Hardcoded messaging |
| 2 | ValuePropsGrid | profile.yaml (computed) | 4 trust cards |
| 3 | BrandLogoTicker | Static | Brand logos |
| 4 | ServiceCategoriesGrid | profile.yaml | 6 category cards |
| 5 | ExpertConsultationSection | Static | Low-pressure CTA |
| 6 | ProjectGallerySection | Static | Image placeholders |
| 7 | TestimonialsCarousel | reviews collection | React component |
| 8 | FamilyStorySection | Static | Team/owner story |
| 9 | ServiceAreaSection | Static | Service area info |
| 10 | FinancingPreviewSection | Static | Financing info |
| 11 | BlogPreviewSection | Static | Blog preview |
| 12 | CertificationsSection | profile.yaml | Badges |
| 13 | FinalCTASection | Props (optional) | City-specific support |
| 14 | StickyPhoneDrawer | profile.yaml | React client component |

### Naming Pattern
All sections follow: `[Feature]Section.astro` in `src/components/sections/`

### Data Flow Patterns

**Pattern A: Direct getEntry (Homepage)**
```typescript
const businessProfile = await getEntry('business', 'profile');
const business = businessProfile.data;
```

**Pattern B: Props-based (Service/Location pages)**
```typescript
const { title, description, cityHero } = Astro.props;
const displayTitle = cityHero?.title || title; // Fallback
```

**Pattern C: getCollection + Filter**
```typescript
const allFaqs = await getCollection('faqs');
const filtered = allFaqs.filter(...).slice(0, 6);
```

### What EXISTS
- Section rendering pattern (`[Feature]Section.astro`)
- Props-based data passing with fallbacks
- Business profile as single source of truth
- Content collections for dynamic data
- Astro + React hybrid (static + interactive)

### What DOES NOT EXIST (Phase 9 will create)
- ❌ `SectionHeader` component (eyebrow + headline + subtext)
- ❌ Location-specific homepage rendering
- ❌ Unified three-tier fallback system
- ❌ Dynamic section renderer from location schema

---

## Phase 9 Component Build — Full Rebuild with shadcn + /frontend-design

### Approach: Rebuild ALL Components from Scratch

**Tools Required:**
- shadcn MCP (`@shadcn` registry)
- `/frontend-design` skill for each component
- `/agent-browser` for visual testing
- `/web-design-guidelines` for review

---

## Component-to-Schema Mapping

### 1. HomepageHero.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → hero` |
| **Props** | `title`, `subtitle`, `trustBadgeText`, `rebateBadge`, `answeringTeamText` |
| **shadcn** | Button, Badge |
| **Layout** | Full viewport height, centered text stack |
| **Data** | Frontmatter + profile.yaml (phone) |

### 2. HomepageServiceCategories.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → serviceCategories` |
| **Props** | `eyebrow`, `headline`, `subtext`, `categories` |
| **shadcn** | Card, Badge, Separator |
| **Layout** | 5-column responsive grid |
| **Data** | Frontmatter + services collection |

### 3. HomepageExpertConsultation.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → expertConsultation` |
| **Props** | `eyebrow`, `headline`, `subtext`, `bullets`, `image` |
| **shadcn** | Badge, Separator, Button |
| **Layout** | 2-column flex (text left, image right) |
| **Data** | Frontmatter only |

### 4. HomepageWhyChoose.astro (Bento)

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → whyChoose` |
| **Props** | `eyebrow`, `headline`, `subtext`, `fullServiceBullets`, `warrantyCard` |
| **shadcn** | Card, Badge, Separator |
| **Layout** | Bento grid (large left, 2 stacked right, full-width bottom) |
| **Data** | Frontmatter + profile.yaml (rating, reviews) |

### 5. HomepageTestimonials.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → testimonials` |
| **Props** | `eyebrow`, `headline`, `subtext`, `reviews` |
| **shadcn** | Carousel, Card, Badge |
| **Layout** | Horizontal carousel |
| **Data** | Frontmatter + reviews collection |

### 6. HomepageProjectGallery.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → projectGallery` |
| **Props** | `eyebrow`, `headline`, `subtext`, `filterByLocation` |
| **shadcn** | Card, Badge, Separator |
| **Layout** | Masonry grid (3-4 columns) |
| **Data** | Frontmatter + case-studies collection |

### 7. HomepageFinancing.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → financing` |
| **Props** | `eyebrow`, `headline`, `subtext`, `rebateCard` |
| **shadcn** | Card, Badge, Button, Separator |
| **Layout** | 2-column flex (text left, card right) |
| **Data** | Frontmatter only |

### 8. HomepageServiceArea.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → serviceArea` |
| **Props** | `eyebrow`, `headline`, `subtext`, `showAllRegions`, `currentCityHighlight` |
| **shadcn** | Card, Accordion, Badge, Separator |
| **Layout** | 2-column (map left, regions right) |
| **Data** | Frontmatter + profile.yaml (map) + regions collection |

### 9. HomepageFAQ.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → faq` |
| **Props** | `eyebrow`, `headline`, `subtext`, `items`, `showViewAllLink` |
| **shadcn** | Accordion, Badge, Button |
| **Layout** | Single column accordion |
| **Data** | Frontmatter inline items (generates FAQPage JSON-LD) |

### 10. HomepageBlogPreview.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → blogPreview` |
| **Props** | `eyebrow`, `headline`, `subtext`, `filterByLocation` |
| **shadcn** | Card, Badge, Separator |
| **Layout** | 3-column grid |
| **Data** | Frontmatter + blog collection |

### 11. HomepageFinalCta.astro

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → finalCta` |
| **Props** | `eyebrow`, `headline`, `subtext`, `bullets` |
| **shadcn** | Badge, Button, Separator |
| **Layout** | Full-width dark section, centered |
| **Data** | Frontmatter + profile.yaml (phone) |

### 12. ScrollBanner.tsx

| Aspect | Details |
|--------|---------|
| **Schema** | `ontario.md → scrollBanner` |
| **Props** | `text`, `ctaText`, `enabled` |
| **shadcn** | Button, Separator |
| **Layout** | Fixed bottom banner (appears at 75% scroll) |
| **Data** | Frontmatter + profile.yaml (phone) |

---

## shadcn Primitives Inventory

| Primitive | Used In |
|-----------|---------|
| Button | All sections (CTAs) |
| Card | Categories, WhyChoose, Testimonials, Gallery, Financing, ServiceArea, Blog |
| Badge | All sections (eyebrows, tags) |
| Separator | All sections (dividers) |
| Accordion | FAQ, ServiceArea |
| Carousel | Testimonials |

---

## Component Hierarchy

```
index.astro
├── Header.astro
├── HomepageHero.astro
├── HomepageServiceCategories.astro
├── HomepageExpertConsultation.astro
├── HomepageWhyChoose.astro
├── HomepageTestimonials.astro
├── HomepageProjectGallery.astro
├── HomepageFinancing.astro
├── HomepageServiceArea.astro
├── HomepageFAQ.astro
├── HomepageBlogPreview.astro
├── HomepageFinalCta.astro
├── ScrollBanner.tsx
└── Footer.astro
```

---

## Reusable: SectionHeader Component

**Create first** — used by all sections except Hero:

```typescript
interface Props {
  eyebrow?: string;
  headline: string;
  subtext?: string;
  variant?: 'default' | 'dark';  // dark = white text on primary bg
  align?: 'left' | 'center';
}
```

**shadcn:** Badge (for eyebrow), Separator

---

## Implementation Order (Right-Sized Stories)

| Story | Components | Skills |
|-------|------------|--------|
| **Story 1** | SectionHeader + HomepageHero | /frontend-design, /agent-browser |
| **Story 2** | ServiceCategories + ExpertConsultation | /frontend-design, /agent-browser |
| **Story 3** | WhyChoose (Bento) | /frontend-design, /agent-browser |
| **Story 4** | Testimonials + ProjectGallery | /frontend-design, /agent-browser |
| **Story 5** | Financing + ServiceArea | /frontend-design, /agent-browser |
| **Story 6** | FAQ + BlogPreview | /frontend-design, /agent-browser |
| **Story 7** | FinalCta + ScrollBanner | /frontend-design, /agent-browser |
| **Story 8** | Wire index.astro to ontario.md | /web-design-guidelines |

---

## Verification Plan

1. `pnpm build` passes (639+ pages)
2. Homepage renders from ontario.md data
3. All sections use SectionHeader component
4. Visual testing passes at 375px, 768px, 1024px
5. No hardcoded messaging in components
6. Phone CTA works (tel: link)

---

## Current State (from exploration)

| Asset | Status |
|-------|--------|
| Locations schema | 7 basic fields only — needs 12 section objects |
| ontario.md | MISSING — homepage content file doesn't exist |
| city_stats | MISSING — needed in profile.yaml |
| rebate-deadlines.md | MISSING — needed for accurate rebate badge |
| Service-city schema | COMPLETE (Phase 8A) |

---

## PRD Structure — 5 User Stories

### US-001: Extend Locations Collection Schema

**Type:** Schema/Infrastructure
**File:** [src/content/config.ts](src/content/config.ts#L367-385)

**Add to locations schema:**
```typescript
isLandingPage: z.boolean().optional().default(false),
hero: z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  trustBadgeText: z.string().optional(),
  rebateBadge: z.object({
    text: z.string(),
    deadline: z.string(),
  }).optional(),
  answeringTeamText: z.string().optional(),
}).optional(),
serviceCategories: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  serviceCategoryOrder: z.array(z.string()).optional(),
}).optional(),
expertConsultation: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  bullets: z.array(z.string()).max(6).optional(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }).optional(),
}).optional(),
whyChoose: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  fullServiceBullets: z.array(z.string()).optional(),
  warrantyCard: z.object({
    headline: z.string(),
    copy: z.string(),
  }).optional(),
}).optional(),
testimonials: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
}).optional(),
projectGallery: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  filterByLocation: z.boolean().optional().default(false),
}).optional(),
financing: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  rebateCard: z.object({
    utilityProvider: z.string(),
    rebateAmount: z.string(),
    emphasis: z.string(),
  }).optional(),
}).optional(),
serviceArea: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  showAllRegions: z.boolean().optional().default(true),
  currentCityHighlight: z.string().optional(),
}).optional(),
faq: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  items: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  showViewAllLink: z.boolean().optional().default(true),
}).optional(),
blogPreview: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  filterByLocation: z.boolean().optional().default(false),
}).optional(),
finalCta: z.object({
  eyebrow: z.string().optional(),
  headline: z.string(),
  subtext: z.string().optional(),
  bullets: z.array(z.string()).optional(),
}).optional(),
scrollBanner: z.object({
  text: z.string(),
  ctaText: z.string(),
  enabled: z.boolean().optional().default(true),
}).optional(),
experienceStats: z.object({
  installationsInCity: z.number().optional(),
}).optional(),
```

**Acceptance Criteria:**
- [ ] All 12 section objects added as optional fields
- [ ] isLandingPage flag added with default false
- [ ] experienceStats object added
- [ ] `pnpm build` passes
- [ ] Existing 25 location files still validate

---

### US-002: Create Homepage Content File (ontario.md)

**Type:** Content/Schema
**File:** `src/content/locations/ontario.md` (NEW)

**Requirements:**
- Create with `isLandingPage: true` flag
- Add all section objects with placeholder content
- Use exact structure from [phase-9-homepage.md](phase-9-homepage.md#L116-305)

**Acceptance Criteria:**
- [ ] ontario.md created in locations collection
- [ ] isLandingPage: true set
- [ ] All 12 section objects present (can have placeholder values)
- [ ] workflowStatus: "draft"
- [ ] `pnpm build` passes
- [ ] File validates against extended schema

---

### US-003: Rebate Research (Task 1)

**Type:** Research/Content
**Output:** `docs/reference/rebate-deadlines.md`

**Research Required:**
1. **Enbridge Home Efficiency Rebate Plus (HER+)**
   - Current rebate amounts for furnaces, heat pumps, water heaters
   - Application deadlines
   - URL: enbridge.com/rebates

2. **Canada Greener Homes Grant**
   - Status (active/ended/renewed)
   - Successor programs if ended

3. **Ontario Electricity Rebate / Clean Home Heating Initiative**
   - Heat pump incentives
   - Deadlines

**Acceptance Criteria:**
- [ ] rebate-deadlines.md created with current data
- [ ] Each program has: status, deadline, amounts, link
- [ ] "Key Dates for Homepage" section with rebate badge text suggestion
- [ ] Last Updated date included

---

### US-004: City Installation Statistics (Task 2)

**Type:** Data/Content
**File:** [src/content/business/profile.yaml](src/content/business/profile.yaml)

**Add `city_stats` key with 25 cities:**

| City | Population | Factor | Est. Installations |
|------|------------|--------|-------------------|
| Hamilton | 580,000 | 2.5 | 1,450 |
| Kitchener | 270,000 | 2.5 | 675 |
| Oakville | 215,000 | 2.5 | 537 |
| Burlington | 195,000 | 2.5 | 487 |
| Guelph | 145,000 | 3 | 435 |
| ... | ... | ... | ... |

**Formula (from phase-9-content-prep.md):**
- Large city (>100k): 2-3 installations per 1000 residents
- Medium city (20k-100k): 3-4 installations per 1000 residents
- Small town (<20k): 4-5 installations per 1000 residents

**Acceptance Criteria:**
- [ ] city_stats added to profile.yaml
- [ ] All 25 cities included
- [ ] Each entry has: population, installations_estimate
- [ ] `pnpm build` passes

---

### US-005: Homepage Marketing Copy (Task 3)

**Type:** Marketing/Content
**Skills Required:** `/positioning-angles` → `/direct-response-copy`
**Output:** Complete frontmatter for `src/content/locations/ontario.md`

**Section Content Needed (10 sections):**
1. hero (title, subtitle, trustBadgeText, rebateBadge, answeringTeamText)
2. serviceCategories (eyebrow, headline, subtext)
3. expertConsultation (eyebrow, headline, subtext, bullets)
4. whyChoose (eyebrow, headline, subtext, fullServiceBullets, warrantyCard)
5. financing (eyebrow, headline, subtext, rebateCard)
6. serviceArea (eyebrow, headline, subtext)
7. faq (eyebrow, headline, subtext, 4-6 items)
8. blogPreview (eyebrow, headline, subtext)
9. finalCta (eyebrow, headline, subtext, bullets)
10. scrollBanner (text, ctaText)

**Voice Requirements (from profile.yaml):**
- Professional and direct
- English (Canadian)
- NO: "cheap", "budget", emergency/urgency tactics, "3 slots available" scarcity
- YES: Accountability, full-service positioning, premium

**Acceptance Criteria:**
- [ ] All 10 sections have complete copy
- [ ] hero.rebateBadge uses data from rebate-deadlines.md
- [ ] No emergency/urgency language
- [ ] Premium positioning maintained
- [ ] Phone CTA only (no forms/booking)
- [ ] ontario.md updated with final copy
- [ ] `pnpm build` passes

---

## Execution Sequence

```
US-001 (Schema) ─────────────┐
                             ├──► US-005 (Marketing Copy)
US-002 (ontario.md skeleton) ┘         │
                                       │
US-003 (Rebate Research) ──────────────┤
                                       │
US-004 (City Stats) ───────────────────┘
```

**Parallel opportunities:**
- US-003 and US-004 can run in parallel (no dependencies)
- US-001 and US-002 must complete before US-005
- US-003 must complete before US-005 (rebate data needed)

---

## Verification Plan

After all stories complete:

1. **Schema Validation**
   - `pnpm build` passes (639+ pages)
   - ontario.md validates against extended schema
   - 25 existing location files still validate

2. **Content Quality**
   - Review ontario.md for premium positioning
   - Verify NO emergency/urgency language
   - Confirm rebate badge uses real deadline from research

3. **Data Accuracy**
   - Verify rebate programs are current
   - Verify city stats calculations are reasonable

---

## Files to Modify/Create

| File | Action |
|------|--------|
| [src/content/config.ts](src/content/config.ts#L367-385) | MODIFY - extend locations schema |
| src/content/locations/ontario.md | CREATE - homepage content |
| docs/reference/rebate-deadlines.md | CREATE - rebate research |
| [src/content/business/profile.yaml](src/content/business/profile.yaml) | MODIFY - add city_stats |

---

## Post-Completion

After PRD completes, proceed to Phase 9 homepage component build:
```bash
# In new context window
/prd skill   # Create Phase 9 component PRD
/ralph skill # Convert to prd.json
pnpm ralph:20
```
