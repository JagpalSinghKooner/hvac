/**
 * Script to add trustOpener content to all Guelph service-city pages
 * US-005: Generate trustOpener Content for All Guelph Services
 */

import * as fs from 'fs';
import * as path from 'path';

const trustOpeners: Record<string, string> = {
  'furnace-installation': 'Since 1994, B.A.P has been solving furnace challenges in Guelph\'s diverse housing stock, from heritage limestone homes in the Ward to modern builds near Kortright Hills. Thirty years in one city creates pattern recognition most contractors lack. We know which furnace systems work in Guelph\'s cold winters and humid microclimate conditions because we\'ve installed and serviced thousands of them.',

  'heat-pump-installation': 'Headquartered in Guelph since 1994, B.A.P has installed heat pump systems across every neighborhood in this city, from heritage properties downtown to energy-efficient new builds. We understand which heat pump models actually perform in Guelph\'s winter temperatures and summer humidity. Three decades of local installations means we\'ve learned what works through real-world testing, not just manufacturer specifications.',

  'air-conditioner-installation': 'Since 1994, B.A.P has been installing air conditioning systems in Guelph homes through three decades of increasingly hot summers. We know how the Speed River valley creates humidity pockets that affect cooling performance. Proper sizing for Guelph\'s specific climate conditions prevents the short-cycling and moisture problems we see from contractors who guess based on square footage alone.',

  'boiler-installation': 'Thirty years of boiler installations in Guelph\'s heritage homes has taught B.A.P which modern systems integrate properly with century-old radiator infrastructure. Many of Guelph\'s most beautiful limestone homes still rely on hydronic heating. We specialize in matching high-efficiency boilers to existing radiator systems without the disruption and expense of full ductwork conversion.',

  'ductless-mini-split': 'B.A.P has been installing ductless mini-split systems in Guelph since before they were common in Ontario, particularly in heritage homes where adding ductwork would compromise original architecture. Guelph\'s downtown limestone homes and century properties are ideal candidates for ductless solutions. We understand the placement strategies that deliver even heating and cooling without visible equipment dominating your historic interiors.',

  'tankless-water-heaters': 'Since 1994, B.A.P has been installing tankless water heaters in Guelph homes, including many where existing gas lines and venting required expert modification to meet manufacturer specifications. We size tankless systems based on Guelph\'s cold inlet water temperatures and your actual hot water usage patterns. Proper sizing prevents the performance disappointments that occur when contractors install undersized units to hit a price point.',

  'tank-water-heaters': 'Thirty years of tank water heater installations across Guelph means B.A.P knows exactly which models deliver reliable performance in this region\'s water conditions. We account for Guelph\'s water hardness levels when recommending tank sizes and efficiency ratings. The goal is a water heater that lasts its full rated lifespan without premature failure from mineral buildup or undersizing.',

  'furnace-repair': 'B.A.P has been repairing furnaces in Guelph since 1994, giving us diagnostic experience with virtually every furnace model installed in this city over three decades. We know the common failure patterns in Guelph\'s climate conditions. Our technicians can usually identify whether a repair makes financial sense or replacement is the more accountable recommendation based on the furnace\'s age and condition.',

  'furnace-maintenance': 'Headquartered in Guelph since 1994, B.A.P has maintained thousands of furnaces through thirty Ontario winters. We know which maintenance steps actually extend furnace life in Guelph\'s conditions and which are just upselling opportunities. Our annual maintenance focuses on the components that fail most often in this climate, preventing breakdowns during the coldest weeks when you need heat most.',

  'heat-pump-repair': 'Three decades of heat pump service in Guelph has taught B.A.P the specific failure patterns that occur when these systems operate in cold climates. Not all heat pumps are rated for Ontario winters, and we can diagnose whether performance issues are fixable or indicate a system that was undersized or improperly installed. Honest diagnosis means we tell you when repair costs don\'t make sense given the system\'s remaining lifespan.',

  'heat-pump-maintenance': 'Since 1994, B.A.P has been maintaining heat pump systems through Guelph\'s temperature extremes, from humid summer peaks to winter lows that stress these dual-purpose systems. We focus maintenance on the components that wear fastest when heat pumps cycle between heating and cooling modes. Regular maintenance extends system life and preserves the efficiency ratings that justified the initial investment in heat pump technology.',

  'air-conditioner-repair': 'B.A.P has repaired air conditioning systems across Guelph for thirty years, diagnosing everything from refrigerant leaks in heritage home installations to compressor failures in newer high-efficiency units. We carry parts for the systems most commonly installed in Guelph over the past two decades. Our technicians provide honest assessments about whether repair extends the system\'s useful life or whether replacement is the more financially sound decision.',

  'air-conditioner-maintenance': 'Thirty years of air conditioner maintenance in Guelph has shown B.A.P exactly which service steps prevent the most common failure modes in this climate. We focus on refrigerant levels, condenser coil cleanliness, and electrical connections because these components degrade fastest in Guelph\'s humid summers. Annual maintenance catches small problems before they become expensive mid-summer breakdowns when replacement parts are scarce and contractors are booked solid.',

  'boiler-repair': 'Since 1994, B.A.P has repaired boiler systems in Guelph\'s heritage homes, where hydronic heating remains the most practical solution for properties with existing radiator infrastructure. We stock parts for the boiler models most common in Guelph\'s older neighborhoods. Our technicians understand the difference between repairs that restore a boiler\'s remaining useful life and expensive fixes that delay an inevitable replacement.',

  'boiler-maintenance': 'Three decades of boiler maintenance in Guelph\'s heritage properties has taught B.A.P which service procedures actually extend boiler life and which are unnecessary in modern sealed systems. We focus on water quality, pressure levels, and combustion efficiency because these factors most directly affect boiler longevity. Regular maintenance prevents the mid-winter failures that leave heritage homes without heat for days while parts are sourced for older systems.',

  'hrv-erv-ventilation': 'B.A.P has been installing ventilation systems in Guelph since building codes began requiring mechanical ventilation in tightly sealed homes. We understand which HRV and ERV models handle Guelph\'s humidity levels without constant filter clogging or frozen cores in winter. Proper ventilation sizing accounts for your home\'s actual air exchange requirements, not just code minimums that leave homes feeling stuffy or create excessive energy waste.',

  'humidifiers': 'Thirty years in Guelph has shown B.A.P that winter indoor humidity control prevents more than just dry skin and static electricity. Properly humidified homes feel warmer at lower thermostat settings, reducing heating costs. We size humidifiers based on your home\'s actual cubic footage and air exchange rate, not generic capacity charts that result in over-humidification and window condensation problems.',

  'dehumidifiers': 'Since 1994, B.A.P has been solving humidity problems in Guelph basements and crawl spaces, where the Speed River valley creates moisture challenges in many properties. We size dehumidification systems based on your home\'s specific moisture load, not portable unit ratings that force homeowners to empty collection buckets daily. Whole-home dehumidifiers integrate with your existing HVAC system and drain automatically.',

  'air-filtration-air-purifiers': 'Headquartered in Guelph since 1994, B.A.P has installed air filtration systems ranging from basic media filters to hospital-grade HEPA and UV systems. We match filtration technology to your actual air quality concerns, whether that\'s pollen from Guelph\'s tree-lined neighborhoods, pet dander, or particulate from nearby construction. High-efficiency filtration requires proper airflow engineering to avoid overworking your HVAC system.',

  'maintenance-plans': 'For thirty years, B.A.P has maintained HVAC systems across Guelph through a simple principle: regular maintenance costs less than emergency repairs and premature replacement. Our maintenance plans focus on the service procedures that actually extend equipment life in this climate, not unnecessary upselling. Scheduled maintenance means your systems are serviced before heating and cooling seasons when breakdowns are most disruptive and contractors are hardest to schedule.',

  'commercial-hvac': 'Since 1994, B.A.P has been providing commercial HVAC services to Guelph businesses, from downtown heritage buildings converted to office space to modern retail and light industrial facilities. We understand the occupancy loads and ventilation requirements specific to commercial applications. Commercial systems require contractors who respond to service calls quickly because downtime affects your business operations and employee productivity.',

  'rooftop-units': 'Three decades of rooftop unit installation and service in Guelph has taught B.A.P which commercial HVAC systems withstand this region\'s weather extremes without constant service calls. Rooftop units face full sun exposure in summer and severe winter conditions, requiring contractors who understand structural mounting, weatherproofing, and proper refrigerant line insulation. We size commercial systems based on your building\'s actual heating and cooling loads, not rules of thumb that result in undersized units cycling constantly or oversized units wasting energy.'
};

