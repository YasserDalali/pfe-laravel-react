import { getAuthUser } from '@/lib/auth'
import AppNavbar from '@/components/app-navbar'
import PublicationsContent from '@/components/publications-content'

export default function Publications() {
  const user = getAuthUser()

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <PublicationsContent />
    </div>
  )
}
