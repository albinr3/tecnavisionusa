"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const payload = (await response.json()) as { error?: string };

            if (!response.ok) {
                throw new Error(payload.error || "No se pudo enviar el mensaje.");
            }

            setFormData({
                name: "",
                email: "",
                company: "",
                subject: "",
                message: "",
            });

            alert("¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.");
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Error inesperado al enviar el mensaje.";
            alert(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-app-text" htmlFor="name">
                    Nombre Completo
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-app-text-sec">
                        <span className="material-symbols-outlined text-xl">person</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border-transparent bg-app-surface text-app-text placeholder-app-text-sec focus:border-primary focus:bg-app-surface focus:ring-2 focus:ring-primary/20 transition-all sm:text-sm"
                        id="name"
                        name="name"
                        placeholder="Tu nombre"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-app-text" htmlFor="email">
                    Correo Electrónico
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-app-text-sec">
                        <span className="material-symbols-outlined text-xl">alternate_email</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border-transparent bg-app-surface text-app-text placeholder-app-text-sec focus:border-primary focus:bg-app-surface focus:ring-2 focus:ring-primary/20 transition-all sm:text-sm"
                        id="email"
                        name="email"
                        placeholder="ejemplo@correo.com"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Company (Optional) */}
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-app-text" htmlFor="company">
                    Empresa <span className="text-app-text-sec font-normal text-xs ml-1">(Opcional)</span>
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-app-text-sec">
                        <span className="material-symbols-outlined text-xl">business</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border-transparent bg-app-surface text-app-text placeholder-app-text-sec focus:border-primary focus:bg-app-surface focus:ring-2 focus:ring-primary/20 transition-all sm:text-sm"
                        id="company"
                        name="company"
                        placeholder="Nombre de tu empresa"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-app-text" htmlFor="subject">
                    Asunto
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-app-text-sec">
                        <span className="material-symbols-outlined text-xl">chat_bubble_outline</span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border-transparent bg-app-surface text-app-text placeholder-app-text-sec focus:border-primary focus:bg-app-surface focus:ring-2 focus:ring-primary/20 transition-all sm:text-sm"
                        id="subject"
                        name="subject"
                        placeholder="¿En qué podemos ayudarte?"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {/* Message */}
            <div className="space-y-1">
                <label className="block text-sm font-semibold text-app-text" htmlFor="message">
                    Mensaje
                </label>
                <textarea
                    className="block w-full px-4 py-3 rounded-lg border-transparent bg-app-surface text-app-text placeholder-app-text-sec focus:border-primary focus:bg-app-surface focus:ring-2 focus:ring-primary/20 transition-all sm:text-sm resize-none"
                    id="message"
                    name="message"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                className="group relative w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={isSubmitting}
            >
                <span>{isSubmitting ? "Enviando..." : "Enviar Mensaje"}</span>
                {!isSubmitting && (
                    <span className="absolute right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                        <span className="material-symbols-outlined text-lg">send</span>
                    </span>
                )}
            </button>
        </form>
    );
}
