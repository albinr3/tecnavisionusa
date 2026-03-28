import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    company?: unknown;
    subject?: unknown;
    message?: unknown;
};

function asTrimmedString(value: unknown) {
    return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as ContactPayload;

        const name = asTrimmedString(body.name);
        const email = asTrimmedString(body.email).toLowerCase();
        const company = asTrimmedString(body.company);
        const subject = asTrimmedString(body.subject);
        const message = asTrimmedString(body.message);

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "Completa los campos requeridos." },
                { status: 400 }
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
        }

        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT || "465");
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const contactToEmail = process.env.CONTACT_TO_EMAIL;
        const smtpFrom = process.env.SMTP_FROM || smtpUser;
        const smtpSecure =
            process.env.SMTP_SECURE != null
                ? process.env.SMTP_SECURE === "true"
                : smtpPort === 465;

        if (!smtpHost || !smtpUser || !smtpPass || !contactToEmail || !smtpFrom) {
            console.error("Contact form SMTP env vars are missing.");
            return NextResponse.json(
                { error: "El formulario no está configurado aún. Intenta más tarde." },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpSecure,
            auth: {
                user: smtpUser,
                pass: smtpPass,
            },
        });

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeCompany = escapeHtml(company || "No indicada");
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

        await transporter.sendMail({
            from: smtpFrom,
            to: contactToEmail,
            replyTo: email,
            subject: `[Contacto Web] ${subject}`,
            text: `Nuevo mensaje de contacto\n\nNombre: ${name}\nCorreo: ${email}\nEmpresa: ${company || "No indicada"}\nAsunto: ${subject}\n\nMensaje:\n${message}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${safeName}</p>
                <p><strong>Correo:</strong> ${safeEmail}</p>
                <p><strong>Empresa:</strong> ${safeCompany}</p>
                <p><strong>Asunto:</strong> ${safeSubject}</p>
                <hr />
                <p>${safeMessage}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error sending contact email:", error);
        return NextResponse.json(
            { error: "No se pudo enviar el mensaje en este momento." },
            { status: 500 }
        );
    }
}
