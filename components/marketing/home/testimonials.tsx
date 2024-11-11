import { Card } from "@/components/ui/card"
import { StarIcon, QuoteIcon } from "lucide-react"

const testimonials = [
  {
    quote:
      "We've seen a 3x increase in quality leads since joining the platform. The verification process ensures we only work with serious buyers.",
    author: "Sarah Chen",
    role: "Director of Lead Generation",
    company: "InsureTech Solutions",
  },
  {
    quote:
      "The platform's analytics and optimization tools have helped us improve our lead quality and reduce costs significantly.",
    author: "Michael Rodriguez",
    role: "VP of Marketing",
    company: "SolarLeads Pro",
  },
  {
    quote:
      "The quality of leads and support from the Adzado team has been exceptional. We've seen a 3x increase in conversion rates since joining.",
    author: "David Park",
    role: "Performance Manager",
    company: "LeadGen Masters",
  },
]

export function Testimonials() {
  return (
    <section className='py-8 sm:py-12 md:py-16'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='text-center space-y-4 mb-8 sm:mb-12'>
          <h2 className='text-2xl sm:text-3xl font-bold'>
            What Our Members Say
          </h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base'>
            Join thousands of satisfied advertisers and media buyers who trust
            our marketplace
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <Card key={index} className='p-6'>
              <div className='space-y-4'>
                <div className='flex justify-between items-start'>
                  <QuoteIcon className='h-8 w-8 text-blue-500' />
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className='h-4 w-4 text-yellow-500' />
                    ))}
                  </div>
                </div>

                <blockquote className='text-sm sm:text-base'>
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                <div>
                  <p className='font-semibold'>{testimonial.author}</p>
                  <p className='text-sm text-muted-foreground'>
                    {testimonial.role}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
