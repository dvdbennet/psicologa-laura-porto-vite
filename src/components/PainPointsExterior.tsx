import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  BatteryLow,
  Brain,
  ChevronLeft,
  ChevronRight,
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
import { useCallback, useEffect, useRef, useState } from "react";
import Kicker from "./ui/Kicker";

const AUTOPLAY_MS = 20000;

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
          "É possível ter uma rotina cheia e uma vida social nova e, ainda assim, se sentir sozinho — sem alguém que realmente entenda sua história.",
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
          "Mesmo fluente no dia a dia, colocar em palavras emoções complexas em outro idioma pode ser exaustivo — e a terapia deveria ser um alívio, não mais um esforço.",
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

const PainPointsExterior = () => {
  const [[active, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [hovered, setHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const inView = useInView(carouselRef, { amount: 0.3 });
  const paused = hovered || !inView;

  const goTo = useCallback((index: number, dir: number) => {
    setSlide([(index + slides.length) % slides.length, dir]);
  }, []);

  const next = useCallback(() => goTo(active + 1, 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1, -1), [active, goTo]);

  // Reinicia a contagem a cada troca de slide (manual ou automática).
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [active, paused, next]);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">
            Morar fora tem outro lado
          </Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Você se identifica com{" "}
            <span className="text-emerald-700">algo disso?</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Ninguém te preparou para essa parte da mudança. Reconhecer esses
            sentimentos é o primeiro passo para lidar melhor com eles.
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          role="region"
          aria-roledescription="carrossel"
          aria-label="Situações em que a terapia pode ajudar"
        >
          <div className="flex justify-center mb-10">
            <div
              role="tablist"
              className="inline-flex p-1.5 rounded-full bg-ink-50 border border-ink-100"
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  role="tab"
                  aria-selected={active === index}
                  onClick={() => goTo(index, index > active ? 1 : -1)}
                  className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                    active === index
                      ? "text-white"
                      : "text-ink-600 hover:text-ink-900"
                  }`}
                >
                  {active === index && (
                    <motion.span
                      layoutId="painpoints-tab"
                      className="absolute inset-0 rounded-full bg-emerald-700 shadow-soft"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{slide.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={prev}
              aria-label="Ver situações anteriores"
              className="hidden xl:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-ink-100 bg-white items-center justify-center text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lifted transition-all"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Ver próximas situações"
              className="hidden xl:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-ink-100 bg-white items-center justify-center text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 hover:shadow-lifted transition-all"
            >
              <ChevronRight size={22} />
            </button>

            <div className="overflow-hidden -m-3 p-3">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={active}
                  custom={direction}
                  variants={{
                    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
                    center: { opacity: 1, x: 0 },
                    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) next();
                    else if (info.offset.x > 80) prev();
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {slides[active].points.map((point, index) => (
                    <motion.div
                      key={point.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="p-7 rounded-3xl border border-ink-100 hover:border-emerald-200 hover:shadow-lifted transition-all bg-white"
                    >
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6">
                        <point.icon className="text-emerald-600" size={26} />
                      </div>
                      <h3 className="text-lg font-semibold text-ink-900 mb-3 leading-snug">
                        {point.title}
                      </h3>
                      <p className="text-ink-600 text-sm leading-relaxed">
                        {point.description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={prev}
              aria-label="Ver situações anteriores"
              className="xl:hidden w-11 h-11 rounded-full border border-ink-100 bg-white flex items-center justify-center text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  onClick={() => goTo(index, index > active ? 1 : -1)}
                  aria-label={`Ir para: ${slide.label}`}
                  className={`relative h-2 rounded-full overflow-hidden transition-all duration-500 ${
                    active === index ? "w-14 bg-emerald-100" : "w-2 bg-ink-100 hover:bg-ink-400"
                  }`}
                >
                  {active === index && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-emerald-600 rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? "0%" : "100%" }}
                      transition={{
                        duration: paused ? 0 : AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Ver próximas situações"
              className="xl:hidden w-11 h-11 rounded-full border border-ink-100 bg-white flex items-center justify-center text-emerald-700 hover:border-emerald-200 hover:bg-emerald-50 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainPointsExterior;
