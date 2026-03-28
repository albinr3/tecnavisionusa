"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type QuoteRow = {
    id: string;
    productSlug: string | null;
    productName: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string | null;
    company: string | null;
    message: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
};

interface QuotesTableProps {
    quotes: QuoteRow[];
}

const STATUS_LABELS: Record<string, string> = {
    pending: "Pendiente",
    contacted: "Contactado",
    completed: "Completado",
    cancelled: "Cancelado",
};

const STATUS_CLASSES: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    contacted: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};

const formatDate = (value: string) =>
    new Date(value).toLocaleString("es-DO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });

export default function QuotesTable({ quotes }: QuotesTableProps) {
    const [quoteRows, setQuoteRows] = useState<QuoteRow[]>(quotes);
    const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [statusError, setStatusError] = useState<string | null>(null);

    const selectedQuote = useMemo(
        () => quoteRows.find((quote) => quote.id === selectedQuoteId) || null,
        [quoteRows, selectedQuoteId]
    );

    const markAsCompleted = async () => {
        if (!selectedQuote || selectedQuote.status === "completed") return;

        setIsUpdatingStatus(true);
        setStatusError(null);
        try {
            const res = await fetch(`/api/quotes/${selectedQuote.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data?.error || "No se pudo actualizar el estado.");
            }

            const nextUpdatedAt =
                typeof data?.updatedAt === "string"
                    ? data.updatedAt
                    : new Date().toISOString();

            setQuoteRows((prev) =>
                prev.map((quote) =>
                    quote.id === selectedQuote.id
                        ? { ...quote, status: "completed", updatedAt: nextUpdatedAt }
                        : quote
                )
            );
        } catch (error) {
            setStatusError(error instanceof Error ? error.message : "No se pudo actualizar el estado.");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    if (quoteRows.length === 0) {
        return (
            <div className="bg-app-surface rounded-xl border border-app-border p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-app-bg-subtle rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-gray-400 text-3xl">request_quote</span>
                </div>
                <h3 className="text-lg font-bold text-app-text mb-2">No hay cotizaciones</h3>
                <p className="text-[#645e8d]">Las solicitudes de productos aparecerán aquí.</p>
            </div>
        );
    }

    return (
        <>
            <div className="bg-app-surface rounded-xl border border-app-border shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px]">
                        <thead className="bg-app-bg-subtle border-b border-app-border">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Correo</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Mensaje</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Estado</th>
                                <th className="text-left px-6 py-4 text-sm font-semibold text-app-text">Fecha</th>
                                <th className="text-right px-6 py-4 text-sm font-semibold text-app-text">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dcdae7]">
                            {quoteRows.map((quote) => (
                                <tr key={quote.id} className="hover:bg-app-bg-subtle transition-colors align-top">
                                    <td className="px-6 py-4 text-sm text-app-text">{quote.clientEmail}</td>
                                    <td className="px-6 py-4 text-sm text-[#645e8d] max-w-[380px]">
                                        <p className="line-clamp-2 whitespace-pre-wrap">{quote.message || "Sin mensaje"}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${STATUS_CLASSES[quote.status] || "bg-gray-100 text-gray-700"}`}>
                                            {STATUS_LABELS[quote.status] || quote.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#645e8d]">{formatDate(quote.createdAt)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStatusError(null);
                                                setSelectedQuoteId(quote.id);
                                            }}
                                            className="inline-flex h-9 items-center justify-center rounded-lg border border-app-border px-3 text-sm font-semibold text-app-text hover:bg-app-bg-subtle"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedQuote && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 backdrop-blur-[2px] px-4 py-4 overflow-y-auto"
                    onClick={() => {
                        setStatusError(null);
                        setSelectedQuoteId(null);
                    }}
                >
                    <div
                        className="w-full max-w-xl max-h-[92vh] rounded-2xl border border-app-border bg-app-surface shadow-2xl overflow-hidden flex flex-col my-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between border-b border-app-border px-5 py-3.5 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                                    <span className="material-symbols-outlined">request_quote</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-app-text">Detalle de cotización</h3>
                                <p className="text-xs text-app-text-sec">Solicitud recibida desde catálogo web</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setStatusError(null);
                                    setSelectedQuoteId(null);
                                }}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-app-border text-app-text-sec hover:bg-app-bg-subtle"
                                aria-label="Cerrar modal de cotización"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="px-4 py-4 grid grid-cols-1 md:grid-cols-2 gap-2.5 overflow-y-auto">
                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Producto</p>
                                {selectedQuote.productSlug ? (
                                    <Link
                                        href={`/products/${selectedQuote.productSlug}`}
                                        target="_blank"
                                        className="mt-1 block text-base font-bold text-app-text hover:text-primary transition-colors"
                                        title="Abrir producto en una pestaña nueva"
                                    >
                                        {selectedQuote.productName}
                                    </Link>
                                ) : (
                                    <p className="mt-1 text-base font-bold text-app-text">{selectedQuote.productName}</p>
                                )}
                                {selectedQuote.productSlug && (
                                    <Link
                                        href={`/products/${selectedQuote.productSlug}`}
                                        target="_blank"
                                        className="text-xs bg-app-surface px-2 py-1 rounded mt-2 inline-block border border-app-border text-app-text-sec hover:text-primary hover:border-primary/40 transition-colors"
                                        title="Abrir producto en una pestaña nueva"
                                    >
                                        <code>{selectedQuote.productSlug}</code>
                                    </Link>
                                )}
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Estado</p>
                                <span className={`mt-2 inline-flex px-3 py-1 rounded-full text-xs font-semibold ${STATUS_CLASSES[selectedQuote.status] || "bg-gray-100 text-gray-700"}`}>
                                    {STATUS_LABELS[selectedQuote.status] || selectedQuote.status}
                                </span>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Cliente</p>
                                <p className="mt-1 text-sm text-app-text">{selectedQuote.clientName || "N/D"}</p>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Correo</p>
                                <p className="mt-1 text-sm text-app-text">{selectedQuote.clientEmail}</p>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Teléfono</p>
                                <p className="mt-1 text-sm text-app-text">{selectedQuote.clientPhone || "N/D"}</p>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Empresa</p>
                                <p className="mt-1 text-sm text-app-text">{selectedQuote.company || "N/D"}</p>
                            </div>

                            <div className="md:col-span-2 rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Mensaje</p>
                                <p className="mt-2 text-[15px] text-app-text whitespace-pre-wrap leading-relaxed">
                                    {selectedQuote.message || "Sin mensaje"}
                                </p>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Creada</p>
                                <p className="mt-1 text-sm text-app-text">{formatDate(selectedQuote.createdAt)}</p>
                            </div>

                            <div className="rounded-xl border border-app-border bg-app-bg-subtle/70 p-3">
                                <p className="text-xs font-semibold uppercase tracking-wide text-app-text-sec">Actualizada</p>
                                <p className="mt-1 text-sm text-app-text">{formatDate(selectedQuote.updatedAt)}</p>
                            </div>
                        </div>

                        <div className="border-t border-app-border px-4 py-3 bg-app-bg-subtle/40">
                            {statusError && (
                                <p className="mb-2 text-xs text-red-600">{statusError}</p>
                            )}
                            <div className="flex justify-end gap-2">
                                {selectedQuote.status !== "completed" && (
                                    <button
                                        type="button"
                                        onClick={markAsCompleted}
                                        disabled={isUpdatingStatus}
                                        className="h-10 rounded-lg border border-green-300 bg-green-50 px-4 text-sm font-semibold text-green-700 hover:bg-green-100 disabled:opacity-60"
                                    >
                                        {isUpdatingStatus ? "Guardando..." : "Marcar completada"}
                                    </button>
                                )}
                            <button
                                type="button"
                                onClick={() => {
                                    setStatusError(null);
                                    setSelectedQuoteId(null);
                                }}
                                className="h-10 rounded-lg bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-dark shadow-sm"
                            >
                                Cerrar
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
