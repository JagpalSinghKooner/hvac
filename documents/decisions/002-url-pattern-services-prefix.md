# ADR-002: URL Pattern for Service-Location Pages

**Status:** Accepted
**Date:** 2026-01-19
**Deciders:** Engineering Team, Business Owner
**Supersedes:** None

---

## Context

We are building an SEO-first website for B.A.P Heating & Cooling Services Ltd, serving 30+ cities across Southern Ontario with 20+ HVAC services.

A core requirement is to create **service-location combination pages** that target long-tail local SEO keywords such as:
- "furnace repair Guelph"
- "AC installation Kitchener"
- "heat pump maintenance Burlington"

At full scale, this will result in **600+ pages** (20 services × 30+ locations).

### Requirements

1. **SEO Optimization:**
   - URLs must be keyword-rich and human-readable
   - URLs must align with user search intent
   - URLs must be indexable and crawlable at scale

2. **Scalability:**
   - URL pattern must work for 10 pages or 1,000 pages
   - No special-case logic required
   - Predictable and consistent structure

3. **Local Targeting:**
   - URLs must signal location (Ontario, Canada)
   - URLs must avoid ambiguity (e.g., Paris, ON vs Paris, France)

4. **Hierarchy & Organization:**
   - URLs should reflect content hierarchy
   - URLs should support future expansion (new services, new locations)

5. **User Experience:**
   - URLs should be easy to read and remember
   - URLs should provide context (what is this page about?)

### Existing Business Context

The business profile (already documented) includes a `seo_url_rules` section:

```yaml
seo_url_rules:
  combined_pages:
    suffix: "-on"
    example: "/services/furnace-installation-guelph-on/"
    rule: "Do NOT embed 'on' inside serviceSlug or citySlug; append '-on' only at the end of the combined slug."
```

This indicates a preference for:
1. `/services/` prefix
2. Combined service-location slug with `-on` suffix

However, multiple URL pattern options exist, and we need to decide the optimal structure.

---

## Decision

We will use the **`/services/{service}-{location}-on`** URL pattern for service-location combination pages.

### Examples:
- `/services/furnace-repair-guelph-on`
- `/services/air-conditioner-installation-kitchener-on`
- `/services/heat-pump-maintenance-burlington-on`

---

## Rationale

### Why `/services/` Prefix?

#### 1. Clear Hierarchy
The `/services/` prefix establishes a clear content hierarchy:

```
Domain (bapheating.ca)
  └─ /services/
      ├─ /services/furnace-repair (service page)
      ├─ /services/furnace-repair-guelph-on (service-location page)
      ├─ /services/air-conditioner-installation (service page)
      └─ /services/air-conditioner-installation-kitchener-on (service-location page)
```

**Impact:** Users and search engines understand that these pages are service-related.

#### 2. Scalability
The `/services/` prefix allows for future expansion without URL conflicts:
- Services: `/services/{service}`
- Service-Locations: `/services/{service}-{location}-on`
- Locations: `/locations/{location}` (separate hierarchy)
- Regions: `/regions/{region}` (separate hierarchy)

**Impact:** No URL conflicts as the site grows. Each content type has its own namespace.

#### 3. SEO Best Practice
Google's John Mueller has stated that URL structure matters for organization and understanding, but not as a direct ranking factor. However:
- Clear hierarchy helps Google understand site structure (benefits crawling and indexing)
- Logical URL patterns improve user trust and click-through rates

**Impact:** Positive SEO signal (indirectly).

---

### Why `{service}-{location}-on` Format?

#### 1. Keyword Alignment
Users search for:
- "furnace repair Guelph"
- "AC installation Kitchener"
- "heat pump maintenance Burlington"

The URL `/services/furnace-repair-guelph-on` directly matches this search intent.

**Impact:** Strong keyword-URL alignment improves relevance signals.

#### 2. Service-First Hierarchy
Placing the service slug first (`{service}-{location}`) reinforces that:
- The page is primarily about the **service** (furnace repair)
- The page is secondarily about the **location** (Guelph)

This aligns with our content hierarchy:
- Service pages (`/services/furnace-repair`) are parent pages
- Service-Location pages (`/services/furnace-repair-guelph-on`) are child pages

**Impact:** Logical content hierarchy for users and search engines.

#### 3. `-on` Suffix (Ontario Designation)
The `-on` suffix serves two purposes:

