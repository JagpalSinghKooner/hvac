# PRD: Phase 2 — Homepage Build

## Introduction

Build all homepage sections for B.A.P Heating & Cooling's premium HVAC website. This phase creates 17 components that form the complete homepage experience, targeting affluent homeowners in Southern Ontario making $10K-$15K+ installation decisions.

**Target Customer:** Research-mode buyers who want accountability and peace of mind, not urgency tactics.

**Primary CTA:** Phone call only (no online booking/forms in this phase).

**Design Constraints:**
- NO gradient borders or buttons
- Generous spacing (touch targets ≥ 44px)
- Premium but NOT alienating aesthetic
- Solid colors only
- Placeholder images with dimensions (client replaces later)

---

## Goals

- Build all 17 homepage sections as reusable components
- Site-wide Header and Footer (used across all pages)
- Fully responsive (375px, 768px, 1024px breakpoints)
- Minimal React — only interactive components use React (Carousel, Drawer, Modal)
- All components pull data from `src/content/business/profile.yaml`
- Build passes (`pnpm build`) after each component
- Premium positioning with installation focus (NOT repair/emergency)

---

## User Stories

### US-001: Create Site-Wide Header

**Description:** As a visitor, I want a sticky header with navigation and trust signals so I can easily navigate and see B.A.P is established.

**Acceptance Criteria:**
- [ ] `Header.astro` created in `src/components/`
- [ ] Sticky positioning at viewport top
- [ ] Logo with "Since 1994" badge (using shadcn Badge)
- [ ] Desktop nav: Services (dropdown) | Locations | About | Financing | Blog
- [ ] Mobile hamburger menu using shadcn Sheet component
- [ ] Services dropdown shows 5 categories: Heating, Cooling, IAQ, Water Heating, Commercial
- [ ] NO sticky phone CTA in header (moved to StickyPhoneDrawer)
- [ ] Phone number pulled from `profile.yaml`
- [ ] Fully responsive at 375px, 768px, 1024px
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 1

---

### US-002: Create Hero Section

**Description:** As a visitor, I want a premium hero section with clear value proposition so I understand B.A.P's positioning and can call immediately.

**Acceptance Criteria:**
- [ ] `HeroSection.astro` created in `src/components/sections/`
- [ ] H1: "Premium HVAC Installation for Southern Ontario Homes"
- [ ] Trust line: "Since 1994 • 4.8★ from 407+ reviews" (data from profile.yaml)
- [ ] Rebate mention: "Up to $10,000 in government rebates available"
- [ ] Single phone CTA using shadcn Button: "Get a Free Installation Quote"
- [ ] Phone number links to `tel:` (from profile.yaml)
- [ ] Placeholder background: `<div class="bg-muted aspect-[16/9] md:aspect-[21/9]">Hero Image — 1920×800</div>`
- [ ] Background style: gradient-mesh-cool (subtle, not garish)
- [ ] Fully responsive
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 2

---

### US-003: Create Value Props Grid

**Description:** As a visitor, I want to see trust signals immediately so I know B.A.P is legitimate and established.

**Acceptance Criteria:**
- [ ] `ValuePropsGrid.astro` created in `src/components/sections/`
- [ ] 4 cards using shadcn Card + Badge:
  - TSSA Licensed (license number from profile.yaml)
  - 10-Year Warranty
  - 30+ Years in Business (calculated from established_year)
  - Certified Brand Dealer
- [ ] Icons from Lucide React for each card
- [ ] NO 24/7 emphasis (signals repair, not installation)
- [ ] Background: white
- [ ] Grid: 2 columns mobile, 4 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 3

---

### US-004: Create Brand Logo Ticker

**Description:** As a visitor, I want to see brand certifications so I trust the quality of equipment B.A.P installs.

**Acceptance Criteria:**
- [ ] `BrandLogoTicker.astro` created in `src/components/ui/`
- [ ] Continuous horizontal scroll animation (CSS only, no JS)
- [ ] Pauses on hover (desktop)
- [ ] Label: "Certified Dealer"
- [ ] Placeholder logos: Carrier, Daikin, Lennox, Trane, Goodman (colored rectangles with text)
- [ ] Smooth scroll on mobile, no layout shift
- [ ] Background: white
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 4

