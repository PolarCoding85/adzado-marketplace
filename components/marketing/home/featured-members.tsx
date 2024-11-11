import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  StarIcon,
  TrendingUpIcon,
  Building2Icon,
  ShieldCheckIcon,
} from "lucide-react"
import Link from "next/link"

export function FeaturedMembers() {
  return (
    <section className='py-8 sm:py-12 md:py-16 bg-black/20'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='grid gap-8 md:grid-cols-2'>
          {/* Advertiser of the Week */}
          <div className='flex flex-col h-full'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold'>Advertiser of the Week</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Recognized for exceptional offer quality and partner support
              </p>
            </div>

            <Card className='flex-1 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10'>
              <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='flex items-center gap-4'>
                  <div className='rounded-full bg-white/10 p-3'>
                    <Building2Icon className='h-6 w-6' />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold text-lg'>SolarLeads Pro</h3>
                      <ShieldCheckIcon className='h-4 w-4 text-blue-400' />
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Solar Lead Generation
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap gap-2 mt-6'>
                  <Badge variant='secondary' className='bg-white/10'>
                    Premium Partner
                  </Badge>
                  <Badge variant='secondary' className='bg-white/10'>
                    4.9 Rating
                  </Badge>
                  <Badge variant='secondary' className='bg-white/10'>
                    45+ Active Buyers
                  </Badge>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 gap-4 mt-6'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Lead Quality
                    </p>
                    <div className='flex items-center gap-1'>
                      <StarIcon className='h-4 w-4 text-yellow-500' />
                      <span className='font-medium'>9.2/10</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Avg. Payout</p>
                    <p className='font-medium'>$45-65/lead</p>
                  </div>
                </div>

                {/* Button */}
                <Button
                  asChild
                  variant='outline'
                  className='w-full sm:w-auto rounded-full mt-6'
                >
                  <Link href='/advertisers/solarleads-pro'>View Profile</Link>
                </Button>
              </div>
            </Card>
          </div>

          {/* Media Buyer of the Week */}
          <div className='flex flex-col h-full'>
            <div className='mb-6'>
              <h2 className='text-2xl font-bold'>Media Buyer of the Week</h2>
              <p className='text-sm text-muted-foreground mt-1'>
                Top performer with exceptional results across multiple verticals
              </p>
            </div>

            <Card className='flex-1 p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10'>
              <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='flex items-center gap-4'>
                  <div className='rounded-full bg-white/10 p-3'>
                    <StarIcon className='h-6 w-6' />
                  </div>
                  <div>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold text-lg'>
                        MediaPro Solutions
                      </h3>
                      <Badge className='bg-green-500/10 text-green-500'>
                        Elite Buyer
                      </Badge>
                    </div>
                    <p className='text-sm text-muted-foreground'>
                      Performance Marketing
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className='flex flex-wrap gap-2 mt-6'>
                  <Badge variant='secondary' className='bg-white/10'>
                    12 Active Offers
                  </Badge>
                  <Badge variant='secondary' className='bg-white/10'>
                    5.0 Rating
                  </Badge>
                  <Badge variant='secondary' className='bg-white/10'>
                    $250k+ Monthly Volume
                  </Badge>
                </div>

                {/* Stats */}
                <div className='grid grid-cols-2 gap-4 mt-6'>
                  <div>
                    <p className='text-sm text-muted-foreground'>
                      Conversion Rate
                    </p>
                    <div className='flex items-center gap-1'>
                      <TrendingUpIcon className='h-4 w-4 text-green-500' />
                      <span className='font-medium'>18.5%</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>Verticals</p>
                    <p className='font-medium'>Solar, Insurance</p>
                  </div>
                </div>

                {/* Button */}
                <Button
                  asChild
                  variant='outline'
                  className='w-full sm:w-auto rounded-full mt-6'
                >
                  <Link href='/buyers/mediapro'>View Profile</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
