import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/layouts/mobile-nav"

const menuItems = [
  {
    href: "/offers",
    label: "Browse Offers",
  },
  {
    href: "/advertisers",
    label: "For Advertisers",
  },
  {
    href: "/publishers",
    label: "For Publishers",
  },
  {
    href: "/resources",
    label: "Resources",
  },
  {
    href: "/gamification",
    label: "Winning",
  },
]

const authButtons = [
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
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className='text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className='flex items-center gap-4'>
            <Link
              href='/sign-in'
              className='hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground'
            >
              Sign In
            </Link>
            {authButtons.map((button) => (
              <Button
                key={button.href}
                asChild
                variant={button.variant}
                className='hidden sm:inline-flex rounded-full'
              >
                <Link href={button.href}>{button.label}</Link>
              </Button>
            ))}
            <MobileNav />
          </div>
        </div>
      </div>
    </div>
  )
}
