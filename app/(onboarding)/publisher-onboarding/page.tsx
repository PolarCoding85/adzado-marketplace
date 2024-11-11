"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoForm } from "@/components/onboarding/publisher/personal-info-form"
import { BusinessInfoForm } from "@/components/onboarding/publisher/business-info-form"
import { TrafficSourcesForm } from "@/components/onboarding/publisher/traffic-sources-form"
import { SignupComplete } from "@/components/onboarding/publisher/signup-complete"

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Business Info" },
  { id: 3, title: "Traffic Sources" },
  { id: 4, title: "Complete" },
]

export default function BuyerSignupPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    personal: {},
    business: {},
    traffic: {},
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  return (
    <div className='min-h-screen bg-background py-16'>
      <div className='container max-w-3xl'>
        {/* Progress Header */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Media Buyer Registration</h1>
            <span className='text-sm text-muted-foreground'>
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        {/* Step Content */}
        <div className='space-y-8'>
          {currentStep === 1 && <PersonalInfoForm onNext={handleNext} />}
          {currentStep === 2 && (
            <BusinessInfoForm onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && (
            <TrafficSourcesForm onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 4 && <SignupComplete data={formData} />}
        </div>
      </div>
    </div>
  )
}
