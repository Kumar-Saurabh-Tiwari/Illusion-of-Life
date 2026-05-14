"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Scene from "@/components/Scene";
import TextScramble from "@/components/TextScramble";

const workItems = [
  "CLIENT MANAGEMENT FRONTEND",
  "ED-TECH SAAS PLATFORM",
  "OPEN SOURCE INITIATIVES",
];

export default function Home() {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    const cleanups = items.map((item) => {
      const handleEnter = () => {
        window.dispatchEvent(new Event("work-hover"));
        gsap.to(item, {
          skewX: -6,
          color: "#f8e3ff",
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const handleLeave = () => {
        window.dispatchEvent(new Event("work-leave"));
        gsap.to(item, {
          skewX: 0,
          color: "#e2e8f0",
          duration: 0.3,
          ease: "power2.out",
        });
      };

      item.addEventListener("mouseenter", handleEnter);
      item.addEventListener("mouseleave", handleLeave);

      return () => {
        item.removeEventListener("mouseenter", handleEnter);
        item.removeEventListener("mouseleave", handleLeave);
      };
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="relative min-h-screen text-inherit">
      <Scene />
      <div className="relative flex">
        <aside className="fixed left-0 top-0 hidden h-full w-28 flex-col gap-10 border-r border-white/5 px-6 py-10 md:flex">
          <div className="text-xs tracking-[0.45em] text-white/70">SW</div>
          <nav className="flex flex-col gap-8 text-[10px] uppercase tracking-[0.45em] text-white/70">
            <a href="#intro" data-cursor="link">
              [ INTRO ]
            </a>
            <a href="#services" data-cursor="link">
              [ SERVICES ]
            </a>
            <a href="#work" data-cursor="link">
              [ WORK ]
            </a>
            <a href="#contact" data-cursor="link">
              [ CONTACT ]
            </a>
          </nav>
        </aside>

        <main className="flex-1 px-8 py-20 md:ml-28 md:px-20">
          <section id="intro" className="min-h-screen space-y-10">
            <div className="max-w-4xl space-y-8">
              <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                [ INTRO ]
              </p>
              <TextScramble
                text="KUMAR SAURABH TIWARI"
                className="text-[clamp(2.6rem,6vw,5.2rem)] uppercase tracking-[0.3em]"
              />
              <TextScramble
                text="FULL STACK WEB DEVELOPER // ENGINEERING THE UNSEEN."
                className="text-xs uppercase tracking-[0.45em] text-white/70"
              />
              <p className="max-w-2xl text-sm leading-7 text-white/80">
                A brutalist approach to modern JavaScript. Architecting scalable
                systems with React, Next.js, and Node.js.
              </p>
            </div>
          </section>

          <section
            id="services"
            className="grid gap-10 border-t border-white/5 py-24 md:grid-cols-2"
          >
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.45em] text-white/60">
                [ SERVICES ]
              </p>
              <h2 className="text-2xl uppercase tracking-[0.3em]">SERVICES</h2>
            </div>
            <div className="grid gap-6 text-sm uppercase tracking-[0.3em] text-white/80">
              <div className="border border-white/10 px-5 py-4">
                FRONTEND DEVELOPMENT
              </div>
              <div className="border border-white/10 px-5 py-4">
                BACKEND ARCHITECTURE
              </div>
              <div className="border border-white/10 px-5 py-4">
                AI-DRIVEN WORKFLOWS
              </div>
            </div>
          </section>

          <section
            id="work"
            className="space-y-8 border-t border-white/5 py-24"
          >
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">
              [ WORK ]
            </p>
            <h2 className="text-3xl uppercase tracking-[0.35em]">
              LIMITS NOT FOUND
            </h2>
            <ul className="grid gap-4 text-lg uppercase tracking-[0.3em] text-white/80 md:text-2xl">
              {workItems.map((item, index) => (
                <li
                  key={item}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="w-fit cursor-pointer transition-colors"
                  data-cursor="link"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="contact"
            className="space-y-6 border-t border-white/5 py-24"
          >
            <p className="text-xs uppercase tracking-[0.45em] text-white/60">
              [ CONTACT ]
            </p>
            <p className="max-w-xl text-sm leading-7 text-white/75">
              Reach out for collaborations, product builds, and immersive
              interfaces that push beyond the ordinary.
            </p>
            <a
              href="mailto:hello@sidewave.dev"
              className="text-sm uppercase tracking-[0.35em] text-white/80"
              data-cursor="link"
            >
              HELLO@SIDEWAVE.DEV
            </a>
          </section>
        </main>
      </div>
    </div>
  );
}
