import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

interface ParticleProps {
  count?: number;
  scrollY?: number;
  mouseX?: number;
  mouseY?: number;
}

const colors = [
  new THREE.Color("#60A5FA"), // blue-400
  new THREE.Color("#C084FC"), // purple-400
  new THREE.Color("#F472B6"), // pink-400
  new THREE.Color("#818CF8"), // indigo-400
  new THREE.Color("#22D3EE"), // cyan-400
  new THREE.Color("#2DD4BF"), // teal-400
];

function CameraController({ mouseX, mouseY }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));

  useFrame(() => {
    // Calculate target position based on mouse
    targetPosition.current.x = mouseX * 2;
    targetPosition.current.y = mouseY * 2;
    targetPosition.current.z = 5 - Math.abs(mouseX * mouseY) * 2; // Move camera closer/further based on mouse position

    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Particles({
  count = 1000,
  scrollY = 0,
  mouseX = 0,
  mouseY = 0,
}: ParticleProps) {
  const points = useRef<THREE.Points>(null);
  const particlesGeometry = useRef<THREE.BufferGeometry>();

  useEffect(() => {
    if (!particlesGeometry.current) {
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const rotations = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        // Position - create a sphere distribution
        const radius = 5;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);

        // Color
        const color = new THREE.Color().setHSL(Math.random(), 0.7, 0.7);
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;

        // Size
        sizes[i] = Math.random() * 0.2 + 0.1;

        // Rotation
        rotations[i] = Math.random() * Math.PI;
      }

      particlesGeometry.current = new THREE.BufferGeometry();
      particlesGeometry.current.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
      particlesGeometry.current.setAttribute(
        "color",
        new THREE.BufferAttribute(colors, 3),
      );
      particlesGeometry.current.setAttribute(
        "size",
        new THREE.BufferAttribute(sizes, 1),
      );
      particlesGeometry.current.setAttribute(
        "rotation",
        new THREE.BufferAttribute(rotations, 1),
      );
    }
  }, [count]);

  useFrame((state) => {
    if (!points.current || !particlesGeometry.current) return;

    const time = state.clock.getElapsedTime();
    const positions = particlesGeometry.current.attributes.position
      .array as Float32Array;
    const rotations = particlesGeometry.current.attributes.rotation
      .array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Gentle floating motion
      const originalX = positions[i3];
      const originalY = positions[i3 + 1];
      const originalZ = positions[i3 + 2];

      positions[i3] = originalX + Math.sin(time * 0.5 + i) * 0.02;
      positions[i3 + 1] = originalY + Math.cos(time * 0.5 + i) * 0.02;
      positions[i3 + 2] = originalZ + Math.sin(time * 0.3 + i) * 0.02;

      // Update rotations
      rotations[i] += 0.01 * (1 + scrollY * 0.001);
    }

    particlesGeometry.current.attributes.position.needsUpdate = true;
    particlesGeometry.current.attributes.rotation.needsUpdate = true;
  });

  return (
    <points ref={points}>
      {particlesGeometry.current && (
        <bufferGeometry {...particlesGeometry.current} />
      )}
      <pointsMaterial
        size={0.1}
        transparent
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

interface ToonParticlesProps {
  scrollY?: number;
}

const ToonParticles = ({ scrollY = 0 }: ToonParticlesProps) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: -(e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        <CameraController mouseX={mousePosition.x} mouseY={mousePosition.y} />
        <Particles
          count={1000}
          scrollY={scrollY}
          mouseX={mousePosition.x}
          mouseY={mousePosition.y}
        />
      </Canvas>
    </div>
  );
};

export default ToonParticles;
