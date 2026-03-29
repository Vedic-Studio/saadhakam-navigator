"use client";

import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Text, Billboard } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { grahas } from "@/data/grahas";
import { GRAHA_ICONS } from "@/components/jyotish/icons/grahas";
import * as THREE from "three";
import { TextureLoader } from "three";
import type { Mesh, Group } from "three";

/* ───────────────────────── Config ───────────────────────── */

const GRAHA_CONFIG: Record<
  string,
  {
    distance: number;
    speed: number;
    color: string;
    emissiveColor: string;
    size: number;
    rings?: boolean;
    trailOpacity: number;
  }
> = {
  surya: {
    distance: 0,
    speed: 0,
    color: "#fbbf24",
    emissiveColor: "#ff9500",
    size: 0.55,
    trailOpacity: 0,
  },
  chandra: {
    distance: 1.4,
    speed: 0.7,
    color: "#e2e8f0",
    emissiveColor: "#b8c5d6",
    size: 0.18,
    trailOpacity: 0.15,
  },
  budha: {
    distance: 2.0,
    speed: 1.4,
    color: "#22c55e",
    emissiveColor: "#16a34a",
    size: 0.13,
    trailOpacity: 0.12,
  },
  shukra: {
    distance: 2.6,
    speed: 1.0,
    color: "#ec4899",
    emissiveColor: "#db2777",
    size: 0.2,
    trailOpacity: 0.18,
  },
  mangala: {
    distance: 3.4,
    speed: 0.55,
    color: "#ef4444",
    emissiveColor: "#dc2626",
    size: 0.16,
    trailOpacity: 0.2,
  },
  prithvi: {
    distance: 3.0,
    speed: 0.4,
    color: "#3b82f6",
    emissiveColor: "#2563eb",
    size: 0.18,
    trailOpacity: 0.15,
  },
  brihaspati: {
    distance: 4.2,
    speed: 0.25,
    color: "#eab308",
    emissiveColor: "#ca8a04",
    size: 0.32,
    rings: true,
    trailOpacity: 0.15,
  },
  shani: {
    distance: 5.0,
    speed: 0.12,
    color: "#818cf8",
    emissiveColor: "#6366f1",
    size: 0.28,
    rings: true,
    trailOpacity: 0.12,
  },
  rahu: {
    distance: 3.8,
    speed: -0.08,
    color: "#475569",
    emissiveColor: "#334155",
    size: 0.1,
    trailOpacity: 0.06,
  },
  ketu: {
    distance: 3.8,
    speed: -0.08,
    color: "#94a3b8",
    emissiveColor: "#64748b",
    size: 0.1,
    trailOpacity: 0.06,
  },
};

/* ───────────────────────── Star Field ───────────────────────── */

function StarField({ count = 1500 }: { count?: number }) {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribute stars in a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 20 + Math.random() * 40;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.02 + Math.random() * 0.06;

      // Slight color variation: warm whites, cool blues, occasional gold
      const temp = Math.random();
      if (temp > 0.92) {
        // Gold-ish stars
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.85;
        colors[i * 3 + 2] = 0.4;
      } else if (temp > 0.7) {
        // Cool blue-white
        colors[i * 3] = 0.7 + Math.random() * 0.3;
        colors[i * 3 + 1] = 0.75 + Math.random() * 0.25;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Warm white
        const brightness = 0.6 + Math.random() * 0.4;
        colors[i * 3] = brightness;
        colors[i * 3 + 1] = brightness;
        colors[i * 3 + 2] = brightness * (0.9 + Math.random() * 0.1);
      }
    }
    return { positions, sizes, colors };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.003;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.001) * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[points.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ───────────────────── Twinkling Stars (closer, brighter) ───────────────────── */

function TwinklingStars({ count = 150 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 12 + Math.random() * 10;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, phases };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = 0.4 + Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[data.positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#fffbe6"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ───────────────────── Orbit Ring ───────────────────── */

function OrbitRing({ radius, color, opacity = 0.12 }: { radius: number; color: string; opacity?: number }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} opacity={opacity} transparent linewidth={1} />
    </line>
  );
}

/* ───────────────────── Orbital Trail ───────────────────── */

function OrbitalTrail({
  distance,
  speed,
  color,
  opacity,
}: {
  distance: number;
  speed: number;
  color: string;
  opacity: number;
}) {
  const ref = useRef<THREE.Line>(null);
  const trailLength = 25;

  const geometry = useMemo(() => {
    const positions = new Float32Array(trailLength * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const t = clock.getElapsedTime() * speed;

    for (let i = 0; i < trailLength; i++) {
      const trailT = t - i * 0.04;
      posAttr.setXYZ(
        i,
        Math.cos(trailT) * distance,
        0,
        Math.sin(trailT) * distance
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} linewidth={1} />
    </line>
  );
}

/* ───────────────────── Sun (with corona) ───────────────────── */

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);
  const outerCoronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1.0 + Math.sin(t * 1.5) * 0.06);
      (coronaRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.15 + Math.sin(t * 2.0) * 0.05;
    }
    if (outerCoronaRef.current) {
      outerCoronaRef.current.scale.setScalar(1.0 + Math.sin(t * 0.8 + 1) * 0.04);
      (outerCoronaRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.06 + Math.sin(t * 1.2) * 0.02;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group>
      {/* Core sun sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#ff8c00"
          emissiveIntensity={2.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Inner corona glow */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshBasicMaterial
          color="#ffb347"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona */}
      <mesh ref={outerCoronaRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight intensity={4} color="#ffd080" distance={20} decay={2} />
      <pointLight intensity={1.5} color="#ff8c00" distance={10} decay={2} />
    </group>
  );
}

/* ───────────────────── Planet ───────────────────── */

function Planet({
  slug,
  name,
  config,
  isHovered,
  onHover,
  onClick,
}: {
  slug: string;
  name: string;
  config: (typeof GRAHA_CONFIG)[string];
  isHovered: boolean;
  onHover: (slug: string | null) => void;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current || config.distance === 0) return;
    const t = clock.getElapsedTime() * config.speed;
    groupRef.current.position.x = Math.cos(t) * config.distance;
    groupRef.current.position.z = Math.sin(t) * config.distance;

    // Planet self-rotation
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
    }

    // Glow pulse
    if (glowRef.current) {
      const pulse = isHovered ? 1.6 : 1.0 + Math.sin(clock.getElapsedTime() * 2 + config.distance) * 0.15;
      glowRef.current.scale.setScalar(pulse);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isHovered ? 0.25 : 0.1;
    }
  });

  if (config.distance === 0) return null; // Sun handled separately

  const hoverScale = isHovered ? 1.3 : 1.0;

  return (
    <group ref={groupRef}>
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => onHover(slug)}
        onPointerOut={() => onHover(null)}
        scale={hoverScale}
      >
        <sphereGeometry args={[config.size, 24, 24]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissiveColor}
          emissiveIntensity={isHovered ? 1.8 : 0.6}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Atmospheric glow shell */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[config.size * 1.8, 12, 12]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* Rings for Brihaspati and Shani */}
      {config.rings && (
        <mesh rotation={[Math.PI * 0.4, 0.2, 0]}>
          <ringGeometry args={[config.size * 1.4, config.size * 2.0, 64]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Name label */}
      <Text
        position={[0, config.size + 0.25, 0]}
        fontSize={isHovered ? 0.18 : 0.13}
        color={isHovered ? config.color : "#94a3b8"}
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {name}
      </Text>

      {/* Small point light on each planet for local illumination */}
      <pointLight
        intensity={isHovered ? 0.6 : 0.15}
        color={config.color}
        distance={2}
        decay={2}
      />
    </group>
  );
}

