import { isAuthorizedAdmin } from '@/lib/auth'
import { createErrorResponse, createSuccessResponse, logError } from '@/lib/api-response'

export async function GET() {
  try {
    const authorized = await isAuthorizedAdmin()
    
    // Only return authorization status, no user details
    return createSuccessResponse({ authorized })
  } catch (error) {
    logError('GET /api/auth/check-admin', error)
    return createErrorResponse('Error checking authorization', 500, 'AUTH_CHECK_ERROR')
  }
}
