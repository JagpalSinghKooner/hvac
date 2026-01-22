# Component-Schema Mapping: Service vs Service-City Pages

This document maps which components render on service pages vs service-city pages, and which schema fields they consume.

## Component Rendering Order (Hero → Final CTA)

| # | Component | Service Page | Service-City Page | Schema Fields (Service) | Schema Fields (Service-City) |
|---|-----------|--------------|-------------------|-------------------------|------------------------------|
| 1 | **ServiceHeroSection** | ✅ | ✅ | `title`<br>`description`<br>`category`<br>`serviceType` | `title`<br>`seoDescription`<br>`category` (from parent service)<br>`serviceType` (from parent service) |
| 2 | **TrustOpenerSection** | ❌ | ✅ | N/A | `trustOpener`<br>`cityName` (from location)<br>`business.reputation.google_rating` |
| 3 | **ProblemSection** | ✅ (if exists) | ✅ (if exists) | `problem.headline`<br>`problem.description`<br>`problem.issues[]` | `problem.headline`<br>`problem.description`<br>`problem.issues[]`<br>*Fallback to parent service if not present* |
| 4 | **SolutionSection** | ✅ (if exists) | ✅ (if exists) | `solution.headline`<br>`solution.description`<br>`solution.differentiators[]` | `solution.headline`<br>`solution.description`<br>*Fallback to parent service if not present*<br>**PLUS:**<br>`cityName` (for city badge)<br>`showTrustIndicator` (displays "Serving [City] Since 1994") |
| 5 | **ServiceGallerySection** | ❌ | ✅ (if exists) | N/A | `galleryImages[]`<br>`galleryImages[].src`<br>`galleryImages[].alt`<br>`galleryImages[].caption`<br>`cityName`<br>`serviceTitle` |
| 6 | **Markdown Content Section** | ✅ (if exists) | ✅ (if exists) | Markdown body content | Markdown body content |
| 7 | **ServiceBenefitsSection** | ✅ (if exists) | ✅ (if exists) | `benefits[]`<br>`benefits[].title`<br>`benefits[].description`<br>`benefits[].icon` | `benefits[]`<br>`benefits[].title`<br>`benefits[].description`<br>`benefits[].icon`<br>*Fallback to parent service if not present* |
| 8 | **ServiceProcessSection** | ✅ (if exists) | ✅ (if exists) | `processSteps[]`<br>`processSteps[].step`<br>`processSteps[].title`<br>`processSteps[].description` | `processSteps[]`<br>`processSteps[].step`<br>`processSteps[].title`<br>`processSteps[].description`<br>*Typically inherited from parent service* |
| 9 | **ProofSection** | ❌ | ✅ (if exists) | N/A | `proof.testimonial`<br>`proof.customerName`<br>`proof.customerLocation`<br>`proof.result` |
| 10 | **ContextSection** | ❌ | ✅ (if exists) | N/A | `context`<br>`cityName`<br>`serviceTitle` |
| 11 | **LocationServicesGrid** | ❌ | ✅ | N/A | `locationSlug`<br>`cityName`<br>*(Dynamically queries all services available in this location)* |
| 12 | **ServiceSavingsSection** | ✅ (if exists) | ✅ (if exists) | `savings.headline`<br>`savings.description`<br>`savings.bullets[]`<br>`savings.rebateInfo`<br>`savings.financingNote` | `savings.headline`<br>`savings.description`<br>`savings.rebateInfo`<br>*Fallback to parent service if not present* |
| 13 | **ServiceFAQSection** | ✅ | ✅ | *(Queries FAQs collection by service slug)* | *(Queries FAQs collection by service slug)* |
| 14 | **TestimonialsCarousel** | ✅ | ✅ | *(Queries reviews collection by service slug)*<br>`business.reputation.google_rating`<br>`business.reputation.google_review_count` | *(Queries reviews collection by service slug and city)*<br>`business.reputation.google_rating`<br>`business.reputation.google_review_count` |
| 15 | **RelatedServicesSection** | ✅ | ✅ | *(Queries services in same category)* | *(Queries services available in same city)*<br>`cityName` (for headline) |
| 16 | **FinalCTASection** | ✅ | ✅ | `business.contact.phone_e164`<br>`business.contact.phone_display` | `business.contact.phone_e164`<br>`business.contact.phone_display` |

## Key Differences: Service vs Service-City

### Service Pages (`/services/[service]`)
- **Generic service information** applicable across all locations
- No city-specific content sections (TrustOpener, Gallery, Proof, Context)
- Related services from **same category**
- Reviews filtered by **service slug only**

