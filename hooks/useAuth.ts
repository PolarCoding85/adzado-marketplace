// hooks/useAuth.ts
import { useConvexAuth } from "convex/react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();

  // Get user data from Convex
  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: isAuthenticated ? "me" : "",
  });

  const loading = isLoading || user === undefined;
  const role = user?.role as "publisher" | "advertiser" | undefined;
  const onboardingComplete = user?.onboardingComplete ?? false;

  const checkAuth = () => {
    if (!isLoading && !isAuthenticated) {
      router.push("/sign-in");
      return;
    }

    if (isAuthenticated && !role) {
      router.push("/select-role");
      return;
    }

    if (isAuthenticated && role && !onboardingComplete) {
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
    role,
    loading,
    isAuthenticated,
    onboardingComplete,
    checkAuth,
  };
}