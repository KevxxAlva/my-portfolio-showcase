export interface ContactMessage {
  id: string;
  nombre: string;
  email: string;
  mensaje: string;
  created_at: string;
  read?: boolean;
}
