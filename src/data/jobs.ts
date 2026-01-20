/**
 * Jobs Data
 *
 * Current job openings at B.A.P Heating & Cooling Services Ltd.
 * Used for careers page and job listing components.
 */

import type { ServiceBenefit } from '@/data/serviceContent';

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Job posting interface
 */
export interface Job {
  id: string;
  title: string;
  department: 'Installation' | 'Service & Repair' | 'Administration' | 'Sales';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  benefits: string[];
  salary?: string;
  postedDate?: string; // ISO format (YYYY-MM-DD)
  applicationUrl?: string;
}

// ============================================================================
// Job Listings
// ============================================================================

export const jobs: Job[] = [
  {
    id: 'hvac-installation-tech-2026-01',
    title: 'HVAC Installation Technician',
    department: 'Installation',
    location: 'Guelph, Cambridge, and surrounding areas',
    type: 'Full-time',
    description: 'B.A.P Heating & Cooling Services Ltd is seeking an experienced HVAC Installation Technician to join our growing team. This role involves installing residential and commercial heating, cooling, and ventilation systems across Southern Ontario. As a family-owned business serving the community since 1994, we take pride in delivering quality workmanship and exceptional customer service. You will work with a skilled team installing furnaces, air conditioners, heat pumps, boilers, and ductwork for homeowners and businesses who trust us with their comfort.',
    responsibilities: [
      'Install residential and commercial HVAC systems including furnaces, air conditioners, heat pumps, boilers, and ductless mini-splits according to manufacturer specifications and Ontario building codes',
      'Perform ductwork installation and modification using sheet metal and flex duct systems, ensuring proper sizing and airflow',
      'Run and connect refrigerant lines, including soldering, brazing, and pressure testing to prevent leaks',
      'Wire low-voltage and line-voltage electrical connections for thermostats, control boards, and HVAC equipment',
      'Connect natural gas and propane lines to heating equipment following TSSA guidelines and safety protocols',
      'Conduct system start-ups, commission new installations, and verify proper operation before customer handoff',
      'Explain system operation and maintenance to customers in clear, professional language',
      'Maintain clean and safe work sites, respecting customer homes and properties at all times',
    ],
    qualifications: [
      'Valid TSSA G2 or G3 Gas Technician license (required)',
      '313A or 313D certification (Refrigeration and Air Conditioning Systems Mechanic) preferred',
      'Minimum 2-4 years of hands-on HVAC installation experience in residential or commercial settings',
      'Strong understanding of refrigeration cycles, airflow principles, and heating/cooling systems',
      'Ability to read and interpret blueprints, technical manuals, and installation specifications',
      'Valid Ontario G-class driver\'s license with clean driving record',
      'Physical ability to lift 50+ lbs, work in confined spaces, and climb ladders regularly',
      'Excellent communication and customer service skills',
    ],
    benefits: [
      'Competitive salary ($65,000-$85,000) based on experience and certifications',
      'Company vehicle provided for work-related travel',
      'Tool allowance and access to company tools and equipment',
      'Comprehensive health and dental benefits after 3-month probation',
      'Paid training and professional development opportunities (manufacturer certifications, safety courses)',
      'Ongoing career advancement opportunities in a growing family-owned business',
      'Work-life balance with scheduled hours (emergency on-call rotation optional with premium pay)',
      'Supportive team environment with experienced mentors',
    ],
    salary: '$65,000-$85,000 based on experience',
    postedDate: '2026-01-15',
  },
  {
    id: 'hvac-service-tech-2026-01',
    title: 'HVAC Service Technician',
    department: 'Service & Repair',
    location: 'Kitchener-Waterloo area',
    type: 'Full-time',
    description: 'Join our Service & Repair team as an HVAC Service Technician serving the Kitchener-Waterloo region. This position focuses on diagnosing, troubleshooting, and repairing residential and commercial HVAC systems to keep our customers comfortable year-round. You will be the trusted professional our customers rely on during emergency breakdowns and routine maintenance. Our 24/7 emergency service commitment means you will make a real difference for families and businesses when they need help most. B.A.P Heating & Cooling has built a reputation for honest recommendations and quality repairs over 30 years in business.',
    responsibilities: [
      'Diagnose and repair all types of HVAC equipment including furnaces, air conditioners, heat pumps, boilers, and ductless systems across all major brands',
      'Respond to emergency service calls with typical 60-minute response time across our service area, providing prompt and professional support',
      'Perform comprehensive system diagnostics using testing equipment to identify electrical, mechanical, and refrigerant issues',
      'Complete preventive maintenance tune-ups on heating and cooling systems, including cleaning, calibration, and safety inspections',
      'Test and recharge refrigerant systems, locate and repair leaks, and ensure compliance with environmental regulations',
      'Provide transparent pricing estimates and explain repair options to customers before beginning work',
      'Maintain accurate service records, warranty documentation, and parts inventory in company software',
      'Participate in on-call emergency rotation to support our 24/7 service commitment (premium pay provided)',
    ],
    qualifications: [
      'Valid TSSA G2 Gas Technician license (required - G1 is an asset)',
      '313A or 313D refrigeration certification required',
      'Minimum 3-5 years of HVAC service and repair experience with diverse equipment brands',
      'Strong diagnostic and troubleshooting skills with electrical and mechanical systems',
      'Familiarity with HVAC diagnostic tools including multimeters, manifold gauges, combustion analyzers, and leak detectors',
      'Valid Ontario G-class driver\'s license with clean abstract',
      'Customer-focused attitude with ability to explain technical issues in simple terms',
      'Self-motivated and able to work independently while maintaining high-quality standards',
    ],
    benefits: [
      'Competitive salary ($70,000-$95,000) based on experience, with performance bonuses',
      'Fully equipped company service vehicle with GPS and inventory management',
      'Comprehensive tool package provided plus annual tool allowance',
      'Extended health, dental, and vision benefits for employee and family',
      'Paid ongoing training (manufacturer certifications, TSSA renewals, safety training)',
      'Career growth opportunities including lead technician and supervisor roles',
      'Flexible scheduling with work-life balance outside emergency rotations',
      'Supportive team culture in a family-owned business that values its technicians',
    ],
    salary: '$70,000-$95,000 based on experience',
    postedDate: '2026-01-10',
  },
  {
    id: 'admin-customer-service-2026-01',
    title: 'Administrative Assistant / Customer Service Representative',
    department: 'Administration',
    location: 'Guelph office (25 Clearview St Unit 6)',
    type: 'Full-time',
    description: 'B.A.P Heating & Cooling Services Ltd is looking for a friendly, organized Administrative Assistant / Customer Service Representative to join our office team in Guelph. As the first point of contact for many customers, you will play a vital role in delivering the exceptional service our company is known for. This position combines customer service, scheduling coordination, and general office administration in a fast-paced, supportive environment. You will work closely with our technicians, management, and customers to ensure smooth daily operations. If you thrive in a role where no two days are the same and enjoy helping people, this is a great opportunity.',
    responsibilities: [
      'Answer incoming phone calls professionally and courteously, responding to customer inquiries about HVAC services, pricing, and scheduling',
      'Schedule service appointments, installations, and maintenance visits using our dispatch and booking software',
      'Process customer information, service requests, and work orders accurately in our management system (Housecall Pro)',
      'Follow up with customers after service calls to ensure satisfaction and address any concerns',
      'Coordinate with technicians on daily schedules, route optimization, and emergency service dispatching',
      'Prepare invoices, process payments, and maintain accurate customer billing records',
      'Handle administrative tasks including filing, data entry, and maintaining office supplies inventory',
      'Support marketing efforts by managing online reviews, social media updates, and customer communications',
    ],
    qualifications: [
      'High school diploma or equivalent required; post-secondary education in business administration is an asset',
      'Minimum 2 years of customer service or administrative experience, preferably in a trades or service industry',
      'Strong phone etiquette and professional communication skills (written and verbal)',
      'Proficiency with Microsoft Office Suite and ability to learn industry-specific software quickly',
      'Excellent organizational and multitasking abilities in a fast-paced environment',
      'Problem-solving mindset with ability to handle customer concerns calmly and professionally',
      'Reliable, punctual, and detail-oriented with strong work ethic',
      'Familiarity with HVAC industry terminology is beneficial but not required (training provided)',
    ],
    benefits: [
      'Competitive salary ($42,000-$52,000) based on experience',
      'Monday to Friday schedule (8:00 AM - 5:00 PM) with no evening or weekend work',
      'Health and dental benefits package available after probationary period',
      'Paid vacation and personal days',
      'Professional development and training opportunities',
      'Friendly, supportive office environment in an established family-owned business',
      'Opportunities to grow into senior administrative or office management roles',
      'Free parking and accessible office location in Guelph',
    ],
    salary: '$42,000-$52,000 based on experience',
    postedDate: '2026-01-12',
  },
  {
    id: 'hvac-apprentice-2026-01',
    title: 'HVAC Apprentice Technician',
    department: 'Installation',
    location: 'Guelph, Cambridge, Kitchener-Waterloo, and surrounding areas',
    type: 'Full-time',
    description: 'Start your career in the HVAC industry with B.A.P Heating & Cooling Services Ltd. We are seeking motivated individuals to join our apprenticeship program and learn the skilled trade of heating, ventilation, and air conditioning. This is a hands-on opportunity to work alongside experienced journeyman technicians while earning industry-recognized certifications. As a family-owned company with 30 years of experience, we are committed to training the next generation of HVAC professionals. You will gain exposure to residential and commercial installations, service work, and the latest HVAC technologies while building a rewarding long-term career.',
    responsibilities: [
      'Assist lead technicians with HVAC installations including furnaces, air conditioners, heat pumps, and ventilation systems',
      'Learn proper installation techniques for ductwork, refrigerant lines, electrical wiring, and gas connections under supervision',
      'Help diagnose and repair HVAC equipment issues while developing troubleshooting skills',
      'Safely operate hand and power tools, ladders, and equipment following safety protocols',
      'Transport materials, tools, and equipment to and from job sites',
      'Maintain clean and organized work areas, respecting customer properties',
      'Complete required apprenticeship training hours (on-the-job and in-school) to work toward TSSA and trade certifications',
      'Participate in manufacturer training, safety courses, and professional development opportunities',
    ],
    qualifications: [
      'High school diploma or equivalent required',
      'Valid Ontario G-class driver\'s license with clean driving record',
      'Registered or willing to register with the Ontario College of Trades as an HVAC apprentice',
      'Strong mechanical aptitude and interest in learning the HVAC trade',
      'Physical ability to lift 50+ lbs, work in various weather conditions, and perform manual labor',
      'Reliable, punctual, and eager to learn from experienced professionals',
      'Basic math skills for measurements and calculations',
      'Previous experience in construction, trades, or mechanical work is an asset but not required',
    ],
    benefits: [
      'Competitive apprentice wages ($18-$24/hour) increasing with progression through apprenticeship levels',
      'Company vehicle provided for work travel',
      'Tool allowance to build your professional tool collection',
      'Full support for apprenticeship training including paid time off for in-school sessions',
      'Coverage of TSSA exam fees, certifications, and licensing costs',
      'Mentorship from experienced HVAC professionals committed to your success',
      'Clear career path to journeyman technician and beyond',
      'Health and dental benefits available after probationary period',
    ],
    salary: '$18-$24/hour increasing with apprenticeship progression',
    postedDate: '2026-01-08',
  },
  {
    id: 'comfort-advisor-sales-2026-01',
    title: 'Comfort Advisor / HVAC Sales Representative',
    department: 'Sales',
    location: 'Guelph and Southern Ontario service area',
    type: 'Full-time',
    description: 'B.A.P Heating & Cooling Services Ltd is expanding our sales team and looking for a Comfort Advisor to help homeowners and businesses find the right HVAC solutions. In this consultative sales role, you will visit customers\' homes and commercial properties to assess their heating and cooling needs, provide expert recommendations, and present financing options. This is not high-pressure sales - we value honest, transparent recommendations that build long-term customer relationships. Our 30-year reputation is built on trust and quality, and the right candidate will embody these values while helping customers make informed decisions about their comfort investments.',
    responsibilities: [
      'Conduct in-home and on-site consultations to assess customers\' HVAC needs and evaluate existing systems',
      'Perform heat load calculations and recommend properly sized heating and cooling equipment',
      'Present multiple HVAC solutions with clear explanations of benefits, efficiency ratings, and long-term value',
      'Prepare detailed proposals with transparent pricing, warranty information, and available rebates',
      'Process financing applications and help customers understand payment options from multiple lenders',
      'Coordinate with installation teams to ensure seamless project handoffs and customer satisfaction',
      'Follow up with customers post-installation to ensure satisfaction and generate referrals and reviews',
      'Stay current on HVAC products, technologies, rebate programs, and energy efficiency standards',
    ],
    qualifications: [
      'Minimum 2-3 years of sales experience, preferably in HVAC, home improvement, or related industries',
      'Strong consultative selling skills with focus on customer needs rather than aggressive closing tactics',
      'Technical knowledge of HVAC systems (or willingness to learn through training)',
      'Excellent communication and presentation skills with ability to explain complex technical concepts simply',
      'Valid Ontario G-class driver\'s license with clean driving record',
      'Proficiency with CRM software, proposal tools, and Microsoft Office',
      'Self-motivated with ability to manage own schedule and meet sales targets',
      'HRAI or manufacturer certifications are an asset but not required (training provided)',
    ],
    benefits: [
      'Competitive base salary ($50,000-$60,000) plus uncapped commission structure (realistic OTE $80,000-$120,000+)',
      'Company vehicle or generous vehicle allowance',
      'Laptop, tablet, and mobile phone provided',
      'Comprehensive health, dental, and vision benefits',
      'Paid training including HVAC technical knowledge, sales techniques, and manufacturer certifications',
      'Supportive sales management with qualified lead generation',
      'Career advancement opportunities into sales management and leadership',
      'Performance bonuses and incentive trips for top performers',
    ],
    salary: '$50,000-$60,000 base + commission (OTE $80,000-$120,000+)',
    postedDate: '2026-01-05',
  },
];

