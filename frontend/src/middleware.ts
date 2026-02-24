import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/worlds", "/settings", "/onboarding"];

// Routes that should redirect authenticated users away
const authRoutes = ["/login", "/signup"];

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Get session
    let session = null;
    try {
        session = await auth();
    } catch {
        console.error("[middleware] auth() failed — treating as unauthenticated");
    }

    const isLoggedIn = !!session?.user;

    // Redirect unauthenticated users to login for protected routes
    if (
        !isLoggedIn &&
        protectedRoutes.some((route) => pathname.startsWith(route))
    ) {
        const loginUrl = new URL("/login", req.nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Handle authenticated users
    if (isLoggedIn) {
        // If they are on auth routes (login/signup), redirect to dashboard
        if (authRoutes.some((route) => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }

        // NOTE: In the future, we will check if the user has an 'archetype' set in their profile.
        // If they don't, and they are trying to access /dashboard, we would redirect them to /onboarding.
        // For now, we will just allow access.
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$).*)",
    ],
};
