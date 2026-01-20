# SEO Requirements Specification
## B.A.P Heating & Cooling Services Website

**Document Version:** 1.1
**Last Updated:** 2026-01-19
**Status:** Approved

---

## Purpose

This document defines the **complete SEO implementation requirements** for the B.A.P Heating & Cooling Services website.

SEO is the **primary driver of business value** for this website. This specification ensures:
- Strong local organic search rankings
- Rich results eligibility (featured snippets, local packs, knowledge panels)
- Crawlability and indexability at scale (760+ pages)
- Consistent local SEO signals across all pages

This specification is the **source of truth** for SEO implementation.

---

## SEO Strategy Overview

### Core SEO Pillars

1. **Service-Based SEO**
   Target: Service keywords (e.g., "furnace repair", "AC installation")
   Pages: Service pages, Service-Location pages

2. **Location-Based SEO**
   Target: Location keywords (e.g., "HVAC Guelph", "heating contractor Kitchener")
   Pages: Location pages, Service-Location pages, Region pages

3. **Service-Location Combinations (Long-Tail)**
   Target: Specific local intent (e.g., "furnace repair Guelph", "AC installation Kitchener")
   Pages: Service-Location pages (600+)

4. **Informational Content**
   Target: Educational queries (e.g., "when to replace furnace", "HVAC maintenance tips")
   Pages: Blog posts, FAQs

5. **Brand & Trust**
   Target: Branded queries (e.g., "B.A.P Heating reviews", "B.A.P Heating Guelph")
   Pages: Homepage, About, Reviews, Contact

---

## 1. Metadata Strategy

### Title Tags

#### General Rules
- **Maximum Length:** 60 characters (ideal), 70 characters (hard limit)
- **Format:** `{Primary Keyword} | {Modifier} | {Brand}`
- **Brand:** Always include "B.A.P Heating" or "B.A.P Heating & Cooling"
- **Uniqueness:** Every page must have a unique title tag
- **Keyword Placement:** Primary keyword near the beginning

#### Page-Type Specific Titles

**Homepage:**
```
Format: {Brand} | {Primary Service Area} | {Primary Services}
Example: B.A.P Heating & Cooling | Guelph & Southern Ontario HVAC
Length: 55-60 characters
```

**Service Pages:**
```
Format: {Service} | {USP} | {Brand}
Example: Furnace Repair | 24/7 Emergency | B.A.P Heating
Example: Air Conditioner Installation | Free Estimate | B.A.P Heating
Length: 50-60 characters
```

**Location Pages:**
```
Format: HVAC Services in {Location}, ON | {Brand}
Example: HVAC Services in Guelph, ON | B.A.P Heating & Cooling
Length: 50-60 characters
```

**Service-Location Pages:**
```
Format: {Service} in {Location}, ON | {Brand}
Example: Furnace Repair in Guelph, ON | B.A.P Heating
Example: AC Installation in Kitchener, ON | B.A.P Heating
Length: 50-60 characters
```

**Region Pages:**
```
Format: HVAC Services in {Region}, ON | {Brand}
Example: HVAC Services in Wellington County, ON | B.A.P Heating
Length: 55-65 characters
```

**Blog Posts:**
```
Format: {Article Title} | {Brand} Blog
Example: When to Replace Your Furnace | B.A.P Heating Blog
Length: 50-70 characters
```

**Static Pages:**
```
About: About B.A.P Heating & Cooling | 30+ Years Serving Ontario
Contact: Contact B.A.P Heating & Cooling | Call +1 519-835-4858
FAQs: HVAC FAQs | B.A.P Heating & Cooling
Reviews: Customer Reviews | B.A.P Heating & Cooling (4.8 Stars)
```

---

### Meta Descriptions

#### General Rules
- **Maximum Length:** 155 characters (ideal), 160 characters (hard limit)
- **Format:** Action-oriented, include primary keyword, CTA
- **Uniqueness:** Every page must have a unique meta description
- **Tone:** Professional, direct, benefit-focused
- **CTA:** Include phone number or action (Call, Book, Learn More)

#### Page-Type Specific Descriptions

**Homepage:**
```
Example: 24/7 HVAC services in Guelph & Southern Ontario. Furnace, AC, heat pumps. 4.8★ from 407 reviews. Free estimates. Call +1 519-835-4858.
Length: 145 characters
```

**Service Pages:**
```
Example: 24/7 furnace repair with no overtime charges. 90-day guarantee, upfront pricing. TSSA-certified. Serving Guelph & area. Call +1 519-835-4858.
Length: 150 characters
```

