import { Lock, MessagesSquare, Sprout, Users } from "lucide-react";
import Kicker from "./ui/Kicker";
import { Reveal, SectionTitle, TiltCard, WhatsButton } from "./ui/motion";

const icons = [MessagesSquare, Sprout, Users, Lock];

const topics = [
  {
    title: "Como ocorre o acompanhamento",
    description:
      "As sessões oferecem um espaço de escuta e acolhimento onde o adolescente pode falar livremente sobre suas experiências, pensamentos e emoções.\n\nO processo terapêutico busca:",
    features: [
      "favorecer o autoconhecimento",
      "desenvolver habilidades emocionais",
      "ajudar na construção de formas mais saudáveis de lidar com dificuldades",
      "promover maior compreensão sobre si mesmo e sobre suas relações",
    ],
    additionalText:
      "Para que o acompanhamento seja efetivo, é fundamental que o adolescente se sinta seguro e estabeleça uma relação de confiança com o profissional.",
  },
  {
    title: "A adolescência e a importância do acompanhamento psicológico",
    description:
      "A adolescência é uma fase marcada por intensas transformações emocionais, sociais e psicológicas. Nesse período, o jovem passa por mudanças importantes na construção da identidade, nas relações familiares e sociais, além de lidar com novas responsabilidades e expectativas.\n\nEssas transformações podem gerar dúvidas, conflitos internos e dificuldades emocionais. O acompanhamento psicológico oferece um espaço seguro para que o adolescente possa compreender melhor seus sentimentos, desenvolver recursos para lidar com desafios e fortalecer sua saúde mental. Estudos apontam que a psicoterapia nessa fase pode ajudar o jovem a lidar com conflitos, desenvolver autoestima e melhorar suas relações interpessoais.",
    features: [],
    additionalText: "",
  },
  {
    title: "A relação com os pais ou responsáveis",
    description:
      "A participação da família é importante no processo terapêutico do adolescente. Em alguns momentos do acompanhamento, podem ocorrer orientações com os responsáveis para auxiliar na compreensão das dificuldades do jovem e fortalecer o apoio familiar. Essa troca é cuidadosa e respeitosa, preservando o sigilo das sessões.\n\nOs responsáveis recebem orientações gerais sobre o processo e sobre formas de apoiar o adolescente no dia a dia, sem exposição do conteúdo específico das sessões. Estarei sempre disponível para ouvir, orientar e oferecer suporte, mantendo um espaço aberto de diálogo, respeito e colaboração. A família é uma parte importante desse processo de cuidado.",
    features: [],
    additionalText: "",
  },
  {
    title: "Sigilo no atendimento ao adolescente",
    description:
      "O sigilo é um princípio fundamental da psicoterapia. Ele é essencial para que o adolescente se sinta confortável para falar sobre suas experiências e sentimentos.\n\nAs sessões são conduzidas com confidencialidade. No entanto, quando se trata de menores de idade, existe uma comunicação cuidadosa com os responsáveis, especialmente quando necessário para o bem-estar do adolescente. Em geral, os responsáveis recebem orientações gerais sobre o acompanhamento, sem exposição do conteúdo específico das sessões, preservando o vínculo terapêutico e a confiança do jovem.",
    features: [],
    additionalText: "",
  },
];

/**
 * "Entenda o processo": título fixo à esquerda no desktop, os quatro tópicos
 * empilhados à direita (antes era um carrossel que escondia 3 dos 4 textos).
 */
const ImportanciaAdolescente = () => {
  return (
    <section id="importancia" className="relative bg-mist py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <Kicker className="mb-5">Entenda o processo</Kicker>
            <SectionTitle text="Nem tudo é “só uma fase”" accent={["“só", "uma", "fase”"]} />
            <Reveal delay={0.15}>
              <p className="mt-5 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
                Muitas vezes o adolescente está precisando de ajuda e não sabe pedir. Entenda, com
                transparência, como o processo funciona.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="mt-8 hidden lg:block">
              <WhatsButton location="importancia_adolescente_cta" label="Agendar uma conversa" />
            </Reveal>
          </div>
        </div>

        <div className="space-y-4 lg:space-y-5">
          {topics.map((t, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal key={t.title} y={30} delay={i * 0.05}>
                <TiltCard max={3} className="rounded-[1.75rem] bg-white p-6 shadow-soft sm:p-9">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-mist text-brand">
                      <Icon size={22} />
                    </span>
                    <h3 className="pt-1.5 font-display text-[1.3rem] leading-snug text-ink-900 sm:text-[1.6rem]">{t.title}</h3>
                  </div>
                  <div className="mt-5 space-y-3 text-[15.5px] leading-relaxed text-ink-600">
                    {t.description.split("\n\n").map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                  {t.features.length > 0 && (
                    <ul className="mt-4 space-y-2.5">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-ink-800">
                          <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {t.additionalText && <p className="mt-4 text-[15.5px] leading-relaxed text-ink-600">{t.additionalText}</p>}
                </TiltCard>
              </Reveal>
            );
          })}
          <Reveal className="lg:hidden">
            <WhatsButton location="importancia_adolescente_cta" label="Agendar uma conversa" className="w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default ImportanciaAdolescente;
