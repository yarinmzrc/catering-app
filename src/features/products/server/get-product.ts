import { ProductService } from "../services/product-service"

export const getProduct = async (id: string) => {
  const productService = new ProductService()
  return await productService.findById(id)
}
