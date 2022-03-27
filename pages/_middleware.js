import { NextRequest, NextResponse } from 'next/server'

// Block Austria, prefer Germany
const BLOCKED_COUNTRY = 'AT'

export function middleware(req= NextRequest) {
  const country = req.geo.country || 'US'

  if (country === BLOCKED_COUNTRY) {
    return new Response('Blocked for legal reasons', { status: 451 })
  }

  req.nextUrl.searchParams.set('country', country)

  return NextResponse.rewrite(req.nextUrl)
}