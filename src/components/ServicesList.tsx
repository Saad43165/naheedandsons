"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { CheckCircle2, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { getServices, Service, getCompanySettings, CompanySettings } from "@/utils/storage";

const getIconComponent = (name: string) => {
  return (Icons[name as keyof typeof Icons] || Icons.HelpCircle) as React.ComponentType<any>;
};

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    setServices(getServices());
    setSettings(getCompanySettings());
  }, []);

  return (
    <section className="bg-white">
      {services.map((service, index) => {
        const Icon = getIconComponent(service.iconName);
        const isEven = index % 2 === 0;

        return (
          <div
            key={service.slug}
            id={service.slug}
            className={`py-20 md:py-28 ${isEven ? "bg-white" : "bg-[#F5F8FA]"}`}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center ${
                  !isEven ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Image */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`relative ${!isEven ? "lg:col-start-2" : ""}`}
                >
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B3A5C]/30 to-transparent" />

                    {/* Service Number Badge */}
                    <div className="absolute top-5 left-5 bg-[#C8860A] text-white font-display font-bold text-sm px-4 py-2 rounded-full">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Suitable For Card */}
                  <div className="absolute -bottom-5 right-5 bg-white rounded-xl shadow-xl border border-gray-100 p-4 max-w-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-[#C8860A] shrink-0" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Suitable For</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.suitable.map((item) => (
                        <span key={item} className="text-[10px] bg-[#C8860A]/10 text-[#C8860A] font-semibold px-2 py-1 rounded-full">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`pt-8 lg:pt-0 ${!isEven ? "lg:col-start-1 lg:row-start-1" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1B3A5C]/5 text-[#1B3A5C] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[#C8860A] text-[10px] font-bold uppercase tracking-[0.3em]">{service.tagline}</span>
                  </div>

                  <h2
                    className="font-display font-bold text-[#1B3A5C] leading-tight mb-4"
                    style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                  >
                    {service.title}
                  </h2>

                  <p className="text-gray-600 leading-relaxed mb-8 text-base">
                    {service.desc}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#C8860A] shrink-0 mt-0.5" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    <Link
                      href={`/quote?service=${service.slug.includes("residential") ? "residential" : service.slug.includes("commercial") ? "commercial" : service.slug.includes("interior") ? "interior" : "renovation"}`}
                      className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#11263d] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm"
                    >
                      Request This Service
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    {(() => {
                      const whatsappNum = settings?.whatsappNumber || settings?.phone || "+92 (300) 123-4567";
                      const whatsappClean = whatsappNum.replace(/\D/g, "");
                      const whatsappMsg = encodeURIComponent(`Hello Naheed & Sons, I would like to inquire about your "${service.title}" service.`);
                      const whatsappLink = `https://wa.me/${whatsappClean}?text=${whatsappMsg}`;
                      return (
                        <a
                          href={whatsappLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1fba58] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md hover:shadow-lg text-sm"
                        >
                          Inquire via WhatsApp
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.45L0 24zm6.59-4.846c1.6.95 3.18 1.448 4.82 1.449 5.4 0 9.79-4.386 9.793-9.779a9.715 9.715 0 0 0-2.873-6.924 9.75 9.75 0 0 0-6.93-2.87c-5.4 0-9.78 4.386-9.783 9.78a9.75 9.75 0 0 0 1.484 5.12L1.87 21.05l5.244-1.372c-.176-.103-.356-.2-.527-.296zm9.324-4.82c-.22-.11-.295-.125-.495-.218-.1-.05-.2-.1-.3-.217-.15-.17-.55-.66-.67-.78-.11-.13-.23-.15-.4-.05-.18.1-.73.34-.89.54-.16.19-.32.22-.54.11a7.873 7.873 0 0 1-3.32-2.903c-.28-.48.28-.45.74-.9.08-.08.1-.18.15-.27a.467.467 0 0 0-.02-.45c-.05-.1-.4-.96-.55-1.32-.15-.35-.31-.3-.42-.31-.11-.005-.24-.005-.36-.005a.729.729 0 0 0-.53.25c-.18.2-.69.68-.69 1.66 0 .98.71 1.91.81 2.05.1.13 1.39 2.13 3.38 2.99.47.2.84.32 1.13.41.48.16.9.13 1.25.08.38-.05 1.17-.48 1.34-.94.17-.47.17-.86.12-.94-.05-.09-.19-.14-.39-.24z" />
                          </svg>
                        </a>
                      );
                    })()}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
