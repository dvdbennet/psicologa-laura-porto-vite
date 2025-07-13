import { motion } from "framer-motion";
import { Award, GraduationCap, Heart, Users } from "lucide-react";
import aboutImage from "../assets/images/hero-image.jpeg";

const credentials = [
  {
    icon: GraduationCap,
    title: "Pós graduanda em Neuropsicologia",
    description: "IPOG (Instituto de Pós-Graduação e Graduação)",
  },
  {
    icon: Award,
    title: "Psicóloga Clínica Registrada",
    description: "CRP 01/28432 - Conselho Regional de Psicologia",
  },
  {
    icon: Users,
    title: "+200 Pacientes Atendidos",
    description: "Atendendo adultos e adolescentes",
  },
  {
    icon: Heart,
    title: "Formação Especializada",
    description: "Análise do Comportamento - Terapia Baseada em Evidências",
  },
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Sobre{" "}
            <span className="text-emerald-600 font-medium">
              Dra. Laura Porto
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Com mais de 15 anos de experiência em psicologia clínica, sou
            dedicada a ajudar pessoas a navegarem pelos desafios da vida e
            descobrirem sua força interior e resilência.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={aboutImage}
              alt="Dr. Laura Porto"
              className="rounded-3xl shadow-xl w-full h-[500px] object-cover object-top brightness-125"
            />
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-slate-700 leading-relaxed">
              I believe that every person has the capacity for growth and
              healing. My approach is collaborative, compassionate, and tailored
              to each individual's unique needs and goals.
            </p>

            <p className="text-lg text-slate-700 leading-relaxed">
              I specialize in working with adults facing anxiety, depression,
              relationship challenges, life transitions, and trauma. My practice
              integrates evidence-based therapies with a warm, supportive
              approach.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <credential.icon className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      {credential.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {credential.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
