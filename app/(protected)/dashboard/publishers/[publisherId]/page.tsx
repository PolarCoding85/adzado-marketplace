"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChevronLeft,
  MoreVertical,
  Star,
  Ban,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  Globe,
  Building,
  BarChart3,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Types
type PublisherStatus = "active" | "pending" | "suspended" | "rejected"
type LeadQualityScore = "excellent" | "good" | "fair" | "poor"

interface PublisherOffer {
  id: string
  name: string
  status: "active" | "paused" | "rejected"
  leadsGenerated: number
  conversionRate: number
  lastLeadDate: string
  qualityScore: LeadQualityScore
}

interface ComplianceIssue {
  id: string
  date: string
  type: string
  description: string
  status: "resolved" | "pending" | "escalated"
}

// Sample data
const publisherDetails = {
  id: "1",
  name: "Premium Leads LLC",
  status: "active" as PublisherStatus,
  rating: 4.5,
  joinDate: "2024-01-15",
  contact: {
    name: "John Smith",
    email: "john@premiumleads.com",
    phone: "+1 (555) 123-4567",
  },
  company: {
    name: "Premium Leads LLC",
    companyWebsite: "https://premiumleads.com",
    size: "11-50 employees",
    industries: ["Insurance", "Finance"],
  },
  performance: {
    totalLeads: 1567,
    conversionRate: 4.2,
    averageQualityScore: "good" as LeadQualityScore,
    activeOffers: 8,
    totalEarnings: 54890,
  },
}

const publisherOffers: PublisherOffer[] = [
  {
    id: "1",
    name: "Home Insurance Leads - California",
    status: "active",
    leadsGenerated: 234,
    conversionRate: 4.2,
    lastLeadDate: "2024-02-15",
    qualityScore: "excellent",
  },
  {
    id: "2",
    name: "Auto Insurance Quotes",
    status: "active",
    leadsGenerated: 156,
    conversionRate: 3.8,
    lastLeadDate: "2024-02-14",
    qualityScore: "good",
  },
]

const complianceHistory: ComplianceIssue[] = [
  {
    id: "1",
    date: "2024-02-01",
    type: "Data Quality",
    description: "Multiple leads with invalid phone numbers",
    status: "resolved",
  },
  {
    id: "2",
    date: "2024-01-15",
    type: "Marketing Compliance",
    description: "Unauthorized use of brand assets",
    status: "resolved",
  },
]

export default function PublisherDetailsPage() {
  const router = useRouter()

  const getQualityScoreColor = (score: LeadQualityScore) => {
    switch (score) {
      case "excellent":
        return "text-green-500"
      case "good":
        return "text-blue-500"
      case "fair":
        return "text-yellow-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <h1 className='text-3xl font-bold tracking-tight'>
              {publisherDetails.name}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Badge
              variant={
                publisherDetails.status === "active"
                  ? "default"
                  : publisherDetails.status === "pending"
                  ? "secondary"
                  : "destructive"
              }
            >
              {publisherDetails.status.charAt(0).toUpperCase() +
                publisherDetails.status.slice(1)}
            </Badge>
            <div className='flex items-center gap-1'>
              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
              <span className='text-sm'>{publisherDetails.rating}</span>
            </div>
            <span className='text-muted-foreground'>•</span>
            <span className='text-muted-foreground'>
              Member since {publisherDetails.joinDate}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline'>
            <Mail className='mr-2 h-4 w-4' />
            Contact Publisher
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {publisherDetails.status === "active" ? (
                <DropdownMenuItem className='text-destructive'>
                  <Ban className='mr-2 h-4 w-4' />
                  Suspend Publisher
                </DropdownMenuItem>
              ) : publisherDetails.status === "pending" ? (
                <>
                  <DropdownMenuItem>
                    <CheckCircle2 className='mr-2 h-4 w-4' />
                    Approve Publisher
                  </DropdownMenuItem>
                  <DropdownMenuItem className='text-destructive'>
                    <XCircle className='mr-2 h-4 w-4' />
                    Reject Publisher
                  </DropdownMenuItem>
                </>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Total Leads</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {publisherDetails.performance.totalLeads}
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Conversion Rate</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {publisherDetails.performance.conversionRate}%
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Quality Score</span>
          </div>
          <p className='text-2xl font-bold mt-2 capitalize'>
            {publisherDetails.performance.averageQualityScore}
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Active Offers</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {publisherDetails.performance.activeOffers}
          </p>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='offers'>Offers</TabsTrigger>
          <TabsTrigger value='compliance'>Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value='overview'>
          <div className='grid gap-4 md:grid-cols-2'>
            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>
                Contact Information
              </h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Mail className='h-4 w-4 text-muted-foreground' />
                  <span>{publisherDetails.contact.email}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Phone className='h-4 w-4 text-muted-foreground' />
                  <span>{publisherDetails.contact.phone}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Globe className='h-4 w-4 text-muted-foreground' />
                  <a
                    href={publisherDetails.company.companyWebsite}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-primary hover:underline'
                  >
                    {publisherDetails.company.companyWebsite}
                  </a>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <h3 className='text-lg font-semibold mb-4'>Company Details</h3>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Building className='h-4 w-4 text-muted-foreground' />
                  <span>{publisherDetails.company.name}</span>
                </div>
                <div>
                  <p className='text-sm text-muted-foreground mb-2'>
                    Industries
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {publisherDetails.company.industries.map((industry) => (
                      <Badge key={industry} variant='secondary'>
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value='offers'>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Offer Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Leads Generated</TableHead>
                  <TableHead className='text-right'>Conversion Rate</TableHead>
                  <TableHead className='text-right'>Quality Score</TableHead>
                  <TableHead className='text-right'>Last Lead</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publisherOffers.map((offer) => (
                  <TableRow key={offer.id}>
                    <TableCell className='font-medium'>
                      <Link
                        href={`/dashboard/offers/${offer.id}`}
                        className='hover:text-primary'
                      >
                        {offer.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          offer.status === "active"
                            ? "default"
                            : offer.status === "paused"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {offer.status.charAt(0).toUpperCase() +
                          offer.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      {offer.leadsGenerated}
                    </TableCell>
                    <TableCell className='text-right'>
                      {offer.conversionRate}%
                    </TableCell>
                    <TableCell className='text-right'>
                      <span
                        className={getQualityScoreColor(offer.qualityScore)}
                      >
                        {offer.qualityScore.charAt(0).toUpperCase() +
                          offer.qualityScore.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className='text-right'>
                      {offer.lastLeadDate}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Pause Access</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className='text-destructive'>
                            Revoke Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value='compliance'>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceHistory.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>{issue.date}</TableCell>
                    <TableCell>
                      <div className='flex items-center gap-2'>
                        <AlertTriangle className='h-4 w-4 text-yellow-500' />
                        {issue.type}
                      </div>
                    </TableCell>
                    <TableCell>{issue.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          issue.status === "resolved"
                            ? "default"
                            : issue.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {issue.status.charAt(0).toUpperCase() +
                          issue.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      <Button variant='ghost' size='sm'>
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
