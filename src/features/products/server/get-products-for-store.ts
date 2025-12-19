import { ProductService } from "../services/product-service"

export const getProductsForStore = async () => {
  const productService = new ProductService()
  return await productService.getProductsForStore()
}
