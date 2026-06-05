"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (localStorage.getItem("naheed_dismissed_install") || sessionStorage.getItem("naheed_install_prompt_seen")) {
      return;
    }

    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
      // Record that we showed it this session so we don't spam them on navigation
      sessionStorage.setItem("naheed_install_prompt_seen", "true");
      // Show the custom popup after a short delay
      setTimeout(() => setShowPrompt(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    // Show the browser install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowPrompt(false);
      localStorage.setItem("naheed_dismissed_install", "true");
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Remember that the user dismissed it so we don't spam them
    localStorage.setItem("naheed_dismissed_install", "true");
  };

  return (
    <AnimatePresence>
      {showPrompt && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:right-auto z-[1000] max-w-sm bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-gray-100 p-4"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="w-12 h-12 bg-[#1B3A5C] rounded-xl flex items-center justify-center shrink-0">
              <Download className="w-6 h-6 text-[#C8860A]" />
            </div>
            <div className="flex-1 mt-0.5">
              <h4 className="font-display font-bold text-[#1B3A5C] text-[15px]">Install App</h4>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">Get the full Naheed & Sons experience on your home screen.</p>
            </div>
            <button 
              onClick={handleDismiss} 
              className="p-1.5 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleInstall}
            className="w-full bg-[#C8860A] hover:bg-[#a66d06] text-white font-bold py-3 rounded-xl text-sm shadow-md transition-colors"
          >
            Add to Home Screen
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
