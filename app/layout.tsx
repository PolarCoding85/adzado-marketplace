import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { MainNav } from "@/components/layouts/main-nav"
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/layouts/footer"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Adzado - Premium Lead Generation Marketplace",
  description:
    "Connect with verified advertisers and discover high-converting lead generation offers. Scale your media buying business with quality leads.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <header className='sticky top-0 z-50 w-full'>
            <MainNav />
          </header>
          <main className='flex-1'>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
