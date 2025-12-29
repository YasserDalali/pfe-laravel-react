import { getApiClient } from '@/lib/api-client'
import { setAuthToken, clearAuth } from '@/lib/auth'

/**
 * Logs in a user with email and password.
 * 
 * @param email - User's email
 * @param password - User's password
 * @returns Object indicating success or failure with error message
 */
export async function loginUser(email: string, password: string) {
  try {
    const client = getApiClient()
    const res = await client.POST('/auth/login', {
      body: { email, password },
    })
    const data = res.data
    const error = res.error
    
    if (error || !data) {
      return { success: false, error: 'Invalid credentials' }
    }
    
    
    // Store auth data synchronously
    setAuthToken(data.token, data.user)
    return { success: true }
  } catch {
    return { success: false, error: 'An error occurred during login' }
  }
}

/**
 * Logs out the current user.
 * Clears auth data from localStorage and notifies the backend.
 */
export async function logoutUser() {
  try {
    const client = getApiClient()
    await client.POST('/auth/logout')
  } catch {
    // Ignore errors during logout
  } finally {
    clearAuth()
  }
}
