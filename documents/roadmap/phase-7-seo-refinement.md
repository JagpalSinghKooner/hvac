# Phase 7 — SEO Refinement & Local Signals

## Purpose
Turn a strong foundation into a **high-performing local SEO asset**.

## Status
⏸️ **PENDING** - Starts after Phase 6 (Branding & Conversion) is complete

### Prerequisites:
- ✅ Phase 0-5: Foundation, content, routing, rendering, UI complete
- 🔄 Phase 6: Lead generation components and conversion-optimized pages (IN PROGRESS)

---

## Starting Prompt

```
Phase 7: SEO Refinement & Local Signals - Optimize for Search & Rankings

Project: B.A.P Heating & Cooling - HVAC website built with Astro + React + shadcn/ui + Tailwind CSS
Location: /Users/jagpalkooner/Desktop/HVAC

Current Status:
✅ Phase 1-6: Foundation, content, routing, UI, and conversion components complete
✅ All page types have lead generation components and CTAs
✅ 616 pages built with professional design and conversion paths
✅ Schema.org structured data embedded in components (Organization, LocalBusiness, Service)
✅ Build: Passing in ~4.5s
🟢 Production build ready for SEO audit

Project Structure:
- src/layouts/BaseLayout.astro - Main layout with meta tags
- src/content/business/profile.yaml - Business data (NAP, services, locations)
- 616 pages across 3 page types (homepage, services, locations)
- Full component library with schema.org embedded

Services: 6 categories with individual service pages
Locations: 7 regions with dedicated pages
Service-Location Hybrids: Full coverage matrix

Phase 7 Tasks: SEO Refinement & Local Signals

1. Metadata Optimization Audit:
   - Review title tags across all page types (homepage, service, location, hybrid)
   - Ensure unique, keyword-optimized titles (50-60 chars)
   - Craft compelling meta descriptions (150-160 chars) with local keywords
   - Verify canonical URLs are correct on all 616 pages
   - Check for duplicate titles or descriptions
   - Add proper Open Graph titles and descriptions for social sharing
   - Ensure Twitter card metadata is complete

2. Structured Data Enhancement (Build on Phase 6 schema):
   - Audit existing Organization schema (logo, contact, social profiles)
   - Verify LocalBusiness schema on all 7 location pages (address, geo, hours)
   - Enhance Service schema with detailed serviceType and areaServed
   - Add BreadcrumbList schema for navigation hierarchy
   - Add Review/AggregateRating schema if testimonials exist
   - Add FAQ schema for FAQ sections
   - Test all schemas with Google Rich Results Test
   - Validate with Schema.org validator

3. Internal Linking Optimization:
   - Audit link structure between services and locations
   - Add contextual links within page content
   - Create related services links (cross-selling)
   - Add location-to-location links (service area coverage)
   - Ensure breadcrumbs link properly
   - Fix any broken or missing internal links
   - Optimize anchor text with target keywords
   - Add footer navigation enhancements

4. Local SEO Signal Reinforcement:
   - Verify NAP (Name, Address, Phone) consistency across all pages
   - Add location-specific keywords naturally in content
   - Enhance service area coverage descriptions
   - Add neighborhood/city mentions for each location
   - Include local business hours on location pages
   - Add payment methods accepted
   - Mention service area radius (e.g., "serving within 30 miles")
   - Add local landmark mentions where relevant

5. Technical SEO Verification:
   - Review sitemap.xml completeness (all 616 pages)
   - Verify robots.txt allows proper crawling
   - Check for proper XML sitemap submission guidelines
   - Ensure all pages have proper hreflang tags (if multi-language)
   - Verify canonical tags are self-referential where appropriate
   - Check for mixed content issues (HTTP vs HTTPS)
   - Ensure proper redirect chains (if any)

6. Content Optimization:
   - Add H1 tags optimized for target keywords
   - Ensure proper heading hierarchy (H1 → H2 → H3)
   - Add keyword variations naturally in content
   - Optimize image alt text with descriptive keywords
   - Add local keywords in first 100 words of each page
   - Ensure content length is sufficient (500+ words for key pages)
   - Add location-specific content where appropriate

7. Page Speed & Core Web Vitals:
   - Audit Largest Contentful Paint (LCP < 2.5s)
   - Check First Input Delay (FID < 100ms)
   - Verify Cumulative Layout Shift (CLS < 0.1)
   - Optimize images (already using AVIF/WebP)
   - Check for render-blocking resources
   - Verify production build performance scores

Tools & Resources:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org validator: https://validator.schema.org/
- Google Search Console (for sitemap submission)
- PageSpeed Insights: https://pagespeed.web.dev/
- Screaming Frog SEO Spider (optional, for bulk audits)

Success Criteria:
- Unique, optimized meta titles and descriptions on all pages
- Valid schema.org structured data on all page types
- Strong internal linking structure with keyword-optimized anchors
- NAP consistency across all pages
- Local keywords naturally integrated in content
- All pages indexed properly (verify with sitemap)
- Rich results eligibility (star ratings, business info, FAQs)
- 90+ scores on Lighthouse SEO audit

Start Phase 7: Begin with metadata audit across all page types, then enhance schema, then optimize internal linking.
```

