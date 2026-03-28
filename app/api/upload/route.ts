import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export const runtime = "nodejs";

const utapi = new UTApi({
    token: process.env.UPLOADTHING_TOKEN,
});

export async function POST(request: NextRequest) {
    try {
        if (!process.env.UPLOADTHING_TOKEN) {
            return NextResponse.json(
                { error: "Falta configurar UPLOADTHING_TOKEN en variables de entorno." },
                { status: 500 }
            );
        }

        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { error: "No se ha proporcionado ningún archivo" },
                { status: 400 }
            );
        }

        const result = await utapi.uploadFiles(file);
        if (result.error) {
            return NextResponse.json(
                { error: result.error.message || "UploadThing no pudo procesar el archivo." },
                { status: 500 }
            );
        }

        const publicUrl = result.data?.ufsUrl || result.data?.url;
        if (!publicUrl) {
            return NextResponse.json(
                { error: "No se recibió URL pública desde UploadThing." },
                { status: 500 }
            );
        }

        return NextResponse.json({ url: publicUrl, key: result.data?.key });
    } catch (error) {
        console.error("Error al subir archivo:", error);
        return NextResponse.json(
            { error: "Error interno al subir el archivo" },
            { status: 500 }
        );
    }
}
