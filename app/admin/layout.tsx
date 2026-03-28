import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import AdminShell from "./components/AdminShell";

export const metadata: Metadata = {
    title: "Admin Panel - TecnaVision",
    description: "Panel de administración para gestionar productos y configuración de TecnaVision.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-snippet": -1,
            "max-image-preview": "none",
            "max-video-preview": -1,
        },
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <AdminShell>
            {children}
            <Toaster position="top-right" />
        </AdminShell>
    );
}
