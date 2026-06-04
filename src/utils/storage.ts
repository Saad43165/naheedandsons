import { PROJECTS_DATA } from "@/data/projects";
import { INITIAL_BLOG_POSTS, BlogPost } from "@/data/blog";
import { supabase } from "./supabase";

export type { BlogPost };

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  duration: string;
  area: string;
  budget: string;
  status: string;
  description: string;
  image: string;
  gallery: string[];
  tags: string[];
  team: { name: string; role: string }[];
  video?: string;
}

export interface Inquiry {
  id: string;
  type: "quote" | "contact";
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  projectType?: string;
  area?: string;
  budget?: string;
  timeline?: string;
  date: string;
  status: "New" | "Replied" | "Archived";
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  image: string;
  iconName: string;
  features: string[];
  suitable: string[];
}

export interface RateSettings {
  residentialRate: number;
  commercialRate: number;
  interiorRate: number;
  renovationRate: number;
  standardMultiplier: number;
  premiumMultiplier: number;
  luxuryMultiplier: number;
}

export interface CompanySettings {
  address: string;
  phone: string;
  email: string;
  hours: string;
  yearsExperience: string;
  projectsCompleted: string;
  clientSatisfaction: string;
  completedOnTime: string;
  aboutStoryTitle: string;
  aboutStoryP1: string;
  aboutStoryP2: string;
  aboutStoryImage: string;
  aboutMission: string;
  aboutVision: string;
  aboutDirection: string;
  beforeAfterTitle: string;
  beforeAfterSubtitle: string;
  beforeAfterBeforeImage: string;
  beforeAfterAfterImage: string;
  beforeAfterBeforeLabel: string;
  beforeAfterAfterLabel: string;
  whatsappNumber: string;
  whatsappMessage: string;
  facebookLink?: string;
  tiktokLink?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  sortOrder: number;
  linkedin?: string;
  email?: string;
  phone?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  image?: string;
  project: string;
  sortOrder: number;
}

const PROJECTS_KEY = "naheedandsons_projects_v1";
const BLOG_KEY = "naheedandsons_blog_v1";
const INQUIRIES_KEY = "naheedandsons_inquiries_v1";
const FAQS_KEY = "naheedandsons_faqs_v1";
const SERVICES_KEY = "naheedandsons_services_v1";
const RATES_KEY = "naheedandsons_rates_v1";
const SETTINGS_KEY = "naheedandsons_settings_v1";
const TEAM_KEY = "naheedandsons_team_v1";
const TESTIMONIALS_KEY = "naheedandsons_testimonials_v1";

// Trigger a window custom event to notify components when background sync completes

// Global fetch throttle to prevent infinite loops and massive network spikes
const lastFetchTime: Record<string, number> = {};
function shouldFetch(key: string) {
  const now = Date.now();
  if (!lastFetchTime[key] || now - lastFetchTime[key] > 60000) {
    lastFetchTime[key] = now;
    return true;
  }
  return false;
}

function notifySync(key: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("naheed_storage_synced", { detail: { key } }));
  }
}

// ----------------------------------------------------
// 1. PROJECTS
// ----------------------------------------------------
export function getProjects(): Project[] {
  if (typeof window === "undefined") {
    return PROJECTS_DATA as Project[];
  }
  
  // Background fetch & sync
  if (shouldFetch(PROJECTS_KEY)) {
    supabase
      .from("projects")
      .select("*")
      .then(({ data, error }: { data: any; error: any }) => {
        if (!error && data) {
          const currentString = localStorage.getItem(PROJECTS_KEY);
          const newString = JSON.stringify(data);
          if (currentString !== newString) {
            localStorage.setItem(PROJECTS_KEY, newString);
            notifySync(PROJECTS_KEY);
          }
        }
      });
  }

  const stored = localStorage.getItem(PROJECTS_KEY);
  if (!stored) {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(PROJECTS_DATA));
    return PROJECTS_DATA as Project[];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return PROJECTS_DATA as Project[];
  }
}

