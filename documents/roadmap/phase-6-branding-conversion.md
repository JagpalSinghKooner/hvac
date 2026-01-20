# Phase 6 — Branding & Conversion Optimisation

## Purpose
Transform B.A.P Heating & Cooling website from functional grayscale design into a conversion-optimized HVAC brand with professional blue/orange color scheme, enhanced trust signals, and lead generation components.

## Status
🔄 **CURRENT PHASE** - In Progress

### Completed Previous Phases:
- ✅ Phase 0: Strategy & planning complete
- ✅ Phase 1: Technical foundation (Astro + React + shadcn/ui + Tailwind)
- ✅ Phase 2: Content model (services, locations in YAML)
- ✅ Phase 3: Routing (616 pages, service-location hybrids)
- ✅ Phase 4: Baseline rendering (all pages render with basic content)
- ✅ Phase 5: UI system (shadcn/ui components, consistent styling)

---

## Implementation Strategy

**Approach**: Component-first - build all reusable components before integrating into pages
**Primary Goal**: Maximize phone calls and form submissions through strategic design
**Build Requirement**: Maintain build performance <5 seconds for 616 pages

### User Preferences (Confirmed)
- ✅ Brand Colors: Blue (trust/cooling) + Orange (heat/urgency) - HVAC industry standard
- ✅ Content: Structured placeholders (realistic, easily replaceable)
- ✅ Images: Placeholder service (Unsplash with proper dimensions)
- ✅ Build Order: Components first → Page integration second
- ✅ Forms: Skip for now, will be added in final step

---

## Sequential Implementation Checklist

**IMPORTANT**: Each task must be completed before moving to the next. Update status and use the "Next Prompt" after completing each step.

### Phase 1: Foundation (Color Palette & Schema)

#### ✅ Step 1.1: Update Brand Colors in globals.css
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/styles/globals.css`
**What was done**:
- Updated CSS variables for blue/orange HVAC color scheme
- Primary (Blue): 206 100% 40% - Trust, professionalism, cooling
- Secondary (Orange): 14 100% 50% - Urgency, heat, emergency
- Accent (Sky Blue): 199 89% 48% - Highlights, interactive elements
- Updated dark mode variants

**Next Prompt**: "Continue Phase 6: Create OrganizationSchema component for homepage SEO"

---

#### ✅ Step 1.2: Create OrganizationSchema Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/OrganizationSchema.astro`
**What was done**:
- Created schema component for homepage
- Includes: name, logo, founding date, contact, social media, aggregate rating
- Uses business profile data automatically

**Next Prompt**: "Continue Phase 6: Create ServiceSchema component for service pages"

---

#### ✅ Step 1.3: Create ServiceSchema Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/ServiceSchema.astro`
**What was done**:
- Created schema component for service pages
- Includes: service type, provider, area served
- Props: serviceTitle, serviceDescription, serviceType

**Next Prompt**: "Continue Phase 6: Create LocalBusinessSchema component for location pages"

---

#### ✅ Step 1.4: Create LocalBusinessSchema Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/LocalBusinessSchema.astro`
**What was done**:
- Created schema component for location pages
- Includes: business name with city, address, geo coordinates, hours
- Props: locationName, city, latitude, longitude

**Next Prompt**: "Continue Phase 6: Create testimonials.ts data file with 12 realistic testimonials"

---

### Phase 2: Data Layer

#### ✅ Step 2.1: Create Testimonials Data File
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/data/testimonials.ts`
**What was done**:
- Created 12 realistic testimonials covering:
  - Different services (furnace, A/C, boiler, heat pump, water heater, commercial)
  - Different locations (Guelph, Kitchener, Cambridge, Milton, etc.)
  - Mix of 4-5 star ratings
  - Emergency and regular service scenarios
- Added helper functions: getTestimonialsByLocation, getTestimonialsByService, getTopTestimonials

**Next Prompt**: "Continue Phase 6: Create faqs.ts data file with general and service-specific FAQs"

---

#### ✅ Step 2.2: Create FAQs Data File
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/data/faqs.ts`
**What was done**:
- Created 10 general FAQs (24/7 service, response time, pricing, warranty, etc.)
- Created service-specific FAQs for 6 major services:
  - furnace-installation (6 FAQs)
  - furnace-repair (6 FAQs)
  - air-conditioner-installation (6 FAQs)
  - air-conditioner-repair (6 FAQs)
  - heat-pump (6 FAQs)
  - boiler (6 FAQs)
- Added helper functions: getServiceFAQs, getAllFAQs

**Next Prompt**: "Continue Phase 6: Create serviceContent.ts data file with benefits and problems for major services"

---

#### ✅ Step 2.3: Create Service Content Data File
**Status**: COMPLETED ✅ (Pre-existing)
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/data/serviceContent.ts`
**What was done**:
- File already existed with complete implementation
- Interface definitions: ServiceBenefit, ServiceProblem, ServiceContentData
- Benefits (4-6 per service) with title, description, icon for all 6 major services:
  - furnace-installation (5 benefits, 5 problems)
  - furnace-repair (5 benefits, 5 problems)
  - air-conditioner-installation (5 benefits, 5 problems)
  - air-conditioner-repair (5 benefits, 5 problems)
  - heat-pump (6 benefits, 5 problems)
  - boiler (5 benefits, 5 problems)
- Helper functions: getServiceContent, getAllBenefits, getAllProblems, hasServiceContent
- Uses Lucide icon names throughout

**Next Prompt**: "Continue Phase 6: Create neighborhoods.ts data file with neighborhood lists for all 7 cities"

---

#### ✅ Step 2.4: Create Neighborhoods Data File
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/data/neighborhoods.ts`
**What was done**:
- Created neighborhoodsByCity object with 8-10 neighborhoods per city
- Covered all 8 cities:
  - guelph: 10 neighborhoods (Downtown Guelph, The Ward, Exhibition Park, Westminster Woods, etc.)
  - cambridge: 10 neighborhoods (Preston, Galt, Hespeler, Blair, Silverheights, etc.)
  - kitchener: 10 neighborhoods (Downtown Kitchener, Westmount, Forest Heights, etc.)
  - waterloo: 10 neighborhoods (Uptown Waterloo, Beechwood, Lakeshore, etc.)
  - milton: 10 neighborhoods (Old Milton, Dempsey, Timberlea, etc.)
  - oakville-burlington: 10 neighborhoods (Downtown Oakville, Old Oakville, Bronte, etc.)
  - hamilton: 10 neighborhoods (Downtown Hamilton, Dundas, Ancaster, etc.)
  - brantford: 10 neighborhoods (Downtown Brantford, West Brant, Eagle Place, etc.)
