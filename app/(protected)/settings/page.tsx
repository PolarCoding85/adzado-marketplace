// app/(protected)/settings/page.tsx

import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/settings/personal");
}