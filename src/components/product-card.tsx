import { formatCurrency } from "@/lib/formatters"
import Link from "next/link"
import Image from "next/image"

type ProductCardProps = {
    id: string
    name: string
    priceInCents: number
    description: string
    imagePath: string
}

export function ProductCard({
    id,
    name,
    priceInCents,
    description,
    imagePath,
}: ProductCardProps) {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <Image src={imagePath} width={250} height={90} alt={name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-accent">
                        {formatCurrency(priceInCents / 100)}
                    </div>
                </h2>
                <p>{description}</p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Gift Cards</div>
                    <div className="badge badge-outline">Amazon</div>
                </div>
                <div className="card-actions">
                    <button className="w-1/2 btn btn-success text-white">
                        <Link href={`/products/${id}/purchase`}>Purchase</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col justify-between gap-4 w-96 card">
            <div className="skeleton h-32 w-72"></div>
            <div className="flex items-center gap-4">
                <div className="flex flex-col gap-4">
                    <div className="skeleton h-4 w-80"></div>
                    <div className="skeleton h-4 w-60"></div>
                </div>
            </div>
            <div className="skeleton h-10 w-20 shrink-0"></div>
        </div>
    )
}
