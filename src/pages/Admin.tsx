import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowLeft, LayoutDashboard, LogOut, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/hooks/useProjects";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useMessages } from "@/hooks/useMessages";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ProjectList } from "@/components/admin/ProjectList";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { TestimonialList } from "@/components/admin/TestimonialList";
import { MessageList } from "@/components/admin/MessageList";
import { useToast } from "@/hooks/use-toast";
import type { Project } from "@/data/projects";
import type { Testimonial } from "@/data/testimonials";
import { supabase } from "@/integrations/supabase/client";
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

type AdminTab = "projects" | "testimonials" | "messages";

const Admin = () => {
  const { projects, isLoaded: projectsLoaded, addProject, updateProject, deleteProject } = useProjects();
  const { testimonials, isLoaded: testimonialsLoaded, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const { messages, isLoaded: messagesLoaded, deleteMessage } = useMessages();
  
  const [activeTab, setActiveTab] = useState<AdminTab>("projects");
  
  // Project State
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);

  // Testimonial State
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [deleteTestimonialId, setDeleteTestimonialId] = useState<string | null>(null);

  // Message State
  const [deleteMessageId, setDeleteMessageId] = useState<string | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  // --- Projects Handlers ---
  const handleSaveProject = (data: Omit<Project, "id">) => {
    if (editingProject) {
      updateProject(editingProject.id, data);
      toast({ title: "Proyecto actualizado", description: `"${data.titulo}" se actualizó correctamente.` });
    } else {
      addProject(data);
      toast({ title: "Proyecto creado", description: `"${data.titulo}" se agregó al portafolio.` });
    }
    setShowProjectForm(false);
    setEditingProject(null);
  };

  const handleDeleteProject = () => {
    if (deleteProjectId) {
      const project = projects.find((p) => p.id === deleteProjectId);
      deleteProject(deleteProjectId);
      toast({ title: "Proyecto eliminado", description: `"${project?.titulo}" fue eliminado.`, variant: "destructive" });
      setDeleteProjectId(null);
    }
  };

  // --- Testimonials Handlers ---
  const handleSaveTestimonial = (data: Omit<Testimonial, "id">) => {
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, data);
      toast({ title: "Testimonio actualizado", description: "El testimonio se actualizó correctamente." });
    } else {
      addTestimonial(data);
      toast({ title: "Testimonio creado", description: "El testimonio se agregó correctamente." });
    }
    setShowTestimonialForm(false);
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = () => {
    if (deleteTestimonialId) {
      deleteTestimonial(deleteTestimonialId);
      toast({ title: "Testimonio eliminado", description: "El testimonio fue eliminado.", variant: "destructive" });
      setDeleteTestimonialId(null);
    }
  };

    // --- Messages Handlers ---
  const handleDeleteMessage = () => {
     if (deleteMessageId) {
       deleteMessage(deleteMessageId);
       setDeleteMessageId(null);
     }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (!projectsLoaded || !testimonialsLoaded || !messagesLoaded) {
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

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8"
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
                <h1 className="text-xl md:text-2xl font-bold text-foreground transition-colors">
                  Panel de Administración
                </h1>
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Gestiona tu contenido
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 flex-1 md:flex-none"
            >
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </Button>
            {activeTab !== "messages" && (
              <Button
                onClick={() => {
                  if (activeTab === "projects") {
                    setEditingProject(null);
                    setShowProjectForm(true);
                  } else if (activeTab === "testimonials") {
                    setEditingTestimonial(null);
                    setShowTestimonialForm(true);
                  }
                }}
                className="gap-2 flex-1 md:flex-none"
              >
                <Plus className="h-4 w-4" />
                {activeTab === "projects" ? "Nuevo proyecto" : "Nuevo testimonio"}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
           <button
             onClick={() => setActiveTab("projects")}
             className={`pb-2 px-4 transition-colors relative whitespace-nowrap ${activeTab === "projects" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
           >
             Proyectos
             {activeTab === "projects" && <motion.div layoutId="tab" className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary" />}
           </button>
           <button
             onClick={() => setActiveTab("testimonials")}
             className={`pb-2 px-4 transition-colors relative whitespace-nowrap ${activeTab === "testimonials" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
           >
             Testimonios
             {activeTab === "testimonials" && <motion.div layoutId="tab" className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary" />}
           </button>
           <button
             onClick={() => setActiveTab("messages")}
             className={`pb-2 px-4 transition-colors relative whitespace-nowrap flex items-center gap-2 ${activeTab === "messages" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
           >
             <MessageSquare className="w-4 h-4" />
             Mensajes
             <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">{messages.length}</span>
             {activeTab === "messages" && <motion.div layoutId="tab" className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-primary" />}
           </button>
        </div>

        {/* --- PROJECTS CONTENT --- */}
        {activeTab === "projects" && (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <div className="glass rounded-xl p-4 text-center hover-lift">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{projects.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total proyectos</p>
              </div>
              <div className="glass rounded-xl p-4 text-center hover-lift">
                <p className="text-2xl md:text-3xl font-bold text-primary">{projects.filter((p) => p.destacado).length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Destacados</p>
              </div>
            </motion.div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {showProjectForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <ProjectForm
                    project={editingProject}
                    onSave={handleSaveProject}
                    onCancel={() => {
                      setShowProjectForm(false);
                      setEditingProject(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
               <ProjectList
                projects={projects}
                onEdit={(p) => { setEditingProject(p); setShowProjectForm(true); }}
                onDelete={(id) => setDeleteProjectId(id)}
              />
            </motion.div>
          </>
        )}

        {/* --- TESTIMONIALS CONTENT --- */}
        {activeTab === "testimonials" && (
          <>
             {/* Stats */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4 mb-8 max-w-md"
            >
              <div className="glass rounded-xl p-4 text-center hover-lift">
                <p className="text-2xl md:text-3xl font-bold text-foreground">{testimonials.length}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Total testimonios</p>
              </div>
             </motion.div>

            {/* Form */}
            <AnimatePresence mode="wait">
              {showTestimonialForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-8 overflow-hidden"
                >
                  <TestimonialForm
                    testimonial={editingTestimonial}
                    onSave={handleSaveTestimonial}
                    onCancel={() => {
                      setShowTestimonialForm(false);
                      setEditingTestimonial(null);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
             <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TestimonialList
                testimonials={testimonials}
                onEdit={(t) => { setEditingTestimonial(t); setShowTestimonialForm(true); }}
                onDelete={(id) => setDeleteTestimonialId(id)}
              />
            </motion.div>
          </>
        )}

         {/* --- MESSAGES CONTENT --- */}
         {activeTab === "messages" && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
           >
              <MessageList 
                messages={messages} 
                onDelete={(id) => setDeleteMessageId(id)} 
              />
           </motion.div>
         )}

      </div>

      {/* Delete Confirmation (Shared) */}
      <AlertDialog 
        open={!!deleteProjectId || !!deleteTestimonialId || !!deleteMessageId} 
        onOpenChange={() => {
          setDeleteProjectId(null);
          setDeleteTestimonialId(null);
          setDeleteMessageId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar elemento?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Será eliminado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => {
                if (deleteProjectId) handleDeleteProject();
                if (deleteTestimonialId) handleDeleteTestimonial();
                if (deleteMessageId) handleDeleteMessage();
              }} 
              className="bg-destructive hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default Admin;
