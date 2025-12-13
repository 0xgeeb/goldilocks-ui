import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const country = request.headers.get("X-Vercel-IP-Country");
  // if (country && blockedCountries.includes(country)) {
  //   return NextResponse.redirect(new URL("/geo", request.url));
  // } else {
  //   return NextResponse.next();
  // }

  // const country = request.headers.get('x-vercel-ip-country') || 'unknown';
  // const blockedCountries = ['US'];
  // if (blockedCountries.includes(country.toUpperCase())) {
  //   return NextResponse.redirect(new URL('/geo', request.url));
  // }
  // return NextResponse.next();

  // // Always let crawlers preview the target page to avoid cached geo pages in unfurls
  // const ua = request.headers.get('user-agent') || '';
  // const isCrawler = /(Discordbot|Slackbot|Twitterbot|facebookexternalhit|LinkedInBot|WhatsApp|TelegramBot|Googlebot|bingbot)/i.test(ua);
  // if (isCrawler) {
  //   return NextResponse.next();
  // }
}

export const config = {
  matcher: [
    "/goldiswap/:path*",
    "/goldilend/:path*",
    "/goldivault/:path*",
    "/goldigovernance/:path*",
  ],
};
