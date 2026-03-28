"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface DistributorFormProps {
    distributor?: {
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
    } | null;
    onClose: () => void;
}

const iconOptions = [
    "verified_user",
    "security",
    "videocam",
    "shield",
    "lock",
    "business",
    "store",
    "location_city",
    "apartment",
    "domain",
];

export default function DistributorForm({ distributor, onClose }: DistributorFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        icon: "verified_user",
        address: "",
        city: "",
        state: "",
        phone: "",
        email: "",
        mapUrl: "",
        isActive: true,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (distributor) {
            setFormData({
                name: distributor.name,
                icon: distributor.icon,
                address: distributor.address,
                city: distributor.city,
                state: distributor.state || "",
                phone: distributor.phone,
                email: distributor.email,
                mapUrl: distributor.mapUrl || "",
                isActive: distributor.isActive,
            });
        }
    }, [distributor]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = distributor
                ? `/api/distributors/${distributor.id}`
                : "/api/distributors";
            const method = distributor ? "PATCH" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(
                    distributor
                        ? "Distribuidor actualizado exitosamente"
                        : "Distribuidor creado exitosamente"
                );
                onClose();
            } else {
                const error = await response.json();
                toast.error(error.error || "Error al guardar distribuidor");
            }
        } catch (error) {
            console.error("Error saving distributor:", error);
            toast.error("Error al guardar distribuidor");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-app-surface rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-app-surface border-b border-app-border px-6 py-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-app-text">
                        {distributor ? "Editar Distribuidor" : "Nuevo Distribuidor"}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-[#645e8d] hover:text-app-text"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-semibold text-app-text mb-2">
                            Nombre *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Ej. Seguridad Total RD"
                        />
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-semibold text-app-text mb-2">
                            Icono *
                        </label>
                        <select
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                            {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                    {icon}
                                </option>
                            ))}
                        </select>
                        <div className="mt-2 flex items-center gap-2 text-sm text-[#645e8d]">
                            <span className="material-symbols-outlined text-primary">
                                {formData.icon}
                            </span>
                            <span>Vista previa del icono</span>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-semibold text-app-text mb-2">
                            Dirección *
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Ej. Av. Winston Churchill #1100, Piantini"
                        />
                    </div>

                    {/* Google Maps URL */}
                    <div>
                        <label className="block text-sm font-semibold text-app-text mb-2">
                            URL de Google Maps
                        </label>
                        <input
                            type="url"
                            name="mapUrl"
                            value={formData.mapUrl}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="Ej. https://maps.app.goo.gl/hcZPmVWmmPHEeNSD6"
                        />
                        <p className="text-xs text-app-text-sec mt-1">
                            Opcional. Enlace directo a la ubicación en Google Maps
                        </p>
                    </div>

                    {/* City and State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-app-text mb-2">
                                Ciudad *
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Ej. Santo Domingo"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-app-text mb-2">
                                Provincia *
                            </label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            >
                                <option value="">Seleccionar Provincia</option>
                                <option value="Azua">Azua</option>
                                <option value="Baoruco">Baoruco</option>
                                <option value="Barahona">Barahona</option>
                                <option value="Dajabón">Dajabón</option>
                                <option value="Distrito Nacional">Distrito Nacional</option>
                                <option value="Duarte">Duarte</option>
                                <option value="Elías Piña">Elías Piña</option>
                                <option value="El Seibo">El Seibo</option>
                                <option value="Espaillat">Espaillat</option>
                                <option value="Hato Mayor">Hato Mayor</option>
                                <option value="Hermanas Mirabal">Hermanas Mirabal</option>
                                <option value="Independencia">Independencia</option>
                                <option value="La Altagracia">La Altagracia</option>
                                <option value="La Romana">La Romana</option>
                                <option value="La Vega">La Vega</option>
                                <option value="María Trinidad Sánchez">María Trinidad Sánchez</option>
                                <option value="Monseñor Nouel">Monseñor Nouel</option>
                                <option value="Monte Cristi">Monte Cristi</option>
                                <option value="Monte Plata">Monte Plata</option>
                                <option value="Pedernales">Pedernales</option>
                                <option value="Peravia">Peravia</option>
                                <option value="Puerto Plata">Puerto Plata</option>
                                <option value="Samaná">Samaná</option>
                                <option value="San Cristóbal">San Cristóbal</option>
                                <option value="San José de Ocoa">San José de Ocoa</option>
                                <option value="San Juan">San Juan</option>
                                <option value="San Pedro de Macorís">San Pedro de Macorís</option>
                                <option value="Sánchez Ramírez">Sánchez Ramírez</option>
                                <option value="Santiago">Santiago</option>
                                <option value="Santiago Rodríguez">Santiago Rodríguez</option>
                                <option value="Santo Domingo">Santo Domingo</option>
                                <option value="Valverde">Valverde</option>
                            </select>
                        </div>
                    </div>

                    {/* Phone and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-app-text mb-2">
                                Teléfono *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Ej. +1 (809) 555-1234"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-app-text mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-app-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                placeholder="Ej. contacto@distribuidor.do"
                            />
                        </div>
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isActive"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={handleChange}
                            className="w-5 h-5 text-primary border-app-border rounded focus:ring-2 focus:ring-primary/20"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-app-text">
                            Distribuidor activo
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-app-border rounded-xl font-semibold text-app-text hover:bg-app-bg-subtle transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Guardando..." : distributor ? "Actualizar" : "Crear"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
