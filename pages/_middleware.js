import { NextRequest, NextResponse } from 'next/server'
import { countries } from '../libs/countries'
import Cookies from 'js-cookie'
import { getTokenPayload } from '../libs/auth'

// const token = Cookies.get('user_token')

export function middleware(req) {

    const { nextUrl: url, geo } = req

    const country = geo.country || 'US'
    const city = geo.city || 'San Francisco'

    const countryInfo = countries.find((x) => x.cca2 === country)
    const languages = Object.values(countryInfo.languages).join(', ')

    url.searchParams.set('country', country)
    url.searchParams.set('city', city)
    url.searchParams.set('languages', languages)

    return NextResponse.rewrite(url)

}

