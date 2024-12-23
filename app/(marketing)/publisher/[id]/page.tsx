import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UserIcon,
  ShieldCheckIcon,
  BarChartIcon,
  DollarSignIcon,
  StarIcon,
  SignalIcon,
  TagIcon,
  ThumbsUpIcon,
  TrophyIcon,
  RocketIcon,
  TargetIcon,
  FlameIcon,
  HeartIcon,
} from "lucide-react"

// Mock data - In a real app, this would come from an API or database
const publishers = [
  {
    id: "1",
    name: "Media Buyers Pro",
    description:
      "Expert media buying team specializing in social and search traffic",
    longDescription:
      "With over 5 years of experience in performance marketing, our team specializes in generating high-quality leads across multiple verticals. We focus on scalable, compliant traffic sources and maintain strict quality control measures.",
    joinedDate: "2019",
    location: "Los Angeles, CA",
    specialties: ["Social Media", "Search", "Native"],
    verified: true,
    stats: {
      monthlyLeads: "10,000+",
      avgQuality: "8.9/10",
      activeOffers: 15,
      acceptanceRate: "94%",
      responseTime: "< 1 hour",
      totalSpent: "$500K+",
    },
    verificationBadges: [
      "Verified Publisher",
      "Quality Leader",
      "Top Performer",
    ],
    activeVerticals: [
      {
        name: "Insurance",
        volume: "5000+ leads/month",
        performance: "92% acceptance rate",
        trafficSources: ["Facebook", "Google Ads"],
      },
      {
        name: "Solar",
        volume: "3000+ leads/month",
        performance: "89% acceptance rate",
        trafficSources: ["Native Ads", "Search"],
      },
    ],
    testimonials: [
      {
        id: "1",
        advertiser: "SolarLeads Pro",
        rating: 5,
        date: "2024-02-20",
        content:
          "One of our most reliable publishers. Their leads consistently perform well and they're very responsive to optimization requests.",
        helpful: 12,
        verified: true,
      },
      {
        id: "2",
        advertiser: "InsureTech Solutions",
        rating: 5,
        date: "2024-01-15",
        content:
          "Great communication and high-quality leads. They understand compliance requirements and maintain consistent volume.",
        helpful: 8,
        verified: true,
      },
    ],
    trafficSources: {
      primary: ["Facebook Ads", "Google Ads", "Native Advertising"],
      allowed: ["Social Media", "Search", "Native", "Display"],
      restricted: ["Email", "SMS", "Incentivized"],
      compliance: [
        "TCPA Compliant",
        "CCPA Compliant",
        "No Incentivized Traffic",
        "No Lead Arbitrage",
      ],
    },
    level: {
      current: 15,
      progress: 75,
      title: "Elite Publisher",
      nextMilestone: "25,000 leads to next level",
    },
    achievements: {
      completed: [
        {
          id: "1",
          icon: <TrophyIcon className='h-6 w-6' />,
          name: "Million Lead Club",
          description: "Delivered over 1 million qualified leads",
          date: "2024-01-15",
          rarity: "Legendary",
          color: "from-yellow-500/20 to-amber-500/20",
          border: "border-yellow-500/50",
        },
        {
          id: "2",
          icon: <FlameIcon className='h-6 w-6' />,
          name: "90-Day Streak",
          description: "Maintained 90% acceptance rate for 90 days",
          date: "2024-02-01",
          rarity: "Epic",
          color: "from-purple-500/20 to-pink-500/20",
          border: "border-purple-500/50",
        },
        {
          id: "3",
          icon: <TargetIcon className='h-6 w-6' />,
          name: "Perfect Week",
          description: "100% acceptance rate for 7 consecutive days",
          date: "2024-02-20",
          rarity: "Rare",
          color: "from-blue-500/20 to-cyan-500/20",
          border: "border-blue-500/50",
        },
      ],
      inProgress: [
        {
          id: "4",
          icon: <RocketIcon className='h-6 w-6' />,
          name: "Scale Master",
          description: "Reach $100k in weekly revenue",
          progress: 65,
          requirement: "Current: $65k / $100k weekly",
        },
        {
          id: "5",
          icon: <HeartIcon className='h-6 w-6' />,
          name: "Trusted Partner",
          description: "Maintain 95% satisfaction rate for 30 days",
          progress: 80,
          requirement: "Current: 24 days / 30 days",
        },
      ],
    },
    recentMilestones: [
      {
        date: "2024-02-20",
        achievement: "Reached 1 million leads delivered",
        icon: "🏆",
      },
      {
        date: "2024-02-15",
        achievement: "Achieved Elite Publisher status",
        icon: "⭐",
      },
      {
        date: "2024-02-10",
        achievement: "First $50k revenue week",
        icon: "💰",
      },
    ],
  },
]

export function generateStaticParams() {
  return publishers.map((publisher) => ({
    id: publisher.id,
  }))
}

