"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='icon' className='md:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
        <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            className='flex items-center'
            onClick={() => setOpen(false)}
          >
            <div className='flex items-center'>
              <div className='h-6 w-1.5 bg-blue-500 transform -skew-x-12' />
              <span className='text-xl font-bold ml-2'>
                <span className='text-blue-500'>ad</span>zado
              </span>
            </div>
          </Link>
        </div>
        <ScrollArea className='my-4 h-[calc(100vh-8rem)] pb-10'>
          <div className='flex flex-col gap-4'>
            <Link
              href='/offers'
              className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              onClick={() => setOpen(false)}
            >
              <Search className='mr-2 h-4 w-4' />
              Explore Offers
            </Link>
            <Link
              href='/advertisers'
              className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              onClick={() => setOpen(false)}
            >
              <Building2 className='mr-2 h-4 w-4' />
              For Advertisers
            </Link>
            <Link
              href='/resources'
              className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
              onClick={() => setOpen(false)}
            >
              <Building2 className='mr-2 h-4 w-4' />
              Resources
            </Link>
            <div className='flex flex-col gap-2 pt-4'>
              <Button
                asChild
                variant='outline'
                className='w-full justify-start'
              >
                <Link href='/sign-in' onClick={() => setOpen(false)}>
                  Sign In
                </Link>
              </Button>
              <Button
                asChild
                variant='outline'
                className='w-full justify-start'
              >
                <Link href='/buyer-signup' onClick={() => setOpen(false)}>
                  Media Buyer Signup
                </Link>
              </Button>
              <Button asChild className='w-full justify-start'>
                <Link href='/onboarding' onClick={() => setOpen(false)}>
                  Post Offer
                </Link>
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
