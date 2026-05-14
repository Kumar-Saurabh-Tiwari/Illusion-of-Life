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

    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const target = { x: position.x, y: position.y };

    const handleMove = (event: MouseEvent) => {
      target.x = event.clientX - cursor.offsetWidth / 2;
      target.y = event.clientY - cursor.offsetHeight / 2;
    };

    const handleEnter = () => {
      gsap.to(cursor, { scale: 2, duration: 0.2, ease: "power2.out" });
    };

    const handleLeave = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMove);

    const tick = () => {
      position.x = gsap.utils.interpolate(position.x, target.x, 0.2);
      position.y = gsap.utils.interpolate(position.y, target.y, 0.2);
      gsap.set(cursor, { x: position.x, y: position.y });
    };

    gsap.ticker.add(tick);

    const hoverTargets = document.querySelectorAll("a, button, [data-cursor='link']");
    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleEnter);
      target.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      gsap.ticker.remove(tick);
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleEnter);
        target.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-4 w-4 rounded-full border border-white/60 mix-blend-screen md:block"
    />
  );
}
