# Content Model Specification
## B.A.P Heating & Cooling Services Website

**Document Version:** 1.1
**Last Updated:** 2026-01-19
**Status:** Approved

---

## Purpose

This document defines the **complete content model** for the B.A.P Heating & Cooling Services website.

The content model specifies:
- Entity structures (fields, types, relationships)
- Data sources and ownership
- Content collection schemas (Astro)
- Business rules and validation
- Scalability patterns

This specification is the **source of truth** for what data exists and how it's structured.

---

## Content Architecture Overview

```
Business Profile (YAML)
  ↓
  ├─→ Services (22) ──→ Service Pages + Service-Location Pages
  ├─→ Locations (30+) ─→ Location Pages + Service-Location Pages
  └─→ Regions (6) ─────→ Region Pages

Content Collections (Markdown + Frontmatter)
  ├─→ Services (20 files)
  ├─→ Locations (30+ files)
  ├─→ Regions (6 files)
  ├─→ Blog (growing)
  ├─→ FAQs (11 items)
  └─→ Case Studies (3 items)
```

**Key Principle:** Business Profile is the **single source of truth** for business data. Content collections provide page-specific content.

---

## 1. Business Profile Entity

### Location
**File:** `/src/content/business/profile.yaml`

**Purpose:** Single source of truth for all business information

### Schema

```yaml
business:
  legal_name: string (required)
  trading_name: string | null
  established_year: number (required)
  owner_public:
    name: string (required)
    roles: string[] (required)
  tone:
    style: string (required)
    language: string (required)
    avoid_words: string[]
    seo_note: string

contact:
  phone_display: string (required, E.164 format)
  phone_e164: string (required)
  email: string (required, valid email)
  primary_cta:
    short: string (required)
    long: string (required)
  booking:
    enabled: boolean (required)
    provider: string
    url: string (required if enabled)

hours:
  business_hours: string (required)
  emergency_service: boolean (required)
  phone_answered_24_7: boolean (required)
  target_response_time_minutes: number
  response_time_statement: string

locations:
  primary:
    name: string (required)
    address_full: string (required)
    city: string (required)
    province: string (required, 2-letter code)
    postal_code: string (required)
    country: string (required)
    phone_e164: string (required)
    email: string (required)
    google_maps_embed: string (URL)
  secondary:
    # Same structure as primary

coverage:
  service_model: string (required)
  exclusions: string[]
  regions_enabled: boolean (required)
  regions:
    - name: string (required)
      locations:
        - name: string (required)
          slug: string (required, kebab-case)

services:
  notes: string[]
  navbar_categories:
    - name: string (required)
      key: string (required, kebab-case)
  list:
    {category_key}:
      - title: string (required)
        slug: string (required, kebab-case)

# Additional sections: brands_and_capability, trust_and_compliance,
# pricing_and_offers, warranty_and_guarantees, reputation, social,
# warranty, seo_url_rules, copy_blocks
```

### Relationships
- `services.list` → Service entities (defines canonical service slugs)
- `coverage.regions[].locations` → Location entities (defines canonical location slugs)

### Business Rules
1. Service slugs in `services.list` are **authoritative**
   - Must match service content files in `/src/content/services/`
   - Cannot be overridden in routing or templates

2. Location slugs in `coverage.regions[].locations` are **authoritative**
   - Must match location content files in `/src/content/locations/`
   - Cannot be overridden in routing or templates

3. Contact information (phone, email) is **never hardcoded**
   - All templates must reference business profile
   - Changes to contact info require only updating profile.yaml

---

## 2. Service Entity

### Storage
**Collection:** `/src/content/services/{service-slug}.md`
**Count:** 22 files

### Schema

