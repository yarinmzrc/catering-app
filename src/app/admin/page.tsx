import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/format"
import { prisma } from "../../../prisma/client"

async function getOrderData() {
  const data = await prisma.order.aggregate({
    _sum: { pricePaid: true },
    _count: true,
  })

  return {
    amount: data._sum.pricePaid || 0,
    count: data._count,
  }
}

async function getUserData() {
  const data = await prisma.user.aggregate({
    _count: true,
  })
  return {
    count: data._count,
  }
}

async function getProductData() {
  const [activeCount, inactiveCount] = await Promise.all([
    prisma.product.count({
      where: { isAvailableForSale: true },
    }),
    prisma.product.count({
      where: { isAvailableForSale: false },
    }),
  ])

  return {
    activeCount,
    inactiveCount,
  }
}

export default async function Admin() {
  const [orderData, userData, productData] = await Promise.all([
    getOrderData(),
    getUserData(),
    getProductData(),
  ])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard
        title="Sales"
        subtitle={formatNumber(orderData.amount)}
        body={formatCurrency(orderData.amount)}
      />

      <DashboardCard
        title="Customers"
        subtitle={`${formatNumber(userData.count)} users`}
        body={formatCurrency(userData.count)}
      />

      <DashboardCard
        title="Active Products"
        subtitle={`${formatNumber(productData.inactiveCount)} Inactive`}
        body={formatNumber(productData.activeCount)}
      />
    </div>
  )
}
type DashboardCardProps = {
  title: string
  subtitle: string
  body: string
}
function DashboardCard({ title, subtitle, body }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  )
}
