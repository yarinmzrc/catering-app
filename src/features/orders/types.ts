export type Order = {
  id: string
  total: number
  status: OrderStatus
  guestEmail: string
  guestName?: string
  guestPhone?: string
  createdAt: Date
  updatedAt: Date
}

export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  CANCELLED: "CANCELLED",
  FULFILLED: "FULFILLED",
}

export type OrderStatus = keyof typeof OrderStatus
