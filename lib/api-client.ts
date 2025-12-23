import Client from "openapi-fetch"
import type { paths } from "./types/api"

let clientInstance: ReturnType<typeof Client<typeof paths>> | null = null

export function getApiClient() {
  if (!clientInstance) {
    clientInstance = new Client<typeof paths>({
      baseUrl: "http://localhost:3002",
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
