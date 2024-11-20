"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  ArrowRight,
  DollarSign,
  Users,
  Target,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Offer {
  id: string
  name: string
  advertiser: string
  payout: number
  industry: string
  subIndustry: string
  leadType: string
  description: string
  requirements: string[]
  activePublishers: number
  status: "active" | "paused"
  applied: boolean
  approved: boolean
}

const offers: Offer[] = [
  {
    id: "1",
    name: "Home Insurance Leads - California",
    advertiser: "InsureCo",
    payout: 35,
    industry: "Insurance",
    subIndustry: "Home Insurance",
    leadType: "Data Leads",
    description:
      "Looking for high-quality home insurance leads from California homeowners interested in better rates and coverage.",
    requirements: [
      "Valid phone number",
      "California resident",
      "Homeowner",
      "Insurance expiring in 30 days",
    ],
    activePublishers: 12,
    status: "active",
    applied: false,
    approved: false,
  },
  {
    id: "2",
    name: "Auto Insurance Quotes",
    advertiser: "SafeGuard Insurance",
    payout: 28,
    industry: "Insurance",
    subIndustry: "Auto Insurance",
    leadType: "Live Transfers",
    description:
      "Seeking qualified auto insurance leads. Must be currently insured and looking to switch providers.",
    requirements: [
      "Valid driver's license",
      "Currently insured",
      "Clean driving record",
    ],
    activePublishers: 8,
    status: "active",
    applied: true,
    approved: true,
  },
]

function ApplyToOfferDialog({ offer }: { offer: Offer }) {
  return (
    <DialogContent className='sm:max-w-[600px]'>
      <DialogHeader>
        <DialogTitle>Apply to Offer</DialogTitle>
        <DialogDescription>
          Submit your application to promote this offer
        </DialogDescription>
      </DialogHeader>

      <div className='space-y-4 py-4'>
        <div className='space-y-2'>
          <Label>How will you generate leads for this offer?</Label>
          <Textarea
            placeholder='Describe your marketing methods and traffic sources...'
            className='min-h-[100px]'
          />
        </div>

        <div className='space-y-2'>
          <Label>Estimated Daily Lead Volume</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select estimated volume' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1-10'>1-10 leads per day</SelectItem>
              <SelectItem value='11-50'>11-50 leads per day</SelectItem>
              <SelectItem value='51-100'>51-100 leads per day</SelectItem>
              <SelectItem value='100+'>100+ leads per day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-2'>
          <Label>Additional Comments</Label>
          <Textarea
            placeholder="Any additional information you'd like to share..."
            className='min-h-[100px]'
          />
        </div>

        <Button className='w-full'>Submit Application</Button>
      </div>
    </DialogContent>
  )
}

export default function PublisherOffersPage() {
  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Available Offers
          </h1>
          <p className='text-muted-foreground'>
            Browse and apply to promote offers from advertisers
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search offers...' className='pl-10' />
          </div>
          <Select defaultValue='all'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by industry' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Industries</SelectItem>
              <SelectItem value='insurance'>Insurance</SelectItem>
              <SelectItem value='finance'>Finance</SelectItem>
              <SelectItem value='home-services'>Home Services</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue='all-types'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by lead type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all-types'>All Lead Types</SelectItem>
              <SelectItem value='data'>Data Leads</SelectItem>
              <SelectItem value='calls'>Inbound Calls</SelectItem>
              <SelectItem value='transfers'>Live Transfers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Offers Grid */}
      <div className='grid gap-6 md:grid-cols-2'>
        {offers.map((offer) => (
          <Card key={offer.id} className='flex flex-col'>
            <div className='p-6'>
              <div className='flex justify-between items-start'>
                <div className='space-y-1'>
                  <h3 className='font-semibold text-lg'>{offer.name}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {offer.advertiser}
                  </p>
                </div>
                <Badge
                  variant={offer.status === "active" ? "default" : "secondary"}
                >
                  {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
                </Badge>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-4'>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Payout</p>
                  <p className='font-semibold'>${offer.payout.toFixed(2)}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Lead Type</p>
                  <p className='font-semibold'>{offer.leadType}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>Industry</p>
                  <p className='font-semibold'>{offer.industry}</p>
                </div>
                <div className='space-y-1'>
                  <p className='text-sm text-muted-foreground'>
                    Active Publishers
                  </p>
                  <p className='font-semibold'>{offer.activePublishers}</p>
                </div>
              </div>

              <div className='mt-4'>
                <p className='text-sm text-muted-foreground'>Requirements</p>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {offer.requirements.map((req, index) => (
                    <Badge key={index} variant='secondary'>
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className='mt-4 text-sm'>{offer.description}</p>
            </div>

            <div className='p-6 mt-auto border-t'>
              {offer.applied ? (
                offer.approved ? (
                  <div className='flex justify-between items-center'>
                    <Badge variant='default' className='bg-green-500'>
                      Approved
                    </Badge>
                    <Button variant='outline'>
                      View Details
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Button>
                  </div>
                ) : (
                  <div className='flex justify-between items-center'>
                    <Badge variant='secondary'>Application Pending</Badge>
                    <Button variant='outline' disabled>
                      Applied
                    </Button>
                  </div>
                )
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className='w-full'>Apply to Offer</Button>
                  </DialogTrigger>
                  <ApplyToOfferDialog offer={offer} />
                </Dialog>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
