"use client";

import Scene from "@/components/Scene";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black text-[#E0E0E0]">
      <Scene />
      <div className="relative flex">
        <aside className="hidden min-h-screen w-20 flex-col items-center border-r border-white/5 py-10 md:flex">
          <div className="text-xs tracking-[0.35em] text-white/70">SW</div>
          <nav className="mt-20 flex flex-col gap-8 text-[10px] uppercase tracking-[0.35em] text-white/60">
            <a href="#signal" data-cursor="link">
              Signal
            </a>
            <a href="#systems" data-cursor="link">
              Systems
            </a>
            <a href="#protocol" data-cursor="link">
              Protocol
            </a>
            <a href="#contact" data-cursor="link">
              Contact
            </a>
          </nav>
        </aside>

        <main className="flex-1 border-l border-white/5">
          <Hero />

          <section
            id="systems"
            className="grid gap-12 border-b border-white/5 px-8 py-24 md:grid-cols-2 md:px-16"
          >
            <RevealText>
              <h2 className="text-3xl uppercase tracking-[0.25em]">
                Systems
              </h2>
            </RevealText>
            <RevealText className="text-sm leading-7 text-white/70">
              Modular stacks of data, motion, and procedural geometry. Each
              module is an instrument tuned for distortion, depth, and clarity.
            </RevealText>
            <div className="col-span-full grid gap-6 md:grid-cols-3">
              {["Vector Field", "Noir Grid", "Deep Signal"].map((label) => (
                <div
                  key={label}
                  className="border border-white/5 p-6 text-xs uppercase tracking-[0.3em] text-white/60"
                >
                  {label}
                </div>
              ))}
            </div>
          </section>

          <section
            id="protocol"
            className="grid gap-12 border-b border-white/5 px-8 py-24 md:grid-cols-2 md:px-16"
          >
            <RevealText>
              <h2 className="text-3xl uppercase tracking-[0.25em]">Protocol</h2>
            </RevealText>
            <RevealText className="text-sm leading-7 text-white/70">
              Iterate on signal fidelity. Smooth scroll keeps the cadence while
              GSAP reveals the narrative in controlled bursts.
            </RevealText>
            <div className="col-span-full grid gap-6 border border-white/5 p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                Phase 01 / Adaptive
              </p>
              <p className="text-sm leading-7 text-white/70">
                Distorted surfaces mirror user input, responding to each scroll
                gesture with subtle depth shifts.
              </p>
            </div>
          </section>

          <section
            id="contact"
            className="flex flex-col gap-6 px-8 py-24 md:px-16"
          >
            <RevealText>
              <h2 className="text-3xl uppercase tracking-[0.25em]">Contact</h2>
            </RevealText>
            <RevealText className="text-sm leading-7 text-white/70">
              Ready to transmit a new reality? Connect the nodes and we will
              align the spectrum.
            </RevealText>
            <MagneticButton className="w-fit border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.35em] text-white/80 transition-colors hover:text-white">
              Start the loop
            </MagneticButton>
          </section>
        </main>
      </div>
    </div>
  );
}
