import { auth, currentUser } from '@clerk/nextjs/server'

/**
 * Check if the current user is an authorized admin
 * Uses environment variable AUTHORIZED_ADMINS (comma-separated emails)
 * or Clerk's public metadata
 */
export async function isAuthorizedAdmin(): Promise<boolean> {
  const { userId } = await auth()
  if (!userId) return false

  const user = await currentUser()
  if (!user) return false

  // Option 1: Check against environment variable (simplest)
  const authorizedEmails = process.env.AUTHORIZED_ADMINS?.split(',') || []
  const userEmail = user.emailAddresses[0]?.emailAddress

  if (userEmail && authorizedEmails.includes(userEmail)) {
    return true
  }

  // Option 2: Check Clerk public metadata
  const isAdmin = user.publicMetadata?.isAdmin === true
  if (isAdmin) return true

  // Option 3: Check organization membership (if using Clerk Organizations)
  // const { orgRole } = await auth()
  // if (orgRole === 'org:admin') return true

  return false
}

/**
 * Get current user ID safely
 */
export async function getCurrentUserId(): Promise<string | null> {
  const { userId } = await auth()
  return userId
}


