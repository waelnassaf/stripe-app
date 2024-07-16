import Link from "next/link"
import db from "../../../../../prisma/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { FaEllipsisVertical } from "react-icons/fa6"
import {
    ActiveToggleDropdownItem,
    DeleteDropdownItem,
} from "@/app/(protected)/_components/product-actions"

export default function AdminProductsPage() {
    return (
        <>
            <div className="flex justify-around items-center gap-4 mt-4">
                <h1 className="text-4xl">Products</h1>
                <Link href={"/admin/product/new"} className={"btn btn-primary"}>
                    Add Product
                </Link>
            </div>
            <ProductsTable />
        </>
    )
}

async function ProductsTable() {
    const products = await db.product.findMany({
        select: {
            id: true,
            name: true,
            priceInCents: true,
            isAvailableForPurchase: true,
            _count: { select: { orders: true } },
        },
        orderBy: { name: "asc" },
    })

    if (products.length === 0) return <p>No products found</p>

    return (
        <div className="overflow-x-auto min-h-svh">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Available</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Orders</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <th>
                                {product.isAvailableForPurchase ? (
                                    <>
                                        <span className="sr-only">
                                            Available
                                        </span>
                                        ✅
                                    </>
                                ) : (
                                    <>
                                        <span className="sr-only">
                                            Unavailable
                                        </span>
                                        ❌
                                    </>
                                )}
                            </th>
                            <td>{product.name}</td>
                            <td>
                                {formatCurrency(product.priceInCents / 100)}
                            </td>
                            <td>{formatNumber(product._count.orders)}</td>
                            <td>
                                <div className="dropdown dropdown-hover">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn m-1"
                                    >
                                        <FaEllipsisVertical />{" "}
                                        <span className="sr-only">Actions</span>
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                                    >
                                        <li>
                                            <a
                                                download
                                                href={`/admin/products/${product.id}/download`}
                                            >
                                                Download
                                            </a>
                                        </li>
                                        <li>
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                        </li>
                                        <ActiveToggleDropdownItem
                                            id={product.id}
                                            isAvailableForPurchase={
                                                product.isAvailableForPurchase
                                            }
                                        />
                                        <DeleteDropdownItem
                                            id={product.id}
                                            disabled={product._count.orders > 0}
                                        />
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
