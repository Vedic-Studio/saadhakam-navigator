"use client";

/**
 * 1-tap share control for fact cards.
 *
 * Primary affordance: one button that opens the native Web Share sheet
 * (`navigator.share` -> `native_share`). When Web Share is unavailable (most
 * desktops), the same click reveals an inline fallback row: X/Twitter, WhatsApp,
 * and Copy link. Every completed share fires `trackOutboundShare` exactly once
 * with the resolved platform and `content_type: 'fact_card'`.
 *
 * SSR-safe: this is a client component and all `navigator`/`window` access
 * happens inside click handlers via the pure helpers in `shareLogic.ts`.
 */

import { useState } from "react";
import { Share2, Send, MessageCircle, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  canUseWebShare,
  performShare,
  shareToPlatform,
  type SharePayload,
} from "./shareLogic";

export interface ShareButtonProps {
  /** Resolved share payload (title/text/url). Built server-side from card data. */
  payload: SharePayload;
  /** Hashtags appended to the X/Twitter intent (without leading '#'). */
  hashtags?: string[];
  /** Visual size. `sm` suits inline placement under a fact card. */
  size?: "sm" | "md";
  className?: string;
}

const FALLBACKS = "fact_card" as const;

export function ShareButton({
  payload,
  hashtags = [],
  size = "md",
  className,
}: ShareButtonProps) {
  // Whether to show the explicit fallback row. Defaults to false; we reveal it
  // when the device has no native share sheet, or on demand from the menu.
  const [showFallbacks, setShowFallbacks] = useState(false);
  const [copied, setCopied] = useState(false);

  const pad = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const iconSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  async function handlePrimary() {
    // Try the native sheet first. If it isn't available, reveal fallbacks so the
    // user is never left without a way to share.
    const { usedNative } = await performShare({
      payload,
      contentType: FALLBACKS,
      hashtags,
    });
    if (!usedNative) {
      setShowFallbacks(true);
    }
  }

  async function handleFallback(
    platform: "twitter" | "whatsapp" | "copy_link",
  ) {
    const { ok } = await shareToPlatform(platform, {
      payload,
      contentType: FALLBACKS,
      hashtags,
    });
    if (platform === "copy_link" && ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  // On a device with no Web Share API, default the label to "Share" but the
  // first click expands the fallback row in place. We can't read `navigator`
  // during render, so the primary button always tries native first.
  const supportsNative = canUseWebShare();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={handlePrimary}
          aria-label="Share this fact"
          className={cn(
            "inline-flex items-center gap-2 rounded-full font-medium",
            "bg-orange-500/15 text-orange-300 border border-orange-500/30",
            "hover:bg-orange-500/25 hover:text-orange-200 transition-colors",
            pad,
          )}
        >
          <Share2 className={iconSize} aria-hidden="true" />
          Share this fact
        </button>

        {/* On desktop (no native sheet), offer the explicit options up-front so
            the share path is one click, not two. */}
        {!supportsNative && !showFallbacks && (
          <button
            type="button"
            onClick={() => setShowFallbacks(true)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full",
              "text-muted-foreground hover:text-foreground transition-colors",
              pad,
            )}
          >
            More options
          </button>
        )}
      </div>

      {showFallbacks && (
        <div
          className="flex items-center gap-2 flex-wrap"
          role="group"
          aria-label="Share options"
        >
          <FallbackButton
            label="Post on X"
            onClick={() => handleFallback("twitter")}
            pad={pad}
            icon={<Send className={iconSize} aria-hidden="true" />}
          />
          <FallbackButton
            label="WhatsApp"
            onClick={() => handleFallback("whatsapp")}
            pad={pad}
            icon={<MessageCircle className={iconSize} aria-hidden="true" />}
          />
          <FallbackButton
            label={copied ? "Copied" : "Copy link"}
            onClick={() => handleFallback("copy_link")}
            pad={pad}
            icon={
              copied ? (
                <Check className={iconSize} aria-hidden="true" />
              ) : (
                <Copy className={iconSize} aria-hidden="true" />
              )
            }
          />
        </div>
      )}
    </div>
  );
}

function FallbackButton({
  label,
  onClick,
  icon,
  pad,
}: {
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
  pad: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full",
        "bg-white/5 text-muted-foreground border border-white/10",
        "hover:bg-white/10 hover:text-foreground transition-colors",
        pad,
      )}
    >
      {icon}
      {label}
    </button>
  );
}
