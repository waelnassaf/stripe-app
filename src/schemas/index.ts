import { UserRole } from "@prisma/client"
import * as z from "zod"

const fileSchema = z.instanceof(File, { message: "Required" })
const imageSchema = fileSchema.refine(
    (file) => file.size === 0 || file.type.startsWith("image/")
)

export const ProductSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    priceInCents: z.coerce.number().int().positive({
        message: "Price in cents must be a positive integer!",
    }),
    description: z.string().min(1, {
        message: "Description is required!",
    }),
    file: fileSchema.refine((file) => file.size > 0, "Required"),
    image: imageSchema.refine((file) => file.size > 0, "Required"),
})

export const UpdateProductSchema = ProductSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(1, {
        message: "Password is required!",
    }),
    code: z.optional(
        z.string().min(6, {
            message: "Invalid Code!",
        })
    ),
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!",
    }),
    email: z.string().email({
        message: "Invalid Email!",
    }),
    password: z.string().min(6, {
        message: "Minimum password should be 6 characters!",
    }),
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required",
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Password is too short!",
    }),
})

export const SettingsSchema = z
    .object({
        name: z.optional(z.string().min(1)),
        isTwoFactorEnabled: z.optional(z.boolean()),
        role: z.enum([UserRole.ADMIN, UserRole.USER]),
        email: z.optional(z.string().email()),
        password: z.optional(z.string().min(6)),
        newPassword: z.optional(z.string().min(6)),
    })
    .refine(
        (data) => {
            return !(data.password && !data.newPassword)
        },
        {
            message: "New password is required!",
            path: ["newPassword"],
        }
    )
    .refine(
        (data) => {
            return !(data.newPassword && !data.password)
        },
        {
            message: "Password is required!",
            path: ["password"],
        }
    )
