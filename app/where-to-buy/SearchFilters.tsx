"use client";

import { useEffect, useState } from "react";

interface SearchFiltersProps {
  onSearch?: (name: string, location: string, country: string) => void;
}

type DistributorApiItem = {
  country?: string | null;
  state?: string | null;
};

const US_COUNTRY = "United States";

const isUnitedStates = (value: string | null | undefined) => {
  const normalized = (value ?? "").trim().toLowerCase();
  return (
    normalized === "united states" ||
    normalized === "usa" ||
    normalized === "us" ||
    normalized === "united states of america"
  );
};

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [searchName, setSearchName] = useState("");
  const [location, setLocation] = useState("");
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("/api/distributors", { cache: "no-store" });
        const distributors = (await response.json()) as DistributorApiItem[];

        const uniqueStates = Array.from(
          new Set(
            distributors
              .filter((item) => isUnitedStates(item.country))
              .map((item) => item.state?.trim() ?? "")
              .filter((state) => state.length > 0)
          )
        ).sort((a, b) => a.localeCompare(b));

        setStates(uniqueStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchName, location, US_COUNTRY);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-app-surface p-4 sm:p-5 rounded-2xl shadow-xl shadow-primary/5 border border-app-border">
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-4">
        <label className="flex flex-col w-full md:flex-[2]">
          <span className="text-app-text text-sm font-bold pb-2 ml-1">Search by name</span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-app-text-sec">
              search
            </span>
            <input
              className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 pl-12 py-3.5 text-app-text placeholder:text-app-text-sec focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
              placeholder="e.g. Security Pro Partners"
              type="text"
              value={searchName}
              onChange={(event) => setSearchName(event.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </label>

        <label className="flex flex-col w-full md:flex-1">
          <span className="text-app-text text-sm font-bold pb-2 ml-1">State</span>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-app-text-sec">
              location_on
            </span>
            <select
              className="w-full bg-app-bg-subtle border border-app-border rounded-xl px-4 pl-12 py-3.5 text-app-text appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none cursor-pointer"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
            >
              <option value="">All states</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
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
          <span>Search</span>
        </button>
      </div>
    </div>
  );
}
