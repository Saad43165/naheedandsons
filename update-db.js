const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anqyoyiwqicgsbqsetdq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucXlveWl3cWljZ3NicXNldGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MzUyNjYsImV4cCI6MjA5NjExMTI2Nn0.nl9BDAw-XXfwWqTTDVesSy_BJ2_bXpYBWLmXis8z1IY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateContactNumbers() {
  try {
    const { data: settings, error: fetchError } = await supabase
      .from('company_settings')
      .select('*')
      .single();

    if (fetchError) throw fetchError;

    if (settings) {
      const { error: updateError } = await supabase
        .from('company_settings')
        .update({
          whatsapp_number: '+92 334 6878500',
          phone: '+92 334 6878500 | +92 343 9099082'
        })
        .eq('id', settings.id);

      if (updateError) throw updateError;
      console.log('Successfully updated Supabase Database with new contact numbers!');
    }
  } catch (error) {
    console.error('Error updating database:', error.message);
  }
}

updateContactNumbers();