**Location Pages:**
```
Example: Professional HVAC services in Guelph, ON. Furnace, AC, heat pumps. 24/7 emergency service, 60-min response. Call +1 519-835-4858.
Length: 140 characters
```

**Service-Location Pages:**
```
Example: Furnace repair in Guelph, ON. 24/7 emergency service, 60-min response, 90-day guarantee. No overtime charges. Call +1 519-835-4858.
Length: 145 characters
```

**Blog Posts:**
```
Example: Learn when to replace your furnace, signs of failure, and cost considerations. Expert advice from B.A.P Heating & Cooling.
Length: 130 characters
```

---

### Open Graph Tags (Social Sharing)

**Required on All Pages:**
```html
<meta property="og:title" content="{Page Title}" />
<meta property="og:description" content="{Meta Description}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{Canonical URL}" />
<meta property="og:image" content="{Image URL}" />
<meta property="og:site_name" content="B.A.P Heating & Cooling Services" />
<meta property="og:locale" content="en_CA" />
```

**Twitter Card Tags:**
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{Page Title}" />
<meta name="twitter:description" content="{Meta Description}" />
<meta name="twitter:image" content="{Image URL}" />
```

---

## 2. Structured Data (Schema.org)

### LocalBusiness Schema (Homepage)

**Type:** `LocalBusiness` + `HVACBusiness`
**Placement:** Homepage `<head>` or end of `<body>`

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HVACBusiness"],
  "@id": "https://bapheating.ca/#organization",
  "name": "B.A.P Heating & Cooling Services Ltd",
  "alternateName": "B.A.P Heating",
  "description": "24/7 residential and commercial HVAC services across Guelph and Southern Ontario since 1994.",
  "url": "https://bapheating.ca",
  "logo": "https://bapheating.ca/logo.png",
  "image": "https://bapheating.ca/images/business/storefront.jpg",
  "telephone": "+15198354858",
  "email": "info@bapheating.ca",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "25 Clearview St Unit 6",
    "addressLocality": "Guelph",
    "addressRegion": "ON",
    "postalCode": "N1E 6C4",
    "addressCountry": "CA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "43.558281",
    "longitude": "-80.219747"
  },
  "openingHours": "Mo-Su 00:00-23:59",
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "407",
    "bestRating": "5",
    "worstRating": "1"
  },
  "areaServed": [
    {"@type": "City", "name": "Guelph"},
    {"@type": "City", "name": "Kitchener"},
    {"@type": "City", "name": "Waterloo"},
    {"@type": "City", "name": "Burlington"}
    // ... (all 30+ cities)
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "HVAC Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furnace Repair",
          "url": "https://bapheating.ca/services/furnace-repair"
        }
      }
      // ... (all 22 services)
    ]
  },
  "sameAs": [
    "https://www.facebook.com/Bapheating/",
    "https://www.instagram.com/bapheatingservices"
  ],
  "foundingDate": "1994",
  "founder": {
    "@type": "Person",
    "name": "Paul Palmer"
  }
}
```

---

### Service Schema (Service Pages)

**Type:** `Service`
**Placement:** Service page `<head>` or end of `<body>`

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://bapheating.ca/services/furnace-repair#service",
  "name": "Furnace Repair",
  "description": "24/7 emergency furnace repair services with no overtime charges, 90-day guarantee, and upfront pricing.",
  "provider": {
    "@id": "https://bapheating.ca/#organization"
  },
  "areaServed": [
    {"@type": "City", "name": "Guelph"},
    {"@type": "City", "name": "Kitchener"}
    // ... (all 30+ cities)
  ],
  "serviceType": "HVAC Repair",
  "category": "Heating",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "CAD",
    "availability": "https://schema.org/InStock",
    "availableAtOrFrom": {
      "@id": "https://bapheating.ca/#organization"
    }
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Furnace Repair Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Emergency Furnace Repair"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Furnace Diagnostic"
        }
      }
    ]
  }
}
```

---

### FAQPage Schema (FAQ Page)

**Type:** `FAQPage`
**Placement:** FAQ page `<head>` or end of `<body>`

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://bapheating.ca/faqs#faqpage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does air conditioner installation cost in Ontario?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Central air conditioner installation in Ontario typically ranges from $4,000 to $9,000+, depending on the unit size, SEER rating, and installation requirements. We provide free estimates with transparent pricing."
      }
    }
    // ... (all FAQs)
  ]
}
```

---

### BreadcrumbList Schema (All Pages)

