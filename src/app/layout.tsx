import { Inter, Poppins } from "next/font/google"
import { Metadata } from "next"
const inter = Inter({ subsets: ["latin"], weight: ["600"] })
import "./globals.css"
import React from "react"

export const metadata: Metadata = {
    title: "Simple Stripe Use-Case",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>{children}</body>
        </html>
    )
}