export function saveProject(project: Project): Project[] {
  if (typeof window === "undefined") return PROJECTS_DATA as Project[];
  const current = getProjects();
  const index = current.findIndex((p) => p.id === project.id);
  if (index >= 0) {
    current[index] = project;
  } else {
    current.unshift(project);
  }
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("projects")
    .upsert({
      id: project.id,
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      duration: project.duration,
      area: project.area,
      budget: project.budget,
      status: project.status,
      description: project.description,
      image: project.image,
      gallery: project.gallery,
      tags: project.tags,
      team: project.team,
      video: project.video
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving project to Supabase:", error);
    });

  return current;
}

export function deleteProject(id: string): Project[] {
  if (typeof window === "undefined") return PROJECTS_DATA as Project[];
  const current = getProjects();
  const filtered = current.filter((p) => p.id !== id);
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting project from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 2. BLOG POSTS
// ----------------------------------------------------
export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") {
    return INITIAL_BLOG_POSTS;
  }

  // Background fetch & sync
  if (shouldFetch(BLOG_KEY)) {
    supabase
      .from("blogs")
      .select("*")
      .then(({ data, error }: { data: any; error: any }) => {
        if (!error && data) {
          const currentString = localStorage.getItem(BLOG_KEY);
          const newString = JSON.stringify(data);
          if (currentString !== newString) {
            localStorage.setItem(BLOG_KEY, newString);
            notifySync(BLOG_KEY);
          }
        }
      });
  }

  const stored = localStorage.getItem(BLOG_KEY);
  if (!stored) {
    localStorage.setItem(BLOG_KEY, JSON.stringify(INITIAL_BLOG_POSTS));
    return INITIAL_BLOG_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_BLOG_POSTS;
  }
}

export function saveBlogPost(post: BlogPost): BlogPost[] {
  if (typeof window === "undefined") return INITIAL_BLOG_POSTS;
  const current = getBlogPosts();
  const index = current.findIndex((p) => p.slug === post.slug);
  if (index >= 0) {
    current[index] = post;
  } else {
    current.unshift(post);
  }
  localStorage.setItem(BLOG_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("blogs")
    .upsert({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: post.date,
      author: post.author,
      image: post.image,
      content: post.content
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving blog post to Supabase:", error);
    });

  return current;
}

export function deleteBlogPost(slug: string): BlogPost[] {
  if (typeof window === "undefined") return INITIAL_BLOG_POSTS;
  const current = getBlogPosts();
  const filtered = current.filter((p) => p.slug !== slug);
  localStorage.setItem(BLOG_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("blogs")
    .delete()
    .eq("slug", slug)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting blog post from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 3. INQUIRIES
// ----------------------------------------------------
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "inq-1",
    type: "quote",
    name: "Ahmed Shah",
    email: "ahmed.shah@outlook.com",
    phone: "+92 321 4567890",
    projectType: "Residential Construction",
    area: "1 Kanal (5,000 sqft)",
    budget: "PKR 1.5 Crore - 3.5 Crore",
    timeline: "6 - 12 Months",
    message: "We want to construct a modern double-unit house in DHA Phase 6 Lahore. We already have the architectural drafts and want Naheed & Sons to give us a detailed construction quote.",
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    status: "New"
  },
  {
    id: "inq-2",
    type: "contact",
    name: "Saba Qamar",
    email: "saba.qamar@gmail.com",
    phone: "+92 300 9876543",
    subject: "Interior Design Consultation",
    message: "Hi, I am looking to redesign my apartment living room in Bukhari Commercial. Do you offer on-site consultations? Please let me know your availability.",
    date: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "Replied"
  }
];

export function getInquiries(): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;

  // Background fetch & sync
  supabase
    .from("inquiries")
    .select("*")
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        // Map database naming pattern to our camelCase type
        const mapped = data.map((d: any) => ({
          id: d.id,
          type: d.type,
          name: d.name,
          email: d.email,
          phone: d.phone,
          subject: d.subject,
          message: d.message,
          projectType: d.project_type,
          area: d.area,
          budget: d.budget,
          timeline: d.timeline,
          date: d.date,
          status: d.status
        }));
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(mapped));
        notifySync(INQUIRIES_KEY);
      }
    });

  const stored = localStorage.getItem(INQUIRIES_KEY);
  if (!stored) {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(INITIAL_INQUIRIES));
    return INITIAL_INQUIRIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_INQUIRIES;
  }
}

