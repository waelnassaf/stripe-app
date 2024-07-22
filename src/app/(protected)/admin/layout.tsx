import React from "react"
import SideNav from "@/components/admin/sidenav"
import { RoleGate } from "@/components/auth/role-gate"

//Prevent Admin Pages caching
// export const dynamic = "force-dynamic"

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <RoleGate allowedRole={"ADMIN"}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {children}
                </div>
            </div>
        </RoleGate>
    )
}