---

### US-005: Create Service Categories Grid

**Description:** As a visitor, I want to see service categories so I can navigate to my area of interest.

**Acceptance Criteria:**
- [ ] `ServiceCategoriesGrid.astro` created in `src/components/sections/`
- [ ] `CategoryCard.astro` created in `src/components/cards/`
- [ ] 5 category cards using shadcn Card:
  - Heating (flame icon) → /services/category/heating
  - Cooling (snowflake icon) → /services/category/cooling
  - Indoor Air Quality (wind icon) → /services/category/indoor-air-quality
  - Water Heating (droplet icon) → /services/category/water-heating
  - Commercial (building icon) → /services/category/commercial
- [ ] Each card: icon, title, short description, hover effect
- [ ] Categories pulled from profile.yaml navbar_categories
- [ ] Background: muted (gray-50)
- [ ] Grid: 2 columns mobile, 3 columns tablet, 5 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 5

---

### US-006: Create Expert Consultation Section

**Description:** As a hesitant visitor, I want a low-pressure CTA so I feel comfortable calling without commitment.

**Acceptance Criteria:**
- [ ] `ExpertConsultationSection.astro` created in `src/components/sections/`
- [ ] Heading: "Not Sure What You Need?"
- [ ] Subheading: "Talk to Our HVAC Experts — Free Consultation"
- [ ] 4 trust bullets with checkmarks:
  - 30+ Years Experience
  - Free Phone Estimates
  - No Obligation, No Pressure
  - Licensed & Certified Technicians
- [ ] Large phone CTA using shadcn Button (size lg)
- [ ] Phone from profile.yaml
- [ ] Background: primary-light (primary-50/30 or similar soft tint)
- [ ] Centered layout with max-width container
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 6

---

### US-007: Create Project Gallery Section

**Description:** As a visitor, I want to see real project photos so I can visualize the quality B.A.P delivers.

**Acceptance Criteria:**
- [ ] `ProjectGallerySection.astro` created in `src/components/sections/`
- [ ] Heading: "Real Projects Across Southern Ontario"
- [ ] Subheading: "See the quality we deliver to homes like yours"
- [ ] 6-image grid using shadcn Card with aspect-ratio
- [ ] Placeholder images: `<div class="bg-muted aspect-[4/3]">Furnace Install — Guelph</div>`
- [ ] Hover overlay: Project type + location
- [ ] CTA: "View All Projects" → /case-studies
- [ ] Background: white
- [ ] Grid: 2 columns mobile, 3 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 7

---

### US-008: Create Testimonials Carousel

**Description:** As a visitor, I want to see installation-specific reviews so I trust B.A.P for my installation project.

**Acceptance Criteria:**
- [ ] `TestimonialsCarousel.tsx` created in `src/components/sections/` (React for interactivity)
- [ ] Uses shadcn Carousel component with Embla
- [ ] Google rating badge: "4.8★ from 407+ reviews" (from profile.yaml)
- [ ] Fetches reviews from `src/content/reviews/` collection
- [ ] Filters for installation-related reviews (tags or keywords)
- [ ] Each card: quote, name, city, star rating, verified badge
- [ ] Auto-advance every 5 seconds, pause on hover
- [ ] Manual navigation arrows
- [ ] CTA: "View All Reviews on Google" (external link)
- [ ] Background: muted (gray-50)
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 8

---

### US-009: Create Family Story Section

**Description:** As a visitor, I want to learn about the family behind B.A.P so I feel I'm working with real people, not a faceless corporation.

