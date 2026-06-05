"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Download } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Secret admin keyboard shortcut: Ctrl + Shift + A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin?key=naheed-sons-secure-2026");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Check if PWA install is available
  useEffect(() => {
    const checkInstall = () => {
      if (typeof window !== "undefined" && (window as any).deferredPrompt) {
        setCanInstall(true);
      }
    };
    checkInstall();
    const interval = setInterval(checkInstall, 1000);
    return () => clearInterval(interval);
  }, []);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
            ? "bg-white/98 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] py-3"
            : "bg-transparent py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 z-10 flex items-center gap-3">
            <Logo
              layoutId="main-logo"
              className="w-10 h-10 rounded-lg"
              fontSize="1.2rem"
            />
            <span
              className={`font-display text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isScrolled ? "text-[#1B3A5C]" : "text-white"
                }`}
            >
              Naheed & <span className="text-[#C8860A]">Sons</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${isScrolled
                      ? isActive
                        ? "text-[#C8860A]"
                        : "text-gray-700 hover:text-[#C8860A]"
                      : isActive
                        ? "text-[#C8860A]"
                        : "text-white/90 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#C8860A] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors duration-200 ${isScrolled ? "text-gray-600 hover:text-[#1B3A5C]" : "text-white/80 hover:text-white"
                }`}
            >
              Contact
            </Link>
            <Link
              href="/quote"
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 ${isScrolled
                  ? "bg-[#1B3A5C] text-white hover:bg-[#11263d] shadow-md hover:shadow-lg"
                  : "bg-[#C8860A] text-white hover:bg-[#a66d06] shadow-[0_4px_15px_rgba(200,134,10,0.4)]"
                }`}
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors z-10 ${isScrolled ? "text-[#1B3A5C] hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay — renders outside header to avoid z-index conflicts */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 w-[300px] max-w-[90vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <Logo
                    layoutId="main-logo-mobile"
                    className="w-8 h-8 rounded-md"
                    fontSize="1rem"
                  />
                  <span className="font-display text-lg font-bold text-[#1B3A5C]">
                    Naheed & <span className="text-[#C8860A]">Sons</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4">
                {NAV_LINKS.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 font-medium transition-colors ${isActive
                            ? "bg-[#C8860A]/10 text-[#C8860A]"
                            : "text-gray-700 hover:bg-gray-50 hover:text-[#1B3A5C]"
                          }`}
                      >
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C8860A] shrink-0" />}
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Footer CTA */}
              <div className="p-6 border-t border-gray-100 space-y-3">
                <Link
                  href="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-[#C8860A] text-white font-bold py-3.5 rounded-xl hover:bg-[#a66d06] transition-colors"
                >
                  Request a Free Quote
                </Link>
                {canInstall && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      const prompt = (window as any).deferredPrompt;
                      if (prompt) prompt.prompt();
                    }}
                    className="flex w-full items-center justify-center gap-2 border-2 border-[#C8860A] text-[#C8860A] font-bold py-3 rounded-xl hover:bg-[#C8860A] hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Install App
                  </button>
                )}
                <a
                  href="tel:+923346878500"
                  className="block w-full text-center border-2 border-[#1B3A5C] text-[#1B3A5C] font-semibold py-3 rounded-xl hover:bg-[#1B3A5C] hover:text-white transition-colors text-sm"
                >
                  +92 334 6878500
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
