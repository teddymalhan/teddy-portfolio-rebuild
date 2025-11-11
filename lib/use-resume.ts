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
    async function fetchResumeInfo() {
      try {
        // Fetch both visibility and active resume info in parallel
        const [visibilityRes, resumeRes] = await Promise.all([
          fetch('/api/resume/visibility'),
          fetch('/api/resume')
        ])

        // Handle visibility
        if (visibilityRes.ok) {
          const visibilityData = await visibilityRes.json()
          setIsVisible(visibilityData.isVisible)
        }

        // Handle resume path with cache-busting
        if (resumeRes.ok) {
          const resumeData = await resumeRes.json()
          // Use resume ID as cache-buster - changes when active resume changes
          setResumePath(`/Teddy_Malhan_Resume.pdf?v=${resumeData.id}`)
        } else {
          // Fallback to timestamp-based cache-busting if API fails
          setResumePath(`/Teddy_Malhan_Resume.pdf?t=${Date.now()}`)
        }
      } catch (error) {
        console.error('Failed to fetch resume info:', error)
        // Default to visible on error with timestamp cache-busting
        setIsVisible(true)
        setResumePath(`/Teddy_Malhan_Resume.pdf?t=${Date.now()}`)
      } finally {
        setLoading(false)
      }
    }

    fetchResumeInfo()
  }, [])

  return { resumePath, loading, isVisible }
}


