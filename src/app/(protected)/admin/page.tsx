import Cards from "@/components/admin/cards"

const DashboardPage = async () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
            <Cards />
        </div>
    )
}

export default DashboardPage
