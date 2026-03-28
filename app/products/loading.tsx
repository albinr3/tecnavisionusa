export default function LoadingProductsPage() {
    return (
        <div className="min-h-screen bg-app-bg text-app-text">
            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
                <div className="flex flex-col items-center gap-4 text-center">
                    <span
                        aria-hidden
                        className="size-10 animate-spin rounded-full border-4 border-primary/25 border-t-primary"
                    />
                    <p className="text-lg font-semibold">Cargando productos...</p>
                    <p className="text-sm text-app-text-sec">Estamos preparando el catálogo para ti.</p>
                </div>
            </div>
        </div>
    );
}