**Acceptance Criteria:**
- [ ] `FamilyStorySection.astro` created in `src/components/sections/`
- [ ] Heading: "A Family Business Serving Families Since 1994"
- [ ] Split layout: Image placeholder (50%) + Story content (50%)
- [ ] Image placeholder: `<div class="bg-muted aspect-[4/3]">Palmer Family Photo</div>`
- [ ] Story text: 2-3 paragraphs about Paul Palmer, family values, 30+ years
- [ ] Owner name from profile.yaml
- [ ] Team grid: 3-4 placeholder headshots with names/roles
- [ ] CTA: "Meet the Team" → /about
- [ ] Background: white
- [ ] Mobile: Stack vertically (image on top)
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 9

---

### US-010: Create Service Area Section

**Description:** As a visitor, I want to confirm B.A.P serves my area so I know I can hire them.

**Acceptance Criteria:**
- [ ] `ServiceAreaSection.astro` created in `src/components/sections/`
- [ ] Heading: "Proudly Serving Southern Ontario Since 1994"
- [ ] Map placeholder: `<div class="bg-muted aspect-video">Service Area Map — Guelph Radius</div>`
- [ ] 25 cities organized by 6 regions (from profile.yaml coverage.regions)
- [ ] Each city links to /locations/[slug]
- [ ] Region headers: Wellington County, Waterloo Region, Halton Region, Peel Region, Hamilton & Brant, Dufferin County
- [ ] Uses shadcn Badge for region headers
- [ ] Background: muted (gray-50)
- [ ] Grid: 2 columns mobile, 3 columns tablet, 6 columns desktop (one per region)
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 10

---

### US-011: Create Financing Preview Section

**Description:** As a visitor, I want to see financing options so I know I can afford a premium installation.

**Acceptance Criteria:**
- [ ] `FinancingPreviewSection.astro` created in `src/components/sections/`
- [ ] Heading: "Flexible Financing — Make Comfort Affordable"
- [ ] Subheading: "Multiple options to fit your budget"
- [ ] 3 cards using shadcn Card:
  - 0% Financing Available (credit card icon)
  - Flexible Payment Plans (calendar icon)
  - Government Rebates (badge/award icon)
- [ ] Rebate highlight: "Up to $10,000 in government rebates"
- [ ] Financing statement from profile.yaml
- [ ] CTA row: Phone button + "View Full Details" → /financing
- [ ] Background: white
- [ ] Grid: 1 column mobile, 3 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 11

---

### US-012: Create Blog Preview Section

**Description:** As a visitor, I want to see helpful content so I know B.A.P are educators, not just salespeople.

**Acceptance Criteria:**
- [ ] `BlogPreviewSection.astro` created in `src/components/sections/`
- [ ] Heading: "HVAC Tips & Advice from the Experts"
- [ ] Auto-fetches latest 3 blog posts from `src/content/blog/` collection
- [ ] Filter: `workflowStatus === 'published'`
- [ ] Each card using shadcn Card: image placeholder, title, excerpt, "Read More" link
- [ ] Placeholder image: `<div class="bg-muted aspect-[16/9]">Blog Thumbnail</div>`
- [ ] CTA: "View All Articles" → /blog
- [ ] Background: muted (gray-50)
- [ ] Grid: 1 column mobile, 3 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 12

---

### US-013: Create Certifications Section

**Description:** As a visitor, I want to see certifications and badges so I know B.A.P is officially legitimate.

**Acceptance Criteria:**
- [ ] `CertificationsSection.astro` created in `src/components/sections/`
- [ ] Heading: "Licensed, Certified & Protected"
- [ ] Grid of certification badges:
  - TSSA Licensed (number from profile.yaml)
  - HRAI Member
  - HRAI Heat Pump Champion
  - BBB A+ Rated
  - WSIB Covered
  - Google 4.8★
- [ ] Placeholder badges: `<div class="bg-muted w-24 h-16 flex items-center justify-center">TSSA</div>`
- [ ] Order: License → Industry → Insurance → Reviews
- [ ] NO 24/7 emphasis
- [ ] Background: white
- [ ] Grid: 3 columns mobile, 6 columns desktop
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 13

---

### US-014: Create Final CTA Section

**Description:** As a visitor ready to commit, I want a clear final CTA so I can easily start the process.

