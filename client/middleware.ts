import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/sessions'

// 1. Specify protected and public routes
const protectedRoutes = ['/dashboard', '/dashboard/*']
const publicRoutes = ['/signin', '/signup', '/']
 
export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)
 
  if (isPublicRoute) {
    return NextResponse.next()
  }
  else {
    // 3. Decrypt the session from the cookie
      const cookie = cookies().get('session')?.value
      const session = await decrypt(cookie)

      // 5. Redirect to /login if the user is not authenticated
      if (path.startsWith('/dashboard') && !session?.user) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl))
      }

      return NextResponse.next()

      }
  
}
