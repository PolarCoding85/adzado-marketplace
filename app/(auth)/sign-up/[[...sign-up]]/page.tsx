// app/(auth)/sign-up/[[...sign-up]]/page.tsx

"use client";

import React, { useState } from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useSignUp } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";

export default function SignUpPage() {
  const [selectedRole, setSelectedRole] = useState<
    "publisher" | "advertiser" | null
  >(null);
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const updateUserRole = useMutation(api.users.updateUserRole);

  // Create a submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) {
      return;
    }

    if (!selectedRole) {
      throw new Error("Please select a role before continuing");
    }

    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      // 1. Create the user in Clerk
      const result = await signUp.create({
        emailAddress: formData.get("emailAddress") as string,
        password: formData.get("password") as string,
      });

      if (result.status === "complete") {
        // 2. Update the role in Convex
        await updateUserRole({
          clerkUserId: result.createdUserId!,
          role: selectedRole,
        });

        // 3. Redirect to the appropriate onboarding page
        const onboardingPath =
          selectedRole === "publisher"
            ? "/publisher-onboarding"
            : "/advertiser-onboarding";
        router.push(onboardingPath);
      } else {
        // Handle verification steps if needed
        console.log("Additional verification steps needed");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      throw new Error("Failed to sign up. Please try again.");
    }
  };

  if (!isLoaded) {
    return null; // Or a loading spinner
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
        <svg
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
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
            <linearGradient
              id="fillGradient1"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient
              id="fillGradient2"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.03" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <SignUp.Root routing="path">
          <SignUp.Step name="start">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-col space-y-2 text-center"
            >
              <h1 className="gradient-heading text-3xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Choose your role to get started
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 grid gap-6"
            >
              <div className="grid gap-4">
                <Card
                  className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                    selectedRole === "publisher"
                      ? "border-blue-500 shadow-lg"
                      : ""
                  }`}
                  onClick={() => setSelectedRole("publisher")}
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-semibold">Publisher</h3>
                    <p className="text-sm text-muted-foreground">
                      I want to monetize my content and grow my audience
                    </p>
                  </div>
                </Card>

                <Card
                  className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                    selectedRole === "advertiser"
                      ? "border-blue-500 shadow-lg"
                      : ""
                  }`}
                  onClick={() => setSelectedRole("advertiser")}
                >
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-semibold">Advertiser</h3>
                    <p className="text-sm text-muted-foreground">
                      I want to promote my products and reach new customers
                    </p>
                  </div>
                </Card>
              </div>

              {selectedRole && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <Clerk.Connection
                    name="google"
                    className="inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                      className="size-4"
                    >
                      <g clipPath="url(#a)">
                        <path
                          fill="currentColor"
                          d="M8.32 7.28v2.187h5.227c-.16 1.226-.57 2.124-1.192 2.755-.764.765-1.955 1.6-4.035 1.6-3.218 0-5.733-2.595-5.733-5.813 0-3.218 2.515-5.814 5.733-5.814 1.733 0 3.005.685 3.938 1.565l1.538-1.538C12.498.96 10.756 0 8.32 0 3.91 0 .205 3.591.205 8s3.706 8 8.115 8c2.382 0 4.178-.782 5.582-2.24 1.44-1.44 1.893-3.475 1.893-5.111 0-.507-.035-.978-.115-1.369H8.32Z"
                        />
                      </g>
                    </svg>
                    Sign up with Google
                  </Clerk.Connection>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with email
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Clerk.Field name="emailAddress">
                      <Clerk.Label className="text-sm font-medium leading-none">
                        Email
                      </Clerk.Label>
                      <Clerk.Input className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                      <Clerk.FieldError className="text-sm text-red-500" />
                    </Clerk.Field>

                    <Clerk.Field name="password">
                      <Clerk.Label className="text-sm font-medium leading-none">
                        Password
                      </Clerk.Label>
                      <Clerk.Input className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                      <Clerk.FieldError className="text-sm text-red-500" />
                    </Clerk.Field>

                    {/* CAPTCHA element */}
                    <div id="clerk-captcha" className="my-4"></div>

                    <SignUp.Action
                      submit
                      onClick={handleSubmit}
                      className="inline-flex w-full items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 text-neutral-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 h-10 px-4 py-2"
                    >
                      Sign Up
                    </SignUp.Action>
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-center text-sm text-muted-foreground"
            >
              Already have an account?{" "}
              <Clerk.Link
                navigate="sign-in"
                className="text-blue-500 underline-offset-4 hover:underline"
              >
                Sign in
              </Clerk.Link>
            </motion.p>
          </SignUp.Step>
        </SignUp.Root>
      </div>
    </div>
  );
}
