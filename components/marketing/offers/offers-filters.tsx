"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const filters = {
  verticals: [
    { id: "insurance", label: "Insurance", count: 245 },
    { id: "solar", label: "Solar", count: 189 },
    { id: "home-services", label: "Home Services", count: 167 },
    { id: "finance", label: "Finance", count: 156 },
    { id: "education", label: "Education", count: 134 },
  ],
  leadTypes: [
    { id: "exclusive", label: "Exclusive", count: 423 },
    { id: "shared", label: "Shared", count: 312 },
    { id: "live-transfer", label: "Live Transfer", count: 156 },
    { id: "aged", label: "Aged", count: 89 },
  ],
  countries: [
    { id: "us", label: "United States", count: 789 },
    { id: "ca", label: "Canada", count: 234 },
    { id: "uk", label: "United Kingdom", count: 167 },
    { id: "au", label: "Australia", count: 123 },
  ],
  payoutRange: [
    { id: "0-25", label: "$0 - $25", count: 234 },
    { id: "26-50", label: "$26 - $50", count: 345 },
    { id: "51-100", label: "$51 - $100", count: 267 },
    { id: "100+", label: "$100+", count: 123 },
  ],
  networks: [
    { id: "leadpro", label: "LeadPro Network", count: 234 },
    { id: "mediabuyers", label: "Media Buyers Direct", count: 189 },
    { id: "leadgen", label: "LeadGen Premium", count: 167 },
    { id: "convertify", label: "Convertify", count: 145 },
  ],
}

export function OffersFilters() {
  return (
    <div className='flex flex-col gap-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold tracking-tight'>Filters</h2>
        <Button variant='ghost' size='sm' className='text-muted-foreground'>
          Reset
        </Button>
      </div>
      <div className='flex flex-wrap gap-2'>
        <Badge variant='secondary'>Insurance</Badge>
        <Badge variant='secondary'>Exclusive</Badge>
        <Badge variant='secondary'>United States</Badge>
      </div>
      <Accordion type='multiple' className='w-full'>
        <AccordionItem value='verticals'>
          <AccordionTrigger>Verticals</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              {filters.verticals.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.label}
                    <span className='text-muted-foreground'>
                      ({item.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='lead-types'>
          <AccordionTrigger>Lead Types</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              {filters.leadTypes.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.label}
                    <span className='text-muted-foreground'>
                      ({item.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='countries'>
          <AccordionTrigger>Countries</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              {filters.countries.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.label}
                    <span className='text-muted-foreground'>
                      ({item.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='payout'>
          <AccordionTrigger>Payout Range</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              {filters.payoutRange.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.label}
                    <span className='text-muted-foreground'>
                      ({item.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='networks'>
          <AccordionTrigger>Networks</AccordionTrigger>
          <AccordionContent>
            <div className='space-y-4'>
              {filters.networks.map((item) => (
                <div key={item.id} className='flex items-center gap-2'>
                  <Checkbox id={item.id} />
                  <label
                    htmlFor={item.id}
                    className='flex flex-1 items-center justify-between text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {item.label}
                    <span className='text-muted-foreground'>
                      ({item.count})
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
