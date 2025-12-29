import type { Researcher } from '@/lib/types/api'

// Keys for localStorage
const TOKEN_KEY = 'auth-token'
const USER_KEY = 'auth-user'

/**
 * Stores the authentication token and user details in localStorage.
 * 
 * @param token - The JWT token received from the backend.
 * @param user - The user object containing details like name, email, etc.
 */
export function setAuthToken(token: string, user: Researcher): void {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

/**
 * Retrieves the authentication token from localStorage.
 * 
 * @returns The token string or null if not found.
 */
export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) || null
}

/**
 * Retrieves the authenticated user details from localStorage.
 * Returns null if no user is found or if parsing fails.
 * 
 * @returns The Researcher object or null.
 */
export function getAuthUser(): Researcher | null {
  const user = localStorage.getItem(USER_KEY)
  if (!user) return null
  try {
    return JSON.parse(user) as Researcher
  } catch {
    return null
  }
}

/**
 * Clears all authentication data from localStorage.
 * Used during logout.
 */
export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

