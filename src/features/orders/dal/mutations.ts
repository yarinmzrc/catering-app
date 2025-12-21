import db from "@/lib/db"

import { getProductsByIds } from "../../products/dal/queries"
import { OrderCreateInput } from "../dtos"

export async function createOrder(input: OrderCreateInput) {
  const products = await getProductsByIds(
    input.orderItems.map((i) => i.productId),
  )

  if (products.length !== input.orderItems.length) {
    throw new Error("Product not found")
  }

  const orderItems = input.orderItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)!
    return {
      productId: product.id,
      price: product.price,
      quantity: item.quantity,
    }
  })

  const pricePaid = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return db.order.create({
    data: {
      pricePaid,
      guestEmail: input.guestEmail,
      guestName: input.guestName,
      guestPhone: input.guestPhone,
      orderItems: {
        create: orderItems,
      },
    },
  })
}
