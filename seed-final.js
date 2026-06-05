const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const TEAM = [
  {
    id: "team-1",
    name: "Engr. Mohsin Ahmed",
    role: "Project Lead / Structural Engineer",
    bio: "Leading structural and civil engineering operations across Islamabad and Chakwal. Specializes in earthquake-resistant design and heavy commercial foundations.",
    image: "", // Left blank for Admin upload
    phone: "+92 343 9099082",
    linkedin: "",
    sort_order: 1
  },
  {
    id: "team-2",
    name: "Farhan Ahmed",
    role: "Principal Architect",
    bio: "Head of design and aesthetics. Expert in modern Spanish, Contemporary, and minimalist farmhouse layouts tailored to the Pakistani climate.",
    image: "", // Left blank for Admin upload
    phone: "+92 334 6878500",
    linkedin: "",
    sort_order: 2
  }
];

const SETTINGS = {
  id: "naheedandsons_settings_v1",
  address: "Head Office: Blue Area, Islamabad | Regional Office: Bhubhar, Chakwal",
  phone: "+92 334 6878500 | +92 343 9099082",
  email: "info@naheedandsons.com.pk",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
  years_experience: "15+",
  projects_completed: "250+",
  client_satisfaction: "100%",
  completed_on_time: "98%",
  about_story_title: "Building the Twin Cities & Chakwal",
  about_story_p1: "Naheed & Sons is a premier construction and architectural firm specializing in high-end residential and commercial developments across Islamabad, Rawalpindi, and Chakwal.",
  about_story_p2: "From sprawling luxury farmhouses in Chakwal to modern 1-Kanal villas in DHA Islamabad, we provide a completely transparent, turnkey construction experience led by qualified engineers.",
  about_story_image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
  about_mission: "To deliver unmatched construction quality in the region through transparent material sourcing and superior structural engineering.",
  about_vision: "To lead the local construction industry by building structures that inspire, stand the test of time, and enrich our communities.",
  about_direction: "Guided by sustainable building practices, advanced engineering, and local expertise.",
  before_after_title: "Concrete Excellence",
  before_after_subtitle: "From Grey Structure to Finishing",
  before_after_before_image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
  before_after_after_image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  before_after_before_label: "Grey Structure Phase",
  before_after_after_label: "Final Handover",
  whatsapp_number: "+923346878500",
  whatsapp_message: "Hello Naheed & Sons, I would like to get a quote for a construction project.",
  facebook_link: "", // Left blank
  tiktok_link: "" // Left blank
};

const SERVICES = [
  {
    slug: "full-construction",
    title: "Turnkey Construction",
    tagline: "From foundation to key handover",
    desc_text: "We handle the entire build process including grey structure, MEP, and luxury finishing for villas in DHA, Bahria Town, and Chakwal.",
    image: "https://images.unsplash.com/photo-1541888086968-3e5e1c0c8eb1?q=80&w=1600&auto=format&fit=crop",
    icon_name: "Hammer",
    features: ["A-Grade Material Sourcing", "CDA/RDA Map Approvals", "Structural Engineering"],
    suitable: ["DHA Villas", "Bahria Town Homes", "Farmhouses"]
  },
  {
    slug: "architecture-design",
    title: "Architecture & Design",
    tagline: "Designing modern spaces",
    desc_text: "Our architects draft brilliant, space-optimized 3D elevations and floor plans that comply strictly with local CDA and RDA bylaws.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    icon_name: "PenTool",
    features: ["3D Elevations", "Floor Planning", "MEP Layouts"],
    suitable: ["Residential", "Commercial Plazas"]
  }
];

const FAQS = [
  {
    id: "faq-pak-1",
    question: "Do you handle CDA and RDA approvals?",
    answer: "Yes, our team manages the entire pre-construction map approval process, ensuring your floor plans and elevations strictly comply with local bylaws."
  },
  {
    id: "faq-pak-2",
    question: "What areas do you provide construction services in?",
    answer: "We actively construct and design in DHA Islamabad, Bahria Town Rawalpindi, various CDA sectors in Islamabad, and all areas within Chakwal."
  },
  {
    id: "faq-pak-3",
    question: "How do you charge for grey structure?",
    answer: "We provide a completely transparent per-square-foot rate based on current market prices for steel and cement. You will receive an itemized bill for every stage of the foundation and superstructure."
  }
];

async function seedFinal() {
  console.log('Injecting final Team, Settings, FAQs, and Services...');
  
  // 1. Team
  for (const t of TEAM) await supabase.from('team_members').upsert(t);
  console.log('✅ Team Members added (Mohsin & Farhan)');

  // 2. Settings
  await supabase.from('settings').upsert(SETTINGS);
  console.log('✅ Company Settings & Phone Numbers added');

  // 3. Services
  for (const s of SERVICES) await supabase.from('services').upsert(s);
  console.log('✅ Core Services added');

  // 4. FAQs
  for (const f of FAQS) await supabase.from('faqs').upsert(f);
  console.log('✅ Local FAQs added');

  console.log('🎉 WEBSITE FULLY POPULATED!');
}

seedFinal();
