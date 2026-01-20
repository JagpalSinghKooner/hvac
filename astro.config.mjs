import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
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