**a) Geo-Targeting:**
- Signals to Google and users that this page targets **Ontario, Canada**
- Avoids ambiguity (e.g., Paris, ON vs Paris, France; Milton, ON vs Milton, MA)

**b) SEO Keyword Match:**
- Users often search with province designation: "furnace repair Guelph ON"
- The `-on` suffix matches this search pattern

**Impact:** Stronger local SEO signal, reduced ambiguity.

---

## Alternatives Considered

### Alternative 1: `/{service}-{location}` (Flat, No Prefix, No `-on`)

**Example:** `/furnace-repair-guelph`

**Pros:**
- Shorter URLs (fewer characters)
- Cleaner appearance

**Cons:**
- **No Clear Hierarchy:** All pages at root level (services, locations, service-locations). Harder to distinguish content types.
- **No Geo-Targeting:** Missing `-on` suffix reduces local SEO signal.
- **Scalability Issues:** What if we add non-service content at root level? (e.g., `/about`, `/contact`, `/blog/{slug}`). Potential URL conflicts.

**Verdict:** ❌ Rejected. Lack of hierarchy and geo-targeting outweighs shorter URLs.

---

### Alternative 2: `/{location}/{service}` (Location-First)

**Example:** `/guelph/furnace-repair`

**Pros:**
- Location-first hierarchy (emphasizes local presence)
- Clean, intuitive URLs

**Cons:**
- **Inverted Hierarchy:** Our content hierarchy is service-first, not location-first. Service pages are more important than location pages (20 services vs 30+ locations).
- **SEO Mismatch:** Users search "furnace repair Guelph" (service first), not "Guelph furnace repair" (location first).
- **Scalability:** Adding new locations requires new top-level directories. 30+ top-level directories is messier than a single `/services/` directory.

**Verdict:** ❌ Rejected. Inverted hierarchy doesn't match user intent or content structure.

---

### Alternative 3: `/services/{service}/{location}` (Deep Nesting)

**Example:** `/services/furnace-repair/guelph`

**Pros:**
- Very clear hierarchy (service → location)
- Logical nesting

**Cons:**
- **Longer URLs:** Three path segments vs two. Worse for readability.
- **No `-on` Suffix:** Missing geo-targeting signal.
- **Unnecessary Nesting:** Nesting implies parent-child relationship, but service-location pages are peers, not children. All 600+ pages are at the same level conceptually.

**Verdict:** ❌ Rejected. Unnecessary nesting adds complexity without SEO benefit.

---

### Alternative 4: `/services/{service}?location={location}` (Query Parameters)

**Example:** `/services/furnace-repair?location=guelph`

**Pros:**
- Single URL pattern with dynamic parameters

**Cons:**
- **Poor SEO:** Query parameters are less SEO-friendly than clean URLs. Google treats query parameters as less important signals.
- **User Experience:** Query parameters are harder to read and remember.
- **Not Indexable by Default:** Requires additional Google Search Console configuration to index query parameter variations.

**Verdict:** ❌ Rejected. Query parameters are a terrible choice for SEO-first sites.

---

### Alternative 5: `/{service}-{location}-on` (Flat, No Prefix, With `-on`)

**Example:** `/furnace-repair-guelph-on`

**Pros:**
- Shorter URLs (no `/services/` prefix)
- Includes `-on` suffix (geo-targeting)

**Cons:**
- **No Hierarchy:** All pages at root level (services, locations, service-locations, blog, static pages). Messy and hard to organize.
- **Scalability Issues:** 700+ pages at root level is unwieldy. Harder to manage, harder to understand site structure.
- **Conflicts with Other Content:** What if we add `/about`, `/contact`, `/blog/{slug}`, `/case-studies/{slug}` at root level? Potential naming conflicts.

**Verdict:** ❌ Rejected. Lack of hierarchy makes this unscalable.

---

## Comparison Matrix

