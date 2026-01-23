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

---

## Header Restructure (CRITICAL)

**Purpose:** Persistent navigation + primary CTA with restructured service discovery

### Desktop Structure
```
[Logo] | Heating | Cooling | Air Quality | Water Heating | More▼ | Locations | [📞 Phone]
                                                          │
                                                          └── Commercial
                                                              Maintenance Plans
```

### Mobile Structure
```
[Logo] [☰ Menu] [📞 Phone]
         │
         └── Heating
             Cooling
             Air Quality
             Water Heating
             Commercial
             Maintenance Plans
             ───────────────
             Locations
             About
             Contact
```

### Key Changes from Current
- 4 main service categories as **direct links** (not dropdown)
- "More" dropdown for Commercial + Maintenance
- "Locations" as single link → /locations page
- Phone CTA always visible — number from `profile.yaml`
- **REMOVED:** "Since 1994" badge — No longevity messaging
- **MOVED TO FOOTER:** About, Financing, Blog

### Phone CTA Specification
- **Desktop:** Shows phone from `{businessProfile.contact.phone_display}` — e.g., "📞 (519) 835-4858"
- **Mobile:** Phone icon only (24×24), taps to `tel:{businessProfile.contact.phone}`
- **NEVER hardcode phone number** — always from profile.yaml

### shadcn Components
| Component | Usage |
|-----------|-------|
| Button | Phone CTA |
| Sheet | Mobile hamburger menu |
| NavigationMenu | Optional for mega menu |

### Visual Structure
```
┌─[DESKTOP 1024px+]───────────────────────────────────────────────────┐
│ [Logo]  Heating  Cooling  Air Quality  Water Heating  More▼  Locations  [📞 Call] │
└─────────────────────────────────────────────────────────────────────┘

┌─[MOBILE <1024px]────────────────────────────────────────────────────┐
│ [Logo]                                            [☰]  [📞]         │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Specification
```
LAYOUT: Full-width sticky bar
COMPONENTS:
├── Container (max-w-7xl, centered)
├── Logo (custom, links to /)
├── Nav Links (custom or NavigationMenu)
│   ├── Direct links: Heating, Cooling, Air Quality, Water Heating
│   └── Dropdown (More): Commercial, Maintenance
├── Locations link
└── Button (variant="default") — Phone CTA

MOBILE:
├── Logo
├── Sheet (hamburger menu)
└── Button (icon only) — Phone CTA
```

---

## Footer Restructure (CRITICAL)

**Purpose:** Comprehensive navigation for those who scroll to bottom

### Footer Structure
```
┌─────────────────────────────────────────────────────────────────────┐
│ Services              Locations              Company                │
│ • Heating             • Guelph               • About                │
│ • Cooling             • Kitchener            • Reviews              │
│ • Air Quality         • Milton               • Blog                 │
│ • Water Heating       • Hamilton             • Contact              │
│ • Commercial          • Cambridge            • FAQs                 │
│                       • Waterloo             • Financing            │
│                       • [View All →]         • Rebates              │
├─────────────────────────────────────────────────────────────────────┤
│ [TSSA Logo] [BBB A+] [Google 4.8★]                                 │
├─────────────────────────────────────────────────────────────────────┤
│ {businessProfile.phone} | {businessProfile.email} | {address}      │
├─────────────────────────────────────────────────────────────────────┤
│ [Instagram] [Facebook]         © 2026 B.A.P Heating & Cooling      │
│                                Privacy Policy | Terms               │
└─────────────────────────────────────────────────────────────────────┘
```

### Verified Pages for Footer Links
- `/about` ✓
- `/blog` ✓
- `/contact` ✓
- `/faqs` ✓
- `/financing` ✓
- `/rebates` ✓
- `/reviews` ✓
- `/locations` ✓
- `/services/category/[category]` ✓

### Pages to DELETE (Conflict with Premium Positioning)
- `/careers` — Not actively hiring
- `/emergency-service` — Conflicts with premium positioning

### shadcn Components
| Component | Usage |
|-----------|-------|
| Button | "Call Now" CTA |
| Separator | Section dividers |

### Component Specification
```
LAYOUT: 4-column grid + bottom bar
COMPONENTS:
├── Footer container (bg-foreground, text-background, py-12)
├── Container (max-w-6xl)
├── Grid (grid-cols-2 md:grid-cols-4, gap-8)
│   ├── Column 1: Services (5 links)
│   ├── Column 2: Locations (6 links + "View All")
│   ├── Column 3: Company (7 links)
│   └── Column 4: Contact (phone, email, address, CTA)
├── Separator
├── Trust badges row (flex, justify-center, gap-6)
│   └── img × 3 (TSSA, BBB, Google logos)
├── Separator
└── Bottom bar (flex, justify-between, py-4)
    ├── Social icons (Instagram, Facebook)
    ├── Copyright text
    └── Legal links (Privacy, Terms)

