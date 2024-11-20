import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  TrendingUpIcon,
  ShieldCheckIcon,
  DollarSignIcon,
  ClockIcon,
  ZapIcon,
  BadgeCheckIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
} from "lucide-react"
import Link from "next/link"

const benefits = [
  {
    icon: <TrendingUpIcon className='h-6 w-6' />,
    title: "Premium Offers",
    description:
      "Get exclusive access to high-paying offers from verified advertisers across multiple verticals.",
  },
  {
    icon: <DollarSignIcon className='h-6 w-6' />,
    title: "Reliable Payments",
    description:
      "Enjoy weekly payments and competitive payouts with our automated payment system.",
  },
  {
    icon: <BadgeCheckIcon className='h-6 w-6' />,
    title: "Build Credibility",
    description:
      "Gain instant credibility as a verified publisher in our trusted marketplace.",
  },
  {
    icon: <ZapIcon className='h-6 w-6' />,
    title: "Smart Tools",
    description:
      "Access advanced tracking, reporting, and optimization tools to maximize your earnings.",
  },
]

const features = [
  "Verified advertiser network",
  "Weekly payment schedules",
  "Real-time performance tracking",
  "Multiple vertical opportunities",
  "Direct advertiser communication",
  "Custom payout terms",
  "API integration support",
  "Premium publisher status",
]

const testimonials = [
  {
    quote:
      "Since joining Adzado, my revenue has grown by 200%. The quality of advertisers and reliable payments make it my go-to platform.",
    author: "David Thompson",
    role: "Media Buyer",
    company: "Performance Media Group",
  },
  {
    quote:
      "The verification process gives me confidence in the advertisers I work with, and the support team is always there when I need them.",
    author: "Lisa Martinez",
    role: "Publisher",
    company: "Digital Lead Pro",
  },
]

const featuredPublishers = {
  new: [
    {
      name: "Digital Growth Media",
      joined: "Joined December 2023",
      focus: "Social Media Marketing",
      industries: ["Finance", "Insurance", "Real Estate"],
      avatar: "/avatars/publisher-1.png",
    },
    {
      name: "LeadGen Pros",
      joined: "Joined January 2024",
      focus: "Email Marketing",
      industries: ["Education", "Healthcare", "Technology"],
      avatar: "/avatars/publisher-2.png",
    },
    {
      name: "Traffic Masters",
      joined: "Joined February 2024",
      focus: "Native Advertising",
      industries: ["E-commerce", "Crypto", "Gaming"],
      avatar: "/avatars/publisher-3.png",
    },
  ],
  top: [
    {
      name: "Elite Media Group",
      since: "Partner since 2022",
      focus: "Multi-Channel Marketing",
      achievement: "$50k+ weekly revenue",
      avatar: "/avatars/top-publisher-1.png",
      badges: [
        {
          icon: "🏆",
          label: "1M+ Leads",
          color: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20",
          borderColor: "border-yellow-500/50",
        },
        {
          icon: "⚡",
          label: "Fast Converter",
          color: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-500/50",
        },
        {
          icon: "💎",
          label: "Elite Status",
          color: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
          borderColor: "border-purple-500/50",
        },
      ],
    },
    {
      name: "Conversion Kings",
      since: "Partner since 2021",
      focus: "Performance Marketing",
      achievement: "1M+ leads delivered",
      avatar: "/avatars/top-publisher-2.png",
      badges: [
        {
          icon: "🎯",
          label: "100% Acceptance",
          color: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
          borderColor: "border-green-500/50",
        },
        {
          icon: "🔥",
          label: "90d Streak",
          color: "bg-gradient-to-r from-orange-500/20 to-red-500/20",
          borderColor: "border-orange-500/50",
        },
        {
          icon: "⭐",
          label: "Top 10",
          color: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20",
          borderColor: "border-yellow-500/50",
        },
      ],
    },
    {
      name: "Global Media Solutions",
      since: "Partner since 2022",
      focus: "International Traffic",
      achievement: "Active in 15+ countries",
      avatar: "/avatars/top-publisher-3.png",
      badges: [
        {
          icon: "🌍",
          label: "Global Reach",
          color: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
          borderColor: "border-blue-500/50",
        },
        {
          icon: "📈",
          label: "500k Leads",
          color: "bg-gradient-to-r from-purple-500/20 to-pink-500/20",
          borderColor: "border-purple-500/50",
        },
        {
          icon: "🚀",
          label: "Rising Star",
          color: "bg-gradient-to-r from-indigo-500/20 to-violet-500/20",
          borderColor: "border-indigo-500/50",
        },
      ],
    },
  ],
}