**Acceptance Criteria:**
- [ ] `FinalCTASection.astro` created in `src/components/sections/`
- [ ] Heading: "Get Your Free Installation Estimate"
- [ ] Subheading: "No obligation • Same-day response • 10-year warranty"
- [ ] 4 trust bullets matching Expert Consultation section
- [ ] Large phone CTA using shadcn Button (size lg)
- [ ] Secondary: Email link using shadcn Button variant="outline"
- [ ] Phone and email from profile.yaml
- [ ] Background: primary-light
- [ ] Centered layout with generous padding
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 14

---

### US-015: Create Site-Wide Footer

**Description:** As a visitor, I want a comprehensive footer so I can find any page or contact method.

**Acceptance Criteria:**
- [ ] `Footer.astro` created in `src/components/`
- [ ] 5 columns:
  - Services (links to top 6 services)
  - Locations (links to 6 regional location pages)
  - Company (About, Careers, Reviews, Contact)
  - Resources (Blog, FAQs, Financing, Rebates)
  - Contact (Phone, Email, Address from profile.yaml)
- [ ] Phone CTA (footer variant, smaller)
- [ ] Social links: Instagram, Facebook (from profile.yaml)
- [ ] Uses shadcn Separator between sections
- [ ] Copyright: "© 2024 B.A.P Heating & Cooling Services Ltd"
- [ ] Background: gray-900 (dark)
- [ ] Text: white/gray-300
- [ ] Responsive: stacks to 2 columns on tablet, 1 on mobile
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 15

---

### US-016: Create Sticky Phone Drawer

**Description:** As a visitor scrolling the page, I want an unobtrusive phone CTA that appears when I'm engaged so I can call without scrolling back.

**Acceptance Criteria:**
- [ ] `StickyPhoneDrawer.tsx` created in `src/components/cta/` (React for scroll detection)
- [ ] Position: Fixed at bottom of viewport
- [ ] Default state: Hidden
- [ ] Show: When user scrolls UP after passing Section 2 (Value Props)
- [ ] Hide: When user scrolls DOWN
- [ ] Content: Phone icon + "Get a Free Installation Quote" | Email icon
- [ ] Phone and email from profile.yaml (passed as props)
- [ ] Style: Premium, subtle shadow, rounded top corners, no gradients
- [ ] Animation: Slide up/down (150ms ease)
- [ ] Uses shadcn Button components
- [ ] Does not overlap page content (has own space or overlays safely)
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 16

---

### US-017: Create Exit Intent Modal

**Description:** As a visitor about to leave, I want a gentle reminder CTA so I have one more chance to connect before navigating away.

**Acceptance Criteria:**
- [ ] `ExitIntentModal.tsx` created in `src/components/modals/` (React for event handling)
- [ ] Uses shadcn Dialog component
- [ ] Desktop trigger: Mouse leaves viewport top (after 10+ seconds on page)
- [ ] Mobile trigger: 75% scroll depth OR 30 seconds on page (whichever first)
- [ ] Frequency: Once per session (localStorage flag: `bap_exit_modal_shown`)
- [ ] Content:
  - Heading: "Have Questions About Your HVAC Project?"
  - Subheading: "Our experts are ready to help — no pressure, no obligation"
  - Phone button (primary): Uses shadcn Button
  - Email button (secondary): Uses shadcn Button variant="outline"
  - Close button (X) in top-right
- [ ] Phone and email from profile.yaml (passed as props)
- [ ] Smooth fade-in animation
- [ ] Backdrop click closes modal
- [ ] ESC key closes modal
- [ ] `pnpm build` passes
- [ ] Verify in browser at localhost:4321

**Priority:** 17

---

## Functional Requirements

- FR-1: All components must pull business data from `src/content/business/profile.yaml`
- FR-2: All phone buttons must use `tel:` links with E.164 format phone number
- FR-3: All email buttons must use `mailto:` links
- FR-4: No online booking or form submissions (out of scope)
- FR-5: All components must be fully responsive (375px, 768px, 1024px breakpoints)
- FR-6: Touch targets must be ≥ 44px on all interactive elements
- FR-7: Header and Footer must be site-wide components (imported in BaseLayout)
- FR-8: React components (.tsx) only for interactive elements requiring client-side JS
- FR-9: Astro components (.astro) preferred for static sections
- FR-10: All placeholder images must show dimensions for client replacement

