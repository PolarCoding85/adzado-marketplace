// schemas/publisher-validation.ts

import { z } from "zod";
import { MARKETING_METHODS, LEAD_TYPES, DAILY_LEAD_VOLUMES, CERTIFICATIONS } from "@/constants/publisher";
import { INDUSTRIES, SUB_INDUSTRIES } from "@/constants/advertiser";

// Helper functions
const isValidMarketingMethod = (value: string) => 
  MARKETING_METHODS.some(method => method.value === value);

const isValidLeadType = (value: string) => 
  LEAD_TYPES.some(type => type.value === value);

const isValidIndustry = (value: string) => 
  INDUSTRIES.some(industry => industry.value === value);

const isValidSubIndustry = (value: string) => 
  Object.values(SUB_INDUSTRIES).flat().some(industry => industry.value === value);

const isValidDailyVolume = (value: string) => 
  DAILY_LEAD_VOLUMES.some(volume => volume.value === value);

const isValidCertification = (value: string) => 
  CERTIFICATIONS.some(cert => cert.value === value);

// Base schema objects (without z.object wrapper)
const personalInfoBase = {
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")
    .optional()
    .or(z.literal("")),
};

const companyInfoBase = {
  hasCompany: z.boolean(),
  companyName: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .optional()
    .nullable(),
  taxId: z.string()
    .regex(/^\d{2}-?\d{7}$/, "Invalid Tax ID format (XX-XXXXXXX)")
    .optional()
    .nullable(),
    companyWebsite: z.string()
    .regex(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, "Invalid website URL")
    .optional()
    .nullable(),
};

const industrySelectionBase = {
  industries: z.array(z.string())
    .min(1, "Select at least one industry")
    .refine(arr => arr.every(isValidIndustry), "Invalid industry selection"),
  subIndustries: z.array(z.string())
    .refine(arr => arr.every(isValidSubIndustry), "Invalid sub-industry selection"),
};

const marketingMethodsBase = {
  marketingMethods: z.array(z.string())
    .min(1, "Select at least one marketing method")
    .refine(arr => arr.every(isValidMarketingMethod), "Invalid marketing method"),
};

const leadGenerationBase = {
  leadTypes: z.array(z.string())
    .min(1, "Select at least one lead type")
    .refine(arr => arr.every(isValidLeadType), "Invalid lead type"),
  dailyLeadVolume: z.string()
    .refine(isValidDailyVolume, "Invalid daily lead volume selection"),
};

const additionalInfoBase = {
  certifications: z.array(z.string())
    .refine(arr => arr.every(isValidCertification), "Invalid certification")
    .optional()
    .default([]),
  additionalInfo: z.string()
    .max(1000, "Additional information must be less than 1000 characters")
    .optional()
    .nullable(),
};

// Step schemas
export const personalInfoSchema = z.object(personalInfoBase);

export const companyInfoSchema = z.object(companyInfoBase)
  .superRefine((data, ctx) => {
    if (data.hasCompany) {
      if (!data.companyName || data.companyName.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Company name is required when you have a registered business",
          path: ["companyName"],
        });
      }
      if (!data.taxId || data.taxId.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Tax ID is required when you have a registered business",
          path: ["taxId"],
        });
      }
    }
  });

export const industrySelectionSchema = z.object(industrySelectionBase);
export const marketingMethodsSchema = z.object(marketingMethodsBase);
export const leadGenerationSchema = z.object(leadGenerationBase);
export const additionalInfoSchema = z.object(additionalInfoBase);

// Complete schema for final validation
export const publisherOnboardingSchema = z.object({
  ...personalInfoBase,
  ...companyInfoBase,
  ...industrySelectionBase,
  ...marketingMethodsBase,
  ...leadGenerationBase,
  ...additionalInfoBase,
}).superRefine((data, ctx) => {
  if (data.hasCompany) {
    if (!data.companyName || data.companyName.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Company name is required when you have a registered business",
        path: ["companyName"],
      });
    }
    if (!data.taxId || data.taxId.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tax ID is required when you have a registered business",
        path: ["taxId"],
      });
    }
  }
});

// Export step schemas for individual step validation
export const stepSchemas = {
  1: personalInfoSchema,
  2: companyInfoSchema,
  3: industrySelectionSchema,
  4: marketingMethodsSchema,
  5: leadGenerationSchema,
  6: additionalInfoSchema,
} as const;

// Type inference
export type PublisherOnboardingSchema = z.infer<typeof publisherOnboardingSchema>;