"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#08111F] text-white flex flex-col pt-32 selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 w-full pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <div className="w-20 h-1 bg-[#C8860A] mb-12" />

        <div className="space-y-8 text-gray-300 leading-relaxed font-sans">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Collection</h2>
            <p>We respect your privacy. Naheed & Sons only collects personal information (such as your name, email, and phone number) when you explicitly provide it to us through our contact forms or quote request systems.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Use of Information</h2>
            <p>The information we collect is strictly used to communicate with you regarding your construction inquiries, project updates, and customer support. We do not sell, rent, or share your personal data with third-party marketers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p>All sensitive information, including client inquiries and project data, is securely stored in our encrypted database (Supabase) and protected behind strict administrator access controls to prevent unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies</h2>
            <p>Our website uses minimal functional cookies and local storage entirely to improve your browsing experience and remember basic site preferences. We do not use invasive tracking cookies.</p>
          </section>

          <p className="pt-8 text-sm text-gray-500 border-t border-white/10">Last updated: June 2026</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
