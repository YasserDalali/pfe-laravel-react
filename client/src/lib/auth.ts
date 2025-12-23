import type { Researcher } from '@/lib/types/api'

const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

export async function setAuthToken(token: string, user: Researcher) {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export async function getAuthToken() {
  return localStorage.getItem(TOKEN_KEY) || null
}

export async function getAuthUser() {
  const user = localStorage.getItem(USER_KEY)
  if (!user) return null
  try {
    return JSON.parse(user) as Researcher
  } catch {
    return null
  }
}

export async function clearAuth() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

