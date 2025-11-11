import { neon } from '@neondatabase/serverless'

// Lazy initialization to avoid build-time database connection
let sqlInstance: ReturnType<typeof neon> | null = null

export function getSql() {
  if (!sqlInstance) {
    // Only initialize if DATABASE_URL is available (runtime, not build time)
    const dbUrl = process.env.DATABASE_URL
    if (!dbUrl) {
      throw new Error('DATABASE_URL is not set')
    }
    sqlInstance = neon(dbUrl)
  }
  return sqlInstance
}

// Export sql for backward compatibility, but it will be initialized lazily
export const sql = new Proxy({} as ReturnType<typeof neon>, {
  get(_target, prop) {
    return getSql()[prop as keyof ReturnType<typeof neon>]
  },
})


