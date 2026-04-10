/**
 * TEMPORARY dev-only exploration route for Sadhaka brand icon.
 * Three perspectives: geometric shape, flag/dhwaja, color palette.
 * Delete this file after the final pick.
 */
export const metadata = {
  title: "Icon Exploration (dev only)",
  robots: { index: false, follow: false },
};

/* ================================================================
   PERSPECTIVE 1 — GEOMETRIC VARIATIONS
   Same finial, same A-portal, different body geometry.
   ================================================================ */

function IconSteppedRect({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <rect x="4" y="88" width="92" height="5" />
      <path
        fillRule="evenodd"
        d="M 12 88 V 79 H 17 V 70 H 22 V 61 H 27 V 52 H 32 V 43 H 37 V 34 H 63 V 43 H 68 V 52 H 73 V 61 H 78 V 70 H 83 V 79 H 88 V 88 H 12 Z M 32 86 L 50 40 L 68 86 Z"
      />
      <rect x="44" y="31" width="12" height="3" />
      <ellipse cx="50" cy="27" rx="11" ry="2.5" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="50" cy="13" r="2" />
    </svg>
  );
}

function IconPyramid({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <rect x="4" y="88" width="92" height="5" />
      <path
        fillRule="evenodd"
        d="M 12 88 L 50 34 L 88 88 Z M 32 86 L 50 42 L 68 86 Z"
      />
      <rect x="44" y="31" width="12" height="3" />
      <ellipse cx="50" cy="27" rx="11" ry="2.5" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="50" cy="13" r="2" />
    </svg>
  );
}

function IconChamfered({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <rect x="4" y="88" width="92" height="5" />
      <path
        fillRule="evenodd"
        d="M 12 88 V 82 L 17 79 V 73 L 22 70 V 64 L 27 61 V 55 L 32 52 V 46 L 37 43 V 34 H 63 V 43 L 68 46 V 52 L 73 55 V 61 L 78 64 V 70 L 83 73 V 79 L 88 82 V 88 Z M 32 86 L 50 40 L 68 86 Z"
      />
      <rect x="44" y="31" width="12" height="3" />
      <ellipse cx="50" cy="27" rx="11" ry="2.5" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="50" cy="13" r="2" />
    </svg>
  );
}

/* ================================================================
   PERSPECTIVE 2 — FLAG / DHWAJA INTEGRATION
   The gopuram crowned with a temple flag, or morphing into one.
   ================================================================ */

function IconDhwaja({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <rect x="4" y="88" width="92" height="5" />
      <path
        fillRule="evenodd"
        d="M 12 88 V 79 H 17 V 70 H 22 V 61 H 27 V 52 H 32 V 43 H 37 V 34 H 63 V 43 H 68 V 52 H 73 V 61 H 78 V 70 H 83 V 79 H 88 V 88 H 12 Z M 32 86 L 50 40 L 68 86 Z"
      />
      <rect x="44" y="31" width="12" height="3" />
      <ellipse cx="50" cy="27" rx="11" ry="2.5" />
      <circle cx="50" cy="20" r="3" />
      {/* Pole above kalasha */}
      <rect x="49" y="5" width="2" height="12" />
      {/* Triangular pennant flowing right */}
      <path d="M 51 5 L 65 9 L 51 13 Z" />
    </svg>
  );
}

function IconMorphFlow({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="currentColor"
      stroke="none"
      aria-hidden="true"
    >
      <rect x="4" y="88" width="92" height="5" />
      {/* Left side: fully stepped. Right side: top 3 tiers flow as curve */}
      <path
        fillRule="evenodd"
        d="M 12 88 V 79 H 17 V 70 H 22 V 61 H 27 V 52 H 32 V 43 H 37 V 34 H 63 C 66 38 72 46 73 52 V 61 H 78 V 70 H 83 V 79 H 88 V 88 Z M 32 86 L 50 40 L 68 86 Z"
      />
      <rect x="44" y="31" width="12" height="3" />
      <ellipse cx="50" cy="27" rx="11" ry="2.5" />
      <circle cx="50" cy="20" r="3" />
      <circle cx="50" cy="13" r="2" />
    </svg>
  );
}