- Added 5 helper functions: getNeighborhoodsByCity, getAllNeighborhoods, getCityByNeighborhood, getTotalNeighborhoodCount, hasCityNeighborhoods
- Follows established data file pattern with JSDoc comments and TypeScript interfaces

**Next Prompt**: "Continue Phase 6: Create TestimonialCard component (first card component)"

---

#### ✅ Step 2.5: Fix TypeScript Errors in Schema Components
**Status**: COMPLETED ✅
**Files Modified**:
- `/Users/jagpalkooner/Desktop/HVAC/src/content/config.ts`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/OrganizationSchema.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/LocalBusinessSchema.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/ServiceSchema.astro`

**What was done**:
- **Updated business schema** in config.ts to include missing TypeScript definitions:
  - Added `reputation` object (google_rating, google_review_count, etc.)
  - Added `social` object (instagram, facebook, etc.)
  - Added `copy_blocks` object (short_description, long_description, etc.)
  - Added `pricing_and_offers`, `warranty_and_guarantees`, `brands_and_capability`, etc.
- **Fixed schema components** to use correct property names and optional chaining:
  - Changed `business.locations.primary.street_address` → `business.locations?.primary.address_full.split(',')[0].trim()`
  - Added optional chaining for all `business.locations` accesses
  - Made `business.services?.list` conditional in LocalBusinessSchema
- **Build verification**: All TypeScript errors resolved (18 → 0 errors)
- **Performance**: Build completes in 4.52s for 616 pages ✅ (under 5s target)

**Next Prompt**: "Continue Phase 6: Create TestimonialCard component (first card component)"

---

### Phase 3: Card Components (Base Building Blocks)

#### ✅ Step 3.1: Create TestimonialCard Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/TestimonialCard.astro`
**What was done**:
- Created props interface with testimonial (Testimonial type), variant ('card' | 'quote'), class
- Built card variant with:
  - Star rating display (5 stars, filled with orange/secondary color, empty with muted gray)
  - Quote text with CSS line-clamp-4 for truncation (~200 chars)
  - Author name + location in footer
  - Service badge (outline variant with blue/primary color)
  - Verified badge when testimonial.verified === true (default variant with CheckCircle icon)
  - Semantic HTML with ARIA labels for accessibility
- Built quote variant with:
  - Simple blockquote with blue left border
  - Inline attribution with stars, author, and location
  - No badges for cleaner appearance
- Edge case handling: defensive defaults for missing data
- Responsive design with flex-wrap for mobile
- Build verified: 4.45s for 616 pages ✅

**Next Prompt**: "Continue Phase 6: Create ServiceCard component with category-based colors and Unsplash placeholders"

---

#### ✅ Step 3.2: Create ServiceCard Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/ServiceCard.astro`
**What was done**:
- Created props interface with Service type and Props interface:
  - service: { title, slug, description, icon?, category }
  - variant: 'compact' | 'featured' (default: 'compact')
  - linkType: 'standard' | 'location-specific' (default: 'standard')
  - locationSlug: optional string for hybrid pages
  - class: optional string for custom styling
- Built compact variant with:
  - Icon in colored circle (category-based: primary/blue for cooling, secondary/orange for heating, accent for other)
  - Title (h3, font-semibold)
  - Description truncated to 100 chars at word boundary with ellipsis
  - "Learn More" link with ArrowRight icon (gap-2, hover:gap-3 animation)
  - Hover effects (scale-105, shadow-lg, transition-all)
- Built featured variant with:
  - Unsplash placeholder images at top (h-48, object-cover)
  - Category badge overlay (absolute top-4 right-4 with shadow)
  - Image zoom on hover (scale-110, 500ms transition)
  - All compact content below image with full description (no truncation)
- Category-specific image URLs:
  - heating: `https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&q=80&fit=crop`
  - cooling: `https://images.unsplash.com/photo-1631545806609-7d0ae5dd1b8b?w=400&h=300&q=80&fit=crop`
  - other: `https://placehold.co/400x300/0066CC/FFFFFF?text=${encodeURIComponent(title)}`
- Routing logic:
  - Standard: `/services/${service.slug}`
  - Location-specific: `/services/${service.slug}-${locationSlug}-on`
- Helper functions:
  - getCategoryColors() - returns bgColor, textColor, borderColor, badgeVariant
  - getIconComponent() - resolves Lucide icon with category fallbacks (Flame, Snowflake, Wind, Droplets, Building2, Calendar, Wrench)
  - getFeaturedImage() - returns {src, alt} with descriptive alt text
  - getTruncatedDescription() - truncates at word boundary
  - getServiceUrl() - constructs link based on linkType
