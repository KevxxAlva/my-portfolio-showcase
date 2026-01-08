import { useState, useEffect } from "react";
import { type ContactMessage } from "@/data/messages";
import { useToast } from "@/hooks/use-toast";

// Dynamic import for Supabase to reduce initial bundle size
const getSupabase = () => import("@/integrations/supabase/client").then(m => m.supabase);

export const useMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  const fetchMessages = async () => {
    try {
      const supabase = await getSupabase();
      // Note: Assuming 'contact_messages' table uses 'created_at' column
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const mappedMessages: ContactMessage[] = data.map((m: any) => ({
          id: m.id,
          nombre: m.nombre,
          email: m.email,
          mensaje: m.mensaje,
          created_at: m.created_at,
          read: m.read || false, // Assuming 'read' column might exist or defaults to false
        }));
        setMessages(mappedMessages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      // Optional: Toast on error
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const deleteMessage = async (id: string) => {
    try {
      const supabase = await getSupabase();
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
      setMessages(messages.filter((m) => m.id !== id));
      toast({
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado correctamente.",
      });
    } catch (error) {
       console.error("Error deleting message:", error);
       toast({
        title: "Error",
        description: "No se pudo eliminar el mensaje.",
        variant: "destructive",
      });
    }
  };

  return {
    messages,
    isLoaded,
    deleteMessage,
    refreshMessages: fetchMessages,
  };
};

