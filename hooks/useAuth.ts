// hooks/useAuth.ts

import { useAuth as useClerkAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { userId, isLoaded, isSignedIn } = useClerkAuth();
  const router = useRouter();

  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: userId ?? "",
  });

  const loading = !isLoaded || user === undefined;
  const role = user?.role as "publisher" | "advertiser" | undefined;
  const onboardingComplete = user?.onboardingComplete ?? false;

  const checkAuth = () => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in");
      return;
    }

    if (isSignedIn && !role) {
      router.push("/select-role");
      return;
    }

    if (isSignedIn && role && !onboardingComplete) {
      const onboardingPath =
        role === "publisher"
          ? "/publisher-onboarding"
          : "/advertiser-onboarding";
      router.push(onboardingPath);
      return;
    }
  };

  return {
    user,
    userId,
    role,
    loading,
    isSignedIn,
    onboardingComplete,
    checkAuth,
  };
}
