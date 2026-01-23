# Homepage CRO/UX Audit Plan — B.A.P Heating & Cooling

## Executive Summary

**Current State:** V1 homepage with 13+ sections, under 20 calls/month, prospects comparing competitors
**Goal:** Increase phone call conversions through better positioning, flow, and differentiation
**Audit Date:** 2026-01-23

---

## CRO Audit Results (January 2026)

### Key Decisions Made

| Question | Decision |
|----------|----------|
| Mobile CTA placement | Full-width buttons in thumb zone (bottom 100px of hero section) |
| After-hours handling | Live answering service — communicate "Call anytime" on site |
| Differentiation position | Split: hook in hero, full "Why Choose" section at position 6. **NO longevity messaging ("Since 1994")** — focus on full-service differentiator |
| Local vs global stats | Global stats from `profile.yaml` (NEVER hardcode) |
| Exit intent modal | **REMOVE** — replace with scroll-triggered banner at 75% depth |
| Homepage FAQ | Yes — schema-driven, **inline items only** (no itemRefs pattern) |
| Rebate deadlines | Yes — research REAL Ontario program deadlines. **BLOCKER before launch.** Create `docs/reference/rebate-deadlines.md` |
| Video strategy | Skip entirely — high-quality images are sufficient |
| Header nav changes | Restructure: 4 service links + 'More' dropdown + Locations + Phone CTA. About/Blog to footer |
| Pricing on site | No pricing — custom quotes only |
| Sticky Phone Drawer | **REMOVE ENTIRELY** — ScrollBanner at 75% is sufficient |
| Content hardcoding | **NEVER hardcode content** — Everything schema-driven from ontario.md or business.yaml |

### Research Tasks Required

1. **Ontario Rebate Deadlines** (REQUIRED before launch)
   - Enbridge Home Efficiency Rebate (deadline + amounts)
   - Canada Greener Homes Grant (program status)
   - HeatSmart programs
   - Local utility rebates by city
   - Create: `docs/reference/rebate-deadlines.md`

---

## Schema Architecture for Shared Template (CRITICAL)

> **This section defines the bulletproof schema that enables homepage and location pages to share the same template with content fallbacks.**

### Template Scope

This schema-driven template serves:
- **Homepage (`/`)** — Ontario-level content with global scope
- **Location pages (`/locations/[location]`)** — 25 city-specific pages with localized content

**Key Principle:** ALL sections appear on BOTH page types. Content falls back gracefully.

---

### Three-Tier Fallback Architecture

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

**Implementation Pattern:**
```typescript
// CRITICAL: Hero is STANDALONE — does NOT use SectionHeader component
// Hero uses 'title' for H1 (not 'headline' like other sections)
const displayTitle = locationData?.hero?.title     // Tier 1
  || homepageDefaults?.hero?.title                 // Tier 2
  || "Southern Ontario's Full-Service HVAC Contractor";  // Fallback (should never reach)

// Other sections (uses eyebrow/headline/subtext via SectionHeader)
// SectionHeader uses 'headline' for H2 — different from Hero's H1
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

// Business profile data (Tier 3 — always available)
const googleRating = businessProfile.data.reputation.google_rating;
```

---

### Homepage Entry Architecture

**CRITICAL:** Homepage content lives IN the locations collection with a special flag.

**File Location:** `src/content/locations/ontario.md`

```yaml
---
title: "Southern Ontario"
isLandingPage: true  # ← EXCLUDES from location listings
region: "Southern Ontario"
province: "ON"
seoTitle: "B.A.P Heating & Cooling | Full-Service HVAC Contractor | Southern Ontario"
seoDescription: "Premium HVAC installation for Southern Ontario homes. One call handles permits, rebates, and warranty."
workflowStatus: "published"

# ═══════════════════════════════════════════════════════════════
# HERO SECTION (Section 2)
# NOTE: Hero is STANDALONE — does NOT use SectionHeader component
# Uses 'title' for H1 (not 'headline' like other sections)
# ═══════════════════════════════════════════════════════════════
hero:
  title: "Southern Ontario's Full-Service HVAC Contractor"
  subtitle: "One call handles everything — permits, rebates, installation, warranty."
  trustBadgeText: "Google A+ Rated"
  rebateBadge:
    text: "$7,100 rebates available"
    deadline: "March 2026"  # BLOCKER: Must verify from docs/reference/rebate-deadlines.md
  answeringTeamText: "Call anytime — we have a live answering team"

# ═══════════════════════════════════════════════════════════════
# SERVICE CATEGORIES (Section 4)
# Categories fetched from services collection
# Order customizable via serviceCategoryOrder array
# ═══════════════════════════════════════════════════════════════
serviceCategories:
  eyebrow: "Our Services"
  headline: "Complete HVAC Services for Your Home"
  subtext: "From installation to maintenance — we handle it all."
  # serviceCategoryOrder: ["heating", "cooling", "air-quality", "water-heating", "commercial", "maintenance"]
  # ^ Uncomment to customize order. Default: services collection order

# ═══════════════════════════════════════════════════════════════
# EXPERT CONSULTATION (Section 5)
# ═══════════════════════════════════════════════════════════════
expertConsultation:
  eyebrow: "Free Consultation"
  headline: "Not Sure What You Need?"
  subtext: "Talk to our experts for guidance — no pressure, no obligation."
  bullets:
    - "Free Phone Estimates"
    - "No Obligation — No Pressure"
    - "Licensed & Certified Technicians"
    - "Expert Guidance on Options"
  image:
    src: "/images/consultation-placeholder.jpg"  # Client to provide
    alt: "Friendly HVAC technician providing phone consultation"

# ═══════════════════════════════════════════════════════════════
# WHY CHOOSE B.A.P (Section 6) — Bento Grid Layout
# NOTE: Stats (reviewCount, googleRating) come from profile.yaml
# Component reads profile.yaml directly — DO NOT duplicate here
# ═══════════════════════════════════════════════════════════════
whyChoose:
  eyebrow: "Why Choose Us"
  headline: "Why Homeowners Choose B.A.P"
  subtext: "Full-service HVAC — one call handles everything"
  fullServiceBullets:
    - "Permits & inspections handled"
    - "Government rebate paperwork completed"
    - "Financing coordination included"
    - "Professional installation by certified technicians"
    - "10-year parts & labor warranty"
  warrantyCard:
    headline: "10-Year Warranty"
    copy: "Parts AND labor. Our name is on every job — we stand behind our work."
  # NOTE: Stats (reviewCount, googleRating) come from profile.yaml — NOT from schema

# ═══════════════════════════════════════════════════════════════
# TESTIMONIALS (Section 7)
# Uses existing filter logic (installation keyword filter)
# NO featuredReviewIds — keeps current automatic filtering
# ═══════════════════════════════════════════════════════════════
testimonials:
  eyebrow: "Customer Stories"
  headline: "What Our Customers Say"
  subtext: "Real experiences from homeowners across Southern Ontario"
  # NOTE: Reviews use existing filter logic — no explicit IDs needed

# ═══════════════════════════════════════════════════════════════
# PROJECT GALLERY (Section 8)
# filterByLocation: false for homepage (shows all)
# filterByLocation: true for location pages (filters by city)
# ═══════════════════════════════════════════════════════════════
projectGallery:
  eyebrow: "Our Work"
  headline: "Recent Projects"
  subtext: "Quality installations across Southern Ontario"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINANCING (Section 9)
# NOTE: rebateCard.emphasis displays via eyebrow-style treatment
# utilityProvider should match entry in docs/reference/utility-providers.md
# ═══════════════════════════════════════════════════════════════
financing:
  eyebrow: "Flexible Financing"
  headline: "Make Premium Comfort Affordable"
  subtext: "Multiple financing options to fit your budget."
  rebateCard:
    utilityProvider: "Enbridge Gas"  # Must match utility-providers.md
    rebateAmount: "Up to $7,100"
    emphasis: "WE HANDLE THE PAPERWORK"  # Displays as eyebrow/badge in card

# ═══════════════════════════════════════════════════════════════
# SERVICE AREA (Section 10)
# mapEmbed comes from business.yaml — NOT from location schema
# Homepage: showAllRegions=true | Location pages: showAllRegions=false
# ═══════════════════════════════════════════════════════════════
serviceArea:
  eyebrow: "Service Area"
  headline: "Proudly Serving Southern Ontario"
  subtext: "25 cities across 6 regions"
  showAllRegions: true
  currentCityHighlight: ""  # Empty for homepage (no city to highlight)
  # NOTE: Map embed comes from business.yaml mapEmbed field

# ═══════════════════════════════════════════════════════════════
# FAQ (Section 11) — Inline Items Only
# NO itemRefs pattern — FAQs are always inline in frontmatter
# Generates FAQPage JSON-LD schema for SEO
# ═══════════════════════════════════════════════════════════════
faq:
  eyebrow: "Common Questions"
  headline: "Frequently Asked Questions"
  subtext: "Quick answers to help you make an informed decision"
  items:
    - question: "How long does a furnace installation take?"
      answer: "Most furnace installations are completed in one day. Our team arrives in the morning and you'll have heat by evening."
    - question: "Do you handle permit applications?"
      answer: "Yes — we handle all permits and inspections. It's part of our full-service approach."
    - question: "What rebates are currently available?"
      answer: "Ontario homeowners can access up to $7,100 in combined rebates. We help you apply for all eligible programs."
    - question: "Do you offer financing?"
      answer: "Yes — we offer flexible financing options with competitive rates. Ask about our monthly payment plans."
  showViewAllLink: true

# ═══════════════════════════════════════════════════════════════
# BLOG PREVIEW (Section 12)
# filterByLocation: false = show latest from all locations
# filterByLocation: true = prioritize posts tagged with this location
# ═══════════════════════════════════════════════════════════════
blogPreview:
  eyebrow: "From Our Blog"
  headline: "HVAC Tips & Advice from the Experts"
  subtext: "Expert guidance to help you make informed decisions"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINAL CTA (Section 13)
# Uses SectionHeader with variant="dark" for white text on primary bg
# ═══════════════════════════════════════════════════════════════
finalCta:
  eyebrow: "Get Started"
  headline: "Get Your Free Installation Estimate"
  subtext: "No obligation • Same-day response • 10-year warranty"
  bullets:
    - "Free in-home consultation"
    - "No-pressure estimate"
    - "Licensed & insured technicians"
    - "Financing options available"

# ═══════════════════════════════════════════════════════════════
# SCROLL BANNER (Persistent Element)
# Triggers at 75% scroll depth, once per session (sessionStorage)
# Key: 'bap-scroll-banner-dismissed'
# Fallback: Show banner if sessionStorage unavailable
# ═══════════════════════════════════════════════════════════════
scrollBanner:
  text: "Questions? Call anytime — we have a live answering team"
  ctaText: "Call Now"
  enabled: true

# ═══════════════════════════════════════════════════════════════
# EXPERIENCE STATS (E-E-A-T credibility)
# ═══════════════════════════════════════════════════════════════
experienceStats:
  installationsInCity: 2500

# ═══════════════════════════════════════════════════════════════
# REMOVED FIELDS (DO NOT ADD)
# - stickyPhone: REMOVED — ScrollBanner is sufficient
# - stats.yearsServing: REMOVED — No longevity messaging
# - Any "Since 1994" references: REMOVED — Focus on full-service
# ═══════════════════════════════════════════════════════════════
---

B.A.P Heating & Cooling provides full-service HVAC installations across Southern Ontario...
```

**Filtering Logic (MANDATORY in all location listings):**
```typescript
// In ServiceAreaSection, Footer, Locations page, etc.
const displayLocations = allLocations.filter(loc => !loc.data.isLandingPage);

// For homepage template
const homepageEntry = allLocations.find(loc => loc.data.isLandingPage);
```

---

### Edge Case Handling Rules

| Section | When Content Empty | Behavior |
|---------|-------------------|----------|
| Hero | **NEVER HIDE** | Use Tier 2/3 defaults |
| Brand Logo Ticker | **NEVER HIDE** | Logos from business.yaml brands array |
| Service Categories | **NEVER HIDE** | Auto-fetch from services collection, order from serviceCategoryOrder |
| Expert Consultation | **NEVER HIDE** | Use Tier 2 defaults |
| Why Choose B.A.P | **NEVER HIDE** | Use Tier 2 defaults. Stats from profile.yaml |
| Testimonials | **HIDE** if zero reviews | Check reviews.length > 0. IDs = review filename slug |
| Project Gallery | **HIDE** if zero projects | Check projects.length > 0. Respects filterByLocation |
| Financing | **NEVER HIDE** | Use Tier 2 defaults. Emphasis via eyebrow-style |
| Service Area | **NEVER HIDE** | Map from business.yaml mapEmbed. Regions auto-fetch |
| FAQ | **HIDE** if zero FAQs | Check faqs.length > 0. Inline items ONLY (no itemRefs) |
| Blog Preview | **HIDE** if zero posts | Check posts.length > 0 |
| Final CTA | **NEVER HIDE** | Use Tier 2 defaults. SectionHeader variant="dark" |
| Scroll Banner | Configurable | Check scrollBanner.enabled. sessionStorage persistence |

**REMOVED:**
| ~~Sticky Phone Drawer~~ | ~~N/A~~ | **REMOVED** — ScrollBanner is sufficient |

**Missing Images Pattern:**
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

### Collection-Specific Filtering Rules

**Testimonials (reviews collection):**
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

**Blog Posts:**
```typescript
// For location pages, prioritize tagged posts
const localPosts = allPosts.filter(p => p.data.locations?.includes(location.slug));
const globalPosts = allPosts.filter(p => !localPosts.includes(p));
const displayPosts = [...localPosts, ...globalPosts].slice(0, 3);
```

**FAQs (Inline Items Only — NO itemRefs pattern):**
```typescript
// FAQs are ALWAYS inline in location frontmatter
// NO itemRefs pattern — simpler, no collection dependency
const faqs = locationData?.faq?.items    // Tier 1: Location-specific inline FAQs
  || homepageDefaults?.faq?.items        // Tier 2: ontario.md defaults
  || [];                                  // Fallback: empty (section hides)

// NOTE: If faq.items is empty array, section hides (see Edge Case table)
```

**Service Area:**
```typescript
// Homepage shows all, location pages show same region only
const displayRegions = locationData?.serviceArea?.showAllRegions !== false
  ? allRegions
  : allRegions.filter(r => r.name === location.data.region);
```

---

## Critical Positioning Gap Identified

