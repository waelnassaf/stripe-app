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
                    <label className="form-control w-full" htmlFor="email">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="email"
                            id="email"
                            className={`input input-bordered w-full ${data.error && "input-error"}`}
                            placeholder="john@doe.com"
                            required
                            name="email"
                        />
                        {data.error && (
                            <div className="text-destructive">{data.error}</div>
                        )}
                    </label>
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
            className="w-1/5 btn btn-neutral"
            disabled={pending}
            type="submit"
        >
            {pending ? "Sending..." : "Send"}
        </button>
    )
}
