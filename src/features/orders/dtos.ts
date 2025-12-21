import { Prisma } from "../../../prisma/generated/prisma/client"

export type OrderDTO = {
  id: string
  total: number
  status: OrderStatus
  guestEmail: string
  guestName?: string
  guestPhone?: string
  orderItems: OrderItemDTO[]
  createdAt: Date
  updatedAt: Date
}

export type OrderItemDTO = {
  id: string
  productId: string
  price: number
  quantity: number
  createdAt: Date
}

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
  FULFILLED: "FULFILLED",
}

export type OrderStatus = keyof typeof OrderStatus
