import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export async function GET() {
  try {
    // Fetch the active resume from database
    const result = await sql`
      SELECT blob_url FROM resumes 
      WHERE is_active = TRUE 
      ORDER BY uploaded_at DESC 
      LIMIT 1
    ` as any[]

    console.log('Active resume query result:', result)

    // If active resume exists, fetch it and serve with correct filename
    if (result.length > 0 && result[0].blob_url) {
      console.log('Fetching active resume from:', result[0].blob_url)
      try {
        const blobResponse = await fetch(result[0].blob_url)
        if (blobResponse.ok) {
          const pdfBuffer = await blobResponse.arrayBuffer()
          return new NextResponse(pdfBuffer as any, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'inline; filename="Teddy_Malhan_Resume.pdf"',
              'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
          })
        }
      } catch (fetchError) {
        console.error('Error fetching blob:', fetchError)
        // Fall through to static file
      }
    }

    console.log('No active resume found, serving static file')

    // Fallback: serve the static file from /public if no active resume
    try {
      const filePath = join(process.cwd(), 'public', 'Teddy_Malhan_Resume.pdf')
      const fileBuffer = await readFile(filePath)
      
      return new NextResponse(fileBuffer as any, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Teddy_Malhan_Resume.pdf"',
        },
      })
    } catch (staticError) {
      console.error('Error reading static file:', staticError)
      return new NextResponse('Resume not found', { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching active resume:', error)
    // Try to serve static file on error
    try {
      const filePath = join(process.cwd(), 'public', 'Teddy_Malhan_Resume.pdf')
      const fileBuffer = await readFile(filePath)
      
      return new NextResponse(fileBuffer as any, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="Teddy_Malhan_Resume.pdf"',
        },
      })
    } catch (staticError) {
      return new NextResponse('Resume not found', { status: 404 })
    }
  }
}

