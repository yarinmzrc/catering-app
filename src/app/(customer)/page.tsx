import { getMostPopularProducts } from "@/features/products/server/get-most-popular-products"
import { getNewestProducts } from "@/features/products/server/get-newest-products"
import { CategoriesGrid } from "@/features/categories/components/categories-grid"
import { ProductsGrid } from "@/features/products/components/products-grid"

export default function HomePage() {
  return (
    <main className="space-y-12">
      <CategoriesGrid />
      <ProductsGrid title="Most Popular" fetcher={getMostPopularProducts} />
      <ProductsGrid title="Newest" fetcher={getNewestProducts} />
    </main>
  )
}
