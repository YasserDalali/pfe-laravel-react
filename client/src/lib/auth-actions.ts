"use client"

import { getApiClient } from '@/lib/api-client'
import { setAuthToken, clearAuth } from '@/lib/auth'

export async function loginUser(email: string, password: string) {
  try {
    const client = getApiClient()
    const { data, error } = await client.POST('/auth/login', {
      body: { email, password },
    })
    if (error || !data) {
      return { success: false, error: 'Invalid credentials' }
    }
    await setAuthToken(data.token, data.user)
    return { success: true }
  } catch {
    return { success: false, error: 'An error occurred during login' }
  }
}

export async function logoutUser() {
  try {
    const client = getApiClient()
    await client.POST('/auth/logout')
  } catch {
  } finally {
    await clearAuth()
  }
}

