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

    // register page
    if (req.nextUrl.pathname.startsWith('/register')) {

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

    // dashboard page
    if (req.nextUrl.pathname.startsWith('/dashboard')) {

        let cookies = req.cookies.get('user');

        try {

            if (!cookies) {

                return NextResponse.redirect(new URL('/', req.url));
            } else {

                const accessToken = JSON.parse(cookies).accessToken;

                if (!accessToken) {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        } catch (error) {

        }

    }

    // user page
    if (req.nextUrl.pathname.startsWith('/user')) {

        let cookies = req.cookies.get('user');

        try {

            if (!cookies) {

                return NextResponse.redirect(new URL('/', req.url));

            } else {

                const accessToken = JSON.parse(cookies).accessToken;

                if (!accessToken) {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            }
        } catch (error) {

        }

    }
}