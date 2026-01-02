import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-8 border-t border-border relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-destructive fill-current" /> por{" "}
            <span className="gradient-text font-medium">Kevin Alvarez</span> ©{" "}
            {new Date().getFullYear()}
          </p>

          {/* Tech Stack */}
          <p className="text-muted-foreground text-sm font-mono">
            React + Vite + Tailwind + Framer Motion
          </p>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-2 glass rounded-lg text-muted-foreground hover:text-primary transition-colors"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Volver arriba"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};