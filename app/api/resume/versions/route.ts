import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function GET() {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const result = await sql`
      SELECT * FROM resumes 
      ORDER BY uploaded_at DESC
    ` as any[]

    return NextResponse.json(
      result.map((row) => ({
        id: row.id,
        filename: row.filename,
        path: row.blob_url,
        blob_url: row.blob_url,
        isActive: row.is_active,
        uploadedAt: row.uploaded_at,
        fileSize: row.file_size,
      }))
    )
  } catch (error) {
    console.error('Error fetching resumes:', error)
    return NextResponse.json({ error: 'Failed to fetch resumes' }, { status: 500 })
  }
}

