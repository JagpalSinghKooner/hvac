# Phase 6: Lead Conversion Page Architecture + Content

**Status:** Ready for PRD Creation
**Branch Strategy:** 5 sub-phases (6A through 6E)
**Total Stories:** 21 stories across all sub-phases

---

## Executive Summary

Phase 6 is a comprehensive redesign of service and service-city pages to create proper lead conversion page flows, followed by content generation to fill the new structure.

**Key Insight:** Current pages have content in boxes, but lack a defined lead conversion flow. This phase defines the section structure, updates schemas/templates, then generates content.

**Critical Design Philosophy:**
- **Alternating split layouts** that tell a story as user scrolls
- **NO grids of boxes** for main content sections
- **Horizontal scroll ONLY** for: certifications, brands, testimonials
- **Placeholder images** during development (client adds photos later)

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Page Flows](#page-flows)
3. [Component Designs](#component-designs)
4. [Schema Changes](#schema-changes)
5. [Sections Replaced vs. Staying](#sections-replaced-vs-staying)
6. [Design Requirements](#design-requirements)
7. [Phase Structure](#phase-structure)
8. [Execution Order](#execution-order)
9. [Success Metrics](#success-metrics)

---

## Design Philosophy

### Alternating Split Layouts

The primary design pattern is **alternating split layouts** (text + image) that tell a story as the user scrolls down the page.

**Pattern:**
```
TEXT-LEFT / IMAGE-RIGHT  →  IMAGE-LEFT / TEXT-RIGHT  →  TEXT-LEFT / IMAGE-RIGHT  →  etc.
```

**Page Story Flow (Visual):**
```
┌─────────────────────────────────────────┐
│  HERO (full-width, centered)            │
├─────────────────────────────────────────┤
│  TEXT          │  IMAGE                 │  ← Problem Section
├─────────────────────────────────────────┤
│  IMAGE         │  TEXT                  │  ← Solution Section (alternates)
├─────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐             │  ← LocalGallerySection (3-col grid)
│  │Img1 │  │ Img2│  │ Img3│             │     Grid OK for visual content
│  └─────┘  └─────┘  └─────┘             │
├─────────────────────────────────────────┤
│  TEXT          │  IMAGE                 │  ← Benefits Section (alternates)
├─────────────────────────────────────────┤
│  ←←← PROCESS TIMELINE (horizontal) →→→  │  ← Timeline (stays horizontal)
├─────────────────────────────────────────┤
│  IMAGE         │  TEXT                  │  ← Savings Section (alternates)
├─────────────────────────────────────────┤
│  ←←← TESTIMONIALS CAROUSEL →→→          │  ← Horizontal scroll OK
├─────────────────────────────────────────┤
│  ┌─────┐  ┌─────┐  ┌─────┐             │  ← LocationServicesGrid (3-col grid)
│  │ AC  │  │Heat │  │Furn │             │     Grid OK for navigation
│  └─────┘  └─────┘  └─────┘             │
├─────────────────────────────────────────┤
│  FAQ ACCORDION (full-width)             │
├─────────────────────────────────────────┤
│  ←←← CERTIFICATIONS (horizontal) →→→    │  ← Horizontal scroll OK
├─────────────────────────────────────────┤
│  FINAL CTA (full-width, centered)       │
└─────────────────────────────────────────┘
```

### Key Principles

| Principle | Implementation |
|-----------|----------------|
| **NO boxes for main content** | Replace 4-column grids with split layouts |
| **Horizontal scroll LIMITED** | Only for: certifications, brands, testimonials |
| **Alternating pattern** | Text/image sides flip on each section |
| **Mobile behavior** | Stack vertically on mobile, split on md+ |
| **Images** | Placeholder divs (`bg-muted aspect-video`) during dev |

### User Decisions

- **Page sections needed:** Hero + Local Trust, Problem → Solution, Benefits + Process, Local Proof + Savings
- **Both service AND service-city pages** need redesign
- **Content generation:** Batch by service category (550 pages)
- **Layout style:** Alternating split layouts as primary pattern
- **Images:** Placeholder divs for now - client adds real photos later
- **Benefits section:** REDESIGN from 4-column grid to split layout
- **Savings section:** REDESIGN from centered stack to split layout
- **LocalContextSection:** REPLACE with LocalTrustOpener + LocalProblemSection
- **Execution order:** Architecture (6B) → Strategy (6A) → Content (6C-E)

---

## Page Flows

### Service Pages (`/services/[service]`)

**10 Sections:**

1. **ServiceHeroSection** — Title, phone CTA, trust badges
2. **ProblemSection** ← NEW — What issue does this solve?
3. **SolutionSection** ← NEW — How does B.A.P approach this?
4. **BenefitsGridSection** ← REDESIGNED — 4-6 key benefits (split layout, not grid)
5. **ProcessSection** — Numbered steps (horizontal timeline)
6. **SavingsSection** ← REDESIGNED — Rebates, financing (split layout, not centered)
7. **TestimonialsSection** — Relevant reviews (horizontal carousel)
8. **FAQSection** — Service-specific FAQs (accordion)
9. **RelatedServicesSection** — Same category services (grid OK for navigation)
10. **FinalCTASection** — Phone CTA (full-width)

### Service-City Pages (`/services/[service]-[city]-on`)

**13 Sections:**

1. **ServiceCityHeroSection** — Title, phone CTA, "[City] trusts B.A.P"
2. **LocalTrustOpener** ← NEW — Why B.A.P in this city, local presence
3. **LocalProblemSection** ← NEW — City-specific challenges
4. **LocalSolutionSection** ← NEW — How B.A.P solves it locally
5. **LocalGallerySection** ← NEW — Gallery of completed work in this city (grid OK for visual content)
6. **BenefitsGridSection** ← REDESIGNED — Inherits from service OR local override
7. **ProcessSection** — Inherits from service (horizontal timeline)
8. **LocalProofSection** — City-specific testimonial
9. **LocationServicesGrid** ← NEW — All services available in this city (grid OK)
10. **SavingsSection** ← REDESIGNED — Local rebates, financing
11. **FAQSection** — Service-specific FAQs (accordion)
12. **RelatedServicesSection** — Same service in nearby cities (grid OK)
13. **FinalCTASection** — Phone CTA (full-width)

---

## Component Designs

All new components must be built using `/frontend-design` skill with these specifications.

### 1. ProblemSection.astro

**Position:** 1 (TEXT-LEFT / IMAGE-RIGHT)

**Layout:** Split - Text LEFT, Image Placeholder RIGHT

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24 bg-muted/30]                               │
│                                                             │
│  ┌─────────────────────┐    ┌───────────────────────────┐  │
│  │ H2: "Is Your        │    │                           │  │
│  │     Furnace..."     │    │   [bg-muted aspect-video  │  │
│  │                     │    │    rounded-xl             │  │
│  │ <p> description     │    │    "Furnace Problem       │  │
│  │                     │    │     Image - 800x600"]     │  │
│  │ <ul> painPoints     │    │                           │  │
│  │  • Rising bills     │    └───────────────────────────┘  │
│  │  • Uneven heating   │                                   │
│  │  • Strange noises   │                                   │
│  └─────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface Props {
  headline: string;
  description: string;
  painPoints: string[];
  imageAlt?: string; // For placeholder text
  reversed?: boolean; // Flip image/text sides
}
```

**Tailwind Classes:**
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Split: `grid md:grid-cols-2 gap-8 md:gap-12 items-center`
- Spacing: `py-16 md:py-20 lg:py-24`
- Background: `bg-muted/30`

---

### 2. SolutionSection.astro

**Position:** 2 (IMAGE-LEFT / TEXT-RIGHT) ← ALTERNATES

**Layout:** Split - Image Placeholder LEFT, Text RIGHT

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24]                                           │
│                                                             │
│  ┌───────────────────────────┐   ┌─────────────────────┐   │
│  │                           │   │ H2: "The B.A.P      │   │
│  │   [bg-muted aspect-video  │   │     Approach"       │   │
│  │    rounded-xl             │   │                     │   │
│  │    "Technician            │   │ <p> description     │   │
│  │     Installing - 800x600"]│   │                     │   │
│  │                           │   │ <badges>            │   │
│  └───────────────────────────┘   │  TSSA | 10yr | ...  │   │
│                                  └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface Props {
  headline: string;
  description: string;
  differentiators: string[]; // Rendered as badges
  imageAlt?: string;
  reversed?: boolean;
}
```

**Implementation Notes:**
- `differentiators` rendered as shadcn Badge components
- Use `reversed` prop to flip sides
- Background: `bg-background` (white)

---

### 3. LocalTrustOpener.astro

**Position:** After Hero on service-city pages

**Layout:** Full-width banner, centered text

```
┌─────────────────────────────────────────────────────────────┐
│  [py-20 md:py-28 bg-primary/5 relative]                     │
│                                                             │
│              "Guelph Homeowners Trust B.A.P"                │
│                      [H2, text-3xl md:text-4xl]             │
│                                                             │
│       Serving The Ward, St. Patrick's, Kortright Hills      │
│                  [text-muted-foreground]                    │
│                                                             │
│           ⭐ 4.9 rating  •  500+ local installs             │
│                  [flex gap badges]                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface Props {
  cityName: string;
  neighborhoods?: string[]; // "The Ward, St. Patrick's..."
  rating?: number;
  localStats?: string; // "500+ local installs"
}
```

**Implementation Notes:**
- Full-width banner
- Centered content with `text-center`
- Background: `bg-primary/5`
- Use Badge for rating/stats

---

### 4. LocalProblemSection.astro

**Position:** 3 on service-city pages (TEXT-LEFT / IMAGE-RIGHT)

**Layout:** Same as ProblemSection but with city context

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24 bg-muted/30]                               │
│                                                             │
│  ┌─────────────────────┐    ┌───────────────────────────┐  │
│  │ H2: "Heating        │    │                           │  │
│  │     Challenges in   │    │   [bg-muted aspect-video  │  │
│  │     Guelph"         │    │    "Guelph Heritage       │  │
│  │                     │    │     Home - 800x600"]      │  │
│  │ <p> city-specific   │    │                           │  │
│  │     description     │    └───────────────────────────┘  │
│  │                     │                                   │
│  │ • Heritage homes... │                                   │
│  │ • River humidity... │                                   │
│  └─────────────────────┘                                   │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface Props {
  headline: string;
  description: string;
  citySpecificIssues: string[];
  cityName: string;
  imageAlt?: string;
}
```

**Implementation Notes:**
- Similar to ProblemSection but with city-specific content
- `cityName` used in headline and image alt
- Background: `bg-muted/30`

---

### 5. LocalSolutionSection.astro

**Position:** 4 on service-city pages (IMAGE-LEFT / TEXT-RIGHT) ← ALTERNATES

**Layout:** Same as SolutionSection but with local context

**Props:**
```typescript
interface Props {
  headline: string;
  description: string;
  cityName: string;
  imageAlt?: string;
}
```

**Implementation Notes:**
- Similar to SolutionSection but with city-specific content
- `cityName` integrated into content
- Background: `bg-background` (white)

---

### 5.5. LocalGallerySection.astro

**Position:** 5 on service-city pages (after LocalSolutionSection)

**Layout:** Grid of project images (grid OK for visual content)

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24 bg-muted/30]                               │
│                                                             │
│       H2: "Our Work in [City Name]"                         │
│              [text-center mb-12]                            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ [Card]       │  │ [Card]       │  │ [Card]       │      │
│  │              │  │              │  │              │      │
│  │ <img src=... │  │ <img src=... │  │ <img src=... │      │
│  │   alt="..."  │  │   alt="..."  │  │   alt="..."  │      │
│  │   aspect-    │  │   aspect-    │  │   aspect-    │      │
│  │   video>     │  │   video>     │  │   video>     │      │
│  │              │  │              │  │              │      │
│  │ "Caption..." │  │ "Caption..." │  │ "Caption..." │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ [Card]       │  │ [Card]       │  │ [Card]       │      │
│  │              │  │              │  │              │      │
│  │ <img src=... │  │ <img src=... │  │ <img src=... │      │
│  │   alt="..."  │  │   alt="..."  │  │   alt="..."  │      │
│  │   aspect-    │  │   aspect-    │  │   aspect-    │      │
│  │   video>     │  │   video>     │  │   video>     │      │
│  │              │  │              │  │              │      │
│  │ "Caption..." │  │ "Caption..." │  │ "Caption..." │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
```typescript
interface GalleryImage {
  src: string;           // Image path or URL (from schema)
  alt: string;           // "Furnace installation in Guelph heritage home"
  caption?: string;      // Optional caption below image
}

interface Props {
  cityName: string;           // "Guelph"
  serviceType?: string;       // Optional: "furnace installation" (for service-specific galleries)
  images: GalleryImage[];     // 6-8 images from schema
  headline?: string;          // Default: "Our Work in [City Name]"
  subheadline?: string;       // Optional subtitle
}
```

**Implementation Notes:**
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Use shadcn Card component to wrap each image
- Render actual `<img>` tags with `src` from schema data
- Each image has optional caption below
- Background: `bg-muted/30`
- **Grid is OK here** — this is visual content, not text boxes
- Images aspect ratio: 16:9 (aspect-video class)

**Data Source:**
- Images array passed from frontmatter (`localGalleryImages` field)
- Default headline: `Our Work in ${cityName}`
- Schema initially contains placeholder image paths (e.g., `/placeholder-gallery-1.jpg`)
- Client replaces placeholder image paths with real photo URLs later
- Component always renders `<img>` tags, never hardcoded placeholder divs

---

### 5.6. LocationServicesGrid.astro

**Position:** 8 on service-city pages (after LocalProofSection)

**Layout:** Grid of service cards (grid OK for navigation)

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24 bg-muted/30]                               │
│                                                             │
│       H2: "More Services We Offer in [City Name]"           │
│              [text-center mb-12]                            │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 🔥 Furnace   │  │ ❄️  AC       │  │ 💨 Heat Pump │      │
│  │ Installation │  │ Installation │  │ Installation │      │
│  │              │  │              │  │              │      │
│  │ "Reliable... │  │ "Stay cool...│  │ "Efficient...│      │
│  │              │  │              │  │              │      │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ 🌡️  Boiler   │  │ 💧 Water     │  │ 🏢 Commercial│      │
│  │ Installation │  │ Heater       │  │ HVAC         │      │
│  │              │  │ Replacement  │  │              │      │
│  │ "Warm and... │  │ "Hot water...│  │ "Business... │      │
│  │              │  │              │  │              │      │
│  │ [Learn More] │  │ [Learn More] │  │ [Learn More] │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
│           [View All 22 Services in [City]] →               │
└─────────────────────────────────────────────────────────────┘
```

**Props:**
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

**Implementation Notes:**
- Grid layout: 3 columns desktop, 2 tablet, 1 mobile
- Use shadcn Card for service cards
- Shows top 6-8 priority services (installation-focused)
- Links to `/services/[service]-[location]-on`
- "View All" links to `/locations/[location]` (shows all services)
- Background: `bg-muted/30`
- **Grid is OK here** — this is navigation, not content storytelling

**Data Source:**
- Fetch all services from services collection
- Filter to priority services (installations first)
- Build href by combining service slug + location slug

---

### 6. ServiceBenefitsSection.astro (REDESIGN)

**Position:** 3 on service pages (TEXT-LEFT / IMAGE-RIGHT) ← ALTERNATES

**Current:** 4-column grid of cards (boxes)
**New:** Split layout - Text LEFT, Image RIGHT

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24]                                           │
│                                                             │
│  ┌─────────────────────┐   ┌───────────────────────────┐   │
│  │ H2: "Why Choose     │   │                           │   │
│  │     B.A.P"          │   │   [bg-muted aspect-video  │   │
│  │                     │   │    rounded-xl             │   │
│  │ ✓ TSSA Certified    │   │    "Happy Customer        │   │
│  │   Short description │   │     - 800x600"]           │   │
│  │                     │   │                           │   │
│  │ ✓ 10-Year Warranty  │   │                           │   │
│  │   Short description │   │                           │   │
│  │                     │   │                           │   │
│  │ ✓ Same-Day Quotes   │   │                           │   │
│  │   Short description │   │                           │   │
│  │                     │   │                           │   │
│  │ ✓ Rebate Experts    │   │                           │   │
│  │   Short description │   │                           │   │
│  └─────────────────────┘   └───────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Props:** (same interface, different render)
```typescript
interface Benefit {
  title: string;
  description: string;
  icon: string;
}
interface Props {
  benefits: Benefit[];
  headline?: string;
  imageAlt?: string;
}
```

**Implementation Notes:**
- Replace grid with split layout
- Benefits list on LEFT, image on RIGHT
- Use Check icon from Lucide for checkmarks
- Background: `bg-background` (white)

---

### 7. ServiceSavingsSection.astro (REDESIGN)

**Position:** 4 on service pages (IMAGE-LEFT / TEXT-RIGHT) ← ALTERNATES

**Current:** Centered stacked layout with bullets and card
**New:** Split layout - Image LEFT, Savings content RIGHT

```
┌─────────────────────────────────────────────────────────────┐
│  [py-16 md:py-24 bg-primary/5]                              │
│                                                             │
│  ┌───────────────────────────┐   ┌─────────────────────┐   │
│  │                           │   │ H2: "Save Money     │   │
│  │   [bg-muted aspect-video  │   │     On Your..."     │   │
│  │    rounded-xl             │   │                     │   │
│  │    "Rebate Check          │   │ <p> description     │   │
│  │     - 800x600"]           │   │                     │   │
│  │                           │   │ ✓ Enbridge rebates  │   │
│  │                           │   │ ✓ Up to $5,000 off  │   │
│  │                           │   │ ✓ Financing avail.  │   │
│  │                           │   │                     │   │
│  │                           │   │ [Rebate highlight]  │   │
│  └───────────────────────────┘   └─────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Props:** (same interface, different render)
```typescript
interface Props {
  headline: string;
  description?: string;
  bullets?: string[];
  rebateInfo?: string;
  financingNote?: string;
  imageAlt?: string;
}
```

**Implementation Notes:**
- Replace centered stack with split layout
- Image on LEFT, savings content on RIGHT
- Keep `rebateInfo` as Card highlight
- Background: `bg-primary/5`

---

## Schema Changes

### Service Schema Additions

**File:** `src/content/config.ts`

```typescript
// Add to services collection schema
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

**Example Usage:**
```yaml
---
# src/content/services/furnace-installation.md
problemStatement:
  headline: "Is Your Furnace Struggling to Keep Up?"
  description: "Rising energy bills, uneven heating, and strange noises are signs your furnace may be nearing the end of its life."
  painPoints:
    - "Energy bills increasing every winter"
    - "Some rooms too cold, others too hot"
    - "Strange noises or odors from furnace"
    - "Furnace is 15+ years old"

solutionApproach:
  headline: "The B.A.P Approach to Furnace Installation"
  description: "We don't just replace equipment—we design heating solutions that match your home's specific needs."
  differentiators:
    - "TSSA Certified Technicians"
    - "10-Year Warranty"
    - "Free Load Calculation"
    - "Rebate Assistance"
---
```

---

### Service-City Schema Additions

**File:** `src/content/config.ts`

```typescript
// Add to service-city collection schema
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
  src: z.string(),        // Image path or URL (placeholder initially)
  alt: z.string(),        // Alt text for accessibility
  caption: z.string().optional(), // Optional caption below image
})).optional(),
```

**Example Usage:**
```yaml
---
# src/content/service-city/furnace-installation/guelph.md
localTrustOpener: "Guelph homeowners have trusted B.A.P Heating & Cooling for over 30 years. We've installed over 500 furnaces in The Ward, St. Patrick's, and Kortright Hills neighborhoods."

localProblem:
  headline: "Heating Challenges in Guelph's Heritage Homes"
  description: "Guelph's mix of Victorian homes and modern builds presents unique heating challenges."
  citySpecificIssues:
    - "Heritage homes with narrow basements and unique ductwork"
    - "Higher humidity from Speed River affects comfort"
    - "Older homes often have undersized heating systems"

localSolution:
  headline: "Custom Furnace Solutions for Guelph Homes"
  description: "Our Guelph team specializes in heritage home installations and modern high-efficiency systems."

localSavings:
  headline: "Save on Your Guelph Furnace Installation"
  description: "Guelph residents qualify for multiple rebate programs."
  localRebates: "Enbridge Gas rebates up to $5,000 available for qualifying furnace installations in Guelph."

localGalleryImages:
  - src: "/images/projects/guelph-furnace-1.jpg"
    alt: "Furnace installation in Guelph heritage home"
    caption: "Heritage Home Installation - The Ward"
  - src: "/images/projects/guelph-furnace-2.jpg"
    alt: "Modern furnace system in Guelph home"
    caption: "High-Efficiency System - Kortright Hills"
  - src: "/images/projects/guelph-furnace-3.jpg"
    alt: "Furnace installation completed in Guelph"
    caption: "Complete Installation - St. Patrick's Ward"
  - src: "/images/projects/guelph-furnace-4.jpg"
    alt: "Furnace maintenance in Guelph"
  - src: "/images/projects/guelph-furnace-5.jpg"
    alt: "Boiler installation in Guelph home"
    caption: "Boiler System Upgrade"
  - src: "/images/projects/guelph-furnace-6.jpg"
    alt: "Heat pump installation in Guelph"
    caption: "Heat Pump Install - Modern Build"
---
```

**Note:** Image paths initially point to placeholder images. Client will replace these with actual project photo URLs later. The component always renders `<img>` tags with these `src` values - never hardcoded placeholder divs.

---

## Sections Replaced vs. Staying

### Sections Being Replaced/Redesigned

| Old Section | New Design | Reason |
|-------------|------------|--------|
| **LocalContextSection** | LocalTrustOpener + LocalProblemSection | Structured data instead of markdown blob |
| **ServiceBenefitsSection** | Split layout (TEXT-LEFT / IMAGE-RIGHT) | No more 4-column grid of boxes |
| **ServiceSavingsSection** | Split layout (IMAGE-LEFT / TEXT-RIGHT) | Fits alternating pattern, not centered stack |

### Sections Staying As-Is

| Section | Reason |
|---------|--------|
| **ServiceHeroSection** | Full-width hero works as-is |
| **ServiceProcessSection** | Horizontal timeline is appropriate for process steps |
| **LocalProofSection** | Testimonial quote layout works as-is |
| **FinalCTASection** | Full-width CTA works as-is |
| **RelatedServicesSection** | Grid is appropriate for navigation |
| **ServiceFAQSection** | Accordion is appropriate for FAQs |
| **TestimonialsCarousel** | Horizontal scroll OK for testimonials |
| **CertificationsSection** | Horizontal scroll OK for badges |

---

## Design Requirements

### Technical Requirements

- **Use `/frontend-design` skill** for ALL new section components
- **Match existing design system** (brand colors, typography, spacing from Phase 5)
- **Focus on conversion hierarchy** (CTA visibility, trust signals, social proof)
- **Mobile-first responsive design** (375px, 768px, 1024px breakpoints)

### Tailwind Patterns

| Element | Pattern |
|---------|---------|
| **Split layouts** | `grid md:grid-cols-2 gap-8 md:gap-12 items-center` |
| **Image placeholders** | `<div class="bg-muted aspect-video rounded-xl flex items-center justify-center text-muted-foreground">[Alt text]</div>` |
| **Section spacing** | `py-16 md:py-20 lg:py-24` |
| **Container** | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| **Background alternation** | `bg-background`, `bg-muted/30`, `bg-primary/5` |

### Content Files to Update

**550+ files need content updates:**

- `src/content/services/*.md` - Add new structured fields (22 files)
- `src/content/service-city/**/*.md` - Add new structured fields (550 files)
- `src/content/locations/*.md` - Expand body content (25 files)

---

## ⚠️ MANDATORY COMPONENT DEVELOPMENT WORKFLOW

**CRITICAL RULE: NO WORK WITHOUT SKILLS**

Every component story MUST follow this exact sequence. NO exceptions.

### Per-Component Story Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: SEARCH SHADCN COMPONENTS (shadcn MCP)                  │
│  Required: mcp__shadcn__search_items_in_registries              │
│  Purpose: Find existing components to reuse                     │
│  Example: Search "button", "card", "badge"                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: DESIGN COMPONENT (/frontend-design skill)              │
│  Required: MUST use /frontend-design skill                      │
│  Input:                                                          │
│   - Component specs from this doc (ASCII layout + props)        │
│   - shadcn components to use (from Step 1)                      │
│   - Tailwind patterns (from Design Requirements)                │
│   - NO gradients rule                                           │
│  Output: Complete component implementation plan                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: IMPLEMENT COMPONENT                                    │
│  Required: Use shadcn primitives (Button, Card, Badge, etc.)    │
│  Actions:                                                        │
│   - Create .astro file in src/components/sections/              │
│   - Import shadcn components                                    │
│   - Add new shadcn components via MCP if needed                 │
│   - Use placeholder images: bg-muted aspect-video               │
│  Quality Gate: pnpm build MUST pass                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: TEST VISUALLY (/agent-browser skill)                   │
│  Required: MUST use /agent-browser skill                        │
│  Test scenarios:                                                 │
│   - Mobile (375px): Stack vertically, touch targets ≥ 44px      │
│   - Tablet (768px): Verify split layout starts                  │
│   - Desktop (1024px): Full split layout, proper spacing         │
│   - Verify alternating pattern if multiple sections             │
│   - Check placeholder images render                             │
│  Quality Gate: All viewports render correctly                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: REVIEW ACCESSIBILITY (/web-design-guidelines skill)    │
│  Required: MUST use /web-design-guidelines skill                │
│  Check:                                                          │
│   - WCAG AA color contrast                                      │
│   - Heading hierarchy (h2 → h3)                                 │
│   - Touch targets ≥ 44px                                        │
│   - Keyboard navigation                                         │
│  Quality Gate: Fix ALL Critical/High issues                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: COMMIT & UPDATE PRD                                    │
│  Required:                                                       │
│   - All quality gates passed                                    │
│   - pnpm build passes                                           │
│   - Update prd.json: passes: true                               │
│  Commit: git commit -m "feat: [Story Title]"                    │
└─────────────────────────────────────────────────────────────────┘
```

### shadcn Components to Use

| Section | shadcn Components |
|---------|-------------------|
| ProblemSection | Card (optional wrapper), Badge |
| SolutionSection | Badge (differentiators) |
| LocalTrustOpener | Badge (rating, stats) |
| LocalGallerySection | Card (image wrapper) |
| LocationServicesGrid | Card (service cards), Button (Learn More) |
| ServiceBenefitsSection | Card (rebate highlight), Check icon (Lucide) |
| ServiceSavingsSection | Card (rebate card), Check icon |
| All sections | Button (if CTA needed) |

### Skills Required Per Story Type

| Story Type | Required Skills |
|------------|-----------------|
| Schema update | NONE (TypeScript only, but verify with pnpm build) |
| New component | `/frontend-design` → `/agent-browser` → `/web-design-guidelines` |
| Redesign component | `/frontend-design` → `/agent-browser` → `/web-design-guidelines` |
| Template update | `/frontend-design` (if new layout) → `/agent-browser` → `/web-design-guidelines` |
| Visual verification | `/agent-browser` (all sections) |

---

## Phase Structure

### Phase 6A: Strategy & Voice (2 stories)

**Branch:** `feature/phase-6a-strategy`

**⚠️ MANDATORY MARKETING SKILLS WORKFLOW:**

**CRITICAL**: Start with `/orchestrator` skill to determine the correct skill sequence for marketing tasks.

| ID | Title | Required Skills & Acceptance Criteria |
|----|-------|---------------------------------------|
| **US-001** | **Keyword Research** | 1. **MANDATORY**: Use `/orchestrator` skill first. Provide context: "Need keyword research for HVAC installation services across 22 services and 25 cities in Southern Ontario." 2. Follow orchestrator's recommended skill sequence (likely: `/keyword-research` skill). 3. Input: Business context (B.A.P Heating & Cooling), 22 services, 25 cities, installation focus (NOT emergency/repair). 4. Generate keyword clusters by: service category, location, intent (installation vs repair). 5. Output to: `docs/project/phase-6/keyword-strategy.md`. 6. Include: Primary keywords, secondary keywords, long-tail keywords, search volume estimates, competition analysis. |
| **US-002** | **Brand Voice Definition** | 1. **MANDATORY**: Use `/orchestrator` skill first. Provide context: "Need to define premium but approachable brand voice for affluent homeowners." 2. Follow orchestrator's recommended skill sequence (likely: `/brand-voice` skill in "Build" mode). 3. Input: Identity (family-owned since 1994, Paul Palmer, 30+ years), Audience (affluent homeowners, research-mode), Positioning (accountability, peace of mind, stand behind work). 4. Tone: Premium but NOT stuffy, confident but NOT arrogant, warm but professional. 5. Output to: `docs/project/phase-6/brand-voice.md`. 6. Include: Voice attributes, tone guidelines, do's and don'ts, example copy. |

**Output Files:**
- `docs/project/phase-6/keyword-strategy.md` (from US-001)
- `docs/project/phase-6/brand-voice.md` (from US-002)

**These files feed into Phase 6C, 6D, 6E content generation.**

---

### Phase 6B: Page Architecture Design (15 stories)

**Branch:** `feature/phase-6b-architecture`

This phase defines the lead conversion page flow and updates schemas/templates.

| ID | Title | Acceptance Criteria |
|----|-------|---------------------|
| **US-000** | **Extract Architecture Doc** | ✅ COMPLETE. Create PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md in root with full specs. Update HOMEPAGE-REDESIGN-FULL-AND-FINAL.md Phase 7 to reference it. `pnpm build` passes. |
| **US-001** | **Update Service Schema** | 1. Add `problemStatement`, `solutionApproach` to services collection in `src/content/config.ts` with Zod schema. 2. `pnpm build` passes (validates schema). |
| **US-002** | **Update Service-City Schema** | 1. Add `localTrustOpener`, `localProblem`, `localSolution`, `localBenefits`, `localSavings`, `localGalleryImages` to service-city collection in `src/content/config.ts`. 2. `localGalleryImages` is array of objects with `src` (string), `alt` (string), `caption` (optional string). 3. `pnpm build` passes. |
| **US-003** | **Create ProblemSection Component** | 1. Search shadcn: `mcp__shadcn__search_items_in_registries` for "badge", "card". 2. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 136-158. 3. Implement in `src/components/sections/ProblemSection.astro` using shadcn components. 4. Use placeholder: `bg-muted aspect-video rounded-xl`. 5. **MANDATORY**: Use `/agent-browser` skill to test at 375px, 768px, 1024px. 6. **MANDATORY**: Use `/web-design-guidelines` skill for accessibility review. Fix Critical/High issues. 7. `pnpm build` passes. |
| **US-004** | **Create SolutionSection Component** | 1. Search shadcn for "badge" (differentiators). 2. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 179-210. 3. Implement with `reversed` prop for image-left/text-right. 4. Import shadcn Badge for differentiators. 5. **MANDATORY**: Use `/agent-browser` skill (375px, 768px, 1024px). 6. **MANDATORY**: Use `/web-design-guidelines` skill. Fix issues. 7. `pnpm build` passes. |
| **US-005** | **Create LocalTrustOpener Component** | 1. Search shadcn for "badge". 2. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 219-256. 3. Implement full-width banner with `bg-primary/5`. 4. Use shadcn Badge for rating/stats. 5. **MANDATORY**: Use `/agent-browser` skill (all viewports). 6. **MANDATORY**: Use `/web-design-guidelines` skill. 7. `pnpm build` passes. |
| **US-006** | **Create LocalProblemSection Component** | 1. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 259-298 (similar to ProblemSection with city context). 2. Implement with `cityName` prop. 3. **MANDATORY**: Use `/agent-browser` skill. 4. **MANDATORY**: Use `/web-design-guidelines` skill. 5. `pnpm build` passes. |
| **US-007** | **Create LocalSolutionSection Component** | 1. **MANDATORY**: Use `/frontend-design` skill (similar to SolutionSection, lines 300-321). 2. Implement with `cityName` integration. 3. **MANDATORY**: Use `/agent-browser` skill. 4. **MANDATORY**: Use `/web-design-guidelines` skill. 5. `pnpm build` passes. |
| **US-008** | **Create LocalGallerySection Component** | 1. Search shadcn for "card". 2. **MANDATORY**: Use `/frontend-design` skill with grid layout (lines 330-390). 3. Implement in `src/components/sections/LocalGallerySection.astro`. 4. Props: cityName, serviceType, images array (GalleryImage with `src`, `alt`, `caption`), headline, subheadline. 5. Grid: 3 cols desktop, 2 tablet, 1 mobile. Use shadcn Card to wrap each image. 6. Render actual `<img>` tags with `src` from schema data (NOT hardcoded placeholder divs). 7. Each image has optional caption below. 8. Background: `bg-muted/30`. 9. Images aspect ratio: aspect-video class. 10. **MANDATORY**: Use `/agent-browser` skill (grid responsive at all viewports). 11. **MANDATORY**: Use `/web-design-guidelines` skill. 12. `pnpm build` passes. |
| **US-009** | **Create LocationServicesGrid Component** | 1. Search shadcn for "card", "button". 2. **MANDATORY**: Use `/frontend-design` skill with grid layout (lines 392-451). 3. Implement in `src/components/sections/LocationServicesGrid.astro`. 4. Props: cityName, locationSlug, services array, allServicesCount. 5. Grid: 3 cols desktop, 2 tablet, 1 mobile. Use shadcn Card for service cards. 6. Fetch top 6-8 priority services (installation-focused). 7. Link to `/services/[service]-[location]-on`. 8. "View All" links to `/locations/[location]`. 9. Background: `bg-muted/30`. 10. **MANDATORY**: Use `/agent-browser` skill (grid responsive at all viewports). 11. **MANDATORY**: Use `/web-design-guidelines` skill. 12. `pnpm build` passes. |
| **US-010** | **Redesign ServiceBenefitsSection** | 1. Read current: `src/components/sections/ServiceBenefitsSection.astro`. 2. Search shadcn for "check" icon (Lucide). 3. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 454-503. Convert 4-column grid → split layout (TEXT-LEFT / IMAGE-RIGHT). 4. Keep same Props interface. 5. Use Lucide Check icon for checkmarks. 6. **MANDATORY**: Use `/agent-browser` skill. 7. **MANDATORY**: Use `/web-design-guidelines` skill. 8. `pnpm build` passes. |
| **US-011** | **Redesign ServiceSavingsSection** | 1. Read current: `src/components/sections/ServiceSavingsSection.astro`. 2. **MANDATORY**: Use `/frontend-design` skill with ASCII layout from line 506-545. Convert centered stack → split layout (IMAGE-LEFT / TEXT-RIGHT). 3. Keep same Props interface, add `imageAlt`. 4. Keep rebateInfo as Card highlight. 5. Use `bg-primary/5` background. 6. **MANDATORY**: Use `/agent-browser` skill. 7. **MANDATORY**: Use `/web-design-guidelines` skill. 8. `pnpm build` passes. |
| **US-012** | **Update [service].astro Template** | 1. Read: `src/pages/services/[service].astro`. 2. **MANDATORY**: Use `/frontend-design` skill (if new layout). 3. Add ProblemSection → SolutionSection flow with alternating layout. 4. Integrate all new sections from US-003 to US-011. 5. Verify alternating background pattern. 6. **MANDATORY**: Use `/agent-browser` skill to verify full page flow. 7. **MANDATORY**: Use `/web-design-guidelines` skill. 8. `pnpm build` passes. |
| **US-013** | **Update [serviceLocation].astro Template** | 1. Read: `src/pages/services/[serviceLocation].astro`. 2. **MANDATORY**: Use `/frontend-design` skill (if new layout). 3. Replace LocalContextSection with LocalTrustOpener + LocalProblemSection + LocalSolutionSection. 4. Add LocalGallerySection after LocalSolutionSection (position 5). 5. Add LocationServicesGrid after LocalProofSection (position 9). 6. Integrate alternating flow. 7. Pass cityName, locationSlug to both grid components. 8. **MANDATORY**: Use `/agent-browser` skill to verify example page (e.g., furnace-installation-guelph-on). 9. **MANDATORY**: Use `/web-design-guidelines` skill. 10. `pnpm build` passes. |
| **US-014** | **Visual Verification (All Sections)** | 1. **MANDATORY**: Use `/agent-browser` skill. 2. Test ALL new sections: ProblemSection, SolutionSection, LocalTrustOpener, LocalProblemSection, LocalSolutionSection, LocalGallerySection, LocationServicesGrid, ServiceBenefitsSection (redesigned), ServiceSavingsSection (redesigned). 3. Verify at 375px (mobile: stack vertically, 1-col grid), 768px (tablet: split starts, 2-col grid), 1024px (desktop: full split, 3-col grid). 4. Verify alternating pattern is visually clear across full page. 5. Check placeholder images render correctly in LocalGallerySection. 6. Check LocationServicesGrid: card links work, grid responsive, "View All" link works. 7. Verify touch targets ≥ 44px. 8. **MANDATORY**: Use `/web-design-guidelines` skill for final accessibility audit. Fix all remaining issues. |

**Critical Files to Modify:**

**Schemas:**
- `src/content/config.ts`

**Templates:**
- `src/pages/services/[service].astro`
- `src/pages/services/[serviceLocation].astro`

**New Components:**
- `src/components/sections/ProblemSection.astro`
- `src/components/sections/SolutionSection.astro`
- `src/components/sections/LocalTrustOpener.astro`
- `src/components/sections/LocalProblemSection.astro`
- `src/components/sections/LocalSolutionSection.astro`
- `src/components/sections/LocalGallerySection.astro`
- `src/components/sections/LocationServicesGrid.astro`

**Redesigned Components:**
- `src/components/sections/ServiceBenefitsSection.astro`
- `src/components/sections/ServiceSavingsSection.astro`

---

### Phase 6C: Service Content (3 stories)

**Branch:** `feature/phase-6c-services`

**⚠️ MANDATORY SKILLS FOR ALL CONTENT GENERATION:**

Generate content for 22 service pages with new structure.

| ID | Title | Required Skills & Acceptance Criteria |
|----|-------|---------------------------------------|
| **US-001** | **Service Content - Heating (9 services)** | 1. **MANDATORY**: Use `/seo-content` skill for EACH service. 2. Input: Service name, keywords from Phase 6A, brand voice. 3. Generate: problemStatement (headline, description, painPoints), solutionApproach (headline, description, differentiators), benefits (4-6 with icons), process steps, savings/rebates. 4. Update 9 MD files: `src/content/services/furnace-installation.md`, furnace-repair, furnace-maintenance, boiler-installation, boiler-repair, boiler-maintenance, heat-pump-installation, heat-pump-repair, heat-pump-maintenance. 5. `pnpm build` passes. |
| **US-002** | **Service Content - Cooling + IAQ (7 services)** | 1. **MANDATORY**: Use `/seo-content` skill for EACH service. 2. Generate same fields as US-001. 3. Update 7 MD files: AC installation/repair/maintenance, ductless, dehumidifiers, humidifiers, HRV/ERV, air-filtration. 4. `pnpm build` passes. |
| **US-003** | **Service Content - Water + Commercial (6 services)** | 1. **MANDATORY**: Use `/seo-content` skill for EACH service. 2. Generate same fields as US-001. 3. Update 6 MD files: tank/tankless water heaters, commercial HVAC, rooftop units, maintenance plans. 4. `pnpm build` passes. |

**Content per service (ALL generated via /seo-content skill):**
- Problem statement (headline, description, painPoints array)
- Solution approach (headline, description, differentiators array)
- 4-6 benefits with icons
- Process steps (numbered)
- Savings/rebate info
- FAQ answers

---

### Phase 6D: Service-City Content (7 stories)

**Branch:** `feature/phase-6d-service-city`

**⚠️ MANDATORY SKILLS FOR ALL SERVICE-CITY CONTENT:**

Generate content for 550 service-city pages, batched by service category.

| ID | Title | Required Skills & Acceptance Criteria |
|----|-------|---------------------------------------|
| **US-001** | **Service-City - Furnace Services** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 75 pages. 2. Input: Service slug, city name, localContext from locations collection, keywords. 3. Generate: localTrustOpener (why B.A.P in [City]), localProblem (headline, description, citySpecificIssues), localSolution (headline, description), localSavings (headline, description, localRebates). 4. Update 75 MD files in `src/content/service-city/furnace-installation/*.md`, `furnace-repair/*.md`, `furnace-maintenance/*.md`. 5. **CRITICAL**: NO city-swapping. Each page 800+ words, 80%+ unique. 6. `pnpm build` passes. |
| **US-002** | **Service-City - Heat Pump Services** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 75 pages. 2. Same fields as US-001. 3. Update heat-pump-installation, heat-pump-repair, heat-pump-maintenance across 25 cities. 4. 800+ words, 80%+ unique, NO city-swapping. 5. `pnpm build` passes. |
| **US-003** | **Service-City - Boiler Services** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 75 pages. 2. Same fields as US-001. 3. Update boiler-installation, boiler-repair, boiler-maintenance across 25 cities. 4. 800+ words, 80%+ unique. 5. `pnpm build` passes. |
| **US-004** | **Service-City - AC Services** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 75 pages. 2. Same fields as US-001. 3. Update AC installation/repair/maintenance across 25 cities. 4. 800+ words, 80%+ unique. 5. `pnpm build` passes. |
| **US-005** | **Service-City - IAQ Services** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 125 pages. 2. Same fields as US-001. 3. Update 5 IAQ services across 25 cities. 4. 800+ words, 80%+ unique. 5. `pnpm build` passes. |
| **US-006** | **Service-City - Water + Commercial** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 125 pages. 2. Same fields as US-001. 3. Update water heating + commercial services across 25 cities. 4. 800+ words, 80%+ unique. 5. `pnpm build` passes. |
| **US-007** | **Content Uniqueness Audit** | 1. Use scripting (Bash) to check content uniqueness across all 550 pages. 2. Verify 80%+ unique content via text similarity check. 3. Manually spot-check 10 random pages for city-swapping. 4. Fix any pages flagged for low uniqueness. 5. Document results in `docs/project/phase-6/content-uniqueness-audit.md`. |

**Content per service-city page (ALL via /seo-content skill):**
- Local trust opener (why B.A.P in [City], 100-150 words)
- Local problem (headline, description, citySpecificIssues array)
- Local solution (headline, description, how B.A.P solves it locally)
- Local proof (testimonial from that city - may reference existing reviews collection)
- Local savings (city-specific rebates, financing)

**CRITICAL RULE:** NO city-swapping. Each page must have genuinely unique content with city-specific details.

---

### Phase 6E: Location Content + Technical SEO (5 stories)

**Branch:** `feature/phase-6e-locations-seo`

**⚠️ MANDATORY SKILLS FOR CONTENT & SEO:**

| ID | Title | Required Skills & Acceptance Criteria |
|----|-------|---------------------------------------|
| **US-001** | **Location Content Expansion** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 25 location pages. 2. Input: City name, region, localContext, keywords. 3. Expand body content from ~250 words → 1000+ words. 4. Include: City overview, neighborhoods served, local HVAC challenges, why B.A.P serves this area, service highlights. 5. Update 25 MD files in `src/content/locations/*.md`. 6. `pnpm build` passes. |
| **US-002** | **Blog Expansion** | 1. **MANDATORY**: Use `/seo-content` skill for EACH of 4+ blog posts. 2. Topics: "Enbridge Rebates 2026 Guide", "Commercial HVAC Maintenance", "10-Year Warranty Explained", "Seasonal HVAC Tips". 3. Each post: 1500+ words, SEO-optimized, internal links to relevant services. 4. Create MD files in `src/content/blog/`. 5. `pnpm build` passes. |
| **US-003** | **Schema Markup - Service Pages** | 1. Add Service schema (schema.org/Service) to `src/pages/services/[service].astro`. 2. Include: name, provider (LocalBusiness), areaServed, description. 3. Use data from service frontmatter. 4. Validate with Google Rich Results Test. 5. `pnpm build` passes. |
| **US-004** | **Schema Markup - Article + Breadcrumb** | 1. Add Article schema to `src/pages/blog/[slug].astro`. 2. Add BreadcrumbList schema to BaseLayout.astro (all pages). 3. Use Astro.url to build breadcrumb path. 4. Validate with Google Rich Results Test. 5. `pnpm build` passes. |
| **US-005** | **Meta Description Audit** | 1. Use Bash script to check all 628+ pages for meta descriptions. 2. Verify: 150-160 chars, includes target keyword, compelling CTA. 3. Fix missing/poor descriptions using `/direct-response-copy` skill. 4. Document results in `docs/project/phase-6/meta-description-audit.md`. 5. `pnpm build` passes. |

---

## Execution Order

### UPDATED: Architecture First for Faster Visual Results

**New execution order prioritizes visual structure:**

1. **Phase 6B** (architecture) — Schemas + components + templates FIRST
   - See UI changes immediately
   - Create structure for content to fill
   - 15 stories (was 13, added LocalGallerySection + LocationServicesGrid)

2. **Phase 6A** (strategy) — Keyword research + brand voice SECOND
   - Informs content writing style
   - Can reference the visual structure
   - 2 stories

3. **Phase 6C** (service content) — After both 6A and 6B complete
   - 3 stories

4. **Phase 6D** (service-city content) — After services complete
   - 7 stories

5. **Phase 6E** (locations + SEO) — Can run parallel with 6D
   - 5 stories

**Total:** 32 stories across 5 sub-phases (15 in 6B, 2 in 6A, 3 in 6C, 7 in 6D, 5 in 6E)

---

## Verification

### After Each Sub-Phase

- [ ] `pnpm build` passes with all pages (628+)
- [ ] New sections render correctly in browser
- [ ] Content meets word count requirements
- [ ] Schema validates with new fields
- [ ] `/agent-browser` skill verifies visual appearance

### Visual Testing Checklist

Use `/agent-browser` skill to verify:

- [ ] Split layouts render correctly at 375px (mobile)
- [ ] Split layouts render correctly at 768px (tablet)
- [ ] Split layouts render correctly at 1024px (desktop)
- [ ] Alternating pattern is visually clear
- [ ] Images stack on mobile, split on desktop
- [ ] Text is readable at all breakpoints
- [ ] CTAs are visible and clickable

---

## Success Metrics

| Metric | Target |
|--------|--------|
| **Service pages** | 22 pages with full lead conversion flow |
| **Service-city pages** | 550 pages with 800+ unique words, city-specific content |
| **Location pages** | 25 pages with 1000+ words |
| **Schema** | Service, Article, BreadcrumbList implemented |
| **Build** | Still passes with 628+ pages |
| **Conversion** | Clear CTA flow on every page |
| **Content uniqueness** | 80%+ unique content, NO city-swapping |

---

## Next Steps

### Immediate Action (US-000)

1. ✅ Create this document (`PHASE-6-LEAD-CONVERSION-ARCHITECTURE.md`)
2. ⏳ Update `HOMEPAGE-REDESIGN-FULL-AND-FINAL.md` Phase 7 section to reference this doc
3. ⏳ Create PRD for Phase 6B using `/prd` skill
4. ⏳ Convert PRD to prd.json using `/ralph` skill
5. ⏳ Execute via `pnpm ralph:15` (13 stories + buffer)

---

**Document Status:** Complete — Ready for Implementation
**Created:** January 21, 2026
**Last Updated:** January 21, 2026
