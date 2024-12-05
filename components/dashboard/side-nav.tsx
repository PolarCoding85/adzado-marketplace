// components/dashboard/side-nav.tsx

"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BarChart,
  Settings,
  FileText,
  UserPlus,
  Building,
  DollarSign,
  Search,
} from "lucide-react"
import Link from "next/link"

interface NavItem {
  title: string
  href: string
  icon: any
  description?: string
}

export function SideNav() {
  const { role } = useAuth()
  const pathname = usePathname()

  // Common navigation items
  const commonNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  // Publisher-specific navigation items
  const publisherNavItems: NavItem[] = [
    {
      title: "Browse Offers",
      href: "/offers/browse",
      icon: Search,
      description: "Find and apply to offers",
    },
    {
      title: "My Applications",
      href: "/offers/applications",
      icon: FileText,
      description: "Track your offer applications",
    },
    {
      title: "Payouts",
      href: "/payouts",
      icon: DollarSign,
      description: "Manage your earnings",
    },
  ]

  // Advertiser-specific navigation items
  const advertiserNavItems: NavItem[] = [
    {
      title: "My Offers",
      href: "/offers/manage",
      icon: FileText,
      description: "Manage your offers",
    },
    {
      title: "Publisher Requests",
      href: "/publishers/requests",
      icon: UserPlus,
      description: "Review publisher applications",
    },
    {
      title: "Company",
      href: "/company",
      icon: Building,
      description: "Manage company details",
    },
  ]

  // Combine navigation items based on role
  const navItems = [
    ...commonNavItems,
    ...(role === "publisher" ? publisherNavItems : advertiserNavItems),
  ]

  return (
    <div className="w-64 border-r bg-muted/10 h-screen sticky top-0">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === item.href && "bg-muted"
                  )}
                  title={item.description}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}