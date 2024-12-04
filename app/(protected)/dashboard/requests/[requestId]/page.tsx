"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  BarChart3,
  Users,
  Globe,
  Mail,
  Building,
  Phone,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { useState } from "react"

interface ReviewRequest {
  id: string
  publisherId: string
  offerId: string
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  publisher: {
    name: string
    email: string
    phone: string
    companyWebsite: string
    company: string
    joinDate: string
    status: "active" | "suspended"
    rating: number
    performance: {
      totalLeads: number
      conversionRate: number
      qualityScore: "excellent" | "good" | "fair" | "poor"
      activeOffers: number
    }
    marketingMethods: string[]
    industries: string[]
    complianceScore: number
    complianceIssues: number
  }
  offer: {
    name: string
    payout: number
    industry: string
    leadType: string
  }
  previousReviews: {
    id: string
    advertiserId: string
    advertiserName: string
    date: string
    rating: number
    comment: string
    status: "positive" | "neutral" | "negative"
  }[]
  activeOffers: {
    id: string
    advertiserName: string
    offerName: string
    startDate: string
    performance: {
      leads: number
      conversionRate: number
      qualityScore: "excellent" | "good" | "fair" | "poor"
    }
  }[]
}

// Sample data
const requestDetails: ReviewRequest = {
  id: "1",
  publisherId: "pub123",
  offerId: "off456",
  status: "pending",
  submittedDate: "2024-02-15",
  publisher: {
    name: "Premium Leads LLC",
    email: "contact@premiumleads.com",
    phone: "+1 (555) 123-4567",
    companyWebsite: "https://premiumleads.com",
    company: "Premium Leads LLC",
    joinDate: "2023-06-15",
    status: "active",
    rating: 4.5,
    performance: {
      totalLeads: 15670,
      conversionRate: 4.2,
      qualityScore: "excellent",
      activeOffers: 8,
    },
    marketingMethods: ["Facebook Ads", "Google Ads", "Email Marketing"],
    industries: ["Insurance", "Finance"],
    complianceScore: 95,
    complianceIssues: 0,
  },
  offer: {
    name: "Home Insurance Leads - California",
    payout: 35,
    industry: "Insurance",
    leadType: "Data Leads",
  },
  previousReviews: [
    {
      id: "1",
      advertiserId: "adv123",
      advertiserName: "InsureCo",
      date: "2024-01-15",
      rating: 5,
      comment: "Excellent lead quality and very responsive team.",
      status: "positive",
    },
    {
      id: "2",
      advertiserId: "adv456",
      advertiserName: "SafeGuard Insurance",
      date: "2023-12-20",
      rating: 4,
      comment: "Good performance but some leads needed better qualification.",
      status: "neutral",
    },
  ],
  activeOffers: [
    {
      id: "1",
      advertiserName: "InsureCo",
      offerName: "Auto Insurance Leads",
      startDate: "2023-11-01",
      performance: {
        leads: 1245,
        conversionRate: 4.8,
        qualityScore: "excellent",
      },
    },
    {
      id: "2",
      advertiserName: "SafeGuard Insurance",
      offerName: "Home Insurance Leads",
      startDate: "2023-12-01",
      performance: {
        leads: 892,
        conversionRate: 3.9,
        qualityScore: "good",
      },
    },
  ],
}

