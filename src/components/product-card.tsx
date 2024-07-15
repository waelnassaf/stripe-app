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
        <div className="flex overflow-hidden flex-col card">
            <div className="relative w-full h-auto aspect-video">
                <Image src={imagePath} fill alt={name} />
            </div>
            <p className="card-title">{name}</p>
            <div className="card-body">
                {formatCurrency(priceInCents / 100)}
            </div>
            <div className="card-body">
                <p className="line-clamp-4">{description}</p>
            </div>
            <div className="card-actions">
                <button className="w-full btn btn-neutral">
                    <Link href={`/products/${id}/purchase`}>Purchase</Link>
                </button>
            </div>
        </div>
    )
}

export function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden flex flex-col animate-pulse card">
            <div className="w-full aspect-video bg-gray-300" />
            <div>
                <div className="card-title">
                    <div className="w-3/4 h-6 rounded-full bg-gray-300" />
                </div>
                <div className="card-title">
                    <div className="w-1/2 h-4 rounded-full bg-gray-300" />
                </div>
            </div>
            <div className="space-y-2 card-compact">
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-full h-4 rounded-full bg-gray-300" />
                <div className="w-3/4 h-4 rounded-full bg-gray-300" />
            </div>
            <div className="card-actions">
                <button className="w-full btn btn-primary" disabled></button>
            </div>
        </div>
    )
}
