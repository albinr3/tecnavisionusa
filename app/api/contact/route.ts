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
                { error: "Please complete all required fields." },
                { status: 400 }
            );
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return NextResponse.json({ error: "Invalid email." }, { status: 400 });
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
                { error: "The form is not configured yet. Please try again later." },
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
        const safeCompany = escapeHtml(company || "Not provided");
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

        await transporter.sendMail({
            from: smtpFrom,
            to: contactToEmail,
            replyTo: email,
            subject: `[Contact Web] ${subject}`,
            text: `New contact message\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\nSubject: ${subject}\n\nMessage:\n${message}`,
            html: `
                <h2>New contact message</h2>
                <p><strong>Name:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                <p><strong>Company:</strong> ${safeCompany}</p>
                <p><strong>Subject:</strong> ${safeSubject}</p>
                <hr />
                <p>${safeMessage}</p>
            `,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Error sending contact email:", error);
        return NextResponse.json(
            { error: "Could not send the message right now." },
            { status: 500 }
        );
    }
}




