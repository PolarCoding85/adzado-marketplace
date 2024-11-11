"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2Icon,
  StarIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "lucide-react"
import Link from "next/link"

const featuredOffers = [
  {
    id: 1,
    title: "Premium Solar Leads - Exclusive Territory",
    company: "SolarLeads Pro",
    price: "$65-85/lead",
    category: "Solar",
    rating: 4.9,
    description:
      "High-intent solar leads with 700+ credit score. Exclusive territories available with 95% contact rate.",
    metrics: {
      conversionRate: "15.5%",
      avgEPC: "$3.25",
      activeAffiliates: 12,
    },
    badge: "Premium",
  },
  {
    id: 2,
    title: "Elite Medicare Advantage Transfers",
    company: "HealthConnect",
    price: "$95-125/transfer",
    category: "Insurance",
    rating: 5.0,
    description:
      "Live transfer Medicare leads, pre-qualified seniors 65+. Industry-leading 97% qualification rate.",
    metrics: {
      conversionRate: "32.5%",
      avgEPC: "$4.15",
      activeAffiliates: 8,
    },
    badge: "Featured",
  },
]

export function FeaturedOffers() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-2'>
        <SparklesIcon className='h-5 w-5 text-yellow-500' />
        <h2 className='text-lg font-semibold'>Featured Offers</h2>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        {featuredOffers.map((offer) => (
          <Card
            key={offer.id}
            className='relative overflow-hidden border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 via-background to-purple-500/10'
          >
            {/* Premium Badge */}
            <div className='absolute -right-12 top-6 rotate-45 bg-yellow-500 px-12 py-1 text-xs font-medium text-black'>
              {offer.badge}
            </div>

            <div className='p-6 space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-yellow-500/10 p-3'>
                  <Building2Icon className='h-6 w-6 text-yellow-500' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold text-lg'>{offer.title}</h3>
                    <ShieldCheckIcon className='h-4 w-4 text-yellow-500' />
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {offer.company}
                  </p>
                </div>
              </div>

              <div className='flex flex-wrap gap-2'>
                <Badge className='bg-yellow-500/10 text-yellow-500 border-yellow-500/20'>
                  {offer.category}
                </Badge>
                <div className='flex items-center gap-1'>
                  <StarIcon className='h-4 w-4 text-yellow-500' />
                  <span className='text-sm font-medium'>{offer.rating}</span>
                </div>
              </div>

              <p className='text-sm'>{offer.description}</p>

              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>
                    Conv. Rate
                  </p>
                  <div className='flex items-center gap-1'>
                    <TrendingUpIcon className='h-4 w-4 text-yellow-500' />
                    <span className='font-medium'>
                      {offer.metrics.conversionRate}
                    </span>
                  </div>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>Avg. EPC</p>
                  <span className='font-medium'>{offer.metrics.avgEPC}</span>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground mb-1'>Active</p>
                  <span className='font-medium'>
                    {offer.metrics.activeAffiliates} buyers
                  </span>
                </div>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold text-yellow-500'>
                  {offer.price}
                </span>
                <Button
                  asChild
                  className='rounded-full bg-yellow-500 hover:bg-yellow-600'
                >
                  <Link href={`/offers/${offer.id}`}>
                    View Details
                    <ArrowRightIcon className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
