"use client"

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic'

import { useAuth, SignOutButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { LogOut, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ResumeManager } from '@/components/admin/resume-manager'
import Link from 'next/link'

export default function AdminDashboard() {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function checkAuth() {
      if (!isLoaded) return

      if (!isSignedIn) {
        console.log('Not signed in - redirecting to home')
        router.push('/')
        return
      }

      try {
        const response = await fetch('/api/auth/check-admin')
        const result = await response.json()
        
        if (!response.ok || !result.success) {
          console.log('Not authorized as admin')
          router.push('/')
          return
        }

        if (!result.data?.authorized) {
          console.log('Not authorized as admin')
          router.push('/')
          return
        }

        setIsAuthorized(true)
      } catch (error) {
        console.error('Auth check failed:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              Resume Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage resume versions and control which one is displayed on your site
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <Home className="w-4 h-4" />
                Home
              </Button>
            </Link>
            <SignOutButton>
              <Button variant="outline" size="sm" className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </SignOutButton>
          </div>
        </div>
        <ResumeManager />
      </div>
    </div>
  )
}

