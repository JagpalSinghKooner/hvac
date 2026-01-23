---
title: "Southern Ontario"
description: "B.A.P Heating & Cooling provides full-service HVAC installations across Southern Ontario. One call handles permits, rebates, and warranty."
region: "Southern Ontario"
province: "ON"
seoTitle: "B.A.P Heating & Cooling | Full-Service HVAC Contractor | Southern Ontario"
seoDescription: "Premium HVAC installation for Southern Ontario homes. One call handles permits, rebates, and warranty."
workflowStatus: "draft"

# ═══════════════════════════════════════════════════════════════
# HOMEPAGE FLAG
# When true, this entry is excluded from location listings
# ═══════════════════════════════════════════════════════════════
isLandingPage: true

# ═══════════════════════════════════════════════════════════════
# HERO SECTION
# NOTE: Hero is STANDALONE — does NOT use SectionHeader component
# Uses 'title' for H1 (not 'headline' like other sections)
# ═══════════════════════════════════════════════════════════════
hero:
  title: "Southern Ontario's Full-Service HVAC Contractor"
  subtitle: "One call handles everything — permits, rebates, installation, warranty."
  trustBadgeText: "Google A+ Rated"
  rebateBadge:
    text: "Up to $7,500 in rebates available"
    deadline: "November 2026"  # Verified from docs/reference/rebate-deadlines.md (HRS program)
  answeringTeamText: "Call anytime — we have a live answering team"

# ═══════════════════════════════════════════════════════════════
# SERVICE CATEGORIES SECTION
# Categories fetched from services collection
# Order customizable via serviceCategoryOrder array
# ═══════════════════════════════════════════════════════════════
serviceCategories:
  eyebrow: "Our Services"
  headline: "Complete HVAC Services for Your Home"
  subtext: "From installation to maintenance — we handle it all."
  # serviceCategoryOrder: ["heating", "cooling", "air-quality", "water-heating", "commercial", "maintenance"]

# ═══════════════════════════════════════════════════════════════
# EXPERT CONSULTATION SECTION
# ═══════════════════════════════════════════════════════════════
expertConsultation:
  eyebrow: "Free Consultation"
  headline: "Not Sure What You Need?"
  subtext: "Talk to our experts for guidance — no pressure, no obligation."
  bullets:
    - "Free Phone Estimates"
    - "No Obligation — No Pressure"
    - "Licensed & Certified Technicians"
    - "Expert Guidance on Options"
  image:
    src: "/images/consultation-placeholder.jpg"
    alt: "Friendly HVAC technician providing phone consultation"

# ═══════════════════════════════════════════════════════════════
# WHY CHOOSE B.A.P SECTION — Bento Grid Layout
# NOTE: Stats (reviewCount, googleRating) come from profile.yaml
# Component reads profile.yaml directly — DO NOT duplicate here
# ═══════════════════════════════════════════════════════════════
whyChoose:
  eyebrow: "Why Choose Us"
  headline: "Why Homeowners Choose B.A.P"
  subtext: "Full-service HVAC — one call handles everything"
  fullServiceBullets:
    - "Permits & inspections handled"
    - "Government rebate paperwork completed"
    - "Financing coordination included"
    - "Professional installation by certified technicians"
    - "10-year parts & labor warranty"
  warrantyCard:
    headline: "10-Year Warranty"
    copy: "Parts AND labor. Our name is on every job — we stand behind our work."

# ═══════════════════════════════════════════════════════════════
# TESTIMONIALS SECTION
# Uses existing filter logic (installation keyword filter)
# ═══════════════════════════════════════════════════════════════
testimonials:
  eyebrow: "Customer Stories"
  headline: "What Our Customers Say"
  subtext: "Real experiences from homeowners across Southern Ontario"

# ═══════════════════════════════════════════════════════════════
# PROJECT GALLERY SECTION
# filterByLocation: false for homepage (shows all)
# filterByLocation: true for location pages (filters by city)
# ═══════════════════════════════════════════════════════════════
projectGallery:
  eyebrow: "Our Work"
  headline: "Recent Projects"
  subtext: "Quality installations across Southern Ontario"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINANCING SECTION
