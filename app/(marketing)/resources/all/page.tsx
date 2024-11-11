"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BookOpenIcon,
  PlayCircleIcon,
  NewspaperIcon,
  SearchIcon,
  ClockIcon,
  CalendarIcon,
  ArrowRightIcon,
  UsersIcon,
  TrendingUpIcon,
  DownloadIcon,
} from "lucide-react"

// Sample data - In a real app, this would come from an API
const resources = {
  guides: [
    {
      title: "Media Buying Mastery Guide",
      description:
        "Learn advanced strategies for scaling your media buying business and optimizing campaign performance.",
      category: "Media Buying",
      readTime: "15 min read",
      author: "Sarah Chen",
      date: "2024-03-15",
      icon: <BookOpenIcon className='h-6 w-6' />,
      difficulty: "Advanced",
    },
    {
      title: "Lead Quality Optimization",
      description:
        "Discover techniques to improve lead quality and increase conversion rates across different verticals.",
      category: "Lead Generation",
      readTime: "12 min read",
      author: "Michael Rodriguez",
      date: "2024-03-10",
      icon: <TrendingUpIcon className='h-6 w-6' />,
      difficulty: "Intermediate",
    },
    {
      title: "Traffic Source Analysis",
      description:
        "Compare different traffic sources and learn which ones perform best for specific offer types.",
      category: "Traffic",
      readTime: "10 min read",
      author: "David Park",
      date: "2024-03-05",
      icon: <UsersIcon className='h-6 w-6' />,
      difficulty: "Beginner",
    },
  ],
  webinars: [
    {
      title: "Scaling Solar Lead Generation",
      description:
        "Expert strategies for media buyers in the renewable energy market.",
      date: "2024-04-15",
      time: "2:00 PM EST",
      duration: "45 mins",
      speaker: "John Matthews",
      role: "Director of Media, SolarLeads Pro",
      category: "Solar",
    },
    {
      title: "Insurance Lead Generation Masterclass",
      description:
        "Advanced techniques for generating high-quality insurance leads.",
      date: "2024-04-22",
      time: "1:00 PM EST",
      duration: "60 mins",
      speaker: "Sarah Chen",
      role: "VP Marketing, InsureTech Solutions",
      category: "Insurance",
    },
  ],
  reports: [
    {
      title: "Lead Generation Market Report 2024",
      description:
        "Comprehensive analysis of lead generation trends, pricing, and market opportunities.",
      type: "Market Report",
      pages: 45,
      published: "March 2024",
      category: "Industry Analysis",
      downloads: 1250,
    },
    {
      title: "Vertical Performance Benchmark",
      description:
        "Compare performance metrics across different verticals and identify opportunities.",
      type: "Benchmark Report",
      pages: 32,
      published: "February 2024",
      category: "Performance",
      downloads: 890,
    },
  ],
}

