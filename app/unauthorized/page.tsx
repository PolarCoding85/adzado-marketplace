"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center space-y-6 max-w-md'
      >
        <div className='flex justify-center'>
          <div className='rounded-full bg-red-100 p-4 dark:bg-red-900/20'>
            <AlertCircle className='h-12 w-12 text-red-600 dark:text-red-400' />
          </div>
        </div>

        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Unauthorized Access
          </h1>
          <p className='text-muted-foreground'>
            You don't have permission to access this page. Please check your
            credentials or contact support if you think this is a mistake.
          </p>
        </div>

        <div className='flex flex-col gap-2'>
          <Button onClick={() => router.push("/dashboard")}>
            Return to Dashboard
          </Button>
          <Button variant='outline' onClick={() => router.push("/sign-in")}>
            Sign In with Different Account
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
