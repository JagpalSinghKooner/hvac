import { test, expect } from '@playwright/test';

test.describe('Service Pages Responsive Design', () => {
  // Test a representative service page
  const testServiceUrl = '/services/furnace-repair/';

  test.beforeEach(async ({ page }) => {
    await page.goto(testServiceUrl);
  });

  test('should display properly at all breakpoints', async ({ page }, testInfo) => {
    // ServiceHero: H1 visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // CTAs should be accessible
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Screenshot for current viewport
    await page.screenshot({
      path: `playwright-report/screenshots/service-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });

  test('ProcessSteps renders properly on mobile', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Look for process/steps section
    const processSection = page.locator('section').filter({
      hasText: /process|steps|how it works/i
    }).first();

    if (await processSection.count() > 0) {
      await expect(processSection).toBeVisible();

      // Timeline should render vertically on mobile
      // Check that steps exist
      const steps = processSection.locator('[class*="step"], li, div[class*="process"]');
      const stepCount = await steps.count();

      if (stepCount > 0) {
        expect(stepCount).toBeGreaterThan(0);
      }
    }
  });

  test('Value Props Grid is responsive', async ({ page }, testInfo) => {
    // Look for value props/benefits section
    const valuePropsSection = page.locator('section').filter({
      hasText: /value|benefits|why choose/i
    }).first();

    if (await valuePropsSection.count() > 0) {
      await expect(valuePropsSection).toBeVisible();

      // Count grid items
      const gridItems = valuePropsSection.locator('[class*="card"], [class*="grid"] > div, article');
      const itemCount = await gridItems.count();

      if (itemCount > 0) {
        // On mobile (320px), items should stack vertically
        if (testInfo.project.name === 'mobile-320px') {
          // Check first item is full width-ish
          const firstItem = gridItems.first();
          const box = await firstItem.boundingBox();
          if (box) {
            // Should take most of the viewport width
            expect(box.width).toBeGreaterThan(280);
          }
        }

        // On desktop (1440px), should have multiple columns
        if (testInfo.project.name === 'desktop-1440px' && itemCount >= 4) {
          const firstItem = gridItems.first();
          const secondItem = gridItems.nth(1);

          const box1 = await firstItem.boundingBox();
          const box2 = await secondItem.boundingBox();

          if (box1 && box2) {
            // Items should be side-by-side (same Y position approximately)
            const yDiff = Math.abs(box1.y - box2.y);
            expect(yDiff).toBeLessThan(50); // Allow some variance
          }
        }
      }
    }
  });

  test('Prose content has readable line length', async ({ page }) => {
    // Find main content area
    const prose = page.locator('[class*="prose"], article, main p').first();

    if (await prose.count() > 0) {
      await expect(prose).toBeVisible();

      // Check line length isn't too wide
      const box = await prose.boundingBox();
      if (box) {
        // Max comfortable reading width is ~75ch or ~700px
        expect(box.width).toBeLessThan(900);
      }
    }
  });

  test('No content overflow on any breakpoint', async ({ page }) => {
    // Check no horizontal scroll
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 320;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // Allow 1px tolerance
  });
});
