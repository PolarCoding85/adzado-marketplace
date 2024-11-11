"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"

const steps = [
  { id: 1, title: "Business Details" },
  { id: 2, title: "Traffic Sources" },
  { id: 3, title: "Complete" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    business: {},
    traffic: {},
  })

  const progress = (currentStep / steps.length) * 100

  const handleNext = (data: any) => {
    if (currentStep === 1) {
      setFormData((prev) => ({
        ...prev,
        business: data,
      }))
    } else if (currentStep === 2) {
      setFormData((prev) => ({ ...prev, traffic: data }))
    }
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
            <h1 className='text-2xl font-bold'>Publisher Onboarding</h1>
            <span className='text-sm text-muted-foreground'>
              Step {currentStep} of {steps.length}
            </span>
          </div>
          <Progress value={progress} className='h-2' />
        </div>

        {/* Step Content */}
        <div className='space-y-8'>
          {currentStep === 1 && (
            <div className='p-6 bg-white/5 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Business Details</h2>
              <p className='text-muted-foreground'>Form placeholder</p>
            </div>
          )}
          {currentStep === 2 && (
            <div className='p-6 bg-white/5 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Traffic Sources</h2>
              <p className='text-muted-foreground'>Form placeholder</p>
            </div>
          )}
          {currentStep === 3 && (
            <div className='p-6 bg-white/5 rounded-lg'>
              <h2 className='text-xl font-semibold mb-4'>Complete</h2>
              <p className='text-muted-foreground'>Completion placeholder</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
