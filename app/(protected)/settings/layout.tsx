// app/(protected)/settings/layout.tsx

import { SettingsLayout } from "@/components/settings/settings-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SettingsLayout>{children}</SettingsLayout>;
}