// providers/providers.tsx

"use client";

import {
  Authenticated,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
const convex = new ConvexReactClient(convexUrl);

// Provider for Convex and Clerk
export default function SystemProviders({
  children,
}: ConvexClientProviderProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>{children}</Unauthenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
