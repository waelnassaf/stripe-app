import db from "../../../../db/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { FaEllipsisVertical } from "react-icons/fa6"
import { DeleteDropDownItem } from "./_components/user-actions"

function getUsers() {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: { select: { pricePaidInCents: true } },
        },
        orderBy: { createdAt: "desc" },
    })
}

export default function UsersPage() {
    return (
        <>
            <h1>Customers</h1>
            <UsersTable />
        </>
    )
}

async function UsersTable() {
    const users = await getUsers()

    if (users.length === 0) return <p>No customers found</p>

    return (
        <div className="overflow-x-auto min-h-svh">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Orders</th>
                        <th>Value</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <th>{user.email}</th>
                            <td>{formatNumber(user.orders.length)}</td>
                            <td>
                                {formatCurrency(
                                    user.orders.reduce(
                                        (sum, o) => o.pricePaidInCents + sum,
                                        0
                                    ) / 100
                                )}
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
                                        <DeleteDropDownItem id={user.id} />
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
