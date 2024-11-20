import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

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
  },
}

export function middleware(request: NextRequest) {
  // Get user role and authentication status
  const role = request.cookies.get("userRole")?.value
  const isAuthenticated = request.cookies.get("authToken")?.value // Replace with your auth implementation

  // Get the requested path
  const path = request.nextUrl.pathname

  // Handle authentication
  if (path.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    if (!role) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    // Role-based access control
    if (role === "publisher") {
      // Check if the path is allowed for publishers
      const isAllowed = routeConfig.publisher.allowed.some(
        (route) => path === route || path.startsWith(`${route}/`)
      )

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }

      // Redirect from generic offers page to publisher offers
      if (path === "/dashboard/offers") {
        return NextResponse.redirect(
          new URL(routeConfig.publisher.redirect, request.url)
        )
      }
    }

    if (role === "advertiser") {
      // Check if the path is allowed for advertisers
      const isAllowed = routeConfig.advertiser.allowed.some(
        (route) => path === route || path.startsWith(`${route}/`)
      )

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    }
  }

  // Protect onboarding routes
  if (path.includes("onboarding")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", request.url))
    }

    // Ensure users access the correct onboarding flow
    if (path === "/publisher-onboarding" && role !== "publisher") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }

    if (path === "/advertiser-onboarding" && role !== "advertiser") {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (
    (path.startsWith("/sign-in") || path.startsWith("/sign-up")) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/publisher-onboarding",
    "/advertiser-onboarding",
    "/sign-in",
    "/sign-up",
    "/unauthorized",
  ],
}
