"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, User } from "lucide-react";
import { getTestimonials, Testimonial } from "@/utils/storage";

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
    const handleSync = (e: any) => {
      if (e.detail?.key === "naheedandsons_testimonials_v1") {
        setTestimonials(getTestimonials());
      }
    };
    window.addEventListener("naheed_storage_synced", handleSync);
    return () => window.removeEventListener("naheed_storage_synced", handleSync);
  }, []);

  const prev = () => setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setActive((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  if (testimonials.length === 0) return null;

  const t = testimonials[active];

  return (
    <section className="py-32 bg-[#F5F8FA] relative overflow-hidden">
      {/* Decorative Large Quote */}
      <div className="absolute top-20 left-10 text-[#1B3A5C]/5 font-display font-bold select-none pointer-events-none"
        style={{ fontSize: "20rem", lineHeight: 1 }}>
        "
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="block w-8 h-[2px] bg-[#C8860A]" />
              <span className="text-[#C8860A] text-xs font-bold uppercase tracking-[0.3em]">Testimonials</span>
              <span className="block w-8 h-[2px] bg-[#C8860A]" />
            </div>
            <h2
              className="font-display font-bold text-[#1B3A5C] leading-tight"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              What Our
              <span className="text-[#C8860A]"> Clients Say</span>
            </h2>
          </motion.div>
        </div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-16 relative overflow-hidden"
            >
              {/* Top Gold Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8860A] to-[#e8a832]" />

              {/* Quote Icon */}
              <div className="absolute top-8 right-10 opacity-10">
                <Quote className="w-24 h-24 text-[#1B3A5C]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                {/* Left: Author */}
                <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#C8860A]/20 bg-gray-100 flex items-center justify-center">
                      {t.image ? (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${t.image}')` }}
                        />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#C8860A] rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-bold text-[#1B3A5C] text-lg">{t.name}</h4>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8860A] mt-1">{t.company}</span>

                  {/* Stars */}
                  <div className="flex gap-1 mt-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C8860A] text-[#C8860A]" />
                    ))}
                  </div>

                  <div className="mt-4 text-[10px] uppercase tracking-wider text-gray-400 border border-gray-200 rounded-full px-3 py-1">
                    {t.project}
                  </div>
                </div>

                {/* Right: Quote */}
                <div className="md:col-span-9 flex items-center">
                  <blockquote className="text-gray-700 text-xl md:text-2xl leading-relaxed font-light italic">
                    "{t.text}"
                  </blockquote>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActive(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === active ? "w-8 h-2.5 bg-[#C8860A]" : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Arrow Buttons */}
            <div className="flex gap-3">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-[#1B3A5C] hover:bg-[#1B3A5C] text-gray-500 hover:text-white flex items-center justify-center transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-[#1B3A5C] hover:bg-[#C8860A] text-white flex items-center justify-center transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
