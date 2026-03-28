import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip auth check for login page and API routes
    if (pathname === "/admin/login" || pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    // Check if accessing admin routes
    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
        const adminSession = request.cookies.get("admin_session");

        if (!adminSession) {
            const loginUrl = new URL("/admin/login", request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin", "/admin/:path*"],
};
