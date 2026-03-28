import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Credenciales de admin (en producción, usar variables de entorno y hashing)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Crear un token simple (en producción usar JWT)
            const token = Buffer.from(`${email}:${Date.now()}`).toString("base64");

            const cookieStore = await cookies();
            cookieStore.set("admin_session", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7, // 7 días
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: "Credenciales inválidas" },
            { status: 401 }
        );
    } catch {
        return NextResponse.json(
            { success: false, error: "Error en el servidor" },
            { status: 500 }
        );
    }
}
