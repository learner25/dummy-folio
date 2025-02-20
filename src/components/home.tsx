import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import AnimatedBackground from "./portfolio/AnimatedBackground";
import HeroSection from "./portfolio/HeroSection";
import ProjectsSection from "./portfolio/ProjectsSection";
import SkillsSection from "./portfolio/SkillsSection";
import NavigationIndicator from "./portfolio/NavigationIndicator";

interface Section {
  id: string;
  ref: React.RefObject<HTMLElement>;
}

const Home = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollY } = useScroll();

  const sections: Section[] = [
    { id: "hero", ref: React.createRef() },
    { id: "projects", ref: React.createRef() },
    { id: "skills", ref: React.createRef() },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const pageYOffset = window.scrollY;
      let currentSection = "hero";

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          const element = ref.current;
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = pageYOffset + top;
          const elementBottom = pageYOffset + bottom;

          if (
            pageYOffset >= elementTop - 200 &&
            pageYOffset < elementBottom - 200
          ) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (section?.ref.current) {
      section.ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <AnimatedBackground />

        <section ref={sections[0].ref}>
          <HeroSection />
        </section>

        <section ref={sections[1].ref}>
          <ProjectsSection />
        </section>

        <section ref={sections[2].ref}>
          <SkillsSection />
        </section>

        <NavigationIndicator
          activeSection={activeSection}
          onSectionClick={scrollToSection}
          sections={[
            { id: "hero", label: "Home" },
            { id: "projects", label: "Projects" },
            { id: "skills", label: "Skills" },
          ]}
        />
      </motion.div>
    </TooltipProvider>
  );
};

export default Home;
