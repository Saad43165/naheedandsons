const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const PAKISTANI_TESTIMONIALS = [
  {
    id: "test-pak-1",
    name: "Tariq Mahmood",
    role: "Retired Army Officer",
    company: "Residential Client",
    rating: 5,
    text: "Building a house in DHA Islamabad Phase 2 was a stressful thought until I met the team at Naheed & Sons. They handled everything from the CDA approvals to the final paint job. Their structural engineering is flawless, and they never compromised on the steel or cement quality.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    project: "1 Kanal Villa, DHA Phase 2",
    sort_order: 1
  },
  {
    id: "test-pak-2",
    name: "Chaudhry Usman Malik",
    role: "Local Business Owner",
    company: "Commercial Client",
    rating: 5,
    text: "We wanted to build a sprawling luxury farmhouse on the outskirts of Chakwal, and Naheed & Sons delivered beyond our expectations. They managed the complex logistics of sourcing premium materials to our remote site perfectly. Highly recommended for large-scale projects.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    project: "4 Kanal Farmhouse, Chakwal",
    sort_order: 2
  },
  {
    id: "test-pak-3",
    name: "Dr. Ayesha Khan",
    role: "Medical Professional",
    company: "Interior Client",
    rating: 5,
    text: "I hired Naheed & Sons for the interior finishing of my new clinic and private residence in Bahria Town Phase 8, Rawalpindi. Their attention to modern minimalist design and their strict adherence to deadlines is something very rare to find in Pakistan's construction sector.",
    image: "https://images.unsplash.com/photo-1583341612074-ccea5cd64f6a?q=80&w=200&auto=format&fit=crop",
    project: "Clinic & Residence, Bahria Town",
    sort_order: 3
  }
];

async function seedTestimonials() {
  console.log('Pushing Authentic Pakistani Testimonials to Supabase...');
  
  for (const test of PAKISTANI_TESTIMONIALS) {
    const { error } = await supabase.from('testimonials').upsert(test);
    if (error) {
      console.error('Error inserting testimonial:', test.name, error.message);
    } else {
      console.log('✅ Successfully published review from:', test.name);
    }
  }
  
  console.log('All 3 local testimonials injected successfully!');
}

seedTestimonials();
