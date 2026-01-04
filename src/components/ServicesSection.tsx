import { motion } from "framer-motion";
import { Monitor, Server, Rocket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ServicesSection = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Monitor,
      title: t("service_web_title"),
      description: t("service_web_desc"),
      color: "text-neon-cyan",
      bg: "bg-neon-cyan/10",
    },
    {
      icon: Server,
      title: t("service_app_title"),
      description: t("service_app_desc"),
      color: "text-neon-purple",
      bg: "bg-neon-purple/10",
    },
    {
      icon: Rocket,
      title: t("service_seo_title"),
      description: t("service_seo_desc"),
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  return (
    <section id="servicios" className="py-24 relative overflow-hidden scroll-mt-28">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono mb-4">{`<${t("nav_services")} />`}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">{t("services_title").split(" ")[0]} </span>
            <span className="gradient-text">{t("services_title").split(" ").slice(1).join(" ")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("services_subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="glass p-8 rounded-2xl hover:bg-white/5 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className={`w-7 h-7 ${service.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
