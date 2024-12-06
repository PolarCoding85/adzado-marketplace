// app/(protected)/layout.tsx

import { redirect } from "next/navigation";
import { RoleBasedLayout } from "@/components/layouts/role-based-layout";
import { currentUser } from "@clerk/nextjs/server";
import { ThemeProvider } from "@/components/theme-provider";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <RoleBasedLayout>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </RoleBasedLayout>
  );
}
