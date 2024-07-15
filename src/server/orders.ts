"use server"

import db from "@/prisma/db"

export async function userOrderExists(email: string, productId: string) {
    return (
        (await db.order.findFirst({
            where: { user: { email }, productId },
            select: { id: true },
        })) != null
    )
}
