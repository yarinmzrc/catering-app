import { Prisma } from "../../../prisma/generated/prisma/client"

export type ProductDTO = {
  id: string
  name: string
  price: number
  description: string
  imagePath: string
  imagePublicId: string
  isAvailableForSale: boolean
  createdAt: Date
  updatedAt: Date
}

export type ProductListItemDTO = ProductDTO & {
  categoryName: string
  orderCount: number
}

export type PrismaProductWithCategory = Prisma.ProductGetPayload<{
  include: {
    category: true
  }
}>

export type PrismaProductWithOrderCount = Prisma.ProductGetPayload<{
  include: {
    _count: {
      select: {
        orderItems: true
      }
    }
  }
}>

export type CreateProductInput = Omit<
  ProductDTO,
  "id" | "createdAt" | "updatedAt" | "isAvailableForSale"
> & {
  categoryId: string
}
