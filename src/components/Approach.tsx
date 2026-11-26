import { Compass, Lightbulb, Quote, Shield, Target } from "lucide-react";
import avatarImage from "../assets/images/wppimage(8).jpeg";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard } from "./ui/motion";

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

// tons de fundo dos cartões empilhados (do mais claro ao mais profundo)
const tones = ["bg-white", "bg-[#EAF6F1]", "bg-[#DDF1E9]", "bg-[#CFEFE4]"];

function Marquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="flex overflow-clip [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div
        className={`flex shrink-0 gap-3 pr-3 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""} hover:[animation-play-state:paused]`}
      >
        {[...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-ink-900/10 bg-white px-5 py-3 text-[15px] text-ink-800 shadow-soft"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const Approach = () => {
  return (
    <section id="approach" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-6 lg:mb-16 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <Kicker className="mb-5">Metodologia</Kicker>
            <SectionTitle text="Escuta acolhedora, método científico." accent={["método", "científico"]} />
          </div>
          <Reveal delay={0.15}>
            <p className="text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Trabalho com a Análise do Comportamento, uma abordagem baseada em evidências científicas.
              Na prática, isso significa entender o que você sente dentro do contexto da sua vida,
              identificar o que mantém o sofrimento e construir, junto com você, mudanças concretas no
              dia a dia.
            </p>
          </Reveal>
        </div>

        {/* celular: cartões que se empilham ao rolar | desktop: 4 colunas com inclinação 3D */}
        <div className="grid gap-4 lg:grid-cols-4 lg:gap-5">
          {approaches.map((a, i) => (
            <div key={a.title} className="sticky lg:static" style={{ top: `${84 + i * 14}px` }}>
              <Reveal y={30} delay={i * 0.08}>
                <TiltCard
                  className={`flex min-h-[230px] flex-col rounded-[1.75rem] border border-ink-900/[0.07] p-7 shadow-[0_-10px_40px_-24px_rgba(15,42,34,0.35)] lg:h-full lg:min-h-[340px] lg:shadow-soft ${tones[i]}`}
                >
                  <span className="mb-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white">
                    <a.icon size={22} />
                  </span>
                  <h3 className="mt-8 font-display text-[1.35rem] leading-snug text-ink-900">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{a.description}</p>
                </TiltCard>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* princípios em faixa contínua */}
      <div className="mt-20 lg:mt-28">
        <Reveal className="mx-auto mb-6 max-w-7xl px-5 sm:px-8">
          <h3 className="font-display text-2xl text-ink-900 sm:text-3xl">
            <span className="text-brand">Princípios</span> que guiam o trabalho
          </h3>
        </Reveal>
        <div className="space-y-3">
          <Marquee items={principles.slice(0, 3).concat(principles.slice(0, 3))} />
          <Marquee items={principles.slice(3).concat(principles.slice(3))} reverse />
        </div>
      </div>

      {/* citação */}
      <div className="mx-auto mt-20 max-w-7xl px-5 sm:px-8 lg:mt-28">
        <Reveal y={40}>
          <figure className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand to-[#0B5E4A] p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-mint-300/30 blur-3xl animate-breathe" />
            <Quote aria-hidden size={56} className="relative mb-6 text-mint-300/70" />
            <blockquote className="relative max-w-4xl font-display text-[1.4rem] leading-[1.35] sm:text-3xl lg:text-[2.35rem]">
              "Meu compromisso é oferecer um espaço de escuta ativa, acolhedor e sem julgamentos.
              Aqui, você poderá compreender seus comportamentos dentro do seu contexto de vida, e
              juntos vamos construir estratégias que favoreçam sua autonomia, bem-estar e relações
              mais saudáveis."
            </blockquote>
            <figcaption className="relative mt-10 flex items-center gap-4">
              <img
                src={avatarImage}
                alt="Laura Porto"
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover object-[50%_25%] ring-2 ring-white/40"
              />
              <div>
                <div className="font-semibold">Dra. Laura Porto</div>
                <div className="text-sm text-mint-100">Psicóloga Clínica CRP 01/28432</div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

export default Approach;
