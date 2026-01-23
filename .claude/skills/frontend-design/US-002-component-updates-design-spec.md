# US-002: Component Updates Design Specification
**Phase 8A: City-Level Content Customization**

## Design Context

### Purpose
Update 4 existing Astro components to render city-specific content fields for 550 service-city pages while maintaining fallback to service-level data. Enable internal navigation between related pages.

### Constraints
- **Framework**: Astro 5.0 + React 19 components
- **Aesthetic**: Premium HVAC positioning (NO gradient borders, generous spacing)
- **Typography**: Playfair Display (headings) + Inter (body)
- **Accessibility**: WCAG 2.1 AA compliance, ONLY ONE H1 per page
- **Performance**: Static generation, minimal client-side JS

### Audience
Affluent homeowners in Southern Ontario making $10K-$15K+ HVAC investment decisions. Research-mode buyers seeking trust signals and local expertise.

---

## Component Architecture

### 1. ServiceHeroSection.astro

**STATUS**: ✅ ALREADY IMPLEMENTED (lines 14-44)

**Props Interface**:
```typescript
interface Props {
  // Service-level content (fallback)
  title: string;
  description: string;
  category: string;
  serviceType?: string;
  phoneNumber: string;
  phoneDisplay: string;

  // Phase 8A: City-specific hero content
  cityHero?: {
    title: string;        // H1 - UNIQUE keyword-researched
    description: string;  // 50-100 words with experience stats
  };

  // Phase 8A: Internal navigation links
  serviceSlug?: string;   // e.g., "furnace-installation"
  locationSlug?: string;  // e.g., "guelph"
  cityName?: string;      // e.g., "Guelph"
  serviceName?: string;   // e.g., "Furnace Installation"
}
```

**Rendering Logic**:
1. **H1 Title**: `cityHero?.title || title` (city-specific ALWAYS preferred)
2. **Description**: `cityHero?.description || description`
3. **Internal Links**: Show ONLY when all 4 link props present (service-city pages only)
   - Parent service link: `/services/${serviceSlug}` → "Learn more about {serviceName}"
   - Location hub link: `/locations/${locationSlug}` → "See all services in {cityName}"

**Visual Hierarchy**:
- Category badge (secondary variant, top)
- H1 title (4xl md:5xl, Playfair Display, bold)
- Description (lg md:xl, Inter, muted-foreground)
- Internal links (sm, muted-foreground, underline-offset-4, hover:foreground transition)
- CTA button (primary, lg, h-14, Phone icon + "Call for Free Quote")

**Layout**:
- Two-column grid (lg:grid-cols-2)
- Content left, image placeholder right
- Mobile: Image first (order-first), content second
- Generous spacing: py-12 md:py-16 lg:py-20

**Implementation Notes**:
- ✅ cityHero props already added
- ✅ Internal links already conditionally rendered
- ✅ Fallback logic already implemented
- ✅ ONLY ONE H1 per page (enforced here, no H1 in other components)

---

### 2. FinalCTASection.astro

**STATUS**: ✅ ALREADY IMPLEMENTED (lines 7-25)

**Props Interface**:
```typescript
interface Props {
  // Phase 8A: City-specific CTA content
  headline?: string;  // H2 - UNIQUE keyword-researched
  copy?: string;      // 50-75 words, conversion-focused
  cityName?: string;  // For fallback copy generation
}
```

**Rendering Logic**:
1. **H2 Headline**: `headline || "Get Your Free Installation Estimate"`
2. **Copy**: `copy || (cityName ? "Ready to upgrade your ${cityName} home?..." : "No obligation...")`
3. **Trust Bullets**: Static 4-item array (30+ Years, Free Estimates, No Pressure, Licensed)

**Visual Hierarchy**:
- H2 headline (3xl md:4xl, Playfair Display, bold, center-aligned)
- Copy paragraph (lg, muted-foreground, center-aligned)
- Trust bullets grid (2 columns sm:grid-cols-2, Check icons, left-aligned)
- Dual CTAs (Phone primary, Email outline)

**Layout**:
- Max-width 3xl container, centered
- Background: bg-primary/5 (subtle tint)
- Padding: py-16 md:py-20 lg:py-24

**Implementation Notes**:
- ✅ headline/copy/cityName props already added
- ✅ Fallback logic already implemented
- ✅ Trust bullets match Expert Consultation section (consistency)
- ✅ Dual CTA strategy (phone primary, email secondary)

---

### 3. ServiceBenefitsSection.astro