```typescript
interface Service {
  // Core Metadata
  title: string                // "Furnace Repair"
  description: string           // Short description (1-2 sentences)
  category: string              // "heating" | "cooling" | "iaq" | "water-heating" | "commercial" | "plans"
  status: "live" | "draft"      // Publication status
  priority: boolean             // High-priority service (featured)
  order: number                 // Display order within category
  serviceType: string           // "installation" | "repair" | "maintenance"

  // Value Propositions (4 max)
  valueProps: Array<{
    title: string               // "24/7 Emergency Service"
    description: string         // Benefit explanation
    icon: string                // Icon identifier
  }>

  // Problems Addressed (3 max)
  problems: Array<{
    title: string               // "No Heat in Freezing Weather"
    description: string         // Problem explanation
    icon: string                // Icon identifier
  }>

  // Approach
  approach: {
    headline: string            // "Diagnose First, Repair Right"
    description: string         // Detailed approach explanation
    quote?: string              // Optional customer-facing quote
    quotePerson?: string        // Quote attribution (e.g., "Paul Palmer, Owner")
  }

  // Process Steps (4-6 steps)
  processSteps: Array<{
    step: number                // Sequential order
    title: string               // "Call or Book Online"
    description: string         // Step details
  }>

  // Inclusions
  inclusions: {
    equipment: string[]         // Equipment included
    labour: string[]            // Labour included
    warranty: string[]          // Warranty coverage
    extras: string[]            // Additional benefits
  }

  // Savings & Pricing
  savings: {
    headline: string            // "Repair Costs That Make Sense"
    description: string         // Pricing philosophy
    bullets: string[]           // Key savings points
    rebateInfo?: string         // Rebate availability statement
    financingNote?: string      // Financing availability
  }

  // Guarantees
  guarantee: {
    items: Array<{
      title: string             // "90-Day Repair Guarantee"
      description: string       // Guarantee details
    }>
  }

  // Images
  images: Array<{
    src: string                 // Image path
    alt: string                 // Alt text (required for accessibility)
    caption?: string            // Optional caption
  }>

  // SEO
  seoTitle: string              // Custom page title
  seoDescription: string        // Meta description

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                  // Markdown content after frontmatter
}
```

### Relationships
- Service slug must exist in Business Profile `services.list[category][].slug`
- Service pages link to all Service-Location pages (20 services × 30+ locations)
- Service pages link to related services in same category

### Business Rules
1. **Slug Immutability:** Once a service slug is set, it should not change (SEO stability)
2. **Category Validation:** Service category must match a key in Business Profile `navbar_categories`
3. **Status Control:** Only `status: "live"` services appear on the site
4. **Priority Services:** `priority: true` services are featured on homepage and category pages

### Content Guidelines
- **Title:** Service name in title case (e.g., "Furnace Repair")
- **Description:** 1-2 sentences, keyword-rich, conversational tone
- **Value Props:** Focus on customer benefits, not technical specs
- **Problems:** Address pain points with empathy
- **Approach:** Professional, direct tone (avoid AI slop language)
- **Process Steps:** Clear, actionable steps (typically 4-6)

---

## 3. Location Entity

### Storage
**Collection:** `/src/content/locations/{location-slug}.md`
**Count:** 30+ files

### Schema

```typescript
interface Location {
  // Core Metadata
  title: string                // "Guelph"
  description: string          // Short description
  region: string               // "Wellington County"
  province: "ON"               // Always "ON" for Ontario

  // SEO
  seoTitle: string             // "HVAC Services in Guelph, ON - B.A.P Heating and Cooling"
  seoDescription: string       // Meta description

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                 // Location-specific content (climate, housing, community)
}
```

### Relationships
- Location slug must exist in Business Profile `coverage.regions[].locations[].slug`
- Location pages link to all Service-Location pages (20 services per location)
- Location pages link to parent Region page

### Business Rules
1. **Slug Immutability:** Once a location slug is set, it should not change
2. **Region Validation:** Location `region` must match a region `name` in Business Profile
3. **Province Validation:** Always `ON` (Ontario) — hardcoded for this business
4. **Exclusions:** Brampton, ON is explicitly excluded (see Business Profile `coverage.exclusions`)

### Content Guidelines
- **Body Content:** Focus on local context (housing, climate, community characteristics)
- **Tone:** Professional, locally relevant, avoid generic content
- **Length:** 200-400 words (substantial but not overwhelming)
- **SEO:** Incorporate location name + HVAC/heating/cooling naturally

---

## 4. Region Entity

### Storage
**Collection:** `/src/content/regions/{region-slug}.md`
**Count:** 6 files

### Schema

