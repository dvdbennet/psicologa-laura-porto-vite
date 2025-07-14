import { motion } from "framer-motion";
import { Compass, Lightbulb, Shield, Target } from "lucide-react";
import avatarImage from "../assets/images/avatar.avif";

const approaches = [
  {
    icon: Lightbulb,
    title: "Terapia Cognitivo-Comportamental (TCC)",
    description:
      "Abordagem baseada em evidências com foco na identificação e mudança de padrões de pensamento e comportamentos negativos.",
  },
  {
    icon: Target,
    title: "Terapia Comportamental Dialética (TCC)",
    description:
      "Terapia baseada em habilidades com ênfase em atenção plena, tolerância ao sofrimento e regulação emocional.",
  },
  {
    icon: Compass,
    title: "Terapia Baseada em Mindfulness",
    description:
      "Incorporando práticas de mindfulness para aumentar a consciência e reduzir o estresse e a ansiedade.",
  },
  {
    icon: Shield,
    title: "Cuidados com Traumas",
    description:
      "Abordagem especializada para a cura de traumas com segurança, confiança e empoderamento.",
  },
];

const principles = [
  "Abordagem centrada no cliente",
  "Prática culturalmente sensível e inclusiva",
  "Perspectiva baseada em pontos fortes",
  "Métodos de tratamento baseados em evidências",
  "Visão holística da saúde mental",
  "Ênfase no empoderamento pessoal",
];

const Approach = () => {
  return (
    <section id="approach" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Minha {" "}
            <span className="text-emerald-600 font-medium">Abordagem</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Eu adoto uma abordagem integrativa e centrada no cliente, combinando
            diferentes técnicas terapêuticas para atender às suas necessidades
            únicas. Meu objetivo é criar um espaço seguro e acolhedor onde você
            possa explorar seus pensamentos e sentimentos, desenvolver
            habilidades de enfrentamento e trabalhar em direção a mudanças
            positivas.
          </p>
        </motion.div>

        {/* Therapeutic Approaches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <approach.icon className="text-emerald-600" size={36} />
              </motion.div>

              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                {approach.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {approach.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Principles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-light text-slate-800 mb-8">
              {" "}
              <span className="text-emerald-600 font-medium">Princípios</span>
            </h3>

            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  <span className="text-slate-700 text-lg">{principle}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Quote */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-emerald-50 rounded-3xl p-8"
          >
            <div className="text-6xl text-emerald-200 mb-4">"</div>
            <blockquote className="text-xl text-slate-700 leading-relaxed mb-6">
             Meu objetivo é criar um espaço seguro e sem julgamentos, onde você possa
explorar seus pensamentos e sentimentos, desenvolver estratégias de enfrentamento e
trabalhar em direção a uma mudança positiva em seu próprio ritmo.
            </blockquote>
            <div className="flex items-center space-x-4">
              <img
                src={avatarImage}
                alt="Dr. Laura Porto"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-slate-800">
                  Dr. Laura Porto
                </div>
                <div className="text-slate-600">
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
