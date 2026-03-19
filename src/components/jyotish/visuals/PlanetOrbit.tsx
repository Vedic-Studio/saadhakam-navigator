"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";
import * as THREE from "three";
import { TextureLoader } from "three";
import type { Mesh } from "three";

/* ───────────────────────── Types ───────────────────────── */

interface PlanetOrbitProps {
  name: string;
  color?: string;
  exaltation?: string;
  debilitation?: string;
}

/* ───────────────────────── Constants ───────────────────────── */

const ZODIAC_SIGNS = [
  "Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya",
  "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena",
];

const ZODIAC_SYMBOLS = [
  "\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D",
  "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653",
];

const GRAHA_COLORS: Record<string, { primary: string; emissive: string }> = {
  surya: { primary: "#fbbf24", emissive: "#ff8c00" },
  chandra: { primary: "#e2e8f0", emissive: "#b8c5d6" },
  mangala: { primary: "#ef4444", emissive: "#dc2626" },
  budha: { primary: "#22c55e", emissive: "#16a34a" },
  brihaspati: { primary: "#eab308", emissive: "#ca8a04" },
  shukra: { primary: "#ec4899", emissive: "#db2777" },
  shani: { primary: "#818cf8", emissive: "#6366f1" },
  rahu: { primary: "#475569", emissive: "#334155" },
  ketu: { primary: "#94a3b8", emissive: "#64748b" },
};

/* ───────────────────────── Star Field ───────────────────────── */

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const count = 1200;

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 15 + Math.random() * 25;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const brightness = 0.5 + Math.random() * 0.5;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness * (0.9 + Math.random() * 0.1);
    }
    return { positions, colors };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[data.colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.85} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ───────────────────────── Graha Sprite ───────────────────────── */

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

/* ───────────────────────── Orbiting Planet ───────────────────────── */

function OrbitingPlanet({ color, emissive, slug }: { color: string; emissive: string; slug: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const trailRef = useRef<THREE.Line>(null);
  const trailLength = 50;

  const trailGeometry = useMemo(() => {
    const positions = new Float32Array(trailLength * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.3;
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(t) * 2;
      meshRef.current.position.z = Math.sin(t) * 2;
      meshRef.current.rotation.y += 0.01;
    }
    if (glowRef.current) {
      glowRef.current.position.x = Math.cos(t) * 2;
      glowRef.current.position.z = Math.sin(t) * 2;
      glowRef.current.scale.setScalar(1.0 + Math.sin(t * 3) * 0.1);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(t * 2) * 0.04;
    }
    // Trail
    if (trailRef.current) {
      const posAttr = trailRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let i = 0; i < trailLength; i++) {
        const trailT = t - i * 0.03;
        posAttr.setXYZ(i, Math.cos(trailT) * 2, 0, Math.sin(trailT) * 2);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Planet body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={1.2}
          roughness={0.3}
          metalness={0.4}
        />
        <Suspense fallback={null}>
          <GrahaSprite slug={slug} yOffset={0.45} />
        </Suspense>
      </mesh>

      {/* Atmospheric glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.BackSide} depthWrite={false} />
      </mesh>

      {/* Orbital trail */}
      <line ref={trailRef} geometry={trailGeometry}>
        <lineBasicMaterial color={color} transparent opacity={0.2} />
      </line>

      {/* Orbit path ring */}
      {(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const angle = (i / 128) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(angle) * 2, 0, Math.sin(angle) * 2));
        }
        return (
          <line geometry={new THREE.BufferGeometry().setFromPoints(points)}>
            <lineBasicMaterial color={color} opacity={0.1} transparent />
          </line>
        );
      })()}
    </group>
  );
}

/* ───────────────────────── Central Sun ───────────────────────── */

function CentralSun() {
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (coronaRef.current) {
      const t = clock.getElapsedTime();
      coronaRef.current.scale.setScalar(1.0 + Math.sin(t * 1.5) * 0.05);
      (coronaRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.12 + Math.sin(t * 2) * 0.04;
    }
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#ff8c00"
          emissiveIntensity={2.0}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshBasicMaterial color="#ffb347" transparent opacity={0.12} side={THREE.BackSide} />
      </mesh>
      <pointLight intensity={3} color="#ffd080" distance={15} decay={2} />
    </group>
  );
}

/* ───────────────────────── Zodiac Ring ───────────────────────── */