/* ================================================================
   PERSPECTIVE 3 — COLOR PALETTE
   Single-color and two-tone treatments on the rect-step form.
   ================================================================ */

function IconWithColor({
  size,
  bodyColor,
  finialColor,
}: {
  size: number;
  bodyColor: string;
  finialColor?: string;
}) {
  const fc = finialColor ?? bodyColor;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke="none"
      aria-hidden="true"
    >
      <g fill={bodyColor}>
        <rect x="4" y="88" width="92" height="5" />
        <path
          fillRule="evenodd"
          d="M 12 88 V 79 H 17 V 70 H 22 V 61 H 27 V 52 H 32 V 43 H 37 V 34 H 63 V 43 H 68 V 52 H 73 V 61 H 78 V 70 H 83 V 79 H 88 V 88 H 12 Z M 32 86 L 50 40 L 68 86 Z"
        />
      </g>
      <g fill={fc}>
        <rect x="44" y="31" width="12" height="3" />
        <ellipse cx="50" cy="27" rx="11" ry="2.5" />
        <circle cx="50" cy="20" r="3" />
        <circle cx="50" cy="13" r="2" />
      </g>
    </svg>
  );
}

const SINGLE_COLORS = [
  { name: "Kumkum", hex: "#C24914", desc: "Temple vermillion" },
  { name: "Maroon", hex: "#7B1E3B", desc: "Sanctum depth" },
  { name: "Gold", hex: "#B8860B", desc: "Auspicious warmth" },
  { name: "Sandstone", hex: "#A0845C", desc: "Temple stone" },
  { name: "Indigo", hex: "#1A1A4E", desc: "Night-sky contemplation" },
];

const TWO_TONES = [
  {
    name: "Stone + Gold",
    body: "#6B5B47",
    finial: "#C49B00",
    desc: "Architectural gravity, sacred finial",
  },
  {
    name: "Dark + Kumkum",
    body: "#2C2A29",
    finial: "#C24914",
    desc: "Modern base, ritual crown",
  },
];

/* ================================================================
   LAYOUT COMPONENTS
   ================================================================ */

function SizeLadder({
  children,
  sizes,
}: {
  children: (size: number) => React.ReactNode;
  sizes: number[];
}) {
  return (
    <div className="flex items-end gap-5">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col items-center gap-1.5">
          {children(s)}
          <span
            className="text-[10px] font-mono"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {s}
          </span>
        </div>
      ))}
    </div>
  );
}

