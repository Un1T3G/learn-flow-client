import { NextResponse, type NextRequest } from 'next/server'
import { ACCESS_TOKEN_KEY, UserRole, userService } from 'shared/api'

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_KEY)?.value

  const isAuthPage = request.url.includes('auth')
  const isManagePage = request.url.includes('manage')

  if ((isAuthPage || isManagePage) && accessToken) {
    try {
      const profile = await userService.getProfile(accessToken)
      const isStudent = profile.role === UserRole.STUDENT

      if (isAuthPage) {
        return NextResponse.redirect(
          new URL(isStudent ? '/dashboard' : '/manage', request.url)
        )
      }

      return NextResponse.next()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  } else if (!accessToken && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/manage/:path*', '/auth/:path*'],
}