COLORS: bg-foreground (dark), text-background (light)
MOBILE: 2 columns, stacked
```

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

---

## Three-Tier Fallback Architecture (CRITICAL)

This architecture enables homepage and location pages to share the same template with graceful content fallbacks.

```
┌─────────────────────────────────────────────────────────────────┐
│  TIER 1: Location-Specific Content                              │
│  Source: locations/[city].md frontmatter                        │
│  Example: hero.title from guelph.md                             │
│  Priority: HIGHEST — always used if present                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (if field missing or empty)
┌─────────────────────────────────────────────────────────────────┐
│  TIER 2: Homepage/Global Defaults                               │
│  Source: ontario.md (isLandingPage: true) OR component defaults │
│  Example: hero.title = "Southern Ontario's Full-Service..."     │
│  Priority: MEDIUM — used when Tier 1 missing                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼ (if still missing)
┌─────────────────────────────────────────────────────────────────┐
│  TIER 3: Business Profile                                       │
│  Source: src/content/business/profile.yaml                      │
│  Example: contact.phone_display, reputation.google_rating       │
│  Priority: LOWEST — immutable business data                     │
└─────────────────────────────────────────────────────────────────┘
```

### Implementation Pattern

**Hero Section (STANDALONE — uses `title` not `headline`):**
```typescript
// CRITICAL: Hero is STANDALONE — does NOT use SectionHeader component
// Hero uses 'title' for H1 (not 'headline' like other sections)
const displayTitle = locationData?.hero?.title     // Tier 1
  || homepageDefaults?.hero?.title                 // Tier 2
  || "Southern Ontario's Full-Service HVAC Contractor";  // Fallback (should never reach)
```

**Other Sections (uses SectionHeader with eyebrow/headline/subtext):**
```typescript
// Other sections use 'headline' for H2 — different from Hero's H1
const expertConsultation = {
  eyebrow: locationData?.expertConsultation?.eyebrow       // Tier 1
    || homepageDefaults?.expertConsultation?.eyebrow       // Tier 2
    || "Free Consultation",                                // Fallback
  headline: locationData?.expertConsultation?.headline
    || homepageDefaults?.expertConsultation?.headline
    || "Not Sure What You Need?",
  subtext: locationData?.expertConsultation?.subtext
    || homepageDefaults?.expertConsultation?.subtext
    || "Talk to our experts for guidance — no pressure, no obligation.",
};
```

**Business Profile Data (Tier 3 — always available):**
```typescript
// Business profile data is immutable — NEVER duplicate in schema
const googleRating = businessProfile.data.reputation.google_rating;
const reviewCount = businessProfile.data.reputation.review_count;
const phone = businessProfile.data.contact.phone_display;
```

### Key Rule
- **Stats (reviewCount, googleRating) come from profile.yaml** — NOT from location schema
- Components read profile.yaml directly for business data
- DO NOT duplicate profile.yaml values in ontario.md or location schemas

---

## Collection Filtering Logic

### Testimonials (reviews collection)
```typescript
// 1. Try location-specific reviews first
const localReviews = allReviews.filter(r =>
  r.data.citySlug === location.slug && r.data.status === 'live'
);

// 2. If fewer than 3, backfill with global
const globalReviews = allReviews.filter(r => r.data.status === 'live');
const displayReviews = localReviews.length >= 3
  ? localReviews.slice(0, 9)
  : [...localReviews, ...globalReviews.filter(r => !localReviews.includes(r))].slice(0, 9);
