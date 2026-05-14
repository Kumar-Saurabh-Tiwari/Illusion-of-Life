"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!heroTitleRef.current) return;

    gsap.set(heroTitleRef.current, { "--hero-weight": 520 });

    const scrollTween = gsap.fromTo(
      heroTitleRef.current,
      { opacity: 0.2, scale: 0.98 },
      {
        opacity: 1,
        scale: 1.02,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroTitleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );

    const weightTween = gsap.to(heroTitleRef.current, {
      "--hero-weight": 720,
      duration: 2.6,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    return () => {
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      weightTween.kill();
    };
  }, []);

  return (
    <section
      id="signal"
      className="relative flex min-h-screen flex-col justify-center gap-10 border-b border-white/5 px-8 py-24 md:px-16"
    >
      <RevealText className="max-w-4xl">
        <h1
          ref={heroTitleRef}
          className="text-[clamp(2.8rem,8vw,7rem)] uppercase tracking-[0.3em] leading-none"
          style={{
            fontVariationSettings: '"wght" var(--hero-weight)',
            textShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
          }}
        >
          Signal from the deep
        </h1>
      </RevealText>
      <RevealText className="max-w-xl text-sm leading-7 text-white/70">
        A brutalist interface for a synthetic future. Volumetric surfaces,
        inertial scroll, and a soft-glass core drifting through a neon vacuum.
      </RevealText>
      <MagneticButton className="w-fit border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition-colors hover:text-white">
        Engage Transmission
      </MagneticButton>
    </section>
  );
}
