// app/(auth)/sign-in/[[...sign-in]]/page.tsx

"use client";

import React from "react";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { motion } from "framer-motion";

export default function SignInPage() {
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
        <SignIn.Root>
          <SignIn.Step name="start">
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
                <mask
                  id="a"
                  width="40"
                  height="40"
                  x="0"
                  y="0"
                  maskUnits="userSpaceOnUse"
                >
                  <circle cx="20" cy="20" r="20" fill="#D9D9D9" />
                </mask>
                <g fill="#0A0A0A" mask="url(#a)">
                  <path d="M43.5 3a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V2ZM43.5 8a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46V7ZM43.5 13a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 18a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1ZM43.5 23a.5.5 0 0 0 0-1v1Zm0-1h-46v1h46v-1Z" />
                  <path d="M27 3.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2ZM25 8.5a1 1 0 1 0 0-2v2Zm0-2h-46v2h46v-2Z" />
                </g>
              </svg>
              <h1 className="gradient-heading text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email to sign in to your account
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 grid gap-6"
            >
              <Clerk.GlobalError className="text-sm text-red-600" />
              <div className="grid gap-2">
                <Clerk.Field name="identifier">
                  <Clerk.Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email
                  </Clerk.Label>
                  <Clerk.Input
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="flex h-10 w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800"
                  />
                  <Clerk.FieldError className="text-sm text-red-500" />
                </Clerk.Field>
              </div>

              <SignIn.Action
                submit
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 text-neutral-50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 h-10 px-4 py-2"
              >
                Sign In
              </SignIn.Action>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

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
                Sign in with Google
              </Clerk.Connection>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-4 text-center text-sm"
            >
              <p className="text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Clerk.Link
                  navigate="sign-up"
                  className="text-blue-500 underline-offset-4 hover:underline"
                >
                  Sign up
                </Clerk.Link>
              </p>
            </motion.div>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="email_code">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex flex-col space-y-2 text-center">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    Check your email
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    We sent a code to <SignIn.SafeIdentifier />
                  </p>
                </div>

                <div className="grid gap-4">
                  <Clerk.Field name="code">
                    <Clerk.Label className="sr-only">Email code</Clerk.Label>
                    <Clerk.Input
                      type="otp"
                      required
                      placeholder="Enter code"
                      className="flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Clerk.FieldError className="mt-2 text-sm text-red-500" />
                  </Clerk.Field>

                  <SignIn.Action
                    submit
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 h-10 px-4 py-2"
                  >
                    Continue
                  </SignIn.Action>
                </div>
              </motion.div>
            </SignIn.Strategy>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
