"use client";

// Demos 3D temáticas — parte 2 (tarjetas 5-8, de $649 a la SaaS más premium).
// Cuanto más caro el plan, más viva la escena: oleaje + balanceo, ecualizador
// animado, tienda flotante con moneda y, en la cumbre, agentes de IA orbitando.

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { DoubleSide } from "three";
import type { Group, Mesh, MeshBasicMaterial, MeshStandardMaterial } from "three";

/* ===== 5 · Yates — Blog / Medio Digital ($649): oleaje y balanceo ===== */

const RIPPLES = 5;

export function BarcosScene() {
  const boat = useRef<Group>(null);
  const rings = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (boat.current) {
      boat.current.position.y = -0.6 + Math.sin(t * 1.35) * 0.07;
      boat.current.rotation.z = Math.sin(t * 1.05) * 0.055;
      boat.current.rotation.x = Math.sin(t * 0.8 + 1) * 0.03;
    }
    for (let i = 0; i < RIPPLES; i++) {
      const m = rings.current[i];
      if (!m) continue;
      const p = (t * 0.4 + i / RIPPLES) % 1;
      const s = 0.35 + p * 1.9;
      m.scale.set(s, s, s);
      (m.material as MeshBasicMaterial).opacity = (1 - p) * 0.55;
    }
  });

  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[3, 5, 4]} intensity={1} />
      <pointLight position={[-3, 1.2, -2]} intensity={16} color="#2dd4bf" />
      <Sparkles count={26} scale={[5, 2.4, 3.5]} position={[0, 0.4, 0]} size={1.8} speed={0.35} color="#99f6e4" />

      {/* agua */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.07, 48]} />
        <meshStandardMaterial color="#0f766e" metalness={0.55} roughness={0.25} />
      </mesh>
      {/* ondas expansivas */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          ref={(m) => {
            rings.current[i] = m;
          }}
          position={[0, -0.85, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[0.5, 0.016, 6, 42]} />
          <meshBasicMaterial color="#5eead4" transparent opacity={0.4} />
        </mesh>
      ))}

      {/* velero que se balancea */}
      <group ref={boat} position={[0, -0.6, 0]}>
        {/* casco */}
        <mesh>
          <boxGeometry args={[1.7, 0.34, 0.62]} />
          <meshStandardMaterial color="#fafaf9" roughness={0.35} metalness={0.15} />
        </mesh>
        {/* proa */}
        <mesh position={[1.12, -0.02, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[1, 1, 0.62]}>
          <coneGeometry args={[0.31, 0.55, 4]} />
          <meshStandardMaterial color="#fafaf9" roughness={0.35} metalness={0.15} />
        </mesh>
        {/* franja del casco */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[1.72, 0.09, 0.64]} />
          <meshStandardMaterial color="#0d9488" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* cabina con ventana iluminada */}
        <mesh position={[-0.15, 0.26, 0]}>
          <boxGeometry args={[0.62, 0.3, 0.44]} />
          <meshStandardMaterial color="#f0fdfa" roughness={0.3} />
        </mesh>
        <mesh position={[-0.15, 0.26, 0.225]}>
          <planeGeometry args={[0.4, 0.16]} />
          <meshStandardMaterial color="#5eead4" emissive="#2dd4bf" emissiveIntensity={1.2} />
        </mesh>
        {/* mástil y vela */}
        <mesh position={[0.35, 0.75, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 1.5, 10]} />
          <meshStandardMaterial color="#a8a29e" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[-0.02, 0.85, 0]} rotation={[0, 0, 0.06]}>
          <planeGeometry args={[0.62, 1.05]} />
          <meshStandardMaterial color="#ffffff" roughness={0.6} side={DoubleSide} />
        </mesh>
        {/* banderín */}
        <mesh position={[0.35, 1.55, 0]}>
          <boxGeometry args={[0.16, 0.09, 0.02]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.6} />
        </mesh>
      </group>
    </>
  );
}

