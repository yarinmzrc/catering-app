import { Product as PrismaProduct } from "../../../prisma/generated/prisma/client"
import {
  PrismaProductWithCategory,
  PrismaProductWithOrderCount,
  ProductDTO,
  ProductListItemDTO,
} from "./dtos"

export function mapBaseProduct(prisma: PrismaProduct): ProductDTO {
  return {
    id: prisma.id,
    name: prisma.name,
    price: prisma.price,
    description: prisma.description,
    imagePath: prisma.imagePath,
    imagePublicId: prisma.imagePublicId,
    isAvailableForSale: prisma.isAvailableForSale,
    createdAt: prisma.createdAt,
    updatedAt: prisma.updatedAt,
  }
}

export function mapProductListItem(
  prisma: PrismaProductWithCategory & PrismaProductWithOrderCount,
): ProductListItemDTO {
  return {
    ...mapBaseProduct(prisma),
    orderCount: prisma._count.orderItems,
    categoryName: prisma.category.name,
  }
}
