import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { AppProvider } from "@/context/page"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "IPC Bike App",
  description: "IPC Bike App | Book, Ride, Explore: All for Free",
  openGraph: {
    title: "IPC Bike App",
    description: "IPC Bike App | Book, Ride, Explore: All for Free",
    url: "https://ipc.bike",
    siteName: "IPC Bike",
    type: "website",
  },
  metadataBase: new URL("https://ipc.bike"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
