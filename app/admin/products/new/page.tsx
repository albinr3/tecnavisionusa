import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductForm from "@/app/components/ProductForm";

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 flex-shrink-0 z-10">
                <div>
                    <div className="flex items-center gap-2 text-[#645e8d] text-sm mb-1">
                        <Link href="/admin/products" className="hover:text-primary transition-colors">
                            Productos
                        </Link>
                        <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                        <span className="text-app-text font-medium">Crear Nuevo</span>
                    </div>
                    <h2 className="text-app-text text-2xl font-bold tracking-tight">Añadir Nuevo Producto</h2>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/products"
                        className="flex h-10 items-center justify-center rounded-lg px-4 border border-app-border bg-app-surface text-app-text text-sm font-semibold hover:bg-app-bg-subtle transition-colors"
                    >
                        Descartar
                    </Link>
                    {/* The submit button is now inside the ProductForm, but for the header layout we might want a trigger or just let the form handle it. 
                        For now, let's keep the header simple and let ProductForm handle submission in the mobile view or we can duplicate the trigger if needed.
                        Actually, lifting the state would be complex. Let's simplify and put the Submit button inside ProductForm only or accept that the header button was convenient.
                        
                        Wait, the original design had a submit button in the header. To keep that, ProductForm needs to expose a submit handler or ID.
                        A simpler approach for now: Pass the header actions logic into ProductForm? No, ProductForm should be the whole page content.
                        Let's move the header *into* ProductForm? No, the header looks like a layout element.
                        
                        Alternate solution: NewProductPage renders the layout, but ProductForm renders the header actions?
                        Let's just move the entire content including the header into ProductForm for simplicity in migrating, 
                        OR update the header here to just be a title and let the form have the buttons.
                        
                        The original code had the button in the header. To preserve this UI, likely ProductForm should encapsulate the Header too or we use a form ID.
                        Let's use a form ID `id="product-form"` and make the header button `form="product-form"`.
                    */}
                    <button
                        form="product-form"
                        type="submit"
                        className="flex h-10 items-center justify-center rounded-lg px-6 bg-primary text-white text-sm font-semibold shadow-sm hover:bg-blue-800 transition-colors gap-2 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-[18px]">publish</span>
                        Publicar Producto
                    </button>
                </div>
            </header>

            {/* Form */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <ProductForm categories={categories} />
            </div>
        </>
    );
}


