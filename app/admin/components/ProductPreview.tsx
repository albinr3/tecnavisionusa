"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface EditableFieldProps {
    value: string;
    onChange: (value: string) => void;
    label: string;
    multiline?: boolean;
    allowImageUpload?: boolean;
    onClose: () => void;
}

function InlineEditor({ value, onChange, label, multiline, allowImageUpload, onClose }: EditableFieldProps) {
    const [tempValue, setTempValue] = useState(value);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTempValue(value);
    }, [value]);

    const handleSave = () => {
        onChange(tempValue);
        onClose();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const loadingToast = toast.loading("Uploading image...");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error uploading image");
            }

            const data = await res.json();
            setTempValue(data.url);
            onChange(data.url);
            toast.success("Image uploaded successfully");
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error uploading image");
        } finally {
            setIsUploading(false);
            toast.dismiss(loadingToast);
            e.target.value = "";
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-app-surface rounded-2xl shadow-2xl p-6 w-full max-w-md border border-primary" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm font-bold text-primary uppercase tracking-wider mb-3 block">{label}</label>
                {multiline ? (
                    <textarea
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full p-3 text-sm border border-app-border rounded-xl bg-app-bg resize-none h-32 focus:ring-2 focus:ring-primary focus:border-primary"
                        autoFocus
                    />
                ) : (
                    <input
                        type="text"
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="w-full p-3 text-sm border border-app-border rounded-xl bg-app-bg focus:ring-2 focus:ring-primary focus:border-primary"
                        autoFocus
                    />
                )}
                {allowImageUpload && (
                    <div className="mt-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="hidden"
                        />
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full px-4 py-2.5 text-sm font-bold border border-primary/30 bg-primary/5 text-primary rounded-xl hover:bg-primary/10 transition-colors disabled:opacity-50"
                        >
                            {isUploading ? "Uploading..." : "Upload from computer"}
                        </button>
                        {tempValue && (
                            <div className="mt-3 h-28 rounded-lg overflow-hidden border border-app-border bg-app-bg-subtle">
                                <img src={tempValue} alt="Image preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>
                )}
                <div className="flex gap-3 mt-4">
                    <button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 text-sm font-bold border border-app-border text-app-text rounded-xl hover:bg-app-bg-subtle transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

const RELEVANT_ICON_OPTIONS = [
    { value: "videocam", label: "Camera" },
    { value: "psychology", label: "AI" },
    { value: "nightlight_round", label: "Night Vision" },
    { value: "settings_suggest", label: "Settings" },
    { value: "verified_user", label: "Warranty" },
    { value: "support_agent", label: "Support" },
    { value: "shield", label: "Protection" },
    { value: "visibility", label: "Surveillance" },
    { value: "center_focus_strong", label: "Focus" },
    { value: "wifi", label: "Connectivity" },
];

interface IconPickerProps {
    value: string;
    label: string;
    onChange: (value: string) => void;
    onClose: () => void;
}

function IconPickerModal({ value, label, onChange, onClose }: IconPickerProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-app-surface rounded-2xl shadow-2xl p-6 w-full max-w-lg border border-primary" onClick={(e) => e.stopPropagation()}>
                <label className="text-sm font-bold text-primary uppercase tracking-wider mb-4 block">{label}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {RELEVANT_ICON_OPTIONS.map((icon) => (
                        <button
                            key={icon.value}
                            type="button"
                            onClick={() => {
                                onChange(icon.value);
                                onClose();
                            }}
                            className={`p-3 rounded-xl border text-left transition-colors ${value === icon.value
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-app-border hover:border-primary hover:bg-app-bg-subtle text-app-text"
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="material-icons-outlined text-xl">{icon.value}</span>
                                <span className="text-xs font-semibold">{icon.label}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full mt-4 px-4 py-2.5 text-sm font-bold border border-app-border text-app-text rounded-xl hover:bg-app-bg-subtle transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}

interface ProductPreviewProps {
    name: string;
    model: string;
    badge: string;
    subtitle: string;
    description: string;
    mainImage: string;
    nightVisionImg: string;
    appDemoImg: string;
    appDemoBadge: string;
    appDemoTitle: string;
    appDemoDesc: string;
    aiSectionIcon: string;
    nightVisionIcon: string;
    specsSectionIcon: string;
    guaranteeIcon: string;
    supportIcon: string;
    guarantee: string;
    support: string;
    aiFeatures: string;
    resolutionOptions: string;
    specs: { key: string; value: string }[];
    categoryName?: string;
    categorySlug?: string;
    // Section texts (optional - will use defaults if not provided)
    aiSectionTitle?: string;
    aiSectionDesc?: string;
    nightVisionTitle?: string;
    nightVisionDesc?: string;
    specsTitle?: string;
    specsDesc?: string;
    onNameChange: (value: string) => void;
    onModelChange: (value: string) => void;
    onBadgeChange: (value: string) => void;
    onSubtitleChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onGuaranteeChange: (value: string) => void;
    onSupportChange: (value: string) => void;
    onAiFeaturesChange: (value: string) => void;
    onAiSectionTitleChange?: (value: string) => void;
    onAiSectionDescChange?: (value: string) => void;
    onNightVisionTitleChange?: (value: string) => void;
    onNightVisionDescChange?: (value: string) => void;
    onSpecsTitleChange?: (value: string) => void;
    onSpecsDescChange?: (value: string) => void;
    onMainImageChange: (value: string) => void;
    onNightVisionImageChange: (value: string) => void;
    onAppDemoImageChange: (value: string) => void;
    onAppDemoBadgeChange: (value: string) => void;
    onAppDemoTitleChange: (value: string) => void;
    onAppDemoDescChange: (value: string) => void;
    onAiSectionIconChange: (value: string) => void;
    onNightVisionIconChange: (value: string) => void;
    onSpecsSectionIconChange: (value: string) => void;
    onGuaranteeIconChange: (value: string) => void;
    onSupportIconChange: (value: string) => void;
    onSpecChange: (index: number, field: "key" | "value", value: string) => void;
}

export default function ProductPreview({
    name,
    model,
    badge,
    subtitle,
    description,
    mainImage,
    nightVisionImg,
    appDemoImg,
    appDemoBadge = "Live Monitoring",
    appDemoTitle = "Total control in the palm of your hand.",
    appDemoDesc = "Receive instant notifications, review recordings, and manage security permissions from our secure enterprise app.",
    aiSectionIcon = "psychology",
    nightVisionIcon = "nightlight_round",
    specsSectionIcon = "settings_suggest",
    guaranteeIcon = "verified_user",
    supportIcon = "support_agent",
    guarantee,
    support,
    aiFeatures,
    resolutionOptions,
    specs,
    categoryName = "",
    categorySlug = "",
    aiSectionTitle = "AI Detection",
    aiSectionDesc = "Deep learning algorithms that classify human and vehicle targets.",
    nightVisionTitle = "EXIR Night Vision",
    nightVisionDesc = "Advanced infrared technology that provides uniform illumination up to 30m.",
    specsTitle = "Pro Specifications",
    specsDesc = "Robust hardware built for professional integrations.",
    onNameChange,
    onModelChange,
    onBadgeChange,
    onSubtitleChange,
    onDescriptionChange,
    onGuaranteeChange,
    onSupportChange,
    onAiSectionTitleChange,
    onAiSectionDescChange,
    onNightVisionTitleChange,
    onNightVisionDescChange,
    onSpecsTitleChange,
    onSpecsDescChange,
    onMainImageChange,
    onNightVisionImageChange,
    onAppDemoImageChange,
    onAppDemoBadgeChange,
    onAppDemoTitleChange,
    onAppDemoDescChange,
    onAiSectionIconChange,
    onNightVisionIconChange,
    onSpecsSectionIconChange,
    onGuaranteeIconChange,
    onSupportIconChange,
    onAiFeaturesChange,
    onSpecChange,
}: ProductPreviewProps) {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [editingSpecIndex, setEditingSpecIndex] = useState<number | null>(null);

    const Editable = ({
        children,
        fieldId,
        className = "",
    }: {
        children: React.ReactNode;
        fieldId: string;
        className?: string;
    }) => (
        <div
            className={`cursor-pointer relative group transition-all duration-200 rounded-lg hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-app-bg ${className}`}
            onClick={(e) => {
                e.stopPropagation();
                setEditingField(fieldId);
            }}
        >
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                <span className="material-symbols-outlined text-[10px] bg-primary text-white rounded-full p-0.5 shadow-lg">
                    edit
                </span>
            </div>
            {children}
        </div>
    );

    const aiFeaturesList = aiFeatures ? aiFeatures.split(",").map(f => f.trim()).filter(Boolean) : [];
    const resolutionOptionsList = resolutionOptions ? resolutionOptions.split(",").map(r => r.trim()).filter(Boolean) : [];
    const normalizeSpecKey = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const getSpecValue = (aliases: string[]) => {
        const match = specs.find((spec) => {
            const key = normalizeSpecKey(spec.key);
            return aliases.some((alias) => key.includes(alias));
        });
        return match?.value || "N/A";
    };

    const protection = getSpecValue(["protec", "ip", "ancho", "banda", "hdd", "disco", "almacen"]);
    const compression = getSpecValue(["compres", "h265", "h264", "megapixel", "megapixeles", "resolucion", "mp"]);
    const lens = getSpecValue(["lente", "mm", "salida", "hdmi", "video"]);
    const power = getSpecValue(["energ", "alimenta", "poe", "volt"]);
    const isNvrProduct = categorySlug.toLowerCase().includes("nvr") || categoryName.toLowerCase().includes("nvr");

    return (
        <>
            <div className="bg-app-bg rounded-2xl border border-app-border shadow-lg overflow-hidden relative">
                {/* Preview Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-app-surface border-b border-app-border">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 mx-4">
                        <div className="bg-app-bg rounded-lg px-3 py-1.5 text-[10px] text-app-text-sec text-center truncate">
                            tecnavision.com/products/{name.toLowerCase().replace(/\s+/g, "-") || "product"}-{model.toLowerCase()}
                        </div>
                    </div>
                    <span className="text-[10px] text-primary font-semibold">Preview</span>
                </div>

                {/* Content - Scrollable */}
                <div className="max-h-[80vh] overflow-y-auto p-6 space-y-12" style={{ transform: "scale(0.85)", transformOrigin: "top left", width: "117.6%" }}>
                    {/* Product Hero */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Product Image */}
                        <div className="relative group">
                            <div className="aspect-square bg-app-surface rounded-3xl overflow-hidden shadow-sm border border-app-border flex items-center justify-center p-8 cursor-pointer transition-all hover:ring-2 hover:ring-primary"
                                onClick={() => setEditingField("mainImage")}
                            >
                                {mainImage ? (
                                    <img
                                        alt={`${name} view`}
                                        className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
                                        src={mainImage}
                                    />
                                ) : (
                                    <div className="text-app-text-sec text-center">
                                        <span className="material-symbols-outlined text-6xl mb-2 block opacity-30">image</span>
                                        <span className="text-sm">No image</span>
                                    </div>
                                )}
                                {/* Edit overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <div className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                        <span className="text-sm font-semibold">Change Image</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex flex-col justify-center space-y-6">
                            {/* Badge */}
                            <Editable fieldId="badge">
                                {badge ? (
                                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
                                        {badge}
                                    </span>
                                ) : (
                                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-app-text-sec uppercase bg-app-bg-subtle rounded-full border border-dashed border-app-border">
                                        + Add Badge
                                    </span>
                                )}
                            </Editable>

                            {/* Name & Model */}
                            <div>
                                <Editable fieldId="name" className="inline">
                                    <h1 className="text-3xl font-bold tracking-tight text-app-text leading-tight inline">
                                        {name || <span className="text-app-text-sec italic">Product name</span>}
                                    </h1>
                                </Editable>
                                {" "}
                                <Editable fieldId="model" className="inline">
                                    <span className="text-3xl font-bold text-primary">
                                        {model || <span className="text-app-text-sec italic">Model</span>}
                                    </span>
                                </Editable>
                                <Editable fieldId="subtitle" className="mt-3">
                                    <p className="text-sm text-app-text-sec">
                                        {subtitle || <span className="italic">Product subtitle...</span>}
                                    </p>
                                </Editable>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-4">
                                <div className="flex text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-icons-outlined text-lg">star</span>
                                    ))}
                                </div>
                                <span className="text-sm font-medium text-app-text-sec">Grade A Security</span>
                            </div>

                            {/* Description */}
                            <Editable fieldId="description">
                                <p className="text-base text-app-text-sec leading-relaxed font-light">
                                    {description || <span className="italic">Description del producto...</span>}
                                </p>
                            </Editable>

                            {/* CTA Buttons */}
                            <div className="space-y-4">
                                <button className="w-full bg-primary text-white text-lg font-semibold py-4 px-8 rounded-2xl shadow-xl">
                                    <span className="material-icons-outlined mr-2">request_quote</span>
                                    Request a Quote
                                </button>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <Editable fieldId="guarantee">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="p-2 bg-primary/10 rounded-lg text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingField("guaranteeIcon");
                                            }}
                                        >
                                            <span className="material-icons-outlined">{guaranteeIcon}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-app-text">Warranty Extendida</p>
                                            <p className="text-xs text-app-text-sec mt-1">{guarantee || "—"}</p>
                                        </div>
                                    </div>
                                </Editable>
                                <Editable fieldId="support">
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="p-2 bg-primary/10 rounded-lg text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingField("supportIcon");
                                            }}
                                        >
                                            <span className="material-icons-outlined">{supportIcon}</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-app-text">Support Dedicado</p>
                                            <p className="text-xs text-app-text-sec mt-1">{support || "—"}</p>
                                        </div>
                                    </div>
                                </Editable>
                            </div>

                            {/* Resolution Options */}
                            {resolutionOptionsList.length > 0 && (
                                <div className="py-4 border-t border-b border-app-border">
                                    <p className="block text-xs font-bold uppercase tracking-wider text-app-text-sec mb-3">Resoluciones Disponibles</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resolutionOptionsList.map((res, i) => (
                                            <span
                                                key={`${res}-${i}`}
                                                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-app-border bg-app-bg-subtle text-app-text-sec"
                                            >
                                                {res}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Technology Features */}
                    <div>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2 text-app-text">{isNvrProduct ? "NVR Performance for Continuous Operation" : "Superior Technology"}</h2>
                            <p className="text-app-text-sec text-sm">
                                {isNvrProduct
                                    ? "Designed for professional monitoring with efficient processing, reliable storage, and fast access to evidence."
                                    : "Designed to operate in the toughest conditions with maximum intelligence."}
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* AI Detection */}
                            <div className="bg-app-surface rounded-3xl p-6 border border-app-border">
                                <div
                                    className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                                    onClick={() => setEditingField("aiSectionIcon")}
                                >
                                    <span className="material-icons-outlined text-2xl">{aiSectionIcon}</span>
                                </div>
                                <Editable fieldId="aiSectionTitle">
                                    <h3 className="text-lg font-bold mb-2 text-app-text">{isNvrProduct ? "Data Intelligence" : aiSectionTitle}</h3>
                                </Editable>
                                <Editable fieldId="aiSectionDesc">
                                    <p className="text-xs text-app-text-sec mb-4 leading-relaxed">
                                        {isNvrProduct
                                            ? "Integrated deep learning analytics engine for object classification, fast event search, and real-time attribute recognition."
                                            : aiSectionDesc}
                                    </p>
                                </Editable>
                                <Editable fieldId="aiFeatures">
                                    <ul className="space-y-2">
                                        {aiFeaturesList.length > 0 ? aiFeaturesList.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm font-medium text-app-text">
                                                <span className="material-icons-outlined text-primary text-base">check</span>
                                                {feature}
                                            </li>
                                        )) : (
                                            <li className="text-sm text-app-text-sec italic">No features defined...</li>
                                        )}
                                    </ul>
                                </Editable>
                            </div>

                            {/* Night Vision */}
                            <div className="bg-app-surface rounded-3xl p-6 border border-app-border flex flex-col">
                                <div
                                    className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                                    onClick={() => setEditingField("nightVisionIcon")}
                                >
                                    <span className="material-icons-outlined text-2xl">{isNvrProduct ? "storage" : nightVisionIcon}</span>
                                </div>
                                <Editable fieldId="nightVisionTitle">
                                    <h3 className="text-lg font-bold mb-2 text-app-text">{isNvrProduct ? "Smart Storage" : nightVisionTitle}</h3>
                                </Editable>
                                <Editable fieldId="nightVisionDesc">
                                    <p className="text-xs text-app-text-sec mb-4 leading-relaxed">
                                        {isNvrProduct
                                            ? "Space optimization with advanced compression that reduces bandwidth and storage use without quality loss."
                                            : nightVisionDesc}
                                    </p>
                                </Editable>
                                {isNvrProduct ? (
                                    <div className="mt-auto rounded-xl overflow-hidden h-24 relative border border-app-border bg-app-bg-subtle">
                                        <img alt="NVR chart" className="w-full h-full object-cover" src="/graficonvr.webp" />
                                    </div>
                                ) : (
                                    <div
                                        className="mt-auto rounded-xl overflow-hidden h-24 relative group cursor-pointer transition-all hover:ring-2 hover:ring-primary"
                                        onClick={() => setEditingField("nightVisionImg")}
                                    >
                                        <img
                                            alt="Night vision sample"
                                            className="w-full h-full object-cover opacity-80"
                                            src={nightVisionImg || mainImage || "/NIGHT.webp"}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <span className="absolute bottom-2 left-2 text-[10px] text-white font-medium px-2 py-0.5 bg-black/50 rounded">Night Mode</span>
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                            <div className="bg-primary text-white px-3 py-1.5 rounded-lg flex items-center gap-2">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                                <span className="text-xs font-semibold">Change image</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Pro Specs */}
                            <div className="bg-app-surface rounded-3xl p-6 border border-app-border">
                                <div
                                    className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 text-primary cursor-pointer hover:bg-primary/20 transition-colors"
                                    onClick={() => setEditingField("specsSectionIcon")}
                                >
                                    <span className="material-icons-outlined text-2xl">{specsSectionIcon}</span>
                                </div>
                                <Editable fieldId="specsTitle">
                                    <h3 className="text-lg font-bold mb-2 text-app-text">{isNvrProduct ? "NVR Specifications" : specsTitle}</h3>
                                </Editable>
                                <Editable fieldId="specsDesc">
                                    <p className="text-xs text-app-text-sec mb-4 leading-relaxed">
                                        {isNvrProduct
                                            ? "Hardware architecture designed for operational continuity and high video availability."
                                            : specsDesc}
                                    </p>
                                </Editable>
                                <div className="grid grid-cols-2 gap-2">
                                    {[
                                        { label: isNvrProduct ? "HDD" : "IP Protection", value: isNvrProduct && protection === "N/A" ? "2x HDD" : protection, index: 0 },
                                        { label: isNvrProduct ? "Megapixels" : "Compression", value: isNvrProduct && compression === "N/A" ? "8 MP" : compression, index: 1 },
                                        { label: isNvrProduct ? "Video Output" : "Lens", value: isNvrProduct && lens === "N/A" ? "4K UHD" : lens, index: 2 },
                                        { label: isNvrProduct ? "PoE" : "Power", value: power, index: 3 },
                                    ].map((spec, i) => (
                                        <div
                                            key={i}
                                            className="bg-app-bg-subtle p-2 rounded-xl border border-app-border cursor-pointer hover:ring-2 hover:ring-primary transition-all relative group"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingSpecIndex(spec.index);
                                            }}
                                        >
                                            <div className="absolute -top-1.5 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                                <span className="material-symbols-outlined text-[10px] bg-primary text-white rounded-full p-0.5 shadow-lg">
                                                    edit
                                                </span>
                                            </div>
                                            <p className="text-[9px] uppercase text-app-text-sec font-bold mb-0.5">{spec.label}</p>
                                            <p className="font-semibold text-primary text-sm">{spec.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile App Showcase */}
                    <section
                        className="relative rounded-[2rem] overflow-hidden bg-gray-900 group cursor-pointer transition-all hover:ring-2 hover:ring-primary"
                        onClick={() => setEditingField("appDemoImg")}
                    >
                        <div className="absolute inset-0">
                            <img
                                alt="Background"
                                className="w-full h-full object-cover opacity-20"
                                src={appDemoImg || "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent"></div>
                        </div>
                        <div className="relative z-10 p-8 md:p-12">
                            <div className={`grid gap-8 items-center ${isNvrProduct ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}>
                                <div className="text-white space-y-6 max-w-lg">
                                    <Editable fieldId="appDemoBadge" className="inline-block">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                                            <span className={`w-2 h-2 rounded-full animate-pulse ${isNvrProduct ? "bg-primary" : "bg-green-400"}`}></span>
                                            <span className="text-xs font-medium tracking-wide">{appDemoBadge || (isNvrProduct ? "CMS Enterprise" : "Live Monitoring")}</span>
                                        </div>
                                    </Editable>
                                    <Editable fieldId="appDemoTitle">
                                        <h2 className="text-2xl md:text-3xl font-bold leading-tight">{appDemoTitle || (isNvrProduct ? "Centralized monitoring 24/7" : "Total control in the palm of your hand.")}</h2>
                                    </Editable>
                                    <Editable fieldId="appDemoDesc">
                                        <p className="text-gray-400 text-sm font-light">
                                            {appDemoDesc || (isNvrProduct
                                                ? "Control all your cameras from a single intuitive interface. Live view, synchronized playback, and efficient alarm management."
                                                : "Receive instant notifications, review recordings, and manage security permissions from our secure enterprise app.")}
                                        </p>
                                    </Editable>
                                </div>
                                {isNvrProduct && (
                                    <div className="flex justify-center lg:justify-end">
                                        <div className="w-full max-w-sm aspect-video bg-gray-800 rounded-xl border-2 border-gray-700 overflow-hidden shadow-2xl">
                                            <img alt="NVR view with cameras" className="w-full h-full object-cover" src="/nvrcamaras.webp" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                            <div className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">edit</span>
                                <span className="text-sm font-semibold">Change background</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div >

            {/* Inline Editors - Outside the overflow container */}
            {
                editingField === "name" && (
                    <InlineEditor value={name} onChange={onNameChange} label="Product Name" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "model" && (
                    <InlineEditor value={model} onChange={onModelChange} label="Model" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "badge" && (
                    <InlineEditor value={badge} onChange={onBadgeChange} label="Badge" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "subtitle" && (
                    <InlineEditor value={subtitle} onChange={onSubtitleChange} label="Subtitle" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "description" && (
                    <InlineEditor value={description} onChange={onDescriptionChange} label="Description" multiline onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "guarantee" && (
                    <InlineEditor value={guarantee} onChange={onGuaranteeChange} label="Warranty" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "support" && (
                    <InlineEditor value={support} onChange={onSupportChange} label="Support" onClose={() => setEditingField(null)} />
                )
            }
            {
                editingField === "aiFeatures" && (
                    <InlineEditor value={aiFeatures} onChange={onAiFeaturesChange} label="AI Features (comma-separated)" multiline onClose={() => setEditingField(null)} />
                )
            }
            {editingField === "mainImage" && (
                <InlineEditor value={mainImage} onChange={onMainImageChange} label="Main Image URL" allowImageUpload onClose={() => setEditingField(null)} />
            )}
            {editingField === "nightVisionImg" && (
                <InlineEditor value={nightVisionImg} onChange={onNightVisionImageChange} label="Night Vision Image URL" allowImageUpload onClose={() => setEditingField(null)} />
            )}
            {editingField === "appDemoImg" && (
                <InlineEditor value={appDemoImg} onChange={onAppDemoImageChange} label="App Background Image URL" allowImageUpload onClose={() => setEditingField(null)} />
            )}
            {editingField === "appDemoBadge" && (
                <InlineEditor value={appDemoBadge} onChange={onAppDemoBadgeChange} label="App Section Badge" onClose={() => setEditingField(null)} />
            )}
            {editingField === "appDemoTitle" && (
                <InlineEditor value={appDemoTitle} onChange={onAppDemoTitleChange} label="App Section Title" multiline onClose={() => setEditingField(null)} />
            )}
            {editingField === "appDemoDesc" && (
                <InlineEditor value={appDemoDesc} onChange={onAppDemoDescChange} label="App Section Description" multiline onClose={() => setEditingField(null)} />
            )}
            {editingField === "aiSectionIcon" && (
                <IconPickerModal value={aiSectionIcon} onChange={onAiSectionIconChange} label="AI Detection Icon" onClose={() => setEditingField(null)} />
            )}
            {editingField === "nightVisionIcon" && (
                <IconPickerModal value={nightVisionIcon} onChange={onNightVisionIconChange} label="Night Vision Icon" onClose={() => setEditingField(null)} />
            )}
            {editingField === "specsSectionIcon" && (
                <IconPickerModal value={specsSectionIcon} onChange={onSpecsSectionIconChange} label="Specifications Icon" onClose={() => setEditingField(null)} />
            )}
            {editingField === "guaranteeIcon" && (
                <IconPickerModal value={guaranteeIcon} onChange={onGuaranteeIconChange} label="Warranty Icon" onClose={() => setEditingField(null)} />
            )}
            {editingField === "supportIcon" && (
                <IconPickerModal value={supportIcon} onChange={onSupportIconChange} label="Support Icon" onClose={() => setEditingField(null)} />
            )}
            {editingField === "aiSectionTitle" && onAiSectionTitleChange && (
                <InlineEditor value={aiSectionTitle} onChange={onAiSectionTitleChange} label="AI Section Title" onClose={() => setEditingField(null)} />
            )}
            {editingField === "aiSectionDesc" && onAiSectionDescChange && (
                <InlineEditor value={aiSectionDesc} onChange={onAiSectionDescChange} label="AI Section Description" multiline onClose={() => setEditingField(null)} />
            )}
            {editingField === "nightVisionTitle" && onNightVisionTitleChange && (
                <InlineEditor value={nightVisionTitle} onChange={onNightVisionTitleChange} label="Night Vision Title" onClose={() => setEditingField(null)} />
            )}
            {editingField === "nightVisionDesc" && onNightVisionDescChange && (
                <InlineEditor value={nightVisionDesc} onChange={onNightVisionDescChange} label="Description Night Vision" multiline onClose={() => setEditingField(null)} />
            )}
            {editingField === "specsTitle" && onSpecsTitleChange && (
                <InlineEditor value={specsTitle} onChange={onSpecsTitleChange} label="Specifications Title" onClose={() => setEditingField(null)} />
            )}
            {editingField === "specsDesc" && onSpecsDescChange && (
                <InlineEditor value={specsDesc} onChange={onSpecsDescChange} label="Specifications Description" multiline onClose={() => setEditingField(null)} />
            )}
            {
                editingSpecIndex !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setEditingSpecIndex(null)}>
                        <div className="bg-app-surface rounded-2xl shadow-2xl p-6 w-full max-w-md border border-primary" onClick={(e) => e.stopPropagation()}>
                            <label className="text-sm font-bold text-primary uppercase tracking-wider mb-3 block">Edit Specification</label>
                            <input
                                type="text"
                                placeholder="Feature"
                                value={specs[editingSpecIndex]?.key || ""}
                                onChange={(e) => onSpecChange(editingSpecIndex, "key", e.target.value)}
                                className="w-full p-3 text-sm border border-app-border rounded-xl bg-app-bg mb-3"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={specs[editingSpecIndex]?.value || ""}
                                onChange={(e) => onSpecChange(editingSpecIndex, "value", e.target.value)}
                                className="w-full p-3 text-sm border border-app-border rounded-xl bg-app-bg"
                            />
                            <button
                                type="button"
                                onClick={() => setEditingSpecIndex(null)}
                                className="w-full mt-4 px-4 py-2.5 text-sm font-bold bg-primary text-white rounded-xl"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )
            }
        </>
    );
}



