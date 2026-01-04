import { motion } from "framer-motion";
import { Code2, Palette, Zap, Database, Globe, Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutSection = () => {
  const { t } = useLanguage();

  const skills = [
    {
      category: t("skills_frontend"),
      icon: Code2,
      items: ["HTML", "CSS", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      category: t("skills_backend"),
      icon: Database,
      items: ["Node.js", "PostgreSQL", "MySQL", "Supabase"],
    },
    {
      category: t("skills_tools"),
      icon: Terminal,
      items: ["Git", "Github", "Vite"],
    },
  ];

  const stats = [
    { value: "1+", label: t("stats_years") },
    { value: "3+", label: t("stats_projects") },
    { value: "2+", label: t("stats_clients") },
    { value: "∞", label: t("stats_coffee") },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden scroll-mt-28">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-mono mb-4">{`<${t("nav_about")} />`}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">{t("about_subtitle").split(" ").slice(0, 2).join(" ")} </span>
              <span className="gradient-text">{t("about_subtitle").split(" ").slice(2).join(" ")}</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>{t("about_p1")}</p>
              <p>{t("about_p2")}</p>
              <p>{t("about_p3")}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-4 glass rounded-xl"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="glass rounded-xl p-6 hover-lift"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <skill.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {skill.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 text-sm bg-secondary rounded-lg text-secondary-foreground font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Tech Icons Decoration */}
            <div className="flex justify-center gap-6 pt-4">
              {[Globe, Palette, Zap].map((Icon, index) => (
                <motion.div
                  key={index}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  className="p-3 glass rounded-full"
                >
                  <Icon className="w-6 h-6 text-primary" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};