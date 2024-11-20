"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className='relative flex flex-col items-center justify-center min-h-[90vh] px-4 overflow-hidden'>
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
          {/* First curve with fill */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            d='M0 300 Q 250 100 500 300 T 1000 300 L 1000 400 L 0 400 Z'
            fill='url(#fillGradient1)'
            stroke='url(#gradient1)'
            strokeWidth='2'
          />
          {/* Second curve with fill */}
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
            {/* Line gradients */}
            <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#60A5FA' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#3B82F6' stopOpacity='0.8' />
            </linearGradient>
            <linearGradient id='gradient2' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#93C5FD' stopOpacity='0.4' />
              <stop offset='100%' stopColor='#60A5FA' stopOpacity='0.8' />
            </linearGradient>

            {/* Fill gradients */}
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
        className='text-center relative z-10'
      >
        <h1 className='gradient-heading text-7xl sm:text-8xl md:text-9xl font-bold mb-6'>
          404
        </h1>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='text-2xl sm:text-3xl font-semibold mb-4'
        >
          Page Not Found
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className='text-gray-400 text-center mb-8 max-w-md mx-auto'
        >
          Oops! The page you&apos;re looking for seems to have wandered off into
          the digital void.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button asChild size='lg' className='rounded-full'>
            <Link href='/' className='flex items-center gap-2'>
              <HomeIcon size={18} />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
