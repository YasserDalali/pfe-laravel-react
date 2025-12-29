"use client"

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { AlertCircle, Loader2, Mail, User, Award, Lock } from 'lucide-react'
import { getApiClient } from '@/lib/api-client'
import { loginUser } from '@/lib/auth-actions'
import { getAuthToken } from '@/lib/auth'

export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [grade, setGrade] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    ;(async () => {
      const token = await getAuthToken()
      if (token) navigate('/dashboard')
    })()
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const client = getApiClient()
      const { error: createErr } = await client.POST('/researchers', {
        body: { name, email, password, grade, role: 'researcher' },
      })
      if (createErr) {
        setError('Failed to create account')
        setIsLoading(false)
        return
      }
      const result = await loginUser(email, password)
      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Login failed after signup')
      }
    } catch {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-50 dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
        <div className="hidden md:flex flex-col space-y-8">
          <div>
            <Link to="/">
              <div className="font-serif text-3xl font-bold bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent mb-2 cursor-pointer hover:opacity-80 transition-opacity">
                Nexus
              </div>
            </Link>
            <p className="text-muted-foreground">Scientific Publications Platform</p>
          </div>
          <div className="space-y-6">
            {[
              { title: 'Create', desc: 'Set up your researcher account' },
              { title: 'Collaborate', desc: 'Join teams and contribute to research' },
              { title: 'Publish', desc: 'Track and share publications' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <h3 className="font-serif text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="p-8 lg:p-10 border-violet-200 dark:border-violet-800">
          <div className="space-y-8">
            <div>
              <h1 className="font-serif text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">Join the Nexus research platform</p>
            </div>
            {error && (
              <div className="flex gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-violet-600" />
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Dr. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-muted border-border focus:border-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4 text-violet-600" />
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="jane.doe@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-muted border-border focus:border-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-violet-600" />
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-muted border-border focus:border-violet-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Award className="w-4 h-4 text-violet-600" />
                  Grade
                </label>
                <Input
                  type="text"
                  placeholder="Professor"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  disabled={isLoading}
                  className="bg-muted border-border focus:border-violet-500"
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-violet-600 hover:bg-violet-700 text-white h-11 font-semibold">
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-violet-600 hover:text-violet-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

