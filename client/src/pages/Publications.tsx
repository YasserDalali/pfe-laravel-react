import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getAuthUser, getAuthToken } from '@/lib/auth'
import AppNavbar from '@/components/app-navbar'
import PublicationsContent from '@/components/publications-content'

export default function Publications() {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    ;(async () => {
      const u = await getAuthUser()
      const t = await getAuthToken()
      setUser(u)
      setToken(t)
      setChecking(false)
    })()
  }, [])

  if (checking) {
    return null
  }
  if (!user || !token) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppNavbar user={user} />
      <PublicationsContent />
    </div>
  )
}
