"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className,
  onClick,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const bounds = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={className}
      data-cursor="link"
    >
      {children}
    </button>
  );
}