### The Problem (RESOLVED)
The homepage previously led with:
- ~~"Since 1994" (longevity)~~ **REMOVED** — No longevity messaging
- "4.8 from 407+ reviews" (social proof) — **Keep, from profile.yaml**
- "Premium HVAC Installation" (category) — **Updated to "Full-Service"**

### What Should Be Front-and-Center
User confirmed the KEY differentiator is:
> **"Full-service — one call solves everything"**
> (We handle permits, rebates, financing, all brands — no runaround)

Secondary differentiator:
> **Warranty/Accountability** (10-year warranty, standing behind our work)

**Why This Matters:** When prospects are shopping competitors, they're asking "Why B.A.P?" The homepage doesn't answer this clearly.

---

## Homepage Content Brief — Section Guidelines

This brief defines rules for each section so `/seo-content` and `/direct-response-copy` skills can execute consistently.

### Golden Rules (Apply to ALL Sections)
1. **No repetition** — If a trust signal appears in one section, don't repeat it verbatim elsewhere
2. **Positive framing only** — Premium positioning = no pain points or negative hooks
3. **One CTA type** — Phone call is primary, email is secondary. No forms.
4. **Introduce → Expand** — Hero introduces, downstream sections deepen

---

## Design System Reference

### CSS Variables (from `src/styles/globals.css`)
**USE THESE TOKENS — NO INLINE COLORS**

| Token | Usage | Tailwind Class |
|-------|-------|----------------|
| `--primary` | Brand blue, CTAs, links | `bg-primary`, `text-primary` |
| `--primary-foreground` | Text on primary bg | `text-primary-foreground` |
| `--secondary` | Warm orange, accents | `bg-secondary` |
| `--muted` | Section backgrounds | `bg-muted` |
| `--muted-foreground` | Subdued text | `text-muted-foreground` |
| `--background` | Page background | `bg-background` |
| `--foreground` | Body text | `text-foreground` |
| `--card` | Card backgrounds | `bg-card` |
| `--border` | Borders | `border-border` |
| `--radius` | Border radius (0.5rem) | `rounded-md` |

### Component Library (shadcn/ui)

**RULE: Use shadcn components. NO CUSTOM BUILD unless marked.**

**Already Installed:**
| Component | Import | Use For |
|-----------|--------|---------|
| `Button` | `@/components/ui/button` | All CTAs |
| `Card` | `@/components/ui/card` | Content containers |
| `Badge` | `@/components/ui/badge` | Trust badges, labels |
| `Carousel` | `@/components/ui/carousel` | Testimonials slider |
| `Accordion` | `@/components/ui/accordion` | FAQ Section (section 11) |
| `Sheet` | `@/components/ui/sheet` | Mobile nav, drawers |
| `Separator` | `@/components/ui/separator` | Visual dividers |

**Need to Install:**
| Component | Command | Use For |
|-----------|---------|---------|
| `NavigationMenu` | `pnpm dlx shadcn@latest add navigation-menu` | Header mega menu (if needed) |
| `Tabs` | `pnpm dlx shadcn@latest add tabs` | Why Choose section (if tabs approach) |

**Custom Components Required (ONLY these):**
| Component | Reason |
|-----------|--------|
| `BrandLogoTicker` | Custom animation for infinite scroll |
| `WhyChooseBAPSection` | Bento grid layout (custom CSS grid) |
| `ScrollBanner` | 75% scroll trigger (replaces exit intent modal) |
| `FAQSection` | Schema-driven, local FAQs on city pages |

---

## Section → Component Mapping

**Quick Reference: Which shadcn components does each section use?**

| # | Section | shadcn Components | Background Token | Custom? |
|---|---------|-------------------|------------------|---------|
| 1 | Header | `Button`, `Sheet` (mobile) | `bg-background` | No |
| 2 | Hero | `Button`, `Badge` | `bg-muted` | No |
| 3 | Brand Logo Ticker | — | `bg-background` | **Yes** (animation) |
| 4 | Service Categories | `Card`, `Button` (as link) | `bg-muted` | No |
| 5 | Expert Consultation | `Button` | `bg-primary/5` | No |
| 6 | Why Choose B.A.P | `Card`, `Badge` | `bg-background` | **Yes** (Bento grid) |
| 7 | Testimonials | `Carousel`, `Card`, `Separator` | `bg-muted` | No |
| 8 | Project Gallery | `Card`, `Button` | `bg-background` | No |
| 9 | Financing Preview | `Card`, `Button` | `bg-background` | No |
| 10 | Service Area | `Badge` (region labels) | `bg-muted` | No |
| 11 | **FAQ (NEW)** | `Accordion` | `bg-background` | **Yes** (schema-driven) |
| 12 | Blog Preview | `Card`, `Button`, `Separator` | `bg-muted` | No |
| 13 | Final CTA | `Button` | `bg-primary` | No |
| 14 | Footer | `Button`, `Separator` | `bg-foreground` | No |
| — | Scroll Banner | `Button` | `bg-background` | **Yes** (75% scroll trigger) |

---

## Section-by-Section Component Specifications

---

### SectionHeader Component (FOUNDATIONAL)

**Purpose:** Enforces consistent heading structure across ALL sections (except Hero). Build this FIRST.

**File:** `src/components/SectionHeader.astro`

**IMPORTANT:** Hero section does NOT use SectionHeader. Hero has custom H1 layout with 'title' field.

**Props Interface:**
```typescript
interface Props {
  eyebrow?: string;              // Small caps label above headline
  headline: string;              // H2 heading text (required)
  subtext?: string;              // Supporting paragraph below headline
  align?: "center" | "left";     // Default: "center"
  variant?: "default" | "dark";  // Default: "default". Dark = white text for primary bg
}
```

**Variant Behavior:**
- `default`: Primary color eyebrow, dark headline, muted subtext
- `dark`: White/light colors for use on `bg-primary` backgrounds (e.g., Final CTA section)

**Visual Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    FREE CONSULTATION          ← eyebrow     │
│              Not Sure What You Need?          ← headline    │
│     Talk to Our HVAC Experts — No Obligation  ← subtext     │
│                                                             │
│                      [ mb-10 gap ]                          │
│                                                             │
│                   Section content...                        │
└─────────────────────────────────────────────────────────────┘
```

**Typography & Styling:**
| Element | Classes | Notes |
|---------|---------|-------|
| **Eyebrow** | `text-sm font-semibold uppercase tracking-wider text-primary mb-2` | Primary brand color, all caps |
| **Headline (H2)** | `text-3xl md:text-4xl font-bold tracking-tight mb-4` | Responsive sizing |
| **Subtext** | `text-lg md:text-xl text-muted-foreground` | Softer contrast |
| **Container** | `max-w-2xl mx-auto` (centered) or `max-w-xl` (left) | Prevents long lines |
| **Gap below** | `mb-10 md:mb-12` | Consistent section spacing |

**Usage Examples:**

```astro
<!-- Centered (most sections) -->
<SectionHeader
  eyebrow="Free Consultation"
  headline="Not Sure What You Need?"
  subtext="Talk to Our HVAC Experts — No Obligation, No Pressure"
  align="center"
/>

<!-- Left-aligned (split layouts) -->
<SectionHeader
  eyebrow="Why Choose Us"
  headline="Why Homeowners Choose B.A.P"
  align="left"
/>

<!-- Minimal (no subtext) -->
<SectionHeader
  eyebrow="Our Work"
  headline="Recent Projects"
/>
```

**Section-by-Section Application:**
| Section | Eyebrow | Headline | Subtext | Align | Variant |
|---------|---------|----------|---------|-------|---------|
| Expert Consultation (5) | "Free Consultation" | "Not Sure What You Need?" | "Talk to Our..." | left | default |
| Why Choose B.A.P (6) | "Why Choose Us" | "Why Homeowners Choose B.A.P" | "Full-service HVAC..." | left | default |
| Testimonials (7) | "Customer Stories" | "What Our Customers Say" | "Real experiences..." | center | default |
| Project Gallery (8) | "Our Work" | "Recent Projects" | "Quality installations..." | center | default |
| Financing (9) | "Flexible Financing" | "Make Premium Comfort Affordable" | "Multiple options..." | center | default |
| Service Area (10) | "Service Area" | "Proudly Serving Southern Ontario" | "25 cities..." | center | default |
| FAQ (11) | "Common Questions" | "Frequently Asked Questions" | "Quick answers..." | center | default |
| Blog Preview (12) | "From Our Blog" | "HVAC Tips & Advice..." | "Expert guidance..." | center | default |
| Final CTA (13) | "Get Started" | "Get Your Free Installation Estimate" | "No obligation..." | center | **dark** |

**NOTE:** Hero (Section 2) does NOT use SectionHeader — it has custom H1/subtitle layout.

---

## Section-by-Section Guidelines

### 1. HEADER — RESTRUCTURED
**Purpose:** Persistent navigation + primary CTA
**Priority:** Service discovery first

**New Desktop Structure:**
```
[Logo] | Heating | Cooling | Air Quality | Water Heating | More▼ | Locations | [📞 Phone]
                                                            │
                                                            └── Commercial
                                                                Maintenance Plans
```

**Key Changes:**
- 4 main service categories as direct links (not in dropdown)
- "More" dropdown for Commercial + Maintenance
- "Locations" as single link (goes to /locations page)
- Phone CTA always visible — **number from business.yaml, text customizable via /skills**
- ~~"Since 1994" badge~~ **REMOVED** — No longevity messaging anywhere
- Removed: About, Financing, Blog from main nav (accessible via footer)

**Mobile Structure:**
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

**Phone CTA Specification:**
- **Desktop:** Shows phone number from `{businessProfile.contact.phone_display}` — e.g., "📞 (519) 835-4858"
- **Mobile:** Phone icon only (24×24), taps to `tel:{businessProfile.contact.phone}`
- **CTA Text:** Customizable via /skills (e.g., "Call Now", "Free Estimate")
- **NEVER hardcode phone number** — always from business.yaml

**Include:**
- Logo (links to homepage)
- 4 main service category direct links
- "More" dropdown (Commercial, Maintenance)
- Locations link
- Phone CTA button (number from business.yaml)

**Exclude:**
- ~~"Since 1994" badge~~ **REMOVED EVERYWHERE** — No longevity messaging
- About, Financing, Blog links (move to footer)
- Multiple CTAs
- Promotional banners

**Word Count:** N/A (navigation only)

**Component Specification:**
```
LAYOUT: Full-width sticky bar
COMPONENTS:
├── Container (max-w-7xl, centered)
├── Logo (custom, links to /)
├── Nav Links (custom or NavigationMenu if mega menu needed)
│   ├── Direct links: Heating, Cooling, Air Quality, Water Heating
│   └── Dropdown (More): Commercial, Maintenance
├── Locations link
└── Button (variant="default") — Phone CTA

MOBILE:
├── Logo
├── Sheet (hamburger menu)
└── Button (icon only) — Phone CTA
```

**Visual Structure:**
```
┌─[DESKTOP 1024px+]───────────────────────────────────────────────────┐
│ [Logo]  Heating  Cooling  Air Quality  Water Heating  More▼  Locations  [📞 Call] │
└─────────────────────────────────────────────────────────────────────┘

┌─[MOBILE <1024px]────────────────────────────────────────────────────┐
│ [Logo]                                            [☰]  [📞]         │
└─────────────────────────────────────────────────────────────────────┘
```

---

### 2. HERO SECTION
**Purpose:** First impression — answer "What do you do?" and "Why should I trust you?"
**Role in Story:** Hook the visitor, establish premium positioning, invite action

**CRITICAL:** Hero is STANDALONE — does NOT use SectionHeader component.
- Uses `title` field for H1 (not `headline` like other sections)
- Has custom layout with subtitle, badges, CTA

**H1 Requirements:**
- MUST contain "HVAC Contractor" (GBP category match)
- MUST contain geographic modifier (Southern Ontario / [City])
- SHOULD communicate full-service positioning

**Include:**
- H1 headline with SEO keyword (from `hero.title` schema field)
- Sub-headline expanding value prop (from `hero.subtitle`)
- Trust badge: "Google A+ Rated" (from `hero.trustBadgeText`)
- Rebate badge with **REAL deadline** (from `hero.rebateBadge` — BLOCKER: verify from rebate-deadlines.md)
- Primary CTA: Phone call button (number from business.yaml)
- "Call anytime — live answering team" text (from `hero.answeringTeamText`)

**Exclude:**
- ~~"Since 1994"~~ **REMOVED** — No longevity messaging anywhere
- Full review count (save for Why Choose section — from profile.yaml)
- Multiple value props (one clear message)
- Hardcoded phone numbers (always from business.yaml)

**Word Count:** H1 (8-12 words) + Sub-headline (15-25 words) + Badge text

**H1 Templates (Content Skills Should Choose One):**

```
Template A (Geo-first):
H1: Southern Ontario's Full-Service HVAC Contractor
Sub: Installations done right. Permits, rebates, and warranty handled — one call.

Template B (Service-first):
H1: Full-Service HVAC Contractor | Southern Ontario
Sub: From consultation to installation to warranty — we handle everything.

Template C (Benefit-first):
H1: One Call. Everything Handled. | HVAC Contractor
Sub: Premium heating and cooling installations for Southern Ontario homeowners.

Template D (Direct):
H1: HVAC Contractor Serving [City] & Southern Ontario
Sub: Full-service installations with 10-year warranty. We take care of everything.
```

**Content Skill Instructions:**
- Run `/positioning-angles` first to find the winning angle
- Use that angle to inform which template fits best
- H1 MUST include "HVAC Contractor" verbatim for GBP
- Sub-headline should reinforce "full-service" or "we handle everything"

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│                    [Hero Image Area]                        │
│                                                             │
│           H1: [Headline with HVAC Contractor]              │
│                                                             │
│        Sub: [Value prop expanding on full-service]         │
│                                                             │
│     [Google A+ Badge]  •  [Rebates Badge with deadline]    │
│                                                             │
│           [📞 Call for Free Consultation]                   │
│                   {businessProfile.contact.phone_display}   │
└─────────────────────────────────────────────────────────────┘

NOTE: Phone number ALWAYS from business.yaml — NEVER hardcode
```

**Flow to Next:** After hero, visitor should understand WHAT you do. Next section shows HOW you do it differently.

