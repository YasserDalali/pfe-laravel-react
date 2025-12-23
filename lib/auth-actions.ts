"use server"

import { getApiClient } from "./api-client"
import { setAuthToken, clearAuth } from "./auth"
import { redirect } from "next/navigation"

export async function loginUser(email: string, password: string) {
  try {
    const client = getApiClient()
    const { data, error } = await client.POST("/auth/login", {
      body: {
        email,
        password,
      },
    })

    if (error || !data) {
      return {
        success: false,
        error: "Invalid credentials",
      }
    }

    // Set auth token and user in cookies
    await setAuthToken(data.token, data.user)

    return {
      success: true,
    }
  } catch (err) {
    return {
      success: false,
      error: "An error occurred during login",
    }
  }
}

export async function logoutUser() {
  try {
    const client = getApiClient()
    await client.POST("/auth/logout")
  } catch (err) {
    // Ignore errors on logout
  } finally {
    await clearAuth()
    redirect("/")
  }
}
