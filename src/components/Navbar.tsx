import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

// Custom Discord Icon
const Discord = ({ size = 24, ...props }: { size?: number | string } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="9" cy="12" r="1" />
    <circle cx="15" cy="12" r="1" />
    <path d="M7.5 7.5c3.5-1 5.5-1 9 0" />
    <path d="M7 16.5c3.5 1 6.5 1 10 0" />
    <path d="M2 8.5c0 4 1.5 9 5.5 11 4 2 9 2 13 0 1.5-3.5 1.5-8 1.5-11-2-1.5-4-2-6.5-1.5-2.5-.5-5-.5-7 0C6 6.5 4 7 2 8.5Z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: "https://github.com/KevxxAlva", label: "GitHub" },
  { icon: Discord, href: "https://discord.com/users/751454536031404062", label: "Discord" },
  { icon: Mail, href: "mailto:kevinja1406@gmail.com", label: "Email" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { name: t("nav_home"), href: "#hero" },
    { name: t("nav_projects"), href: "#proyectos" },
    { name: t("nav_services"), href: "#servicios" },
    { name: t("nav_testimonials"), href: "#testimonios" },
    { name: t("nav_about"), href: "#about" },
    { name: t("nav_contact"), href: "#contacto" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const startPosition = window.scrollY;
    // Calculate exact target position
    const targetPosition = elementPosition + startPosition - headerOffset;
    const distance = targetPosition - startPosition;
    const duration = 1500; // Duration in ms - adjustable for slower/faster scroll
    let start: number | null = null;

    // Easing function for smooth acceleration and deceleration
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
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#hero");
          }}
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2 bg-primary/10 p-2 rounded-lg border border-primary/20">
            <span className="font-bold text-xl tracking-tighter text-primary">&lt;KA /&gt;</span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.href);
              }}
              className="text-muted-foreground hover:text-primary transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Social Links - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={link.label}
            >
              <link.icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50 mr-6">
          <motion.button
            className="text-foreground p-2 hover:bg-primary/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? "auto" : 0,
          opacity: isMobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden glass-strong mt-2 mx-4 rounded-lg"
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                // Wait for the menu closing animation to finish (300ms) before scrolling
                setTimeout(() => {
                  const element = document.querySelector(link.href);
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;

                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }, 300);
              }}
              className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-2"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};