import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Code2,
  Palette,
  Terminal,
  Laptop,
  Database,
  Cloud,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
  level: number;
}

interface SkillsSectionProps {
  skills?: Skill[];
  title?: string;
  subtitle?: string;
}

const defaultSkills: Skill[] = [
  {
    name: "Frontend Development",
    icon: <Palette className="w-8 h-8" />,
    description: "Building responsive and interactive user interfaces",
    level: 90,
  },
  {
    name: "Backend Development",
    icon: <Terminal className="w-8 h-8" />,
    description: "Creating robust server-side applications",
    level: 85,
  },
  {
    name: "Web Technologies",
    icon: <Code2 className="w-8 h-8" />,
    description: "HTML5, CSS3, JavaScript/TypeScript",
    level: 95,
  },
  {
    name: "Software Architecture",
    icon: <Laptop className="w-8 h-8" />,
    description: "Designing scalable software solutions",
    level: 80,
  },
  {
    name: "Database Management",
    icon: <Database className="w-8 h-8" />,
    description: "SQL and NoSQL database systems",
    level: 75,
  },
  {
    name: "Cloud Services",
    icon: <Cloud className="w-8 h-8" />,
    description: "AWS, Azure, and Google Cloud Platform",
    level: 70,
  },
];

const SkillsSection = ({
  skills = defaultSkills,
  title = "Skills & Expertise",
  subtitle = "A comprehensive overview of my technical capabilities and expertise",
}: SkillsSectionProps) => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TooltipProvider>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="p-3 rounded-full bg-primary/10 text-primary">
                            {skill.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {skill.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {skill.description}
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <motion.div
                            className="bg-primary h-2.5 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Proficiency: {skill.level}%</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
