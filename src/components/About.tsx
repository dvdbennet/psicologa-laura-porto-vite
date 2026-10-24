import { cn } from "@/config";
import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { Award, GraduationCap, Heart, Instagram, Users } from "lucide-react";
import aboutImage from "../assets/images/hero-image-9.jpg";
import deskImage from "../assets/images/hero-image-2.jpeg";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

const credentials = [
  {
    icon: Award,
    title: "Psicóloga Clínica Registrada",
    description: "CRP 01/28432 - Conselho Regional de Psicologia",
  },
  {
    icon: GraduationCap,
    title: "Pós graduada em Neuropsicologia",
    description: "IPOG (Instituto de Pós-Graduação e Graduação)",
  },
  {
    icon: Heart,
    title: "Formação Especializada",
    description: "Análise do Comportamento - Terapia Baseada em Evidências",
  },
  {
    icon: Users,
    title: "+400 Pacientes Atendidos",
    description: "Atendendo adultos e adolescentes",
  },
  {
    icon: Instagram,
    title: "@laurapbaiao",
    description: "Siga-me no Instagram",
    href: "https://www.instagram.com/laurapbaiao",
  },
];

const About = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="about" className="relative py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Sobre</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            A pessoa por trás{" "}
            <span className="text-emerald-700">do cuidado</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Sou Psicóloga Clínica, formada pelo UniCEUB e pós-graduada
            em Análise do Comportamento (IBAC) e Neuropsicologia
            (IPOG). Realizo atendimentos psicológicos online voltados para
            adultos e adolescentes, com a proposta de oferecer um ambiente
            acolhedor, seguro e empático, onde você possa lidar com questões
            emocionais, aprofundar o autoconhecimento e cuidar da sua saúde
            mental.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-br from-emerald-100 to-teal-100 rotate-2" />
            <img
              src={aboutImage}
              alt="Dra. Laura Porto"
              className="relative rounded-[2rem] shadow-lifted w-full h-[500px] object-cover object-[50%_18%] brightness-105"
              loading="lazy"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -right-6 -bottom-8 w-40 sm:w-48 rounded-2xl overflow-hidden shadow-lifted border-4 border-white"
            >
              <img
                src={deskImage}
                alt="Dra. Laura Porto estudando manuais clínicos"
                className="w-full h-32 sm:h-36 object-cover object-[50%_35%]"
                loading="lazy"
              />
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-8"
          >
            <p className="text-lg text-ink-700 leading-relaxed">
              Durante as sessões, busco aliar uma escuta atenta, sensibilidade
              nas relações e embasamento técnico, colaborando com cada pessoa
              na construção de caminhos alinhados aos seus valores e à vida
              que deseja levar. Vejo a psicoterapia como uma ferramenta
              poderosa de transformação — não apenas para aliviar o
              sofrimento, mas também para ampliar possibilidades e desenvolver
              recursos diante dos desafios cotidianos.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((credential, index) => {
                const Component = credential.href ? motion.a : motion.div;
                return (
                  <Component
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-ink-100 hover:border-emerald-200 hover:shadow-soft transition-all"
                    {...(credential.href
                      ? { href: credential.href, target: "_blank" }
                      : {})}
                  >
                    <div
                      className={cn(
                        "w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0",
                        credential.href &&
                          "bg-gradient-to-tr from-pink-500 to-orange-500",
                      )}
                    >
                      <credential.icon
                        className={cn(
                          "text-emerald-600",
                          credential.href && "text-white",
                        )}
                        size={20}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink-900 text-sm mb-0.5">
                        {credential.title}
                      </h3>
                      <p className="text-ink-500 text-xs leading-relaxed">
                        {credential.description}
                      </p>
                    </div>
                  </Component>
                );
              })}
            </div>

            <motion.a
              target="_blank"
              href={whatsapp}
              onClick={() => {
                if (typeof window !== "undefined" && window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    click_location: "about_cta",
                  });
                }
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex w-fit items-center gap-2.5 bg-emerald-600 text-white px-7 py-3.5 rounded-full text-base font-semibold hover:bg-emerald-700 transition-colors"
            >
              <IconeWhats width={20} />
              <span>Agendar Consulta</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
