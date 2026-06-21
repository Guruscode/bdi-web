import { createClient } from '@libsql/client'

let _client: ReturnType<typeof createClient> | null = null

function getClient() {
  if (!_client) {
    _client = createClient({
      url: process.env.TURSO_DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })
  }
  return _client
}

// Proxy-based lazy initialization — the client is only created when a
// method like execute() is first called, not at module import time.
// This prevents build failures when env vars aren't available yet.
export const turso = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop) {
    const client = getClient()
    const value = Reflect.get(client, prop)
    // Bind methods to the real client so `this` works correctly at runtime
    return typeof value === 'function' ? value.bind(client) : value
  },
})