### Service-City Pages (`/services/[service]-[city]-on`)
- **City-specific content** with local context and proof
- Includes TrustOpenerSection, ServiceGallerySection, ProofSection, ContextSection
- LocationServicesGrid shows **other services available in this city**
- Related services from **same city**
- Reviews filtered by **service slug AND city slug**
- Solution section displays:
  - City badge: "Solution in [City]"
  - Trust indicator: "Serving [City] Since 1994"

## Fallback Pattern

Service-city pages implement fallback logic for optional fields:

```typescript
serviceCityData.problem || serviceData.problem
serviceCityData.solution || serviceData.solution
serviceCityData.benefits || serviceData.benefits
serviceData.processSteps  // Phase 8: ALWAYS inherit from parent service
serviceCityData.savings || serviceData.savings
```

This means:
1. **City-specific content takes priority** if it exists
2. **Falls back to parent service content** if city-specific doesn't exist
3. **Section doesn't render** if neither exists
4. **processSteps always inherited** from parent service (Phase 8 change)

## Phase 7B Content Fields (Guelph Example - COMPLETE)

For the Guelph batch, the following fields were generated:

| Field | Required? | Generated For | Notes |
|-------|-----------|--------------|-------|
| `trustOpener` | Optional | All 22 services | 2-3 sentences, city-specific trust signal |
| `problem` | Optional | 20 services* | Headline + description + 4 issues |
| `solution` | Optional | 20 services* | Headline + description |
| `benefits` | Optional | 20 services* | 3-4 benefits with icons |
| `context` | Optional | 20 services* | 1 paragraph of city context |
| `proof` | Optional | Some services | Testimonial + customer info |

\* commercial-hvac and rooftop-units excluded from problem/solution/benefits generation

---

## Phase 8 Content Fields (E-E-A-T Enhanced)

Phase 8 adds 6 new schema fields for enhanced E-E-A-T compliance and unique headings:

**Full Specification:** [PHASE-8-CITY-CONTENT-CUSTOMIZATION.md](../PHASE-8-CITY-CONTENT-CUSTOMIZATION.md)

### New Schema Fields

| Field | Component | Purpose | Word Count |
|-------|-----------|---------|------------|
| `hero.title` | ServiceHeroSection | UNIQUE keyword-researched H1, PREMIUM positioning | N/A |
| `hero.description` | ServiceHeroSection | City-specific intro + experience stats | 50-100 |
| `benefitsHeadline` | ServiceBenefitsSection | UNIQUE keyword-researched H2 | N/A |
| `contextHeadline` | ContextSection | UNIQUE keyword-researched H2 | N/A |
| `finalCta.headline` | FinalCTASection | UNIQUE keyword-researched H2 | N/A |
| `finalCta.copy` | FinalCTASection | City-specific CTA copy | 50-75 |
| `experienceStats.installationsInCity` | ServiceHeroSection, ContextSection | E-E-A-T experience signal | N/A |
| `experienceStats.yearsSinceCityStart` | ServiceHeroSection, ContextSection | E-E-A-T experience signal | N/A |

### Removed Field

| Field | Change | Reason |
|-------|--------|--------|
| `processSteps` | REMOVED from service-city | Always inherit from parent service page |

### Component Updates (Phase 8)

| Component | New Props | Purpose |
|-----------|-----------|---------|
| ServiceHeroSection | `cityHero` (hero object) | Use `cityHero.title` as H1 when available |
| FinalCTASection | `headline`, `copy`, `cityName` | City-specific final CTA |
| ServiceBenefitsSection | `benefitsHeadline` | Unique keyword-researched H2 |
| ContextSection | `contextHeadline` | Unique keyword-researched H2 |

### Heading Requirements

Each service-city page requires **7 unique keyword-researched headings**:

| Section | Level | Field | Positioning |
|---------|-------|-------|-------------|
| Hero | H1 | `hero.title` | PREMIUM (no emergency messaging) |
| Problem | H2 | `problem.headline` | Unique long-tail keyword |
| Solution | H2 | `solution.headline` | Unique long-tail keyword |
| Benefits | H2 | `benefitsHeadline` | Unique long-tail keyword |
| Context | H2 | `contextHeadline` | Unique long-tail keyword |
| Savings | H2 | `savings.headline` | Unique long-tail keyword |
| Final CTA | H2 | `finalCta.headline` | Unique long-tail keyword |

**Total: 550 pages × 7 headings = 3,850 unique headings (ZERO duplicates)**

## Business Data (Always Available)

These fields come from `src/content/business/profile.yaml` and are available on ALL pages:

- `business.legal_name`
- `business.established_year`
- `contact.phone_e164`
- `contact.phone_display`
- `contact.email`
- `reputation.google_rating`
- `reputation.google_review_count`
- `locations.primary.*`