| Pattern | SEO | Hierarchy | Scalability | User Experience | Geo-Targeting | Verdict |
|---------|-----|-----------|-------------|-----------------|---------------|---------|
| **`/services/{service}-{location}-on`** | ✅ Excellent | ✅ Clear | ✅ Excellent | ✅ Good | ✅ Strong | ✅ **CHOSEN** |
| `/{service}-{location}` | ⚠️ Good | ❌ None | ❌ Poor | ⚠️ Good | ❌ Weak | ❌ Rejected |
| `/{location}/{service}` | ⚠️ Good | ⚠️ Inverted | ⚠️ Fair | ⚠️ Good | ⚠️ Fair | ❌ Rejected |
| `/services/{service}/{location}` | ⚠️ Good | ⚠️ Over-nested | ⚠️ Fair | ❌ Longer URLs | ❌ Weak | ❌ Rejected |
| `/services/{service}?location={location}` | ❌ Poor | ✅ Clear | ⚠️ Fair | ❌ Poor | ❌ Weak | ❌ Rejected |
| `/{service}-{location}-on` | ✅ Excellent | ❌ None | ❌ Poor | ⚠️ Good | ✅ Strong | ❌ Rejected |

**Winner:** `/services/{service}-{location}-on` ✅

---

## Consequences

### Positive

1. **Strong SEO:** Keyword-rich URLs, clear hierarchy, geo-targeting signal.
2. **Scalability:** 600+ pages fit naturally within `/services/` namespace.
3. **Consistency:** All service-related pages live under `/services/`.
4. **User Trust:** Professional, logical URL structure builds user confidence.
5. **Future-Proof:** Easy to add new services or locations without restructuring URLs.

### Negative

1. **URL Length:** `/services/` prefix adds 9 characters to every URL. (Mitigated: URLs are still under 70 characters, well within best practices.)
2. **Trailing Slash Inconsistency:** Must decide whether to use trailing slashes (e.g., `/services/furnace-repair/` vs `/services/furnace-repair`). (Decision: No trailing slashes, enforced via 301 redirects.)

### Neutral

1. **Consistency with Business Profile:** Aligns with existing `seo_url_rules` in business profile (already documented this pattern).

---

## Implementation Notes

### Slug Generation Rules

1. **Service Slug:**
   - Source: Business Profile `services.list[category][].slug`
   - Format: `kebab-case` (lowercase, hyphens)
   - Example: `furnace-repair`, `air-conditioner-installation`

2. **Location Slug:**
   - Source: Business Profile `coverage.regions[].locations[].slug`
   - Format: `kebab-case` (lowercase, hyphens)
   - Example: `guelph`, `kitchener`, `halton-hills`

3. **Combined Slug:**
   - Format: `{service-slug}-{location-slug}-on`
   - Example: `furnace-repair-guelph-on`
   - **Critical Rule:** Do NOT embed "on" inside service or location slugs. Always append `-on` at the end.

### Routing Implementation (Astro)

```typescript
// /src/pages/services/[serviceLocation].astro

export async function getStaticPaths() {
  const businessProfile = await getEntry('business', 'profile');
  const services = Object.values(businessProfile.data.services.list).flat();
  const locations = businessProfile.data.coverage.regions.flatMap(r => r.locations);

  return services.flatMap(service =>
    locations.map(location => ({
      params: {
        serviceLocation: `${service.slug}-${location.slug}-on`
      },
      props: { service, location }
    }))
  );
}
```

### Canonical URLs

All service-location pages must declare their canonical URL:

```html
<link rel="canonical" href="https://bapheating.ca/services/{service}-{location}-on" />
```

### Redirects

- Enforce no trailing slash: `/services/furnace-repair-guelph-on/` → **301 redirect** → `/services/furnace-repair-guelph-on`
- Enforce HTTPS: `http://` → **301 redirect** → `https://`

---

## Related Decisions

- [ADR-001: Use Astro Framework](./001-use-astro-framework.md) — Framework choice that enables scalable routing

---

## References

- [URL Architecture Specification](../specs/url-architecture.md)
- [Business Profile: SEO URL Rules](../../src/content/business/profile.yaml) (lines 203-207)
- [Google Search Central: URL Structure Best Practices](https://developers.google.com/search/docs/crawling-indexing/url-structure)

---

## Review & Approval

- **Proposed By:** Engineering Team
- **Date Proposed:** 2026-01-19
- **Approved By:** Engineering Team, Business Owner
- **Date Approved:** 2026-01-19

---

**Status:** ✅ Accepted

**Next Steps:**
1. Implement routing in Astro (Phase 3: Routing & URL Architecture)
2. Generate all 600+ service-location pages at build time
3. Validate URLs in sitemap
4. Test canonical tags and redirects