**Type:** `BreadcrumbList`
**Placement:** All pages with breadcrumbs

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bapheating.ca/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://bapheating.ca/services"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Furnace Repair",
      "item": "https://bapheating.ca/services/furnace-repair"
    }
  ]
}
```

---

### Article Schema (Blog Posts)

**Type:** `Article` or `BlogPosting`
**Placement:** Blog post pages

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": "https://bapheating.ca/blog/when-to-replace-your-furnace#article",
  "headline": "When to Replace Your Furnace",
  "description": "Learn the signs that indicate it's time to replace your furnace, including age, efficiency, and repair costs.",
  "author": {
    "@type": "Person",
    "name": "Paul Palmer"
  },
  "publisher": {
    "@id": "https://bapheating.ca/#organization"
  },
  "datePublished": "2025-12-15",
  "dateModified": "2025-12-15",
  "image": "https://bapheating.ca/images/blog/furnace-replacement.jpg",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://bapheating.ca/blog/when-to-replace-your-furnace"
  }
}
```

---

## 3. Local SEO Signals

### NAP Consistency (Name, Address, Phone)

**Rule:** NAP must be **identical** across all pages and external listings.

**Canonical NAP:**
```
Name: B.A.P Heating & Cooling Services Ltd
Address: 25 Clearview St Unit 6, Guelph, ON N1E 6C4, Canada
Phone: +1 519-835-4858
```

**Implementation:**
- NAP in footer (all pages)
- NAP in Contact page
- NAP in LocalBusiness schema (homepage)
- NAP in Google Business Profile (external)
- NAP in Bing Places (external)
- NAP in directory listings (external)

**Validation:**
- Whitespace Tool (check for invisible characters)
- Manual review of all NAP instances
- No variations (e.g., "BAP" vs "B.A.P", "519-835-4858" vs "+1 519-835-4858")

---

### Service Area Targeting

**Strategy:** Geo-target at city level (30+ cities), not region level.

**Implementation:**
- Location pages for each city (`/locations/{city}`)
- Service-Location pages for each service × city combination
- `areaServed` in LocalBusiness schema (list all cities)
- City mentions in H1, H2, body content (natural, not keyword-stuffed)

**Example (Service-Location Page):**
```html
<h1>Furnace Repair in Guelph, ON</h1>
<p>B.A.P Heating & Cooling Services Ltd provides <strong>Furnace Repair</strong> in <strong>Guelph, ON</strong>, with 24/7 emergency support...</p>
```

---

### Google Business Profile Integration

**Primary Listing:**
- Name: B.A.P Heating & Cooling Services Ltd
- Category: HVAC Contractor (primary), Heating Contractor, Air Conditioning Contractor
- Address: 25 Clearview St Unit 6, Guelph, ON N1E 6C4
- Phone: +1 519-835-4858
- Website: https://bapheating.ca
- Service Areas: All 30+ cities listed
- Hours: 24 hours
- Attributes: Emergency services, Free estimates, Online booking

**Schema Connection:**
- LocalBusiness `@id` references Google Business Profile
- NAP matches exactly

---

## 4. Internal Linking Strategy

### Linking Hierarchy

```
Homepage
  ├─→ Service Pages (20) ──→ Service-Location Pages (600+)
  ├─→ Location Pages (30+) ─→ Service-Location Pages (600+)
  ├─→ Region Pages (6) ─────→ Location Pages (30+) ──→ Service-Location Pages (600+)
  ├─→ Blog Posts ────────────→ Service Pages, Location Pages
  ├─→ FAQs ──────────────────→ Service Pages
  └─→ About, Contact, Reviews
```

### Breadcrumbs (All Pages)

**Format:** Home > Category > Page

**Examples:**
- Service: `Home > Services > Furnace Repair`
- Location: `Home > Locations > Guelph`
- Service-Location: `Home > Services > Furnace Repair > Furnace Repair in Guelph, ON`
- Blog: `Home > Blog > When to Replace Your Furnace`

**Implementation:**
- Visual breadcrumbs (top of page, below header)
- BreadcrumbList schema (structured data)
- Linked breadcrumbs (clickable navigation)

---

### Contextual Linking

**Service Pages:**
- Link to all Service-Location pages for this service (30+ links)
- Link to related services in same category (3-5 links)
- Link to relevant blog posts (2-3 links)
- Link to relevant FAQs (2-5 links)

**Location Pages:**
- Link to all Service-Location pages for this location (20 links)
- Link to parent Region page (1 link)
- Link to nearby Location pages (2-4 links)

