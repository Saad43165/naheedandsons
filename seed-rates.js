const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';
const supabase = createClient(supabaseUrl, supabaseKey);

const RATES = {
  id: 'naheedandsons_rates_v1',
  residential_rate: 6500,    // PKR 6,500 per sqft for basic residential
  commercial_rate: 8500,     // PKR 8,500 per sqft for commercial plazas
  interior_rate: 5000,       // PKR 5,000 per sqft for luxury interior design
  renovation_rate: 3800,     // PKR 3,800 per sqft for revamping/remodeling
  standard_multiplier: 1.00, // Basic finishing
  premium_multiplier: 1.35,  // Premium finishing (35% more)
  luxury_multiplier: 1.75    // Ultra-luxury finishing (75% more)
};

async function seedRates() {
  console.log('Injecting 2026 Islamabad/Pindi Construction Rates into the Budget Calculator...');
  
  const { error } = await supabase.from('rates').upsert(RATES);
  
  if (error) {
    console.error('Error injecting rates:', error.message);
  } else {
    console.log('✅ Success! The Budget Calculator is now using accurate 2026 PKR market rates!');
  }
}

seedRates();
