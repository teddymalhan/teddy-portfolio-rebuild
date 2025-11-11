import { settingsService } from './services/settings-service'

// Server-side function to get resume visibility
export async function getResumeVisibility(): Promise<boolean> {
  try {
    return await settingsService.getResumeVisibility()
  } catch (error: unknown) {
    // Default to visible on error
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Error fetching resume visibility:', errorMessage)
    return true
  }
}

