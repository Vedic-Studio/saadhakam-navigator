import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const CMS_PROTECTED_PATHS = ["/content-agent", "/api/cms"];

function normalizeCredential(value?: string): string | undefined {
    const trimmed = value?.trim();
    if (!trimmed) {
        return undefined;
    }

    const wrappedInDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
    const wrappedInSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

    if (wrappedInDoubleQuotes || wrappedInSingleQuotes) {
        return trimmed.slice(1, -1).trim();
    }

    return trimmed;
}

function isProtectedPath(pathname: string): boolean {
    return CMS_PROTECTED_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

function unauthorized(): NextResponse {
    return new NextResponse("Authentication required", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Sadhaka CMS"',
        },
    });
}

export function middleware(request: NextRequest) {
    if (!isProtectedPath(request.nextUrl.pathname)) {
        return NextResponse.next();
    }

    const username = normalizeCredential(process.env.CMS_BASIC_AUTH_USER);
    const password = normalizeCredential(process.env.CMS_BASIC_AUTH_PASSWORD);

    if (!username || !password) {
        return NextResponse.next();
    }

    const authorization = request.headers.get("authorization");
    if (!authorization?.startsWith("Basic ")) {
        return unauthorized();
    }

    const encoded = authorization.slice(6).trim();

    let providedUsername = "";
    let providedPassword = "";

    try {
        const decoded = atob(encoded);
        const separatorIndex = decoded.indexOf(":");
        if (separatorIndex === -1) {
            return unauthorized();
        }

        providedUsername = decoded.slice(0, separatorIndex).trim();
        providedPassword = decoded.slice(separatorIndex + 1).trim();
    } catch {
        return unauthorized();
    }

    if (providedUsername !== username || providedPassword !== password) {
        return unauthorized();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/content-agent/:path*", "/api/cms/:path*"],
};