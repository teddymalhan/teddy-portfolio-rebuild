import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

// Helper function to ensure settings table exists
async function ensureSettingsTable() {
  try {
    // Try to create the table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `
    
    // Create index if it doesn't exist
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key)
      `
    } catch (idxError: any) {
      // Index might already exist, that's fine
    }
    
    // Insert default value if it doesn't exist
    try {
      await sql`
        INSERT INTO settings (key, value) 
        VALUES ('resume_visible', 'true')
        ON CONFLICT (key) DO NOTHING
      `
    } catch (insertError: any) {
      // Value might already exist, that's fine
    }
  } catch (error: any) {
    // Re-throw so we know if table creation actually failed
    throw error
  }
}

// GET - Get current visibility setting
export async function GET() {
  try {
    // Try to ensure table exists first
    try {
      await ensureSettingsTable()
    } catch (tableError: any) {
      // If table creation fails, it might be a permissions issue or DDL not supported
      // Continue - we'll handle it in the query
    }
    
    try {
      const result = await sql`
        SELECT value FROM settings 
        WHERE key = 'resume_visible'
        LIMIT 1
      ` as any[]

      const isVisible = result.length > 0 ? result[0].value === 'true' : true

      return NextResponse.json({ isVisible })
    } catch (queryError: any) {
      // If query fails, table probably doesn't exist
      if (queryError?.message?.includes('does not exist') || 
          queryError?.message?.includes('relation') || 
          queryError?.code === '42P01') {
        return NextResponse.json({ 
          isVisible: true,
          warning: 'Settings table does not exist. Please run the database migration.'
        })
      }
      throw queryError
    }
  } catch (error: any) {
    // Default to visible if there's an error
    return NextResponse.json({ isVisible: true })
  }
}

// PUT - Toggle resume visibility (admin only)
export async function PUT(request: NextRequest) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { isVisible } = await request.json()

    if (typeof isVisible !== 'boolean') {
      return NextResponse.json(
        { error: 'isVisible must be a boolean' },
        { status: 400 }
      )
    }

    // Ensure table exists first
    await ensureSettingsTable()

    const valueString = isVisible.toString()

    // Upsert the setting
    await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES ('resume_visible', ${valueString}, NOW())
      ON CONFLICT (key) 
      DO UPDATE SET value = ${valueString}, updated_at = NOW()
      RETURNING key, value
    ` as any[]

    // Verify the update by querying it back
    const verifyResult = await sql`
      SELECT value FROM settings 
      WHERE key = 'resume_visible'
      LIMIT 1
    ` as any[]

    const verifiedValue = verifyResult.length > 0 ? verifyResult[0].value === 'true' : true

    // Revalidate the home page cache so it shows the updated visibility
    revalidatePath('/')

    return NextResponse.json({
      success: true,
      isVisible: verifiedValue,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update resume visibility' },
      { status: 500 }
    )
  }
}

