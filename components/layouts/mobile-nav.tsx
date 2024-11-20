"use client"

import * as React from "react"
import Link from "next/link"
import {
  Building2,
  GraduationCap,
  Menu,
  Search,
  Trophy,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const menuItems = [
  {
    href: "/offers",
    label: "Browse Offers",
    icon: Search,
  },
  {
    href: "/advertisers",
    label: "For Advertisers",
    icon: Building2,
  },
  {
    href: "/publishers",
    label: "For Publishers",
    icon: Users,
  },
  {
    href: "/resources",
    label: "Resources",
    icon: GraduationCap,
  },
  {
    href: "/gamification",
    label: "Winning",
    icon: Trophy,
  },
]

const authButtons = [
  {
    href: "/sign-in",
    label: "Sign In",
    variant: "outline" as const,
  },
  {
    href: "/publisher-onboarding",
    label: "Publisher Signup",
    variant: "outline" as const,
  },
  {
    href: "/advertiser-onboarding",
    label: "Post Offer",
    variant: "default" as const,
  },
]

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
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className='flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
                  onClick={() => setOpen(false)}
                >
                  <Icon className='mr-2 h-4 w-4' />
                  {item.label}
                </Link>
              )
            })}
            <div className='flex flex-col gap-2 pt-4'>
              {authButtons.map((button) => (
                <Button
                  key={button.href}
                  asChild
                  variant={button.variant}
                  className='w-full justify-start'
                >
                  <Link href={button.href} onClick={() => setOpen(false)}>
                    {button.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
