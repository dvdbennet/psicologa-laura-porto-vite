import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import IconeWhats from "./IconeWhats";
import Kicker from "./ui/Kicker";

const contactInfo = [
  {
    icon: Phone,
    title: "(61) 99991-4224",
    subtitle: "WhatsApp",
  },
  {
    icon: Mail,
    title: "lauraporto.psi@gmail.com",
    subtitle: "Email p/ contato",
  },
  {
    icon: MapPin,
    title: "Sudoeste, Brasília - DF",
    subtitle: "Atendimento presencial",
  },
  {
    icon: Video,
    title: "Sessões Online",
    subtitle: "Plataforma de vídeo segura",
  },
];

const hours = [
  { day: "Segunda - Sexta", time: "8:00 - 20:00" },
  { day: "Sábado", time: "10:00 - 16:00" },
  { day: "Domingo", time: "Fechado" },
];

const Contact = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Contato</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            Entre em <span className="text-emerald-700">Contato</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Estou aqui para ajudar você em sua jornada de autoconhecimento e
            bem-estar emocional. Entre em contato pelos meus canais de
            comunicação.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3 grid sm:grid-cols-2 gap-4"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.subtitle}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-ink-100 hover:border-emerald-200 hover:shadow-soft transition-all"
              >
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="text-emerald-600" size={22} />
                </div>
                <div className="font-semibold text-ink-900 text-sm mb-1">
                  {item.title}
                </div>
                <div className="text-ink-500 text-sm">{item.subtitle}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <div className="bg-white rounded-2xl p-6 border border-ink-100">
              <div className="flex items-center gap-3 mb-5">
                <Clock className="text-emerald-600" size={22} />
                <h4 className="text-base font-semibold text-ink-900 uppercase tracking-wide">
                  Horário de Atendimento
                </h4>
              </div>
              <div className="space-y-3">
                {hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex justify-between text-sm border-b border-ink-100 last:border-0 pb-3 last:pb-0"
                  >
                    <span className="text-ink-600">{h.day}</span>
                    <span className="font-medium text-ink-900">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.a
              target="_blank"
              href={whatsapp}
              onClick={() => {
                if (typeof window !== "undefined" && window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    click_location: "contact_cta",
                  });
                }
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-6 py-5 rounded-2xl text-base font-semibold hover:bg-emerald-700 transition-colors"
            >
              <IconeWhats width={22} />
              Falar agora no WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
