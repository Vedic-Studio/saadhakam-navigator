interface AeoBlockProps {
  text: string;
}

export function AeoBlock({ text }: AeoBlockProps) {
  return (
    <div
      data-speakable
      className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 mb-8"
    >
      <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>
    </div>
  );
}
