```markdown
# harsh.dev // Developer Portfolio

> A hyper-interactive, terminal-inspired developer portfolio integrating 3D environments, physics-based UI, and live-system aesthetics. 

Designed to reflect the environment of a backend systems engineer, this portfolio moves beyond standard templates by incorporating WebGL data-flows, mock server log streams, and an IDE-style project explorer. 

**Live Deployment:** [harsh-zoro-personal-portfolio.vercel.app](https://harsh-zoro-personal-portfolio.vercel.app)

## System Features

* **3D Particle Network Background:** A React Three Fiber-powered data node network that reacts to cursor movement, representing distributed backend architecture.
* **IDE Project Explorer:** Projects (including the Latent Diffusion Model and NLP tools) are navigated via a functional VS Code-style file tree with dynamic syntax highlighting.
* **Live Server Log Simulation:** Background processes visually stream mock Java stack traces, SQL queries, and Linux grep commands based on real production debugging experience.
* **Physics-Based Skill Cloud:** A draggable, soft-physics layout for backend and ML technologies (Java, Spring Boot, PyTorch, Distributed DBs).
* **Terminal Contact Interface:** A command-line style contact form integrated with Resend for email routing, complete with a hidden `sudo` Easter egg.


## Tech Stack

**Frontend (Deployed on Vercel)**
* React.js / Next.js
* `@react-three/fiber` & `@react-three/drei` (3D rendering)
* `framer-motion` (Fluid page transitions and glassmorphism tilts)
* Tailwind CSS (Styling and neon-cyan/green accenting)

**Backend & Services (Deployed on Render)**
* Node.js / Express (API routing)
* **Resend API:** Handling secure email forwarding from the terminal contact form.


## Local Development (Boot Sequence)

To spin up the local development server, ensure you have Node.js installed and follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/portfolio.git](https://github.com/yourusername/portfolio.git)
   cd portfolio

```

2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env.local` file in the root directory and add your Resend API credentials and backend routing endpoints:
```env
NEXT_PUBLIC_RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_BACKEND_URL=[https://your-render-backend-url.onrender.com](https://your-render-backend-url.onrender.com)

```


4. **Initialize local server:**
```bash
npm run dev

```


*System status: online at `http://localhost:3000*`


## Featured Projects

* `latent-diffusion-model`: Resource-efficient text-to-image generation utilizing PyTorch and VAE compression.
* `text-summarization-tool`: NLP implementation utilizing Transformers for long-form content distillation.
* `openai-chatbot`: Conversational assistant built with clean prompt routing and a human-first interface.


## Communication Protocol

Feel free to reach out for software engineering roles, production system discussions, or AI/ML applications.

* **Email:** porikaharsha1427@gmail.com
* **LinkedIn:** [linkedin.com/in/harsha0252](https://www.google.com/search?q=https://linkedin.com/in/harsha0252)