```typescript
interface Region {
  // Core Metadata
  title: string                // "Wellington County"
  description: string          // Short description
  primaryCity: string          // Slug of primary city (e.g., "guelph")
  cities: string[]             // Array of location slugs in this region

  // SEO
  seoTitle: string             // "HVAC Services in Wellington County, ON - B.A.P Heating and Cooling"
  seoDescription: string       // Meta description
  robots?: string              // SEO robots directive

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                 // Regional overview content
}
```

### Relationships
- Region slug must match a region `name` in Business Profile `coverage.regions[]`
- `cities[]` slugs must exist in `coverage.regions[].locations[]`
- Region pages link to all Location pages within region
- Region pages link to all Service-Location pages within region (potentially 20 × cities.length)

### Business Rules
1. **Slug Derivation:** Region slug is kebab-case of region name (e.g., "Wellington County" → "wellington-county")
2. **City List Validation:** All slugs in `cities[]` must exist as location entities
3. **Primary City:** Must be a significant city in the region (e.g., Guelph for Wellington County)

### Content Guidelines
- **Body Content:** Regional overview, service area coverage, why choose B.A.P in this region
- **Tone:** Professional, regional pride, trust-building
- **Length:** 200-300 words

---

## 5. Blog Post Entity

### Storage
**Collection:** `/src/content/blog/{post-slug}.md`
**Count:** Growing (currently 6)

### Schema

```typescript
interface BlogPost {
  // Core Metadata
  title: string                // "How to Choose the Right Air Conditioner for Your Home"
  description: string          // Short description (1-2 sentences)
  publishDate: string          // ISO 8601 date (YYYY-MM-DD)
  author: string               // "Paul Palmer" (always, per business profile)
  category: string             // "heating" | "cooling" | "guides" | "seasonal" | "iaq"
  featured?: boolean           // Featured post (homepage display)

  // SEO
  seoTitle?: string            // Custom page title (optional)
  seoDescription?: string      // Meta description (optional)

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                 // Full blog post content
}
```

### Relationships
- Blog posts link to related Service pages
- Blog posts link to related Location pages (if locally relevant)
- Blog posts link to related FAQs

### Business Rules
1. **Author:** Always "Paul Palmer" (per Business Profile: blog author is always owner)
2. **Publish Date:** Must be valid ISO 8601 date
3. **Featured Posts:** Maximum 3 featured posts at a time (homepage display)

### Content Guidelines
- **Title:** Clear, keyword-aligned, under 70 characters
- **Description:** Compelling summary, under 160 characters
- **Tone:** Educational, professional, direct (avoid AI slop)
- **Length:** 800-1500 words (substantial, valuable content)
- **Structure:** Use headings (H2, H3), lists, and short paragraphs for readability

---

## 6. FAQ Entity

### Storage
**Collection:** `/src/content/faqs/{faq-slug}.md`
**Count:** 11 items (growing)

### Schema

```typescript
interface FAQ {
  // Core Content
  question: string             // "How much does air conditioner installation cost in Ontario?"
  answer: string               // Short answer (1-2 sentences, for frontmatter)

  // Scoping
  scopes: string[]             // ["service:air-conditioner-installation"] or ["general"]

  // Priority & Status
  priority: number             // 1-10 (higher = more important, display order)
  status: "live" | "draft"     // Publication status

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                 // Detailed answer with formatting
}
```

### Relationships
- FAQs with `scopes: ["service:{service-slug}"]` appear on service pages
- FAQs with `scopes: ["general"]` appear on homepage and FAQ page
- All FAQs appear on `/faqs` page

### Business Rules
1. **Scopes Format:** `service:{service-slug}` or `location:{location-slug}` or `general`
2. **Priority Sorting:** Higher priority FAQs display first
3. **Status Control:** Only `status: "live"` FAQs appear on site

### Content Guidelines
- **Question:** Natural language, how users actually ask (voice search friendly)
- **Answer (frontmatter):** 1-2 sentences, direct answer
- **Body:** Detailed explanation with formatting, links to relevant pages
- **Tone:** Helpful, transparent, professional

---

## 7. Case Study Entity

### Storage
**Collection:** `/src/content/case-studies/{study-slug}.md`
**Count:** 3 items (growing)

### Schema

