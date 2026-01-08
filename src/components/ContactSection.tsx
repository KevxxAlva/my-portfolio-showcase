import { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Custom Whatsapp Icon
const Whatsapp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

// Custom Discord Icon
const Discord = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
    <path d="M7 16.5c3.5 1 6.5 1 10 0" />
    <path d="M2 8.5c0 4 1.5 9 5.5 11 4 2 9 2 13 0 1.5-3.5 1.5-8 1.5-11-2-1.5-4-2-6.5-1.5-2.5-.5-5-.5-7 0C6 6.5 4 7 2 8.5Z" />
  </svg>
);

// Custom X (Twitter) Icon
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/kevxLx", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/kevin_444r/", label: "Instagram" },
  { icon: XIcon, href: "https://x.com/AlvarezKev29987", label: "X (Twitter)" },
  { icon: Discord, href: "https://discord.com/users/751454536031404062", label: "Discord" },
];

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "kevinja1406@gmail.com",
      href: "mailto:kevinja1406@gmail.com",
    },
    {
      icon: MapPin,
      label: t("contact_location"),
      value: "Valle de la Pascua, Venezuela",
      href: null,
    },
    {
      icon: Whatsapp,
      label: "WhatsApp",
      value: "+58 424-3419858",
      href: "https://wa.me/584243419858",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Dynamic import of Supabase - only loaded when form is submitted
      const { supabase } = await import("@/integrations/supabase/client");
      const { error: supabaseError } = await supabase
        .from('contact_messages')
        .insert([
          {
            nombre: formData.nombre,
            email: formData.email,
            mensaje: formData.mensaje,
          }
        ]);

      if (supabaseError) console.error('Supabase error:', supabaseError);

      const YOUR_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const YOUR_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const YOUR_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!YOUR_SERVICE_ID || !YOUR_TEMPLATE_ID || !YOUR_PUBLIC_KEY) {
         throw new Error("Faltan las credenciales de EmailJS en el archivo .env");
      }

      await emailjs.send(
        YOUR_SERVICE_ID,
        YOUR_TEMPLATE_ID,
        {
          from_name: formData.nombre,
          from_email: formData.email, 
          message: formData.mensaje,
          to_name: "Kevin",
        },
        YOUR_PUBLIC_KEY
      );

      toast({
        title: t("contact_success_title"),
        description: t("contact_success_desc"),
      });

      setFormData({ nombre: "", email: "", mensaje: "" });
    } catch (error: any) {
      console.error('Error details:', error);
      const errorMessage = error?.text || error?.message || "Error desconocido";
      
      toast({
        title: t("contact_error_title"),
        description: `Detalle: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative overflow-hidden scroll-mt-28">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono mb-4">{`<${t("nav_contact")} />`}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t("contact_title").split(" ")[0]} </span>
            <span className="gradient-text">{t("contact_title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact_name")}
                </label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({ ...formData, nombre: e.target.value })
                  }
                  placeholder="Tu nombre"
                  required
                  className="glass border-glass-border/50 focus:border-primary"
                />
              </div>  

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="kevin@ejemplo.com"
                  required
                  className="glass border-glass-border/50 focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-foreground mb-2">
                  {t("contact_message")}
                </label>
                <Textarea
                  id="mensaje"
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({ ...formData, mensaje: e.target.value })
                  }
                  placeholder="Cuéntame sobre tu proyecto..."
                  rows={5}
                  required
                  className="glass border-glass-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  t("contact_sending")
                ) : (
                  <>
                    {t("contact_send")}
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass rounded-xl p-4 flex items-center gap-4 hover-lift"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <info.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {t("contact_social_follow")}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={link.label}
                  >
                    <link.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-muted-foreground">
                {t("contact_available")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};