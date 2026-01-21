import { defineCollection, z } from 'astro:content';

// ============================================================================
// 1. BUSINESS COLLECTION (Data - Single Profile)
// ============================================================================
const business = defineCollection({
  type: 'data',
  schema: z.object({
    business: z.object({
      legal_name: z.string(),
      trading_name: z.string().nullable().optional(),
      established_year: z.number(),
      owner_public: z.object({
        name: z.string(),
        roles: z.array(z.string()).optional(),
      }),
      tone: z
        .object({
          style: z.string(),
          language: z.string(),
          avoid_words: z.array(z.string()).optional(),
          seo_note: z.string().optional(),
        })
        .optional(),
    }),
    contact: z.object({
      phone_display: z.string(),
      phone_e164: z.string(),
      email: z.string(),
      primary_cta: z
        .object({
          short: z.string(),
          long: z.string(),
        })
        .optional(),
      booking: z
        .object({
          enabled: z.boolean(),
          provider: z.string(),
          url: z.string(),
        })
        .optional(),
    }),
    hours: z.object({
      business_hours: z.string(),
      emergency_service: z.boolean(),
      phone_answered_24_7: z.boolean(),
      target_response_time_minutes: z.number(),
      response_time_statement: z.string().optional(),
    }),
    locations: z
      .object({
        primary: z.object({
          name: z.string(),
          address_full: z.string(),
          city: z.string(),
          province: z.string(),
          postal_code: z.string(),
          country: z.string(),
          phone_e164: z.string(),
          email: z.string(),
          google_maps_embed: z.string().optional(),
        }),
        secondary: z
          .object({
            name: z.string(),
            address_full: z.string(),
            city: z.string(),
            province: z.string(),
            postal_code: z.string(),
            country: z.string(),
            phone_e164: z.string(),
            email: z.string(),
          })
          .optional(),
      })
      .optional(),
    services: z
      .object({
        notes: z.array(z.string()).optional(),
        navbar_categories: z.array(
          z.object({
            name: z.string(),
            key: z.string(),
          })
        ).optional(),
        list: z.record(
          z.array(
            z.object({
              title: z.string(),
              slug: z.string(),
            })
          )
        ),
      })
      .optional(),
    coverage: z.object({
      service_model: z.string().optional(),
      exclusions: z.array(z.string()).optional(),
      regions_enabled: z.boolean().optional(),
      regions: z.array(
        z.object({
          name: z.string(),
          slug: z.string().optional(),
          locations: z.array(
            z.object({
              name: z.string(),
              slug: z.string(),
            })
          ),
        })
      ),
    }),
    brands_and_capability: z
      .object({
        install_brands: z.string().optional(),
        service_brands: z.string().optional(),
        certifications_statement: z.string().optional(),
        rooftop_units_industries: z.string().optional(),
        project_types: z.string().optional(),
      })
      .optional(),
    trust_and_compliance: z
      .object({
        licenses: z
          .object({
            note: z.string().optional(),
            tssa: z
              .object({
                numbers: z.array(z.string()).optional(),
              })
              .optional(),
            other: z.array(z.string()).optional(),
          })
          .optional(),
        wsib: z.boolean().optional(),
        insured_statement: z.string().optional(),
      })
      .optional(),
    pricing_and_offers: z
      .object({
        estimates_free: z.boolean().optional(),
        diagnostic_free: z.boolean().optional(),
        financing: z
          .object({
            available: z.boolean().optional(),
            statement: z.string().optional(),
          })
          .optional(),
        rebates: z
          .object({
            paperwork_supported: z.boolean().optional(),
            statement: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    warranty_and_guarantees: z
      .object({
        warranty_statement: z.string().optional(),
        guarantee_primary: z
          .object({
            title: z.string().optional(),
            copy: z.string().optional(),
          })
          .optional(),
        guarantee_secondary: z
          .object({
            title: z.string().optional(),
            copy: z.string().optional(),
          })
          .optional(),
        transparency_policy: z.boolean().optional(),
      })
      .optional(),
    reputation: z.object({
      google_rating: z.number(),
      google_review_count: z.number(),
      review_statement: z.string().optional(),
      live_reviews: z
        .object({
          enabled: z.boolean().optional(),
          note: z.string().optional(),
        })
        .optional(),
    }),
    social: z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      youtube: z.string().optional(),
    }),
    warranty: z
      .object({
        parts_and_labour_years: z.number().optional(),
        statement: z.string().optional(),
      })
      .optional(),
    seo_url_rules: z
      .object({
        combined_pages: z
          .object({
            suffix: z.string().optional(),
            example: z.string().optional(),
            rule: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    copy_blocks: z.object({
      short_description: z.string(),
      long_description: z.string().optional(),
      primary_cta_copy: z.string().optional(),
      secondary_cta_copy: z.string().optional(),
      trust_highlights: z.array(z.string()).optional(),
      about_us_owner_mention: z.string().optional(),
      service_in_city_intro_template: z.string().optional(),
      locations_page_intro: z.string().optional(),
      services_page_intro: z.string().optional(),
    }),
  }),
});

// ============================================================================
// 2. SERVICES COLLECTION (Content - MVP Schema)
// ============================================================================
const services = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED core fields
    title: z.string(),
    description: z.string(),
    category: z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans']),
    status: z.enum(['live', 'draft']),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // OPTIONAL metadata fields
    priority: z.boolean().optional(),
    order: z.number().optional(),
    icon: z.string().optional(),  // Lucide icon name for ServiceCard
    serviceType: z.enum(['installation', 'repair', 'maintenance', 'service']).optional(),

    // OPTIONAL complex nested fields (exist in content, but not strictly enforced)
    valueProps: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),

    problems: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      )
      .optional(),

    approach: z
      .object({
        headline: z.string(),
        description: z.string(),
        quote: z.string().optional(),
        quotePerson: z.string().optional(),
      })
      .optional(),

    processSteps: z
      .array(
        z.object({
          step: z.number(),
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),

    savings: z
      .object({
        headline: z.string(),
        bullets: z.array(z.string()).optional(),
        description: z.string().optional(),
        rebateInfo: z.string().optional(),
        financingNote: z.string().optional(),
      })
      .optional(),

    guarantee: z
      .object({
        items: z
          .array(
            z.union([
              z.string(),
              z.object({
                title: z.string(),
                description: z.string(),
              }),
            ])
          )
          .optional(),
      })
      .optional(),

    images: z
      .array(
        z.union([
          z.string(),
          z.object({
            src: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        ])
      )
      .optional(),

    // Additional optional fields for extended content
    inclusions: z
      .object({
        equipment: z.array(z.string()).optional(),
        labour: z.array(z.string()).optional(),
        warranty: z.array(z.string()).optional(),
        extras: z.array(z.string()).optional(),
      })
      .optional(),

    // Phase 6B: Problem → Solution narrative flow
    problemStatement: z
      .object({
        headline: z.string(),
        description: z.string(),
        painPoints: z.array(z.string()).optional(),
      })
      .optional(),

    solutionApproach: z
      .object({
        headline: z.string(),
        description: z.string(),
        differentiators: z.array(z.string()).optional(),
      })
      .optional(),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 3. LOCATIONS COLLECTION (Content)
// ============================================================================
const locations = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    title: z.string(),
    description: z.string(),
    region: z.string(),
    province: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 4. REGIONS COLLECTION (Content)
// ============================================================================
const regions = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    title: z.string(),
    description: z.string(),
    primaryCity: z.string(),
    cities: z.array(z.string()),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // OPTIONAL fields
    robots: z.string().optional(),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 5. BLOG COLLECTION (Content)
// ============================================================================
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(), // Coerce string dates to Date objects
    author: z.string(),
    category: z.string(), // MVP: Accept any category string

    // OPTIONAL SEO fields (may be auto-generated or missing in MVP)
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),

    // OPTIONAL fields
    featured: z.boolean().optional(),
    image: z.string().optional(), // Path to image

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 6. FAQS COLLECTION (Content)
// ============================================================================
const faqs = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    question: z.string(),
    answer: z.string(),
    scopes: z.array(z.string()), // e.g., ["service:furnace-installation"]
    priority: z.number(),
    status: z.enum(['live', 'draft']),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 7. CASE STUDIES COLLECTION (Content)
// ============================================================================
const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    title: z.string(),
    serviceSlug: z.string(),
    locationSlug: z.string(),

    // Problem section
    problem: z.object({
      headline: z.string(),
      description: z.string(),
      details: z.array(z.string()).optional(),
    }),

    // Solution section
    solution: z.object({
      headline: z.string(),
      description: z.string(),
      equipment: z.string().optional(),
    }),

    // Results section
    results: z.object({
      headline: z.string(),
      stats: z
        .array(
          z.object({
            value: z.string(),
            label: z.string(),
          })
        )
        .optional(),
    }),

    // Testimonial
    testimonial: z.object({
      text: z.string(),
      authorName: z.string(),
      location: z.string(),
    }),

    // OPTIONAL metadata
    featured: z.boolean().optional(),
    priority: z.number().optional(),
    status: z.enum(['live', 'draft']).optional(),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 8. REVIEWS COLLECTION (Data - YAML files)
// ============================================================================
const reviews = defineCollection({
  type: 'data',
  schema: z.object({
    // REQUIRED fields
    source: z.enum(['manual', 'google', 'facebook', 'homestars', 'other']),
    verified: z.boolean(),
    authorName: z.string(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    serviceSlug: z.string(),
    reviewDate: z.string(), // ISO date string
    status: z.enum(['live', 'draft']),
    priority: z.number(),

    // OPTIONAL fields
    citySlug: z.string().optional(), // Optional for placeholder reviews

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 9. SERVICE-CITY COLLECTION (Content - Hybrid Pages)
// ============================================================================
const serviceCity = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    serviceSlug: z.string(),
    locationSlug: z.string(),
    title: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),

    // OPTIONAL local context
    localContext: z.string().optional(), // Markdown content for local context

    // OPTIONAL local proof (testimonial)
    localProof: z
      .object({
        testimonial: z.string(),
        customerName: z.string(),
        customerLocation: z.string(),
        result: z.string().optional(),
      })
      .optional(),

    // Workflow fields
    workflowStatus: z.enum(['published', 'draft', 'review']),
    reviewedBy: z.string().optional(),
    reviewedDate: z.string().optional(),
    approvedBy: z.string().optional(),
    approvedDate: z.string().optional(),
  }),
});

// ============================================================================
// 10. SEASONAL MESSAGES COLLECTION (Content)
// ============================================================================
const seasonalMessages = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    season: z.enum(['winter', 'spring', 'summer', 'fall']),
    startDate: z.string(), // Format: "MM-DD"
    endDate: z.string(), // Format: "MM-DD"
    message: z.string(),
    icon: z.string(),
    enabled: z.boolean(),

    // OPTIONAL fields (MVP)
    categories: z.array(z.enum(['heating', 'cooling', 'iaq', 'water-heating', 'commercial', 'plans'])).optional(),
  }),
});

// ============================================================================
// 11. SERVICE CATEGORIES COLLECTION (Content)
// ============================================================================
const serviceCategories = defineCollection({
  type: 'content',
  schema: z.object({
    // REQUIRED fields
    title: z.string(),
    description: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    order: z.number(),

    // OPTIONAL fields
    icon: z.string().optional(), // Lucide icon name
  }),
});

// ============================================================================
// EXPORT ALL COLLECTIONS
// ============================================================================
export const collections = {
  business,
  services,
  locations,
  regions,
  blog,
  faqs,
  'case-studies': caseStudies,
  reviews,
  'service-city': serviceCity,
  'seasonal-messages': seasonalMessages,
  'service-categories': serviceCategories,
};
