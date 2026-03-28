"use client";

import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

export default function ToasterRegistry() {
    const { theme } = useTheme();
    return (
        <Toaster
            position="bottom-right"
            richColors
            closeButton
            theme={theme}
            style={{ fontFamily: "inherit" }}
        />
    );
}