```typescript
interface CaseStudy {
  // Core Metadata
  title: string                // "Emergency Furnace Replacement in Guelph"
  description: string          // Short description
  service: string              // Service slug (e.g., "furnace-installation")
  location: string             // Location slug (e.g., "guelph")
  clientType: "residential" | "commercial"
  publishDate: string          // ISO 8601 date (YYYY-MM-DD)

  // Featured Image
  featuredImage?: {
    src: string                // Image path
    alt: string                // Alt text
  }

  // SEO
  seoTitle?: string            // Custom page title
  seoDescription?: string      // Meta description

  // Workflow
  workflowStatus: "published" | "draft" | "review"
  reviewedBy?: string
  reviewedDate?: string (ISO 8601)
  approvedBy?: string
  approvedDate?: string (ISO 8601)

  // Body Content (Markdown)
  body: string                 // Case study content (Problem, Solution, Results)
}
```

### Relationships
- Case studies link to related Service pages
- Case studies link to related Location pages
- Service pages can link to relevant case studies

### Business Rules
1. **Service Validation:** `service` slug must exist in Business Profile services list
2. **Location Validation:** `location` slug must exist in Business Profile locations list
3. **Client Type:** Must be "residential" or "commercial"

### Content Guidelines
- **Structure:** Problem → Solution → Results
- **Tone:** Professional, factual, demonstrating expertise
- **Length:** 400-800 words
- **Testimonial:** Include customer quote if available (with permission)

---

## 8. Service-Location Pages (Dynamic)

### Storage
**Generated dynamically at build time** (no content files)

### Data Source
Combination of:
- Business Profile `services.list`
- Business Profile `coverage.regions[].locations`
- Service entity frontmatter
- Location entity frontmatter

### Schema (Virtual)

```typescript
interface ServiceLocation {
  // Derived from Business Profile
  serviceSlug: string          // From services.list[category][].slug
  serviceTitle: string         // From services.list[category][].title
  locationSlug: string         // From coverage.regions[].locations[].slug
  locationName: string         // From coverage.regions[].locations[].name

  // Generated
  url: string                  // "/services/{service-slug}-{location-slug}-on"
  pageTitle: string            // "{Service Title} in {Location Name}, ON"
  introText: string            // Template from business profile copy_blocks.service_in_city_intro_template

  // Inherited from Service entity
  serviceDescription: string
  serviceCategory: string
  valueProps: ValueProp[]
  // ... (other service fields)

  // Inherited from Location entity
  locationRegion: string
  locationContent: string
}
```

### Generation Rule
```
For each service in services.list:
  For each location in coverage.regions[].locations:
    Generate service-location page at /services/{service-slug}-{location-slug}-on
```

**Total Pages:** 22 services × 30+ locations = **660+ pages**

### Content Template
```markdown
# {Service Title} in {Location Name}, ON

B.A.P Heating & Cooling Services Ltd provides **{Service Title}** in **{Location Name}, ON**, with 24/7 emergency support and response typically within 60 minutes across our service area. Call +1 519-835-4858 to speak to a person.

{Service Description}

{Value Props}

{Call to Action}
```

---

## Content Collection Configuration (Astro)

### File: `/src/content/config.ts`

```typescript
import { defineCollection, z } from 'astro:content';

const businessCollection = defineCollection({
  type: 'data',
  schema: z.object({
    business: z.object({
      legal_name: z.string(),
      trading_name: z.string().nullable(),
      established_year: z.number(),
      // ... (full schema)
    }),
    // ... (full schema)
  }),
});

const servicesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans']),
    status: z.enum(['live', 'draft']),
    priority: z.boolean().optional(),
    order: z.number(),
    serviceType: z.string().optional(),
    // ... (full schema)
  }),
});

const locationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    region: z.string(),
    province: z.literal('ON'),
    // ... (full schema)
  }),
});

const regionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    primaryCity: z.string(),
    cities: z.array(z.string()),
    // ... (full schema)
  }),
});

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.string(),
    author: z.string(),
    category: z.string(),
    featured: z.boolean().optional(),
    // ... (full schema)
  }),
});

const faqsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    scopes: z.array(z.string()),
    priority: z.number(),
    status: z.enum(['live', 'draft']),
    // ... (full schema)
  }),
});

const caseStudiesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    service: z.string(),
    location: z.string(),
    clientType: z.enum(['residential', 'commercial']),
    publishDate: z.string(),
    // ... (full schema)
  }),
});

export const collections = {
  business: businessCollection,
  services: servicesCollection,
  locations: locationsCollection,
  regions: regionsCollection,
  blog: blogCollection,
  faqs: faqsCollection,
  'case-studies': caseStudiesCollection,
};
```

