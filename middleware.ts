import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is for our API routes
  if (path.startsWith("/api/")) {
    // Ensure the request has the correct content type for POST requests
    if (request.method === "POST" && !request.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type. Expected application/json" }, { status: 400 })
    }

    // Add security headers to API responses
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("X-XSS-Protection", "1; mode=block")

    return response
  }

  return NextResponse.next()
}

// Only run middleware on API routes
export const config = {
  matcher: "/api/:path*",
}
