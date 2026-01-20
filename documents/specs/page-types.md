# Page Types Specification
## B.A.P Heating & Cooling Services Website

**Document Version:** 1.1
**Last Updated:** 2026-01-19
**Status:** Approved

---

## Purpose

This document defines **all page types** for the B.A.P Heating & Cooling Services website.

Each page type has:
- A clear purpose and SEO role
- Defined URL pattern
- Required content elements
- Template requirements
- Scalability considerations

This specification is the **source of truth** for what pages exist and why.

---

## Page Type Overview

| Page Type | Count | URL Pattern | Primary Purpose |
|-----------|-------|-------------|-----------------|
| **Homepage** | 1 | `/` | Brand introduction, primary CTA, service/location navigation |
| **Service Pages** | 22 | `/services/{service}` | Service-specific SEO, conversion for service inquiries |
| **Location Pages** | 30+ | `/locations/{location}` | Location-specific SEO, local trust signals |
| **Service-Location Pages** | 660+ | `/services/{service}-{location}-on` | Long-tail local SEO, specific intent conversion |
| **Region Pages** | 6 | `/regions/{region}` | Regional coverage overview, internal linking hub |
| **Blog Posts** | Growing | `/blog/{slug}` | Educational content, seasonal relevance, topical SEO |
| **FAQ Page** | 1 | `/faqs` | Answer common questions, reduce bounce, voice search |
| **Case Studies** | Growing | `/case-studies/{slug}` | Social proof, trust signals, conversion support |
| **About Page** | 1 | `/about` | Company history, team, certifications, trust |
| **Contact Page** | 1 | `/contact` | Contact information, booking, service area map |
| **Reviews Page** | 1 | `/reviews` | Aggregate reviews, testimonials, ratings |

**Total Scale at Launch:** ~760+ pages

---

## 1. Homepage

### URL
- **Pattern:** `/`
- **Example:** `https://bapheating.ca/`

### Purpose
- Introduce the brand and primary value proposition
- Provide clear navigation to services and locations
- Establish trust with social proof (reviews, certifications)
- Drive primary conversion actions (call, book)

### Required Content Elements
1. **Hero Section**
   - Company name and tagline
   - Primary CTA (call or book)
   - Trust signal (years in business, review rating)
   - Coverage area statement

2. **Service Overview**
   - Navigation to main service categories (Heating, Cooling, IAQ, etc.)
   - Link to full services page or individual service pages

3. **Location Coverage**
   - Statement of service areas (6 regions, 30+ cities)
   - Link to locations page or region pages

4. **Trust Signals**
   - Google review rating (4.8 stars, 407 reviews)
   - Certifications (TSSA, HRAI, BBB)
   - Warranty statement (10-year parts and labour)
   - 24/7 emergency service badge

5. **Conversion Pathways**
   - Phone number (prominent, click-to-call)
   - Booking link (Housecall Pro)
   - Secondary CTA (free estimate, free diagnostic)

6. **Supporting Content**
   - Recent blog posts or seasonal message
   - FAQ snippet or common questions
   - Case study or testimonial highlight

### SEO Considerations
- Target: Brand name + "HVAC" + primary service area (e.g., "B.A.P Heating Guelph")
- Schema: LocalBusiness, Organization
- Internal linking: Hub to all major service and location pages

### Template Requirements
- Fully responsive (mobile-first)
- Fast loading (minimal JavaScript)
- Clear visual hierarchy
- Accessible (WCAG AA)

---

## 2. Service Pages

### URL
- **Pattern:** `/services/{service-slug}`
- **Examples:**
  - `/services/furnace-repair`
  - `/services/air-conditioner-installation`
  - `/services/heat-pump-maintenance`

### Purpose
- Rank for service-specific keywords (e.g., "furnace repair")
- Educate users about the service
- Convert service-specific inquiries
- Provide navigation to service-location pages

### Required Content Elements
1. **Service Overview**
   - Service title (e.g., "Furnace Repair")
   - Category (Heating, Cooling, IAQ, etc.)
   - Short description of what the service includes

2. **Service Details**
   - What the service covers
   - Common problems addressed
   - Benefits of professional service
   - Emergency availability (if applicable)

3. **Trust & Credibility**
   - Warranty information
   - Certifications relevant to service
   - Review rating specific to service (if available)

4. **Pricing & Offers**
   - Free estimates statement
   - Free diagnostics statement
   - Financing availability
   - Rebate support mention

5. **Service in Your Area**
   - List of locations where this service is available (30+ cities)
   - Links to service-location pages (e.g., "Furnace Repair in Guelph")

