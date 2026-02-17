import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/worlds", "/settings"];

// Routes that should redirect authenticated users away
const authRoutes = ["/login", "/signup"];

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.auth;

    // Redirect authenticated users away from login/signup
    if (isLoggedIn && authRoutes.some((route) => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    // Redirect unauthenticated users to login
    if (
        !isLoggedIn &&
        protectedRoutes.some((route) => pathname.startsWith(route))
    ) {
        const loginUrl = new URL("/login", req.nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        // Match all routes except static files and API
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
    ],
};
