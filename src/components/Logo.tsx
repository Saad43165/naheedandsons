"use client";

import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  layoutId?: string;
  fontSize?: string; // Kept for backwards compatibility in props, though not strictly needed for the SVG
}

export default function Logo({ 
  className = "w-10 h-10 rounded-lg", 
  layoutId,
}: LogoProps) {
  // If a layoutId is provided, we wrap it in a motion component for smooth layout transitions
  const Container = layoutId ? motion.div : "div";

  return (
    <Container
      layoutId={layoutId}
      className={`relative flex items-center justify-center bg-[#1B3A5C] border border-[#C8860A]/40 shadow-lg overflow-hidden flex-shrink-0 select-none ${className}`}
    >
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#C8860A]/20 to-transparent" />
      
      {/* 
        Custom Architectural Skyline SVG 
        Represents 3 modern pillars/towers and a golden sweeping bridge/arc.
      */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-[75%] h-[75%] relative z-10 drop-shadow-md"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left Tower */}
        <path d="M20 85 L20 40 L40 25 L40 85 Z" fill="#C8860A" opacity="0.9" />
        {/* Center Tower (Tallest, White/Silver) */}
        <path d="M45 85 L45 15 L65 10 L65 85 Z" fill="#ffffff" opacity="0.95" />
        {/* Right Tower */}
        <path d="M70 85 L70 50 L90 35 L90 85 Z" fill="#C8860A" opacity="0.8" />
        
        {/* Structural Window Lines (Grid Accents) */}
        <path d="M20 65 L40 65 M45 45 L65 45 M45 65 L65 65 M70 70 L90 70" stroke="#1B3A5C" strokeWidth="2.5" />
        <path d="M20 50 L40 50 M45 30 L65 30 M70 55 L90 55" stroke="#1B3A5C" strokeWidth="2.5" />
        
        {/* Sweeping Golden Bridge / Engineering Arc */}
        <path d="M5 90 Q 50 5 95 90" stroke="#C8860A" strokeWidth="3" fill="none" strokeLinecap="round" />
        
        {/* Base Foundation Line */}
        <path d="M10 87 L90 87" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    </Container>
  );
}
