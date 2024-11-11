import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2Icon,
  StarIcon,
  TrendingUpIcon,
  BarChart3Icon,
  UsersIcon,
  DollarSignIcon,
} from "lucide-react"

const topOffers = [
  {
    id: 1,
    title: "Solar Lead Gen - Exclusive Territory",
    company: "SolarLeads Pro",
    price: "$45-65/lead",
    upvotes: 234,
    category: "Solar",
    rating: 4.8,
    description:
      "Exclusive residential solar leads with 680+ credit score, homeowners only. 85% contact rate.",
    metrics: {
      conversionRate: "12.5%",
      avgEPC: "$2.45",
      activeAffiliates: 45,
    },
  },
  {
    id: 2,
    title: "Medicare Advantage Transfers",
    company: "HealthConnect",
    price: "$75-95/transfer",
    upvotes: 189,
    category: "Insurance",
    rating: 5.0,
    description:
      "Live transfer Medicare leads, 65+ demographic, pre-screened for eligibility. 92% qualification rate.",
    metrics: {
      conversionRate: "28.3%",
      avgEPC: "$3.15",
      activeAffiliates: 32,
    },
  },
  {
    id: 3,
    title: "Home Services - HVAC Leads",
    company: "ServiceLeads",
    price: "$35-50/lead",
    upvotes: 167,
    category: "Home Services",
    rating: 4.4,
    description:
      "Exclusive HVAC replacement and repair leads. Homeowners only, verified income $75k+.",
    metrics: {
      conversionRate: "15.7%",
      avgEPC: "$1.85",
      activeAffiliates: 28,
    },
  },
  {
    id: 4,
    title: "Auto Insurance Leads - Multi-Quote",
    company: "InsuranceLeads.com",
    price: "$22-28/lead",
    upvotes: 156,
    category: "Insurance",
    rating: 4.2,
    description:
      "High-intent auto insurance shoppers. Real-time delivery, shared max 3 buyers.",
    metrics: {
      conversionRate: "8.9%",
      avgEPC: "$1.45",
      activeAffiliates: 56,
    },
  },
  {
    id: 5,
    title: "Mortgage Refinance Leads",
    company: "LendingPro",
    price: "$55-75/lead",
    upvotes: 145,
    category: "Finance",
    rating: 4.6,
    description:
      "Qualified mortgage refinance leads, 700+ credit score, verified income and employment.",
    metrics: {
      conversionRate: "10.2%",
      avgEPC: "$2.75",
      activeAffiliates: 23,
    },
  },
]

export function TopOffers() {
  return (
    <section className='py-8 sm:py-12 md:py-16 bg-black/20'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Top Performing Offers
            </h2>
            <p className='text-sm text-muted-foreground mt-1'>
              Highest converting offers with proven ROI
            </p>
          </div>
          <Button asChild variant='outline' className='rounded-full'>
            <Link href='/offers'>View All Offers</Link>
          </Button>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          {topOffers.map((offer, index) => (
            <Card
              key={offer.id}
              className={`card-gradient border-white/5 p-6 transition-all hover:border-white/10 ${
                index === 0
                  ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                  : ""
              }`}
            >
              <div className='flex flex-col gap-6'>
                <div className='flex items-start justify-between'>
                  <div className='flex items-start gap-4'>
                    <div className='rounded-full bg-white/10 p-3'>
                      <Building2Icon className='h-6 w-6' />
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold text-lg'>{offer.title}</h3>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        {offer.company}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant='outline' className='rounded-full'>
                    <Link href={`/offers/${offer.id}`}>View Offer</Link>
                  </Button>
                </div>

                <div className='flex flex-wrap gap-2'>
                  <Badge variant='secondary' className='bg-white/10'>
                    {offer.category}
                  </Badge>
                  <Badge variant='secondary' className='bg-white/10'>
                    {offer.upvotes} Upvotes
                  </Badge>
                  <div className='flex items-center gap-1'>
                    <StarIcon className='h-4 w-4 text-yellow-500' />
                    <span className='text-sm'>{offer.rating}</span>
                  </div>
                </div>

                <p className='text-sm text-muted-foreground'>
                  {offer.description}
                </p>

                <div className='grid gap-4 sm:grid-cols-4'>
                  <div>
                    <p className='text-sm text-muted-foreground mb-1'>Payout</p>
                    <div className='flex items-center gap-2'>
                      <DollarSignIcon className='h-4 w-4 text-green-500' />
                      <span className='font-medium'>{offer.price}</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground mb-1'>
                      Conv. Rate
                    </p>
                    <div className='flex items-center gap-2'>
                      <TrendingUpIcon className='h-4 w-4 text-blue-500' />
                      <span className='font-medium'>
                        {offer.metrics.conversionRate}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground mb-1'>
                      Avg. EPC
                    </p>
                    <div className='flex items-center gap-2'>
                      <BarChart3Icon className='h-4 w-4 text-purple-500' />
                      <span className='font-medium'>
                        {offer.metrics.avgEPC}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground mb-1'>
                      Active Buyers
                    </p>
                    <div className='flex items-center gap-2'>
                      <UsersIcon className='h-4 w-4 text-orange-500' />
                      <span className='font-medium'>
                        {offer.metrics.activeAffiliates}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
