# PRD: Phase 3 - Page Templates

## Introduction

Build complete page templates for all page types using existing content collections and Phase 2 components. This phase transforms stub pages into fully-designed, SEO-optimized templates that render 623+ pages at build time.

**Scope:** 5 category + 22 service + 25 location + 550 service-city + 25 supporting pages

**Design Principles:**
- NO gradient borders or buttons (solid colors only)
- Touch targets >= 44px
- Phone CTA primary, email secondary
- Pull all business data from `profile.yaml`
- Use shadcn/ui components
- Reuse Phase 2 section components where applicable

---

## Goals

- Create reusable section components for service and location pages
- Build complete page templates that render from content collections
- Implement internal linking architecture for SEO
- Ensure all 623+ pages build without errors
- Mobile-first responsive design (375px, 768px, 1024px breakpoints)

---

## User Stories

### Phase 3A: Foundation

---

### US-001: Create Internal Linking Utility

**Description:** As a developer, I need a utility function to generate internal links so that pages can cross-link to related services, locations, and service-city pages.

**Acceptance Criteria:**
- [ ] Create `src/utils/getInternalLinks.ts`
- [ ] Export function `getRelatedServices(currentServiceSlug: string, category: string, limit?: number)` that returns services in the same category
- [ ] Export function `getServiceCityLinks(serviceSlug: string)` that returns all location links for a service
- [ ] Export function `getLocationServiceLinks(locationSlug: string)` that returns all service links for a location
- [ ] Export function `getSiblingLocations(regionName: string, currentLocationSlug: string)` that returns other locations in same region
- [ ] All functions return arrays of `{ title: string; href: string; slug: string }`
- [ ] Functions handle missing data gracefully (return empty arrays, no throws)
- [ ] `pnpm build` passes with no errors
- [ ] TypeScript types are exported for return values

---

### US-002: Create Service Categories Collection

**Description:** As a content author, I need service category content files so that category pages have unique content and SEO metadata.

**Acceptance Criteria:**
- [ ] Add `serviceCategories` collection to `src/content/config.ts` with schema: `title`, `description`, `slug`, `seoTitle`, `seoDescription`, `icon` (optional), `order` (number)
- [ ] Create `src/content/service-categories/heating.md` with unique 500+ word content about heating services
- [ ] Create `src/content/service-categories/cooling.md` with unique 500+ word content about cooling services
- [ ] Create `src/content/service-categories/iaq.md` (Indoor Air Quality) with unique 500+ word content
- [ ] Create `src/content/service-categories/water-heating.md` with unique 500+ word content
- [ ] Create `src/content/service-categories/commercial.md` with unique 500+ word content
- [ ] Each file includes frontmatter: `title`, `description`, `slug`, `seoTitle`, `seoDescription`, `order`
- [ ] `pnpm build` passes with no errors

---

### Phase 3B: Shared Section Components

---

### US-003: Create ServiceHeroSection Component

**Description:** As a user viewing a service page, I want to see a compelling hero section so that I understand what service is offered and can take action.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/ServiceHeroSection.astro`
- [ ] Props interface: `title: string`, `description: string`, `category: string`, `serviceType?: string`, `phoneNumber: string`, `phoneDisplay: string`
- [ ] Display service title as H1 with proper typography (text-4xl md:text-5xl font-bold)
- [ ] Display service description below title
- [ ] Display category badge using shadcn Badge component
- [ ] Include prominent phone CTA button using shadcn Button (size="lg")
- [ ] CTA button links to `tel:{phoneNumber}` with Phone icon from lucide-react
- [ ] Layout: centered text on mobile, left-aligned on desktop with image placeholder on right
- [ ] Image placeholder: `<div class="bg-muted aspect-video rounded-lg">Service Hero Image</div>`
- [ ] Responsive: stacked on mobile, side-by-side on lg breakpoint
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-004: Create ServiceBenefitsSection Component

**Description:** As a user, I want to see the key benefits of a service so that I understand why I should choose this company.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/ServiceBenefitsSection.astro`
- [ ] Props interface: `benefits: Array<{ title: string; description: string; icon: string }>`, `headline?: string`
- [ ] Default headline: "Why Choose Us"
- [ ] Display benefits in a responsive grid: 1 column mobile, 2 columns md, 4 columns lg
- [ ] Each benefit card uses shadcn Card component
- [ ] Display icon (placeholder div with icon name), title (font-semibold), description (text-muted-foreground)
- [ ] Cards have consistent padding (p-6) and subtle hover effect (hover:shadow-md transition-shadow)
- [ ] Handle empty benefits array gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-005: Create ServiceProcessSection Component

