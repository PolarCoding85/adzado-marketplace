import { RoleBasedLayout } from "@/components/layouts/role-based-layout"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>
}
