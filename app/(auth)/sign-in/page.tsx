"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function SignInPage() {
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
            Welcome back
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email to sign in to your account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='grid gap-6'
        >
          <form>
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
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  placeholder='Enter your password'
                  type='password'
                  className='rounded-lg'
                />
              </div>
              <Button className='rounded-lg'>Sign In</Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className='space-y-2'
        >
          <p className='px-8 text-center text-sm text-muted-foreground'>
            <Link
              href='/forgot-password'
              className='hover:text-brand underline underline-offset-4'
            >
              Forgot your password?
            </Link>
          </p>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            Don&apos;t have an account?{" "}
            <Link
              href='/publisher-onboarding'
              className='hover:text-brand underline underline-offset-4'
            >
              Sign up
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
