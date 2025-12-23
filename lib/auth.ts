import { cookies } from "next/headers"
import type { Researcher } from "./types/api"

const TOKEN_KEY = "auth-token"
const USER_KEY = "auth-user"

export async function setAuthToken(token: string, user: Researcher) {
  const cookieStore = await cookies()
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
  cookieStore.set(USER_KEY, JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function getAuthToken() {
  const cookieStore = await cookies()
  return cookieStore.get(TOKEN_KEY)?.value
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const userCookie = cookieStore.get(USER_KEY)?.value
  if (!userCookie) return null
  try {
    return JSON.parse(userCookie) as Researcher
  } catch {
    return null
  }
}

export async function clearAuth() {
  const cookieStore = await cookies()
  cookieStore.delete(TOKEN_KEY)
  cookieStore.delete(USER_KEY)
}
