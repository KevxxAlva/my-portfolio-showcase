import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenModal: (project: Project) => void;
}

export const ProjectCard = ({ project, index, onOpenModal }: ProjectCardProps) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-[#09090b] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-primary/30 dark:hover:border-primary/30 transition-colors shadow-sm dark:shadow-none"
      onClick={() => onOpenModal(project)}
    >
      {/* Featured Badge */}
      {project.destacado && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-primary/10 text-primary dark:text-primary px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-primary/20 shadow-sm">
            <Star className="w-3 h-3 fill-current" />
            Destacado
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.imagenUrl}
          alt={project.titulo}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#09090b] opacity-90" />
      </div>

      {/* Content */}
      <div className="p-6 pt-2">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors">
          {project.titulo}
        </h3>
        
        <p className="text-slate-600 dark:text-zinc-400 text-sm mb-6 line-clamp-2">
          {project.descripcion}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/80 text-slate-600 dark:text-zinc-300 font-medium border border-slate-200 dark:border-white/5"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-3 py-1 rounded-full bg-slate-100 dark:bg-zinc-800/80 text-slate-500 dark:text-zinc-400 font-medium border border-slate-200 dark:border-white/5">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 mt-4">
          {project.repoLink && (
            <div
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 group/link hover:text-[#ff0000] dark:hover:text-[#ff0000] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.repoLink, '_blank');
              }}
            >
              <Github className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5" />
              Código
            </div>
          )}
          {project.demoLink && (
            <div
              className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 group/link hover:text-[#ff0000] dark:hover:text-[#ff0000] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.demoLink, '_blank');
              }}
            >
              <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5" />
              Demo
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};