// ============================================================================
// Careers Benefits (Why Work at B.A.P Heating)
// ============================================================================

/**
 * Company-wide benefits and perks for working at B.A.P Heating
 * Used in the careers page "Why Work Here" section
 */
export const careersBenefits: ServiceBenefit[] = [
  {
    title: 'Competitive Compensation',
    description: 'Industry-leading salaries, performance bonuses, and comprehensive benefits packages including health, dental, and vision coverage for you and your family.',
    icon: 'DollarSign',
  },
  {
    title: 'Career Development',
    description: 'Paid training, manufacturer certifications, TSSA exam coverage, and clear advancement paths from apprentice to lead technician and beyond.',
    icon: 'GraduationCap',
  },
  {
    title: 'Work-Life Balance',
    description: 'Scheduled work hours, paid vacation days, and optional emergency on-call rotation with premium pay. Family time matters to us.',
    icon: 'Clock',
  },
  {
    title: 'Modern Tools & Equipment',
    description: 'Fully equipped company vehicles, professional tool packages, annual tool allowances, and the latest diagnostic equipment.',
    icon: 'Wrench',
  },
  {
    title: 'Family-Owned Culture',
    description: 'Work for a local family business that values its team. No corporate bureaucracy—just honest, supportive leadership since 1994.',
    icon: 'Users',
  },
  {
    title: 'Growth Opportunities',
    description: 'Be part of a growing company with expanding service areas. Real opportunities for advancement as we grow together.',
    icon: 'TrendingUp',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get all available jobs
 *
 * @returns Array of all job listings
 */
export function getAllJobs(): Job[] {
  return jobs;
}

/**
 * Get a specific job by ID
 *
 * @param id - Job ID to search for
 * @returns Job object if found, undefined otherwise
 */
export function getJobById(id: string): Job | undefined {
  return jobs.find(job => job.id === id);
}

/**
 * Get all jobs in a specific department
 *
 * @param department - Department to filter by
 * @returns Array of jobs in the specified department
 */
export function getJobsByDepartment(department: Job['department']): Job[] {
  return jobs.filter(job => job.department === department);
}

/**
 * Get all jobs by location (partial match)
 *
 * @param location - Location string to search for (case-insensitive)
 * @returns Array of jobs matching the location
 */
export function getJobsByLocation(location: string): Job[] {
  const searchTerm = location.toLowerCase();
  return jobs.filter(job =>
    job.location.toLowerCase().includes(searchTerm)
  );
}

/**
 * Get all jobs by employment type
 *
 * @param type - Employment type to filter by
 * @returns Array of jobs matching the employment type
 */
export function getJobsByType(type: Job['type']): Job[] {
  return jobs.filter(job => job.type === type);
}

/**
 * Get the total number of open positions
 *
 * @returns Total count of job listings
 */
export function getTotalJobCount(): number {
  return jobs.length;
}

/**
 * Get jobs posted after a specific date
 *
 * @param date - ISO date string (YYYY-MM-DD)
 * @returns Array of jobs posted on or after the date
 */
export function getRecentJobs(date: string): Job[] {
  return jobs.filter(job => {
    if (!job.postedDate) return false;
    return job.postedDate >= date;
  });
}