```

### Blog Posts
```typescript
// For location pages, prioritize tagged posts
const localPosts = allPosts.filter(p => p.data.locations?.includes(location.slug));
const globalPosts = allPosts.filter(p => !localPosts.includes(p));
const displayPosts = [...localPosts, ...globalPosts].slice(0, 3);
```

### FAQs (Inline Items Only — NO itemRefs pattern)
```typescript
// FAQs are ALWAYS inline in location frontmatter
// NO itemRefs pattern — simpler, no collection dependency
const faqs = locationData?.faq?.items    // Tier 1: Location-specific inline FAQs
  || homepageDefaults?.faq?.items        // Tier 2: ontario.md defaults
  || [];                                  // Fallback: empty (section hides)

// NOTE: If faq.items is empty array, section hides (see Edge Case table)
```

### Service Area
```typescript
// Homepage shows all, location pages show same region only
const displayRegions = locationData?.serviceArea?.showAllRegions !== false
  ? allRegions
  : allRegions.filter(r => r.name === location.data.region);
```

### Location Listings (Filter out ontario.md)
```typescript
// In ServiceAreaSection, Footer, Locations page, etc.
const displayLocations = allLocations.filter(loc => !loc.data.isLandingPage);

// For homepage template
const homepageEntry = allLocations.find(loc => loc.data.isLandingPage);
```

---

## Edge Case Handling Rules

| Section | When Content Empty | Behavior |
|---------|-------------------|----------|
| Hero | **NEVER HIDE** | Use Tier 2/3 defaults |
| Brand Logo Ticker | **NEVER HIDE** | Logos from profile.yaml brands array |
| Service Categories | **NEVER HIDE** | Auto-fetch from services collection |
| Expert Consultation | **NEVER HIDE** | Use Tier 2 defaults |
| Why Choose B.A.P | **NEVER HIDE** | Use Tier 2 defaults. Stats from profile.yaml |
| Testimonials | **HIDE** if zero reviews | Check `reviews.length > 0` |
| Project Gallery | **HIDE** if zero projects | Check `projects.length > 0` |
| Financing | **NEVER HIDE** | Use Tier 2 defaults |
| Service Area | **NEVER HIDE** | Map from profile.yaml mapEmbed |
| FAQ | **HIDE** if zero FAQs | Check `faqs.length > 0`. Inline items ONLY |
| Blog Preview | **HIDE** if zero posts | Check `posts.length > 0` |
| Final CTA | **NEVER HIDE** | Use Tier 2 defaults. SectionHeader variant="dark" |
| Scroll Banner | Configurable | Check `scrollBanner.enabled`. sessionStorage persistence |

### Missing Images Pattern
```typescript
{imageSrc ? (
  <img src={imageSrc} alt={title} class="aspect-video object-cover" />
) : (
  <div class="bg-muted aspect-video flex items-center justify-center">
    <span class="text-muted-foreground text-sm">{placeholder}</span>
  </div>
)}
```

---

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

#### Mobile CTA Placement (CRITICAL for CRO)

**Thumb Zone Requirements:**
- Full-width button positioned in **bottom 40% of hero**
- Touch target ≥ **48px height** (use `size="lg"` or `h-14`)
- Phone number visible **below** button
- "Live answering team" reassurance text below number

**Mobile Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  [Hero Image - 40% height]                                          │
│                                                                     │
│  H1: Full-Service HVAC                                              │
│      Contractor                                                     │
│                                                                     │
│  P: One call handles everything...                                  │
│                                                                     │
│  [Badge] [Badge]                                                    │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  [FULL-WIDTH CTA BUTTON — THUMB ZONE]                        │   │
│  │  📞 Call for Free Consultation                               │   │
│  │  h-14 (56px) minimum touch target                            │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  (519) 835-4858                                                     │
│  "Call anytime — live answering team"                               │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Notes:**
- Hero does NOT use SectionHeader — custom H1 layout
- Uses `title` field for H1 (not `headline` like other sections)
- H1 MUST contain "HVAC Contractor" (GBP category match)
- Phone number ALWAYS from `businessProfile.contact.phone_display`

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

#### ScrollBanner Implementation Details (CRITICAL)

**Purpose:** Replaces exit intent modal (aggressive UX conflicts with premium positioning)

**Trigger Behavior:**
- Appears at **75% scroll depth**
- Uses `sessionStorage` for persistence (key: `bap-scroll-banner-dismissed`)
- Resets on new session (tab close)
- **Graceful fallback:** Shows banner if sessionStorage unavailable

**Animation:**
- 300ms slide up from bottom
- Dismissible with X button

**Visual Structure:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  {scrollBanner.text}                    [📞 {scrollBanner.ctaText}] [✕] │
│  "Questions? Call anytime — live answering team"   "Call Now"           │
└─────────────────────────────────────────────────────────────────────┘
```

