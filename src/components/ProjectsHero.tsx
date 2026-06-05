"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

export default function ProjectsHero() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  return (
    <section className="relative pt-32 pb-20 bg-[#0d1f35] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="block w-7 h-[2px] bg-[#C8860A]" />
            <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Portfolio</span>
            <span className="block w-7 h-[2px] bg-[#C8860A]" />
          </div>
          <h1
            className="font-display font-bold text-white leading-tight mb-5"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
          >
            Our Project <span className="text-[#C8860A]">Portfolio</span>
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Explore our portfolio of completed constructions, interior transformations, and structural renovations — each one a testament to our commitment to quality.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { v: settings?.projectsCompleted ?? "400+", l: "Projects Completed" },
              { v: settings?.yearsExperience ?? "25+", l: "Years in Business" },
              { v: settings?.completedOnTime ?? "98%", l: "On-Time Delivery" },
              { v: settings?.clientSatisfaction ?? "100%", l: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.l} className="text-center">
                <div className="text-3xl font-display font-bold text-[#C8860A]">{stat.v}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{stat.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
