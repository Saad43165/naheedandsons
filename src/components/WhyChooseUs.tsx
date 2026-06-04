"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Clock, Gem, Star } from "lucide-react";
import Link from "next/link";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

const USPs = [
  { icon: Star, title: "Certified Processes", desc: "ISO-compliant workflows, certified engineers, and rigorous QA at every phase." },
  { icon: ShieldCheck, title: "10-Year Structural Warranty", desc: "Comprehensive structural integrity warranties on all completed projects." },
  { icon: Clock, title: "On-Time Delivery", desc: "Strict project scheduling with milestone-based delivery commitments." },
  { icon: Gem, title: "Premium Materials Only", desc: "We certify all materials against the highest quality benchmarks." },
];

const CHECKLIST = [
  "ISO-certified construction processes",
  "Dedicated project manager per client",
  "Real-time project tracking portal",
  "Transparent, itemized pricing",
  "Certified structural engineers on every project",
  "Post-handover support for 24 months",
];

export default function WhyChooseUs() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  return (
    <section className="relative py-28 md:py-32 bg-white overflow-hidden">
      {/* Faint diagonal bg on right */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #1B3A5C 1px, transparent 0)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20 items-center">

          {/* Left: Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-40 h-40 border-l-4 border-t-4 border-[#C8860A]/30 rounded-tl-xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border-r-4 border-b-4 border-[#C8860A]/30 rounded-br-xl pointer-events-none" />

            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5C]/40 to-transparent" />
            </div>

            {/* Floating Trust Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className="absolute -bottom-5 -right-5 bg-[#C8860A] text-white rounded-2xl shadow-2xl p-5 text-center border-4 border-white z-10"
              style={{ width: "140px" }}
            >
              <div className="text-4xl font-display font-bold leading-none">{settings?.yearsExperience ?? "25+"}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider mt-1.5 text-white/80">Years of Trust</div>
            </motion.div>

            {/* Floating Projects Card */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 z-10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C8860A]/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#C8860A]" />
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-[#1B3A5C] leading-none">{settings?.projectsCompleted ?? "400+"}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-0.5">Projects Done</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-7 h-[2px] bg-[#C8860A] shrink-0" />
              <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Why Naheed & Sons</span>
            </div>

            <h2
              className="font-display font-bold text-[#1B3A5C] leading-tight mb-5"
              style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
            >
              The Standard of<br />
              <span className="text-[#C8860A]">Structural Excellence</span>
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8 text-base">
              For over two decades, Naheed & Sons has redefined quality in every beam, finish, and detail. We combine cutting-edge engineering with precision design to build structures that endure.
            </p>

            {/* USP Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {USPs.map((usp, idx) => {
                const Icon = usp.icon;
                return (
                  <motion.div
                    key={usp.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * idx }}
                    className="group flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#C8860A]/40 hover:bg-amber-50/50 transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#C8860A]/10 text-[#C8860A] flex items-center justify-center shrink-0 group-hover:bg-[#C8860A] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1B3A5C] text-sm mb-1">{usp.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{usp.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
              {CHECKLIST.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-[#C8860A] shrink-0" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#11263d] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
              >
                Discover Our Story
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 border-2 border-[#C8860A] text-[#C8860A] hover:bg-[#C8860A] hover:text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 text-sm"
              >
                Free Estimate
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
