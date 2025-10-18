"use server"

import { createClient } from "@/lib/supabase/server"

export async function addToWaitlist(email: string) {
  try {
    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase.from("waitlist").select("email").eq("email", email).single()

    if (existing) {
      return { success: false, error: "This email is already on the waitlist!" }
    }

    // Insert new email
    const { error } = await supabase.from("waitlist").insert([{ email }])

    if (error) {
      console.error("[v0] Supabase error:", error)
      return { success: false, error: "Failed to join waitlist. Please try again." }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Waitlist error:", error)
    return { success: false, error: "Something went wrong. Please try again." }
  }
}