**Service-Location Pages:**
- Link to parent Service page (1 link)
- Link to parent Location page (1 link)
- Link to same service in nearby locations (3-5 links)
- Link to other services in same location (3-5 links)

**Blog Posts:**
- Link to relevant Service pages (1-3 links)
- Link to relevant Location pages (if locally relevant)
- Link to related Blog posts (2-3 links)
- Link to relevant FAQs (1-2 links)

---

### Footer Links (All Pages)

**Services Section:**
- Link to all 20 service pages (or top 10 + "View All Services")

**Locations Section:**
- Link to all 6 region pages + "View All Locations"

**Company Section:**
- About
- Contact
- Reviews
- Blog
- FAQs

**Legal Section:**
- Privacy Policy
- Terms of Service
- Sitemap

---

## 5. XML Sitemap

### Structure

**File:** `/sitemap.xml`

**Format:** XML Sitemap Index (if large)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://bapheating.ca/sitemap-pages.xml</loc>
    <lastmod>2026-01-19T00:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://bapheating.ca/sitemap-services.xml</loc>
    <lastmod>2026-01-19T00:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://bapheating.ca/sitemap-locations.xml</loc>
    <lastmod>2026-01-19T00:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://bapheating.ca/sitemap-service-locations.xml</loc>
    <lastmod>2026-01-19T00:00:00+00:00</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://bapheating.ca/sitemap-blog.xml</loc>
    <lastmod>2026-01-19T00:00:00+00:00</lastmod>
  </sitemap>
</sitemapindex>
```

---

### Sitemap Priorities & Change Frequencies

| Page Type | Priority | Change Frequency |
|-----------|----------|------------------|
| Homepage | 1.0 | daily |
| Service Pages | 0.9 | weekly |
| Location Pages | 0.8 | weekly |
| Service-Location Pages | 0.7 | monthly |
| Region Pages | 0.6 | monthly |
| Blog Posts | 0.5 | weekly |
| Case Studies | 0.5 | monthly |
| Static Pages | 0.6 | monthly |

---

### robots.txt

**File:** `/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://bapheating.ca/sitemap.xml

