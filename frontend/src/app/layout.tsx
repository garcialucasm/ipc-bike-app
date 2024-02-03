import type { Metadata } from "next"

import { Inter } from "next/font/google"
import "./globals.css"

import HeaderApp from "@/components/Headers/HeaderApp"
import { AppProvider } from "@/context/page"

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
      <body className={`min-h-screen ${inter.className}`}>
        <AppProvider>
          <HeaderApp />
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
