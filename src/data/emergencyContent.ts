/**
 * Emergency Service Content Data
 *
 * Centralized content for the emergency service page.
 * Follows the same pattern as serviceContent.ts for consistency.
 */

// ============================================================================
// TypeScript Interfaces
// ============================================================================

/**
 * Represents a specific HVAC emergency scenario
 */
export interface EmergencyScenario {
  title: string;           // e.g., "Furnace Not Working in Winter"
  description: string;     // 1-2 sentence description
  urgency: 'critical' | 'high' | 'moderate';  // Visual urgency indicator
  safetyTip: string;      // What to do immediately
  icon: string;           // Lucide icon name
}

/**
 * Emergency safety tip/guidance
 */
export interface SafetyTip {
  title: string;
  description: string;
  icon: string;
  severity: 'danger' | 'warning' | 'info';
}

/**
 * Emergency service benefit/differentiator
 */
export interface EmergencyBenefit {
  title: string;
  description: string;
  icon: string;
}

/**
 * Process step for "What to Expect"
 */
export interface EmergencyProcessStep {
  step: number;
  title: string;
  description: string;
}

// ============================================================================
// Emergency Scenarios Data (8 scenarios)
// ============================================================================

export const emergencyScenarios: EmergencyScenario[] = [
  {
    title: 'Furnace Not Working in Winter',
    description: 'Complete heating failure during cold weather poses health risks and potential pipe freezing.',
    urgency: 'critical',
    safetyTip: 'Stay warm in one room, use blankets, and keep cabinet doors open to prevent pipe freezing. Call immediately.',
    icon: 'Snowflake',
  },
  {
    title: 'No Heat - Heating System Failure',
    description: 'Your heating system has stopped producing heat, leaving your home uncomfortably cold.',
    urgency: 'critical',
    safetyTip: 'Check your thermostat settings and circuit breakers. If issue persists, call for emergency service.',
    icon: 'ThermometerSnowflake',
  },
  {
    title: 'AC Breakdown During Heat Wave',
    description: 'Air conditioner failure during extreme heat can be dangerous, especially for vulnerable individuals.',
    urgency: 'high',
    safetyTip: 'Stay hydrated, close blinds, and move to the coolest room in your home. Seek cooling centers if needed.',
    icon: 'Sun',
  },
  {
    title: 'Gas Leak or Gas Odor',
    description: 'Natural gas leaks are life-threatening emergencies requiring immediate action.',
    urgency: 'critical',
    safetyTip: 'Evacuate immediately. Do not use electrical switches or devices. Call 911 and your gas company from outside, then call us.',
    icon: 'Flame',
  },
  {
    title: 'Carbon Monoxide Detector Alarm',
    description: 'CO detector alarms indicate potential carbon monoxide poisoning from your heating system.',
    urgency: 'critical',
    safetyTip: 'Evacuate immediately, call 911, and do not re-enter until cleared by emergency services. Then call us for system inspection.',
    icon: 'AlertTriangle',
  },
  {
    title: 'Water Heater Failure or Leaking',
    description: 'Water heater leaks can cause flooding and property damage, while failures disrupt daily activities.',
    urgency: 'high',
    safetyTip: 'Turn off water supply to the heater if possible. Turn off power (electric) or gas supply. Call for emergency repair.',
    icon: 'Droplet',
  },
  {
    title: 'Strange Noises or Burning Smells',
    description: 'Unusual sounds or odors from HVAC equipment can indicate imminent system failure or safety hazards.',
    urgency: 'high',
    safetyTip: 'Turn off the system immediately. Do not ignore burning smells - they may indicate electrical issues or overheating.',
    icon: 'AlertCircle',
  },
  {
    title: 'Frozen Pipes Affecting HVAC',
    description: 'Frozen pipes can damage your heating system and cause flooding when they thaw.',
    urgency: 'moderate',
    safetyTip: 'Keep cabinet doors open, let faucets drip, and maintain heat. Do not use open flames to thaw pipes.',
    icon: 'Snowflake',
  },
];

// ============================================================================
// Safety Tips While Waiting
// ============================================================================

