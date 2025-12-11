"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useFormState } from "react-dom"
import { addCategory } from "../../_actions/categories"

export function CategoryForm() {
  const [error, action] = useFormState(addCategory, {})

  return (
    <form action={action} className="space-y-8">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" required />
        {error?.name && <div className="text-red-500">{error.name}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  return <Button type="submit">Submit</Button>
}
