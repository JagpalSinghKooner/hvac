#!/usr/bin/env node
/**
 * Add solution sections to all Guelph service-city pages
 * US-007: Generate solution Content for All Guelph Services
 */

import * as fs from 'fs';
import * as path from 'path';

// Solution content for all 22 services
const solutions: Record<string, { headline: string; description: string }> = {
  "furnace-installation": {
    headline: "Right-Sized Furnace Systems, Installed to Manufacturer Specifications",
    description: "We start with a proper heat loss calculation for your Guelph home, accounting for insulation levels, window types, and local climate factors. This ensures your new furnace is sized correctly, not guessed based on square footage like many contractors do. Our TSSA-certified installers follow manufacturer specifications exactly, protecting your warranty and ensuring efficient operation. You get a furnace that heats evenly, runs efficiently, and lasts the full expected lifespan."
  },
  "furnace-repair": {
    headline: "Accurate Diagnosis Based on 30 Years of Guelph Furnace Failures",
    description: "After three decades repairing furnaces across Guelph's housing stock, we recognize failure patterns most contractors miss. We diagnose the actual problem, not symptoms, and provide honest repair vs. replace guidance based on your furnace's age and condition. Our technicians carry common parts for Guelph's most prevalent furnace models, reducing return trips. You get straight answers about whether repair makes financial sense or replacement is the better investment."
  },
  "heat-pump-installation": {
    headline: "Cold-Climate Heat Pumps Proven in Guelph's Winters",
    description: "We install only cold-climate heat pump models rated for Ontario winter performance, not standard units that fail below freezing. Thirty years in Guelph means we know which manufacturers deliver on their cold-weather claims and which don't. Our installations include proper backup heat sizing and refrigerant line insulation for Guelph's temperature swings. You get a heat pump system that works reliably at minus 25°C, not just on moderate days."
  },
  "heat-pump-repair": {
    headline: "Heat Pump Troubleshooting That Understands Cold-Climate Systems",
    description: "Cold-climate heat pumps operate differently than standard models, requiring diagnostic expertise most HVAC techs lack. We service what we install and understand the defrost cycle issues, refrigerant charge requirements, and backup heat integration unique to cold-climate units. Our technicians diagnose whether problems stem from equipment failure or installation errors. You get accurate repairs that restore full heating capacity, not temporary fixes that fail next winter."
  },
  "air-conditioner-installation": {
    headline: "Properly Sized AC That Cools AND Dehumidifies Guelph Homes",
    description: "We perform cooling load calculations specific to your home's orientation, insulation, and Guelph's humid summer conditions. An oversized AC cools quickly but never runs long enough to remove humidity, leaving your home clammy. We size units to handle both temperature and moisture removal. Our installations include proper refrigerant charge verification and airflow testing. You get comfortable indoor conditions, not just cold air."
  },
  "air-conditioner-repair": {
    headline: "AC Diagnostics That Find Root Causes, Not Symptoms",
    description: "We diagnose why your AC failed, not just what stopped working. Low refrigerant means a leak somewhere; we find and fix it rather than topping up the charge and sending you a bill next season. Our experience with Guelph's climate patterns helps identify whether problems stem from equipment age, improper sizing, or maintenance neglect. You get honest guidance on repair economics vs. replacement timing."
  },
  "boiler-installation": {
    headline: "Boiler Systems Designed for Guelph's Heritage and Modern Homes",
    description: "Guelph's mix of heritage limestone homes and modern builds requires different boiler approaches. We match boiler capacity and distribution systems to your home's heating method, whether cast-iron radiators or modern radiant floors. Our installations respect heritage home constraints while delivering modern efficiency and control. TSSA-certified installation ensures safety compliance and warranty protection. You get reliable heat distribution designed for how your specific home was built."
  },
  "boiler-repair": {
    headline: "Boiler Repair Experience Across Guelph's Diverse Housing Stock",
    description: "Heritage home boilers present different challenges than modern systems, from managing cast-iron radiator distribution to working around original home features. We service boilers across Guelph's entire housing spectrum and understand the repair complexities each era presents. Our diagnostics identify whether problems stem from the boiler itself or distribution system issues. You get repairs that address actual failures, not guesswork that wastes money."
  },
  "ductless-mini-split": {
    headline: "Ductless Solutions for Heritage Homes Without Compromising Character",
    description: "Guelph's downtown limestone homes and century properties often lack ductwork, making traditional central systems impractical or invasive. We design ductless mini-split placements that deliver even heating and cooling without visible equipment dominating your historic interiors. Our installations work within heritage preservation guidelines while providing modern comfort control. You get climate control that respects your home's character, not installations that require tearing out original walls."
  },
  "tank-water-heaters": {
    headline: "Water Heater Sizing Based on Your Household's Actual Usage",
    description: "We size tank water heaters based on your household's peak demand, not generic square footage estimates. Guelph's cold groundwater temperatures affect recovery time, which we factor into capacity recommendations. Our installations include proper venting, sediment management access, and code-compliant safety features. You get hot water capacity that matches your family's needs without paying for excess tank size you never use."
  },
  "tankless-water-heaters": {
    headline: "Tankless Systems Sized for Guelph's Cold Groundwater Temperatures",
    description: "Guelph's groundwater enters homes at 4-8°C in winter, requiring higher BTU capacity than mild climate regions. We size tankless units for worst-case temperature rise scenarios, ensuring adequate hot water flow even in January. Our installations include proper gas line sizing and venting for full-capacity operation. You get endless hot water that actually delivers on the tankless promise, not units that struggle in winter."
  },
  "humidifiers": {
    headline: "Whole-Home Humidification Calibrated for Guelph's Heating Season",
    description: "Guelph's cold winters drop indoor humidity to uncomfortable levels once heating systems run continuously. We size whole-home humidifiers to match your home's air exchange rate and heating system capacity. Installation includes proper drainage, maintenance access, and humidistat placement for accurate control. You get consistent humidity levels throughout winter without over-humidifying and causing condensation problems."
  },
  "dehumidifiers": {
    headline: "Whole-Home Dehumidification for Guelph's Humid Summer Conditions",
    description: "River valley proximity and humid Southern Ontario summers create moisture challenges in Guelph basements and living spaces. We install whole-home dehumidifiers integrated with your HVAC system, not portable units that need constant emptying. Our systems automatically remove excess moisture before it creates mold or comfort problems. You get controlled humidity year-round without managing multiple basement units."
  },
  "air-filtration-air-purifiers": {
    headline: "Air Quality Systems Matched to Guelph's Seasonal Challenges",
    description: "Guelph faces spring pollen, summer humidity, and winter dry air issues that affect indoor air quality differently across seasons. We recommend filtration and purification systems based on your specific concerns, whether allergies, asthma, or general air quality improvement. Our installations integrate with existing HVAC systems for whole-home coverage. You get cleaner air throughout your home, not just in rooms with portable units."
  },
  "hrv-erv-ventilation": {
    headline: "Ventilation Systems That Recover Heat While Exchanging Stale Air",
    description: "Modern Guelph homes built to newer energy standards trap indoor air, requiring mechanical ventilation for air quality. We install heat recovery or energy recovery ventilators that bring fresh outdoor air in while recovering heating or cooling energy from exhaust air. System sizing accounts for your home's occupancy and square footage. You get fresh air continuously without the energy penalty of opening windows in Guelph's temperature extremes."
  },
  "maintenance-plans": {
    headline: "Scheduled HVAC Maintenance Based on What Actually Extends Equipment Life",
    description: "Our maintenance plans focus on service procedures that prevent premature failure, not unnecessary upselling. Thirty years servicing equipment in Guelph's climate shows which maintenance tasks matter and which don't. We schedule service before heating and cooling seasons when breakdowns are most disruptive and contractors hardest to book. You get equipment longevity without paying for make-work services designed to generate revenue."
  },
  "furnace-maintenance": {
    headline: "Furnace Service That Catches Problems Before They Become Breakdowns",
    description: "Annual furnace maintenance identifies wear patterns and efficiency loss before they cause heating failures or safety concerns. We inspect heat exchangers for cracks, test safety controls, verify proper combustion, and clean components that affect efficiency. Our technicians document furnace condition so you understand remaining service life. You get advance warning of necessary repairs or replacement timing, not surprise breakdowns in January."
  },
  "air-conditioner-maintenance": {
    headline: "AC Service Calibrated for Guelph's Humid Summer Performance",
    description: "Guelph's humid summers stress air conditioner components differently than dry climates. We service refrigerant charge, condensate drainage, and airflow factors that affect both cooling and dehumidification performance. Pre-season maintenance ensures your AC is ready when the first heat wave hits, not limping along and failing mid-summer. You get reliable cooling capacity when you need it most."
  },
  "heat-pump-maintenance": {
    headline: "Cold-Climate Heat Pump Service That Maintains Winter Heating Capacity",
    description: "Heat pumps work year-round in Guelph, requiring maintenance attention to both heating and cooling modes. We service defrost cycles, backup heat integration, and refrigerant charge with cold-climate operation in mind. Our technicians verify your heat pump maintains full heating capacity at design temperatures, not just moderate weather performance. You get confidence your system will deliver heat when outdoor temperatures drop to minus 20°C."
  },
  "boiler-maintenance": {
    headline: "Boiler Service Across Heritage and Modern Guelph Systems",
    description: "Boiler maintenance requirements vary significantly between Guelph's heritage cast-iron systems and modern high-efficiency units. We service both with appropriate expertise, from managing sediment in older boilers to maintaining condensing efficiency in newer models. Our maintenance prevents mid-winter failures and identifies component wear before breakdowns occur. You get heating reliability throughout Guelph's coldest months."
  }
};

