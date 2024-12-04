// app/(onboarding)/publisher-onboarding/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Import step components
import { PersonalInfoStep } from "../_components/publisher-steps/personal-info-step";
import { CompanyInfoStep } from "../_components/publisher-steps/company-info-step";
import { IndustrySelectionStep } from "../_components/publisher-steps/industry-selection-step";
import { MarketingMethodsStep } from "../_components/publisher-steps/marketing-methods-step";
import { LeadGenerationStep } from "../_components/publisher-steps/lead-generation-step";
import { AdditionalInfoStep } from "../_components/publisher-steps/additional-info-step";

// Import types and constants
import { PublisherFormData } from "@/types/publisher";
import { FORM_STEPS } from "@/constants/publisher";

const INITIAL_DATA: PublisherFormData = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  hasCompany: false,
  companyName: "",
  taxId: "",
  website: "",
  industries: [],
  subIndustries: [],
  marketingMethods: [],
  leadTypes: [],
  dailyLeadVolume: "",
  certifications: [],
  additionalInfo: "",
};

export default function PublisherOnboardingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const saveOnboarding = useMutation(api.users.savePublisherOnboarding);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PublisherFormData>(INITIAL_DATA);

  function updateFields(fields: Partial<PublisherFormData>) {
    setFormData(prev => ({ ...prev, ...fields }));
  }

  const steps = [
    <PersonalInfoStep key="personal" {...{ data: formData, updateFields }} />,
    <CompanyInfoStep key="company" {...{ data: formData, updateFields }} />,
    <IndustrySelectionStep key="industry" {...{ data: formData, updateFields }} />,
    <MarketingMethodsStep key="marketing" {...{ data: formData, updateFields }} />,
    <LeadGenerationStep key="leads" {...{ data: formData, updateFields }} />,
    <AdditionalInfoStep key="additional" {...{ data: formData, updateFields }} />,
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < steps.length) {
      setStep(step + 1);
      return;
    }

    if (!userId) {
      toast.error("No user ID found. Please try signing in again.");
      return;
    }

    setIsLoading(true);

    try {
      await saveOnboarding({
        clerkUserId: userId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        hasCompany: formData.hasCompany,
        companyName: formData.hasCompany ? formData.companyName : undefined,
        taxId: formData.hasCompany ? formData.taxId : undefined,
        website: formData.website,
        industries: formData.industries,
        subIndustries: formData.subIndustries,
        marketingMethods: formData.marketingMethods,
        leadTypes: formData.leadTypes,
        dailyLeadVolume: formData.dailyLeadVolume,
        certifications: formData.certifications,
        additionalInfo: formData.additionalInfo,
        onboardingComplete: true,
      });

      toast.success("Profile completed successfully!");
      router.push("/dashboard/offers/publisher");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]"
      >
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
            Complete Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            {FORM_STEPS[step - 1].title}
          </p>
        </motion.div>

        <Card className="p-6 border-white/5 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {steps[step - 1]}

            <div className="flex gap-3">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-lg flex-1"
                  onClick={() => setStep(step - 1)}
                >
                  Back
                </Button>
              )}
              <Button
                type="submit"
                className="rounded-lg flex-1"
                disabled={isLoading}
              >
                {step < steps.length
                  ? "Continue"
                  : isLoading
                  ? "Completing Setup..."
                  : "Complete Setup"}
              </Button>
            </div>
          </form>
        </Card>

        {/* Progress indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center space-x-2"
        >
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                step === i + 1 ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}