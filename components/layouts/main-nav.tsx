import Link from "next/link"
import { Building2, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layouts/mobile-nav"

export function MainNav() {
  return (
    <div className='flex h-16 items-center px-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto w-full max-w-7xl'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-6'>
            <Link href='/' className='flex items-center'>
              <div className='flex items-center'>
                <div className='h-6 w-1.5 bg-blue-500 transform -skew-x-12' />
                <span className='text-xl font-bold ml-2'>
                  <span className='text-blue-500'>ad</span>zado
                </span>
              </div>
            </Link>
            <nav className='hidden md:flex items-center gap-6'>
              <Link
                href='/offers'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Browse Offers
              </Link>
              <Link
                href='/advertisers'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                For Advertisers
              </Link>
              <Link
                href='/resources'
                className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
              >
                Resources
              </Link>
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href='/sign-in'
              className='hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground'
            >
              Sign In
            </Link>
            <Button
              asChild
              variant='outline'
              className='hidden sm:inline-flex rounded-full'
            >
              <Link href='/buyer-signup'>Media Buyer Signup</Link>
            </Button>
            <Button asChild className='hidden sm:inline-flex rounded-full'>
              <Link href='/onboarding'>Post Offer</Link>
            </Button>
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  )
}