**Implementation Pattern:**
```typescript
// React client component
const [visible, setVisible] = useState(false);
const [dismissed, setDismissed] = useState(false);

useEffect(() => {
  // Check sessionStorage on mount
  const wasDismissed = sessionStorage.getItem('bap-scroll-banner-dismissed');
  if (wasDismissed) setDismissed(true);

  const handleScroll = () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent >= 75 && !dismissed) setVisible(true);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [dismissed]);

const handleDismiss = () => {
  setVisible(false);
  setDismissed(true);
  try {
    sessionStorage.setItem('bap-scroll-banner-dismissed', 'true');
  } catch (e) {
    // sessionStorage unavailable, banner will show again
  }
};
```

**Mobile vs Desktop:**
- **Desktop:** Full text + button inline
- **Mobile:** Stacked layout, full-width button

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

## Background Colors Per Section

**Visual rhythm:** Alternating backgrounds create section separation without heavy borders.

| # | Section | Background Token | Notes |
|---|---------|-----------------|-------|
| 1 | Header | `bg-background` | Sticky, white |
| 2 | Hero | `bg-muted` | Light gray |
| 3 | Brand Logo Ticker | `bg-background` | White |
| 4 | Service Categories | `bg-muted` | Light gray |
| 5 | Expert Consultation | `bg-primary/5` | Subtle accent |
| 6 | Why Choose | `bg-background` | White |
| 7 | Testimonials | `bg-muted` | Light gray |
| 8 | Project Gallery | `bg-background` | White |
| 9 | Financing | `bg-background` | White |
| 10 | Service Area | `bg-muted` | Light gray |
| 11 | FAQ | `bg-background` | White |
| 12 | Blog Preview | `bg-muted` | Light gray |
| 13 | Final CTA | `bg-primary` | Brand blue (dark variant) |
| 14 | Footer | `bg-foreground` | Dark (inverted) |
| — | Scroll Banner | `bg-background` | White with shadow |

**CSS Token Reference (from globals.css):**
- `--primary` → Brand blue, CTAs
- `--muted` → Light gray section backgrounds
- `--background` → White page background
- `--foreground` → Dark text / footer background

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

## Mandatory Skill Usage (CRITICAL)

### The Orchestrator Rule (NEVER SKIP)

**ALL marketing/content tasks MUST go through `/orchestrator` first.**

