import { Play, ExternalLink } from "lucide-react";

interface KeyTalk {
  title: string;
  url?: string;
  platform?: string;
}

interface KeyTalksSectionProps {
  keyTalks: KeyTalk[];
}

export function KeyTalksSection({ keyTalks }: KeyTalksSectionProps) {
  if (keyTalks.length === 0) return null;

  return (
    <div className="space-y-4">
      <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
        <Play className="w-5 h-5 text-orange-400" />
        Key Talks & Lectures
      </h2>
      <ul className="space-y-2">
        {keyTalks.map((talk, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
          >
            <Play className="w-4 h-4 text-orange-400/60 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              {talk.url ? (
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-orange-400 transition-colors inline-flex items-center gap-1"
                >
                  {talk.title}
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              ) : (
                <span className="text-sm text-foreground">{talk.title}</span>
              )}
              {talk.platform && (
                <span className="block text-xs text-muted-foreground/60 mt-0.5">
                  {talk.platform}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
