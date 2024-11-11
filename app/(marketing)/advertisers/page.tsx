import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  BarChart3Icon,
  ShieldCheckIcon,
  UsersIcon,
  GlobeIcon,
  ZapIcon,
  LineChartIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
} from "lucide-react"

const benefits = [
  {
    icon: <UsersIcon className='h-6 w-6' />,
    title: "Access Top Media Buyers",
    description:
      "Connect with thousands of verified media buyers and affiliates actively seeking quality offers.",
  },
  {
    icon: <ShieldCheckIcon className='h-6 w-6' />,
    title: "Quality Control",
    description:
      "Advanced fraud prevention and traffic quality monitoring to ensure you receive only the highest quality leads.",
  },
  {
    icon: <GlobeIcon className='h-6 w-6' />,
    title: "Global Reach",
    description:
      "Expand your reach with our network of international media buyers across multiple geos and verticals.",
  },
  {
    icon: <ZapIcon className='h-6 w-6' />,
    title: "Real-Time Analytics",
    description:
      "Track performance, optimize campaigns, and manage your offers with our advanced reporting dashboard.",
  },
]

const features = [
  "Detailed buyer verification process",
  "Real-time lead delivery via API",
  "Custom lead validation rules",
  "Automated payments system",
  "Dedicated account manager",
  "Fraud prevention tools",
  "Performance analytics",
  "Multi-user access",
]

const testimonials = [
  {
    quote:
      "We've seen a 3x increase in quality leads since joining the platform. The verification process ensures we only work with serious buyers.",
    author: "Sarah Chen",
    role: "Director of Lead Generation",
    company: "InsureTech Solutions",
  },
  {
    quote:
      "The platform's analytics and optimization tools have helped us improve our lead quality and reduce costs significantly.",
    author: "Michael Rodriguez",
    role: "VP of Marketing",
    company: "SolarLeads Pro",
  },
]

export default function AdvertisersPage() {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='py-8 sm:py-12 md:py-16 lg:py-20'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center'>
            <div className='space-y-4'>
              <h1 className='gradient-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter'>
                Grow Your Lead Generation Business
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-400 text-base sm:text-lg md:text-xl'>
                Connect with thousands of verified media buyers and scale your
                lead generation business with our premium marketplace.
              </p>
            </div>
            <div className='flex flex-col gap-4 min-[400px]:flex-row'>
              <Button size='lg' className='rounded-full'>
                Start Posting Offers
              </Button>
              <Button size='lg' variant='outline' className='rounded-full'>
                Schedule a Demo
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
              <BarChart3Icon className='h-8 w-8 mb-4 mx-auto text-blue-500' />
              <h3 className='text-3xl font-bold'>15,000+</h3>
              <p className='text-sm text-gray-400'>Active Media Buyers</p>
            </Card>
            <Card className='p-6 bg-white/5 text-center'>
              <LineChartIcon className='h-8 w-8 mb-4 mx-auto text-green-500' />
              <h3 className='text-3xl font-bold'>$50M+</h3>
              <p className='text-sm text-gray-400'>Monthly Lead Volume</p>
            </Card>
            <Card className='p-6 bg-white/5 text-center'>
              <ShieldCheckIcon className='h-8 w-8 mb-4 mx-auto text-purple-500' />
              <h3 className='text-3xl font-bold'>99.9%</h3>
              <p className='text-sm text-gray-400'>Fraud Prevention Rate</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='text-center mb-8 sm:mb-12'>
            <h2 className='text-3xl font-bold mb-4'>
              Why Choose Our Marketplace
            </h2>
            <p className='text-gray-400'>
              Everything you need to scale your lead generation business
            </p>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {benefits.map((benefit, index) => (
              <Card key={index} className='p-6 bg-white/5'>
                <div className='rounded-full bg-white/10 p-3 w-fit mb-4'>
                  {benefit.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{benefit.title}</h3>
                <p className='text-gray-400'>{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features List */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='bg-white/5 py-12 sm:py-16 px-4 sm:px-8 rounded-3xl'>
            <div className='max-w-3xl mx-auto'>
              <h2 className='text-3xl font-bold mb-8 text-center'>
                Platform Features
              </h2>
              <div className='grid gap-4 sm:grid-cols-2'>
                {features.map((feature, index) => (
                  <div key={index} className='flex items-center gap-3'>
                    <CheckCircle2Icon className='h-5 w-5 text-green-500 flex-shrink-0' />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <h2 className='text-3xl font-bold mb-8 sm:mb-12 text-center'>
            What Our Advertisers Say
          </h2>
          <div className='grid gap-6 md:grid-cols-2'>
            {testimonials.map((testimonial, index) => (
              <Card key={index} className='p-6 bg-white/5'>
                <p className='text-lg mb-6'>&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className='font-semibold'>{testimonial.author}</p>
                  <p className='text-sm text-gray-400'>{testimonial.role}</p>
                  <p className='text-sm text-gray-400'>{testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-8 sm:py-12 md:py-16'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <Card className='p-6 sm:p-8 md:p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0'>
            <div className='flex flex-col items-center text-center gap-6'>
              <h2 className='text-3xl font-bold'>
                Ready to Scale Your Business?
              </h2>
              <p className='text-gray-400 max-w-2xl'>
                Join thousands of successful advertisers who trust our
                marketplace to connect with quality media buyers and scale their
                lead generation business.
              </p>
              <Button size='lg' className='rounded-full'>
                Get Started <ArrowRightIcon className='ml-2 h-4 w-4' />
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