function VariantCard({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-5 border flex flex-col gap-4"
      style={{
        backgroundColor: "#0f0d1a",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div>
        <h3
          className="text-base font-semibold tracking-tight"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {label}
        </h3>
        <p
          className="text-xs mt-0.5"
          style={{ color: "rgba(255,255,255,0.45)" }}
        >
          {desc}
        </p>
      </div>
      {children}
    </div>
  );
}

/* ================================================================
   PAGE
   ================================================================ */

export default function IconExplorationPage() {
  return (
    <main
      className="min-h-screen py-12 px-6"
      style={{ backgroundColor: "#08060f", color: "#f8f7ff" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <header className="mb-10">
          <p
            className="text-xs font-mono uppercase tracking-widest mb-2"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            dev only / exploration
          </p>
          <h1
            className="text-3xl font-semibold"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Sikhara icon — three perspectives
          </h1>
        </header>

        {/* ---- PERSPECTIVE 1: GEOMETRIC SHAPE ---- */}
        <section className="mb-12">
          <h2
            className="text-lg font-semibold mb-1 tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            1. Geometric shape
          </h2>
          <p
            className="text-xs mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Same finial, same A-portal — different body geometry.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <VariantCard
              label="A. Rectangular Steps"
              desc="Current — right-angle stair-step tiers"
            >
              <SizeLadder sizes={[32, 64, 128]}>
                {(s) => <IconSteppedRect size={s} />}
              </SizeLadder>
            </VariantCard>
            <VariantCard
              label="B. Smooth Pyramid"
              desc="Clean triangle — no steps, pure vimana"
            >
              <SizeLadder sizes={[32, 64, 128]}>
                {(s) => <IconPyramid size={s} />}
              </SizeLadder>
            </VariantCard>
            <VariantCard
              label="C. Chamfered Steps"
              desc="Diagonal transitions between tiers"
            >
              <SizeLadder sizes={[32, 64, 128]}>
                {(s) => <IconChamfered size={s} />}
              </SizeLadder>
            </VariantCard>
          </div>
        </section>

        {/* ---- PERSPECTIVE 2: FLAG / DHWAJA ---- */}
        <section className="mb-12">
          <h2
            className="text-lg font-semibold mb-1 tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            2. Flag / Dhwaja integration
          </h2>
          <p
            className="text-xs mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            The gopuram crowned with a temple flag, or morphing into one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <VariantCard
              label="D. Dhwaja Pennant"
              desc="Pole + pennant replaces the flame finial"
            >
              <SizeLadder sizes={[32, 64, 128]}>
                {(s) => <IconDhwaja size={s} />}
              </SizeLadder>
            </VariantCard>
            <VariantCard
              label="E. Structure → Flow"
              desc="Right side dissolves from steps into flowing curve"
            >
              <SizeLadder sizes={[32, 64, 128]}>
                {(s) => <IconMorphFlow size={s} />}
              </SizeLadder>
            </VariantCard>
          </div>
        </section>

        {/* ---- PERSPECTIVE 3: COLOR PALETTE ---- */}
        <section className="mb-12">
          <h2
            className="text-lg font-semibold mb-1 tracking-tight"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            3. Color palette
          </h2>
          <p
            className="text-xs mb-5"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Single-color and two-tone treatments on the rect-step form.
          </p>

          {/* Single colors on dark */}
          <h3
            className="text-sm font-semibold mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Single color — dark ground
          </h3>
          <div
            className="rounded-xl p-6 border flex flex-wrap items-end gap-8 mb-6"
            style={{
              backgroundColor: "#0f0d1a",
              borderColor: "rgba(255,255,255,0.08)",
            }}
          >
            {SINGLE_COLORS.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-2">
                <IconWithColor size={64} bodyColor={c.hex} />
                <p className="text-xs font-medium">{c.name}</p>
                <p
                  className="text-[10px]"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Single colors on light */}
          <h3
            className="text-sm font-semibold mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Single color — light ground
          </h3>
          <div
            className="rounded-xl p-6 border flex flex-wrap items-end gap-8 mb-8"
            style={{
              backgroundColor: "#F9F8F6",
              color: "#2C2A29",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            {SINGLE_COLORS.map((c) => (
              <div key={c.hex} className="flex flex-col items-center gap-2">
                <IconWithColor size={64} bodyColor={c.hex} />
                <p className="text-xs font-medium">{c.name}</p>
                <p
                  className="text-[10px]"
                  style={{ color: "rgba(0,0,0,0.4)" }}
                >
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Two-tone on dark */}
          <h3
            className="text-sm font-semibold mb-3"
            style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
          >
            Two-tone (body + finial)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {TWO_TONES.map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-5 border flex items-center gap-6"
                style={{
                  backgroundColor: "#0f0d1a",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <IconWithColor
                  size={80}
                  bodyColor={t.body}
                  finialColor={t.finial}
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.45)" }}
                  >
                    {t.desc}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-4 h-4 rounded"
                        style={{ backgroundColor: t.body }}
                      />
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {t.body}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-4 h-4 rounded"
                        style={{ backgroundColor: t.finial }}
                      />
                      <span
                        className="text-[10px] font-mono"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {t.finial}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two-tone on light */}
          <div
            className="rounded-xl p-6 border flex flex-wrap items-center gap-8"
            style={{
              backgroundColor: "#F9F8F6",
              color: "#2C2A29",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            {TWO_TONES.map((t) => (
              <div key={t.name} className="flex items-center gap-4">
                <IconWithColor
                  size={64}
                  bodyColor={t.body}
                  finialColor={t.finial}
                />
                <span className="text-xs font-medium">{t.name}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
