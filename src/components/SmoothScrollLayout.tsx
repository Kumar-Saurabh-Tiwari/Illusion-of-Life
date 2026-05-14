"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

type SmoothScrollLayoutProps = {
  children: React.ReactNode;
};

export default function SmoothScrollLayout({ children }: SmoothScrollLayoutProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.5,
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
