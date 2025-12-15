import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  if (!session) redirect("/")

  return (
    <>
      <Nav>
        <NavLink href={paths.admin.root.getHref()}>Dashboard</NavLink>
        <NavLink href={paths.admin.products.root.getHref()}>Products</NavLink>
        <NavLink href={paths.admin.categories.root.getHref()}>
          Categories
        </NavLink>
        <NavLink href={paths.admin.orders.root.getHref()}>Orders</NavLink>
      </Nav>
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
