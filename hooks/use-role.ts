"use client"

import { useSession } from "@/contexts/session-context"

export type UserRole = "publisher" | "advertiser" | null

export function useRole() {
  const { user } = useSession()
  return user?.role || null
}
