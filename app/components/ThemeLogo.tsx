"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeLogoProps {
    className?: string;
    alt?: string;
}

export default function ThemeLogo({ className = "h-8 w-auto", alt = "TecnaVision" }: ThemeLogoProps) {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mismo logo en servidor y en el primer render del cliente para evitar hydration mismatch
    const src = mounted && theme === "dark" ? "/logo darkmode.png" : "/logo.png";
    return <img src={src} alt={alt} className={className} />;
}