**Component Specification:**
```
LAYOUT: Full-width, centered content
COMPONENTS:
├── Section container (bg-muted or bg-primary/5, py-16 md:py-20)
├── H1 (text-4xl md:text-5xl lg:text-6xl, font-bold)
├── P (text-lg md:text-xl, text-muted-foreground)
├── Badge (trust badge — "Google A+ Rated" style)
├── Badge (rebate badge — with REAL deadline, e.g., "$7,100 rebates — ends March 2026")
├── Button (variant="default", size="lg") — Phone CTA (number from business.yaml)
├── P (phone number from businessProfile.contact.phone_display)
└── P (text-sm, from hero.answeringTeamText schema field)

NOTE: Hero does NOT use SectionHeader — it's a standalone component with custom H1 layout.

DESKTOP VISUAL STRUCTURE:
┌─────────────────────────────────────────────────────────────────────┐
│                    [Hero Image/Background]                          │
│                                                                     │
│              H1: {hero.title}                                       │
│                                                                     │
│              P: {hero.subtitle}                                     │
│                                                                     │
│        [Badge: {hero.trustBadgeText}]  [Badge: {hero.rebateBadge}] │
│                                                                     │
│              [Button: 📞 {CTA text via /skills}]                   │
│                    {businessProfile.contact.phone_display}          │
│              {hero.answeringTeamText}                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

MOBILE LAYOUT (CRO OPTIMIZED):
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
│  │  "Call anytime — live answering team"                        │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘

MOBILE CTA REQUIREMENTS:
├── Full-width button (w-full)
├── Positioned in thumb zone (bottom 40% of hero)
├── Touch target ≥ 48px height (size="lg" or h-14)
├── Phone number visible below button
└── "Live answering team" reassurance text
```

---

### 3. BRAND LOGO TICKER
**Purpose:** Quick visual proof of authorized dealer status
**Role in Story:** "We work with the brands you know"

**Data Source:** `businessProfile.brands` array from `src/content/business/profile.yaml`
- Component reads brands dynamically — NOT hardcoded
- Can enhance LocalBusiness structured data for Google

**Include:**
- Brand logos from `businessProfile.brands[].logo` paths
- "Certified Dealer" label

**Exclude:**
- Any copy beyond simple label
- CTAs
- Hardcoded brand names (read from business.yaml)

**Word Count:** 2-3 words label only

**Component Specification:**
```
LAYOUT: Full-width, horizontal scroll animation
DATA SOURCE: businessProfile.brands from profile.yaml

COMPONENTS:
├── Section container (bg-background, py-8)
├── P (text-sm, text-muted-foreground, text-center) — "Certified Dealer"
└── Logo container (flex, animate-scroll, gap-12)
    └── {businessProfile.brands.map(brand => <img src={brand.logo} alt={brand.name} />)}

VISUAL STRUCTURE:
┌─────────────────────────────────────────────────────────────────────┐
│                       CERTIFIED DEALER                              │
│                                                                     │
│   [brand.logo] [brand.logo] [brand.logo] ... → continuous scroll   │
└─────────────────────────────────────────────────────────────────────┘

CSS: Uses CSS animation for infinite horizontal scroll
     Logos duplicate for seamless loop
```

**Flow to Next:** After seeing brands, visitor wants to see services offered.

---

### 4. SERVICE CATEGORIES GRID (6 cards)
**Purpose:** Help visitors find what they need — navigation gateway to service pages
**Role in Story:** "Here's what we can help you with"

**Data Source:**
- Categories from services collection
- Order customizable via `serviceCategoryOrder` schema field
- Default order if not specified: services collection order

**Schema Field:**
```typescript
serviceCategoryOrder: z.array(z.string()).optional()
// Example: ["heating", "cooling", "air-quality", "water-heating", "commercial", "maintenance"]
// If undefined, uses services collection default order
```

**Include:**
- 6 categories: Heating, Cooling, Indoor Air Quality, Water Heating, Commercial, Maintenance
- Icon per category (from services collection or Lucide icons)
- 1-2 sentence description (INSTALLATION-focused, not repair-focused)
- Click-through to category pages

**Exclude:**
- Trust signals (belongs elsewhere)
- CTAs (this is navigation, not conversion)
- Repair/emergency messaging
- Hardcoded category content (read from services collection)

**Word Count:** 15-25 words per card (total ~120-150 words)

**Copy Rules:**
- Lead with installation benefits
- Mention specific equipment types
- Avoid "24/7" or emergency language

**Service Card Copy Templates:**

```
HEATING
Icon: Flame or furnace
Headline: Heating
Copy: Furnaces, boilers, and heat pumps sized correctly for your home.
       Expert installation with full warranty coverage.
Link: → Explore Heating Options

COOLING
Icon: Snowflake or AC unit
Headline: Cooling
Copy: Central air and ductless systems for consistent comfort.
       Energy-efficient installations that lower your bills.
Link: → Explore Cooling Options

INDOOR AIR QUALITY
Icon: Air/wind or leaf
Headline: Indoor Air Quality
Copy: Humidifiers, air purifiers, and HRV systems for healthier air.
       Breathe easier with properly balanced indoor climate.
Link: → Improve Your Air Quality

WATER HEATING
Icon: Water drop or tank
Headline: Water Heating
Copy: Tank and tankless water heaters for reliable hot water.
       Right-sized solutions for your household's needs.
Link: → Explore Water Heating

COMMERCIAL
Icon: Building or office
Headline: Commercial HVAC
Copy: Rooftop units and commercial systems for businesses.
       Minimize downtime with professional installation.
Link: → Commercial Solutions

MAINTENANCE PLANS
Icon: Wrench or checkmark
Headline: Maintenance Plans
Copy: Keep your system running efficiently year after year.
       Priority service and extended equipment life.
Link: → View Maintenance Plans
```

**Visual Layout:**
```
┌─────────────────────────────────────────────────────────────────────┐
│             Complete HVAC Services for Your Home                    │
│     From installation to maintenance — we handle it all.           │
├──────────────────┬──────────────────┬──────────────────────────────┤
│   [🔥]           │   [❄️]           │   [🌬️]                       │
│   Heating        │   Cooling        │   Indoor Air Quality         │
│   Furnaces...    │   Central air... │   Humidifiers...             │
│   → Explore      │   → Explore      │   → Improve                  │
├──────────────────┼──────────────────┼──────────────────────────────┤
│   [💧]           │   [🏢]           │   [🔧]                       │
│   Water Heating  │   Commercial     │   Maintenance Plans          │
│   Tank and...    │   Rooftop...     │   Keep your...               │
│   → Explore      │   → Commercial   │   → View Plans               │
└──────────────────┴──────────────────┴──────────────────────────────┘
```

**Component Specification:**
```
LAYOUT: 3-column grid (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
COMPONENTS:
├── Section container (bg-muted, py-16 md:py-20)
├── Container (max-w-7xl)
├── Heading area (text-center)
│   ├── H2 (text-3xl md:text-4xl)
│   └── P (text-muted-foreground)
└── Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6)
    └── Card × 6
        ├── CardHeader
        │   └── Icon (Lucide, bg-primary/10 rounded-full p-3)
        ├── CardContent
        │   ├── H3 (font-semibold)
        │   └── P (text-sm, text-muted-foreground)
        └── CardFooter
            └── Link (text-primary, with arrow icon)

CARD HOVER: subtle shadow or border-primary on hover
ICONS: Lucide icons (Flame, Snowflake, Wind, Droplet, Building2, Wrench)
```

**Flow to Next:** After seeing services, research-mode visitors need help choosing. Ready-to-buy visitors need conversion path.

---

### 5. EXPERT CONSULTATION SECTION
**Purpose:** Mid-page CTA for research-mode visitors (50% of traffic)
**Role in Story:** "Not sure? We'll help you figure it out."
**Layout:** Split-image layout (image + content) for visual consistency

**Include:**
- **Eyebrow:** "Free Consultation"
- **Headline:** "Not Sure What You Need?"
- **Subtext:** Low-pressure, no-obligation tone
- **Image:** Friendly tech on phone or consultation scene
- 4-6 bullet points of what consultation covers
- Phone CTA

**Exclude:**
- Urgency messaging
- Form fields
- Multiple service mentions (not the place for it)

**Word Count:** Eyebrow (2-3 words) + Headline (5-8 words) + Subtext (20-30 words) + Bullets (4-6 words each)

**Content Options:**
```
Eyebrow: "Free Consultation"

Headline Options:
A: "Not Sure What You Need?"
B: "Let's Figure Out What's Right for Your Home"
C: "Have Questions? We're Here to Help"

Subtext: "Talk to our experts for guidance — no pressure, no obligation."
```

**Visual Mockup (Split-Image Layout):**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│  ┌─────────────────────────┬───────────────────────────────────────┐   │
│  │                         │                                       │   │
│  │                         │  FREE CONSULTATION         ← eyebrow  │   │
│  │                         │                                       │   │
│  │   [Photo: Friendly      │  Not Sure What You Need?  ← headline  │   │
│  │    technician on        │                                       │   │
│  │    phone, smiling]      │  Talk to our experts...  ← subtext    │   │
│  │                         │                                       │   │
│  │   Placeholder:          │  ✓ Free Phone Estimates               │   │
│  │   600×400               │  ✓ No Obligation — No Pressure        │   │
│  │   aspect-[3/2]          │  ✓ Licensed & Certified Technicians   │   │
│  │                         │  ✓ Expert Guidance on Options         │   │
│  │                         │                                       │   │
│  │                         │  [📞 {businessProfile.contact.phone}] │   │
│  │                         │                                       │   │
│  └─────────────────────────┴───────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Background Treatment:**
- Subtle accent background (`bg-primary/5` or `bg-muted`)
- Split layout: 50/50 on desktop, stacked on mobile
- Phone button is primary CTA style

**Schema Fields (for location customization):**
```typescript
expertConsultation: z.object({
  eyebrow: z.string().optional(),    // "Free Consultation"
  headline: z.string(),               // H2: "Not Sure What You Need?"
  subtext: z.string().optional(),     // Supporting paragraph
  bullets: z.array(z.string()).max(6),
  image: z.object({
    src: z.string(),                  // Image path or placeholder
    alt: z.string(),                  // Accessibility description
  }).optional(),
}).optional()
```

**Component Specification:**
```
LAYOUT: Split-image (grid-cols-1 lg:grid-cols-2)
COMPONENTS:
├── Section container (bg-primary/5, py-16 md:py-20)
├── Container (max-w-6xl, mx-auto)
├── Grid (grid-cols-1 lg:grid-cols-2, gap-8 lg:gap-12, items-center)
│   ├── Image column (order-2 lg:order-1)
│   │   └── Image or placeholder (aspect-[3/2], rounded-lg, object-cover)
│   └── Content column (order-1 lg:order-2)
│       ├── SectionHeader (eyebrow, headline, subtext, align="left")
│       ├── UL (list-none, space-y-3, mb-8)
│       │   └── LI × 4-6 (flex, items-center, gap-3)
│       │       ├── Check icon container (bg-primary/10, rounded-full)
│       │       └── Span (text-base, font-medium)
│       └── Button (variant="default", size="lg")

RESPONSIVE BEHAVIOR:
├── Mobile: Image stacks below content (order-2)
├── Tablet: Same as mobile
└── Desktop: Image left (order-1), content right (order-2)

IMAGE PLACEHOLDER:
┌─────────────────────────────────────────────────────────────────────┐
│                     [Accent Background]                             │
│                                                                     │
│              H2: Not Sure What You Need?                            │
│                                                                     │
│         P: Talk to our experts for guidance — no pressure...       │
│                                                                     │
│         ✓ Assess your home's heating and cooling needs             │
│         ✓ Explain your equipment options and costs                 │
│         ✓ Answer questions about rebates and financing             │
│         ✓ Provide a no-obligation estimate                         │
│                                                                     │
│              [Button: 📞 Call {businessProfile.contact.phone}]      │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Flow to Next:** After CTA, build trust with proof (testimonials or credentials).

---

### 6. WHY CHOOSE B.A.P SECTION (NEW - Consolidated Trust)
**Purpose:** Answer "Why should I choose B.A.P. over competitors?"
**Role in Story:** Differentiate from competition, address shopping comparison

**Data Sources:**
- Content: `whyChoose` schema fields from ontario.md (or location override)
- Stats (reviewCount, googleRating): `profile.yaml` — component reads directly, NOT from schema
- Credential badges: SVGs in `/public/images/badges/`, dimensions 80×60

**Structure:** Bento Grid Layout (NOT tabs)
- Large card: "Full-Service Experience" — differentiators
- Stat cards: Reviews count + Google rating (from profile.yaml)
- Medium card: 10-Year Warranty — accountability message
- Credentials bar: Visual badges (TSSA, BBB, HRAI, etc.)

**Include:**
- Full-service differentiator bullets (from `whyChoose.fullServiceBullets`)
- Review count + Google rating (from `profile.yaml` — NEVER hardcode)
- 10-Year Warranty card (from `whyChoose.warrantyCard`)
- Credential badges (SVGs in /public/images/badges/)

**Exclude:**
- ~~"30+ Years" stat~~ **REMOVED** — No longevity messaging
- Team photos/grid
- Full history narrative (too long)
- Hardcoded stats (always from profile.yaml)

**Word Count:** ~150-200 words total

**Visual Mockup — Bento Grid Layout:**

```
┌─────────────────────────────────────────────────────────────────────┐
│                   {whyChoose.headline}                              │
│                   {whyChoose.subtext}                               │
├────────────────────────────────────┬────────────────────────────────┤
│                                    │                                │
│  LARGE CARD (spans 2 rows)         │  STAT CARD        STAT CARD   │
│  ───────────────────────           │  ┌──────────┐    ┌──────────┐ │
│  Full-Service Experience           │  │  {count} │    │ {rating} │ │
│                                    │  │ Reviews  │    │  Google  │ │
│  {whyChoose.fullServiceBullets}:   │  │ (from    │    │  Rating  │ │
│  • Permits & inspections           │  │ profile) │    │ (profile)│ │
│  • Government rebate paperwork     │  └──────────┘    └──────────┘ │
│  • Financing coordination          ├────────────────────────────────┤
│  • Professional installation       │                                │
│  • 10-year parts & labor warranty  │  MEDIUM CARD                   │
│                                    │  ───────────────────────       │
│                                    │  {whyChoose.warrantyCard}      │
│                                    │  10-Year Warranty              │
│                                    │  Parts AND labor...            │
│                                    │                                │
├────────────────────────────────────┴────────────────────────────────┤
│  FULL-WIDTH CREDENTIALS BAR (SVGs from /public/images/badges/)     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ │
│  │ TSSA   │ │ HRAI   │ │ Heat   │ │ BBB    │ │ WSIB   │ │ Google │ │
│  │Licensed│ │ Member │ │ Pump   │ │ A+     │ │Covered │ │ {rating}│ │
│  │ .svg   │ │  .svg  │ │Champion│ │ Rated  │ │  .svg  │ │  .svg  │ │
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

