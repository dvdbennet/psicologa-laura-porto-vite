import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import benefitsImage from "../assets/images/hero-image-4.jpeg";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

const points = [
  "Lidar com ansiedade, estresse e emoções difíceis com mais equilíbrio.",
  "Compreender padrões de pensamento e comportamento.",
  "Desenvolver mais clareza e segurança nas decisões.",
  "Fortalecer autoestima e recursos emocionais.",
  "Construir mudanças reais na forma de se relacionar consigo e com os outros.",
];

const Benefits = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="benefits" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Benefícios</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Benefícios da{" "}
            <span className="text-emerald-700">Psicoterapia Comigo</span>
          </h2>
          <p className="text-xl text-ink-800 mb-3 leading-relaxed">
            Você sente que gostaria de compreender melhor suas emoções e lidar
            com os desafios da vida com mais clareza e segurança?
          </p>
          <p className="text-lg text-ink-600 leading-relaxed">
            A psicoterapia oferece um espaço de escuta qualificada e reflexão,
            onde é possível compreender padrões de pensamento, fortalecer
            recursos emocionais e desenvolver novas formas de enfrentar as
            dificuldades do dia a dia.
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
            <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-tr from-teal-100 to-emerald-100 -rotate-2" />
            <img
              src={benefitsImage}
              alt="Dra. Laura Porto"
              className="relative rounded-[1.75rem] shadow-lifted w-full h-[420px] object-cover object-[50%_15%] brightness-105"
              loading="lazy"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6"
          >
            <p className="text-lg text-ink-700 leading-relaxed">
              Ao longo do acompanhamento, você desenvolve mais consciência
              sobre si mesmo, aprende a lidar melhor com o que sente e
              constrói caminhos mais alinhados com seus valores e
              necessidades.
            </p>
            <ul className="space-y-3.5">
              {points.map((point, index) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={22}
                    className="text-emerald-600 flex-shrink-0 mt-0.5"
                  />
                  <span className="text-ink-800 text-base leading-relaxed">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <motion.a
            target="_blank"
            href={whatsapp}
            onClick={() => {
              if (typeof window !== "undefined" && window.dataLayer) {
                window.dataLayer.push({
                  event: "whatsapp_click",
                  click_location: "benefits_cta",
                });
              }
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <IconeWhats width={22} />
            <span>Agendar Consulta</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
