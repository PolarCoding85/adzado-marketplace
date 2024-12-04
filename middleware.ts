import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Define route configurations
const routeConfig = {
  publisher: {
    allowed: [
      "/dashboard",
      "/dashboard/analytics",
      "/dashboard/offers/publisher",
      "/dashboard/offers/applications",
      "/dashboard/payouts",
      "/dashboard/settings",
    ],
    redirect: "/dashboard/offers/publisher",
    onboarding: "/publisher-onboarding",
  },
  advertiser: {
    allowed: [
      "/dashboard",
      "/dashboard/analytics",
      "/dashboard/offers",
      "/dashboard/requests",
      "/dashboard/company",
      "/dashboard/billing",
      "/dashboard/settings",
    ],
    redirect: "/dashboard/offers",
    onboarding: "/advertiser-onboarding",
  },
};

// Define public routes that don't require authentication
const publicRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhooks/clerk",
  "/auth",
  "/unauthorized",
  "/not-found",
  "/sign-up/verify-email-address", // Add this to support email verification
];

// Initialize Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Helper function to get user data from Convex
async function getUserData(clerkUserId: string) {
  try {
    const userData = await convex.query(api.users.getUserByClerkId, {
      clerkId: clerkUserId,
    });
    return userData;
  } catch (error) {
    console.error("Error fetching user data from Convex:", error);
    return null;
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  // Allow public routes and sign-in/sign-up flows
  if (publicRoutes.includes(path) || path.startsWith("/sign-up/")) {
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!userId && !path.startsWith("/sign-in")) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated, get their data from Convex
  const userData = userId ? await getUserData(userId) : null;
  const role = userData?.role as "publisher" | "advertiser" | undefined;
  const onboardingComplete = userData?.onboardingComplete;

  // Handle users without a role
  if (!role && userId && !path.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  // Handle onboarding routes
  const isOnboardingRoute =
    path === "/publisher-onboarding" || path === "/advertiser-onboarding";

  if (isOnboardingRoute) {
    // If onboarding is complete, redirect to dashboard
    if (onboardingComplete && role) {
      const dashboardUrl =
        role === "publisher"
          ? routeConfig.publisher.redirect
          : routeConfig.advertiser.redirect;
      return NextResponse.redirect(new URL(dashboardUrl, req.url));
    }

    // Ensure users access the correct onboarding flow
    if (role) {
      const correctOnboardingRoute =
        role === "publisher"
          ? routeConfig.publisher.onboarding
          : routeConfig.advertiser.onboarding;

      if (path !== correctOnboardingRoute) {
        return NextResponse.redirect(new URL(correctOnboardingRoute, req.url));
      }
    }

    return NextResponse.next();
  }

  // Redirect to appropriate onboarding if not completed
  if (role && !onboardingComplete && !isOnboardingRoute) {
    const onboardingRoute =
      role === "publisher"
        ? routeConfig.publisher.onboarding
        : routeConfig.advertiser.onboarding;
    return NextResponse.redirect(new URL(onboardingRoute, req.url));
  }

  // Role-based access control
  if (role === "publisher") {
    // Check if the path is allowed for publishers
    const isAllowed = routeConfig.publisher.allowed.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    // Redirect from generic offers page to publisher offers
    if (path === "/dashboard/offers") {
      return NextResponse.redirect(
        new URL(routeConfig.publisher.redirect, req.url)
      );
    }
  }

  if (role === "advertiser") {
    // Check if the path is allowed for advertisers
    const isAllowed = routeConfig.advertiser.allowed.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );

    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
