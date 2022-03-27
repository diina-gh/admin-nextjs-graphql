import { NextRequest, NextResponse } from 'next/server'
import { countries } from '../libs/countries'
// import { setUserCookie } from '@lib/auth'

export function middleware(req) {

  // Add the user token to the response
  //   return setUserCookie(req, NextResponse.next())

    const { nextUrl: url, geo } = req
    const country = geo.country || 'US'
    const city = geo.city || 'San Francisco'
    const region = geo.region || 'CA'

    const countryInfo = countries.find((x) => x.cca2 === country)

    const currencyCode = Object.keys(countryInfo.currencies)[0]
    const currency = countryInfo.currencies[currencyCode]
    const languages = Object.values(countryInfo.languages).join(', ')

    url.searchParams.set('country', country)
    url.searchParams.set('city', city)
    url.searchParams.set('region', region)
    url.searchParams.set('currencyCode', currencyCode)
    url.searchParams.set('currencySymbol', currency.symbol)
    url.searchParams.set('name', currency.name)
    url.searchParams.set('languages', languages)

    return NextResponse.rewrite(url)
}