**Description:** As a user, I want to understand the service process so that I know what to expect when I hire this company.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/ServiceProcessSection.astro`
- [ ] Props interface: `steps: Array<{ step: number; title: string; description: string }>`, `headline?: string`, `subheadline?: string`
- [ ] Default headline: "Our Process"
- [ ] Display steps in numbered vertical timeline layout on mobile
- [ ] Display steps in horizontal layout on lg breakpoint
- [ ] Each step shows: step number in circle (bg-primary text-primary-foreground w-10 h-10 rounded-full), title (font-semibold text-lg), description
- [ ] Steps connected with vertical/horizontal line (bg-border)
- [ ] Handle empty steps array gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-006: Create ServiceFAQSection Component

**Description:** As a user, I want to see frequently asked questions so that I can get answers without calling.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/ServiceFAQSection.astro`
- [ ] Props interface: `faqs: Array<{ question: string; answer: string }>`, `headline?: string`
- [ ] Default headline: "Frequently Asked Questions"
- [ ] Use shadcn Accordion component for expandable Q&A
- [ ] Display up to 6 FAQs (configurable via `limit` prop, default 6)
- [ ] Each AccordionItem has question as trigger, answer as content
- [ ] Accordion type="single" collapsible for one-at-a-time expansion
- [ ] Handle empty faqs array gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-007: Create RelatedServicesSection Component

**Description:** As a user, I want to see related services so that I can explore other options.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/RelatedServicesSection.astro`
- [ ] Props interface: `services: Array<{ title: string; slug: string; description: string }>`, `headline?: string`
- [ ] Default headline: "Related Services"
- [ ] Display services in grid: 1 column mobile, 2 columns md, 3 columns lg
- [ ] Each service uses shadcn Card with CardHeader (title as link) and CardContent (description truncated to 2 lines)
- [ ] Links point to `/services/{slug}`
- [ ] Card title links styled with hover:underline
- [ ] Handle empty services array gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-008: Create LocationHeroSection Component

**Description:** As a user viewing a location page, I want to see a hero section that confirms I'm looking at services for my city.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/LocationHeroSection.astro`
- [ ] Props interface: `cityName: string`, `region: string`, `businessName: string`, `phoneNumber: string`, `phoneDisplay: string`, `description?: string`
- [ ] Display "HVAC Services in {cityName}, ON" as H1
- [ ] Display region name as subtitle badge
- [ ] Display description or default: "Professional heating, cooling, and indoor air quality services for {cityName} homeowners."
- [ ] Include phone CTA button (same pattern as ServiceHeroSection)
- [ ] Include trust signals row: "Since 1994", "X+ Google Reviews", "TSSA Licensed"
- [ ] Pull trust data from business profile via props
- [ ] Image placeholder on right side for map/local imagery
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-009: Create LocationServicesGrid Component

