import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.SUPABASE_NEXT_PUBLIC_SUPABASE_URL || "https://fldascomkgrfcoxxogkg.supabase.co"
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!

  console.log("[v0] Supabase URL:", supabaseUrl)

  return createBrowserClient(supabaseUrl, supabaseKey)
}
