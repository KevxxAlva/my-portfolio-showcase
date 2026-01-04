import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="relative p-2 rounded-lg glass hover:glass-strong transition-all overflow-hidden w-10 h-10 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Cambiar a ${language === "es" ? "Inglés" : "Spanish"}`}
    >
      <motion.span
        key={language}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="font-bold text-sm text-primary"
      >
        {language.toUpperCase()}
      </motion.span>
    </motion.button>
  );
};
