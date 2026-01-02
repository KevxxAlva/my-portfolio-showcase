import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

export const ProjectsSection = () => {
  const { projects, isLoaded } = useProjects();
  const [activeFilter, setActiveFilter] = useState("Todo");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allTags = useMemo(() => {
    return ["Todo", ...new Set(projects.flatMap((p) => p.tags))];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todo") return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter, projects]);

  if (!isLoaded) return null;

  return (
    <section id="proyectos" className="py-24 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono mb-4">{"<Proyectos />"}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Mi </span>
            <span className="gradient-text">Trabajo</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Una selección de proyectos que demuestran mis habilidades en
            desarrollo frontend, backend y full-stack.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeFilter === tag
                  ? "bg-primary text-primary-foreground neon-glow"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tag}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">
              No hay proyectos con este filtro.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};