"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import DistributorForm from "./DistributorForm";

interface Distributor {
    id: string;
    name: string;
    icon: string;
    address: string;
    city: string;
    state: string | null;
    phone: string;
    email: string;
    mapUrl: string | null;
    isActive: boolean;
}

export default function DistribuidoresPage() {
    const [distributors, setDistributors] = useState<Distributor[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDistributor, setEditingDistributor] = useState<Distributor | null>(null);

    const fetchDistributors = async () => {
        try {
            const response = await fetch("/api/distributors");
            const data = await response.json();
            setDistributors(data);
        } catch (error) {
            console.error("Error fetching distributors:", error);
            toast.error("Error al cargar distribuidores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDistributors();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este distribuidor?")) return;

        try {
            const response = await fetch(`/api/distributors/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Distribuidor eliminado");
                fetchDistributors();
            } else {
                toast.error("Error al eliminar distribuidor");
            }
        } catch (error) {
            console.error("Error deleting distributor:", error);
            toast.error("Error al eliminar distribuidor");
        }
    };

    const handleEdit = (distributor: Distributor) => {
        setEditingDistributor(distributor);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingDistributor(null);
        fetchDistributors();
    };

    return (
        <>
            {/* Page Header */}
            <header className="bg-app-surface border-b border-app-border px-8 py-5 flex-shrink-0 z-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-app-text text-2xl font-bold tracking-tight">Distribuidores</h2>
                        <p className="text-[#645e8d] text-sm mt-1">Gestiona la red de distribuidores autorizados</p>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Nuevo Distribuidor
                    </button>
                </div>
            </header>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="mx-auto max-w-7xl">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="bg-app-surface rounded-xl border border-app-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-app-bg-subtle border-b border-app-border">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-app-text uppercase tracking-wider">
                                                Nombre
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-app-text uppercase tracking-wider">
                                                Ciudad
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-bold text-app-text uppercase tracking-wider">
                                                Teléfono
                                            </th>

                                            <th className="px-6 py-3 text-left text-xs font-bold text-app-text uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-bold text-app-text uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#dcdae7]">
                                        {distributors.map((distributor) => (
                                            <tr key={distributor.id} className="hover:bg-app-bg-subtle transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                            <span className="material-symbols-outlined text-xl">{distributor.icon}</span>
                                                        </div>
                                                        <div className="font-medium text-app-text">{distributor.name}</div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#645e8d]">
                                                    {distributor.city}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#645e8d]">
                                                    {distributor.phone}
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${distributor.isActive
                                                            ? "bg-green-100 text-green-800"
                                                            : "bg-app-bg-subtle text-app-text"
                                                            }`}
                                                    >
                                                        {distributor.isActive ? "Activo" : "Inactivo"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button
                                                        onClick={() => handleEdit(distributor)}
                                                        className="text-primary hover:text-primary-dark mr-4"
                                                    >
                                                        <span className="material-symbols-outlined">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(distributor.id)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <DistributorForm
                    distributor={editingDistributor}
                    onClose={handleFormClose}
                />
            )}
        </>
    );
}
