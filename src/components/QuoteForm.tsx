"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { saveInquiry, getServices, Service } from "@/utils/storage";
import { useEffect } from "react";

export default function QuoteForm() {
  const [services, setServices] = useState<Service[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    area: "",
    budget: "PKR 50 Lakh - 1.5 Crore",
    timeline: "3 - 6 Months",
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const load = () => {
      const loaded = getServices();
      setServices(loaded);
      if (loaded.length > 0) {
        setFormData(prev => {
          const isValidType = loaded.some(s => s.title === prev.projectType);
          if (!prev.projectType || !isValidType) {
            return { ...prev, projectType: loaded[0].title };
          }
          return prev;
        });
      }
    };
    load();
    window.addEventListener("naheed_storage_synced", load);
    return () => window.removeEventListener("naheed_storage_synced", load);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    let errs: Record<string, string> = {};
    if (step === 1 && !formData.area) {
      errs.area = "Project size/area is required";
    }
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let errs: Record<string, string> = {};
    if (!formData.name) errs.name = "Full name is required";
    if (!formData.email) errs.email = "Email address is required";
    if (!formData.phone) errs.phone = "Phone number is required";
    
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    
    // Save quote to local storage
    saveInquiry({
      id: "inq-" + Date.now(),
      type: "quote",
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message || "No project brief provided.",
      projectType: formData.projectType,
      area: formData.area,
      budget: formData.budget,
      timeline: formData.timeline,
      date: new Date().toISOString(),
      status: "New"
    });

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="quote-form-section" className="py-20">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200/80 shadow-md">
          
          {/* Progress Stepper */}
          {!submitted && (
            <div className="flex items-center justify-between mb-12 relative">
              <div className="absolute left-0 right-0 h-1 bg-gray-100 top-1/2 -translate-y-1/2 z-0" />
              <div 
                className="absolute left-0 h-1 bg-[#C8860A] top-1/2 -translate-y-1/2 z-0 transition-all duration-300" 
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              />
              
              {[1, 2, 3].map((num) => (
                <div 
                  key={num} 
                  className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all border-2 ${
                    step >= num 
                      ? "bg-[#C8860A] border-[#C8860A] text-white" 
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {step > num ? <Check className="w-5 h-5" /> : num}
                </div>
              ))}
            </div>
          )}

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-[#22C55E]/10 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-[#22C55E]/30">
                <Check className="w-10 h-10" />
              </div>
              <h2 className="font-display text-3xl font-bold text-[#1B3A5C] mb-4">Quote Request Submitted!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for reaching out to Naheed & Sons. Our estimating team will review your project specs and contact you within 24–48 hours.
              </p>
              <button 
                onClick={() => { setSubmitted(false); setStep(1); setFormData({
                  projectType: "Residential Construction",
                  area: "",
                  budget: "PKR 50 Lakh - 1.5 Crore",
                  timeline: "3 - 6 Months",
                  name: "",
                  email: "",
                  phone: "",
                  message: ""
                }); }}
                className="bg-[#1B3A5C] text-white py-3 px-6 rounded-md font-semibold text-sm hover:bg-[#11263d] transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Details */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="font-display text-2xl font-bold text-[#1B3A5C] mb-8">Step 1: Project Type & Size</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">What type of project is this?</label>
                    <select 
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all"
                    >
                      {services.length > 0 ? (
                        services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))
                      ) : (
                        <option>Loading services...</option>
                      )}
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Estimated Size/Area (e.g. 2,500 sqft)</label>
                    <input 
                      type="text"
                      name="area"
                      placeholder="e.g. 5,000 sqft or 5 Marla"
                      value={formData.area}
                      onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                      className={`w-full bg-[#F5F5F5] border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                        errors.area ? "border-[#EF4444]" : "border-gray-200"
                      }`}
                    />
                    {errors.area && <p className="text-[#EF4444] text-xs mt-2 font-semibold">{errors.area}</p>}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="font-display text-2xl font-bold text-[#1B3A5C] mb-8">Step 2: Budget & Timeline</h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Estimated Budget Range</label>
                    <select 
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all"
                    >
                      <option>Under PKR 50 Lakh</option>
                      <option>PKR 50 Lakh - 1.5 Crore</option>
                      <option>PKR 1.5 Crore - 3.5 Crore</option>
                      <option>PKR 3.5 Crore - 7.5 Crore</option>
                      <option>PKR 7.5 Crore+</option>
                    </select>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-3">Target Completion Timeline</label>
                    <select 
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all"
                    >
                      <option>Under 3 Months</option>
                      <option>3 - 6 Months</option>
                      <option>6 - 12 Months</option>
                      <option>12+ Months</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="font-display text-2xl font-bold text-[#1B3A5C] mb-8">Step 3: Contact Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Full Name</label>
                      <input 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-[#F5F5F5] border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                          errors.name ? "border-[#EF4444]" : "border-gray-200"
                        }`}
                      />
                      {errors.name && <p className="text-[#EF4444] text-xs mt-1.5 font-semibold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Email Address</label>
                      <input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-[#F5F5F5] border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                          errors.email ? "border-[#EF4444]" : "border-gray-200"
                        }`}
                      />
                      {errors.email && <p className="text-[#EF4444] text-xs mt-1.5 font-semibold">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Phone Number</label>
                    <input 
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full bg-[#F5F5F5] border rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all ${
                        errors.phone ? "border-[#EF4444]" : "border-gray-200"
                      }`}
                    />
                    {errors.phone && <p className="text-[#EF4444] text-xs mt-1.5 font-semibold">{errors.phone}</p>}
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">Project Brief / Message (Optional)</label>
                    <textarea 
                      rows={4}
                      placeholder="Provide details about materials, design ideas, site status, etc."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#F5F5F5] border border-gray-200 rounded-md py-3 px-4 text-[#2D2D2D] focus:outline-none focus:border-[#C8860A] transition-all resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-100">
                {step > 1 ? (
                  <button 
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center gap-2 text-[#1B3A5C] font-semibold hover:text-[#C8860A] transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                  </button>
                ) : <div />}

                {step < 3 ? (
                  <button 
                    type="button"
                    onClick={nextStep}
                    className="bg-[#C8860A] text-white py-3 px-6 rounded-md font-semibold text-sm hover:bg-[#a66d06] transition-colors inline-flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button 
                    type="submit"
                    className="bg-[#C8860A] text-white py-3 px-8 rounded-md font-semibold text-sm hover:bg-[#a66d06] transition-colors shadow-md"
                  >
                    Submit Quote Request
                  </button>
                )}
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
