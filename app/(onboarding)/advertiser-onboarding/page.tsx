// app/(onboarding)/advertiser-onboarding/page.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { X, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

type GeographyLevel = "global" | "country" | "state" | "city" | "postal";
type Location = {
  id: string;
  type: GeographyLevel;
  value: string;
  label: string;
  parentId?: string;
};

export default function AdvertiserOnboardingPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const saveOnboarding = useMutation(api.users.saveAdvertiserOnboarding);

  // Form state
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Personal information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Company information
  const [hasCompany, setHasCompany] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companySize, setCompanySize] = useState("");

  // Industry and targeting
  const [targetIndustries, setTargetIndustries] = useState<string[]>([]);
  const [targetSubIndustries, setTargetSubIndustries] = useState<string[]>([]);
  const [leadPreferences, setLeadPreferences] = useState<string[]>([]);
  const [targetGeographies, setTargetGeographies] = useState<string[]>([]);

  // Budget
  const [monthlyBudget, setMonthlyBudget] = useState("");

  // Onboarding completion
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [subIndustriesOpen, setSubIndustriesOpen] = useState(false);
  const [jobTitleOpen, setJobTitleOpen] = useState(false);
  const [geoLevel, setGeoLevel] = useState<GeographyLevel>("global");
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
  const [locationSearchOpen, setLocationSearchOpen] = useState(false);

  // Sample data - you can expand these based on your needs
  const industries = [
    { value: "home-services", label: "Home Services" },
    { value: "insurance", label: "Insurance" },
    { value: "travel", label: "Travel" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "legal", label: "Legal" },
  ];

  const subIndustries: { [key: string]: { value: string; label: string }[] } = {
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

  const leadPreferencesList = [
    { value: "data-leads", label: "Data Leads" },
    { value: "inbound-calls", label: "Inbound Phone Calls" },
    { value: "live-transfers", label: "Live Transfers" },
    { value: "form-fills", label: "Form Fills" },
    { value: "appointments", label: "Appointments" },
  ];

  const geographiesList = [
    { value: "nationwide", label: "Nationwide" },
    { value: "northeast", label: "Northeast" },
    { value: "southeast", label: "Southeast" },
    { value: "midwest", label: "Midwest" },
    { value: "southwest", label: "Southwest" },
    { value: "west", label: "West Coast" },
    { value: "canada", label: "Canada" },
  ];

  const commonJobTitles = [
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
    { value: "marketing-specialist", label: "Marketing Specialist" },
    { value: "brand-manager", label: "Brand Manager" },
    { value: "demand-generation", label: "Demand Generation Manager" },
    { value: "performance-marketing", label: "Performance Marketing Manager" },
    { value: "advertising-manager", label: "Advertising Manager" },
  ];

  const sampleLocations: Location[] = [
    // Countries
    { id: "us", type: "country", value: "US", label: "United States" },
    { id: "ca", type: "country", value: "CA", label: "Canada" },
    // States
    {
      id: "us-ca",
      type: "state",
      value: "CA",
      label: "California",
      parentId: "us",
    },
    {
      id: "us-ny",
      type: "state",
      value: "NY",
      label: "New York",
      parentId: "us",
    },
    // Cities
    {
      id: "us-ca-sf",
      type: "city",
      value: "San Francisco",
      label: "San Francisco, CA",
      parentId: "us-ca",
    },
    {
      id: "us-ca-la",
      type: "city",
      value: "Los Angeles",
      label: "Los Angeles, CA",
      parentId: "us-ca",
    },
    // Postal Codes (sample)
    {
      id: "us-ca-94105",
      type: "postal",
      value: "94105",
      label: "94105 - San Francisco",
      parentId: "us-ca-sf",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (step < 5) {
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
        firstName,
        lastName,
        phoneNumber,
        jobTitle,
        hasCompany,
        companyName: hasCompany ? companyName : undefined,
        companyWebsite: hasCompany ? companyWebsite : undefined,
        companySize: hasCompany ? companySize : undefined,
        industries: targetIndustries,
        subIndustries: targetSubIndustries,
        leadPreferences,
        targetGeographies,
        monthlyBudget,
        onboardingComplete: true,
      });

      toast.success("Profile completed successfully!");
      router.push("/dashboard/offers");
    } catch (error) {
      console.error("Error saving onboarding data:", error);
      toast.error("Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getStepTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Tell us about yourself";
      case 2:
        return "Tell us about your business";
      case 3:
        return "What industries are you targeting?";
      case 4:
        return "Lead preferences";
      case 5:
        return "Campaign details";
      default:
        return "";
    }
  };

  return (
    <div className="relative flex min-h-screen w-screen flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated Background */}
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
          {/* Logo */}
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
          <p className="text-sm text-muted-foreground">{getStepTitle(step)}</p>
        </motion.div>

        <Card className="p-6 border-white/5 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="rounded-lg bg-white/5 border-white/10 focus:border-blue-500/50"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="rounded-lg bg-white/5 border-white/10 focus:border-blue-500/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="rounded-lg bg-white/5 border-white/10 focus:border-blue-500/50"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-start text-left font-normal"
                      >
                        {jobTitle || "Select job title..."}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Search job title..." />
                        <CommandList>
                          <CommandEmpty>No job title found.</CommandEmpty>
                          <CommandGroup>
                            {commonJobTitles.map((title) => (
                              <CommandItem
                                key={title.value}
                                onSelect={() => setJobTitle(title.label)}
                              >
                                {title.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            ) : step === 2 ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasCompany"
                    checked={hasCompany}
                    onCheckedChange={(checked) =>
                      setHasCompany(checked as boolean)
                    }
                  />
                  <Label htmlFor="hasCompany">I'm representing a company</Label>
                </div>

                {hasCompany && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="rounded-lg"
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Company Website</Label>
                      <Input
                        id="website"
                        type="url"
                        value={companyWebsite}
                        onChange={(e) => setCompanyWebsite(e.target.value)}
                        className="rounded-lg"
                        placeholder="https://example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companySize">Company Size</Label>
                      <Select
                        value={companySize}
                        onValueChange={setCompanySize}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-500">
                            201-500 employees
                          </SelectItem>
                          <SelectItem value="500+">500+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : step === 3 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Industries You Want to Target</Label>
                    <Popover
                      open={industriesOpen}
                      onOpenChange={setIndustriesOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-start text-left font-normal"
                        >
                          <span className="text-muted-foreground">
                            {targetIndustries.length > 0
                              ? `${targetIndustries.length} selected`
                              : "Search industries..."}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0 w-[400px]" align="start">
                        <Command shouldFilter={true}>
                          <CommandInput placeholder="Search industries..." />
                          <CommandList>
                            <CommandEmpty>No industry found.</CommandEmpty>
                            <CommandGroup>
                              {industries.map((industry) => (
                                <CommandItem
                                  key={industry.value}
                                  onSelect={() => {
                                    if (
                                      !targetIndustries.includes(industry.value)
                                    ) {
                                      setTargetIndustries([
                                        ...targetIndustries,
                                        industry.value,
                                      ]);
                                    }
                                    setIndustriesOpen(false);
                                  }}
                                >
                                  <div className="flex items-center justify-between w-full">
                                    {industry.label}
                                    {targetIndustries.includes(
                                      industry.value
                                    ) && (
                                      <Check className="h-4 w-4 text-primary" />
                                    )}
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {targetIndustries.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {targetIndustries.map((industryValue) => {
                          const industry = industries.find(
                            (i) => i.value === industryValue
                          );
                          return (
                            <Badge
                              key={industryValue}
                              variant="secondary"
                              className="px-3 py-1"
                            >
                              {industry?.label}
                              <button
                                type="button"
                                className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setTargetIndustries(
                                    targetIndustries.filter(
                                      (i) => i !== industryValue
                                    )
                                  );
                                }}
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove</span>
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {targetIndustries.length > 0 && (
                    <div className="space-y-2">
                      <Label>Sub-Industries</Label>
                      <Popover
                        open={subIndustriesOpen}
                        onOpenChange={setSubIndustriesOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full justify-start text-left font-normal"
                          >
                            <span className="text-muted-foreground">
                              {targetSubIndustries.length > 0
                                ? `${targetSubIndustries.length} selected`
                                : "Search sub-industries..."}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-[400px]" align="start">
                          <Command shouldFilter={true}>
                            <CommandInput placeholder="Search sub-industries..." />
                            <CommandList>
                              <CommandEmpty>
                                No sub-industry found.
                              </CommandEmpty>
                              {targetIndustries.map((industry) => (
                                <CommandGroup
                                  key={industry}
                                  heading={
                                    industries.find((i) => i.value === industry)
                                      ?.label || ""
                                  }
                                >
                                  {(subIndustries[industry] || []).map(
                                    (subIndustry) => (
                                      <CommandItem
                                        key={subIndustry.value}
                                        onSelect={() => {
                                          if (
                                            !targetSubIndustries.includes(
                                              subIndustry.value
                                            )
                                          ) {
                                            setTargetSubIndustries([
                                              ...targetSubIndustries,
                                              subIndustry.value,
                                            ]);
                                          }
                                          setSubIndustriesOpen(false);
                                        }}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          {subIndustry.label}
                                          {targetSubIndustries.includes(
                                            subIndustry.value
                                          ) && (
                                            <Check className="h-4 w-4 text-primary" />
                                          )}
                                        </div>
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              ))}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {targetSubIndustries.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {targetSubIndustries.map((subIndustryValue) => {
                            const subIndustry = Object.values(subIndustries)
                              .flat()
                              .find((i) => i.value === subIndustryValue);
                            return (
                              <Badge
                                key={subIndustryValue}
                                variant="secondary"
                                className="px-3 py-1"
                              >
                                {subIndustry?.label}
                                <button
                                  type="button"
                                  className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setTargetSubIndustries(
                                      targetSubIndustries.filter(
                                        (i) => i !== subIndustryValue
                                      )
                                    );
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                  <span className="sr-only">Remove</span>
                                </button>
                              </Badge>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : step === 4 ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Preferred Lead Types</Label>
                    <div className="flex flex-wrap gap-2">
                      {leadPreferencesList.map((type) => (
                        <Badge
                          key={type.value}
                          variant={
                            leadPreferences.includes(type.value)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => {
                            if (leadPreferences.includes(type.value)) {
                              setLeadPreferences(
                                leadPreferences.filter((t) => t !== type.value)
                              );
                            } else {
                              setLeadPreferences([
                                ...leadPreferences,
                                type.value,
                              ]);
                            }
                          }}
                        >
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Geographic Targeting</Label>
                      <Select
                        value={geoLevel}
                        onValueChange={(value) => {
                          setGeoLevel(value as GeographyLevel);
                          setSelectedLocations([]);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select targeting level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="global">
                            Global (All Locations)
                          </SelectItem>
                          <SelectItem value="country">Country Level</SelectItem>
                          <SelectItem value="state">
                            State/Province Level
                          </SelectItem>
                          <SelectItem value="city">City Level</SelectItem>
                          <SelectItem value="postal">
                            Postal Code Level
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {geoLevel !== "global" && (
                      <div className="space-y-2">
                        <Label>Add Locations</Label>
                        <Popover
                          open={locationSearchOpen}
                          onOpenChange={setLocationSearchOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              className="w-full justify-start text-left font-normal"
                            >
                              <span className="text-muted-foreground">
                                {selectedLocations.length > 0
                                  ? `${selectedLocations.length} locations selected`
                                  : "Search locations..."}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className="p-0 w-[400px]"
                            align="start"
                          >
                            <Command shouldFilter={true}>
                              <CommandInput
                                placeholder={`Search ${geoLevel}s...`}
                              />
                              <CommandList>
                                <CommandEmpty>No locations found</CommandEmpty>
                                <CommandGroup>
                                  {sampleLocations
                                    .filter((loc) => loc.type === geoLevel)
                                    .map((location) => (
                                      <CommandItem
                                        key={location.id}
                                        onSelect={() => {
                                          if (
                                            !selectedLocations.find(
                                              (l) => l.id === location.id
                                            )
                                          ) {
                                            setSelectedLocations([
                                              ...selectedLocations,
                                              location,
                                            ]);
                                          }
                                          setLocationSearchOpen(false);
                                        }}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          {location.label}
                                          {selectedLocations.some(
                                            (l) => l.id === location.id
                                          ) && (
                                            <Check className="h-4 w-4 text-primary" />
                                          )}
                                        </div>
                                      </CommandItem>
                                    ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>

                        {selectedLocations.length > 0 && (
                          <div className="mt-4">
                            <Label>Selected Locations</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedLocations.map((location) => (
                                <Badge
                                  key={location.id}
                                  variant="secondary"
                                  className="px-3 py-1"
                                >
                                  {location.label}
                                  <button
                                    type="button"
                                    className="ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setSelectedLocations(
                                        selectedLocations.filter(
                                          (l) => l.id !== location.id
                                        )
                                      );
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                    <span className="sr-only">Remove</span>
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {geoLevel === "postal" && (
                          <div className="mt-4 p-3 bg-muted rounded-lg">
                            <div className="flex items-start space-x-2">
                              <div className="text-sm">
                                <p className="font-medium">Bulk Upload</p>
                                <p className="text-muted-foreground">
                                  Have multiple postal codes? Upload a CSV file
                                  with your postal codes.
                                </p>
                              </div>
                              <Button variant="outline" size="sm">
                                Upload CSV
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {geoLevel !== "global" && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          {geoLevel === "country" &&
                            "Select specific countries you want to target"}
                          {geoLevel === "state" &&
                            "Select states/provinces within countries"}
                          {geoLevel === "city" &&
                            "Target specific cities within states"}
                          {geoLevel === "postal" &&
                            "Target specific postal/ZIP codes"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              // Budget and goals section
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Monthly Budget Range</Label>
                    <Select
                      value={monthlyBudget}
                      onValueChange={setMonthlyBudget}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your monthly budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10-25k">
                          $10,000 - $25,000
                        </SelectItem>
                        <SelectItem value="25-50k">
                          $25,000 - $50,000
                        </SelectItem>
                        <SelectItem value="50k+">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Campaign Goals</Label>
                    <textarea
                      className="w-full rounded-lg border bg-background p-2 h-24 focus:ring-1 focus:ring-primary"
                      placeholder="Tell us about your campaign goals and any specific requirements..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
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
                {step < 5
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
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                step === i ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
