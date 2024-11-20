import { RoleBasedLayout } from "@/components/layouts/role-based-layout"

export default function PublisherOffersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RoleBasedLayout allowedRoles={["publisher"]}>{children}</RoleBasedLayout>
  )
}
