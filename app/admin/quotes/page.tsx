import prisma from "@/lib/db";
import QuotesTable from "./QuotesTable";

export default async function AdminQuotesPage() {
    const quotes = await prisma.quote.findMany({
        orderBy: { createdAt: "desc" },
    });
    const serializedQuotes = quotes.map((quote) => ({
        ...quote,
        createdAt: quote.createdAt.toISOString(),
        updatedAt: quote.updatedAt.toISOString(),
    }));

    return (
        <>
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex-shrink-0 z-10">
                <h2 className="text-app-text text-2xl font-bold tracking-tight">Cotizaciones</h2>
                <p className="text-[#645e8d] text-sm mt-1">Solicitudes recibidas desde la página de productos</p>
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-6xl">
                    <QuotesTable quotes={serializedQuotes} />
                </div>
            </div>
        </>
    );
}
