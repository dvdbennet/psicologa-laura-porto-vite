import { AnimatePresence, motion } from "framer-motion";
import {
  Brain,
  Briefcase,
  Clock,
  GitBranch,
  HeartCrack,
  HeartHandshake,
  Plus,
  Repeat,
  Shield,
  Sparkles,
  Target,
  Timer,
  User,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { useState } from "react";
import Kicker from "./ui/Kicker";
import { EASE, Reveal, SectionTitle, WhatsButton } from "./ui/motion";

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
    title: "Burnout e Sobrecarga no Trabalho",
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
    icon: Sparkles,
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

type Service = (typeof services)[number];

function Detail({ s }: { s: Service }) {
  return (
    <>
      <p className="leading-relaxed text-ink-600">{s.description}</p>
      <ul className="mt-5 space-y-2.5">
        {s.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-ink-800">
            <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * "O que eu trato": índice de temas.
 * Celular: acordeão (um aberto por vez, toque grande).
 * Desktop: lista à esquerda + painel fixo à direita que troca no hover/clique.
 */
const Services = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl lg:mb-16">
          <Kicker className="mb-5">O que eu trato</Kicker>
          <SectionTitle text="Serviços de Psicoterapia para o que está pesando agora." accent={["Psicoterapia"]} />
          <Reveal delay={0.2}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Ofereço serviços terapêuticos para adultos e adolescentes, projetados para atender
              suas necessidades únicas e apoiar sua jornada em direção ao bem-estar mental.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* lista */}
          <ul className="border-t border-ink-900/10">
            {services.map((s, i) => {
              const isOpen = open === i;
              const isActive = active === i;
              return (
                <Reveal as="li" key={s.title} delay={Math.min(i, 6) * 0.03} y={16} className="border-b border-ink-900/10">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setOpen(isOpen ? null : i);
                    }}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-4 py-4 text-left lg:py-5"
                  >
                    <span
                      className={`grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl transition-colors duration-300 ${
                        isActive ? "bg-brand text-white" : "bg-mist text-brand"
                      }`}
                    >
                      <s.icon size={20} />
                    </span>
                    <span
                      className={`flex-1 font-display text-[1.2rem] leading-snug transition-[color,transform] duration-500 ease-out sm:text-2xl lg:group-hover:translate-x-2 ${
                        isActive ? "text-ink-900" : "text-ink-700"
                      }`}
                    >
                      {s.title}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-ink-900/10 text-ink-700 lg:hidden"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>

                  {/* celular: conteúdo inline */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="pb-6 pl-[3.75rem] text-[15px]">
                          <Detail s={s} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Reveal>
              );
            })}
          </ul>

          {/* desktop: painel fixo */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative overflow-hidden rounded-[2rem] bg-mist p-10">
                <div
                  aria-hidden
                  className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-mint-300/40 blur-3xl animate-breathe"
                />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="relative"
                  >
                    <span className="mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-white text-brand shadow-soft">
                      <current.icon size={26} />
                    </span>
                    <h3 className="mb-4 font-display text-3xl text-ink-900">{current.title}</h3>
                    <Detail s={current} />
                  </motion.div>
                </AnimatePresence>
                <WhatsButton location="services_cta" label="Agendar consulta" size="md" className="relative mt-9" />
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-10 lg:hidden">
          <WhatsButton location="services_cta" label="Agendar consulta" className="w-full" />
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
