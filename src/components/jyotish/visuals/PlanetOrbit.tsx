"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import { motion } from "framer-motion";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";
import { TextureLoader } from "three";
import type { Mesh } from "three";

interface PlanetOrbitProps {
  name: string;
  color?: string;
  exaltation?: string;
  debilitation?: string;
}

const ZODIAC_SIGNS = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena",
];

function ZodiacRing({ exaltation, debilitation }: { exaltation?: string; debilitation?: string }) {
  return (
    <>
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 3;
        const isExalt = sign === exaltation;
        const isDebl = sign === debilitation;

        return (
          <Text
            key={sign}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            fontSize={0.18}
            color={isExalt ? "#22c55e" : isDebl ? "#ef4444" : "#64748b"}
            anchorX="center"
            rotation={[Math.PI * -0.5, 0, -angle + Math.PI * 0.5]}
          >
            {sign}
          </Text>
        );
      })}
    </>
  );
}

function GrahaSprite({ slug, yOffset }: { slug: string; yOffset: number }) {
  const iconPath = GRAHA_ICONS[slug];
  if (!iconPath) return null;

  try {
    const texture = useLoader(TextureLoader, iconPath);
    return (
      <Billboard position={[0, yOffset, 0]}>
        <mesh>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial map={texture} transparent alphaTest={0.1} />
        </mesh>
      </Billboard>
    );
  } catch {
    return null;
  }
}

function OrbitingPlanet({ color, slug }: { color: string; slug: string }) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 0.3;
      meshRef.current.position.x = Math.cos(t) * 2;
      meshRef.current.position.z = Math.sin(t) * 2;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        <Suspense fallback={null}>
          <GrahaSprite slug={slug} yOffset={0.45} />
        </Suspense>
      </mesh>
    </group>
  );
}

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={0.8} />
    </mesh>
  );
}

function Scene({ color, slug, exaltation, debilitation }: {
  color: string;
  slug: string;
  exaltation?: string;
  debilitation?: string;
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#fbbf24" />

      <Sun />
      <OrbitingPlanet color={color} slug={slug} />
      <ZodiacRing exaltation={exaltation} debilitation={debilitation} />

      {/* Orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.95, 2.05, 64]} />
        <meshBasicMaterial color="#334155" opacity={0.3} transparent />
      </mesh>

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

const GRAHA_COLORS: Record<string, string> = {
  surya: "#fbbf24",
  chandra: "#e2e8f0",
  mangala: "#ef4444",
  budha: "#22c55e",
  brihaspati: "#eab308",
  shukra: "#ec4899",
  shani: "#6366f1",
  rahu: "#475569",
  ketu: "#94a3b8",
};

export function PlanetOrbit({ name, color, exaltation, debilitation }: PlanetOrbitProps) {
  const slug = name.toLowerCase();
  const grahaColor = color || GRAHA_COLORS[slug] || "#f97316";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full aspect-square max-w-[400px] mx-auto rounded-2xl overflow-hidden bg-slate-950/50"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Loading orbit...
          </div>
        }
      >
        <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
          <Scene color={grahaColor} slug={slug} exaltation={exaltation} debilitation={debilitation} />
        </Canvas>
      </Suspense>
      <p className="text-center text-xs text-muted-foreground pb-2">
        Drag to rotate. Scroll to zoom.
      </p>
    </motion.div>
  );
}