export default function ReviewRequestPage() {
  const router = useRouter()
  const [reviewNotes, setReviewNotes] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleReview = async (approved: boolean) => {
    setIsProcessing(true)
    // TODO: Implement review submission
    console.log(`Request ${approved ? "approved" : "rejected"}:`, {
      requestId: requestDetails.id,
      notes: reviewNotes,
    })
    router.push("/dashboard/requests")
  }

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
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='sm' onClick={() => router.back()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <h1 className='text-3xl font-bold tracking-tight'>
              Review Publisher Request
            </h1>
          </div>
          <div className='flex items-center gap-2'>
            <Badge variant='secondary'>
              Submitted on {requestDetails.submittedDate}
            </Badge>
            <span className='text-muted-foreground'>•</span>
            <span className='text-muted-foreground'>
              For offer: {requestDetails.offer.name}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className='grid gap-4 md:grid-cols-4'>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Star className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Publisher Rating</span>
          </div>
          <div className='mt-2 flex items-center'>
            <span className='text-2xl font-bold'>
              {requestDetails.publisher.rating}
            </span>
            <Star className='ml-1 h-4 w-4 fill-yellow-400 text-yellow-400' />
          </div>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <BarChart3 className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Total Leads Generated</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {requestDetails.publisher.performance.totalLeads.toLocaleString()}
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Active Offers</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {requestDetails.publisher.performance.activeOffers}
          </p>
        </Card>
        <Card className='p-4'>
          <div className='flex items-center gap-2'>
            <AlertTriangle className='h-4 w-4 text-muted-foreground' />
            <span className='text-sm font-medium'>Compliance Score</span>
          </div>
          <p className='text-2xl font-bold mt-2'>
            {requestDetails.publisher.complianceScore}%
          </p>
        </Card>
      </div>

      {/* Main Content */}
      <div className='grid gap-6 md:grid-cols-3'>
        <div className='space-y-6 md:col-span-2'>
          <Tabs defaultValue='performance' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='performance'>Performance History</TabsTrigger>
              <TabsTrigger value='reviews'>Previous Reviews</TabsTrigger>
              <TabsTrigger value='active-offers'>Active Offers</TabsTrigger>
            </TabsList>

            <TabsContent value='performance'>
              <Card className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  Performance Metrics
                </h3>
                <div className='space-y-4'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Label className='text-muted-foreground'>
                        Conversion Rate
                      </Label>
                      <p className='text-2xl font-bold'>
                        {requestDetails.publisher.performance.conversionRate}%
                      </p>
                    </div>
                    <div>
                      <Label className='text-muted-foreground'>
                        Quality Score
                      </Label>
                      <p
                        className={`text-2xl font-bold ${getQualityScoreColor(
                          requestDetails.publisher.performance.qualityScore
                        )}`}
                      >
                        {requestDetails.publisher.performance.qualityScore
                          .charAt(0)
                          .toUpperCase() +
                          requestDetails.publisher.performance.qualityScore.slice(
                            1
                          )}
                      </p>
                    </div>
                  </div>

                  <div>
                    <Label className='text-muted-foreground'>
                      Marketing Methods
                    </Label>
                    <div className='flex flex-wrap gap-2 mt-1'>
                      {requestDetails.publisher.marketingMethods.map(
                        (method) => (
                          <Badge key={method} variant='secondary'>
                            {method}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className='text-muted-foreground'>Industries</Label>
                    <div className='flex flex-wrap gap-2 mt-1'>
                      {requestDetails.publisher.industries.map((industry) => (
                        <Badge key={industry} variant='secondary'>
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value='reviews'>
              <Card className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  Advertiser Reviews
                </h3>
                <div className='space-y-4'>
                  {requestDetails.previousReviews.map((review) => (
                    <Card key={review.id} className='p-4'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='font-medium'>{review.advertiserName}</p>
                          <p className='text-sm text-muted-foreground'>
                            {review.date}
                          </p>
                        </div>
                        <div className='flex items-center'>
                          <span className='font-bold mr-1'>
                            {review.rating}
                          </span>
                          <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        </div>
                      </div>
                      <p className='mt-2'>{review.comment}</p>
                      <Badge
                        className='mt-2'
                        variant={
                          review.status === "positive"
                            ? "default"
                            : review.status === "neutral"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {review.status.charAt(0).toUpperCase() +
                          review.status.slice(1)}
                      </Badge>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value='active-offers'>
              <Card className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>
                  Current Active Offers
                </h3>
                <div className='space-y-4'>
                  {requestDetails.activeOffers.map((offer) => (
                    <Card key={offer.id} className='p-4'>
                      <div className='space-y-2'>
                        <div className='flex justify-between'>
                          <div>
                            <p className='font-medium'>{offer.offerName}</p>
                            <p className='text-sm text-muted-foreground'>
                              {offer.advertiserName}
                            </p>
                          </div>
                          <Badge variant='outline'>
                            Since {offer.startDate}
                          </Badge>
                        </div>
                        <div className='grid grid-cols-3 gap-4 mt-2'>
                          <div>
                            <Label className='text-muted-foreground'>
                              Leads
                            </Label>
                            <p className='font-medium'>
                              {offer.performance.leads}
                            </p>
                          </div>
                          <div>
                            <Label className='text-muted-foreground'>
                              Conversion
                            </Label>
                            <p className='font-medium'>
                              {offer.performance.conversionRate}%
                            </p>
                          </div>
                          <div>
                            <Label className='text-muted-foreground'>
                              Quality
                            </Label>
                            <p
                              className={`font-medium ${getQualityScoreColor(
                                offer.performance.qualityScore
                              )}`}
                            >
                              {offer.performance.qualityScore
                                .charAt(0)
                                .toUpperCase() +
                                offer.performance.qualityScore.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className='space-y-6'>
          <Card className='p-6'>
            <h3 className='text-lg font-semibold mb-4'>
              Publisher Information
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <Building className='h-4 w-4 text-muted-foreground' />
                <span>{requestDetails.publisher.company}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Mail className='h-4 w-4 text-muted-foreground' />
                <span>{requestDetails.publisher.email}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='h-4 w-4 text-muted-foreground' />
                <span>{requestDetails.publisher.phone}</span>
              </div>
              <div className='flex items-center gap-2'>
                <Globe className='h-4 w-4 text-muted-foreground' />
                <a
                  href={requestDetails.publisher.companyWebsite}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  {requestDetails.publisher.companyWebsite}
                </a>
              </div>
            </div>
          </Card>

          <Card className='p-6'>
            <h3 className='text-lg font-semibold mb-4'>Review Decision</h3>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label>Review Notes</Label>
                <Textarea
                  placeholder='Add notes about your decision...'
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className='min-h-[100px]'
                />
              </div>
              <div className='flex gap-3'>
                <Button
                  variant='outline'
                  className='flex-1'
                  onClick={() => handleReview(false)}
                  disabled={isProcessing}
                >
                  <XCircle className='mr-2 h-4 w-4' />
                  Reject
                </Button>
                <Button
                  className='flex-1'
                  onClick={() => handleReview(true)}
                  disabled={isProcessing}
                >
                  <CheckCircle2 className='mr-2 h-4 w-4' />
                  Approve
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
