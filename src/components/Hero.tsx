"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

export default function Hero() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const stats = [
    { value: settings?.yearsExperience ?? "25+", label: "Years of Excellence" },
    { value: settings?.projectsCompleted ?? "400+", label: "Projects Delivered" },
    { value: settings?.clientSatisfaction ?? "100%", label: "Client Satisfaction" },
    { value: settings?.completedOnTime ?? "98%", label: "Completed on Time" },
  ];
  return (
    <section className="relative w-full flex flex-col" style={{ minHeight: "100svh" }}>
      {/* Background — static, no parallax to avoid scroll glitch */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2131&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#081828]/95 via-[#0f2338]/90 to-[#1B3A5C]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
      </div>

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Top Gold Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C8860A] to-transparent z-[3] origin-center"
      />

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left: Text */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="block w-8 h-[2px] bg-[#C8860A] shrink-0" />
                <span className="text-[#C8860A] text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap">
                  Est. 2001 · Trusted Construction Firm
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-white leading-[1.06] tracking-tight mb-8"
                style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)" }}
              >
                Building
                <br />
                <span className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(90deg, #C8860A, #e8a832, #C8860A)" }}>
                  Excellence,
                </span>
                <br />
                <span className="text-gray-100">Engineering</span>
                <br />
                <span className="text-white">the Future.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75 }}
                className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg"
              >
                Full-service construction firm delivering landmark structures, bespoke interiors, and architectural masterworks — from ground-breaking to key handover.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold px-7 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_8px_30px_rgba(200,134,10,0.5)] hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  Explore Our Portfolio
                  <span className="text-lg leading-none">→</span>
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 text-sm sm:text-base backdrop-blur-sm"
                >
                  Get a Free Quote
                </Link>
              </motion.div>
            </div>

            {/* Right: Stats Panel (desktop only) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8 divide-y divide-white/10">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="py-6 first:pt-0 last:pb-0"
                  >
                    <div className="text-4xl font-display font-bold text-[#C8860A] mb-1">{stat.value}</div>
                    <div className="text-gray-400 text-sm font-medium tracking-wide">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Mobile Stats Bar — fixed at bottom of hero, above page content */}
      <div className="relative z-10 lg:hidden border-t border-white/10 bg-black/50 backdrop-blur-md">
        <div className="grid grid-cols-4 divide-x divide-white/10">
          {stats.map((stat) => (
            <div key={stat.label} className="py-4 text-center px-1">
              <div className="text-[#C8860A] font-display font-bold text-lg leading-none mb-1">{stat.value}</div>
              <div className="text-[9px] text-gray-400 uppercase tracking-wide leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator — desktop only, won't overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/40"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
