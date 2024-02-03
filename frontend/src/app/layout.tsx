import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "./globals.css"

import HeaderApp from "@/components/Headers/HeaderApp"
import { AppProvider } from "@/context/page"
import FooterApp from "@/components/Footers/FooterApp"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IPC Bike App",
  description: "IPC Bike App | Book, Ride, Explore: All for Free",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AppProvider>
          <HeaderApp />
          <div className="flex-grow">{children}</div>
          <FooterApp />
        </AppProvider>
      </body>
    </html>
  )
}