---

## Focus Areas

### 1. Metadata Strategy
- Unique titles for all 616 pages
- Compelling meta descriptions with CTAs
- Local keywords in titles and descriptions
- Proper Open Graph and Twitter card tags

### 2. Structured Data and Schema
- Validate existing schema from Phase 6
- Add BreadcrumbList, FAQ, Review schemas
- Test with Google Rich Results
- Ensure proper nesting and relationships

### 3. Internal Linking Optimization
- Strategic cross-linking between services and locations
- Contextual links within content
- Optimized anchor text
- Related content recommendations

### 4. Local Relevance Reinforcement
- NAP consistency verification
- City/neighborhood mentions
- Service area descriptions
- Local trust signals

---

## Expected Outcomes

✅ Improved indexation and search rankings
✅ Eligibility for rich results (business info, FAQs, reviews)
✅ Strong local SEO signals for all 7 locations
✅ Optimized metadata across all 616 pages
✅ Enhanced internal linking for crawlability
✅ Validated structured data on all page types
✅ Better visibility in local search results

---

## SEO Audit Checklist

### Metadata
- [ ] Unique title tags (50-60 chars) on all pages
- [ ] Compelling meta descriptions (150-160 chars)
- [ ] Local keywords in titles and descriptions
- [ ] Open Graph tags for social sharing
- [ ] Twitter card metadata
- [ ] Canonical URLs properly set

### Structured Data
- [ ] Organization schema validated
- [ ] LocalBusiness schema on location pages
- [ ] Service schema on service pages
- [ ] BreadcrumbList schema site-wide
- [ ] Review/AggregateRating schema
- [ ] FAQ schema where applicable
- [ ] All schemas pass Rich Results Test

### Internal Linking
- [ ] Service-to-location cross-links
- [ ] Location-to-location links
- [ ] Related services links
- [ ] Contextual in-content links
- [ ] Optimized anchor text
- [ ] No broken links

### Local SEO
- [ ] NAP consistency across all pages
- [ ] Location-specific keywords
- [ ] Service area descriptions
- [ ] Neighborhood mentions
- [ ] Business hours displayed
- [ ] Local trust signals

### Technical SEO
- [ ] Sitemap.xml includes all 616 pages
- [ ] Robots.txt properly configured
- [ ] Canonical tags correct
- [ ] No duplicate content issues
- [ ] HTTPS enforced
- [ ] Mobile-friendly (verified)

---

## Notes

- This phase optimizes content created in Phase 6
- Schema.org data added in Phase 6 will be audited and enhanced
- Focus on local search intent and user experience
- All optimizations should be natural and user-focused, not keyword-stuffed
- Measure success with Google Search Console and analytics
