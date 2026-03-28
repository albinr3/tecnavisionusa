"use client";

import { useState, useEffect } from "react";

interface SearchFiltersProps {
    onSearch?: (name: string, location: string) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
    const [searchName, setSearchName] = useState("");
    const [location, setLocation] = useState("");
    const [provinces, setProvinces] = useState<string[]>([]);

    useEffect(() => {
        // Fetch all distributors to get unique provinces
        const fetchProvinces = async () => {
            try {
                const response = await fetch("/api/distributors");
                const distributors = await response.json();

                // Get unique provinces (state field)
                const uniqueProvinces = Array.from(
                    new Set(
                        distributors
                            .map((d: any) => d.state)
                            .filter((state: string | null) => state !== null && state !== "")
                    )
                ).sort();

                setProvinces(uniqueProvinces as string[]);
            } catch (error) {
                console.error("Error fetching provinces:", error);
            }
        };

        fetchProvinces();
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchName, location);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-app-surface p-4 sm:p-5 rounded-2xl shadow-xl shadow-primary/5 border border-app-border">
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
                <label className="flex flex-col w-full md:flex-[2]">
                    <span className="text-app-text text-sm font-bold pb-2 ml-1">
                        Buscar por nombre
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-app-text-sec">
                            search
                        </span>
                        <input
                            className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 pl-12 py-3.5 text-app-text placeholder:text-app-text-sec focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                            placeholder="Ej. Seguridad Total"
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </label>
                <label className="flex flex-col w-full md:flex-1">
                    <span className="text-app-text text-sm font-bold pb-2 ml-1">
                        Provincia
                    </span>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-app-text-sec">
                            location_on
                        </span>
                        <select
                            className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 pl-12 py-3.5 text-app-text appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        >
                            <option value="">Todas las Provincias</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-app-text-sec pointer-events-none">
                            expand_more
                        </span>
                    </div>
                </label>
                <button
                    className="w-full md:w-auto h-[50px] bg-primary hover:bg-primary-dark text-white font-bold px-8 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    onClick={handleSearch}
                >
                    <span>Buscar</span>
                </button>
            </div>
        </div>
    );
}
