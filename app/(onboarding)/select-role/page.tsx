"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { LoadingPage } from "@/components/loading";
import RoleSelectContent from "../_components/role-select-content";

export default function RoleSelectPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: userId ?? "",
  });

  useEffect(() => {
    if (!isLoaded) return;

    if (!userId) {
      router.push("/sign-in");
      return;
    }

    if (user?.role) {
      const path = user.onboardingComplete
        ? user.role === "publisher"
          ? "/dashboard/offers/publisher"
          : "/dashboard/offers"
        : user.role === "publisher"
          ? "/publisher-onboarding"
          : "/advertiser-onboarding";
      router.push(path);
    }
  }, [isLoaded, userId, user, router]);

  if (!isLoaded || user === undefined) {
    return <LoadingPage />;
  }

  // Only show role selection if user has no role
  if (!user?.role) {
    return <RoleSelectContent />;
  }

  // Return null while redirecting
  return null;
}
