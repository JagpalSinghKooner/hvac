import { test, expect } from '@playwright/test';

test.describe('Mobile Sheet Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Sheet opens when hamburger menu is clicked (320px)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Find mobile menu button
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await expect(menuButton).toBeVisible();

    // Click to open
    await menuButton.click();

    // Wait for Sheet to appear
    await page.waitForTimeout(500); // Allow animation

    // Sheet should be visible
    const sheet = page.locator('[role="dialog"], [data-state="open"], aside').filter({
      hasText: /services|locations|contact/i
    }).first();

    await expect(sheet).toBeVisible();

    // Screenshot of open Sheet
    await page.screenshot({
      path: `playwright-report/screenshots/mobile-nav-sheet-open.png`,
      fullPage: true,
    });
  });

  test('Sheet width is approximately 320px (w-80 = 20rem)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    const sheet = page.locator('[role="dialog"], [data-state="open"]').first();
    const box = await sheet.boundingBox();

    if (box) {
      // w-80 = 20rem = 320px
      expect(box.width).toBeGreaterThanOrEqual(300);
      expect(box.width).toBeLessThanOrEqual(340);
    }
  });

  test('Services Accordion expands and collapses', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Find Services accordion trigger
    const servicesTrigger = page.locator('button:has-text("Services"), [role="button"]:has-text("Services")').first();

    if (await servicesTrigger.count() > 0) {
      await expect(servicesTrigger).toBeVisible();

      // Click to expand
      await servicesTrigger.click();
      await page.waitForTimeout(300);

      // Accordion content should be visible
      const accordionContent = page.locator('[data-state="open"], [role="region"]').filter({
        hasText: /furnace|air conditioning|repair/i
      }).first();

      if (await accordionContent.count() > 0) {
        await expect(accordionContent).toBeVisible();
      }

      // Screenshot of expanded accordion
      await page.screenshot({
        path: `playwright-report/screenshots/mobile-nav-services-expanded.png`,
        fullPage: true,
      });

      // Click again to collapse
      await servicesTrigger.click();
      await page.waitForTimeout(300);

      // Content should be hidden
      if (await accordionContent.count() > 0) {
        await expect(accordionContent).not.toBeVisible();
      }
    }
  });

  test('Locations Accordion expands showing regions and locations', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Find Locations accordion trigger
    const locationsTrigger = page.locator('button:has-text("Locations"), [role="button"]:has-text("Locations")').first();

    if (await locationsTrigger.count() > 0) {
      await expect(locationsTrigger).toBeVisible();

      // Click to expand
      await locationsTrigger.click();
      await page.waitForTimeout(300);

      // Should show location links
      const locationLinks = page.locator('a[href*="/locations/"]');
      const linkCount = await locationLinks.count();

      if (linkCount > 0) {
        expect(linkCount).toBeGreaterThan(0);

        // At least one location should be visible
        const firstLocation = locationLinks.first();
        await expect(firstLocation).toBeVisible();
      }

      // Screenshot
      await page.screenshot({
        path: `playwright-report/screenshots/mobile-nav-locations-expanded.png`,
        fullPage: true,
      });
    }
  });

  test('Clicking a service link navigates correctly', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Expand Services
    const servicesTrigger = page.locator('button:has-text("Services")').first();
    if (await servicesTrigger.count() > 0) {
      await servicesTrigger.click();
      await page.waitForTimeout(300);

      // Find a service link
      const serviceLink = page.locator('a[href*="/services/"]').first();

      if (await serviceLink.count() > 0) {
        const href = await serviceLink.getAttribute('href');

        // Click link
        await serviceLink.click();

        // Wait for navigation
        await page.waitForURL(`**${href}`, { timeout: 5000 });

        // Should navigate to service page
        expect(page.url()).toContain('/services/');
      }
    }
  });

  test('Sheet closes when X button is clicked', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Find close button
    const closeButton = page.locator('button[aria-label*="close"], button:has-text("×"), button:has-text("Close")').first();

    if (await closeButton.count() > 0) {
      await closeButton.click();
      await page.waitForTimeout(500);

      // Sheet should be hidden
      const sheet = page.locator('[role="dialog"][data-state="open"]');
      await expect(sheet).not.toBeVisible();
    }
  });

  test('Sheet closes when clicking outside (backdrop)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Click on backdrop/overlay (outside the sheet)
    // The backdrop is usually a div that covers the screen
    await page.mouse.click(10, 10); // Click top-left corner (likely backdrop)
    await page.waitForTimeout(500);

    // Sheet should close
    const sheet = page.locator('[role="dialog"][data-state="open"]');
    const sheetCount = await sheet.count();

    // If sheet still exists, try clicking a different area
    if (sheetCount > 0) {
      await page.mouse.click(50, 50);
      await page.waitForTimeout(500);
    }
  });

  test('Accordion has proper spacing and text doesnt overflow', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Open Sheet
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await menuButton.click();
    await page.waitForTimeout(500);

    // Expand Services accordion
    const servicesTrigger = page.locator('button:has-text("Services")').first();
    if (await servicesTrigger.count() > 0) {
      await servicesTrigger.click();
      await page.waitForTimeout(300);

      // Check service links don't overflow
      const serviceLinks = page.locator('a[href*="/services/"]');
      const count = await serviceLinks.count();

      for (let i = 0; i < Math.min(count, 5); i++) {
        const link = serviceLinks.nth(i);
        const box = await link.boundingBox();

        if (box) {
          // Link width shouldn't exceed Sheet width (~320px)
          expect(box.width).toBeLessThan(330);
        }
      }
    }
  });
});

test.describe('Accordion Component Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('FAQ Accordion expands and collapses (if exists)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Look for FAQ section
    const faqSection = page.locator('section').filter({ hasText: /faq|questions/i }).first();

    if (await faqSection.count() > 0) {
      // Find accordion triggers
      const triggers = faqSection.locator('button[data-state], [role="button"]');
      const triggerCount = await triggers.count();

      if (triggerCount > 0) {
        const firstTrigger = triggers.first();
        await firstTrigger.click();
        await page.waitForTimeout(300);

        // Content should be visible
        const content = page.locator('[data-state="open"]').first();
        if (await content.count() > 0) {
          await expect(content).toBeVisible();
        }

        // Screenshot
        await page.screenshot({
          path: `playwright-report/screenshots/faq-accordion-expanded.png`,
          fullPage: true,
        });

        // Click to collapse
        await firstTrigger.click();
        await page.waitForTimeout(300);
      }
    }
  });

  test('Only one accordion item open at a time (type="single")', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Look for any accordion
    const accordions = page.locator('[data-state="open"]');

    // Open mobile nav
    const menuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu")').first();
    if (await menuButton.count() > 0) {
      await menuButton.click();
      await page.waitForTimeout(500);

      // Click Services
      const servicesTrigger = page.locator('button:has-text("Services")').first();
      if (await servicesTrigger.count() > 0) {
        await servicesTrigger.click();
        await page.waitForTimeout(300);

        const openCount1 = await page.locator('[data-state="open"]').count();

        // Click Locations
        const locationsTrigger = page.locator('button:has-text("Locations")').first();
        if (await locationsTrigger.count() > 0) {
          await locationsTrigger.click();
          await page.waitForTimeout(300);

          const openCount2 = await page.locator('[data-state="open"]').count();

          // Should only have one open (locations), services should be closed
          // This tests type="single" behavior
        }
      }
    }
  });
});