/* ───────────────────── Dust Ring (decorative) ───────────────────── */

function DustRing() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const data = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.0 + Math.random() * 5.5;
      const height = (Math.random() - 0.5) * 0.15;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#fbbf24"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ───────────────────── Scene ───────────────────── */

function Scene({ onPlanetClick }: { onPlanetClick: (slug: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* Ambient + subtle directional fill */}
      <ambientLight intensity={0.08} color="#1e293b" />
      <directionalLight position={[10, 10, 5]} intensity={0.15} color="#e2e8f0" />

      {/* Star backgrounds */}
      <StarField count={1500} />
      <TwinklingStars count={150} />

      {/* Dust particles in the orbital plane */}
      <DustRing />

      {/* Sun with corona */}
      <Sun />

      {/* Orbit rings + trails */}
      {Object.entries(GRAHA_CONFIG)
        .filter(([, config]) => config.distance > 0)
        .map(([slug, config]) => (
          <group key={`orbit-${slug}`}>
            <OrbitRing
              radius={config.distance}
              color={config.color}
              opacity={hovered === slug ? 0.3 : 0.08}
            />
            {config.trailOpacity > 0 && (
              <OrbitalTrail
                distance={config.distance}
                speed={config.speed}
                color={config.color}
                opacity={config.trailOpacity}
              />
            )}
          </group>
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
            isHovered={hovered === graha.slug}
            onHover={setHovered}
            onClick={() => onPlanetClick(graha.slug)}
          />
        );
      })}

      {/* Earth (Prithvi) — visual only, not a Jyotish graha */}
      <Planet
        slug="prithvi"
        name="Prithvi"
        config={GRAHA_CONFIG.prithvi}
        isHovered={hovered === "prithvi"}
        onHover={setHovered}
        onClick={() => {}}
      />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>

      <OrbitControls
        enableZoom
        enablePan={false}
        minDistance={3}
        maxDistance={15}
        autoRotate
        autoRotateSpeed={0.15}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.2}
      />
    </>
  );
}

/* ───────────────────── Exported Component ───────────────────── */

export function SolarSystem() {
  function handlePlanetClick(slug: string) {
    window.location.href = `/jyotish/grahas/${slug}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full aspect-video max-w-[900px] mx-auto rounded-2xl overflow-hidden bg-black relative"
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-black text-muted-foreground text-sm">
            <div className="text-center space-y-3">
              <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
              <p>Initializing Navagraha system...</p>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 6, 11], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["#020617"]} />
          <fog attach="fog" args={["#020617", 25, 55]} />
          <Scene onPlanetClick={handlePlanetClick} />
        </Canvas>
      </Suspense>
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-[11px] text-slate-500 tracking-wide">
          Click a graha to explore &middot; Drag to rotate &middot; Scroll to zoom
        </p>
      </div>
    </motion.div>
  );
}
