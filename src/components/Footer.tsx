"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
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
              <img
                src="/logo_square.png"
                alt="Naheed & Sons"
                className="w-9 h-9 rounded-lg object-cover border border-[#C8860A]/30"
              />
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
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                  </svg>
                </a>
              )}
              {/* Instagram Inline SVG */}
              {settings?.instagramLink && (
                <a href={settings.instagramLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8860A] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}
              {/* Linkedin Inline SVG */}
              {settings?.linkedinLink && (
                <a href={settings.linkedinLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8860A] transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {/* Youtube Inline SVG */}
              {settings?.youtubeLink && (
                <a href={settings.youtubeLink} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C8860A] transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.556a3.003 3.003 0 0 0-2.11 2.107C0 8.018 0 12 0 12s0 3.982.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.556a3.003 3.003 0 0 0 2.11-2.107C24 15.982 24 12 24 12s0-3.982-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Naheed & Sons Design & Construction Company. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/admin" className="text-gray-400 hover:text-white transition-colors">Admin Console</Link>

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
