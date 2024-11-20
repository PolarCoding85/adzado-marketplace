"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Filter,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

type PublisherStatus = "pending" | "approved" | "rejected"

interface PublisherRequest {
  id: string
  publisherName: string
  status: PublisherStatus
  submittedDate: string
  requestedOffers: string[]
  marketingMethods: string[]
  industries: string[]
  riskScore: "low" | "medium" | "high"
  complianceChecks: {
    domainVerified: boolean
    identityVerified: boolean
    complianceAgreed: boolean
  }
}

const publisherRequests: PublisherRequest[] = [
  {
    id: "1",
    publisherName: "Premium Leads LLC",
    status: "pending",
    submittedDate: "2024-02-15",
    requestedOffers: [
      "Home Insurance Leads - California",
      "Auto Insurance Quotes",
    ],
    marketingMethods: ["Facebook Ads", "Google Ads"],
    industries: ["Insurance"],
    riskScore: "low",
    complianceChecks: {
      domainVerified: true,
      identityVerified: true,
      complianceAgreed: true,
    },
  },
  {
    id: "2",
    publisherName: "Digital Marketing Pro",
    status: "pending",
    submittedDate: "2024-02-14",
    requestedOffers: ["Life Insurance Leads"],
    marketingMethods: ["Native Advertising"],
    industries: ["Insurance"],
    riskScore: "medium",
    complianceChecks: {
      domainVerified: true,
      identityVerified: false,
      complianceAgreed: true,
    },
  },
]

export default function PublisherRequestsPage() {
  const router = useRouter()

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Publisher Requests
          </h1>
          <p className='text-muted-foreground'>
            Review and manage publisher applications
          </p>
        </div>
      </div>

      <Card className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search requests...' className='pl-10' />
          </div>
          <Select defaultValue='all'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Requests</SelectItem>
              <SelectItem value='pending'>Pending</SelectItem>
              <SelectItem value='approved'>Approved</SelectItem>
              <SelectItem value='rejected'>Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue='all-risk'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter by risk' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all-risk'>All Risk Levels</SelectItem>
              <SelectItem value='low'>Low Risk</SelectItem>
              <SelectItem value='medium'>Medium Risk</SelectItem>
              <SelectItem value='high'>High Risk</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Publisher</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Requested Offers</TableHead>
              <TableHead>Compliance</TableHead>
              <TableHead>Submitted Date</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {publisherRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className='font-medium'>
                  <Link
                    href={`/dashboard/publishers/${request.id}`}
                    className='hover:text-primary'
                  >
                    {request.publisherName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.status === "approved"
                        ? "default"
                        : request.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      request.riskScore === "low"
                        ? "default"
                        : request.riskScore === "medium"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {request.riskScore.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{request.requestedOffers.length} offers</TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {Object.values(request.complianceChecks).every(Boolean) ? (
                      <CheckCircle2 className='h-4 w-4 text-green-500' />
                    ) : (
                      <AlertTriangle className='h-4 w-4 text-yellow-500' />
                    )}
                    {
                      Object.values(request.complianceChecks).filter(Boolean)
                        .length
                    }
                    /{Object.values(request.complianceChecks).length} checks
                    passed
                  </div>
                </TableCell>
                <TableCell>{request.submittedDate}</TableCell>
                <TableCell className='text-right'>
                  <Button
                    variant='ghost'
                    size='sm'
                    onClick={() =>
                      router.push(`/dashboard/requests/${request.id}`)
                    }
                  >
                    Review
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
