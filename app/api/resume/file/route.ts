import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Helper function to ensure settings table exists
async function ensureSettingsTable() {
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
  } catch (error: any) {
    // Table might already exist, that's fine
    // Silently handle - no need to log
  }
}

export async function GET() {
  try {
    // Ensure table exists first
    await ensureSettingsTable()
    
    // Check if resume is visible
    const visibilityResult = await sql`
      SELECT value FROM settings 
      WHERE key = 'resume_visible'
      LIMIT 1
    ` as any[]

    const isVisible = visibilityResult.length > 0 ? visibilityResult[0].value === 'true' : true

    if (!isVisible) {
      return new NextResponse('Resume not available', { status: 404 })
    }

    // Fetch the active resume from database
    const result = await sql`
      SELECT id, blob_url, filename, uploaded_at FROM resumes 
      WHERE is_active = TRUE 
      ORDER BY uploaded_at DESC 
      LIMIT 1
    ` as any[]

    // If active resume exists, fetch it and serve with correct filename
    if (result.length > 0 && result[0].blob_url) {
      try {
        const blobResponse = await fetch(result[0].blob_url)
        if (blobResponse.ok) {
          const pdfBuffer = await blobResponse.arrayBuffer()
          return new NextResponse(pdfBuffer as any, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'inline; filename="Teddy_Malhan_Resume.pdf"',
              'Cache-Control': 'no-cache, no-store, must-revalidate', // Prevent caching
              'Pragma': 'no-cache',
              'Expires': '0',
            },
          })
        } else {
          return new NextResponse('Error fetching resume file from storage', { status: 500 })
        }
      } catch (fetchError) {
        return new NextResponse('Error fetching resume file', { status: 500 })
      }
    }

    return new NextResponse('No active resume found', { status: 404 })
  } catch (error) {
    return new NextResponse('Error fetching resume', { status: 500 })
  }
}

