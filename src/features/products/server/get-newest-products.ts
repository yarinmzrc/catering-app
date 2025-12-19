import { ProductService } from "../services/product-service"

export const getNewestProducts = async () => {
  const productService = new ProductService()
  return await productService.getNewestProducts()
}
