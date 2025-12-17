import { Nav, NavLink } from "@/components/nav"
import { paths } from "@/config/paths"
import { CartDrawer } from "@/features/cart/components/cart-drawer"

export const dynamic = "force-dynamic"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav>
        <div className="flex items-center justify-between">
          <div>
            <NavLink href={paths.app.root.getHref()}>Home</NavLink>
            <NavLink href={paths.app.products.root.getHref()}>Products</NavLink>
            <NavLink href={paths.app.categories.getHref()}>Categories</NavLink>
          </div>
          <CartDrawer />
        </div>
      </Nav>
      <div className="container mx-auto p-6">{children}</div>
    </>
  )
}