export function saveInquiry(inquiry: Inquiry): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  const current = getInquiries();
  const index = current.findIndex((i) => i.id === inquiry.id);
  if (index >= 0) {
    current[index] = inquiry;
  } else {
    current.unshift(inquiry);
  }
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("inquiries")
    .upsert({
      id: inquiry.id,
      type: inquiry.type,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      subject: inquiry.subject,
      message: inquiry.message,
      project_type: inquiry.projectType,
      area: inquiry.area,
      budget: inquiry.budget,
      timeline: inquiry.timeline,
      date: inquiry.date,
      status: inquiry.status
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving inquiry to Supabase:", error);
    });

  return current;
}

export function deleteInquiry(id: string): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  const current = getInquiries();
  const filtered = current.filter((i) => i.id !== id);
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("inquiries")
    .delete()
    .eq("id", id)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting inquiry from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 4. FAQS
// ----------------------------------------------------
const INITIAL_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "What is your estimation process for project pricing?",
    answer: "Our estimation team begins with an initial consultation to understand your requirements, materials preferences, and layout. We then prepare a detailed, transparent preliminary cost analysis. Once designs are finalized, we provide an itemized construction contract with clear cost milestones."
  },
  {
    id: "faq-2",
    question: "Do you offer structural and design warranties?",
    answer: "Yes, Naheed & Sons is committed to high-grade construction standards. We offer a full 10-year structural warranty on all complete new-build projects, and a 1-year cosmetic/finishing warranty on our interior design work."
  },
  {
    id: "faq-3",
    question: "Can you assist with obtaining building permits?",
    answer: "Absolutely. We manage the complete pre-construction phase, which includes drafting architectural/engineering layouts, submitting dossiers to municipal offices, navigating zoning laws, and obtaining construction authorization permits."
  },
  {
    id: "faq-4",
    question: "How do you handle changes or delays during construction?",
    answer: "Any adjustments to design, materials, or structural elements are documented through a formal 'Change Order' process. We outline cost and timeline impacts clearly before work proceeds. For delays, our project managers provide real-time updates through our weekly status reports."
  },
  {
    id: "faq-5",
    question: "Are your projects open for inspection during construction?",
    answer: "We welcome clients to visit the site! For safety reasons, we schedule guided site walkthroughs at key project milestones (e.g. framing complete, electrical/plumbing rough-ins, pre-finishing)."
  }
];

export function getFAQs(): FAQ[] {
  if (typeof window === "undefined") return INITIAL_FAQS;

  // Background fetch & sync
  if (shouldFetch(FAQS_KEY)) {
    supabase
      .from("faqs")
      .select("*")
      .then(({ data, error }: { data: any; error: any }) => {
        if (!error && data) {
          const currentString = localStorage.getItem(FAQS_KEY);
          const newString = JSON.stringify(data);
          if (currentString !== newString) {
            localStorage.setItem(FAQS_KEY, newString);
            notifySync(FAQS_KEY);
          }
        }
      });
  }

  const stored = localStorage.getItem(FAQS_KEY);
  if (!stored) {
    localStorage.setItem(FAQS_KEY, JSON.stringify(INITIAL_FAQS));
    return INITIAL_FAQS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_FAQS;
  }
}

