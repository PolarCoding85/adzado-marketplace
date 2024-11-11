import {
  Building2Icon,
  UsersIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
} from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className='container py-16 space-y-16'>
      {/* Hero Section */}
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          About Adzado
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          We&apos;re building the future of lead generation, connecting quality
          advertisers with top media buyers in a transparent, efficient
          marketplace.
        </p>
      </div>

      {/* Mission Section */}
      <div className='grid gap-12 md:grid-cols-2 items-center'>
        <div className='space-y-4'>
          <h2 className='text-3xl font-bold'>Our Mission</h2>
          <p className='text-muted-foreground'>
            At Adzado, we&apos;re on a mission to revolutionize the lead
            generation industry by creating a transparent, efficient, and
            quality-focused marketplace that benefits both advertisers and media
            buyers.
          </p>
          <p className='text-muted-foreground'>
            We believe in fostering long-term partnerships, maintaining high
            quality standards, and driving innovation in the lead generation
            space.
          </p>
        </div>
        <Card className='p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-0'>
          <div className='space-y-4'>
            <div className='flex items-center gap-3'>
              <div className='h-1 w-12 bg-blue-500 rounded-full' />
              <p className='text-xl font-semibold'>Established 2023</p>
            </div>
            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='p-4 rounded-lg bg-white/5'>
                <p className='text-3xl font-bold'>15k+</p>
                <p className='text-sm text-muted-foreground'>Active Buyers</p>
              </div>
              <div className='p-4 rounded-lg bg-white/5'>
                <p className='text-3xl font-bold'>$50M+</p>
                <p className='text-sm text-muted-foreground'>Monthly Volume</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Values Section */}
      <div className='space-y-8'>
        <h2 className='text-3xl font-bold text-center'>Our Values</h2>
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          <Card className='p-6'>
            <ShieldCheckIcon className='h-12 w-12 text-blue-500 mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Quality First</h3>
            <p className='text-muted-foreground'>
              We maintain strict verification processes and quality controls to
              ensure the best outcomes for all parties.
            </p>
          </Card>
          <Card className='p-6'>
            <UsersIcon className='h-12 w-12 text-green-500 mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Partnership Focus</h3>
            <p className='text-muted-foreground'>
              We believe in building long-term relationships that benefit both
              advertisers and media buyers.
            </p>
          </Card>
          <Card className='p-6'>
            <Building2Icon className='h-12 w-12 text-purple-500 mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Transparency</h3>
            <p className='text-muted-foreground'>
              We promote clear communication and honest business practices
              throughout our platform.
            </p>
          </Card>
          <Card className='p-6'>
            <TrendingUpIcon className='h-12 w-12 text-orange-500 mb-4' />
            <h3 className='text-xl font-semibold mb-2'>Innovation</h3>
            <p className='text-muted-foreground'>
              We continuously improve our platform and processes to drive better
              results.
            </p>
          </Card>
        </div>
      </div>

      {/* Team Section */}
      <div className='text-center space-y-8'>
        <h2 className='text-3xl font-bold'>Our Leadership</h2>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              name: "Sarah Chen",
              role: "Chief Executive Officer",
              bio: "Former VP of Operations at LeadTech Solutions with 15+ years in lead generation.",
            },
            {
              name: "Michael Rodriguez",
              role: "Chief Technology Officer",
              bio: "Previously led engineering at major AdTech platforms, focusing on scalable marketplace solutions.",
            },
            {
              name: "David Park",
              role: "Head of Partnerships",
              bio: "10+ years experience in building and scaling affiliate networks and partnerships.",
            },
          ].map((member) => (
            <Card key={member.name} className='p-6'>
              <div className='w-24 h-24 rounded-full bg-muted mx-auto mb-4' />
              <h3 className='text-xl font-semibold'>{member.name}</h3>
              <p className='text-sm text-muted-foreground mb-4'>
                {member.role}
              </p>
              <p className='text-sm text-muted-foreground'>{member.bio}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
