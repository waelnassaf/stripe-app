"use client"

import { GoPackage } from "react-icons/go"
import { PiShoppingCartSimple } from "react-icons/pi"
import { IoIosHome } from "react-icons/io"
import { GrGroup } from "react-icons/gr"
import { BsGear } from "react-icons/bs"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: "Dashboard", href: "/admin", icon: IoIosHome },
    {
        name: "Products",
        href: "/admin/products",
        icon: GoPackage,
    },
    { name: "Customers", href: "/admin/users", icon: GrGroup },
    { name: "Sales", href: "/admin/orders", icon: PiShoppingCartSimple },
    { name: "Settings", href: "/admin/settings", icon: BsGear },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                            {
                                "bg-sky-100 text-blue-600":
                                    pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
