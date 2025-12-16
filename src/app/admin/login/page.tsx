import { getServerSession } from "next-auth"
import { AdminLoginForm } from "../_components/login-form"
import { authOptions } from "@/lib/auth"
import { paths } from "@/config/paths"
import { redirect } from "next/navigation"
export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions)

  if (session?.user) return redirect(paths.admin.root.getHref())

  return <AdminLoginForm />
}
