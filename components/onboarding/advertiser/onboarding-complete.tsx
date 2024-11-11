import { CheckCircle2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function OnboardingComplete({ data }: { data: any }) {
  return (
    <div className='flex flex-col items-center justify-center py-12 space-y-8'>
      <div className='rounded-full bg-green-500/10 p-3'>
        <CheckCircle2Icon className='h-12 w-12 text-green-500' />
      </div>

      <div className='text-center space-y-2'>
        <h2 className='text-2xl font-bold'>Setup Complete!</h2>
        <p className='text-muted-foreground'>
          Your advertiser account has been created successfully.
        </p>
      </div>

      <div className='w-full max-w-md space-y-4'>
        <div className='rounded-lg bg-muted p-4'>
          <div className='space-y-3'>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Company</span>
              <span className='font-medium'>{data.business.companyName}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>Industry</span>
              <span className='font-medium'>{data.business.industry}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-sm text-muted-foreground'>First Offer</span>
              <span className='font-medium'>{data.offers.offerName}</span>
            </div>
          </div>
        </div>

        <Button asChild className='w-full rounded-full'>
          <Link href='/dashboard'>Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}
