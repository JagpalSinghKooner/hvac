# PRD: Phase 4 - Integration & QA

## Introduction

Comprehensive quality assurance and verification phase for the B.A.P Heating & Cooling website. This phase ensures all 628+ pages are fully functional, accessible, performant, and SEO-optimized before branding polish.

**Scope:** Testing, verification, and bug fixes across all page types (homepage, services, locations, service-city, blog, supporting pages)

**Design Principles:**
- All testing uses `/agent-browser` skill for visual verification
- Mobile-first testing (375px, 768px, 1024px breakpoints)
- Accessibility compliance (WCAG 2.1 AA)
- Performance targets: Lighthouse 90+ Performance, 100 Accessibility
- Zero broken internal links

---

## Goals

- Verify all internal links work bidirectionally
- Ensure mobile responsive design at all breakpoints
- Achieve WCAG 2.1 AA accessibility compliance
- Pass SEO audit with all meta tags and structured data present
- Achieve Lighthouse 90+ Performance score
- Confirm all 628+ pages build without errors
- Identify and fix any content gaps or missing data

---

## User Stories

### US-001: Internal Link Verification

**Description:** As a site visitor, I want all internal links to work so that I can navigate the site without encountering broken links or 404 errors.

**Acceptance Criteria:**
- [ ] Verify all service pages link correctly to:
  - Related services in same category
  - Service-city pages for each location
  - Category parent page
- [ ] Verify all location pages link correctly to:
  - All service-city pages for that location
  - Sibling locations in same region
  - Region parent page
- [ ] Verify all service-city pages link correctly to:
  - Parent service page
  - Parent location page
  - Same service in other cities
- [ ] Verify navigation links work from all page types
- [ ] Verify footer links work from all page types
- [ ] Verify blog post "Related Posts" links work
- [ ] Use `/agent-browser` skill to test link navigation
- [ ] `pnpm build` passes with no errors
- [ ] No 404 errors in browser console during navigation

---

### US-002: Mobile Responsive Testing

**Description:** As a mobile user, I want the site to display correctly on my device so that I can easily browse services and contact the company.

**Acceptance Criteria:**
- [ ] Test homepage at 375px (iPhone SE), 768px (iPad), 1024px (desktop)
- [ ] Test service page template at all three breakpoints
- [ ] Test location page template at all three breakpoints
- [ ] Test service-city page template at all three breakpoints
- [ ] Test blog post template at all three breakpoints
- [ ] Verify navigation hamburger menu works on mobile (375px, 768px)
- [ ] Verify all text is readable without horizontal scrolling
- [ ] Verify all images scale appropriately (no overflow)
- [ ] Verify touch targets are minimum 44px on interactive elements
- [ ] Verify phone CTA buttons are easily tappable on mobile
- [ ] Use `/agent-browser` skill with viewport settings for each breakpoint
- [ ] Document any layout issues found with screenshots

---

### US-003: Accessibility Audit

**Description:** As a user with accessibility needs, I want the site to be navigable and usable so that I can access all content and features.

**Acceptance Criteria:**
- [ ] All interactive elements are keyboard accessible (Tab navigation)
- [ ] Focus indicators are visible on all focusable elements
- [ ] All images have appropriate alt text (or are decorative with alt="")
- [ ] Form labels are properly associated with inputs (if any forms exist)
- [ ] Color contrast meets WCAG AA (4.5:1 for normal text, 3:1 for large text)
- [ ] Heading hierarchy is logical (no skipped levels: h1 > h2 > h3)
- [ ] ARIA labels are present on navigation, buttons, and interactive components
- [ ] Skip link is present for keyboard users to skip navigation
- [ ] Accordion components are keyboard accessible
- [ ] Carousel components are keyboard accessible and have pause controls
- [ ] Use `/agent-browser` skill to test keyboard navigation
- [ ] Run Lighthouse Accessibility audit - target 100 score
- [ ] Document any accessibility issues found

---

### US-004: SEO Audit

**Description:** As a search engine, I want proper metadata and structure so that I can correctly index and rank the site's pages.

**Acceptance Criteria:**
- [ ] All pages have unique `<title>` tags (60 characters max)
- [ ] All pages have unique `<meta name="description">` tags (155 characters max)
- [ ] All pages have `<meta name="robots" content="index, follow">`
- [ ] Homepage has Open Graph tags (og:title, og:description, og:type, og:url)
- [ ] Service pages have Open Graph tags
- [ ] Blog posts have Open Graph tags with og:type="article"
- [ ] Canonical URLs are set correctly on all pages
- [ ] Create `public/sitemap.xml` with all 628+ URLs
- [ ] Create `public/robots.txt` with sitemap reference
- [ ] Verify no duplicate title tags across pages
- [ ] Verify no duplicate meta descriptions across pages
- [ ] Heading structure is SEO-friendly (one H1 per page)
- [ ] Internal links use descriptive anchor text (not "click here")
- [ ] `pnpm build` passes with no errors

