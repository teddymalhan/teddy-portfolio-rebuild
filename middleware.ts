import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  // Protect admin routes - require authentication
  if (isAdminRoute(req)) {
    await auth.protect()
  }

  // Intercept resume PDF requests to use dynamic resume
  if (req.nextUrl.pathname === '/Teddy_Malhan_Resume.pdf') {
    // Preserve query parameters (for cache-busting)
    const rewriteUrl = new URL('/api/resume/file', req.url)
    rewriteUrl.search = req.nextUrl.search // Preserve query params
    return NextResponse.rewrite(rewriteUrl)
  }
})

export const config = {
  matcher: [
    // Explicitly match the resume PDF
    '/Teddy_Malhan_Resume.pdf',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}