**Bento Grid Specifications:**
- Large card (left): Full-service differentiator with bullet list (from schema)
- Stat cards (top-right): Review count + Google rating — **from profile.yaml, NOT schema**
- Medium card (right): 10-Year Warranty with accountability message (from schema)
- Full-width credentials bar: 6 visual badges (SVGs in /public/images/badges/, 80×60 dimensions)

**NOTE:** ~~"30+ Years" stat~~ **REMOVED** — No longevity messaging. Only show review count + rating.

**Color/Style Notes:**
- Cards have subtle shadows or borders (not flat)
- Large card could have accent background
- Stat cards use large typography for numbers
- Credentials bar shows actual logos/badges

**Content Skill Instructions:**
- Card 1 copy should emphasize WHAT makes B.A.P different (process, not credentials)
- Card 2 is visual badges only — minimal copy
- Card 3 is brief narrative (NOT full company history) — max 75 words
- Each card should be scannable in under 5 seconds

**Component Specification:**
```
LAYOUT: Bento grid (asymmetric card layout)
DATA SOURCES:
├── Content: whyChoose schema from ontario.md/location
├── Stats: profile.yaml (reviewCount, googleRating) — READ DIRECTLY
└── Badges: SVG files in /public/images/badges/

COMPONENTS:
├── Section container (bg-background, py-16 md:py-20)
├── Container (max-w-6xl)
├── SectionHeader (eyebrow, headline, subtext from whyChoose schema, align="left")
└── Bento Grid (custom grid layout)
    ├── LARGE CARD (row-span-2) — Full-Service Experience
    │   ├── Card (bg-primary/5 or border-primary)
    │   ├── H3 (font-semibold)
    │   └── UL ({whyChoose.fullServiceBullets} with check icons)
    ├── STAT CARD 1 — Review Count (from profile.yaml)
    │   ├── Card
    │   ├── Span (text-4xl font-bold) — {businessProfile.reputation.review_count}
    │   └── P (text-sm) — "Reviews"
    ├── STAT CARD 2 — Google Rating (from profile.yaml)
    │   ├── Card
    │   ├── Span (text-4xl font-bold) — {businessProfile.reputation.google_rating}
    │   └── P (text-sm) — "Google Rating"
    ├── MEDIUM CARD — "10-Year Warranty" (from whyChoose.warrantyCard)
    │   ├── Card
    │   ├── H3 (font-semibold) — {whyChoose.warrantyCard.headline}
    │   └── P (text-sm) — {whyChoose.warrantyCard.copy}
    └── FULL-WIDTH CREDENTIALS BAR
        └── Flex (justify-center, gap-8)
            └── Badge/img × 6 (credential logos)

CSS GRID:
grid-template-columns: 1.5fr 1fr 1fr (desktop)
grid-template-rows: auto auto auto

MOBILE: Stack vertically, full-width cards
```

**Flow to Next:** After trust is established, show proof (testimonials).

---

### 7. TESTIMONIALS CAROUSEL
**Purpose:** Social proof with E-E-A-T signals
**Role in Story:** "Hear from homeowners like you"

**Include:**
- Named customers with city (local SEO)
- INSTALLATION reviews only (not repair)
- Specific equipment mentions (keywords)
- Expertise signals ("proper sizing", "professional install")
- Results/outcomes ("energy bills dropped")
- Google review link

**Exclude:**
- Full "4.8 from 407+ reviews" headline (badge in hero is enough)
- Repair/service call reviews
- Anonymous reviews

**Word Count:** 50-80 words per testimonial, 6-9 testimonials

**E-E-A-T Requirements:**
- Experience: Real customer names + cities
- Expertise: Technical terms in reviews
- Authority: Mention of certifications or process
- Trust: Verified Google badge

**Testimonial Examples (E-E-A-T Optimized):**

```
BEFORE (Generic):
"Great service! The team was professional and on time. Would recommend."
- John D., Guelph

AFTER (E-E-A-T Optimized):

EXAMPLE 1 - Technical Expertise Signal:
"Paul did a proper heat load calculation before recommending our Carrier
furnace — turns out our old contractor had oversized our previous unit.
The new 80,000 BTU furnace heats evenly and our gas bills dropped 25%."
- Jonathan & Emily Wright, Guelph
[Installation: Carrier Infinity 59MN7 Furnace]

EXAMPLE 2 - Full-Service Experience:
"B.A.P handled everything — the Enbridge rebate paperwork, the permit,
even coordinated with our electrician for the heat pump. One invoice,
no runaround. Our Daikin heat pump is working beautifully."
- Jennifer & Mark Sullivan, Guelph
[Installation: Daikin Fit Heat Pump + Air Handler]

EXAMPLE 3 - Warranty/Accountability:
"Two years after installation, we had a minor issue with our Lennox AC.
Sarah called back the same day, Mike came out the next morning, and it
was fixed under warranty — no charge, no hassle. That's why we chose B.A.P."
- Michael & Susan Reeves, Guelph
[Installation: Lennox XC21 Central Air Conditioner]
```

**Content Skill Instructions for Testimonials:**
- Each testimonial MUST include: specific equipment model/brand, city name, customer full names
- Include at least ONE of: energy savings result, process mention (heat load calc, permits), warranty experience
- Avoid generic praise ("great service") — show SPECIFIC value delivered
- 50-80 words per testimonial

**Flow to Next:** After proof, show the work (gallery) or process.

**Component Specification:**
```
LAYOUT: Centered carousel
COMPONENTS:
├── Section container (bg-muted, py-16 md:py-20)
├── Container (max-w-5xl)
├── Heading area (text-center)
│   ├── Badge — "4.8 from 407+ reviews" (optional, may skip)
│   ├── H2 (text-3xl md:text-4xl)
│   └── P (text-muted-foreground)
├── Carousel (shadcn carousel)
│   └── CarouselContent
│       └── CarouselItem × 9 (basis-full md:basis-1/2 lg:basis-1/3)
│           └── Card
│               ├── CardContent
│               │   ├── P (review text, line-clamp-4)
│               │   ├── Star rating (5 stars filled)
│               │   └── Separator
│               └── CardFooter
│                   ├── P (font-semibold) — Customer name
│                   └── P (text-sm, text-muted-foreground) — City
├── CarouselPrevious / CarouselNext (navigation arrows)
├── Carousel dots (custom pagination)
└── Button (variant="outline") — "View All Reviews on Google"

MOBILE: Single card visible, swipe navigation
DESKTOP: 3 cards visible, arrow navigation
AUTO-ADVANCE: 5-second interval
```

---

### 8. PROJECT GALLERY
**Purpose:** Visual proof of quality work
**Role in Story:** "See the quality we deliver"

**Include:**
- 6 project cards with photos (placeholders for now)
- City names (local SEO)
- Equipment types installed
- Brief outcome or feature

**Exclude:**
- Before/after emergency repairs
- Generic stock photos

**Word Count:** 5-10 words per card caption

**Component Specification:**
```
LAYOUT: 3-column grid (responsive)
COMPONENTS:
├── Section container (bg-background, py-16 md:py-20)
├── Container (max-w-6xl)
├── Heading area (text-center)
│   ├── H2 (text-3xl md:text-4xl)
│   └── P (text-muted-foreground)
├── Grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-6)
│   └── Card × 6 (relative, overflow-hidden, group)
│       ├── Image/div (aspect-video, bg-muted)
│       │   └── Placeholder text or actual image
│       └── Overlay (absolute, bottom-0, bg-gradient-to-t)
│           ├── P (font-semibold) — "Furnace Install"
│           └── P (text-sm) — "Guelph"
└── Button (variant="outline") — "View All Projects"

HOVER EFFECT: Overlay slides up to reveal more detail
IMAGE ASPECT: 16:9 (aspect-video)
PLACEHOLDER: Gray background with text "Furnace Install — Guelph"
```

**Flow to Next:** After seeing work, visitors may want financing info.

---

### 9. FINANCING PREVIEW
**Purpose:** Address affordability, highlight rebate assistance
**Role in Story:** "Premium comfort is affordable"

**Data Source:** `financing` schema from ontario.md (or location override)
- `financing.rebateCard.emphasis` field displays the "WE HANDLE THE PAPERWORK" message
- `financing.rebateCard.utilityProvider` should match entry in `docs/reference/utility-providers.md`

**Include:**
- 3 financing options: 0% Financing, Flexible Plans, Government Rebates
- Emphasis text from `{financing.rebateCard.emphasis}` — displayed as eyebrow/badge style
- Phone CTA (number from business.yaml) + link to full financing page

**Exclude:**
- Detailed terms (save for financing page)
- Multiple CTAs
- Hardcoded emphasis text (always from schema)

**Word Count:** 15-25 words per card + headline

**Visual Mockup:**
```
┌─────────────────────────────────────────────────────────────────────┐
│         Make Premium Comfort Affordable                             │
│    Multiple financing options to fit your budget.                  │
├──────────────────┬──────────────────┬──────────────────────────────┤
│                  │                  │                              │
│  [💳 Icon]       │  [📅 Icon]       │  [🏛️ Icon]                   │
│                  │                  │                              │
│  0% Financing    │  Flexible Plans  │  Government Rebates          │
│  ─────────────   │  ─────────────   │  ─────────────              │
│  Qualified       │  Work with       │  Up to $10,000              │
│  customers can   │  multiple        │  in rebates                 │
│  enjoy 0%        │  finance         │  available.                 │
│  interest on     │  companies       │                              │
│  premium         │  across          │  WE HANDLE THE              │
│  installations.  │  Canada.         │  PAPERWORK.                 │
│                  │                  │  ─────────────              │
│                  │                  │  From application           │
│                  │                  │  to approval.               │
│                  │                  │                              │
└──────────────────┴──────────────────┴──────────────────────────────┘
│                                                                     │
│        [📞 Call to Discuss Options]    [View Full Details →]       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Key Copy Point:** The rebates card MUST emphasize the full-service differentiator — text comes from `{financing.rebateCard.emphasis}` schema field.

**Content Skill Instructions:**
- Make the emphasis message prominent (via /skills to set schema value)
- Avoid detailed terms/rates (those go on financing page)
- Keep cards scannable (under 30 words each)

**Component Specification:**
```
LAYOUT: 3-column card grid
DATA SOURCE: financing schema from ontario.md/location

COMPONENTS:
├── Section container (bg-background, py-16 md:py-20)
├── Container (max-w-5xl)
├── SectionHeader (eyebrow, headline, subtext from financing schema)
├── Grid (grid-cols-1 md:grid-cols-3, gap-6)
│   └── Card × 3 (text-center)
│       ├── CardHeader
│       │   └── Icon (Lucide, bg-primary/10 rounded-full p-4 mx-auto)
│       ├── CardContent
│       │   ├── H3 (font-semibold)
│       │   └── P (text-sm, text-muted-foreground)
│       └── Card 3 (rebateCard):
│           ├── {financing.rebateCard.utilityProvider}
│           ├── {financing.rebateCard.rebateAmount}
│           └── Badge: {financing.rebateCard.emphasis} ← eyebrow-style treatment
└── CTA area (flex, gap-4, justify-center)
    ├── Button (variant="default") — Phone CTA (number from business.yaml)
    └── Button (variant="outline") — "View Full Details" → /financing

ICONS: CreditCard, Calendar, Building (government)
EMPHASIS STYLING: <Badge variant="secondary">{financing.rebateCard.emphasis}</Badge>
```

**Flow to Next:** After financing, show service area or blog content.

---

### 10. SERVICE AREA SECTION
**Purpose:** Local SEO + confirm geographic coverage
**Role in Story:** "We serve your community"

**Data Sources:**
- Content: `serviceArea` schema from ontario.md (or location override)
- Map: `businessProfile.mapEmbed` from `src/content/business/profile.yaml` — URL only, component builds iframe
- Regions: Auto-fetch from regions collection

**Include:**
- Google Maps iframe embed (from `businessProfile.mapEmbed`)
- 6 regions with city lists (auto-fetch from regions collection)
- "Don't see your city? Call us." messaging

**Exclude:**
- ~~"Since 1994"~~ **REMOVED** — No longevity messaging
- CTAs (navigation-focused section)
- Hardcoded map embed (always from business.yaml)

**Word Count:** Headline + ~50 words copy

**Behavior by Page Type:**
- **Homepage:** Shows ALL 6 regions with all 25 cities
- **Location Pages:** Shows SAME REGION only (e.g., Guelph page → Guelph & Wellington region cities)

**Visual Mockup — Homepage (All Regions):**
```
┌─────────────────────────────────────────────────────────────────────┐
│           Proudly Serving Southern Ontario                          │
│              25 cities across 6 regions                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────┐                        │
│  │                                         │                        │
│  │   {businessProfile.mapEmbed}            │                        │
│  │   (Google Maps iframe from profile.yaml)│                        │
│  │                                         │                        │
│  └─────────────────────────────────────────┘                        │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│  GUELPH & WELLINGTON    WATERLOO REGION     HALTON REGION          │
│  • Guelph               • Kitchener         • Milton                │
│  • Fergus               • Waterloo          • Halton Hills          │
│  • Elora                • Cambridge         • Georgetown            │
│  • Rockwood             • Breslau           • Burlington            │
│  • Erin                 • Elmira            • Acton                 │
│  • Eden Mills                               • Oakville              │
├─────────────────────────────────────────────────────────────────────┤
│  PEEL REGION            HAMILTON & BRANT    DUFFERIN COUNTY         │
│  • Caledon              • Hamilton          • Orangeville           │
│  • Bolton               • Brantford         • Shelburne             │
│                         • Jerseyville       • Grand Valley          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│      Don't see your city? Give us a call — we may still be able    │
│      to help.                                                       │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Visual Mockup — Location Page (Same Region Only):**
```
┌─────────────────────────────────────────────────────────────────────┐
│           Serving Guelph & Surrounding Communities                  │
├─────────────────────────────────────────────────────────────────────┤
│  GUELPH & WELLINGTON REGION                                         │
│  • Guelph (You are here)                                           │
│  • Fergus                                                          │
│  • Elora                                                           │
│  • Rockwood                                                        │
│  • Erin                                                            │
│  • Eden Mills                                                      │
├─────────────────────────────────────────────────────────────────────┤
│      Serving all of Southern Ontario →                              │
│      (Link to /locations page)                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Schema Fields:**
```typescript
serviceArea: z.object({
  eyebrow: z.string().optional(), // "Service Area"
  headline: z.string(),           // "Proudly Serving Southern Ontario"
  subtext: z.string().optional(), // "25 cities across 6 regions"
  showAllRegions: z.boolean(),    // true for homepage, false for location pages
}).optional()
```

**Component Specification:**
```
LAYOUT: Map + Region Grid
DATA SOURCES:
├── Content: serviceArea schema from ontario.md/location
├── Map embed: businessProfile.mapEmbed from profile.yaml
└── Regions: Auto-fetch from regions collection