export default function ResourcesListPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")

  return (
    <div className='flex flex-col'>
      {/* Header */}
      <section className='py-8 sm:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='flex flex-col items-center justify-center space-y-4 text-center'>
            <h1 className='text-3xl font-bold sm:text-4xl md:text-5xl'>
              Resources Library
            </h1>
            <p className='text-muted-foreground max-w-[700px] text-sm sm:text-base'>
              Browse our collection of guides, webinars, and market reports to
              help you succeed in lead generation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className='py-8'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          {/* Search and Sort */}
          <div className='flex flex-col sm:flex-row gap-4 mb-8'>
            <div className='relative flex-1'>
              <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
              <input
                className='w-full rounded-lg bg-muted/50 px-9 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
                placeholder='Search resources...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className='w-full sm:w-[180px]'>
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='newest'>Newest First</SelectItem>
                <SelectItem value='popular'>Most Popular</SelectItem>
                <SelectItem value='title'>Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue='all' className='space-y-8'>
            <TabsList className='w-full justify-start'>
              <TabsTrigger value='all'>All Resources</TabsTrigger>
              <TabsTrigger value='guides'>Guides</TabsTrigger>
              <TabsTrigger value='webinars'>Webinars</TabsTrigger>
              <TabsTrigger value='reports'>Reports</TabsTrigger>
            </TabsList>

            <TabsContent value='all' className='space-y-8'>
              {/* Guides */}
              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>Guides</h2>
                <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                  {resources.guides.map((guide, index) => (
                    <Card key={index} className='flex flex-col p-6'>
                      <div className='rounded-full bg-white/10 p-3 w-fit mb-4'>
                        {guide.icon}
                      </div>
                      <Badge variant='secondary' className='w-fit mb-2'>
                        {guide.category}
                      </Badge>
                      <h3 className='text-lg font-semibold mb-2'>
                        {guide.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mb-4 flex-1'>
                        {guide.description}
                      </p>
                      <div className='flex items-center justify-between mt-auto pt-4 border-t'>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                          <ClockIcon className='h-4 w-4' />
                          {guide.readTime}
                        </div>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='rounded-full'
                        >
                          Read Now
                          <ArrowRightIcon className='ml-2 h-4 w-4' />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Webinars */}
              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>Webinars</h2>
                <div className='grid gap-6 md:grid-cols-2'>
                  {resources.webinars.map((webinar, index) => (
                    <Card key={index} className='p-6'>
                      <div className='flex items-start gap-4'>
                        <div className='rounded-full bg-white/10 p-3'>
                          <PlayCircleIcon className='h-6 w-6' />
                        </div>
                        <div className='flex-1'>
                          <Badge variant='secondary' className='mb-2'>
                            {webinar.category}
                          </Badge>
                          <h3 className='text-lg font-semibold mb-2'>
                            {webinar.title}
                          </h3>
                          <p className='text-sm text-muted-foreground mb-4'>
                            {webinar.description}
                          </p>
                          <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
                            <div className='flex items-center gap-1'>
                              <CalendarIcon className='h-4 w-4' />
                              {webinar.date}
                            </div>
                            <span>•</span>
                            <span>{webinar.duration}</span>
                          </div>
                        </div>
                        <Button className='rounded-full'>Register</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Reports */}
              <div className='space-y-4'>
                <h2 className='text-2xl font-semibold'>Reports</h2>
                <div className='grid gap-6 md:grid-cols-2'>
                  {resources.reports.map((report, index) => (
                    <Card key={index} className='p-6'>
                      <div className='flex items-start gap-4'>
                        <div className='rounded-full bg-white/10 p-3'>
                          <NewspaperIcon className='h-6 w-6' />
                        </div>
                        <div className='flex-1'>
                          <Badge variant='secondary' className='mb-2'>
                            {report.category}
                          </Badge>
                          <h3 className='text-lg font-semibold mb-2'>
                            {report.title}
                          </h3>
                          <p className='text-sm text-muted-foreground mb-4'>
                            {report.description}
                          </p>
                          <div className='flex items-center gap-4 text-sm text-muted-foreground'>
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
            </TabsContent>

            <TabsContent value='guides'>
              <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
                {resources.guides.map((guide, index) => (
                  <Card key={index} className='flex flex-col p-6'>
                    <div className='rounded-full bg-white/10 p-3 w-fit mb-4'>
                      {guide.icon}
                    </div>
                    <Badge variant='secondary' className='w-fit mb-2'>
                      {guide.category}
                    </Badge>
                    <h3 className='text-lg font-semibold mb-2'>
                      {guide.title}
                    </h3>
                    <p className='text-sm text-muted-foreground mb-4 flex-1'>
                      {guide.description}
                    </p>
                    <div className='flex items-center justify-between mt-auto pt-4 border-t'>
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <ClockIcon className='h-4 w-4' />
                        {guide.readTime}
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='rounded-full'
                      >
                        Read Now
                        <ArrowRightIcon className='ml-2 h-4 w-4' />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='webinars'>
              <div className='grid gap-6 md:grid-cols-2'>
                {resources.webinars.map((webinar, index) => (
                  <Card key={index} className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='rounded-full bg-white/10 p-3'>
                        <PlayCircleIcon className='h-6 w-6' />
                      </div>
                      <div className='flex-1'>
                        <Badge variant='secondary' className='mb-2'>
                          {webinar.category}
                        </Badge>
                        <h3 className='text-lg font-semibold mb-2'>
                          {webinar.title}
                        </h3>
                        <p className='text-sm text-muted-foreground mb-4'>
                          {webinar.description}
                        </p>
                        <div className='flex flex-wrap items-center gap-3 text-sm text-muted-foreground'>
                          <div className='flex items-center gap-1'>
                            <CalendarIcon className='h-4 w-4' />
                            {webinar.date}
                          </div>
                          <span>•</span>
                          <span>{webinar.duration}</span>
                        </div>
                      </div>
                      <Button className='rounded-full'>Register</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value='reports'>
              <div className='grid gap-6 md:grid-cols-2'>
                {resources.reports.map((report, index) => (
                  <Card key={index} className='p-6'>
                    <div className='flex items-start gap-4'>
                      <div className='rounded-full bg-white/10 p-3'>
                        <NewspaperIcon className='h-6 w-6' />
                      </div>
                      <div className='flex-1'>
                        <Badge variant='secondary' className='mb-2'>
                          {report.category}
                        </Badge>
                        <h3 className='text-lg font-semibold mb-2'>
                          {report.title}
                        </h3>
                        <p className='text-sm text-muted-foreground mb-4'>
                          {report.description}
                        </p>
                        <div className='flex items-center gap-4 text-sm text-muted-foreground'>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
