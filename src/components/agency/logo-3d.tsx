"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function LogoShape() {
  const diamondRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    // El diamante gira de forma constante
    if (diamondRef.current) {
      diamondRef.current.rotation.y += 0.02;
      diamondRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
    // El texto se balancea suavemente para ser legible
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      {/* Diamante 3D (Fondo) */}
      <mesh ref={diamondRef} position={[0, 0, -1.2]}>
        <octahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial 
          color="#10b981" 
          metalness={0.8} 
          roughness={0.2} 
          emissive="#34d399"
          emissiveIntensity={0.5}
        />
        {/* Wireframe tech del diamante */}
        <mesh>
          <octahedronGeometry args={[1.6, 0]} />
          <meshBasicMaterial color="#a7f3d0" wireframe />
        </mesh>
      </mesh>

      {/* Texto 3D (Frente) */}
      <group ref={groupRef} position={[0, 0, 0.5]}>
        {/* Sombra negra (Efecto 3D de grosor) */}
        <Text
          position={[-0.05, -0.05, -0.1]}
          fontSize={1.2}
          fontWeight="900"
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          NWE3D
        </Text>

        {/* Texto principal Blanco Puro */}
        <Text
          position={[0, 0, 0]}
          fontSize={1.2}
          fontWeight="900"
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf"
        >
          NWE3D
        </Text>
      </group>
    </Float>
  );
}

export function Logo3D() {
  return (
    <div className="flex h-10 w-10 items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 50 }} 
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#fff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#10b981" />
        <LogoShape />
      </Canvas>
    </div>
  );
}
