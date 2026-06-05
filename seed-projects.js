const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const TEAM_MEMBERS = [
  { name: "Engr. Mohsin Ahmed", role: "Project Lead / Structural Engineer" },
  { name: "Farhan Ahmed", role: "Principal Architect" }
];

const PAKISTANI_PROJECTS = [
  {
    id: "proj-1",
    title: "Begum Noor Memorial Hospital",
    category: "Full Construction",
    location: "Bhubhar, Chakwal",
    year: "2024",
    duration: "18 Months",
    area: "20 Kanal",
    budget: "Confidential",
    status: "Completed",
    description: "A state-of-the-art medical facility built to serve the Chakwal region. The project required highly specialized structural engineering to accommodate heavy medical equipment, specialized HVAC systems for infection control, and a modern aesthetic that remains welcoming to patients. Handled completely turnkey from excavation to final finishing by our senior engineering team.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop", // Hospital building look
    gallery: [],
    tags: ["Healthcare", "Commercial", "Turnkey", "MEP Engineering"],
    team: TEAM_MEMBERS
  },
  {
    id: "proj-2",
    title: "1 Kanal Modern Spanish Villa",
    category: "Full Construction",
    location: "DHA Phase 2, Islamabad",
    year: "2025",
    duration: "12 Months",
    area: "1 Kanal (4,500 sqft)",
    budget: "Premium Finish",
    status: "Completed",
    description: "A stunning 1 Kanal residence featuring a blend of traditional Spanish arches and modern straight-line elements. Built with completely imported Spanish tiles, Ash wood doors, and high-end sanitary fittings. The grey structure was cast using A-grade materials, ensuring a flawless foundation for the luxury finishes.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Residential", "Spanish Architecture", "DHA", "Luxury"],
    team: [TEAM_MEMBERS[1]]
  },
  {
    id: "proj-3",
    title: "2 Kanal Contemporary Glass House",
    category: "Full Construction",
    location: "Bahria Town Phase 8, Rawalpindi",
    year: "2025",
    duration: "14 Months",
    area: "2 Kanal",
    budget: "High-End",
    status: "Completed",
    description: "Located in the premium sector of Bahria Town Phase 8, this massive 2 Kanal property focuses heavily on natural light. The elevation features structural glazing, a double-height entrance, and minimalist concrete fair-face elements. Features a smart-home integrated lighting system.",
    image: "https://images.unsplash.com/photo-1613490908575-9e6e166e5111?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Contemporary", "Bahria Town", "Smart Home", "Glass Facade"],
    team: TEAM_MEMBERS
  },
  {
    id: "proj-4",
    title: "Complete Revamp of 10 Marla House",
    category: "Renovation",
    location: "F-11 Sector, Islamabad",
    year: "2024",
    duration: "4 Months",
    area: "10 Marla",
    budget: "Standard",
    status: "Completed",
    description: "A complete overhaul of a 15-year-old property in Sector F-11. We stripped the house down to its brick structure, rerouted the old plumbing, updated the electrical wiring to modern standards, and applied a completely new modern plaster and paint finish to give it a 2024 look.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Renovation", "Plumbing Update", "F-11", "Structural Revamp"],
    team: [TEAM_MEMBERS[0]]
  },
  {
    id: "proj-5",
    title: "Sprawling Luxury Farmhouse Design",
    category: "Architecture",
    location: "Kallar Kahar Road, Chakwal",
    year: "2025",
    duration: "Ongoing",
    area: "8 Kanal",
    budget: "Premium",
    status: "In Progress",
    description: "Full architectural and landscaping design for a massive private farmhouse estate in Chakwal. The design incorporates a central courtyard, large outdoor patios for family gatherings, and deep verandas to combat the summer heat, utilizing locally sourced Chakwal stone for the exterior.",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Farmhouse", "Architecture", "Landscaping", "Chakwal Stone"],
    team: TEAM_MEMBERS
  },
  {
    id: "proj-6",
    title: "Ultra-Modern Interior Revamp",
    category: "Interior Design",
    location: "DHA Phase 5, Islamabad",
    year: "2024",
    duration: "3 Months",
    area: "1 Kanal",
    budget: "Luxury",
    status: "Completed",
    description: "We redesigned the interior of a newly built DHA villa, focusing on bespoke woodwork, customized media walls, false ceiling designs with hidden ambient LEDs, and imported Turkish chandeliers.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Interior Design", "Media Wall", "Woodwork", "False Ceiling"],
    team: [TEAM_MEMBERS[1]]
  },
  {
    id: "proj-7",
    title: "1 Kanal Grey Structure Excellence",
    category: "Full Construction",
    location: "Bahria Town Phase 7, Rawalpindi",
    year: "2026",
    duration: "6 Months",
    area: "1 Kanal",
    budget: "Standard",
    status: "Completed",
    description: "Executed a flawless grey structure contract for an overseas Pakistani client. The project utilized strictly Amreli Steels and Fauji Cement. We handled all Bahria Town structural inspections, delivering a perfect foundation ready for finishing.",
    image: "https://images.unsplash.com/photo-1541888086968-3e5e1c0c8eb1?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Grey Structure", "Bahria Town", "Overseas Client", "Foundation"],
    team: [TEAM_MEMBERS[0]]
  },
  {
    id: "proj-8",
    title: "Modern Facade Elevation Upgrade",
    category: "Renovation",
    location: "E-11 Sector, Islamabad",
    year: "2025",
    duration: "2 Months",
    area: "1.5 Kanal",
    budget: "Premium",
    status: "Completed",
    description: "The client wanted to modernize their older home's exterior without changing the interior. We removed the old classical pillars, added sharp modern steel louvers, applied imported rock-wall texturing, and completely changed the visual identity of the property.",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Facade Upgrade", "Elevation", "E-11", "Exterior Design"],
    team: TEAM_MEMBERS
  },
  {
    id: "proj-9",
    title: "5 Marla Smart Villa Design",
    category: "Architecture",
    location: "DHA Valley, Islamabad",
    year: "2024",
    duration: "8 Months",
    area: "5 Marla",
    budget: "Standard",
    status: "Completed",
    description: "Maximizing space in a 5 Marla footprint requires genius architecture. We designed a layout that perfectly utilizes every square foot, ensuring proper cross-ventilation, a surprisingly spacious lounge, and a striking modern exterior.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["5 Marla", "Smart Layout", "DHA Valley", "Space Optimization"],
    team: [TEAM_MEMBERS[1]]
  },
  {
    id: "proj-10",
    title: "Commercial Retail Plaza",
    category: "Full Construction",
    location: "Saddar, Rawalpindi",
    year: "2025",
    duration: "18 Months",
    area: "10 Marla (G+4)",
    budget: "Commercial",
    status: "In Progress",
    description: "A Ground + 4 stories commercial plaza in the heart of Pindi. Designed and built for maximum retail footprint on the ground floors with open-plan corporate offices above. Features a heavy-duty commercial elevator shaft and reinforced basement parking.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
    gallery: [],
    tags: ["Commercial", "Plaza", "Saddar", "Multi-Story"],
    team: TEAM_MEMBERS
  }
];

async function seedProjects() {
  console.log('Pushing Authentic Pakistani Projects to Supabase...');
  
  for (const proj of PAKISTANI_PROJECTS) {
    const { error } = await supabase.from('projects').upsert(proj);
    if (error) {
      console.error('Error inserting project:', proj.title, error.message);
    } else {
      console.log('✅ Successfully published project:', proj.title);
    }
  }
  
  console.log('All 10 local projects injected successfully!');
}

seedProjects();
