// Environment variable validation
function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    // During build time, return empty string instead of throwing
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      return ''
    }
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

function getOptionalEnv(key: string, defaultValue: string = ''): string {
  return process.env[key] || defaultValue
}

export const env = {
  DATABASE_URL: getRequiredEnv('DATABASE_URL'),
  AUTHORIZED_ADMINS: getOptionalEnv('AUTHORIZED_ADMINS', '').split(',').filter(Boolean),
} as const

// Only validate at runtime, not during build
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  if (!env.DATABASE_URL) {
    console.warn('DATABASE_URL is not set - this may cause runtime errors')
  }
}

