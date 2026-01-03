import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[9990]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
            <div className="glass-strong rounded-2xl overflow-hidden max-h-[85vh] flex flex-col w-full">
              {/* Header Image */}
              <div className="relative h-40 md:h-64 flex-shrink-0">
                <img
                  src={project.imagenUrl}
                  alt={project.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                
                {/* Close Button */}
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full glass text-foreground hover:bg-secondary transition-colors z-10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Cerrar modal"
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Featured Badge */}
                {project.destacado && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="hidden sm:inline">Proyecto Destacado</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {project.titulo}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-lg bg-secondary text-secondary-foreground font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-8 text-sm sm:text-base">
                  {project.descripcionCompleta}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pb-2">
                  {project.demoLink && (
                    <Button variant="hero" size="lg" className="flex-1 w-full" asChild>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                  {project.repoLink && (
                    <Button variant="glass" size="lg" className="flex-1 w-full" asChild>
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Ver Código
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};