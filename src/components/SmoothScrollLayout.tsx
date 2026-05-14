"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

type SmoothScrollLayoutProps = {
  children: React.ReactNode;
};

export default function SmoothScrollLayout({ children }: SmoothScrollLayoutProps) {
  const content = children as unknown as any;
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.5, smoothWheel: true }}>
      {content}
    </ReactLenis>
  );
}
