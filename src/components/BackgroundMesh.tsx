"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackgroundMesh() {
  const blobA = useRef<HTMLDivElement | null>(null);
  const blobB = useRef<HTMLDivElement | null>(null);
  const blobC = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const animations = [
      { target: blobA.current, x: 120, y: -80, duration: 18 },
      { target: blobB.current, x: -140, y: 100, duration: 22 },
      { target: blobC.current, x: 90, y: 140, duration: 20 },
    ].map(({ target, x, y, duration }) => {
      if (!target) return null;
      return gsap.to(target, {
        x,
        y,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      animations.forEach((animation) => animation?.kill());
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
      <div
        ref={blobA}
        className="absolute left-1/5 top-1/4 h-[36rem] w-[36rem] rounded-full bg-[#7c3aed] opacity-[0.55] blur-[220px]"
      />
      <div
        ref={blobB}
        className="absolute right-1/6 top-1/5 h-[38rem] w-[38rem] rounded-full bg-[#d946ef] opacity-[0.5] blur-[230px]"
      />
      <div
        ref={blobC}
        className="absolute bottom-0 left-1/4 h-[40rem] w-[40rem] rounded-full bg-[#8b5cf6] opacity-[0.45] blur-[240px]"
      />
    </div>
  );
}
