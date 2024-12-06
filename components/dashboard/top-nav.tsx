// components/dashboard/top-nav.tsx

"use client"

import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  User,
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import { Badge } from "@/components/ui/badge"
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ModeToggle } from "../layouts/theme-toggle"

export function TopNav() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { user: clerkUser } = useUser();
  const router = useRouter();

  // Directly query Convex for user data
  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id || "",
  });

  // Log the user data to see what we're getting
  console.log('Clerk User:', clerkUser);
  console.log('Convex User:', user);

  const role = user?.role;

  // Get the dashboard title based on role
  const getDashboardTitle = () => {
    if (!role) return "Dashboard";
    return `${role.charAt(0).toUpperCase() + role.slice(1)} Dashboard`;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Role Badge */}
          {role && (
            <Badge variant="outline" className="capitalize">
              {role}
            </Badge>
          )}
          
          {/* Page Title */}
          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">
              {getDashboardTitle()}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Help Button */}
          <Button variant="ghost" size="icon" title="Help & Documentation">
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ModeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="relative h-8 w-8 rounded-full"
                title={clerkUser?.primaryEmailAddress?.emailAddress}
              >
                {clerkUser?.imageUrl ? (
                  <img 
                    src={clerkUser.imageUrl} 
                    alt={clerkUser.fullName || "User"} 
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {clerkUser?.fullName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {clerkUser?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => router.push("/sign-out")}
                className="text-destructive cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}