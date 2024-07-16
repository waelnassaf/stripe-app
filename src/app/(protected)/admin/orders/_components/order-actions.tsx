"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import {deleteOrder } from "@/server/orders";

export function DeleteDropDownItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <button
            className="btn btn-ghost"
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await deleteOrder(id)
                    router.refresh()
                })
            }
        >
            Delete
        </button>
    )
}