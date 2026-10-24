import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { CheckCircle2, MapPin, Video } from "lucide-react";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

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

const ModalidadesBrasilia = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="benefits" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Como você prefere</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Terapia em Brasília,{" "}
            <span className="text-emerald-700">presencial ou online</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Escolha o formato que cabe na sua rotina. Se ela mudar, a gente
            conversa sobre a modalidade que faz mais sentido para você.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {modalidades.map((item, index) => (
            <motion.div
              key={item.tag}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="flex flex-col p-8 lg:p-10 rounded-3xl border border-ink-100 hover:border-emerald-200 hover:shadow-lifted transition-all bg-gradient-to-br from-white to-emerald-50/40"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                  <item.icon className="text-emerald-600" size={26} />
                </div>
                <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-ink-900 mb-3">
                {item.title}
              </h3>
              <p className="text-ink-600 leading-relaxed mb-6">
                {item.description}
              </p>
              <ul className="space-y-3.5 mb-10">
                {item.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="text-emerald-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-ink-800 text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.a
                target="_blank"
                href={whatsapp}
                onClick={() => {
                  if (typeof window !== "undefined" && window.dataLayer) {
                    window.dataLayer.push({
                      event: "whatsapp_click",
                      click_location: item.trackingId,
                    });
                  }
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto self-start inline-flex items-center gap-2.5 bg-emerald-600 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
              >
                <IconeWhats width={20} />
                <span>{item.cta}</span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModalidadesBrasilia;
