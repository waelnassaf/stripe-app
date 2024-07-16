"use client"

import { useFormState, useFormStatus } from "react-dom"
import { emailOrderHistory } from "@/app/(customer)/orders/_actions/orders"

export default function MyOrdersPage() {
    const [data, action] = useFormState(emailOrderHistory, {})

    return (
        <form action={action} className="max-2-xl mx-auto">
            <div className="card">
                <div>
                    <h1>My Orders</h1>
                    <p>
                        Enter your email and we will email you your order
                        history and download links
                    </p>
                </div>
                <div className="card-body">
                    <div className="space-y-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" required name="email" id="email" />
                        {data.error && (
                            <div className="text-destructive">{data.error}</div>
                        )}
                    </div>
                </div>
                <p>{data.message ? <p>{data.message}</p> : <SubmitButton />}</p>
            </div>
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            className="w-full btn btn-neutral"
            disabled={pending}
            type="submit"
        >
            {pending ? "Sending..." : "Send"}
        </button>
    )
}
