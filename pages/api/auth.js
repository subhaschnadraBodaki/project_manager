import { supabase } from '../../components/utils/supabase/initSupabase'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}