import db from "@/prisma/db"
import { formatCurrency, formatNumber } from "@/lib/formatters"
import { wait } from "@/lib/helpers"
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

const DashboardPage = async () => {
    const [salesData, userData, productData] = await Promise.all([
        getSalesData(),
        getUserData(),
        getProductData(),
    ])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
            <DashboardCard
                title={"Sales"}
                subtitle={`${formatNumber(salesData.numberOfSales)} Orders`}
                body={formatCurrency(salesData.amount)}
            />
            <DashboardCard
                title="Customers"
                subtitle={`${formatCurrency(
                    userData.averageValuePerUser
                )} Average Value`}
                body={formatNumber(userData.userCount)}
            />
            <DashboardCard
                title="Active Products"
                subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
                body={formatNumber(productData.activeCount)}
            />
        </div>
    )
}

type DashboardCardProps = {
    title: string
    subtitle: string
    body: string
}
const DashboardCard = ({ title, subtitle, body }: DashboardCardProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{title}</h2>
                <p>{subtitle}</p>
                <div className="card-actions">
                    {/*<button className="btn btn-primary">Buy Now</button>*/}
                    {body}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
