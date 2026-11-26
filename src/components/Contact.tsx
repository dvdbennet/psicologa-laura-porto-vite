import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const contactInfo = [
  { icon: Phone, title: "(61) 99991-4224", subtitle: "WhatsApp" },
  { icon: Mail, title: "lauraporto.psi@gmail.com", subtitle: "Email p/ contato" },
  { icon: MapPin, title: "Sudoeste, Brasília - DF", subtitle: "Atendimento presencial" },
  { icon: Video, title: "Sessões Online", subtitle: "Plataforma de vídeo segura" },
];

const hours = [
  { day: "Segunda - Sexta", time: "8:00 - 20:00" },
  { day: "Sábado", time: "10:00 - 16:00" },
  { day: "Domingo", time: "Fechado" },
];

const Contact = () => {
  return (
    <section id="contact" className="relative bg-mist py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 max-w-3xl lg:mb-14">
          <Kicker className="mb-5">Contato</Kicker>
          <SectionTitle text="Entre em Contato" accent={["Contato"]} />
          <Reveal delay={0.15}>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Estou aqui para ajudar você em sua jornada de autoconhecimento e bem-estar emocional.
              Entre em contato pelos meus canais de comunicação.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* cartão principal: WhatsApp */}
          <Reveal y={36}>
            <TiltCard max={4} className="relative h-full overflow-hidden rounded-[2rem] bg-brand p-8 text-white sm:p-10">
              <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-mint-300/40 blur-3xl animate-breathe" />
              <div className="relative flex h-full flex-col">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[13px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
                  WhatsApp
                </span>
                <p className="mt-6 font-display text-[1.9rem] leading-[1.1] sm:text-5xl">(61) 99991-4224</p>
                <p className="mt-4 max-w-md text-white/75">
                  O jeito mais rápido de tirar dúvidas e combinar o melhor horário para a sua primeira
                  sessão.
                </p>
                <div className="mt-auto pt-10">
                  <WhatsButton location="contact_cta" label="Chamar no WhatsApp" variant="light" className="w-full sm:w-auto" />
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="grid gap-5">
            <Reveal delay={0.1} className="rounded-[1.75rem] bg-white p-6 shadow-soft sm:p-8">
              <ul className="divide-y divide-ink-900/10">
                {contactInfo.slice(1).map((c) => (
                  <li key={c.subtitle} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-mist text-brand">
                      <c.icon size={20} />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-ink-900">{c.title}</div>
                      <div className="text-sm text-ink-600">{c.subtitle}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.18} className="rounded-[1.75rem] bg-white p-6 shadow-soft sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <Clock className="text-brand" size={20} />
                <h4 className="font-semibold text-ink-900">Horário de Atendimento</h4>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between border-b border-ink-900/10 pb-3 text-[15px] last:border-0 last:pb-0"
                  >
                    <span className="text-ink-600">{h.day}</span>
                    <span className="font-medium text-ink-900">{h.time}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