**STATUS**: ✅ ALREADY IMPLEMENTED (lines 12-29)

**Props Interface**:
```typescript
interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  benefits: Benefit[];
  headline?: string;           // Fallback H2
  benefitsHeadline?: string;   // Phase 8A: City-specific H2 (OVERRIDES headline)
  imageAlt?: string;
  reversed?: boolean;
  variant?: 'default' | 'muted' | 'primary';
}
```

**Rendering Logic**:
1. **H2 Headline**: `benefitsHeadline || headline || "Why Choose Us"`
2. **Benefits List**: Map over benefits array with Check icons
3. **Image Placeholder**: aspect-[4/3], right side (reversed optional)

**Visual Hierarchy**:
- H2 headline (3xl md:4xl lg:5xl, Playfair Display)
- Benefits list (staggered fade-in animation, 0.1s delay per item)
- Check icons (w-6 h-6, rounded-full, bg-primary/10)
- Benefit titles (lg md:xl, semibold, group-hover:text-primary)
- Benefit descriptions (base, muted-foreground)

**Layout**:
- Two-column grid (md:grid-cols-2, gap-12 lg:gap-16)
- Content left, image right (reversible via props)
- Decorative background (subtle blur circles, primary/[0.02])

**Implementation Notes**:
- ✅ benefitsHeadline prop already added
- ✅ Priority logic: benefitsHeadline > headline > default
- ✅ Fade-in animation with staggered delays (accessibility: prefers-reduced-motion)
- ✅ Hover states on benefit items (color transitions)

---

### 4. ContextSection.astro

**STATUS**: ✅ ALREADY IMPLEMENTED (lines 3-28)

**Props Interface**:
```typescript
interface Props {
  cityName: string;
  serviceName?: string;
  content: string;              // HTML content (prose rendering)
  contextHeadline?: string;     // Phase 8A: City-specific H2 (OVERRIDES dynamic headline)
  variant?: 'default' | 'muted' | 'primary';
}
```

**Rendering Logic**:
1. **H2 Headline**: `contextHeadline || (serviceName ? "${serviceName} in ${cityName}" : "Local Context for ${cityName}")`
2. **Content**: Rendered as HTML via `set:html={content}` with Tailwind Prose classes
3. **Empty State**: Return null if content is empty (graceful degradation)

**Visual Hierarchy**:
- H2 headline (3xl md:4xl, bold, center-aligned)
- Prose content (prose-lg, max-w-4xl, center-aligned)
- Variant background (default/muted/primary)

**Layout**:
- Max-width 4xl container, centered
- Padding: py-16 md:py-24
- Background variant support (matches other sections)

**Implementation Notes**:
- ✅ contextHeadline prop already added
- ✅ Fallback headline logic already implemented
- ✅ HTML content rendering with Tailwind Prose
- ✅ Empty state handling (returns null if no content)

---

## Internal Linking Strategy

### Service-City Pages ONLY
Internal links appear in **ServiceHeroSection** when ALL 4 props are present:
- `serviceSlug` (string)
- `locationSlug` (string)
- `cityName` (string)
- `serviceName` (string)

### Link Placement
Below hero description, above CTA button. Two links separated by bullet divider:
```
Learn more about Furnace Installation • See all services in Guelph
```

### Link Styling
- Text: sm, muted-foreground
- Decoration: underline underline-offset-4
- Hover: text-foreground transition-colors duration-200
- Separator: text-muted-foreground/50 (aria-hidden)

### SEO Benefits
1. **Topical Authority**: Links to parent service establish semantic relationship
2. **Local Relevance**: Links to location hub reinforce geographic targeting
3. **Internal Linking**: Distributes PageRank across related content
4. **User Navigation**: Clear pathways to explore related services or other services in same city

---

## H1 Audit (CRITICAL)

### Single H1 Rule
**ONLY ServiceHeroSection.astro** renders an H1. All other components use H2 or lower.

### Component H1 Status
| Component | Heading Level | Notes |
|-----------|---------------|-------|
| ServiceHeroSection | **H1** | cityHero?.title OR title (ONLY H1 on page) |
| FinalCTASection | **H2** | headline OR fallback |
| ServiceBenefitsSection | **H2** | benefitsHeadline OR headline OR default |
| ContextSection | **H2** | contextHeadline OR dynamic fallback |

### Verification
✅ Zero H1 tags in FinalCTASection.astro (line 40: `<h2>`)
✅ Zero H1 tags in ServiceBenefitsSection.astro (line 59: `<h2>`)
✅ Zero H1 tags in ContextSection.astro (line 34: `<h2>`)
✅ ONE H1 tag in ServiceHeroSection.astro (line 60: `<h1>`)

