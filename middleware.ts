// middleware.ts

import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Initialize Convex HTTP client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const routeConfig = {
  publisher: {
    allowed: [
      "/dashboard",
      "/dashboard/analytics",
      "/dashboard/offers/publisher",
      "/dashboard/offers/applications",
      "/dashboard/payouts",
      "/dashboard/settings",
      "/publisher-onboarding",  // Added onboarding route
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
      "/advertiser-onboarding",  // Added onboarding route
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
  "/offers",
  "/premium",
  "/advertisers",
  "/publishers",
  "/resources",
  "/gamification",
  "/about",
  "/contact",
  "/careers",
  "/privacy",
  "/terms",
  "/cookies",
  "/disclaimer",
  "/api/webhooks/clerk",
  "/auth",
  "/unauthorized",
  "/not-found",
  "/sign-up/verify-email-address",
  "/select-role",
];

async function getUserData(clerkUserId: string) {
  try {
    return await convex.query(api.users.getUserByClerkId, {
      clerkId: clerkUserId,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const path = req.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }

  // Handle unauthenticated users
  if (!userId) {
    const isAuthRoute =
      path.startsWith("/sign-in") || path.startsWith("/sign-up");
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  // Get user data
  const userData = await getUserData(userId);
  const role = userData?.role as "publisher" | "advertiser" | undefined;
  const onboardingComplete = userData?.onboardingComplete ?? false;

  // Early check for /select-role page
  if (path === "/select-role") {
    if (role) {
      // If user has role, redirect based on onboarding status
      if (onboardingComplete) {
        const dashboardUrl =
          role === "publisher"
            ? routeConfig.publisher.redirect
            : routeConfig.advertiser.redirect;
        return NextResponse.redirect(new URL(dashboardUrl, req.url));
      } else {
        const onboardingUrl =
          role === "publisher"
            ? routeConfig.publisher.onboarding
            : routeConfig.advertiser.onboarding;
        return NextResponse.redirect(new URL(onboardingUrl, req.url));
      }
    }
    return NextResponse.next();
  }

  // Handle users without a role
  if (!role && !path.startsWith("/select-role")) {
    return NextResponse.redirect(new URL("/select-role", req.url));
  }

  // Handle onboarding routes
  const isOnboardingRoute =
    path === "/publisher-onboarding" || path === "/advertiser-onboarding";

  if (isOnboardingRoute) {
    if (onboardingComplete) {
      const dashboardUrl =
        role === "publisher"
          ? routeConfig.publisher.redirect
          : routeConfig.advertiser.redirect;
      return NextResponse.redirect(new URL(dashboardUrl, req.url));
    }

    if (role) {
      const correctOnboardingRoute =
        role === "publisher"
          ? routeConfig.publisher.onboarding
          : routeConfig.advertiser.onboarding;
      if (path !== correctOnboardingRoute) {
        return NextResponse.redirect(new URL(correctOnboardingRoute, req.url));
      }
      return NextResponse.next();  // Allow access to correct onboarding route
    }
  }

  // Redirect to onboarding if not completed
  if (role && !onboardingComplete && !isOnboardingRoute) {
    const onboardingRoute =
      role === "publisher"
        ? routeConfig.publisher.onboarding
        : routeConfig.advertiser.onboarding;
    return NextResponse.redirect(new URL(onboardingRoute, req.url));
  }

  // Role-based access control
  if (role === "publisher") {
    const isAllowed = routeConfig.publisher.allowed.some(
      (route) => path === route || path.startsWith(`${route}/`)
    );
    if (!isAllowed) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  if (role === "advertiser") {
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