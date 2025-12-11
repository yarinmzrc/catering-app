"use client"

import { useState } from "react"
import { Category } from "../../../../../prisma/generated/prisma/client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/format"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { SelectTrigger } from "@radix-ui/react-select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { addProduct } from "../../_actions/products"

type ProductFormProps = {
  categories: Category[]
}
export function ProductForm({ categories }: ProductFormProps) {
  const [error, action] = useFormState(addProduct, {})
  const [price, setPrice] = useState<number>()

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {error?.name && <div className="text-red-500">{error.name}</div>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          value={price ?? ""}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
        {error?.price && <div className="text-red-500">{error.price}</div>}
        <div className="text-muted-foreground">
          {formatCurrency(price ?? 0)}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" required>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error?.categoryId && (
          <div className="text-red-500">{error.categoryId}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
        {error?.description && (
          <div className="text-red-500">{error.description}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="imagePath">Image</Label>
        <Input type="file" id="imagePath" name="imagePath" required />
        {error?.imagePath && (
          <div className="text-red-500">{error.imagePath}</div>
        )}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  return <Button type="submit">Submit</Button>
}
