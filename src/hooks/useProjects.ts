import { useState, useEffect } from "react";
import { type Project } from "@/data/projects";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedProjects: Project[] = data.map((p: any) => ({
          id: p.id,
          titulo: p.titulo,
          descripcion: p.descripcion,
          descripcionCompleta: p.descripcion_completa,
          tags: p.tags,
          imagenUrl: p.imagen_url,
          repoLink: p.repo_link,
          demoLink: p.demo_link,
          destacado: p.destacado
        }));
        setProjects(mappedProjects);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los proyectos. Verifica tu conexión.",
        variant: "destructive"
      });
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const addProject = async (project: Omit<Project, "id">) => {
    try {
      const dbProject = {
        titulo: project.titulo,
        descripcion: project.descripcion,
        descripcion_completa: project.descripcionCompleta,
        tags: project.tags,
        imagen_url: project.imagenUrl,
        repo_link: project.repoLink,
        demo_link: project.demoLink,
        destacado: project.destacado
      };

      const { data, error } = await supabase
        .from('projects')
        .insert(dbProject)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newProject: Project = {
          id: data.id,
          titulo: data.titulo,
          descripcion: data.descripcion,
          descripcionCompleta: data.descripcion_completa,
          tags: data.tags,
          imagenUrl: data.imagen_url,
          repoLink: data.repo_link,
          demoLink: data.demo_link,
          destacado: data.destacado
        };
        setProjects([newProject, ...projects]);
        return newProject;
      }
    } catch (error: any) {
      console.error('Error adding project:', error);
      toast({
        title: "Error",
        description: `No se pudo crear el proyecto: ${error.message || error.details || "Error desconocido"}`,
        variant: "destructive"
      });
    }
  };

  const updateProject = async (id: string, updates: Partial<Project>) => {
    try {
      const dbUpdates: any = {};
      if (updates.titulo) dbUpdates.titulo = updates.titulo;
      if (updates.descripcion) dbUpdates.descripcion = updates.descripcion;
      if (updates.descripcionCompleta !== undefined) dbUpdates.descripcion_completa = updates.descripcionCompleta;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.imagenUrl !== undefined) dbUpdates.imagen_url = updates.imagenUrl;
      if (updates.repoLink !== undefined) dbUpdates.repo_link = updates.repoLink;
      if (updates.demoLink !== undefined) dbUpdates.demo_link = updates.demoLink;
      if (updates.destacado !== undefined) dbUpdates.destacado = updates.destacado;

      const { error } = await supabase
        .from('projects')
        .update(dbUpdates)
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    } catch (error) {
      console.error('Error updating project:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el proyecto.",
        variant: "destructive"
      });
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el proyecto.",
        variant: "destructive"
      });
    }
  };

  const resetToDefault = () => {
    // Optional: Implement seed logic via Supabase or keep local for now
    // For now we will just log a warning as database reset is a bigger operation
    console.warn("Reset to default not implemented for Database mode");
    toast({
      title: "Info",
      description: "La restauración por defecto no está disponible en modo base de datos.",
    });
  };

  return {
    projects,
    isLoaded,
    addProject,
    updateProject,
    deleteProject,
    resetToDefault,
  };
};
