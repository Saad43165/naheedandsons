"use client";

import React, { useState, useRef, useEffect } from "react";
import { GripVertical } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

interface BeforeAfterProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}

export default function BeforeAfterSlider({
  beforeImage = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  afterImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  beforeLabel = "Concrete Frame Construction",
  afterLabel = "Completed Structural Handover",
  title = "Concrete Excellence",
  subtitle = "Interactive Transformation View"
}: BeforeAfterProps) {
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const bImg = settings?.beforeAfterBeforeImage || beforeImage;
  const aImg = settings?.beforeAfterAfterImage || afterImage;
  const bLbl = settings?.beforeAfterBeforeLabel || beforeLabel;
  const aLbl = settings?.beforeAfterAfterLabel || afterLabel;
  const tTitle = settings?.beforeAfterTitle || title;
  const tSub = settings?.beforeAfterSubtitle || subtitle;

  useEffect(() => {
    if (!containerRef.current) return;
    
    setContainerWidth(containerRef.current.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let position = (x / rect.width) * 100;
    
    // Hard boundaries to prevent the slider from breaking out
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    setSliderPosition(position);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: false });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const startDragging = () => {
    setIsDragging(true);
    setHasInteracted(true);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-[#08111F] border-y border-[#C8860A]/20 overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C8860A] rounded-full blur-[120px] opacity-5 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Animated Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block w-8 h-[2px] bg-gradient-to-r from-transparent to-[#C8860A]" />
            <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.3em] drop-shadow-md">{tSub}</span>
            <span className="block w-8 h-[2px] bg-gradient-to-l from-transparent to-[#C8860A]" />
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4 tracking-tight">
            {tTitle}
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Drag the slider to experience our signature transformation from raw structural engineering to premium finished design.
          </p>
        </motion.div>

        {/* Interactive Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          ref={containerRef}
          className="relative aspect-[4/3] sm:aspect-[16/9] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(200,134,10,0.15)] border border-[#C8860A]/30 select-none cursor-ew-resize group touch-none"
          onMouseDown={startDragging}
          onTouchStart={startDragging}
        >
          {/* AFTER Image (Bottom layer) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={aImg}
              alt="After comparison"
              className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
              draggable="false"
            />
            {/* Label After */}
            <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#08111F]/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-[#C8860A]/30 shadow-2xl">
              {aLbl}
            </div>
          </div>

          {/* BEFORE Image (Top layer - clipped width) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* Kept at container width so the image doesn't squash */}
            <div className="absolute inset-y-0 left-0 h-full" style={{ width: `${containerWidth}px` }}>
              <img
                src={bImg}
                alt="Before comparison"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
                draggable="false"
              />
              {/* Label Before */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 bg-[#08111F]/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-[#C8860A]/30 shadow-2xl whitespace-nowrap">
                {bLbl}
              </div>
            </div>
          </div>

          {/* Slider line separator */}
          <div
            className="absolute inset-y-0 flex items-center justify-center pointer-events-none z-20"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            {/* Glowing vertical line */}
            <div className="absolute inset-y-0 w-0.5 bg-gradient-to-b from-transparent via-[#C8860A] to-transparent shadow-[0_0_10px_#C8860A]" />
            <div className="absolute inset-y-0 w-[1px] bg-white opacity-50" />
            
            {/* Sliding handle button */}
            <motion.div 
              animate={!hasInteracted ? { scale: [1, 1.1, 1], boxShadow: ["0 0 0 rgba(200,134,10,0)", "0 0 20px rgba(200,134,10,0.6)", "0 0 0 rgba(200,134,10,0)"] } : { scale: 1 }}
              transition={{ duration: 2, repeat: hasInteracted ? 0 : Infinity }}
              className={`relative w-10 h-14 sm:w-12 sm:h-16 rounded-xl bg-[#08111F] text-white border-2 border-[#C8860A] flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-transform duration-200 ${isDragging ? "scale-95 bg-[#1B3A5C]" : "hover:scale-105"}`}
            >
              <GripVertical className="w-5 h-5 sm:w-6 sm:h-6 text-[#C8860A]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
