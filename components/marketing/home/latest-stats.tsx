import { Card } from "@/components/ui/card"
import {
  BarChart3Icon,
  UsersIcon,
  Building2Icon,
  TrendingUpIcon,
} from "lucide-react"

export function LatestStats() {
  return (
    <section className='py-6 sm:py-8 bg-black/10'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-blue-500/10 p-3'>
                <UsersIcon className='h-6 w-6 text-blue-500' />
              </div>
              <div>
                <p className='text-2xl font-bold'>15,000+</p>
                <p className='text-sm text-muted-foreground'>Active Buyers</p>
              </div>
            </div>
          </Card>

          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-green-500/10 p-3'>
                <Building2Icon className='h-6 w-6 text-green-500' />
              </div>
              <div>
                <p className='text-2xl font-bold'>500+</p>
                <p className='text-sm text-muted-foreground'>
                  Verified Advertisers
                </p>
              </div>
            </div>
          </Card>

          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-purple-500/10 p-3'>
                <BarChart3Icon className='h-6 w-6 text-purple-500' />
              </div>
              <div>
                <p className='text-2xl font-bold'>$50M+</p>
                <p className='text-sm text-muted-foreground'>Monthly Volume</p>
              </div>
            </div>
          </Card>

          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-4'>
              <div className='rounded-full bg-orange-500/10 p-3'>
                <TrendingUpIcon className='h-6 w-6 text-orange-500' />
              </div>
              <div>
                <p className='text-2xl font-bold'>92%</p>
                <p className='text-sm text-muted-foreground'>
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
