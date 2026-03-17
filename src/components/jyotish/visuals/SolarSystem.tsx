"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import Link from "next/link";
import { motion } from "framer-motion";
import { grahas } from "@/data/grahas";
import type { Mesh, Group } from "three";

const GRAHA_CONFIG: Record<string, { distance: number; speed: number; color: string; size: number }> = {
  surya: { distance: 0, speed: 0, color: "#fbbf24", size: 0.5 },
  chandra: { distance: 1.2, speed: 0.8, color: "#e2e8f0", size: 0.2 },
  budha: { distance: 1.8, speed: 1.6, color: "#22c55e", size: 0.15 },
  shukra: { distance: 2.4, speed: 1.2, color: "#ec4899", size: 0.22 },
  mangala: { distance: 3.2, speed: 0.6, color: "#ef4444", size: 0.18 },
  brihaspati: { distance: 4.2, speed: 0.3, color: "#eab308", size: 0.35 },
  shani: { distance: 5.2, speed: 0.15, color: "#6366f1", size: 0.3 },
  rahu: { distance: 3.8, speed: -0.1, color: "#475569", size: 0.12 },
  ketu: { distance: 3.8, speed: -0.1, color: "#94a3b8", size: 0.12 },
};

function Planet({ slug, name, config, onClick }: {
  slug: string;
  name: string;
  config: { distance: number; speed: number; color: string; size: number };
  onClick: () => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current && config.distance > 0) {
      const t = clock.getElapsedTime() * config.speed;
      groupRef.current.position.x = Math.cos(t) * config.distance;
      groupRef.current.position.z = Math.sin(t) * config.distance;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[config.size, 16, 16]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.color}
          emissiveIntensity={slug === "surya" ? 0.8 : 0.2}
        />
      </mesh>
      <Text
        position={[0, config.size + 0.15, 0]}
        fontSize={0.15}
        color="#94a3b8"
        anchorX="center"
        anchorY="bottom"
      >
        {name}
      </Text>
    </group>
  );
}

function OrbitRing({ radius }: { radius: number }) {
  const points: [number, number, number][] = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
  }

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(points.flat()), 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#334155" opacity={0.3} transparent />
    </line>
  );
}

function Scene({ onPlanetClick }: { onPlanetClick: (slug: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#fbbf24" />

      {/* Orbit rings */}
      {Object.entries(GRAHA_CONFIG)
        .filter(([, config]) => config.distance > 0)
        .map(([slug, config]) => (
          <OrbitRing key={`orbit-${slug}`} radius={config.distance} />
        ))}

      {/* Planets */}
      {grahas.map((graha) => {
        const config = GRAHA_CONFIG[graha.slug];
        if (!config) return null;
        return (
          <Planet
            key={graha.slug}
            slug={graha.slug}
            name={graha.name}
            config={config}
            onClick={() => onPlanetClick(graha.slug)}
          />
        );
      })}

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  );
}

export function SolarSystem() {
  function handlePlanetClick(slug: string) {
    window.location.href = `/jyotish/grahas/${slug}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full aspect-square max-w-[600px] mx-auto rounded-2xl overflow-hidden bg-slate-950/50"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
            Loading Navagraha...
          </div>
        }
      >
        <Canvas camera={{ position: [0, 6, 8], fov: 50 }}>
          <Scene onPlanetClick={handlePlanetClick} />
        </Canvas>
      </Suspense>
      <p className="text-center text-xs text-muted-foreground mt-2 pb-2">
        Click a graha to explore. Drag to rotate.
      </p>
    </motion.div>
  );
}