- Accessibility features:
  - h3 for proper heading hierarchy
  - aria-label on links: "Learn more about {service.title}"
  - aria-hidden="true" on decorative icons
  - Semantic HTML with native anchor elements
- Build verified: 4.33s for 616 pages ✅ (under 5s target)

**Next Prompt**: "Continue Phase 6: Create PricingCard component for maintenance plans"

---

#### ✅ Step 3.3: Create PricingCard Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/PricingCard.astro`
**What was done**:
- Created TypeScript interfaces:
  - MaintenancePlan interface (name, price, description, features[], recommended?)
  - Props interface (plan, class?)
- Built card structure with conditional styling:
  - Card with border-2 border-primary shadow-lg for recommended plans
  - "Most Popular" Badge (variant="secondary") positioned absolute top-4 right-4
  - Plan name (h3, text-2xl lg:text-3xl, font-bold, centered)
  - Price (text-4xl font-bold text-primary, centered)
  - Description (text-sm text-muted-foreground, centered)
  - Features list (ul with gap-3) with Check icons (h-5 w-5 text-primary, flex-shrink-0)
  - PhoneCTA at bottom (variant="inline", w-full justify-center) with border-t separator
- Created placeholder data with 3 maintenance plans exported from component:
  - Basic ($99/year): 4 features (annual inspections, priority scheduling, 10% discount)
  - Premium ($199/year, recommended: true): 5 features (includes all Basic + bi-annual inspections, air filters, 15% discount, 2-hour emergency response)
  - Commercial (Custom): 4 features (customized schedule, dedicated technician, quarterly inspections, 24/7 support)
- Implemented defensive defaults for missing data (plan name, price, features)
- Added hover effects consistent with other cards (hover:scale-105 hover:shadow-lg transition-all duration-300)
- Accessibility features:
  - Semantic HTML (h3, ul, li)
  - aria-label="Most popular plan" on badge
  - aria-hidden="true" on decorative Check icons
- Build verified: 4.47s for 616 pages ✅ (under 5s target)
- No TypeScript errors or warnings related to component

**Next Prompt**: "Continue Phase 6: Create ServicesGrid section component (first section component)"

---

#### ✅ Step 3.4: Create QuickQuoteCard Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/QuickQuoteCard.astro`
**What was done**:
- Created props interface with service (optional), variant ('sidebar' | 'inline'), class
- Built card structure with nested div gradient border technique:
  - Gradient border wrapper: `p-[2px] bg-gradient-to-br from-primary to-secondary rounded-xl`
  - Card component with CardContent (p-6 padding, gap-6 spacing)
  - "Get Your Free Estimate" heading (text-2xl font-bold text-center)
  - 4 curated trust bullets with CheckCircle icons (text-primary):
    - "Free estimates & diagnostics"
    - "10-year warranty on parts & labour"
    - "Upfront, no-surprise pricing"
    - "Same-day service available"
  - PhoneCTA (variant="hero", w-full)
  - BookingCTA (variant="hero", w-full)
- Implemented variant-specific classes:
  - sidebar: `sticky top-20 z-40 hidden lg:block`
  - inline: `w-full`
- Accessibility: Semantic HTML (h3, ul, li), aria-hidden on decorative icons
- Build verified: 4.25s for 616 pages ✅ (under 5s target)
- No TypeScript errors or warnings

**Next Prompt**: "Continue Phase 6: Create ServicesGrid section component (first section component)"

---

### Phase 4: Section Components (Content Blocks)

#### ✅ Step 4.1: Create ServicesGrid Section Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ServicesGrid.astro`
**What was done**:
- Created comprehensive props interface with 11 optional parameters:
  - services (optional Array), heading, subheading, columns (2|3|4), variant ('compact'|'featured')
  - limit, showViewAll, linkType ('standard'|'location-specific'), locationSlug
  - categoryFilter (filter by service category), class
- Implemented data fetching logic:
  - Auto-fetches from services content collection when services prop not provided
  - Filters by status='live' and workflowStatus='published'
  - Sorts by priority field (priority services first), then by order field
  - Applies categoryFilter and limit as needed
- Built responsive grid system:
  - columns=2: 1 col mobile, 2 cols md+
  - columns=3: 1 col mobile, 2 cols md, 3 cols lg+ (default)
  - columns=4: 1 col mobile, 2 cols md, 4 cols lg+
- Created section structure:
  - Section with padding="lg", Container with default size
  - Optional centered heading (text-3xl font-semibold mb-4)
  - Optional centered subheading (text-lg text-muted-foreground, max-w-3xl)
  - Grid with gap-6, maps services to ServiceCard components
  - Optional "View All Services" button (Button with outline variant, ArrowRight icon)
  - Empty state handling (centered message when no services)
- Added icon field to services schema in config.ts (z.string().optional())
- Edge cases handled: empty arrays, limit overflow, missing locationSlug, etc.
- Build verified: 4.68s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create BenefitsSection component for service benefits"

---

#### ✅ Step 4.2: Create BenefitsSection Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/BenefitsSection.astro`
**What was done**:
- Created comprehensive props interface:
  - benefits (ServiceBenefit[] - required)
  - heading (optional, default: "Benefits")
  - subheading (optional for additional context)
  - columns (2|3|4, default: 2 for flexible grid layout)
  - class (optional custom Section wrapper classes)
- Built section structure following established patterns:
  - Section with padding="lg" and Container
  - Conditional heading section (h2, text-3xl font-semibold, centered)
  - Optional subheading (text-lg text-muted-foreground)
  - Responsive grid: 2 columns default (1 col mobile, 2 cols md+)
  - Support for 3 and 4 column layouts via columns prop
