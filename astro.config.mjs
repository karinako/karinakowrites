import { defineConfig } from 'astro/config';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  // Set this to your GitHub repo name if deploying to GitHub Pages
  // e.g. base: '/my-repo-name'
  // Leave as '/' if using a custom domain on Cloudflare
  base: '/',
  output: 'static',
  site: 'https://yourdomain.com', // ← replace with your actual domain
});
