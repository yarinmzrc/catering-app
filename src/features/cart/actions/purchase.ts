"use server"

import { createMessage } from "@/lib/messages"
import { CartProduct } from "@/stores/cart-store"

export async function purchase(items: CartProduct[]) {
  return await createMessage(items)
}
