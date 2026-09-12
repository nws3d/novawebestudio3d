"use client";

import { Suspense, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useSceneVisibility } from "./use-scene-visibility";

/* =========================================================
   Escena 3D del hero — técnicas profesionales inspiradas en
   adrianhajdin/3d-portfolio (2025):
   - Iluminación cinematográfica multi-capa (spot + point)
   - Partículas atmosféricas con BufferGeometry
   - Float de drei para composición flotante
   - Bloom selectivo vía post-processing
   - Environment procedural con Lightformers (sin red)
   - OrbitControls con límites de ángulo y distancia
   ========================================================= */

const tmpEuler = new THREE.Euler(0, 0, 0);

// ----- Parallax suave del conjunto siguiendo el puntero -----
// (hooks de R3F solo pueden usarse DENTRO del Canvas)
function ParallaxStage({ children }: { children: ReactNode }) {
  const stage = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!stage.current) return;
    tmpEuler.set(state.pointer.y * 0.08, state.pointer.x * 0.12, 0);
    stage.current.rotation.x += (tmpEuler.x - stage.current.rotation.x) * 0.045;
    stage.current.rotation.y += (tmpEuler.y - stage.current.rotation.y) * 0.045;
  });

  return <group ref={stage}>{children}</group>;
}

// ----- Iluminación cinematográfica (equivalente a HeroLights) -----
function CinematicLights() {
  return (
    <>
      {/* Luz clave blanca suave */}
      <spotLight
        position={[4, 6, 6]}
        angle={0.22}
        penumbra={0.6}
        intensity={140}
        color="#ffffff"
      />
      {/* Relleno esmeralda lateral */}
      <spotLight
        position={[-6, 4, 4]}
        angle={0.4}
        penumbra={1}
        intensity={90}
        color="#34d399"
      />
      {/* Contraluz teal */}
      <spotLight
        position={[5, 3, -6]}
        angle={0.45}
        penumbra={1}
        intensity={70}
        color="#2dd4bf"
      />
      {/* Atmosfera puntual multicolor */}
      <pointLight position={[0, 1.4, 1]} intensity={9} color="#10b981" />
      <pointLight position={[-3, 2, -3]} intensity={7} color="#fbbf24" />
      <pointLight position={[3, 2.4, -2]} intensity={6} color="#e879f9" />
      <ambientLight intensity={0.18} color="#0f2a22" />
    </>
  );
}

