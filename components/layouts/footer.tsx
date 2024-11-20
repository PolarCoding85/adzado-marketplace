import Link from "next/link"
import { GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react"

const platformLinks = [
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
    href: "/gamification",
    label: "Winning",
  },
]

const companyLinks = [
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/careers",
    label: "Careers",
  },
  {
    href: "/resources",
    label: "Resources",
  },
]

const legalLinks = [
  {
    href: "/privacy",
    label: "Privacy Policy",
  },
  {
    href: "/terms",
    label: "Terms of Service",
  },
  {
    href: "/cookies",
    label: "Cookie Policy",
  },
  {
    href: "/disclaimer",
    label: "Disclaimer",
  },
]

const socialLinks = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    icon: TwitterIcon,
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://github.com",
    label: "GitHub",
    icon: GithubIcon,
  },
]

export function Footer() {
  return (
    <footer className='border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto w-full max-w-7xl px-4 py-10'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-5'>
          {/* Brand and Description */}
          <div className='space-y-4 md:col-span-2'>
            <div className='flex items-center'>
              <div className='h-6 w-1.5 bg-blue-500 transform -skew-x-12' />
              <span className='text-xl font-bold ml-2'>
                <span className='text-blue-500'>ad</span>zado
              </span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Premium lead generation marketplace connecting advertisers with
              quality media buyers. Join our network of successful publishers
              and advertisers.
            </p>
          </div>

          {/* Platform Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Platform</h3>
            <ul className='space-y-3'>
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Company</h3>
            <ul className='space-y-3'>
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Legal</h3>
            <ul className='space-y-3'>
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className='mt-8 pt-8 border-t'>
          <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-muted-foreground'>
              © {new Date().getFullYear()} Adzado. All rights reserved.
            </p>
            <div className='flex items-center gap-4'>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-muted-foreground hover:text-foreground transition-colors'
                  >
                    <Icon className='h-5 w-5' />
                    <span className='sr-only'>{link.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
