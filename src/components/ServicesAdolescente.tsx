import { useWhatsApp } from "@/context/WhatsAppProvider";
import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Clock,
  GitBranch,
  HeartCrack,
  HeartHandshake,
  Repeat,
  Shield,
  Target,
  Timer,
  User,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { useEffect, useState } from "react";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

const services = [
  {
    icon: Brain,
    title: "Depressão",
    description:
      "A depressão pode envolver tristeza persistente, desânimo, perda de interesse em atividades antes prazerosas e dificuldade de encontrar motivação no dia a dia. A psicoterapia oferece apoio para compreender esse sofrimento e desenvolver novos recursos emocionais.",
    features: [
      "Compreensão do sofrimento emocional",
      "Desenvolvimento de novos recursos internos",
      "Fortalecimento do bem-estar e da qualidade de vida",
    ],
  },
  {
    icon: Clock,
    title: "Ansiedade",
    description:
      "A ansiedade pode aparecer como preocupação constante, tensão, pensamentos acelerados ou sintomas físicos como insônia e dificuldade de concentração. A psicoterapia ajuda a compreender os gatilhos e desenvolver formas mais equilibradas de lidar com esses sintomas.",
    features: [
      "Identificação de gatilhos e padrões de ansiedade",
      "Estratégias para lidar com pensamentos acelerados",
      "Desenvolvimento de maior equilíbrio emocional",
    ],
  },
  {
    icon: User,
    title: "Desafios e Momentos Difíceis",
    description:
      "Mudanças importantes, perdas ou períodos de sobrecarga emocional fazem parte da vida. A psicoterapia oferece um espaço de acolhimento para compreender essas experiências e desenvolver recursos para lidar com os desafios.",
    features: [
      "Apoio em momentos de transição ou crise",
      "Desenvolvimento de habilidades emocionais",
      "Fortalecimento do autoconhecimento",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Dificuldades nos Relacionamentos",
    description:
      "Conflitos nos relacionamentos podem gerar frustração, insegurança e dificuldades de comunicação. A psicoterapia ajuda a compreender padrões de comportamento e desenvolver formas mais saudáveis de se relacionar.",
    features: [
      "Melhora na comunicação interpessoal",
      "Desenvolvimento de limites saudáveis",
      "Relações mais equilibradas e conscientes",
    ],
  },
  {
    icon: Briefcase,
    title: "Burnout e Sobrecarga no Contexto Acadêmico",
    description:
      "A pressão constante, o excesso de responsabilidades e a dificuldade de desconectar podem levar ao esgotamento físico e emocional. A psicoterapia ajuda a compreender esses sinais e a construir formas mais saudáveis de lidar com o trabalho.",
    features: [
      "Reconhecimento e prevenção do burnout",
      "Desenvolvimento de limites saudáveis",
      "Estratégias para equilíbrio entre vida pessoal e profissional",
    ],
  },
  {
    icon: UserCheck,
    title: "Insegurança e Baixa Autoestima",
    description:
      "Dúvidas constantes sobre si mesmo, medo de errar ou sensação de não ser suficiente podem impactar decisões e relacionamentos. A psicoterapia contribui para fortalecer a autoconfiança e desenvolver uma relação mais saudável consigo mesmo.",
    features: [
      "Fortalecimento da autoestima",
      "Compreensão de padrões de autocrítica",
      "Desenvolvimento de maior segurança emocional",
    ],
  },
  {
    icon: Repeat,
    title: "Comportamentos Compulsivos e Vícios",
    description:
      "Alguns comportamentos podem se tornar repetitivos e difíceis de controlar, como o uso excessivo de álcool, redes sociais, jogos ou compras. A psicoterapia ajuda a compreender as causas desses padrões e desenvolver novas formas de lidar com impulsos.",
    features: [
      "Compreensão dos gatilhos emocionais",
      "Desenvolvimento de estratégias de autocontrole",
      "Construção de hábitos mais saudáveis",
    ],
  },
  {
    icon: GitBranch,
    title: "Dificuldade em Tomar Decisões",
    description:
      "Em alguns momentos, escolher um caminho pode gerar dúvidas, medo de errar ou sensação de paralisia diante das possibilidades. A psicoterapia ajuda a compreender os fatores emocionais envolvidos e desenvolver mais clareza nas escolhas.",
    features: [
      "Maior clareza sobre prioridades e valores",
      "Redução do medo de errar",
      "Desenvolvimento de autonomia nas escolhas",
    ],
  },
  {
    icon: Target,
    title: "Autocobrança e Perfeccionismo",
    description:
      "A busca constante por desempenho e perfeição pode gerar cansaço, frustração e sensação de nunca ser suficiente. A psicoterapia auxilia na construção de uma relação mais equilibrada com expectativas e metas pessoais.",
    features: [
      "Compreensão dos padrões de autocobrança",
      "Desenvolvimento de autocompaixão",
      "Construção de metas mais realistas",
    ],
  },
  {
    icon: UserMinus,
    title: "Sentimentos de Solidão",
    description:
      "Mesmo cercadas por pessoas, muitas vezes é possível sentir-se sozinho ou emocionalmente desconectado. A psicoterapia oferece um espaço para compreender esses sentimentos e fortalecer vínculos mais saudáveis.",
    features: [
      "Compreensão das necessidades emocionais",
      "Desenvolvimento de relações mais significativas",
      "Fortalecimento do senso de pertencimento",
    ],
  },
  {
    icon: HeartCrack,
    title: "Medo de Abandono e Rejeição",
    description:
      "O receio de ser deixado, rejeitado ou não ser valorizado pode impactar relacionamentos e gerar insegurança emocional. Na psicoterapia é possível compreender a origem desses sentimentos e desenvolver formas mais seguras de se relacionar.",
    features: [
      "Identificação de padrões nos relacionamentos",
      "Fortalecimento da segurança emocional",
      "Construção de vínculos mais saudáveis",
    ],
  },
  {
    icon: Timer,
    title: "Procrastinação",
    description:
      "A dificuldade de iniciar ou concluir tarefas pode gerar frustração e sensação de estagnação. A psicoterapia ajuda a compreender os fatores emocionais envolvidos e desenvolver estratégias mais saudáveis de organização e ação.",
    features: [
      "Identificação de padrões de adiamento",
      "Desenvolvimento de organização e foco",
      "Construção de hábitos mais produtivos",
    ],
  },
  {
    icon: Shield,
    title: "Dificuldade em Impor Limites",
    description:
      "Muitas pessoas têm dificuldade em dizer não ou priorizar suas próprias necessidades. A psicoterapia contribui para desenvolver comunicação mais assertiva e relações mais equilibradas.",
    features: [
      "Desenvolvimento de comunicação assertiva",
      "Fortalecimento da autonomia emocional",
      "Construção de relações mais saudáveis",
    ],
  },
  {
    icon: Brain,
    title: "Autoconhecimento e Cuidado com a Saúde Mental",
    description:
      "Nem sempre é preciso estar passando por uma crise para buscar psicoterapia. Muitas pessoas procuram a terapia como um espaço de reflexão e crescimento pessoal.",
    features: [
      "Ampliação do autoconhecimento",
      "Desenvolvimento de inteligência emocional",
      "Promoção de maior equilíbrio e bem-estar psicológico",
    ],
  },
];

const ServicesAdolescente = () => {
  const whatsapp = useWhatsApp();
  const [currentPage, setCurrentPage] = useState(0);
  const [servicesPerPage, setServicesPerPage] = useState(2);

  useEffect(() => {
    const updateServicesPerPage = () => {
      setServicesPerPage(window.innerWidth < 768 ? 1 : 2);
    };

    updateServicesPerPage();
    window.addEventListener("resize", updateServicesPerPage);

    return () => window.removeEventListener("resize", updateServicesPerPage);
  }, []);

  const totalPages = Math.ceil(services.length / servicesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentServices = services.slice(
    currentPage * servicesPerPage,
    (currentPage + 1) * servicesPerPage,
  );

  return (
    <section id="services" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">O que eu trato</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Serviços de Psicoterapia para{" "}
            <span className="text-emerald-700">Adolescentes</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Ofereço serviços terapêuticos para adolescentes, projetados para
            atender suas necessidades únicas e apoiar sua jornada em direção
            ao bem-estar mental.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevPage}
            aria-label="Anterior"
            className="p-2.5 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
          >
            <ChevronLeft className="text-emerald-700" size={20} />
          </button>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                aria-label={`Página ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-emerald-600 w-6"
                    : "bg-emerald-200 w-1.5"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            aria-label="Próximo"
            className="p-2.5 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
          >
            <ChevronRight className="text-emerald-700" size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {currentServices.map((service) => (
              <div
                key={service.title}
                className="group bg-white rounded-3xl p-8 border border-ink-100 hover:border-emerald-200 shadow-soft hover:shadow-lifted transition-all"
              >
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <service.icon className="text-emerald-600" size={26} />
                </div>

                <h3 className="text-xl font-semibold text-ink-900 mb-3">
                  {service.title}
                </h3>

                <p className="text-ink-600 mb-5 leading-relaxed text-sm">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0" />
                      <span className="text-ink-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

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
                  click_location: "services_adolescente_cta",
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

export default ServicesAdolescente;
