"use client";

import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, ShieldCheck, DollarSign, ArrowDown } from "lucide-react";
import { getRateSettings, RateSettings } from "@/utils/storage";

type ProjectType = "residential" | "commercial" | "interior" | "renovation";
type QualityTier = "standard" | "premium" | "luxury";

export default function BudgetCalculator() {
  const [projectType, setProjectType] = useState<ProjectType>("residential");
  const [tier, setTier] = useState<QualityTier>("premium");
  const [area, setArea] = useState<number>(2000); // default sqft
  const [rates, setRates] = useState<RateSettings | null>(null);

  useEffect(() => {
    const load = () => setRates(getRateSettings());
    load();
    window.addEventListener("naheed_storage_synced", load);

    // Read URL param
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const svc = searchParams.get("service");
      if (svc && ["residential", "commercial", "interior", "renovation"].includes(svc)) {
        setProjectType(svc as ProjectType);
      }
    }

    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  // Base rates per sqft in PKR
  const baseRates: Record<ProjectType, number> = {
    residential: rates?.residentialRate ?? 7500,
    commercial: rates?.commercialRate ?? 9500,
    interior: rates?.interiorRate ?? 5000,
    renovation: rates?.renovationRate ?? 3800
  };

  // Tier multiplier
  const tierMultipliers: Record<QualityTier, { label: string; multiplier: number; desc: string }> = {
    standard: {
      label: "Premium Standard",
      multiplier: rates?.standardMultiplier ?? 1.0,
      desc: "High quality structural engineering, durable premium finishes, and standard layout configurations."
    },
    premium: {
      label: "Executive Elite",
      multiplier: rates?.premiumMultiplier ?? 1.3,
      desc: "Architect-designed layouts, upgraded imported materials, false ceilings, and customized design details."
    },
    luxury: {
      label: "Ultra-Luxury Monogram",
      multiplier: rates?.luxuryMultiplier ?? 1.65,
      desc: "Custom architectural millwork, bespoke automation, high-end imported marble/hardwoods, and custom landscape integrations."
    }
  };

  // Calculate costs
  const ratePerSqft = baseRates[projectType] * tierMultipliers[tier].multiplier;
  const totalCost = ratePerSqft * area;

  // Breakdown percentages
  const breakdown = {
    structure: totalCost * 0.45,
    finishes: totalCost * 0.35,
    services: totalCost * 0.12, // HVAC, plumbing, electrical
    consultancy: totalCost * 0.08 // design and project management fees
  };

  const formatPKR = (num: number) => {
    if (num >= 10000000) {
      return `Rs. ${(num / 10000000).toFixed(2)} Crore`;
    }
    if (num >= 100000) {
      return `Rs. ${(num / 100000).toFixed(2)} Lakh`;
    }
    return `Rs. ${num.toLocaleString()}`;
  };

  const handleApplyToForm = () => {
    // Smooth scroll to Quote Form
    const element = document.getElementById("quote-form-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      
      // Attempt to auto-fill the area field if present in DOM
      const areaInput = document.querySelector('input[name="area"]') as HTMLInputElement;
      if (areaInput) {
        areaInput.value = area.toString();
        // Trigger React change event
        const event = new Event("input", { bubbles: true });
        areaInput.dispatchEvent(event);
      }
    }
  };

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="block w-6 h-[2px] bg-[#C8860A]" />
            <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.25em]">Interactive Estimator</span>
            <span className="block w-6 h-[2px] bg-[#C8860A]" />
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1B3A5C]">Project Budget Calculator</h2>
          <p className="text-gray-500 text-sm md:text-base mt-3 max-w-xl mx-auto">
            Get an instant, itemized cost estimate for your construction or interior project based on build area and quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls - Left side */}
          <div className="lg:col-span-7 bg-[#F5F8FA] border border-gray-200/60 rounded-2xl p-6 md:p-8 space-y-8">
            
            {/* 1. Project Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">1. Select Project Scope</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "residential", label: "Luxury Residential" },
                  { id: "commercial", label: "Commercial Office" },
                  { id: "interior", label: "Interior Fitting" },
                  { id: "renovation", label: "Structural Renovation" }
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setProjectType(t.id as ProjectType)}
                    className={`py-3 px-4 rounded-xl border text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                      projectType === t.id
                        ? "bg-[#1B3A5C] border-[#1B3A5C] text-white shadow-md"
                        : "bg-white border-gray-200 text-gray-600 hover:border-[#C8860A]/40"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Quality Standard Tiers */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">2. Choose Build Quality Standard</label>
              <div className="space-y-3">
                {(Object.keys(tierMultipliers) as QualityTier[]).map((k) => {
                  const item = tierMultipliers[k];
                  const isActive = tier === k;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setTier(k)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                        isActive
                          ? "bg-white border-[#C8860A] ring-1 ring-[#C8860A]/30 shadow-md"
                          : "bg-white/60 border-gray-200 text-gray-600 hover:bg-white"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className={`text-sm font-bold ${isActive ? "text-[#1B3A5C]" : "text-gray-700"}`}>
                          {item.label}
                        </span>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isActive ? "bg-[#C8860A]/10 text-[#C8860A]" : "bg-gray-100 text-gray-500"}`}>
                          x{item.multiplier.toFixed(2)} Base
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Slider Area Selection */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">3. Built-Up Area Size</label>
                <span className="font-mono text-sm font-bold text-[#C8860A]">
                  {area.toLocaleString()} Sq. Ft.
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={area}
                onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C8860A]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase mt-2">
                <span>500 Sq. Ft.</span>
                <span>5,000 Sq. Ft.</span>
                <span>10,000 Sq. Ft.</span>
              </div>
            </div>
            
          </div>

          {/* Estimates - Right side */}
          <div className="lg:col-span-5 bg-[#0E1B2D] text-white border border-white/[0.05] rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full min-h-[460px] shadow-2xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C8860A]/10 rounded-full blur-[80px] pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-6 border-b border-white/[0.08] pb-4">
                <Calculator className="w-5 h-5 text-[#C8860A]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#C8860A] font-mono">Estimated Valuation</span>
              </div>

              {/* Cost values */}
              <div className="mb-8">
                <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Total Estimated Project Cost</span>
                <span className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                  {formatPKR(totalCost)}
                </span>
                <span className="block text-[11px] text-[#C8860A] font-bold uppercase tracking-wider mt-2">
                  ~ {formatPKR(ratePerSqft)} per Sq. Ft. Rate
                </span>
              </div>

              {/* Cost Itemization Breakdown */}
              <div className="space-y-4 mb-8">
                <span className="block text-xs text-gray-400 uppercase tracking-wider mb-2 font-mono">Itemized Cost Allocation</span>
                {[
                  { name: "Grey Structure & Foundations (45%)", val: breakdown.structure },
                  { name: "Finishing & Decorative Material (35%)", val: breakdown.finishes },
                  { name: "HVAC, Plumbing & Electrical Services (12%)", val: breakdown.services },
                  { name: "Architectural & Consultancy Fees (8%)", val: breakdown.consultancy }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{item.name}</span>
                    <span className="font-mono text-gray-200 font-semibold">{formatPKR(item.val)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 text-[10px] text-gray-400 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
                <span>Estimate calculations represent average material values in Pakistan market.</span>
              </div>
              <button
                type="button"
                onClick={handleApplyToForm}
                className="w-full bg-[#C8860A] hover:bg-[#a66d06] text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2 group"
              >
                Apply Details to Quote Form
                <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>
            
          </div>
          
        </div>

      </div>
    </section>
  );
}
