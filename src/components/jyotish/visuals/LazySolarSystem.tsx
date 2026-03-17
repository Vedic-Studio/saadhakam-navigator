"use client";

import dynamic from "next/dynamic";

const SolarSystem = dynamic(
  () => import("./SolarSystem").then((mod) => ({ default: mod.SolarSystem })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[600px] mx-auto rounded-2xl bg-slate-950/30 flex items-center justify-center text-muted-foreground text-sm">
        Loading Navagraha system...
      </div>
    ),
  }
);

export function LazySolarSystem() {
  return <SolarSystem />;
}
