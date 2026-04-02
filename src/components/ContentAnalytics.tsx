"use client";

import Link, { type LinkProps } from "next/link";
import { useEffect, type MouseEvent, type ReactNode } from "react";

type TrackedLinkProps = LinkProps & {
    children: ReactNode;
    className?: string;
    eventLabel: string;
    destination?: string;
    trackPathName?: string;
    ctaSlot?: string;
    pageArchetype?: string;
    pageTemplate?: string;
    variant?: string;
    bridgeType?: string;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function ArticleReadTracker({
    slug,
    pillar,
    route,
    pageArchetype = "article",
    pageTemplate,
}: {
    slug: string;
    pillar: string;
    route?: string;
    pageArchetype?: string;
    pageTemplate?: string;
}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (typeof window.sadhaka?.articleRead === "function") {
            window.sadhaka.articleRead(slug, pillar, {
                sourceArticleRoute: route ?? window.location.pathname,
                sourceArticleSlug: slug,
                sourcePillar: pillar,
                pageArchetype,
                pageTemplate: pageTemplate ?? route ?? window.location.pathname,
            });
        }
    }, [pageArchetype, pageTemplate, pillar, route, slug]);

    return null;
}

export function ContentPageTracker({
    slug,
    pillar,
    route,
    pageArchetype = "page",
    pageTemplate,
}: {
    slug: string;
    pillar: string;
    route?: string;
    pageArchetype?: string;
    pageTemplate?: string;
}) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (typeof window.sadhaka?.articleRead === "function") {
            window.sadhaka.articleRead(slug, pillar, {
                sourceArticleRoute: route ?? window.location.pathname,
                sourceArticleSlug: slug,
                sourcePillar: pillar,
                pageArchetype,
                pageTemplate: pageTemplate ?? route ?? window.location.pathname,
            });
        }
    }, [pageArchetype, pageTemplate, pillar, route, slug]);

    return null;
}

export function TrackedLink({
    children,
    className,
    eventLabel,
    destination,
    trackPathName,
    ctaSlot,
    pageArchetype,
    pageTemplate,
    variant,
    bridgeType,
    onClick,
    href,
    ...props
}: TrackedLinkProps) {
    const resolvedDestination =
        destination || (typeof href === "string" ? href : href.pathname?.toString() || "");

    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (typeof window === "undefined") return;

        const context = {
            sourceArticleRoute: window.location.pathname,
            pageArchetype: pageArchetype ?? undefined,
            pageTemplate: pageTemplate ?? window.location.pathname,
            ctaSlot,
            ctaLabel: eventLabel,
            ctaDestination: resolvedDestination,
            variant,
            bridgeType,
        };

        if (typeof window.sadhaka?.ctaClick === "function") {
            window.sadhaka.ctaClick(eventLabel, resolvedDestination, context);
        }

        if (trackPathName && typeof window.sadhaka?.pathExplore === "function") {
            window.sadhaka.pathExplore(trackPathName, {
                ...context,
                pathName: trackPathName,
            });
        }
    };

    return (
        <Link {...props} href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}