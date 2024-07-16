"use client"

import { useTransition } from "react"
import {deleteUser } from "@/server/users";
import { useRouter } from "next/navigation"

export function DeleteDropDownItem({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    return (
        <button
            className="btn btn-ghost"
            disabled={isPending}
            onClick={() =>
                startTransition(async () => {
                    await deleteUser(id)
                    router.refresh()
                })
            }
        >
            Delete
        </button>
    )
}