/* ===== 6 · Conciertos — Web de Eventos ($799): vinilo + ecualizador ===== */

const EQ_COLORS = [
  "#f43f5e",
  "#fb7185",
  "#f97316",
  "#f59e0b",
  "#c026d3",
  "#d946ef",
  "#a855f7",
  "#e879f9",
  "#f0abfc",
];

export function EventosScene() {
  const vinyl = useRef<Group>(null);
  const bars = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (vinyl.current) vinyl.current.rotation.y = t * 1.4;
    for (let i = 0; i < EQ_COLORS.length; i++) {
      const m = bars.current[i];
      if (!m) continue;
      const h = 0.35 + Math.abs(Math.sin(t * 2.3 + i * 0.75)) * 1.15;
      m.scale.y = h;
      m.position.y = -0.95 + h / 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <spotLight position={[2.5, 5, 3]} angle={0.6} penumbra={0.8} intensity={140} color="#e879f9" />
      <pointLight position={[-3, 1.5, 2]} intensity={12} color="#fb923c" />
      {/* vinilo girando sobre plinto */}
      <mesh position={[-1.05, -0.88, -0.4]}>
        <cylinderGeometry args={[0.55, 0.62, 0.14, 28]} />
        <meshStandardMaterial color="#1c1c21" roughness={0.6} />
      </mesh>
      <group position={[-1.05, 0.05, -0.4]} rotation={[0.06, 0, 0]}>
        <group ref={vinyl}>
          <mesh>
            <cylinderGeometry args={[0.85, 0.85, 0.05, 40]} />
            <meshStandardMaterial color="#131316" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.032, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 0.012, 24]} />
            <meshStandardMaterial color="#d946ef" emissive="#d946ef" emissiveIntensity={0.5} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
            <meshStandardMaterial color="#fafafa" />
          </mesh>
        </group>
      </group>
      {/* ecualizador animado */}
      <group position={[0.85, 0, 0]}>
        {EQ_COLORS.map((c, i) => (
          <mesh
            key={c}
            ref={(m) => {
              bars.current[i] = m;
            }}
            position={[(i - 4) * 0.19, -0.6, 0]}
          >
            <boxGeometry args={[0.13, 1, 0.13]} />
            <meshStandardMaterial color={c} emissive={c} emissiveIntensity={0.65} roughness={0.35} />
          </mesh>
        ))}
        <mesh position={[0, -0.98, 0]}>
          <boxGeometry args={[1.9, 0.08, 0.4]} />
          <meshStandardMaterial color="#1c1c21" roughness={0.6} />
        </mesh>
      </group>
      {/* altavoces flotando */}
      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.9}>
        <group position={[-0.4, 1.35, -1.1]}>
          <mesh>
            <boxGeometry args={[0.5, 0.7, 0.3]} />
            <meshStandardMaterial color="#232329" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.12, 0.16]}>
            <torusGeometry args={[0.13, 0.035, 8, 24]} />
            <meshStandardMaterial color="#e879f9" emissive="#e879f9" emissiveIntensity={1.4} />
          </mesh>
          <mesh position={[0, -0.18, 0.16]}>
            <torusGeometry args={[0.08, 0.03, 8, 20]} />
            <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1.2} />
          </mesh>
        </group>
      </Float>
      <Float speed={2.6} rotationIntensity={0.3} floatIntensity={1}>
        <group position={[1.35, 1.2, -0.7]}>
          <mesh>
            <boxGeometry args={[0.34, 0.5, 0.2]} />
            <meshStandardMaterial color="#232329" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.06, 0.11]}>
            <torusGeometry args={[0.09, 0.028, 8, 20]} />
            <meshStandardMaterial color="#f0abfc" emissive="#f0abfc" emissiveIntensity={1.3} />
          </mesh>
        </group>
      </Float>
    </>
  );
}

/* ===== 7 · Moda — Tienda Online ($1,199): bolsas flotantes + moneda ===== */

