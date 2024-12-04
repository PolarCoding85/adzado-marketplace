// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/layouts/main-nav";
import { Footer } from "@/components/layouts/footer";
import SystemProviders from "@/providers/system-providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Adzado Marketplace",
  description: "Connect publishers and advertisers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SystemProviders>
          <div className="relative min-h-screen flex flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </SystemProviders>
      </body>
    </html>
  );
}
