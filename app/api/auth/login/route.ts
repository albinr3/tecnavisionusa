import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Admin credentials (in production, use env vars and hashing)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Create a simple token (use JWT in production)
            const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

            const cookieStore = await cookies();
            cookieStore.set("admin_session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Invalid credentials" },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}
