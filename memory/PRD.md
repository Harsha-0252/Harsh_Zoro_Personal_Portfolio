# PRD — Harshavardhan Porika Developer Portfolio

## Original Problem Statement
"Retro terminal meets modern IDE" developer portfolio: dark theme default with light-mode toggle, JetBrains Mono + sans-serif, neon green/cyan syntax accents. Boot-sequence intro, editor-tab nav, hero with typewriter roles + live IST clock, About (whoami terminal card), Experience (Ivanti changelog/commits with git-blame dates), Projects (GitHub repo cards with README expand), Skills (package.json dependency tags), Certifications badge row, terminal contact form with hidden `sudo` easter egg, one-click resume PDF, matrix-rain background, mobile responsive, fast load.

## Upgrade Request (Message 126) — Visual/Interaction Overhaul, Phased
Lazy-loaded React Three Fiber 3D particle hero, glitch text, fake system metrics, Framer Motion scroll/hover effects, two-pane IDE projects layout, matrix-rain easter egg. Constraints: keep color scheme/backend/env intact; combined new JS < 150KB gzipped; disable 3D/heavy effects on mobile + prefers-reduced-motion; deliver in phases, Phase 1 first (structure summary + Hero + 3D + install commands).

## Architecture
- Frontend: React 19 + craco (`/app/frontend/src/App.js` single-page, `/app/frontend/src/components/HeroParticles.js` lazy 3D chunk)
- Backend: FastAPI `/app/backend/server.py`, stateless except `POST /api/contact` (Resend email API)
- DB: MongoDB available via MONGO_URL, currently unused (stateless portfolio)
- 3D chunk: `React.lazy` + `Suspense`, gated on desktop width ≥769px and no prefers-reduced-motion

## Implemented (with dates)
- 2026-08 (earlier session): Full base portfolio — boot sequence, tab nav, hero w/ typewriter + IST clock, About/Experience/Projects/Skills/Certs/Contact sections, Resend contact API, direct PDF resume download, light-mode toggle, matrix rain, sudo easter egg. Deployed at harsha-zoro-dev.com.
- 2026-08-24 (Phase 1 upgrade): Added `three` + `@react-three/fiber`; created lazy-loaded `HeroParticles.js` (green/cyan point field, mouse parallax, low-power DPR cap); hero name glitch reveal (CSS-only, respects reduced-motion); fake cpu/mem/net system metrics with animated bars in hero status panel; Framer Motion staggered entrance for hero copy and status panel. Backend, colors, env untouched.

## Verification (2026-08-24)
- Frontend 200; 3D canvas + metrics + clock confirmed via screenshot; typewriter cycling.
- `POST /api/contact` returns success (email_id returned).
- NOT yet verified: bundle chunk size measurement, mobile-width rendering of hero (3D correctly skipped by gate, not visually confirmed), light mode with particles.

## Backlog (prioritized)
- P1 — Phase 2: About/Experience — scrolling mock logs backdrop, glassmorphism cards, 4-6° Framer Motion tilt
- P1 — Phase 3: Projects two-pane IDE layout with prismjs/highlight.js syntax highlighting (collapse to single pane on mobile)
- P1 — Phase 4: Skills responsive grid with Framer Motion idle float + hover glows
- P2 — Phase 5: full-screen matrix-rain overlay on `sudo` in contact; custom blinking terminal cursor block
- P2 — Measure gzipped chunk sizes (budget <150KB additions); visual check of mobile + light mode

## User Personas
- Recruiter/hiring manager scanning in <2s for "this person actually codes"
- Technical interviewer digging into projects/experience detail

## Next Tasks
1. Get user sign-off on Phase 1 hero
2. Phase 2 (About/Experience motion layer)
3. Phase 3 (Projects IDE layout — needs syntax highlighter dep choice: prismjs vs highlight.js)
