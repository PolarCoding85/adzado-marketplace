// hooks/useOnboarding.ts

import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";

export function useOnboarding() {
  const { userId } = useAuth();
  const router = useRouter();

  const user = useQuery(api.users.getUserByClerkId, {
    clerkId: userId ?? "",
  });

  const updateOnboardingStatus = useMutation(api.users.updateOnboardingStatus);

  const completeOnboarding = async () => {
    if (!userId) return;

    try {
      await updateOnboardingStatus({
        clerkUserId: userId,
        onboardingComplete: true,
      });

      // Redirect based on role
      if (user?.role === "publisher") {
        router.push("/dashboard/offers/publisher");
      } else {
        router.push("/dashboard/offers");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
    }
  };

  return {
    user,
    completeOnboarding,
    isLoading: user === undefined,
  };
}
