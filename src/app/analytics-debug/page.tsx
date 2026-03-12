import DebugPanel from "./DebugPanel";

export const metadata = {
    title: "Analytics Debug",
    robots: {
        index: false,
        follow: false,
    },
};

export default function AnalyticsDebugPage() {
    return <DebugPanel />;
}