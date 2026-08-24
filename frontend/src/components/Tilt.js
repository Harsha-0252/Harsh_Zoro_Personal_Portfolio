import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const noMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(pointer: coarse)").matches;

export default function Tilt({ children, className = "", max = 5, ...rest }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  if (noMotion()) return <div className={className} {...rest}>{children}</div>;
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const leave = () => { mx.set(0.5); my.set(0.5); };
  return (
    <motion.div ref={ref} className={className} style={{ rotateX, rotateY, transformPerspective: 900 }} onMouseMove={move} onMouseLeave={leave} {...rest}>
      {children}
    </motion.div>
  );
}
