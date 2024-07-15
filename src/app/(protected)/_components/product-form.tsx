"use client"

import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProduct, updateProduct } from "@/server/products"
import { useState } from "react"
import { formatCurrency } from "@/lib/formatters"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from ".prisma/client"
import Image from "next/image"
export const ProductForm = ({ product }: { product?: Product | null }) => {
    const [priceInCents, setPriceInCents] = useState<number | undefined>(
        product?.priceInCents
    )
    const { pending } = useFormStatus()
    const [error, action] = useFormState(
        product == null ? createProduct : updateProduct.bind(null, product.id),
        {}
    )

    return (
        <form className="space-y-4 mb-5" action={action}>
            <label className="form-control w-full" htmlFor="name">
                <div className="label">
                    <span className="label-text">Product Name</span>
                </div>
                <input
                    type="text"
                    id="name"
                    className={`input input-bordered w-full ${error.name && "input-error"}`}
                    placeholder="Gaming Course"
                    name="name"
                    disabled={pending}
                    defaultValue={product?.name || ""}
                />
                {error?.name && (
                    <p className="text-red-700 mt-2 text-sm">{error.name}</p>
                )}
            </label>
            <label className="form-control w-full" htmlFor="priceInCents">
                <div className="label">
                    <span className="label-text">Price in Cents</span>
                </div>
                <input
                    type="number"
                    id="priceInCents"
                    className={`input input-bordered w-full ${error.priceInCents && "input-error"}`}
                    placeholder="199"
                    name="priceInCents"
                    value={priceInCents}
                    onChange={(e) =>
                        setPriceInCents(Number(e.target.value) || undefined)
                    }
                    disabled={pending}
                />
                {error?.priceInCents && (
                    <p className="text-red-700 mt-2 text-sm">
                        {error.priceInCents}
                    </p>
                )}
                <span className="text-sm text-gray-500 p-2">
                    {formatCurrency((priceInCents || 0) / 100)}
                </span>
            </label>
            <label className="form-control w-full" htmlFor="description">
                <div className="label">
                    <span className="label-text">Description</span>
                </div>
                <textarea
                    className={`textarea textarea-bordered w-full ${error.description && "textarea-error"}`}
                    placeholder="A course about gaming..."
                    name="description"
                    id="description"
                    disabled={pending}
                    defaultValue={product?.description}
                />
                {error?.description && (
                    <p className="text-red-700 mt-2 text-sm">
                        {error.description}
                    </p>
                )}
            </label>
            <label className="form-control w-full" htmlFor="file">
                <div className="label">
                    <span className="label-text">File</span>
                </div>
                <input
                    type="file"
                    name="file"
                    id="file"
                    required={product == null}
                    className={`file-input file-input-bordered w-full max-w-xs
                    ${error.file && "file-input-error"}`}
                    disabled={pending}
                />
                {product != null && (
                    <div className="text-muted-foreground">
                        {product.filePath}
                    </div>
                )}
                {error?.file && (
                    <p className="text-red-700 mt-2 text-sm">{error.file}</p>
                )}
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Image</span>
                </div>
                <input
                    type="file"
                    className={`file-input file-input-bordered w-full max-w-xs
                    ${error.image && "file-input-error"}`}
                    name="image"
                    required={product == null}
                    disabled={pending}
                />
                {product != null && (
                    <Image
                        src={product.imagePath}
                        height="400"
                        width="400"
                        alt="Product Image"
                    />
                )}
                {error?.image && (
                    <p className="text-red-700 mt-2 text-sm">{error.image}</p>
                )}
            </label>
            {/*<FormError message={error} />*/}
            {/*<FormSuccess message={success} />*/}
            <button
                type="submit"
                className={`btn btn-neutral w-full`}
                disabled={pending}
            >
                {pending ? "Adding..." : "Add"}
            </button>
        </form>
    )
}