**Description:** As a user on a location page, I want to see all services available in my city so that I can find what I need.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/LocationServicesGrid.astro`
- [ ] Props interface: `locationSlug: string`, `locationName: string`, `services: Array<{ title: string; slug: string; category: string }>`
- [ ] Group services by category (heating, cooling, iaq, water-heating, commercial)
- [ ] Display each category as a section with category name as H3
- [ ] Services in each category displayed as grid: 1 column mobile, 2 columns md, 3 columns lg
- [ ] Each service is a Card linking to `/services/{serviceSlug}-{locationSlug}-on`
- [ ] Card shows service title and "Get a Quote" link
- [ ] Category sections separated with visual divider (Separator component)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### Phase 3C: Page Templates

---

### US-010: Create Category Page Template

**Description:** As a user browsing by service category, I want to see all services in that category with category-specific content.

**Acceptance Criteria:**
- [ ] Create `src/pages/services/category/[category].astro`
- [ ] Use getStaticPaths to generate pages from `serviceCategories` collection
- [ ] Include sections in order: CategoryHero (reuse HeroSection with category props), ServicesList (grid of services in category), ExpertConsultationSection (reuse), TestimonialsCarousel (filtered by category), FinalCTASection (reuse)
- [ ] CategoryHero displays category title, description, service count badge
- [ ] ServicesList queries services collection filtered by `category` field
- [ ] Each service card links to `/services/{slug}`
- [ ] Page uses BaseLayout with SEO title/description from category content
- [ ] `pnpm build` passes with no errors
- [ ] Verify /services/category/heating in browser using /agent-browser skill

---

### US-011: Create Service Page Template

**Description:** As a user viewing a specific service, I want to see comprehensive information about that service to make an informed decision.

**Acceptance Criteria:**
- [ ] Modify `src/pages/services/[service].astro` to include full template
- [ ] Include sections in order: ServiceHeroSection, ServiceBenefitsSection (using valueProps), ServiceProcessSection (using processSteps), ServiceSavingsSection (create in US-012), ServiceFAQSection (filtered FAQs), TestimonialsCarousel (filtered by serviceSlug), RelatedServicesSection, FinalCTASection
- [ ] Query FAQs collection with `scopes` matching `service:{slug}`
- [ ] Query reviews collection filtered by serviceSlug
- [ ] Use getInternalLinks utility for RelatedServicesSection
- [ ] Pass business phone from profile.yaml to hero CTA
- [ ] Handle services missing optional fields (valueProps, processSteps) gracefully
- [ ] `pnpm build` passes with no errors (22 service pages)
- [ ] Verify /services/furnace-installation in browser using /agent-browser skill

---

### US-012: Create ServiceSavingsSection Component

**Description:** As a user, I want to see potential savings and rebate information so that I understand the financial benefits.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/ServiceSavingsSection.astro`
- [ ] Props interface: `headline: string`, `description?: string`, `bullets?: string[]`, `rebateInfo?: string`, `financingNote?: string`
- [ ] Display headline as H2
- [ ] Display description as paragraph
- [ ] Display bullets as checkmark list (Check icon from lucide-react, text-green-600)
- [ ] Display rebateInfo in highlighted card (bg-primary/10 border-primary)
- [ ] Display financingNote with link to /financing page
- [ ] Handle missing optional props gracefully
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-013: Create Location Page Template

**Description:** As a user viewing a location page, I want to see all HVAC services available in my city with local context.

**Acceptance Criteria:**
- [ ] Modify `src/pages/locations/[location].astro` to include full template
- [ ] Include sections in order: LocationHeroSection, LocationServicesGrid (all services), SiblingLocationsSection (create in US-014), TestimonialsCarousel (filtered by location if reviews have citySlug), FinalCTASection
- [ ] Render markdown body content from location file after hero
- [ ] Pass all required props to sections from location data and business profile
- [ ] `pnpm build` passes with no errors (25 location pages)
- [ ] Verify /locations/guelph in browser using /agent-browser skill

---

### US-014: Create SiblingLocationsSection Component

