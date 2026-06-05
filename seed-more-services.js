const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const MORE_SERVICES = [
  {
    slug: "aluminum-glass-works",
    title: "Aluminum & Glass Works",
    tagline: "Modern facades and structural glazing",
    desc_text: "High-grade aluminum fabrication and tempered glass installations for modern straight-line elevations, commercial storefronts, and luxury residential windows.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    icon_name: "LayoutTemplate",
    features: ["Curtain Walls", "Tempered Glass Partitions", "Thermal Broken Windows"],
    suitable: ["Commercial Plazas", "Modern Villas"]
  },
  {
    slug: "wood-works",
    title: "Custom Woodwork & Joinery",
    tagline: "Bespoke interior wooden finishes",
    desc_text: "Premium carpentry services including solid Ash/Diyar wood doors, custom kitchen cabinetry, media walls, and luxury hardwood flooring.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    icon_name: "Wrench",
    features: ["Solid Wood Doors", "Custom Wardrobes", "Kitchen Cabinetry"],
    suitable: ["Luxury Interiors", "Farmhouses"]
  },
  {
    slug: "steel-works",
    title: "Steel Structure Fabrication",
    tagline: "Industrial strength structural steel",
    desc_text: "Fabrication of heavy-duty steel frameworks, custom architectural metal louvers, spiral staircases, and reinforced safety gates.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356f12?q=80&w=1600&auto=format&fit=crop",
    icon_name: "Settings",
    features: ["Steel Louvers", "Industrial Frameworks", "Custom Gates"],
    suitable: ["Commercial Buildings", "Industrial Warehouses"]
  },
  {
    slug: "project-supervision",
    title: "Project Supervision & QA",
    tagline: "Expert oversight for flawless execution",
    desc_text: "Don't want to hire a full contractor? We offer strictly professional site supervision to ensure your labor team is following engineering blueprints and material standards perfectly.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    icon_name: "Eye",
    features: ["Quality Assurance", "Material Testing", "Labor Management"],
    suitable: ["Overseas Pakistanis", "Self-Builders"]
  },
  {
    slug: "remodeling-revamping",
    title: "Remodeling & Revamping",
    tagline: "Breathing new life into old structures",
    desc_text: "Complete structural revamping of older homes. We strip the house to its core, update outdated plumbing and electrical lines, and apply modern architectural finishes.",
    image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?q=80&w=1600&auto=format&fit=crop",
    icon_name: "RefreshCcw",
    features: ["Plumbing Updates", "Facade Modernization", "Layout Alterations"],
    suitable: ["Older Properties", "Inherited Homes"]
  },
  {
    slug: "civil-engineering",
    title: "Civil Engineering Works",
    tagline: "Heavy-duty infrastructure solutions",
    desc_text: "Specialized civil engineering works including deep foundation laying, retaining walls for sloped plots, road paving, and heavy concrete pouring.",
    image: "https://images.unsplash.com/photo-1541888086968-3e5e1c0c8eb1?q=80&w=1600&auto=format&fit=crop",
    icon_name: "HardHat",
    features: ["Retaining Walls", "Soil Testing", "Deep Foundations"],
    suitable: ["Sloped Terrain", "Large Commercial Projects"]
  }
];

async function seedMoreServices() {
  console.log('Injecting specialized construction services...');
  
  for (const s of MORE_SERVICES) {
    const { error } = await supabase.from('services').upsert(s);
    if (error) {
      console.error('Error inserting service:', s.title, error.message);
    } else {
      console.log('✅ Successfully added service:', s.title);
    }
  }

  console.log('🎉 All specialized services injected successfully!');
}

seedMoreServices();
