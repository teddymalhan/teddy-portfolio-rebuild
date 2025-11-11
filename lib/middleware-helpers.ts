import { NextRequest, NextResponse } from 'next/server'
import { isAuthorizedAdmin } from '@/lib/auth'
import { createErrorResponse } from './api-response'

/**
 * Middleware helper to protect admin-only API routes
 * Returns null if authorized, or an error response if not
 */
export async function requireAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return createErrorResponse('Unauthorized', 403, 'UNAUTHORIZED')
  }
  return null
}

