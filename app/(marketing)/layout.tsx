// app/(marketing)/layout.tsx

import { MainNav } from "@/components/layouts/main-nav";
import { Footer } from "@/components/layouts/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <MainNav />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}