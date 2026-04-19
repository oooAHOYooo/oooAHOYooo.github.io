# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ahoy Indie Media is a New Haven-based independent streaming platform celebrating creative voices in the community. The public-facing website is a pure HTML static site with zero dependencies on build tools or frameworks.

**Philosophy**: Code-independent, framework-free architecture. The codebase intentionally avoids external dependencies like Google or Facebook—all styling and interactivity is self-contained.

## Architecture

### Core Pages
- **`newhaven.html`** (71KB) — Main landing page featuring an interactive Three.js underwater scene with animated jellyfish, particles, and gallery frames. Contains all styling and JavaScript inline. This is the primary engagement page directing users to the app.
- **`index.html`** — Minimal redirect page (ahoy.ooo → app.ahoy.ooo). Displays loading animation and transfers to the app subdomain.
- **`newhaven-gallery.json`** — Gallery image metadata for the landing page gallery grid.

### API & Serverless
- **`api/track-redirect.js`** and **`api/track-redirect-resend.js`** — Vercel serverless functions for tracking redirect events. Configured in `vercel.json` with 10-second max duration.

### Workshop & Legacy Code
- **`workshop/`** — Contains experimental, old, and alternate versions of pages. Safe to ignore for main development; these are archived attempts and prototypes.
- **Old code** should not be modified unless explicitly restoring a feature.

## Development Workflow

### Local Testing
No build step is required. To test locally:
```bash
# Start a simple HTTP server (Python 3)
python3 -m http.server 8000

# Then visit http://localhost:8000/newhaven.html
```

Or use Claude Code's `/dev` command to launch a dev server.

### File Structure
- HTML files at root directory (`.html`)
- CSS can be inline in `<style>` tags or external (e.g., `newhaven.css`)
- JavaScript is inline in `<script>` tags within each HTML file
- Images referenced via relative or absolute URLs (often Google Cloud Storage)

## Key Technologies

### Three.js Usage (newhaven.html)
- **Canvas ID**: `canvas-bg` (fixed background layer)
- **Scene Setup**: 800×600 unit world with parallax depth, day/night lighting cycles, fog effects
- **3D Elements**: Jellyfish (backend), fish, sharks, sea creatures, surfers, scattered gallery frames
- **Interaction**: Mouse parallax, click-to-drag creatures, scroll-depth visual effects
- **Performance**: Creatures and particles are pooled/reused; old objects are cleaned up

### CSS & Styling
- Liquid glass aesthetic: `backdrop-filter: blur()`, semi-transparent backgrounds, inset shadows
- Color palette: Blue (#64b4ff), purple (#9d7eff), dark navy background (#0a0e27)
- No external CSS frameworks; all custom

### Three.js Gallery Frames
- Dynamically loaded textures from Google Cloud Storage
- 18 scattered 3D frames with gentle floating/rotation animations
- Opacity: 0.45 (softened to blend with underwater scene)

## Content & Links

### External Services
- **App Subdomain**: `https://app.ahoy.ooo` — Points to the Ahoy app (separate repository)
- **Events/Podcasts**: `https://app.ahoy.ooo/events` and `https://app.ahoy.ooo/podcasts`
- **Google Play Store**: `https://play.google.com/store/apps/details?id=ooo.ahoy.app&pcampaignid=web_share` (currently available)
- **App Store & Mac**: Coming soon
- **Google Cloud Storage**: Images served from `https://storage.googleapis.com/ahoy-dynamic-content/`

## Design Notes

### Liquid Glass Theme
- Cards use `rgba(100, 180, 255, 0.08)` to `0.2` with `backdrop-filter: blur(12px)`
- Inset shadows for depth: `inset 0 0 20px rgba(100, 180, 255, 0.05)`
- Hover states lift cards with `transform: translateY(-4px)` and increase opacity/glow

### Navigation & CTAs
- Fixed nav bar with blur background and reduced opacity links
- Buttons use monospace font (`IBM Plex Mono`) for code aesthetic
- Arrow indicators (→) on clickable cards make navigation obvious

### Accessibility & Mobile
- Responsive design for mobile (nav-links hidden below 768px)
- Floating-images removed; all visuals use Three.js for consistency
- No emoji icons in UI (use styled divs or SVG alternatives)

## Git & Deployment

### Deployment
- Hosted on Vercel and GitHub Pages
- `vercel.json` configures serverless function limits
- Changes to `.html` files are automatically deployed

### Commit Style
- Recent commits focus on visual polish ("Enhance newhaven landing page", "Simplify splash page")
- Branch: `main`

## Common Tasks

### Updating the Landing Page
Edit `newhaven.html`:
1. Modify inline `<style>` for CSS changes
2. Update HTML structure in the container
3. Adjust Three.js scene parameters in the `<script>` section
4. Test locally with dev server

### Adding New Gallery Images
1. Upload image to Google Cloud Storage (or update image URL)
2. Update gallery URLs in `createGalleryFrames()` function (around line 1297)
3. Verify texture loading in Three.js callback

### Adjusting Three.js Scene
- **Creature counts**: Modify `createFish()`, `createJellyfish()`, etc. initialization calls
- **Lighting**: Update `light1`, `light2`, `ambientLight` in `updateDayNightCycle()`
- **Camera behavior**: Adjust `camera.position` calculations in `animate()` function
- **Particle effects**: Modify bubble, light ray, and tornado particle spawning in animation loop

### Styling Cards & CTAs
- Feature cards: `.feature` class
- Event items: `.event-item` class
- Download section: `.download-section` and `.download-link` classes
- All use liquid glass aesthetic with hover lift effects

## Notes for Future Development

- Three.js scene is CPU-intensive for lower-end devices; optimize particle counts if needed
- Gallery frames opacity set to 0.45 for softened appearance; adjust via `opacity` in material creation
- No build tool or transpilation; ensure ES6 syntax is compatible with target browsers
- Image CDN is Google Cloud Storage; ensure URLs remain valid and are referenced correctly
- The `workshop/` folder contains experimental code; do not use as reference for new features

## Contact & Philosophy

- Founder/CTO: Alex Gonzalez
- Vision: Create a code-independent, ad-free media platform celebrating New Haven's creative community
- Contributor inquiries: contributors@ahoy.ooo
- Investment inquiries: invest@ahoy.ooo
