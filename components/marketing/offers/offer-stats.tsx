import { Card } from "@/components/ui/card"
import {
  BarChart3Icon,
  Users2Icon,
  BadgeCheckIcon,
  ClockIcon,
  TrendingUpIcon,
  DollarSignIcon,
} from "lucide-react"

export function OfferStats({ stats }: { stats: any }) {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>Performance Metrics</h2>
      <div className='grid gap-4 md:grid-cols-3'>
        <Card className='p-4 bg-white/5'>
          <div className='flex items-center gap-2'>
            <Users2Icon className='h-4 w-4 text-blue-500' />
            <span className='text-sm font-medium'>Active Affiliates</span>
          </div>
          <p className='mt-2 text-2xl font-bold'>{stats.activeAffiliates}</p>
          <p className='text-xs text-muted-foreground'>Currently running</p>
        </Card>
        <Card className='p-4 bg-white/5'>
          <div className='flex items-center gap-2'>
            <BadgeCheckIcon className='h-4 w-4 text-green-500' />
            <span className='text-sm font-medium'>Lead Quality</span>
          </div>
          <p className='mt-2 text-2xl font-bold'>{stats.avgLeadQuality}/10</p>
          <p className='text-xs text-muted-foreground'>Average score</p>
        </Card>
        <Card className='p-4 bg-white/5'>
          <div className='flex items-center gap-2'>
            <TrendingUpIcon className='h-4 w-4 text-purple-500' />
            <span className='text-sm font-medium'>Acceptance Rate</span>
          </div>
          <p className='mt-2 text-2xl font-bold'>{stats.acceptanceRate}</p>
          <p className='text-xs text-muted-foreground'>Last 30 days</p>
        </Card>
      </div>
    </div>
  )
}
