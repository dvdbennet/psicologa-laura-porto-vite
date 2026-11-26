import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import benefitsImage from "../assets/images/hero-image-4.jpeg";
import Kicker from "./ui/Kicker";
import { ParallaxImage, Reveal, SectionTitle, WhatsButton } from "./ui/motion";

const points = [
  "Lidar com ansiedade, estresse e emoções difíceis com mais equilíbrio.",
  "Compreender padrões de pensamento e comportamento.",
  "Desenvolver mais clareza e segurança nas decisões.",
  "Fortalecer autoestima e recursos emocionais.",
  "Construir mudanças reais na forma de se relacionar consigo e com os outros.",
];

const QUESTION =
  "Você sente que gostaria de compreender melhor suas emoções e lidar com os desafios da vida com mais clareza e segurança?";

function Word({ w, i, total, progress }: { w: string; i: number; total: number; progress: MotionValue<number> }) {
  const start = i / total;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / total)], [0.18, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

/** Pergunta que "acende" palavra por palavra conforme a rolagem. */
function ScrubQuestion() {
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

const Benefits = () => {
  return (
    <section id="benefits" className="relative overflow-clip bg-ink-900 py-20 text-white lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-brand/30 blur-[120px] animate-breathe"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Kicker light className="mb-5">
          Benefícios
        </Kicker>
        <SectionTitle light text="Benefícios da Psicoterapia Comigo" accent={["Psicoterapia", "Comigo"]} className="mb-10 lg:mb-14" />

        <div className="max-w-4xl">
          <ScrubQuestion />
          <Reveal>
            <p className="mt-7 max-w-2xl text-[16px] leading-relaxed text-white/65 sm:text-lg">
              A psicoterapia oferece um espaço de escuta qualificada e reflexão, onde é possível
              compreender padrões de pensamento, fortalecer recursos emocionais e desenvolver novas
              formas de enfrentar as dificuldades do dia a dia.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal y={40}>
            <ParallaxImage
              src={benefitsImage}
              alt="Psicóloga Laura Porto"
              strength={10}
              className="aspect-[4/5] rounded-[2rem] lg:aspect-[5/6]"
              imgClassName="object-[50%_15%]"
            />
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[16px] leading-relaxed text-white/75 sm:text-lg">
                Ao longo do acompanhamento, você desenvolve mais consciência sobre si mesmo, aprende
                a lidar melhor com o que sente e constrói caminhos mais alinhados com seus valores e
                necessidades.
              </p>
            </Reveal>
            <ul className="mt-8 space-y-3">
              {points.map((p, i) => (
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
              <WhatsButton location="benefits_cta" label="Agendar consulta" variant="light" className="w-full sm:w-auto" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