COMPONENTS:
├── Section container (bg-muted, py-16 md:py-20)
├── Container (max-w-6xl)
├── SectionHeader (eyebrow, headline, subtext from serviceArea schema)
├── Map area
│   └── div (rounded-xl, overflow-hidden)
│       └── iframe (src={businessProfile.mapEmbed}) — component constructs iframe from URL
├── Regions grid (grid-cols-2 md:grid-cols-3 lg:grid-cols-6, gap-6)
│   └── Region block × 6 (from regions collection)
│       ├── Badge (variant="outline") — Region name
│       └── UL (space-y-1)
│           └── LI × cities
│               └── Link (text-sm, hover:text-primary)
└── P (text-center, text-muted-foreground)
    — "Don't see your city? Give us a call..."

HOMEPAGE: All 6 regions displayed
LOCATION PAGE: Only same-region cities + "Serving all of Southern Ontario →" link

MOBILE: 2 columns for regions
DESKTOP: 6 columns (1 per region)
```

**Flow to Next:** FAQ section for research-mode visitors.

---

### 11. FAQ SECTION (NEW — Schema-Driven)
**Purpose:** Answer common questions, reduce call friction, boost SEO with FAQPage schema
**Role in Story:** "Get answers before you call"

**Key Feature:** Schema-driven FAQs — Homepage shows global FAQs, city pages show LOCAL FAQs

**Include:**
- 4-6 frequently asked questions
- Accordion UI (expandable)
- Link to full FAQ page
- FAQPage schema markup for SEO

**Exclude:**
- Sales copy in answers (informational only)
- CTAs within FAQ section

**Word Count:** 50-100 words per answer

**Homepage FAQs (Examples):**
```
Q: How much does furnace installation cost in Ontario?
A: Furnace installation typically ranges from $4,500-$8,500 depending on the system
   size, brand, and complexity of installation. We provide free in-home assessments
   with exact pricing — no surprises.

Q: Do you help with government rebates?
A: Yes — we handle all rebate paperwork from start to finish. Current programs include
   Enbridge Home Efficiency Rebate (up to $5,000) and Canada Greener Homes Grant.
   We'll identify every rebate you qualify for.

Q: What's included in your 10-year warranty?
A: Our warranty covers parts AND labor for 10 years — not just parts like most
   competitors. If anything goes wrong, we fix it at no charge. One company,
   one point of accountability.

Q: How long does installation take?
A: Most residential installations are completed in 1 day. We schedule installations
   to minimize disruption, and we clean up completely before we leave.
```

**City Page FAQs (Schema-Driven, Examples for Guelph):**
```
Q: How much does furnace installation cost in Guelph?
Q: What rebates are available for Guelph homeowners?
Q: Do you serve all areas of Guelph including [neighborhoods]?
Q: How quickly can you install a new furnace in Guelph?
```

**Schema Fields (add to locations collection):**
```typescript
faqs: z.array(z.object({
  question: z.string(),
  answer: z.string(),
})).optional()
```

**Visual Mockup:**
```
┌─────────────────────────────────────────────────────────────────────┐
│             Frequently Asked Questions                               │
│       Quick answers to help you make an informed decision           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ▼ How much does furnace installation cost in Ontario?       │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │   Furnace installation typically ranges from $4,500-$8,500  │   │
│  │   depending on system size, brand, and complexity...        │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ▶ Do you help with government rebates?                      │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ▶ What's included in your 10-year warranty?                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ▶ How long does installation take?                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│                    [View All FAQs →]                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Component Specification:**
```
LAYOUT: Single column, centered, max-width container
COMPONENTS:
├── Section container (bg-background, py-16 md:py-20)
├── Container (max-w-3xl)
├── Heading area (text-center)
│   ├── H2 (text-3xl md:text-4xl)
│   └── P (text-muted-foreground)
├── Accordion (shadcn accordion)
│   └── AccordionItem × 4-6
│       ├── AccordionTrigger — Question text
│       └── AccordionContent — Answer text
└── Button (variant="outline") — "View All FAQs"

SCHEMA MARKUP (FAQPage):
├── Add FAQPage schema to page head
├── Each Q&A becomes mainEntity item
└── Enables rich results in Google

BEHAVIOR BY PAGE TYPE:
├── Homepage: Global FAQs (Ontario-level)
└── City Pages: Local FAQs from schema (e.g., "in Guelph")
```

**Flow to Next:** Authority content (blog) then final conversion.

---

### 12. BLOG PREVIEW
**Purpose:** Authority content, E-E-A-T signals, SEO
**Role in Story:** "Expert guidance for your home comfort decisions"

**Include:**
- 3 blog posts (local first, then fallback)
- Thumbnails, dates, author names
- "View All Articles" link

**Exclude:**
- Full article previews
- CTAs in this section

**Word Count:** N/A (pulls from blog)

**Behavior by Page Type:**
- **Homepage:** Shows 3 latest published blogs (no location filter)
- **Location Pages:** Shows blogs tagged with that location FIRST, then fills remaining slots with latest from homepage

**Filtering Logic:**
```typescript
// For location page (e.g., Guelph)
const localBlogs = allBlogs.filter(b => b.locations?.includes('guelph'));
const fallbackBlogs = allBlogs.filter(b => !b.locations?.includes('guelph'));
const displayBlogs = [...localBlogs, ...fallbackBlogs].slice(0, 3);
```

**Visual Mockup:**
```
┌─────────────────────────────────────────────────────────────────────┐
│             HVAC Tips & Advice from the Experts                     │
│       Expert guidance to help you make informed decisions           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │
│  │  [Thumbnail] │  │  [Thumbnail] │  │  [Thumbnail] │                 │
│  │             │  │             │  │             │                 │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤                 │
│  │ How Much    │  │ Heat Pump   │  │ Essential   │                 │
│  │ Does Furnace│  │ vs Furnace  │  │ Winter      │                 │
│  │ Installation│  │ — Which is  │  │ Maintenance │                 │
│  │ Cost in     │  │ Right for   │  │ Tips        │                 │
│  │ Ontario?    │  │ Your Home?  │  │             │                 │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤                 │
│  │ Dec 15, 2025│  │ Nov 20, 2025│  │ Nov 1, 2025 │                 │
│  │ Paul Palmer │  │ Paul Palmer │  │ Paul Palmer │                 │
│  ├─────────────┤  ├─────────────┤  ├─────────────┤                 │
│  │ [Read More→]│  │ [Read More→]│  │ [Read More→]│                 │
│  └─────────────┘  └─────────────┘  └─────────────┘                 │
│                                                                     │
│                    [View All Articles →]                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Card Structure:**
- Thumbnail image (placeholder ok)
- Title (H3, 2-3 lines max)
- Date + Author
- "Read More" link

**Schema Fields:**
```typescript
blogPreview: z.object({
  eyebrow: z.string().optional(), // "From Our Blog"
  headline: z.string(),           // "HVAC Tips & Advice from the Experts"
  subtext: z.string().optional(), // "Expert guidance to help you..."
}).optional()

// Also need to add to blog collection:
locations: z.array(z.string()).optional(), // ["guelph", "kitchener"]
```

**Component Specification:**
```
LAYOUT: 3-column card grid
COMPONENTS:
├── Section container (bg-muted, py-16 md:py-20)
├── Container (max-w-6xl)
├── Heading area (text-center)
│   ├── H2 (text-3xl md:text-4xl)
│   └── P (text-muted-foreground)
├── Grid (grid-cols-1 md:grid-cols-3, gap-6)
│   └── Card × 3 (overflow-hidden)
│       ├── Image area (aspect-video, bg-muted)
│       │   └── Placeholder or blog thumbnail
│       ├── CardContent
│       │   ├── H3 (font-semibold, line-clamp-2)
│       │   ├── P (text-sm, text-muted-foreground, line-clamp-2)
│       │   └── Flex (gap-2, text-xs)
│       │       ├── Span — Date
│       │       ├── Separator (vertical)
│       │       └── Span — Author
│       └── CardFooter
│           └── Link — "Read More →"
└── Button (variant="outline") — "View All Articles"

CARD HOVER: Subtle lift or border highlight
IMAGE: aspect-video (16:9)
TITLE: Max 2 lines with line-clamp
```

**Flow to Next:** Final conversion opportunity.

---

### CERTIFICATIONS SECTION — REMOVED (Was Section 12)
**Rationale:** Consolidated into "Why Choose B.A.P" section (bento grid credentials bar)

---

### 13. FINAL CTA SECTION
**Purpose:** Strong close — last conversion opportunity before footer
**Role in Story:** "Ready? Here's how to start."

**Include:**
- Headline: Action-oriented, not repeating hero
- 3-4 trust bullets (different from hero)
- Phone CTA (primary)
- Email link (secondary)

**Exclude:**
- Repeating "Since 1994" or other signals already shown
- Forms
- Multiple offers

**Word Count:** Headline (6-10 words) + Sub-copy (20-30 words) + Bullets (4-6 words each)

**Headline Options (Content Skills Choose One):**
```
Option A (Action-focused):
"Get Your Free Installation Estimate"
Sub: No obligation. Same-day response. One call handles everything.

Option B (Outcome-focused):
"Ready for Comfort You Can Count On?"
Sub: Talk to our team about your installation project.

Option C (Direct):
"Start Your Project Today"
Sub: Free consultation. Expert guidance. Full-service installation.
```

**Trust Bullets (Use DIFFERENT signals from Hero/Why Choose):**
```
✓ Same-day response on all inquiries
✓ Free in-home consultation
✓ No-pressure estimate
✓ Licensed & insured technicians
✓ Financing options available
```

**Visual Mockup:**
```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│              Get Your Free Installation Estimate                    │
│                                                                     │
│        No obligation • Same-day response • One call handles it     │
│                                                                     │
│    ✓ Free in-home consultation    ✓ Licensed & insured            │
│    ✓ No-pressure estimate         ✓ Financing available           │
│                                                                     │
│    ┌───────────────────────────────┐    ┌─────────────────────────┐  │
│    │  📞 {businessProfile.phone}   │    │     ✉️ Email Us         │  │
│    │      (Primary CTA)             │    │   (Secondary link)      │  │
│    └───────────────────────────────┘    └─────────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

**Background Treatment:**
- Use accent color background (brand blue) or subtle gradient
- White text for contrast
- Make phone button prominent (solid white button on colored bg)

**Content Skill Instructions:**
- Headline must NOT repeat hero headline
- Bullets must NOT repeat Why Choose section bullets
- Keep it short — visitor has already seen the full page
- Action-oriented language: "Get", "Start", "Call"

**Component Specification:**
```
LAYOUT: Centered, full-width background
COMPONENTS:
├── Section container (bg-primary, text-primary-foreground, py-16 md:py-20)
├── Container (max-w-3xl, text-center)
├── H2 (text-3xl md:text-4xl, font-bold)
├── P (text-lg, opacity-90)
├── Grid (grid-cols-2 md:grid-cols-4, gap-4, my-8)
│   └── Flex × 4 (items-center, gap-2)
│       ├── Check icon (text-primary-foreground)
│       └── Span — Trust bullet
└── CTA area (flex, gap-4, justify-center)
    ├── Button (variant="secondary", size="lg") — Phone CTA
    └── Button (variant="outline", size="lg", border-white) — Email link

BACKGROUND: Solid primary color (brand blue)
TEXT: White/light for contrast
BUTTON (Primary): White background, primary text
BUTTON (Secondary): Transparent with white border
```

---

### 14. FOOTER
**Purpose:** Navigation, contact info, legal
**Role in Story:** Comprehensive navigation for those who scroll to bottom

**Verified Pages for Footer Links:**
- `/about` ✓
- `/blog` ✓
- `/contact` ✓
- `/faqs` ✓
- `/financing` ✓
- `/rebates` ✓
- `/reviews` ✓
- `/locations` ✓
- `/services/category/[category]` ✓

**REMOVE from site:**
- `/careers` — Not actively hiring
- `/emergency-service` — Conflicts with premium positioning

**Footer Structure (Based on Existing Pages):**
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
│ {businessProfile.phone} | {businessProfile.email} | {address}     │
├─────────────────────────────────────────────────────────────────────┤
│ [Instagram] [Facebook]         © 2026 B.A.P Heating & Cooling      │
│                                Privacy Policy | Terms (TO CREATE)   │
└─────────────────────────────────────────────────────────────────────┘
```

**Include:**
- Service category links (not individual services)
- 6 main location links + "View All" link
- Company links (verified pages only)
- Trust badges (TSSA, BBB, Google)
- Contact info
- Social icons
- Copyright + Legal links

**Exclude:**
- Careers link (not hiring)
- Emergency service link (conflicts with positioning)
- Individual service pages (link to categories)

**Component Specification:**
```
LAYOUT: 4-column grid + bottom bar
COMPONENTS:
├── Footer container (bg-foreground, text-background, py-12)
├── Container (max-w-6xl)
├── Grid (grid-cols-2 md:grid-cols-4, gap-8)
│   ├── Column 1: Services
│   │   ├── H3 (font-semibold, mb-4)
│   │   └── UL (space-y-2)
│   │       └── LI/Link × 5 (text-sm, opacity-80, hover:opacity-100)
│   ├── Column 2: Locations
│   │   ├── H3 (font-semibold, mb-4)
│   │   └── UL (space-y-2)
│   │       └── LI/Link × 6 + "View All"
│   ├── Column 3: Company
│   │   ├── H3 (font-semibold, mb-4)
│   │   └── UL (space-y-2)
│   │       └── LI/Link × 7
│   └── Column 4: Contact
│       ├── H3 (font-semibold, mb-4)
│       ├── Link (flex, gap-2) — Phone
│       ├── Link (flex, gap-2) — Email
│       ├── P (text-sm, opacity-80) — Address
│       └── Button (variant="outline", size="sm") — "Call Now"
├── Separator
├── Trust badges row (flex, justify-center, gap-6)
│   └── img × 3 (TSSA, BBB, Google logos)
├── Separator
└── Bottom bar (flex, justify-between, py-4)
    ├── Social icons (flex, gap-4)
    │   └── Link × 2 (Instagram, Facebook)
    ├── P — Copyright
    └── Links (flex, gap-4)
        └── Link × 2 — Privacy, Terms

