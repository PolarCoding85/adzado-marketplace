// pages/publisher-onboarding.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DevTool } from "@hookform/devtools";

// Import step components
import { PersonalInfoStep } from "../_components/publisher-steps/personal-info-step";
import { CompanyInfoStep } from "../_components/publisher-steps/company-info-step";
import { IndustrySelectionStep } from "../_components/publisher-steps/industry-selection-step";
import { MarketingMethodsStep } from "../_components/publisher-steps/marketing-methods-step";
import { LeadGenerationStep } from "../_components/publisher-steps/lead-generation-step";
import { AdditionalInfoStep } from "../_components/publisher-steps/additional-info-step";

// Import types and validation
import {
  PublisherOnboardingSchema,
  publisherOnboardingSchema,
  stepSchemas,
} from "@/schemas/publisher-validation";
import { FORM_STEPS } from "@/constants/publisher";

type FieldNames = keyof PublisherOnboardingSchema;

const INITIAL_DATA: PublisherOnboardingSchema = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  hasCompany: false,
  companyName: "",
  taxId: "",
  companyWebsite: "",
  industries: [],
  subIndustries: [],
  marketingMethods: [],
  leadTypes: [],
  dailyLeadVolume: "",
  certifications: [],
  additionalInfo: "",
};

// Define field names for each step
const stepFields = {
  1: ["firstName", "lastName", "phoneNumber"],
  2: ["hasCompany", "companyName", "taxId", "companyWebsite"],
  3: ["industries", "subIndustries"],
  4: ["marketingMethods"],
  5: ["leadTypes", "dailyLeadVolume"],
  6: ["certifications", "additionalInfo"],
} as const;

export default function PublisherOnboardingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const saveOnboarding = useMutation(api.users.savePublisherOnboarding);

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with React Hook Form and ZOD validation
  const methods = useForm<PublisherOnboardingSchema>({
    resolver: async (values, context, options) => {
      // Only validate the current step's fields
      const currentStepSchema = stepSchemas[step as keyof typeof stepSchemas];
      const currentFields = stepFields[step as keyof typeof stepFields];
      
      try {
        // Extract only the current step's values
        const stepValues = currentFields.reduce(
          (acc, key) => ({
            ...acc,
            [key]: values[key as keyof typeof values],
          }),
          {}
        );

        await currentStepSchema.parseAsync(stepValues);
        return {
          values,
          errors: {},
        };
      } catch (error) {
        if (error instanceof z.ZodError) {
          return {
            values: {},
            errors: error.formErrors.fieldErrors,
          };
        }
        return {
          values: {},
          errors: {
            [currentFields[0]]: ["Validation failed"],
          },
        };
      }
    },
    defaultValues: INITIAL_DATA,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = methods;

  // Steps array with components
  const steps = [
    <PersonalInfoStep key="personal" />,
    <CompanyInfoStep key="company" />,
    <IndustrySelectionStep key="industry" />,
    <MarketingMethodsStep key="marketing" />,
    <LeadGenerationStep key="leads" />,
    <AdditionalInfoStep key="additional" />,
  ];

  // Validate current step fields
  const validateStep = async (data: PublisherOnboardingSchema) => {
    const currentStepSchema = stepSchemas[step as keyof typeof stepSchemas];
    const currentFields = stepFields[step as keyof typeof stepFields];

    try {
      // Extract only the current step's values
      const stepValues = currentFields.reduce(
        (acc, key) => ({
          ...acc,
          [key]: data[key as keyof typeof data],
        }),
        {}
      );

      await currentStepSchema.parseAsync(stepValues);
      return true;
    } catch (error) {
      console.log("Validation error:", error);
      return false;
    }
  };

  // Handle next step and form submission
  const onSubmit = async (data: PublisherOnboardingSchema) => {
    console.log("Form submitted", { step, data });
  
    if (step < steps.length) {
      const isStepValid = await validateStep(data);
      if (isStepValid) {
        setStep(step + 1);
      }
      return;
    }
  
    // Validate entire form before final submission
    try {
      await publisherOnboardingSchema.parseAsync(data);
    } catch (error) {
      console.error("Final validation failed:", error);
      toast.error("Please check all fields and try again.");
      return;
    }
  
    if (!userId) {
      toast.error("No user ID found. Please try signing in again.");
      return;
    }
  
    setIsLoading(true);

    try {
      // Clean the data by removing null values
      const cleanedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber || undefined,
        hasCompany: data.hasCompany,
        companyName: data.companyName || undefined,
        taxId: data.taxId || undefined,
        companyWebsite: data.companyWebsite || undefined,
        industries: data.industries,
        subIndustries: data.subIndustries,
        marketingMethods: data.marketingMethods,
        leadTypes: data.leadTypes,
        dailyLeadVolume: data.dailyLeadVolume,
        certifications: data.certifications || [],
        onboardingComplete: true,
      };

      await saveOnboarding({
        clerkUserId: userId,
        ...cleanedData,
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

  // Handle back button
  const handleBack = () => {
    setStep(step - 1);
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
          <h1 className="gradient-heading text-3xl font-bold tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            {FORM_STEPS[step - 1].title}
          </p>
        </motion.div>

        <Card className="p-6 border-white/5 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {steps[step - 1]}

              <div className="flex gap-3">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg flex-1"
                    onClick={handleBack}
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
          </FormProvider>
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

      {/* React Hook Form DevTools */}
      {/* <DevTool control={control} /> */}
    </div>
  );
}
