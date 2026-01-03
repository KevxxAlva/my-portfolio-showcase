import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, X, ImageIcon, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Project } from "@/data/projects";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Debes seleccionar una imagen para subir.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
      
      setFormData({ ...formData, imagenUrl: data.publicUrl });
      toast({ title: "Imagen subida", description: "La imagen se ha subido correctamente." });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

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

          <Label htmlFor="imagenUrl">Imagen del Proyecto</Label>
          <div className="space-y-3">
            <Input
              id="imagenUrl"
              value={formData.imagenUrl}
              onChange={(e) => setFormData({ ...formData, imagenUrl: e.target.value })}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="font-mono text-xs"
            />
            
            <div className="relative">
              <input
                type="file"
                id="image-upload"
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={uploading}
              />
              <label
                htmlFor="image-upload"
                className={`
                  relative flex flex-col items-center justify-center w-full h-48 
                  border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${uploading ? "opacity-50 cursor-not-allowed" : "hover:border-primary hover:bg-primary/5"}
                  ${formData.imagenUrl ? "border-primary/50" : "border-muted-foreground/25"}
                `}
              >
                {formData.imagenUrl ? (
                  <>
                    <img
                      src={formData.imagenUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                      <div className="text-white flex flex-col items-center gap-2">
                        <UploadCloud className="h-8 w-8" />
                        <span className="text-sm font-medium">Cambiar imagen</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground p-4 text-center">
                    <div className="p-4 rounded-full bg-secondary/50">
                      <ImageIcon className="h-8 w-8" />
                    </div>
                    <div>
                      <span className="font-semibold text-foreground">Click para subir</span>
                      <p className="text-xs mt-1">o arrastra y suelta aquí</p>
                    </div>
                  </div>
                )}
                
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl">
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                      <UploadCloud className="h-8 w-8 text-primary" />
                      <span className="text-sm font-medium">Subiendo...</span>
                    </div>
                  </div>
                )}
              </label>
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
