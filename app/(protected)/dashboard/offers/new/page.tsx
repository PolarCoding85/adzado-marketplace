"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Badge } from "@/components/ui/badge"
import { Check, ChevronLeft, X } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function NewOfferPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [targetIndustries, setTargetIndustries] = useState<string[]>([])
  const [targetSubIndustries, setTargetSubIndustries] = useState<string[]>([])
  const [industriesOpen, setIndustriesOpen] = useState(false)
  const [subIndustriesOpen, setSubIndustriesOpen] = useState(false)
  const [requiredFields, setRequiredFields] = useState<string[]>([])
  const [fieldsOpen, setFieldsOpen] = useState(false)

  // Sample data
  const industries = [
    { value: "home-services", label: "Home Services" },
    { value: "insurance", label: "Insurance" },
    { value: "finance", label: "Finance" },
    { value: "legal", label: "Legal" },
  ]

  const subIndustries: { [key: string]: { value: string; label: string }[] } = {
    "home-services": [
      { value: "plumbing", label: "Plumbing" },
      { value: "hvac", label: "HVAC" },
      { value: "roofing", label: "Roofing" },
    ],
    insurance: [
      { value: "auto", label: "Auto Insurance" },
      { value: "home", label: "Home Insurance" },
      { value: "life", label: "Life Insurance" },
    ],
  }

  const availableFields = [
    { value: "first_name", label: "First Name", required: true },
    { value: "last_name", label: "Last Name", required: true },
    { value: "email", label: "Email", required: true },
    { value: "phone", label: "Phone Number", required: true },
    { value: "address", label: "Address" },
    { value: "city", label: "City" },
    { value: "state", label: "State" },
    { value: "zip", label: "ZIP Code" },
    { value: "dob", label: "Date of Birth" },
    { value: "income", label: "Annual Income" },
    { value: "property_type", label: "Property Type" },
    { value: "property_value", label: "Property Value" },
    { value: "insurance_type", label: "Insurance Type" },
    { value: "current_insurance", label: "Current Insurance Provider" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Submit offer data
    router.push("/dashboard/offers")
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <h1 className='text-3xl font-bold tracking-tight'>
              Create New Offer
            </h1>
          </div>
          <p className='text-muted-foreground'>
            Set up a new offer for publishers to promote
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type='submit' form='offer-form'>
            Create Offer
          </Button>
        </div>
      </div>

      <form id='offer-form' onSubmit={handleSubmit} className='space-y-8'>
        <Card className='p-6'>
          <div className='space-y-6'>
            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Basic Information</h2>

              <div className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Offer Name</Label>
                    <Input
                      id='name'
                      placeholder='e.g., Home Insurance Leads - California'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Status</Label>
                    <Select defaultValue='draft'>
                      <SelectTrigger>
                        <SelectValue placeholder='Select status' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='draft'>Draft</SelectItem>
                        <SelectItem value='active'>Active</SelectItem>
                        <SelectItem value='paused'>Paused</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label>Description</Label>
                  <Textarea
                    placeholder='Describe your offer and any special requirements...'
                    className='min-h-[100px]'
                  />
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Targeting</h2>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Industries</Label>
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
                          {targetIndustries.length > 0
                            ? `${targetIndustries.length} selected`
                            : "Select industries..."}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0 w-[400px]' align='start'>
                      <Command>
                        <CommandInput placeholder='Search industries...' />
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
                                    ])
                                  }
                                  setIndustriesOpen(false)
                                }}
                              >
                                <div className='flex items-center justify-between w-full'>
                                  {industry.label}
                                  {targetIndustries.includes(
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
                </div>

                {targetIndustries.length > 0 && (
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
                            {targetSubIndustries.length > 0
                              ? `${targetSubIndustries.length} selected`
                              : "Select sub-industries..."}
                          </span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='p-0 w-[400px]' align='start'>
                        <Command>
                          <CommandInput placeholder='Search sub-industries...' />
                          <CommandList>
                            <CommandEmpty>No sub-industry found.</CommandEmpty>
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
                                          ])
                                        }
                                        setSubIndustriesOpen(false)
                                      }}
                                    >
                                      <div className='flex items-center justify-between w-full'>
                                        {subIndustry.label}
                                        {targetSubIndustries.includes(
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
                  </div>
                )}
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Lead Requirements</h2>

              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Required Fields</Label>
                  <Popover open={fieldsOpen} onOpenChange={setFieldsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        className='w-full justify-start text-left font-normal'
                      >
                        <span className='text-muted-foreground'>
                          {requiredFields.length > 0
                            ? `${requiredFields.length} fields selected`
                            : "Select required fields..."}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0 w-[400px]' align='start'>
                      <Command>
                        <CommandInput placeholder='Search fields...' />
                        <CommandList>
                          <CommandEmpty>No field found.</CommandEmpty>
                          <CommandGroup>
                            {availableFields.map((field) => (
                              <CommandItem
                                key={field.value}
                                onSelect={() => {
                                  if (!requiredFields.includes(field.value)) {
                                    setRequiredFields([
                                      ...requiredFields,
                                      field.value,
                                    ])
                                  }
                                  setFieldsOpen(false)
                                }}
                              >
                                <div className='flex items-center justify-between w-full'>
                                  {field.label}
                                  {requiredFields.includes(field.value) && (
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
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label>Lead Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Select lead type' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='data'>Data Leads</SelectItem>
                        <SelectItem value='calls'>Inbound Calls</SelectItem>
                        <SelectItem value='transfers'>
                          Live Transfers
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Payout per Lead ($)</Label>
                    <Input
                      type='number'
                      min='0'
                      step='0.01'
                      placeholder='0.00'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <h2 className='text-xl font-semibold'>Additional Settings</h2>

              <Accordion type='single' collapsible className='w-full'>
                <AccordionItem value='caps'>
                  <AccordionTrigger>Lead Caps</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-4 pt-4'>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-0.5'>
                          <Label>Daily Cap</Label>
                          <p className='text-sm text-muted-foreground'>
                            Limit the number of leads per day
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Switch id='daily-cap' />
                          <Input
                            type='number'
                            className='w-24'
                            placeholder='100'
                          />
                        </div>
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-0.5'>
                          <Label>Monthly Cap</Label>
                          <p className='text-sm text-muted-foreground'>
                            Limit the number of leads per month
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
                          <Switch id='monthly-cap' />
                          <Input
                            type='number'
                            className='w-24'
                            placeholder='3000'
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value='restrictions'>
                  <AccordionTrigger>Publisher Restrictions</AccordionTrigger>
                  <AccordionContent>
                    <div className='space-y-4 pt-4'>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-0.5'>
                          <Label>Approval Required</Label>
                          <p className='text-sm text-muted-foreground'>
                            Publishers need approval before promoting this offer
                          </p>
                        </div>
                        <Switch id='approval-required' />
                      </div>
                      <div className='flex items-center justify-between'>
                        <div className='space-y-0.5'>
                          <Label>Minimum Publisher Rating</Label>
                          <p className='text-sm text-muted-foreground'>
                            Required minimum rating to access this offer
                          </p>
                        </div>
                        <Select>
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select minimum rating' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='none'>No minimum</SelectItem>
                            <SelectItem value='3'>3+ stars</SelectItem>
                            <SelectItem value='4'>4+ stars</SelectItem>
                            <SelectItem value='4.5'>4.5+ stars</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Card>
      </form>
    </div>
  )
}
