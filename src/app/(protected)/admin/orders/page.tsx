import db from "@/prisma/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { DeleteDropDownItem } from "./_components/order-actions"
import { FaEllipsisVertical } from "react-icons/fa6"

function getOrders() {
    return db.order.findMany({
        select: {
            id: true,
            pricePaidInCents: true,
            product: { select: { name: true } },
            user: { select: { email: true } },
        },
        orderBy: { createdAt: "desc" },
    })
}

export default function OrdersPage() {
    return (
        <>
            <h1>Sales</h1>
            <OrdersTable />
        </>
    )
}

async function OrdersTable() {
    const orders = await getOrders()

    if (orders.length === 0) return <p>No sales found</p>

    return (
        <div className="overflow-x-auto min-h-svh">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Customer</th>
                        <th>Price Paid</th>
                        <th>
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <th>{order.product.name}</th>
                            <td>{order.user.email}</td>
                            <td>
                                {formatCurrency(order.pricePaidInCents / 100)}
                            </td>
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
                                        <DeleteDropDownItem id={order.id} />
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
