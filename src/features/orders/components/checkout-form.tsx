"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SheetFooter } from "@/components/ui/sheet"
import { useCartStore } from "@/stores/cart-store"

import { createOrder } from "../actions/place-order"

export function CheckoutForm() {
  const { items } = useCartStore()
  const [error, action] = useActionState(createOrder.bind(null, items), {})

  return (
    <form action={action}>
      <div className="space-y-8 p-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" required />
          {error?.email && <div className="text-red-500">{error.email}</div>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
          {error?.name && <div className="text-red-500">{error.name}</div>}
        </div>
      </div>
      <SheetFooter>
        <Button className="w-full" type="submit">
          Place order
        </Button>
      </SheetFooter>
    </form>
  )
}
