import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { id } = await params
    const resumeId = Number.parseInt(id, 10)

    if (Number.isNaN(resumeId)) {
      return NextResponse.json({ error: 'Invalid resume ID' }, { status: 400 })
    }

    const { notes, filename } = await request.json()

    // Validate filename length if provided
    if (filename !== undefined) {
      if (!filename || filename.trim().length === 0) {
        return NextResponse.json(
          { error: 'Filename cannot be empty' },
          { status: 400 }
        )
      }
      if (filename.length > 255) {
        return NextResponse.json(
          { error: 'Filename must be less than 255 characters' },
          { status: 400 }
        )
      }
    }

    // Validate notes length if provided
    if (notes !== undefined && notes !== null) {
      if (typeof notes !== 'string') {
        return NextResponse.json(
          { error: 'Notes must be a string' },
          { status: 400 }
        )
      }
      if (notes.length > 5000) {
        return NextResponse.json(
          { error: 'Notes must be less than 5000 characters' },
          { status: 400 }
        )
      }
    }

    // Build update query dynamically based on what's provided
    let result: any[]

    if (notes !== undefined && filename !== undefined) {
      // Update both notes and filename
      result = await sql`
        UPDATE resumes 
        SET notes = ${notes || null}, filename = ${filename.trim()}
        WHERE id = ${resumeId}
        RETURNING *
      ` as any[]
    } else if (notes !== undefined) {
      // Update only notes
      result = await sql`
        UPDATE resumes 
        SET notes = ${notes || null}
        WHERE id = ${resumeId}
        RETURNING *
      ` as any[]
    } else if (filename !== undefined) {
      // Update only filename
      result = await sql`
        UPDATE resumes 
        SET filename = ${filename.trim()}
        WHERE id = ${resumeId}
        RETURNING *
      ` as any[]
    } else {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      )
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      resume: {
        id: result[0].id,
        filename: result[0].filename,
        notes: result[0].notes,
      },
    })
  } catch (error) {
    console.error('Error updating resume')
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { id } = await params
    const resumeId = Number.parseInt(id, 10)

    if (Number.isNaN(resumeId)) {
      return NextResponse.json({ error: 'Invalid resume ID' }, { status: 400 })
    }

    // Get resume info before deleting
    const result = await sql`
      SELECT * FROM resumes WHERE id = ${resumeId}
    ` as any[]

    if (result.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    const resume = result[0]

    // Don't allow deleting the active resume
    if (resume.is_active) {
      return NextResponse.json(
        { error: 'Cannot delete active resume. Set another resume as active first.' },
        { status: 400 }
      )
    }

    // Delete from Vercel Blob
    try {
      await del(resume.blob_key)
    } catch (blobError) {
      // Continue with database deletion even if blob deletion fails
    }

    // Delete from database
    await sql`DELETE FROM resumes WHERE id = ${resumeId}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting resume')
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}

