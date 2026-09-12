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
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { PLANS, PLAN_ACCENTS, ACCENT_FALLBACK } from "./data";

// ===== Geometría del podio ascendente =====
const ARC_STEP = 0.34; // radianes entre tarjetas (arco suave)
const ARC_RADIUS = 8;

function cardPose(index: number) {
  const angle = (index - (PLANS.length - 1) / 2) * ARC_STEP;
  return {
    x: Math.sin(angle) * ARC_RADIUS,
    z: Math.cos(angle) * ARC_RADIUS - ARC_RADIUS, // centro al frente, bordes atrás
    y: 0.82 + index * 0.42, // escalera ascendente: económico abajo, premium arriba
    rotY: -angle,
  };
}

const tmpScale = new THREE.Vector3(1, 1, 1);

// ===== Iluminación cinematográfica (técnica HeroLights del repo) =====
function CinematicSpotLights() {
  return (
    <>
      {/* Luz clave sobre el podio */}
      <spotLight
        position={[0, 11, 7]}
        angle={0.5}
        penumbra={0.8}
        intensity={160}
        color="#ffffff"
      />
      {/* Contraluz esmeralda trasero */}
      <spotLight
        position={[-9, 6, -7]}
        angle={0.55}
        penumbra={1}
        intensity={120}
        color="#34d399"
      />
      {/* Lateral teal para volumen */}
      <spotLight
        position={[9, 4, -4]}
        angle={0.5}
        penumbra={1}
        intensity={80}
        color="#2dd4bf"
      />
    </>
  );
}

// ===== Partículas atmosféricas que caen (técnica Particles del repo) =====
function FallingParticles({ count = 110 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 26;
      positions[i * 3 + 1] = Math.random() * 12 + 1;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22 - 2;
      speeds[i] = 0.004 + Math.random() * 0.009;
    }
    return { positions, speeds };
  }, [count]);

  useFrame(() => {
    const geo = points.current?.geometry;
    if (!geo) return;
    const arr = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      let y = arr[i * 3 + 1];
      y -= speeds[i];
      if (y < -0.5) y = Math.random() * 10 + 3;
      arr[i * 3 + 1] = y;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#a7f3d0"
        size={0.055}
        transparent
        opacity={0.7}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ===== Tarjeta 3D de un plan =====
function PlanCard({
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
  const pose = useMemo(() => cardPose(index), [index]);
  const plan = PLANS[index];
  const accent = PLAN_ACCENTS[plan.id] ?? ACCENT_FALLBACK;
  const active = hovered || selected === index;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;
    group.current.position.set(
      pose.x,
      pose.y + Math.sin(t * 0.9 + index * 1.25) * 0.13,
      pose.z
    );
    group.current.rotation.y = pose.rotY + Math.sin(t * 0.45 + index) * 0.028;
    const s = active ? 1.07 : 1;
    group.current.scale.lerp(tmpScale.set(s, s, s), 0.12);
  });

  const setCursor = (v: boolean) => {
    document.body.style.cursor = v ? "pointer" : "auto";
  };

  return (
    <group
      ref={group}
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
      {/* Tarjeta */}
      <RoundedBox args={[2.4, 3.1, 0.16]} radius={0.09} smoothness={4}>
        <meshStandardMaterial
          color={active ? "#20202a" : "#151519"}
          metalness={0.55}
          roughness={0.28}
          emissive={active || plan.popular ? accent : "#000000"}
          emissiveIntensity={active ? 0.16 : plan.popular ? 0.1 : 0}
        />
        <Edges scale={1.01} color={active ? accent : plan.popular ? `${accent}55` : "#2c2c33"} />
      </RoundedBox>

      {/* Barra superior del color del plan */}
      <mesh position={[0, 1.42, 0.09]}>
        <planeGeometry args={[1.7, 0.09]} />
        <meshBasicMaterial color={accent} />
      </mesh>

      {/* Etiqueta siempre orientada a cámara */}
      <Html
        center
        distanceFactor={7}
        position={[0, 0.12, 0.32]}
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
          className={`pointer-events-auto w-40 cursor-pointer rounded-xl border px-3 py-2.5 text-center backdrop-blur-md transition-colors duration-200 ${
            active
              ? "bg-white dark:bg-zinc-950/85"
              : "border-zinc-300 dark:border-zinc-700/70 bg-white dark:bg-zinc-950/70 hover:bg-white dark:bg-zinc-950/90"
          }`}
          style={{
            borderColor: active ? accent : undefined,
            boxShadow: active ? `0 0 24px ${accent}59` : undefined,
          }}
          aria-pressed={selected === index}
        >
          <span className="block text-[13px] font-bold leading-tight text-zinc-100">
            {plan.name}
          </span>
          <span
            className="mt-0.5 block text-[15px] font-extrabold leading-tight"
            style={{ color: accent }}
          >
            {plan.price}
          </span>
          {plan.popular && (
            <span className="mt-1 block rounded-full bg-emerald-400 px-2 py-0.5 text-[9px] font-bold text-zinc-950">
              ★ LA MÁS PEDIDA
            </span>
          )}
        </button>
      </Html>
    </group>
  );
}

// ===== Pedestal + anillo del plan seleccionado =====
function Pedestal({
  index,
  isSelected,
}: {
  index: number;
  isSelected: boolean;
}) {
  const ring = useRef<THREE.Mesh>(null);
  const pose = useMemo(() => cardPose(index), [index]);
  const accent = PLAN_ACCENTS[PLANS[index].id] ?? ACCENT_FALLBACK;

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 0.9;
  });

  return (
    <group position={[pose.x, 0, pose.z]} rotation={[0, pose.rotY, 0]}>
      <RoundedBox
        args={[1.9, 0.16, 1.35]}
        radius={0.05}
        smoothness={3}
        position={[0, 0.08, 0]}
      >
        <meshStandardMaterial color="#191920" metalness={0.6} roughness={0.35} />
      </RoundedBox>
      {isSelected && (
        <mesh
          ref={ring}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.035, 0]}
        >
          <torusGeometry args={[1.28, 0.032, 12, 72]} />
          <meshStandardMaterial
            color="#111111"
            emissive={accent}
            emissiveIntensity={1.6}
          />
        </mesh>
      )}
    </group>
  );
}

