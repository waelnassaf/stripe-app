import db from "@/db/db"

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
    try {
        return await db.twoFactorConfirmation.findUnique({
            where: { userId },
        })
    } catch (error) {
        return null
    }
}
