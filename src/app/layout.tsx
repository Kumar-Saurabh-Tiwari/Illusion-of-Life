import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollLayout from "@/components/SmoothScrollLayout";
import CustomCursor from "@/components/CustomCursor";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sidewave Noir",
  description: "Deep-tech noir landing page with 3D motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} h-full antialiased`}>
      <body
        className="min-h-full text-[#f1f5f9] font-mono"
        style={{
          background: "radial-gradient(circle at 50% 50%, #150525 0%, #030008 100%)",
        }}
      >
        <SmoothScrollLayout>
          <div
            className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.08]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            }}
          />
          <CustomCursor />
          {children}
        </SmoothScrollLayout>
      </body>
    </html>
  );
}
