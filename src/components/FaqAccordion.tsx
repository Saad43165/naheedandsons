"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getFAQs, FAQ } from "@/utils/storage";

export default function FaqAccordion() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    const load = () => setFaqs(getFAQs());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={faq.id || idx}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full text-left p-6 font-display font-bold text-lg md:text-xl text-[#1B3A5C] flex items-center justify-between gap-4 bg-[#F5F5F5]/50 hover:bg-[#F5F5F5] transition-colors"
              >
                {faq.question}
                <ChevronDown className={`w-5 h-5 text-[#C8860A] transition-transform duration-300 ${
                  openIdx === idx ? "rotate-180" : ""
                }`} />
              </button>

              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden bg-white border-t border-gray-100"
                  >
                    <div className="p-6 text-gray-600 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
