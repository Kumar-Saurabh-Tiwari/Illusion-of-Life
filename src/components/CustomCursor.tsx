"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const handleMove = (event: MouseEvent) => {
      xTo(event.clientX - cursor.offsetWidth / 2);
      yTo(event.clientY - cursor.offsetHeight / 2);
    };

    const handleEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMove);

    const hoverTargets = document.querySelectorAll("a, button, [data-cursor='link']");
    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleEnter);
      target.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleEnter);
        target.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full border border-white/60 md:block"
    />
  );
}
