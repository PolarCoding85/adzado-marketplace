// types/publisher.ts

import { IndustryType, SubIndustryItem } from "./advertiser";

export type PublisherFormData = {
  // Personal Information
  firstName: string;
  lastName: string;
  phoneNumber: string;

  // Company Information
  hasCompany: boolean;
  companyName: string;
  taxId: string;
  companyWebsite: string;

  // Industry Selection
  industries: string[];
  subIndustries: string[];

  // Marketing Methods
  marketingMethods: string[];

  // Lead Generation
  leadTypes: string[];
  dailyLeadVolume: string;

  // Additional Information
  certifications: string[];
  additionalInfo?: string;
};

export type PublisherStepProps = {
  data: PublisherFormData;
  updateFields: (fields: Partial<PublisherFormData>) => void;
};

export interface MarketingMethodsProps {
  selectedMethods: string[];
  onMethodChange: (methods: string[]) => void;
}