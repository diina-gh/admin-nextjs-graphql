import { NextRequest, NextResponse } from 'next/server'
import jwt from "jsonwebtoken";

const APP_SECRET = 'GraphQL-is-aw3some';

export function middleware(req) {

    const url = req.nextUrl.clone()
    const token = req.cookies['userToken'] || null

    if(token != null){
        try{
            const {userId} = jwt.verify(token, APP_SECRET);
            if(userId != null) url.searchParams.set('userId', userId)
            if(userId == null) url.pathname = '/login'
        }
        catch(err){
            url.pathname = '/login'
        }
    }
    else{
        url.pathname = '/login'
    }

    return NextResponse.rewrite(url)

}

