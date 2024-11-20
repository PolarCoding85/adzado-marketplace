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
  Edit2,
  Trash2,
  PauseCircle,
  PlayCircle,
  Users,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Types
type OfferStatus = "active" | "paused" | "draft"
type PublisherStatus = "active" | "pending" | "rejected"

interface Publisher {
  id: string
  name: string
  status: PublisherStatus
  conversionRate: number
  leadsGenerated: number
  joinedDate: string
}

// Sample data
const offerDetails = {
  id: "1",
  name: "Home Insurance Leads - California",
  status: "active" as OfferStatus,
  description:
    "High-quality home insurance leads from California homeowners looking for better rates and coverage options.",
  payout: 35,
  industry: "Insurance",
  subIndustry: "Home Insurance",
  leadType: "Data Leads",
  requiredFields: [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Address",
    "Property Value",
  ],
  dailyCap: 100,
  monthlyCap: 3000,
  activePublishers: 12,
  totalLeads: 1567,
  conversionRate: 3.2,
  createdAt: "2024-01-15",
}

const publishers: Publisher[] = [
  {
    id: "1",
    name: "Premium Leads LLC",
    status: "active",
    conversionRate: 4.2,
    leadsGenerated: 234,
    joinedDate: "2024-01-20",
  },
  {
    id: "2",
    name: "Digital Marketing Pro",
    status: "pending",
    conversionRate: 0,
    leadsGenerated: 0,
    joinedDate: "2024-02-01",
  },
  // Add more sample publishers
]

export default function OfferDetailsPage() {
  const router = useRouter()

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
              {offerDetails.name}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Badge
              variant={
                offerDetails.status === "active"
                  ? "default"
                  : offerDetails.status === "paused"
                  ? "secondary"
                  : "outline"
              }
            >
              {offerDetails.status.charAt(0).toUpperCase() +
                offerDetails.status.slice(1)}
            </Badge>
            <span className='text-muted-foreground'>•</span>
            <span className='text-muted-foreground'>
              Created on {offerDetails.createdAt}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline'>
            <Edit2 className='mr-2 h-4 w-4' />
            Edit Offer
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='icon'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                {offerDetails.status === "active" ? (
                  <>
                    <PauseCircle className='mr-2 h-4 w-4' />
                    Pause Offer
                  </>
                ) : (
                  <>
                    <PlayCircle className='mr-2 h-4 w-4' />
                    Activate Offer
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className='mr-2 h-4 w-4' />
                Manage Publishers
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='text-destructive'>
                <Trash2 className='mr-2 h-4 w-4' />
                Delete Offer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Active Publishers</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {offerDetails.activePublishers}
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Total Leads</span>
          </div>
          <p className='text-2xl font-bold mt-2'>{offerDetails.totalLeads}</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Daily Cap</span>
          </div>
          <p className='text-2xl font-bold mt-2'>{offerDetails.dailyCap}</p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Conversion Rate</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {offerDetails.conversionRate}%
          </p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='publishers'>Publishers</TabsTrigger>
          <TabsTrigger value='performance'>Performance</TabsTrigger>
        </TabsList>

        <TabsContent value='overview' className='space-y-4'>
          <Card className='p-6'>
            <div className='space-y-4'>
              <div>
                <h3 className='text-lg font-semibold mb-2'>Description</h3>
                <p className='text-muted-foreground'>
                  {offerDetails.description}
                </p>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <h3 className='text-lg font-semibold mb-2'>Offer Details</h3>
                  <dl className='space-y-2'>
                    <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Industry</dt>
                      <dd className='font-medium'>{offerDetails.industry}</dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Sub-Industry</dt>
                      <dd className='font-medium'>
                        {offerDetails.subIndustry}
                      </dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Lead Type</dt>
                      <dd className='font-medium'>{offerDetails.leadType}</dd>
                    </div>
                    <div className='flex justify-between'>
                      <dt className='text-muted-foreground'>Payout</dt>
                      <dd className='font-medium'>${offerDetails.payout}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <h3 className='text-lg font-semibold mb-2'>
                    Required Fields
                  </h3>
                  <div className='flex flex-wrap gap-2'>
                    {offerDetails.requiredFields.map((field) => (
                      <Badge key={field} variant='secondary'>
                        {field}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value='publishers'>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Publisher</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Conversion Rate</TableHead>
                  <TableHead className='text-right'>Leads Generated</TableHead>
                  <TableHead className='text-right'>Joined Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishers.map((publisher) => (
                  <TableRow key={publisher.id}>
                    <TableCell className='font-medium'>
                      {publisher.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          publisher.status === "active"
                            ? "default"
                            : publisher.status === "pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {publisher.status.charAt(0).toUpperCase() +
                          publisher.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className='text-right'>
                      {publisher.conversionRate}%
                    </TableCell>
                    <TableCell className='text-right'>
                      {publisher.leadsGenerated}
                    </TableCell>
                    <TableCell className='text-right'>
                      {publisher.joinedDate}
                    </TableCell>
                    <TableCell className='text-right'>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='ghost' className='h-8 w-8 p-0'>
                            <MoreVertical className='h-4 w-4' />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          {publisher.status === "pending" ? (
                            <>
                              <DropdownMenuItem>
                                <CheckCircle2 className='mr-2 h-4 w-4' />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem className='text-destructive'>
                                <XCircle className='mr-2 h-4 w-4' />
                                Reject
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem>
                                <AlertCircle className='mr-2 h-4 w-4' />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className='text-destructive'>
                                <XCircle className='mr-2 h-4 w-4' />
                                Remove Access
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value='performance'>
          <Card className='p-6'>
            {/* Add performance charts and metrics here */}
            <p className='text-muted-foreground'>
              Performance metrics coming soon...
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
