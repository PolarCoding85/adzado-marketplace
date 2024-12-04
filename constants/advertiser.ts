// constants/advertiser.ts

import { SubIndustriesType, IndustryType } from "@/types/advertiser";

export const FORM_STEPS = [
  {
    title: "Tell us about yourself",
    description: "Start with your basic information"
  },
  {
    title: "Tell us about your business",
    description: "Help us understand your company"
  },
  {
    title: "What industries are you targeting?",
    description: "Select your target markets"
  },
  {
    title: "Lead preferences",
    description: "Define your ideal leads"
  },
  {
    title: "Campaign details",
    description: "Set your campaign parameters"
  }
];

export const INDUSTRIES = [
  { value: "home-services", label: "Home Services" },
  { value: "insurance", label: "Insurance" },
  { value: "travel", label: "Travel" },
  { value: "finance", label: "Finance" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "legal", label: "Legal" },
];

export const SUB_INDUSTRIES: SubIndustriesType = {
  "home-services": [
    { value: "plumbing", label: "Plumbing" },
    { value: "hvac", label: "HVAC" },
    { value: "roofing", label: "Roofing" },
    { value: "electrical", label: "Electrical" },
  ],
  insurance: [
    { value: "auto", label: "Auto Insurance" },
    { value: "home", label: "Home Insurance" },
    { value: "life", label: "Life Insurance" },
    { value: "health", label: "Health Insurance" },
  ],
};

export const LEAD_PREFERENCES = [
  { value: "data-leads", label: "Data Leads" },
  { value: "inbound-calls", label: "Inbound Phone Calls" },
  { value: "live-transfers", label: "Live Transfers" },
  { value: "form-fills", label: "Form Fills" },
  { value: "appointments", label: "Appointments" },
];

export const COMMON_JOB_TITLES = [
  { value: "marketing-manager", label: "Marketing Manager" },
  { value: "marketing-director", label: "Marketing Director" },
  { value: "cmo", label: "Chief Marketing Officer" },
  { value: "digital-marketing-manager", label: "Digital Marketing Manager" },
  { value: "media-buyer", label: "Media Buyer" },
  { value: "growth-manager", label: "Growth Manager" },
  { value: "acquisition-manager", label: "Acquisition Manager" },
  { value: "business-owner", label: "Business Owner" },
  { value: "ceo", label: "CEO" },
  { value: "founder", label: "Founder" },
];

export const COMPANY_SIZES = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

export const MONTHLY_BUDGET_RANGES = [
  { value: "1-5k", label: "$1,000 - $5,000" },
  { value: "5-10k", label: "$5,000 - $10,000" },
  { value: "10-25k", label: "$10,000 - $25,000" },
  { value: "25-50k", label: "$25,000 - $50,000" },
  { value: "50k+", label: "$50,000+" },
];