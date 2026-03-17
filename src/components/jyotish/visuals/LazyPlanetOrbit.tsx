"use client";

import dynamic from "next/dynamic";

const PlanetOrbit = dynamic(
  () => import("./PlanetOrbit").then((mod) => ({ default: mod.PlanetOrbit })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full aspect-square max-w-[400px] mx-auto rounded-2xl bg-slate-950/30 flex items-center justify-center text-muted-foreground text-sm">
        Loading orbit...
      </div>
    ),
  }
);

interface LazyPlanetOrbitProps {
  name: string;
  color?: string;
  exaltation?: string;
  debilitation?: string;
}

export function LazyPlanetOrbit(props: LazyPlanetOrbitProps) {
  return <PlanetOrbit {...props} />;
}
