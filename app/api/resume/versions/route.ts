import { isAuthorizedAdmin } from '@/lib/auth'
import { resumeService } from '@/lib/services/resume-service'
import { createErrorResponse, createSuccessResponse, logError } from '@/lib/api-response'

export async function GET() {
  const isAdmin = await isAuthorizedAdmin()
  if (!isAdmin) {
    return createErrorResponse('Unauthorized', 403, 'UNAUTHORIZED')
  }

  try {
    const resumes = await resumeService.getAllResumes()
    return createSuccessResponse(resumes)
  } catch (error) {
    logError('GET /api/resume/versions', error)
    return createErrorResponse('Failed to fetch resumes', 500, 'FETCH_ERROR')
  }
}