---

## Non-Goals (Out of Scope)

- Online booking integration (future project)
- Contact forms (future project)
- Real images (client provides later; use placeholders)
- Brand colors (Phase 6 — Branding Polish)
- Video content (acknowledged gap)
- Category landing pages (Phase 3)
- Service/location pages (Phase 3)
- Content generation (Phase 4)
- A/B testing setup

---

## Design Considerations

### shadcn Components to Use

| Component | Usage |
|-----------|-------|
| Button | All CTAs (phone, email, navigation) |
| Card | Service cards, testimonial cards, blog cards |
| Badge | Trust signals, category labels, region headers |
| Carousel | Testimonials (Embla-based) |
| Sheet | Mobile navigation drawer |
| Dialog | Exit intent modal |
| Separator | Footer sections |

### Color Scheme (Neutral Theme)

- Background alternation: white → muted (gray-50) → primary-light
- Text: foreground (gray-900) on light, white on dark
- CTAs: primary (solid), secondary (outline)

### Image Placeholders

Format: `<div class="bg-muted aspect-[ratio]">[Description — Dimensions]</div>`

Examples:
- Hero: `aspect-[21/9]` — "Hero Image — 1920×800"
- Project: `aspect-[4/3]` — "Furnace Install — Guelph"
- Team: `aspect-square` — "Paul Palmer"

---

## Technical Considerations

### Data Flow

```
profile.yaml → getEntry('business', 'profile') → Component props
```

### Component Organization

```
src/components/
├── Header.astro              # Site-wide
├── Footer.astro              # Site-wide
├── sections/
│   ├── HeroSection.astro
│   ├── ValuePropsGrid.astro
│   ├── ServiceCategoriesGrid.astro
│   ├── ExpertConsultationSection.astro
│   ├── ProjectGallerySection.astro
│   ├── TestimonialsCarousel.tsx    # React
│   ├── FamilyStorySection.astro
│   ├── ServiceAreaSection.astro
│   ├── FinancingPreviewSection.astro
│   ├── BlogPreviewSection.astro
│   ├── CertificationsSection.astro
│   └── FinalCTASection.astro
├── cards/
│   └── CategoryCard.astro
├── ui/
│   └── BrandLogoTicker.astro
├── cta/
│   └── StickyPhoneDrawer.tsx       # React
└── modals/
    └── ExitIntentModal.tsx         # React
```

### React Components (client:load)

Only 3 components need React:
1. `TestimonialsCarousel.tsx` — Embla carousel interactivity
2. `StickyPhoneDrawer.tsx` — Scroll event handling
3. `ExitIntentModal.tsx` — Mouse/scroll event handling, localStorage

All others are Astro (static, zero JS).

---

## Success Metrics

- All 17 sections render correctly on homepage
- `pnpm build` passes (zero errors)
- All CTAs functional (tel:, mailto: links work)
- Fully responsive at 375px, 768px, 1024px
- Touch targets ≥ 44px verified
- Lighthouse Accessibility: 100
- No horizontal scroll on any viewport
- Page load: <3 seconds on 3G

---

## Open Questions

1. Should ServiceCategoriesGrid link to `/services/category/[category]` or just anchor to services section? (Decision: Link to category pages, created in Phase 3)
2. Should testimonials filter by keyword "installation" or rely on manual tagging? (Decision: Start with keyword filter, add tags later if needed)
3. Exit intent modal timing — 10 seconds enough for desktop? (Decision: Start with 10s, adjust based on analytics)

---

## Checklist

- [x] All 17 stories have specific, verifiable acceptance criteria
- [x] Each story is small enough for one context window
- [x] All stories include "pnpm build passes" criterion
- [x] UI stories include "Verify in browser" criterion
- [x] Dependencies are implicit in priority order
- [x] Non-goals clearly defined
- [x] Technical decisions documented
