import Link from "next/link"

export default function Expired() {
    return (
        <>
            <h1 className="text-4xl mb-4">Download link expired</h1>
            <button className="btn btn-neutral">
                <Link href="/orders">Get New Link</Link>
            </button>
        </>
    )
}