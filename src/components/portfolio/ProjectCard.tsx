import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectCard = ({
  title = "Project Title",
  description = "A brief description of the project and its key features. This showcases the main functionality and purpose of the project.",
  imageUrl = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  liveUrl = "#",
  githubUrl = "#",
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-[560px]"
    >
      <Card className="h-[400px] overflow-hidden bg-white dark:bg-gray-800">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        <CardHeader className="space-y-1">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <CardDescription className="line-clamp-2">
            {description}
          </CardDescription>
        </CardContent>

        <CardFooter className="flex justify-end gap-2">
          {githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Code
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button size="sm" asChild>
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
