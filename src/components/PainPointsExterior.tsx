import { AnimatePresence, motion } from "framer-motion";
import {
  BatteryLow,
  Brain,
  CloudRain,
  Flower2,
  Frown,
  Globe,
  HeartCrack,
  Languages,
  Moon,
  Scale,
  UserMinus,
  Users,
} from "lucide-react";
import { useState } from "react";
import Kicker from "./ui/Kicker";
import { EASE, Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const slides = [
  {
    label: "Vida no exterior",
    points: [
      {
        icon: HeartCrack,
        title: "Saudade que não passa",
        description:
          "A distância da família, dos amigos e dos lugares conhecidos pesa de um jeito que nem sempre dá para explicar para quem nunca morou fora.",
      },
      {
        icon: UserMinus,
        title: "Solidão mesmo cercado de gente",
        description:
          "É possível ter uma rotina cheia e uma vida social nova e, ainda assim, se sentir sozinho, sem alguém que realmente entenda sua história.",
      },
      {
        icon: Globe,
        title: "Dificuldade de adaptação cultural",
        description:
          "Costumes, ritmo de vida e formas de se relacionar diferentes podem gerar cansaço emocional e a sensação de nunca se encaixar por completo.",
      },
      {
        icon: CloudRain,
        title: "Ansiedade com a vida migratória",
        description:
          "Burocracia, instabilidade de visto ou emprego e a pressão de \"dar certo\" fora do Brasil podem alimentar uma ansiedade constante.",
      },
      {
        icon: Frown,
        title: "Culpa por estar longe",
        description:
          "Não poder estar presente em datas importantes ou em momentos difíceis da família traz um peso emocional que merece espaço para ser elaborado.",
      },
      {
        icon: Languages,
        title: "Barreira do idioma para falar de sentimentos",
        description:
          "Mesmo fluente no dia a dia, colocar em palavras emoções complexas em outro idioma pode ser exaustivo, e a terapia deveria ser um alívio, não mais um esforço.",
      },
    ],
  },
  {
    label: "Dores do dia a dia",
    points: [
      {
        icon: Brain,
        title: "Ansiedade e pensamentos acelerados",
        description:
          "Preocupação constante, dificuldade de desligar a mente e a sensação de que algo ruim pode acontecer a qualquer momento.",
      },
      {
        icon: Flower2,
        title: "Luto e perdas",
        description:
          "A morte de alguém querido, o fim de um ciclo ou de um sonho. Perdas que precisam de tempo e de um espaço seguro para serem vividas.",
      },
      {
        icon: Users,
        title: "Conflitos nos relacionamentos",
        description:
          "Brigas que se repetem, dificuldade de se comunicar, términos ou a sensação de não ser compreendido por quem está perto.",
      },
      {
        icon: BatteryLow,
        title: "Esgotamento e sobrecarga",
        description:
          "Trabalho, estudos e responsabilidades que parecem não ter fim, deixando pouco espaço para descanso e para você mesmo.",
      },
      {
        icon: Scale,
        title: "Autocobrança e baixa autoestima",
        description:
          "A sensação de nunca ser suficiente, a comparação constante com os outros e uma voz interna que critica mais do que acolhe.",
      },
      {
        icon: Moon,
        title: "Tristeza e desânimo persistentes",
        description:
          "Perder o interesse pelo que antes trazia prazer, dormir mal e sentir que os dias ficaram mais pesados do que deveriam.",
      },
    ],
  },
];

/**
 * Dores de quem mora fora: duas abas (vida no exterior / dia a dia) e cartões
 * com inclinação 3D no desktop. No celular vira uma lista enxuta, sem carrossel
 * automático (que escondia conteúdo e atrapalhava a leitura).
 */
const PainPointsExterior = () => {
  const [tab, setTab] = useState(0);
  const slide = slides[tab];

  return (
    <section id="services" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Kicker className="mb-5">Morar fora tem outro lado</Kicker>
            <SectionTitle text="O lado de morar fora que ninguém posta" accent={["ninguém", "posta"]} />
            <Reveal delay={0.15}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
                Ninguém te preparou para essa parte da mudança. Se você se reconhece em algum destes
                pontos, saiba: é mais comum do que parece, e dá para cuidar disso.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div role="tablist" aria-label="Situações" className="relative inline-flex w-full rounded-full bg-mist p-1.5 sm:w-auto">
              {slides.map((sl, i) => (
                <button
                  key={sl.label}
                  role="tab"
                  type="button"
                  aria-selected={tab === i}
                  onClick={() => setTab(i)}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-5 py-3 text-[14.5px] font-semibold transition-colors sm:flex-none ${
                    tab === i ? "text-white" : "text-ink-700 hover:text-ink-900"
                  }`}
                >
                  {tab === i && (
                    <motion.span
                      layoutId="pain-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink-900"
                    />
                  )}
                  <span className="relative">{sl.label}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5"
          >
            {slide.points.map((pt, i) => (
              <motion.li
                key={pt.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
              >
                <TiltCard
                  max={6}
                  className="group flex h-full gap-4 rounded-[1.5rem] bg-mist p-5 transition-colors duration-300 hover:bg-mint-100/70 sm:flex-col sm:p-7"
                >
                  <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-soft transition-transform duration-500 group-hover:-rotate-6 sm:h-12 sm:w-12">
                    <pt.icon size={22} />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.15rem] leading-snug text-ink-900 sm:text-[1.3rem]">{pt.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600 sm:text-[15px]">{pt.description}</p>
                  </div>
                </TiltCard>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>

        <Reveal className="mt-10 flex flex-col items-start gap-4 rounded-[1.75rem] border border-ink-900/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl font-display text-xl leading-snug text-ink-900 sm:text-2xl">
            Se reconheceu? Esse já é o primeiro passo.
          </p>
          <WhatsButton location="pain_points_exterior_cta" label="Quero falar sobre isso" size="md" className="w-full sm:w-auto" />
        </Reveal>
      </div>
    </section>
  );
};

export default PainPointsExterior;
