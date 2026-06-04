"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal } from "lucide-react";

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
  const [sliderPosition, setSliderPosition] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

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
    
    // Initial size
    setContainerWidth(containerRef.current.offsetWidth);

    // Resize observer to update width dynamically
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
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <section className="py-20 bg-[#F5F8FA] border-y border-gray-200/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="block w-6 h-[2px] bg-[#C8860A]" />
            <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.25em]">{tSub}</span>
            <span className="block w-6 h-[2px] bg-[#C8860A]" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1B3A5C]">{tTitle}</h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Use the slider below to drag and compare the raw construction engineering phase with our premium finalized design.
          </p>
        </div>

        {/* Interactive Container */}
        <div
          ref={containerRef}
          className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-200 select-none cursor-ew-resize"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        >
          {/* AFTER Image (Bottom layer) */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={aImg}
              alt="After comparison"
              className="w-full h-full object-cover"
              draggable="false"
            />
            {/* Label After */}
            <span className="absolute bottom-4 right-4 bg-[#1B3A5C]/90 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-white/10 shadow-lg">
              {aLbl}
            </span>
          </div>

          {/* BEFORE Image (Top layer - clipped width) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            {/* We force the image inside to keep a constant width equal to the parent container */}
            <div className="absolute inset-y-0 left-0 h-full" style={{ width: `${containerWidth}px` }}>
              <img
                src={bImg}
                alt="Before comparison"
                className="w-full h-full object-cover"
                draggable="false"
              />
              {/* Label Before */}
              <span className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-white/10 shadow-lg whitespace-nowrap">
                {bLbl}
              </span>
            </div>
          </div>

          {/* Slider line separator */}
          <div
            className="absolute inset-y-0 w-1 bg-gradient-to-b from-[#C8860A] via-white to-[#C8860A] shadow-xl flex items-center justify-center pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Sliding handle button */}
            <div className="w-12 h-12 rounded-full bg-[#1B3A5C] text-white border-2 border-[#C8860A] flex items-center justify-center shadow-2xl -translate-x-1/2 scale-90 sm:scale-100 hover:scale-105 active:scale-95 transition-transform duration-150">
              <MoveHorizontal className="w-5 h-5 text-[#C8860A]" />
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
