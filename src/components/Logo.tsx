"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  layoutId?: string;
  fontSize?: string;
}

export default function Logo({ 
  className = "w-10 h-10 rounded-lg", 
  layoutId,
  fontSize = "1.2rem"
}: LogoProps) {
  // If a layoutId is provided, we wrap it in a motion component for smooth layout transitions
  const Container = layoutId ? motion.div : "div";

  return (
    <Container
      layoutId={layoutId}
      className={`relative flex items-center justify-center bg-[#08111F] border border-[#C8860A]/40 shadow-lg overflow-hidden flex-shrink-0 select-none ${className}`}
    >
      {/* Architectural Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay">
        <div className="absolute top-0 bottom-0 left-[30%] w-px bg-[#C8860A]" />
        <div className="absolute top-0 bottom-0 right-[30%] w-px bg-[#C8860A]" />
        <div className="absolute left-0 right-0 top-[30%] h-px bg-[#C8860A]" />
        <div className="absolute left-0 right-0 bottom-[30%] h-px bg-[#C8860A]" />
      </div>

      {/* Subtle Glow */}
      <div className="absolute inset-0 bg-[#C8860A] opacity-10 blur-xl rounded-full" />
      
      {/* Typography */}
      <span 
        className="font-display font-bold text-white tracking-tighter relative z-10" 
        style={{ fontSize, lineHeight: 1 }}
      >
        N<span className="text-[#C8860A]">S</span>
      </span>
    </Container>
  );
}
