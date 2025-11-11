import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin } from '@/lib/auth'

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
      console.error('Error deleting blob:', blobError)
      // Continue with database deletion even if blob deletion fails
    }

    // Delete from database
    await sql`DELETE FROM resumes WHERE id = ${resumeId}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting resume:', error)
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    )
  }
}

