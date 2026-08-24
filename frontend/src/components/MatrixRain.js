import { useEffect, useRef } from "react";

const CHARS = "01λΩπ∑<>/{}[]$#@=+*ｱｶｻﾀﾅﾊﾏﾔﾗﾜ".split("");

export default function MatrixRain({ onClose }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    ctx.fillStyle = "#060a0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => { window.removeEventListener("resize", resize); window.removeEventListener("keydown", esc); };
    }

    const fontSize = 14;
    const drops = Array.from({ length: Math.ceil(canvas.width / fontSize) }, () => Math.floor((Math.random() * canvas.height) / fontSize));
    let raf;
    let last = 0;
    const draw = (t) => {
      if (t - last > 50) {
        last = t;
        ctx.fillStyle = "rgba(6,10,15,0.14)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;
        for (let i = 0; i < drops.length; i++) {
          ctx.fillStyle = Math.random() > 0.975 ? "#00e5ff" : "#00ff66";
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); window.removeEventListener("keydown", esc); };
  }, [onClose]);

  return (
    <div className="matrix-overlay" data-testid="matrix-overlay" role="dialog" aria-label="sudo access granted">
      <canvas ref={canvasRef} />
      <div className="matrix-msg">
        <p className="green matrix-line">$ sudo make_me_a_sandwich</p>
        <p className="matrix-line">sudo access granted.</p>
        <p className="matrix-line">fun fact: Harsha once resolved a Sev-1 incident before his coffee went cold.</p>
        <p className="matrix-line muted">there are only 10 types of people — those who understand binary and those who don't.</p>
        <p className="cursor-block matrix-cursor">▋</p>
        <button className="matrix-exit" data-testid="matrix-close-button" onClick={onClose}>exit [esc]</button>
      </div>
    </div>
  );
}
