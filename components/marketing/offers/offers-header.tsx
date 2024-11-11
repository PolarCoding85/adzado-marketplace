"use client"

import { SearchIcon, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { OffersFilters } from "./offers-filters"
import { FeaturedOffers } from "./featured-offers"

export function OffersHeader() {
  return (
    <div className='space-y-8'>
      <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='gradient-heading text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-bold tracking-tighter'>
            Browse Offers
          </h1>
          <p className='text-sm text-muted-foreground'>
            Find and compare the best converting offers across all verticals
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Select defaultValue='newest'>
            <SelectTrigger className='w-40'>
              <SelectValue placeholder='Sort by' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='newest'>Newest First</SelectItem>
              <SelectItem value='payout-desc'>Highest Payout</SelectItem>
              <SelectItem value='payout-asc'>Lowest Payout</SelectItem>
              <SelectItem value='popularity'>Most Popular</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='outline' size='icon' className='lg:hidden'>
                <SlidersHorizontal className='h-4 w-4' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-full sm:w-[340px]'>
              <OffersFilters />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Featured Offers */}
      <FeaturedOffers />

      <div className='relative'>
        <SearchIcon className='absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
        <input
          className='w-full rounded-lg bg-muted/50 px-10 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring'
          placeholder='Search offers by keyword, advertiser, or vertical...'
          type='search'
        />
      </div>
    </div>
  )
}
