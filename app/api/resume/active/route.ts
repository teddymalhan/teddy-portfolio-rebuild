import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function PUT(request: NextRequest) {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  try {
    const { resumeId } = await request.json()

    if (!resumeId) {
      return NextResponse.json({ error: 'Resume ID required' }, { status: 400 })
    }

    // Set all resumes to inactive first
    await sql`UPDATE resumes SET is_active = FALSE`

    // Set the selected resume as active
    const result = await sql`
      UPDATE resumes 
      SET is_active = TRUE 
      WHERE id = ${resumeId}
      RETURNING *
    ` as any[]

    if (result.length === 0) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      resume: result[0],
    })
  } catch (error) {
    console.error('Error setting active resume:', error)
    return NextResponse.json(
      { error: 'Failed to set active resume' },
      { status: 500 }
    )
  }
}

