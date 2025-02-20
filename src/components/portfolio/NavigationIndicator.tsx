import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  label: string;
}

interface NavigationIndicatorProps {
  sections?: Section[];
  activeSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

const NavigationIndicator = ({
  sections = [
    { id: "hero", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
  activeSection = "hero",
  onSectionClick = () => {},
}: NavigationIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20,
      }}
      transition={{ duration: 0.3 }}
      className="fixed right-8 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-gray-800 rounded-full py-4 px-2 shadow-lg"
    >
      <nav className="flex flex-col items-center gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionClick(section.id)}
            className="group relative flex items-center"
            aria-label={`Navigate to ${section.label} section`}
          >
            <span className="absolute right-full mr-2 px-2 py-1 rounded-md bg-gray-900 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {section.label}
            </span>
            <motion.div
              className={cn(
                "w-3 h-3 rounded-full transition-colors duration-200",
                activeSection === section.id
                  ? "bg-primary"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500",
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          </button>
        ))}
      </nav>
    </motion.div>
  );
};

export default NavigationIndicator;
