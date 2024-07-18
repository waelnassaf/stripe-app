//All this code does is make sure Prisma is working correctly with Next.js
//Local variable is "db" and global is "prisma"

import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient | undefined
}

const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === "development") globalThis.prisma = db

export default db
