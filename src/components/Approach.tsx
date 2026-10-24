import { motion } from "framer-motion";
import { Compass, Lightbulb, Quote, Shield, Target } from "lucide-react";
import avatarImage from "../assets/images/wppimage(8).jpeg";
import Kicker from "./ui/Kicker";

const approaches = [
  {
    icon: Lightbulb,
    title: "Análise do Comportamento",
    description:
      "Compreende o comportamento para promover mudanças significativas, utilizando princípios para identificar padrões, reforçar avanços e favorecer o desenvolvimento pessoal.",
  },
  {
    icon: Target,
    title: "Intervenções Baseadas em Evidências",
    description:
      "Planejamento individualizado, focado em metas reais e mensuráveis, respeitando o ritmo e as necessidades únicas de cada pessoa.",
  },
  {
    icon: Compass,
    title: "Construção de repertórios e fortalecimento de habilidades",
    description:
      "Elaboramos estratégias práticas para desenvolver essas competências, aumentando a autonomia e o bem-estar no dia a dia.",
  },
  {
    icon: Shield,
    title: "Atendimento com escuta ativa e ética",
    description:
      "Um espaço seguro, com acolhimento e sem julgamentos, onde você pode se expressar livremente, explorar suas emoções, compreender seus desafios.",
  },
];

const principles = [
  "Foco na individualidade do cliente",
  "Atendimento culturalmente sensível e inclusivo",
  "Fortalecimento de repertórios e habilidades",
  "Intervenções baseadas em evidências científicas",
  "Compromisso com a segurança psicológica",
  "Ênfase no empoderamento pessoal",
];

const Approach = () => {
  return (
    <section id="approach" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Metodologia</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Minha <span className="text-emerald-700">Abordagem</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Atuo com base na Análise do Comportamento, focando na compreensão
            das relações entre o comportamento e o ambiente. O processo
            terapêutico busca identificar padrões que mantêm comportamentos
            disfuncionais e desenvolver repertórios mais eficazes, promovendo
            autonomia, adaptação e qualidade de vida.
          </p>
        </motion.div>

        {/* Therapeutic Approaches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {approaches.map((approach, index) => (
            <motion.div
              key={approach.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="p-7 rounded-3xl border border-ink-100 hover:border-emerald-200 hover:shadow-lifted transition-all bg-white"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                <approach.icon className="text-emerald-600" size={26} />
              </div>

              <h3 className="text-lg font-semibold text-ink-900 mb-3 leading-snug">
                {approach.title}
              </h3>

              <p className="text-ink-600 text-sm leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          {/* Left - Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="bg-slate-50 rounded-3xl p-10"
          >
            <h3 className="font-display text-2xl text-ink-900 mb-8">
              <span className="text-emerald-700">Princípios</span> que guiam
              o trabalho
            </h3>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-ink-700">{principle}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative bg-gradient-to-br from-emerald-700 to-teal-800 rounded-3xl p-10 text-white flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 opacity-10">
              <Quote size={140} />
            </div>
            <blockquote className="relative font-display text-xl md:text-2xl leading-relaxed mb-8">
              "Meu compromisso é oferecer um espaço de escuta ativa, acolhedor
              e sem julgamentos. Aqui, você poderá compreender seus
              comportamentos dentro do seu contexto de vida, e juntos vamos
              construir estratégias que favoreçam sua autonomia, bem-estar e
              relações mais saudáveis."
            </blockquote>

            <div className="relative flex items-center gap-4">
              <img
                src={avatarImage}
                alt="Dra. Laura Porto"
                className="w-14 h-14 rounded-full object-cover object-[50%_25%] ring-2 ring-white/40"
                loading="lazy"
              />
              <div>
                <div className="font-semibold">Dra. Laura Porto</div>
                <div className="text-emerald-100 text-sm">
                  Psicóloga Clínica CRP 01/28432
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