function addSolutionToFile(serviceDir: string) {
  const filePath = path.join(
    process.cwd(),
    'src/content/service-city',
    serviceDir,
    'guelph.md'
  );

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  // Read file content
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check if solution already exists
  if (content.includes('solution:')) {
    console.log(`⏭️  Skipping ${serviceDir} (solution already exists)`);
    return false;
  }

  // Get solution content for this service
  const solutionData = solutions[serviceDir];
  if (!solutionData) {
    console.log(`❌ No solution data for ${serviceDir}`);
    return false;
  }

  // YAML escape: double single quotes
  const headline = solutionData.headline.replace(/'/g, "''");
  const description = solutionData.description.replace(/'/g, "''");

  // Build solution field
  const solutionField = `solution:
  headline: '${headline}'
  description: '${description}'
`;

  // Insert after problem field (which ends with issues array)
  // Find the last issue in the issues array (before context or proof fields)
  const problemEndRegex = /(\n    - [^\n]+\n)(?=(?:context|proof|workflowStatus):|$)/;
  const match = content.match(problemEndRegex);

  if (!match) {
    console.log(`❌ Could not find problem section end in ${serviceDir}`);
    return false;
  }

  // Insert solution after problem section
  const updatedContent = content.replace(
    problemEndRegex,
    `$1${solutionField}`
  );

  // Write updated content
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
  console.log(`✅ Added solution to ${serviceDir}`);
  return true;
}

// Main execution
const serviceDirectories = Object.keys(solutions);
let successCount = 0;
let skipCount = 0;
let errorCount = 0;

console.log('🚀 Adding solution sections to Guelph service-city pages...\n');

for (const serviceDir of serviceDirectories) {
  const result = addSolutionToFile(serviceDir);
  if (result === true) {
    successCount++;
  } else if (result === false) {
    const filePath = path.join(
      process.cwd(),
      'src/content/service-city',
      serviceDir,
      'guelph.md'
    );
    if (fs.existsSync(filePath)) {
      skipCount++;
    } else {
      errorCount++;
    }
  }
}

console.log('\n📊 Summary:');
console.log(`   ✅ Added: ${successCount}`);
console.log(`   ⏭️  Skipped: ${skipCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log(`   📝 Total: ${serviceDirectories.length}`);
