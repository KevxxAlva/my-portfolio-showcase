import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, RotateCcw, ArrowLeft, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectList } from "@/components/admin/ProjectList";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/data/projects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const { projects, isLoaded, addProject, updateProject, deleteProject, resetToDefault } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const { toast } = useToast();

  const handleSave = (data: Omit<Project, "id">) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
      toast({ title: "Proyecto actualizado", description: `"${data.titulo}" se actualizó correctamente.` });
    } else {
      addProject(data);
      toast({ title: "Proyecto creado", description: `"${data.titulo}" se agregó al portafolio.` });
    }
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = () => {
    if (deleteId) {
      const project = projects.find((p) => p.id === deleteId);
      deleteProject(deleteId);
      toast({ title: "Proyecto eliminado", description: `"${project?.titulo}" fue eliminado.`, variant: "destructive" });
      setDeleteId(null);
    }
  };

  const handleReset = () => {
    resetToDefault();
    toast({ title: "Proyectos restaurados", description: "Se restauraron los proyectos por defecto." });
    setShowResetDialog(false);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <LayoutDashboard className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold text-foreground">Panel de Administración</h1>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Gestiona tus proyectos del portafolio
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setShowResetDialog(true)}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Restaurar
            </Button>
            <Button
              onClick={() => {
                setEditingProject(null);
                setShowForm(true);
              }}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Nuevo proyecto
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{projects.length}</p>
            <p className="text-sm text-muted-foreground">Total proyectos</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{projects.filter((p) => p.destacado).length}</p>
            <p className="text-sm text-muted-foreground">Destacados</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-foreground">
              {new Set(projects.flatMap((p) => p.tags)).size}
            </p>
            <p className="text-sm text-muted-foreground">Tags únicos</p>
          </div>
          <div className="glass rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-foreground">
              {projects.filter((p) => p.demoLink).length}
            </p>
            <p className="text-sm text-muted-foreground">Con demo</p>
          </div>
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden"
            >
              <ProjectForm
                project={editingProject}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Proyectos ({projects.length})
          </h2>
          <ProjectList
            projects={projects}
            onEdit={handleEdit}
            onDelete={(id) => setDeleteId(id)}
          />
        </motion.div>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar proyecto?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El proyecto será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Confirmation */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Restaurar proyectos?</AlertDialogTitle>
            <AlertDialogDescription>
              Esto eliminará todos tus cambios y restaurará los proyectos originales.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleReset}>
              Restaurar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
