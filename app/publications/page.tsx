import { redirect } from "next/navigation"
import { getAuthUser, getAuthToken } from "@/lib/auth"
import AppNavbar from "@/components/app-navbar"
import PublicationsContent from "@/components/publications-content"

export default async function PublicationsPage() {
  const user = await getAuthUser()
  const token = await getAuthToken()

  if (!user || !token) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <PublicationsContent />
    </div>
  )
}
