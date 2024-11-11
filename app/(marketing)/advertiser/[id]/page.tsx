import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2Icon,
  ShieldCheckIcon,
  CalendarIcon,
  BarChartIcon,
  DollarSignIcon,
  ClockIcon,
  StarIcon,
  ThumbsUpIcon,
} from "lucide-react"

// Mock data - In a real app, this would come from an API or database
const advertisers = [
  {
    id: "1",
    name: "SolarLeads Pro",
    description:
      "Leading provider of high-quality solar installation leads across the United States.",
    longDescription:
      "SolarLeads Pro has been at the forefront of the renewable energy lead generation industry since 2018. We specialize in connecting qualified homeowners with solar installation companies, maintaining some of the highest conversion rates in the industry.",
    founded: "2018",
    headquarters: "Austin, TX",
    industry: "Renewable Energy",
    verified: true,
    stats: {
      totalOffers: 12,
      avgPayout: "$55",
      activePublishers: 145,
      avgAcceptanceRate: "92%",
      responseTime: "15 min",
      lifetimeLeads: "50,000+",
    },
    verificationBadges: [
      "Verified Business",
      "Fast Payment",
      "Premium Partner",
    ],
    activeOffers: [
      {
        id: "1",
        title: "Solar Leads - High Intent Homeowners",
        price: "$45-65/lead",
        category: "Solar",
        conversionRate: "12.5%",
        description:
          "Exclusive residential solar leads with 680+ credit score, homeowners only. 85% contact rate.",
      },
      {
        id: "2",
        title: "Commercial Solar Installation Leads",
        price: "$80-100/lead",
        category: "Solar",
        conversionRate: "15%",
        description:
          "Premium commercial property solar installation leads. Pre-qualified business owners and property managers.",
      },
    ],
    reviews: [
      {
        id: "1",
        publisher: "Media Buyers Pro",
        rating: 5,
        date: "2024-02-15",
        content:
          "One of the best advertisers we've worked with. Their leads convert exceptionally well and their support team is very responsive. Payment is always on time.",
        helpful: 24,
        verified: true,
      },
      {
        id: "2",
        publisher: "LeadGen Masters",
        rating: 4,
        date: "2024-01-28",
        content:
          "Good quality offers with competitive payouts. The only reason for 4 stars is sometimes their lead validation can be strict, but that's also why their leads convert so well.",
        helpful: 18,
        verified: true,
      },
      {
        id: "3",
        publisher: "Digital Marketing Solutions",
        rating: 5,
        date: "2024-01-15",
        content:
          "Excellent communication and very professional team. They're always looking to optimize campaigns and provide detailed feedback. Highly recommended!",
        helpful: 15,
        verified: true,
      },
    ],
  },
]

export function generateStaticParams() {
  return advertisers.map((advertiser) => ({
    id: advertiser.id,
  }))
}

