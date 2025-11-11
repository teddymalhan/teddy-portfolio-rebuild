import { NextResponse } from 'next/server'
import { isAuthorizedAdmin } from '@/lib/auth'
import { auth, currentUser } from '@clerk/nextjs/server'

export async function GET() {
  try {
    const { userId } = await auth()
    const user = await currentUser()
    
    if (!userId || !user) {
      return NextResponse.json({ 
        authorized: false,
        reason: 'Not authenticated',
        userId: null 
      })
    }

    const authorized = await isAuthorizedAdmin()
    const userEmail = user.emailAddresses[0]?.emailAddress

    return NextResponse.json({ 
      authorized,
      userId,
      userEmail,
      reason: authorized ? 'Authorized' : 'Email not in AUTHORIZED_ADMINS'
    })
  } catch (error) {
    console.error('Error checking admin:', error)
    return NextResponse.json({ 
      authorized: false,
      reason: 'Error checking authorization',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

