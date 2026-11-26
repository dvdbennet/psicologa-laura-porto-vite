import { Check, MapPin, Video } from "lucide-react";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const modalidades = [
  {
    icon: MapPin,
    tag: "Presencial",
    title: "Consultório no Sudoeste",
    description:
      "Um espaço reservado e acolhedor no Sudoeste, em Brasília - DF, para quem prefere o encontro olho no olho.",
    points: [
      "Prático para quem mora ou trabalha no Sudoeste, Octogonal, Cruzeiro e Plano Piloto",
      "Ambiente tranquilo, pensado para você se sentir à vontade",
      "Sessões semanais de cerca de 50 minutos",
    ],
    cta: "Agendar sessão presencial",
    trackingId: "modalidade_presencial",
  },
  {
    icon: Video,
    tag: "Online",
    title: "Terapia online por vídeo",
    description:
      "A mesma escuta, o mesmo cuidado e o mesmo sigilo, de onde você estiver.",
    points: [
      "Ideal para outras regiões do DF, como Águas Claras, Taguatinga e Lago Sul, sem perder tempo no trânsito",
      "Disponível para todo o Brasil e para brasileiros no exterior",
      "Regulamentada pelo Conselho Federal de Psicologia (Resolução CFP nº 11/2018)",
    ],
    cta: "Agendar sessão online",
    trackingId: "modalidade_online",
  },
];

/** Presencial x online: dois cartões lado a lado, o online em destaque escuro. */
const ModalidadesBrasilia = () => {
  return (
    <section id="benefits" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl lg:mb-14">
          <Kicker className="mb-5">Como você prefere</Kicker>
          <SectionTitle text="Terapia em Brasília, presencial ou online" accent={["presencial", "online"]} />
          <Reveal delay={0.15}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Cuidar de você não pode virar mais uma tarefa difícil na agenda. Escolha o formato que
              cabe na sua rotina; se ela mudar, a gente ajusta.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {modalidades.map((m, i) => {
            const dark = i === 1;
            return (
              <Reveal key={m.title} delay={i * 0.1} y={36}>
                <TiltCard
                  max={4}
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] p-7 sm:p-10 ${
                    dark ? "bg-ink-900 text-white" : "bg-mist text-ink-900"
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl animate-breathe ${
                      dark ? "bg-brand/40" : "bg-mint-300/40"
                    }`}
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      className={`grid h-14 w-14 place-items-center rounded-2xl ${
                        dark ? "bg-white/10 text-mint-300" : "bg-white text-brand shadow-soft"
                      }`}
                    >
                      <m.icon size={26} />
                    </span>
                    <span
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
                        dark ? "bg-mint-300 text-ink-900" : "bg-white text-brand"
                      }`}
                    >
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="relative mt-8 font-display text-[1.75rem] leading-tight sm:text-4xl">{m.title}</h3>
                  <p className={`relative mt-3 leading-relaxed sm:text-lg ${dark ? "text-white/70" : "text-ink-600"}`}>
                    {m.description}
                  </p>
                  <ul className="relative mt-7 space-y-3">
                    {m.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${
                            dark ? "bg-mint-300 text-ink-900" : "bg-brand text-white"
                          }`}
                        >
                          <Check size={13} strokeWidth={3} />
                        </span>
                        <span className={`text-[15px] leading-relaxed ${dark ? "text-white/85" : "text-ink-800"}`}>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="relative mt-auto pt-9">
                    <WhatsButton
                      location={m.trackingId}
                      label={m.cta}
                      size="md"
                      variant={dark ? "light" : "brand"}
                      className="w-full sm:w-auto"
                    />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModalidadesBrasilia;