export function saveFAQ(faq: FAQ): FAQ[] {
  if (typeof window === "undefined") return INITIAL_FAQS;
  const current = getFAQs();
  const index = current.findIndex((f) => f.id === faq.id);
  if (index >= 0) {
    current[index] = faq;
  } else {
    current.push(faq);
  }
  localStorage.setItem(FAQS_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("faqs")
    .upsert({
      id: faq.id,
      question: faq.question,
      answer: faq.answer
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving FAQ to Supabase:", error);
    });

  return current;
}

export function deleteFAQ(id: string): FAQ[] {
  if (typeof window === "undefined") return INITIAL_FAQS;
  const current = getFAQs();
  const filtered = current.filter((f) => f.id !== id);
  localStorage.setItem(FAQS_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("faqs")
    .delete()
    .eq("id", id)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting FAQ from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 5. SERVICES
// ----------------------------------------------------
const INITIAL_SERVICES: Service[] = [
  {
    slug: "interior-design",
    title: "Interior Design",
    tagline: "Spaces that inspire",
    desc: "We create premium spatial experiences that balance aesthetics, functionality, and comfort — designing every detail from concept to completion.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    iconName: "Paintbrush",
    features: [
      "Full space planning & layout design",
      "Custom lighting and acoustic design",
      "3D visualization & walkthroughs",
      "Furniture selection & custom joinery",
      "Material & finish specification",
      "On-site project coordination",
    ],
    suitable: ["Luxury Residences", "Corporate Offices", "Retail Showrooms", "Hotels & Hospitality"],
  },
  {
    slug: "exterior-finishing",
    title: "Exterior Finishing",
    tagline: "Facades that make a statement",
    desc: "Timeless exterior treatments combining weatherproof systems, premium cladding, and architectural facade design that stands for decades.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    iconName: "Hammer",
    features: [
      "Structural glass and curtain wall systems",
      "Aluminum & composite cladding",
      "Premium masonry & stone veneer",
      "Insulated wall & facade systems",
      "Waterproofing & weatherproofing",
      "Architectural painting & coatings",
    ],
    suitable: ["Commercial Buildings", "Residential Villas", "Mixed-Use Towers", "Industrial Facilities"],
  },
  {
    slug: "full-construction",
    title: "Full Construction",
    tagline: "Turnkey from ground to rooftop",
    desc: "Complete building construction services — foundation, structure, MEP, interior works, and handover — all delivered under one roof with absolute accountability.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    iconName: "Building2",
    features: [
      "Site preparation & earthworks",
      "Foundation & structural works",
      "MEP (mechanical, electrical, plumbing)",
      "Interior finishing & fitout",
      "Landscaping & external works",
      "Handover & post-completion support",
    ],
    suitable: ["Luxury Villas", "Apartment Complexes", "Office Towers", "Industrial Buildings"],
  },
  {
    slug: "renovation",
    title: "Renovation & Remodeling",
    tagline: "Breathe new life into existing spaces",
    desc: "We retrofit, reinforce, and reimagine existing structures with modern standards, upgraded systems, and contemporary design sensibility.",
    image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1600&auto=format&fit=crop",
    iconName: "Wrench",
    features: [
      "Structural assessment & retrofitting",
      "Load-bearing wall modifications",
      "Kitchen, bath & room expansions",
      "MEP upgrades & modernization",
      "Heritage building preservation",
      "Energy-efficiency upgrades",
    ],
    suitable: ["Period & Heritage Properties", "Aging Apartments", "Commercial Fitouts", "Restaurant & Retail"],
  },
  {
    slug: "project-management",
    title: "Project Management",
    tagline: "Your project, expertly led",
    desc: "End-to-end project management ensuring every phase is executed on schedule, within budget, and to the highest quality benchmarks.",
    image: "https://images.unsplash.com/photo-154188086425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop",
    iconName: "Briefcase",
    features: [
      "Dedicated project manager",
      "Milestone planning & scheduling",
      "Budget management & cost control",
      "Contractor & vendor coordination",
      "Quality assurance inspections",
      "Weekly progress reporting",
    ],
    suitable: ["Multi-phase Projects", "Owner-Developer Builds", "Overseas Clients", "Fast-track Projects"],
  },
  {
    slug: "consultation",
    title: "Pre-Construction Consultation",
    tagline: "Start right — plan with expertise",
    desc: "Strategic pre-construction planning, feasibility analysis, budget forecasting, and regulatory guidance before you break ground.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1600&auto=format&fit=crop",
    iconName: "MessagesSquare",
    features: [
      "Site feasibility assessment",
      "Preliminary cost planning",
      "Zoning & regulatory advice",
      "Design brief development",
      "Contractor recommendations",
      "Risk & timeline analysis",
    ],
    suitable: ["First-time Builders", "Land Owners", "Developers & Investors", "Renovation Clients"],
  },
];

export function getServices(): Service[] {
  if (typeof window === "undefined") return INITIAL_SERVICES;

  // Background fetch & sync
  supabase
    .from("services")
    .select("*")
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        const mapped = data.map((d: any) => ({
          slug: d.slug,
          title: d.title,
          tagline: d.tagline,
          desc: d.desc_text, // Map back to camelCase type properties
          image: d.image,
          iconName: d.icon_name,
          features: d.features,
          suitable: d.suitable
        }));
        localStorage.setItem(SERVICES_KEY, JSON.stringify(mapped));
        notifySync(SERVICES_KEY);
      }
    });

  const stored = localStorage.getItem(SERVICES_KEY);
  if (!stored) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(INITIAL_SERVICES));
    return INITIAL_SERVICES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_SERVICES;
  }
}

