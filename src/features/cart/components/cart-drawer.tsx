"use client"

import { ShoppingCartIcon } from "lucide-react"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useCartItemsCount, useCartStore } from "@/stores/cart-store"

export function CartDrawer() {
  const items = useCartStore((s) => s.items)
  const itemsCount = useCartItemsCount()

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative rounded-full border p-2">
          <ShoppingCartIcon size={16} />
          <div className="absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
            <span className="text-xs">{itemsCount}</span>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Catering Cart</DrawerTitle>
          <DrawerDescription>
            Lets see how much you want to buy!
          </DrawerDescription>
        </DrawerHeader>
        <pre>{JSON.stringify(items, null, 2)}</pre>
      </DrawerContent>
    </Drawer>
  )
}
