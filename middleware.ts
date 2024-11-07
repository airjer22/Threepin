import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/";

  // Get the auth session from the cookie
  const authSession = request.cookies.get("auth")?.value;

  // Redirect authenticated users to dashboard if they try to access login page
  if (isPublicPath && authSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isPublicPath && !authSession) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Add your protected routes here
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};