export function TiendaScene() {
  const coin = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (coin.current) {
      coin.current.rotation.y += delta * 1.8;
      coin.current.position.y = 1.2 + Math.sin(t * 1.6) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.42} />
      <spotLight position={[2.5, 5.5, 2.5]} angle={0.65} penumbra={0.9} intensity={130} />
      <pointLight position={[-3, 1.5, -1.5]} intensity={16} color="#fb7185" />
      <Sparkles count={24} scale={[4.5, 2.8, 3]} position={[0, 0.7, 0]} size={1.8} speed={0.35} color="#fecdd3" />

      {/* pedestal */}
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[2.05, 2.2, 0.09, 40]} />
        <meshStandardMaterial color="#1c1c21" roughness={0.55} />
      </mesh>

      {/* bolsa principal */}
      <Float speed={1.8} rotationIntensity={0.2} floatIntensity={0.9}>
        <group position={[0, 0.3, 0]}>
          <mesh>
            <boxGeometry args={[0.85, 0.95, 0.4]} />
            <meshStandardMaterial color="#fb7185" roughness={0.45} />
          </mesh>
          {[0.13, -0.13].map((z) => (
            <mesh key={z} position={[0, 0.62, z]}>
              <torusGeometry args={[0.22, 0.03, 10, 28, Math.PI]} />
              <meshStandardMaterial color="#fda4af" roughness={0.4} />
            </mesh>
          ))}
          <mesh position={[0, 0.05, 0.21]}>
            <circleGeometry args={[0.16, 24]} />
            <meshStandardMaterial color="#fff1f2" />
          </mesh>
        </group>
      </Float>

      {/* bolsa secundaria ámbar */}
      <Float speed={2.3} rotationIntensity={0.3} floatIntensity={1}>
        <group position={[1.15, 0.1, -0.3]} scale={0.72} rotation={[0, 0.4, 0]}>
          <mesh>
            <boxGeometry args={[0.85, 0.95, 0.4]} />
            <meshStandardMaterial color="#fbbf24" roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.62, 0.12]}>
            <torusGeometry args={[0.22, 0.03, 10, 28, Math.PI]} />
            <meshStandardMaterial color="#fde68a" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.62, -0.12]}>
            <torusGeometry args={[0.22, 0.03, 10, 28, Math.PI]} />
            <meshStandardMaterial color="#fde68a" roughness={0.4} />
          </mesh>
        </group>
      </Float>

      {/* caja de regalo teal */}
      <Float speed={2} rotationIntensity={0.35} floatIntensity={1.1}>
        <group position={[-1.2, 0.15, -0.2]} scale={0.8} rotation={[0, -0.35, 0]}>
          <mesh>
            <boxGeometry args={[0.55, 0.55, 0.55]} />
            <meshStandardMaterial color="#14b8a6" roughness={0.4} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.58, 0.12, 0.12]} />
            <meshStandardMaterial color="#fdf2f8" roughness={0.35} />
          </mesh>
          <mesh>
            <boxGeometry args={[0.12, 0.58, 0.12]} />
            <meshStandardMaterial color="#fdf2f8" roughness={0.35} />
          </mesh>
        </group>
      </Float>

      {/* moneda dorada girando (descuentos) */}
      <group ref={coin} position={[-0.9, 1.2, 0.4]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.06, 28]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.18} emissive="#b45309" emissiveIntensity={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.26, 0.02, 8, 32]} />
          <meshStandardMaterial color="#fde68a" metalness={0.9} roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* etiqueta de precio colgante */}
      <Float speed={2.4} rotationIntensity={0.45} floatIntensity={1.2}>
        <group position={[0.85, 1.45, 0]} rotation={[0, 0, 0.5]}>
          <mesh>
            <boxGeometry args={[0.36, 0.2, 0.03]} />
            <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={0.7} roughness={0.35} />
          </mesh>
          <mesh position={[-0.13, 0.06, 0]}>
            <torusGeometry args={[0.028, 0.012, 8, 16]} />
            <meshStandardMaterial color="#ecfdf5" />
          </mesh>
        </group>
      </Float>
    </>
  );
}

