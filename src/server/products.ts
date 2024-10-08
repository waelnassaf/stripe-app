"use server"

import db from "../db/db"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { ProductSchema, UpdateProductSchema } from "@/schemas"

export async function createProduct(prevState: unknown, formData: FormData) {
    const result = ProductSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    await fs.mkdir("products", { recursive: true })
    const filePath = `products/${crypto.randomUUID()}-${data.file.name}`
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))

    await fs.mkdir("public/products", { recursive: true })
    const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
    await fs.writeFile(
        `public${imagePath}`,
        Buffer.from(await data.image.arrayBuffer())
    )

    await db.product.create({
        data: {
            isAvailableForPurchase: false,
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
}

export async function updateProduct(
    id: string,
    prevState: unknown,
    formData: FormData
) {
    const result = UpdateProductSchema.safeParse(
        Object.fromEntries(formData.entries())
    )

    if (!result.success) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const product = await db.product.findUnique({ where: { id } })

    if (!product) {
        notFound()
    }

    let filePath = product.filePath
    if (data.file != null && data.file.size > 0) {
        await fs.unlink(product.filePath)
        filePath = `products/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()))
    }

    let imagePath = product.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${product.imagePath}`)
        imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${imagePath}`,
            Buffer.from(await data.image.arrayBuffer())
        )
    }

    await db.product.update({
        where: { id },
        data: {
            name: data.name,
            description: data.description,
            priceInCents: data.priceInCents,
            filePath,
            imagePath,
        },
    })

    revalidatePath("/")
    revalidatePath("/products")

    redirect("/admin/products")
}

export async function toggleProductAvailability(
    id: string,
    isAvailableForPurchase: boolean
) {
    await db.product.update({ where: { id }, data: { isAvailableForPurchase } })

    revalidatePath("/")
    revalidatePath("/products")
}

export async function deleteProduct(id: string) {
    const product = await db.product.delete({ where: { id } })

    if (product == null) return notFound()

    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)

    revalidatePath("/")
    revalidatePath("/products")
}
