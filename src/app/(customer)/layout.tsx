import { Nav, NavLink } from "@/components/customer/nav"
import React from "react"

export const dynamic = "force-dynamic"

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Nav>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/products">Products</NavLink>
                <NavLink href="/orders">My Orders</NavLink>
            </Nav>
            <div className="container my-6 px-5 max-w-7xl mx-auto">
                {children}
            </div>
        </>
    )
}
