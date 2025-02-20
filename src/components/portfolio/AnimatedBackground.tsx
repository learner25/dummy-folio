import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AnimatedBackgroundProps {
  color?: string;
  density?: number;
  amplitude?: number;
}

const AnimatedBackground = ({
  color = "#6366f1",
  density = 20,
  amplitude = 30,
}: AnimatedBackgroundProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!svgRef.current || !containerRef.current) return;

    const points = [];
    const width = window.innerWidth;
    const height = 982;
    const cellSize = width / density;

    for (let y = 0; y < height / cellSize; y++) {
      for (let x = 0; x < density + 1; x++) {
        points.push({
          x: x * cellSize,
          y: y * cellSize,
          originX: x * cellSize,
          originY: y * cellSize,
        });
      }
    }

    const updatePoints = (event: MouseEvent) => {
      points.forEach((point) => {
        const dx = event.clientX - point.x;
        const dy = event.clientY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * amplitude;
          point.x = point.originX + (dx / distance) * force;
          point.y = point.originY + (dy / distance) * force;
        } else {
          point.x += (point.originX - point.x) * 0.1;
          point.y += (point.originY - point.y) * 0.1;
        }
      });

      updatePath();
    };

    const updatePath = () => {
      const paths = [];
      for (let y = 0; y < height / cellSize - 1; y++) {
        const row = points.slice(y * (density + 1), (y + 1) * (density + 1));
        const nextRow = points.slice(
          (y + 1) * (density + 1),
          (y + 2) * (density + 1),
        );

        for (let x = 0; x < density; x++) {
          const p1 = row[x];
          const p2 = row[x + 1];
          const p3 = nextRow[x];
          const p4 = nextRow[x + 1];

          paths.push(
            `M ${p1.x},${p1.y} L ${p2.x},${p2.y} L ${p4.x},${p4.y} L ${p3.x},${p3.y} Z`,
          );
        }
      }

      if (svgRef.current) {
        const pathElements = svgRef.current.querySelectorAll("path");
        pathElements.forEach((path, i) => {
          path.setAttribute("d", paths[i]);
        });
      }
    };

    // Create initial paths
    const initialPaths = [];
    for (let y = 0; y < height / cellSize - 1; y++) {
      for (let x = 0; x < density; x++) {
        initialPaths.push(`<path fill="${color}" opacity="0.1"></path>`);
      }
    }

    if (svgRef.current) {
      svgRef.current.innerHTML = initialPaths.join("");
      updatePath();
    }

    // Scroll animation
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const rotation = progress * 10;
          const scale = 1 + progress * 0.2;
          if (svgRef.current) {
            svgRef.current.style.transform = `rotate(${rotation}deg) scale(${scale})`;
          }
        },
      },
    });

    window.addEventListener("mousemove", updatePoints);

    return () => {
      window.removeEventListener("mousemove", updatePoints);
    };
  }, [color, density, amplitude]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-[982px] overflow-hidden bg-gray-50 dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        ref={svgRef}
        className="w-full h-full transition-transform duration-300 ease-out"
        viewBox={`0 0 ${window.innerWidth} 982`}
        preserveAspectRatio="xMidYMid slice"
      />
    </motion.div>
  );
};

export default AnimatedBackground;
