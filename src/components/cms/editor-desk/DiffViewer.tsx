interface DiffViewerProps {
    fromVersion: number;
    toVersion: number;
    fromContent: string;
    toContent: string;
    onClose: () => void;
}

export function DiffViewer({ fromVersion, toVersion, fromContent, toContent, onClose }: DiffViewerProps) {
    return (
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-white">Compare v{fromVersion} → v{toVersion}</h2>
                <button onClick={onClose} className="text-xs text-white/60 hover:text-white">
                    Close diff
                </button>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
                <pre className="overflow-auto whitespace-pre-wrap rounded border border-white/10 bg-black/30 p-4 text-xs text-white/80">{fromContent}</pre>
                <pre className="overflow-auto whitespace-pre-wrap rounded border border-white/10 bg-black/30 p-4 text-xs text-white/80">{toContent}</pre>
            </div>
        </div>
    );
}