// Environment variable validation
function getRequiredEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
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

// Validate environment variables at module load time
if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required but not set')
}

