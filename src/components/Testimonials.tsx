import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { whatsapp } from "../config";

const testimonials = [
  {
    name: "Mulher 45 anos",
    text: "Dra. Laura Porto me ajudou a entender melhor minhas emoções e a lidar com o estresse do dia a dia. Sinto que estou mais no controle da minha vida.",
    rating: 5,
    session: "Online",
  },
  {
    name: "Casal 12 anos de casados",
    text: "Nossa terapia de casal com a Dra. Laura foi transformadora. Aprendemos a nos comunicar melhor e a resolver nossos conflitos de forma saudável.",
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
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Testemunho de {" "}
            <span className="text-emerald-600 font-medium">Clientes</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Leia o que meus clientes dizem sobre suas experiências de terapia. Seus testemunhos refletem a eficácia e o
            valor do trabalho terapêutico que realizamos juntos.

          </p>
           <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">

            (Todas as indentidades foram alteradas para preservar a privacidade dos clientes.)
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <Quote className="text-emerald-200 mb-4" size={32} />

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">
                    {testimonial.name}
                  </div>
                  <div className="text-emerald-600 text-sm">
                    {testimonial.session}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Pronto para começar sua jornada de transformação?
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Agende uma consulta hoje e descubra como a terapia pode ajudá-lo a alcançar seus objetivos pessoais e emocionais.
            </p>
            <motion.a
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsapp()}
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors"
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