export function saveService(service: Service): Service[] {
  if (typeof window === "undefined") return INITIAL_SERVICES;
  const current = getServices();
  const index = current.findIndex((s) => s.slug === service.slug);
  if (index >= 0) {
    current[index] = service;
  } else {
    current.push(service);
  }
  localStorage.setItem(SERVICES_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("services")
    .upsert({
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      desc_text: service.desc,
      image: service.image,
      icon_name: service.iconName,
      features: service.features,
      suitable: service.suitable
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving service to Supabase:", error);
    });

  return current;
}

export function deleteService(slug: string): Service[] {
  if (typeof window === "undefined") return INITIAL_SERVICES;
  const current = getServices();
  const filtered = current.filter((s) => s.slug !== slug);
  localStorage.setItem(SERVICES_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("services")
    .delete()
    .eq("slug", slug)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting service from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 6. RATES & CALCULATION CONFIGS
// ----------------------------------------------------
const DEFAULT_RATES: RateSettings = {
  residentialRate: 7500,
  commercialRate: 9500,
  interiorRate: 5000,
  renovationRate: 3800,
  standardMultiplier: 1.0,
  premiumMultiplier: 1.3,
  luxuryMultiplier: 1.65
};

export function getRateSettings(): RateSettings {
  if (typeof window === "undefined") return DEFAULT_RATES;

  // Background fetch & sync
  supabase
    .from("rates")
    .select("*")
    .eq("id", "naheedandsons_rates_v1")
    .maybeSingle()
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        const mapped: RateSettings = {
          residentialRate: data.residential_rate,
          commercialRate: data.commercial_rate,
          interiorRate: data.interior_rate,
          renovationRate: data.renovation_rate,
          standardMultiplier: Number(data.standard_multiplier),
          premiumMultiplier: Number(data.premium_multiplier),
          luxuryMultiplier: Number(data.luxury_multiplier)
        };
        localStorage.setItem(RATES_KEY, JSON.stringify(mapped));
        notifySync(RATES_KEY);
      }
    });

  const stored = localStorage.getItem(RATES_KEY);
  if (!stored) {
    localStorage.setItem(RATES_KEY, JSON.stringify(DEFAULT_RATES));
    return DEFAULT_RATES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_RATES;
  }
}

export function saveRateSettings(settings: RateSettings): RateSettings {
  if (typeof window === "undefined") return DEFAULT_RATES;
  localStorage.setItem(RATES_KEY, JSON.stringify(settings));

  // Sync to Supabase
  supabase
    .from("rates")
    .upsert({
      id: "naheedandsons_rates_v1",
      residential_rate: settings.residentialRate,
      commercial_rate: settings.commercialRate,
      interior_rate: settings.interiorRate,
      renovation_rate: settings.renovationRate,
      standard_multiplier: settings.standardMultiplier,
      premium_multiplier: settings.premiumMultiplier,
      luxury_multiplier: settings.luxuryMultiplier
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving rate settings to Supabase:", error);
    });

  return settings;
}

