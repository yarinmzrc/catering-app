import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export default function AdminLoginPage() {
  return (
    <>
      <Card className="w-120">
        <CardHeader>
          <CardTitle>
            <h1 className="text-4xl font-bold">Admin Login</h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="/api/admin/login" method="post" className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" name="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" name="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}
