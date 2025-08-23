# Static Hosting Deployment Guide

## Overview

This Next.js application has been configured for static hosting with `output: 'export'`.

## Build Output

After running `npm run build`, the static files are generated in the `out/` directory.

## Deployment Options

### 1. Netlify

1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `out`
4. Deploy!

### 2. Vercel (Static Export)

1. Connect your repository to Vercel
2. Vercel will automatically detect the static export configuration
3. Deploy!

### 3. GitHub Pages

1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to "GitHub Actions"
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

### 4. Any Static Hosting Service

Upload the contents of the `out/` directory to any static hosting service:

- AWS S3 + CloudFront
- Firebase Hosting
- Surge.sh
- etc.

## Local Testing

To test the static build locally:

```bash
# Build the static export
npm run build

# Serve the static files
npx serve out
# or
cd out && python3 -m http.server 8080
```

## Configuration

The static export is configured in `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export', // Generate static files
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  // ... other config
};
```

## Notes

- All client-side functionality works as expected
- No server-side features (API routes, SSR) are available
- The app is fully self-contained in the `out/` directory
