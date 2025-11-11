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
    console.log('Settings table created or already exists')
    
    // Create index if it doesn't exist
    try {
      await sql`
        CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key)
      `
      console.log('Settings index created or already exists')
    } catch (idxError: any) {
      // Index might already exist, that's fine
      console.log('Index creation note:', idxError?.message || 'OK')
    }
    
    // Insert default value if it doesn't exist
    try {
      await sql`
        INSERT INTO settings (key, value) 
        VALUES ('resume_visible', 'true')
        ON CONFLICT (key) DO NOTHING
      `
      console.log('Default visibility setting inserted or already exists')
    } catch (insertError: any) {
      // Value might already exist, that's fine
      console.log('Default insert note:', insertError?.message || 'OK')
    }
  } catch (error: any) {
    // Log the error but don't fail - table might already exist
    console.error('Settings table check error:', error?.message || error)
    throw error // Re-throw so we know if table creation actually failed
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
      // Log it but continue - we'll handle it in the query
      console.warn('Could not ensure settings table exists:', tableError?.message)
    }
    
    try {
      const result = await sql`
        SELECT value FROM settings 
        WHERE key = 'resume_visible'
        LIMIT 1
      ` as any[]

      console.log('GET visibility result:', result)
      const isVisible = result.length > 0 ? result[0].value === 'true' : true
      console.log('GET visibility value:', isVisible)

      return NextResponse.json({ isVisible })
    } catch (queryError: any) {
      // If query fails, table probably doesn't exist
      if (queryError?.message?.includes('does not exist') || 
          queryError?.message?.includes('relation') || 
          queryError?.code === '42P01') {
        console.warn('Settings table does not exist, defaulting to visible')
        return NextResponse.json({ 
          isVisible: true,
          warning: 'Settings table does not exist. Please run the database migration.'
        })
      }
      throw queryError
    }
  } catch (error: any) {
    console.error('Error fetching resume visibility:', error)
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
    console.log('PUT request received, isVisible:', isVisible, 'type:', typeof isVisible)

    if (typeof isVisible !== 'boolean') {
      return NextResponse.json(
        { error: 'isVisible must be a boolean' },
        { status: 400 }
      )
    }

    // Ensure table exists first
    await ensureSettingsTable()

    const valueString = isVisible.toString()
    console.log('Updating visibility to:', valueString)

    // Upsert the setting
    const updateResult = await sql`
      INSERT INTO settings (key, value, updated_at)
      VALUES ('resume_visible', ${valueString}, NOW())
      ON CONFLICT (key) 
      DO UPDATE SET value = ${valueString}, updated_at = NOW()
      RETURNING key, value
    ` as any[]

    console.log('Update result:', updateResult)

    // Verify the update by querying it back
    const verifyResult = await sql`
      SELECT value FROM settings 
      WHERE key = 'resume_visible'
      LIMIT 1
    ` as any[]

    console.log('Verification query result:', verifyResult)
    const verifiedValue = verifyResult.length > 0 ? verifyResult[0].value === 'true' : true
    console.log('Verified value:', verifiedValue)

    // Revalidate the home page cache so it shows the updated visibility
    revalidatePath('/')

    return NextResponse.json({
      success: true,
      isVisible: verifiedValue,
    })
  } catch (error: any) {
    console.error('Error updating resume visibility:', error)
    console.error('Error details:', {
      message: error?.message,
      code: error?.code,
      stack: error?.stack,
    })
    
    return NextResponse.json(
      { error: error?.message || 'Failed to update resume visibility' },
      { status: 500 }
    )
  }
}

