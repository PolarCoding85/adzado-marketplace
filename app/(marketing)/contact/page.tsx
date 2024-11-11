"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  Building2Icon,
  MailIcon,
  PhoneIcon,
  MessageSquareIcon,
  CheckCircle2Icon,
} from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className='container py-16 space-y-16'>
      {/* Hero Section */}
      <div className='text-center space-y-4'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
          Contact Us
        </h1>
        <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
          Have questions? We&apos;re here to help. Reach out to our team and
          we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className='grid gap-8 md:grid-cols-2'>
        {/* Contact Methods */}
        <div className='space-y-6'>
          <h2 className='text-2xl font-semibold'>Get in Touch</h2>
          <div className='grid gap-6'>
            <Card className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-blue-500/10 p-3'>
                  <MailIcon className='h-6 w-6 text-blue-500' />
                </div>
                <div>
                  <h3 className='font-semibold mb-1'>Email Us</h3>
                  <p className='text-sm text-muted-foreground mb-2'>
                    For general inquiries and support
                  </p>
                  <a
                    href='mailto:support@adzado.com'
                    className='text-blue-500 hover:underline'
                  >
                    support@adzado.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-green-500/10 p-3'>
                  <PhoneIcon className='h-6 w-6 text-green-500' />
                </div>
                <div>
                  <h3 className='font-semibold mb-1'>Call Us</h3>
                  <p className='text-sm text-muted-foreground mb-2'>
                    Monday to Friday, 9am to 6pm EST
                  </p>
                  <a
                    href='tel:+1-555-555-5555'
                    className='text-green-500 hover:underline'
                  >
                    +1 (555) 555-5555
                  </a>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='rounded-full bg-purple-500/10 p-3'>
                  <Building2Icon className='h-6 w-6 text-purple-500' />
                </div>
                <div>
                  <h3 className='font-semibold mb-1'>Visit Us</h3>
                  <p className='text-sm text-muted-foreground'>
                    123 Market Street
                    <br />
                    Suite 456
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Contact Form */}
        <Card className='p-6'>
          {submitted ? (
            <div className='h-full flex flex-col items-center justify-center text-center space-y-4'>
              <div className='rounded-full bg-green-500/10 p-3'>
                <CheckCircle2Icon className='h-12 w-12 text-green-500' />
              </div>
              <h3 className='text-2xl font-semibold'>Message Sent!</h3>
              <p className='text-muted-foreground'>
                Thank you for reaching out. We&apos;ll get back to you within 24
                hours.
              </p>
              <Button
                variant='outline'
                onClick={() => setSubmitted(false)}
                className='mt-4'
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='space-y-2'>
                <h2 className='text-2xl font-semibold'>Send a Message</h2>
                <p className='text-sm text-muted-foreground'>
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </p>
              </div>

              <div className='grid gap-4'>
                <div className='grid gap-4 sm:grid-cols-2'>
                  <div className='space-y-2'>
                    <label htmlFor='name' className='text-sm font-medium'>
                      Name
                    </label>
                    <Input id='name' placeholder='John Doe' required />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='email' className='text-sm font-medium'>
                      Email
                    </label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='john@example.com'
                      required
                    />
                  </div>
                </div>

                <div className='space-y-2'>
                  <label htmlFor='subject' className='text-sm font-medium'>
                    Subject
                  </label>
                  <Input id='subject' placeholder='How can we help?' required />
                </div>

                <div className='space-y-2'>
                  <label htmlFor='message' className='text-sm font-medium'>
                    Message
                  </label>
                  <Textarea
                    id='message'
                    placeholder='Tell us about your inquiry...'
                    className='min-h-[150px]'
                    required
                  />
                </div>
              </div>

              <Button type='submit' className='w-full'>
                <MessageSquareIcon className='mr-2 h-4 w-4' />
                Send Message
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
