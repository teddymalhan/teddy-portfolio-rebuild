// API request/response types

// Resume API Types
export interface ResumeResponse {
  id: number
  filename: string
  path: string
  blob_url: string
  isActive: boolean
  uploadedAt: string
  fileSize?: number | null
  notes?: string | null
}

export interface ResumeUploadRequest {
  file: File
}

export interface ResumeUpdateRequest {
  notes?: string | null
  filename?: string
}

export interface SetActiveResumeRequest {
  resumeId: number
}

export interface ResumeVisibilityRequest {
  isVisible: boolean
}

// API Response wrappers
export interface ApiSuccessResponse<T = unknown> {
  success: true
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  code?: string
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse

// Visibility API
export interface VisibilityResponse {
  isVisible: boolean
  warning?: string
}

