import { neon } from '@neondatabase/serverless'
import { env } from './env'

// Create a reusable database connection
export const sql = neon(env.DATABASE_URL)


