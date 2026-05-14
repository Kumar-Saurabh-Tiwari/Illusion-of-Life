"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { MathUtils } from "three";
import type { Mesh } from "three";
import type { DirectionalLight, PointLight } from "three";
import gsap from "gsap";

function Blob() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const keyLightRef = useRef<DirectionalLight>(null);
  const glowLightRef = useRef<PointLight>(null);

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

  useEffect(() => {
    const handleHover = () => {
      if (keyLightRef.current) {
        gsap.to(keyLightRef.current, { intensity: 6, duration: 0.35, ease: "power2.out" });
      }
      if (glowLightRef.current) {
        gsap.to(glowLightRef.current, { intensity: 2.4, duration: 0.35, ease: "power2.out" });
      }
      if (materialRef.current) {
        gsap.to(materialRef.current, { transmission: 1, duration: 0.35, ease: "power2.out" });
      }
    };

    const handleLeave = () => {
      if (keyLightRef.current) {
        gsap.to(keyLightRef.current, { intensity: 4, duration: 0.4, ease: "power2.out" });
      }
      if (glowLightRef.current) {
        gsap.to(glowLightRef.current, { intensity: 1.2, duration: 0.4, ease: "power2.out" });
      }
      if (materialRef.current) {
        gsap.to(materialRef.current, { transmission: 0.95, duration: 0.4, ease: "power2.out" });
      }
    };

    window.addEventListener("work-hover", handleHover);
    window.addEventListener("work-leave", handleLeave);

    return () => {
      window.removeEventListener("work-hover", handleHover);
      window.removeEventListener("work-leave", handleLeave);
    };
  }, []);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.8}>
        <sphereGeometry args={[1, 160, 160]} />
        <MeshTransmissionMaterial
          ref={materialRef}
          transmission={0.95}
          thickness={2.5}
          roughness={0.2}
          ior={1.45}
          distortion={0.6}
          chromaticAberration={0.03}
          anisotropy={0.2}
          color="#3b0a6e"
        />
      </mesh>
      <directionalLight
        ref={keyLightRef}
        color="#9d4edd"
        intensity={4}
        position={[2, 2, 2]}
      />
      <pointLight
        ref={glowLightRef}
        color="#c77dff"
        intensity={1.2}
        position={[-2, -1, 2]}
      />
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 3] }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.35} />
        <Blob />
      </Canvas>
    </div>
  );
}