- Icon resolution pattern (from ValuePropsGrid):
  - Imported all Lucide icons: `import * as Icons from 'lucide-react'`
  - Dynamic resolution: `(Icons as any)[benefit.icon] || Icons.CheckCircle`
  - Pre-processed benefits in frontmatter for Astro compatibility
  - Icon container: `w-12 h-12 rounded-full bg-primary/10 text-primary`
  - Icon styling: `h-6 w-6` with `aria-hidden="true"`
- Card-based benefit items:
  - Used Card, CardHeader, CardTitle, CardContent components
  - Centered text layout for better scannability
  - Icon at top, title (h3), description below
  - Full height cards with flex-col for consistent heights
- Edge case handling:
  - Early return if benefits array empty or undefined
  - CheckCircle fallback for invalid icon names
  - Conditional heading section rendering
- Accessibility features:
  - Semantic HTML (h2 for section, h3 for benefits)
  - Icons marked `aria-hidden="true"` (decorative)
  - Proper heading hierarchy
- Build verified: 4.39s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create CommonProblemsSection component with accordion variant"

---

#### ✅ Step 4.3: Create CommonProblemsSection Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/CommonProblemsSection.astro`
**What was done**:
- Created comprehensive props interface:
  - problems (ServiceProblem[] - required)
  - heading (default: "Common Problems We Solve")
  - subheading (optional for additional context)
  - variant ('accordion' | 'grid', default: 'accordion')
  - showCTA (boolean, default: true)
  - ctaText (custom CTA text)
  - class (optional custom wrapper classes)
- Built section structure with bg-muted/30 background and Section + Container layout
- **Accordion variant** (default):
  - Uses shadcn/ui Accordion component (type="single", collapsible)
  - Icons displayed beside problem titles (text-destructive for urgency)
  - Left-aligned text with solution indented (pl-8)
  - Single accordion open at a time
  - ChevronDown icon rotates on open (automatic)
  - Max-width 4xl centered for readability
- **Grid variant**:
  - 2-column grid on desktop (1 column on mobile)
  - Card-based layout for visual separation
  - Icon in colored circle (bg-destructive/10, text-destructive)
  - Problem as CardTitle (font-semibold, larger text)
  - Solution as body text (text-muted-foreground)
- Icon resolution pattern (from BenefitsSection):
  - Dynamic resolution from lucide-react
  - Fallback to AlertTriangle for missing icons
  - Pre-processed in frontmatter for Astro compatibility
- PhoneCTA integration at bottom:
  - Conditional rendering based on showCTA prop
  - Customizable CTA text (default: "Experiencing one of these issues? We can help.")
  - Uses "hero" variant for prominent display
  - Centered layout with responsive width
- Edge case handling: empty arrays, missing icons, single problem, long text
- Accessibility features: semantic HTML (h2), aria-hidden on decorative icons, keyboard-accessible accordion
- Build verified: 4.55s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create PricingTransparencySection component"

---

#### ✅ Step 4.4: Create PricingTransparencySection Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/PricingTransparencySection.astro`
**What was done**:
- Created comprehensive props interface with 6 parameters:
  - heading (default: "Transparent, No-Surprise Pricing")
  - subheading (optional intro text)
  - showPricingCards (boolean, default: false)
  - showCTA (boolean, default: true)
  - columns (2|3, default: 3)
  - class (custom wrapper classes)
- Implemented data fetching from business profile (pricing_and_offers, warranty_and_guarantees)
- Built section structure with Section + Container layout
- Created 3 info cards grid (responsive 1→2→3 columns):
  - **Card 1: How We Price** (DollarSign icon):
    - Free estimates & diagnostics (conditional)
    - Upfront quotes before work begins
    - Financing statement (conditional)
    - Rebate paperwork support (conditional)
    - Check icons for each bullet point
  - **Card 2: Warranty** (Shield icon):
    - "10-year warranty on parts and labour" (from warranty_statement)
  - **Card 3: Our Guarantees** (CheckCircle icon):
    - No-Surprise Guarantee (title + copy)
    - Workmanship Guarantee (title + copy)
- Optional maintenance plan cards section (if showPricingCards=true):
  - "Maintenance Plans" heading (h3, centered)
  - 3-column grid with PricingCard components
  - Maps over maintenancePlans array
- Optional PhoneCTA at bottom (if showCTA=true)
- Icon styling: bg-primary/10 background, text-primary color
- Cards use h-full flex flex-col for equal heights
- All content conditional on data availability (defensive coding)
- Build verified: 4.47s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create RelatedServicesSection component for cross-selling"

---

#### ✅ Step 4.5: Create RelatedServicesSection Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/RelatedServicesSection.astro`
**What was done**:
- Created comprehensive props interface with 10 parameters:
  - currentService (required - Service type or minimal {slug, category} object)
  - relatedServices (optional array), heading (default: "Related Services"), subheading
  - limit (default: 3), columns (2|3|4, default: 3), variant ('compact'|'featured')
  - linkType ('standard'|'location-specific'), locationSlug, class
- Implemented data fetching logic:
  - Auto-fetch from services collection if relatedServices not provided
  - Filter by status='live' and workflowStatus='published'
  - Filter by same category as currentService.category
  - Exclude currentService by slug (critical for avoiding self-referencing)
  - Sort by priority, then order (follows ServicesGrid pattern)
  - Apply limit (slice array)
- Built section structure:
  - Section + Container layout (follows established pattern)
  - Optional heading section (h2, centered text-3xl font-semibold)
  - Optional subheading (text-lg text-muted-foreground)
  - Responsive grid system (2/3/4 columns with mobile-first breakpoints)
  - Maps services to ServiceCard components (passes variant, linkType, locationSlug)
