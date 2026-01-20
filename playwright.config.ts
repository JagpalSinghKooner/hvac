import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for Responsive Testing
 * Tests all breakpoints: 320px, 768px, 1024px, 1440px
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],

  use: {
    baseURL: 'http://localhost:4322',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'mobile-320px',
      use: {
        ...devices['iPhone SE'],
        viewport: { width: 320, height: 568 }
      },
    },
    {
      name: 'tablet-768px',
      use: {
        ...devices['iPad Mini'],
        viewport: { width: 768, height: 1024 }
      },
    },
    {
      name: 'desktop-1024px',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 }
      },
    },
    {
      name: 'desktop-1440px',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 }
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
