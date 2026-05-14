"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useRef } from "react";
import { MathUtils } from "three";
import type { Mesh } from "three";

function Blob() {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;
    const targetX = mouse.y * 0.5;
    const targetY = mouse.x * 0.7;
    meshRef.current.rotation.x = MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX,
      0.05
    );
    meshRef.current.rotation.y = MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.05
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={2.5}
          roughness={0.05}
          ior={1.5}
          emissive="#ff00ff"
          emissiveIntensity={0.2}
          color="#2d0b5a"
          clearcoat={1}
          transparent
        />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 3] }} gl={{ alpha: true }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[2, 2, 3]} intensity={1.2} />
        <pointLight position={[-3, -2, -2]} intensity={0.6} />
        <Blob />
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette offset={0.2} darkness={0.6} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
