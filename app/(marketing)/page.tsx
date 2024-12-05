import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SearchIcon, DollarSignIcon, ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { TopOffers } from "../../components/marketing/home/top-offers"
import { HowItWorks } from "../../components/marketing/home/how-it-works"
import { FeaturedMembers } from "../../components/marketing/home/featured-members"
import { Testimonials } from "../../components/marketing/home/testimonials"
import { LatestStats } from "../../components/marketing/home/latest-stats"

export default function Home() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col mt-16'>
      {/* Premium Offer Banner */}
      <div className='fixed top-16 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5 border-y border-yellow-500/10 backdrop-blur-lg'>
        <div className='mx-auto w-full max-w-7xl flex items-center justify-between py-3 px-4'>
          <div className='flex items-center gap-2'>
            <DollarSignIcon className='h-4 w-4 text-yellow-500' />
            <span className='text-sm text-yellow-500'>
              Premium Offers Available
            </span>
          </div>
          <Link
            href='/premium'
            className='text-sm text-yellow-500 hover:text-yellow-400'
          >
            Learn More →
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className='flex-1 flex items-center justify-center py-8 md:py-12 lg:py-24'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center'>
            <div className='space-y-4 w-full max-w-3xl mx-auto'>
              <h1 className='gradient-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter'>
                Premium Lead Generation Marketplace
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-400 text-sm sm:text-base md:text-xl'>
                Connect with top-tier advertisers, discover high-converting
                offers, and scale your media buying business with verified,
                quality leads.
              </p>
            </div>
            {/* Search input for larger screens */}
            <div className='w-full max-w-2xl mx-auto hidden sm:block'>
              <div className='relative'>
                <SearchIcon className='absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500' />
                <input
                  className='w-full rounded-full bg-white/5 px-12 py-3 md:py-4 text-sm md:text-base backdrop-blur-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20'
                  placeholder='Search offers by vertical, payout, or company...'
                  type='search'
                />
                <Button className='absolute right-2 top-1/2 -translate-y-1/2 rounded-full px-4 md:px-6 text-sm'>
                  Find Offers
                </Button>
              </div>
            </div>
            {/* Search button for mobile */}
            <div className='sm:hidden w-full'>
              <Button asChild className='w-full rounded-full'>
                <Link href='/offers'>
                  <SearchIcon className='mr-2 h-4 w-4' />
                  Search for Offers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Stats */}
      <LatestStats />

      {/* Top Offers */}
      <TopOffers />

      {/* How It Works */}
      <HowItWorks />

      {/* Featured Members */}
      <FeaturedMembers />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <Card className='p-6 sm:p-8 md:p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0'>
            <div className='flex flex-col items-center text-center gap-4 sm:gap-6'>
              <h2 className='text-2xl sm:text-3xl font-bold'>
                Ready to Scale Your Business?
              </h2>
              <p className='text-gray-400 max-w-2xl text-sm sm:text-base'>
                Join thousands of successful media buyers who trust our
                marketplace to connect with quality advertisers and scale their
                lead generation business.
              </p>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto'>
                <Button
                  asChild
                  size='lg'
                  className='rounded-full w-full sm:w-auto'
                >
                  <Link href='/sign-in'>
                    Get Started
                    <ArrowRightIcon className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
                <Button
                  asChild
                  size='lg'
                  variant='outline'
                  className='rounded-full w-full sm:w-auto'
                >
                  <Link href='/contact'>Contact Sales</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