---

### US-005: Performance Audit

**Description:** As a site visitor, I want pages to load quickly so that I have a good user experience and don't abandon the site.

**Acceptance Criteria:**
- [ ] Run Lighthouse Performance audit on homepage - target 90+ score
- [ ] Run Lighthouse Performance audit on service page - target 90+ score
- [ ] Run Lighthouse Performance audit on service-city page - target 90+ score
- [ ] Run Lighthouse Performance audit on blog post - target 90+ score
- [ ] Largest Contentful Paint (LCP) under 2.5 seconds
- [ ] First Input Delay (FID) / Interaction to Next Paint (INP) under 100ms
- [ ] Cumulative Layout Shift (CLS) under 0.1
- [ ] JavaScript bundle size is reasonable (check with build output)
- [ ] CSS is properly purged (no unused styles in production)
- [ ] Images use proper formats (WebP/AVIF when real images added)
- [ ] Fonts are preloaded or use font-display: swap
- [ ] No render-blocking resources identified
- [ ] Document current scores and any optimization recommendations

---

### US-006: Content Verification

**Description:** As a content editor, I want to verify all pages display their content correctly so that visitors see accurate, complete information.

**Acceptance Criteria:**
- [ ] Homepage: All 14 sections render with content (no empty sections)
- [ ] Service pages (22): All have hero, benefits, process, FAQs, testimonials
- [ ] Location pages (25): All have hero, services grid, sibling locations
- [ ] Service-city pages (550): All have service + location content combined
- [ ] Category pages (5): All list correct services for that category
- [ ] Blog index: Shows all published posts with excerpts
- [ ] Blog posts (6+): All render markdown content correctly
- [ ] FAQs page: All FAQs display and filter works
- [ ] Reviews page: All reviews display and filter works
- [ ] About page: Company story and values display
- [ ] Contact page: Phone, email, address, hours display from profile.yaml
- [ ] Financing page: How it works steps and benefits display
- [ ] Rebates page: Ontario rebates information displays
- [ ] Careers page: Benefits and CTA display
- [ ] No "undefined" or "null" text visible on any page
- [ ] No Lorem ipsum placeholder text on any page
- [ ] Use `/agent-browser` skill to spot-check content on sample pages

---

### US-007: Build & Link Validation

**Description:** As a developer, I want to ensure the site builds successfully and all routes generate correctly so that the production site is complete.

**Acceptance Criteria:**
- [ ] `pnpm build` completes successfully with 0 errors
- [ ] Build generates 628+ HTML pages (verify count in build output)
- [ ] No TypeScript errors in build
- [ ] No Astro warnings about missing content
- [ ] All dynamic routes generate correct number of pages:
  - /services/[service] generates 22 pages
  - /locations/[location] generates 25 pages
  - /services/[serviceLocation] generates 550 pages
  - /services/category/[category] generates 5 pages
  - /regions/[region] generates 6 pages
  - /blog/[slug] generates 6+ pages
- [ ] `pnpm preview` serves built site without errors
- [ ] Navigate to 10 random pages in preview - all load correctly
- [ ] Check browser console for JavaScript errors - should be none
- [ ] Create a build verification checklist document

---

## Functional Requirements

- FR-1: All testing must use `/agent-browser` skill for visual verification
- FR-2: Mobile testing must cover 375px, 768px, and 1024px breakpoints
- FR-3: Accessibility must meet WCAG 2.1 AA standards
- FR-4: Lighthouse Performance score must be 90+ on key pages
- FR-5: Lighthouse Accessibility score must be 100
- FR-6: All 628+ pages must build without errors
- FR-7: Zero broken internal links allowed
- FR-8: All SEO metadata must be present and unique

---

## Non-Goals (Out of Scope)

- Google Analytics setup (separate phase)
- Real image replacement (Phase 5)
- Brand color changes (Phase 5)
- New feature development
- Content writing/rewriting
- Third-party integrations
- Server-side rendering changes

---

## Technical Considerations

- **Testing Tool:** Use `/agent-browser` skill for all visual testing
- **Lighthouse:** Run via Chrome DevTools or CLI for consistent scoring
- **Sitemap:** Use Astro's sitemap integration or generate manually
- **Build Verification:** Check Astro build output for page counts

---

## Success Metrics

- `pnpm build` completes with 0 errors and 628+ pages
- Lighthouse Performance: 90+ on all page types
- Lighthouse Accessibility: 100 on all page types
- Zero broken internal links
- All SEO metadata present and unique
- Mobile responsive at all tested breakpoints
- All content displays correctly (no undefined/null/placeholder text)

---

## Open Questions

- None - all requirements clarified during planning phase
