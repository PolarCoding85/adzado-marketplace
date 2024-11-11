import { Card } from "@/components/ui/card"
import {
  SearchIcon,
  CheckCircle2Icon,
  BarChart3Icon,
  DollarSignIcon,
} from "lucide-react"

const steps = [
  {
    icon: <SearchIcon className='h-8 w-8' />,
    title: "Find Offers",
    description:
      "Browse our marketplace of verified, high-converting offers across multiple verticals.",
  },
  {
    icon: <CheckCircle2Icon className='h-8 w-8' />,
    title: "Get Approved",
    description:
      "Quick approval process for qualified media buyers with quality traffic sources.",
  },
  {
    icon: <BarChart3Icon className='h-8 w-8' />,
    title: "Scale Campaigns",
    description:
      "Use our real-time analytics to optimize and scale your winning campaigns.",
  },
  {
    icon: <DollarSignIcon className='h-8 w-8' />,
    title: "Get Paid",
    description:
      "Reliable payments with flexible terms and competitive payouts.",
  },
]

export function HowItWorks() {
  return (
    <section className='py-8 sm:py-12 md:py-16'>
      <div className='mx-auto w-full max-w-7xl px-4'>
        <div className='text-center space-y-4 mb-8 sm:mb-12'>
          <h2 className='text-2xl sm:text-3xl font-bold'>How It Works</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base'>
            Get started in minutes and start scaling your media buying business
            with quality offers
          </p>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {steps.map((step, index) => (
            <Card key={index} className='p-6 relative'>
              <div className='space-y-4'>
                <div className='rounded-full bg-white/10 p-4 w-fit'>
                  {step.icon}
                </div>
                <div className='space-y-2'>
                  <h3 className='font-semibold text-xl'>{step.title}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {step.description}
                  </p>
                </div>
              </div>
              <div className='absolute top-6 right-6 text-4xl font-bold text-white/5'>
                {index + 1}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
