"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Product, ProductVariant } from "@prisma/client";
import { toast } from "sonner";
import ProductPreview from "@/app/admin/components/ProductPreview";

// Extend Product type to include variants
type ProductWithVariants = Product & {
    variants?: ProductVariant[];
};

type ProductCategoryOption = {
    id: string;
    name: string;
    slug: string;
};

interface ProductFormProps {
    categories: ProductCategoryOption[];
    initialData?: ProductWithVariants;
}

const CAMERA_SPEC_TEMPLATE = [
    { key: "IP Protection", value: "" },
    { key: "Video Compression", value: "" },
    { key: "Lens", value: "" },
    { key: "Power / PoE", value: "" },
];

const NVR_SPEC_TEMPLATE = [
    { key: "HDD", value: "" },
    { key: "Megapixels", value: "" },
    { key: "Video Output", value: "" },
    { key: "PoE", value: "" },
];

const CAMERA_NIGHT_VISION_DEFAULT = "/NIGHT.webp";
const NVR_NIGHT_VISION_DEFAULT = "/graficonvr.webp";
const MARKET_OPTIONS = [
    { code: "RD", label: "Dominican Republic (RD)" },
    { code: "US", label: "United States (US)" },
] as const;

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
    const [subtitleEs, setSubtitleEs] = useState(initialData?.subtitle_es || initialData?.subtitle || "");
    const [subtitleEn, setSubtitleEn] = useState(initialData?.subtitle_en || initialData?.subtitle || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [titleEs, setTitleEs] = useState(initialData?.title_es || "");
    const [titleEn, setTitleEn] = useState(initialData?.title_en || "");
    const [descriptionEs, setDescriptionEs] = useState(initialData?.description_es || "");
    const [descriptionEn, setDescriptionEn] = useState(initialData?.description_en || "");
    const [availableMarkets, setAvailableMarkets] = useState<string[]>(
        initialData?.availableMarkets?.length
            ? initialData.availableMarkets
            : ["RD", "US"]
    );
    const [badge, setBadge] = useState(initialData?.badge || "");
    const [category, setCategory] = useState(initialData?.categoryId || "");
    const [mainImage, setMainImage] = useState(initialData?.mainImage || "");
    const [galleryImages, setGalleryImages] = useState<string[]>(initialData?.galleryImages || []);
    const [nightVisionImg, setNightVisionImg] = useState(initialData?.nightVisionImg || CAMERA_NIGHT_VISION_DEFAULT);
    const [appDemoImg, setAppDemoImg] = useState(initialData?.appDemoImg || "");
    const [appDemoBadge, setAppDemoBadge] = useState(initialData?.appDemoBadge || "Live Monitoring");
    const [appDemoTitle, setAppDemoTitle] = useState(initialData?.appDemoTitle || "Total control in the palm of your hand.");
    const [appDemoDesc, setAppDemoDesc] = useState(initialData?.appDemoDesc || "Receive instant notifications, review recordings, and manage security permissions from our secure enterprise app.");
    const [aiSectionIcon, setAiSectionIcon] = useState(initialData?.aiSectionIcon || "psychology");
    const [nightVisionIcon, setNightVisionIcon] = useState(initialData?.nightVisionIcon || "nightlight_round");
    const [specsSectionIcon, setSpecsSectionIcon] = useState(initialData?.specsSectionIcon || "settings_suggest");
    const [guaranteeIcon, setGuaranteeIcon] = useState(initialData?.guaranteeIcon || "verified_user");
    const [supportIcon, setSupportIcon] = useState(initialData?.supportIcon || "support_agent");

    // Specs
    const [specs, setSpecs] = useState([
        { key: "IP Protection", value: initialData?.protection || "" },
        { key: "Video Compression", value: initialData?.compression || "" },
        { key: "Lens", value: initialData?.lens || "" },
        { key: "Power / PoE", value: initialData?.power || "" },
    ]);
    const [resolutionOptions, setResolutionOptions] = useState(initialData?.resolutionOpts?.join(", ") || "4 Megapixel, 6 Megapixel, 8 MP (4K Ultra)");

    // Features
    const [aiFeatures, setAiFeatures] = useState(initialData?.aiDetection?.join(", ") || "Line crossing, Area intrusion, Facial recognition");
    const [guarantee, setGuarantee] = useState(initialData?.guarantee || "3 years of coverage");
    const [support, setSupport] = useState(initialData?.support || "Dedicated B2B hotline");

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

            // If the user customized field names, do not overwrite them.
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
        if (normalizedKey.includes("hdd") || normalizedKey.includes("disco") || normalizedKey.includes("almacen")) return "e.g. 2x HDD hasta 10TB";
        if (normalizedKey.includes("megapixel") || normalizedKey.includes("resolucion") || normalizedKey === "mp") return "e.g. 8 MP";
        if (normalizedKey.includes("canales")) return "e.g. 16 canales IP";
        if (normalizedKey.includes("salida") || normalizedKey.includes("video") || normalizedKey.includes("hdmi")) return "e.g. HDMI 4K";
        if (normalizedKey.includes("protec") || normalizedKey.includes("ip")) return "e.g. IP67 / IK10";
        if (normalizedKey.includes("compres")) return "e.g. H.265+ / H.264+";
        if (normalizedKey.includes("lente")) return "e.g. 2.8 mm";
        if (normalizedKey.includes("energ") || normalizedKey.includes("alimenta") || normalizedKey.includes("poe")) return "e.g. 12VDC / PoE";
        if (normalizedKey.includes("sensor")) return "e.g. 1/2.7\" CMOS";
        if (normalizedKey.includes("ir") || normalizedKey.includes("noct")) return "e.g. 30 m";
        if (normalizedKey.includes("fps")) return "e.g. 30 fps";
        return "e.g. Technical value";
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

    const toggleMarket = (marketCode: string) => {
        setAvailableMarkets((prev) =>
            prev.includes(marketCode)
                ? prev.filter((market) => market !== marketCode)
                : [...prev, marketCode]
        );
    };

    const uploadImageFile = async (
        file: File,
        onUploaded: (value: string) => void,
        successMessage: string
    ) => {
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
            onUploaded(data.url);
            toast.success(successMessage);
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error uploading image");
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
            toast.error("Select valid image files.");
            return;
        }

        setIsUploading(true);
        const loadingToast = toast.loading(`Uploading ${imageFiles.length} image(s)...`);

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
                    throw new Error(data.error || "Error uploading an image");
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

            toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : "Error uploading images");
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
            "Image uploaded successfully"
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
            toast.error("Drop a valid image file.");
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
            const msg = "Please complete the product name and model.";
            setError(msg);
            toast.warning(msg);
            return;
        }
        if (availableMarkets.length === 0) {
            const msg = "Select at least one available market (RD or US).";
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
                    subtitle: subtitle.trim() || subtitleEs.trim() || subtitleEn.trim() || null,
                    subtitle_es: subtitleEs.trim() || null,
                    subtitle_en: subtitleEn.trim() || null,
                    description,
                    title_es: titleEs || null,
                    title_en: titleEn || null,
                    description_es: descriptionEs || null,
                    description_en: descriptionEn || null,
                    availableMarkets,
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
            toast.success(initialData ? "Product updated!" : "Product created successfully!");
            router.push("/admin/products");
            router.refresh();
        } catch (err) {
            toast.dismiss(loadingToast);
            const msg = err instanceof Error ? err.message : "Error saving product";
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
                        onDrop={(e) => handleImageDrop(e, "main", setMainImage, "Main image uploaded successfully")}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div className="rounded-lg overflow-hidden border border-app-border bg-app-surface relative h-40 md:h-52">
                                {mainImage ? (
                                    <img src={mainImage} alt="Imagen principal" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-app-text-sec text-sm">
                                        No main image
                                    </div>
                                )}
                                {mainImage && (
                                    <button
                                        type="button"
                                        onClick={() => setMainImage("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Remove main image"
                                        title="Remove main image"
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
                                    {isUploading ? "Uploading..." : "Upload image(es)"}
                                </button>
                                <p className="mt-2 text-[11px] text-app-text-sec">You can upload or drag multiple images here.</p>
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
                                <p className="text-xs font-semibold text-app-text mb-2">Gallery ({galleryImages.length})</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {galleryImages.map((img: string, index: number) => (
                                        <div key={`${img}-${index}`} className="relative rounded-lg overflow-hidden border border-app-border bg-app-surface">
                                            <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-20 object-cover" />
                                            <div className="absolute inset-x-0 bottom-0 p-1 bg-black/50 flex gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => makeImagePrimary(img)}
                                                    className="flex-1 text-[10px] font-semibold text-white bg-primary/80 rounded px-1 py-0.5"
                                                >
                                                    Set as main
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
                                    You can change the main image at any time using the <span className="font-semibold">Set as main</span>.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Section 1: General Info */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">info</span>
                        General Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">
                                Product Name <span className="text-red-500">*</span>
                            </span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="e.g. Bullet Cam"
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
                                placeholder="e.g. Pro AI"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Badge (Optional)</span>
                            <input
                                type="text"
                                value={badge}
                                onChange={(e) => setBadge(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="e.g. Enterprise Series, Best Seller"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Category</span>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 appearance-none"
                                >
                                    <option value="">Select category...</option>
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
                        <div className="md:col-span-2 rounded-lg border border-app-border bg-app-bg-subtle p-4">
                            <span className="text-sm font-medium text-app-text block mb-3">
                                Mercados Disponibles <span className="text-red-500">*</span>
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {MARKET_OPTIONS.map((market) => (
                                    <label key={market.code} className="flex items-center gap-2 text-sm text-app-text">
                                        <input
                                            type="checkbox"
                                            checked={availableMarkets.includes(market.code)}
                                            onChange={() => toggleMarket(market.code)}
                                            className="h-4 w-4 rounded border-app-border text-primary focus:ring-primary"
                                        />
                                        {market.label}
                                    </label>
                                ))}
                            </div>
                            <p className="mt-2 text-xs text-app-text-sec">
                                El producto debe pertenecer al menos a un mercado para poder publicarse.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Section 2: Description */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">description</span>
                        Description
                    </h3>
                    <label className="flex flex-col gap-2 mb-4">
                        <span className="text-sm font-medium text-app-text">Subtitle (Fallback)</span>
                        <input
                            type="text"
                            value={subtitle}
                            onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                            placeholder="Used when localized subtitles are empty."
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-app-text">Description Completa</span>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full h-32 p-4 text-sm text-app-text border border-app-border rounded-lg focus:border-primary focus:ring-0 resize-y outline-none placeholder:text-app-text-sec/70"
                            placeholder="Write a detailed product description here..."
                        />
                    </label>
                </div>

                {/* Section 2.1: Localized Content */}
                <div className="bg-app-surface rounded-xl border border-app-border shadow-sm p-6">
                    <h3 className="text-lg font-bold text-app-text mb-5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">translate</span>
                        Multi-language Content (Optional)
                    </h3>
                    <p className="text-xs text-app-text-sec mb-4">
                        If a field is not completed, the site uses the base value (`name`/`description`) as fallback.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Subtitle (Spanish / RD)</span>
                            <input
                                type="text"
                                value={subtitleEs}
                                onChange={(e) => setSubtitleEs(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Subtitle for Dominican Republic"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Subtitle (English / US)</span>
                            <input
                                type="text"
                                value={subtitleEn}
                                onChange={(e) => setSubtitleEn(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Subtitle for United States"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Title (Spanish)</span>
                            <input
                                type="text"
                                value={titleEs}
                                onChange={(e) => setTitleEs(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="e.g. Outdoor bullet camera"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Title (English)</span>
                            <input
                                type="text"
                                value={titleEn}
                                onChange={(e) => setTitleEn(e.target.value)}
                                className="w-full rounded-lg border border-app-border bg-app-surface h-11 px-4 text-sm text-app-text focus:border-primary focus:ring-0 placeholder:text-app-text-sec/70"
                                placeholder="Ex. Outdoor Bullet Camera"
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Description (Spanish)</span>
                            <textarea
                                value={descriptionEs}
                                onChange={(e) => setDescriptionEs(e.target.value)}
                                className="w-full h-28 p-4 text-sm text-app-text border border-app-border rounded-lg focus:border-primary focus:ring-0 resize-y outline-none placeholder:text-app-text-sec/70"
                                placeholder="Description para mercado RD..."
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-sm font-medium text-app-text">Description (English)</span>
                            <textarea
                                value={descriptionEn}
                                onChange={(e) => setDescriptionEn(e.target.value)}
                                className="w-full h-28 p-4 text-sm text-app-text border border-app-border rounded-lg focus:border-primary focus:ring-0 resize-y outline-none placeholder:text-app-text-sec/70"
                                placeholder="Description for US market..."
                            />
                        </label>
                    </div>
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
                                <span className="material-symbols-outlined text-sm">add</span> Add
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
                                        placeholder="e.g. IP Protection, Sensor, IR"
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
                                : "Camera tip: IP Protection, Compression (H.265+), Lens (mm), Power (PoE), Sensor, IR, WDR, and FPS."}
                        </p>
                        <label className="flex flex-col gap-2 mt-4">
                            <span className="text-sm font-medium text-app-text">Opciones de Resolution (separadas por coma)</span>
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
                            Features
                        </h3>
                        <div className="flex flex-col gap-4">
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">AI Features (comma-separated)</span>
                                <input
                                    type="text"
                                    value={aiFeatures}
                                    onChange={(e) => setAiFeatures(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Line crossing, Area intrusion"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Warranty</span>
                                <input
                                    type="text"
                                    value={guarantee}
                                    onChange={(e) => setGuarantee(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="3 years of coverage"
                                />
                            </label>
                            <label className="flex flex-col gap-2">
                                <span className="text-sm font-medium text-app-text">Support</span>
                                <input
                                    type="text"
                                    value={support}
                                    onChange={(e) => setSupport(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-10 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="Dedicated B2B hotline"
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
                            Product Variants
                        </h3>
                        <button
                            type="button"
                            onClick={addVariant}
                            className="text-xs font-semibold text-primary hover:text-blue-700 flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-sm">add</span> Add Variant
                        </button>
                    </div>
                    {variants.length === 0 ? (
                        <p className="text-sm text-app-text-sec italic text-center py-4 bg-app-bg-subtle rounded-lg">
                            No variants defined. The product base configuration will be used.
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
                                            <span className="text-xs font-medium text-app-text">Name (e.g. 4MP)</span>
                                            <input
                                                type="text"
                                                value={variant.name || ""}
                                                onChange={(e) => handleVariantChange(index, "name", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="Variant name"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">Short Description</span>
                                            <input
                                                type="text"
                                                value={variant.description || ""}
                                                onChange={(e) => handleVariantChange(index, "description", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="Detalle diferencial"
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">Manual URL (Optional)</span>
                                            <input
                                                type="text"
                                                value={variant.manual || ""}
                                                onChange={(e) => handleVariantChange(index, "manual", e.target.value)}
                                                className="w-full rounded-md border border-app-border bg-app-surface h-9 px-3 text-sm"
                                                placeholder="https://..."
                                            />
                                        </label>
                                        <label className="flex flex-col gap-1">
                                            <span className="text-xs font-medium text-app-text">Datasheet URL (Optional)</span>
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
                        Product Images
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
                            onDrop={(e) => handleImageDrop(e, "night", setNightVisionImg, "Night vision image uploaded successfully")}
                        >
                            <h4 className="text-sm font-semibold text-app-text mb-3">Night Vision</h4>
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
                                onChange={(e) => handleFileUpload(e, setNightVisionImg, "Night vision image uploaded successfully")}
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
                                {isUploading ? "Uploading..." : "Upload image"}
                            </button>
                            <p className="mt-2 text-[11px] text-app-text-sec">You can also drag and drop an image here.</p>
                            {(normalizeNightVisionForCategory(nightVisionImg) || mainImage || defaultNightVisionImg) && (
                                <div className="mt-3 h-28 rounded-lg overflow-hidden border border-app-border bg-app-surface relative">
                                    <img
                                        src={normalizeNightVisionForCategory(nightVisionImg) || mainImage || defaultNightVisionImg}
                                        alt="Night vision image"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNightVisionImg("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Remove night vision image"
                                        title="Remove night vision image"
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
                            onDrop={(e) => handleImageDrop(e, "app", setAppDemoImg, "App background image uploaded successfully")}
                        >
                            <h4 className="text-sm font-semibold text-app-text mb-3">App Section Background</h4>
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
                                onChange={(e) => handleFileUpload(e, setAppDemoImg, "App background image uploaded successfully")}
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
                                {isUploading ? "Uploading..." : "Upload image"}
                            </button>
                            <p className="mt-2 text-[11px] text-app-text-sec">You can also drag and drop an image here.</p>
                            {appDemoImg && (
                                <div className="mt-3 h-28 rounded-lg overflow-hidden border border-app-border bg-app-surface relative">
                                    <img src={appDemoImg} alt="App background image" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setAppDemoImg("")}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/65 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                                        aria-label="Remove app background image"
                                        title="Remove app background image"
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
                                    placeholder="Badge (e.g. Live Monitoring)"
                                />
                                <input
                                    type="text"
                                    value={appDemoTitle}
                                    onChange={(e) => setAppDemoTitle(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface h-9 px-3 text-sm text-app-text focus:border-primary focus:ring-0"
                                    placeholder="App section title"
                                />
                                <textarea
                                    value={appDemoDesc}
                                    onChange={(e) => setAppDemoDesc(e.target.value)}
                                    className="w-full rounded-lg border border-app-border bg-app-surface min-h-20 px-3 py-2 text-sm text-app-text focus:border-primary focus:ring-0 resize-y"
                                    placeholder="Short app section description"
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
                        {isSubmitting ? "Saving..." : (initialData ? "Save Changes" : "Publish Product")}
                    </button>
                    <Link
                        href="/admin/products"
                        className="flex w-full h-12 items-center justify-center rounded-lg border border-app-border bg-app-surface text-app-text font-bold"
                    >
                        Discard
                    </Link>
                </div>
            </form>

            {/* Preview Column */}
            <div className={`xl:w-[600px] xl:shrink-0 xl:sticky xl:top-4 xl:self-start ${showPreview ? "block" : "hidden xl:block"}`}>
                <ProductPreview
                    name={name}
                    model={model}
                    badge={badge}
                    subtitle={subtitle.trim() || subtitleEs.trim() || subtitleEn.trim()}
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




