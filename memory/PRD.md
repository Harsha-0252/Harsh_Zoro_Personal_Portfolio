# Harshavardhan Porika Developer Portfolio

## Original problem statement
Build a developer portfolio website with a retro terminal meets modern IDE aesthetic, dark theme by default with light-mode toggle, boot sequence, sticky IDE tab navigation, hero typewriter roles and IST clock, about whoami card, expandable Ivanti changelog, expandable project repository cards, skills dependency tags, certifications, terminal contact form with sudo easter egg, custom cursor, matrix background, smooth responsive presentation, and a prominent resume link.

## Architecture decisions
- React single-page portfolio using the existing frontend starter and CSS design system.
- No backend dependency is needed for the portfolio content; profile data is defined as presentation data in the React view.
- External resume, LinkedIn, email, and certification links are used exactly as provided.
- Contact submission is intentionally local-only for this version, with direct email link alongside it.

## Implemented
- Boot intro with skip control and terminal styling.
- Sticky editor-tab navigation, dark/light themes, IST clock, typewriter roles, matrix rain, responsive mobile layout.
- About whoami terminal, full Ivanti production experience log, three expandable projects, grouped skills, five certificate links.
- Contact terminal with sudo easter egg, direct email/LinkedIn links, and hero resume CTA.
- Added descriptive data-testid attributes across interactive and key informational elements.
- Updated skill dependencies: JavaScript replaces C++, AI/ML now highlights LLMs, RAGs, Prompt Engineering, and Diffusion & Generative Models, while Tools now includes Docker and Azure.
- Expanded skills with C, HTML/CSS3, Redis, Maven, Jenkins, and Core Engineering Concepts; refreshed role copy to Software Engineer and added EPMM product context.
- Replaced project summaries with polished README-style LDM, NLP Summarization, and Context-Aware OpenAI Chatbot details.
- Added Resend-backed `/api/contact` delivery with server-side credentials, reply-to support, validation, and a real name/email/message form.
- Converted the hero resume action to a one-click Google Docs PDF export with the filename `Harshavardhan-Porika-Resume.pdf`.

## Prioritized backlog
- P2: Add scroll-triggered reveal animation and richer project detail pages if desired.
