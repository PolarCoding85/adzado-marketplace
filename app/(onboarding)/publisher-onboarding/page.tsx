"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { X, Check } from "lucide-react"

export default function PublisherOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasCompany, setHasCompany] = useState(false)
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const [selectedSubIndustries, setSelectedSubIndustries] = useState<string[]>(
    []
  )
  const [marketingMethods, setMarketingMethods] = useState<string[]>([])
  const [leadTypes, setLeadTypes] = useState<string[]>([])
  const [certifications, setCertifications] = useState<string[]>([])
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [subIndustriesOpen, setSubIndustriesOpen] = useState(false)

  const industries = [
    { value: "home-services", label: "Home Services" },
    { value: "insurance", label: "Insurance" },
    { value: "travel", label: "Travel" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "legal", label: "Legal" },
  ]

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
    // Add more sub-industries for other main industries
  }

  const marketingMethodsList = [
    { value: "facebook", label: "Facebook Ads" },
    { value: "google", label: "Google Ads" },
    { value: "youtube", label: "YouTube" },
    { value: "native", label: "Native Advertising" },
    { value: "email", label: "Email Marketing" },
    { value: "seo", label: "Search Engine Optimization" },
    { value: "radio", label: "Radio" },
    { value: "tv", label: "Television" },
    { value: "tiktok", label: "TikTok" },
  ]

  const leadTypesList = [
    { value: "data-leads", label: "Data Leads" },
    { value: "inbound-calls", label: "Inbound Phone Calls" },
    { value: "live-transfers", label: "Live Transfers" },
    { value: "form-fills", label: "Form Fills" },
    { value: "appointments", label: "Appointments" },
  ]

  const certificationsList = [
    { value: "google-partner", label: "Google Certified Partner" },
    { value: "meta-partner", label: "Meta Business Partner" },
    { value: "bing-partner", label: "Microsoft Advertising Partner" },
    { value: "bluebook", label: "Bluebook Certified" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (step < 6) {
      setStep(step + 1)
      return
    }
    setIsLoading(true)
    // TODO: Submit onboarding data
    router.push("/dashboard")
  }

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setItems: (items: string[]) => void
  ) => {
    if (selectedItems.includes(item)) {
      setItems(selectedItems.filter((i) => i !== item))
    } else {
      setItems([...selectedItems, item])
    }
  }

  const getStepTitle = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return "Tell us about yourself"
      case 2:
        return "Tell us about your business"
      case 3:
        return "What industries do you serve?"
      case 4:
        return "How do you reach your audience?"
      case 5:
        return "Tell us about your leads"
      case 6:
        return "Final details"
      default:
        return ""
    }
  }

  return (
    <div className='relative flex min-h-screen w-screen flex-col items-center justify-center px-4 overflow-hidden'>
      {/* Background Graph SVG */}
      <motion.div
        className='absolute inset-0 z-0 opacity-20'
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <svg
          viewBox='0 0 1000 400'
          preserveAspectRatio='none'
          className='h-full w-full'
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d='M0 300 Q 250 100 500 300 T 1000 300 L 1000 400 L 0 400 Z'
            fill='url(#fillGradient1)'
            stroke='url(#gradient1)'
            strokeWidth='2'
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            d='M0 350 Q 250 150 500 350 T 1000 350 L 1000 400 L 0 400 Z'
            fill='url(#fillGradient2)'
            stroke='url(#gradient2)'
            strokeWidth='2'
          />
          <defs>
            <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.8' />
            </linearGradient>
            <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#93C5FD' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#60A5FA' stopOpacity='0.8' />
            </linearGradient>
            <linearGradient
              id='fillGradient1'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#3B82F6' stopOpacity='0.2' />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.05' />
            </linearGradient>
            <linearGradient
              id='fillGradient2'
              x1='0%'
              y1='0%'
              x2='0%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.15' />
              <stop offset='100%' stopColor='#60A5FA' stopOpacity='0.03' />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex flex-col space-y-2 text-center'
        >
          <h1 className='gradient-heading text-3xl font-bold tracking-tight'>
            Complete Your Profile
          </h1>
          <p className='text-sm text-muted-foreground'>{getStepTitle(step)}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className='p-6'>
            <form onSubmit={handleSubmit} className='space-y-6'>
              {step === 1 ? (
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='firstName'>First Name</Label>
                      <Input
                        id='firstName'
                        required
                        className='rounded-lg'
                        placeholder='John'
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label htmlFor='lastName'>Last Name</Label>
                      <Input
                        id='lastName'
                        required
                        className='rounded-lg'
                        placeholder='Doe'
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='phone'>Phone Number</Label>
                    <Input
                      id='phone'
                      type='tel'
                      className='rounded-lg'
                      placeholder='+1 (555) 000-0000'
                    />
                  </div>
                </div>
              ) : step === 2 ? (
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox
                      id='hasCompany'
                      checked={hasCompany}
                      onCheckedChange={(checked) =>
                        setHasCompany(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor='hasCompany'
                      className='text-sm text-muted-foreground'
                    >
                      I have a registered business
                    </Label>
                  </div>

                  {hasCompany && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className='space-y-4'
                    >
                      <div className='space-y-2'>
                        <Label htmlFor='companyName'>Company Name</Label>
                        <Input
                          id='companyName'
                          className='rounded-lg'
                          placeholder='Acme Inc.'
                        />
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='taxId'>Tax ID / EIN</Label>
                        <Input
                          id='taxId'
                          className='rounded-lg'
                          placeholder='XX-XXXXXXX'
                        />
                      </div>
                    </motion.div>
                  )}

                  <div className='space-y-2'>
                    <Label htmlFor='website'>Website (Optional)</Label>
                    <Input
                      id='website'
                      type='url'
                      className='rounded-lg'
                      placeholder='https://example.com'
                    />
                  </div>
                </div>
              ) : step === 3 ? (
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Industries You Serve</Label>
                      <Popover
                        open={industriesOpen}
                        onOpenChange={setIndustriesOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            role='combobox'
                            className='w-full justify-start text-left font-normal'
                          >
                            <span className='text-muted-foreground'>
                              {selectedIndustries.length > 0
                                ? `${selectedIndustries.length} selected`
                                : "Search industries..."}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='p-0 w-[400px]' align='start'>
                          <Command shouldFilter={true}>
                            <CommandInput placeholder='Search industries...' />
                            <CommandList>
                              <CommandEmpty>No industry found.</CommandEmpty>
                              <CommandGroup>
                                {industries.map((industry) => (
                                  <CommandItem
                                    key={industry.value}
                                    onSelect={() => {
                                      if (
                                        !selectedIndustries.includes(
                                          industry.value
                                        )
                                      ) {
                                        setSelectedIndustries([
                                          ...selectedIndustries,
                                          industry.value,
                                        ])
                                      }
                                      setIndustriesOpen(false)
                                    }}
                                  >
                                    <div className='flex items-center justify-between w-full'>
                                      {industry.label}
                                      {selectedIndustries.includes(
                                        industry.value
                                      ) && (
                                        <Check className='h-4 w-4 text-primary' />
                                      )}
                                    </div>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>

                      {selectedIndustries.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-2'>
                          {selectedIndustries.map((industryValue) => {
                            const industry = industries.find(
                              (i) => i.value === industryValue
                            )
                            return (
                              <Badge
                                key={industryValue}
                                variant='secondary'
                                className='px-3 py-1'
                              >
                                {industry?.label}
                                <button
                                  type='button'
                                  className='ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setSelectedIndustries(
                                      selectedIndustries.filter(
                                        (i) => i !== industryValue
                                      )
                                    )
                                  }}
                                >
                                  <X className='h-3 w-3' />
                                  <span className='sr-only'>Remove</span>
                                </button>
                              </Badge>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {selectedIndustries.length > 0 && (
                      <div className='space-y-2'>
                        <Label>Sub-Industries</Label>
                        <Popover
                          open={subIndustriesOpen}
                          onOpenChange={setSubIndustriesOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant='outline'
                              role='combobox'
                              className='w-full justify-start text-left font-normal'
                            >
                              <span className='text-muted-foreground'>
                                {selectedSubIndustries.length > 0
                                  ? `${selectedSubIndustries.length} selected`
                                  : "Search sub-industries..."}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className='p-0 w-[400px]'
                            align='start'
                          >
                            <Command shouldFilter={true}>
                              <CommandInput placeholder='Search sub-industries...' />
                              <CommandList>
                                <CommandEmpty>
                                  No sub-industry found.
                                </CommandEmpty>
                                {selectedIndustries.map((industry) => (
                                  <CommandGroup
                                    key={industry}
                                    heading={
                                      industries.find(
                                        (i) => i.value === industry
                                      )?.label || ""
                                    }
                                  >
                                    {(subIndustries[industry] || []).map(
                                      (subIndustry) => (
                                        <CommandItem
                                          key={subIndustry.value}
                                          onSelect={() => {
                                            if (
                                              !selectedSubIndustries.includes(
                                                subIndustry.value
                                              )
                                            ) {
                                              setSelectedSubIndustries([
                                                ...selectedSubIndustries,
                                                subIndustry.value,
                                              ])
                                            }
                                            setSubIndustriesOpen(false)
                                          }}
                                        >
                                          <div className='flex items-center justify-between w-full'>
                                            {subIndustry.label}
                                            {selectedSubIndustries.includes(
                                              subIndustry.value
                                            ) && (
                                              <Check className='h-4 w-4 text-primary' />
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

                        {selectedSubIndustries.length > 0 && (
                          <div className='flex flex-wrap gap-2 mt-2'>
                            {selectedSubIndustries.map((subIndustryValue) => {
                              const subIndustry = Object.values(subIndustries)
                                .flat()
                                .find((i) => i.value === subIndustryValue)
                              return (
                                <Badge
                                  key={subIndustryValue}
                                  variant='secondary'
                                  className='px-3 py-1'
                                >
                                  {subIndustry?.label}
                                  <button
                                    type='button'
                                    className='ml-2 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setSelectedSubIndustries(
                                        selectedSubIndustries.filter(
                                          (i) => i !== subIndustryValue
                                        )
                                      )
                                    }}
                                  >
                                    <X className='h-3 w-3' />
                                    <span className='sr-only'>Remove</span>
                                  </button>
                                </Badge>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : step === 4 ? (
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Marketing Methods</Label>
                      <div className='flex flex-wrap gap-2'>
                        {marketingMethodsList.map((method) => (
                          <Badge
                            key={method.value}
                            variant={
                              marketingMethods.includes(method.value)
                                ? "default"
                                : "outline"
                            }
                            className='cursor-pointer'
                            onClick={() =>
                              toggleSelection(
                                method.value,
                                marketingMethods,
                                setMarketingMethods
                              )
                            }
                          >
                            {method.label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : step === 5 ? (
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Lead Types Generated</Label>
                      <div className='flex flex-wrap gap-2'>
                        {leadTypesList.map((type) => (
                          <Badge
                            key={type.value}
                            variant={
                              leadTypes.includes(type.value)
                                ? "default"
                                : "outline"
                            }
                            className='cursor-pointer'
                            onClick={() =>
                              toggleSelection(
                                type.value,
                                leadTypes,
                                setLeadTypes
                              )
                            }
                          >
                            {type.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label>Daily Lead Volume</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder='Select your average daily volume' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='1-10'>
                            1-10 leads per day
                          </SelectItem>
                          <SelectItem value='11-50'>
                            11-50 leads per day
                          </SelectItem>
                          <SelectItem value='51-100'>
                            51-100 leads per day
                          </SelectItem>
                          <SelectItem value='101-500'>
                            101-500 leads per day
                          </SelectItem>
                          <SelectItem value='500+'>
                            500+ leads per day
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='space-y-6'>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>Certifications</Label>
                      <div className='flex flex-wrap gap-2'>
                        {certificationsList.map((cert) => (
                          <Badge
                            key={cert.value}
                            variant={
                              certifications.includes(cert.value)
                                ? "default"
                                : "outline"
                            }
                            className='cursor-pointer'
                            onClick={() =>
                              toggleSelection(
                                cert.value,
                                certifications,
                                setCertifications
                              )
                            }
                          >
                            {cert.label}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <Label>Additional Information</Label>
                      <textarea
                        className='w-full rounded-lg border bg-background p-2 h-24 focus:ring-1 focus:ring-primary'
                        placeholder='Tell us anything else about your business that might be relevant...'
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className='flex gap-3'>
                {step > 1 && (
                  <Button
                    type='button'
                    variant='outline'
                    className='rounded-lg flex-1'
                    onClick={() => setStep(step - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type='submit'
                  className='rounded-lg flex-1'
                  disabled={isLoading}
                >
                  {step < 6
                    ? "Continue"
                    : isLoading
                    ? "Completing Setup..."
                    : "Complete Setup"}
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='flex justify-center space-x-2'
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
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
  )
}