- Edge case handling:
  - Early return if no related services (component renders nothing)
  - Defensive category filtering (checks if currentService.category exists)
  - Handles limit overflow gracefully (slice handles arrays shorter than limit)
- Accessibility: Semantic HTML (h2 for section heading, proper heading hierarchy)
- Build verified: 4.48s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create NeighborhoodsSection component for local SEO"

---

#### ✅ Step 4.6: Create NeighborhoodsSection Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/NeighborhoodsSection.astro`
**What was done**:
- Created comprehensive props interface with 7 parameters:
  - citySlug (optional - city identifier like 'guelph', 'cambridge')
  - neighborhoods (optional array), heading (default: "Neighborhoods We Serve in {City}"), subheading
  - columns (2|3|4, default: 4 for compact display), limit (optional - slice to first N)
  - class (custom wrapper classes)
- Implemented data fetching logic:
  - Auto-fetch from neighborhoods.ts using getNeighborhoodsByCity(citySlug) if not provided
  - Apply limit if specified (slice array)
  - Early return if no neighborhoods available (component renders nothing)
  - Dynamic city name formatting (capitalize, handle hyphens)
- Built section structure:
  - Section + Container layout (follows established pattern)
  - Optional heading section (h2, centered text-3xl font-semibold)
  - Optional subheading (text-lg text-muted-foreground)
  - Responsive grid system: 1 col mobile → 2 cols tablet (md) → 4 cols desktop (lg)
  - Simple ul/li structure with CheckCircle icons (h-5 w-5, text-primary)
  - Compact design: gap-4 spacing (vs standard gap-6)
- Edge case handling:
  - Empty neighborhoods array → early return
  - No citySlug and no neighborhoods prop → early return
  - Invalid citySlug → returns empty array from helper, component renders nothing
  - Long neighborhood names → text wraps naturally with flex layout
- Accessibility: Semantic ul/li structure, h2 heading, icons marked aria-hidden="true"
- Build verified: 4.57s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create LocalTrustSignals component for location pages"

---

#### ✅ Step 4.7: Create LocalTrustSignals Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/LocalTrustSignals.astro`
**What was done**:
- Created props interface with location, heading, showHeading, variant, class
- Implemented data fetching from business profile with defensive checks
- Built two variants:
  - Grid variant (default): 3-column responsive grid with Card components
  - Compact variant: Horizontal layout for smaller spaces
