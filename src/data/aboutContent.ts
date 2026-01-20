import type { ServiceBenefit } from './serviceContent';

/**
 * Company Story Content for About Page
 */
export const companyStory = {
  founding: `Founded in 1994, B.A.P Heating & Cooling Services Ltd was built on a simple but powerful principle: treat every customer's home like it's your own. For over 30 years, we've served homeowners and businesses across Southern Ontario with honest, professional HVAC service that puts people before profit.

What started as a small operation in Guelph has grown into a trusted name serving 25 communities across Wellington County, Waterloo Region, Halton, Hamilton, and beyond. Our growth hasn't come from aggressive marketing—it's come from referrals, repeat customers, and a reputation for doing things right the first time.

Today, under the leadership of owner Paul Palmer, we remain a family-owned business committed to the same values that built our reputation: quality workmanship, transparent pricing, and service you can count on 24 hours a day, 7 days a week.`,

  mission: `Our mission is simple: deliver reliable, professional HVAC service with honesty and integrity. We believe in clear communication, transparent pricing, and doing the work that's truly needed—nothing more, nothing less.`,

  commitment: `Every technician on our team is TSSA licensed, fully trained, and equipped to handle any HVAC challenge. We service all major brands, stand behind our work with a 10-year warranty, and maintain the highest standards of professionalism in every customer interaction.`
};

/**
 * Core Company Values - Customer Pain Point Focused
 * Addresses common concerns: upselling, quality, pricing surprises, local trust
 */
export const coreValues: ServiceBenefit[] = [
  {
    title: 'Honest Communication, No Upselling',
    description: 'We recommend what you actually need, not what makes us the most money. If a repair will solve your problem, we\'ll tell you—even if a replacement would be more profitable for us.',
    icon: 'MessageCircle'
  },
  {
    title: 'Quality Workmanship, Built to Last',
    description: 'Every installation and repair is completed to manufacturer specifications and Ontario building codes. We don\'t cut corners—we do it right the first time, backed by our 10-year warranty.',
    icon: 'Award'
  },
  {
    title: 'Transparent Pricing, No Surprises',
    description: 'You\'ll know exactly what the work will cost before we start. No hidden fees, no after-hours surcharges, no fine print. We explain your options clearly so you can make informed decisions.',
    icon: 'FileText'
  },
  {
    title: 'Locally Owned, Community Focused',
    description: 'We live and work in the communities we serve. When you call B.A.P Heating, you\'re supporting a local business that employs your neighbors and contributes to Southern Ontario\'s economy.',
    icon: 'Heart'
  }
];

/**
 * Competitive Advantages - Tangible Differentiators
 * Specific, measurable claims that set B.A.P apart
 */
export const competitiveAdvantages: ServiceBenefit[] = [
  {
    title: '30 Years of Local Experience',
    description: 'Since 1994, we\'ve been serving Southern Ontario with professional HVAC service. Three decades of experience means we\'ve seen it all—and know how to fix it right.',
    icon: 'Calendar'
  },
  {
    title: 'True 24/7 Availability',
    description: 'Real people answer our phones day and night, 365 days a year. No voicemail, no waiting until Monday. When you have an emergency, we respond—typically within 60 minutes.',
    icon: 'Clock'
  },
  {
    title: 'All Major Brands Serviced',
    description: 'We service and install all major HVAC brands. You\'re not locked into one manufacturer, giving you more options and better value for your specific needs and budget.',
    icon: 'Wrench'
  },
  {
    title: 'Industry-Leading 10-Year Warranty',
    description: 'Our 10-year warranty on parts and labour is one of the best in the industry. We stand behind our work because we know it\'s done right.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Licensed & Fully Insured',
    description: 'TSSA Licensed (#000076639116), HRAI Certified, and fully insured with maximum coverage. Your home and investment are protected when you work with us.',
    icon: 'Shield'
  },
  {
    title: 'Extensive Southern Ontario Coverage',
    description: 'We serve 25 cities across Wellington County, Waterloo Region, Halton, Peel, Hamilton, Brant, and Dufferin County. Fast, local service wherever you are.',
    icon: 'MapPin'
  }
];