// ----------------------------------------------------
// 7. COMPANY SETTINGS & COUNTERS
// ----------------------------------------------------
const DEFAULT_SETTINGS: CompanySettings = {
  address: "Plot 45-C, Bukhari Commercial, DHA Phase 6, Karachi, Pakistan",
  phone: "+92 334 6878500 | +92 343 9099082",
  email: "info@naheedandsons.com.pk",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
  yearsExperience: "25+",
  projectsCompleted: "400+",
  clientSatisfaction: "100%",
  completedOnTime: "98%",
  aboutStoryTitle: "Our Legacy",
  aboutStoryP1: "Founded in 2001, Naheed & Sons Design & Construction Company started as a small contracting firm with a simple goal: to build homes that combine luxury with structural integrity. Over the last 25 years, we have grown into one of the region's leading full-service construction firms.",
  aboutStoryP2: "Today, we handle complex multi-story structures, high-end residential interiors, modern commercial designs, and structural renovations. Our success is built on long-term relationships, a highly qualified team, and our signature gold-standard client support.",
  aboutStoryImage: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=2070&auto=format&fit=crop",
  aboutMission: "To deliver unmatched construction quality and interior excellence through integrity, professional expertise, and innovation.",
  aboutVision: "To lead the construction industry by building structures that inspire, stand the test of time, and enrich communities.",
  aboutDirection: "Guided by sustainable building practices, advanced engineering, and client-centric designs.",
  beforeAfterTitle: "Concrete Excellence",
  beforeAfterSubtitle: "Interactive Transformation View",
  beforeAfterBeforeImage: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80",
  beforeAfterAfterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  beforeAfterBeforeLabel: "Concrete Frame Construction",
  beforeAfterAfterLabel: "Completed Structural Handover",
  whatsappNumber: "+92 334 6878500",
  whatsappMessage: "Hello Naheed & Sons, I would like to inquire about your construction and design services.",
  facebookLink: "https://facebook.com/naheedandsons",
  tiktokLink: "https://tiktok.com/@naheedandsons"
};

export function getCompanySettings(): CompanySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;

  // Background fetch & sync
  supabase
    .from("settings")
    .select("*")
    .eq("id", "naheedandsons_settings_v1")
    .maybeSingle()
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        const mapped: CompanySettings = {
          address: data.address,
          phone: data.phone,
          email: data.email,
          hours: data.hours,
          yearsExperience: data.years_experience,
          projectsCompleted: data.projects_completed,
          clientSatisfaction: data.client_satisfaction,
          completedOnTime: data.completed_on_time,
          aboutStoryTitle: data.about_story_title || DEFAULT_SETTINGS.aboutStoryTitle,
          aboutStoryP1: data.about_story_p1 || DEFAULT_SETTINGS.aboutStoryP1,
          aboutStoryP2: data.about_story_p2 || DEFAULT_SETTINGS.aboutStoryP2,
          aboutStoryImage: data.about_story_image || DEFAULT_SETTINGS.aboutStoryImage,
          aboutMission: data.about_mission || DEFAULT_SETTINGS.aboutMission,
          aboutVision: data.about_vision || DEFAULT_SETTINGS.aboutVision,
          aboutDirection: data.about_direction || DEFAULT_SETTINGS.aboutDirection,
          beforeAfterTitle: data.before_after_title || DEFAULT_SETTINGS.beforeAfterTitle,
          beforeAfterSubtitle: data.before_after_subtitle || DEFAULT_SETTINGS.beforeAfterSubtitle,
          beforeAfterBeforeImage: data.before_after_before_image || DEFAULT_SETTINGS.beforeAfterBeforeImage,
          beforeAfterAfterImage: data.before_after_after_image || DEFAULT_SETTINGS.beforeAfterAfterImage,
          beforeAfterBeforeLabel: data.before_after_before_label || DEFAULT_SETTINGS.beforeAfterBeforeLabel,
          beforeAfterAfterLabel: data.before_after_after_label || DEFAULT_SETTINGS.beforeAfterAfterLabel,
          whatsappNumber: data.whatsapp_number || DEFAULT_SETTINGS.whatsappNumber,
          whatsappMessage: data.whatsapp_message || DEFAULT_SETTINGS.whatsappMessage,
          facebookLink: data.facebook_link || DEFAULT_SETTINGS.facebookLink,
          tiktokLink: data.tiktok_link || DEFAULT_SETTINGS.tiktokLink
        };
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(mapped));
        notifySync(SETTINGS_KEY);
      }
    });

  const stored = localStorage.getItem(SETTINGS_KEY);
  if (!stored) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  try {
    const parsed = JSON.parse(stored);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveCompanySettings(settings: CompanySettings): CompanySettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));

  // Sync to Supabase
  supabase
    .from("settings")
    .upsert({
      id: "naheedandsons_settings_v1",
      address: settings.address,
      phone: settings.phone,
      email: settings.email,
      hours: settings.hours,
      years_experience: settings.yearsExperience,
      projects_completed: settings.projectsCompleted,
      client_satisfaction: settings.clientSatisfaction,
      completed_on_time: settings.completedOnTime,
      about_story_title: settings.aboutStoryTitle,
      about_story_p1: settings.aboutStoryP1,
      about_story_p2: settings.aboutStoryP2,
      about_story_image: settings.aboutStoryImage,
      about_mission: settings.aboutMission,
      about_vision: settings.aboutVision,
      about_direction: settings.aboutDirection,
      before_after_title: settings.beforeAfterTitle,
      before_after_subtitle: settings.beforeAfterSubtitle,
      before_after_before_image: settings.beforeAfterBeforeImage,
      before_after_after_image: settings.beforeAfterAfterImage,
      before_after_before_label: settings.beforeAfterBeforeLabel,
      before_after_after_label: settings.beforeAfterAfterLabel,
      whatsapp_number: settings.whatsappNumber,
      whatsapp_message: settings.whatsappMessage,
      facebook_link: settings.facebookLink || null,
      tiktok_link: settings.tiktokLink || null
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving company settings to Supabase:", error);
    });

  return settings;
}

