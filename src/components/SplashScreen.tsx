"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

export default function SplashScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We want the splash screen to show until the data syncs,
    // but at minimum for 2.5 seconds so the user can appreciate the animation.
    const minimumTime = new Promise((resolve) => setTimeout(resolve, 2500));
    
    // We also wait for the storage to emit its first sync (or just load from localStorage)
    let isSynced = false;
    const handleSync = () => { isSynced = true; };
    window.addEventListener("naheed_storage_synced", handleSync);

    const checkReady = async () => {
      await minimumTime;
      
      // If after 2.5 seconds it still hasn't synced, wait up to 2 more seconds max
      let attempts = 0;
      while (!isSynced && attempts < 10) {
        await new Promise(r => setTimeout(r, 200));
        attempts++;
      }
      
      setLoading(false);
    };

    // If document is already loaded and we have data in localStorage, we can proceed.
    // The minimumTime promise ensures it still shows the logo.
    if (localStorage.getItem("naheedandsons_settings_v1")) {
      isSynced = true;
    }

    checkReady();

    return () => window.removeEventListener("naheed_storage_synced", handleSync);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#08111F] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Background subtle pulse */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1B3A5C]/20 via-[#08111F] to-[#08111F]"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* The Logo */}
            <div className="w-32 h-32 md:w-40 md:h-40 relative mb-8 flex justify-center items-center">
              <div className="absolute inset-0 bg-[#C8860A] rounded-full blur-3xl opacity-20 animate-pulse" />
              <Logo 
                layoutId="main-logo" 
                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl relative z-10 drop-shadow-2xl" 
                fontSize="4rem"
              />
            </div>

            {/* Company Name */}
            <div className="overflow-hidden flex flex-col items-center">
              <motion.h1 
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-3xl md:text-5xl text-white tracking-wide"
              >
                NAHEED & SONS
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-[#C8860A] text-xs md:text-sm tracking-[0.4em] font-semibold uppercase mt-3"
              >
                Design & Construction
              </motion.p>
            </div>

            {/* Loading Bar */}
            <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[#C8860A] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
