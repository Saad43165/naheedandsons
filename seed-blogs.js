const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const PAKISTANI_BLOGS = [
  {
    slug: "dha-islamabad-grey-structure-costs-2026",
    title: "2026 Grey Structure Construction Costs in DHA Islamabad",
    excerpt: "A detailed breakdown of per-square-foot construction costs for A-category grey structures in DHA Islamabad, including steel, cement, and local labor rates for 2026.",
    category: "Construction Costs",
    date: new Date().toISOString(),
    author: "Kamran Ali",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop",
    content: [
      "Building a home in DHA Islamabad requires strict adherence to their bylaws, which heavily influences overall grey structure costs. The varying topography of Islamabad also means foundation costs can fluctuate depending on whether your plot is leveled or on a slope.",
      "As of 2026, the cost of an A-category grey structure (using Amreli Steels, Bestway/Fauji Cement, and Grade-A bricks from local kilns) hovers around PKR 2,900 to PKR 3,300 per square foot.",
      "Labor contracts in the twin cities typically account for PKR 450 to PKR 600 per sq. ft of this cost. When factoring in the basement, retaining walls require heavy reinforcement, bumping the basement per-sq-ft cost by an additional 15%.",
      "At Naheed & Sons, we ensure completely transparent itemized billing so you know exactly how many tons of steel and bags of cement are going into your DHA Islamabad foundation."
    ]
  },
  {
    slug: "modern-elevations-bahria-town-rawalpindi",
    title: "Top 5 Modern Elevation Trends for Villas in Bahria Town Rawalpindi",
    excerpt: "From Spanish-style arches to ultra-modern straight-line glass facades, discover the most popular architectural trends for 1-Kanal villas in Phase 8.",
    category: "Architecture & Design",
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    author: "Sarah Malik",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    content: [
      "Bahria Town Rawalpindi (especially Phase 7 and Phase 8) is seeing a massive shift away from traditional designs toward minimalist, contemporary elevations.",
      "1. Straight-Line Architecture: Heavy use of concrete fair-face finishes, massive windows, and sharp geometric lines are currently dominating the 1-Kanal and 2-Kanal sectors.",
      "2. Louvers and Wood Cladding: Homeowners in Pindi are increasingly using weather-resistant HPL (High-Pressure Laminate) wood cladding to give warmth to concrete facades.",
      "3. Double-Height Entrances: A grand, double-height main door (often solid Ash or Mahogany wood) creates a towering, luxurious first impression.",
      "Naheed & Sons specializes in these high-end contemporary designs, balancing aesthetics with structural practicality for the twin cities' climate."
    ]
  },
  {
    slug: "building-in-chakwal-material-sourcing",
    title: "Building in Chakwal: A Guide to Sourcing Premium Materials",
    excerpt: "Why sourcing the right bricks, steel, and cement locally in Chakwal can save you millions without compromising on structural integrity.",
    category: "Materials & Sourcing",
    date: new Date(Date.now() - 86400000 * 6).toISOString(),
    author: "Engr. Hassan Raza",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2000&auto=format&fit=crop",
    content: [
      "Chakwal is experiencing a boom in custom residential construction and farmhouse developments. However, logistics and material sourcing can be a challenge if not managed properly.",
      "The region is famous for producing high-quality bricks. Sourcing Grade-A Awwal bricks directly from reputable local kilns in Chakwal rather than importing them from Rawalpindi can drastically cut transportation costs while maintaining top-tier quality.",
      "For steel and cement, bulk purchasing from major distributors in the Rawalpindi/Islamabad corridor ensures you get unadulterated, factory-grade materials (like Mughal Steel and Bestway Cement).",
      "Naheed & Sons has established strong local supply chains in Chakwal, ensuring our clients get the best wholesale rates for premium materials."
    ]
  },
  {
    slug: "navigating-cda-approvals-islamabad",
    title: "Navigating CDA Building Approvals: A Homeowner's Guide",
    excerpt: "Understanding the CDA bylaws, FAR (Floor Area Ratio), and NOC requirements before pouring your first foundation in Islamabad.",
    category: "Legal & Planning",
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    author: "Usman Tariq",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
    content: [
      "Before excavation begins in any CDA sector (like F-10, E-11, or D-12), securing approvals from the Capital Development Authority is the most critical phase.",
      "You must submit a complete architectural layout, structural drawings, and an MEP plan. The CDA strictly monitors the Floor Area Ratio (FAR) and covered area limits to ensure you aren't overbuilding on your plot.",
      "Common reasons for map rejection include improper setback distances (leaving space at the front, sides, and rear of the house) and inadequate ventilation shafts.",
      "Navigating these government offices can be a nightmare for a regular homeowner. That is why Naheed & Sons handles the entire pre-construction CDA approval phase as part of our turnkey contracting service."
    ]
  },
  {
    slug: "luxury-farmhouses-chakwal",
    title: "Designing Luxury Farmhouses in Chakwal: Space Meets Elegance",
    excerpt: "Exploring the rise of sprawling, multi-Kanal luxury farmhouses in the Chakwal region and what goes into their structural design.",
    category: "Architecture & Design",
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    author: "Sarah Malik",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=2000&auto=format&fit=crop",
    content: [
      "With its beautiful open landscapes and agricultural heritage, Chakwal is becoming a prime destination for luxury farmhouse developments.",
      "Unlike urban villas in Rawalpindi, farmhouses require a different architectural approach. We focus on expansive covered patios, massive panoramic windows to capture the views, and high-ceiling living spaces.",
      "Foundation design is also different, often requiring specialized soil testing depending on the exact location in the Chakwal district to ensure structural stability over large, single-story footprints.",
      "Naheed & Sons brings urban luxury standards to Chakwal, delivering farmhouses that offer modern smart-home amenities within a peaceful rural setting."
    ]
  },
  {
    slug: "rda-vs-cda-bylaws",
    title: "RDA vs CDA: Understanding Twin Cities Construction Bylaws",
    excerpt: "A comparative guide to the differing building regulations between the Rawalpindi Development Authority and the Capital Development Authority.",
    category: "Legal & Planning",
    date: new Date(Date.now() - 86400000 * 20).toISOString(),
    author: "Engr. Hassan Raza",
    image: "https://images.unsplash.com/photo-1613490908575-9e6e166e5111?q=80&w=2000&auto=format&fit=crop",
    content: [
      "Building a house on the border of Rawalpindi and Islamabad means you need to know exactly whose jurisdiction your plot falls under: RDA or CDA.",
      "The CDA (Islamabad) is notoriously strict regarding setbacks, commercial usage in residential zones, and maximum height limits. Their inspection teams frequently visit sites to ensure 100% compliance with the approved map.",
      "The RDA (Rawalpindi) has slightly different requirements, especially concerning high-density areas and commercial corridor zoning.",
      "Choosing a contractor like Naheed & Sons, who has deep experience with both RDA and CDA inspectors, ensures your project doesn't face legal halts or demolition notices during construction."
    ]
  }
];

async function seedBlogs() {
  console.log('Pushing Local Pindi/Islamabad/Chakwal Blog Data to Supabase...');
  
  for (const blog of PAKISTANI_BLOGS) {
    const { error } = await supabase.from('blogs').upsert(blog);
    if (error) {
      console.error('Error inserting blog:', blog.slug, error.message);
    } else {
      console.log('✅ Successfully published:', blog.title);
    }
  }
  
  console.log('All 6 local blogs injected successfully!');
}

seedBlogs();