function ZodiacRing({ exaltation, debilitation }: { exaltation?: string; debilitation?: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Zodiac circle ring */}
      {(() => {
        const points: THREE.Vector3[] = [];
        for (let i = 0; i <= 128; i++) {
          const angle = (i / 128) * Math.PI * 2;
          points.push(new THREE.Vector3(Math.cos(angle) * 3.2, 0, Math.sin(angle) * 3.2));
        }
        return (
          <line geometry={new THREE.BufferGeometry().setFromPoints(points)}>
            <lineBasicMaterial color="#334155" opacity={0.15} transparent />
          </line>
        );
      })()}

      {/* Sign markers with glow indicators */}
      {ZODIAC_SIGNS.map((sign, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 3.2;
        const isExalt = sign === exaltation;
        const isDebl = sign === debilitation;
        const markerColor = isExalt ? "#22c55e" : isDebl ? "#ef4444" : "#475569";

        return (
          <group key={sign}>
            {/* Sign divider tick */}
            {(() => {
              const innerR = 2.95;
              const outerR = 3.45;
              const points = [
                new THREE.Vector3(Math.cos(angle) * innerR, 0, Math.sin(angle) * innerR),
                new THREE.Vector3(Math.cos(angle) * outerR, 0, Math.sin(angle) * outerR),
              ];
              return (
                <line geometry={new THREE.BufferGeometry().setFromPoints(points)}>
                  <lineBasicMaterial color={markerColor} opacity={0.3} transparent />
                </line>
              );
            })()}

            {/* Zodiac symbol */}
            <Text
              position={[Math.cos(angle + Math.PI / 12) * (r + 0.5), 0.1, Math.sin(angle + Math.PI / 12) * (r + 0.5)]}
              fontSize={0.2}
              color={isExalt ? "#22c55e" : isDebl ? "#ef4444" : "#64748b"}
              anchorX="center"
              rotation={[Math.PI * -0.5, 0, -(angle + Math.PI / 12) + Math.PI * 0.5]}
              outlineWidth={0.005}
              outlineColor="#000000"
            >
              {ZODIAC_SYMBOLS[i]}
            </Text>

            {/* Sign name */}
            <Text
              position={[Math.cos(angle + Math.PI / 12) * (r - 0.35), 0, Math.sin(angle + Math.PI / 12) * (r - 0.35)]}
              fontSize={0.1}
              color={isExalt ? "#22c55e" : isDebl ? "#ef4444" : "#475569"}
              anchorX="center"
              rotation={[Math.PI * -0.5, 0, -(angle + Math.PI / 12) + Math.PI * 0.5]}
            >
              {sign}
            </Text>

            {/* Exaltation/debilitation glow dot */}
            {(isExalt || isDebl) && (
              <mesh position={[Math.cos(angle + Math.PI / 12) * r, 0.3, Math.sin(angle + Math.PI / 12) * r]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={markerColor} transparent opacity={0.8} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

/* ───────────────────────── Scene ───────────────────────── */

function Scene({
  color,
  emissive,
  slug,
  exaltation,
  debilitation,
}: {
  color: string;
  emissive: string;
  slug: string;
  exaltation?: string;
  debilitation?: string;
}) {
  return (
    <>
      <ambientLight intensity={0.06} color="#1e293b" />
      <directionalLight position={[8, 8, 4]} intensity={0.1} color="#e2e8f0" />

      <StarField />
      <CentralSun />
      <OrbitingPlanet color={color} emissive={emissive} slug={slug} />
      <ZodiacRing exaltation={exaltation} debilitation={debilitation} />

      <EffectComposer>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.25}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.15} darkness={0.7} />
      </EffectComposer>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.1}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.2}
      />
    </>
  );
}

/* ───────────────────────── Exported Component ───────────────────────── */

export function PlanetOrbit({ name, color, exaltation, debilitation }: PlanetOrbitProps) {
  const slug = name.toLowerCase();
  const palette = GRAHA_COLORS[slug] || { primary: "#f97316", emissive: "#ea580c" };
  const primaryColor = color || palette.primary;
  const emissiveColor = palette.emissive;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="w-full aspect-square max-w-[500px] mx-auto rounded-2xl overflow-hidden bg-black relative"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black text-muted-foreground text-sm">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
              <p>Loading orbit...</p>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 4, 5], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 18, 40]} />
          <Scene
            color={primaryColor}
            emissive={emissiveColor}
            slug={slug}
            exaltation={exaltation}
            debilitation={debilitation}
          />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-[11px] text-slate-500 tracking-wide">
          Drag to rotate &middot; Scroll to zoom
        </p>
      </div>
    </motion.div>
  );
}
