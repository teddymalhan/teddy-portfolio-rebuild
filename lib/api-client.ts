// Client-side API helper for handling standardized responses
import type { ApiResponse } from '@/types/api'

export async function handleApiResponse<T>(response: Response): Promise<T> {
  const result = await response.json() as ApiResponse<T>
  
  if (!response.ok || !result.success) {
    const errorMessage = 'error' in result ? result.error : 'Request failed'
    throw new Error(errorMessage)
  }
  
  return result.data
}

