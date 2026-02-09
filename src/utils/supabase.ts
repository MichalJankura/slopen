
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Chýbajú Supabase údaje! Skontroluj .env.local súbor.');
}

const supabase = createClient(supabaseUrl as string, supabaseKey as string);

export default supabase