import { notFound } from "next/navigation"
import { prisma } from "../../../../../../prisma/client"
import { Stripe } from "stripe"
import { CheckoutForm } from "./_components/checkout-form"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default async function PurchasePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await prisma.product.findUnique({ where: { id } })

  if (product == null) return notFound()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: product.price,
    currency: "USD",
    metadata: { productId: product.id },
  })

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe Could not create payment intent")
  }

  return (
    <CheckoutForm
      product={product}
      clientSecret={paymentIntent.client_secret}
    />
  )
}
