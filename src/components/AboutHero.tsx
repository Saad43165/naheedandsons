"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative pt-36 pb-20 bg-[#1B3A5C] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-5xl md:text-6xl font-bold mb-4"
        >
          About <span className="text-[#C8860A]">Naheed & Sons</span>
        </motion.h1>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">
          We are architects of space and builders of trust. Discover our story, our passion, and the core values that drive us.
        </p>
      </div>
    </section>
  );
}
