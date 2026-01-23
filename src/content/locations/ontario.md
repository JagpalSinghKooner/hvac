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
  title: "One Call Handles Everything"
  subtitle: "Permits. Rebates. Installation. Warranty. We manage the details so you don't have to."
  trustBadgeText: "Serving Southern Ontario Since 1994"
  rebateBadge:
    text: "Up to $7,500 in rebates available"
    deadline: "November 2026"  # Verified from docs/reference/rebate-deadlines.md (HRS program)
  answeringTeamText: "Call anytime — real people answer"

# ═══════════════════════════════════════════════════════════════
# SERVICE CATEGORIES SECTION
# Categories fetched from services collection
# Order customizable via serviceCategoryOrder array
# ═══════════════════════════════════════════════════════════════
serviceCategories:
  eyebrow: "Full-Service HVAC"
  headline: "Heating. Cooling. Water. Air Quality."
  subtext: "Every system. One contractor. One warranty."
  # serviceCategoryOrder: ["heating", "cooling", "air-quality", "water-heating", "commercial", "maintenance"]

# ═══════════════════════════════════════════════════════════════
# EXPERT CONSULTATION SECTION
# ═══════════════════════════════════════════════════════════════
expertConsultation:
  eyebrow: "Before You Decide"
  headline: "Talk to Someone Who Knows"
  subtext: "No scripts. No pressure. Just straight answers from licensed technicians."
  bullets:
    - "Honest assessment of what you actually need"
    - "Clear explanation of your options"
    - "Accurate phone estimates (no bait-and-switch)"
    - "We'll tell you if repair makes more sense"
  image:
    src: "/images/consultation-placeholder.jpg"
    alt: "HVAC technician explaining options to homeowner"

# ═══════════════════════════════════════════════════════════════
# WHY CHOOSE B.A.P SECTION — Bento Grid Layout
# NOTE: Stats (reviewCount, googleRating) come from profile.yaml
# Component reads profile.yaml directly — DO NOT duplicate here
# ═══════════════════════════════════════════════════════════════
whyChoose:
  eyebrow: "The Difference"
  headline: "Your Name Isn't on the Truck. Ours Is."
  subtext: "When something goes wrong, there's no finger-pointing. We own it."
  fullServiceBullets:
    - "Permits pulled and inspections scheduled"
    - "Rebate paperwork completed for you"
    - "Financing arranged if needed"
    - "Installation by our own certified team"
    - "10-year warranty on parts and labor"
  warrantyCard:
    headline: "10-Year Parts AND Labor"
    copy: "Most warranties cover parts only. Ours covers the work too. Because our name is on every job."

# ═══════════════════════════════════════════════════════════════
# TESTIMONIALS SECTION
# Uses existing filter logic (installation keyword filter)
# ═══════════════════════════════════════════════════════════════
testimonials:
  eyebrow: "From Our Customers"
  headline: "We Let Our Work Speak"
  subtext: "Real installations. Real homeowners. Real results."

# ═══════════════════════════════════════════════════════════════
# PROJECT GALLERY SECTION
# filterByLocation: false for homepage (shows all)
# filterByLocation: true for location pages (filters by city)
# ═══════════════════════════════════════════════════════════════
projectGallery:
  eyebrow: "Recent Work"
  headline: "Installations Across Southern Ontario"
  subtext: "From downtown Hamilton to rural Wellington County"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINANCING SECTION
# NOTE: rebateCard.emphasis displays via eyebrow-style treatment
# utilityProvider should match entry in docs/reference/utility-providers.md
# ═══════════════════════════════════════════════════════════════
financing:
  eyebrow: "Making It Work"
  headline: "Premium Equipment. Manageable Payments."
  subtext: "We'll help you access every rebate you qualify for — and handle the paperwork."
  rebateCard:
    utilityProvider: "Enbridge Gas & Save on Energy"
    rebateAmount: "Up to $7,500"
    emphasis: "WE FILE THE PAPERWORK"

# ═══════════════════════════════════════════════════════════════
# SERVICE AREA SECTION
# mapEmbed comes from business.yaml — NOT from location schema
# Homepage: showAllRegions=true | Location pages: showAllRegions=false
# ═══════════════════════════════════════════════════════════════
serviceArea:
  eyebrow: "Where We Work"
  headline: "25 Cities. 6 Regions. One Standard."
  subtext: "The same quality whether you're in Burlington or Brantford."
  showAllRegions: true
  currentCityHighlight: ""

# ═══════════════════════════════════════════════════════════════
# FAQ SECTION — Inline Items Only
# NO itemRefs pattern — FAQs are always inline in frontmatter
# Generates FAQPage JSON-LD schema for SEO
# ═══════════════════════════════════════════════════════════════
faq:
  eyebrow: "Common Questions"
  headline: "Straight Answers"
  subtext: "What homeowners ask us most"
  items:
    - question: "How long does installation take?"
      answer: "Most installations are completed in one day. Our crew arrives in the morning, and you'll have heat or cooling by evening. Complex jobs might take two days — we'll tell you upfront."
    - question: "Do you handle permits?"
      answer: "Yes. We pull all permits, schedule inspections, and handle the paperwork. You don't need to visit city hall or coordinate with inspectors."
    - question: "What rebates are available right now?"
      answer: "The Home Renovation Savings program offers $2,000 to $7,500 for heat pumps, depending on your current heating system. We identify every rebate you qualify for and file the applications."
    - question: "What does your warranty actually cover?"
      answer: "10 years on parts AND labor. Most warranties only cover parts — if something fails, you still pay for the service call. Ours covers everything. Our name is on the work."
    - question: "Can I get an estimate over the phone?"
      answer: "For most jobs, yes. We'll ask about your home, your current system, and what you're looking for. If we need to see the space, we'll tell you — but we don't use 'free estimates' as a sales tactic."
  showViewAllLink: true

# ═══════════════════════════════════════════════════════════════
# BLOG PREVIEW SECTION
# filterByLocation: false = show latest from all locations
# ═══════════════════════════════════════════════════════════════
blogPreview:
  eyebrow: "From the Blog"
  headline: "Make Informed Decisions"
  subtext: "Practical advice from our installation team"
  filterByLocation: false

# ═══════════════════════════════════════════════════════════════
# FINAL CTA SECTION
# Uses SectionHeader with variant="dark" for white text on primary bg
# ═══════════════════════════════════════════════════════════════
finalCta:
  eyebrow: "Ready to Talk?"
  headline: "One Call Starts the Process"
  subtext: "No obligation. No high-pressure sales. Just a conversation about what you need."
  bullets:
    - "Speak with a real person"
    - "Get a clear phone estimate"
    - "Ask anything — we'll give you straight answers"
    - "Schedule at your convenience"

# ═══════════════════════════════════════════════════════════════
# SCROLL BANNER — Persistent Element
# Triggers at 75% scroll depth, once per session (sessionStorage)
# ═══════════════════════════════════════════════════════════════
scrollBanner:
  text: "Questions? Call anytime — real people answer"
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
