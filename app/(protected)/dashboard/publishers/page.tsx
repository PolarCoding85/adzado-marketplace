"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  MoreVertical,
  Star,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Filter,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

type PublisherStatus = "active" | "pending" | "suspended" | "rejected"

interface Publisher {
  id: string
  name: string
  status: PublisherStatus
  rating: number
  activeOffers: number
  totalLeads: number
  conversionRate: number
  qualityScore: "excellent" | "good" | "fair" | "poor"
  complianceIssues: number
  joinDate: string
}

const publishers: Publisher[] = [
  {
    id: "1",
    name: "Premium Leads LLC",
    status: "active",
    rating: 4.5,
    activeOffers: 8,
    totalLeads: 1567,
    conversionRate: 4.2,
    qualityScore: "excellent",
    complianceIssues: 0,
    joinDate: "2024-01-15",
  },
  {
    id: "2",
    name: "Digital Marketing Pro",
    status: "pending",
    rating: 0,
    activeOffers: 0,
    totalLeads: 0,
    conversionRate: 0,
    qualityScore: "good",
    complianceIssues: 0,
    joinDate: "2024-02-01",
  },
  {
    id: "3",
    name: "Lead Generation Experts",
    status: "suspended",
    rating: 3.2,
    activeOffers: 0,
    totalLeads: 892,
    conversionRate: 2.8,
    qualityScore: "poor",
    complianceIssues: 3,
    joinDate: "2023-12-10",
  },
]

export default function PublishersPage() {
  const getQualityScoreColor = (score: string) => {
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
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Publishers</h1>
          <p className='text-muted-foreground'>
            Manage and monitor your publisher network
          </p>
        </div>
      </div>

      <Card className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search publishers...' className='pl-10' />
          </div>
          <Select defaultValue='all-status'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all-status'>All Statuses</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='suspended'>Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue='all-quality'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by quality' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all-quality'>All Quality Scores</SelectItem>
              <SelectItem value='excellent'>Excellent</SelectItem>
              <SelectItem value='good'>Good</SelectItem>
              <SelectItem value='fair'>Fair</SelectItem>
              <SelectItem value='poor'>Poor</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='outline'>
            <Filter className='mr-2 h-4 w-4' />
            More Filters
          </Button>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className='text-right'>Active Offers</TableHead>
              <TableHead className='text-right'>Total Leads</TableHead>
              <TableHead className='text-right'>Conversion Rate</TableHead>
              <TableHead>Quality Score</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publishers.map((publisher) => (
              <TableRow key={publisher.id}>
                <TableCell className='font-medium'>
                  <Link
                    href={`/dashboard/publishers/${publisher.id}`}
                    className='hover:text-primary'
                  >
                    {publisher.name}
                  </Link>
                  <div className='text-sm text-muted-foreground'>
                    Joined {publisher.joinDate}
                  </div>
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
                <TableCell>
                  <div className='flex items-center'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400 mr-1' />
                    <span>{publisher.rating}</span>
                  </div>
                </TableCell>
                <TableCell className='text-right'>
                  {publisher.activeOffers}
                </TableCell>
                <TableCell className='text-right'>
                  {publisher.totalLeads}
                </TableCell>
                <TableCell className='text-right'>
                  {publisher.conversionRate}%
                </TableCell>
                <TableCell>
                  <span
                    className={getQualityScoreColor(publisher.qualityScore)}
                  >
                    {publisher.qualityScore.charAt(0).toUpperCase() +
                      publisher.qualityScore.slice(1)}
                  </span>
                </TableCell>
                <TableCell>
                  {publisher.complianceIssues > 0 ? (
                    <div className='flex items-center text-yellow-500'>
                      <AlertTriangle className='h-4 w-4 mr-1' />
                      {publisher.complianceIssues} issues
                    </div>
                  ) : (
                    <div className='flex items-center text-green-500'>
                      <CheckCircle2 className='h-4 w-4 mr-1' />
                      Clear
                    </div>
                  )}
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
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>View Offers</DropdownMenuItem>
                          {publisher.status === "active" ? (
                            <DropdownMenuItem className='text-destructive'>
                              Suspend Publisher
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              Reactivate Publisher
                            </DropdownMenuItem>
                          )}
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
    </div>
  )
}
