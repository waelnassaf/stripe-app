import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Tailwind,
} from "@react-email/components"
import { OrderInformation } from "@/email/components/order-information"
import React from "react"

type OrderHistoryEmailProps = {
    orders: {
        id: string
        pricePaidInCents: number
        createdAt: Date
        downloadVerificationId: string
        product: {
            name: string
            imagePath: string
            description: string
        }
    }[]
}

OrderHistoryEmail.PreviewProps = {
    orders: [
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 10000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: "Product name",
                description: "Some description",
                imagePath:
                    "/products/457b21a9-214e-4e5d-a951-6466159f711d-amzn-gc.png",
            },
        },
        {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            pricePaidInCents: 2000,
            downloadVerificationId: crypto.randomUUID(),
            product: {
                name: "Product name 2",
                description: "Some other desc",
                imagePath:
                    "/products/0e9b8302-f4d0-4180-9f54-eef17632e486-Screen Shot 2024-07-10 at 8.56.20 AM.png",
            },
        },
    ],
} satisfies OrderHistoryEmailProps

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
    return (
        <Html>
            <Preview>Order History & Downloads</Preview>
            <Tailwind>
                <Head />
                <Body className="font-sans bg-white">
                    <Container className="max-w-xl">
                        <Heading>Order History</Heading>
                        {orders.map((order, index) => (
                            <React.Fragment key={order.id}>
                                <OrderInformation
                                    order={order}
                                    product={order.product}
                                    downloadVerificationId={
                                        order.downloadVerificationId
                                    }
                                />
                                {index < orders.length - 1 && <Hr />}
                            </React.Fragment>
                        ))}
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
