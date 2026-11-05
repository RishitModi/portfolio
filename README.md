# Rishit Modi — Portfolio

Personal developer portfolio showcasing software engineering, AI/ML research projects, and competitive programming achievements.

## Features

- **3-column layout:** Sticky sidebar and right rail flanking a fluid main content feed.
- **Scroll-spy navigation:** Active section detection with smooth-scroll linking.
- **About:** Overview of technical skills and categorized core stack with primary proficiency markers and staggered entrance animation.
- **Project cards:** Rich cards with lazy-loading demo videos, live links, and interactive doc previews.
- **Education timeline:** Responsive roadmap tracking academic milestones from school through university with horizontal scroll-snap on desktop and vertical flow on mobile.
- **Professional experience:** Industry roles featuring bulleted impact points, role tags, and a work sample image gallery with a native `<dialog>` lightbox modal.
- **Competitive programming stats:** Deploy-time ratings and stats for LeetCode, Codeforces, and CodeChef, shipped as a static JSON file with SVG sparklines and visible generation timestamps. CodeChef uses a best-effort profile-page parse with hand-maintained fallbacks.
- **Reduced-motion support:** Full accessibility support honoring `prefers-reduced-motion` across animations, transitions, and smooth scrolling.

## Tech Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 4

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check TypeScript code
npm run typecheck

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

```text
src/
├── app/
│   ├── components/       # UI sections (hero, about, education, experience, projects, sidebar, etc.)
│   └── App.tsx           # Main application root and layout wrapper
├── hooks/                # Custom React hooks (scroll animations, LeetCode stats)
├── lib/
│   ├── content.ts        # Single source of truth for profile, links, projects, skills & CP floors
│   └── cp.ts             # CP peak-category and solved-total helpers
│   └── scroll.ts         # Accessible smooth scroll helper utilities
└── styles/
    ├── fonts.css         # Font imports (Inter variable)
    ├── tailwind.css      # Tailwind v4 configuration
    └── theme.css         # Color tokens, cursor styles, and base resets
```

## Editing Content

All portfolio data — including profile details, social links, resume URL, navigation items, education stages (`EDUCATION`), professional roles (`EXPERIENCE_PROFESSIONAL`), projects, and skill categories (`SKILL_CATEGORIES`) — is centralized in [`src/lib/content.ts`](src/lib/content.ts). Experience work sample images should be placed in `public/images/experience/` (e.g. `handshake-ai-1.png`, `handshake-ai-2.png`). To update copy or external links, edit this file directly without touching individual UI components.

## Deployment

Automated deployment to GitHub Pages is handled by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to the `main` branch with the base path `/portfolio/`.

The deploy job runs the dependency-free CP stats fetcher every six hours and also supports a manual **Run workflow** dispatch. It writes `public/data/cp-stats.json` at build time; the browser reads only that static file and never calls third-party stats APIs. `EXTRA_SOLVED`, `TOTAL_SOLVED_FLOOR`, and the hand-maintained `HERO_PEAKS` floor values live in `src/lib/content.ts`.
