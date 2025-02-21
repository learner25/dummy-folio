import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface RibbonProps {
  color: string;
  index: number;
  total: number;
}

const Ribbon = ({ color, index, total }: RibbonProps) => {
  const { scrollYProgress } = useScroll();
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, (index + 1) * 200]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.1, 0.3 + index * 0.1, 0.3 + index * 0.1, 0.1],
  );

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index % 2 === 0 ? 1 : -1) * 15],
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.2 + index * 0.1, 1],
  );

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <motion.path
      d={`M0,${50 + index * 100} C300,${50 + index * 100} 700,${50 + index * 100} 1000,${50 + index * 100}`}
      style={{
        y: yOffset,
        rotate,
        scale,
        opacity,
        pathLength,
      }}
      stroke={color}
      strokeWidth={80 - index * 5}
      fill="none"
      initial={{ pathLength: 0 }}
    />
  );
};

interface AnimatedBackgroundProps {
  colors?: string[];
  ribbonCount?: number;
}

const AnimatedBackground = ({
  colors = [
    "#6366f1", // indigo-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#06b6d4", // cyan-500
    "#14b8a6", // teal-500
  ],
  ribbonCount = 5,
}: AnimatedBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
      >
        {Array.from({ length: ribbonCount }).map((_, i) => (
          <Ribbon
            key={i}
            color={colors[i % colors.length]}
            index={i}
            total={ribbonCount}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export default AnimatedBackground;
