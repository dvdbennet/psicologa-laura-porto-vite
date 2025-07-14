import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Phone, Video } from "lucide-react";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionType: "online",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert(
      "Obrigado por entrar em contato! Responderemos o mais breve possível."
    );
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Entre em <span className="text-emerald-600 font-medium">Contato</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Estou aqui para ajudar você em sua jornada de autoconhecimento e
            bem-estar emocional. Entre em contato
            pelos meus canais de comunicação.
          </p>
        </motion.div>

        <div className="grid gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-9"
          >
            <div>
              <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                Informação de Contato
              </h3>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Phone className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      (61) 99991-4224
                    </div>
                    <div className="text-slate-600">
                      WhatsApp
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Mail className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      lauraporto.psi@gmail.com
                    </div>
                    <div className="text-slate-600">
                      Email p/ contato
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <MapPin className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      Sudoeste - Clsw  5 Bloco A, Sala 202
                    </div>
                    <div className="text-slate-600">Brasília - DF</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Video className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <div className="font-medium text-slate-800">
                      Sessões Online
                    </div>
                    <div className="text-slate-600">Plataforma de vídeo segura</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 self-start rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="text-emerald-600" size={24} />
                <h4 className="text-xl font-semibold text-slate-800">
                  HORÁRIO DE ATENDIMENTO
                </h4>
              </div>
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between">
                  <span>Segunda - Sexta</span>
                  <span>8:00 - 20:00 </span>
                </div>
               
                <div className="flex justify-between">
                  <span>Sábado</span>
                  <span>10:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
