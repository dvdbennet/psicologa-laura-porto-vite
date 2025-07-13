import { motion } from "framer-motion";
import { Calendar, MapPin, Star, Video } from "lucide-react";
import heroImage from "../assets/images/hero-image-2.jpeg";

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Star size={16} className="fill-current" />
              <span>CRP 06/123456 - Psicóloga Clínica</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-light text-slate-800 mb-6 leading-tight">
              Psicóloga{" "}
              <span className="text-emerald-600 whitespace-nowrap font-large">
                Laura Porto
              </span>{" "}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Atendimentos online e presenciais em Brasília-DF, com acolhimento,
              ética e um espaço seguro para adultos e adolescentes. Agende sua
              sessão e comece hoje mesmo sua jornada de cuidado com a saúde
              mental.
            </p>

            <div className="flex flex-col  sm:flex-row gap-14 mb-8">
              <motion.a
                target="_blankm"
                href="https://wa.me/5561999914224?text=Ol%C3%A1,%20quero%20marcar%20uma%20consulta.%20Quais%20s%C3%A3o%20as%20disponibilidade%20de%20hor%C3%A1rios?"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calendar size={20} />
                <span>Agendar Consulta</span>
              </motion.a>
              <div className="flex items-center space-x-2">
                <Video size={20} className="text-emerald-600" />
                <span> Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={20} className="text-emerald-600" />
                <span>Presencial </span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Professional therapy session"
                className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
              />

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute -left-6 top-20 bg-white rounded-2xl p-4 shadow-xl border border-slate-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-slate-700 font-medium">
                    Disponível Agora
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-6 bottom-20 bg-white rounded-2xl p-4 shadow-xl border border-slate-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">
                    200+
                  </div>
                  <div className="text-slate-600 text-sm">
                    Pacientes Atendidos
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
