"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchFilters from "./SearchFilters";
import DistributorCard from "./DistributorCard";

type DistributorItem = {
  id: string;
  name: string;
  icon: string;
  address: string;
  city: string;
  state: string | null;
  phone: string;
  email: string;
  mapUrl: string | null;
  country: string;
};

interface WhereToBuyClientProps {
  initialDistributors: DistributorItem[];
}

export default function WhereToBuyClient({ initialDistributors }: WhereToBuyClientProps) {
  const [distributors, setDistributors] = useState<DistributorItem[]>(initialDistributors);
  const [loading, setLoading] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);

  const fetchDistributors = async (name: string = "", state: string = "", country: string = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (name) params.append("search", name);
      if (state) params.append("state", state);
      if (country) params.append("country", country);

      const response = await fetch(`/api/distributors?${params.toString()}`, { cache: "no-store" });
      const data = await response.json();
      setDistributors(Array.isArray(data) ? data : []);
      setDisplayCount(6);
    } catch (error) {
      console.error("Error fetching distributors:", error);
      setDistributors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (name: string, state: string, country: string) => {
    fetchDistributors(name, state, country);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const displayedDistributors = distributors.slice(0, displayCount);
  const hasMore = displayCount < distributors.length;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <main className="flex flex-col flex-grow">
        <section className="relative bg-app-bg-subtle py-12 lg:py-16 overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#1301b2 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-10">
              <h1 className="text-app-text text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4">
                Find an Authorized Distributor
              </h1>
              <p className="text-app-text-sec text-lg md:text-xl font-normal leading-relaxed max-w-2xl mx-auto">
                A nationwide network of certified TecnaVision partners in the United States.
              </p>
            </div>
            <SearchFilters onSearch={handleSearch} />
          </div>
        </section>

        <section className="flex-1 bg-app-surface py-12 border-t border-app-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-bold text-app-text">Search Results</h2>
              <span className="text-sm font-medium text-app-text-sec bg-slate-100 dark:bg-white dark:text-primary px-3 py-1 rounded-full text-center">
                {loading ? "Loading..." : `${distributors.length} Partners found`}
              </span>
            </div>

            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            )}

            {!loading && distributors.length === 0 && (
              <div className="text-center py-20">
                <div className="size-20 mx-auto mb-4 rounded-full bg-app-bg-subtle flex items-center justify-center text-app-text-sec">
                  <span className="material-symbols-outlined text-4xl">search_off</span>
                </div>
                <h3 className="text-xl font-bold text-app-text mb-2">No distributors found</h3>
                <p className="text-app-text-sec">
                  Try adjusting your search filters or{" "}
                  <button
                    onClick={() => handleSearch("", "", "United States")}
                    className="text-primary font-semibold hover:underline dark:bg-white dark:px-2 dark:py-1 dark:rounded-lg dark:inline-block"
                  >
                    view all partners
                  </button>
                </p>
              </div>
            )}

            {!loading && distributors.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedDistributors.map((distributor) => (
                    <DistributorCard key={distributor.id} {...distributor} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={handleLoadMore}
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-app-border bg-app-surface text-app-text font-medium hover:bg-app-bg-subtle transition-colors shadow-sm"
                    >
                      Load more results
                      <span className="material-symbols-outlined">expand_more</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <section className="py-16 bg-app-bg-subtle border-t border-app-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-6">
                <h2 className="text-3xl font-bold text-app-text">Nationwide Coverage</h2>
                <p className="text-app-text-sec text-lg">
                  Our certified distribution network and technical partners help customers across the United States plan, deploy, and maintain professional surveillance systems.
                </p>
                <ul className="space-y-4 pt-2">
                  <li className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-app-text font-medium">Certified technical support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-app-text font-medium">Fast product availability</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-primary/10 dark:bg-white flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                    <span className="text-app-text font-medium">Direct extended warranty support</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full max-w-lg">
                <div className="relative w-full aspect-[4/3] bg-app-surface rounded-2xl shadow-xl overflow-hidden border border-app-border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-white to-blue-50 dark:from-primary/20 dark:via-app-surface dark:to-primary/10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-24 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                      <span className="material-symbols-outlined text-5xl">public</span>
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 bg-app-surface/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-app-border/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-lg text-white">
                        <span className="material-symbols-outlined">verified</span>
                      </div>
                      <div>
                        <p className="text-xs text-app-text-sec uppercase tracking-wider font-bold">
                          Service Area
                        </p>
                        <p className="text-sm text-app-text font-bold">United States</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
