"use client";

import Link, { type LinkProps } from "next/link";
import { useEffect, type MouseEvent, type ReactNode } from "react";

type TrackedLinkProps = LinkProps & {
    children: ReactNode;
    className?: string;
    eventLabel: string;
    destination?: string;
    trackPathName?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function ArticleReadTracker({
    slug,
    pillar,
}: {
    slug: string;
    pillar: string;
}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (typeof window.sadhaka?.articleRead === "function") {
            window.sadhaka.articleRead(slug, pillar);
        }
    }, [pillar, slug]);

    return null;
}

export function ContentPageTracker({
    slug,
    pillar,
}: {
    slug: string;
    pillar: string;
}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (typeof window.sadhaka?.articleRead === "function") {
            window.sadhaka.articleRead(slug, pillar);
        }
    }, [pillar, slug]);

    return null;
}

export function TrackedLink({
    children,
    className,
    eventLabel,
    destination,
    trackPathName,
    onClick,
    href,
    ...props
}: TrackedLinkProps) {
    const resolvedDestination =
        destination || (typeof href === "string" ? href : href.pathname?.toString() || "");

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (typeof window === "undefined") return;

        if (typeof window.sadhaka?.ctaClick === "function") {
            window.sadhaka.ctaClick(eventLabel, resolvedDestination);
        }

        if (trackPathName && typeof window.sadhaka?.pathExplore === "function") {
            window.sadhaka.pathExplore(trackPathName);
        }
    };

    return (
        <Link {...props} href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}