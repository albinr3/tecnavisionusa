interface DistributorCardProps {
    name: string;
    icon: string;
    address: string;
    phone: string;
    email: string;
    mapUrl?: string | null;
}

export default function DistributorCard({
    name,
    icon,
    address,
    phone,
    email,
    mapUrl,
}: DistributorCardProps) {
    const handleMapClick = () => {
        const url = mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="group flex flex-col bg-app-surface rounded-2xl border border-app-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 overflow-hidden h-full">
            <div className="p-6 flex flex-col flex-1">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="size-12 rounded-lg bg-app-bg-subtle dark:bg-white flex items-center justify-center text-primary mb-2">
                        <span className="material-symbols-outlined text-3xl">{icon}</span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 dark:bg-white text-primary uppercase tracking-wide">
                        <span className="size-1.5 rounded-full bg-primary"></span>
                        Distribuidor Autorizado
                    </span>
                </div>
                <h3 className="text-xl font-bold text-app-text mb-3 break-words group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-app-text-sec text-[20px] mt-0.5">
                            location_on
                        </span>
                        <p className="text-sm text-app-text-sec break-words">{address}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-app-text-sec text-[20px]">
                            call
                        </span>
                        <p className="text-sm text-app-text-sec break-all">{phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-app-text-sec text-[20px]">
                            mail
                        </span>
                        <p className="text-sm text-app-text-sec break-all">{email}</p>
                    </div>
                </div>
                <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                        onClick={handleMapClick}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-app-border text-app-text text-sm font-semibold hover:bg-app-bg-subtle dark:hover:bg-white hover:border-primary/50 hover:text-primary transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                        <span className="material-symbols-outlined text-[18px]">map</span>
                        Ver en Mapa
                    </button>
                    <a
                        href={`mailto:${email}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors shadow-md shadow-primary/20"
                    >
                        <span className="material-symbols-outlined text-[18px]">send</span>
                        Contactar
                    </a>
                </div>
            </div>
        </div>
    );
}
