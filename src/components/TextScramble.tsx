"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SYMBOLS = "_*+$^}#£<[%)";

type TextScrambleProps = {
  text: string;
  className?: string;
};

export default function TextScramble({ text, className }: TextScrambleProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const scramble = () => {
      const start = performance.now();
      const duration = 800;

      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const revealCount = Math.floor(progress * text.length);
        let output = "";

        for (let i = 0; i < text.length; i += 1) {
          if (i < revealCount) {
            output += text[i];
          } else {
            const randomIndex = Math.floor(Math.random() * SYMBOLS.length);
            output += SYMBOLS[randomIndex];
          }
        }

        element.textContent = output;

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          element.textContent = text;
        }
      };

      requestAnimationFrame(tick);
    };

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: scramble,
    });

    return () => {
      trigger.kill();
    };
  }, [text]);

  return (
    <span ref={textRef} className={className} aria-label={text}>
      {text}
    </span>
  );
}
