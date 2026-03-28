import { NextResponse } from "next/server";
import prisma from "@/lib/db";

function sanitizeNameFromEmail(email: string) {
    const local = email.split("@")[0] || "";
    const normalized = local.replace(/[._-]+/g, " ").trim();
    if (!normalized) return "Cliente Web";
    return normalized
        .split(" ")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            productSlug,
            productName,
            clientEmail,
            message,
            clientName,
            clientPhone,
            company,
        } = body ?? {};

        if (!productName || typeof productName !== "string") {
            return NextResponse.json({ error: "Producto inválido." }, { status: 400 });
        }

        if (!clientEmail || typeof clientEmail !== "string") {
            return NextResponse.json({ error: "Correo electrónico requerido." }, { status: 400 });
        }

        const email = clientEmail.trim().toLowerCase();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
        }

        const quote = await prisma.quote.create({
            data: {
                productSlug: typeof productSlug === "string" ? productSlug : null,
                productName: productName.trim(),
                clientEmail: email,
                clientName:
                    typeof clientName === "string" && clientName.trim().length > 0
                        ? clientName.trim()
                        : sanitizeNameFromEmail(email),
                clientPhone: typeof clientPhone === "string" ? clientPhone.trim() || null : null,
                company: typeof company === "string" ? company.trim() || null : null,
                message: typeof message === "string" ? message.trim() || null : null,
            },
        });

        return NextResponse.json(quote, { status: 201 });
    } catch (error) {
        console.error("Error creating quote:", error);
        return NextResponse.json({ error: "No se pudo crear la cotización." }, { status: 500 });
    }
}

