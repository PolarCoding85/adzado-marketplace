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
  Plus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  PauseCircle,
  PlayCircle,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Types for our offers
type OfferStatus = "active" | "paused" | "draft"

interface Offer {
  id: string
  name: string
  status: OfferStatus
  industry: string
  payout: number
  activePublishers: number
  leadCount: number
  createdAt: string
}

// Sample data
const sampleOffers: Offer[] = [
  {
    id: "1",
    name: "Home Insurance Leads - California",
    status: "active",
    industry: "Insurance",
    payout: 35,
    activePublishers: 12,
    leadCount: 156,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Auto Insurance Quotes",
    status: "paused",
    industry: "Insurance",
    payout: 28,
    activePublishers: 8,
    leadCount: 89,
    createdAt: "2024-01-10",
  },
  // Add more sample offers as needed
]

export default function OffersPage() {
  return (
    <div className='space-y-6'>
      {/* Header Section */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>My Offers</h1>
          <p className='text-muted-foreground'>
            Create and manage your lead generation offers
          </p>
        </div>
        <Link href='/dashboard/offers/new'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Create New Offer
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className='p-4'>
        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
            <Input placeholder='Search offers...' className='pl-10' />
          </div>
          <Button variant='outline'>Status: All</Button>
          <Button variant='outline'>Industry: All</Button>
        </div>
      </Card>

      {/* Offers Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Offer Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead className='text-right'>Payout</TableHead>
              <TableHead className='text-right'>Publishers</TableHead>
              <TableHead className='text-right'>Total Leads</TableHead>
              <TableHead className='text-right'>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleOffers.map((offer) => (
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
                        : "outline"
                    }
                  >
                    {offer.status.charAt(0).toUpperCase() +
                      offer.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{offer.industry}</TableCell>
                <TableCell className='text-right'>${offer.payout}</TableCell>
                <TableCell className='text-right'>
                  <Link
                    href={`/dashboard/offers/${offer.id}/publishers`}
                    className='hover:text-primary inline-flex items-center'
                  >
                    {offer.activePublishers}
                    <Users className='ml-1 h-4 w-4' />
                  </Link>
                </TableCell>
                <TableCell className='text-right'>{offer.leadCount}</TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <MoreVertical className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit2 className='mr-2 h-4 w-4' />
                        Edit Offer
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {offer.status === "active" ? (
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
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className='text-destructive'>
                        <Trash2 className='mr-2 h-4 w-4' />
                        Delete Offer
                      </DropdownMenuItem>
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
