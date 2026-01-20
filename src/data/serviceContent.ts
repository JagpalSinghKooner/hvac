/**
 * Service Content Data
 *
 * Benefits and common problems for major HVAC services.
 * Used by BenefitsSection and CommonProblemsSection components.
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Represents a benefit of a specific HVAC service
 */
export interface ServiceBenefit {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

/**
 * Represents a common problem and solution for a service
 */
export interface ServiceProblem {
  problem: string;
  solution: string;
  icon: string; // Lucide icon name
}

/**
 * Complete service content data structure
 */
export interface ServiceContentData {
  slug: string;
  benefits: ServiceBenefit[];
  problems: ServiceProblem[];
}

// ============================================================================
// Service Content Data
// ============================================================================

export const serviceContent: ServiceContentData[] = [
  // --------------------------------------------------------------------------
  // Furnace Installation
  // --------------------------------------------------------------------------
  {
    slug: 'furnace-installation',
    benefits: [
      {
        title: 'Energy Efficient Performance',
        description: 'Modern high-efficiency furnaces can save you 20-40% on heating costs compared to older models, reducing your monthly utility bills significantly.',
        icon: 'Zap',
      },
      {
        title: 'Reliable Winter Heating',
        description: 'New furnaces provide consistent, dependable heat throughout even the coldest Ontario winters, keeping your family comfortable and safe.',
        icon: 'ThermometerSun',
      },
      {
        title: 'Long-Term Warranty Coverage',
        description: 'Our installations include comprehensive 10-year parts and labour warranty, protecting your investment for years to come.',
        icon: 'Shield',
      },
      {
        title: 'Lower Utility Bills',
        description: 'High AFUE-rated furnaces convert more fuel into heat, meaning less waste and more savings on your monthly gas or electric bills.',
        icon: 'DollarSign',
      },
      {
        title: 'Quiet, Peaceful Operation',
        description: 'Modern furnaces feature advanced sound-dampening technology, operating quietly in the background without disruptive noise.',
        icon: 'Volume2',
      },
    ],
    problems: [
      {
        problem: 'Your old furnace is inefficient and costs too much to run',
        solution: 'We install high-efficiency furnaces with AFUE ratings up to 98%, dramatically reducing your energy consumption and heating costs.',
        icon: 'TrendingDown',
      },
      {
        problem: 'Frequent breakdowns and expensive repair bills',
        solution: 'A new furnace installation eliminates constant repairs and provides reliable heating backed by our 10-year warranty.',
        icon: 'AlertTriangle',
      },
      {
        problem: 'High heating bills eating into your budget',
        solution: 'Modern furnaces are 20-40% more efficient than units over 15 years old, translating to significant monthly savings.',
        icon: 'DollarSign',
      },
      {
        problem: 'Uneven heating with cold and hot spots throughout your home',
        solution: 'Our technicians perform proper load calculations and sizing to ensure even, comfortable heat distribution in every room.',
        icon: 'Thermometer',
      },
      {
        problem: 'Safety concerns with an aging furnace',
        solution: 'New furnaces include modern safety features like sealed combustion, automatic shutoffs, and carbon monoxide protection.',
        icon: 'ShieldAlert',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Furnace Repair
  // --------------------------------------------------------------------------
  {
    slug: 'furnace-repair',
    benefits: [
      {
        title: 'Same-Day Emergency Service',
        description: 'We understand furnace failures happen at the worst times. Our 24/7 emergency service means we can typically be at your door within 60-90 minutes.',
        icon: 'Clock',
      },
      {
        title: 'TSSA Certified Technicians',
        description: 'All our technicians are licensed by the Technical Standards and Safety Authority (TSSA), ensuring safe and compliant repairs every time.',
        icon: 'Award',
      },
      {
        title: 'Upfront, Transparent Pricing',
        description: 'We provide a detailed quote before starting any work—no hidden fees, no surprises, just honest pricing you can trust.',
        icon: 'FileText',
      },
      {
        title: 'All Major Brands Serviced',
        description: 'We repair all furnace makes and models including Carrier, Lennox, Trane, Goodman, Rheem, York, and more.',
        icon: 'Wrench',
      },
      {
        title: 'Warranty on All Repairs',
        description: 'Every repair comes with our workmanship guarantee and warranty on parts, giving you peace of mind after we leave.',
        icon: 'Shield',
      },
    ],
    problems: [
      {
        problem: 'No heat in the middle of winter',
        solution: 'Our technicians quickly diagnose issues like failed igniters, gas valve problems, or thermostat malfunctions and restore your heat fast.',
        icon: 'Snowflake',
      },
      {
        problem: 'Strange banging, rattling, or squealing noises',
        solution: 'We identify and replace worn components like blower motors, belts, bearings, or loose parts to eliminate disruptive sounds.',
        icon: 'Volume2',
      },
      {
        problem: 'Furnace won\'t ignite or start',
        solution: 'We repair or replace faulty ignition systems, pilot lights, flame sensors, and control boards to get your furnace running again.',
        icon: 'Flame',
      },
      {
        problem: 'Furnace blowing cold air instead of heat',
        solution: 'We diagnose thermostat issues, gas valve problems, or pilot light failures and restore proper heating operation.',
        icon: 'Wind',
      },
      {
        problem: 'Furnace running constantly with high utility bills',
        solution: 'We perform efficiency tune-ups, clean dirty filters, calibrate thermostats, and optimize your system for peak performance.',
        icon: 'TrendingUp',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Air Conditioner Installation
  // --------------------------------------------------------------------------
  {
    slug: 'air-conditioner-installation',
    benefits: [
      {
        title: 'Cool Comfort All Summer Long',
        description: 'Professional central air installation ensures your home stays consistently cool and comfortable during hot, humid Ontario summers.',
        icon: 'Snowflake',
      },
      {
        title: 'Energy-Efficient Cooling',
        description: 'High SEER-rated AC units use less electricity to cool your home, reducing your summer energy bills by up to 40%.',
        icon: 'Zap',
      },
      {
        title: 'Improved Indoor Air Quality',
        description: 'Modern air conditioners filter out dust, pollen, and allergens while controlling humidity, creating a healthier home environment.',
        icon: 'Wind',
      },
      {
        title: 'Increased Home Value',
        description: 'Central air conditioning is a highly desirable feature that can increase your property value and appeal to potential buyers.',
        icon: 'Home',
      },
      {
        title: 'Whisper-Quiet Operation',
        description: 'Today\'s air conditioners feature advanced sound-dampening technology, operating quietly both indoors and outdoors.',
        icon: 'Volume2',
      },
    ],
    problems: [
      {
        problem: 'No air conditioning during summer heatwaves',
        solution: 'We provide fast, professional AC installation with same-week service during peak season, getting you cool quickly.',
        icon: 'Sun',
      },
      {
        problem: 'Old, inefficient window units driving up electric bills',
        solution: 'Central air with SEER ratings of 16-20+ is far more efficient than window units, saving you money while cooling better.',
        icon: 'TrendingDown',
      },
      {
        problem: 'High cooling costs every summer',
        solution: 'Modern energy-efficient AC systems can cut your cooling costs by 30-40% compared to systems over 10 years old.',
        icon: 'DollarSign',
      },
      {
        problem: 'Uneven cooling with some rooms too hot',
        solution: 'We perform proper load calculations and ductwork assessment to ensure balanced, comfortable cooling throughout your entire home.',
        icon: 'Thermometer',
      },
      {
        problem: 'Multiple window units are unsightly and inefficient',
        solution: 'A single central air system provides superior cooling efficiency, better air quality, and a cleaner look inside and out.',
        icon: 'Home',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Air Conditioner Repair
  // --------------------------------------------------------------------------
  {
    slug: 'air-conditioner-repair',
    benefits: [
      {
        title: '24/7 Emergency AC Repair',
        description: 'When your AC fails during a heatwave, we\'re available around the clock with rapid response to restore your comfort.',
        icon: 'Clock',
      },
      {
        title: 'Licensed Refrigeration Technicians',
        description: 'Our TSSA-licensed technicians are certified to handle refrigerant safely and perform all AC repairs to industry standards.',
        icon: 'Award',
      },
      {
        title: 'All AC Brands Repaired',
        description: 'We service all major air conditioner brands including Carrier, Lennox, Trane, Goodman, Rheem, Amana, and more.',
        icon: 'Wrench',
      },
      {
        title: 'Fixed-Rate Pricing',
        description: 'Know the cost upfront with our transparent, fixed-rate pricing—no surprises, no hidden charges.',
        icon: 'FileText',
      },
      {
        title: 'Parts Warranty Included',
        description: 'All replacement parts come with manufacturer warranties, and our workmanship is guaranteed for your peace of mind.',
        icon: 'Shield',
      },
    ],
    problems: [
      {
        problem: 'AC not cooling or blowing warm air',
        solution: 'We diagnose and fix refrigerant leaks, compressor failures, or thermostat issues to restore cold air flow throughout your home.',
        icon: 'AlertTriangle',
      },
      {
        problem: 'Frozen evaporator coil covered in ice',
        solution: 'We identify airflow restrictions, refrigerant issues, or dirty filters causing freeze-ups and restore proper operation.',
        icon: 'Snowflake',
      },
      {
        problem: 'Water leaking inside your home',
        solution: 'We clear clogged condensate drain lines, repair drain pans, and fix drainage issues to prevent water damage.',
        icon: 'Droplet',
      },
      {
        problem: 'Weak airflow from vents',
        solution: 'We repair or replace failed blower motors, clean dirty coils, and address ductwork issues to restore strong airflow.',
        icon: 'Wind',
      },
      {
        problem: 'Strange odors or burning smells from AC',
        solution: 'We clean dirty coils, replace burnt wiring, and eliminate mold or bacteria causing unpleasant odors in your system.',
        icon: 'AlertCircle',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Heat Pump
  // --------------------------------------------------------------------------
  {
    slug: 'heat-pump',
    benefits: [
      {
        title: 'Heating and Cooling in One System',
        description: 'Heat pumps provide both heating and air conditioning, eliminating the need for separate furnace and AC units.',
        icon: 'RefreshCw',
      },
      {
        title: 'Significantly Lower Energy Costs',
        description: 'Heat pumps move heat rather than generate it, using 50-70% less energy than traditional heating systems for substantial savings.',
        icon: 'DollarSign',
      },
      {
        title: 'Eco-Friendly Technology',
        description: 'Electric heat pumps produce zero on-site emissions and have a much smaller carbon footprint than gas furnaces.',
        icon: 'Leaf',
      },
      {
        title: 'Government Rebates Available',
        description: 'Take advantage of federal and provincial rebates for heat pump installations, reducing your upfront investment significantly.',
        icon: 'BadgePercent',
      },
      {
        title: 'Year-Round Comfort',
        description: 'Modern cold-climate heat pumps work efficiently even in Ontario\'s harsh winters, providing consistent comfort in all seasons.',
        icon: 'ThermometerSun',
      },
      {
        title: 'Long Lifespan with Proper Maintenance',
        description: 'Quality heat pumps last 15-20 years with regular maintenance, providing reliable heating and cooling for decades.',
        icon: 'Clock',
      },
    ],
    problems: [
      {
        problem: 'High heating and cooling bills year-round',
        solution: 'Heat pumps can reduce your energy costs by 50-70% compared to traditional systems, saving thousands over the system\'s lifetime.',
        icon: 'TrendingUp',
      },
      {
        problem: 'Need to replace both furnace and air conditioner',
        solution: 'A single heat pump replaces both systems, providing heating and cooling at a lower total cost than two separate units.',
        icon: 'RefreshCw',
      },
      {
        problem: 'Old HVAC system is inefficient and outdated',
        solution: 'Modern heat pumps offer superior efficiency and comfort compared to aging furnaces and AC units, with significant energy savings.',
        icon: 'Zap',
      },
      {
        problem: 'Concerned about heat pump performance in cold winters',
        solution: 'Today\'s cold-climate heat pumps work efficiently down to -25°C, with backup heating for extreme cold snaps.',
        icon: 'Snowflake',
      },
      {
        problem: 'Want to reduce your home\'s environmental impact',
        solution: 'Heat pumps are the most eco-friendly HVAC option, using renewable electricity and producing zero on-site emissions.',
        icon: 'Leaf',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Boiler
  // --------------------------------------------------------------------------
  {
    slug: 'boiler',
    benefits: [
      {
        title: 'Consistent Radiant Heat',
        description: 'Boilers provide even, comfortable radiant heat through radiators or in-floor systems, eliminating cold spots and drafts.',
        icon: 'ThermometerSun',
      },
      {
        title: 'Energy-Efficient Heating',
        description: 'Modern high-efficiency boilers convert up to 98% of fuel into heat, wasting very little energy and reducing your heating costs.',
        icon: 'Zap',
      },
      {
        title: 'Quiet, Peaceful Operation',
        description: 'Unlike forced-air systems, boilers operate silently without noisy blowers or air rushing through ducts.',
        icon: 'Volume2',
      },
      {
        title: 'Cleaner Indoor Air',
        description: 'Boilers don\'t circulate air through ducts, meaning less dust, allergens, and airborne particles in your home.',
        icon: 'Wind',
      },
      {
        title: 'Long Equipment Lifespan',
        description: 'Quality boilers can last 20-30 years with proper maintenance, providing decades of reliable heating service.',
        icon: 'Clock',
      },
    ],
    problems: [
      {
        problem: 'Boiler not producing heat',
        solution: 'We diagnose and repair pilot light failures, gas valve issues, circulator pump problems, or control malfunctions to restore heat.',
        icon: 'Flame',
      },
      {
        problem: 'Leaking boiler or pooling water',
        solution: 'We identify and repair leaking seals, valves, or pressure relief valves, and assess whether tank replacement is needed.',
        icon: 'Droplet',
      },
      {
        problem: 'Radiators staying cold while boiler runs',
        solution: 'We balance your hydronic system, bleed air from radiators, and repair circulation pumps to restore proper heat distribution.',
        icon: 'Thermometer',
      },
      {
        problem: 'High heating costs with an old boiler',
        solution: 'We can upgrade you to a high-efficiency condensing boiler that uses 20-30% less fuel than older conventional models.',
        icon: 'DollarSign',
      },
      {
        problem: 'Loud banging, kettling, or gurgling noises',
        solution: 'We flush sediment buildup, repair circulation pumps, replace faulty valves, and restore quiet operation to your boiler system.',
        icon: 'Volume2',
      },
    ],
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get content for a specific service by slug
 *
 * @param slug - Service slug (e.g., 'furnace-installation')
 * @returns Service content data or undefined if not found
 */
export function getServiceContent(slug: string): ServiceContentData | undefined {
  return serviceContent.find(s => s.slug === slug);
}

/**
 * Get all service benefits across all services
 *
 * @returns Array of all benefits
 */
export function getAllBenefits(): ServiceBenefit[] {
  return serviceContent.flatMap(s => s.benefits);
}

/**
 * Get all service problems across all services
 *
 * @returns Array of all problems
 */
export function getAllProblems(): ServiceProblem[] {
  return serviceContent.flatMap(s => s.problems);
}

/**
 * Check if content exists for a specific service
 *
 * @param slug - Service slug to check
 * @returns True if content exists, false otherwise
 */
export function hasServiceContent(slug: string): boolean {
  return serviceContent.some(s => s.slug === slug);
}
