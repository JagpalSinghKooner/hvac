import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.bapheating.ca',
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
  image: {
    // Use Sharp for image optimization (default in Astro 5)
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false, // Allow processing of large images
      },
    },
    // Default formats for optimization
    formats: ['avif', 'webp'],
    // Responsive breakpoints
    experimentalResponsiveImages: true,
  },
});
