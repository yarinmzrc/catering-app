import { ProductService } from "../services/product-service"

export const getMostPopularProducts = async () => {
  const productService = new ProductService()
  return await productService.getMostPopularProducts()
}
