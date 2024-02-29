import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import { cookieTokenName } from './types/CookieType'
import { NavigationPaths } from '@/types/NavigationPaths'

const securedRoutes = "/secure"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const token = request.cookies.get(cookieTokenName)?.value

    if (request.nextUrl.pathname.includes(securedRoutes) && !token) {
        // const loginURL = new URL(NavigationPaths.login, request.nextUrl.origin)
        // return NextResponse.redirect(loginURL.toString())
        console.error("Token invalid")
    }
}