"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2Icon,
  StarIcon,
  TrendingUpIcon,
  Globe2Icon,
  ShieldCheckIcon,
} from "lucide-react"

const offers = [
  {
    id: 1,
    title: "Solar Leads - High Intent Homeowners",
    company: "SolarLeads Pro",
    price: "$45-65/lead",
    upvotes: 234,
    category: "Solar",
    rating: 4.8,
    description:
      "Exclusive residential solar leads with 680+ credit score, homeowners only. 85% contact rate.",
    countries: ["US"],
    leadType: "Exclusive",
    conversionRate: "12.5%",
    verified: true,
  },
  {
    id: 2,
    title: "Medicare Advantage Live Transfers",
    company: "HealthConnect",
    price: "$75-95/transfer",
    upvotes: 189,
    category: "Insurance",
    rating: 5.0,
    description:
      "Live transfer Medicare leads, 65+ demographic, pre-screened for eligibility. 92% qualification rate.",
    countries: ["US"],
    leadType: "Live Transfer",
    conversionRate: "28.3%",
    verified: true,
  },
  {
    id: 3,
    title: "HVAC Service Leads",
    company: "ServiceLeads",
    price: "$35-50/lead",
    upvotes: 167,
    category: "Home Services",
    rating: 4.4,
    description:
      "Exclusive HVAC replacement and repair leads. Homeowners only, verified income $75k+.",
    countries: ["US", "CA"],
    leadType: "Exclusive",
    conversionRate: "15.7%",
    verified: true,
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
    countries: ["US"],
    leadType: "Shared",
    conversionRate: "8.9%",
    verified: true,
  },
]

export function OffersList() {
  return (
    <div className='space-y-6'>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          className='card-gradient border-white/5 p-6 transition-all hover:border-white/10'
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
                    {offer.verified && (
                      <ShieldCheckIcon className='h-4 w-4 text-blue-400' />
                    )}
                  </div>
                  <p className='text-sm text-muted-foreground'>
                    {offer.company}
                  </p>
                </div>
              </div>
              <Button
                variant='outline'
                className='rounded-full border-white/10 hover:bg-white/5'
              >
                View Offer
              </Button>
            </div>

            <div className='flex flex-wrap gap-2'>
              <Badge variant='secondary' className='bg-white/10'>
                {offer.category}
              </Badge>
              <Badge variant='secondary' className='bg-white/10'>
                {offer.leadType}
              </Badge>
              {offer.countries.map((country) => (
                <Badge
                  key={country}
                  variant='secondary'
                  className='bg-white/10'
                >
                  <Globe2Icon className='mr-1 h-3 w-3' />
                  {country}
                </Badge>
              ))}
            </div>

            <p className='text-sm text-muted-foreground'>{offer.description}</p>

            <div className='flex flex-wrap items-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <StarIcon className='h-4 w-4 text-yellow-500' />
                <span>{offer.rating} Rating</span>
              </div>
              <div className='flex items-center gap-2'>
                <TrendingUpIcon className='h-4 w-4 text-green-500' />
                <span>{offer.conversionRate} Conv. Rate</span>
              </div>
              <span className='font-medium text-green-500'>{offer.price}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