---

## Data Flow Patterns

### Pattern 1: Business Profile as Source of Truth
```
Business Profile (profile.yaml)
  ↓ (read at build time)
Astro getStaticPaths()
  ↓ (generate routes)
Service/Location/Service-Location Pages
```

**Example:**
```typescript
// /src/pages/services/[service].astro
export async function getStaticPaths() {
  const businessProfile = await getEntry('business', 'profile');
  const services = Object.values(businessProfile.data.services.list).flat();

  return services.map(service => ({
    params: { service: service.slug },
    props: { service },
  }));
}
```

### Pattern 2: Content Collection as Page Content
```
Content Collection (*.md files)
  ↓ (read at build time)
getEntry() or getCollection()
  ↓ (render)
Page Template
```

**Example:**
```typescript
// /src/pages/services/[service].astro
const { service: serviceSlug } = Astro.params;
const serviceContent = await getEntry('services', serviceSlug);
```

### Pattern 3: Combined Data for Service-Location Pages
```
Business Profile (services + locations)
  ↓ (cross product)
Astro getStaticPaths()
  ↓ (generate 600+ routes)
Service-Location Pages (template-driven)
```

**Example:**
```typescript
// /src/pages/services/[serviceLocation].astro
export async function getStaticPaths() {
  const businessProfile = await getEntry('business', 'profile');
  const services = Object.values(businessProfile.data.services.list).flat();
  const locations = businessProfile.data.coverage.regions.flatMap(r => r.locations);

  const paths = [];
  for (const service of services) {
    for (const location of locations) {
      paths.push({
        params: { serviceLocation: `${service.slug}-${location.slug}-on` },
        props: { service, location },
      });
    }
  }
  return paths;
}
```

---

## Content Validation Rules

### 1. Slug Consistency
- Service slugs in content files must match Business Profile
- Location slugs in content files must match Business Profile
- No duplicate slugs within same collection

### 2. Required Fields
- All entities must have required fields populated
- Empty strings not allowed for required fields
- Null only allowed for explicitly nullable fields

### 3. Status Control
- `status: "live"` or `workflowStatus: "published"` required for public display
- Draft content not rendered in production builds

### 4. Date Formats
- All dates must be ISO 8601 (YYYY-MM-DD or full timestamp)
- Future publish dates allowed (scheduled publishing)

### 5. Relationship Integrity
- All referenced slugs (service, location, region) must exist
- Broken references cause build failure (fail fast)

---

## Scalability Considerations

### 1. Service-Location Pages (600+ pages)
- **Generation:** Static at build time (Astro SSG)
- **Build Time:** Estimated 30-60 seconds for 600 pages
- **Content:** Template-driven with dynamic data injection
- **SEO:** Unique title/description per page (avoid thin content penalty)

### 2. Adding New Services
**Process:**
1. Add service to Business Profile `services.list[category][]`
2. Create `/src/content/services/{service-slug}.md`
3. Rebuild site (generates 30+ new service-location pages automatically)

### 3. Adding New Locations
**Process:**
1. Add location to Business Profile `coverage.regions[].locations[]`
2. Create `/src/content/locations/{location-slug}.md`
3. Rebuild site (generates 20+ new service-location pages automatically)

### 4. Content Updates
- **Business Info:** Update Business Profile (single file change)
- **Service Content:** Update service markdown file
- **Location Content:** Update location markdown file
- **No code changes required** for content updates

---

## Next Steps

1. **Implement Astro Content Collections** — Create `/src/content/config.ts` with full schemas
2. **Validate Existing Content** — Ensure all 20 services, 30+ locations, 6 regions conform to schemas
3. **Build Dynamic Routing** — Implement `getStaticPaths()` for service-location pages
4. **Test Data Flow** — Verify business profile → pages data flow

---

## Related Documents

- [Page Types Specification](./page-types.md)
- [URL Architecture Specification](./url-architecture.md)
- [SEO Requirements Specification](./seo-requirements.md)
- [Business Profile](../../src/content/business/profile.yaml)

---

**This document is the source of truth for content structure. All content implementation must align with this specification.**