6. **Conversion Elements**
   - Primary CTA (call or book)
   - Phone number (click-to-call)
   - Booking link

7. **Related Content**
   - Related services (e.g., Furnace Maintenance, Furnace Installation)
   - Related blog posts
   - FAQs specific to service

### SEO Considerations
- Target: Service name + modifiers (e.g., "furnace repair near me", "emergency furnace repair")
- Schema: Service
- Internal linking: Link to all service-location pages for this service

### Template Requirements
- Consistent structure across all 20 service pages
- Dynamic location list (populated from business profile)
- Breadcrumbs (Home > Services > {Service})

### Content Source
- Service definitions from [business profile](../src/content/business/profile.yaml) (lines 103-145)
- Service-specific content from `/src/content/services/{service-slug}.md`

---

## 3. Location Pages

### URL
- **Pattern:** `/locations/{location-slug}`
- **Examples:**
  - `/locations/guelph`
  - `/locations/kitchener`
  - `/locations/burlington`

### Purpose
- Rank for location-specific keywords (e.g., "HVAC Guelph")
- Establish local presence and trust
- Provide navigation to service-location pages
- Show coverage and response time for area

### Required Content Elements
1. **Location Overview**
   - City/town name
   - Region (e.g., "Guelph, Wellington County")
   - Coverage confirmation (e.g., "We serve Guelph and surrounding areas")

2. **Local Trust Signals**
   - Response time statement (typically 60 minutes)
   - Local service history (if available)
   - Reviews from this area (if available)

3. **Services Available**
   - List of all 22 services available in this location
   - Links to service-location pages (e.g., "Furnace Repair in Guelph")

4. **Contact Information**
   - Phone number (same for all locations: +1 519-835-4858)
   - Email
   - Booking link

5. **Regional Context**
   - Link to parent region page (e.g., Wellington County)
   - Nearby locations served

6. **Conversion Elements**
   - Primary CTA (call or book)
   - Free estimate and free diagnostic statement

7. **Supporting Content**
   - Seasonal message (if applicable)
   - Local FAQ (if available)
   - Case studies from this area (if available)

### SEO Considerations
- Target: Location name + "HVAC", "heating", "cooling", "furnace repair", etc.
- Schema: LocalBusiness, Service
- NAP consistency (Name, Address, Phone)
- Internal linking: Link to all service-location pages for this location

### Template Requirements
- Consistent structure across all 30+ location pages
- Dynamic service list (populated from business profile)
- Map embed (if primary or secondary location)
- Breadcrumbs (Home > Locations > {Location})

### Content Source
- Location definitions from [business profile](../src/content/business/profile.yaml) (lines 59-101)
- Location-specific content from `/src/content/locations/{location-slug}.md`

---

## 4. Service-Location Pages

### URL
- **Pattern:** `/services/{service-slug}-{location-slug}-on`
- **Examples:**
  - `/services/furnace-repair-guelph-on`
  - `/services/air-conditioner-installation-kitchener-on`
  - `/services/heat-pump-maintenance-burlington-on`

### Purpose
- Rank for long-tail local keywords (e.g., "furnace repair Guelph")
- Capture high-intent, location-specific searches
- Provide hyper-local conversion pathway

### Required Content Elements
1. **Service-Location Title**
   - "{Service Title} in {City Name}, ON"
   - Example: "Furnace Repair in Guelph, ON"

