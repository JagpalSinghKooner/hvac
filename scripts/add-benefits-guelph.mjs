/**
 * Add benefits content to Guelph service-city pages
 * US-008: Generate benefits content for all Guelph services
 *
 * Run: node scripts/add-benefits-guelph.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read benefits from the markdown document
const benefitsDoc = fs.readFileSync(
  path.join(__dirname, '../docs/project/ralph/guelph-benefits.md'),
  'utf-8'
);

// Parse benefits from markdown
function parseBenefits(serviceSlug) {
  // Convert slug to title case (e.g., furnace-installation → Furnace Installation)
  const serviceTitle = serviceSlug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Find the section for this service
  const sectionPattern = new RegExp(`## \\d+\\. ${serviceTitle}\\s+([\\s\\S]+?)(?=\\n## \\d+\\.|\\n---\\n|$)`, 'i');
  const match = benefitsDoc.match(sectionPattern);

  if (!match) {
    console.log(`Could not find benefits for: ${serviceTitle}`);
    return null;
  }

  const sectionContent = match[1];
  const benefits = [];

  // Match each benefit block
  const benefitPattern = /### Benefit \d+\s+\*\*title:\*\* (.+?)\s+\*\*description:\*\* (.+?)\s+\*\*icon:\*\* (.+?)(?=\s+###|\s+---|\s+##|$)/gs;

  let benefitMatch;
  while ((benefitMatch = benefitPattern.exec(sectionContent)) !== null) {
    benefits.push({
      title: benefitMatch[1].trim(),
      description: benefitMatch[2].trim(),
      icon: benefitMatch[3].trim()
    });
  }

  return benefits.length > 0 ? benefits : null;
}

// Convert benefits to YAML format with proper escaping
function benefitsToYAML(benefits) {
  const benefitLines = benefits.map(benefit => {
    // Escape single quotes in YAML by doubling them
    const title = benefit.title.replace(/'/g, "''");
    const description = benefit.description.replace(/'/g, "''");

    return `  - title: '${title}'\n    description: '${description}'\n    icon: '${benefit.icon}'`;
  });

  return `benefits:\n${benefitLines.join('\n')}\n`;
}

// Process all Guelph service-city files
const serviceCityDir = path.join(__dirname, '../src/content/service-city');
const serviceDirs = fs.readdirSync(serviceCityDir);

let filesUpdated = 0;
const errors = [];

for (const serviceDir of serviceDirs) {
  const guelphFilePath = path.join(serviceCityDir, serviceDir, 'guelph.md');

  // Check if guelph.md exists
  if (!fs.existsSync(guelphFilePath)) {
    continue;
  }

  try {
    // Read file content
    let content = fs.readFileSync(guelphFilePath, 'utf-8');

    // Check if benefits already exist
    if (content.includes('benefits:')) {
      console.log(`Skipping ${serviceDir}/guelph.md - benefits already exist`);
      continue;
    }

    // Get benefits for this service
    const benefits = parseBenefits(serviceDir);

    if (!benefits) {
      errors.push(`No benefits found for service: ${serviceDir}`);
      continue;
    }

    // Convert benefits to YAML
    const benefitsYAML = benefitsToYAML(benefits);

    // Insert benefits after solution section
    const solutionPattern = /(solution:\s+headline: '[^']*(?:''[^']*)*'\s+description: '[^']*(?:''[^']*)*')\n/;
    const solutionMatch = content.match(solutionPattern);

    if (solutionMatch) {
      content = content.replace(
        solutionMatch[0],
        solutionMatch[0] + benefitsYAML
      );
    } else {
      errors.push(`Could not find solution section in ${serviceDir}/guelph.md`);
      continue;
    }

    // Write updated content
    fs.writeFileSync(guelphFilePath, content, 'utf-8');
    filesUpdated++;
    console.log(`✓ Updated ${serviceDir}/guelph.md with ${benefits.length} benefits`);

  } catch (error) {
    errors.push(`Error processing ${serviceDir}/guelph.md: ${error.message}`);
  }
}

console.log(`\n=== Summary ===`);
console.log(`Files updated: ${filesUpdated}`);

if (errors.length > 0) {
  console.log(`\nErrors encountered:`);
  errors.forEach(error => console.log(`  - ${error}`));
  process.exit(1);
}