- Created 6 trust signals with icons:
  - Building2: "{yearsInBusiness} Years of Service" with location personalization
  - Shield: "TSSA Licensed" with license number (#000076639116)
  - Award: "HRAI Certified" (HRAI Member & Heatpump Champion)
  - CheckCircle: "BBB Member" (Better Business Bureau recognized)
  - CheckCircle: "No-Surprise Guarantee" with guarantee copy preview
  - Shield: "10-Year Warranty" with warranty statement
- Icon resolution pattern from BenefitsSection (pre-processed in frontmatter)
- Card grid layout: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Icons styled with `w-12 h-12 rounded-full bg-primary/10 text-primary`
- Section background: `bg-muted/30` for subtle emphasis
- Accessibility: semantic HTML (h2), icons marked `aria-hidden="true"`
- Build verified: 4.54s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create CertificationsBadges component"

---

#### ✅ Step 4.8: Create CertificationsBadges Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/CertificationsBadges.astro`
**What was done**:
- Created comprehensive props interface with 5 parameters:
  - heading (default: "Our Certifications & Licenses"), showHeading (default: true)
  - variant ('full' | 'compact', default: 'full'), columns (2|3|4, default: 3)
  - class (custom wrapper classes)
- Implemented data fetching from business profile with defensive checks
- Built two variants:
  - **Full variant**: Grid layout with Card components (responsive 1→2→3 columns)
  - **Compact variant**: Horizontal flex row with simple inline badges
- Created 6 certification badges with icons:
  - TSSA Licensed (Shield icon, license #000076639116)
  - HRAI Certified (Award icon)
  - HRAI Heatpump Champion (Award icon)
  - BBB Member (CheckCircle icon)
  - WSIB Covered (Shield icon)
  - Fully Insured (ShieldCheck icon)
- Icon resolution in frontmatter (Astro requirement) with fallback to CheckCircle
- Card-based layout for full variant: icon in circular background (bg-primary/10), title, description
- Inline badge layout for compact variant: icon + text, no descriptions
- Edge case handling: filters out certifications with missing data, early return if no certifications
- Accessibility: semantic HTML (h2), icons marked aria-hidden="true"
- Build verified: 4.53s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Create TestimonialsCarousel component (decide on CSS-only or Embla)"

---

#### ✅ Step 4.9: Create TestimonialsCarousel Component
**Status**: COMPLETED ✅
**Files Created**:
- `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/TestimonialsCarousel.astro`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/ui/carousel.tsx`
- `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/TestimonialCardReact.tsx`

**What was done**:
- **Installed Embla Carousel dependencies**: embla-carousel-react (8.6.0) and embla-carousel-autoplay (8.6.0) via pnpm
- **Created TestimonialCardReact.tsx**: React port of existing Astro TestimonialCard with identical design
  - Two variants: 'card' (default) and 'quote'
  - Star rating display (filled vs empty stars)
  - Service badge (outline) and verified badge (default with CheckCircle icon)
  - Line-clamp-4 text truncation
  - Responsive layout with flex-wrap
- **Created carousel.tsx**: Embla carousel engine with full feature set
  - Auto-rotate every 5 seconds (configurable, stops on user interaction)
  - Drag/swipe navigation on all devices
  - Responsive breakpoints: 1 card mobile → 2 tablet → 3 desktop
  - Arrow navigation buttons (hidden on mobile)
  - Dot indicators with active state synchronization
  - Full accessibility: ARIA labels, keyboard navigation
- **Created TestimonialsCarousel.astro**: Main wrapper component following established patterns
  - Comprehensive props interface (14 props total)
  - Auto-fetch testimonials from testimonials.ts with helper functions
  - Filter by location, service, verified status
  - Sort by date (newest first)
  - Fetch Google rating from business profile
  - Section + Container layout (bg-muted/30)
  - Google rating header (5 stars + number + review count)
  - Heading/subheading centered layout
  - React carousel integration with client:load
  - "View All Reviews" CTA button
- **Integrated into 3 page types**:
  - **Homepage** (index.astro): Top 9 verified testimonials, replaced ReviewsSection
  - **Service pages** ([service].astro): Service-filtered testimonials (6 limit)
  - **Location pages** ([location].astro): Location-filtered testimonials (6 limit)
- **Build verified**: 4.46s for 616 pages ✅ (under 5s target)
- **Bundle size**: carousel.js = 29.48 KB (11.23 KB gzipped) - better than expected!
- **No TypeScript errors or warnings**

**Next Prompt**: "Continue Phase 6: Create EmergencyCTABanner component with sticky mobile variant"

---

**Original Plan (for reference)**:
- Create props interface: testimonials (Testimonial[]), heading, subheading, autoplay, class
- Fetch testimonials from testimonials.ts if not provided
- Build section structure:
  - Section with Container
  - Heading: "What Our Customers Say" (or custom)
  - Subheading: "4.8 stars from 407 Google reviews" (from business profile)
  - Carousel container:
    - 3 cards visible on desktop, 1 on mobile
    - Navigation arrows (prev/next)
    - Dots indicator
    - Auto-rotate every 5 seconds (if autoplay=true)
  - Render TestimonialCard for each testimonial
  - Link to Google reviews at bottom
- **CSS-only option** (recommended for performance):
  - Use `overflow-x-auto`, `scroll-snap-type: x mandatory`
  - Smooth scroll behavior
  - No JavaScript carousel library needed

**Next Prompt**: "Continue Phase 6: Create EmergencyCTABanner component with sticky mobile variant"

---

### Phase 5: CTA Components

#### ✅ Step 5.1: Create EmergencyCTABanner Component
**Status**: COMPLETED ✅ (Pre-existing)
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/cta/EmergencyCTABanner.astro`
**What was done**:
- Component already existed with complete implementation
- Props interface: variant ('homepage' | 'service' | 'location'), sticky (boolean), class
- Variant-specific text configuration:
  - Homepage: "24/7 Emergency Service Available"
  - Service: "Emergency HVAC Repair Available 24/7"
  - Location: "Emergency Service in Your Area"
- Full-width section with bg-destructive (red/orange background)
- Phone icon with animate-pulse on both sides of heading
- PhoneCTA with emergency variant (white background, red text)
- Sticky mobile behavior: `fixed bottom-0 z-50 md:relative`
- Fetches response time from business profile (60 minutes)
- Accessibility: ARIA labels and semantic HTML

**Next Prompt**: "Continue Phase 6: Enhance TrustBadges component with brand colors and animations"

---

#### ✅ Step 5.2: Enhance TrustBadges Component
**Status**: COMPLETED ✅
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/components/TrustBadges.astro`
**What was done**:
- Enhanced existing TrustBadges component with brand colors and animations
- Applied brand colors to icons (HVAC industry standard):
  - 24/7 Emergency: text-secondary (orange - urgency/heat)
  - TSSA Licensed: text-primary (blue - trust/professional)
  - 4.8 Star Rating: text-primary (blue - trust)
  - 10-Year Warranty: text-secondary (orange - emphasis)
- Added descriptive tooltips using title attribute (native browser tooltips):
  - 24/7 Emergency: "24/7 emergency service available across our service area"
  - TSSA Licensed: "TSSA Licensed #000076639116 - Technical Standards & Safety Authority certified"
  - Rating: "Rated 4.8 stars from 407 verified Google reviews"
  - Warranty: "10-year warranty on parts and labour for all new installations"
- Improved mobile stacking: gap-4 (mobile) → gap-6 (md+)
- CSS-only animations (no JavaScript):
  - Fade-up animation on load with staggered delays (100ms per badge)
  - Hover scale effect (scale-110)
  - Subtle pulse animation on icon hover
  - Respects prefers-reduced-motion for accessibility
- Increased icon size from h-4 w-4 to h-5 w-5 for better visibility
- Made text font-medium for better emphasis
- Added Props interface for class customization
- Build verified: 4.65s for 616 pages ✅ (under 5s target)
- No TypeScript errors

**Next Prompt**: "Continue Phase 6: Integrate all new components into homepage"

---

### Phase 6: Page Integration

#### ⏸️ Step 6.1: Integrate Components into Homepage
**Status**: PENDING
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/pages/index.astro`
**What to do**:
- Read current homepage structure
- Add new components in this order:
  1. HomeHero (existing - keep)
  2. **EmergencyCTABanner** (NEW)
  3. TrustBadges (existing - enhanced)
  4. ValuePropsGrid (existing - keep)
  5. **ServicesGrid** (NEW - show 6 featured services, 1 from each category)
  6. ServiceAreaMap (existing - keep)
  7. **TestimonialsCarousel** (NEW - replaces ReviewsSection)
  8. **CertificationsBadges** (NEW)
  9. **QuickQuoteCard** (NEW - sticky sidebar: `class="sticky top-20 hidden lg:block"`)
- Add **OrganizationSchema** component in the head (or after BaseLayout)
- Remove old ReviewsSection component
- Test build: `npm run build` - verify <5s

**Next Prompt**: "Continue Phase 6: Integrate components into service pages"

---

#### ⏸️ Step 6.2: Integrate Components into Service Pages
**Status**: PENDING
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/pages/services/[service].astro`
**What to do**:
- Read current service page structure
- Add new components in this order:
  1. ServiceHero (existing - keep)
  2. TrustBadges (existing - enhanced)
  3. **BenefitsSection** (NEW - load from serviceContent[service.slug].benefits)
  4. **CommonProblemsSection** (NEW - load from serviceContent[service.slug].problems, variant="accordion")
  5. ValuePropsGrid (existing - optional, keep if present)
  6. Markdown content (existing - keep)
  7. ProcessSteps (existing - optional, keep if present)
  8. **PricingTransparencySection** (NEW)
  9. **FAQAccordion** (use existing FAQAccordion component, load from faqsByService[service.slug] or generalFAQs)
  10. **RelatedServicesSection** (NEW - 3-4 related services)
  11. Final CTA (existing - keep)
  12. **QuickQuoteCard** (NEW - inline variant)
- Add **ServiceSchema** component in the head (pass service.title, service.description)
- Add conditional logic: if serviceContent[service.slug] exists, use it; otherwise show generic fallback
- Test build

**Next Prompt**: "Continue Phase 6: Integrate components into location pages"

---

#### ⏸️ Step 6.3: Integrate Components into Location Pages
**Status**: PENDING
**File**: `/Users/jagpalkooner/Desktop/HVAC/src/pages/locations/[location].astro` (Note: might be `src/pages/[location].astro`)
**What to do**:
- Read current location page structure
- Add new components in this order:
  1. LocationHero (existing - keep)
  2. **LocalTrustSignals** (NEW - pass location.name)
  3. Markdown content (existing - keep)
  4. **ServicesGrid** (NEW - replace basic grid with ServicesGrid component)
  5. **NeighborhoodsSection** (NEW - load from neighborhoods.ts[city])
  6. **TestimonialsCarousel** (NEW - filter by location if possible, or show all)
  7. CTA section (existing - PhoneCTA + BookingCTA - keep)
- Add **LocalBusinessSchema** component in the head (pass locationName, city, optional lat/long)
- Note: Geo coordinates for schema can use placeholders for now (will be added later)
- Test build

**Next Prompt**: "Continue Phase 6: Run build performance check and verify all pages render"

---

### Phase 7: Polish & Verification

#### ⏸️ Step 7.1: Build Performance Check
**Status**: PENDING
**Commands**:
```bash
npm run build
```
**What to verify**:
- ✅ Build completes in <5 seconds
- ✅ No errors or warnings
- ✅ All 616 pages generated successfully
- ✅ Bundle sizes reasonable (check dist/ folder)
- ✅ No broken imports or missing components

**Next Prompt**: "Continue Phase 6: Test dev server and verify visual design on all page types"

---

#### ⏸️ Step 7.2: Visual Polish & Responsive Design Testing
**Status**: PENDING
**What to do**:
- Start dev server: `npm run dev`
- Test on homepage:
  - ✅ All new components render correctly
  - ✅ Blue/orange colors applied throughout
  - ✅ CTAs are prominent and clickable
  - ✅ Hover effects work (cards, buttons, links)
  - ✅ Trust badges display with brand colors
- Test on service page:
  - ✅ Benefits section renders with icons
  - ✅ Common problems accordion works
  - ✅ FAQs load correctly
  - ✅ Related services show 3-4 cards
- Test on location page:
  - ✅ Local trust signals display
  - ✅ Neighborhoods list renders
  - ✅ Testimonials carousel works
- Test responsive breakpoints:
  - ✅ Mobile (375px - iPhone SE): All sections stack properly
  - ✅ Tablet (768px - iPad): Grid layouts adapt
  - ✅ Desktop (1440px): All components display as designed
- Check accessibility:
  - ✅ Color contrast (blue text on white, white text on blue)
  - ✅ Mobile touch targets (min 44x44px)
  - ✅ Keyboard navigation works

**Next Prompt**: "Continue Phase 6: Validate schema.org structured data"

---

#### ⏸️ Step 7.3: Schema.org Validation
**Status**: PENDING
**Tools**:
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/

**What to test**:
- Test homepage:
  - ✅ Visit Google Rich Results Test
  - ✅ Enter homepage URL (http://localhost:4322/)
  - ✅ Verify OrganizationSchema is valid
  - ✅ Verify HVACBusiness schema (existing from BaseLayout) is still valid
- Test service page (e.g., /services/furnace-installation):
  - ✅ Verify ServiceSchema is valid
  - ✅ Check service type, provider, area served
- Test location page (e.g., /locations/guelph):
  - ✅ Verify LocalBusinessSchema is valid
  - ✅ Check address, hours, geo coordinates (if present)
- Fix any validation errors

**Next Prompt**: "Continue Phase 6: Final link and CTA testing"

---

#### ⏸️ Step 7.4: Link & CTA Testing
**Status**: PENDING
**What to verify**:
- Homepage:
  - ✅ PhoneCTA uses correct phone number (+1 519-835-4858)
  - ✅ BookingCTA links to booking URL
  - ✅ ServiceCard links go to /services/{slug}
  - ✅ "View All Services" link works
  - ✅ QuickQuoteCard CTAs work
- Service pages:
  - ✅ RelatedServicesSection links work
  - ✅ FAQ accordion expands/collapses
  - ✅ ServiceSchema present in <head>
- Location pages:
  - ✅ ServicesGrid links to service-location pages
  - ✅ TestimonialsCarousel navigation works
  - ✅ LocalBusinessSchema present in <head>
- Global:
  - ✅ Google Reviews link works (footer)
  - ✅ Social media links work (footer)
  - ✅ Emergency CTA banner displays on mobile

**Next Prompt**: "Phase 6 complete! Ready to move to Phase 7 or make final adjustments"

---

## Success Criteria Checklist

### Visual Design
- [ ] Blue/orange HVAC color scheme applied throughout
- [ ] Professional, credible appearance
- [ ] Mobile-optimized and responsive
- [ ] Consistent typography and spacing
- [ ] Clear visual hierarchy

### Conversion Optimization
- [ ] Phone CTA above the fold on every page
- [ ] Emergency CTA banner prominent
- [ ] Trust signals displayed (certifications, reviews, warranties)
- [ ] Multiple conversion pathways (phone, booking, quote)
- [ ] QuickQuoteCard sticky on desktop

### Content & SEO
- [ ] Local relevance reinforced (city names, neighborhoods)
- [ ] Service benefits and problems addressed
- [ ] FAQs provide value and answer common questions
- [ ] Schema.org structured data for Organization, Service, LocalBusiness
- [ ] Testimonials build social proof

### Technical Performance
- [ ] Build time <5 seconds for 616 pages
- [ ] Minimal client-side JavaScript (mostly Astro SSG)
- [ ] Images optimized (lazy loading, proper sizes)
- [ ] No build errors or warnings

---

## Files Created So Far

### ✅ Completed Files (24/27)
1. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/styles/globals.css` (modified - colors)
2. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/content/config.ts` (modified - added TypeScript definitions + icon field)
3. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/OrganizationSchema.astro` (fixed TypeScript errors)
4. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/ServiceSchema.astro` (fixed TypeScript errors)
5. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/schema/LocalBusinessSchema.astro` (fixed TypeScript errors)
6. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/data/testimonials.ts`
7. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/data/faqs.ts`
8. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/data/serviceContent.ts` (pre-existing)
9. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/data/neighborhoods.ts`
10. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/TestimonialCard.astro`
11. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/ServiceCard.astro`
12. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/PricingCard.astro`
13. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/QuickQuoteCard.astro`
14. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cards/TestimonialCardReact.tsx`
15. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ServicesGrid.astro`
16. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/BenefitsSection.astro`
17. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/CommonProblemsSection.astro`
18. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/PricingTransparencySection.astro`
19. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/RelatedServicesSection.astro`
20. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/NeighborhoodsSection.astro`
21. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/LocalTrustSignals.astro`
22. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/CertificationsBadges.astro`
23. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/TestimonialsCarousel.astro`
24. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/ui/carousel.tsx`
25. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/cta/EmergencyCTABanner.astro` (pre-existing)
26. ✅ `/Users/jagpalkooner/Desktop/HVAC/src/components/TrustBadges.astro` (modified - enhanced)

### ⏸️ Pending Files (3/27)

**Foundation & Data Files**: All completed! ✅

**Card Components**: All completed! ✅

**Section Components**: All completed! ✅

**CTA Components**: All completed! ✅

**Component Enhancements**: All completed! ✅

**Page Modifications (3 remaining)**:
- ⏸️ `/Users/jagpalkooner/Desktop/HVAC/src/pages/index.astro` (modify - add components)
- ⏸️ `/Users/jagpalkooner/Desktop/HVAC/src/pages/services/[service].astro` (modify - add components)
- ⏸️ `/Users/jagpalkooner/Desktop/HVAC/src/pages/locations/[location].astro` (modify - add components)

**Optional (2)**:
- ⏸️ `/Users/jagpalkooner/Desktop/HVAC/src/data/maintenancePlans.ts` (optional - if creating dedicated page)
- ⏸️ Delete `/Users/jagpalkooner/Desktop/HVAC/src/components/sections/ReviewsSection.astro` (if fully replaced)

---

## Post-Implementation: Content Replacement Guide

Once Phase 6 is complete, the site owner should replace placeholder content with real data:

1. **Testimonials** (`src/data/testimonials.ts`)
   - Replace with real Google Reviews (manually curated or via API)
   - 10-15 best reviews covering all services and locations

2. **FAQs** (`src/data/faqs.ts`)
   - Update with real customer questions from emails/calls
   - Add seasonal FAQs (winter furnace issues, summer AC problems)

3. **Service Content** (`src/data/serviceContent.ts`)
   - Benefits: Owner's expertise on each service
   - Problems: Real issues customers report

4. **Neighborhoods** (`src/data/neighborhoods.ts`)
   - Actual service areas per city (verify with owner)

5. **Images**
   - Replace Unsplash placeholders with professional photos
   - Technicians in action, B.A.P branded vehicles, equipment installations, before/after shots

6. **Maintenance Plan Pricing**
   - Update PricingCard data with real tiers and pricing

7. **Certification Logos**
   - Replace text badges with real logos (TSSA, HRAI, BBB, WSIB)

8. **Geo Coordinates** (for location schema)
   - Add actual lat/long for each city in business profile or location data

---

## Notes

- **Forms**: Intentionally skipped per user request. Will be added in final step with backend integration.
- **Carousel Library**: CSS-only scroll-snap approach recommended for performance (no npm install needed). Embla Carousel is alternative if advanced features needed.
- **Placeholder Images**: Unsplash URLs provided. Can be replaced with `placehold.co` if Unsplash unavailable.
- **Dark Mode**: Color variables include dark mode variants. Pages will respect system preference automatically.
- **Accessibility**: All components use semantic HTML, proper contrast ratios, and keyboard navigation.
- **Build Performance**: Target is <5 seconds for 616 pages. Most components are Astro (static), only carousel might use React if Embla chosen.
