import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Trash2, Mail, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ContactMessage } from "@/data/messages";

interface MessageListProps {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
}

export const MessageList = ({ messages, onDelete }: MessageListProps) => {
  return (
    <div className="grid gap-4">
      {messages.map((message) => (
        <div key={message.id} className="glass p-6 rounded-xl flex flex-col md:flex-row gap-6 hover:bg-white/5 transition-colors">
          <div className="flex-1 space-y-4">
            <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{message.nombre}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-primary" />
                <span>{message.email}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto md:ml-0">
                <Calendar className="w-4 h-4 text-primary" />
                <span>
                  {format(new Date(message.created_at), "PPpp", { locale: es })}
                </span>
              </div>
            </div>
            
            <div className="bg-background/20 rounded-lg p-4 text-sm leading-relaxed text-foreground/90 font-mono">
              {message.mensaje}
            </div>
          </div>

          <div className="flex md:flex-col justify-end gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onDelete(message.id)}
              title="Eliminar mensaje"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className="text-center p-12 glass rounded-xl">
          <Mail className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No hay mensajes</h3>
          <p className="text-muted-foreground">Tu bandeja de entrada está vacía por ahora.</p>
        </div>
      )}
    </div>
  );
};
