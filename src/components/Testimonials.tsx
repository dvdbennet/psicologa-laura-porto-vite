import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Kicker from "./ui/Kicker";

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

const Testimonials = () => {
  const whatsapp = useWhatsApp();
  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <Kicker className="justify-center mb-4">Depoimentos</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 mb-6 text-balance">
            O que meus{" "}
            <span className="text-emerald-700">clientes dizem</span>
          </h2>
          <p className="text-lg text-ink-600 leading-relaxed">
            Seus testemunhos refletem a eficácia e o valor do trabalho
            terapêutico que realizamos juntos.
          </p>
          <p className="text-sm text-ink-400 mt-2 italic">
            (Todas as identidades foram alteradas para preservar a privacidade
            dos clientes.)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-lifted transition-all border border-transparent hover:border-emerald-100"
            >
              <Quote
                className="absolute top-6 right-7 text-emerald-100"
                size={44}
              />
              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-amber-400 fill-current"
                  />
                ))}
              </div>

              <p className="relative text-ink-700 text-base leading-relaxed mb-7">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between border-t border-ink-100 pt-4">
                <div className="font-semibold text-ink-900 text-sm">
                  {testimonial.name}
                </div>
                <div className="text-emerald-600 text-xs font-medium uppercase tracking-wide">
                  {testimonial.session}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 to-teal-800 rounded-3xl p-10 max-w-2xl mx-auto text-white">
            <h3 className="font-display text-2xl md:text-3xl mb-4">
              Pronto para começar sua jornada de transformação?
            </h3>
            <p className="text-emerald-50 mb-7 leading-relaxed">
              Agende uma consulta hoje e descubra como a terapia pode ajudá-lo
              a alcançar seus objetivos pessoais e emocionais.
            </p>
            <motion.a
              target="_blank"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={whatsapp}
              onClick={() => {
                if (typeof window !== "undefined" && window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    click_location: "testimonials_cta",
                  });
                }
              }}
              className="inline-flex items-center gap-2 bg-white text-emerald-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Agendar Consulta
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
