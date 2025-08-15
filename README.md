# SLOPEN

Single-page local guide for Stará Ľubovňa (restaurants, cafes, pubs, clubs) built with React + Vite + Tailwind in a Netflix-inspired UI.

## Features
- Fast single-page React app (Vite)
- Tailwind Netflix-dark theme
- Local favourites (no login) stored in `localStorage`
- Filter by type, open status, search by name
- Responsive grid + accessible semantics
- About section with video (left) + text (right)
- SEO meta tags + social OG basics

## Dev Quickstart
```
npm install
npm run dev
```

## Build
```
npm run build
npm run preview
```

## Performance / SEO Notes
- Preload critical fonts if self-hosted (future enhancement)
- Use compressed / optimized images (current placeholders from Unsplash)
- Lighthouse target: 95+ (ensure proper image sizing & caching when deploying)
- Add manifest + service worker for PWA capabilities (future)

## Data
Currently static seed file in `src/data/venues.ts`. Extend or wire to CMS / sheet.

## License
Community use only (add explicit license later if needed).