# NOTE: rebateCard.emphasis displays via eyebrow-style treatment
# utilityProvider should match entry in docs/reference/utility-providers.md
# ═══════════════════════════════════════════════════════════════
financing:
  eyebrow: "Flexible Financing"
  headline: "Make Premium Comfort Affordable"
  subtext: "Multiple financing options to fit your budget."
  rebateCard:
    utilityProvider: "Enbridge Gas & Save on Energy"
    rebateAmount: "Up to $7,500"
    emphasis: "WE HANDLE THE PAPERWORK"

# ═══════════════════════════════════════════════════════════════
# SERVICE AREA SECTION
# mapEmbed comes from business.yaml — NOT from location schema
# Homepage: showAllRegions=true | Location pages: showAllRegions=false
# ═══════════════════════════════════════════════════════════════
serviceArea:
  eyebrow: "Service Area"
  headline: "Proudly Serving Southern Ontario"
  subtext: "25 cities across 6 regions"
  showAllRegions: true
  currentCityHighlight: ""

# ═══════════════════════════════════════════════════════════════
# FAQ SECTION — Inline Items Only
# NO itemRefs pattern — FAQs are always inline in frontmatter
# Generates FAQPage JSON-LD schema for SEO
# ═══════════════════════════════════════════════════════════════
faq:
  eyebrow: "Common Questions"
  headline: "Frequently Asked Questions"
  subtext: "Quick answers to help you make an informed decision"
  items:
    - question: "How long does a furnace installation take?"
      answer: "Most furnace installations are completed in one day. Our team arrives in the morning and you'll have heat by evening."
    - question: "Do you handle permit applications?"
      answer: "Yes — we handle all permits and inspections. It's part of our full-service approach."
    - question: "What rebates are currently available?"
      answer: "Ontario homeowners can access significant rebates through the Home Renovation Savings program. Heat pump rebates range from $2,000 (gas-heated homes) to $7,500 (electric-heated homes). We help you apply for all eligible programs and handle the paperwork."
    - question: "Do you offer financing?"
      answer: "Yes — we offer flexible financing options with competitive rates. Ask about our monthly payment plans."
  showViewAllLink: true

# ═══════════════════════════════════════════════════════════════
# BLOG PREVIEW SECTION
# filterByLocation: false = show latest from all locations
# ═══════════════════════════════════════════════════════════════
blogPreview:
  eyebrow: "From Our Blog"
  headline: "HVAC Tips & Advice from the Experts"
  subtext: "Expert guidance to help you make informed decisions"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINAL CTA SECTION
# Uses SectionHeader with variant="dark" for white text on primary bg
# ═══════════════════════════════════════════════════════════════
finalCta:
  eyebrow: "Get Started"
  headline: "Get Your Free Installation Estimate"
  subtext: "No obligation • Same-day response • 10-year warranty"
  bullets:
    - "Free in-home consultation"
    - "No-pressure estimate"
    - "Licensed & insured technicians"
    - "Financing options available"

# ═══════════════════════════════════════════════════════════════
# SCROLL BANNER — Persistent Element
# Triggers at 75% scroll depth, once per session (sessionStorage)
# ═══════════════════════════════════════════════════════════════
scrollBanner:
  text: "Questions? Call anytime — we have a live answering team"
  ctaText: "Call Now"
  enabled: true

# ═══════════════════════════════════════════════════════════════
# EXPERIENCE STATS — E-E-A-T Credibility
# ═══════════════════════════════════════════════════════════════
experienceStats:
  installationsInCity: 2500
---

B.A.P Heating & Cooling provides full-service HVAC installations across Southern Ontario. Our team handles everything from permits to rebate paperwork, so you can focus on enjoying your new heating and cooling system.

Whether you need a new furnace, air conditioner, heat pump, or water heater, we deliver premium installation with a 10-year parts and labor warranty. One call truly handles everything.
