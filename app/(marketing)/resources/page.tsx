import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  BookOpenIcon,
  PlayCircleIcon,
  NewspaperIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  DownloadIcon,
  FileTextIcon,
  UsersIcon,
} from "lucide-react"

const guides = [
  {
    title: "Media Buying Mastery Guide",
    description:
      "Learn advanced strategies for scaling your media buying business and optimizing campaign performance.",
    category: "Guide",
    readTime: "15 min read",
    icon: <BookOpenIcon className='h-6 w-6' />,
  },
  {
    title: "Lead Quality Optimization",
    description:
      "Discover techniques to improve lead quality and increase conversion rates across different verticals.",
    category: "Tutorial",
    readTime: "12 min read",
    icon: <TrendingUpIcon className='h-6 w-6' />,
  },
  {
    title: "Traffic Source Analysis",
    description:
      "Compare different traffic sources and learn which ones perform best for specific offer types.",
    category: "Research",
    readTime: "10 min read",
    icon: <UsersIcon className='h-6 w-6' />,
  },
  {
    title: "Compliance Guidelines",
    description:
      "Stay compliant with our comprehensive guide to lead generation regulations and best practices.",
    category: "Guide",
    readTime: "8 min read",
    icon: <FileTextIcon className='h-6 w-6' />,
  },
]

const webinars = [
  {
    title: "Scaling Solar Lead Generation",
    description:
      "Expert strategies for media buyers in the renewable energy market.",
    date: "Apr 15, 2024",
    duration: "45 mins",
    speaker: "John Matthews",
    role: "Director of Media, SolarLeads Pro",
  },
  {
    title: "Insurance Lead Generation Masterclass",
    description:
      "Advanced techniques for generating high-quality insurance leads.",
    date: "Apr 22, 2024",
    duration: "60 mins",
    speaker: "Sarah Chen",
    role: "VP Marketing, InsureTech Solutions",
  },
]

const reports = [
  {
    title: "Lead Generation Market Report 2024",
    description:
      "Comprehensive analysis of lead generation trends, pricing, and market opportunities.",
    type: "Market Report",
    pages: 45,
    published: "March 2024",
  },
  {
    title: "Vertical Performance Benchmark",
    description:
      "Compare performance metrics across different verticals and identify opportunities.",
    type: "Benchmark Report",
    pages: 32,
    published: "February 2024",
  },
]

export default function ResourcesPage() {
  return (
    <div className='flex flex-col'>
      {/* Hero Section */}
      <section className='py-8 sm:py-12 md:py-16 lg:py-20 '>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col items-center justify-center space-y-8 text-center'>
            <div className='space-y-4'>
              <h1 className='gradient-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter'>
                Resources & Learning Center
              </h1>
              <p className='mx-auto max-w-[700px] text-gray-400 text-base sm:text-lg md:text-xl'>
                Expert guides, industry reports, and training resources to help
                you succeed in lead generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Featured Guides
              </h2>
              <p className='text-sm text-gray-400 mt-1'>
                In-depth resources to improve your skills
              </p>
            </div>
            <Button variant='outline' className='rounded-full'>
              View All Guides
            </Button>
          </div>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {guides.map((guide, index) => (
              <Card
                key={index}
                className='card-gradient border-white/5 p-6 transition-all hover:border-white/10'
              >
                <div className='rounded-full bg-white/10 p-3 w-fit mb-4'>
                  {guide.icon}
                </div>
                <Badge variant='secondary' className='bg-white/10 mb-3'>
                  {guide.category}
                </Badge>
                <h3 className='font-semibold text-lg mb-2'>{guide.title}</h3>
                <p className='text-sm text-gray-400 mb-4'>
                  {guide.description}
                </p>
                <div className='flex items-center justify-between'>
                  <span className='text-sm text-gray-400'>
                    {guide.readTime}
                  </span>
                  <Button variant='ghost' size='sm' className='rounded-full'>
                    Read Now <ArrowRightIcon className='ml-2 h-4 w-4' />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Upcoming Webinars
              </h2>
              <p className='text-sm text-gray-400 mt-1'>
                Live training sessions with industry experts
              </p>
            </div>
            <Button variant='outline' className='rounded-full'>
              View All Webinars
            </Button>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            {webinars.map((webinar, index) => (
              <Card
                key={index}
                className='card-gradient border-white/5 p-6 transition-all hover:border-white/10'
              >
                <div className='flex items-start gap-4'>
                  <div className='rounded-full bg-white/10 p-3'>
                    <PlayCircleIcon className='h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-lg mb-2'>
                      {webinar.title}
                    </h3>
                    <p className='text-sm text-gray-400 mb-4'>
                      {webinar.description}
                    </p>
                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400'>
                      <span>{webinar.date}</span>
                      <span>•</span>
                      <span>{webinar.duration}</span>
                      <span>•</span>
                      <span>with {webinar.speaker}</span>
                    </div>
                  </div>
                  <Button className='rounded-full'>Register</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Market Reports */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex items-center justify-between mb-8'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Market Reports
              </h2>
              <p className='text-sm text-gray-400 mt-1'>
                Industry insights and analysis
              </p>
            </div>
            <Button variant='outline' className='rounded-full'>
              View All Reports
            </Button>
          </div>
          <div className='grid gap-6 md:grid-cols-2'>
            {reports.map((report, index) => (
              <Card
                key={index}
                className='card-gradient border-white/5 p-6 transition-all hover:border-white/10'
              >
                <div className='flex items-start gap-4'>
                  <div className='rounded-full bg-white/10 p-3'>
                    <NewspaperIcon className='h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <Badge variant='secondary' className='bg-white/10 mb-3'>
                      {report.type}
                    </Badge>
                    <h3 className='font-semibold text-lg mb-2'>
                      {report.title}
                    </h3>
                    <p className='text-sm text-gray-400 mb-4'>
                      {report.description}
                    </p>
                    <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400'>
                      <span>{report.published}</span>
                      <span>•</span>
                      <span>{report.pages} pages</span>
                    </div>
                  </div>
                  <Button variant='outline' className='rounded-full'>
                    <DownloadIcon className='mr-2 h-4 w-4' />
                    Download
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <Card className='p-6 sm:p-8 md:p-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0'>
            <div className='flex flex-col items-center text-center gap-6'>
              <h2 className='text-2xl sm:text-3xl font-bold'>Stay Updated</h2>
              <p className='text-gray-400 max-w-2xl text-sm sm:text-base'>
                Subscribe to our newsletter for the latest industry insights,
                market reports, and expert tips.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 w-full max-w-md'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 rounded-full bg-white/5 px-4 py-2 text-sm backdrop-blur-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20'
                />
                <Button className='rounded-full'>Subscribe</Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
