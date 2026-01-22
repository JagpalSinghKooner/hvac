#!/usr/bin/env npx tsx
/**
 * Reset Guelph service-city files to minimal frontmatter
 * US-000: Cleanup & Reset (PREREQUISITE)
 *
 * Strips all Phase 7B content that doesn't meet Phase 8 E-E-A-T requirements:
 * - trustOpener, problem, solution, benefits, context, proof
 *
 * Keeps only minimal required fields:
 * - serviceSlug, locationSlug, title, seoTitle, seoDescription
 *
 * Run: npx tsx scripts/phase8/reset-guelph-files.ts
 */

import * as fs from 'fs';
import * as path from 'path';

const SERVICE_CITY_DIR = path.join(process.cwd(), 'src/content/service-city');

// Find all Guelph files
function findGuelphFiles(): string[] {
  const files: string[] = [];
  const serviceDirs = fs.readdirSync(SERVICE_CITY_DIR);

  for (const serviceDir of serviceDirs) {
    const servicePath = path.join(SERVICE_CITY_DIR, serviceDir);
    if (!fs.statSync(servicePath).isDirectory()) continue;

    const guelphFile = path.join(servicePath, 'guelph.md');
    if (fs.existsSync(guelphFile)) {
      files.push(guelphFile);
    }
  }

  return files;
}

// Extract minimal frontmatter from file content
function extractMinimalFrontmatter(content: string): {
  serviceSlug: string;
  locationSlug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
} | null {
  // Match frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];

  // Extract required fields using regex
  const serviceSlugMatch = frontmatter.match(/serviceSlug:\s*'([^']+)'/);
  const locationSlugMatch = frontmatter.match(/locationSlug:\s*'([^']+)'/);
  const titleMatch = frontmatter.match(/title:\s*'([^']+)'/);
  const seoTitleMatch = frontmatter.match(/seoTitle:\s*'([^']+)'/);
  const seoDescriptionMatch = frontmatter.match(/seoDescription:\s*'([^']+)'/);

  if (!serviceSlugMatch || !locationSlugMatch || !titleMatch || !seoTitleMatch || !seoDescriptionMatch) {
    return null;
  }

  return {
    serviceSlug: serviceSlugMatch[1],
    locationSlug: locationSlugMatch[1],
    title: titleMatch[1],
    seoTitle: seoTitleMatch[1],
    seoDescription: seoDescriptionMatch[1],
  };
}

// Generate minimal frontmatter content
function generateMinimalContent(data: {
  serviceSlug: string;
  locationSlug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
}): string {
  return `---
serviceSlug: '${data.serviceSlug}'
locationSlug: '${data.locationSlug}'
title: '${data.title}'
seoTitle: '${data.seoTitle}'
seoDescription: '${data.seoDescription}'
workflowStatus: 'draft'
---
`;
}

// Main execution
function main() {
  console.log('🔄 Resetting Guelph service-city files to minimal frontmatter...\n');

  const files = findGuelphFiles();
  console.log(`Found ${files.length} Guelph files to reset.\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const filePath of files) {
    const relativePath = path.relative(process.cwd(), filePath);
    const content = fs.readFileSync(filePath, 'utf-8');

    const data = extractMinimalFrontmatter(content);
    if (!data) {
      console.log(`❌ Could not extract frontmatter from ${relativePath}`);
      errorCount++;
      continue;
    }

    const newContent = generateMinimalContent(data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Reset ${relativePath}`);
    successCount++;
  }

  console.log('\n📊 Summary:');
  console.log(`   ✅ Reset: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${files.length}`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();
