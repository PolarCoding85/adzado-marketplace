// components/layouts/role-based-layout.tsx

"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/loading";
import { SideNav } from "@/components/dashboard/side-nav";
import { TopNav } from "@/components/dashboard/top-nav";

// Define shared routes
const SHARED_ROUTES = ["/settings", "/analytics", "/help"];

interface RoleBasedLayoutProps {
  children: React.ReactNode;
  allowedRoles?: ("publisher" | "advertiser")[];
}

export function RoleBasedLayout({ 
  children,
  allowedRoles 
}: RoleBasedLayoutProps) {
  const { loading, role, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      // Check if current path is a shared route
      const isSharedRoute = SHARED_ROUTES.some(route => 
        pathname === route || pathname.startsWith(`${route}/`)
      );

      // Only enforce role restrictions on non-shared routes when allowedRoles is specified
      if (!isSharedRoute && allowedRoles && !allowedRoles.includes(role as "publisher" | "advertiser")) {
        router.push("/unauthorized");
      }
    }
  }, [loading, isAuthenticated, role, pathname, router, allowedRoles]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}