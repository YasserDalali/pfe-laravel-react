import createClient from 'openapi-fetch'
import type { paths } from '@/lib/types/api'

type ApiClient = ReturnType<typeof createClient<paths>>
let clientInstance: ApiClient | null = null

/**
 * Retrieves the authentication token from localStorage.
 * Handles potential errors during storage access.
 */
function getToken(): string | null {
  try {
    return localStorage.getItem('auth-token')
  } catch {
    return null
  }
}

/**
 * Returns a configured instance of the OpenAPI client.
 * Uses a singleton pattern to avoid creating multiple instances.
 * Automatically injects the Authorization header if a token exists.
 * 
 * @returns The typed API client.
 */
export function getApiClient(): ApiClient {
  if (!clientInstance) {
    const baseUrl = import.meta.env.VITE_API_BASE || 'http://localhost:3002'
    clientInstance = createClient<paths>({
      baseUrl,
      headers: () => {
        const token = getToken()
        return token ? { Authorization: `Bearer ${token}` } : {}
      },
    })
  }
  return clientInstance!
}

/**
 * Helper function to wrap API calls with error handling.
 * Useful if you want to standardize error responses.
 * 
 * @param fn - The API call function
 * @returns The result or error object
 */
export async function apiCall<T>(fn: () => Promise<{ data?: T; error?: any }>): Promise<{ data?: T; error?: any }> {
  try {
    const result = await fn()
    return result
  } catch (error) {
    return { error }
  }
}
