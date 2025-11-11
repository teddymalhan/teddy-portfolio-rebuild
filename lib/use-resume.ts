"use client"

import { useState, useEffect } from 'react'

interface ResumeData {
  id: string | number
  filename: string
  path: string
  blob_url: string | null
  isActive: boolean
  uploadedAt: string
}

export function useResume() {
  const [resumePath, setResumePath] = useState<string>('/Teddy_Malhan_Resume.pdf')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Always use the local endpoint so middleware can handle it
    // The route handler will serve the active resume from the database
    setResumePath('/Teddy_Malhan_Resume.pdf')
    setLoading(false)
  }, [])

  return { resumePath, loading }
}