// ----------------------------------------------------
// 8. TEAM MEMBERS
// ----------------------------------------------------
const INITIAL_TEAM: TeamMember[] = [
  {
    id: "member-1",
    name: "John Miller",
    role: "CEO & Founder",
    bio: "Over 25 years of construction management experience leading luxury residential and commercial builds.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    sortOrder: 1,
    linkedin: "https://linkedin.com",
    email: "john@naheedandsons.com",
    phone: "+92 (300) 123-4567"
  },
  {
    id: "member-2",
    name: "Sarah Jenkins",
    role: "Principal Architect",
    bio: "Expert designer focusing on sustainable, contemporary architecture and spatial dynamics.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    sortOrder: 2,
    linkedin: "https://linkedin.com",
    email: "sarah@naheedandsons.com"
  },
  {
    id: "member-3",
    name: "Marcus Brody",
    role: "Chief Structural Engineer",
    bio: "Specializes in high-rise structural designs, complex concrete styling, and foundation stabilization.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop",
    sortOrder: 3,
    linkedin: "https://linkedin.com"
  },
  {
    id: "member-4",
    name: "Elena Rostova",
    role: "Head of Interior Design",
    bio: "Passionate about mixing natural elements with modern materials to create luxury, bespoke interiors.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    sortOrder: 4,
    email: "elena@naheedandsons.com"
  }
];

export function getTeamMembers(): TeamMember[] {
  if (typeof window === "undefined") return INITIAL_TEAM;

  // Background fetch & sync
  supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true })
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        const mapped = data.map((d: any) => ({
          id: d.id,
          name: d.name,
          role: d.role,
          bio: d.bio,
          image: d.image,
          sortOrder: d.sort_order,
          linkedin: d.linkedin || "",
          email: d.email || "",
          phone: d.phone || ""
        }));
        localStorage.setItem(TEAM_KEY, JSON.stringify(mapped));
        notifySync(TEAM_KEY);
      }
    });

  const stored = localStorage.getItem(TEAM_KEY);
  if (!stored) {
    localStorage.setItem(TEAM_KEY, JSON.stringify(INITIAL_TEAM));
    return INITIAL_TEAM;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return INITIAL_TEAM;
  }
}