const contentDir = path.join(process.cwd(), 'src', 'content', 'service-city');

let updatedCount = 0;
let errorCount = 0;

for (const [serviceSlug, trustOpener] of Object.entries(trustOpeners)) {
  const filePath = path.join(contentDir, serviceSlug, 'guelph.md');

  try {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      errorCount++;
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');

    // Check if trustOpener already exists
    if (content.includes('trustOpener:')) {
      console.log(`⚠️  Skipping ${serviceSlug}/guelph.md - trustOpener already exists`);
      continue;
    }

    // Find the frontmatter block and insert trustOpener after seoDescription
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      console.error(`❌ No frontmatter found in ${serviceSlug}/guelph.md`);
      errorCount++;
      continue;
    }

    // Escape single quotes for YAML (double them)
    const yamlSafeTrustOpener = trustOpener.replace(/'/g, "''");

    // Insert trustOpener after seoDescription line
    content = content.replace(
      /(seoDescription: '[^']*')\n/,
      `$1\ntrustOpener: '${yamlSafeTrustOpener}'\n`
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Updated ${serviceSlug}/guelph.md`);
    updatedCount++;

  } catch (error) {
    console.error(`❌ Error processing ${serviceSlug}/guelph.md:`, error);
    errorCount++;
  }
}

console.log(`\n✨ Complete: ${updatedCount} files updated, ${errorCount} errors`);
