"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { prisma } from "../../../../prisma/client"

const schema = z.object({
  name: z.string().min(1),
})

export async function addCategory(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  await prisma.category.create({
    data: {
      name: data.name,
    },
  })

  redirect("/admin/products")
}
