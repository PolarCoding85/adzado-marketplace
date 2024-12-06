  // components/dashboard/side-nav.tsx

 "use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart,
  Settings,
  FileText,
  UserPlus,
  Building,
  DollarSign,
  Search,
  ChevronLeft,
  HelpCircle,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { useUser, UserButton } from "@clerk/nextjs";

interface NavItem {
  title: string;
  href: string;
  icon: any;
  description?: string;
}

export function SideNav() {
  const { role } = useAuth();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useUser();

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
  ];

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
  ];

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
  ];

  // Combine navigation items based on role
  const navItems = [
    ...commonNavItems,
    ...(role === "publisher" ? publisherNavItems : advertiserNavItems),
  ];

  // Helper function to check if a path is active
  const isActivePath = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") {
      return true;
    }
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "relative h-screen border-r bg-muted/10 transition-all duration-300 flex flex-col",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        {/* Logo Section */}
        <div className={cn("p-6", isCollapsed && "px-4")}>
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-6 w-1.5 bg-blue-500 transform -skew-x-12" />
              {!isCollapsed && (
                <span className="text-xl font-bold ml-2">
                  <span className="text-blue-500">ad</span>zado
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* Main Navigation Section */}
        <div className="flex-1 px-3 py-2">
          <div className="space-y-1">
            {navItems.map((item) => (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant={isActivePath(item.href) ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start",
                        isActivePath(item.href) && "bg-muted",
                        isCollapsed && "justify-center px-2"
                      )}
                      title={item.description}
                    >
                      <item.icon className={cn(
                        "h-4 w-4",
                        !isCollapsed && "mr-2"
                      )} />
                      {!isCollapsed && item.title}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    {item.title}
                    {item.description && (
                      <span className="block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/* Support Button */}
          <div className="px-3 py-1">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href="/support">
                  <Button
                    variant={isActivePath("/support") ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActivePath("/support") && "bg-muted",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <LifeBuoy className={cn(
                      "h-4 w-4",
                      !isCollapsed && "mr-2"
                    )} />
                    {!isCollapsed && "Support"}
                  </Button>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Support
                </TooltipContent>
              )}
            </Tooltip>
          </div>

          {/* Settings Button */}
          <div className="px-3 pb-2">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href="/settings">
                  <Button
                    variant={isActivePath("/settings") ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isActivePath("/settings") && "bg-muted",
                      isCollapsed && "justify-center px-2"
                    )}
                  >
                    <Settings className={cn(
                      "h-4 w-4",
                      !isCollapsed && "mr-2"
                    )} />
                    {!isCollapsed && "Settings"}
                  </Button>
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  Settings
                </TooltipContent>
              )}
            </Tooltip>
          </div>

          {/* User Profile Section */}
          <div className={cn(
            "border-t p-4",
            isCollapsed ? "flex justify-center" : "flex items-center gap-4"
          )}>
            <UserButton afterSignOutUrl="/sign-in" />
            {!isCollapsed && (
              <div className="flex-1 ml-2">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse Toggle Button */}
        <Button
          variant="ghost"
          className={cn(
            "h-6 w-6 p-0 absolute right-2 top-6",
            isCollapsed && "rotate-180"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>
    </TooltipProvider>
  );
}