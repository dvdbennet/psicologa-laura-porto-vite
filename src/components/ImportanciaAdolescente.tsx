import { useWhatsApp } from "@/context/WhatsAppProvider";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

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

const ImportanciaAdolescente = () => {
  const whatsapp = useWhatsApp();
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => setCurrentPage((prev) => (prev + 1) % topics.length);
  const prevPage = () =>
    setCurrentPage((prev) => (prev - 1 + topics.length) % topics.length);
  const topic = topics[currentPage];

  return (
    <section id="importancia" className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <Kicker className="justify-center mb-4">Entenda o processo</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Acompanhamento para{" "}
            <span className="text-emerald-700">Adolescentes</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed max-w-2xl mx-auto">
            Ofereço um espaço terapêutico projetado para as necessidades
            únicas dessa fase, com transparência sobre como o processo
            funciona.
          </p>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={prevPage}
            aria-label="Tópico anterior"
            className="p-2.5 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
          >
            <ChevronLeft className="text-emerald-700" size={20} />
          </button>
          <div className="flex gap-1.5">
            {topics.map((t, i) => (
              <button
                key={t.title}
                onClick={() => setCurrentPage(i)}
                aria-label={`Tópico ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-emerald-600 w-6"
                    : "bg-emerald-200 w-1.5"
                }`}
              />
            ))}
          </div>
          <button
            onClick={nextPage}
            aria-label="Próximo tópico"
            className="p-2.5 bg-emerald-50 rounded-full hover:bg-emerald-100 transition-colors"
          >
            <ChevronRight className="text-emerald-700" size={20} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="bg-slate-50 rounded-3xl p-8 md:p-12"
          >
            <div className="flex items-start gap-4 mb-6">
              <span className="font-display text-emerald-300 text-2xl leading-none pt-1 flex-shrink-0">
                {String(currentPage + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl md:text-3xl text-ink-900">
                {topic.title}
              </h3>
            </div>

            <p className="text-ink-600 leading-relaxed whitespace-pre-line mb-6">
              {topic.description}
            </p>

            {topic.features.length > 0 && (
              <ul className="space-y-3 mb-6">
                {topic.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-ink-800">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            {topic.additionalText && (
              <p className="text-ink-600 leading-relaxed whitespace-pre-line border-t border-ink-100 pt-6">
                {topic.additionalText}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-14"
        >
          <motion.a
            target="_blank"
            href={whatsapp}
            onClick={() => {
              if (typeof window !== "undefined" && window.dataLayer) {
                window.dataLayer.push({
                  event: "whatsapp_click",
                  click_location: "importancia_adolescente_cta",
                });
              }
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <IconeWhats width={22} />
            <span>Agendar Consulta</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ImportanciaAdolescente;
