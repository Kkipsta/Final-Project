import { createClient } from '@supabase/supabase-js'


const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient('https://stxwghxepvmkfpnfekky.supabase.co', supabaseAnonKey)