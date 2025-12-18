"use server"

import { z } from "zod"

import { prisma } from "../../../../prisma/client"
import { createOrderSchema } from "../schemas"

export async function createOrder(
  cartItems: {
    id: string
    quantity: number
  }[],
  _: unknown,
  formData: FormData,
) {
  const result = createOrderSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const products = await prisma.product.findMany({
    where: {
      id: { in: cartItems.map((i) => i.id) },
    },
  })

  if (products.length !== cartItems.length) {
    throw new Error("Invalid cart")
  }

  const orderItems = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.id)!
    return {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: item.quantity,
    }
  })

  const pricePaid = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  const data = result.data

  await prisma.order.create({
    data: {
      pricePaid,
      guestEmail: data.email,
      guestName: data.name,
      guestPhone: data.phone,
      orderItems: {
        create: orderItems,
      },
    },
  })
}
