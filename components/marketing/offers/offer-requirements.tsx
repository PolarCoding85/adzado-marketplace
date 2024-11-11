import { Card } from "@/components/ui/card"
import { CheckCircle2Icon, XCircleIcon } from "lucide-react"

export function OfferRequirements({ requirements }: { requirements: any }) {
  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Targeting Requirements</h2>
        <Card className='p-6 bg-white/5'>
          <ul className='space-y-2'>
            {requirements.targeting.map((req: string) => (
              <li key={req} className='flex items-center gap-2'>
                <CheckCircle2Icon className='h-4 w-4 text-green-500' />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Allowed Traffic Sources</h2>
        <Card className='p-6 bg-white/5'>
          <ul className='space-y-2'>
            {requirements.traffic.map((source: string) => (
              <li key={source} className='flex items-center gap-2'>
                {source.includes("not allowed") ? (
                  <XCircleIcon className='h-4 w-4 text-red-500' />
                ) : (
                  <CheckCircle2Icon className='h-4 w-4 text-green-500' />
                )}
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>Restrictions</h2>
        <Card className='p-6 bg-white/5'>
          <ul className='space-y-2'>
            {requirements.restrictions.map((restriction: string) => (
              <li key={restriction} className='flex items-center gap-2'>
                <XCircleIcon className='h-4 w-4 text-red-500' />
                <span>{restriction}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
