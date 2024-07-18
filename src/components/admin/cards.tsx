import db from "../../../prisma/db"
import { wait } from "@/lib/helpers"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { GoPackage } from "react-icons/go"
import { PiShoppingCartSimple } from "react-icons/pi"
import { GrGroup } from "react-icons/gr"

const iconMap = {
    sales: PiShoppingCartSimple,
    customers: GrGroup,
    products: GoPackage,
}

async function getSalesData() {
    const data = await db.order.aggregate({
        _sum: { pricePaidInCents: true },
        _count: true,
    })

    await wait(2000)

    return {
        amount: (data._sum.pricePaidInCents || 0) / 100,
        numberOfSales: data._count,
    }
}

async function getUserData() {
    const [userCount, orderData] = await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum: { pricePaidInCents: true },
        }),
    ])
    return {
        userCount,
        averageValuePerUser:
            userCount === 0
                ? 0
                : (orderData._sum.pricePaidInCents || 0) / userCount / 100,
    }
}

async function getProductData() {
    const [activeCount, inactiveCount] = await Promise.all([
        db.product.count({ where: { isAvailableForPurchase: true } }),
        db.product.count({ where: { isAvailableForPurchase: false } }),
    ])

    return { activeCount, inactiveCount }
}

export default async function Cards() {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])

    return (
        <>
            <DashboardCard
                title="Sales"
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
                type="sales"
            />
            <DashboardCard
                title="Customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average Value`}
                body={formatNumber(userData.userCount)}
                type="customers"
            />
            <DashboardCard
                title="Active Products"
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
                body={formatNumber(productData.activeCount)}
                type="products"
            />
        </>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
    type: "sales" | "customers" | "products"
}

const DashboardCard = ({ title, subtitle, body, type }: DashboardCardProps) => {
    const Icon = iconMap[type]

    return (
        <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
            <div className="flex p-4">
                {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
                <h3 className="ml-2 text-sm font-medium">{title}</h3>
            </div>
            <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
                {body}
            </p>
            <p className="text-sm text-gray-400 mt-3">{subtitle}</p>
        </div>
    )
}
