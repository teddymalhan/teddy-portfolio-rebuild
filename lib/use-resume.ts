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
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    async function fetchVisibility() {
      try {
        const res = await fetch('/api/resume/visibility')
        if (res.ok) {
          const data = await res.json()
          setIsVisible(data.isVisible)
        }
      } catch (error) {
        console.error('Failed to fetch resume visibility:', error)
        // Default to visible on error
        setIsVisible(true)
      } finally {
        setLoading(false)
      }
    }

    // Always use the local endpoint so middleware can handle it
    // The route handler will serve the active resume from the database
    setResumePath('/Teddy_Malhan_Resume.pdf')
    fetchVisibility()
  }, [])

  return { resumePath, loading, isVisible }
}


