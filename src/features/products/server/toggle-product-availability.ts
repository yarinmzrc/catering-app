"use server"

import { ProductService } from "../services/product-service"

export async function toggleProductAvailability(
  productId: string,
  isAvailableForSale: boolean,
) {
  const productService = new ProductService()
  await productService.toggleProductAvailability(productId, isAvailableForSale)
}
