import { useState, useEffect } from "react";
import { projects as defaultProjects, type Project } from "@/data/projects";

const STORAGE_KEY = "portfolio_projects";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setProjects(JSON.parse(stored));
    } else {
      setProjects(defaultProjects);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
    }
    setIsLoaded(true);
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProjects));
  };

  const addProject = (project: Omit<Project, "id">) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    saveProjects([...projects, newProject]);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...updates } : p
    );
    saveProjects(updated);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter((p) => p.id !== id));
  };

  const resetToDefault = () => {
    saveProjects(defaultProjects);
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
