import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, ExternalLink, Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export const ProjectList = ({ projects, onEdit, onDelete }: ProjectListProps) => {
  if (projects.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-muted-foreground">No hay proyectos aún. ¡Crea el primero!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-4"
          >
            {/* Thumbnail */}
            <div className="w-full sm:w-24 h-32 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={project.imagenUrl || "/placeholder.svg"}
                alt={project.titulo}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2 mb-2">
                <h4 className="font-semibold text-foreground truncate">
                  {project.titulo}
                </h4>
                {project.destacado && (
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {project.descripcion}
              </p>
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {project.tags.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.tags.length - 4}
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 justify-end">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onEdit(project)}
                className="h-9 w-9"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => onDelete(project.id)}
                className="h-9 w-9 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {project.repoLink && (
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="h-9 w-9"
                >
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {project.demoLink && (
                <Button
                  size="icon"
                  variant="ghost"
                  asChild
                  className="h-9 w-9"
                >
                  <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