COLORS: Dark background (foreground), light text (background)
MOBILE: 2 columns, stacked
```

---

### ~~15. STICKY PHONE DRAWER~~ — **REMOVED**

**Decision:** REMOVE ENTIRELY — ScrollBanner at 75% scroll depth is sufficient. Less UI clutter.

**Action Required:**
- DELETE `src/components/overlays/StickyPhoneDrawer.tsx`
- DELETE all imports/references to StickyPhoneDrawer
- REMOVE `stickyPhone` schema field from locations collection
- DO NOT recreate this component

**Rationale:**
- ScrollBanner provides conversion opportunity without persistent UI clutter
- Premium positioning = less aggressive conversion tactics
- Header phone CTA is always visible anyway

---

### 16. SCROLL BANNER (Replaces Exit Intent Modal)
**Purpose:** Gentle conversion reminder for engaged visitors
**Decision:** Replace aggressive exit intent modal with subtle scroll-triggered banner

**Rationale:** Exit intent modals feel aggressive and conflict with premium positioning. A scroll-triggered banner is less intrusive but still captures engaged visitors who've scrolled 75%+ of the page.

**Trigger:** 75% scroll depth (visitor has seen most content)

**Content:**
```
┌─────────────────────────────────────────────────────────────────────┐
│  Questions? Call anytime — we have a live answering team            │
│                                                  [📞 Call Now] [✕]  │
└─────────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Fixed position at bottom of viewport
- Full-width on mobile, max-width on desktop
- **Session persistence:** Uses `sessionStorage` (NOT localStorage)
  - Key: `bap-scroll-banner-dismissed`
  - Resets on tab close
  - **Fallback:** If sessionStorage unavailable, show banner (graceful degradation)
- Dismissible with X button
- Phone CTA links to `tel:{businessProfile.contact.phone}` (from business.yaml)
- Subtle entrance animation (slide up)

**Component Specification:**
```
LAYOUT: Fixed bottom banner
DATA SOURCES:
├── Content: scrollBanner schema from ontario.md/location
├── Phone: businessProfile.contact.phone from profile.yaml
└── Persistence: sessionStorage key 'bap-scroll-banner-dismissed'

COMPONENTS:
├── div (fixed, bottom-0, left-0, right-0, bg-background, border-t, shadow-lg)
│   └── Container (max-w-4xl, flex, items-center, justify-between, py-3 px-4)
│       ├── P (text-sm md:text-base)
│       │   └── {scrollBanner.text}
│       ├── Button (variant="default", size="sm")
│       │   └── <a href="tel:{businessProfile.contact.phone}">{scrollBanner.ctaText}</a>
│       └── Button (variant="ghost", size="icon", onClick=dismiss)
│           └── X icon (close)

TRIGGER: 75% scroll depth
PERSISTENCE:
├── Storage: sessionStorage (resets on tab close)
├── Key: 'bap-scroll-banner-dismissed'
├── Value: 'true' when dismissed
└── Fallback: Show banner if storage unavailable

ANIMATION: slideInUp (300ms ease)
Z-INDEX: 50 (above content, below modals)
ENABLED: Check {scrollBanner.enabled} — if false, don't render

MOBILE: Full-width, stacked layout if needed
DESKTOP: Horizontal layout, centered
```

**Action Items:**
- Delete `src/components/modals/ExitIntentModal` if exists
- Create `src/components/banners/ScrollBanner.tsx`
- Add to layout after 75% scroll detection

---

## Section Order (Final — Updated January 2026)

```
1. Header (persistent)
2. Hero (hook, H1 with HVAC Contractor, CTA, rebate deadline badge)
3. Brand Logo Ticker (authority)
4. Service Categories Grid (navigation)
5. Expert Consultation (mid-page CTA, "call anytime" messaging)
6. Why Choose B.A.P (consolidated trust, bento grid)
7. Testimonials (E-E-A-T social proof)
8. Project Gallery (visual proof)
9. Financing Preview (affordability, rebate deadlines)
10. Service Area (local SEO)
11. FAQ Section (NEW — schema-driven, local FAQs on city pages)
12. Blog Preview (authority content)
13. Final CTA (close)
14. Footer

PERSISTENT ELEMENTS:
+ Scroll Banner at 75% depth (replaces exit intent modal)

REMOVED:
- Exit Intent Modal (too aggressive for premium positioning)
- Sticky Phone Drawer (ScrollBanner is sufficient)
```

**REMOVED SECTIONS (Consolidated):**
- Value Props Grid (consolidated into Why Choose B.A.P)
- Family Story Section (consolidated into Why Choose B.A.P)
- Certifications Section (consolidated into Why Choose B.A.P)
- **Sticky Phone Drawer** (ScrollBanner at 75% is sufficient)

**ADDED SECTIONS:**
- FAQ Section (position 11) — Schema-driven for local SEO

---

## Section-by-Section Audit

### 1. HEADER — UPDATED
- ✅ Sticky header with phone CTA works
- ~~✅ "Since 1994" badge is fine as secondary trust~~ **REMOVED** — No longevity messaging
- ✅ Phone CTA shows number from business.yaml

### 2. HERO SECTION — UPDATED
**Updated Direction:**
- Lead with the "full-service / one call" value proposition
- NO "Since 1994" messaging
- Rebate badge with REAL deadline from rebate-deadlines.md

**Example Angle:**
> "One Call. Everything Handled."
> Permits, rebates, installation, warranty — we take care of it all.

### 3. VALUE PROPS GRID — **REMOVED**
**Decision:** Consolidated into Why Choose B.A.P section (Section 6).

Component to DELETE: `src/components/sections/ValuePropsGrid.astro`

### 4. BRAND LOGO TICKER — Keep As-Is
- ✅ Certified dealer logos build trust
- ✅ Supports "all major brands" positioning

### 5. SERVICE CATEGORIES GRID — Needs Hierarchy
**Current:** 6 equal cards (Heating, Cooling, IAQ, Water Heating, Commercial, Maintenance)

**Issues:**
- Equal treatment doesn't guide visitors
- Commercial audience has different needs than residential
- IAQ/Water Heating may dilute focus

**Recommendation:**
- Keep all 6 (commercial is actively pursued)
- Consider visual hierarchy: Heating + Cooling larger, others smaller
- Ensure descriptions emphasize INSTALLATION over repair

### 6. EXPERT CONSULTATION — Strong, Keep
**Current:** "Not Sure What You Need?" + phone CTA

- ✅ Good for 50% research-mode visitors
- ✅ Low-pressure "no obligation" tone matches brand
- ✅ Strategic mid-page CTA

### 7. PROJECT GALLERY — Evaluate ROI
**Current:** 6 project cards with city names

**Questions:**
- Are these converting visitors, or just adding scroll length?
- Do they show differentiation (quality install, neat work)?

**Recommendation:**
- Keep but ensure photos (when added) show PREMIUM quality work
- Add brief results/outcomes (not just "Furnace Install — Guelph")

### 8. TESTIMONIALS CAROUSEL — Needs Rewrite

**User Feedback:** "Need SEO keyword-rich E-E-A-T testimonials"

**Issues:**
- Current reviews may be generic or repair-focused
- Not optimized for search or expertise signals

**Recommendation:**
- Rewrite/curate testimonials to include:
  - Specific equipment mentioned (Carrier furnace, Lennox AC)
  - City names for local SEO
  - Expertise signals ("proper heat load calculation", "system commissioning")
  - Results/outcomes ("cut our energy bills by 30%")
- Follow E-E-A-T framework: Experience, Expertise, Authority, Trust

### 9. FAMILY STORY / TEAM SECTION — REMOVE TEAM GRID

**User Feedback:** "Makes page look cluttered. Just need About B.A.P, no team section."

**Recommendation:**
- Keep brief "About B.A.P" narrative (family business, accountability)
- REMOVE the 4-person team grid
- Consolidate to single paragraph + accountability message

### 10. SERVICE AREA SECTION — Keep, Optimize
- ✅ 25 cities across 6 regions is important for local SEO
- ⚠️ Map placeholder needs actual map or better visual

### 11. FINANCING PREVIEW — Keep with Emphasis
**Current:** 3 cards (0% Financing, Flexible Plans, $10K Rebates)

- ✅ "We handle rebate paperwork" is EXACTLY the full-service message
- Recommendation: Emphasize the "we handle it" angle more prominently

### 12. BLOG PREVIEW — Keep
- ✅ Supports E-E-A-T and SEO
- ✅ Research-mode visitors will browse

### 13. CERTIFICATIONS SECTION — Keep
**Current:** TSSA, HRAI Member, Heat Pump Champion, BBB A+, WSIB, Google Rating

- ✅ Strong trust signals
- ✅ Addresses competitor comparison objection
- Consider: Add "Why These Matter" brief context

### 14. FINAL CTA — Strengthen
**Current:** "Get Your Free Installation Estimate"

- ✅ Clear call to action
- ⚠️ Could reinforce the differentiator one more time

---

## Missing Sections to Consider

### 1. "Why Choose B.A.P?" Comparison Section
**Rationale:** Main objection is "comparing competitors"
**Decision:** User wants to see examples first

**Option A: Direct Comparison Grid**
```
Why Choose B.A.P?

| What You Get           | B.A.P           | Typical HVAC Company |
|------------------------|-----------------|---------------------|
| One point of contact   | ✓ Full-service  | Multiple vendors    |
| Rebate paperwork       | ✓ We handle it  | You figure it out   |
| Permit coordination    | ✓ Included      | Extra charge        |
| 10-year warranty       | ✓ Parts + labor | 1-year labor only   |
| Heat load calculation  | ✓ Every install | "Rules of thumb"    |
```

**Option B: "One Call" Story Format**
```
One Call. Everything Handled.

Here's what happens when you call B.A.P:

1. We assess your home (proper heat load calculation, not guesswork)
2. We handle permits, rebates, and financing paperwork
3. We install with care (our name is on every job)
4. We stand behind it — 10-year warranty, no excuses

That's it. One call. One company. One point of accountability.
```

**Option C: Pain Point Reversal**
```
Tired of the HVAC Runaround?

Most HVAC companies leave you to:
- Hunt down rebate forms yourself
- Coordinate multiple contractors
- Chase warranties when something goes wrong
- Wonder if it was installed correctly

We do it differently.

B.A.P handles permits, rebates, financing, and warranty — all in-house.
One call. One invoice. One company standing behind your comfort.
```

### 2. Process/What to Expect Section
**Rationale:** Full-service positioning needs explanation
**Content:** Simple 3-4 step process showing how B.A.P handles everything

```
How We Work

Step 1: Free Consultation
We visit your home, assess your needs (real heat load calculations), and explain your options.

Step 2: Full-Service Coordination
We handle permits, rebate paperwork, and financing — you don't lift a finger.

Step 3: Quality Installation
Our certified team installs your system with care and precision.

Step 4: Ongoing Support
10-year warranty. Same team. No runaround if something needs attention.
```

### 3. FAQ Accordion
**Rationale:** Research-mode visitors (50%) need answers
**Content:** Address common questions, reduce friction to call
- "How long does installation take?"
- "Do you help with rebates?"
- "What brands do you install?"
- "What's included in your warranty?"
- "Do you service systems you didn't install?"

---

## Required Skills for Implementation

Per CLAUDE.md mandatory skill usage:

| Task | Required Skill |
|------|---------------|
| Positioning strategy | `/orchestrator` → `/positioning-angles` |
| Headline/copy rewrites | `/orchestrator` → `/direct-response-copy` |
| Testimonial optimization | `/orchestrator` → `/seo-content` |
| Component updates | `/frontend-design` → `/web-design-guidelines` |
| Visual testing | `/agent-browser` |

---

## Verification Plan

1. Run `/agent-browser` to capture before screenshots
2. Implement changes per section
3. Run `pnpm build` to verify no errors
4. Run `/agent-browser` to capture after screenshots
5. Compare scroll depth and visual hierarchy

---

## Implementation Approach: Full Page Restructure

**User Decision:** Complete restructure at once (not incremental)

### Phase 1: Positioning & Copy (Skills Required)
1. `/orchestrator` → `/positioning-angles` — Lock in differentiation angles
2. `/orchestrator` → `/direct-response-copy` — Write new Hero, Value Props, CTAs

### Phase 2: Section Restructure
1. Remove Team Grid from FamilyStorySection
2. Add "Why Choose B.A.P?" section (pending example approval)
3. Add "How We Work" process section
4. Reorder sections per optimized flow

### Phase 3: Content Optimization
1. Rewrite testimonials for E-E-A-T + keywords
2. Update service category descriptions (installation-focused)
3. Strengthen Final CTA with differentiator

### Phase 4: Visual Testing
1. `/agent-browser` — Full page scroll test
2. Mobile viewport testing (375px, 768px)
3. Verify all CTAs are prominent and functional

### Confirmed Section Order (FINAL — Schema-Driven)

```
ABOVE THE FOLD
├── 1. Header (sticky, phone CTA — no schema needed)
├── 2. Hero (SCHEMA: hero.title, hero.subtitle, hero.rebateBadge)
└── 3. Brand Logo Ticker (static — no schema needed)

NAVIGATION & TRUST
├── 4. Service Categories Grid (SCHEMA: serviceCategories.headline)
├── 5. Expert Consultation (SCHEMA: expertConsultation.headline, bullets)
└── 6. Why Choose B.A.P — NEW (SCHEMA: whyChoose.*, consolidates 3 old sections)

SOCIAL PROOF
├── 7. Testimonials (SCHEMA: testimonials.eyebrow/headline/subtext — uses existing filter logic)
└── 8. Project Gallery (SCHEMA: projectGallery.headline + city filter)

CONVERSION SUPPORT
├── 9. Financing Preview (SCHEMA: financing.rebateCard with city LDC)
├── 10. Service Area (SCHEMA: serviceArea.showAllRegions toggle)
├── 11. FAQ — NEW (SCHEMA: faq.items inline only + FAQPage JSON-LD)
└── 12. Blog Preview (SCHEMA: blogPreview.filterByLocation)

FINAL CONVERSION
├── 13. Final CTA (SCHEMA: finalCta.headline, bullets)
└── 14. Footer (verified links only — no schema needed)

PERSISTENT ELEMENTS
└── Scroll Banner — NEW (SCHEMA: scrollBanner.text, enabled — 75% depth trigger)

REMOVED
├── ❌ Value Props Grid (consolidated into Why Choose)
├── ❌ Family Story Section (consolidated into Why Choose)
├── ❌ Certifications Section (consolidated into Why Choose)
├── ❌ Exit Intent Modal (replaced with Scroll Banner)
└── ❌ Sticky Phone Drawer (ScrollBanner is sufficient)
```

