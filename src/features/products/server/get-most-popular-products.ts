import { prisma } from "../../../../prisma/client"

export const getMostPopularProducts = async () => {
  return await prisma.product.findMany({
    where: { isAvailableForSale: true },
    orderBy: { orderItems: { _count: "desc" } },
    take: 6,
  })
}
