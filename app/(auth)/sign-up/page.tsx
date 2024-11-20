"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

type UserRole = "publisher" | "advertiser" | null

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>(null)
  const [step, setStep] = useState(1)
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement authentication logic here with selected role
    // After successful sign up, redirect to appropriate onboarding
    router.push(
      selectedRole === "publisher"
        ? "/publisher-onboarding"
        : "/advertiser-onboarding"
    )
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
        className='relative z-10 mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='flex flex-col space-y-2 text-center'
        >
          <h1 className='gradient-heading text-3xl font-bold tracking-tight'>
            {step === 1 ? "Choose your role" : "Create an account"}
          </h1>
          <p className='text-sm text-muted-foreground'>
            {step === 1
              ? "Select how you want to use our platform"
              : "Enter your information to get started"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='grid gap-6'
        >
          {step === 1 ? (
            <div className='grid gap-4'>
              <Card
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedRole === "publisher"
                    ? "border-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() => setSelectedRole("publisher")}
              >
                <div className='flex flex-col space-y-2'>
                  <h3 className='font-semibold'>Publisher</h3>
                  <p className='text-sm text-muted-foreground'>
                    I want to monetize my content and grow my audience
                  </p>
                </div>
              </Card>

              <Card
                className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                  selectedRole === "advertiser"
                    ? "border-blue-500 shadow-lg"
                    : ""
                }`}
                onClick={() => setSelectedRole("advertiser")}
              >
                <div className='flex flex-col space-y-2'>
                  <h3 className='font-semibold'>Advertiser</h3>
                  <p className='text-sm text-muted-foreground'>
                    I want to promote my products and reach new customers
                  </p>
                </div>
              </Card>

              <Button
                className='rounded-lg'
                disabled={!selectedRole}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    placeholder='name@example.com'
                    type='email'
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect='off'
                    className='rounded-lg'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    placeholder='Create a password'
                    type='password'
                    className='rounded-lg'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='confirmPassword'>Confirm Password</Label>
                  <Input
                    id='confirmPassword'
                    placeholder='Confirm your password'
                    type='password'
                    className='rounded-lg'
                    required
                  />
                </div>

                <div className='flex items-start space-x-2'>
                  <Checkbox
                    id='terms'
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked as boolean)
                    }
                    className='mt-1'
                  />
                  <label
                    htmlFor='terms'
                    className='text-sm text-muted-foreground leading-tight'
                  >
                    Yes, I understand and agree to the Adzado{" "}
                    <Link
                      href='/terms'
                      className='text-primary underline underline-offset-4 hover:text-brand'
                    >
                      Terms of Service
                    </Link>
                    , including the{" "}
                    <Link
                      href='/privacy'
                      className='text-primary underline underline-offset-4 hover:text-brand'
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <Button
                  className='rounded-lg'
                  disabled={isLoading || !agreedToTerms}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </div>
            </form>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='px-8 text-center text-sm text-muted-foreground'
        >
          Already have an account?{" "}
          <Link
            href='/sign-in'
            className='hover:text-brand underline underline-offset-4'
          >
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </div>
  )
}