### Components Checklist

**NEW COMPONENTS TO CREATE:**
- [ ] `WhyChooseBAPSection.astro` — Bento grid consolidating trust signals
- [ ] `FAQSection.astro` — Schema-driven accordion + FAQPage JSON-LD
- [ ] `ScrollBanner.tsx` — 75% scroll trigger CTA banner
- [ ] `ontario.md` — Homepage content entry with `isLandingPage: true`

**COMPONENTS TO UPDATE (Props Pattern):**
- [ ] `HeroSection.astro` — Accept optional props with fallback chain
- [ ] `ServiceCategoriesGrid.astro` — Accept eyebrow/headline/subtext props
- [ ] `ExpertConsultationSection.astro` — Accept headline/bullets props
- [ ] `TestimonialsCarousel.tsx` — Accept eyebrow/headline/subtext props (keep existing filter logic)
- [ ] `ProjectGallerySection.astro` — Accept headline, city filter
- [ ] `FinancingPreviewSection.astro` — Accept rebateCard with city LDC
- [ ] `ServiceAreaSection.astro` — Accept showAllRegions toggle
- [ ] `BlogPreviewSection.astro` — Accept filterByLocation flag
- [ ] `FinalCTASection.astro` — Accept headline/bullets props

**PAGES TO UPDATE:**
- [ ] `src/pages/index.astro` — Fetch ontario.md, pass to all sections
- [ ] `src/pages/locations/[location].astro` — Use same components with city data

**COMPONENTS TO DELETE:**
- [ ] `ValuePropsGrid.astro`
- [ ] `FamilyStorySection.astro`
- [ ] `CertificationsSection.astro`
- [ ] `ExitIntentModal.tsx`

**PAGES TO DELETE:**
- [ ] `src/pages/emergency-service.astro`
- [ ] `src/pages/careers.astro`

---

## Architecture Decision: Schema-Driven Template

**Decision:** Extend `locations` collection with homepage section fields (matches `service-city` pattern)

**Pages Using This Template:**
- `/` (Homepage) — Uses `ontario.md` with `isLandingPage: true`
- `/locations/[location]` — 25 city-specific pages with localized content

### Complete Schema Extension (FINAL — `src/content/config.ts`)

```typescript
// ═══════════════════════════════════════════════════════════════
// SCHEMA VALIDATION PATTERN
// ═══════════════════════════════════════════════════════════════
// RULE 1: Section objects are OPTIONAL (allows inheritance from ontario.md)
// RULE 2: Fields WITHIN sections are REQUIRED (no partial content)
//
// This means:
// - If guelph.md doesn't define `expertConsultation` → uses ontario.md defaults
// - If guelph.md DOES define `expertConsultation` → ALL fields must be filled
// - Build NEVER fails — missing sections inherit from ontario.md
//
// STANDARD SECTION HEADER FIELDS:
// - eyebrow: Small caps label - "FREE CONSULTATION"
// - headline: H2 heading - "Not Sure What You Need?"
// - subtext: Supporting paragraph - "Talk to our experts..."
// ═══════════════════════════════════════════════════════════════

const locations = defineCollection({
  type: 'content',
  schema: z.object({
    // ═══════════════════════════════════════════════════════════════
    // EXISTING FIELDS (keep)
    // ═══════════════════════════════════════════════════════════════
    title: z.string(),
    description: z.string(),
    region: z.string(),
    province: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),

    // ═══════════════════════════════════════════════════════════════
    // NEW: LANDING PAGE FLAG (excludes from location listings)
    // ═══════════════════════════════════════════════════════════════
    isLandingPage: z.boolean().default(false),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 2: HERO
    // H1 MUST contain "HVAC Contractor" for GBP category match
    // NOTE: Hero uses "title" for H1 (not headline) since it's the page title
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    hero: z.object({
      title: z.string(),              // H1 — "HVAC Contractor" required in text
      subtitle: z.string(),           // Value prop sub-headline
      trustBadgeText: z.string(),     // "Google A+ Rated"
      rebateBadge: z.object({
        text: z.string(),             // "$7,100 rebates available"
        deadline: z.string(),         // "March 2026" — MUST BE REAL
      }),
      answeringTeamText: z.string(),  // "Call anytime — live answering team"
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 4: SERVICE CATEGORIES GRID
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    serviceCategories: z.object({
      eyebrow: z.string(),              // "Our Services"
      headline: z.string(),             // H2: "Complete HVAC Services"
      subtext: z.string(),              // "From installation to maintenance..."
      serviceCategoryOrder: z.array(z.string()).optional(),  // Override display order
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 5: EXPERT CONSULTATION (Split-Image Layout)
    // Uses: SectionHeader component (align="left")
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    expertConsultation: z.object({
      eyebrow: z.string(),              // "Free Consultation"
      headline: z.string(),             // H2: "Not Sure What You Need?"
      subtext: z.string(),              // "Talk to our experts..."
      bullets: z.array(z.string()).min(4).max(6),  // 4-6 trust bullets
      image: z.object({
        src: z.string(),                // Image path
        alt: z.string(),                // Accessibility description
      }),
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 6: WHY CHOOSE B.A.P (Bento Grid) — NEW
    // Replaces: ValuePropsGrid + FamilyStorySection + CertificationsSection
    // Uses: SectionHeader component (align="left" for split layout)
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    whyChoose: z.object({
      eyebrow: z.string(),              // "Why Choose Us"
      headline: z.string(),             // H2: "Why Homeowners Choose B.A.P"
      subtext: z.string(),              // "Full-service HVAC — one call handles everything"
      fullServiceBullets: z.array(z.string()).min(4).max(6),  // 4-6 bullets
      warrantyCard: z.object({
        headline: z.string(),           // "10-Year Warranty" (card title, not section)
        copy: z.string(),               // "Parts AND labor..."
      }),
      // NOTE: Stats (reviewCount, googleRating) read from profile.yaml — NOT from schema
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 7: TESTIMONIALS
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    testimonials: z.object({
      eyebrow: z.string(),              // "Customer Stories"
      headline: z.string(),             // H2: "What Our Customers Say"
      subtext: z.string(),              // "Real experiences from homeowners..."
      // NOTE: Reviews use existing filter logic (installation keyword) — no featuredReviewIds
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 8: PROJECT GALLERY
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    projectGallery: z.object({
      eyebrow: z.string(),              // "Our Work"
      headline: z.string(),             // H2: "Recent Installations"
      subtext: z.string(),              // "Quality projects across Southern Ontario"
      filterByLocation: z.boolean().default(false),  // Filter gallery by current location
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 9: FINANCING PREVIEW
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    financing: z.object({
      eyebrow: z.string(),              // "Flexible Financing"
      headline: z.string(),             // H2: "Make Premium Comfort Affordable"
      subtext: z.string(),              // "Multiple financing options..."
      rebateCard: z.object({
        utilityProvider: z.string(),    // City-specific LDC name
        rebateAmount: z.string(),       // "Up to $7,100"
        emphasis: z.string(),           // "WE HANDLE THE PAPERWORK"
      }),
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 10: SERVICE AREA
    // Homepage: showAllRegions=true (all 25 cities)
    // Location: showAllRegions=false (same region only)
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    serviceArea: z.object({
      eyebrow: z.string(),              // "Service Area"
      headline: z.string(),             // H2: "Proudly Serving Southern Ontario"
      subtext: z.string(),              // "25 cities across 6 regions"
      showAllRegions: z.boolean(),      // true for homepage, false for location pages
      currentCityHighlight: z.string(), // Slug to highlight "You are here" (use "" for homepage)
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 11: FAQ — NEW (Schema-Driven)
    // Homepage: Global Ontario-level FAQs
    // Location: City-specific FAQs with global fallback
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    faq: z.object({
      eyebrow: z.string(),              // "Common Questions"
      headline: z.string(),             // H2: "Frequently Asked Questions"
      subtext: z.string(),              // Supporting text below headline
      items: z.array(z.object({         // Inline FAQs (4-6 items)
        question: z.string(),
        answer: z.string(),
      })).min(4).max(6),
      showViewAllLink: z.boolean(),     // true to show "View all FAQs" link
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 12: BLOG PREVIEW
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    blogPreview: z.object({
      eyebrow: z.string(),              // "From Our Blog"
      headline: z.string(),             // H2: "HVAC Tips & Insights"
      subtext: z.string(),              // Supporting text below headline
      filterByLocation: z.boolean(),    // true for location pages, false for homepage
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // SECTION 13: FINAL CTA
    // Uses: SectionHeader component
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    finalCta: z.object({
      eyebrow: z.string(),              // "Get Started"
      headline: z.string(),             // H2: "Ready for Reliable HVAC?"
      subtext: z.string(),              // "Call today for a free consultation"
      bullets: z.array(z.string()).min(4).max(6),  // 4-6 trust bullets
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // ❌ REMOVED: STICKY PHONE DRAWER
    // DO NOT ADD — ScrollBanner at 75% is sufficient
    // ═══════════════════════════════════════════════════════════════
    // stickyPhone: REMOVED — delete this field from schema

    // ═══════════════════════════════════════════════════════════════
    // PERSISTENT: SCROLL BANNER (Replaces Exit Intent Modal AND Sticky Phone)
    // Triggers at 75% scroll depth, once per session
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    scrollBanner: z.object({
      text: z.string(),               // "Questions? Call anytime..."
      ctaText: z.string(),            // "Call Now"
      enabled: z.boolean(),           // true to show, false to hide
    }).optional(),

    // ═══════════════════════════════════════════════════════════════
    // E-E-A-T: EXPERIENCE STATS (for local credibility)
    // Section: optional (inherits from ontario.md) | Fields: REQUIRED
    // ═══════════════════════════════════════════════════════════════
    experienceStats: z.object({
      installationsInCity: z.number(),     // e.g., 500
      // NOTE: yearsSinceCityStart REMOVED — conflicts with "no longevity messaging" rule
    }).optional(),
  }),
});
```

### Blog Collection Extension (REQUIRED)

Add `locations` field for content filtering on location pages:

```typescript
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // ... existing fields ...

    // NEW: Location tagging for local relevance
    locations: z.array(z.string()).optional(),
    // Example: ["guelph", "kitchener", "cambridge"]
  }),
});
```

**Component Props Pattern:**

Each section component accepts optional props for content override:
```astro
---
// WhyChooseBAPSection.astro
interface Props {
  headline?: string;
  fullServiceBullets?: string[];
  warrantyMessage?: string;
  cityName?: string;
}

const {
  headline = "Why Homeowners Choose B.A.P",  // Default
  fullServiceBullets = [...defaultBullets],
  warrantyMessage = "...",
  cityName = "Southern Ontario",
} = Astro.props;
---
```

---

## Files to Modify (COMPREHENSIVE)

### Files to CREATE (New Components)

| Component | File Path | Purpose |
|-----------|-----------|---------|
| Why Choose B.A.P | `src/components/sections/WhyChooseBAPSection.astro` | Bento grid layout consolidating trust signals |
| FAQ Section | `src/components/sections/FAQSection.astro` | Schema-driven accordion with FAQPage JSON-LD |
| Scroll Banner | `src/components/banners/ScrollBanner.tsx` | 75% scroll trigger CTA (replaces exit modal) |
| Homepage Content | `src/content/locations/ontario.md` | Homepage defaults with `isLandingPage: true` |

### Files to MODIFY (Update for Props Pattern)

| Section | File Path | Changes Required |
|---------|-----------|------------------|
| **Schema** | `src/content/config.ts` | Add all new fields to locations collection, add `locations` to blog |
| **Hero** | `src/components/sections/HeroSection.astro` | Accept optional props, implement fallback chain |
| **Service Categories** | `src/components/sections/ServiceCategoriesGrid.astro` | Accept eyebrow/headline/subtext props |
| **Expert Consultation** | `src/components/sections/ExpertConsultationSection.astro` | Accept headline/bullets props |
| **Testimonials** | `src/components/sections/TestimonialsCarousel.tsx` | Accept eyebrow/headline/subtext props (keep existing filter logic) |
| **Project Gallery** | `src/components/sections/ProjectGallerySection.astro` | Accept headline props, filter by location |
| **Financing Preview** | `src/components/sections/FinancingPreviewSection.astro` | Accept rebateCard with city-specific LDC |
| **Service Area** | `src/components/sections/ServiceAreaSection.astro` | Add `showAllRegions` toggle, highlight current city |
| **Blog Preview** | `src/components/sections/BlogPreviewSection.astro` | Add `filterByLocation` support |
| **Final CTA** | `src/components/sections/FinalCTASection.astro` | Accept headline/bullets props |
| **Homepage** | `src/pages/index.astro` | Fetch ontario.md, pass to all sections |
| **Location Pages** | `src/pages/locations/[location].astro` | Use same components as homepage |

### Files to REMOVE (Deprecated)

| Component | File Path | Reason |
|-----------|-----------|--------|
| Value Props | `src/components/sections/ValuePropsGrid.astro` | Consolidated into WhyChooseBAPSection |
| Family Story | `src/components/sections/FamilyStorySection.astro` | Consolidated into WhyChooseBAPSection |
| Certifications | `src/components/sections/CertificationsSection.astro` | Consolidated into WhyChooseBAPSection |
| Exit Intent Modal | `src/components/modals/ExitIntentModal.tsx` | Replaced with ScrollBanner |
| **Sticky Phone Drawer** | `src/components/overlays/StickyPhoneDrawer.tsx` | **REMOVED** — ScrollBanner is sufficient |
| Emergency Page | `src/pages/emergency-service.astro` | Conflicts with premium positioning |
| Careers Page | `src/pages/careers.astro` | Not actively hiring |

**Also remove from schema:**
- `stickyPhone` field from locations collection — no longer used

---

## Additional Notes

### Reviews Collection — Filtering Requirements
The reviews collection already has `citySlug` field. Ensure filtering works:
```typescript
// Filter by city, then backfill with global
const localReviews = allReviews.filter(r => r.data.citySlug === location.slug);
const globalReviews = allReviews.filter(r => r.data.status === 'live');
```

