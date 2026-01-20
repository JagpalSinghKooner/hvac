# URL Architecture Specification
## B.A.P Heating & Cooling Services Website

**Document Version:** 1.1
**Last Updated:** 2026-01-19
**Status:** Approved
**Decision Record:** [ADR-002](../decisions/002-url-pattern-services-prefix.md)

---

## Purpose

This document defines the **complete URL structure** for the B.A.P Heating & Cooling Services website.

URL architecture is critical for:
- **SEO performance** (keyword alignment, crawlability)
- **Scalability** (supporting 760+ pages without special cases)
- **User experience** (predictable, readable URLs)
- **Long-term stability** (canonical URLs that don't change)

This specification is the **source of truth** for URL patterns and slug generation.

---

## URL Philosophy

### Core Principles

1. **One Canonical URL Per Page**
   Every page has exactly one authoritative URL. No duplicates, no competing URLs.

2. **Human-Readable**
   URLs should be easy to read, understand, and remember.
   Example: `/services/furnace-repair-guelph-on` ✓
   Not: `/s/12345` ✗

3. **Keyword-Aligned**
   URLs should reflect the page content and target keywords.
   Example: `/services/air-conditioner-repair` targets "air conditioner repair"

4. **Predictable & Scalable**
   URL patterns should work for 10 pages or 1,000 pages without special-case logic.

5. **Stable**
   Once set, URLs should not change. Stability builds SEO authority over time.

---

## URL Patterns

### 1. Homepage
**Pattern:** `/`
**Example:** `https://bapheating.ca/`

**Rules:**
- Root domain only
- No trailing slash required (both `/` and bare domain acceptable)

---

### 2. Service Pages
**Pattern:** `/services/{service-slug}`
**Examples:**
- `/services/furnace-repair`
- `/services/air-conditioner-installation`
- `/services/heat-pump-maintenance`
- `/services/ductless-mini-split`

**Count:** 22 pages

**Rules:**
- Service slug must match service definition in business profile
- Slug format: kebab-case (lowercase, hyphens)
- No category prefix (e.g., NOT `/services/heating/furnace-repair`)

**Source:**
[business profile: services.list](../../src/content/business/profile.yaml#L117-L145) (22 active services)

---

### 3. Location Pages
**Pattern:** `/locations/{location-slug}`
**Examples:**
- `/locations/guelph`
- `/locations/kitchener`
- `/locations/burlington`
- `/locations/halton-hills`

**Count:** 30+ pages

**Rules:**
- Location slug must match location definition in business profile
- Slug format: kebab-case (lowercase, hyphens)
- Multi-word locations: use hyphens (e.g., `halton-hills`, `grand-valley`)
- No region prefix (e.g., NOT `/locations/wellington-county/guelph`)

**Source:**
[business profile: coverage.regions](../../src/content/business/profile.yaml#L64-L101)

---

### 4. Service-Location Pages
**Pattern:** `/services/{service-slug}-{location-slug}-on`
**Examples:**
- `/services/furnace-repair-guelph-on`
- `/services/air-conditioner-installation-kitchener-on`
- `/services/heat-pump-maintenance-burlington-on`

**Count:** 660+ pages (22 services × 30+ locations)

**Rules:**
1. **Service slug comes first** (service-first hierarchy)
2. **Location slug follows** (location-specific targeting)
3. **Append `-on` suffix** (Ontario designation for local SEO)
4. **Do NOT embed "on" inside slugs**
   ✓ Correct: `furnace-repair-guelph-on`
   ✗ Incorrect: `furnace-repair-on-guelph` or `furnace-repair-guelph`

**Why `-on` Suffix?**
- Reinforces Ontario location (local SEO signal)
- Avoids ambiguity (e.g., `paris` could be France or Ontario)
- Matches user search intent ("furnace repair Guelph ON")

**Source:**
[business profile: seo_url_rules.combined_pages](../../src/content/business/profile.yaml#L203-L207)

---

### 5. Region Pages
**Pattern:** `/regions/{region-slug}`
**Examples:**
- `/regions/wellington-county`
- `/regions/waterloo-region`
- `/regions/halton-region`
- `/regions/hamilton-brant`
- `/regions/peel-region`
- `/regions/dufferin-county`

**Count:** 6 pages

**Rules:**
- Region slug must match region definition in business profile
- Slug format: kebab-case (lowercase, hyphens)
- Include type suffix if part of official name (e.g., `-county`, `-region`)

**Source:**
[business profile: coverage.regions](../../src/content/business/profile.yaml#L64-L101)

---

### 6. Blog Posts
**Pattern:** `/blog/{post-slug}`
**Examples:**
- `/blog/when-to-replace-your-furnace`
- `/blog/preparing-hvac-for-ontario-winter`
- `/blog/benefits-of-heat-pumps-in-canada`

**Count:** Growing (currently 6)

**Rules:**
- Slug derived from post title (manual or auto-generated)
- Slug format: kebab-case (lowercase, hyphens)
- Keep slugs concise but descriptive (4-8 words max)
- No date in URL (date in metadata only)

---

### 7. Case Studies
**Pattern:** `/case-studies/{study-slug}`
**Examples:**
- `/case-studies/furnace-replacement-guelph`
- `/case-studies/commercial-hvac-upgrade-kitchener`

**Count:** Growing (currently 3)

**Rules:**
- Slug derived from case study title
- Slug format: kebab-case (lowercase, hyphens)
- Include service type and location in slug (for SEO and clarity)

---

### 8. Static Pages
**Pattern:** `/{page-slug}`
**Examples:**
- `/about`
- `/contact`
- `/faqs`
- `/reviews`

**Count:** 4-6 pages

**Rules:**
- Root-level static pages (no prefix)
- Slug format: single word or short phrase, kebab-case
- Keep URLs short and memorable

---

## Slug Generation Rules

### Standard Rules

1. **Lowercase only**
   ✓ `guelph`
   ✗ `Guelph` or `GUELPH`

2. **Hyphens for spaces**
   ✓ `furnace-repair`
   ✗ `furnace_repair` or `furnacerepair`

3. **Remove special characters**
   ✓ `hrv-erv-ventilation` (from "HRV/ERV Ventilation")
   ✗ `hrv/erv-ventilation`

4. **No accents or diacritics**
   ✓ `elora` (from "Élora", if applicable)
   ✗ `élora`

5. **Remove articles and prepositions (when shortening)**
   ✓ `air-filtration-air-purifiers` (keep if meaningful)
   ✗ `the-air-filtration-and-the-air-purifiers`

6. **No trailing slashes** (consistent handling)
   ✓ `/services/furnace-repair`
   ✗ `/services/furnace-repair/`
   (Both should resolve to same page, but canonical is without slash)

### Edge Cases

#### Multi-Word Locations
- "Halton Hills" → `halton-hills`
- "Grand Valley" → `grand-valley`
- "Centre Wellington" → `centre-wellington`

#### Services with Slashes or Special Characters
- "HRV/ERV Ventilation" → `hrv-erv-ventilation`
- "Air Filtration & Air Purifiers" → `air-filtration-air-purifiers`

#### Abbreviations
- "AC" → Use full form `air-conditioner` (better for SEO)
- "HVAC" → Can use `hvac` if service name is "HVAC"

---

## Sitemap Structure

### XML Sitemap (`/sitemap.xml`)

**Priority Levels:**
1. **Priority 1.0** (Homepage)
   - `/`

2. **Priority 0.9** (Core Service Pages)
   - `/services/{service}` (20 pages)

3. **Priority 0.8** (Core Location Pages)
   - `/locations/{location}` (30+ pages)

4. **Priority 0.7** (Service-Location Pages)
   - `/services/{service}-{location}-on` (600+ pages)

5. **Priority 0.6** (Region Pages, Static Pages)
   - `/regions/{region}` (6 pages)
   - `/about`, `/contact`, `/faqs`, `/reviews`

6. **Priority 0.5** (Blog Posts, Case Studies)
   - `/blog/{slug}`
   - `/case-studies/{slug}`

**Change Frequency:**
- Homepage: `daily`
- Service/Location Pages: `weekly`
- Service-Location Pages: `monthly`
- Blog Posts: `weekly` (if actively publishing)
- Static Pages: `monthly`

**Last Modified:**
- Include `<lastmod>` for all pages
- Use build timestamp for static pages
- Use content modification date for blog/case studies

### HTML Sitemap (`/sitemap`)

**Optional:** Human-readable sitemap page

**Structure:**
- Services (grouped by category)
- Locations (grouped by region)
- Regions
- Blog (recent posts)
- Case Studies
- Static Pages

---

## Canonical URL Rules

### 1. One Canonical URL Per Page
Every page must declare its canonical URL in the `<head>`:

```html
<link rel="canonical" href="https://bapheating.ca/services/furnace-repair" />
```

### 2. Canonical for Duplicate Content
If multiple URLs lead to the same page (e.g., query parameters, trailing slash variants), canonicalize to the primary URL:

**Scenario:** User accesses `/services/furnace-repair?utm_source=google`
**Canonical:** `<link rel="canonical" href="https://bapheating.ca/services/furnace-repair" />`

### 3. Absolute URLs
Canonical URLs must be absolute (include full domain):

✓ `https://bapheating.ca/services/furnace-repair`
✗ `/services/furnace-repair`

### 4. HTTPS Only
All canonical URLs must use `https://`:

✓ `https://bapheating.ca/`
✗ `http://bapheating.ca/`

---

## Redirect Rules

### 1. Trailing Slash Normalization
**Rule:** Prefer no trailing slash for content pages

**Implementation:**
- `/services/furnace-repair/` → **301 redirect** → `/services/furnace-repair`
- Except: `/` (root) can have or not have slash

### 2. HTTP to HTTPS
**Rule:** All HTTP requests redirect to HTTPS

**Implementation:**
- `http://bapheating.ca/services/furnace-repair` → **301 redirect** → `https://bapheating.ca/services/furnace-repair`

### 3. www vs non-www
**Rule:** Use non-www as canonical (approved)

**Implementation:**
- Canonical: `https://bapheating.ca/`
- Redirect: `https://www.bapheating.ca/` → **301 redirect** → `https://bapheating.ca/`

**Decision:** Non-www format approved for simplicity and consistency

### 4. Old URL Migration
**Status:** Not applicable — this is a greenfield site

**Decision:** No existing B.A.P Heating website to migrate. This is a new build with no legacy URL redirects required.

**Note:** If an old site is discovered during deployment, follow this process:
1. Audit old site URLs
2. Map to new URL structure
3. Implement 301 redirects
4. Monitor 404 errors post-launch

---

## URL Length Considerations

### Best Practices
- **Ideal:** 50-60 characters
- **Maximum:** 100 characters (avoid exceeding)

### Current URL Lengths
- Service pages: ~30-40 characters
  Example: `/services/furnace-repair` (26 characters)

- Location pages: ~20-30 characters
  Example: `/locations/guelph` (18 characters)

- Service-Location pages: ~50-70 characters
  Example: `/services/furnace-repair-guelph-on` (38 characters)
  Longest: `/services/air-conditioner-installation-centre-wellington-on` (61 characters)

**Assessment:** All URLs well within acceptable range ✓

---

## URL Examples by Page Type

| Page Type | URL Example | Character Count |
|-----------|-------------|-----------------|
| Homepage | `/` | 1 |
| Service | `/services/furnace-repair` | 26 |
| Location | `/locations/guelph` | 18 |
| Service-Location | `/services/furnace-repair-guelph-on` | 38 |
| Region | `/regions/wellington-county` | 27 |
| Blog | `/blog/when-to-replace-your-furnace` | 36 |
| Case Study | `/case-studies/furnace-replacement-guelph` | 43 |
| FAQ | `/faqs` | 6 |
| About | `/about` | 7 |
| Contact | `/contact` | 9 |
| Reviews | `/reviews` | 9 |

---

## URL Testing Checklist

Before launch, verify:

- [ ] All URLs follow defined patterns
- [ ] No duplicate URLs (same content, different URL)
- [ ] No broken internal links
- [ ] Canonical tags point to correct URL
- [ ] 301 redirects work (trailing slash, HTTP to HTTPS)
- [ ] XML sitemap includes all pages
- [ ] XML sitemap validates (schema check)
- [ ] No URL length exceeds 100 characters
- [ ] Special characters properly encoded
- [ ] URLs match business profile slugs exactly

---

## Implementation Notes

### Astro Routing
Astro uses file-based routing. URL patterns map to files/folders:

- `/services/[service].astro` → `/services/{service}`
- `/locations/[location].astro` → `/locations/{location}`
- `/services/[serviceLocation].astro` → `/services/{service}-{location}-on`

Dynamic routes use `getStaticPaths()` to generate all URL variations at build time.

### Slug Source
All slugs must be sourced from:
1. **Business Profile** (`/src/content/business/profile.yaml`)
   - Service slugs (lines 117-145)
   - Location slugs (lines 64-101)

2. **Content Collections** (`/src/content/{type}/{slug}.md`)
   - Blog post slugs
   - Case study slugs

**Rule:** Slugs in business profile are authoritative. Do not override or modify during routing.

---

## URL Ownership & Maintenance

### Who Owns URL Structure?
**Engineering & SEO Team** (collaborative)

### When Can URLs Change?
**Never, except:**
- Critical SEO reason (rare)
- Rebranding or business name change
- Fixing a technical error (with 301 redirect)

### Adding New URLs
New page types or URL patterns require:
1. Update this specification document
2. Create ADR if architectural change
3. Implement with tests
4. Update XML sitemap
5. Document in content model spec (if new entity)

---

## Related Documents

- [ADR-002: URL Pattern Decision](../decisions/002-url-pattern-services-prefix.md)
- [Page Types Specification](./page-types.md)
- [Content Model Specification](./content-model.md)
- [SEO Requirements Specification](./seo-requirements.md)

---

## Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1 | 2026-01-19 | Updated service count (20→22), www decision (non-www), old site migration (N/A) | Phase 0 Validation |
| 1.0 | 2026-01-19 | Initial specification | Engineering Team |

---

**This document is the source of truth for URL architecture. All routing implementation must align with this specification.**
