import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function ParticleField({ count = 850 }) {
  const ref = useRef();
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const green = [0, 1, 0.4];
    const cyan = [0, 0.9, 1];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
      const c = Math.random() > 0.72 ? cyan : green;
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y += delta * 0.035;
    g.rotation.x = Math.sin(state.clock.elapsedTime * 0.12) * 0.06 + state.pointer.y * 0.05;
    g.rotation.z = state.pointer.x * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors transparent opacity={0.6} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function HeroParticles() {
  return (
    <div className="hero-canvas" aria-hidden="true" data-testid="hero-3d-canvas">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
