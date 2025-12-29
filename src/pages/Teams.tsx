import { getAuthUser } from '@/lib/auth'
import AppNavbar from '@/components/app-navbar'
import TeamsContent from '@/components/teams-content'

export default function Teams() {
  const user = getAuthUser()

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <TeamsContent />
    </div>
  )
}
