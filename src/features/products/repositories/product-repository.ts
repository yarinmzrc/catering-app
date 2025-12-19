import { prisma } from "../../../../prisma/client"
import { CreateProductInput } from "../types"

export class ProductRepository {
  async create(data: CreateProductInput) {
    return prisma.product.create({
      data,
    })
  }

  async update(id: string, data: CreateProductInput) {
    return prisma.product.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } })
  }

  async findById(id: string) {
    return prisma.product.findUnique({ where: { id } })
  }

  async getMostPopularProducts() {
    return prisma.product.findMany({
      where: { isAvailableForSale: true },
      orderBy: { orderItems: { _count: "desc" } },
      take: 6,
    })
  }
}
