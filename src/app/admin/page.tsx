"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  getProjects, saveProject, deleteProject, Project,
  getBlogPosts, saveBlogPost, deleteBlogPost,
  getInquiries, saveInquiry, deleteInquiry, Inquiry,
  getFAQs, saveFAQ, deleteFAQ, FAQ,
  getServices, saveService, deleteService, Service,
  getRateSettings, saveRateSettings, RateSettings,
  getCompanySettings, saveCompanySettings, CompanySettings,
  getTeamMembers, saveTeamMember, deleteTeamMember, TeamMember,
  getTestimonials, saveTestimonial, deleteTestimonial, Testimonial
} from "@/utils/storage";
import { BlogPost } from "@/data/blog";
import { 
  Plus, Trash2, Edit, Check, Lock, LogOut, Eye, FolderGit2, 
  FileText, Image as ImageIcon, Sparkles, UploadCloud, Film,
  MessageSquare, HelpCircle, LayoutGrid, User, Phone, Mail, Calendar, Info,
  Calculator, Percent, Settings, Users, Star
} from "lucide-react";
import MediaUploader from "@/components/MediaUploader";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<"projects" | "blog" | "inquiries" | "faqs" | "services" | "rates" | "settings" | "team" | "testimonials">("projects");
  
  // Custom Toast System
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" | "info" }[]>([]);
  const [shouldCloseAfterSave, setShouldCloseAfterSave] = useState(true);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Storage states
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [rates, setRates] = useState<RateSettings | null>(null);
  const [settings, setSettings] = useState<CompanySettings | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  // Form states
  const [ratesForm, setRatesForm] = useState<RateSettings>({
    residentialRate: 7500,
    commercialRate: 9500,
    interiorRate: 5000,
    renovationRate: 3800,
    standardMultiplier: 1.0,
    premiumMultiplier: 1.3,
    luxuryMultiplier: 1.65
  });

  const [settingsForm, setSettingsForm] = useState<CompanySettings>({
    address: "",
    phone: "",
    email: "",
    hours: "",
    yearsExperience: "",
    projectsCompleted: "",
    clientSatisfaction: "",
    completedOnTime: "",
    aboutStoryTitle: "",
    aboutStoryP1: "",
    aboutStoryP2: "",
    aboutStoryImage: "",
    aboutMission: "",
    aboutVision: "",
    aboutDirection: "",
    beforeAfterTitle: "",
    beforeAfterSubtitle: "",
    beforeAfterBeforeImage: "",
    beforeAfterAfterImage: "",
    beforeAfterBeforeLabel: "",
    beforeAfterAfterLabel: "",
    whatsappNumber: "",
    whatsappMessage: ""
  });

  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [teamForm, setTeamForm] = useState<Partial<TeamMember>>({
    id: "",
    name: "",
    role: "",
    bio: "",
    image: "",
    sortOrder: 0,
    linkedin: "",
    email: "",
    phone: ""
  });

  const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    id: "",
    name: "",
    role: "",
    company: "",
    rating: 5,
    text: "",
    image: "",
    project: "",
    sortOrder: 0
  });

  // Editing Project State
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: "",
    title: "",
    category: "Full Construction",
    location: "",
    year: new Date().getFullYear().toString(),
    duration: "",
    area: "",
    budget: "",
    status: "Completed",
    description: "",
    image: "",
    gallery: [],
    tags: [],
    team: [],
    video: "",
  });

  // Editing Blog State
  const [isEditingBlog, setIsEditingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    slug: "",
    title: "",
    excerpt: "",
    category: "Interior Design",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    author: "",
    image: "",
    content: [],
  });

  // Editing FAQ State
  const [isEditingFAQ, setIsEditingFAQ] = useState(false);
  const [faqForm, setFaqForm] = useState<Partial<FAQ>>({
    id: "",
    question: "",
    answer: ""
  });

  // Editing Service State
  const [isEditingService, setIsEditingService] = useState(false);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    slug: "",
    title: "",
    tagline: "",
    desc: "",
    image: "",
    iconName: "Building2",
    features: [],
    suitable: []
  });

  const [isValidKey, setIsValidKey] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);

  // Load state on mount / auth change
  useEffect(() => {
    const authStatus = sessionStorage.getItem("naheed_admin_auth");
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    
    const loadAllData = () => {
      setProjects(getProjects());
      setBlogs(getBlogPosts());
      setInquiries(getInquiries());
      setFaqs(getFAQs());
      setServices(getServices());
      const ratesData = getRateSettings();
      setRates(ratesData);
      setRatesForm(ratesData);
      const companyData = getCompanySettings();
      setSettings(companyData);
      setSettingsForm(companyData);
      setTeam(getTeamMembers());
      setTestimonials(getTestimonials());
    };

    const verifyAccess = async () => {
      if (authStatus === "true") {
        setIsAuthenticated(true);
        setIsValidKey(true);
        loadAllData();
      } else if (key) {
        try {
          const res = await fetch("/api/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key })
          });
          const data = await res.json();
          if (data.success) {
            setIsValidKey(true);
          }
        } catch (err) {
          console.error("Access key verification failed:", err);
        }
      }
      setCheckingKey(false);
    };

    verifyAccess();

    window.addEventListener("naheed_storage_synced", loadAllData);
    return () => {
      window.removeEventListener("naheed_storage_synced", loadAllData);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: password })
      });
      const data = await res.json();
      if (data.success) {
        sessionStorage.setItem("naheed_admin_auth", "true");
        setIsAuthenticated(true);
        setProjects(getProjects());
        setBlogs(getBlogPosts());
        setInquiries(getInquiries());
        setFaqs(getFAQs());
        setServices(getServices());
        const ratesData = getRateSettings();
        setRates(ratesData);
        setRatesForm(ratesData);
        const companyData = getCompanySettings();
        setSettings(companyData);
        setSettingsForm(companyData);
        setTeam(getTeamMembers());
        setTestimonials(getTestimonials());
        setLoginError("");
      } else {
        setLoginError(data.error || "Invalid administrator passcode. Please try again.");
      }
    } catch (err) {
      setLoginError("Connection to authentication server failed. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("naheed_admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  // Rates handler
  const handleRatesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveRateSettings(ratesForm);
    setRates(updated);
    showToast("Pricing rates and multipliers updated successfully!");
  };

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = saveCompanySettings(settingsForm);
    setSettings(updated);
    showToast("Company settings and statistics updated successfully!");
  };

  // TEAM CRUD ACTIONS
  const startNewTeamMember = () => {
    setTeamForm({
      id: "member-" + Date.now(),
      name: "",
      role: "",
      bio: "",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
      sortOrder: (team.length + 1),
      linkedin: "",
      email: "",
      phone: ""
    });
    setIsEditingTeam(true);
  };

  const startEditTeamMember = (m: TeamMember) => {
    setTeamForm({
      ...m,
      linkedin: m.linkedin || "",
      email: m.email || "",
      phone: m.phone || ""
    });
    setIsEditingTeam(true);
  };

  const handleSaveTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamForm.name || !teamForm.role) {
      showToast("Name and Role are required.", "error");
      return;
    }
    const updated = saveTeamMember(teamForm as TeamMember);
    setTeam(updated);
    showToast(`Team member "${teamForm.name}" saved successfully!`);
    if (shouldCloseAfterSave) {
      setIsEditingTeam(false);
    }
  };

  const handleDeleteTeamMember = (id: string) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      const updated = deleteTeamMember(id);
      setTeam(updated);
      showToast("Team member deleted successfully!");
    }
  };

  // TESTIMONIALS CRUD ACTIONS
  const startNewTestimonial = () => {
    setTestimonialForm({
      id: "test-" + Date.now(),
      name: "",
      role: "",
      company: "",
      rating: 5,
      text: "",
      image: "",
      project: "",
      sortOrder: (testimonials.length + 1)
    });
    setIsEditingTestimonial(true);
  };

  const startEditTestimonial = (t: Testimonial) => {
    setTestimonialForm({ ...t, image: t.image || "" });
    setIsEditingTestimonial(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.name || !testimonialForm.text) {
      showToast("Name and Text are required.", "error");
      return;
    }
    const updated = saveTestimonial(testimonialForm as Testimonial);
    setTestimonials(updated);
    showToast(`Testimonial from "${testimonialForm.name}" saved successfully!`);
    if (shouldCloseAfterSave) {
      setIsEditingTestimonial(false);
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      const updated = deleteTestimonial(id);
      setTestimonials(updated);
      showToast("Testimonial deleted successfully!");
    }
  };

  // FAQ CRUD Handlers
  const handleFAQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      showToast("Question and Answer are required.", "error");
      return;
    }
    const newFAQ: FAQ = {
      id: faqForm.id || "faq-" + Date.now(),
      question: faqForm.question || "",
      answer: faqForm.answer || ""
    };
    const updated = saveFAQ(newFAQ);
    setFaqs(updated);
    showToast("FAQ saved successfully!");
    if (shouldCloseAfterSave) {
      setIsEditingFAQ(false);
    }
  };

  const startNewFAQ = () => {
    setFaqForm({ id: "", question: "", answer: "" });
    setIsEditingFAQ(true);
  };

  const handleEditFAQ = (faq: FAQ) => {
    setFaqForm(faq);
    setIsEditingFAQ(true);
  };

  const handleDeleteFAQ = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      const updated = deleteFAQ(id);
      setFaqs(updated);
      showToast("FAQ removed successfully!");
    }
  };

  // Service CRUD Handlers
  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.tagline || !serviceForm.desc) {
      showToast("Title, tagline, and description are required.", "error");
      return;
    }
    const slug = serviceForm.slug || serviceForm.title.toLowerCase().replace(/\s+/g, "-") || "";
    const newService: Service = {
      slug,
      title: serviceForm.title || "",
      tagline: serviceForm.tagline || "",
      desc: serviceForm.desc || "",
      image: serviceForm.image || "",
      iconName: serviceForm.iconName || "Building2",
      features: serviceForm.features || [],
      suitable: serviceForm.suitable || []
    };
    const updated = saveService(newService);
    setServices(updated);
    showToast(`Service "${newService.title}" saved successfully!`);
    if (shouldCloseAfterSave) {
      setIsEditingService(false);
    } else {
      setServiceForm(newService);
    }
  };

  const startNewService = () => {
    setServiceForm({
      slug: "",
      title: "",
      tagline: "",
      desc: "",
      image: "",
      iconName: "Building2",
      features: [],
      suitable: []
    });
    setIsEditingService(true);
  };

  const handleEditService = (srv: Service) => {
    setServiceForm(srv);
    setIsEditingService(true);
  };

  const handleDeleteService = (slug: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      const updated = deleteService(slug);
      setServices(updated);
      showToast("Service removed successfully!");
    }
  };

  // Inquiry Handlers
  const handleInquiryStatusChange = (id: string, newStatus: "New" | "Replied" | "Archived") => {
    const inquiry = inquiries.find((i) => i.id === id);
    if (inquiry) {
      const updatedInquiry = { ...inquiry, status: newStatus };
      const updated = saveInquiry(updatedInquiry);
      setInquiries(updated);
      showToast(`Inquiry status updated to ${newStatus}.`);
    }
  };

  const handleDeleteInquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry submission?")) {
      const updated = deleteInquiry(id);
      setInquiries(updated);
      showToast("Inquiry submission deleted successfully!");
    }
  };

  // PROJECT ACTIONS
  const startNewProject = () => {
    setProjectForm({
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      category: "Full Construction",
      location: "",
      year: new Date().getFullYear().toString(),
      duration: "",
      area: "",
      budget: "",
      status: "Completed",
      description: "",
      image: "",
      gallery: [],
      tags: ["Residential", "Luxury"],
      team: [
        { name: "Sikander Alvi", role: "Site Supervisor" }
      ],
      video: "",
    });
    setIsEditingProject(true);
  };

  const startEditProject = (p: Project) => {
    setProjectForm({
      ...p,
      video: p.video || "",
    });
    setIsEditingProject(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.id || !projectForm.title || !projectForm.location) {
      showToast("Please fill in ID, Title, and Location fields.", "error");
      return;
    }
    const updated = saveProject(projectForm as Project);
    setProjects(updated);
    showToast(`Project "${projectForm.title}" saved successfully!`);
    if (shouldCloseAfterSave) {
      setIsEditingProject(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to remove this project from the database?")) {
      const updated = deleteProject(id);
      setProjects(updated);
      showToast("Project removed from database successfully!");
    }
  };

  // BLOG ACTIONS
  const startNewBlog = () => {
    setBlogForm({
      slug: "",
      title: "",
      excerpt: "",
      category: "Interior Design",
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      author: "Admin",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600",
      content: [""],
    });
    setIsEditingBlog(true);
  };

  const startEditBlog = (b: BlogPost) => {
    setBlogForm({ ...b });
    setIsEditingBlog(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title) {
      showToast("Title is required.", "error");
      return;
    }
    // Generate slug from title if not set
    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const updatedBlogPost = { ...blogForm, slug } as BlogPost;
    const updated = saveBlogPost(updatedBlogPost);
    setBlogs(updated);
    showToast(`Article "${blogForm.title}" saved successfully!`);
    if (shouldCloseAfterSave) {
      setIsEditingBlog(false);
    } else {
      setBlogForm(updatedBlogPost);
    }
  };

  const handleDeleteBlog = (slug: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updated = deleteBlogPost(slug);
      setBlogs(updated);
      showToast("Blog post deleted successfully!");
    }
  };

  if (checkingKey) {
    return (
      <div className="min-h-screen bg-[#08111F] text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#C8860A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isValidKey) {
    return (
      <div className="min-h-screen bg-[#08111F] text-white flex items-center justify-center font-sans selection:bg-[#C8860A] selection:text-white">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold border-r border-white/20 pr-6">404</h1>
          <p className="text-sm">This page could not be found.</p>
        </div>
      </div>
    );
  }

  // LOGIN PORTAL (if not authenticated)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#08111F] text-white flex flex-col justify-between selection:bg-[#C8860A] selection:text-white">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-32 px-6">
          <div className="bg-[#0E1B2D] border border-white/[0.08] p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden">
            {/* Top gold bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8860A] to-[#e8a832]" />
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4 border border-[#C8860A]/40 shadow-lg">
                <img src="/logo_square.png" alt="Naheed & Sons Logo" className="w-full h-full object-cover" />
              </div>
              <h1 className="font-display text-2xl font-bold text-white tracking-tight">Admin Gate</h1>
              <p className="text-gray-400 text-xs mt-2">Naheed & Sons Management System</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">Administrator Code</label>
                <input
                  type="password"
                  placeholder="Enter Passcode..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#08111F] border border-white/[0.1] focus:border-[#C8860A] rounded-lg py-3 px-4 text-white text-sm outline-none transition-all"
                  required
                />
                {loginError && (
                  <p className="text-[#EF4444] text-xs font-semibold mt-2">{loginError}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#C8860A] hover:bg-[#a66d06] text-white py-3 rounded-lg font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                Sign In
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Passcodes: naheed2026 / admin123</span>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // MAIN DASHBOARD PANEL
  return (
    <main className="min-h-screen bg-[#F5F8FA] text-gray-800 selection:bg-[#C8860A] selection:text-white">
      <Navbar />

      <section className="bg-[#08111F] text-white pt-32 pb-16 relative overflow-hidden">
        {/* Banner Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#C8860A]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8860A]/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#C8860A] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Administrator Control Panel
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white">Dynamic Console</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 px-4 py-2 rounded-lg text-xs font-bold transition-all"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            Lock Console
          </button>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Sub Navigation Tabs */}
          <div className="flex flex-wrap border-b border-gray-200 mb-8 gap-4 sm:gap-6">
            <button
              onClick={() => { setActiveTab("projects"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "projects"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              Projects
            </button>
            <button
              onClick={() => { setActiveTab("services"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "services"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              Services
            </button>
            <button
              onClick={() => { setActiveTab("blog"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "blog"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <FileText className="w-4 h-4" />
              Articles
            </button>
            <button
              onClick={() => { setActiveTab("faqs"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "faqs"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              FAQs
            </button>
            <button
              onClick={() => { setActiveTab("inquiries"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all relative ${
                activeTab === "inquiries"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Inquiries
              {inquiries.filter(i => i.status === "New").length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                  {inquiries.filter(i => i.status === "New").length}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveTab("rates"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "rates"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <Calculator className="w-4 h-4" />
              Calculator Rates
            </button>
            <button
              onClick={() => { setActiveTab("settings"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "settings"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <Settings className="w-4 h-4" />
              Company Settings
            </button>
            <button
              onClick={() => { setActiveTab("team"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); setIsEditingTeam(false); setIsEditingTestimonial(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "team"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <Users className="w-4 h-4" />
              Team Members
            </button>
            <button
              onClick={() => { setActiveTab("testimonials"); setIsEditingProject(false); setIsEditingBlog(false); setIsEditingFAQ(false); setIsEditingService(false); setIsEditingTeam(false); setIsEditingTestimonial(false); }}
              className={`flex items-center gap-2 pb-4 font-bold text-xs sm:text-sm tracking-wider uppercase border-b-2 transition-all ${
                activeTab === "testimonials"
                  ? "border-[#C8860A] text-[#1B3A5C]"
                  : "border-transparent text-gray-500 hover:text-[#1B3A5C]"
              }`}
            >
              <Star className="w-4 h-4" />
              Testimonials
            </button>
          </div>

          {/* Tab 1: Manage Projects */}
          {activeTab === "projects" && (
            <div>
              {!isEditingProject ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Portfolio Database ({projects.length})</h2>
                    <button
                      onClick={startNewProject}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Project
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6">Project Title</th>
                            <th className="py-4 px-6">Location</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Budget</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {projects.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-8 bg-gray-100 rounded-md overflow-hidden bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${p.image}')` }} />
                                  <div>
                                    <span className="font-bold text-[#1B3A5C] text-sm block">{p.title}</span>
                                    <span className="text-[10px] text-gray-400 font-mono">ID: {p.id}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-medium">{p.location}</td>
                              <td className="py-4 px-6">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-[#1B3A5C] px-2.5 py-1 rounded-full">
                                  {p.category}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-sm text-[#C8860A] font-bold">{p.budget}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                <button
                                  onClick={() => startEditProject(p)}
                                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex inline-flex items-center justify-center transition-colors animate-all"
                                  title="Edit Project"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProject(p.id)}
                                  className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex inline-flex items-center justify-center transition-colors animate-all"
                                  title="Delete Project"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Project Editor Form */
                <form onSubmit={handleSaveProject} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-md space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">
                      {projectForm.title ? `Edit: ${projectForm.title}` : "Create New Project"}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Unique ID (e.g. defense-heights)</label>
                      <input
                        type="text"
                        value={projectForm.id}
                        onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Title</label>
                      <input
                        type="text"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      >
                        <option>Full Construction</option>
                        <option>Interior Design</option>
                        <option>Renovation</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Location (e.g. DHA Phase 6, Lahore)</label>
                      <input
                        type="text"
                        value={projectForm.location}
                        onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Year Completed</label>
                      <input
                        type="text"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Duration (e.g. 18 Months)</label>
                      <input
                        type="text"
                        value={projectForm.duration}
                        onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Total Area (e.g. 5,500 sqft)</label>
                      <input
                        type="text"
                        value={projectForm.area}
                        onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Budget Range (e.g. PKR 3.5 – 4.5 Crore)</label>
                      <input
                        type="text"
                        value={projectForm.budget}
                        onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MediaUploader
                          label="Project Main Image"
                          value={projectForm.image || ""}
                          onChange={(url) => setProjectForm({ ...projectForm, image: url })}
                          accept="image"
                        />
                        <MediaUploader
                          label="Project Video (Optional)"
                          value={projectForm.video || ""}
                          onChange={(url) => setProjectForm({ ...projectForm, video: url })}
                          accept="video"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Status</label>
                      <input
                        type="text"
                        value={projectForm.status}
                        onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Project Brief Description</label>
                    <textarea
                      rows={4}
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                    />
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Project Gallery Images</label>
                    {projectForm.gallery && projectForm.gallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
                        {projectForm.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-200 group shadow-sm">
                            <img src={img} alt="Gallery item" className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedGallery = projectForm.gallery?.filter((_, i) => i !== idx) || [];
                                setProjectForm({ ...projectForm, gallery: updatedGallery });
                              }}
                              className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-red-400 hover:text-red-500 font-bold text-xs gap-1.5 cursor-pointer backdrop-blur-[1px]"
                            >
                              <Trash2 className="w-4 h-4" /> Remove Image
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <MediaUploader
                      label="Add Image to Gallery"
                      value=""
                      onChange={(url) => {
                        const currentGallery = projectForm.gallery || [];
                        setProjectForm({ ...projectForm, gallery: [...currentGallery, url] });
                      }}
                      accept="image"
                      helperText="Upload images to expand the project gallery portfolio"
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(true)}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save & Close
                    </button>
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(false)}
                      className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Save & Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingProject(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 2: Manage Blog Posts */}
          {activeTab === "blog" && (
            <div>
              {!isEditingBlog ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Blog Database ({blogs.length})</h2>
                    <button
                      onClick={startNewBlog}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Write New Article
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6">Article Title</th>
                            <th className="py-4 px-6">Date</th>
                            <th className="py-4 px-6">Category</th>
                            <th className="py-4 px-6">Author</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {blogs.map((b) => (
                            <tr key={b.slug} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-8 bg-gray-100 rounded-md overflow-hidden bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${b.image}')` }} />
                                  <div>
                                    <span className="font-bold text-[#1B3A5C] text-sm block">{b.title}</span>
                                    <span className="text-[10px] text-gray-400 font-mono">Slug: {b.slug}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-medium">{b.date}</td>
                              <td className="py-4 px-6">
                                <span className="inline-block text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-[#1B3A5C] px-2.5 py-1 rounded-full">
                                  {b.category}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600 font-bold">{b.author}</td>
                              <td className="py-4 px-6 text-right space-x-2">
                                <button
                                  onClick={() => startEditBlog(b)}
                                  className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex inline-flex items-center justify-center transition-colors"
                                  title="Edit Article"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(b.slug)}
                                  className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex inline-flex items-center justify-center transition-colors"
                                  title="Delete Article"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                /* Blog Editor Form */
                <form onSubmit={handleSaveBlog} className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-md space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">
                      {blogForm.title ? `Edit Article: ${blogForm.title}` : "Write New Article"}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditingBlog(false)}
                      className="text-xs font-bold text-gray-400 hover:text-gray-600 uppercase"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Article Title</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Slug (Unique URL identifier, e.g. luxury-concrete-trends)</label>
                      <input
                        type="text"
                        value={blogForm.slug}
                        placeholder="Leave blank to generate automatically"
                        onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category (e.g. Engineering, Interior Design, Renovation)</label>
                      <input
                        type="text"
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Author</label>
                      <input
                        type="text"
                        value={blogForm.author}
                        onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <MediaUploader
                        label="Main Cover Image"
                        value={blogForm.image || ""}
                        onChange={(url) => setBlogForm({ ...blogForm, image: url })}
                        accept="image"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Excerpt (Short card summary)</label>
                    <textarea
                      rows={2}
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Article Paragraphs (double break to separate paragraphs)</label>
                    <textarea
                      rows={8}
                      value={blogForm.content?.join("\n\n")}
                      onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value.split("\n\n").filter(Boolean) })}
                      placeholder="Start writing the blog post content here..."
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                      required
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(true)}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Publish & Close
                    </button>
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(false)}
                      className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Save & Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingBlog(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 3: Manage Services */}
          {activeTab === "services" && (
            <div>
              {!isEditingService ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Services Directory ({services.length})</h2>
                    <button
                      onClick={startNewService}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Service
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6">Service Title</th>
                            <th className="py-4 px-6">Icon</th>
                            <th className="py-4 px-6">Tagline</th>
                            <th className="py-4 px-6">Features Count</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {services.map((srv) => (
                            <tr key={srv.slug} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 px-6 font-semibold text-[#1B3A5C]">{srv.title}</td>
                              <td className="py-4 px-6">
                                <span className="inline-block bg-[#C8860A]/10 text-[#C8860A] px-2.5 py-1 rounded text-xs font-mono">
                                  {srv.iconName}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-500">{srv.tagline}</td>
                              <td className="py-4 px-6 text-sm text-gray-500">{srv.features?.length || 0} features</td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleEditService(srv)}
                                    className="p-1.5 hover:bg-gray-100 rounded text-blue-600 transition-all"
                                    title="Edit Service"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteService(srv.slug)}
                                    className="p-1.5 hover:bg-gray-100 rounded text-red-600 transition-all"
                                    title="Delete Service"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleServiceSubmit} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#1B3A5C]">
                      {serviceForm.slug ? "Edit Service" : "Create New Service"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingService(false)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                    >
                      Back to Directory
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Service Title</label>
                      <input
                        type="text"
                        value={serviceForm.title || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Slug (Unique URL key, e.g. interior-design)</label>
                      <input
                        type="text"
                        value={serviceForm.slug || ""}
                        placeholder="Generate automatically from title if empty"
                        onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        disabled={!!serviceForm.slug}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Tagline (Under title)</label>
                      <input
                        type="text"
                        value={serviceForm.tagline || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Lucide Icon Name (e.g. Paintbrush, Hammer, Building2, Wrench, Briefcase, MessagesSquare)</label>
                      <input
                        type="text"
                        value={serviceForm.iconName || "Building2"}
                        onChange={(e) => setServiceForm({ ...serviceForm, iconName: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
                      <textarea
                        rows={3}
                        value={serviceForm.desc || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <MediaUploader
                        label="Service Cover Image"
                        value={serviceForm.image || ""}
                        onChange={(url) => setServiceForm({ ...serviceForm, image: url })}
                        accept="image"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Features / Inclusions (one per line)</label>
                      <textarea
                        rows={5}
                        value={serviceForm.features?.join("\n") || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value.split("\n").filter(Boolean) })}
                        placeholder="E.g. Full space planning & layout design&#10;3D visualization & walkthroughs"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Suitable For (one per line)</label>
                      <textarea
                        rows={5}
                        value={serviceForm.suitable?.join("\n") || ""}
                        onChange={(e) => setServiceForm({ ...serviceForm, suitable: e.target.value.split("\n").filter(Boolean) })}
                        placeholder="E.g. Luxury Residences&#10;Corporate Offices"
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(true)}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save & Close
                    </button>
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(false)}
                      className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Save & Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingService(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 4: Manage FAQs */}
          {activeTab === "faqs" && (
            <div>
              {!isEditingFAQ ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Frequently Asked Questions ({faqs.length})</h2>
                    <button
                      onClick={startNewFAQ}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New FAQ
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6 w-1/3">Question</th>
                            <th className="py-4 px-6 w-1/2">Answer</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {faqs.map((faq) => (
                            <tr key={faq.id} className="hover:bg-gray-50/50 transition-colors">
                              <td className="py-4 px-6 font-semibold text-[#1B3A5C] text-sm">{faq.question}</td>
                              <td className="py-4 px-6 text-sm text-gray-500 max-w-md truncate">{faq.answer}</td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => handleEditFAQ(faq)}
                                    className="p-1.5 hover:bg-gray-100 rounded text-blue-600 transition-all"
                                    title="Edit FAQ"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFAQ(faq.id)}
                                    className="p-1.5 hover:bg-gray-100 rounded text-red-600 transition-all"
                                    title="Delete FAQ"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFAQSubmit} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#1B3A5C]">
                      {faqForm.id ? "Edit FAQ" : "Add New FAQ"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsEditingFAQ(false)}
                      className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
                    >
                      Back to FAQ List
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Question</label>
                      <input
                        type="text"
                        value={faqForm.question || ""}
                        onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Answer</label>
                      <textarea
                        rows={5}
                        value={faqForm.answer || ""}
                        onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-3 px-4 outline-none text-sm resize-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(true)}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Save & Close
                    </button>
                    <button
                      type="submit"
                      onClick={() => setShouldCloseAfterSave(false)}
                      className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Save & Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingFAQ(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Tab 5: Inquiries Inbox */}
          {activeTab === "inquiries" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1B3A5C]">Client Inquiries & Quote Requests ({inquiries.length})</h2>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                {inquiries.length === 0 ? (
                  <div className="p-12 text-center">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-sm">No inquiries or quote requests received yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">Sender Details</th>
                          <th className="py-4 px-6">Submission Type</th>
                          <th className="py-4 px-6">Brief Details</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className={`hover:bg-gray-50/50 transition-colors ${inq.status === "New" ? "bg-amber-50/10 font-medium" : ""}`}>
                            <td className="py-4 px-6">
                              <div className="text-sm font-bold text-[#1B3A5C]">{inq.name}</div>
                              <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail className="w-3 h-3" /> {inq.email}</div>
                              {inq.phone && <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Phone className="w-3 h-3" /> {inq.phone}</div>}
                            </td>
                            <td className="py-4 px-6">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                inq.type === "quote" 
                                  ? "bg-amber-100 text-amber-800 border border-amber-200" 
                                  : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}>
                                {inq.type === "quote" ? "Quote Request" : "Contact Message"}
                              </span>
                              <div className="text-[10px] text-gray-400 mt-1">{new Date(inq.date).toLocaleString()}</div>
                            </td>
                            <td className="py-4 px-6 max-w-sm">
                              {inq.type === "quote" ? (
                                <div className="text-xs space-y-0.5">
                                  <div><span className="font-semibold text-gray-600">Type:</span> {inq.projectType}</div>
                                  <div><span className="font-semibold text-gray-600">Area:</span> {inq.area}</div>
                                  <div><span className="font-semibold text-gray-600">Budget:</span> {inq.budget}</div>
                                </div>
                              ) : (
                                <div className="text-xs text-gray-600 truncate max-w-[240px]">
                                  <span className="font-semibold text-gray-700">Subject:</span> {inq.subject}
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <select
                                value={inq.status}
                                onChange={(e) => handleInquiryStatusChange(inq.id, e.target.value as any)}
                                className={`text-xs font-bold rounded-full py-1 px-3 border outline-none ${
                                  inq.status === "New" 
                                    ? "bg-red-50 text-red-700 border-red-200" 
                                    : inq.status === "Replied"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-gray-100 text-gray-600 border-gray-200"
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="Replied">Replied</option>
                                <option value="Archived">Archived</option>
                              </select>
                            </td>
                            <td className="py-4 px-6 text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    alert(`Full Message Details:\n\nSender: ${inq.name}\nEmail: ${inq.email}\nPhone: ${inq.phone || "N/A"}\nDate: ${new Date(inq.date).toLocaleString()}\n\nMessage:\n"${inq.message}"`);
                                  }}
                                  className="p-1.5 hover:bg-gray-100 rounded text-[#C8860A] transition-all"
                                  title="View Message Content"
                                >
                                  <Info className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="p-1.5 hover:bg-gray-100 rounded text-red-600 transition-all"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 6: Manage Pricing Calculator Rates */}
          {activeTab === "rates" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1B3A5C]">Pricing & Multiplier Configurations</h2>
              </div>

              <form onSubmit={handleRatesSubmit} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Base Rates Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                      Base Construction Rates (PKR per Sq. Ft.)
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Luxury Residential Base Rate</label>
                        <input
                          type="number"
                          value={ratesForm.residentialRate}
                          onChange={(e) => setRatesForm({ ...ratesForm, residentialRate: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Commercial Office Base Rate</label>
                        <input
                          type="number"
                          value={ratesForm.commercialRate}
                          onChange={(e) => setRatesForm({ ...ratesForm, commercialRate: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Interior Fitting Base Rate</label>
                        <input
                          type="number"
                          value={ratesForm.interiorRate}
                          onChange={(e) => setRatesForm({ ...ratesForm, interiorRate: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Structural Renovation Base Rate</label>
                        <input
                          type="number"
                          value={ratesForm.renovationRate}
                          onChange={(e) => setRatesForm({ ...ratesForm, renovationRate: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multipliers Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                      Build Quality Multipliers
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Premium Standard Multiplier (e.g. 1.0)</label>
                        <input
                          type="number"
                          step="0.05"
                          value={ratesForm.standardMultiplier}
                          onChange={(e) => setRatesForm({ ...ratesForm, standardMultiplier: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Executive Elite Multiplier (e.g. 1.3)</label>
                        <input
                          type="number"
                          step="0.05"
                          value={ratesForm.premiumMultiplier}
                          onChange={(e) => setRatesForm({ ...ratesForm, premiumMultiplier: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Ultra-Luxury Monogram Multiplier (e.g. 1.65)</label>
                        <input
                          type="number"
                          step="0.05"
                          value={ratesForm.luxuryMultiplier}
                          onChange={(e) => setRatesForm({ ...ratesForm, luxuryMultiplier: parseFloat(e.target.value) || 0 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Pricing Configurations
                  </button>
                </div>
              </form>
            </div>
          )}
          {/* Tab 7: Manage Company Settings & Statistics */}
          {activeTab === "settings" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1B3A5C]">Company Contact Details & Statistics</h2>
              </div>

              <form onSubmit={handleSettingsSubmit} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* Contact Details Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                      Public Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Office Address</label>
                        <input
                          type="text"
                          value={settingsForm.address}
                          onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Phone Number</label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Business Hours</label>
                        <input
                          type="text"
                          value={settingsForm.hours}
                          onChange={(e) => setSettingsForm({ ...settingsForm, hours: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Statistics Section */}
                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                      Homepage Counter Statistics
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Years of Experience (e.g. 25+)</label>
                        <input
                          type="text"
                          value={settingsForm.yearsExperience}
                          onChange={(e) => setSettingsForm({ ...settingsForm, yearsExperience: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Projects Completed (e.g. 400+)</label>
                        <input
                          type="text"
                          value={settingsForm.projectsCompleted}
                          onChange={(e) => setSettingsForm({ ...settingsForm, projectsCompleted: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Client Satisfaction Rate (e.g. 100%)</label>
                        <input
                          type="text"
                          value={settingsForm.clientSatisfaction}
                          onChange={(e) => setSettingsForm({ ...settingsForm, clientSatisfaction: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">On-Time Delivery Rate (e.g. 98%)</label>
                        <input
                          type="text"
                          value={settingsForm.completedOnTime}
                          onChange={(e) => setSettingsForm({ ...settingsForm, completedOnTime: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* About Us Settings Section */}
                <div className="md:col-span-2 border-t border-gray-100 pt-8 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                    About Us Content & Legacy Story
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Story Title</label>
                      <input
                        type="text"
                        value={settingsForm.aboutStoryTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutStoryTitle: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <MediaUploader
                        label="Story Image"
                        value={settingsForm.aboutStoryImage}
                        onChange={(url) => setSettingsForm({ ...settingsForm, aboutStoryImage: url })}
                        accept="image"
                        helperText="Recommend high resolution landscape image."
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Story Paragraph 1</label>
                      <textarea
                        value={settingsForm.aboutStoryP1}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutStoryP1: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-24 resize-y"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Story Paragraph 2</label>
                      <textarea
                        value={settingsForm.aboutStoryP2}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutStoryP2: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-24 resize-y"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Our Vision Text</label>
                      <textarea
                        value={settingsForm.aboutVision}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutVision: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-20 resize-y"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Our Mission Text</label>
                      <textarea
                        value={settingsForm.aboutMission}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutMission: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-20 resize-y"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Our Direction Text</label>
                      <textarea
                        value={settingsForm.aboutDirection}
                        onChange={(e) => setSettingsForm({ ...settingsForm, aboutDirection: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-20 resize-y"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Before/After Image Slider Section */}
                <div className="md:col-span-2 border-t border-gray-100 pt-8 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                    Before/After Interactive Image Slider
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Slider Section Title</label>
                      <input
                        type="text"
                        value={settingsForm.beforeAfterTitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, beforeAfterTitle: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Slider Section Subtitle</label>
                      <input
                        type="text"
                        value={settingsForm.beforeAfterSubtitle}
                        onChange={(e) => setSettingsForm({ ...settingsForm, beforeAfterSubtitle: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <MediaUploader
                        label="Before Image (Raw Phase)"
                        value={settingsForm.beforeAfterBeforeImage}
                        onChange={(url) => setSettingsForm({ ...settingsForm, beforeAfterBeforeImage: url })}
                        accept="image"
                        helperText="Recommend matching aspect ratio with the After image."
                      />
                    </div>
                    <div>
                      <MediaUploader
                        label="After Image (Final Handover)"
                        value={settingsForm.beforeAfterAfterImage}
                        onChange={(url) => setSettingsForm({ ...settingsForm, beforeAfterAfterImage: url })}
                        accept="image"
                        helperText="Recommend matching aspect ratio with the Before image."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Before Stage Label</label>
                      <input
                        type="text"
                        value={settingsForm.beforeAfterBeforeLabel}
                        onChange={(e) => setSettingsForm({ ...settingsForm, beforeAfterBeforeLabel: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">After Stage Label</label>
                      <input
                        type="text"
                        value={settingsForm.beforeAfterAfterLabel}
                        onChange={(e) => setSettingsForm({ ...settingsForm, beforeAfterAfterLabel: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Routing Configuration */}
                <div className="md:col-span-2 border-t border-gray-100 pt-8 space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#C8860A] border-b border-gray-100 pb-2">
                    WhatsApp Global Communication Routing
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">WhatsApp Contact Number</label>
                      <input
                        type="text"
                        placeholder="e.g. +923001234567"
                        value={settingsForm.whatsappNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                        required
      />
                      <span className="text-[10px] text-gray-400 mt-1 block">Specify the phone number with country code, without spaces or special symbols.</span>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 mb-2">Global Default WhatsApp Message</label>
                      <textarea
                        value={settingsForm.whatsappMessage}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappMessage: e.target.value })}
                        className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-20 resize-y"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Settings & Counters
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 8: Manage Team Members */}
          {activeTab === "team" && (
            <div>
              {!isEditingTeam ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Team Members Database ({team.length})</h2>
                    <button
                      onClick={startNewTeamMember}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Member
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs font-bold uppercase tracking-wider">
                            <th className="py-4 px-6 w-20">Photo</th>
                            <th className="py-4 px-6">Name</th>
                            <th className="py-4 px-6">Role</th>
                            <th className="py-4 px-6">Sort Order</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                          {team.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="py-8 text-center text-gray-400">
                                No team members found in database. Click Add New Member above.
                              </td>
                            </tr>
                          ) : (
                            team.map((member) => (
                              <tr key={member.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="w-10 h-12 rounded overflow-hidden bg-gray-100 border border-gray-200">
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                  </div>
                                </td>
                                <td className="py-4 px-6 font-semibold text-[#1B3A5C]">
                                  {member.name}
                                </td>
                                <td className="py-4 px-6 text-gray-600">
                                  {member.role}
                                </td>
                                <td className="py-4 px-6 text-gray-500">
                                  {member.sortOrder}
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex justify-end gap-2">
                                    <button
                                      type="button"
                                      onClick={() => startEditTeamMember(member)}
                                      className="p-1.5 hover:bg-gray-100 rounded text-[#1B3A5C] transition-all"
                                      title="Edit Member"
                                    >
                                      <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteTeamMember(member.id)}
                                      className="p-1.5 hover:bg-gray-100 rounded text-red-600 transition-all"
                                      title="Delete Member"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">
                      {teamForm.id ? "Edit Team Member Details" : "Add New Team Member"}
                    </h2>
                  </div>

                  <form onSubmit={handleSaveTeamMember} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Member Name</label>
                        <input
                          type="text"
                          value={teamForm.name || ""}
                          onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Designation / Role</label>
                        <input
                          type="text"
                          value={teamForm.role || ""}
                          onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Sort Display Order</label>
                        <input
                          type="number"
                          value={teamForm.sortOrder ?? 1}
                          onChange={(e) => setTeamForm({ ...teamForm, sortOrder: parseInt(e.target.value) || 1 })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          required
                        />
                      </div>
                      <div>
                        <MediaUploader
                          label="Profile Photo Image"
                          value={teamForm.image || ""}
                          onChange={(url) => setTeamForm({ ...teamForm, image: url })}
                          accept="image"
                          helperText="Use clear square portrait photo."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Short Bio / Background</label>
                        <textarea
                          value={teamForm.bio || ""}
                          onChange={(e) => setTeamForm({ ...teamForm, bio: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all h-24 resize-y"
                          required
                        />
                      </div>
                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2">LinkedIn Profile URL (Optional)</label>
                          <input
                            type="url"
                            value={teamForm.linkedin || ""}
                            onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })}
                            placeholder="https://linkedin.com/in/username"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2">Public Email Address (Optional)</label>
                          <input
                            type="email"
                            value={teamForm.email || ""}
                            onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })}
                            placeholder="name@company.com"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 mb-2">Direct Phone / Mobile (Optional)</label>
                          <input
                            type="text"
                            value={teamForm.phone || ""}
                            onChange={(e) => setTeamForm({ ...teamForm, phone: e.target.value })}
                            placeholder="+923001234567"
                            className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                      <button
                        type="submit"
                        onClick={() => setShouldCloseAfterSave(true)}
                        className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Save & Close
                      </button>
                      <button
                        type="submit"
                        onClick={() => setShouldCloseAfterSave(false)}
                        className="bg-[#1B3A5C] hover:bg-[#152e4a] text-white px-6 py-3 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                      >
                        <Sparkles className="w-4 h-4" />
                        Save & Continue
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingTeam(false)}
                        className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* Tab 8: Testimonials */}
          {activeTab === "testimonials" && (
            <div>
              {!isEditingTestimonial ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">Client Testimonials ({testimonials.length})</h2>
                    <button
                      onClick={startNewTestimonial}
                      className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Testimonial
                    </button>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3A5C] text-white text-xs uppercase tracking-wider">
                            <th className="py-4 px-6 font-semibold w-24">Image</th>
                            <th className="py-4 px-6 font-semibold">Client Name</th>
                            <th className="py-4 px-6 font-semibold">Role / Company</th>
                            <th className="py-4 px-6 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {testimonials.length === 0 ? (
                            <tr>
                              <td colSpan={4} className="py-8 text-center text-gray-400">
                                No testimonials found. Click Add Testimonial above.
                              </td>
                            </tr>
                          ) : (
                            testimonials.map((t) => (
                              <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="py-4 px-6">
                                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center">
                                    {t.image ? (
                                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                    ) : (
                                      <User className="w-5 h-5 text-gray-400" />
                                    )}
                                  </div>
                                </td>
                                <td className="py-4 px-6 font-semibold text-[#1B3A5C]">{t.name}</td>
                                <td className="py-4 px-6 text-gray-600">
                                  {t.role} <br/> <span className="text-xs text-[#C8860A] uppercase">{t.company}</span>
                                </td>
                                <td className="py-4 px-6 text-right">
                                  <div className="flex justify-end gap-2">
                                    <button onClick={() => startEditTestimonial(t)} className="p-1.5 hover:bg-gray-100 rounded text-[#1B3A5C] transition-all"><Edit className="w-4 h-4" /></button>
                                    <button onClick={() => handleDeleteTestimonial(t.id)} className="p-1.5 hover:bg-gray-100 rounded text-red-600 transition-all"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1B3A5C]">{testimonialForm.id ? "Edit Testimonial" : "Add Testimonial"}</h2>
                  </div>
                  <form onSubmit={handleSaveTestimonial} className="bg-white rounded-2xl border border-gray-200/80 shadow-md p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Client Name</label>
                        <input type="text" value={testimonialForm.name || ""} onChange={e => setTestimonialForm({ ...testimonialForm, name: e.target.value })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Role / Title</label>
                        <input type="text" value={testimonialForm.role || ""} onChange={e => setTestimonialForm({ ...testimonialForm, role: e.target.value })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Company / Client Type</label>
                        <input type="text" value={testimonialForm.company || ""} onChange={e => setTestimonialForm({ ...testimonialForm, company: e.target.value })} placeholder="e.g. Corporate Client" className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Project Name (Optional)</label>
                        <input type="text" value={testimonialForm.project || ""} onChange={e => setTestimonialForm({ ...testimonialForm, project: e.target.value })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Rating (1-5)</label>
                        <input type="number" min="1" max="5" value={testimonialForm.rating || 5} onChange={e => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) || 5 })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" required />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Display Sort Order</label>
                        <input type="number" value={testimonialForm.sortOrder ?? 1} onChange={e => setTestimonialForm({ ...testimonialForm, sortOrder: parseInt(e.target.value) || 1 })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm" required />
                      </div>
                      <div className="md:col-span-2">
                        <MediaUploader label="Client Photo (Leave empty for default avatar)" value={testimonialForm.image || ""} onChange={url => setTestimonialForm({ ...testimonialForm, image: url })} accept="image" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-gray-500 mb-2">Testimonial Quote</label>
                        <textarea value={testimonialForm.text || ""} onChange={e => setTestimonialForm({ ...testimonialForm, text: e.target.value })} className="w-full bg-gray-50 border border-gray-200 focus:border-[#C8860A] rounded-lg py-2.5 px-4 outline-none text-sm h-32 resize-y" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-100">
                      <button type="submit" onClick={() => setShouldCloseAfterSave(true)} className="bg-[#C8860A] hover:bg-[#a66d06] text-white px-6 py-3 rounded-lg text-xs font-bold shadow-md flex items-center gap-2"><Check className="w-4 h-4" /> Save & Close</button>
                      <button type="button" onClick={() => setIsEditingTestimonial(false)} className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-3 rounded-lg text-xs font-bold">Cancel</button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-md w-full sm:w-auto">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl shadow-xl border backdrop-blur-sm transition-all duration-300 transform translate-y-0 ${
              toast.type === "success"
                ? "bg-[#1B3A5C]/95 text-white border-[#C8860A]/40 shadow-[#C8860A]/10"
                : toast.type === "error"
                ? "bg-red-950/95 text-red-200 border-red-800 shadow-red-950/20"
                : "bg-gray-900/95 text-gray-100 border-gray-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === "success" && (
                <div className="w-5 h-5 rounded-full bg-[#C8860A] flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  ✓
                </div>
              )}
              {toast.type === "error" && (
                <div className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  ✕
                </div>
              )}
              <span className="text-xs font-bold tracking-wide">{toast.message}</span>
            </div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-white/40 hover:text-white text-xs font-bold transition-colors ml-4 focus:outline-none shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </main>
  );
}
