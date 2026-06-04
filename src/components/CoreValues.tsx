"use client";

import { motion } from "framer-motion";
import { Shield, Gem, Heart } from "lucide-react";

const CORE_VALUES = [
  { icon: <Shield className="w-6 h-6" />, title: "Integrity First", desc: "Honesty and transparency in every cost estimate, material, and timeline." },
  { icon: <Gem className="w-6 h-6" />, title: "Quality Craftsmanship", desc: "No compromises. We build to the absolute highest architectural standards." },
  { icon: <Heart className="w-6 h-6" />, title: "Client Partnerships", desc: "We listen, collaborate, and bring our clients' visions to life as true partners." }
];

export default function CoreValues() {
  return (
    <section className="py-24 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold text-[#1B3A5C]">Our Core Values</h2>
          <p className="text-gray-500 mt-4">The principles that guide our choices, our craft, and our client relations every single day.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-8 border border-gray-200 rounded-xl hover:bg-[#1B3A5C] hover:text-white group transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-[#C8860A] text-white flex items-center justify-center mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 font-display text-[#1B3A5C] group-hover:text-white transition-colors">{value.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-300 transition-colors">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
