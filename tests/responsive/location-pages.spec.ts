import { test, expect } from '@playwright/test';

test.describe('Location Pages Responsive Design', () => {
  // Test a representative location page
  const testLocationUrl = '/locations/guelph/';

  test.beforeEach(async ({ page }) => {
    await page.goto(testLocationUrl);
  });

  test('should display properly at all breakpoints', async ({ page }, testInfo) => {
    // LocationHero: H1 visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // CTAs should be accessible
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Screenshot for current viewport
    await page.screenshot({
      path: `playwright-report/screenshots/location-${testInfo.project.name}.png`,
      fullPage: true,
    });
  });

  test('Service cards grid is responsive', async ({ page }, testInfo) => {
    // Look for service cards section
    const serviceSection = page.locator('section').filter({
      hasText: /services|we offer/i
    }).first();

    if (await serviceSection.count() > 0) {
      await expect(serviceSection).toBeVisible();

      // Find cards
      const cards = serviceSection.locator('[class*="card"], article, a[href*="/services/"]').filter({
        hasNotText: /^$/
      });
      const cardCount = await cards.count();

      if (cardCount > 0) {
        // On mobile (320px), cards should stack
        if (testInfo.project.name === 'mobile-320px') {
          const firstCard = cards.first();
          const box = await firstCard.boundingBox();
          if (box) {
            // Card should be nearly full width
            expect(box.width).toBeGreaterThan(280);
          }
        }

        // On desktop (1024px+), cards should be in grid
        if (testInfo.project.name === 'desktop-1024px' && cardCount >= 3) {
          const firstCard = cards.first();
          const secondCard = cards.nth(1);

          const box1 = await firstCard.boundingBox();
          const box2 = await secondCard.boundingBox();

          if (box1 && box2) {
            // Cards should be side-by-side
            const yDiff = Math.abs(box1.y - box2.y);
            expect(yDiff).toBeLessThan(100);
          }
        }
      }
    }
  });

  test('Content is readable at all sizes', async ({ page }) => {
    // Check main content
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();

    // Text shouldn't be cut off
    const paragraphs = mainContent.locator('p');
    const pCount = await paragraphs.count();

    if (pCount > 0) {
      const firstP = paragraphs.first();
      await expect(firstP).toBeVisible();

      // Check it's not overflowing
      const box = await firstP.boundingBox();
      if (box) {
        const viewportWidth = page.viewportSize()?.width || 320;
        expect(box.width).toBeLessThanOrEqual(viewportWidth);
      }
    }
  });

  test('No horizontal scroll', async ({ page }) => {
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 320;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });
});
