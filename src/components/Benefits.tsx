import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import benefitsImage from "../assets/images/laura-beneficios.webp";
import Kicker from "./ui/Kicker";
import { ParallaxImage, Reveal, SectionTitle, WhatsButton } from "./ui/motion";

const points = [
  "Entender a sua ansiedade, em vez de só lutar contra ela.",
  "Reconhecer os padrões que fazem você repetir as mesmas situações.",
  "Tomar decisões com mais clareza e menos medo.",
  "Se cobrar menos e se tratar com mais respeito.",
  "Se relacionar de um jeito mais leve, com os outros e com você.",
];

const QUESTION =
  "E se você não precisasse mais carregar tudo isso sozinho?";

function Word({ w, i, total, progress }: { w: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / total)], [0.18, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

/** Pergunta que "acende" palavra por palavra conforme a rolagem. */
function ScrubQuestion({ text: QUESTION }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = QUESTION.split(" ");
  if (reduce) {
    return <p ref={ref} className="font-display text-[1.65rem] leading-[1.2] text-white sm:text-4xl lg:text-[2.75rem]">{QUESTION}</p>;
  }
  return (
    <p ref={ref} className="font-display text-[1.65rem] leading-[1.2] text-white sm:text-4xl lg:text-[2.75rem]">
      {words.map((w, i) => (
        <Word key={i} w={w} i={i} total={words.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

export type BenefitsProps = {
  kicker?: string;
  title?: string;
  accent?: string[];
  question?: string;
  intro?: string;
  listIntro?: string;
  items?: string[];
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  location?: string;
};

const Benefits = ({
  kicker = "Benefícios",
  title = "O que muda quando você decide cuidar disso",
  accent = ["cuidar", "disso"],
  question = QUESTION,
  intro = "A terapia não apaga o que você viveu. Ela te ajuda a entender o que sente, por que reage como reage e o que dá para fazer diferente, com escuta qualificada e método.",
  listIntro = "Cada processo é único e tem o seu tempo. Ao longo das sessões, a gente trabalha para que você possa:",
  items = points,
  image = benefitsImage,
  imageAlt = "Psicóloga Laura Porto",
  ctaLabel = "Dar o primeiro passo",
  location = "benefits_cta",
}: BenefitsProps) => {
  return (
    <section id="benefits" className="relative overflow-clip bg-ink-900 py-20 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brand/30 blur-[120px] animate-breathe"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Kicker light className="mb-5">
          {kicker}
        </Kicker>
        <SectionTitle light text={title} accent={accent} className="mb-10 lg:mb-14" />

        <div className="max-w-4xl">
          <ScrubQuestion text={question} />
          <Reveal>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-lg">
              {intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal y={40}>
            <ParallaxImage
              src={image}
              alt={imageAlt}
              strength={10}
              className="aspect-[4/5] rounded-[2rem] lg:aspect-[5/6]"
              imgClassName="object-[50%_20%]"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[16px] leading-relaxed text-white/75 sm:text-lg">
                {listIntro}
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {items.map((p, i) => (
                <Reveal
                  as="li"
                  key={p}
                  delay={i * 0.07}
                  y={18}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-mint-300/40 hover:bg-white/[0.07]"
                >
                  <span className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-mint-300 text-ink-900">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span className="text-[15.5px] leading-relaxed text-white/90">{p}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal className="mt-10">
              <WhatsButton location={location} label={ctaLabel} variant="light" className="w-full sm:w-auto" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
