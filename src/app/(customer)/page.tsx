import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import db from "../../db/db"
import { cache } from "@/lib/cache"
import { Product } from "@prisma/client"
import { BsArrowRight } from "react-icons/bs"
import Link from "next/link"
import { Suspense } from "react"

const getMostPopularProducts = cache(
    () => {
        return db.product.findMany({
            where: { isAvailableForPurchase: true },
            orderBy: { orders: { _count: "desc" } },
            take: 6,
        })
    },
    ["/", "getMostPopularProducts"],
    { revalidate: 60 * 60 }
)

const getNewestProducts = cache(() => {
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { createdAt: "desc" },
        take: 6,
    })
}, ["/", "getNewestProducts"])

export default function HomePage() {
    return (
        <main className="space-y-12">
            <ProductGridSection
                title="Most Popular"
                productsFetcher={getMostPopularProducts}
            />
            <ProductGridSection
                title="Newest"
                productsFetcher={getNewestProducts}
            />
        </main>
    )
}

type ProductGridSectionProps = {
    title: string
    productsFetcher: () => Promise<Product[]>
}

function ProductGridSection({
    productsFetcher,
    title,
}: ProductGridSectionProps) {
    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <button className="btn btn-primary">
                    <Link href="/products" className="space-x-2">
                        <span>View All</span>
                        <BsArrowRight className="text-4xl" />
                    </Link>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense
                    fallback={
                        <>
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                            <ProductCardSkeleton />
                        </>
                    }
                >
                    <ProductSuspense productsFetcher={productsFetcher} />
                </Suspense>
            </div>
        </div>
    )
}

async function ProductSuspense({
    productsFetcher,
}: {
    productsFetcher: () => Promise<Product[]>
}) {
    return (await productsFetcher()).map((product) => (
        <ProductCard key={product.id} {...product} />
    ))
}
