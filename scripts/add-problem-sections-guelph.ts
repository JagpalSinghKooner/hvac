/**
 * Add problem sections to all Guelph service-city files
 * US-006: Generate problem content for Guelph services
 *
 * Reads problem sections from guelph-problem-sections.md and adds them to frontmatter
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

// Map of actual service directory names to their heading names in the markdown doc
const serviceMap: Record<string, string> = {
  'furnace-installation': 'Furnace Installation',
  'furnace-repair': 'Furnace Repair',
  'heat-pump-installation': 'Heat Pump Installation',
  'heat-pump-repair': 'Heat Pump Repair',
  'air-conditioner-installation': 'Air Conditioner Installation',
  'air-conditioner-repair': 'Air Conditioner Repair',
  'boiler-installation': 'Boiler Installation',
  'boiler-repair': 'Boiler Repair',
  'ductless-mini-split': 'Ductless Mini-Split Installation',
  'tank-water-heaters': 'Water Heater Installation',
  'tankless-water-heaters': 'Tankless Water Heater Installation',
  'humidifiers': 'Humidifier Installation',
  'dehumidifiers': 'Dehumidifier Installation',
  'air-filtration-air-purifiers': 'Air Quality Services',
  'hrv-erv-ventilation': 'Air Quality Services',  // Use same content
  'maintenance-plans': 'HVAC Maintenance',
  'furnace-maintenance': 'Furnace Maintenance',
  'air-conditioner-maintenance': 'Air Conditioner Maintenance',
  'heat-pump-maintenance': 'Heat Pump Maintenance',
  'boiler-maintenance': 'Boiler Repair'  // Use same content as boiler repair
};

// Read the generated problem sections from markdown file
const problemDoc = readFileSync(resolve(process.cwd(), 'docs/project/ralph/guelph-problem-sections.md'), 'utf-8');

// Extract problem section for a specific service
function extractProblemSection(headingName: string): string | null {
  // Find the section for this service (e.g., "## 1. Furnace Installation Guelph")
  const servicePattern = new RegExp(`## \\d+\\. ${headingName} Guelph[\\s\\S]*?\`\`\`yaml\\n(problem:[\\s\\S]*?)\\n\`\`\``, 'i');
  const match = problemDoc.match(servicePattern);

  if (!match) {
    return null;
  }

  return match[1].trim();
}

function addProblemSection(serviceSlug: string, headingName: string) {
  const filePath = resolve(process.cwd(), `src/content/service-city/${serviceSlug}/guelph.md`);

  try {
    let content = readFileSync(filePath, 'utf-8');

    // Check if problem field already exists
    if (content.includes('problem:')) {
      console.log(`⏭️  ${serviceSlug}: problem field already exists, skipping`);
      return;
    }

    // Extract problem section from generated markdown
    const problemYaml = extractProblemSection(headingName);

    if (!problemYaml) {
      console.log(`❌ ${serviceSlug}: Could not extract problem section for "${headingName}"`);
      return;
    }

    // Find the trustOpener field and insert problem after it
    // Match trustOpener field which is a single-quoted string (possibly with doubled single quotes)
    // Pattern: trustOpener: 'content...' where content can have '' (escaped single quotes)
    const lines = content.split('\n');
    let trustOpenerLineIndex = -1;
    let inTrustOpener = false;
    let quoteCount = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('trustOpener:')) {
        trustOpenerLineIndex = i;
        inTrustOpener = true;

        // Count quotes in this line (excluding doubled quotes)
        const withoutDoubled = line.replace(/''/g, '');  // Remove doubled quotes
        quoteCount = (withoutDoubled.match(/'/g) || []).length;

        // If we have an even number of quotes (2 or more), trustOpener is complete on this line
        if (quoteCount >= 2 && quoteCount % 2 === 0) {
          break;
        }
      } else if (inTrustOpener) {
        // Still inside trustOpener field, count quotes
        const withoutDoubled = line.replace(/''/g, '');
        quoteCount += (withoutDoubled.match(/'/g) || []).length;

        // If total quotes is even and >= 2, we've closed the string
        if (quoteCount >= 2 && quoteCount % 2 === 0) {
          trustOpenerLineIndex = i;
          break;
        }
      }
    }

    if (trustOpenerLineIndex === -1) {
      console.log(`❌ ${serviceSlug}: Could not find trustOpener field`);
      return;
    }

    // Insert problem section after trustOpener line
    lines.splice(trustOpenerLineIndex + 1, 0, problemYaml);
    content = lines.join('\n');

    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ ${serviceSlug}: Added problem section`);
  } catch (error) {
    console.error(`❌ ${serviceSlug}: ${error}`);
  }
}

// Process all services
console.log('Adding problem sections to Guelph service-city files...\n');
Object.entries(serviceMap).forEach(([slug, heading]) => {
  addProblemSection(slug, heading);
});
console.log('\n✅ Problem section addition complete!');