/* ===== 8 · Agentes IA — Aplicación Web / SaaS ($4,999+): la escena más viva ===== */

const AGENT_COLORS = ["#34d399", "#e879f9", "#fbbf24"];

function DataCube({ index }: { index: number }) {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!ref.current) return;
    const a = t * (0.5 + index * 0.22) + index * 2.1;
    const r = 2.05 + index * 0.12;
    ref.current.position.set(
      Math.cos(a) * r,
      0.4 + Math.sin(t * 1.2 + index) * 0.35,
      Math.sin(a) * r * 0.55
    );
    ref.current.rotation.x = t * 1.3 + index;
    ref.current.rotation.y = t * 0.9;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.11, 0.11, 0.11]} />
      <meshStandardMaterial color="#c4b5fd" emissive="#8b5cf6" emissiveIntensity={1.4} />
    </mesh>
  );
}

export function AgentesIAScene() {
  const core = useRef<Mesh>(null);
  const shell = useRef<Mesh>(null);
  const orbitA = useRef<Group>(null);
  const orbitB = useRef<Group>(null);
  const coreMat = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      const s = 1 + Math.sin(t * 2) * 0.055;
      core.current.scale.set(s, s, s);
      core.current.rotation.y += delta * 0.4;
    }
    if (coreMat.current) coreMat.current.emissiveIntensity = 1.6 + Math.sin(t * 2) * 0.7;
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.55;
      shell.current.rotation.x += delta * 0.2;
    }
    if (orbitA.current) orbitA.current.rotation.y = t * 0.85;
    if (orbitB.current) orbitB.current.rotation.y = -t * 0.65 + 1.5;
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <spotLight position={[2.5, 5.5, 3]} angle={0.6} penumbra={0.9} intensity={150} />
      <pointLight position={[-3, 1.8, -2]} intensity={20} color="#a855f7" />
      <pointLight position={[2.8, 0.8, 2.4]} intensity={14} color="#d946ef" />
      <Sparkles count={55} scale={[5.5, 3.4, 4]} position={[0, 0.6, 0]} size={2.2} speed={0.45} color="#c4b5fd" />

      {/* núcleo pulsante */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.52, 1]} />
        <meshStandardMaterial ref={coreMat} color="#7c3aed" emissive="#8b5cf6" emissiveIntensity={1.8} roughness={0.25} metalness={0.4} />
      </mesh>
      {/* envoltura wireframe contra-rotando */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshBasicMaterial color="#e879f9" wireframe transparent opacity={0.5} />
      </mesh>

      {/* órbita A con 2 agentes */}
      <group rotation={[0.55, 0, 0.3]}>
        <group ref={orbitA}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.25, 0.018, 8, 64]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.1} />
          </mesh>
          {AGENT_COLORS.slice(0, 2).map((c, i) => (
            <mesh key={c} position={[i === 0 ? 1.25 : -1.25, 0, 0]}>
              <sphereGeometry args={[0.09, 14, 14]} />
              <meshStandardMaterial color={c} emissive={c} emissiveIntensity={2.2} />
            </mesh>
          ))}
        </group>
      </group>

      {/* órbita B con 2 agentes */}
      <group rotation={[-0.5, 0, -0.45]}>
        <group ref={orbitB}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.55, 0.014, 8, 64]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={0.9} />
          </mesh>
          <mesh position={[0, 0, 1.55]}>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2.2} />
          </mesh>
          <mesh position={[0, 0, -1.55]}>
            <sphereGeometry args={[0.08, 14, 14]} />
            <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={2.2} />
          </mesh>
        </group>
      </group>

      {/* cubos de datos orbitando */}
      {[0, 1, 2].map((i) => (
        <DataCube key={i} index={i} />
      ))}
    </>
  );
}
