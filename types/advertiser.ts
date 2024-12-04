// types/advertiser.ts

export type IndustryType = "home-services" | "insurance" | "travel" | "finance" | "education" | "healthcare" | "legal";

export type SubIndustryItem = {
  value: string;
  label: string;
};

export type SubIndustriesType = {
  [K in IndustryType]?: SubIndustryItem[];
};

export type GeographyLevel = "global" | "country" | "state" | "city" | "postal";

export type Location = {
  id: string;
  type: GeographyLevel;
  value: string;
  label: string;
  parentId?: string;
};

export type AdvertiserFormData = {
  // Personal Information
  firstName: string;
  lastName: string;
  phoneNumber: string;
  jobTitle: string;

  // Company Information
  hasCompany: boolean;
  companyName: string;
  companyWebsite: string;
  companySize: string;

  // Industry and Targeting
  targetIndustries: string[];
  targetSubIndustries: string[];
  leadPreferences: string[];
  targetGeographies: string[];

  // Budget
  monthlyBudget: string;
  campaignGoals?: string;
};

export type FormStep = {
  title: string;
  description: string;
};

// Shared Component Props
export interface IndustrySelectProps {
  selectedIndustries: string[];
  onIndustryChange: (industries: string[]) => void;
  selectedSubIndustries: string[];
  onSubIndustryChange: (subIndustries: string[]) => void;
}

export interface StepProps {
  data: AdvertiserFormData;
  updateFields: (fields: Partial<AdvertiserFormData>) => void;
}