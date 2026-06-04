"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#08111F] text-white flex flex-col pt-32 selection:bg-[#C8860A] selection:text-white">
      <Navbar />
      
      <div className="flex-1 max-w-4xl mx-auto px-6 lg:px-12 w-full pb-24">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
        <div className="w-20 h-1 bg-[#C8860A] mb-12" />

        <div className="space-y-8 text-gray-300 leading-relaxed font-sans">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>Welcome to Naheed & Sons Design & Construction Company. By accessing our website and utilizing our services, you agree to be bound by these Terms of Service. Please read them carefully.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services Provided</h2>
            <p>Naheed & Sons offers premium architectural design, structural engineering, and construction management services. The scope of any project will be defined strictly in a signed contractual agreement.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Client Responsibilities</h2>
            <p>Clients are expected to provide accurate information and necessary legal permits for construction unless explicitly stated otherwise in the project contract. Delays caused by the client may result in adjusted timelines.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
            <p>All architectural blueprints, 3D renderings, and design concepts provided by Naheed & Sons remain our intellectual property until full payment is received and a copyright transfer agreement is signed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Limitation of Liability</h2>
            <p>Naheed & Sons will not be held liable for indirect, incidental, or unforeseeable damages arising from the use of our services, beyond what is legally mandated by local construction laws.</p>
          </section>

          <p className="pt-8 text-sm text-gray-500 border-t border-white/10">Last updated: June 2026</p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
