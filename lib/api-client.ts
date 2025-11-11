// Client-side API helper for handling standardized responses
import type { ApiResponse } from '@/types/api'

export async function handleApiResponse<T>(response: Response): Promise<T> {
  let result: ApiResponse<T>
  
  try {
    result = await response.json() as ApiResponse<T>
  } catch (error) {
    console.error('Failed to parse API response:', error)
    throw new Error('Invalid response from server')
  }
  
  if (!response.ok || !result.success) {
    const errorMessage = 'error' in result ? result.error : 'Request failed'
    console.error('API error:', { status: response.status, error: errorMessage, result })
    throw new Error(errorMessage)
  }
  
  return result.data
}

