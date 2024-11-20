"use client"

import { useSession } from "@/contexts/session-context"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { LoadingPage } from "@/components/loading"

interface RoleBasedLayoutProps {
  children: React.ReactNode
  allowedRoles?: ("publisher" | "advertiser")[]
}

export function RoleBasedLayout({
  children,
  allowedRoles,
}: RoleBasedLayoutProps) {
  const { user, isLoading } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push(`/sign-in?redirect=${encodeURIComponent(pathname)}`)
        return
      }

      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.push("/unauthorized")
        return
      }
    }
  }, [user, isLoading, router, pathname, allowedRoles])

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null
  }

  return <>{children}</>
}
