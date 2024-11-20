"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ChevronLeft,
  AlertTriangle,
  MessageCircle,
  FileText,
  Link as LinkIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface ComplianceIssue {
  id: string
  publisherId: string
  publisherName: string
  type: string
  description: string
  status: "pending" | "resolved" | "escalated"
  severity: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
  evidence: {
    type: "screenshot" | "link" | "document"
    url: string
    description: string
  }[]
  timeline: {
    date: string
    action: string
    user: string
    notes?: string
  }[]
}

const issueDetails: ComplianceIssue = {
  id: "1",
  publisherId: "123",
  publisherName: "Premium Leads LLC",
  type: "Data Quality",
  description:
    "Multiple leads submitted with invalid phone numbers and duplicate information.",
  status: "pending",
  severity: "high",
  createdAt: "2024-02-01T10:00:00Z",
  updatedAt: "2024-02-01T15:30:00Z",
  evidence: [
    {
      type: "screenshot",
      url: "/evidence/screenshot1.jpg",
      description: "Screenshot of invalid lead data",
    },
    {
      type: "document",
      url: "/evidence/report.pdf",
      description: "Detailed analysis report",
    },
  ],
  timeline: [
    {
      date: "2024-02-01T10:00:00Z",
      action: "Issue Created",
      user: "System",
      notes: "Automated detection flagged multiple invalid leads",
    },
    {
      date: "2024-02-01T15:30:00Z",
      action: "Review Started",
      user: "John Smith",
      notes: "Initial review of reported issues",
    },
  ],
}

export default function ComplianceIssuePage() {
  const router = useRouter()

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <h1 className='text-3xl font-bold tracking-tight'>
              Compliance Issue #{issueDetails.id}
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Badge
              variant={
                issueDetails.status === "resolved"
                  ? "default"
                  : issueDetails.status === "escalated"
                  ? "destructive"
                  : "secondary"
              }
            >
              {issueDetails.status.charAt(0).toUpperCase() +
                issueDetails.status.slice(1)}
            </Badge>
            <Badge
              variant={
                issueDetails.severity === "high"
                  ? "destructive"
                  : issueDetails.severity === "medium"
                  ? "secondary"
                  : "outline"
              }
            >
              {issueDetails.severity.toUpperCase()} Severity
            </Badge>
            <span className='text-muted-foreground'>•</span>
            <span className='text-muted-foreground'>
              Reported on{" "}
              {new Date(issueDetails.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Select defaultValue={issueDetails.status}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Update status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='pending'>Pending Review</SelectItem>
              <SelectItem value='escalated'>Escalate Issue</SelectItem>
              <SelectItem value='resolved'>Mark as Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='destructive'>Suspend Publisher</Button>
        </div>
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Issue Details</h2>
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Publisher
              </h3>
              <Link
                href={`/dashboard/publishers/${issueDetails.publisherId}`}
                className='text-primary hover:underline'
              >
                {issueDetails.publisherName}
              </Link>
            </div>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Type
              </h3>
              <p>{issueDetails.type}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Description
              </h3>
              <p>{issueDetails.description}</p>
            </div>
            <div>
              <h3 className='text-sm font-medium text-muted-foreground'>
                Evidence
              </h3>
              <div className='space-y-2 mt-2'>
                {issueDetails.evidence.map((item, index) => (
                  <div key={index} className='flex items-center gap-2 text-sm'>
                    {item.type === "screenshot" ? (
                      <FileText className='h-4 w-4' />
                    ) : item.type === "link" ? (
                      <LinkIcon className='h-4 w-4' />
                    ) : (
                      <FileText className='h-4 w-4' />
                    )}
                    <a
                      href={item.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-primary hover:underline'
                    >
                      {item.description}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className='p-6'>
          <h2 className='text-xl font-semibold mb-4'>Timeline</h2>
          <div className='space-y-4'>
            {issueDetails.timeline.map((event, index) => (
              <div key={index} className='border-l-2 border-muted pl-4 pb-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm font-medium'>
                    {new Date(event.date).toLocaleString()}
                  </span>
                </div>
                <p className='font-medium mt-1'>{event.action}</p>
                <p className='text-sm text-muted-foreground'>By {event.user}</p>
                {event.notes && <p className='text-sm mt-1'>{event.notes}</p>}
              </div>
            ))}

            <div className='mt-6'>
              <h3 className='text-sm font-medium mb-2'>Add Note</h3>
              <div className='space-y-2'>
                <Textarea
                  placeholder='Add a note about this issue...'
                  className='min-h-[100px]'
                />
                <Button>
                  <MessageCircle className='mr-2 h-4 w-4' />
                  Add Note
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
