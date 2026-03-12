import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type LongformContentProps = HTMLAttributes<HTMLDivElement>;

export function LongformContent({ className, ...props }: LongformContentProps) {
    return <div className={cn("longform-prose", className)} {...props} />;
}
