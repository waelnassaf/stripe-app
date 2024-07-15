import React from "react"
import { Nav, NavLink } from "@/components/admin/nav"

//Prevent Admin Pages caching
// export const dynamic = "force-dynamic"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Nav>
                <NavLink href={"/admin"}>Dashboard</NavLink>
                <NavLink href={"/admin/products"}>Products</NavLink>
                <NavLink href={"/admin/users"}>Customers</NavLink>
                <NavLink href={"/admin/orders"}>Sales</NavLink>
            </Nav>
            <div>{children}</div>
        </>
    )
}
