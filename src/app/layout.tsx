import { Inter, Poppins } from "next/font/google"
import { Metadata } from "next"
const inter = Inter({ subsets: ["latin"], weight: ["600"] })
import "./globals.css"
import React from "react"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Toaster } from "@/components/sonner"

export const metadata: Metadata = {
    title: "Simple Stripe Use-Case",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()

    return (
        <SessionProvider session={session}>
            <html lang="en">
                <body className={`${inter.className}`}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </SessionProvider>
    )
}
