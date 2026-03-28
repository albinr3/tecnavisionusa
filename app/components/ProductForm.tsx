"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Category, Product, ProductVariant } from "@prisma/client";
import { toast } from "sonner";
import ProductPreview from "@/app/admin/components/ProductPreview";

// Extend Product type to include variants
type ProductWithVariants = Product & {
    variants?: ProductVariant[];
};

interface ProductFormProps {
    categories: Category[];
    initialData?: ProductWithVariants;
}

const CAMERA_SPEC_TEMPLATE = [
    { key: "Protección IP", value: "" },
    { key: "Compresión de Video", value: "" },
    { key: "Lente", value: "" },
    { key: "Alimentación / PoE", value: "" },
];

const NVR_SPEC_TEMPLATE = [
    { key: "HDD", value: "" },
    { key: "Megapixeles", value: "" },
    { key: "Salida de Video", value: "" },
    { key: "PoE", value: "" },
];

const CAMERA_NIGHT_VISION_DEFAULT = "/NIGHT.webp";
const NVR_NIGHT_VISION_DEFAULT = "/graficonvr.webp";

export default function ProductForm({ categories, initialData }: ProductFormProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [draggingZone, setDraggingZone] = useState<"main" | "night" | "app" | null>(null);
    const mainImageInputRef = useRef<HTMLInputElement>(null);
    const nightVisionImageInputRef = useRef<HTMLInputElement>(null);
    const appDemoImageInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [name, setName] = useState(initialData?.name || "");
    const [model, setModel] = useState(initialData?.model || "");
    const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [badge, setBadge] = useState(initialData?.badge || "");
    const [category, setCategory] = useState(initialData?.categoryId || "");
    const [mainImage, setMainImage] = useState(initialData?.mainImage || "");
    const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.galleryImages || []);
    const [nightVisionImg, setNightVisionImg] = useState(initialData?.nightVisionImg || CAMERA_NIGHT_VISION_DEFAULT);
    const [appDemoImg, setAppDemoImg] = useState(initialData?.appDemoImg || "");
    const [appDemoBadge, setAppDemoBadge] = useState(initialData?.appDemoBadge || "Live Monitoring");
    const [appDemoTitle, setAppDemoTitle] = useState(initialData?.appDemoTitle || "Control total en la palma de tu mano.");
    const [appDemoDesc, setAppDemoDesc] = useState(initialData?.appDemoDesc || "Recibe notificaciones instantáneas, verifica grabaciones y gestiona permisos de seguridad desde nuestra app empresarial segura.");
    const [aiSectionIcon, setAiSectionIcon] = useState(initialData?.aiSectionIcon || "psychology");
    const [nightVisionIcon, setNightVisionIcon] = useState(initialData?.nightVisionIcon || "nightlight_round");
    const [specsSectionIcon, setSpecsSectionIcon] = useState(initialData?.specsSectionIcon || "settings_suggest");
    const [guaranteeIcon, setGuaranteeIcon] = useState(initialData?.guaranteeIcon || "verified_user");
    const [supportIcon, setSupportIcon] = useState(initialData?.supportIcon || "support_agent");

    // Specs
    const [specs, setSpecs] = useState([
        { key: "Protección IP", value: initialData?.protection || "" },
        { key: "Compresión de Video", value: initialData?.compression || "" },
        { key: "Lente", value: initialData?.lens || "" },
        { key: "Alimentación / PoE", value: initialData?.power || "" },
    ]);
    const [resolutionOptions, setResolutionOptions] = useState(initialData?.resolutionOpts?.join(", ") || "4 Megapixel, 6 Megapixel, 8 MP (4K Ultra)");

    // Features
    const [aiFeatures, setAiFeatures] = useState(initialData?.aiDetection?.join(", ") || "Cruce de línea, Intrusión de área, Reconocimiento facial");
    const [guarantee, setGuarantee] = useState(initialData?.guarantee || "3 años de cobertura");
    const [support, setSupport] = useState(initialData?.support || "Línea directa B2B");

    // Variants
    const [variants, setVariants] = useState<Partial<ProductVariant>[]>(initialData?.variants || []);
    const selectedCategory = categories.find((cat) => cat.id === category);
    const isNvrCategory = (selectedCategory?.slug || "").toLowerCase().includes("nvr")
        || (selectedCategory?.name || "").toLowerCase().includes("nvr");
    const defaultNightVisionImg = isNvrCategory ? NVR_NIGHT_VISION_DEFAULT : CAMERA_NIGHT_VISION_DEFAULT;

    const normalizeNightVisionForCategory = (value: string) => {
        if (!value) return "";
        if (isNvrCategory && value === CAMERA_NIGHT_VISION_DEFAULT) return NVR_NIGHT_VISION_DEFAULT;
        if (!isNvrCategory && value === NVR_NIGHT_VISION_DEFAULT) return CAMERA_NIGHT_VISION_DEFAULT;
        return value;
    };

    const handleSpecChange = (index: number, field: "key" | "value", value: string) => {
        const updated = [...specs];
        updated[index][field] = value;
        setSpecs(updated);
    };

    const normalizeSpecKey = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    useEffect(() => {
        const template = isNvrCategory ? NVR_SPEC_TEMPLATE : CAMERA_SPEC_TEMPLATE;
        setSpecs((prev) => {
            const cameraTemplateKeys = CAMERA_SPEC_TEMPLATE.map((item) => normalizeSpecKey(item.key));
            const nvrTemplateKeys = NVR_SPEC_TEMPLATE.map((item) => normalizeSpecKey(item.key));
            const prevKeys = prev.map((item) => normalizeSpecKey(item.key));
            const matchesKnownTemplate =
                prevKeys.length === cameraTemplateKeys.length
                && (prevKeys.every((key, idx) => key === cameraTemplateKeys[idx])
                    || prevKeys.every((key, idx) => key === nvrTemplateKeys[idx]));

            // Si el usuario personalizó nombres de campos, no sobrescribimos.
            if (!matchesKnownTemplate) {
                return prev;
            }

            const findValue = (aliases: string[]) => {
                const found = prev.find((item) => {
                    const key = normalizeSpecKey(item.key);
                    return aliases.some((alias) => key.includes(alias));
                });
                return found?.value || "";
            };

            const mappedValues = isNvrCategory
                ? [
                    findValue(["hdd", "disco", "almacen", "protec", "ip"]),
                    findValue(["megapixel", "megapixeles", "resolucion", "mp", "compres"]),
                    findValue(["salida", "video", "hdmi", "lente", "mm"]),
                    findValue(["poe", "energ", "alimenta", "volt"]),
                ]
                : [
                    findValue(["protec", "ip", "hdd", "disco", "almacen"]),
                    findValue(["compres", "h265", "h264", "megapixel", "megapixeles", "resolucion", "mp"]),
                    findValue(["lente", "mm", "salida", "video", "hdmi"]),
                    findValue(["energ", "alimenta", "poe", "volt"]),
                ];

            return template.map((item, idx) => ({
                key: item.key,
                value: mappedValues[idx] || "",
            }));
        });
    }, [isNvrCategory]);

    useEffect(() => {
        setNightVisionImg((prev) => {
            if (!prev) return defaultNightVisionImg;
            if (isNvrCategory && prev === CAMERA_NIGHT_VISION_DEFAULT) return NVR_NIGHT_VISION_DEFAULT;
            if (!isNvrCategory && prev === NVR_NIGHT_VISION_DEFAULT) return CAMERA_NIGHT_VISION_DEFAULT;
            return prev;
        });
    }, [defaultNightVisionImg, isNvrCategory]);

    const getSpecValue = (aliases: string[]) => {
        const match = specs.find((spec) => {
            const key = normalizeSpecKey(spec.key);
            return aliases.some((alias) => key.includes(alias));
        });
        return match?.value || null;
    };

    const getSpecValuePlaceholder = (key: string) => {
        const normalizedKey = normalizeSpecKey(key);
        if (normalizedKey.includes("hdd") || normalizedKey.includes("disco") || normalizedKey.includes("almacen")) return "Ej. 2x HDD hasta 10TB";
        if (normalizedKey.includes("megapixel") || normalizedKey.includes("resolucion") || normalizedKey === "mp") return "Ej. 8 MP";
        if (normalizedKey.includes("canales")) return "Ej. 16 canales IP";
        if (normalizedKey.includes("salida") || normalizedKey.includes("video") || normalizedKey.includes("hdmi")) return "Ej. HDMI 4K";
        if (normalizedKey.includes("protec") || normalizedKey.includes("ip")) return "Ej. IP67 / IK10";
        if (normalizedKey.includes("compres")) return "Ej. H.265+ / H.264+";
        if (normalizedKey.includes("lente")) return "Ej. 2.8 mm";
        if (normalizedKey.includes("energ") || normalizedKey.includes("alimenta") || normalizedKey.includes("poe")) return "Ej. 12VDC / PoE";
        if (normalizedKey.includes("sensor")) return "Ej. 1/2.7\" CMOS";
        if (normalizedKey.includes("ir") || normalizedKey.includes("noct")) return "Ej. 30 m";
        if (normalizedKey.includes("fps")) return "Ej. 30 fps";
        return "Ej. Valor técnico";
    };

    const addSpec = () => {
        setSpecs([...specs, { key: "", value: "" }]);
    };

    const removeSpec = (index: number) => {
        setSpecs(specs.filter((_, i) => i !== index));
    };

    // Variants Handlers
    const addVariant = () => {
        setVariants([...variants, { name: "", description: "", manual: "", datasheet: "" }]);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: string) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const uploadImageFile = async (
        file: File,
        onUploaded: (value: string) => void,
        successMessage: string
    ) => {
        setIsUploading(true);
        const loadingToast = toast.loading("Subiendo imagen...");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error al subir la imagen");
            }

            const data = await res.json();
            onUploaded(data.url);
            toast.success(successMessage);
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error al subir la imagen");
        } finally {
            setIsUploading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleFileUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        onUploaded: (value: string) => void,
        successMessage: string
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;
        await uploadImageFile(file, onUploaded, successMessage);
        e.target.value = "";
    };

    const handleMainMultipleUpload = async (files: FileList | File[]) => {
        const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
        if (imageFiles.length === 0) {
            toast.error("Selecciona archivos de imagen válidos.");
            return;
        }

        setIsUploading(true);
        const loadingToast = toast.loading(`Subiendo ${imageFiles.length} imagen(es)...`);

        try {
            const uploadedUrls: string[] = [];

            for (const file of imageFiles) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || "Error al subir una imagen");
                }
                const data = await res.json();
                uploadedUrls.push(data.url);
            }

            if (uploadedUrls.length > 0) {
                if (!mainImage) {
                    setMainImage(uploadedUrls[0]);
                    setGalleryImages((prev: string[]) => Array.from(new Set([...prev, ...uploadedUrls.slice(1)])));
                } else {
                    setGalleryImages((prev: string[]) => Array.from(new Set([...prev, ...uploadedUrls])));
                }
            }

            toast.success(`${uploadedUrls.length} imagen(es) subidas con éxito`);
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error al subir imágenes");
        } finally {
            setIsUploading(false);
            toast.dismiss(loadingToast);
        }
    };

    const handleMainSingleUpload = async (file: File) => {
        await uploadImageFile(
            file,
            (uploadedUrl) => {
                if (!mainImage) {
                    setMainImage(uploadedUrl);
                    return;
                }
                if (uploadedUrl !== mainImage) {
                    setGalleryImages((prev: string[]) => Array.from(new Set([...prev, uploadedUrl])));
                }
            },
            "Imagen subida con éxito"
        );
    };

    const makeImagePrimary = (nextMain: string) => {
        if (!nextMain || nextMain === mainImage) return;
        const previousMain = mainImage;
        setMainImage(nextMain);
        setGalleryImages((prev: string[]) =>
            Array.from(
                new Set(
                    prev
                        .filter((item: string) => item !== nextMain)
                        .concat(previousMain ? [previousMain] : [])
                )
            )
        );
    };

    const handleImageDrop = async (
        e: React.DragEvent<HTMLDivElement>,
        zone: "main" | "night" | "app",
        onUploaded: (value: string) => void,
        successMessage: string
    ) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggingZone((current) => (current === zone ? null : current));
        if (zone === "main" && e.dataTransfer.files?.length > 1) {
            await handleMainMultipleUpload(e.dataTransfer.files);
            return;
        }

        const file = e.dataTransfer.files?.[0];
        if (!file || !file.type.startsWith("image/")) {
            toast.error("Suelta un archivo de imagen válido.");
            return;
        }
        if (zone === "main") {
            await handleMainSingleUpload(file);
            return;
        }
        await uploadImageFile(file, onUploaded, successMessage);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !model) {
            const msg = "Por favor completa el nombre y modelo del producto.";
            setError(msg);
            toast.warning(msg);
            return;
        }

        setIsSubmitting(true);
        setError(null);
        const loadingToast = toast.loading(initialData ? "Actualizando producto..." : "Creando producto...");

        try {
            const url = initialData ? `/api/products/${initialData.slug}` : "/api/products";
            const method = initialData ? "PUT" : "POST";
            const normalizedNightVisionImg = normalizeNightVisionForCategory(nightVisionImg);

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    model,
                    subtitle,
                    description,
                    badge: badge || null,
                    mainImage: mainImage || null,
                    galleryImages,
                    nightVisionImg: normalizedNightVisionImg || null,
                    appDemoImg: appDemoImg || null,
                    appDemoBadge: appDemoBadge || null,
                    appDemoTitle: appDemoTitle || null,
                    appDemoDesc: appDemoDesc || null,
                    aiSectionIcon: aiSectionIcon || null,
                    nightVisionIcon: nightVisionIcon || null,
                    specsSectionIcon: specsSectionIcon || null,
                    guaranteeIcon: guaranteeIcon || null,
                    supportIcon: supportIcon || null,
                    categoryId: category || null,
                    protection: getSpecValue(["protec", "ip", "ancho", "banda", "hdd", "disco", "almacen"]),
                    compression: getSpecValue(["compres", "h265", "h264", "megapixel", "megapixeles", "resolucion", "mp"]),
                    lens: getSpecValue(["lente", "mm", "salida", "hdmi", "video"]),
                    power: getSpecValue(["energ", "alimenta", "poe", "volt"]),
                    resolutionOpts: resolutionOptions.split(",").map(r => r.trim()).filter(Boolean),
                    aiDetection: aiFeatures.split(",").map(f => f.trim()).filter(Boolean),
                    guarantee,
                    support,
                    variants // Include variants in payload
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to save product");
            }

            toast.dismiss(loadingToast);
            toast.success(initialData ? "¡Producto actualizado!" : "¡Producto creado exitosamente!");
            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            toast.dismiss(loadingToast);
            const msg = err instanceof Error ? err.message : "Error al guardar el producto";
            setError(msg);
            toast.error(msg);
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col xl:flex-row gap-6">
            {/* Toggle Preview Button (visible on smaller screens) */}
            <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="xl:hidden flex items-center justify-center gap-2 h-10 px-4 rounded-lg border border-app-border bg-app-surface text-app-text text-sm font-semibold hover:bg-app-bg-subtle transition-colors mb-2"
            >
                <span className="material-symbols-outlined text-lg">{showPreview ? "visibility_off" : "visibility"}</span>
                {showPreview ? "Ocultar Vista Previa" : "Mostrar Vista Previa"}
            </button>

            {/* Form Column */}
            <form id="product-form" onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6 min-w-0">
                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
                        <span className="material-symbols-outlined text-red-500">error</span>
                        <p className="text-red-700 text-sm">{error}</p>
                    </div>
                )}

                {/* Section: Main Image (moved to top) */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">imagesmode</span>
                        Imagen Principal
                    </h3>
                    <div
                        className={`rounded-xl border bg-app-bg-subtle p-4 transition-colors ${draggingZone === "main" ? "border-primary border-dashed bg-primary/5" : "border-app-border"}`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDraggingZone("main");
                        }}
                        onDragLeave={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDraggingZone((current) => (current === "main" ? null : current));
                        }}
                        onDrop={(e) => handleImageDrop(e, "main", setMainImage, "Imagen principal subida con éxito")}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div className="rounded-lg overflow-hidden border border-app-border bg-app-surface relative h-40 md:h-52">
                                {mainImage ? (
                                    <img src={mainImage} alt="Imagen principal" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-app-text-sec text-sm">
                                        Sin imagen principal
                                    </div>
                                )}
                                {mainImage && (
                                    <button
                                        type="button"
                                        onClick={() => setMainImage("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Eliminar imagen principal"
                                        title="Eliminar imagen principal"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                )}
                            </div>
                            <div>
                                <label className="flex flex-col gap-2">
                                    <span className="text-xs font-medium text-app-text-sec">URL</span>
                                    <input
                                        type="text"
                                        value={mainImage}
                                        onChange={(e) => setMainImage(e.target.value)}
                                        className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={() => mainImageInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="mt-3 w-full flex h-10 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors disabled:opacity-50"
                                >
                                    <span className="material-symbols-outlined text-[18px]">upload</span>
                                    {isUploading ? "Subiendo..." : "Subir imagen(es)"}
                                </button>
                                <p className="mt-2 text-[11px] text-app-text-sec">Puedes subir o arrastrar varias imágenes aquí.</p>
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={mainImageInputRef}
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 1) {
                                    void handleMainMultipleUpload(e.target.files);
                                } else if (e.target.files?.[0]) {
                                    void handleMainSingleUpload(e.target.files[0]);
                                }
                                e.target.value = "";
                            }}
                            accept="image/*"
                            multiple
                            className="hidden"
                        />
                        {galleryImages.length > 0 && (
                            <div className="mt-3">
                                <p className="text-xs font-semibold text-app-text mb-2">Galería ({galleryImages.length})</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {galleryImages.map((img: string, index: number) => (
                                        <div key={`${img}-${index}`} className="relative rounded-lg overflow-hidden border border-app-border bg-app-surface">
                                            <img src={img} alt={`Galería ${index + 1}`} className="w-full h-20 object-cover" />
                                            <div className="absolute inset-x-0 bottom-0 p-1 bg-black/50 flex gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => makeImagePrimary(img)}
                                                    className="flex-1 text-[10px] font-semibold text-white bg-primary/80 rounded px-1 py-0.5"
                                                >
                                                    Hacer principal
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setGalleryImages((prev: string[]) => prev.filter((item: string) => item !== img))}
                                                    className="text-[10px] font-semibold text-white bg-red-500/80 rounded px-1 py-0.5"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-2 text-[11px] text-app-text-sec">
                                    Puedes cambiar la imagen principal en cualquier momento con el botón <span className="font-semibold">Hacer principal</span>.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section 1: General Info */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        Información General
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">
                                Nombre del Producto <span className="text-red-500">*</span>
                            </span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Ej. Bullet Cam"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">
                                Modelo <span className="text-red-500">*</span>
                            </span>
                            <input
                                type="text"
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Ej. Pro AI"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Badge (Opcional)</span>
                            <input
                                type="text"
                                value={badge}
                                onChange={(e) => setBadge(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Ej. Enterprise Series, Best Seller"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Categoría</span>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 appearance-none"
                                >
                                    <option value="">Seleccionar categoría...</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#645e8d]">
                                    <span className="material-symbols-outlined text-lg">expand_more</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Section 2: Description */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Descripción
                    </h3>
                    <label className="flex flex-col gap-2 mb-4">
                        <span className="text-sm font-medium text-app-text">Subtítulo</span>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                            placeholder="Ej. Vigilancia de última generación para entornos exigentes."
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">Descripción Completa</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-32 p-4 text-sm text-app-text border border-app-border rounded-lg focus:border-primary focus:ring-0 resize-y outline-none placeholder:text-app-text-sec/70"
                            placeholder="Escribe una descripción detallada del producto aquí..."
                        />
                    </label>
                </div>

                {/* Section 3: Specs & Features */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Specs */}
                    <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-app-text flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary">memory</span>
                                Especificaciones
                            </h3>
                            <button
                                type="button"
                                onClick={addSpec}
                                className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                            >
                                <span className="material-symbols-outlined text-sm">add</span> Añadir
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {specs.map((spec, index) => (
                                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                                    <input
                                        type="text"
                                        value={spec.key}
                                        onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                                        className="w-full sm:w-1/3 rounded-lg border border-app-border bg-app-bg-subtle h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                        placeholder="Ej. Protección IP, Sensor, IR"
                                    />
                                    <input
                                        type="text"
                                        value={spec.value}
                                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                                        className="w-full sm:flex-1 rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                        placeholder={getSpecValuePlaceholder(spec.key)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpec(index)}
                                        className="self-end sm:self-auto p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <p className="mt-3 text-xs text-app-text-sec">
                            {isNvrCategory
                                ? "Sugerencia para NVR: HDD, Megapixeles, Salida de Video y PoE."
                                : "Sugerencia para cámaras: Protección IP, Compresión (H.265+), Lente (mm), Alimentación (PoE), Sensor, IR, WDR y FPS."}
                        </p>
                        <label className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-medium text-app-text">Opciones de Resolución (separadas por coma)</span>
                            <input
                                type="text"
                                value={resolutionOptions}
                                onChange={(e) => setResolutionOptions(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                placeholder="4 Megapixel, 6 Megapixel, 8 MP (4K Ultra)"
                            />
                        </label>
                    </div>

                    {/* Features */}
                    <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                        <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">tune</span>
                            Características
                        </h3>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Funciones IA (separadas por coma)</span>
                                <input
                                    type="text"
                                    value={aiFeatures}
                                    onChange={(e) => setAiFeatures(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Cruce de línea, Intrusión de área"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Garantía</span>
                                <input
                                    type="text"
                                    value={guarantee}
                                    onChange={(e) => setGuarantee(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="3 años de cobertura"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Soporte</span>
                                <input
                                    type="text"
                                    value={support}
                                    onChange={(e) => setSupport(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Línea directa B2B"
                                />
                            </label>
                        </div>
                    </div>
                </div>

                {/* Section 4: Variants (New) */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-lg font-bold text-app-text flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">style</span>
                            Variantes del Producto
                        </h3>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">add</span> Añadir Variante
                        </button>
                    </div>
                    {variants.length === 0 ? (
                        <p className="text-sm text-app-text-sec italic text-center py-4 bg-app-bg-subtle rounded-lg">
                            No hay variantes definidas. Se usará la configuración base del producto.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {variants.map((variant, index) => (
                                <div key={index} className="border border-app-border rounded-lg p-4 bg-app-bg-subtle relative">
                                    <button
                                        type="button"
                                        onClick={() => removeVariant(index)}
                                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 rounded-full hover:bg-app-surface transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                    </button>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">Nombre (ej. 4MP)</span>
                                            <input
                                                type="text"
                                                value={variant.name || ""}
                                                onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="Nombre de la variante"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">Descripción Corta</span>
                                            <input
                                                type="text"
                                                value={variant.description || ""}
                                                onChange={(e) => handleVariantChange(index, "description", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="Detalle diferencial"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">URL Manual (Opcional)</span>
                                            <input
                                                type="text"
                                                value={variant.manual || ""}
                                                onChange={(e) => handleVariantChange(index, "manual", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="https://..."
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">URL Datasheet (Opcional)</span>
                                            <input
                                                type="text"
                                                value={variant.datasheet || ""}
                                                onChange={(e) => handleVariantChange(index, "datasheet", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="https://..."
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section 5: Images */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">imagesmode</span>
                        Imágenes del Producto
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div
                            className={`rounded-xl border bg-app-bg-subtle p-4 transition-colors ${draggingZone === "night" ? "border-primary border-dashed bg-primary/5" : "border-app-border"}`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDraggingZone("night");
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDraggingZone((current) => (current === "night" ? null : current));
                            }}
                            onDrop={(e) => handleImageDrop(e, "night", setNightVisionImg, "Imagen de visión nocturna subida con éxito")}
                        >
                            <h4 className="text-sm font-semibold text-app-text mb-3">Vista Nocturna</h4>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-medium text-app-text-sec">URL</span>
                                <input
                                    type="text"
                                    value={nightVisionImg}
                                    onChange={(e) => setNightVisionImg(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                    placeholder="https://example.com/night-vision.jpg"
                                />
                            </label>
                            <input
                                type="file"
                                ref={nightVisionImageInputRef}
                                onChange={(e) => handleFileUpload(e, setNightVisionImg, "Imagen de visión nocturna subida con éxito")}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => nightVisionImageInputRef.current?.click()}
                                disabled={isUploading}
                                className="mt-3 w-full flex h-10 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[18px]">upload</span>
                                {isUploading ? "Subiendo..." : "Subir imagen"}
                            </button>
                            <p className="mt-2 text-[11px] text-app-text-sec">También puedes arrastrar y soltar una imagen aquí.</p>
                            {(normalizeNightVisionForCategory(nightVisionImg) || mainImage || defaultNightVisionImg) && (
                                <div className="mt-3 h-28 rounded-lg overflow-hidden border border-app-border bg-app-surface relative">
                                    <img
                                        src={normalizeNightVisionForCategory(nightVisionImg) || mainImage || defaultNightVisionImg}
                                        alt="Imagen de visión nocturna"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNightVisionImg("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Eliminar imagen de visión nocturna"
                                        title="Eliminar imagen de visión nocturna"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div
                            className={`rounded-xl border bg-app-bg-subtle p-4 transition-colors ${draggingZone === "app" ? "border-primary border-dashed bg-primary/5" : "border-app-border"}`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDraggingZone("app");
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDraggingZone((current) => (current === "app" ? null : current));
                            }}
                            onDrop={(e) => handleImageDrop(e, "app", setAppDemoImg, "Imagen de fondo de app subida con éxito")}
                        >
                            <h4 className="text-sm font-semibold text-app-text mb-3">Fondo Sección App</h4>
                            <label className="flex flex-col gap-2">
                                <span className="text-xs font-medium text-app-text-sec">URL</span>
                                <input
                                    type="text"
                                    value={appDemoImg}
                                    onChange={(e) => setAppDemoImg(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                    placeholder="https://example.com/app-bg.jpg"
                                />
                            </label>
                            <input
                                type="file"
                                ref={appDemoImageInputRef}
                                onChange={(e) => handleFileUpload(e, setAppDemoImg, "Imagen de fondo de app subida con éxito")}
                                accept="image/*"
                                className="hidden"
                            />
                            <button
                                type="button"
                                onClick={() => appDemoImageInputRef.current?.click()}
                                disabled={isUploading}
                                className="mt-3 w-full flex h-10 items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 text-primary text-sm font-bold hover:bg-primary/10 transition-colors disabled:opacity-50"
                            >
                                <span className="material-symbols-outlined text-[18px]">upload</span>
                                {isUploading ? "Subiendo..." : "Subir imagen"}
                            </button>
                            <p className="mt-2 text-[11px] text-app-text-sec">También puedes arrastrar y soltar una imagen aquí.</p>
                            {appDemoImg && (
                                <div className="mt-3 h-28 rounded-lg overflow-hidden border border-app-border bg-app-surface relative">
                                    <img src={appDemoImg} alt="Imagen de fondo para app" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setAppDemoImg("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Eliminar imagen de fondo app"
                                        title="Eliminar imagen de fondo app"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                </div>
                            )}
                            <div className="mt-3 space-y-2">
                                <input
                                    type="text"
                                    value={appDemoBadge}
                                    onChange={(e) => setAppDemoBadge(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-9 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Badge (ej. Live Monitoring)"
                                />
                                <input
                                    type="text"
                                    value={appDemoTitle}
                                    onChange={(e) => setAppDemoTitle(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-9 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Título de la sección app"
                                />
                                <textarea
                                    value={appDemoDesc}
                                    onChange={(e) => setAppDemoDesc(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface min-h-20 px-3 py-2 text-sm text-app-text focus:border-primary focus:ring-0 resize-y"
                                    placeholder="Descripción corta de la sección app"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Submit */}
                <div className="md:hidden flex flex-col gap-3 pt-4 pb-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex w-full h-12 items-center justify-center rounded-lg bg-primary text-white font-bold shadow-sm disabled:opacity-50"
                    >
                        {isSubmitting ? "Guardando..." : (initialData ? "Guardar Cambios" : "Publicar Producto")}
                    </button>
                    <Link
                        href="/admin/products"
                        className="flex w-full h-12 items-center justify-center rounded-lg border border-app-border bg-app-surface text-app-text font-bold"
                    >
                        Descartar
                    </Link>
                </div>
            </form>

            {/* Preview Column */}
            <div className={`xl:w-[600px] xl:shrink-0 xl:sticky xl:top-4 xl:self-start ${showPreview ? "block" : "hidden xl:block"}`}>
                <ProductPreview
                    name={name}
                    model={model}
                    badge={badge}
                    subtitle={subtitle}
                    description={description}
                    mainImage={mainImage}
                    nightVisionImg={nightVisionImg}
                    appDemoImg={appDemoImg}
                    appDemoBadge={appDemoBadge}
                    appDemoTitle={appDemoTitle}
                    appDemoDesc={appDemoDesc}
                    aiSectionIcon={aiSectionIcon}
                    nightVisionIcon={nightVisionIcon}
                    specsSectionIcon={specsSectionIcon}
                    guaranteeIcon={guaranteeIcon}
                    supportIcon={supportIcon}
                    guarantee={guarantee}
                    support={support}
                    aiFeatures={aiFeatures}
                    resolutionOptions={resolutionOptions}
                    specs={specs}
                    categoryName={selectedCategory?.name || ""}
                    categorySlug={selectedCategory?.slug || ""}
                    onNameChange={setName}
                    onModelChange={setModel}
                    onBadgeChange={setBadge}
                    onSubtitleChange={setSubtitle}
                    onDescriptionChange={setDescription}
                    onGuaranteeChange={setGuarantee}
                    onSupportChange={setSupport}
                    onAiFeaturesChange={setAiFeatures}
                    onMainImageChange={setMainImage}
                    onNightVisionImageChange={setNightVisionImg}
                    onAppDemoImageChange={setAppDemoImg}
                    onAppDemoBadgeChange={setAppDemoBadge}
                    onAppDemoTitleChange={setAppDemoTitle}
                    onAppDemoDescChange={setAppDemoDesc}
                    onAiSectionIconChange={setAiSectionIcon}
                    onNightVisionIconChange={setNightVisionIcon}
                    onSpecsSectionIconChange={setSpecsSectionIcon}
                    onGuaranteeIconChange={setGuaranteeIcon}
                    onSupportIconChange={setSupportIcon}
                    onSpecChange={handleSpecChange}
                />
            </div>
        </div>
    );
}
