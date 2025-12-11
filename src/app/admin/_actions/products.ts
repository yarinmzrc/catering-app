"use server"

import fs from "fs/promises"
import { redirect } from "next/navigation"
import { z } from "zod"
import { prisma } from "../../../../prisma/client"

const schema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  imagePath: z
    .instanceof(File, { error: "Image is required" })
    .refine(
      (file) => file.size === 0 || file.type.startsWith("image/"),
      "Required",
    )
    .refine((file) => file.size > 0, "Image is required"),
  categoryId: z.string(),
})

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = schema.safeParse(Object.fromEntries(formData.entries()))

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  await fs.mkdir("public/products", { recursive: true })
  const imagePath = `/products/${crypto.randomUUID()}-${data.imagePath.name}`
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.imagePath.arrayBuffer()),
  )

  await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      description: data.description,
      imagePath,
      categoryId: data.categoryId,
    },
  })

  redirect("/admin/products")
}
