#!/usr/bin/env tsx
/**
 * Content Schema Migration Script
 * Phase 7A: Rename fields in services and service-city collections to unified names
 *
 * Usage:
 *   tsx scripts/migrate-content-schema.ts --dry-run --collection=services
 *   tsx scripts/migrate-content-schema.ts --execute --collection=service-city
 *   tsx scripts/migrate-content-schema.ts --execute --collection=all
 */

import fs from 'fs';
import path from 'path';

interface MigrationOptions {
  dryRun: boolean;
  collection: 'services' | 'service-city' | 'all';
}

interface MigrationStats {
  filesProcessed: number;
  filesModified: number;
  errors: string[];
}

/**
 * Services collection field renames:
 * - problemStatement → problem
 * - problemStatement.painPoints → problem.issues
 * - solutionApproach → solution
 * - valueProps → benefits
 * - images → galleryImages
 */
function migrateServicesContent(content: string): { content: string; modified: boolean } {
  let modified = false;
  let result = content;

  // 1. Rename problemStatement to problem
  if (result.includes('problemStatement:')) {
    result = result.replace(/^problemStatement:/gm, 'problem:');
    modified = true;
  }

  // 2. Rename painPoints to issues (nested within problem)
  if (result.includes('  painPoints:')) {
    result = result.replace(/^  painPoints:/gm, '  issues:');
    modified = true;
  }

  // 3. Rename solutionApproach to solution
  if (result.includes('solutionApproach:')) {
    result = result.replace(/^solutionApproach:/gm, 'solution:');
    modified = true;
  }

  // 4. Rename valueProps to benefits
  if (result.includes('valueProps:')) {
    result = result.replace(/^valueProps:/gm, 'benefits:');
    modified = true;
  }

  // 5. Rename images to galleryImages
  // Only rename top-level images, not nested ones
  if (result.match(/^images:/gm)) {
    result = result.replace(/^images:/gm, 'galleryImages:');
    modified = true;
  }

  return { content: result, modified };
}

/**
 * Service-city collection field renames:
 * - localContext → context
 * - localProof → proof
 * - localTrustOpener → trustOpener
 * - localProblem → problem
 * - localProblem.citySpecificIssues → problem.issues
 * - localSolution → solution
 * - localBenefits → benefits
 * - localSavings → savings
 * - localSavings.localRebates → savings.rebateInfo
 * - localGalleryImages → galleryImages
 */
