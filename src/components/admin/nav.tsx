"use client"

import { ReactNode, ComponentProps } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export const Nav = ({ children }: { children: ReactNode }) => {
    return (
        <nav className="bg-gray-700 text-white flex justify-center px-4">
            {children}
        </nav>
    )
}

export const NavLink = (
    props: Omit<ComponentProps<typeof Link>, "className">
) => {
    const pathname = usePathname()
    return (
        <Link
            {...props}
            className={clsx(
                "p-4 hover:bg-white hover:text-gray-900",
                pathname === props.href && "bg-white text-gray-900"
            )}
        />
    )
}
