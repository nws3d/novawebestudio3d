"use client";

// Demos 3D temáticas — parte 1 (tarjetas 1-4, del plan económico al intermedio).
// Regla de la casa: la sofisticación de cada escena escala con el precio del plan
// (Landing $149 = formas simples y luz plana → Web Corporativa $599 = escena completa).

import { useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group, MeshStandardMaterial } from "three";

/* ===== 1 · Comida — Landing Page ($149): lo más simple y directo ===== */

const SESAMES: [number, number, number][] = [
  [-0.22, 0.68, 0.14],
  [0.05, 0.72, -0.1],
  [0.24, 0.66, 0.12],
  [-0.05, 0.7, 0.24],
  [0.12, 0.69, 0.28],
];

const FRIES: [number, number, number, number][] = [
  [-0.12, 0.3, 0.05, 0.18],
  [0.02, 0.33, -0.04, -0.14],
  [0.14, 0.29, 0.08, 0.22],
  [-0.02, 0.34, 0.1, -0.24],
  [0.08, 0.31, -0.09, 0.1],
];

export function ComidaScene() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 2]} intensity={1.15} />
      <group ref={group} position={[0, -0.45, 0]}>
        {/* plato */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.07, 40]} />
          <meshStandardMaterial color="#e7e5e4" roughness={0.35} />
        </mesh>
        {/* hamburguesa: pan, carne, queso, lechuga y pan superior */}
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.58, 0.62, 0.16, 32]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.64, 0.64, 0.13, 32]} />
          <meshStandardMaterial color="#7c2d12" roughness={0.85} />
        </mesh>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0.5, 0]}>
          <boxGeometry args={[0.92, 0.05, 0.92]} />
          <meshStandardMaterial color="#facc15" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.66, 0.58, 0.08, 24]} />
          <meshStandardMaterial color="#84cc16" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.46, 0]} scale={[1, 0.62, 1]}>
          <sphereGeometry args={[0.62, 32, 20]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.55} />
        </mesh>
        {SESAMES.map((p, i) => (
          <mesh key={i} position={p} scale={[1, 0.7, 1]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#fff7ed" roughness={0.5} />
          </mesh>
        ))}
        {/* papas fritas */}
        <group position={[1.05, 0.16, 0.42]} rotation={[0, -0.55, 0]}>
          <mesh>
            <boxGeometry args={[0.46, 0.34, 0.34]} />
            <meshStandardMaterial color="#dc2626" roughness={0.5} />
          </mesh>
          {FRIES.map((f, i) => (
            <mesh key={i} position={[f[0], f[1], f[2]]} rotation={[0, 0, f[3]]}>
              <boxGeometry args={[0.07, 0.36, 0.07]} />
              <meshStandardMaterial color="#fde047" roughness={0.6} />
            </mesh>
          ))}
        </group>
        {/* bebida con pajita */}
        <group position={[-1.02, 0.2, 0.35]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.18, 0.56, 20]} />
            <meshStandardMaterial color="#f87171" roughness={0.25} transparent opacity={0.92} />
          </mesh>
          <mesh position={[0.07, 0.42, 0]} rotation={[0, 0, -0.35]}>
            <cylinderGeometry args={[0.028, 0.028, 0.46, 8]} />
            <meshStandardMaterial color="#fafafa" roughness={0.3} />
          </mesh>
        </group>
      </group>
    </>
  );
}

/* ===== 2 · Motos — Web de Negocio Local ($199): ruedas girando + acento rojo ===== */

function Wheel({ spinRef }: { spinRef: RefObject<Group | null> }) {
  return (
    <>
      <mesh>
        <torusGeometry args={[0.4, 0.12, 14, 36]} />
        <meshStandardMaterial color="#18181b" roughness={0.85} />
      </mesh>
      <group ref={spinRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.13, 0.13, 0.1, 12]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.85} roughness={0.25} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI) / 3]}>
            <boxGeometry args={[0.58, 0.045, 0.05]} />
            <meshStandardMaterial color="#f87171" metalness={0.4} roughness={0.35} />
          </mesh>
        ))}
      </group>
    </>
  );
}

