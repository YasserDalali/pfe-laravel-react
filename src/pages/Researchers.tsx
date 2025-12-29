import { getAuthUser } from '@/lib/auth'
import AppNavbar from '@/components/app-navbar'
import ResearchersContent from '@/components/researchers-content'

export default function Researchers() {
  const user = getAuthUser()

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <ResearchersContent />
    </div>
  )
}
