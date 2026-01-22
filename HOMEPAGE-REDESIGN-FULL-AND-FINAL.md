# B.A.P Heating & Cooling — Homepage Redesign
## Full & Final Implementation Document

**Document Status:** FINAL — Ready for Implementation
**Date:** January 21, 2026
**Supersedes:** CRO-PHONE-CONVERSION-AUDIT.md, HOMEPAGE-REDESIGN-DECISIONS.md

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Development Workflow: /frontend-design + shadcn MCP](#development-workflow-frontend-design--shadcn-mcp)
3. [Business Context & Target Customer](#business-context--target-customer)
4. [Positioning & Value Proposition](#positioning--value-proposition)
5. [Competitive Analysis](#competitive-analysis)
6. [Design System & Aesthetic](#design-system--aesthetic)
7. [Homepage Section Flow (14 Sections)](#homepage-section-flow-14-sections)
8. [New Components to Build](#new-components-to-build)
9. [Foundation Components to Build](#foundation-components-to-build)
10. [Content Architecture](#content-architecture)
11. [SEO & Internal Linking Strategy](#seo--internal-linking-strategy)
12. [Skills Execution Workflow](#skills-execution-workflow)
13. [Build Process & Phases](#build-process--phases)
14. [Files to Create](#files-to-create)
15. [Files to Modify](#files-to-modify)
16. [Verification & Testing](#verification--testing)
17. [Out of Scope](#out-of-scope)

---

## Executive Summary

### The Pivot

The original CRO audit was **fundamentally misaligned** with business goals. It optimized for emergency/repair traffic when the actual priority is **high-ticket installation leads targeting affluent homeowners**.

| Original Focus (WRONG) | Corrected Focus (RIGHT) |
|------------------------|-------------------------|
| Emergency capture (24/7, "3 slots available") | Premium installation positioning |
| Problem-agitation for broken systems | Affluent homeowner targeting |
| Urgency/scarcity tactics | Accountability and peace of mind |
| Repair-focused messaging | Research-mode user experience |
| Multiple CTAs (phone + booking) | Single CTA: Phone call only |

### Expected Impact

- **60-90% increase** in qualified phone leads
- **Higher average ticket value** (installations vs repairs)
- **Improved lead quality** (affluent, decision-ready homeowners)
- **Stronger SEO rankings** for installation-intent keywords

### Current Codebase State (Updated January 21, 2026)

| Component | Status | Notes |
|-----------|--------|-------|
| **Pages** | ✅ 628 pages built | Homepage, services, locations, service-city, blog, supporting |
| **Content** | ✅ 11 collections | services (22), locations (25), service-city (550), blog (6), reviews (74+), FAQs (35) |
| **Layout** | ✅ BaseLayout.astro | SEO, schema, meta tags, responsive |
| **Components** | ✅ 21+ sections built | Hero, ValueProps, Categories, Testimonials, Footer, etc. |
| **Foundation** | ✅ **COMPLETE** | shadcn MCP + CSS variables + brand colors |
| **shadcn/ui** | ✅ **INSTALLED** | button, card, badge, separator, accordion, carousel, dialog, sheet |
| **Build** | ✅ **PASSING** | 628 pages generate successfully |
| **Branding** | ✅ **COMPLETE** | Colors, typography, spacing, accessibility (Phase 6 done) |

**Phases Complete:**
- ✅ Phase 1: Foundation
- ✅ Phase 2: Homepage Build (17 sections)
- ✅ Phase 3: Page Templates (628 pages)
- ✅ Phase 4: Integration & QA
- ✅ Phase 5: Branding Polish (merged to main)

**Current Phase:** Phase 7 — Lead Conversion Page Architecture + Content

**Key Gap:** Service and service-city pages have structure but lack lead conversion flow. Content exists but is thin (~200 words service-city, ~250 words locations). Need 800+ and 1000+ respectively.

---

## Development Workflow: `/frontend-design` + shadcn MCP

### Overview

The site will be built using:
- **`/frontend-design` skill** — AI-powered design generation per section/page
- **shadcn/ui MCP** — Production-ready, accessible components
- **Astro + React 19** — Framework with React integration
- **Tailwind CSS (neutral theme)** — Professional baseline, easy to customize

### Why This Approach

| Traditional Approach | This Approach |
|---------------------|---------------|
| Manual UI design & coding | AI generates design, we implement |
| Build components one-by-one | Leverage shadcn library |
| Custom CSS from scratch | shadcn neutral theme baseline |
| Slow iteration | Rapid prototyping |
| Homepage only initially | All pages in scope |

**Result:** Significantly faster development while maintaining quality and business requirements.

### ⚠️ MANDATORY: NO WORK WITHOUT SKILLS

**CRITICAL RULE:** Every component, every page, every piece of content MUST use skills. NO manual work. NO exceptions.

### Workflow Per Component (MANDATORY SEQUENCE)

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: SEARCH SHADCN (shadcn MCP) — MANDATORY                 │
│  Tool: mcp__shadcn__search_items_in_registries                  │
│  Action: Search for components to reuse (button, card, badge)   │
│  Purpose: Avoid rebuilding what exists                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: DESIGN (/frontend-design skill) — MANDATORY            │
│  Input:                                                          │
│   ├─ Section requirements (from this doc)                       │
│   ├─ Business data (profile.yaml)                               │
│   ├─ Design constraints (NO gradients, premium, accessible)     │
│   ├─ shadcn components to use (from Step 1)                     │
│   ├─ Layout specifications                                      │
│   └─ Aesthetic constraints                                      │
│  Output: Complete implementation plan                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: IMPLEMENT — Use shadcn primitives                      │
│  Action:                                                         │
│   ├─ Create Astro component in src/components/sections/         │
│   ├─ Import shadcn components (Button, Card, Badge, etc.)       │
│   ├─ Pull data from profile.yaml                                │
│   ├─ Add placeholder images: bg-muted aspect-video              │
│   └─ Add new shadcn components via MCP if needed                │
│  Quality Gate: pnpm build MUST pass                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: TEST (/agent-browser skill) — MANDATORY                │
│  Test scenarios:                                                 │
│   ├─ Mobile (375px): Stack, touch targets ≥ 44px                │
│   ├─ Tablet (768px): Responsive layout                          │
│   ├─ Desktop (1024px): Full layout                              │
│   ├─ Interactions: CTAs, links, hover states                    │
│   └─ Placeholder images render                                  │
│  Quality Gate: All viewports pass                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 5: REVIEW (/web-design-guidelines) — MANDATORY            │
│  Check:                                                          │
│   ├─ WCAG AA color contrast                                     │
│   ├─ Heading hierarchy (h1 → h2 → h3)                           │
│   ├─ Touch targets ≥ 44px                                       │
│   ├─ Keyboard navigation                                        │
│   └─ Screen reader compatibility                                │
│  Quality Gate: Fix ALL Critical/High issues                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  STEP 6: COMMIT — Only after all gates pass                     │
│  Requirements:                                                   │
│   ├─ pnpm build passes                                          │
│   ├─ All quality gates passed                                   │
│   └─ Update prd.json: passes: true                              │
│  Action: git commit -m "feat: [Component Name]"                 │
└─────────────────────────────────────────────────────────────────┘
```

**Skills Summary by Work Type:**

| Work Type | Required Skills (in order) |
|-----------|----------------------------|
| New component | shadcn MCP search → `/frontend-design` → `/agent-browser` → `/web-design-guidelines` |
| Redesign component | Read existing → shadcn MCP search → `/frontend-design` → `/agent-browser` → `/web-design-guidelines` |
| Content generation | `/orchestrator` → `/seo-content` (or other content skill) |
| Marketing copy | `/orchestrator` → `/direct-response-copy` |
| Strategy | `/orchestrator` → `/positioning-angles` or `/keyword-research` or `/brand-voice` |

### Foundation Status (COMPLETE ✓)

- ✅ shadcn MCP server connected
- ✅ CSS variables configured (neutral theme)
- ✅ Tailwind theme extended
- ✅ Core shadcn components installed: button, card, badge, separator, accordion, carousel, dialog, sheet
- ✅ Build passing (622 pages)

**Current Phase:** Homepage Build (Phase 2)

---

## Business Context & Target Customer

### Target Customer Profile

| Attribute | Value |
|-----------|-------|
| **Income Level** | Affluent / High disposable income |
| **Purchase Type** | High-ticket installations ($10,000-$15,000+) |
| **Decision Mode** | Research-based, wants peace of mind |
| **Pain Point** | Don't want to manage decisions, risk, or follow-ups |
| **Geographic Focus** | Wealthy areas of Southern Ontario + rebate-friendly areas (Elora) |

### What They Want

> "A wealthy homeowner would choose B.A.P because they don't want to manage decisions, risk, or follow-ups. They want a company with enough history and judgment to make the right call the first time, install it properly, and stand behind it years later without excuses. **Price isn't the concern — accountability and peace of mind are.**"

### Services Priority

| Priority | Services |
|----------|----------|
| **HIGH** | Furnace installation, AC installation, heat pumps, boilers |
| **MEDIUM** | Maintenance plans, repairs, IAQ |
| **LOW** | Duct cleaning, water treatment (de-emphasize) |

### Geographic Priority

- **Primary:** Wealthy areas (Guelph, Cambridge, Kitchener, Waterloo)
- **Secondary:** Rebate-friendly areas (Elora — good incentives help close)
- **Tertiary:** Remaining 25 service cities

---

## Positioning & Value Proposition

### Core Value Proposition

**Accountability and Peace of Mind**

- 30+ years of history and judgment
- Make the right call the first time
- Install properly
- Stand behind work years later without excuses

### Trust Signals That Matter (for high-ticket buyers)

1. **TSSA Licensed** — Professional certification
2. **10-Year Warranty** — Long-term commitment
3. **30+ Years in Business** — Proven track record
4. **Certified Brand Dealer** — Carrier, Daikin, etc.

### Trust Signals to De-emphasize

- 24/7 availability (signals repair, not installation)
- "Fast response" messaging
- Emergency slot availability
- Urgency/scarcity tactics

### CTA Strategy

| Element | Decision |
|---------|----------|
| **Primary CTA** | Phone call only |
| **CTA Copy** | "Get a Free Installation Quote" (context-dependent per page) |
| **CTA Format** | Phone icon + text |
| **Secondary CTA** | Email (mailto: link) |
| **NOT included** | Online booking, forms (future project) |

---

## Competitive Analysis

### Primary Competitor: Aire One KW

**URL:** https://aireonekw.ca/

| Element | Aire One | B.A.P Opportunity |
|---------|----------|-------------------|
| **H1** | "Top-Rated HVAC Services In Kitchener-Waterloo" | Premium installation focus |
| **Subtext** | "Trusted since 1990" | "Since 1994" + accountability message |
| **Hero** | Video + background image | High-quality static image (video is gap) |
| **Trust Badges** | BBB, Google reviews, Facebook | Match + add brand certifications |
| **Positioning** | Trusted, top-rated, tenure | Accountability, peace of mind, judgment |

### Differentiation Strategy

Use `/positioning-angles` skill to find unique angle. Potential directions:
- **The "Decision-Free" Partner** — We handle everything so you don't have to
- **The "Stand Behind It" Guarantee** — Accountability years after installation
- **The "Right First Time" Experts** — 30 years of judgment, not just service

---

## Design System & Aesthetic

### Premium Aesthetic Requirements

| Element | Guideline |
|---------|-----------|
| **Borders** | NO gradient borders |
| **Buttons** | NO gradient buttons, solid colors only |
| **Spacing** | Generous, luxurious spacing (larger than 44px touch targets) |
| **Colors** | Premium palette, restrained use |
| **Typography** | Clean, professional, easy to read |
| **Imagery** | High-quality, outcome-focused (completed installations, happy families) |

### Visual Positioning

- **Premium and luxury aesthetic**
- **Must NOT alienate middle-class homeowners**
- Balance: aspirational but accessible
- No overtly luxury signals (gold accents, mansion-only imagery)

### Image Strategy

- **Development:** Solid color blocks with dimensions as placeholders
- **Final:** Client replaces with real photos from past projects
- **Focus:** Outcome photos (pristine installations) over process photos (technician working)

### Background Pattern (Section Alternation)

```
Section 1 (Hero): gradient-mesh-cool
Section 2 (Value Props): white
Section 3 (Brand Ticker): white
Section 4 (Categories): muted (gray-50)
Section 5 (Expert): primary-light (primary-50/30)
Section 6 (Gallery): white
Section 7 (Testimonials): muted (gray-50)
Section 8 (Family): white
Section 9 (Service Area): muted (gray-50)
Section 10 (Financing): white
Section 11 (Blog): muted (gray-50)
Section 12 (Certifications): white
Section 13 (Final CTA): primary-light (primary-50/30)
Section 14 (Footer): gray-900
```

---

## Homepage Section Flow (14 Sections)

### Sections REMOVED from Original Plan

| Section | Reason for Removal |
|---------|-------------------|
| Emergency CTA Banner | Not aligned with installation focus; emergency users will call anyway |
| Problem-Agitation Section | Attracts repair seekers; "Furnace making strange noises?" is wrong messaging |

### Final Section Flow

```
┌─────────────────────────────────────────────────────────────┐
│ Section 0: HEADER                                            │
│ • Sticky at top                                              │
│ • "Since 1994" badge next to logo                           │
│ • Nav: Services | Locations | About | Financing | Blog      │
│ • NO sticky phone CTA (moved to drawer)                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 1: HERO — Premium First Impression                   │
│ • H1: [Keyword] + [Location] + [Clear benefit]              │
│ • Subhead: "Since 1994 • 4.8★ from 407+ reviews"           │
│ • Rebate mention: "Up to $10,000 in rebates available"     │
│ • Single CTA: Phone icon + "Get a Free Installation Quote" │
│ • Background: High-quality installation outcome image       │
│ • Goal: Premium positioning + immediate conversion path     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 2: VALUE PROPS GRID — Trust Foundation               │
│ • 4 cards: TSSA Licensed | 10-Year Warranty | 30+ Years |  │
│   Certified Brand Dealer                                     │
│ • NO 24/7 emphasis (signals repair)                         │
│ • Background: White                                          │
│ • Goal: "This is a legitimate, established business"        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 3: BRAND LOGO TICKER                                 │
│ • Horizontal scroll: Carrier, Daikin, Lennox, etc.          │
│ • "Certified Dealer" label                                   │
│ • Smooth scroll on mobile                                    │
│ • Background: White                                          │
│ • Goal: Brand authority + quality signal                    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 4: SERVICE CATEGORIES GRID                           │
│ • 5 category cards: Heating | Cooling | IAQ | Water |       │
│   Commercial                                                 │
│ • Each card links to /services/category/[category]          │
│ • NOT individual services (those live on category pages)    │
│ • Background: Muted (gray-50)                               │
│ • Goal: Clear navigation to service areas                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 5: EXPERT CONSULTATION — Low-Pressure CTA            │
│ • Heading: "Not Sure What You Need?"                        │
│ • Subhead: "Talk to Our HVAC Experts — Free Consultation"   │
│ • 4 trust bullets:                                           │
│   ✓ 30+ Years Experience                                    │
│   ✓ Free Phone Estimates                                    │
│   ✓ No Obligation, No Pressure                              │
│   ✓ Licensed & Certified Technicians                        │
│ • CTA: Large phone button                                    │
│ • Background: Primary-light                                  │
│ • Goal: Convert hesitant browsers                           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 6: PROJECT GALLERY — Visual Social Proof             │
│ • Heading: "Real Projects Across Southern Ontario"          │
│ • 6-8 image grid (placeholder colors during dev)            │
│ • Hover overlay: Project type + location                    │
│ • CTA: "View All Projects" → /case-studies                  │
│ • Background: White                                          │
│ • Goal: "I can see the quality they deliver"                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 7: TESTIMONIALS CAROUSEL                             │
│ • Google rating: 4.8★ from 407+ reviews                     │
│ • Surface INSTALLATION-specific reviews                      │
│ • Each card: Quote, name, city, rating, verified badge      │
│ • CTA: "View All Reviews on Google"                         │
│ • Background: Muted (gray-50)                               │
│ • Goal: "People like me trust them for installations"       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 8: FAMILY STORY / MEET THE TEAM                      │
│ • Heading: "A Family Business Serving Families Since 1994"  │
│ • Split layout: Family photo (50%) + Story text (50%)       │
│ • Story: Owner Paul Palmer, commitment, 30+ years           │
│ • Team grid: 3-4 technician photos with names               │
│ • CTA: "Meet the Team" → /about                             │
│ • Background: White                                          │
│ • Goal: "Real family, not faceless corporation"             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 9: SERVICE AREA MAP + CITY GRID                      │
│ • Heading: "Proudly Serving Southern Ontario Since 1994"    │
│ • Map visual: Coverage radius from Guelph (placeholder)     │
│ • 25 cities in regional groups                               │
│ • Each city links to /locations/[city]                      │
│ • Background: Muted (gray-50)                               │
│ • Goal: "They serve my neighborhood"                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 10: FINANCING PREVIEW                                │
│ • Heading: "Flexible Financing — Make Comfort Affordable"   │
│ • 3 cards: 0% Financing | Payment Plans | Rebates           │
│ • Highlight: "Up to $10,000 in government rebates"          │
│ • CTA: Phone button + "View Full Details" → /rebates        │
│ • Background: White                                          │
│ • Goal: "I can afford this investment"                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 11: BLOG PREVIEW — SEO Content                       │
│ • Heading: "HVAC Tips & Advice from the Experts"            │
│ • Auto-fetch: Latest 3 blog posts from collection           │
│ • Each card: Image, title, excerpt, "Read More"             │
│ • CTA: "View All Articles" → /blog                          │
│ • Background: Muted (gray-50)                               │
│ • Goal: "Educators, not just salespeople" + SEO             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 12: CERTIFICATIONS & TRUST BADGES                    │
│ • Badges: TSSA, HRAI, BBB A+, WSIB, Brand Certs, Google    │
│ • Grid layout with logos                                     │
│ • Background: White                                          │
│ • Goal: "Officially legitimate and protected"               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 13: FINAL CONVERSION — QuickQuote                    │
│ • Heading: "Get Your Free Installation Estimate"            │
│ • Subhead: "No obligation • Same-day response • 10-year    │
│   warranty"                                                  │
│ • 4 trust bullets                                            │
│ • Single CTA: Large phone button                            │
│ • Background: Primary-light                                  │
│ • Goal: "Ready to commit"                                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Section 14: FOOTER                                           │
│ • 5 columns: Services | Locations | Company | Resources |   │
│   Contact                                                    │
│ • Phone CTA (footer variant)                                │
│ • Background: Gray-900                                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PERSISTENT: STICKY PHONE DRAWER                              │
│ • Position: Fixed bottom of viewport                        │
│ • Show: When user scrolls UP (after trust section)          │
│ • Hide: When user scrolls DOWN                              │
│ • Content: Phone + "Get a Free Installation Quote" | Email  │
│ • Style: Premium, subtle shadow, no gradients               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ OVERLAY: EXIT INTENT MODAL                                   │
│ Desktop: Mouse leaves viewport (after 10+ seconds)          │
│ Mobile: 75% scroll depth OR 30 seconds                      │
│ Content:                                                     │
│ • "Have Questions About Your HVAC Project?"                 │
│ • "Our experts are ready to help — no pressure"            │
│ • Phone button (primary) | Email button (secondary)         │
│ Frequency: Once per session                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## New Components to Build

### 1. StickyPhoneDrawer.tsx

**Location:** `src/components/cta/StickyPhoneDrawer.tsx`

**Behavior:**
```
- Position: Fixed bottom of viewport
- Default: Hidden
- Show: When user scrolls UP (after passing Section 2)
- Hide: When user scrolls DOWN
- Content: Phone icon + "Get a Free Installation Quote" | Email icon + mailto
- Style: Premium, subtle shadow, rounded top corners
- Animation: Slide up/down (150ms ease)
```

**Props:**
```typescript
interface StickyPhoneDrawerProps {
  phoneNumber: string;
  phoneCTA: string;        // "Get a Free Installation Quote"
  emailAddress: string;
  showAfterSection?: string; // CSS selector for trigger section
}
```

### 2. ExitIntentModal.tsx

**Location:** `src/components/modals/ExitIntentModal.tsx`

**Behavior:**
```
Desktop:
- Trigger: Mouse leaves viewport top
- Delay: Only after 10+ seconds on page
- Frequency: Once per session (localStorage flag)

Mobile:
- Trigger: 75% scroll depth OR 30 seconds on page (whichever first)
- Frequency: Once per session

Content:
- Heading: "Have Questions About Your HVAC Project?"
- Subhead: "Our experts are ready to help — no pressure, no obligation"
- Phone button (primary): "Call Now"
- Email button (secondary): "Send Email"
- Close button (X)
```

### 3. BrandLogoTicker.astro

**Location:** `src/components/ui/BrandLogoTicker.astro`

**Behavior:**
```
- Continuous horizontal scroll (CSS animation)
- Pause on hover (desktop)
- Logos: Carrier, Daikin, Lennox, etc.
- Label: "Certified Dealer"
- Mobile: Smooth scroll, no layout shift
```

**Props:**
```typescript
interface BrandLogoTickerProps {
  logos: Array<{ src: string; alt: string; }>;
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
}
```

### 4. CategoryCard.astro

**Location:** `src/components/cards/CategoryCard.astro`

**Purpose:** Service category card for homepage grid

**Props:**
```typescript
interface CategoryCardProps {
  title: string;        // "Heating"
  description: string;  // "Furnaces, boilers, heat pumps"
  icon: string;         // Lucide icon name
  href: string;         // "/services/category/heating"
  accentColor: string;  // "heating" | "cooling" | "iaq" etc.
}
```

### 5. ProjectGallerySection.astro

**Location:** `src/components/sections/ProjectGallerySection.astro`

**Layout:**
```
- Heading + subheading
- 6-8 image grid (3-4 columns desktop, 2 mobile)
- Hover overlay: Project type + location + "View Project"
- CTA: "View All Projects" → /case-studies
```

### 6. FamilyStorySection.astro

**Location:** `src/components/sections/FamilyStorySection.astro`

**Layout:**
```
- Split: Image (50%) + Content (50%)
- Content: Heading, 2-3 paragraphs, team grid (3-4 photos)
- CTA: "Meet the Team" → /about
- Mobile: Stack vertically
```

### 7. ExpertConsultationSection.astro

**Location:** `src/components/sections/ExpertConsultationSection.astro`

**Layout:**
```
- Heading + subheading
- 4 trust bullets (checkmarks)
- Large phone CTA
- Background image with overlay (or solid primary-light)
```

### 8. FinancingPreviewSection.astro

**Location:** `src/components/sections/FinancingPreviewSection.astro`

**Layout:**
```
- Heading + subheading
- 3 cards: 0% Financing | Payment Plans | Rebates
- Each card: Icon + headline + 2-line description
- CTA row: Phone button + "View Details" link
```

### 9. BlogPreviewSection.astro

**Location:** `src/components/sections/BlogPreviewSection.astro`

**Behavior:**
```typescript
// Auto-fetch latest 3 published blog posts
const posts = await getCollection('blog', ({ data }) =>
  data.workflowStatus === 'published'
).then(posts => posts.slice(0, 3));
```

**Layout:**
```
- Heading + subheading
- 3 cards: Image + title + excerpt + "Read More"
- CTA: "View All Articles" → /blog
```

---

## Foundation Components to Build

**NOTE:** The original document referenced "Existing Components to Modify" but verification confirmed that `src/components/` is completely empty. All components must be built from scratch.

### 1. Header.astro

**File:** `src/components/Header.astro` — **BUILD FROM SCRATCH**

**Requirements:**
- Sticky positioning at top
- "Since 1994" badge next to logo
- Navigation: Services | Locations | About | Financing | Blog
- NO sticky phone CTA (moved to StickyPhoneDrawer)
- Mobile hamburger menu
- Desktop dropdown for Services

### 2. PhoneCTA.astro

**File:** `src/components/cta/PhoneCTA.astro` — **BUILD FROM SCRATCH**

**Requirements:**
- `ctaCopy` prop for context-aware text
- Default: "Get a Free Installation Quote"
- Variants: "Get a Repair Quote", "Get a Maintenance Quote"
- Phone icon (Lucide)
- tel: link functionality
- Size variants: sm, md, lg
- Style variants: primary, secondary, footer

### 3. ServiceAreaGrid.astro

**File:** `src/components/sections/ServiceAreaGrid.astro` — **BUILD FROM SCRATCH**

**Requirements:**
- Heading: "Proudly Serving Southern Ontario Since 1994"
- Map visual placeholder above city grid
- Placeholder: Solid color block with "Map — Coverage Radius from Guelph"
- 25 cities in regional groups (grid layout)
- Each city links to /locations/[city]

### 4. TrustBadges.astro

**File:** `src/components/sections/TrustBadges.astro` — **BUILD FROM SCRATCH**

**Requirements:**
- Grid layout with certification badges
- Include: TSSA, HRAI, BBB A+, WSIB, Brand Certs, Google
- Placeholder: Rectangles with badge names during dev
- Order: License → Warranty → Years → Brands
- NO 24/7 emphasis (signals repair, not installation)

### 5. Footer.astro

**File:** `src/components/Footer.astro` — **BUILD FROM SCRATCH**

**Requirements:**
- 5 columns: Services | Locations | Company | Resources | Contact
- Phone CTA (footer variant)
- Background: Gray-900
- Links to all major pages
- Copyright and business info

---

## Content Architecture

### New Content Collections

#### Homepage Collection

**Location:** `src/content/homepage/`

```yaml
# hero.yaml
headline: string
subheadline: string
trustLine: string          # "Since 1994 • 4.8★ from 407+ reviews"
rebateMention: string      # "Up to $10,000 in rebates available"
ctaCopy: string            # "Get a Free Installation Quote"
backgroundImage: string    # placeholder path

# services-grid.yaml
categories:
  - title: string
    description: string
    icon: string
    href: string
    accentColor: string

# expert-consultation.yaml
headline: string
subheadline: string
trustBullets: string[]
ctaCopy: string
backgroundImage: string

# project-gallery.yaml
headline: string
subheadline: string
projects:
  - image: string
    title: string
    location: string
    type: string
    caseStudySlug: string

# family-story.yaml
headline: string
story: string              # Markdown
familyImage: string
teamMembers:
  - name: string
    role: string
    image: string

# financing-preview.yaml
headline: string
subheadline: string
options:
  - title: string
    description: string
    icon: string
rebateHighlight: string

# brand-ticker.yaml
label: string              # "Certified Dealer"
logos:
  - src: string
    alt: string
```

#### Service Categories Collection

**Location:** `src/content/service-categories/`

```yaml
# heating.md
---
title: "Heating Services"
description: "Expert furnace, boiler, and heat pump installation..."
icon: "flame"
accentColor: "heating"
services:
  - furnace-installation
  - furnace-repair
  - boiler-installation
  # etc.
seoTitle: "Heating Services in Guelph & Southern Ontario | B.A.P"
seoDescription: "..."
---

[Markdown content for category landing page]
```

### Existing Collections (No Schema Changes)

| Collection | Count | Status |
|------------|-------|--------|
| services | 22 | ✓ Ready |
| locations | 25 | ✓ Ready |
| service-city | 550 | Needs content generation |
| blog | 6 | Needs expansion |
| case-studies | 3 | Needs expansion |
| reviews | 74+ | ✓ Ready |
| faqs | 35 | ✓ Ready |

### Content Requirements by Page Type

| Page Type | Min Words | Uniqueness | Content Source |
|-----------|-----------|------------|----------------|
| Homepage sections | N/A | 100% | Skills + manual |
| Category pages | 500+ | 100% | `/seo-content` skill |
| Service pages | Existing | Update headlines | `/seo-content` skill |
| Location pages | 1000+ | 100% | `/seo-content` skill |
| Service-city pages | 800+ | 80%+ | `/seo-content` skill |
| Blog posts | 1500+ | 100% | `/seo-content` skill |
| Rebates page | 1000+ | 100% | Research + skill |

---

## SEO & Internal Linking Strategy

### Keyword Strategy

**Primary Keywords (Homepage):**
- "HVAC installation Guelph"
- "Furnace installation Southern Ontario"
- "Premium HVAC services"

**Category Keywords:**
- "Heating services Guelph"
- "AC installation Kitchener"
- "Indoor air quality systems"

**Service-City Keywords:**
- "Furnace installation [city] ON"
- "AC repair [city] Ontario"
- "[Service] near me [city]"

**Execute:** `/keyword-research` skill for full keyword map

### Internal Linking Architecture

**Utility to Create:** `src/utils/getInternalLinks.ts`

```typescript
export function getInternalLinks(page: {
  type: 'service' | 'location' | 'service-city' | 'category' | 'blog';
  slug: string;
  category?: string;
  region?: string;
  serviceSlug?: string;
  locationSlug?: string;
}): InternalLink[] {
  // Returns contextual internal links based on relationships
}
```

**Link Relationships:**

| Source | Target | Logic |
|--------|--------|-------|
| Service page | All 25 city variants | Match serviceSlug |
| Location page | All 22 service variants | Match locationSlug |
| Service page | Related services | Same category |
| Location page | Sibling locations | Same region |
| Service-city page | Parent service | serviceSlug |
| Service-city page | Parent location | locationSlug |
| Service-city page | Nearby cities | Same service + same region |
| Blog post | Related services | Add `relatedServices: []` to schema |
| Category page | All services in category | Category match |

### URL Structure

```
Homepage:           /
Category:           /services/category/[category]
Service:            /services/[service]
Location:           /locations/[location]
Service-City:       /services/[service]-[location]-on
Blog:               /blog/[slug]
Case Study:         /case-studies/[slug]
Rebates:            /rebates
```

### Schema Markup

| Page Type | Schema |
|-----------|--------|
| Homepage | Organization, LocalBusiness |
| Service | Service, LocalBusiness |
| Location | LocalBusiness (location-specific) |
| Service-City | Service + LocalBusiness |
| Blog | Article, FAQPage (if FAQs present) |

**Service Area Schema:** Implement carefully for multi-location business to avoid NAP issues.

---

## Skills Execution Workflow

### ⚠️ CRITICAL: NO WORK WITHOUT SKILLS — STRICT RULE

**MANDATORY**: Every task MUST use skills. NO manual work. NO exceptions. NO shortcuts.

```
┌─────────────────────────────────────────────────────────────────┐
│  STRICT RULE: NO WORK EVER HAPPENS WITHOUT USING A SKILL        │
│                                                                 │
│  ✓ Component design       → /frontend-design (MANDATORY)        │
│  ✓ Visual testing         → /agent-browser (MANDATORY)          │
│  ✓ Accessibility review   → /web-design-guidelines (MANDATORY)  │
│  ✓ Content generation     → /seo-content (MANDATORY)            │
│  ✓ Marketing copy         → /orchestrator first, then others    │
│  ✓ Strategy work          → /orchestrator first                 │
│                                                                 │
│  This is a speed optimization, not optional.                    │
└─────────────────────────────────────────────────────────────────┘
```

### ⚠️ CRITICAL: All Skills Execute Within Ralph

Skills do NOT run independently. They execute within Ralph stories:

```
prd.json Story → Ralph picks story → Skills execute within story context → Story completes
```

### Execution Order (Within Ralph Stories)

| Step | Skill | Purpose | Input | Output |
|------|-------|---------|-------|--------|
| 1 | `/positioning-angles` | Differentiate from Aire One | Competitor analysis, value prop | 3-5 positioning options |
| 2 | `/keyword-research` | Installation-focused keywords | Business context, services list | Keyword clusters by page type |
| 3 | `/brand-voice` | Define premium voice | Existing copy samples, positioning | Voice profile document |
| 4 | `/seo-content` | Generate page content | Keywords, voice, schema | MD file content |
| 5 | `/direct-response-copy` | CTA copy, headlines | Positioning, voice | Conversion copy |

### Parallel Skill Execution

Within a single Ralph story, skills can execute in parallel when they have no dependencies:

**Example: Homepage Hero Story**
```
Story US-002: "Create Hero Section"
├── PARALLEL PHASE (no dependencies):
│   ├── /frontend-design → Generate component design
│   ├── profile.yaml lookup → Get phone, business name
│   └── shadcn MCP query → Check Button component availability
│
├── SEQUENTIAL PHASE (dependencies exist):
│   ├── Write HeroSection.astro → Implement design
│   ├── pnpm build → Verify compilation
│   ├── /agent-browser → Test in browser
│   └── /web-design-guidelines → Audit UX
│
└── COMPLETION PHASE:
    ├── Fix any issues found
    └── Update prd.json: passes: true
```

### Skill Input Context

**For `/positioning-angles`:**
```
Product: B.A.P Heating & Cooling — Premium HVAC installation services
Transformation: Homeowner goes from worried about making wrong HVAC decision
  to confident their system is installed right and backed for years
Target: Affluent homeowners in Southern Ontario making $10K-$15K+ purchases
Competitor: Aire One KW (since 1990, "Top-Rated", BBB, video hero)
Current positioning: "Since 1994", family-owned, 407+ reviews
Desired positioning: Accountability, peace of mind, judgment, stand behind work
```

**For `/keyword-research`:**
```
Business: B.A.P Heating & Cooling — HVAC installation, repair, maintenance
Location: Guelph + 24 surrounding cities in Southern Ontario
Services: 22 services across heating, cooling, IAQ, water heating, commercial
Goal: Rank for installation-intent keywords (high-ticket)
Avoid: Emergency/repair-focused keywords (low-ticket)
Competitors: Aire One KW
```

**For `/brand-voice`:**
```
Mode: Build (strategic construction)
Identity: Family-owned since 1994, owner Paul Palmer, 30+ years experience
Audience: Affluent homeowners, research-mode, want peace of mind
Positioning: Accountability, judgment, stand behind work
Tone: Premium but not stuffy, confident but not arrogant, warm but professional
NOT: Corporate, salesy, urgent, desperate
```

---

## Build Process & Phases

### ⚠️ MANDATORY: Ralph-First Workflow

**ALL phases MUST be executed via Ralph. NO exceptions.**

```
┌─────────────────────────────────────────────────────────────────┐
│  EVERY PHASE MUST FOLLOW THIS SEQUENCE:                         │
│                                                                 │
│  1. /prd skill    → Create PRD with user stories               │
│  2. /ralph skill  → Convert to prd.json                        │
│  3. pnpm ralph    → Execute autonomously                       │
│                                                                 │
│  NO WORK STARTS WITHOUT PRD + prd.json                         │
└─────────────────────────────────────────────────────────────────┘
```

**Why Ralph is mandatory:**
- **Accountability**: Every task documented with acceptance criteria
- **Quality Gates**: `pnpm build` must pass for every story
- **Progress Tracking**: `scripts/ralph/progress.txt` maintains memory
- **Parallel Execution**: Multiple stories can run within single Ralph session
- **Verification**: No story marked complete without verification

---

### Phase 1: Foundation (COMPLETE ✓)

- ✅ shadcn MCP server configured (`.mcp.json`)
- ✅ CSS variables configured (`src/styles/globals.css`)
- ✅ Tailwind theme extended (`tailwind.config.mjs`)
- ✅ Core shadcn components installed: button, card, badge, separator, accordion, carousel, dialog, sheet
- ✅ Build verified passing (622 pages)
- ✅ Ralph autonomous loop installed (`scripts/ralph/ralph.sh`)

**Status:** Foundation ready for Ralph-driven UI development

---

### Phase 2: Homepage Build (CURRENT) — RALPH-DRIVEN

**MANDATORY WORKFLOW:** PRD → prd.json → pnpm ralph

#### Step 1: Create PRD (REQUIRED FIRST)

```bash
/prd skill → tasks/prd-homepage-phase2.md
```

#### Step 2: Convert to Ralph Format

```bash
/ralph skill → prd.json (17 user stories)
```

#### Step 3: Execute via Ralph

```bash
pnpm ralph:20  # 20 iterations for 17 sections + buffer
```

#### Expected prd.json Structure for Phase 2

```json
{
  "project": "HVAC Homepage Phase 2",
  "branchName": "feature/homepage-sections",
  "description": "Build all 17 homepage sections for B.A.P Heating & Cooling",
  "userStories": [
    {
      "id": "US-001",
      "title": "Create Header Component",
      "description": "As a visitor, I want a sticky header with 'Since 1994' badge so I see trust signals immediately.",
      "acceptanceCriteria": [
        "Header.astro created in src/components/",
        "Sticky positioning at top",
        "'Since 1994' badge next to logo",
        "Navigation: Services | Locations | About | Financing | Blog",
        "Mobile hamburger menu using shadcn Sheet",
        "pnpm build passes",
        "Verify in browser at localhost:4321"
      ],
      "priority": 1,
      "passes": false,
      "notes": "Use /frontend-design skill. NO sticky phone CTA in header."
    },
    {
      "id": "US-002",
      "title": "Create Hero Section",
      "description": "As a visitor, I want a premium hero with phone CTA so I can contact B.A.P immediately.",
      "acceptanceCriteria": [
        "HeroSection.astro created in src/components/sections/",
        "H1 with keyword + location + benefit",
        "'Since 1994 • 4.8★ from 407+ reviews' subheading",
        "Rebate mention: 'Up to $10,000 in rebates'",
        "Phone CTA using shadcn Button",
        "Placeholder background image",
        "pnpm build passes",
        "Verify in browser at localhost:4321"
      ],
      "priority": 2,
      "passes": false,
      "notes": "Use /frontend-design skill. Pull phone from profile.yaml."
    },
    {"id": "US-003", "title": "Create Value Props Grid", "priority": 3, "passes": false},
    {"id": "US-004", "title": "Create Brand Logo Ticker", "priority": 4, "passes": false},
    {"id": "US-005", "title": "Create Service Categories Grid", "priority": 5, "passes": false},
    {"id": "US-006", "title": "Create Expert Consultation Section", "priority": 6, "passes": false},
    {"id": "US-007", "title": "Create Project Gallery Section", "priority": 7, "passes": false},
    {"id": "US-008", "title": "Create Testimonials Carousel", "priority": 8, "passes": false},
    {"id": "US-009", "title": "Create Family Story Section", "priority": 9, "passes": false},
    {"id": "US-010", "title": "Create Service Area Section", "priority": 10, "passes": false},
    {"id": "US-011", "title": "Create Financing Preview Section", "priority": 11, "passes": false},
    {"id": "US-012", "title": "Create Blog Preview Section", "priority": 12, "passes": false},
    {"id": "US-013", "title": "Create Certifications Section", "priority": 13, "passes": false},
    {"id": "US-014", "title": "Create Final CTA Section", "priority": 14, "passes": false},
    {"id": "US-015", "title": "Create Footer", "priority": 15, "passes": false},
    {"id": "US-016", "title": "Create Sticky Phone Drawer", "priority": 16, "passes": false},
    {"id": "US-017", "title": "Create Exit Intent Modal", "priority": 17, "passes": false}
  ]
}
```

#### Per-Section Process (Within Ralph Stories)

For each of the 17 homepage sections:

1. **Prepare Context**
   - Section requirements from this document
   - Business data from `profile.yaml`
   - Design constraints (NO gradients, premium aesthetic, generous spacing)

2. **Run `/frontend-design`**
   - Section purpose and goal
   - Content requirements (headings, copy, CTAs)
   - Layout specifications (grid, split, carousel, etc.)
   - Available shadcn components
   - Data source (profile.yaml fields)
   - Aesthetic constraints

3. **Implement Design**
   - Create Astro component in `src/components/sections/`
   - Use shadcn/ui primitives
   - Add new shadcn components via MCP if needed
   - Pull data from profile.yaml using `getEntry('business', 'profile')`
   - Use placeholder images: `<div class="bg-muted aspect-video">Hero Image — 1920×800</div>`

4. **Create Content Schema (alongside)**
   - Add YAML file to `src/content/homepage/` if needed
   - Update `src/content/config.ts` schema

5. **Verify**
   - Run `pnpm build` (must pass)
   - Visual check in `pnpm dev`
   - Mobile responsive check
   - Accessibility check (touch targets ≥ 44px)

#### Build Order (17 Sections)

1. **Header.astro** — Sticky, "Since 1994" badge, NO sticky phone (use shadcn Sheet for mobile nav)
2. **HeroSection.astro** — Premium positioning, rebate mention, phone CTA (use shadcn Button)
3. **ValuePropsGrid.astro** — 4 trust signals (use shadcn Card + Badge)
4. **BrandLogoTicker.astro** — Animated scroll (CSS animation)
5. **ServiceCategoriesGrid.astro** — 5 categories (use CategoryCard)
6. **CategoryCard.astro** — Individual category card (use shadcn Card)
7. **ExpertConsultationSection.astro** — Low-pressure CTA (use shadcn Button)
8. **ProjectGallerySection.astro** — 6-8 placeholder images (use shadcn Card)
9. **TestimonialsCarousel.astro** — Installation reviews (use shadcn Carousel)
10. **FamilyStorySection.astro** — Split layout (use shadcn Card)
11. **ServiceAreaSection.astro** — Map + 25 cities (use shadcn Card + Badge)
12. **FinancingPreviewSection.astro** — 3 cards (use shadcn Card)
13. **BlogPreviewSection.astro** — Auto-fetch 3 latest (use shadcn Card)
14. **CertificationsSection.astro** — Trust badges grid (use shadcn Badge)
15. **FinalCTASection.astro** — Conversion CTA (use shadcn Button)
16. **Footer.astro** — 5 columns (use shadcn Separator)
17. **PhoneCTA.astro** — Reusable component (use shadcn Button with variants)
18. **StickyPhoneDrawer.tsx** — React, scroll-aware (use shadcn Sheet)
19. **ExitIntentModal.tsx** — React, triggers (use shadcn Dialog)

#### Additional Tasks

**Create Missing Routes:**
- `src/pages/services/category/[category].astro` (use `/frontend-design`)
- `src/pages/rebates.astro` (use `/frontend-design`)

**Content Collections:**
- Create `src/content/homepage/` YAML files alongside sections
- Create `src/content/service-categories/` MD files (5 categories)
- Update `src/content/config.ts` with schemas

**Homepage Integration:**
- Rewrite `src/pages/index.astro` with all 17 sections
- Implement alternating backgrounds per spec
- Verify all links and CTAs work

---

### Phase 3: Page Templates

**Build Order:** Categories → Services → Locations → Service-City → Supporting Pages

For each page template:
1. Run `/frontend-design` with page requirements
2. Implement using shadcn components
3. Connect to content collections
4. Verify build passes

**Page Types:**
- Category landing pages (5 pages)
- Service pages (22 pages)
- Location pages (25 pages)
- Service-city pages (550 pages, priority top 50)
- Supporting pages: about, contact, rebates, careers, reviews, faqs, blog templates

---

### Phase 4: Content Generation

Run content skills for pages that need unique content:

**Skills to Run:**
1. `/positioning-angles` — Differentiate from Aire One KW
2. `/keyword-research` — Installation-focused keywords for all page types
3. `/brand-voice` — Define premium voice profile
4. `/seo-content` — Generate page content (categories, locations, service-city)
5. `/direct-response-copy` — CTA copy, headlines, conversion copy

**Priority Content:**
- Category pages (5 pages, 500+ words each)
- Location pages (top 10 priority, 1000+ words each)
- Service-city pages (top 50 combinations, 800+ words, 80%+ unique)
- Blog posts (target keywords, 1500+ words)
- Rebates page (research current programs, 1000+ words)

**Content Requirements:**
- NO city-swapping (each page genuinely unique)
- Local context for service-city pages
- Installation-focused messaging
- NO emergency/urgency tactics

---

### Phase 5: Integration & QA

**Internal Linking:**
- Create `src/utils/getInternalLinks.ts` utility
- Add contextual links to all page templates
- Verify bidirectional linking

**Build Verification:**
- Full site builds without errors (all 622+ pages)
- No TypeScript errors
- No broken imports or links

**Testing:**
- Mobile responsive (320px - 428px)
- Touch targets ≥ 44px
- Accessibility (keyboard nav, screen readers, WCAG AA)
- SEO audit (meta tags, schema, canonical URLs)
- Performance (Lighthouse 90+ Performance, 100 Accessibility)

---

### Phase 6: Branding Polish (COMPLETE ✓)

**Status:** Merged to main on Jan 21, 2026

**Completed:**
- ✅ Brand colors defined (Primary: #1976D2, Secondary: #F5A623, Accent: Teal)
- ✅ Colors applied to all components (buttons, cards, links, sections)
- ✅ Typography refined (system fonts, responsive headings, prose styles)
- ✅ Spacing standardized (py-16/20/24, gap-6/8, h-14 buttons)
- ✅ Button & card polish (hover states, shadows, transitions)
- ✅ Accessibility fixes (WCAG AA color contrast, heading hierarchy)
- ✅ Build verified: 628 pages

---

### Phase 7: Design System Consolidation

**Status:** CURRENT — Execute via Ralph

**Full Specification:** [PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md](PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md)

---

#### Overview

Phase 7 consolidates the design system to enable consistent service and service-city pages:

- **Unified Schema:** Identical field names for both collections (services + service-city)
- **Global Typography:** Single font import via typography.css (Phase 7.1 COMPLETE)
- **Component Consolidation:** Merge Local* variants into generic components
- **Shared Layout:** ServicePageLayout.astro for both page types
- **Content Generation:** Unique SEO content for 550 service-city pages

---

#### Phase Structure (8 Sub-Phases)

| Phase | Description | Status |
|-------|-------------|--------|
| 7.1 | Global Typography System | COMPLETE |
| 7.2 | Unified Schema | Ready |
| 7.3 | Content Migration | Ready |
| 7.4 | Component Consolidation | Ready |
| 7.5 | Shared ServicePageLayout | Ready |
| 7.6 | Background Variants | Ready |
| 7.7 | Verification & Cleanup | Ready |
| 7.8 | Content Generation | Ready |

---

#### Key Schema Changes

Both collections will use **IDENTICAL** field names:

| Old (Services) | Old (Service-City) | New (Unified) |
|----------------|-------------------|---------------|
| `problemStatement` | `localProblem` | `problem` |
| `solutionApproach` | `localSolution` | `solution` |
| `valueProps` | `localBenefits` | `benefits` |
| `images` | `localGalleryImages` | `galleryImages` |
| (missing) | `localTrustOpener` | `trustOpener` |
| (missing) | `localProof` | `proof` |
| (missing) | `localContext` | `context` |

---

#### Component Changes

**Delete:**
- `LocalProblemSection.astro` (99% identical to ProblemSection)
- `LocalSolutionSection.astro` (merged into SolutionSection)

**Rename:**
- `LocalTrustOpener.astro` → `TrustOpenerSection.astro`
- `LocalGallerySection.astro` → `ServiceGallerySection.astro`
- `LocalProofSection.astro` → `ProofSection.astro`
- `LocalContextSection.astro` → `ContextSection.astro`

**Create:**
- `ServicePageLayout.astro` (shared layout for both page types)

---

#### Success Criteria

- **Schema:** IDENTICAL fields in both collections
- **Layout:** Single ServicePageLayout for both page types
- **Typography:** Single global font import (1 request vs 9)
- **Build:** `pnpm build` passes (573+ pages)
- **Content:** 550 service-city pages with 800+ unique words

---

**For field mappings, component specs, and implementation details, see:**
→ [PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md](PHASE-7-DESIGN-SYSTEM-CONSOLIDATION.md)

---

## Files to Create

```
# New Components
src/components/cta/StickyPhoneDrawer.tsx
src/components/modals/ExitIntentModal.tsx
src/components/ui/BrandLogoTicker.astro
src/components/cards/CategoryCard.astro
src/components/sections/ProjectGallerySection.astro
src/components/sections/FamilyStorySection.astro
src/components/sections/ExpertConsultationSection.astro
src/components/sections/FinancingPreviewSection.astro
src/components/sections/BlogPreviewSection.astro

# Homepage Content Collection
src/content/homepage/hero.yaml
src/content/homepage/services-grid.yaml
src/content/homepage/expert-consultation.yaml
src/content/homepage/project-gallery.yaml
src/content/homepage/family-story.yaml
src/content/homepage/financing-preview.yaml
src/content/homepage/brand-ticker.yaml

# Service Categories Collection
src/content/service-categories/heating.md
src/content/service-categories/cooling.md
src/content/service-categories/indoor-air-quality.md
src/content/service-categories/water-heating.md
src/content/service-categories/commercial.md

# Category Landing Page Route
src/pages/services/category/[category].astro

# Rebates Page
src/content/pages/rebates.md (or inline in page)
src/pages/rebates.astro

# Utilities
src/utils/getInternalLinks.ts

# Documentation
src/content/homepage/README.md (schema documentation)
```

---

## Files to Modify

```
# Homepage
src/pages/index.astro
  → Complete restructure with new 14-section flow

# Header
src/components/Header.astro
  → Remove sticky phone CTA
  → Add "Since 1994" badge next to logo

# Phone CTA
src/components/cta/PhoneCTA.astro
  → Add ctaCopy prop for context-aware text

# Trust Badges
src/components/sections/TrustBadges.astro
  → Add BBB, brand certifications
  → Remove 24/7 emphasis
  → Reorder badges

# Service Area
src/components/sections/ServiceAreaGrid.astro
  → Add map visual placeholder

# Content Config
src/content/config.ts
  → Add homepage collection schema
  → Add service-categories collection schema

# Business Profile
src/content/business/profile.yaml
  → Add premium positioning
  → Add brand logos array
  → Refine CTA copy
```

---

## Verification & Testing

### Build Verification

```bash
# Full site builds without errors
npm run build

# Preview on localhost
npm run dev
```

### Functional Testing Checklist

**Homepage:**
- [ ] All 14 sections render in correct order
- [ ] Section backgrounds alternate correctly
- [ ] All placeholder images show dimensions

**CTAs:**
- [ ] Phone buttons trigger tel: link
- [ ] Email buttons trigger mailto: link
- [ ] CTA copy is context-appropriate

**Sticky Phone Drawer:**
- [ ] Hidden on initial load
- [ ] Appears on scroll-up (after Section 2)
- [ ] Hides on scroll-down
- [ ] Phone and email buttons work
- [ ] Doesn't overlap content

**Exit Intent Modal:**
- [ ] Desktop: Triggers on mouse exit (after 10s)
- [ ] Mobile: Triggers at 75% scroll OR 30s
- [ ] Only shows once per session
- [ ] Dismissible with X button
- [ ] Phone and email buttons work

**Brand Logo Ticker:**
- [ ] Continuous horizontal scroll
- [ ] Pauses on hover (desktop)
- [ ] Smooth on mobile
- [ ] No layout shift

**Category Navigation:**
- [ ] Category cards link to /services/category/[category]
- [ ] Category pages render correctly
- [ ] Services grid shows correct services per category

**Blog Preview:**
- [ ] Auto-fetches 3 latest posts
- [ ] Cards display correctly
- [ ] "View All" links to /blog

**Internal Links:**
- [ ] All links resolve correctly
- [ ] No 404s on any internal link

### Mobile Testing

- [ ] Touch targets ≥ 44px (preferably larger)
- [ ] Sticky drawer doesn't block content
- [ ] Exit modal is dismissible
- [ ] Images lazy load correctly
- [ ] No horizontal scroll
- [ ] Text readable without zoom

### SEO Verification

- [ ] Meta tags present (title, description, OG)
- [ ] H1 includes target keyword + location
- [ ] Schema validates (Rich Results Test)
- [ ] Internal links crawlable
- [ ] Canonical URLs correct

### Performance

- [ ] Lighthouse: 90+ Performance
- [ ] Lighthouse: 100 Accessibility
- [ ] Core Web Vitals pass
- [ ] Images optimized (AVIF/WebP)
- [ ] No layout shift (CLS < 0.1)

---

## Out of Scope (Post-Launch)

| Item | Reason |
|------|--------|
| Online booking integration | Future project |
| Form submissions | Future project |
| A/B testing setup | Post-launch optimization |
| Video production | Gap acknowledged, not blocking |
| Post-launch analytics | After launch |
| Remaining 500 service-city pages | Phase 2 content |

---

## Success Metrics (Post-Launch)

| Metric | Target |
|--------|--------|
| Phone calls from homepage | +60-90% |
| Qualified installation leads | +50% |
| Average ticket value | +20% |
| Bounce rate | -15% |
| Time on site | +30% |
| Installation keyword rankings | Top 10 for primary terms |

---

## Quick Reference

### Key Contacts
- **Phone:** (from business profile)
- **Email:** (from business profile)

### Brand Assets Needed
- [ ] Family photo (Paul Palmer)
- [ ] Team headshots (3-4)
- [ ] Project photos (6-8 installations)
- [ ] Brand logos (Carrier, Daikin, etc.)
- [ ] Service area map graphic

### Skills to Run
1. `/positioning-angles`
2. `/keyword-research`
3. `/brand-voice`
4. `/seo-content`
5. `/direct-response-copy`

---

**Document Status:** FINAL — Ready for Implementation
**Next Action:** Begin Phase A (Schema & Foundation)
