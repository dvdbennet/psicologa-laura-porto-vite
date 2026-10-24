import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { Clock, MessageCircleHeart, Video } from "lucide-react";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

const hours = [
  { day: "Segunda a sexta", time: "8:00 - 20:00" },
  { day: "Sábado", time: "10:00 - 16:00" },
];

const LocalizacaoBrasilia = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="localizacao" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Um espaço só seu</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            No meio da correria de Brasília,{" "}
            <span className="text-emerald-700">uma hora para você</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Trânsito, trabalho, cobranças, gente precisando de você o tempo
            todo. A terapia é o lugar onde você para, respira e é ouvido sem
            pressa e sem julgamento — no consultório do Sudoeste ou do sofá
            da sua casa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="p-7 rounded-3xl border border-ink-100 bg-white">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="text-emerald-600" size={22} />
            </div>
            <h3 className="font-semibold text-ink-900 mb-1">
              Horários que cabem na sua rotina
            </h3>
            <p className="text-ink-600 text-sm leading-relaxed mb-4">
              Inclusive no início da noite e aos sábados.
            </p>
            <ul className="space-y-2">
              {hours.map((item) => (
                <li
                  key={item.day}
                  className="flex justify-between text-sm text-ink-600"
                >
                  <span>{item.day}</span>
                  <span className="font-medium text-ink-800">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7 rounded-3xl border border-ink-100 bg-white">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <Video className="text-emerald-600" size={22} />
            </div>
            <h3 className="font-semibold text-ink-900 mb-1">
              Sem tempo para se deslocar?
            </h3>
            <p className="text-ink-600 text-sm leading-relaxed">
              A sessão online tem o mesmo cuidado e o mesmo sigilo do
              presencial. Você escolhe o formato, e pode mudar quando a sua
              rotina mudar.
            </p>
          </div>

          <div className="flex flex-col p-7 rounded-3xl border border-emerald-200 bg-emerald-50/60">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <MessageCircleHeart className="text-emerald-600" size={22} />
            </div>
            <h3 className="font-semibold text-ink-900 mb-1">
              O primeiro passo é uma mensagem
            </h3>
            <p className="text-ink-600 text-sm leading-relaxed mb-6">
              Me conte um pouco do que você está vivendo. Respondo com os
              horários disponíveis e tiro todas as suas dúvidas antes de
              começarmos.
            </p>
            <motion.a
              target="_blank"
              href={whatsapp}
              onClick={() => {
                if (typeof window !== "undefined" && window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    click_location: "espaco_brasilia",
                  });
                }
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-auto self-start inline-flex items-center gap-2.5 bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
            >
              <IconeWhats width={20} />
              <span>Falar no WhatsApp</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LocalizacaoBrasilia;
