import { Nav, NavLink } from "@/components/nav"

export const dynamic = "force-dynamic"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/categories">Categories</NavLink>
        <NavLink href="/admin/orders">Orders</NavLink>
      </Nav>
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
