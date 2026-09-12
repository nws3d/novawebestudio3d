"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Edges,
  Environment,
  Html,
  Lightformer,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { PAGE_TYPES, TYPE_ACCENTS, ACCENT_FALLBACK } from "./data";

/* =========================================================
   ALMACÉN 3D DE PÁGINAS — showroom circular con los 8 tipos
   Inspirado en el topic github 3d-website:
   - galería de productos en 3D (Shape Library / product tours)
   - color por elemento (paleta económica→premium)
   - luces multicolor + partículas + bloom
   ========================================================= */

const RING_RADIUS = 5.6;
const STEP = (Math.PI * 2) / PAGE_TYPES.length;

function pose(i: number) {
  const a = i * STEP;
  return {
    x: Math.sin(a) * RING_RADIUS,
    z: Math.cos(a) * RING_RADIUS,
    rotY: a, // mira hacia afuera del anillo
  };
}

const tmpScale = new THREE.Vector3(1, 1, 1);

// ----- Panel 3D de un tipo de página -----
function TypePanel({
  index,
  selected,
  onSelect,
}: {
  index: number;
  selected: number;
  onSelect: (i: number) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const tipo = PAGE_TYPES[index];
  const accent = TYPE_ACCENTS[tipo.id] ?? ACCENT_FALLBACK;
  const active = hovered || selected === index;
  const p = useMemo(() => pose(index), [index]);

  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.set(
      p.x,
      1.35 + Math.sin(t * 0.85 + index * 1.7) * 0.11,
      p.z
    );
    group.current.rotation.y = p.rotY;
    const s = active ? 1.12 : 1;
    group.current.scale.lerp(tmpScale.set(s, s, s), 0.12);
    if (ring.current) ring.current.rotation.z += delta * 0.8;
  });

  const setCursor = (v: boolean) => {
    document.body.style.cursor = v ? "pointer" : "auto";
  };

  return (
    <group ref={group}>
      {/* Panel */}
      <RoundedBox
        args={[1.72, 2.25, 0.12]}
        radius={0.08}
        smoothness={4}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          setCursor(true);
        }}
        onPointerOut={() => {
          setHovered(false);
          setCursor(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
      >
        <meshStandardMaterial
          color={active ? "#1d1d24" : "#141418"}
          metalness={0.6}
          roughness={0.26}
          emissive={active ? accent : "#000000"}
          emissiveIntensity={active ? 0.22 : 0}
        />
        <Edges scale={1.01} color={active ? accent : "#2a2a31"} />
      </RoundedBox>

      {/* "Pantalla" interior del panel, con el color del tipo */}
      <mesh position={[0, 0.28, 0.065]}>
        <planeGeometry args={[1.42, 1.05]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      <mesh position={[-0.28, -0.32, 0.065]}>
        <planeGeometry args={[0.86, 0.075]} />
        <meshBasicMaterial color="#e4e4e7" />
      </mesh>
      <mesh position={[-0.18, -0.5, 0.065]}>
        <planeGeometry args={[0.66, 0.075]} />
        <meshBasicMaterial color="#a1a1aa" />
      </mesh>
      <mesh position={[0.42, -0.72, 0.065]}>
        <planeGeometry args={[0.5, 0.16]} />
        <meshBasicMaterial color={accent} />
      </mesh>

      {/* Aro luminoso bajo el panel seleccionado */}
      {selected === index && (
        <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.28, 0]}>
          <torusGeometry args={[1.15, 0.035, 10, 64]} />
          <meshStandardMaterial
            color="#111"
            emissive={accent}
            emissiveIntensity={1.6}
          />
        </mesh>
      )}

      {/* Etiqueta HTML siempre legible */}
      <Html
        center
        distanceFactor={7.5}
        position={[0, -1.62, 0.1]}
        zIndexRange={[30, 0]}
        wrapperClass="nw-html-pointer"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          onPointerOver={() => {
            setHovered(true);
            setCursor(true);
          }}
          onPointerOut={() => {
            setHovered(false);
            setCursor(false);
          }}
          className={`pointer-events-auto w-36 cursor-pointer rounded-xl border bg-white dark:bg-zinc-950/80 px-2.5 py-2 text-center backdrop-blur-md transition-colors duration-200 ${
            active ? "shadow-lg" : "border-zinc-300 dark:border-zinc-700/70 hover:bg-white dark:bg-zinc-950/95"
          }`}
          style={{
            borderColor: active ? accent : undefined,
            boxShadow: active ? `0 0 22px ${accent}55` : undefined,
          }}
          aria-pressed={selected === index}
        >
          <span className="block truncate text-[12px] font-bold leading-tight text-zinc-100">
            {tipo.name}
          </span>
          <span
            className="mt-0.5 block text-[13px] font-extrabold leading-tight"
            style={{ color: accent }}
          >
            {tipo.price}
          </span>
        </button>
      </Html>
    </group>
  );
}