// ===== Escena completa =====
export default function PricingScene({
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
      dpr={[1, 1.8]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 3.1, 13], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      aria-label="Escena 3D interactiva con los 6 planes: gira con el mouse y haz clic en una tarjeta para ver el detalle"
    >
      <fog attach="fog" args={["#0a0a0c", 15, 36]} />

      {/* Iluminación cinematográfica + base */}
      <CinematicSpotLights />
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 10, 6]} intensity={1.1} color="#e9fff5" />
      <pointLight
        position={[-7, 4, -2]}
        intensity={38}
        distance={24}
        decay={2}
        color="#34d399"
      />
      <pointLight
        position={[7, 3, -6]}
        intensity={26}
        distance={22}
        decay={2}
        color="#2dd4bf"
      />

      <Suspense fallback={null}>
        {/* Tarjetas y pedestales */}
        {PLANS.map((plan, i) => (
          <PlanCard
            key={plan.id}
            index={i}
            selected={selected}
            onSelect={onSelect}
          />
        ))}
        {PLANS.map((plan, i) => (
          <Pedestal key={`${plan.id}-pedestal`} index={i} isSelected={selected === i} />
        ))}

        {/* Piso */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
          <circleGeometry args={[28, 64]} />
          <meshStandardMaterial
            color="#0c0c0f"
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
        <gridHelper args={[56, 56, "#166534", "#1b1b20"]} position={[0, 0.001, 0]} />
        <ContactShadows
          position={[0, 0.02, 0]}
          scale={32}
          far={5}
          blur={2.6}
          opacity={0.5}
          color="#000000"
        />

        {/* Partículas flotantes */}
        <FallingParticles count={110} />
        <Sparkles
          count={90}
          scale={[20, 7, 20]}
          size={2.2}
          speed={0.32}
          color="#34d399"
          opacity={0.5}
          position={[0, 2.6, -2]}
        />

        {/* Entorno procedural: reflejos metálicos sin descargar HDRI */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            form="rect"
            intensity={3.5}
            color="#34d399"
            position={[-6, 4, 4]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[7, 1.4, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2}
            color="#e2fdf5"
            position={[6, 5, 3]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[6, 1.2, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.5}
            color="#2dd4bf"
            position={[0, 7, -6]}
            scale={[4, 4, 1]}
          />
        </Environment>
      </Suspense>

      {/* Bloom: aros emisivos y bordes activos brillan */}
      <EffectComposer>
        <Bloom
          intensity={0.55}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>

      {/* Controles de órbita: girar, zoom */}
      <OrbitControls
        makeDefault
        target={[0, 1.7, 0]}
        autoRotate
        autoRotateSpeed={0.55}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={7}
        maxDistance={22}
        minPolarAngle={0.55}
        maxPolarAngle={Math.PI / 2.08}
      />
    </Canvas>
  );
}
