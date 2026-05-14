"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealTextProps = {
  children: ReactNode;
  className?: string;
};

export default function RevealText({ children, className }: RevealTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const tween = gsap.fromTo(
      element,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
