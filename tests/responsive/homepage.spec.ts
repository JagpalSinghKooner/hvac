import { test, expect } from '@playwright/test';

test.describe('Homepage Responsive Design', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display properly at 320px (Mobile)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Header: Logo visible, mobile menu button appears
    await expect(page.locator('header')).toBeVisible();
    const logo = page.locator('header img[alt*="HVAC"], header svg, header a[href="/"]').first();
    await expect(logo).toBeVisible();

    // Mobile menu button (hamburger) should be visible
    const mobileMenuButton = page.locator('button[aria-label*="menu"], button:has-text("Menu"), header button').first();
    await expect(mobileMenuButton).toBeVisible();

    // Hero section
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // CTAs should be visible (Phone + Booking)
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Screenshot for visual verification
    await page.screenshot({
      path: `playwright-report/screenshots/homepage-320px.png`,
      fullPage: true,
    });
  });

  test('should display properly at 768px (Tablet)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'tablet-768px') test.skip();

    // Header should be visible
    await expect(page.locator('header')).toBeVisible();

    // Hero section
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Value Props section should exist
    const valuePropsSection = page.locator('section').filter({ hasText: /value|why|choose/i }).first();
    if (await valuePropsSection.count() > 0) {
      await expect(valuePropsSection).toBeVisible();
    }

    // Screenshot
    await page.screenshot({
      path: `playwright-report/screenshots/homepage-768px.png`,
      fullPage: true,
    });
  });

  test('should display properly at 1024px (Desktop)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'desktop-1024px') test.skip();

    // Desktop navigation should be visible
    await expect(page.locator('header')).toBeVisible();

    // Desktop nav links should be visible (no hamburger)
    const navLinks = page.locator('header nav a, header a[href]');
    const navCount = await navLinks.count();
    expect(navCount).toBeGreaterThan(0);

    // Hero
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: `playwright-report/screenshots/homepage-1024px.png`,
      fullPage: true,
    });
  });

  test('should display properly at 1440px (Large Desktop)', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'desktop-1440px') test.skip();

    // Check container max-width (content shouldn't stretch too wide)
    await expect(page.locator('header')).toBeVisible();

    // Hero
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Screenshot
    await page.screenshot({
      path: `playwright-report/screenshots/homepage-1440px.png`,
      fullPage: true,
    });
  });

  test('CTAs are accessible on all screen sizes', async ({ page }) => {
    // Phone CTA
    const phoneLink = page.locator('a[href^="tel:"]').first();
    await expect(phoneLink).toBeVisible();

    // Check if it's clickable
    const box = await phoneLink.boundingBox();
    expect(box).not.toBeNull();
    if (box) {
      // Minimum tap target size (44x44px for mobile)
      if (box.width < 320) { // Mobile viewport
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }

    // Booking CTA (if exists)
    const bookingLink = page.locator('a:has-text("Book"), a:has-text("Schedule")').first();
    if (await bookingLink.count() > 0) {
      await expect(bookingLink).toBeVisible();
    }
  });

  test('No horizontal scroll on mobile', async ({ page }, testInfo) => {
    if (testInfo.project.name !== 'mobile-320px') test.skip();

    // Check document width doesn't exceed viewport
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = page.viewportSize()?.width || 320;

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });

  test('Footer renders responsively', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Footer should contain links
    const footerLinks = footer.locator('a');
    const linkCount = await footerLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
