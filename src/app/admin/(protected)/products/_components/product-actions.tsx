"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct } from "@/features/products/actions/delete-product"
import { toggleProductAvailability } from "@/features/products/actions/toggle-product-availability"

type ActiveToggleDropdownActionProps = {
  id: string
  isAvailableForSale: boolean
}

export function ActiveToggleDropdownAction({
  id,
  isAvailableForSale,
}: ActiveToggleDropdownActionProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForSale)
          router.refresh()
        })
      }}
    >
      {isAvailableForSale ? "Deactivate" : "Activate"}
    </DropdownMenuItem>
  )
}

type DeleteDropdownItemProps = {
  id: string
  disabled?: boolean
}
export function DeleteDropdownItem({ id, disabled }: DeleteDropdownItemProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  return (
    <DropdownMenuItem
      disabled={disabled || isPending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id)
          router.refresh()
        })
      }}
    >
      <span className="text-red-500">Delete</span>
    </DropdownMenuItem>
  )
}