export function MotoScene() {
  const rear = useRef<Group>(null);
  const front = useRef<Group>(null);
  const body = useRef<Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (rear.current) rear.current.rotation.z -= delta * 3.4;
    if (front.current) front.current.rotation.z -= delta * 3.4;
    if (body.current) body.current.position.y = -0.72 + Math.sin(t * 2.1) * 0.035;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.05} />
      <pointLight position={[-3, 1.6, -2.2]} intensity={20} color="#ef4444" />
      <group ref={body} position={[0, -0.72, 0]}>
        {/* ruedas con radios girando */}
        <group position={[-0.82, 0.55, 0]}>
          <Wheel spinRef={rear} />
        </group>
        <group position={[0.92, 0.55, 0]}>
          <Wheel spinRef={front} />
        </group>
        {/* chasis */}
        <mesh position={[0.05, 0.82, 0]} rotation={[0, 0, 0.32]}>
          <boxGeometry args={[1.25, 0.13, 0.15]} />
          <meshStandardMaterial color="#dc2626" metalness={0.55} roughness={0.35} />
        </mesh>
        {/* depósito */}
        <mesh position={[0.28, 1.05, 0]} scale={[1.5, 0.62, 1]}>
          <sphereGeometry args={[0.3, 24, 16]} />
          <meshStandardMaterial color="#b91c1c" metalness={0.6} roughness={0.28} />
        </mesh>
        {/* asiento */}
        <mesh position={[-0.42, 1.06, 0]}>
          <boxGeometry args={[0.58, 0.09, 0.22]} />
          <meshStandardMaterial color="#111113" roughness={0.9} />
        </mesh>
        {/* escape cromado */}
        <mesh position={[-0.25, 0.58, 0.17]} rotation={[0, 0, Math.PI / 2 - 0.12]}>
          <cylinderGeometry args={[0.06, 0.08, 0.85, 12]} />
          <meshStandardMaterial color="#d4d4d8" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* horquilla y manubrio */}
        <mesh position={[0.92, 0.86, 0]} rotation={[0, 0, 0.42]}>
          <boxGeometry args={[0.5, 0.09, 0.09]} />
          <meshStandardMaterial color="#a1a1aa" metalness={0.85} roughness={0.3} />
        </mesh>
        <mesh position={[1.02, 1.16, 0]}>
          <boxGeometry args={[0.1, 0.08, 0.46]} />
          <meshStandardMaterial color="#111113" roughness={0.8} />
        </mesh>
        {/* faro encendido */}
        <mesh position={[1.16, 1.02, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={2.2} />
        </mesh>
        {/* líneas de velocidad */}
        {[
          [0.35, -2.3],
          [0.75, -2.6],
          [1.15, -2.05],
        ].map((l, i) => (
          <mesh key={i} position={[l[1], l[0], 0]}>
            <boxGeometry args={[1.1 - i * 0.25, 0.025, 0.025]} />
            <meshBasicMaterial color="#f87171" transparent opacity={0.45} />
          </mesh>
        ))}
      </group>
    </>
  );
}

/* ===== 3 · Creativo — Portafolio / CV ($249): galería flotante ===== */

const FRAMES: {
  pos: [number, number, number];
  size: [number, number];
  body: string;
  screen: string;
  glow: string;
  rot: number;
  speed: number;
}[] = [
  { pos: [0, 0.35, 0], size: [1.2, 0.85], body: "#134e4a", screen: "#5eead4", glow: "#14b8a6", rot: 0, speed: 1.5 },
  { pos: [-1.5, 0.95, -0.7], size: [0.72, 0.52], body: "#3f3f46", screen: "#f0abfc", glow: "#d946ef", rot: 0.55, speed: 2.1 },
  { pos: [1.5, 0.1, -0.5], size: [0.64, 0.46], body: "#3f3f46", screen: "#fde68a", glow: "#f59e0b", rot: -0.5, speed: 1.8 },
];

const ORBS: [number, number, number, string][] = [
  [-1.05, 0.2, 0.55, "#2dd4bf"],
  [1.1, 1.35, 0.3, "#e879f9"],
  [-0.4, 1.65, -0.3, "#fbbf24"],
];

