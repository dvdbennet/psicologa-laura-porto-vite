import { Clock, MessageCircleHeart, Video } from "lucide-react";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const hours = [
  { day: "Segunda a sexta", time: "8:00 - 20:00" },
  { day: "Sábado", time: "10:00 - 16:00" },
];

/** "Uma hora para você": grade em bento — horários, online e o cartão do primeiro passo. */
const LocalizacaoBrasilia = () => {
  return (
    <section id="localizacao" className="relative bg-mist py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl lg:mb-14">
          <Kicker className="mb-5">Um espaço só seu</Kicker>
          <SectionTitle text="No meio da correria de Brasília, uma hora para você" accent={["uma", "hora", "para", "você"]} />
          <Reveal delay={0.15}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Trânsito, trabalho, cobranças, gente precisando de você o tempo todo. A terapia é o lugar
              onde você para, respira e é ouvido sem pressa e sem julgamento — no consultório do
              Sudoeste ou do sofá da sua casa.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          <Reveal y={30} className="lg:row-span-2">
            <TiltCard max={4} className="relative flex h-full flex-col overflow-hidden rounded-[2rem] bg-brand p-7 text-white sm:p-9">
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-mint-300/40 blur-3xl animate-breathe" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-white/15">
                <MessageCircleHeart size={22} />
              </span>
              <h3 className="relative mt-8 font-display text-[1.75rem] leading-tight sm:text-4xl">
                O primeiro passo é uma mensagem
              </h3>
              <p className="relative mt-4 leading-relaxed text-white/80">
                Me conte um pouco do que você está vivendo. Respondo com os horários disponíveis e tiro
                todas as suas dúvidas antes de começarmos.
              </p>
              <div className="relative mt-auto pt-10">
                <WhatsButton location="espaco_brasilia" label="Falar no WhatsApp" variant="light" className="w-full sm:w-auto" />
              </div>
            </TiltCard>
          </Reveal>

          <Reveal y={30} delay={0.08} className="lg:col-span-2">
            <div className="h-full rounded-[2rem] bg-white p-7 shadow-soft sm:p-9">
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mist text-brand">
                  <Clock size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl text-ink-900 sm:text-2xl">Horários que cabem na sua rotina</h3>
                  <p className="text-sm text-ink-600">Inclusive no início da noite e aos sábados.</p>
                </div>
              </div>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {hours.map((h) => (
                  <li key={h.day} className="rounded-2xl bg-mist px-5 py-4">
                    <div className="text-sm text-ink-600">{h.day}</div>
                    <div className="mt-1 font-display text-2xl text-ink-900 sm:text-3xl">{h.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.16} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-5 rounded-[2rem] bg-white p-7 shadow-soft sm:flex-row sm:items-center sm:p-9">
              <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-mist text-brand">
                <Video size={22} />
              </span>
              <div>
                <h3 className="font-display text-xl text-ink-900 sm:text-2xl">Sem tempo para se deslocar?</h3>
                <p className="mt-1.5 leading-relaxed text-ink-600">
                  A sessão online tem o mesmo cuidado e o mesmo sigilo do presencial. Você escolhe o
                  formato, e pode mudar quando a sua rotina mudar.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LocalizacaoBrasilia;