2. **Introduction**
   - Template: "B.A.P Heating & Cooling Services Ltd provides **{Service Title}** in **{City Name}, ON**, with 24/7 emergency support and response typically within 60 minutes across our service area. Call +1 519-835-4858 to speak to a person."
   - Source: [business profile copy template](../src/content/business/profile.yaml#L223)

3. **Service Details**
   - Brief service description (inherited from service page)
   - Local relevance (e.g., "Guelph winters require reliable heating")

4. **Why Choose B.A.P in {Location}**
   - 24/7 emergency service
   - Typical 60-minute response time
   - Local trust signals

5. **Service Features**
   - What's included
   - Warranty information
   - Free estimates/diagnostics

6. **Conversion Elements**
   - Primary CTA (call or book)
   - Phone number (click-to-call)
   - Booking link

7. **Related Pages**
   - Other services in this location
   - This service in nearby locations
   - Parent service page
   - Parent location page

### SEO Considerations
- Target: "{Service} {Location}" (e.g., "furnace repair Guelph")
- Schema: Service with areaServed
- Internal linking: Link to parent service page and parent location page
- Avoid thin content: Balance templating with unique value

### Template Requirements
- Highly templated structure (600+ pages)
- Dynamic content populated from service + location data
- Efficient generation (static at build time)
- Breadcrumbs (Home > Services > {Service} > {Service in Location})

### Content Source
- Service data from business profile
- Location data from business profile
- Template structure defined here
- No manual content files (fully dynamic)

### Scale Consideration
**660+ pages** (22 services × 30 locations)

This is the **highest-volume page type** and must be:
- Efficient to generate (Astro static build)
- Consistent in structure (template-driven)
- SEO-optimized (avoid duplicate content, maintain uniqueness)

---

## 5. Region Pages

### URL
- **Pattern:** `/regions/{region-slug}`
- **Examples:**
  - `/regions/wellington-county`
  - `/regions/waterloo-region`
  - `/regions/halton-region`

### Purpose
- Provide regional coverage overview
- Act as internal linking hub for locations within region
- Support regional SEO (e.g., "HVAC Wellington County")

### Required Content Elements
1. **Region Overview**
   - Region name (e.g., "Wellington County")
   - Coverage statement (e.g., "We serve 6 cities across Wellington County")

2. **Locations in Region**
   - List all cities/towns in this region
   - Link to each location page

3. **Services Offered**
   - All 20 services available throughout region
   - Link to service pages or regional service-location pages

4. **Regional Trust Signals**
   - Years serving the region
   - Review rating
   - Response time statement

5. **Conversion Elements**
   - Primary CTA (call or book)
   - Phone number
   - Booking link

6. **Supporting Content**
   - Regional FAQ (if applicable)
   - Case studies from region (if available)

### SEO Considerations
- Target: Region name + "HVAC", "heating and cooling", etc.
- Schema: LocalBusiness with broader areaServed
- Internal linking: Link to all location pages in region

### Template Requirements
- Consistent structure across 6 region pages
- Dynamic location list (populated from business profile)
- Breadcrumbs (Home > Regions > {Region})

### Content Source
- Region definitions from [business profile](../src/content/business/profile.yaml) (lines 64-101)
- Region-specific content from `/src/content/regions/{region-slug}.md`

---

## 6. Blog Posts

### URL
- **Pattern:** `/blog/{slug}`
- **Examples:**
  - `/blog/when-to-replace-your-furnace`
  - `/blog/preparing-your-hvac-for-ontario-winter`
  - `/blog/benefits-of-heat-pumps-in-canada`

### Purpose
- Educational content for homeowners and businesses
- Seasonal relevance (winter furnace tips, summer AC tips)
- Topical SEO (informational keywords)
- Build authority and trust
- Support conversion through awareness

### Required Content Elements
1. **Title and Meta**
   - Clear, keyword-aligned title
   - Publication date
   - Author (Paul Palmer)
   - Category/tags (if applicable)

2. **Article Body**
   - Introduction
   - Structured content (headings, lists, images)
   - Educational value
   - Actionable takeaways

3. **Related Content**
   - Related services (e.g., article about furnaces links to Furnace Repair service)
   - Related blog posts
   - FAQs

4. **Conversion Elements**
   - Contextual CTA (e.g., "Need furnace repair? Call us.")
   - Phone number and booking link

5. **Author Bio**
   - Brief mention of Paul Palmer
   - Link to About page

### SEO Considerations
- Target: Informational keywords (e.g., "how to maintain furnace", "signs of AC failure")
- Schema: Article, BlogPosting
- Internal linking: Link to relevant service pages
- Freshness: Regular publishing schedule

### Template Requirements
- Article layout with good readability
- Image support
- Syntax highlighting (if technical content)
- Breadcrumbs (Home > Blog > {Title})

### Content Source
- Existing blog posts in `/src/content/blog/`
- Ongoing content creation

### Growth Strategy
- **Current:** 6 posts
- **Goal:** Regular publishing (seasonal, educational, newsworthy)
- **Cadence:** 2-4 posts per month (Phase 9: Growth & Scale)

---

## 7. FAQ Page

### URL
- **Pattern:** `/faqs`
- **Example:** `https://bapheating.ca/faqs`

### Purpose
- Answer common questions upfront
- Reduce bounce rate and support calls
- Capture voice search and featured snippets
- Build trust through transparency

### Required Content Elements
1. **Page Title**
   - "Frequently Asked Questions" or "FAQs"

2. **FAQ List**
   - Organized by category (General, Services, Pricing, etc.)
   - Question-Answer pairs
   - Expandable/collapsible format (accordion)

3. **Categories**
   - General (hours, coverage, response time)
   - Services (what's included, emergency service)
   - Pricing (estimates, financing, rebates)
   - Warranties (coverage, duration)

4. **Conversion Elements**
   - CTA: "Still have questions? Call us."
   - Phone number and booking link

### SEO Considerations
- Target: Question-based keywords (e.g., "do you offer emergency HVAC service?")
- Schema: FAQPage
- Internal linking: Link to relevant service and location pages

### Template Requirements
- Accordion or expandable Q&A layout
- Search/filter functionality (if FAQ count grows)
- Breadcrumbs (Home > FAQs)

### Content Source
- Existing FAQs in `/src/content/faqs/` (11 items)
- Ongoing additions based on customer questions

---

## 8. Case Studies

### URL
- **Pattern:** `/case-studies/{slug}`
- **Examples:**
  - `/case-studies/furnace-replacement-guelph`
  - `/case-studies/commercial-hvac-upgrade-kitchener`

### Purpose
- Demonstrate expertise and results
- Provide social proof and trust signals
- Support conversion through real-world examples

### Required Content Elements
1. **Title and Meta**
   - Descriptive title (e.g., "Emergency Furnace Replacement in Guelph")
   - Client type (residential, commercial)
   - Location

2. **Case Study Body**
   - Problem/Challenge
   - Solution/Approach
   - Results/Outcome
   - Customer testimonial (if applicable)

3. **Related Services**
   - Link to relevant service pages
   - Link to location page

4. **Conversion Elements**
   - CTA: "Need similar service? Contact us."
   - Phone number and booking link

### SEO Considerations
- Target: Branded + local keywords (e.g., "B.A.P Heating case studies")
- Schema: Article (or custom case study schema if available)
- Internal linking: Link to service and location pages

### Template Requirements
- Consistent case study layout
- Image support (before/after, job photos)
- Breadcrumbs (Home > Case Studies > {Title})

### Content Source
- Existing case studies in `/src/content/case-studies/` (3 items)
- Ongoing additions based on notable projects

### Growth Strategy
- **Current:** 3 case studies
- **Goal:** 1-2 new case studies per quarter
- **Focus:** High-value projects, diverse service types, different locations

---

## 9. About Page

### URL
- **Pattern:** `/about`
- **Example:** `https://bapheating.ca/about`

### Purpose
- Build trust through company history and credentials
- Introduce Paul Palmer (owner)
- Showcase certifications and affiliations
- Humanize the brand

### Required Content Elements
1. **Company History**
   - Established 1994 (30+ years in business)
   - Mission and values
   - Service philosophy (professional, direct, transparent)

2. **Owner Introduction**
   - Paul Palmer profile
   - Role and expertise
   - Photo (if available)

3. **Certifications & Affiliations**
   - TSSA licence (000076639116)
   - HRAI membership
   - HRAI Heat Pump Champion
   - Better Business Bureau
   - WSIB coverage
   - Full insurance statement

4. **Service Commitment**
   - 24/7 emergency service
   - 60-minute response time
   - 10-year warranty
   - No-Surprise Guarantee
   - Workmanship Guarantee

5. **Conversion Elements**
   - CTA: "Get to know us. Call for a free estimate."
   - Phone number and booking link

### SEO Considerations
- Target: Branded keywords (e.g., "B.A.P Heating about", "Paul Palmer HVAC")
- Schema: AboutPage, Organization
- Internal linking: Link to services, locations, contact

### Template Requirements
- Professional, trust-building layout
- Image support (team photos, certifications)
- Breadcrumbs (Home > About)

### Content Source
- Business profile data ([profile.yaml](../src/content/business/profile.yaml))
- Copy blocks from profile (lines 209-225)

---

## 10. Contact Page

### URL
- **Pattern:** `/contact`
- **Example:** `https://bapheating.ca/contact`

### Purpose
- Provide all contact methods (phone, email, booking)
- Show service area coverage
- Provide map and directions (if physical location)
- Primary conversion pathway

### Required Content Elements
1. **Contact Methods**
   - Phone: +1 519-835-4858 (click-to-call)
   - Email: info@bapheating.ca
   - Booking: Housecall Pro link
   - Hours: 24/7

2. **Primary Location**
   - B.A.P Heating & Cooling Services Ltd
   - 25 Clearview St Unit 6, Guelph, ON N1E 6C4
   - Google Maps embed

3. **Secondary Location** (optional display)
   - Elora area office
   - 6512 Wellington Rd 7, Centre Wellington, ON N0B 1S0

4. **Service Area**
   - "We serve 30+ cities across 6 regions in Southern Ontario"
   - Link to locations page or region pages

5. **Response Time**
   - "Typically within 60 minutes across our service area"

6. **Conversion Form** (optional)
   - Name, phone, email, service needed, message
   - Free estimate statement

### SEO Considerations
- Target: Branded + "contact" (e.g., "B.A.P Heating contact")
- Schema: ContactPage, LocalBusiness (with address and phone)
- NAP consistency

### Template Requirements
- Clear, accessible contact information
- Map embed (Google Maps)
- Contact form (if applicable)
- Breadcrumbs (Home > Contact)

### Content Source
- Business profile contact data ([profile.yaml](../src/content/business/profile.yaml) lines 19-29)
- Location data (lines 38-57)

---

## 11. Reviews Page

### URL
- **Pattern:** `/reviews`
- **Example:** `https://bapheating.ca/reviews`

### Purpose
- Aggregate and showcase customer reviews
- Build trust through social proof
- Display Google review rating prominently
- Support conversion through testimonials

### Required Content Elements
1. **Review Summary**
   - Google rating: 4.8 stars
   - Review count: 407 reviews
   - Statement: "Rated 4.8 stars from 407 Google reviews"

2. **Featured Reviews**
   - Highlight 5-10 top reviews
   - Customer name (first name or initial)
   - Review text
   - Star rating
   - Date

3. **Google Reviews Integration**
   - Live feed of Google reviews (if possible)
   - Note from business profile: "Integrate Google Reviews feed for always-live testimonials (no manual copying)"

4. **Link to Google**
   - CTA: "Read more reviews on Google"
   - Link to Google Business Profile

5. **Conversion Elements**
   - CTA: "Join our 407 happy customers. Call today."
   - Phone number and booking link

### SEO Considerations
- Target: Branded + "reviews" (e.g., "B.A.P Heating reviews")
- Schema: Review, AggregateRating
- Internal linking: Link to services and locations

### Template Requirements
- Review display cards or list
- Star rating visual
- Pagination or "load more" (if many reviews)
- Breadcrumbs (Home > Reviews)

### Content Source
- Google Reviews API (live integration preferred)
- Manual review content from `/src/content/reviews/` (if API not available)
- Review data from business profile (lines 187-193)

---

## Page Type Prioritization

### Phase 0 (Strategy Lock)
- Define all page types ✓ (this document)
- Lock URL patterns ✓
- Agree on content requirements ✓

### Phase 1-2 (Foundation & Data Model)
- Homepage (template only, minimal content)
- Service pages (20) — template + existing content
- Location pages (30+) — template + existing content
- Region pages (6) — template + existing content

### Phase 3-4 (Routing & Rendering)
- Service-Location pages (600+) — dynamic generation
- Blog posts (6 existing)
- FAQ page (11 existing)
- About page
- Contact page

### Phase 5-6 (UI & Branding)
- Polish all page types
- Optimize conversion pathways
- Refine trust signals

### Phase 7 (SEO Refinement)
- Case studies page (aggregate + individual)
- Reviews page (aggregate + live feed)
- Advanced internal linking
- Schema markup refinement

---

## Cross-Cutting Requirements

### All Page Types Must Include:
1. **Header**
   - Logo (B.A.P Heating & Cooling Services Ltd)
   - Main navigation (Services, Locations, Blog, About, Contact)
   - Phone number (prominent, click-to-call)
   - Booking CTA

2. **Footer**
   - Quick links (Services, Locations, FAQ, Reviews, About, Contact)
   - Contact information (phone, email, address)
   - Service area statement
   - Certifications and affiliations
   - Social media links (Instagram, Facebook)
   - Copyright notice

3. **Metadata**
   - Title tag (page-specific, under 60 characters)
   - Meta description (page-specific, under 160 characters)
   - Canonical URL
   - Open Graph tags (for social sharing)

4. **Performance**
   - Fast loading (target: < 2s LCP)
   - Minimal JavaScript
   - Optimized images
   - Static generation (Astro)

5. **Accessibility**
   - WCAG AA compliance
   - Semantic HTML
   - Keyboard navigation
   - Screen reader support

6. **Mobile**
   - Responsive design
   - Touch-friendly CTAs
   - Readable text (minimum 16px)
   - Fast mobile loading

---

## Next Steps

1. **URL Architecture Specification** — Document URL patterns, slug rules, sitemap structure
2. **Content Model Specification** — Define entity structures, relationships, data flow
3. **SEO Requirements Specification** — Metadata strategy, structured data, internal linking
4. **Phase 1 Execution** — Implement foundation and routing for core page types

---

**This document is the source of truth for page types. All implementation must align with this specification.**
