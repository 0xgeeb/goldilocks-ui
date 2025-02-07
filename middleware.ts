import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const country = request.headers.get('x-vercel-ip-country')

  const blockedCountries = ['US']
  
  if(country && blockedCountries.includes(country)) {
    return NextResponse.redirect(new URL('/geo', request.url))
  }
  else {
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/goldiswap/:path*', '/goldilend/:path*', '/goldivault/:path*', '/goldigovernance/:path*']
}