```
┌─────────────────────────────────────────────────────────────────┐
│  WRONG: Directly invoke marketing skills                        │
│  ───────────────────────────────────────────────────────────── │
│  "Write landing page copy" → directly writes copy              │
│  "Create headlines" → directly runs /keyword-research           │
│                                                                 │
│  RIGHT: Orchestrator routes to correct skill sequence           │
│  ───────────────────────────────────────────────────────────── │
│  "Write landing page copy" →                                    │
│    /orchestrator →                                              │
│    /positioning-angles →                                        │
│    /brand-voice →                                              │
│    /direct-response-copy                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Marketing Skill Flow (STRICT ORDER):**
```
/orchestrator → /positioning-angles → /keyword-research → /brand-voice → /seo-content → /direct-response-copy
```

**Why This Matters:**
- Orchestrator diagnoses the actual need (not what user thinks they need)
- Routes to correct skill sequence (skips unnecessary skills)
- Ensures brand voice consistency across all content
- Prevents "orphan content" that doesn't fit the positioning

### Development Skill Chain (ALWAYS follow this order)

| Step | Skill | Purpose |
|------|-------|---------|
| 1 | `/prd` | Create PRD with user stories (INCLUDES skill requirements) |
| 2 | `/ralph` | Convert to prd.json (VALIDATES skill requirements exist) |
| 3 | `/frontend-design` | Design BEFORE coding (creates design spec) |
| 4 | Write code | Following design spec |
| 5 | `/vercel-react-best-practices` | Review .tsx files |
| 6 | `/web-design-guidelines` | Review .astro pages |
| 7 | `/agent-browser` | Visual testing (375px, 768px, 1024px viewports) |
| 8 | Commit | Only after all required skills pass |

### Anti-Loop Pattern (CRITICAL — Phase 8 Bug Fix)

**The Problem:**
Ralph kept re-running `/orchestrator` → `/keyword-research` every iteration instead of progressing to content generation. This caused infinite loops burning context without progress.

**Root Cause:**
PRD acceptance criteria didn't have conditional checks to skip already-completed work.

**The Solution:**
ALL keyword research and positioning stories MUST use IF EXISTS / IF NOT EXISTS pattern:

```markdown
STEP 1: Check if docs/reference/[city]-keywords.md exists
  - IF FILE EXISTS: Read file, verify headings present, SKIP to STEP 2
  - IF FILE NOT EXISTS: Run /orchestrator → /keyword-research, save output

STEP 2: Check if docs/reference/[city]-positioning.md exists
  - IF FILE EXISTS: Read file, verify positioning present, SKIP to VERIFICATION
  - IF FILE NOT EXISTS: Run /orchestrator → /positioning-angles, save output

VERIFICATION: Both files exist in docs/reference/
```

**Why This Works:**
- First iteration: Files don't exist → skills run → files created
- Second iteration: Files exist → skills SKIPPED → proceeds to next story
- Prevents infinite loop on same step

**Apply to ALL Phase 9 Stories That Involve:**
- Content generation (ontario.md frontmatter)
- Keyword research for section headings
- Positioning angle development
- Brand voice extraction

---

## Implementation Order (Right-Sized Stories)

| Story | Components | Skills |
|-------|------------|--------|
| **Story 0** | Header restructure (nav + mobile) | /frontend-design, /agent-browser |
| **Story 1** | SectionHeader + HomepageHero | /frontend-design, /agent-browser |
| **Story 2** | BrandLogoTicker (infinite scroll) | /frontend-design, /agent-browser |
| **Story 3** | ServiceCategories + ExpertConsultation | /frontend-design, /agent-browser |
| **Story 4** | WhyChoose (Bento grid) | /frontend-design, /agent-browser |
| **Story 5** | Testimonials + ProjectGallery | /frontend-design, /agent-browser |
| **Story 6** | Financing + ServiceArea | /frontend-design, /agent-browser |
| **Story 7** | FAQ + BlogPreview | /frontend-design, /agent-browser |
| **Story 8** | FinalCta + ScrollBanner | /frontend-design, /agent-browser |
| **Story 9** | Footer restructure | /frontend-design, /agent-browser |
| **Story 10** | Wire index.astro to ontario.md | /web-design-guidelines |

### Story Dependencies
```
Story 0 (Header) ─────┐
                      │
Story 1 (Hero) ───────┤
                      │
Story 2 (LogoTicker) ─┤
                      │
Stories 3-8 ──────────┼──► Story 10 (Wire index.astro)
                      │
Story 9 (Footer) ─────┘
```

**Note:** Stories 0-9 can run in parallel (no code dependencies). Story 10 requires all sections complete.

---

## Verification Plan

1. `pnpm build` passes (639+ pages)
2. Homepage renders from ontario.md data
3. All sections use SectionHeader component (except Hero)
4. Visual testing passes at **375px, 768px, 1024px** breakpoints
5. No hardcoded messaging in components
6. Phone CTA works (tel: link)
7. Header nav restructure complete (4 direct links + More dropdown)
8. Footer has verified page links only (no /careers, /emergency-service)
9. ScrollBanner triggers at 75% scroll with sessionStorage persistence
10. Mobile CTA in thumb zone with ≥48px touch target

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
