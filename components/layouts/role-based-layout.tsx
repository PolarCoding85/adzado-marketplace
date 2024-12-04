// components/layouts/role-based-layout.tsx

"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/components/loading";
import { SideNav } from "@/components/dashboard/side-nav";
import { TopNav } from "@/components/dashboard/top-nav";

interface RoleBasedLayoutProps {
  children: React.ReactNode;
}

export function RoleBasedLayout({ children }: RoleBasedLayoutProps) {
  const { loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
