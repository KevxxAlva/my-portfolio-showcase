import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Project } from "@/data/projects";

interface ProjectFormProps {
  project?: Project | null;
  onSave: (data: Omit<Project, "id">) => void;
  onCancel: () => void;
}

export const ProjectForm = ({ project, onSave, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    descripcionCompleta: "",
    tags: "",
    imagenUrl: "",
    repoLink: "",
    demoLink: "",
    destacado: false,
  });

  useEffect(() => {
    if (project) {
      setFormData({
        titulo: project.titulo,
        descripcion: project.descripcion,
        descripcionCompleta: project.descripcionCompleta,
        tags: project.tags.join(", "),
        imagenUrl: project.imagenUrl,
        repoLink: project.repoLink,
        demoLink: project.demoLink,
        destacado: project.destacado || false,
      });
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      titulo: formData.titulo.trim(),
      descripcion: formData.descripcion.trim(),
      descripcionCompleta: formData.descripcionCompleta.trim(),
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      imagenUrl: formData.imagenUrl.trim() || "/placeholder.svg",
      repoLink: formData.repoLink.trim(),
      demoLink: formData.demoLink.trim(),
      destacado: formData.destacado,
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="glass rounded-xl p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-foreground">
          {project ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h3>
        <Button type="button" variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="titulo">Título *</Label>
          <Input
            id="titulo"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Nombre del proyecto"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (separados por coma)</Label>
          <Input
            id="tags"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            placeholder="React, TypeScript, Tailwind"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="descripcion">Descripción corta *</Label>
          <Input
            id="descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Breve descripción del proyecto"
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="descripcionCompleta">Descripción completa</Label>
          <Textarea
            id="descripcionCompleta"
            value={formData.descripcionCompleta}
            onChange={(e) => setFormData({ ...formData, descripcionCompleta: e.target.value })}
            placeholder="Descripción detallada del proyecto..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imagenUrl">URL de imagen</Label>
          <div className="flex gap-2">
            <Input
              id="imagenUrl"
              value={formData.imagenUrl}
              onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {formData.imagenUrl && (
              <div className="h-10 w-10 rounded-lg overflow-hidden border border-border flex-shrink-0">
                <img
                  src={formData.imagenUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
            {!formData.imagenUrl && (
              <div className="h-10 w-10 rounded-lg border border-border flex items-center justify-center flex-shrink-0">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="repoLink">Link del repositorio</Label>
          <Input
            id="repoLink"
            value={formData.repoLink}
            onChange={(e) => setFormData({ ...formData, repoLink: e.target.value })}
            placeholder="https://github.com/usuario/repo"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="demoLink">Link del demo</Label>
          <Input
            id="demoLink"
            value={formData.demoLink}
            onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
            placeholder="https://demo.vercel.app"
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="destacado"
            checked={formData.destacado}
            onCheckedChange={(checked) => setFormData({ ...formData, destacado: checked })}
          />
          <Label htmlFor="destacado" className="cursor-pointer">
            Proyecto destacado
          </Label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          {project ? "Guardar cambios" : "Crear proyecto"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </motion.form>
  );
};
