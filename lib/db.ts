import { neon } from '@neondatabase/serverless'

// Create a reusable database connection
export const sql = neon(process.env.DATABASE_URL!)


