import { Button } from "@/components/ui/button"
import { PageHeader } from "../_components/page-header"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { prisma } from "../../../../prisma/client"
import { Product } from "../../../../prisma/generated/prisma/client"

export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: { select: { name: true } },
    },
  })
}

export default async function AdminProductsPage() {
  const products = await getProducts()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-4">
        <PageHeader>Products</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable products={products} />
    </>
  )
}

type ProductsTableProps = {
  products: (Product & { category: { name: string } })[]
}

function ProductsTable({ products }: ProductsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.isAvailableForSale ? "Yes" : "No"}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.category.name}</TableCell>
            <TableCell>
              <Button asChild>
                <Link href={`/admin/products/${product.id}`}>Edit</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
