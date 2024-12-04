// app/(onboarding)/select-role/page.tsx

'use client';

import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
import { Users, Building2, ShieldCheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function RoleSelectPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();
  const updateUserRole = useMutation(api.users.updateUserRole);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/sign-in');
    }
  }, [isLoaded, userId, router]);

  const handleRoleSelect = async (role: "publisher" | "advertiser") => {
    try {
      if (!userId) {
        throw new Error("No user ID found");
      }

      await updateUserRole({
        clerkUserId: userId,
        role: role,
      });

      const onboardingPath = role === "publisher" ? "/publisher-onboarding" : "/advertiser-onboarding";
      router.push(onboardingPath);
    } catch (error) {
      console.error("Error updating role:", error);
      throw new Error("Failed to set role. Please try again.");
    }
  };

  if (!isLoaded || !userId) {
    return null;
  }

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Graph SVG */}
      <motion.div
        className="absolute inset-0 z-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <svg viewBox="0 0 1000 400" preserveAspectRatio="none" className="h-full w-full">
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d="M0 300 Q 250 100 500 300 T 1000 300 L 1000 400 L 0 400 Z"
            fill="url(#fillGradient1)"
            stroke="url(#gradient1)"
            strokeWidth="2"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d="M0 350 Q 250 150 500 350 T 1000 350 L 1000 400 L 0 400 Z"
            fill="url(#fillGradient2)"
            stroke="url(#gradient2)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="fillGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="fillGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
        {/* Logo and Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col space-y-2 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 40 40"
            className="mx-auto size-10"
          >
            <mask id="a" width="40" height="40" x="0" y="0" maskUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
            </mask>
            <g fill="#0A0A0A" mask="url(#a)">
              <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
              <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
            </g>
          </svg>
          <h1 className="gradient-heading text-3xl font-bold tracking-tight">
            Choose Your Role
          </h1>
          <p className="text-sm text-muted-foreground">
            Select how you'll use the platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid gap-4"
        >
          {/* Publisher Card */}
          <div
            onClick={() => handleRoleSelect("publisher")}
            className="card-gradient group border-white/5 cursor-pointer rounded-lg p-6 transition-all hover:border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 hover:from-blue-500/20 hover:to-purple-500/20 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/10 p-3 group-hover:bg-white/20 transition-colors">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Publisher</h3>
                    <ShieldCheckIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Monetize your traffic
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/10">
                  Premium Rates
                </Badge>
                <Badge variant="secondary" className="bg-white/10">
                  Weekly Payouts
                </Badge>
                <Badge variant="secondary" className="bg-white/10">
                  45+ Active Offers
                </Badge>
              </div>
            </div>
          </div>

          {/* Advertiser Card */}
          <div
            onClick={() => handleRoleSelect("advertiser")}
            className="card-gradient group border-white/5 cursor-pointer rounded-lg p-6 transition-all hover:border-white/10 bg-gradient-to-r from-green-500/10 to-blue-500/10 hover:from-green-500/20 hover:to-blue-500/20 hover:scale-[1.02] hover:shadow-lg"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-white/10 p-3 group-hover:bg-white/20 transition-colors">
                  <Building2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">Advertiser</h3>
                    <ShieldCheckIcon className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Grow your business
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white/10">
                  Exclusive Leads
                </Badge>
                <Badge variant="secondary" className="bg-white/10">
                  Quality Guarantee
                </Badge>
                <Badge variant="secondary" className="bg-white/10">
                  Custom Campaigns
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}