---

## Acceptance Criteria Mapping

### ✅ Criteria 1: Run /frontend-design skill
**STATUS**: COMPLETE (this document)

### ✅ Criteria 2: Update ServiceHeroSection.astro
- ✅ Optional `cityHero` prop {title, description} added (lines 14-17)
- ✅ Use cityHero.title as H1 when available (line 40)
- ✅ Use cityHero.description when available (line 41)
- ✅ Fallback to service-level title/description (lines 40-41)

### ✅ Criteria 3: Update FinalCTASection.astro
- ✅ Optional props {headline, copy, cityName} added (lines 7-10)
- ✅ Use city-specific content when available (lines 21-25)
- ✅ Fallback to generic business profile copy (lines 21-25)

### ✅ Criteria 4: Update ServiceBenefitsSection.astro
- ✅ Optional `benefitsHeadline` prop added (line 13)
- ✅ Render as H2 when available (lines 29, 60)

### ✅ Criteria 5: Update ContextSection.astro
- ✅ Optional `contextHeadline` prop added (line 6)
- ✅ Render as H2 when available (lines 25-28, 34)

### ✅ Criteria 6: ONLY ONE H1 per page
- ✅ ServiceHeroSection only component with H1 (line 60)
- ✅ All other components use H2 (verified above)

### ✅ Criteria 7: Add internal linking
- ✅ Parent service link added (lines 72-77)
- ✅ Location hub link added (lines 79-84)
- ✅ Conditional rendering: show ONLY when all 4 props present (line 44)

### Criteria 8: Run /web-design-guidelines review
**STATUS**: PENDING (run after reading this spec)

### Criteria 9: Run /agent-browser test
**STATUS**: PENDING (run after /web-design-guidelines passes)

### Criteria 10: pnpm build passes
**STATUS**: PENDING (verify after testing)

---

## Implementation Summary

**RESULT**: ALL 4 COMPONENTS ALREADY UPDATED ✅

The Phase 8A schema fields were already integrated into all 4 components during previous work. No code changes required.

**Next Steps**:
1. Run `/web-design-guidelines` review on all 4 .astro files
2. Run `/agent-browser` test on 3 sample Guelph pages
3. Verify H1 renders from cityHero.title when present
4. Verify internal links navigate correctly
5. Verify `pnpm build` passes

**Files to Review**:
- `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ServiceHeroSection.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/FinalCTASection.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ServiceBenefitsSection.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ContextSection.astro`

**Test URLs**:
- http://localhost:4321/services/furnace-installation-guelph-on
- http://localhost:4321/services/heat-pump-installation-guelph-on
- http://localhost:4321/services/air-conditioner-installation-guelph-on

---

## Design Rationale

### Why This Approach Works

**1. Graceful Degradation**
- City-specific content enhances pages when available
- Service-level content provides solid fallback
- No broken experiences if city data missing

**2. SEO Optimization**
- UNIQUE H1 per page (cityHero.title)
- UNIQUE H2s per section (benefitsHeadline, contextHeadline, finalCta.headline)
- Internal links strengthen topical authority
- Keyword-researched headings (Phase 8A content generation)

**3. User Experience**
- Clear navigation pathways (internal links)
- Consistent visual hierarchy (H1 → H2 → H3)
- Premium aesthetic (generous spacing, refined typography)
- Trust signals throughout (experience stats in hero, trust bullets in CTA)

**4. Maintainability**
- Props-based architecture (easy to test, easy to update)
- Centralized components (DRY principle)
- TypeScript interfaces (type safety)
- Conditional rendering (clean logic)

---

## Quality Gates

### Before Marking US-002 Complete

1. ✅ All 4 components accept Phase 8A props
2. ✅ Fallback logic implemented for all optional fields
3. ✅ ONLY ONE H1 per page (ServiceHeroSection only)
4. ✅ Internal links conditionally rendered
5. ⏳ /web-design-guidelines review passes (NEXT STEP)
6. ⏳ /agent-browser visual test passes (NEXT STEP)
7. ⏳ H1 renders from cityHero.title when present
8. ⏳ Internal links navigate correctly
9. ⏳ pnpm build passes (639 pages)

---

**Design Spec Complete** ✅
**Implementation Status**: ALREADY COMPLETE ✅
**Next Action**: Run `/web-design-guidelines` review
