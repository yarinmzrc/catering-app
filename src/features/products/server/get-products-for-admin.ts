import { mapProductWithCategoryAndOrderCount } from "../mappers"
import { ProductService } from "../services/product-service"

export async function getProductsForAdmin() {
  const productService = new ProductService()
  const products = await productService.getProductsForAdmin()

  return products.map(mapProductWithCategoryAndOrderCount)
}
