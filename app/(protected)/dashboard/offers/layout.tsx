import { RoleBasedLayout } from "@/components/layouts/role-based-layout"

export default function AdvertiserOffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleBasedLayout allowedRoles={["advertiser"]}>{children}</RoleBasedLayout>
  )
}
