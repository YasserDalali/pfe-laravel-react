import Client from 'openapi-fetch'
import type { paths } from '@/lib/types/api'

let clientInstance: ReturnType<typeof Client<typeof paths>> | null = null

function getToken(): string | null {
  try {
    return localStorage.getItem('auth-token')
  } catch {
    return null
  }
}

export function getApiClient() {
  if (!clientInstance) {
    const baseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:3002'
    clientInstance = new Client<typeof paths>({
      baseUrl,
      headers: () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
      },
    })
  }
  return clientInstance
}

export async function apiCall<T>(fn: () => Promise<{ data?: T; error?: any }>): Promise<{ data?: T; error?: any }> {
  try {
    const result = await fn()
    return result
  } catch (error) {
    return { error }
  }
}

