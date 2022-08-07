import { NextResponse } from "next/server";

export function middleware(req, res) {

    // login page
    if (req.nextUrl.pathname.startsWith('/login')) {

        const cookies = req.cookies.get('user');

        try {

            if (cookies) {

                const accessToken = JSON.parse(cookies).accessToken;

                if (accessToken) {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }

        } catch (error) {

        }
    }

}