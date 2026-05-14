import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollLayout from "@/components/SmoothScrollLayout";
import CustomCursor from "@/components/CustomCursor";
import BackgroundMesh from "@/components/BackgroundMesh";

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
      <body className="min-h-full text-[#f1f5f9] font-mono grain deep-space">
        <SmoothScrollLayout>
          <BackgroundMesh />
          <CustomCursor />
          {children}
        </SmoothScrollLayout>
      </body>
    </html>
  );
}
