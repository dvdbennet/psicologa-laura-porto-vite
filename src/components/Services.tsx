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
  type LucideIcon,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import Kicker from "./ui/Kicker";
import { EASE, Reveal, SectionTitle, WhatsButton } from "./ui/motion";

const services: Service[] = [
  {
    icon: Brain,
    title: "Depressão",
    description:
      "Acordar sem energia, perder o interesse pelo que antes fazia sentido, sentir que até as tarefas simples exigem um esforço enorme. Isso não é preguiça nem fraqueza. Na terapia, a gente entende o que mantém esse peso e constrói, no seu ritmo, recursos para retomar a vida aos poucos.",
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
      "A cabeça que não desliga, o aperto no peito, a insônia, a sensação de que algo ruim vai acontecer a qualquer momento. A ansiedade cansa, e muitas vezes ninguém ao redor percebe. Na terapia, você aprende a reconhecer seus gatilhos e a responder a eles de um jeito mais equilibrado.",
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
      "Uma perda, uma mudança brusca, uma fase em que tudo parece desabar ao mesmo tempo. Você não precisa atravessar isso fingindo força. A terapia é o espaço para organizar o que aconteceu e encontrar apoio para dar o próximo passo.",
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
      "As mesmas brigas se repetindo, a sensação de não ser ouvido, o medo de dizer o que pensa e perder alguém. Na terapia, a gente identifica os padrões que se repetem nas suas relações e desenvolve formas mais claras e saudáveis de se relacionar.",
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
      "Domingo à noite já vem a angústia. O corpo cobra, a cabeça não descansa e nem nas férias você consegue desligar. Na terapia, você aprende a reconhecer os sinais de esgotamento e a construir limites que protejam sua saúde.",
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
      "Aquela voz interna que diz que você não é suficiente, o medo de errar, a comparação constante com os outros. Na terapia, a gente entende de onde vem essa autocrítica e constrói uma relação mais justa e segura com você mesmo.",
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
      "Quando o álcool, o celular, os jogos ou as compras viram uma forma de fugir do que se sente, e depois vem a culpa. Na terapia, você entende o que esse comportamento está tentando aliviar e desenvolve novas formas de lidar com o impulso.",
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
      "Travar diante de uma escolha, adiar decisões importantes por medo de errar, sentir que qualquer caminho pode dar errado. A terapia ajuda a entender o que está te paralisando e a escolher com mais clareza e autonomia.",
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
      "Nada nunca está bom o bastante, o descanso vem acompanhado de culpa e cada erro parece um fracasso. Na terapia, você revê essa cobrança constante e aprende a construir metas mais realistas, sem abrir mão do que é importante para você.",
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
      "Estar rodeado de gente e, mesmo assim, sentir que ninguém realmente te conhece. Na terapia, você encontra um espaço para entender essa desconexão e fortalecer vínculos mais próximos e verdadeiros.",
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
      "O medo de ser deixado faz você aceitar menos do que merece, se esforçar demais para agradar ou se afastar antes de ser rejeitado. Na terapia, a gente entende a origem desse medo e constrói formas mais seguras de se vincular.",
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
      "Saber o que precisa ser feito e, mesmo assim, não conseguir começar, e depois se culpar por isso. Procrastinar raramente é falta de disciplina. Na terapia, a gente entende o que está por trás do adiamento e cria estratégias práticas para agir.",
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
      "Dizer sim quando queria dizer não, colocar todo mundo na frente e chegar ao fim do dia sem energia para si. Na terapia, você aprende a se posicionar com firmeza e respeito, sem culpa.",
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
      "Você não precisa estar em crise para cuidar da sua saúde mental. A terapia também é um espaço para se conhecer melhor, fazer escolhas mais conscientes e crescer com mais segurança.",
    features: [
      "Ampliação do autoconhecimento",
      "Desenvolvimento de inteligência emocional",
      "Promoção de maior equilíbrio e bem-estar psicológico",
    ],
  },
];

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
};

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
export function ServicesIndex({
  items,
  kicker = "O que eu trato",
  title,
  accent,
  intro,
  ctaLabel = "Quero falar sobre isso",
  location = "services_cta",
}: {
  items: Service[];
  kicker?: string;
  title: string;
  accent: string[];
  intro: ReactNode;
  ctaLabel?: string;
  location?: string;
}) {
  const services = items;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(0);
  const current = services[active];

  return (
    <section id="services" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl lg:mb-16">
          <Kicker className="mb-5">{kicker}</Kicker>
          <SectionTitle text={title} accent={accent} />
          <Reveal delay={0.2}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">{intro}</p>
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
                <WhatsButton location={location} label={ctaLabel} size="md" className="relative mt-9" />
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-10 lg:hidden">
          <WhatsButton location={location} label={ctaLabel} className="w-full" />
        </Reveal>
      </div>
    </section>
  );
}

const Services = () => (
  <ServicesIndex
    items={services}
    title="O que te trouxe até aqui?"
    accent={["aqui"]}
    intro="Toque no que mais se parece com o seu momento. Você não precisa saber dar nome ao que sente para começar: essa clareza a gente constrói junto, sessão a sessão."
  />
);

export default Services;
