"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

import { paths } from "@/config/paths"

import { createProductSchema } from "../schemas"
import { ProductService } from "../services/product-service"

export async function createProduct(_: unknown, formData: FormData) {
  const result = createProductSchema.safeParse(
    Object.fromEntries(formData.entries()),
  )

  if (result.success === false) {
    return z.flattenError(result.error).fieldErrors
  }

  const data = result.data

  const productService = new ProductService()
  await productService.createProduct(data)

  revalidatePath("/")
  revalidatePath("/products")

  redirect(paths.admin.products.root.getHref())
}
