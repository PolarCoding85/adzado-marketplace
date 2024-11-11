import { OffersList } from "@/components/marketing/offers/offers-list"
import { OffersFilters } from "@/components/marketing/offers/offers-filters"
import { OffersHeader } from "@/components/marketing/offers/offers-header"

export default function OffersPage() {
  return (
    <div className='container py-8'>
      <OffersHeader />
      <div className='flex flex-col gap-8 lg:flex-row lg:gap-12 mt-8'>
        <aside className='w-full lg:w-64'>
          <OffersFilters />
        </aside>
        <main className='flex-1'>
          <OffersList />
        </main>
      </div>
    </div>
  )
}