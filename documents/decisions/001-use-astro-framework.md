# ADR-001: Use Astro as the Static Site Generator Framework

**Status:** Accepted
**Date:** 2026-01-19
**Deciders:** Engineering Team, Business Owner
**Supersedes:** None

---

## Context

We are building an SEO-first website for B.A.P Heating & Cooling Services Ltd, a local HVAC company serving 30+ cities across Southern Ontario. The website will scale to **~700+ pages** at full coverage, including:

- 20 service pages
- 30+ location pages
- 600+ service-location combination pages
- 6 region pages
- Growing blog, FAQ, and case study content

### Project Requirements

1. **SEO Performance:** The website's primary business value comes from organic search rankings. SEO must be exceptional out of the box.

2. **Static Generation:** Content is relatively stable (services, locations don't change frequently). Static site generation (SSG) provides:
   - Fast page loads (pre-rendered HTML)
   - No server-side rendering overhead
   - Easy CDN caching
   - Strong SEO signals (fast Core Web Vitals)

3. **Scalability:** Must efficiently generate 700+ pages at build time without performance degradation.

4. **Content Management:** Content is stored in **Markdown files with YAML frontmatter** and a central **Business Profile (YAML)**. The framework must support structured content collections.

5. **Minimal JavaScript:** SEO-first sites benefit from minimal client-side JavaScript. Most pages are content-focused, not highly interactive.

6. **Developer Experience:** The framework should be:
   - Modern and well-maintained
   - TypeScript-first
   - Easy to reason about (clear mental model)
   - Good documentation and ecosystem

7. **Flexibility:** Must support:
   - React components (for interactive UI elements)
   - Tailwind CSS (for styling)
   - Dynamic routing (600+ service-location pages generated from data)

---

## Decision

We will use **Astro (v5+)** as the static site generator framework for this project.

---

## Rationale

### Why Astro?

#### 1. SEO-First by Default
- **Static HTML Generation:** Astro generates static HTML by default, no hydration overhead unless explicitly required.
- **Zero JavaScript by Default:** Pages ship with no JavaScript unless you add it. This results in fast page loads and excellent Core Web Vitals.
- **Fast Build Times:** Astro's build process is optimized for static sites. Generating 700+ pages is fast and efficient.

**Impact:** Aligns perfectly with the SEO-first requirement.

#### 2. Content Collections (Built-In)
- Astro's **Content Collections API** provides type-safe, structured content management out of the box.
- Markdown + YAML frontmatter support (exactly what we need).
- Zod schema validation for content (catches errors at build time).
- Easy to query content in routes (`getCollection()`, `getEntry()`).

**Example:**
```typescript
import { getCollection } from 'astro:content';

const services = await getCollection('services');
const locations = await getCollection('locations');
```

**Impact:** Native support for our content model (services, locations, blog, FAQs).

#### 3. Dynamic Routing at Scale
- Astro supports **dynamic routes** with `getStaticPaths()`, allowing us to generate 600+ service-location pages from data.
- Build-time generation (not runtime) ensures fast performance.
- No special-case logic required—scales naturally.

**Example:**
```typescript
export async function getStaticPaths() {
  const services = await getCollection('services');
  const locations = await getCollection('locations');

  return services.flatMap(service =>
    locations.map(location => ({
      params: { slug: `${service.slug}-${location.slug}-on` },
      props: { service, location }
    }))
  );
}
```

**Impact:** Solves the 600+ service-location page generation requirement elegantly.

#### 4. Islands Architecture (Selective Hydration)
- Astro uses the **Islands Architecture**: ship HTML by default, hydrate only interactive components.
- This allows us to use **React** for UI components (buttons, modals, forms) while keeping most of the site static.
- Interactive components load independently (faster perceived performance).

**Example:**
```astro
<!-- Static Astro component (no JS) -->
<Section>
  <h1>Furnace Repair in Guelph, ON</h1>
  <!-- Interactive React component (hydrated on client) -->
  <BookingForm client:visible />
</Section>
```

**Impact:** Combines the SEO benefits of static HTML with the UX benefits of interactive React components.

#### 5. Framework Flexibility
- Astro supports **multiple UI frameworks** (React, Vue, Svelte, Solid) in the same project.
- We chose **React** for UI components (familiar ecosystem, rich component libraries).
- Astro's component syntax (`.astro` files) is simple and intuitive for layout templates.

**Impact:** Flexibility to use React where needed, Astro for static content.

#### 6. TypeScript-First
- Astro is **TypeScript-first**: `.astro` files support TypeScript natively.
- Content Collections use **Zod schemas** for type-safe content validation.
- Strong type safety across the entire project.

**Impact:** Fewer bugs, better developer experience.

#### 7. Modern Tooling
- Vite-powered (fast dev server, hot module replacement)
- Built-in image optimization (`@astrojs/image`)
- Tailwind CSS integration (`@astrojs/tailwind`)
- Easy to extend with integrations

**Impact:** Modern, fast development experience.

---

### Alternatives Considered

#### Next.js (App Router)
**Pros:**
- Mature ecosystem
- React-based (familiar)
- Excellent developer experience
- Strong SEO support (SSG, ISR, SSR)

**Cons:**
- **Heavier JavaScript bundle:** Next.js ships more client-side JavaScript by default (hydration overhead).
- **Complexity:** App Router is powerful but complex. Server Components, Client Components, and hydration boundaries require careful management.
- **Build Time:** 700+ pages may be slower to build compared to Astro.
- **Overkill:** We don't need SSR or ISR (content is relatively static). Next.js's power is unnecessary for this use case.

**Verdict:** Too complex for a static, SEO-first site. Astro is simpler and faster.

---

#### Remix
**Pros:**
- Modern React framework
- Excellent routing
- Strong server-side rendering

**Cons:**
- **SSR-focused:** Remix is designed for server-side rendering, not static generation. We need SSG, not SSR.
- **Requires server:** Remix needs a Node.js server (or serverless functions). We want static hosting (CDN, no server).
- **Not ideal for static sites:** Remix is optimized for dynamic, data-driven apps, not content-heavy static sites.

**Verdict:** Wrong tool for the job. Remix excels at dynamic apps, not static sites.

---

#### Gatsby
**Pros:**
- Mature static site generator
- Strong SEO track record
- GraphQL data layer
- Large plugin ecosystem

**Cons:**
- **Declining popularity:** Gatsby's momentum has slowed. Community and support are weaker than before.
- **GraphQL complexity:** Gatsby requires GraphQL for data querying. This adds complexity we don't need.
- **Slower builds:** Gatsby builds can be slow for large sites (700+ pages).
- **Heavier JavaScript:** Gatsby ships more JavaScript than Astro.

**Verdict:** Viable but outdated. Astro is simpler, faster, and more modern.

---

#### Eleventy (11ty)
**Pros:**
- Lightweight, minimal JavaScript
- Flexible templating (Nunjucks, Liquid, Markdown)
- Fast builds
- Strong static site generation

**Cons:**
- **No built-in content collections:** Requires custom data pipelines for structured content (services, locations).
- **No React support:** 11ty is template-based (Nunjucks, Liquid). Adding React requires custom setup.
- **Less modern:** Feels dated compared to Astro (no Vite, no built-in TypeScript, no modern DX).

**Verdict:** Lightweight and fast, but lacks modern tooling and React support. Astro provides a better developer experience.

---

#### Hugo
**Pros:**
- Extremely fast builds (Go-based)
- Strong static site generation
- Powerful templating (Go templates)

**Cons:**
- **Go templates:** Hugo's templating language is less intuitive than Astro's component-based model.
- **No React support:** Hugo is Go-based, no native React support.
- **Less flexible:** Hugo is opinionated and less flexible than Astro.

**Verdict:** Fast but inflexible. Astro's component-based model and React support are more valuable.

---

## Consequences

### Positive

1. **Exceptional SEO Performance:** Static HTML, zero JavaScript by default, fast Core Web Vitals.
2. **Scalable Architecture:** Efficiently generate 700+ pages at build time.
3. **Type-Safe Content:** Zod schemas for content collections prevent errors.
4. **Modern Developer Experience:** TypeScript, Vite, hot module replacement, clear mental model.
5. **Flexibility:** React components where needed, Astro for static content.
6. **Fast Builds:** Astro's build process is optimized for static sites.
7. **CDN-Friendly:** Static HTML can be hosted on any CDN (Netlify, Vercel, Cloudflare Pages).

### Negative

1. **Less Mature Than Next.js:** Astro is newer than Next.js. Ecosystem is smaller (though growing rapidly).
2. **Learning Curve:** Team must learn Astro's component model and Islands Architecture. (Mitigated: Astro is simple and well-documented.)
3. **No SSR/ISR:** If we need dynamic, server-rendered pages in the future, Astro may not be the best fit. (Mitigated: We don't anticipate needing SSR for this project.)

### Neutral

1. **Build Step Required:** All content changes require a rebuild. This is acceptable since content changes are infrequent (services, locations are stable). Blog posts and FAQs can be added via content files and rebuilt.
2. **Static Hosting Only:** Cannot use server-side features (dynamic APIs, auth) without serverless functions. (Acceptable: we don't need these features.)

---

## Implementation Notes

1. **Astro Version:** Use Astro 5.0+ (latest stable version).
2. **Integrations:**
   - `@astrojs/react` (React support)
   - `@astrojs/tailwind` (Tailwind CSS)
   - `@astrojs/sitemap` (XML sitemap generation)
3. **Content Collections:** Define collections in `/src/content/config.ts` with Zod schemas.
4. **Dynamic Routing:** Use `getStaticPaths()` for service-location pages.
5. **Image Optimization:** Use Astro's built-in image component (`<Image />`) for optimized images.

---

## References

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Astro Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Why Astro?](https://docs.astro.build/en/concepts/why-astro/)

---

## Review & Approval

- **Proposed By:** Engineering Team
- **Date Proposed:** 2026-01-19
- **Approved By:** Engineering Team, Business Owner
- **Date Approved:** 2026-01-19

---

**Status:** ✅ Accepted

**Next Steps:**
1. Set up Astro project (completed)
2. Configure content collections
3. Implement dynamic routing for service-location pages
4. Build first page templates
