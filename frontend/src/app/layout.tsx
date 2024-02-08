import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"

import HeaderApp from "@/components/Headers/HeaderApp"
import { AppProvider } from "@/context/page"
import FooterApp from "@/components/Footers/FooterApp"
import DevShowContext from "@/components/Test/DevShowContext"

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
          {children}
          <FooterApp />
          <DevShowContext />
        </AppProvider>
      </body>
    </html>
  )
}
