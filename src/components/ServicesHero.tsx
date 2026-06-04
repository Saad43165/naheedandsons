"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import * as Icons from "lucide-react";
import { getServices, Service } from "@/utils/storage";

const getIconComponent = (name: string) => {
  return (Icons[name as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<any>;
};

export default function ServicesHero() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setServices(getServices());
  }, []);

  return (
    <section className="relative pt-32 pb-24 bg-[#0d1f35] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.9) 1px, transparent 0)`,
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-7 h-[2px] bg-[#C8860A] shrink-0" />
              <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">What We Offer</span>
            </div>
            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
            >
              Our Professional
              <br />
              <span className="text-[#C8860A]">Services</span>
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              From initial consultation to final key handover — high-end structural, interior, and architectural solutions engineered to the highest standards.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm"
              >
                Request a Quote
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:bg-white/5 text-sm"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Quick Service Nav */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="hidden lg:grid grid-cols-2 gap-3"
          >
            {services.map((s, idx) => {
              const Icon = getIconComponent(s.iconName);
              return (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.09] hover:border-[#C8860A]/30 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#C8860A]/10 text-[#C8860A] group-hover:bg-[#C8860A] group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-gray-300 text-sm font-medium group-hover:text-white transition-colors">{s.title}</span>
                </a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
