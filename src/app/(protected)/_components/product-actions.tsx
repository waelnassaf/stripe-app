"use client"

import { useTransition } from "react"
import { deleteProduct, toggleProductAvailability } from "@/server/products"
import { useRouter } from "next/navigation"

export function ActiveToggleDropdownItem({
    id,
    isAvailableForPurchase,
}: {
    id: string
    isAvailableForPurchase: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <li
            onClick={() => {
                startTransition(async () => {
                    await toggleProductAvailability(id, !isAvailableForPurchase)
                    router.refresh()
                })
            }}
            className={isPending ? "pointer-events-none opacity-20" : ""}
        >
            {isAvailableForPurchase ? "Deactivate" : "Activate"}
        </li>
    )
}

export function DeleteDropdownItem({
    id,
    disabled,
}: {
    id: string
    disabled: boolean
}) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
        <li
            className={
                disabled || isPending ? "pointer-events-none opacity-20" : ""
            }
            onClick={() => {
                startTransition(async () => {
                    await deleteProduct(id)
                    router.refresh()
                })
            }}
        >
            Delete
        </li>
    )
}