# Block query parameters
Disallow: /*?*

# Block admin/private areas (if any)
Disallow: /admin/
Disallow: /private/

# Block development/test pages (if any)
Disallow: /test/
Disallow: /dev/
```

---

## 6. Canonical URLs

### Rules
1. Every page declares its canonical URL
2. Canonical URLs are absolute (include domain)
3. Canonical URLs use HTTPS
4. Canonical URLs do not include query parameters (unless required)
5. Canonical URLs do not include trailing slashes (except root `/`)

### Implementation

**All Pages:**
```html
<link rel="canonical" href="https://bapheating.ca{pathname}" />
```

**Examples:**
- Homepage: `<link rel="canonical" href="https://bapheating.ca/" />`
- Service: `<link rel="canonical" href="https://bapheating.ca/services/furnace-repair" />`
- Service-Location: `<link rel="canonical" href="https://bapheating.ca/services/furnace-repair-guelph-on" />`

---

## 7. Performance & Technical SEO

### Core Web Vitals Targets

| Metric | Target | Rationale |
|--------|--------|-----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Good user experience, SEO ranking factor |
| **FID** (First Input Delay) | < 100ms | Interactivity, user engagement |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Visual stability, user experience |

### Implementation Strategy
- Static generation (Astro SSG) for fast loading
- Image optimization (WebP, lazy loading, responsive images)
- Minimal JavaScript (Astro Islands for interactivity)
- CSS optimization (Tailwind CSS purging, critical CSS)

---

### Mobile Optimization

**Requirements:**
- Responsive design (mobile-first)
- Touch-friendly CTAs (minimum 44×44px)
- Readable text (minimum 16px font size)
- No horizontal scrolling
- Fast mobile loading (< 3s LCP on 3G)

**Testing:**
- Google Mobile-Friendly Test
- Chrome DevTools Mobile Emulation
- Real device testing (iOS, Android)

---

### HTTPS

**Rule:** All pages served over HTTPS (required for SEO)

**Implementation:**
- SSL certificate (valid, not expired)
- HTTP → HTTPS 301 redirects
- HSTS header (optional but recommended)
- No mixed content (all resources HTTPS)

---

## 8. Content SEO Guidelines

### Keyword Usage

**Rules:**
- Primary keyword in H1 (once)
- Primary keyword in first paragraph (once)
- Primary keyword in body content (2-3 times, natural)
- Secondary keywords in H2, H3 (natural)
- Avoid keyword stuffing (penalty risk)

**Example (Service-Location Page):**
```html
<h1>Furnace Repair in Guelph, ON</h1> <!-- Primary keyword -->
<p>B.A.P Heating & Cooling Services Ltd provides <strong>Furnace Repair</strong> in <strong>Guelph, ON</strong>...</p> <!-- Primary keyword, natural -->
<h2>Why Choose Our Furnace Repair Services?</h2> <!-- Secondary keyword -->
```

---

### Content Uniqueness

**Rule:** No duplicate content across pages (thin content penalty)

**Service-Location Pages Strategy:**
- Template-driven structure (consistent)
- Dynamic data injection (service + location specific)
- Unique intro paragraph per page (from business profile template)
- Inherited service content (value props, process steps) — acceptable duplication
- Unique title, meta description, H1 per page

**Validation:**
- Use Screaming Frog or Sitebulb to detect duplicate content
- Manual review of 10% sample (60 pages)

---

### Heading Hierarchy

**Rules:**
- One H1 per page (page title)
- H2 for main sections
- H3 for subsections
- No skipping levels (H1 → H3 without H2)

**Example:**
```html
<h1>Furnace Repair in Guelph, ON</h1>
<h2>Why Choose B.A.P Heating?</h2>
<h3>24/7 Emergency Service</h3>
<h3>90-Day Guarantee</h3>
<h2>Our Furnace Repair Process</h2>
<h3>Step 1: Call or Book Online</h3>
```

---

## 9. SEO Monitoring & Metrics

### Key Performance Indicators (KPIs)

| Metric | Target | Tool |
|--------|--------|------|
| **Organic Traffic** | +30% YoY | Google Analytics |
| **Keyword Rankings** | Top 3 for 50+ keywords | Google Search Console, Ahrefs |
| **Local Pack Ranking** | Top 3 for "HVAC {city}" queries | GMB Insights, BrightLocal |
| **Click-Through Rate (CTR)** | > 5% average | Google Search Console |
| **Conversion Rate** | > 3% (calls + bookings) | Google Analytics, Call Tracking |
| **Page Indexation** | > 95% of pages indexed | Google Search Console |
| **Core Web Vitals** | > 75% pages passing | Google Search Console, PageSpeed Insights |

---

### Monitoring Tools

1. **Google Search Console**
   - Index coverage (ensure all pages indexed)
   - Performance (queries, clicks, impressions, CTR)
   - Core Web Vitals
   - Mobile usability

2. **Google Analytics**
   - Organic traffic trends
   - Conversion tracking (calls, form submissions)
   - Page performance (bounce rate, time on page)

3. **Google Business Profile Insights**
   - Local search appearance
   - Direction requests
   - Phone call clicks

4. **Ahrefs or SEMrush** (optional)
   - Keyword rankings
   - Backlink profile
   - Competitor analysis

---

## 10. Launch Checklist

Before launch, verify:

### Technical SEO
- [ ] All pages have unique title tags (< 60 characters)
- [ ] All pages have unique meta descriptions (< 160 characters)
- [ ] All pages have canonical tags (absolute URLs)
- [ ] robots.txt exists and allows crawling
- [ ] XML sitemap exists and is valid
- [ ] Sitemap submitted to Google Search Console
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] No broken internal links
- [ ] No broken external links

### Structured Data
- [ ] LocalBusiness schema on homepage
- [ ] Service schema on service pages
- [ ] FAQPage schema on FAQ page
- [ ] BreadcrumbList schema on all pages
- [ ] Article schema on blog posts
- [ ] Schema validates (Google Rich Results Test)

### Local SEO
- [ ] NAP consistent across all pages
- [ ] NAP matches Google Business Profile
- [ ] Service area pages exist for all 30+ cities
- [ ] Service-Location pages generated (600+)
- [ ] Google Business Profile verified and optimized

### Performance
- [ ] Core Web Vitals pass (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Mobile-friendly (Google Mobile-Friendly Test passes)
- [ ] PageSpeed Insights score > 90 (mobile, desktop)

### Content
- [ ] No duplicate content (Screaming Frog check)
- [ ] All H1 tags unique
- [ ] Keyword usage natural (no keyword stuffing)
- [ ] Internal linking implemented (footer, contextual)

---

## Related Documents

- [Page Types Specification](./page-types.md)
- [URL Architecture Specification](./url-architecture.md)
- [Content Model Specification](./content-model.md)
- [Project Requirements](../project-details.md)

---

**This document is the source of truth for SEO implementation. All SEO work must align with this specification.**
