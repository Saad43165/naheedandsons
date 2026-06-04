"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ServicesCtaBanner() {
  return (
    <section className="py-20 bg-[#1B3A5C]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl mb-4">
            Not sure which service you need?
          </h2>
          <p className="text-gray-300 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Book a free consultation call with our team. We'll assess your requirements and recommend the right solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg text-sm w-full sm:w-auto justify-center"
            >
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm w-full sm:w-auto justify-center"
            >
              Contact Our Team
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
