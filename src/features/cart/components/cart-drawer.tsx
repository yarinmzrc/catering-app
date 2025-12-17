"use client"

import { MinusIcon, PlusIcon, ShoppingCartIcon } from "lucide-react"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { formatCurrency } from "@/lib/format"
import { useCartItemsCount, useCartStore } from "@/stores/cart-store"

export function CartSheet() {
  const items = useCartStore((s) => s.items)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const itemsCount = useCartItemsCount()

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative rounded-full border p-2">
          <ShoppingCartIcon size={16} />
          <div className="absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
            <span className="text-xs">{itemsCount}</span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>Catering Cart</SheetTitle>
          <SheetDescription>
            Lets see how much you want to buy!
          </SheetDescription>
        </SheetHeader>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 border-b p-3">
            <Image
              src={item.imagePath}
              alt={item.name}
              width={40}
              height={40}
            />
            <div className="flex flex-col gap-2">
              <p className="font-bold">{item.name}</p>
              <p className="text-secondary-foreground text-sm">
                {formatCurrency(item.price * item.quantity)}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="p-1"
                  disabled={item.quantity === 1}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <MinusIcon className="text-xs" />
                </Button>
                <span>{item.quantity}</span>
                <Button
                  size="sm"
                  className="p-1"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <PlusIcon className="text-xs" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  )
}
