"use server"

import { revalidatePath } from "next/cache"
import { notFound } from "next/navigation"

import { ProductService } from "../services/product-service"

export async function deleteProduct(productId: string) {
  const productService = new ProductService()

  try {
    await productService.deleteProduct(productId)
  } catch (error) {
    console.error(error)
    return notFound()
  }

  revalidatePath("/")
  revalidatePath("/products")
}
