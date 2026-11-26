import { motion, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { useRef } from "react";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const testimonials = [
  {
    name: "Mulher 45 anos",
    text: "Dra. Laura Porto me ajudou a entender melhor minhas emoções e a lidar com o estresse do dia a dia. Sinto que estou mais no controle da minha vida.",
    rating: 5,
    session: "Online",
  },
  {
    name: "Mulher 22 anos",
    text: "Consegui gerenciar e tomar algumas decisões importantes a partir de reflexoes na psicoterapia com a Dra. Laura. Recomendo muito!",
    rating: 5,
    session: "Online",
  },
  {
    name: "Homem 33 anos",
    text: "A terapia com a Laura me ajudou a superar minha ansiedade e a encontrar um novo propósito na vida. Sou muito grato por todo o apoio.",
    rating: 5,
    session: "Online",
  },
  {
    name: "Mãe de adolescente",
    text: "Como mãe, eu estava preocupada com o bem-estar do meu filho adolescente. A Laura criou um ambiente seguro para ele se abrir e trabalhar suas questões.",
    rating: 5,
    session: "Presencial",
  },
];

/**
 * Trilho horizontal: rolagem nativa com snap (arrasta com o dedo no celular,
 * setas e trackpad no desktop) + barra de progresso.
 */
const Testimonials = () => {
  const track = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: track });

  const step = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 16), behavior: "smooth" });
  };

  return (
    <section id="testimonials" className="relative bg-mist py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 flex flex-col gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Kicker className="mb-5">Depoimentos</Kicker>
            <SectionTitle text="O que meus clientes dizem" accent={["clientes", "dizem"]} />
            <Reveal delay={0.15}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
                Seus testemunhos refletem a eficácia e o valor do trabalho terapêutico que realizamos
                juntos.
              </p>
              <p className="mt-2 text-sm italic text-ink-400">
                (Todas as identidades foram alteradas para preservar a privacidade dos clientes.)
              </p>
            </Reveal>
          </div>
          <div className="hidden gap-2 lg:flex">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => step(d as 1 | -1)}
                aria-label={d < 0 ? "Depoimento anterior" : "Próximo depoimento"}
                className="grid h-14 w-14 place-items-center rounded-full border border-ink-900/15 text-ink-800 transition-colors hover:bg-ink-900 hover:text-white"
              >
                {d < 0 ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={track}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-6 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:scroll-px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((t, i) => (
          <Reveal
            key={t.name}
            delay={i * 0.08}
            y={24}
            className="w-[84%] flex-shrink-0 snap-start sm:w-[420px] last:snap-end"
          >
            <div data-card className="h-full">
              <TiltCard max={5} className="flex h-full flex-col rounded-[1.75rem] bg-white p-7 shadow-soft sm:p-9">
                <div className="mb-6 flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, k) => (
                    <Star key={k} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="flex-1 font-display text-[1.2rem] leading-[1.45] text-ink-900 sm:text-[1.35rem]">
                  "{t.text}"
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-ink-900/10 pt-5 text-sm">
                  <span className="font-semibold text-ink-900">{t.name}</span>
                  <span className="rounded-full bg-mist px-3 py-1 text-[12.5px] font-medium text-brand">
                    {t.session}
                  </span>
                </div>
              </TiltCard>
            </div>
          </Reveal>
        ))}
        <div aria-hidden className="w-px flex-shrink-0" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="h-[3px] overflow-hidden rounded-full bg-ink-900/10">
          <motion.div style={{ scaleX: scrollXProgress }} className="h-full origin-left bg-brand" />
        </div>
      </div>

      {/* chamada final */}
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:mt-28">
        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 px-7 py-14 text-center text-white sm:px-12 lg:py-24">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#7FE0C2,transparent_60%),radial-gradient(circle_at_70%_70%,#2BB39A,transparent_62%)] opacity-40 blur-2xl animate-breathe lg:h-[620px] lg:w-[620px]"
            />
            <h3 className="relative mx-auto max-w-3xl font-display text-[1.9rem] leading-[1.1] sm:text-5xl lg:text-6xl">
              Pronto para começar sua jornada de transformação?
            </h3>
            <p className="relative mx-auto mt-5 max-w-xl leading-relaxed text-white/70 sm:text-lg">
              Agende uma consulta hoje e descubra como a terapia pode ajudá-lo a alcançar seus
              objetivos pessoais e emocionais.
            </p>
            <div className="relative mt-9">
              <WhatsButton location="testimonials_cta" label="Agendar consulta" variant="light" className="w-full sm:w-auto" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonials;