export const safetyTips: SafetyTip[] = [
  {
    title: 'Gas Leak Emergency',
    description: 'If you smell gas: evacuate immediately, do not use electrical switches, call 911 from outside, then call your gas company and us.',
    icon: 'Flame',
    severity: 'danger',
  },
  {
    title: 'Carbon Monoxide Alarm',
    description: 'If your CO detector sounds: evacuate immediately, call 911, get fresh air, and do not re-enter until emergency services clear your home.',
    icon: 'AlertTriangle',
    severity: 'danger',
  },
  {
    title: 'No Heat in Winter',
    description: 'Bundle up in blankets, stay in one heated room, open cabinet doors to prevent pipe freezing, and keep emergency heat sources away from flammable materials.',
    icon: 'ThermometerSnowflake',
    severity: 'warning',
  },
  {
    title: 'Extreme Heat Without AC',
    description: 'Stay hydrated, close blinds/curtains, move to the coolest room, avoid strenuous activity, and check on vulnerable family members.',
    icon: 'Sun',
    severity: 'warning',
  },
  {
    title: 'When to Turn Off Your System',
    description: 'Turn off your HVAC system if you notice burning smells, sparks, loud grinding noises, or excessive water leaking.',
    icon: 'Power',
    severity: 'warning',
  },
  {
    title: 'Basic Troubleshooting',
    description: 'Before calling: check thermostat settings, replace air filter if accessible, check circuit breakers, and ensure vents are not blocked.',
    icon: 'Settings',
    severity: 'info',
  },
];

// ============================================================================
// Emergency Service Benefits (Why Choose Us)
// ============================================================================

export const emergencyBenefits: EmergencyBenefit[] = [
  {
    title: '30+ Years Experience',
    description: 'Serving Southern Ontario since 1994 with dependable emergency HVAC service.',
    icon: 'Calendar',
  },
  {
    title: 'TSSA Licensed Technicians',
    description: 'All technicians are certified by the Technical Standards and Safety Authority for safe, compliant repairs.',
    icon: 'Shield',
  },
  {
    title: 'Fully Stocked Service Vehicles',
    description: 'We carry common parts on our trucks to complete most emergency repairs on the first visit.',
    icon: 'Truck',
  },
  {
    title: 'No-Surprise Pricing',
    description: 'Transparent pricing with customer approval before work begins—no hidden fees, day or night.',
    icon: 'FileText',
  },
  {
    title: 'All Major Brands Serviced',
    description: 'Expert service for Carrier, Lennox, Trane, Goodman, Rheem, York, and all other major HVAC brands.',
    icon: 'Wrench',
  },
  {
    title: '4.8 Stars from 407 Reviews',
    description: 'Trusted by hundreds of Southern Ontario homeowners and businesses for emergency HVAC service.',
    icon: 'Award',
  },
  {
    title: 'Fully Insured & WSIB Covered',
    description: 'Maximum insurance coverage and WSIB compliance for your protection and peace of mind.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Real Person Answers 24/7',
    description: 'Speak directly to a knowledgeable person, not a call center—24 hours a day, 7 days a week.',
    icon: 'Phone',
  },
];

// ============================================================================
// Emergency Response Process Steps
// ============================================================================

export const emergencyProcessSteps: EmergencyProcessStep[] = [
  {
    step: 1,
    title: 'Call +1 519-835-4858',
    description: 'Speak to a real person immediately—no call centers, no voicemail. We answer 24/7/365.',
  },
  {
    step: 2,
    title: 'Describe Your Emergency',
    description: 'Our dispatcher will gather details about your situation and provide immediate safety guidance if needed.',
  },
  {
    step: 3,
    title: 'Technician Dispatched',
    description: 'A certified technician is dispatched immediately, typically arriving within 60 minutes across our service area.',
  },
  {
    step: 4,
    title: 'Diagnosis & Assessment',
    description: 'Our technician diagnoses the problem, explains the issue in clear terms, and provides transparent pricing options.',
  },
  {
    step: 5,
    title: 'Customer Approval',
    description: 'You approve the work before we start. No hidden fees, no surprises—just honest pricing, day or night.',
  },
  {
    step: 6,
    title: 'Repair Completed & Tested',
    description: 'We complete the repair, test your system thoroughly, and ensure you are comfortable before we leave.',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get emergency scenarios by urgency level
 */
export function getEmergencyScenariosByUrgency(urgency: 'critical' | 'high' | 'moderate'): EmergencyScenario[] {
  return emergencyScenarios.filter(scenario => scenario.urgency === urgency);
}

/**
 * Get safety tips by severity
 */
export function getSafetyTipsBySeverity(severity: 'danger' | 'warning' | 'info'): SafetyTip[] {
  return safetyTips.filter(tip => tip.severity === severity);
}

/**
 * Get critical emergency scenarios (for homepage/alerts)
 */
export function getCriticalEmergencies(): EmergencyScenario[] {
  return getEmergencyScenariosByUrgency('critical');
}
