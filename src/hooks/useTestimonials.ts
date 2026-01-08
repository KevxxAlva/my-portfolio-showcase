import { useState, useEffect } from "react";
import { type Testimonial } from "@/data/testimonials";
import { useToast } from "@/hooks/use-toast";

// Dynamic import for Supabase to reduce initial bundle size
const getSupabase = () => import("@/integrations/supabase/client").then(m => m.supabase);

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const fetchTestimonials = async () => {
    try {
      const supabase = await getSupabase();
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedTestimonials: Testimonial[] = data.map((t: any) => ({
          id: t.id,
          name: t.name,
          role: t.role,
          text: t.text,
          imageUrl: t.image_url,
        }));
        setTestimonials(mappedTestimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Don't show toast on initial load error to avoid spamming if table doesn't exist yet
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
    try {
      const supabase = await getSupabase();
      const dbTestimonial = {
        name: testimonial.name,
        role: testimonial.role,
        text: testimonial.text,
        image_url: testimonial.imageUrl,
      };

      const { data, error } = await supabase
        .from("testimonials")
        .insert(dbTestimonial)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        const newTestimonial: Testimonial = {
          id: data.id,
          name: data.name,
          role: data.role,
          text: data.text,
          imageUrl: data.image_url,
        };
        setTestimonials([newTestimonial, ...testimonials]);
        return newTestimonial;
      }
    } catch (error: any) {
      console.error("Error adding testimonial:", error);
      toast({
        title: "Error",
        description: `No se pudo crear el testimonio: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    try {
      const supabase = await getSupabase();
      const dbUpdates: any = {};
      if (updates.name) dbUpdates.name = updates.name;
      if (updates.role) dbUpdates.role = updates.role;
      if (updates.text) dbUpdates.text = updates.text;
      if (updates.imageUrl !== undefined) dbUpdates.image_url = updates.imageUrl;

      const { error } = await supabase
        .from("testimonials")
        .update(dbUpdates)
        .eq("id", id);

      if (error) throw error;

      setTestimonials(
        testimonials.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    } catch (error) {
      console.error("Error updating testimonial:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el testimonio.",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonial = async (id: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("testimonials").delete().eq("id", id);

      if (error) throw error;

      setTestimonials(testimonials.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el testimonio.",
        variant: "destructive",
      });
    }
  };

  return {
    testimonials,
    isLoaded,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};