export default function PublisherPage({ params }: { params: { id: string } }) {
  const publisher = publishers.find((p) => p.id === params.id) || publishers[0]

  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
      <section className='flex-1 py-8 md:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col gap-6'>
            {/* Header Section with Level Progress */}
            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-white/10 p-4'>
                  <UserIcon className='h-8 w-8' />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <h1 className='text-3xl font-bold'>{publisher.name}</h1>
                    {publisher.verified && (
                      <ShieldCheckIcon className='h-5 w-5 text-blue-400' />
                    )}
                  </div>
                  <div className='mt-2 flex items-center gap-2 text-muted-foreground'>
                    <span>{publisher.location}</span>
                    <span>•</span>
                    <span>Member since {publisher.joinedDate}</span>
                  </div>
                </div>
              </div>

              {/* Level Badge */}
              <Card className='p-4 bg-gradient-to-r from-primary/10 to-purple-500/10'>
                <div className='flex items-center gap-4'>
                  <div className='text-2xl font-bold'>
                    Lvl {publisher.level.current}
                  </div>
                  <div className='flex-1 min-w-[200px]'>
                    <div className='flex justify-between text-sm mb-1'>
                      <span>{publisher.level.title}</span>
                      <span>{publisher.level.progress}%</span>
                    </div>
                    <Progress
                      value={publisher.level.progress}
                      className='h-2'
                    />
                    <p className='text-xs text-muted-foreground mt-1'>
                      {publisher.level.nextMilestone}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className='grid gap-4 md:grid-cols-4'>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <BarChartIcon className='h-4 w-4 text-green-500' />
                  <span className='text-sm font-medium'>Monthly Volume</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {publisher.stats.monthlyLeads}
                </p>
                <p className='text-xs text-muted-foreground'>Leads generated</p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <StarIcon className='h-4 w-4 text-blue-500' />
                  <span className='text-sm font-medium'>Quality Score</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {publisher.stats.avgQuality}
                </p>
                <p className='text-xs text-muted-foreground'>Average rating</p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <SignalIcon className='h-4 w-4 text-purple-500' />
                  <span className='text-sm font-medium'>Acceptance Rate</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {publisher.stats.acceptanceRate}
                </p>
                <p className='text-xs text-muted-foreground'>Last 30 days</p>
              </Card>
              <Card className='p-4 bg-white/5'>
                <div className='flex items-center gap-2'>
                  <DollarSignIcon className='h-4 w-4 text-orange-500' />
                  <span className='text-sm font-medium'>Total Spent</span>
                </div>
                <p className='mt-2 text-2xl font-bold'>
                  {publisher.stats.totalSpent}
                </p>
                <p className='text-xs text-muted-foreground'>Lifetime</p>
              </Card>
            </div>

            {/* Verification Badges */}
            <div className='flex flex-wrap gap-2'>
              {publisher.verificationBadges.map((badge) => (
                <Badge key={badge} variant='secondary' className='bg-white/10'>
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Updated Tabs */}
            <Tabs defaultValue='about' className='mt-6'>
              <TabsList>
                <TabsTrigger value='about'>About</TabsTrigger>
                <TabsTrigger value='achievements'>Achievements</TabsTrigger>
                <TabsTrigger value='verticals'>Active Verticals</TabsTrigger>
                <TabsTrigger value='traffic'>Traffic Sources</TabsTrigger>
                <TabsTrigger value='testimonials'>Testimonials</TabsTrigger>
              </TabsList>

              {/* Existing Tab Content */}
              <TabsContent value='about' className='mt-6'>
                <div className='space-y-6'>
                  <div>
                    <h2 className='text-xl font-semibold mb-3'>
                      About {publisher.name}
                    </h2>
                    <p className='text-muted-foreground'>
                      {publisher.longDescription}
                    </p>
                  </div>

                  <div className='grid gap-4 md:grid-cols-2'>
                    <Card className='p-4'>
                      <h3 className='font-semibold mb-2'>
                        Performance Metrics
                      </h3>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Active Offers
                          </span>
                          <span>{publisher.stats.activeOffers}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Response Time
                          </span>
                          <span>{publisher.stats.responseTime}</span>
                        </div>
                        <div className='flex justify-between'>
                          <span className='text-muted-foreground'>
                            Monthly Volume
                          </span>
                          <span>{publisher.stats.monthlyLeads}</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* New Achievements Tab */}
              <TabsContent value='achievements' className='mt-6'>
                <div className='space-y-8'>
                  {/* Recent Milestones */}
                  <Card className='p-6'>
                    <h3 className='text-lg font-semibold mb-4'>
                      Recent Milestones
                    </h3>
                    <div className='space-y-4'>
                      {publisher.recentMilestones.map((milestone, index) => (
                        <div key={index} className='flex items-center gap-3'>
                          <span className='text-2xl'>{milestone.icon}</span>
                          <div>
                            <p className='font-medium'>
                              {milestone.achievement}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              {milestone.date}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Completed Achievements */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>
                      Completed Achievements
                    </h3>
                    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                      {publisher.achievements.completed.map((achievement) => (
                        <Card
                          key={achievement.id}
                          className={`p-4 bg-gradient-to-r ${achievement.color}`}
                        >
                          <div className='flex items-start gap-3'>
                            <div
                              className={`p-2 rounded-lg bg-white/10 ${achievement.border}`}
                            >
                              {achievement.icon}
                            </div>
                            <div>
                              <div className='flex items-center gap-2'>
                                <h4 className='font-semibold'>
                                  {achievement.name}
                                </h4>
                                <Badge variant='secondary' className='text-xs'>
                                  {achievement.rarity}
                                </Badge>
                              </div>
                              <p className='text-sm text-muted-foreground mt-1'>
                                {achievement.description}
                              </p>
                              <p className='text-xs text-muted-foreground mt-2'>
                                Achieved {achievement.date}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* In Progress Achievements */}
                  <div>
                    <h3 className='text-lg font-semibold mb-4'>
                      Achievements In Progress
                    </h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                      {publisher.achievements.inProgress.map((achievement) => (
                        <Card key={achievement.id} className='p-4 bg-white/5'>
                          <div className='flex items-start gap-3'>
                            <div className='p-2 rounded-lg bg-white/10'>
                              {achievement.icon}
                            </div>
                            <div className='flex-1'>
                              <h4 className='font-semibold'>
                                {achievement.name}
                              </h4>
                              <p className='text-sm text-muted-foreground mt-1'>
                                {achievement.description}
                              </p>
                              <div className='mt-3'>
                                <div className='flex justify-between text-sm mb-1'>
                                  <span className='text-xs text-muted-foreground'>
                                    {achievement.requirement}
                                  </span>
                                  <span className='text-xs'>
                                    {achievement.progress}%
                                  </span>
                                </div>
                                <Progress
                                  value={achievement.progress}
                                  className='h-1.5'
                                />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Existing Tab Content */}
              <TabsContent value='verticals' className='mt-6'>
                <div className='grid gap-4'>
                  {publisher.activeVerticals.map((vertical) => (
                    <Card key={vertical.name} className='p-4'>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h3 className='font-semibold'>{vertical.name}</h3>
                          <div className='flex gap-2 mt-2'>
                            <Badge variant='secondary' className='bg-white/10'>
                              {vertical.volume}
                            </Badge>
                            <Badge variant='secondary' className='bg-white/10'>
                              {vertical.performance}
                            </Badge>
                          </div>
                          <div className='flex gap-2 mt-3'>
                            {vertical.trafficSources.map((source) => (
                              <Badge key={source} variant='outline'>
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value='traffic' className='mt-6'>
                <div className='space-y-6'>
                  <Card className='p-4'>
                    <h3 className='font-semibold mb-3'>
                      Primary Traffic Sources
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {publisher.trafficSources.primary.map((source) => (
                        <Badge
                          key={source}
                          variant='secondary'
                          className='bg-white/10'
                        >
                          <TagIcon className='h-3 w-3 mr-1' />
                          {source}
                        </Badge>
                      ))}
                    </div>
                  </Card>

                  <Card className='p-4'>
                    <h3 className='font-semibold mb-3'>
                      Compliance & Restrictions
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                      {publisher.trafficSources.compliance.map((item) => (
                        <Badge key={item} variant='outline'>
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value='testimonials' className='mt-6'>
                <div className='space-y-6'>
                  <div className='grid gap-4'>
                    {publisher.testimonials.map((testimonial) => (
                      <Card key={testimonial.id} className='p-4'>
                        <div className='space-y-4'>
                          <div className='flex items-start justify-between'>
                            <div>
                              <div className='flex items-center gap-2'>
                                <span className='font-semibold'>
                                  {testimonial.advertiser}
                                </span>
                                {testimonial.verified && (
                                  <Badge
                                    variant='secondary'
                                    className='bg-blue-500/10 text-blue-400'
                                  >
                                    Verified Advertiser
                                  </Badge>
                                )}
                              </div>
                              <div className='flex items-center gap-1 mt-1'>
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < testimonial.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-500"
                                    }`}
                                  />
                                ))}
                                <span className='text-sm text-muted-foreground ml-2'>
                                  {new Date(
                                    testimonial.date
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className='text-muted-foreground'>
                            {testimonial.content}
                          </p>

                          <div className='flex items-center gap-2'>
                            <Button
                              variant='ghost'
                              size='sm'
                              className='flex items-center gap-1 text-muted-foreground hover:text-foreground'
                            >
                              <ThumbsUpIcon className='h-4 w-4' />
                              <span>Helpful ({testimonial.helpful})</span>
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