export default function PublishersPage() {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='py-8 sm:py-12 md:py-16 lg:py-20'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center'>
            <div className='space-y-4'>
              <h1 className='gradient-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter'>
                Maximize Your Revenue Potential
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-400 text-base sm:text-lg md:text-xl'>
                Join our trusted marketplace to access premium offers, reliable
                payments, and build lasting relationships with top advertisers.
              </p>
            </div>
            <div className='flex flex-col gap-4 min-[400px]:flex-row'>
              <Button size='lg' className='rounded-full'>
                Apply as Publisher
              </Button>
              <Button size='lg' variant='outline' className='rounded-full'>
                View Available Offers
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            <Card className='p-6 bg-white/5 text-center'>
              <DollarSignIcon className='h-8 w-8 mb-4 mx-auto text-green-500' />
              <h3 className='text-3xl font-bold'>$10K+</h3>
              <p className='text-sm text-gray-400'>Average Weekly Earnings</p>
            </Card>
            <Card className='p-6 bg-white/5 text-center'>
              <ClockIcon className='h-8 w-8 mb-4 mx-auto text-blue-500' />
              <h3 className='text-3xl font-bold'>24/7</h3>
              <p className='text-sm text-gray-400'>Support Available</p>
            </Card>
            <Card className='p-6 bg-white/5 text-center'>
              <ShieldCheckIcon className='h-8 w-8 mb-4 mx-auto text-purple-500' />
              <h3 className='text-3xl font-bold'>100%</h3>
              <p className='text-sm text-gray-400'>Payment Reliability</p>
            </Card>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <section className='py-12 sm:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold sm:text-4xl mb-4'>
              Why Publishers Choose Us
            </h2>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              Join a marketplace that empowers publishers with the tools,
              connections, and credibility needed to scale their business
              effectively.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
            {benefits.map((benefit, index) => (
              <Card key={index} className='p-6 bg-white/5'>
                <div className='text-primary mb-4'>{benefit.icon}</div>
                <h3 className='font-semibold text-xl mb-2'>{benefit.title}</h3>
                <p className='text-gray-400 text-sm'>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className='py-12 sm:py-16 bg-white/5'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='grid gap-12 lg:grid-cols-2 items-center'>
            <div>
              <h2 className='text-3xl font-bold sm:text-4xl mb-6'>
                Everything You Need to Succeed
              </h2>
              <p className='text-gray-400 mb-8'>
                Our platform provides all the essential tools and support to
                help you establish yourself as a respected publisher in the
                industry.
              </p>
              <div className='grid gap-4 sm:grid-cols-2'>
                {features.map((feature, index) => (
                  <div key={index} className='flex items-center gap-2'>
                    <CheckCircle2Icon className='h-5 w-5 text-primary' />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='relative'>
              <div className='aspect-square rounded-lg bg-gradient-to-tr from-primary/20 to-primary/10 backdrop-blur-sm'>
                {/* Placeholder for feature illustration or screenshot */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className='py-12 sm:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold sm:text-4xl mb-4'>
              Success Stories from Our Publishers
            </h2>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              Hear from publishers who have transformed their business through
              our platform.
            </p>
          </div>
          <div className='grid gap-8 md:grid-cols-2'>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className='p-6 bg-white/5'>
                <p className='text-lg mb-6'>"{testimonial.quote}"</p>
                <div className='flex items-center gap-4'>
                  <div className='h-12 w-12 rounded-full bg-primary/20' />
                  <div>
                    <p className='font-semibold'>{testimonial.author}</p>
                    <p className='text-sm text-gray-400'>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Featured Publishers Section */}
      <section className='py-12 sm:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='space-y-16'>
            {/* New Publishers */}
            <div>
              <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold sm:text-4xl mb-4'>
                  Welcome Our Newest Publishers
                </h2>
                <p className='text-gray-400 max-w-2xl mx-auto'>
                  See how quickly new publishers are finding success on our
                  platform
                </p>
              </div>
              <div className='grid gap-8 md:grid-cols-3'>
                {featuredPublishers.new.map((publisher, index) => (
                  <Link
                    key={index}
                    href={`/publisher/${index + 1}`}
                    className='block transition-transform hover:scale-[1.02]'
                  >
                    <Card className='p-6 bg-white/5 h-full hover:bg-white/10'>
                      <div className='flex items-center gap-4 mb-4'>
                        <div className='h-12 w-12 rounded-full bg-primary/20' />
                        <div>
                          <h3 className='font-semibold'>{publisher.name}</h3>
                          <p className='text-sm text-primary'>
                            {publisher.joined}
                          </p>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <p className='text-sm text-gray-400'>
                          {publisher.focus}
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {publisher.industries.map(
                            (industry, industryIndex) => (
                              <div
                                key={industryIndex}
                                className='px-2.5 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10'
                              >
                                {industry}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Publishers */}
            <div>
              <div className='text-center mb-12'>
                <h2 className='text-3xl font-bold sm:text-4xl mb-4'>
                  Top Performing Publishers
                </h2>
                <p className='text-gray-400 max-w-2xl mx-auto'>
                  Join these success stories and build your publishing empire
                </p>
              </div>
              <div className='grid gap-8 md:grid-cols-3'>
                {featuredPublishers.top.map((publisher, index) => (
                  <Link
                    key={index}
                    href={`/publisher/${index + 4}`}
                    className='block transition-transform hover:scale-[1.02]'
                  >
                    <Card className='p-6 bg-gradient-to-tr from-primary/10 to-purple-500/10 h-full hover:from-primary/15 hover:to-purple-500/15'>
                      <div className='flex items-center gap-4 mb-6'>
                        <div className='h-12 w-12 rounded-full bg-primary/20' />
                        <div>
                          <h3 className='font-semibold'>{publisher.name}</h3>
                          <p className='text-sm text-primary'>
                            {publisher.since}
                          </p>
                        </div>
                      </div>
                      <div className='space-y-2 mb-6'>
                        <p className='text-sm text-gray-400'>
                          {publisher.focus}
                        </p>
                        <p className='text-sm font-medium text-green-500'>
                          {publisher.achievement}
                        </p>
                      </div>
                      <div className='flex flex-wrap gap-2'>
                        {publisher.badges.map((badge, badgeIndex) => (
                          <div
                            key={badgeIndex}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${badge.color} ${badge.borderColor}`}
                          >
                            <span className='text-sm'>{badge.icon}</span>
                            <span className='text-xs font-medium'>
                              {badge.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <Card className='p-6 sm:p-8 md:p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0'>
            <div className='flex flex-col items-center text-center gap-6'>
              <h2 className='text-3xl font-bold'>
                Ready to Scale Your Publishing Business?
              </h2>
              <p className='text-gray-400 max-w-2xl'>
                Join thousands of successful publishers who trust our
                marketplace to access premium offers, build credibility, and
                grow their revenue consistently.
              </p>
              <Button size='lg' className='rounded-full'>
                Apply Now <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
