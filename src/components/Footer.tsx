"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCompanySettings, CompanySettings } from "@/utils/storage";

export default function Footer() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const handleLogoClick = () => {
    const nextClicks = clicks + 1;
    if (nextClicks >= 5) {
      setClicks(0);
      if (timerRef.current) clearTimeout(timerRef.current);
      router.push("/admin?key=naheed-sons-secure-2026");
    } else {
      setClicks(nextClicks);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setClicks(0);
      }, 2000);
    }
  };

  return (
    <footer className="bg-[#1B3A5C] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div 
              onClick={handleLogoClick}
              className="inline-flex items-center gap-2 mb-6 cursor-pointer select-none"
              title="Naheed & Sons"
            >
              <Logo className="w-10 h-10 rounded-lg" fontSize="1.2rem" />
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                Naheed & <span className="text-[#C8860A]">Sons</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Building excellence and engineering the future. We deliver world-class construction and design solutions tailored to your vision.
            </p>
            <div className="flex gap-4">
              {/* Facebook Inline SVG */}
              {settings?.facebookLink && (
                <a href={settings.facebookLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8860A] transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}

              {/* TikTok Inline SVG */}
              {settings?.tiktokLink && (
                <a href={settings.tiktokLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8860A] transition-colors" aria-label="TikTok">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.27 6.36 6.3 6.3 0 006.25-6.3V8.38a8.32 8.32 0 004.1 1.08V6.05a4.74 4.74 0 01-2.03-.36z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-block">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-gray-300 hover:text-[#C8860A] transition-colors">About Us</Link></li>
              <li><Link href="/projects" className="text-gray-300 hover:text-[#C8860A] transition-colors">Our Projects</Link></li>
              <li><Link href="/team" className="text-gray-300 hover:text-[#C8860A] transition-colors">Team Members</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-[#C8860A] transition-colors">News & Blog</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-[#C8860A] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-block">Our Services</h4>
            <ul className="space-y-4">
              <li><Link href="/services#interior-design" className="text-gray-300 hover:text-[#C8860A] transition-colors">Interior Design</Link></li>
              <li><Link href="/services#exterior-finishing" className="text-gray-300 hover:text-[#C8860A] transition-colors">Exterior Finishing</Link></li>
              <li><Link href="/services#full-construction" className="text-gray-300 hover:text-[#C8860A] transition-colors">Full Construction</Link></li>
              <li><Link href="/services#renovation" className="text-gray-300 hover:text-[#C8860A] transition-colors">Renovation</Link></li>
              <li><Link href="/services#project-management" className="text-gray-300 hover:text-[#C8860A] transition-colors">Project Management</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-xl font-bold mb-6 text-white border-b border-white/10 pb-4 inline-block">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C8860A] shrink-0 mt-1" />
                <span className="text-gray-300">{settings?.address ?? "Plot 45-C, Bukhari Commercial, DHA Phase 6, Karachi, Pakistan"}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#C8860A] shrink-0" />
                <a href={`tel:${settings?.phone?.replace(/\D/g, "") ?? "+923001234567"}`} className="text-gray-300 hover:text-[#C8860A] transition-colors">{settings?.phone ?? "+92 (300) 123-4567"}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#C8860A] shrink-0" />
                <a href={`mailto:${settings?.email ?? "info@naheedandsons.com"}`} className="text-gray-300 hover:text-[#C8860A] transition-colors">{settings?.email ?? "info@naheedandsons.com"}</a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1.5 text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Naheed & Sons Design & Construction Company. All rights reserved.
            </p>
            <p className="text-[#1B3A5C] bg-[#C8860A]/10 self-center md:self-start px-3 py-1 rounded-full text-xs text-gray-500 font-medium">
              Developed by <a href="https://portfolio-saad-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-[#C8860A] hover:text-white transition-colors font-bold tracking-wide">Engr. Saad Ikram</a>
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>

          </div>
        </div>
      </div>
      
      {/* Floating WhatsApp Button */}
      {(() => {
        const whatsappNum = settings?.whatsappNumber || settings?.phone || "+92 (300) 123-4567";
        const whatsappClean = whatsappNum.replace(/\D/g, "");
        const whatsappMsg = encodeURIComponent(settings?.whatsappMessage || "Hello Naheed & Sons, I would like to inquire about your construction and design services.");
        const whatsappLink = `https://wa.me/${whatsappClean}?text=${whatsappMsg}`;
        return (
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
            aria-label="Contact via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </a>
        );
      })()}
    </footer>
  );
}
