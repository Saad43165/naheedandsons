"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

export default function StorySection() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl font-bold text-[#1B3A5C] mb-6">{settings?.aboutStoryTitle ?? "Our Legacy"}</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {settings?.aboutStoryP1 ?? "Founded in 2001, Naheed & Sons Design & Construction Company started as a small contracting firm with a simple goal: to build homes that combine luxury with structural integrity. Over the last 25 years, we have grown into one of the region's leading full-service construction firms."}
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {settings?.aboutStoryP2 ?? "Today, we handle complex multi-story structures, high-end residential interiors, modern commercial designs, and structural renovations. Our success is built on long-term relationships, a highly qualified team, and our signature gold-standard client support."}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-xl aspect-video"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${settings?.aboutStoryImage ?? "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop"}')` }}
          />
        </motion.div>
      </div>
    </section>
  );
}
