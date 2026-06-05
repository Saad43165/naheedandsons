"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { saveInquiry, getCompanySettings, CompanySettings } from "@/utils/storage";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<CompanySettings | null>(null);

  useEffect(() => {
    const load = () => setSettings(getCompanySettings());
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const validate = () => {
    let errs: Record<string, string> = {};
    if (!formData.name) errs.name = "Name is required";
    if (!formData.email) errs.email = "Email is required";
    if (!formData.message) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    
    // Save submission to local storage
    saveInquiry({
      id: "inq-" + Date.now(),
      type: "contact",
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "General Inquiry",
      message: formData.message,
      date: new Date().toISOString(),
      status: "New"
    });

    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Info Column */}
        <div>
          <h2 className="font-display text-4xl font-bold text-[#1B3A5C] mb-6">Get in Touch</h2>
          <p className="text-gray-600 mb-12 max-w-lg leading-relaxed">
            Whether you want to discuss a new residential project, commercial development, or just have a few questions, our team is here to assist.
          </p>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1B3A5C]/5 text-[#C8860A] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[#1B3A5C] font-bold text-lg mb-1">Office Address</h4>
                <p className="text-gray-600">{settings?.address ?? "Plot 45-C, Bukhari Commercial, DHA Phase 6, Karachi, Pakistan"}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1B3A5C]/5 text-[#C8860A] flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[#1B3A5C] font-bold text-lg mb-1">Phone Number</h4>
                <a href={`tel:${settings?.phone?.replace(/\D/g, "") ?? "+923346878500"}`} className="text-gray-600 hover:text-[#C8860A] transition-colors">{settings?.phone ?? "+92 334 6878500"}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1B3A5C]/5 text-[#C8860A] flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[#1B3A5C] font-bold text-lg mb-1">Email Address</h4>
                <a href={`mailto:${settings?.email ?? "info@naheedandsons.com"}`} className="text-gray-600 hover:text-[#C8860A] transition-colors">{settings?.email ?? "info@naheedandsons.com"}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#1B3A5C]/5 text-[#C8860A] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[#1B3A5C] font-bold text-lg mb-1">Business Hours</h4>
                <p className="text-gray-600">{settings?.hours ?? "Mon - Sat: 9:00 AM - 6:00 PM"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-[#F5F5F5] rounded-2xl p-8 border border-gray-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-[#22C55E]/10 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-6">
                <Send className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#1B3A5C] mb-2">Message Sent!</h3>
              <p className="text-gray-600 mb-6">Thank you for writing to us. We will get back to you shortly.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-[#1B3A5C] text-white py-2.5 px-6 rounded-md text-sm font-semibold hover:bg-[#11263d]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Full Name</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full bg-white border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                    errors.name ? "border-[#EF4444]" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Email Address</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full bg-white border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                    errors.email ? "border-[#EF4444]" : "border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Subject (Optional)</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Your Message</label>
                <textarea 
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full bg-white border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all resize-none ${
                    errors.message ? "border-[#EF4444]" : "border-gray-200"
                  }`}
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#C8860A] text-white py-3 rounded-md font-semibold text-sm hover:bg-[#a66d06] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                Send Message
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