export function PortafolioScene() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <spotLight position={[2.5, 5, 3]} angle={0.6} penumbra={0.8} intensity={120} />
      <pointLight position={[-3, 1.5, -2]} intensity={12} color="#2dd4bf" />
      {/* plataforma de galería */}
      <mesh position={[0, -0.92, 0]}>
        <cylinderGeometry args={[2.1, 2.2, 0.08, 40]} />
        <meshStandardMaterial color="#1c1c21" roughness={0.6} />
      </mesh>
      {/* marcos de fotos flotando */}
      {FRAMES.map((f, i) => (
        <Float key={i} speed={f.speed} rotationIntensity={0.22} floatIntensity={0.85}>
          <group position={f.pos} rotation={[0, f.rot, 0]}>
            <mesh>
              <boxGeometry args={[f.size[0], f.size[1], 0.06]} />
              <meshStandardMaterial color={f.body} roughness={0.5} />
            </mesh>
            <mesh position={[0, 0, 0.035]}>
              <planeGeometry args={[f.size[0] * 0.82, f.size[1] * 0.74]} />
              <meshStandardMaterial color={f.screen} emissive={f.glow} emissiveIntensity={0.85} />
            </mesh>
          </group>
        </Float>
      ))}
      {/* orbes de luz (destellos creativos) */}
      {ORBS.map((o, i) => (
        <Float key={i} speed={2.2 + i * 0.3} rotationIntensity={0.4} floatIntensity={1.2}>
          <mesh position={[o[0], o[1], o[2]]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color={o[3]} emissive={o[3]} emissiveIntensity={1.6} />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/* ===== 4 · Casa — Web Corporativa / Inmobiliaria ($599): escena completa ===== */

export function CasaScene() {
  const group = useRef<Group>(null);
  const winMat = useRef<MeshStandardMaterial>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y += delta * 0.18;
    if (winMat.current) winMat.current.emissiveIntensity = 1.35 + Math.sin(t * 2.2) * 0.55;
  });

  return (
    <>
      <ambientLight intensity={0.38} />
      <directionalLight position={[4, 6, 3]} intensity={0.9} color="#fed7aa" />
      <pointLight position={[0, 3.4, -2.5]} intensity={26} color="#fb923c" />
      <group ref={group}>
        {/* terreno */}
        <mesh position={[0, -0.95, 0]}>
          <cylinderGeometry args={[2.35, 2.35, 0.09, 44]} />
          <meshStandardMaterial color="#3f6212" roughness={0.9} />
        </mesh>
        {/* cuerpo de la casa */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[1.5, 1.15, 1.15]} />
          <meshStandardMaterial color="#fafaf9" roughness={0.7} />
        </mesh>
        {/* techo de tejas */}
        <mesh position={[0, 0.58, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.18, 0.78, 4]} />
          <meshStandardMaterial color="#c2410c" roughness={0.6} />
        </mesh>
        {/* chimenea */}
        <mesh position={[0.48, 0.52, -0.3]}>
          <boxGeometry args={[0.16, 0.5, 0.16]} />
          <meshStandardMaterial color="#78716c" roughness={0.8} />
        </mesh>
        {/* puerta de madera */}
        <mesh position={[-0.32, -0.42, 0.58]}>
          <boxGeometry args={[0.3, 0.52, 0.05]} />
          <meshStandardMaterial color="#92400e" roughness={0.65} />
        </mesh>
        {/* ventana que late (luz cálida) */}
        <mesh position={[0.42, -0.2, 0.58]}>
          <planeGeometry args={[0.4, 0.34]} />
          <meshStandardMaterial ref={winMat} color="#fde68a" emissive="#f59e0b" emissiveIntensity={1.4} />
        </mesh>
        <mesh position={[0.42, -0.2, 0.585]}>
          <boxGeometry args={[0.05, 0.34, 0.01]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>
        {/* ventana lateral */}
        <mesh position={[0.76, -0.2, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.34, 0.3]} />
          <meshStandardMaterial color="#fde68a" emissive="#f59e0b" emissiveIntensity={1.1} />
        </mesh>
        {/* árboles */}
        {[
          [-1.55, 0.35],
          [1.5, -0.55],
        ].map((p, i) => (
          <group key={i} position={[p[0], -0.9, p[1]]}>
            <mesh position={[0, 0.22, 0]}>
              <cylinderGeometry args={[0.06, 0.08, 0.45, 8]} />
              <meshStandardMaterial color="#713f12" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.62, 0]}>
              <coneGeometry args={[0.32, 0.72, 10]} />
              <meshStandardMaterial color="#16a34a" roughness={0.8} />
            </mesh>
          </group>
        ))}
        {/* camino de piedras */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.32, -0.88, 0.85 + i * 0.3]}>
            <boxGeometry args={[0.3, 0.04, 0.2]} />
            <meshStandardMaterial color="#d6d3d1" roughness={0.9} />
          </mesh>
        ))}
        {/* sol de atardecer */}
        <mesh position={[-1.7, 1.5, -1.6]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshStandardMaterial color="#fdba74" emissive="#fb923c" emissiveIntensity={2.4} />
        </mesh>
      </group>
    </>
  );
}
