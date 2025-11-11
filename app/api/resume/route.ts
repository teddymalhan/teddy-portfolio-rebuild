import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin, getCurrentUserId } from '@/lib/auth'

// Force dynamic rendering to prevent caching
export const dynamic = 'force-dynamic'
export const revalidate = 0

// GET - Get current active resume
export async function GET() {
  try {
    const result = await sql`
      SELECT * FROM resumes 
      WHERE is_active = TRUE 
      ORDER BY uploaded_at DESC 
      LIMIT 1
    ` as any[]

    console.log('GET /api/resume - Active resume query result:', JSON.stringify(result, null, 2))

    if (result.length === 0) {
      return NextResponse.json({
        id: null,
        filename: null,
        path: null,
        blob_url: null,
        isActive: false,
        uploadedAt: null,
      })
    }

    const resume = result[0]
    return NextResponse.json({
      id: resume.id,
      filename: resume.filename,
      path: resume.blob_url,
      blob_url: resume.blob_url,
      blob_key: resume.blob_key,
      isActive: resume.is_active,
      uploadedAt: resume.uploaded_at,
      fileSize: resume.file_size,
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error fetching resume:', error)
    return NextResponse.json({
      error: 'Failed to fetch resume',
    }, { status: 500 })
  }
}

// POST - Upload new resume (admin only)
export async function POST(request: NextRequest) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `resume-${timestamp}.pdf`
    const blobKey = `resumes/${filename}`

    // Upload to Vercel Blob
    const blob = await put(blobKey, file, {
      access: 'public',
      contentType: 'application/pdf',
    })

    const userId = await getCurrentUserId()

    // Save metadata to database
    const result = await sql`
      INSERT INTO resumes (filename, blob_url, blob_key, uploaded_by, file_size, mime_type)
      VALUES (${file.name}, ${blob.url}, ${blobKey}, ${userId || 'unknown'}, ${file.size}, ${file.type})
      RETURNING *
    ` as any[]

    return NextResponse.json({
      success: true,
      resume: {
        id: result[0].id,
        filename: result[0].filename,
        blob_url: result[0].blob_url,
        uploadedAt: result[0].uploaded_at,
      },
    })
  } catch (error) {
    console.error('Error uploading resume:', error)
    return NextResponse.json(
      { error: 'Failed to upload resume' },
      { status: 500 }
    )
  }
}

