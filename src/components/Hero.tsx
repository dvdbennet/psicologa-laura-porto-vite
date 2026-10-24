import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Sparkles, Video } from "lucide-react";
import heroImage from "../assets/images/hero-image-7.webp";
import IconeWhats from "./IconeWhats";
import Orbs from "./ui/Orbs";

const bullets = [
  "Atendimento online para todo o Brasil",
  "Psicoterapia para adultos e adolescentes",
  "Espaço seguro, ético e acolhedor",
];

const trustPoints = [
  { icon: ShieldCheck, label: "CRP 01/28432 registrada" },
  { icon: Sparkles, label: "+400 pacientes atendidos" },
  { icon: Video, label: "100% online, todo o Brasil" },
];

const Hero = () => {
  const whatsapp = useWhatsApp();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-[#fbfaf8] to-teal-50 pt-8 lg:pt-16 pb-20">
      <Orbs />
      <div className="grain-overlay" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center min-h-[80vh] lg:min-h-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium mb-7 shadow-soft"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>CRP 01/28432 · Psicóloga Clínica</span>
            </motion.div>

            <h1 className="font-display text-[2.75rem] leading-[1.05] sm:text-6xl md:text-7xl text-ink-900 mb-6 tracking-tight text-balance">
              Cuide da sua{" "}
              <span className="relative inline-block text-emerald-700">
                mente
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute left-0 -bottom-1 w-full h-3 text-emerald-300"
                >
                  <path
                    d="M2 9 C 50 2, 150 2, 198 9"
                    stroke="currentColor"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              com quem entende de verdade.
            </h1>

            <div className="text-lg text-ink-600 space-y-4 mb-8 leading-relaxed max-w-xl">
              <p>
                Psicoterapia online para quem quer cuidar da saúde mental com
                seriedade.
              </p>
              <p>
                Se você enfrenta{" "}
                <strong className="text-ink-800 font-semibold">
                  ansiedade, depressão, tristeza, conflitos emocionais
                </strong>
                , a terapia pode ajudar a compreender seus sentimentos e
                construir novos caminhos.
              </p>
            </div>

            <ul className="grid sm:grid-cols-1 gap-3 mb-9">
              {bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-ink-800">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <motion.a
                target="_blank"
                href={whatsapp}
                onClick={() => {
                  if (typeof window !== "undefined" && window.dataLayer) {
                    window.dataLayer.push({
                      event: "whatsapp_click",
                      click_location: "hero",
                    });
                  }
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center justify-center gap-2.5 bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-glow hover:bg-emerald-700 transition-colors"
              >
                <IconeWhats width={22} />
                <span>Agendar no WhatsApp</span>
              </motion.a>
              <a
                href="#testimonials"
                className="inline-flex items-center justify-center gap-2 text-ink-700 font-medium px-2 py-3 hover:text-emerald-700 transition-colors"
              >
                Ver depoimentos
                <ArrowDown size={16} />
              </a>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] border border-emerald-200/70 -rotate-2" />
            <div className="relative">
              <img
                src={heroImage}
                alt="Dra. Laura Porto em sessão de psicoterapia"
                className="rounded-[2rem] shadow-lifted w-full h-[420px] lg:h-[600px] object-cover object-[50%_18%]"
                loading="eager"
                // @ts-expect-error -- fetchpriority is valid HTML but not yet in React's DOM typings
                fetchpriority="high"
              />
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-ink-900/25 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -right-4 top-8 lg:-right-6 lg:top-12 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lifted border border-white"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-ink-800 font-medium text-sm">
                    Disponível Agora
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="absolute -left-4 bottom-8 lg:-left-6 lg:bottom-12 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lifted border border-white"
              >
                <div className="text-center">
                  <div className="text-2xl font-display text-emerald-700">
                    400+
                  </div>
                  <div className="text-ink-600 text-xs">
                    Pacientes Atendidos
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 lg:mt-20 pt-8 border-t border-emerald-900/10 flex flex-wrap items-center justify-center lg:justify-between gap-x-10 gap-y-4"
        >
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-ink-600">
              <Icon size={18} className="text-emerald-600" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
