"use client";

import { motion } from "framer-motion";
import { Eye, Target, Compass } from "lucide-react";
import { useState, useEffect } from "react";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

export default function MissionVision() {
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const values = [
    {
      icon: <Eye className="w-8 h-8 text-[#C8860A]" />,
      title: "Our Vision",
      description: settings?.aboutVision ?? "To lead the construction industry by building structures that inspire, stand the test of time, and enrich communities."
    },
    {
      icon: <Target className="w-8 h-8 text-[#C8860A]" />,
      title: "Our Mission",
      description: settings?.aboutMission ?? "To deliver unmatched construction quality and interior excellence through integrity, professional expertise, and innovation."
    },
    {
      icon: <Compass className="w-8 h-8 text-[#C8860A]" />,
      title: "Our Direction",
      description: settings?.aboutDirection ?? "Guided by sustainable building practices, advanced engineering, and client-centric designs."
    }
  ];

  return (
    <section className="py-20 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#C8860A]/10 flex items-center justify-center mb-6">
                {val.icon}
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1B3A5C] mb-4">{val.title}</h3>
              <p className="text-gray-600">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
