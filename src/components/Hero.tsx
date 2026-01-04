import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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

const roles = [
  "Desarrollador Frontend",
  "Desarrollador Backend",
  "Full Stack Developer",
  "React Specialist",
];

export const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(role.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToProjects = () => {
    const element = document.querySelector("#proyectos");
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    
    // Calculate exact target position
    const targetPosition = elementPosition + startPosition - headerOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // Duration in ms
    let start: number | null = null;

    // Easing function
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-mt-28"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center top, hsl(var(--neon-cyan) / 0.15) 0%, transparent 50%)",
        }}
      />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-neon-cyan/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-neon-purple/20 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-mono mb-4 px-2"
          >
            {`<${t("hero_greeting")} />`}
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 px-2 break-words"
          >
            <span className="text-foreground">Kevin </span>
            <span className="gradient-text neon-text">Alvarez</span>
          </motion.h1>

          {/* Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-12 md:h-16 flex items-center justify-center mb-6 px-2"
          >
            <span className="text-xl sm:text-2xl md:text-4xl text-muted-foreground font-light">
              {displayText}
            </span>
            <span className="w-1 h-8 md:h-10 bg-primary ml-1 animate-pulse" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 px-4"
          >
            {t("hero_description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToProjects}
              className="group"
            >
              {t("hero_cta_projects")}
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
            </Button>

            <Button variant="glass" size="lg" asChild>
              <a
                href="https://github.com/KevxxAlva"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>

            <Button variant="glass" size="lg" asChild>
              <a
                href="https://discord.com/users/751454536031404062"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Discord className="mr-2 h-6 w-6" />
                Discord
              </a>
            </Button>

            <Button variant="glass" size="lg" asChild>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                <FileText className="mr-2 h-4 w-4" />
                CV
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};