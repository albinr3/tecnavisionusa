import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { status } = body ?? {};

        if (typeof status !== "string" || status.trim().length === 0) {
            return NextResponse.json({ error: "Estado inválido." }, { status: 400 });
        }

        const quote = await prisma.quote.update({
            where: { id },
            data: { status: status.trim() },
        });

        return NextResponse.json(quote);
    } catch (error) {
        console.error("Error updating quote:", error);
        return NextResponse.json({ error: "No se pudo actualizar la cotización." }, { status: 500 });
    }
}

