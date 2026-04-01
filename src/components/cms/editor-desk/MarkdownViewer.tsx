interface MarkdownViewerProps {
    content: string;
}

export function MarkdownViewer({ content }: MarkdownViewerProps) {
    const body = content.replace(/^---[\s\S]*?---\n*/, "");
    return (
        <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-7 text-white/90">
            {body}
        </pre>
    );
}