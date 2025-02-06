import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Not So Simple, LLC",
  description: "Software Consulting & Development",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>
        <Navigation />
        {children}
      </body>
      <Footer />
    </html>
  )
}

