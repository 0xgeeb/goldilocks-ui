import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const country = request.headers.get("X-Vercel-IP-Country");

  const blockedCountries = ["US"];

  // console.log('HELLOOOOOOOOOOOOOOOOOOO', country)
  // if(country) {
  //   console.log('GOODBYEEEEEEEEEEEEEEEEE', blockedCountries.includes(country))
  // }

  if (country && blockedCountries.includes(country)) {
    return NextResponse.redirect(new URL("/geo", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/goldiswap/:path*",
    "/goldilend/:path*",
    "/goldivault/:path*",
    "/goldigovernance/:path*",
  ],
};
