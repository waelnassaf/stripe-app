import db from "@/prisma/db"

import { ProductForm } from "@/app/(protected)/_components/product-form"

export default async function EditProductPage({
    params: { id },
}: {
    params: { id: string }
}) {
    const product = await db.product.findUnique({ where: { id } })

    return (
        <>
            <h1>Edit Product</h1>
            <ProductForm product={product} />
        </>
    )
}
