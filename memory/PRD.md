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
- 2026-08-24 (Phases 2-5 upgrade): `Tilt.js` (pointer-tracked 3-6° glassmorphism tilt, disabled on touch/reduced-motion) wraps About whoami card + Experience card; `LogStream.js` faint scrolling mock server logs behind both sections; `ProjectsIDE.js` two-pane IDE (Explorer file tree + Prism markdown syntax-highlighted README with line numbers, animated file switching) collapsing to horizontal tabs + single pane on mobile; Skills tags idle-float via Framer Motion with neon hover glow (reduced-motion aware); `MatrixRain.js` full-screen canvas matrix-rain takeover with fun fact + blinking cursor, triggered the instant "sudo" is typed in the contact terminal, dismissible via exit button or Esc. Added `prismjs` dep.

## Verification (2026-08-24)
- Frontend 200; 3D canvas + metrics + clock confirmed via screenshot; typewriter cycling.
- IDE: file switching works (summarization README renders highlighted); mobile 390px shows single-pane with tab strip; line numbers hidden on mobile.
- Sudo: overlay appears on typing "sudo", exit button + Esc close it; normal contact send still succeeds end-to-end.
- `POST /api/contact` returns success (email_id returned).
- Tilt/log streams confirmed present (2 log-stream regions, both glass cards mounted); tilt motion itself only spot-checked visually.
- NOT yet verified: bundle chunk size measurement (150KB budget), light mode with all new layers, fresh-load mobile gating of 3D canvas (gate runs at mount; resize after load does not remove it).

## Backlog (prioritized)
- P2 — Measure gzipped chunk sizes (budget <150KB additions); visual check of light mode with new layers (user flagged washed-out glow under light mode — log-stream/particles render dark-mode styling under white bg)
- P2 — Gate 3D canvas off on viewport shrink after load (currently mount-time only)

## Reverted Work
- 2026-08-24 (REVERTED same day): An attempted "premium restraint" redesign pass — amber #F2A93B single accent, #0B1220 bg, Fraunces display font, centered particle-assembly icosahedron hero, lenis smooth scroll, boot sequence removal. User rejected it and asked for full rollback to the green/cyan terminal design. Rollback completed and verified; lenis and Fraunces removed. Do not resurrect this direction without explicit user request.

## Content/Polish Update (2026-08-29, preview only — NOT pushed/deployed per user)
- Projects reordered to 5: db-engine (new, Java 21 DB engine README, repo link) → notiflow (new, Spring Boot/RabbitMQ/Redis resilience pipeline, repo link) → latent-diffusion-model → text-summarization-tool → openai-chatbot. Same data shape extended with optional `repo` field; repo link renders in IDE editor meta only when present (old 3 projects have no repo URLs — not invented).
- GitHub profile https://github.com/Harsha-0252 added to footer (icon link) and Contact direct-links.
- Hero flicker fix: glitch pseudo animations now run once (`linear 1 both`) then stop; `.cursor-block` hard blink replaced with 1.8s ease-in-out `breathe` pulse.
- Verified: tree order correct, both READMEs render highlighted with correct repo hrefs, both profile links present, computed styles confirm glitch iteration=1 and cursor animation=breathe.

## User Personas
- Recruiter/hiring manager scanning in <2s for "this person actually codes"
- Technical interviewer digging into projects/experience detail

## Next Tasks
1. Polish pass: light-mode check + bundle size audit
2. Optional: keyboard navigation for IDE file tree (arrow keys)
