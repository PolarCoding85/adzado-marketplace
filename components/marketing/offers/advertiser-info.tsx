import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarIcon,
  DollarSignIcon,
  ClockIcon,
  Building2Icon,
} from "lucide-react"

export function AdvertiserInfo({ advertiser }: { advertiser: any }) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-4'>About {advertiser.name}</h2>
        <Card className='p-6 bg-white/5'>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Building2Icon className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>Founded: {advertiser.founded}</span>
              </div>
              <div className='flex items-center gap-2'>
                <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  Average Payout: {advertiser.avgPayout}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <ClockIcon className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  Payment Terms: {advertiser.paymentTerms}
                </span>
              </div>
            </div>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <CalendarIcon className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  Active Offers: {advertiser.totalOffers}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <DollarSignIcon className='h-4 w-4 text-muted-foreground' />
                <span className='text-sm'>
                  Minimum Payment: {advertiser.minimumPayment}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Verification & Badges</h2>
        <div className='flex flex-wrap gap-2'>
          {advertiser.verificationBadges.map((badge: string) => (
            <Badge key={badge} variant='secondary' className='bg-white/10'>
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
