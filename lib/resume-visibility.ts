import { sql } from '@/lib/db'

// Server-side function to get resume visibility
export async function getResumeVisibility(): Promise<boolean> {
  try {
    // Try to ensure table exists first
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS settings (
          id SERIAL PRIMARY KEY,
          key TEXT NOT NULL UNIQUE,
          value TEXT NOT NULL,
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `
      await sql`
        CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key)
      `
      await sql`
        INSERT INTO settings (key, value) 
        VALUES ('resume_visible', 'true')
        ON CONFLICT (key) DO NOTHING
      `
    } catch (tableError: any) {
      // Table might already exist, that's fine
      console.log('Settings table check:', tableError?.message || 'OK')
    }
    
    try {
      const result = await sql`
        SELECT value FROM settings 
        WHERE key = 'resume_visible'
        LIMIT 1
      ` as any[]

      const isVisible = result.length > 0 ? result[0].value === 'true' : true
      console.log('Resume visibility fetched:', isVisible)
      return isVisible
    } catch (queryError: any) {
      // If query fails, table probably doesn't exist - default to visible
      if (queryError?.message?.includes('does not exist') || 
          queryError?.message?.includes('relation') || 
          queryError?.code === '42P01') {
        console.warn('Settings table does not exist, defaulting to visible')
        return true
      }
      // On other errors, default to visible
      console.error('Error querying visibility:', queryError?.message)
      return true
    }
  } catch (error: any) {
    console.error('Error fetching resume visibility:', error?.message || error)
    return true // Default to visible on error
  }
}