// ----- Partículas que caen lentamente (técnica del repo) -----
function FallingParticles({ count = 130 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = Math.random() * 10 + 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 1;
      speeds[i] = 0.004 + Math.random() * 0.008;
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
      if (y < -3) y = Math.random() * 9 + 4;
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
        size={0.05}
        transparent
        opacity={0.75}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ----- Laptop 3D (Pieza central mejorada) -----
import { useTexture, Text } from "@react-three/drei";

function BrowserWindow() {
  const screenGlow = useRef<THREE.Mesh>(null);
  
  // Cargar las texturas
  const mobaTexture = useTexture("/mockups/moba.jpg");
  mobaTexture.colorSpace = THREE.SRGBColorSpace;
  
  const keyboardTexture = useTexture("/mockups/keyboard.jpg");
  keyboardTexture.colorSpace = THREE.SRGBColorSpace;
  // Ajustar la textura del teclado para que encaje mejor
  keyboardTexture.repeat.set(1, 0.7);
  keyboardTexture.offset.set(0, 0.15);
  keyboardTexture.wrapS = THREE.RepeatWrapping;
  keyboardTexture.wrapT = THREE.RepeatWrapping;

  useFrame(({ clock }) => {
    if (screenGlow.current) {
      const mat = screenGlow.current.material as THREE.MeshStandardMaterial;
      // Pulsación suave para darle vida a la pantalla
      mat.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group rotation={[0.08, -0.4, 0]} position={[0, -0.2, 0]}>
      {/* Tapa / Pantalla */}
      <group position={[0, 0.3, -1.0]}>
        {/* Carcasa trasera de la pantalla */}
        <RoundedBox args={[4.2, 2.8, 0.1]} radius={0.05} smoothness={4} position={[0, 1.4, -0.05]}>
          <meshStandardMaterial color="#1a1a24" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        
        {/* Marco frontal negro */}
        <RoundedBox args={[4.2, 2.8, 0.02]} radius={0.05} smoothness={4} position={[0, 1.4, 0.01]}>
          <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
        </RoundedBox>

        {/* Pantalla iluminada con textura del juego MOBA */}
        <mesh ref={screenGlow} position={[0, 1.48, 0.021]}>
          <planeGeometry args={[4.0, 2.35]} />
          <meshStandardMaterial
            map={mobaTexture}
            emissiveMap={mobaTexture}
            emissive="#ffffff"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>

        {/* Marca de la Laptop */}
        <Text
          position={[0, 0.15, 0.022]}
          fontSize={0.08}
          color="#888"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          NovaWebEstudio3D
        </Text>
      </group>

      {/* Base de la laptop */}
      <group position={[0, 0.25, 0.4]}>
        {/* Chasis principal */}
        <RoundedBox
          args={[4.2, 0.16, 2.8]}
          radius={0.06}
          smoothness={4}
          position={[0, 0, 0]}
        >
          <meshStandardMaterial color="#1a1a24" metalness={0.75} roughness={0.3} />
        </RoundedBox>
        
        {/* Teclado realista */}
        <mesh position={[0, 0.082, -0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.8, 1.8]} />
          <meshStandardMaterial 
            map={keyboardTexture}
            emissiveMap={keyboardTexture}
            emissive="#ffffff"
            emissiveIntensity={0.6}
            roughness={0.5}
            metalness={0.2}
          />
        </mesh>

        {/* Trackpad */}
        <mesh position={[0, 0.081, 1.0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.6]} />
          <meshStandardMaterial color="#14141c" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Tira LED RGB frontal (Gaming feel) */}
        <mesh position={[0, 0, 1.41]}>
          <planeGeometry args={[4.0, 0.02]} />
          <meshStandardMaterial color="#000" emissive="#10b981" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

// ----- Formas satélite flotantes (Float de drei) — arcoíris de acentos -----
function SatelliteShapes() {
  return (
    <>
      <Float speed={2.2} rotationIntensity={0.9} floatIntensity={1.4}>
        <mesh position={[-2.9, 1.25, -0.6]}>
          <torusGeometry args={[0.42, 0.16, 20, 48]} />
          <meshStandardMaterial
            color="#4d7c0f"
            metalness={0.85}
            roughness={0.18}
            emissive="#a3e635"
            emissiveIntensity={0.55}
          />
        </mesh>
      </Float>

      <Float speed={1.7} rotationIntensity={1.1} floatIntensity={1.7}>
        <mesh position={[2.85, 1.5, -1.1]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#134e4a"
            metalness={0.6}
            roughness={0.25}
            emissive="#2dd4bf"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={2.6} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh position={[2.45, -1.35, -0.4]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.8}
            roughness={0.2}
            emissive="#facc15"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1.9} rotationIntensity={1.3} floatIntensity={1.6}>
        <mesh position={[-2.55, -1.45, -0.9]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial
            color="#fb7185"
            metalness={0.4}
            roughness={0.15}
            emissive="#fb7185"
            emissiveIntensity={0.75}
          />
        </mesh>
      </Float>

      {/* Cono fucsia (nuevo, más vida) */}
      <Float speed={2.1} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[-3.3, 0.1, -1.3]} rotation={[0.4, 0, 0.5]}>
          <coneGeometry args={[0.32, 0.7, 5]} />
          <meshStandardMaterial
            color="#e879f9"
            metalness={0.7}
            roughness={0.22}
            emissive="#e879f9"
            emissiveIntensity={0.55}
          />
        </mesh>
      </Float>

      {/* Aro naranja (nuevo) */}
      <Float speed={1.6} rotationIntensity={0.9} floatIntensity={1.8}>
        <mesh position={[3.4, -0.2, -1.5]} rotation={[1.1, 0.3, 0]}>
          <torusGeometry args={[0.34, 0.07, 14, 40]} />
          <meshStandardMaterial
            color="#fb923c"
            metalness={0.8}
            roughness={0.2}
            emissive="#fb923c"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Mini "tarjetas de página" orbitando (amarillo y fucsia) */}
      <Float speed={2.0} rotationIntensity={0.5} floatIntensity={1.8}>
        <RoundedBox
          args={[0.62, 0.84, 0.05]}
          radius={0.04}
          smoothness={3}
          position={[-1.9, 2.0, -1.4]}
          rotation={[0.1, 0.5, 0.08]}
        >
          <meshStandardMaterial
            color="#18181d"
            metalness={0.7}
            roughness={0.3}
            emissive="#facc15"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
      </Float>
      <Float speed={2.4} rotationIntensity={0.6} floatIntensity={1.5}>
        <RoundedBox
          args={[0.62, 0.84, 0.05]}
          radius={0.04}
          smoothness={3}
          position={[1.75, 2.15, -1.6]}
          rotation={[-0.08, -0.45, -0.06]}
        >
          <meshStandardMaterial
            color="#18181d"
            metalness={0.7}
            roughness={0.3}
            emissive="#e879f9"
            emissiveIntensity={0.4}
          />
        </RoundedBox>
      </Float>
    </>
  );
}

// ----- Escena completa -----
export default function Hero3DScene() {
  const { ref, mountedOnce, visible } = useSceneVisibility<HTMLDivElement>("240px");

  return (
    <div ref={ref} className="h-full w-full">
      {mountedOnce && (
        <Canvas
          dpr={[1, 1.75]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [0, 0.5, 8.6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          className="cursor-grab"
          aria-label="Escena 3D interactiva: arrastra para girar la composición de una página web flotante"
        >
      <fog attach="fog" args={["#0a0a0c", 12, 26]} />
      <CinematicLights />

      <Suspense fallback={null}>
        <ParallaxStage>
          <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.9}>
            <BrowserWindow />
          </Float>
          <SatelliteShapes />
        </ParallaxStage>

        <FallingParticles count={130} />
        <Sparkles
          count={60}
          scale={[12, 6, 8]}
          size={2}
          speed={0.3}
          color="#6ee7b7"
          opacity={0.55}
          position={[0, 1, -2]}
        />

        {/* Entorno procedural: reflejos metálicos sin descargar HDRI */}
        <Environment resolution={128} frames={1}>
          <Lightformer
            form="rect"
            intensity={4}
            color="#34d399"
            position={[-4, 2, 3]}
            rotation={[0, Math.PI / 4, 0]}
            scale={[6, 1.2, 1]}
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            color="#e2fdf5"
            position={[4, 3, 2]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[5, 1, 1]}
          />
          <Lightformer
            form="circle"
            intensity={1.8}
            color="#2dd4bf"
            position={[0, 5, -4]}
            scale={[3, 3, 1]}
          />
        </Environment>
      </Suspense>

      {/* Bloom: la pantalla y los strips emisivos brillan */}
      <EffectComposer>
        <Bloom
          intensity={0.85}
          luminanceThreshold={0.72}
          luminanceSmoothing={0.85}
          mipmapBlur
        />
      </EffectComposer>

      <OrbitControls
        makeDefault
        target={[0, -0.1, 0]}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        enableDamping
        dampingFactor={0.08}
        minDistance={5.5}
        maxDistance={14}
        minPolarAngle={Math.PI / 3.4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
      )}
    </div>
  );
}