export default function AdvertiserPage({ params }: { params: { id: string } }) {
  const advertiser =
    advertisers.find((a) => a.id === params.id) || advertisers[0]

  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
      <section className='flex-1 py-8 md:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          {/* Header Section */}
          <div className='flex flex-col gap-6'>
            <div className='flex items-start justify-between'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-white/10 p-4'>
                  <Building2Icon className='h-8 w-8' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-3xl font-bold'>{advertiser.name}</h1>
                    {advertiser.verified && (
                      <ShieldCheckIcon className='h-5 w-5 text-blue-400' />
                    )}
                  </div>
                  <div className='mt-2 flex items-center gap-2 text-muted-foreground'>
                    <span>{advertiser.industry}</span>
                    <span>•</span>
                    <span>{advertiser.headquarters}</span>
                  </div>
                </div>
              </div>
              <Button size='lg' className='rounded-full'>
                Contact Advertiser
              </Button>
            </div>

            {/* Quick Stats */}
            <div className='grid gap-4 md:grid-cols-4'>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <DollarSignIcon className='h-4 w-4 text-green-500' />
                  <span className='text-sm font-medium'>Avg. Payout</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {advertiser.stats.avgPayout}
                </p>
                <p className='text-xs text-muted-foreground'>
                  Per qualified lead
                </p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <BarChartIcon className='h-4 w-4 text-blue-500' />
                  <span className='text-sm font-medium'>Active Offers</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {advertiser.stats.totalOffers}
                </p>
                <p className='text-xs text-muted-foreground'>
                  Currently running
                </p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <CalendarIcon className='h-4 w-4 text-purple-500' />
                  <span className='text-sm font-medium'>Founded</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>{advertiser.founded}</p>
                <p className='text-xs text-muted-foreground'>
                  Year established
                </p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <ClockIcon className='h-4 w-4 text-orange-500' />
                  <span className='text-sm font-medium'>Response Time</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {advertiser.stats.responseTime}
                </p>
                <p className='text-xs text-muted-foreground'>Average</p>
              </Card>
            </div>

            {/* Verification Badges */}
            <div className='flex flex-wrap gap-2'>
              {advertiser.verificationBadges.map((badge) => (
                <Badge key={badge} variant='secondary' className='bg-white/10'>
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Tabs Content */}
            <Tabs defaultValue='about' className='mt-6'>
              <TabsList>
                <TabsTrigger value='about'>About</TabsTrigger>
                <TabsTrigger value='offers'>Active Offers</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value='about' className='mt-6'>
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-xl font-semibold mb-3'>
                      About {advertiser.name}
                    </h2>
                    <p className='text-muted-foreground'>
                      {advertiser.longDescription}
                    </p>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <Card className='p-4'>
                      <h3 className='font-semibold mb-2'>Performance Stats</h3>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Active Publishers
                          </span>
                          <span>{advertiser.stats.activePublishers}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Acceptance Rate
                          </span>
                          <span>{advertiser.stats.avgAcceptanceRate}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Lifetime Leads
                          </span>
                          <span>{advertiser.stats.lifetimeLeads}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='offers' className='mt-6'>
                <div className='grid gap-4'>
                  {advertiser.activeOffers.map((offer) => (
                    <Card key={offer.id} className='p-4'>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h3 className='font-semibold'>{offer.title}</h3>
                          <p className='text-sm text-muted-foreground mt-1'>
                            {offer.description}
                          </p>
                          <div className='flex gap-2 mt-2'>
                            <Badge variant='secondary' className='bg-white/10'>
                              {offer.category}
                            </Badge>
                            <Badge variant='secondary' className='bg-white/10'>
                              {offer.conversionRate} Conv. Rate
                            </Badge>
                          </div>
                        </div>
                        <div className='text-right flex flex-col items-end gap-2'>
                          <div>
                            <p className='font-semibold'>{offer.price}</p>
                            <p className='text-sm text-muted-foreground'>
                              per lead
                            </p>
                          </div>
                          <Button size='sm' className='rounded-full mt-2'>
                            Apply to Offer
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='reviews' className='mt-6'>
                <div className='space-y-6'>
                  <div className='flex items-center justify-between'>
                    <h2 className='text-xl font-semibold'>Publisher Reviews</h2>
                    <Button variant='outline' className='rounded-full'>
                      Write a Review
                    </Button>
                  </div>

                  <div className='grid gap-4'>
                    {advertiser.reviews.map((review) => (
                      <Card key={review.id} className='p-4'>
                        <div className='space-y-4'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <div className='flex items-center gap-2'>
                                <span className='font-semibold'>
                                  {review.publisher}
                                </span>
                                {review.verified && (
                                  <Badge
                                    variant='secondary'
                                    className='bg-blue-500/10 text-blue-400'
                                  >
                                    Verified Partner
                                  </Badge>
                                )}
                              </div>
                              <div className='flex items-center gap-1 mt-1'>
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                ))}
                                <span className='text-sm text-muted-foreground ml-2'>
                                  {new Date(review.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "long",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className='text-muted-foreground'>
                            {review.content}
                          </p>

                          <div className='flex items-center gap-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='flex items-center gap-1 text-muted-foreground hover:text-foreground'
                            >
                              <ThumbsUpIcon className='h-4 w-4' />
                              <span>Helpful ({review.helpful})</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  )
}
