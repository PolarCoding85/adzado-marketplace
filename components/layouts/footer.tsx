import Link from "next/link"
import { Building2Icon, GithubIcon, TwitterIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className='border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-auto w-full max-w-7xl px-4 py-10'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {/* Brand and Description */}
          <div className='space-y-4'>
            <div className='flex items-center'>
              <div className='h-6 w-1.5 bg-blue-500 transform -skew-x-12' />
              <span className='text-xl font-bold ml-2'>
                <span className='text-blue-500'>ad</span>zado
              </span>
            </div>
            <p className='text-sm text-muted-foreground'>
              Premium lead generation marketplace connecting advertisers with
              quality media buyers.
            </p>
          </div>

          {/* Platform Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Platform</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/offers'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Browse Offers
                </Link>
              </li>
              <li>
                <Link
                  href='/advertisers'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  For Advertisers
                </Link>
              </li>
              <li>
                <Link
                  href='/resources'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href='/dashboard'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Company</h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  href='/about'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href='/privacy'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href='/terms'
                  className='text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className='space-y-4'>
            <h3 className='font-semibold'>Connect</h3>
            <ul className='space-y-3'>
              <li>
                <a
                  href='https://twitter.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  <TwitterIcon className='h-4 w-4' />
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href='https://github.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  <GithubIcon className='h-4 w-4' />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href='https://linkedin.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
                >
                  <Building2Icon className='h-4 w-4' />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='mt-8 pt-8 border-t text-center text-sm text-muted-foreground'>
          <p>© {new Date().getFullYear()} Adzado. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
