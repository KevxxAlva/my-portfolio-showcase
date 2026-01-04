import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  nav_home: { es: "Inicio", en: "Home" },
  nav_projects: { es: "Proyectos", en: "Projects" },
  nav_about: { es: "Sobre mí", en: "About" },
  nav_services: { es: "Servicios", en: "Services" },
  nav_contact: { es: "Contacto", en: "Contact" },
  
  // Hero
  hero_greeting: { es: "¡Hola! 👋 Mi nombre es", en: "Hello! 👋 My name is" },
  hero_role: { es: "Desarrollador Full Stack", en: "Full Stack Developer" },
  hero_cta_projects: { es: "Ver Proyectos", en: "View Projects" },

  hero_cta_contact: { es: "Contáctame", en: "Contact Me" },
  hero_description: { 
    es: "Desarrollo experiencias digitales excepcionales. Especializado en crear aplicaciones web modernas, escalables y con interfaces que enamoran.",
    en: "I develop exceptional digital experiences. Specialized in creating modern, scalable web applications with interfaces that captivate."
  },

  // Projects
  projects_title: { es: "Mi Trabajo", en: "My Work" },
  projects_subtitle: { es: "Una selección de proyectos que demuestran mis habilidades", en: "A selection of projects demonstrating my skills" },
  projects_filter_all: { es: "Todo", en: "All" },
  projects_empty: { es: "No hay proyectos con este filtro.", en: "No projects found with this filter." },
  
  // Services
  services_title: { es: "Mis Servicios", en: "My Services" },
  services_subtitle: { es: "Soluciones digitales a medida para hacer crecer tu negocio", en: "Tailored digital solutions to grow your business" },
  service_web_title: { es: "Desarrollo Web", en: "Web Development" },
  service_web_desc: { es: "Sitios web rápidos, responsivos y modernos construidos con las últimas tecnologías.", en: "Fast, responsive, and modern websites built with the latest technologies." },
  service_app_title: { es: "Aplicaciones Web", en: "Web Applications" },
  service_app_desc: { es: "Aplicaciones complejas y escalables con funcionalidades avanzadas y gestión de datos.", en: "Complex and scalable applications with advanced features and data management." },
  service_seo_title: { es: "Optimización & SEO", en: "Optimization & SEO" },
  service_seo_desc: { es: "Mejora de rendimiento, velocidad de carga y visibilidad en motores de búsqueda.", en: "Performance improvement, load speed, and search engine visibility." },

  // About
  about_title: { es: "Sobre Mí", en: "About Me" },
  about_subtitle: { es: "Conoce al Desarrollador", en: "Meet the Developer" },
  about_p1: {
    es: "Soy un desarrollador full-stack apasionado por crear experiencias digitales que combinan diseño atractivo con funcionalidad robusta. Mi enfoque está en escribir código limpio, escalable y mantenible.",
    en: "I am a full-stack developer passionate about creating digital experiences that combine attractive design with robust functionality. My focus is on writing clean, scalable, and maintainable code."
  },
  about_p2: {
    es: "Con experiencia en startups y proyectos freelance, he desarrollado habilidades para trabajar tanto de forma independiente como en equipo, siempre priorizando la comunicación clara y los resultados medibles.",
    en: "With experience in startups and freelance projects, I have developed skills to work both independently and in teams, always prioritizing clear communication and measurable results."
  },
  about_p3: {
    es: "Cuando no estoy programando, probablemente me encuentres explorando nuevas tecnologías, contribuyendo a proyectos open-source, o disfrutando de una buena taza de café.",
    en: "When I'm not coding, you'll probably find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee."
  },
  stats_years: { es: "Años de experiencia", en: "Years of experience" },
  stats_projects: { es: "Proyectos completados", en: "Completed projects" },
  stats_clients: { es: "Clientes satisfechos", en: "Satisfied clients" },
  stats_coffee: { es: "Café consumido ☕", en: "Coffee consumed ☕" },
  skills_frontend: { es: "Frontend", en: "Frontend" },
  skills_backend: { es: "Backend", en: "Backend" },
  skills_tools: { es: "Herramientas", en: "Tools" },
  
  // Contact
  contact_title: { es: "¿Tienes un Proyecto?", en: "Have a Project?" },
  contact_subtitle: { es: "Estoy siempre abierto a nuevas oportunidades.", en: "I am always open to new opportunities." },
  contact_name: { es: "Nombre", en: "Name" },
  contact_message: { es: "Mensaje", en: "Message" },
  contact_send: { es: "Enviar Mensaje", en: "Send Message" },
  contact_location: { es: "Ubicación", en: "Location" },
  contact_social_follow: { es: "Sígueme en redes", en: "Follow me on social media" },
  contact_available: { es: "Disponible para nuevos proyectos", en: "Available for new projects" },
  contact_sending: { es: "Enviando...", en: "Sending..." },
  contact_success_title: { es: "¡Mensaje enviado!", en: "Message sent!" },
  contact_success_desc: { es: "Gracias por contactarme. Te responderé pronto.", en: "Thanks for contacting me. I'll get back to you soon." },
  contact_error_title: { es: "Error al enviar", en: "Error sending" },
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "es";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const t = (key: string) => {
    if (!translations[key]) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
