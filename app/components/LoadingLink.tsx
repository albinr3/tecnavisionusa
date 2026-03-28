"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, type ReactNode, useEffect, useMemo, useState } from "react";

interface LoadingLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
    pendingLabel?: string;
}

const isModifiedEvent = (event: MouseEvent<HTMLElement>) =>
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

const normalizeRoute = (href: string) => href.split("?")[0]?.split("#")[0] || href;

export default function LoadingLink({
    href,
    className,
    children,
    pendingLabel = "Abriendo...",
}: LoadingLinkProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        router.prefetch(href);
    }, [href, router]);

    useEffect(() => {
        if (!isPending) return;
        const timeout = setTimeout(() => {
            setIsPending(false);
        }, 15000);
        return () => clearTimeout(timeout);
    }, [isPending]);

    const resolvedClassName = useMemo(
        () => `${className || ""}${isPending ? " pointer-events-none cursor-wait opacity-90" : ""}`.trim(),
        [className, isPending]
    );

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        if (event.defaultPrevented || isModifiedEvent(event)) return;
        if (isPending) {
            event.preventDefault();
            return;
        }
        if (normalizeRoute(href) === pathname) return;

        setIsPending(true);
    };

    return (
        <Link
            href={href}
            onClick={handleClick}
            aria-busy={isPending}
            className={resolvedClassName}
        >
            {isPending ? (
                <span className="inline-flex items-center gap-2">
                    <span
                        aria-hidden
                        className="size-4 animate-spin rounded-full border-2 border-current/40 border-t-current"
                    />
                    {pendingLabel}
                </span>
            ) : (
                children
            )}
        </Link>
    );
}
