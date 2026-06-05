"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-[#081828]">
      {/* Background image — NO bg-fixed (breaks on iOS) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#081828]/97 via-[#1B3A5C]/92 to-[#081828]/97" />
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/30 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="block w-7 h-[2px] bg-[#C8860A]" />
            <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">Start Your Project</span>
            <span className="block w-7 h-[2px] bg-[#C8860A]" />
          </div>

          <h2
            className="font-display font-bold text-white leading-tight mb-7"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            Ready to Build
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(90deg, #C8860A, #e8a832, #C8860A)" }}
            >
              Something Extraordinary?
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            Contact our team today for a free consultation and preliminary cost estimate. Let's turn your vision into a landmark structure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-3 bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold px-9 py-4 rounded-xl transition-all duration-300 shadow-[0_6px_30px_rgba(200,134,10,0.45)] hover:shadow-[0_10px_40px_rgba(200,134,10,0.65)] hover:-translate-y-0.5 text-base w-full sm:w-auto justify-center"
            >
              Request a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+923346878500"
              className="inline-flex items-center gap-3 border-2 border-white/30 hover:border-white text-white font-semibold px-9 py-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 text-base w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5 shrink-0" />
              +92 334 6878500
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
