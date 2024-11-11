import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2Icon,
  StarIcon,
  TrendingUpIcon,
  Globe2Icon,
  ShieldCheckIcon,
  DollarSignIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react"
import { OfferStats } from "@/components/marketing/offers/offer-stats"
import { OfferRequirements } from "@/components/marketing/offers/offer-requirements"
import { AdvertiserInfo } from "@/components/marketing/offers/advertiser-info"

// Mock data - In a real app, this would come from an API or database
const offers = [
  {
    id: "1",
    title: "Solar Leads - High Intent Homeowners",
    company: "SolarLeads Pro",
    price: "$45-65/lead",
    upvotes: 234,
    category: "Solar",
    rating: 4.8,
    description:
      "Exclusive residential solar leads with 680+ credit score, homeowners only. 85% contact rate.",
    longDescription:
      "Our solar leads are generated from homeowners actively looking to install solar panels. Each lead is thoroughly verified for property ownership, credit score, and genuine interest in solar installation. Perfect for solar installers and sales teams looking for high-quality, ready-to-convert prospects.",
    countries: ["US"],
    leadType: "Exclusive",
    conversionRate: "12.5%",
    verified: true,
    requirements: {
      targeting: [
        "Homeowners only",
        "Credit score 680+",
        "Single-family homes",
        "No mobile homes",
      ],
      traffic: [
        "Search allowed",
        "Social allowed",
        "Display allowed",
        "Native allowed",
        "Email not allowed",
      ],
      restrictions: ["No incentivized traffic", "No co-reg", "No spam"],
    },
    stats: {
      dailyCap: 500,
      activeAffiliates: 45,
      avgLeadQuality: 8.9,
      acceptanceRate: "92%",
      responseTime: "15 min",
      avgEPC: "$2.45",
    },
    advertiser: {
      name: "SolarLeads Pro",
      founded: "2018",
      totalOffers: "12",
      avgPayout: "$55",
      paymentTerms: "Net 15",
      minimumPayment: "$500",
      verificationBadges: [
        "Verified Business",
        "Fast Payment",
        "Premium Partner",
      ],
    },
  },
  {
    id: "2",
    title: "Medicare Advantage Leads",
    company: "HealthLeads Direct",
    price: "$35-50/lead",
    upvotes: 189,
    category: "Insurance",
    rating: 4.6,
    description:
      "Qualified Medicare Advantage leads aged 65+. Pre-screened for eligibility.",
    longDescription:
      "Premium Medicare Advantage leads from seniors actively seeking coverage options. Each lead is verified for age and eligibility requirements. Ideal for insurance agents and brokers looking for qualified Medicare prospects.",
    countries: ["US"],
    leadType: "Exclusive",
    conversionRate: "15%",
    verified: true,
    requirements: {
      targeting: ["Age 65+", "US Residents", "Medicare Eligible"],
      traffic: ["Search allowed", "Social allowed", "Email allowed"],
      restrictions: ["No incentivized traffic", "No co-reg"],
    },
    stats: {
      dailyCap: 300,
      activeAffiliates: 32,
      avgLeadQuality: 8.5,
      acceptanceRate: "89%",
      responseTime: "20 min",
      avgEPC: "$2.10",
    },
    advertiser: {
      name: "HealthLeads Direct",
      founded: "2019",
      totalOffers: "8",
      avgPayout: "$42",
      paymentTerms: "Net 30",
      minimumPayment: "$1000",
      verificationBadges: ["Verified Business", "Top Performer"],
    },
  },
]

// This function is required for static site generation with dynamic routes
export function generateStaticParams() {
  return offers.map((offer) => ({
    id: offer.id,
  }))
}

export default function OfferPage({ params }: { params: { id: string } }) {
  const offer = offers.find((o) => o.id === params.id) || offers[0]

  return (
    <div className='container py-8'>
      {/* Header Section */}
      <div className='flex flex-col gap-6'>
        <div className='flex items-start justify-between'>
          <div className='flex items-start gap-4'>
            <div className='rounded-full bg-white/10 p-4'>
              <Building2Icon className='h-8 w-8' />
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-bold'>{offer.title}</h1>
                {offer.verified && (
                  <ShieldCheckIcon className='h-5 w-5 text-blue-400' />
                )}
              </div>
              <div className='mt-2 flex items-center gap-2 text-muted-foreground'>
                <span>{offer.company}</span>
                <span>•</span>
                <div className='flex items-center gap-1'>
                  <StarIcon className='h-4 w-4 text-yellow-500' />
                  <span>{offer.rating}</span>
                </div>
              </div>
            </div>
          </div>
          <Button size='lg' className='rounded-full'>
            Apply to Run Offer
          </Button>
        </div>

        {/* Quick Stats */}
        <div className='grid gap-4 md:grid-cols-4'>
          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-2'>
              <DollarSignIcon className='h-4 w-4 text-green-500' />
              <span className='text-sm font-medium'>Payout</span>
            </div>
            <p className='mt-2 text-2xl font-bold'>{offer.price}</p>
            <p className='text-xs text-muted-foreground'>Per qualified lead</p>
          </Card>
          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-2'>
              <UsersIcon className='h-4 w-4 text-blue-500' />
              <span className='text-sm font-medium'>Daily Cap</span>
            </div>
            <p className='mt-2 text-2xl font-bold'>{offer.stats.dailyCap}</p>
            <p className='text-xs text-muted-foreground'>Leads per day</p>
          </Card>
          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-2'>
              <TrendingUpIcon className='h-4 w-4 text-purple-500' />
              <span className='text-sm font-medium'>Conversion</span>
            </div>
            <p className='mt-2 text-2xl font-bold'>{offer.conversionRate}</p>
            <p className='text-xs text-muted-foreground'>Average rate</p>
          </Card>
          <Card className='p-4 bg-white/5'>
            <div className='flex items-center gap-2'>
              <ClockIcon className='h-4 w-4 text-orange-500' />
              <span className='text-sm font-medium'>Response Time</span>
            </div>
            <p className='mt-2 text-2xl font-bold'>
              {offer.stats.responseTime}
            </p>
            <p className='text-xs text-muted-foreground'>Average</p>
          </Card>
        </div>

        {/* Badges */}
        <div className='flex flex-wrap gap-2'>
          <Badge variant='secondary' className='bg-white/10'>
            {offer.category}
          </Badge>
          <Badge variant='secondary' className='bg-white/10'>
            {offer.leadType}
          </Badge>
          {offer.countries.map((country) => (
            <Badge key={country} variant='secondary' className='bg-white/10'>
              <Globe2Icon className='mr-1 h-3 w-3' />
              {country}
            </Badge>
          ))}
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue='overview' className='mt-6'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='requirements'>Requirements</TabsTrigger>
            <TabsTrigger value='advertiser'>Advertiser</TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='mt-6'>
            <div className='space-y-6'>
              <div>
                <h2 className='text-xl font-semibold mb-3'>About This Offer</h2>
                <p className='text-muted-foreground'>{offer.longDescription}</p>
              </div>
              <OfferStats stats={offer.stats} />
            </div>
          </TabsContent>
          <TabsContent value='requirements' className='mt-6'>
            <OfferRequirements requirements={offer.requirements} />
          </TabsContent>
          <TabsContent value='advertiser' className='mt-6'>
            <AdvertiserInfo data={offer.advertiser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