export function saveTeamMember(member: TeamMember): TeamMember[] {
  if (typeof window === "undefined") return INITIAL_TEAM;
  const current = getTeamMembers();
  const index = current.findIndex((m) => m.id === member.id);
  if (index >= 0) {
    current[index] = member;
  } else {
    current.push(member);
  }
  localStorage.setItem(TEAM_KEY, JSON.stringify(current));

  // Sync to Supabase
  supabase
    .from("team_members")
    .upsert({
      id: member.id,
      name: member.name,
      role: member.role,
      bio: member.bio,
      image: member.image,
      sort_order: member.sortOrder,
      linkedin: member.linkedin || null,
      email: member.email || null,
      phone: member.phone || null
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving team member to Supabase:", error);
    });

  return current;
}

export function deleteTeamMember(id: string): TeamMember[] {
  if (typeof window === "undefined") return INITIAL_TEAM;
  const current = getTeamMembers();
  const filtered = current.filter((m) => m.id !== id);
  localStorage.setItem(TEAM_KEY, JSON.stringify(filtered));

  // Sync to Supabase
  supabase
    .from("team_members")
    .delete()
    .eq("id", id)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting team member from Supabase:", error);
    });

  return filtered;
}

// ----------------------------------------------------
// 9. TESTIMONIALS
// ----------------------------------------------------

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Kamran Alvi",
    role: "CEO, Alvi Group",
    company: "Corporate Client",
    rating: 5,
    text: "Naheed & Sons completely transformed our regional corporate headquarters in Lahore. The team's attention to detail, communication, and sheer quality of engineering execution was unlike anything I have experienced in Pakistan. Truly exceptional work.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    project: "TechHub Headquarters",
    sortOrder: 1,
  },
  {
    id: "test-2",
    name: "Zainab Malik",
    role: "Private Villa Owner",
    company: "Residential Client",
    rating: 5,
    text: "From the very first layout consultation to the final key handover in DHA, every single step felt meticulously managed. Our new villa is everything we dreamed of and more. We cannot recommend Naheed & Sons highly enough.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    project: "The Oasis Villa",
    sortOrder: 2,
  },
  {
    id: "test-3",
    name: "Sikander Bakht",
    role: "Managing Director, Bakht Properties",
    company: "Commercial Client",
    rating: 5,
    text: "We have worked with many contractors across Karachi and Islamabad over the years. Naheed & Sons stands apart — a combination of cutting-edge structural capability, transparent itemized invoicing, and a relentless commitment to quality.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    project: "Skyline Penthouse",
    sortOrder: 3,
  },
];

export function getTestimonials(): Testimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;

  supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true })
    .then(({ data, error }: { data: any; error: any }) => {
      if (!error && data) {
        const mapped = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          company: t.company,
          rating: t.rating,
          text: t.text,
          image: t.image || undefined,
          project: t.project,
          sortOrder: t.sort_order,
        }));
        localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(mapped));
        notifySync(TESTIMONIALS_KEY);
      }
    });

  const stored = localStorage.getItem(TESTIMONIALS_KEY);
  if (!stored) {
    localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(INITIAL_TESTIMONIALS));
    return INITIAL_TESTIMONIALS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_TESTIMONIALS;
  }
}

export function saveTestimonial(testimonial: Testimonial): Testimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  const current = getTestimonials();
  const existing = current.findIndex((t) => t.id === testimonial.id);
  if (existing >= 0) {
    current[existing] = testimonial;
  } else {
    current.push(testimonial);
  }
  current.sort((a, b) => a.sortOrder - b.sortOrder);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(current));

  supabase
    .from("testimonials")
    .upsert({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      rating: testimonial.rating,
      text: testimonial.text,
      image: testimonial.image || null,
      project: testimonial.project,
      sort_order: testimonial.sortOrder,
    })
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error saving testimonial to Supabase:", error);
    });

  return current;
}

export function deleteTestimonial(id: string): Testimonial[] {
  if (typeof window === "undefined") return INITIAL_TESTIMONIALS;
  const current = getTestimonials();
  const filtered = current.filter((t) => t.id !== id);
  localStorage.setItem(TESTIMONIALS_KEY, JSON.stringify(filtered));

  supabase
    .from("testimonials")
    .delete()
    .eq("id", id)
    .then(({ error }: { error: any }) => {
      if (error) console.error("Error deleting testimonial from Supabase:", error);
    });

  return filtered;
}
