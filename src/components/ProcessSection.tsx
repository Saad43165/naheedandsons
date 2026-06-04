"use client";

import { motion } from "framer-motion";
import { Check, ClipboardList, PenTool, HardHat, FileCheck, Key } from "lucide-react";

const STEPS = [
  {
    step: "01",
    title: "Discovery & Consultation",
    desc: "We meet with your team to understand requirements, vision, site constraints, and budget. A detailed project brief is crafted.",
    duration: "Week 1–2",
    icon: ClipboardList,
  },
  {
    step: "02",
    title: "Design & Engineering",
    desc: "Our architects develop schematic layouts, 3D models, and structural maps pending client approval.",
    duration: "Week 3–8",
    icon: PenTool,
  },
  {
    step: "03",
    title: "Permits & Procurement",
    desc: "We handle all building permits, municipal approvals, and material procurement from certified vendors.",
    duration: "Week 9–12",
    icon: FileCheck,
  },
  {
    step: "04",
    title: "Construction Execution",
    desc: "Certified teams execute every phase with real-time site supervision, QA audits, and milestone reporting.",
    duration: "Week 13–52",
    icon: HardHat,
  },
  {
    step: "05",
    title: "Key Handover",
    desc: "Final inspections, snagging, client walkthrough, and full handover package including warranties.",
    duration: "Final Week",
    icon: Key,
  },
];

export default function ProcessSection() {
  return (
    <section className="relative py-28 md:py-36 bg-[#0B1522] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#132A4A]/70 via-[#0B1522] to-[#050B14]" />
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C8860A]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="block w-6 h-[2px] bg-[#C8860A]" />
              <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.25em]">Workflow</span>
              <span className="block w-6 h-[2px] bg-[#C8860A]" />
            </div>
            <h2
              className="font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
            >
              Our Certified <span className="text-[#C8860A]">Process</span>
            </h2>
            <p className="text-gray-400 text-base mt-4 leading-relaxed max-w-xl mx-auto">
              From first consultation to final handover, we deliver transparency and architectural precision at every milestone.
            </p>
          </motion.div>
        </div>

        {/* Process Timeline (Alternating layout for desktop) */}
        <div className="relative">
          {/* Central Timeline Rail for Desktop */}
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#C8860A]/0 via-white/10 to-[#C8860A]/0 -translate-x-1/2 hidden lg:block" />

          <div className="space-y-12 lg:space-y-20">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              
              return (
                <div key={step.step} className="relative flex flex-col lg:flex-row items-center">
                  
                  {/* Central Node for Desktop */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-20">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="w-12 h-12 rounded-full bg-[#122338] border-2 border-[#C8860A] flex items-center justify-center text-white shadow-[0_0_15px_rgba(200,134,10,0.3)] hover:scale-110 transition-transform"
                    >
                      <Icon className="w-5 h-5 text-[#C8860A]" />
                    </motion.div>
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className="w-full lg:w-1/2 lg:pr-16 lg:text-right order-2 lg:order-1">
                    {isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-[#0E1B2D]/80 border border-white/[0.05] rounded-2xl p-8 hover:bg-[#122338]/90 hover:border-white/[0.1] transition-all duration-300 shadow-xl"
                      >
                        <div className="flex flex-col lg:items-end mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="lg:order-2 px-3 py-1 text-[10px] font-bold text-[#C8860A] uppercase tracking-wider bg-[#C8860A]/10 border border-[#C8860A]/20 rounded-full">
                              {step.duration}
                            </span>
                            <span className="text-white/40 font-mono text-xs font-bold lg:order-1">
                              PHASE {step.step}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-white text-xl">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    ) : (
                      // Empty placeholder on desktop to maintain alternating structure
                      <div className="hidden lg:block" />
                    )}
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className="w-full lg:w-1/2 lg:pl-16 order-3 lg:order-2 mt-4 lg:mt-0">
                    {!isEven ? (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-[#0E1B2D]/80 border border-white/[0.05] rounded-2xl p-8 hover:bg-[#122338]/90 hover:border-white/[0.1] transition-all duration-300 shadow-xl"
                      >
                        <div className="flex flex-col mb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 text-[10px] font-bold text-[#C8860A] uppercase tracking-wider bg-[#C8860A]/10 border border-[#C8860A]/20 rounded-full">
                              {step.duration}
                            </span>
                            <span className="text-white/40 font-mono text-xs font-bold">
                              PHASE {step.step}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-white text-xl">{step.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                      </motion.div>
                    ) : (
                      // Empty placeholder on desktop to maintain alternating structure
                      <div className="hidden lg:block" />
                    )}
                  </div>

                  {/* Mobile Mobile-only layout node */}
                  <div className="lg:hidden w-full flex items-center gap-4 mb-4 order-1">
                    <div className="w-10 h-10 rounded-xl bg-[#C8860A]/10 border border-[#C8860A]/20 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#C8860A]" />
                    </div>
                    <div className="h-px bg-white/10 flex-1" />
                    <span className="text-[#C8860A] font-bold text-sm tracking-wider font-mono">PHASE {step.step}</span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
