import type { ServiceBenefit } from './serviceContent';

/**
 * Financing Content Data
 *
 * Centralized content for the financing page.
 * Includes financing benefits, government programs in Ontario, and process steps.
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Financing partner/program information
 */
export interface FinancingPartner {
  name: string;
  type: 'government' | 'utility' | 'private';
  description: string;
  keyFeatures: string[];
  eligibility: string;
  amount?: string;
  term?: string;
  interestRate?: string;
  applicationUrl?: string;
  icon: string; // Lucide icon name
}

/**
 * Financing process step
 */
export interface FinancingProcessStep {
  step: number;
  title: string;
  description: string;
}

// ============================================================================
// Financing Benefits (4 benefits from requirements)
// ============================================================================

export const financingBenefits: ServiceBenefit[] = [
  {
    title: '0% APR Promotional Financing',
    description: 'Qualified applicants can access 0% interest financing for 6-24 months on eligible HVAC installations. Pay over time with no added interest cost during the promotional period.',
    icon: 'Percent',
  },
  {
    title: 'Flexible Payment Terms',
    description: 'Choose from multiple payment plans: 12, 24, 36, or 60-month terms tailored to fit your budget and financial situation. We work with multiple lenders to find your best option.',
    icon: 'Calendar',
  },
  {
    title: 'Quick Approval Process',
    description: 'Get approved in minutes during your in-home consultation. Our technicians process applications on-site using secure tablets, so you can move forward with your installation right away.',
    icon: 'Zap',
  },
  {
    title: 'No Upfront Payment Required',
    description: 'Start your HVAC installation with zero money down on approved financing. Spread the cost over time while enjoying immediate comfort and energy savings.',
    icon: 'DollarSign',
  },
];

// ============================================================================
// Government & Financing Programs (Ontario-Specific)
// ============================================================================

export const financingPartners: FinancingPartner[] = [
  {
    name: 'Canada Greener Homes Loan',
    type: 'government',
    description: 'Interest-free federal loan program for energy-efficient home retrofits, including high-efficiency HVAC systems. Supports up to 25,000 homeowners with additional $600M in funding.',
    keyFeatures: [
      'Interest-free loans from $5,000 to $40,000',
      '10-year repayment term with no penalties for early payoff',
      'Eligible for heat pumps, high-efficiency furnaces, and central AC systems',
      'Can be combined with provincial rebates for maximum savings',
    ],
    eligibility: 'Ontario homeowners completing eligible energy retrofits. ENERGY STAR certified equipment required.',
    amount: '$5,000 - $40,000',
    term: '10 years',
    interestRate: '0% (interest-free)',
    applicationUrl: 'https://www.cghli.ca/',
    icon: 'Leaf',
  },
  {
    name: 'Home Renovation Savings (HRS) Program',
    type: 'utility',
    description: 'Jointly delivered by Enbridge Gas and the Independent Electricity System Operator (IESO) with support from the Government of Ontario. Provides rebates for heat pumps, furnaces, and energy-efficient HVAC upgrades.',
    keyFeatures: [
      'Heat pump rebates of $1,000 to $1,500 for most Ontario homes',
      'No pre-retrofit energy audit required for qualifying heat pumps',
      'HomeEnergySaver program offers up to $5,000 for air source heat pumps and $10,000 for ground source heat pumps (electrically heated homes)',
      'Available to homes heated by natural gas or electricity',
    ],
    eligibility: 'Ontario homes connected to Enbridge Gas or the provincial electricity grid. Current heating must use natural gas or electric resistance.',
    amount: '$1,000 - $10,000 (varies by system type)',
    term: 'Rebate (not loan)',
    interestRate: 'N/A (rebate)',
    applicationUrl: 'https://www.homerenovationsavings.ca/',
    icon: 'Zap',
  },
  {
    name: 'Enbridge Gas Financing Programs',
    type: 'utility',
    description: 'Enbridge Gas offers financing assistance and rebates for business and residential customers upgrading to high-efficiency natural gas HVAC equipment.',
    keyFeatures: [
      'Fixed Incentive Program for commercial HVAC upgrades',
      'Distributor Discount Program with instant rebates on qualifying equipment',
      'Rebates applied immediately at participating dealers',
      'Supports both owned and rental HVAC equipment',
    ],
    eligibility: 'Ontario homeowners and businesses served by Enbridge Gas. Equipment must meet efficiency standards.',
    amount: 'Varies by equipment and program',
    term: 'Varies',
    interestRate: 'Varies by program',
    applicationUrl: 'https://www.enbridgegas.com/ontario/rebates-energy-conservation',
    icon: 'Flame',
  },
  {
    name: 'Private Financing Partners',
    type: 'private',
    description: 'We partner with multiple financing providers to offer flexible payment plans for all credit profiles, including promotional 0% APR options and extended term loans.',
    keyFeatures: [
      'Multiple lenders for diverse credit situations (not just perfect credit)',
      'Promotional 0% financing for 6-24 months on approved credit',
      'Standard financing rates typically 0% - 9.99% APR',
      'Same-day approval and flexible repayment options',
    ],
    eligibility: 'All Ontario homeowners encouraged to apply. We work with various credit profiles to find suitable financing.',
    amount: 'Based on project cost',
    term: '12, 24, 36, or 60 months',
    interestRate: '0% - 9.99% APR (varies by credit profile)',
    applicationUrl: undefined,
    icon: 'CreditCard',
  },
];

// ============================================================================
// Financing Process Steps (5 steps)
// ============================================================================

export const financingProcessSteps: FinancingProcessStep[] = [
  {
    step: 1,
    title: 'Apply During Your Free Consultation',
    description: 'During your free in-home estimate, our technician can process your financing application in minutes using a secure tablet. You\'ll need basic information like ID, employment details, and income. There\'s no obligation—approval doesn\'t commit you to the installation.',
  },
  {
    step: 2,
    title: 'Review Your Financing Options',
    description: 'Once approved, we\'ll present multiple financing options tailored to your budget. Compare interest rates, monthly payments, and term lengths. We\'ll clearly explain all options including government rebates and 0% promotional offers.',
  },
  {
    step: 3,
    title: 'Choose the Best Plan for You',
    description: 'Select the financing plan that works best for your budget and timeline. No hidden fees, no surprises—just transparent pricing with your exact monthly payment, interest rate, and total cost clearly disclosed.',
  },
  {
    step: 4,
    title: 'Schedule Your Installation',
    description: 'With financing approved, we\'ll schedule your HVAC installation at a time convenient for you—typically within 2-3 business days. Our licensed technicians will complete the work to the highest standards.',
  },
  {
    step: 5,
    title: 'Start Making Easy Monthly Payments',
    description: 'After installation, begin your low monthly payments on the schedule you chose. Pay off early anytime without penalty to reduce or eliminate interest charges. Enjoy your new comfort system while managing payments affordably.',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get financing partners by type
 */
export function getFinancingPartnersByType(type: 'government' | 'utility' | 'private'): FinancingPartner[] {
  return financingPartners.filter(partner => partner.type === type);
}

/**
 * Get government-backed financing programs only
 */
export function getGovernmentPrograms(): FinancingPartner[] {
  return getFinancingPartnersByType('government');
}

/**
 * Get utility-based rebate programs
 */
export function getUtilityPrograms(): FinancingPartner[] {
  return getFinancingPartnersByType('utility');
}