// ----- Núcleo creativo central multicolor -----
function CreativeCore() {
  const core = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={core} position={[0, 1.5, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.85]} />
        <meshStandardMaterial
          color="#052e22"
          emissive="#10b981"
          emissiveIntensity={0.55}
          wireframe
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[0.45]} />
        <meshStandardMaterial
          color="#3b0764"
          emissive="#e879f9"
          emissiveIntensity={1.1}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
      {/* Esferas satélite en colores del arcoíris */}
      {["#a3e635", "#facc15", "#fb923c", "#2dd4bf"].map((c, i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh
            key={c}
            position={[Math.sin(a) * 1.5, Math.sin(a * 2) * 0.35, Math.cos(a) * 1.5]}
          >
            <sphereGeometry args={[0.11, 20, 20]} />
            <meshStandardMaterial
              color={c}
              emissive={c}
              emissiveIntensity={1.3}
            />
          </mesh>
        );
      })}
      <pointLight intensity={12} distance={7} color="#e879f9" />
    </group>
  );
}

// ----- Luces multicolor (vida: verde, teal, ámbar, rosa) -----
function RainbowLights() {
  return (
    <>
      <spotLight
        position={[0, 12, 6]}
        angle={0.5}
        penumbra={0.9}
        intensity={150}
        color="#ffffff"
      />
      <spotLight position={[-8, 5, 4]} angle={0.5} penumbra={1} intensity={90} color="#a3e635" />
      <spotLight position={[8, 5, 4]} angle={0.5} penumbra={1} intensity={80} color="#2dd4bf" />
      <spotLight position={[-7, 4, -7]} angle={0.55} penumbra={1} intensity={70} color="#fbbf24" />
      <spotLight position={[7, 4, -7]} angle={0.55} penumbra={1} intensity={70} color="#fb7185" />
      <pointLight position={[0, 2.4, 0]} intensity={8} color="#e879f9" />
      <ambientLight intensity={0.42} />
    </>
  );
}

// ----- Escena completa (el "almacén") -----
export default function ShowroomScene({
  selected,
  onSelect,
  active = true,
}: {
  selected: number;
  onSelect: (i: number) => void;
  active?: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 1.7]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 2.6, 11], fov: 44 }}
      gl={{ antialias: true, alpha: true }}
      className="cursor-grab"
      aria-label="Almacén 3D interactivo con los 8 tipos de páginas: arrastra para girar el carrusel y haz clic en un panel para ver el detalle"
    >
      <fog attach="fog" args={["#0a0a0c", 14, 34]} />
      <RainbowLights />

      <Suspense fallback={null}>
        {PAGE_TYPES.map((t, i) => (
          <TypePanel key={t.id} index={i} selected={selected} onSelect={onSelect} />
        ))}
        <CreativeCore />

        {/* Piso */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[24, 64]} />
          <meshStandardMaterial color="#0c0c0f" roughness={0.95} metalness={0.05} />
        </mesh>
        <gridHelper args={[48, 48, "#1f3d2f", "#1b1b20"]} position={[0, 0.001, 0]} />
        <ContactShadows
          position={[0, 0.02, 0]}
          scale={26}
          far={4.5}
          blur={2.6}
          opacity={0.45}
          color="#000000"
        />

        {/* Brillos multicolor flotando */}
        {[
          { c: "#a3e635", p: [-6, 3, -3] as const },
          { c: "#facc15", p: [6, 3.4, -2] as const },
          { c: "#fb7185", p: [-5, 4.5, 3] as const },
          { c: "#e879f9", p: [5, 4.2, 3] as const },
        ].map((s) => (
          <SparklesMini key={s.c} color={s.c} position={[s.p[0], s.p[1], s.p[2]]} />
        ))}

        <Environment resolution={128} frames={1}>
          <Lightformer form="rect" intensity={3} color="#34d399" position={[-5, 3, 4]} rotation={[0, Math.PI / 4, 0]} scale={[6, 1.2, 1]} />
          <Lightformer form="rect" intensity={2.2} color="#fbbf24" position={[5, 4, 3]} rotation={[0, -Math.PI / 4, 0]} scale={[5, 1, 1]} />
          <Lightformer form="circle" intensity={1.6} color="#e879f9" position={[0, 6, -5]} scale={[3.5, 3.5, 1]} />
        </Environment>
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.62} luminanceSmoothing={0.85} mipmapBlur />
      </EffectComposer>

      <OrbitControls
        makeDefault
        target={[0, 1.2, 0]}
        autoRotate
        autoRotateSpeed={0.5}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={6.5}
        maxDistance={19}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

// Mini capa de chispas por color (pocas, baratas)
function SparklesMini({ color, position }: { color: string; position: [number, number, number] }) {
  return (
    <points frustumCulled={false} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[
            new Float32Array(
              Array.from({ length: 18 * 3 }, () => (Math.random() - 0.5) * 5)
            ),
            3,
          ]}
        />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.09} transparent opacity={0.75} depthWrite={false} sizeAttenuation />
    </points>
  );
}
