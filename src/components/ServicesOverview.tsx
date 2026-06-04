"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getServices, Service } from "@/utils/storage";

const getIconComponent = (name: string) => {
  return (Icons[name as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<any>;
};

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const load = () => setServices(getServices());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);
  return (
    <section className="relative py-28 md:py-36 bg-[#08111F] overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#132A4A] via-[#08111F] to-[#050B14]" />
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#C8860A]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#1B3A5C]/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle Grid Lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#C8860A] shrink-0" />
                <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.25em]">Our Offerings</span>
              </div>
              <h2
                className="font-display font-bold text-white leading-[1.1] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
              >
                Engineered for <span className="text-[#C8860A] relative inline-block">Excellence</span>
              </h2>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-4"
            >
              <p className="text-gray-400 text-base leading-relaxed">
                We deliver high-end architectural, engineering, and turnkey construction solutions across Pakistan, built to international safety standards.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-[#C8860A] font-bold text-sm group hover:text-white transition-all duration-300"
              >
                Explore Services Portfolio
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, idx) => {
            const Icon = getIconComponent(service.iconName);
            return (
              <motion.div
                key={service.slug || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative"
              >
                {/* Background Glow Effect on Hover */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8860A] to-[#1B3A5C] rounded-2xl opacity-0 group-hover:opacity-30 blur-sm transition duration-500" />
                
                {/* Card Container */}
                <div className="relative flex flex-col justify-between p-8 md:p-10 h-full min-h-[300px] bg-[#0E1B2D]/80 backdrop-blur-md rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
                  
                  {/* Top line indicator on Hover */}
                  <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#C8860A] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

                  {/* Header Element: Icon and Tiny Index */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-xl bg-white/[0.03] border border-white/[0.08] text-[#C8860A] flex items-center justify-center group-hover:bg-[#C8860A] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[#C8860A]/40 text-xs font-bold tracking-widest font-mono">
                      SERVICE 0{idx + 1}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-white text-xl mb-3 group-hover:text-[#C8860A] transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Interactive Button */}
                  <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center justify-between">
                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center gap-2 text-white/80 group-hover:text-[#C8860A] transition-colors duration-300 text-xs font-bold uppercase tracking-wider"
                    >
                      Learn More
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