**Description:** As a user on a location page, I want to see nearby locations so that I can explore services in other cities.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/SiblingLocationsSection.astro`
- [ ] Props interface: `currentLocation: string`, `region: string`, `siblingLocations: Array<{ name: string; slug: string }>`
- [ ] Display "Also Serving {region}" as headline
- [ ] Display sibling locations as horizontal scrollable list on mobile, grid on desktop
- [ ] Each location is a pill/badge linking to `/locations/{slug}`
- [ ] Current location shown but not linked (visually distinct, muted)
- [ ] Handle empty siblingLocations gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-015: Create Service-City Page Template

**Description:** As a user searching for a specific service in a specific city, I want to see locally-relevant information combined with service details.

**Acceptance Criteria:**
- [ ] Modify `src/pages/services/[serviceLocation].astro` to include full template
- [ ] Query service-city collection to get `localContext` and `localProof`
- [ ] Query parent service for `valueProps`, `processSteps`, `savings`, `guarantee`
- [ ] Query parent location for regional context
- [ ] Include sections: ServiceHeroSection (with city name in title), LocalContextSection (create in US-016), ServiceBenefitsSection, ServiceProcessSection, LocalProofSection (testimonial from localProof), ServiceSavingsSection, ServiceFAQSection, RelatedServicesSection (same service other cities), FinalCTASection
- [ ] SEO: Use service-city seoTitle and seoDescription
- [ ] Handle missing localContext/localProof gracefully (skip those sections)
- [ ] `pnpm build` passes with no errors (550 pages)
- [ ] Verify /services/furnace-installation-guelph-on in browser using /agent-browser skill

---

### US-016: Create LocalContextSection Component

**Description:** As a user, I want to see information specific to my city so that I know the company understands local needs.

**Acceptance Criteria:**
- [ ] Create `src/components/sections/LocalContextSection.astro`
- [ ] Props interface: `cityName: string`, `content: string` (markdown string)
- [ ] Display "{Service} in {cityName}" context as headline
- [ ] Render markdown content using Astro's set:html directive
- [ ] Style content with prose classes for readable typography
- [ ] Include subtle city-themed styling (optional border or background)
- [ ] Handle empty content gracefully (render nothing)
- [ ] `pnpm build` passes with no errors
- [ ] Verify in browser using /agent-browser skill at localhost:4321

---

### US-017: Create About Page

**Description:** As a user wanting to learn about the company, I want to see the company story, team, and values.

**Acceptance Criteria:**
- [ ] Modify `src/pages/about.astro` to include full template
- [ ] Include sections: HeroSection (About title), FamilyStorySection (reuse from Phase 2), ValuePropsGrid (reuse), CertificationsSection (reuse), TestimonialsCarousel, FinalCTASection
- [ ] Add "Our Story" section with company history (established 1994, owner Paul Palmer)
- [ ] Add "Our Values" section with 3-4 company values
- [ ] Pull all business data from profile.yaml
- [ ] `pnpm build` passes with no errors
- [ ] Verify /about in browser using /agent-browser skill

---

### US-018: Create FAQs Page

**Description:** As a user with questions, I want to browse all FAQs organized by topic.

**Acceptance Criteria:**
- [ ] Modify `src/pages/faqs.astro` to include full template
- [ ] Query all FAQs from faqs collection where status='live'
- [ ] Group FAQs by scope prefix (service:*, location:*, general)
- [ ] Display each group as a section with Accordion
- [ ] Include search/filter functionality using client-side filtering (React component)
- [ ] Include HeroSection with "Frequently Asked Questions" title
- [ ] Include FinalCTASection at bottom
- [ ] `pnpm build` passes with no errors
- [ ] Verify /faqs in browser using /agent-browser skill

---

### US-019: Create Reviews Page

**Description:** As a user researching the company, I want to see all reviews in one place.

**Acceptance Criteria:**
- [ ] Modify `src/pages/reviews.astro` to include full template
- [ ] Include HeroSection with "Customer Reviews" title and Google rating badge
- [ ] Query all reviews from reviews collection where status='live'
- [ ] Display reviews using TestimonialsCarousel (reuse) or grid layout
- [ ] Add filter tabs by service category (All, Heating, Cooling, etc.)
- [ ] Show total review count and average rating
- [ ] Include FinalCTASection
- [ ] `pnpm build` passes with no errors
- [ ] Verify /reviews in browser using /agent-browser skill

---

### US-020: Create Blog Index Page

**Description:** As a user, I want to browse blog articles for HVAC tips and information.

**Acceptance Criteria:**
- [ ] Modify `src/pages/blog/index.astro` to include full template
- [ ] Include HeroSection with "HVAC Tips & Insights" title
- [ ] Query all blog posts where workflowStatus='published', sorted by publishDate desc
- [ ] Display featured post (if any) prominently at top
- [ ] Display remaining posts in grid: 1 column mobile, 2 columns md, 3 columns lg
- [ ] Each post card shows: image placeholder, title, excerpt (description), date, category badge
- [ ] Post cards link to `/blog/{slug}`
- [ ] Include pagination if more than 12 posts (static pagination via getStaticPaths)
- [ ] `pnpm build` passes with no errors
- [ ] Verify /blog in browser using /agent-browser skill

---

### US-021: Create Rebates Page

**Description:** As a user interested in savings, I want to see available rebates and incentives.

**Acceptance Criteria:**
- [ ] Create `src/pages/rebates.astro`
- [ ] Include HeroSection with "Ontario HVAC Rebates & Incentives" title
- [ ] Create content section explaining Canada Greener Homes Grant (up to $7,100)
- [ ] Create content section explaining Enbridge Gas rebates
- [ ] Create content section explaining time-of-use electricity savings
- [ ] Each rebate section includes: name, amount, eligibility, how to apply
- [ ] Include callout: "We handle rebate paperwork for you"
- [ ] Include ServiceCategoriesGrid showing rebate-eligible services
- [ ] Include FinalCTASection
- [ ] `pnpm build` passes with no errors
- [ ] Verify /rebates in browser using /agent-browser skill

---

### Phase 3D: Supporting Pages

---

### US-022: Create Contact Page

**Description:** As a user wanting to contact the company, I want to see all contact options clearly.

**Acceptance Criteria:**
- [ ] Modify `src/pages/contact.astro` to include full template
- [ ] Include HeroSection with "Contact Us" title
- [ ] Display primary phone prominently with Button CTA
- [ ] Display email with mailto link
- [ ] Display business address from profile.yaml
- [ ] Display business hours
- [ ] Include Google Maps embed placeholder (div with "Google Map" text)
- [ ] Include service area list (all 25 locations grouped by region)
- [ ] Do NOT include contact form (phone/email only per business requirements)
- [ ] `pnpm build` passes with no errors
- [ ] Verify /contact in browser using /agent-browser skill

---

### US-023: Create Financing Page

**Description:** As a user concerned about cost, I want to learn about financing options.

**Acceptance Criteria:**
- [ ] Modify `src/pages/financing.astro` to include full template
- [ ] Include HeroSection with "Flexible Financing Options" title
- [ ] Create "How It Works" section with 3-4 steps
- [ ] Display financing benefits (low monthly payments, quick approval, no hidden fees)
- [ ] Include callout about rebates working alongside financing
- [ ] Link to /rebates page for rebate information
- [ ] Include FinalCTASection with "Call to discuss financing" message
- [ ] `pnpm build` passes with no errors
- [ ] Verify /financing in browser using /agent-browser skill

---

### US-024: Create Careers Page

**Description:** As a job seeker, I want to learn about career opportunities at the company.

**Acceptance Criteria:**
- [ ] Modify `src/pages/careers.astro` to include full template
- [ ] Include HeroSection with "Join Our Team" title
- [ ] Create "Why Work With Us" section with benefits
- [ ] Create "Current Openings" section (can be static list or "Contact us for opportunities")
- [ ] Include company values/culture section
- [ ] Include email CTA for resume submission (mailto link)
- [ ] `pnpm build` passes with no errors
- [ ] Verify /careers in browser using /agent-browser skill

---

### US-025: Create Locations Index Page

**Description:** As a user looking for service in their area, I want to browse all service locations.

**Acceptance Criteria:**
- [ ] Modify `src/pages/locations/index.astro` to include full template
- [ ] Include HeroSection with "Service Areas" title
- [ ] Display locations grouped by region (6 regions from profile.yaml)
- [ ] Each region is a section with region name as H2
- [ ] Locations within region displayed as grid of cards
- [ ] Each location card links to `/locations/{slug}` and shows city name
- [ ] Include map placeholder showing service area
- [ ] Include FinalCTASection
- [ ] `pnpm build` passes with no errors
- [ ] Verify /locations in browser using /agent-browser skill

---

### US-026: Create Blog Post Template

**Description:** As a user reading a blog post, I want a clean reading experience with related content.

**Acceptance Criteria:**
- [ ] Modify `src/pages/blog/[slug].astro` to include full template
- [ ] Display post title as H1
- [ ] Display metadata: publish date, author, category badge
- [ ] Display image placeholder if post has image field
- [ ] Render markdown body content with prose styling
- [ ] Include "Related Posts" section showing 3 posts in same category
- [ ] Include author bio section (can be static for now)
- [ ] Include FinalCTASection
- [ ] `pnpm build` passes with no errors
- [ ] Verify a blog post in browser using /agent-browser skill

---

### US-027: Create Region Page Template

**Description:** As a user browsing by region, I want to see all locations and services in that region.

**Acceptance Criteria:**
- [ ] Modify `src/pages/regions/[region].astro` to include full template
- [ ] Use getStaticPaths to generate pages from regions collection
- [ ] Include HeroSection with region title and description
- [ ] Display all cities in region as grid of location cards
- [ ] Each city card links to `/locations/{citySlug}`
- [ ] Include ServiceCategoriesGrid showing services available region-wide
- [ ] Render markdown body content from region file
- [ ] Include FinalCTASection
- [ ] `pnpm build` passes with no errors
- [ ] Verify /regions/wellington-county in browser using /agent-browser skill

---

## Functional Requirements

- FR-1: All pages must use BaseLayout component for consistent header/footer
- FR-2: All phone CTAs must use `tel:` links with phone from profile.yaml
- FR-3: All pages must have valid seoTitle and seoDescription meta tags
- FR-4: Service-city URLs must follow pattern `/services/{service}-{city}-on`
- FR-5: All internal links must be valid (no 404s)
- FR-6: Images use placeholder divs during development
- FR-7: All pages must be mobile responsive (tested at 375px, 768px, 1024px)
- FR-8: No gradient borders or buttons anywhere
- FR-9: Touch targets must be minimum 44px

---

## Non-Goals (Out of Scope)

- Online booking or quote forms
- User authentication or accounts
- E-commerce or payment processing
- Live chat functionality
- Contact forms (phone/email only)
- Real images (using placeholders)
- Performance optimization (Phase 4)
- Final color scheme (Phase 5)

---

## Technical Considerations

- **Content Collections:** All data pulled from Astro content collections with Zod validation
- **Business Data:** Single source of truth is `src/content/business/profile.yaml`
- **Static Generation:** All pages pre-rendered at build time (no SSR)
- **Component Reuse:** Maximize reuse of Phase 2 section components
- **Internal Links:** Use getInternalLinks utility for cross-linking

---

## Success Metrics

- `pnpm build` completes with 0 errors
- All 623+ pages render correctly
- All pages pass /agent-browser visual verification
- All internal links resolve (no 404s)
- Mobile responsive at all breakpoints

---

## Open Questions

- None - all requirements clarified during planning phase