function migrateServiceCityContent(content: string): { content: string; modified: boolean } {
  let modified = false;
  let result = content;

  // 1. Rename localContext to context
  if (result.includes('localContext:')) {
    result = result.replace(/^localContext:/gm, 'context:');
    modified = true;
  }

  // 2. Rename localProof to proof
  if (result.includes('localProof:')) {
    result = result.replace(/^localProof:/gm, 'proof:');
    modified = true;
  }

  // 3. Rename localTrustOpener to trustOpener
  if (result.includes('localTrustOpener:')) {
    result = result.replace(/^localTrustOpener:/gm, 'trustOpener:');
    modified = true;
  }

  // 4. Rename localProblem to problem
  if (result.includes('localProblem:')) {
    result = result.replace(/^localProblem:/gm, 'problem:');
    modified = true;
  }

  // 5. Rename citySpecificIssues to issues (nested within problem)
  if (result.includes('  citySpecificIssues:')) {
    result = result.replace(/^  citySpecificIssues:/gm, '  issues:');
    modified = true;
  }

  // 6. Rename localSolution to solution
  if (result.includes('localSolution:')) {
    result = result.replace(/^localSolution:/gm, 'solution:');
    modified = true;
  }

  // 7. Rename localBenefits to benefits
  if (result.includes('localBenefits:')) {
    result = result.replace(/^localBenefits:/gm, 'benefits:');
    modified = true;
  }

  // 8. Rename localSavings to savings
  if (result.includes('localSavings:')) {
    result = result.replace(/^localSavings:/gm, 'savings:');
    modified = true;
  }

  // 9. Rename localRebates to rebateInfo (nested within savings)
  if (result.includes('  localRebates:')) {
    result = result.replace(/^  localRebates:/gm, '  rebateInfo:');
    modified = true;
  }

  // 10. Rename localGalleryImages to galleryImages
  if (result.includes('localGalleryImages:')) {
    result = result.replace(/^localGalleryImages:/gm, 'galleryImages:');
    modified = true;
  }

  return { content: result, modified };
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function migrateCollection(
  collectionName: 'services' | 'service-city',
  options: MigrationOptions
): Promise<MigrationStats> {
  const stats: MigrationStats = {
    filesProcessed: 0,
    filesModified: 0,
    errors: [],
  };

  const contentDir = path.join(process.cwd(), 'src', 'content', collectionName);
  const files = findMarkdownFiles(contentDir);

  console.log(`\n${options.dryRun ? '[DRY RUN] ' : ''}Migrating ${collectionName} collection...`);
  console.log(`Found ${files.length} files\n`);

  for (const filePath of files) {
    try {
      stats.filesProcessed++;
      const content = fs.readFileSync(filePath, 'utf-8');

      const { content: migratedContent, modified } =
        collectionName === 'services'
          ? migrateServicesContent(content)
          : migrateServiceCityContent(content);

      if (modified) {
        stats.filesModified++;

        if (options.dryRun) {
          console.log(`Would modify: ${path.relative(process.cwd(), filePath)}`);
        } else {
          fs.writeFileSync(filePath, migratedContent, 'utf-8');
          console.log(`Modified: ${path.relative(process.cwd(), filePath)}`);
        }
      }
    } catch (error) {
      const errorMsg = `Error processing ${filePath}: ${error}`;
      stats.errors.push(errorMsg);
      console.error(errorMsg);
    }
  }

  return stats;
}

async function main() {
  const args = process.argv.slice(2);

  const dryRun = args.includes('--dry-run');
  const execute = args.includes('--execute');

  const collectionArg = args.find(arg => arg.startsWith('--collection='));
  const collection = collectionArg?.split('=')[1] as 'services' | 'service-city' | 'all' || 'all';

  if (!dryRun && !execute) {
    console.error('Error: Must specify either --dry-run or --execute');
    console.log('\nUsage:');
    console.log('  tsx scripts/migrate-content-schema.ts --dry-run --collection=services');
    console.log('  tsx scripts/migrate-content-schema.ts --execute --collection=service-city');
    console.log('  tsx scripts/migrate-content-schema.ts --execute --collection=all');
    process.exit(1);
  }

  if (!['services', 'service-city', 'all'].includes(collection)) {
    console.error('Error: --collection must be "services", "service-city", or "all"');
    process.exit(1);
  }

  const options: MigrationOptions = { dryRun, collection };

  console.log('='.repeat(60));
  console.log('Content Schema Migration - Phase 7A');
  console.log('='.repeat(60));
  console.log(`Mode: ${dryRun ? 'DRY RUN (no files will be modified)' : 'EXECUTE (files will be modified)'}`);
  console.log(`Collection: ${collection}`);
  console.log('='.repeat(60));

  const allStats: MigrationStats = {
    filesProcessed: 0,
    filesModified: 0,
    errors: [],
  };

  if (collection === 'services' || collection === 'all') {
    const stats = await migrateCollection('services', options);
    allStats.filesProcessed += stats.filesProcessed;
    allStats.filesModified += stats.filesModified;
    allStats.errors.push(...stats.errors);
  }

  if (collection === 'service-city' || collection === 'all') {
    const stats = await migrateCollection('service-city', options);
    allStats.filesProcessed += stats.filesProcessed;
    allStats.filesModified += stats.filesModified;
    allStats.errors.push(...stats.errors);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Migration Summary');
  console.log('='.repeat(60));
  console.log(`Files processed: ${allStats.filesProcessed}`);
  console.log(`Files modified: ${allStats.filesModified}`);
  console.log(`Errors: ${allStats.errors.length}`);

  if (allStats.errors.length > 0) {
    console.log('\nErrors encountered:');
    allStats.errors.forEach(error => console.log(`  - ${error}`));
    process.exit(1);
  }

  if (dryRun) {
    console.log('\n✓ Dry run complete. Run with --execute to apply changes.');
  } else {
    console.log('\n✓ Migration complete!');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