### Case Studies Collection — Verify Location Field
```typescript
// Already has locationSlug in case-studies collection ✓
// Used for Project Gallery city filtering
```

### FAQs Collection — Scopes Pattern
```typescript
// Global FAQs: scopes includes "global"
// City FAQs: scopes includes "location:guelph"
const cityFaqs = allFaqs.filter(f => f.data.scopes?.includes(`location:${city}`));
```

---

## Implementation Phases (UPDATED)

### Phase 1: Schema & Data Structure
1. Extend `locations` collection with all new section fields in `src/content/config.ts`
2. Add `isLandingPage: z.boolean().default(false)` field
3. Add `locations` array to `blog` collection
4. Create `src/content/locations/ontario.md` with homepage defaults
5. Run `pnpm build` — verify no breaking changes (all fields optional)

### Phase 2: Component Architecture
1. Create `WhyChooseBAPSection.astro` (Bento Grid layout)
2. Create `FAQSection.astro` (with FAQPage JSON-LD schema)
3. Create `ScrollBanner.tsx` (75% scroll trigger)
4. Update each existing section component to accept optional props
5. Implement consistent fallback chain pattern in all components
6. Delete deprecated components (ValueProps, FamilyStory, Certifications, ExitIntentModal)

### Phase 3: Layout & Template Unification
1. Update `src/pages/index.astro`:
   - Fetch `ontario.md` (isLandingPage entry)
   - Pass data to all section components
   - Use new section order
2. Update `src/pages/locations/[location].astro`:
   - Filter out isLandingPage entries
   - Use SAME components as homepage
   - Pass location-specific data where available
3. Update Header nav structure (services focus)
4. Update Footer (verified pages only)
5. Delete Sticky Phone Drawer (ScrollBanner is sufficient)
6. Add ScrollBanner at 75% depth

### Phase 4: Content Creation (via Ralph + Skills)
1. `/orchestrator` → `/positioning-angles` — Lock in differentiation angles
2. `/orchestrator` → `/seo-content` — Write section content
3. `/orchestrator` → `/direct-response-copy` — Write CTAs and headlines
4. Research REAL rebate deadlines for hero badge
5. Populate ontario.md with all homepage defaults
6. Generate city-specific content for priority locations

### Phase 5: Visual Testing & Verification
1. `/agent-browser` — Desktop screenshots (1440px)
2. `/agent-browser` — Mobile screenshots (375px, 768px)
3. Verify all 14 sections render on homepage
4. Verify all 14 sections render on location pages
5. Test fallback behavior (remove city content, verify defaults show)
6. Verify phone CTAs are functional
7. Verify ScrollBanner triggers at 75% depth
8. Run `pnpm build` — zero errors

---

## Verification Checklist (MANDATORY BEFORE LAUNCH)

### Schema & Data
- [ ] `src/content/config.ts` has all new location fields
- [ ] `isLandingPage` field added to locations collection
- [ ] `locations` field added to blog collection
- [ ] `ontario.md` created with `isLandingPage: true`
- [ ] `ontario.md` excluded from location listings

### Components
- [ ] `WhyChooseBAPSection.astro` created with Bento grid
- [ ] `FAQSection.astro` created with FAQPage JSON-LD
- [ ] `ScrollBanner.tsx` created with 75% scroll trigger
- [ ] All section components accept optional props
- [ ] All section components implement fallback chain
- [ ] Deprecated components removed

### Pages
- [ ] Homepage (`/`) renders all 14 sections
- [ ] Homepage uses `ontario.md` content
- [ ] Location pages (`/locations/[city]`) render all 14 sections
- [ ] Location pages use city-specific content where available
- [ ] Location pages fall back to homepage defaults gracefully
- [ ] `isLandingPage` entries excluded from all location listings

### Functionality
- [ ] Hero H1 contains "HVAC Contractor" on all pages
- [ ] Testimonials filter by city with global fallback
- [ ] Blog preview filters by location tag
- [ ] Service area shows all regions on homepage
- [ ] Service area shows same region only on location pages
- [ ] FAQ generates FAQPage JSON-LD schema
- [ ] ScrollBanner triggers at 75% scroll depth
- [ ] ScrollBanner uses sessionStorage (key: `bap-scroll-banner-dismissed`)
- [ ] ~~Sticky phone CTA~~ **REMOVED** — verify no traces remain
- [ ] Exit intent modal is completely removed
- [ ] NO hardcoded content in any component
- [ ] All phone numbers from business.yaml
- [ ] Brand logos from business.yaml
- [ ] Map embed from business.yaml
- [ ] Stats from profile.yaml (NOT hardcoded)

### Build
- [ ] `pnpm build` passes with zero errors
- [ ] All 622+ pages generate successfully
- [ ] No TypeScript errors
- [ ] No missing imports

---

## business.yaml Structure (REQUIRED ADDITIONS)

Add the following fields to `src/content/business/profile.yaml`:

```yaml
# ═══════════════════════════════════════════════════════════════
# BRAND CERTIFICATIONS (for Brand Logo Ticker)
# Component reads this array to display logos
# Can enhance LocalBusiness structured data for Google
# ═══════════════════════════════════════════════════════════════
brands:
  - name: "Carrier"
    logo: "/images/badges/carrier.svg"
  - name: "Daikin"
    logo: "/images/badges/daikin.svg"
  - name: "Lennox"
    logo: "/images/badges/lennox.svg"
  - name: "Trane"
    logo: "/images/badges/trane.svg"
  - name: "Goodman"
    logo: "/images/badges/goodman.svg"

# ═══════════════════════════════════════════════════════════════
# GOOGLE MAPS EMBED (for Service Area Section)
# Store URL only — component constructs the iframe with proper attributes
# Get from Google Maps → Share → Embed a map → copy src URL
# ═══════════════════════════════════════════════════════════════
mapEmbed: "https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE_HERE"
```

**Badge SVG Files Required:**
Store in `/public/images/badges/` with dimensions 80×60:
- `tssa.svg` — TSSA Licensed
- `hrai.svg` — HRAI Member
- `heat-pump-champion.svg` — Heat Pump Champion
- `bbb.svg` — BBB A+ Rated
- `wsib.svg` — WSIB Covered
- `google.svg` — Google Rating badge
- `carrier.svg`, `daikin.svg`, `lennox.svg`, `trane.svg`, `goodman.svg` — Brand logos

---

## Component Props Reference Table

| Component | Prop | Type | Required | Default Source |
|-----------|------|------|----------|----------------|
| **HeroSection** | title | string | No | ontario.md hero.title |
| **HeroSection** | subtitle | string | No | ontario.md hero.subtitle |
| **HeroSection** | trustBadgeText | string | No | ontario.md hero.trustBadgeText |
| **HeroSection** | rebateBadge | object | No | ontario.md hero.rebateBadge |
| **HeroSection** | answeringTeamText | string | No | ontario.md hero.answeringTeamText |
| **SectionHeader** | eyebrow | string | No | undefined |
| **SectionHeader** | headline | string | **YES** | — |
| **SectionHeader** | subtext | string | No | undefined |
| **SectionHeader** | align | 'center' \| 'left' | No | 'center' |
| **SectionHeader** | variant | 'default' \| 'dark' | No | 'default' |
| **ServiceCategoriesGrid** | eyebrow | string | No | ontario.md |
| **ServiceCategoriesGrid** | headline | string | No | ontario.md |
| **ServiceCategoriesGrid** | subtext | string | No | ontario.md |
| **ServiceCategoriesGrid** | categoryOrder | string[] | No | services collection order |
| **ExpertConsultationSection** | eyebrow | string | No | ontario.md |
| **ExpertConsultationSection** | headline | string | No | ontario.md |
| **ExpertConsultationSection** | subtext | string | No | ontario.md |
| **ExpertConsultationSection** | bullets | string[] | No | ontario.md |
| **ExpertConsultationSection** | image | object | No | ontario.md |
| **WhyChooseBAPSection** | eyebrow | string | No | ontario.md |
| **WhyChooseBAPSection** | headline | string | No | ontario.md |
| **WhyChooseBAPSection** | fullServiceBullets | string[] | No | ontario.md |
| **WhyChooseBAPSection** | warrantyCard | object | No | ontario.md |
| **WhyChooseBAPSection** | — | — | — | Stats from profile.yaml |
| **TestimonialsCarousel** | eyebrow | string | No | ontario.md |
| **TestimonialsCarousel** | headline | string | No | ontario.md |
| **TestimonialsCarousel** | subtext | string | No | ontario.md |
| **TestimonialsCarousel** | — | — | — | Uses existing filter logic (no featuredReviewIds) |
| **ProjectGallerySection** | eyebrow | string | No | ontario.md |
| **ProjectGallerySection** | headline | string | No | ontario.md |
| **ProjectGallerySection** | filterByLocation | boolean | No | false |
| **FinancingPreviewSection** | eyebrow | string | No | ontario.md |
| **FinancingPreviewSection** | headline | string | No | ontario.md |
| **FinancingPreviewSection** | rebateCard | object | No | ontario.md |
| **ServiceAreaSection** | eyebrow | string | No | ontario.md |
| **ServiceAreaSection** | headline | string | No | ontario.md |
| **ServiceAreaSection** | showAllRegions | boolean | No | true |
| **ServiceAreaSection** | currentCityHighlight | string | No | '' |
| **ServiceAreaSection** | — | — | — | Map from profile.yaml mapEmbed |
| **FAQSection** | eyebrow | string | No | ontario.md |
| **FAQSection** | headline | string | No | ontario.md |
| **FAQSection** | items | array | No | ontario.md |
| **FAQSection** | showViewAllLink | boolean | No | true |
| **BlogPreviewSection** | eyebrow | string | No | ontario.md |
| **BlogPreviewSection** | headline | string | No | ontario.md |
| **BlogPreviewSection** | filterByLocation | boolean | No | false |
| **FinalCTASection** | eyebrow | string | No | ontario.md |
| **FinalCTASection** | headline | string | No | ontario.md |
| **FinalCTASection** | subtext | string | No | ontario.md |
| **FinalCTASection** | bullets | string[] | No | ontario.md |
| **ScrollBanner** | text | string | No | ontario.md |
| **ScrollBanner** | ctaText | string | No | ontario.md |
| **ScrollBanner** | enabled | boolean | No | true |

---

## File Structure Summary

```
src/
├── components/
│   ├── SectionHeader.astro                  ← CREATE (variant prop for dark mode)
│   ├── sections/
│   │   ├── HeroSection.astro                ← UPDATE (props pattern)
│   │   ├── BrandLogoTicker.astro            ← UPDATE (read from profile.yaml)
│   │   ├── ServiceCategoriesGrid.astro      ← UPDATE (categoryOrder support)
│   │   ├── ExpertConsultationSection.astro  ← UPDATE (props pattern)
│   │   ├── WhyChooseBAPSection.astro        ← CREATE (bento grid, stats from profile)
│   │   ├── TestimonialsCarousel.tsx         ← UPDATE (props pattern, keep existing filter)
│   │   ├── ProjectGallerySection.astro      ← UPDATE (filterByLocation)
│   │   ├── FinancingPreviewSection.astro    ← UPDATE (emphasis via schema)
│   │   ├── ServiceAreaSection.astro         ← UPDATE (mapEmbed from profile)
│   │   ├── FAQSection.astro                 ← CREATE (inline items, JSON-LD)
│   │   ├── BlogPreviewSection.astro         ← UPDATE (filterByLocation)
│   │   └── FinalCTASection.astro            ← UPDATE (variant="dark")
│   └── banners/
│       └── ScrollBanner.tsx                 ← CREATE (sessionStorage persistence)
├── content/
│   ├── business/
│   │   └── profile.yaml                     ← UPDATE (add brands[], mapEmbed)
│   └── locations/
│       └── ontario.md                       ← CREATE (isLandingPage: true)
└── pages/
    ├── index.astro                          ← UPDATE (fetch ontario.md)
    └── locations/
        └── [location].astro                 ← UPDATE (same template as homepage)

DELETE:
├── src/components/sections/ValuePropsGrid.astro
├── src/components/sections/FamilyStorySection.astro
├── src/components/sections/CertificationsSection.astro
├── src/components/modals/ExitIntentModal.tsx
├── src/components/overlays/StickyPhoneDrawer.tsx    ← REMOVED (ScrollBanner is sufficient)
├── src/pages/emergency-service.astro
└── src/pages/careers.astro
```

---

## Summary of Key Architecture Decisions

### STRICT RULES (NO EXCEPTIONS)

1. **NO hardcoded content** — Everything schema-driven from ontario.md or business.yaml
2. **Template-driven pages** — Homepage and location pages use same components
3. **profile.yaml = source of truth** — Phone, stats, brands, maps all from business profile
4. **NO longevity messaging** — Remove all "Since 1994", "30+ Years" references
5. **Hero is STANDALONE** — Does NOT use SectionHeader, uses 'title' for H1
6. **FAQs inline only** — No itemRefs pattern, always inline in frontmatter
7. **sessionStorage for ScrollBanner** — Key: `bap-scroll-banner-dismissed`, resets on tab close

### REMOVED ELEMENTS

| Element | Status | Reason |
|---------|--------|--------|
| "Since 1994" badge | **REMOVED** | No longevity messaging |
| Sticky Phone Drawer | **REMOVED** | ScrollBanner is sufficient |
| Exit Intent Modal | **REMOVED** | Replaced by ScrollBanner |
| ValuePropsGrid | **REMOVED** | Consolidated into Why Choose |
| FamilyStorySection | **REMOVED** | Consolidated into Why Choose |
| CertificationsSection | **REMOVED** | Consolidated into Why Choose |
| /careers page | **DELETE** | Not actively hiring |
| /emergency-service page | **DELETE** | Conflicts with premium positioning |
| stickyPhone schema field | **REMOVE** | Component deleted |
| stats.yearsServing | **REMOVE** | No longevity messaging |

### DATA FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│ TIER 1: Location-Specific (e.g., guelph.md)                    │
│ → Highest priority, used if present                            │
└─────────────────────────────────────────────────────────────────┘
                              ↓ fallback
┌─────────────────────────────────────────────────────────────────┐
│ TIER 2: Homepage Defaults (ontario.md isLandingPage: true)     │
│ → Used when location doesn't override                          │
└─────────────────────────────────────────────────────────────────┘
                              ↓ fallback
┌─────────────────────────────────────────────────────────────────┐
│ TIER 3: Business Profile (profile.yaml)                        │
│ → Phone, stats, brands, mapEmbed — ALWAYS from here           │
└─────────────────────────────────────────────────────────────────┘
```
