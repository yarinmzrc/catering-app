"use client"

import {
  ArrowLeftIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react"
import { Activity, useState } from "react"

import { Image } from "@/components/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CheckoutForm } from "@/features/orders/components/checkout-form"
import { formatCurrency } from "@/lib/format"

import { useCart } from "../hooks/use-cart"

function CartEmptyState() {
  return (
    <div className="flex items-center border-y p-4">
      <ShoppingCartIcon size={16} className="mr-2" /> Your cart is empty
    </div>
  )
}

function CartItems({ handleCheckout }: { handleCheckout: () => void }) {
  const { items, removeItem, updateQuantity, itemsCount } = useCart()
  return (
    <>
      <ScrollArea className="h-full overflow-hidden">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 border-b p-4">
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
                  onClick={() =>
                    item.quantity === 1
                      ? removeItem(item.id)
                      : updateQuantity(item.id, item.quantity - 1)
                  }
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
      </ScrollArea>
      {itemsCount > 0 && (
        <SheetFooter>
          <Button className="w-full" onClick={handleCheckout}>
            Checkout
          </Button>
        </SheetFooter>
      )}
    </>
  )
}

const CartSteps = {
  items: "items",
  checkout: "checkout",
}

export function CartSheet() {
  const { itemsCount } = useCart()
  const [step, setStep] = useState(CartSteps.items)

  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative rounded-full border p-2">
          <ShoppingCartIcon size={16} />
          <div className="bg-primary absolute -top-1 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full">
            <span className="text-primary-foreground text-xs font-bold">
              {itemsCount}
            </span>
          </div>
        </div>
      </SheetTrigger>
      <SheetContent className="gap-0">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center">
              {step === CartSteps.checkout && (
                <Button
                  onClick={() => setStep(CartSteps.items)}
                  className="mr-2"
                >
                  <ArrowLeftIcon />
                </Button>
              )}
              <span>Catering Cart</span>
            </div>
          </SheetTitle>
          <SheetDescription>
            Lets see how much you want to buy!
          </SheetDescription>
        </SheetHeader>
        {itemsCount === 0 && <CartEmptyState />}
        <Activity mode={step === CartSteps.items ? "visible" : "hidden"}>
          <CartItems handleCheckout={() => setStep(CartSteps.checkout)} />
        </Activity>
        <Activity mode={step === CartSteps.checkout ? "visible" : "hidden"}>
          <CheckoutForm />
        </Activity>
      </SheetContent>
    </Sheet>
  )
}
