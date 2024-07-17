import NewPasswordForm from "@/components/auth/new-password-form"
import { Suspense } from "react"
import NewVerificationForm from "@/components/auth/new-verification-form"

const NewPasswordPage = () => {
    return (
        <Suspense>
            <NewPasswordForm />
        </Suspense>
    )
}

export default NewPasswordPage
