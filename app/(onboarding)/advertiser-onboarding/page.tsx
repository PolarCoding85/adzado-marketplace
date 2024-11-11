"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { BusinessDetailsForm } from "@/components/onboarding/advertiser/business-details-form"
import { OfferDetailsForm } from "@/components/onboarding/advertiser/offer-details-form"
import { OnboardingComplete } from "@/components/onboarding/advertiser/onboarding-complete"

const steps = [
  { id: 1, title: "Business Details" },
  { id: 2, title: "Offer Details" },
  { id: 3, title: "Complete" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    business: {},
    offers: {},
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
            <h1 className='text-2xl font-bold'>Advertiser Onboarding</h1>
            <span className='text-sm text-muted-foreground'>
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        {/* Step Content */}
        <div className='space-y-8'>
          {currentStep === 1 && <BusinessDetailsForm onNext={handleNext} />}
          {currentStep === 2 && (
            <OfferDetailsForm onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 3 && <OnboardingComplete data={formData} />}
        </div>
      </div>
    </div>
  )
}
