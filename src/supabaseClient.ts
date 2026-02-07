
import { createClient } from '@supabase/supabase-js'

// Prevent crash on undefined env vars (which are empty in client-side)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
    console.warn('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Authentication will not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
