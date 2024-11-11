import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  ShieldCheckIcon,
  TrendingUpIcon,
  BadgeCheckIcon,
  SparklesIcon,
  UserCheckIcon,
  BuildingIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "lucide-react"

export default function PremiumPage() {
  return (
    <div className='mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 md:py-16'>
      {/* Hero Section */}
      <div className='flex flex-col items-center text-center space-y-4 mb-12'>
        <div className='flex items-center gap-2 text-yellow-500 mb-4'>
          <SparklesIcon className='h-5 w-5' />
          <span className='font-medium'>Premium Offers Program</span>
          <SparklesIcon className='h-5 w-5' />
        </div>
        <h1 className='gradient-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter max-w-3xl'>
          Connect with Top-Tier Advertisers and Premium Publishers
        </h1>
        <p className='text-muted-foreground max-w-2xl text-sm sm:text-base md:text-lg'>
          Our premium offers program connects verified advertisers with
          high-performing publishers to deliver exceptional results and maintain
          the highest quality standards.
        </p>
      </div>

      {/* Benefits Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16'>
        <Card className='p-6 bg-white/5'>
          <ShieldCheckIcon className='h-10 w-10 text-blue-500 mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Verified Partners Only</h3>
          <p className='text-sm text-muted-foreground'>
            All participants undergo a thorough verification process to ensure
            quality and reliability.
          </p>
        </Card>
        <Card className='p-6 bg-white/5'>
          <TrendingUpIcon className='h-10 w-10 text-green-500 mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Higher Payouts</h3>
          <p className='text-sm text-muted-foreground'>
            Premium offers feature increased payouts and exclusive bonus
            structures.
          </p>
        </Card>
        <Card className='p-6 bg-white/5'>
          <BadgeCheckIcon className='h-10 w-10 text-purple-500 mb-4' />
          <h3 className='text-lg font-semibold mb-2'>Quality Assurance</h3>
          <p className='text-sm text-muted-foreground'>
            Strict quality controls and monitoring ensure the best possible
            results.
          </p>
        </Card>
      </div>

      {/* How It Works */}
      <div className='space-y-12 mb-16'>
        <h2 className='text-2xl sm:text-3xl font-bold text-center'>
          How to Join Premium Offers
        </h2>

        <div className='grid md:grid-cols-2 gap-12'>
          {/* Publishers */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <UserCheckIcon className='h-6 w-6 text-blue-500' />
              <h3 className='text-xl font-semibold'>For Publishers</h3>
            </div>
            <div className='space-y-4'>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Create an Account</p>
                  <p className='text-sm text-muted-foreground'>
                    Sign up and complete your publisher profile
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Verification Process</p>
                  <p className='text-sm text-muted-foreground'>
                    Submit required documentation and traffic sources
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Apply to Offers</p>
                  <p className='text-sm text-muted-foreground'>
                    Once verified, browse and apply to premium offers
                  </p>
                </div>
              </div>
            </div>
            <Button asChild size='lg' className='w-full rounded-full'>
              <Link href='/sign-up'>
                Get Started as Publisher
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>

          {/* Advertisers */}
          <div className='space-y-6'>
            <div className='flex items-center gap-3'>
              <BuildingIcon className='h-6 w-6 text-purple-500' />
              <h3 className='text-xl font-semibold'>For Advertisers</h3>
            </div>
            <div className='space-y-4'>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Business Verification</p>
                  <p className='text-sm text-muted-foreground'>
                    Complete our advertiser verification process
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Set Up Your Offer</p>
                  <p className='text-sm text-muted-foreground'>
                    Configure your premium offer details and requirements
                  </p>
                </div>
              </div>
              <div className='flex gap-3'>
                <CheckCircleIcon className='h-5 w-5 text-green-500 shrink-0 mt-0.5' />
                <div>
                  <p className='font-medium'>Review Applications</p>
                  <p className='text-sm text-muted-foreground'>
                    Select from verified publishers to run your offer
                  </p>
                </div>
              </div>
            </div>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='w-full rounded-full'
            >
              <Link href='/contact'>
                Contact Sales
                <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <Card className='p-8 sm:p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0'>
        <div className='flex flex-col items-center text-center gap-6'>
          <ShieldCheckIcon className='h-12 w-12 text-blue-500' />
          <div className='space-y-2'>
            <h2 className='text-2xl sm:text-3xl font-bold'>
              Ready to Join Premium Offers?
            </h2>
            <p className='text-muted-foreground max-w-2xl'>
              Start the verification process today to access exclusive
              high-paying offers and connect with quality partners.
            </p>
          </div>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Button asChild size='lg' className='rounded-full'>
              <Link href='/sign-up'>Create Account</Link>
            </Button>
            <Button
              asChild
              size='lg'
              variant='outline'
              className='rounded-full'
            >
              <Link href='/contact'>Contact Sales</Link>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
