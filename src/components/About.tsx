import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Award, GraduationCap, Heart, Instagram, Users } from "lucide-react";
import { useRef } from "react";
import aboutImage from "../assets/images/hero-image-9.jpg";
import deskImage from "../assets/images/hero-image-2.jpeg";
import Kicker from "./ui/Kicker";
import { ParallaxImage, Reveal, SectionTitle, WhatsButton } from "./ui/motion";

const credentials = [
  {
    icon: Award,
    title: "Psicóloga Clínica Registrada",
    description: "CRP 01/28432 - Conselho Regional de Psicologia",
  },
  {
    icon: GraduationCap,
    title: "Pós graduada em Neuropsicologia",
    description: "IPOG (Instituto de Pós-Graduação e Graduação)",
  },
  {
    icon: Heart,
    title: "Formação Especializada",
    description: "Análise do Comportamento - Terapia Baseada em Evidências",
  },
  {
    icon: Users,
    title: "+400 Pacientes Atendidos",
    description: "Atendendo adultos e adolescentes",
  },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // a foto menor anda no sentido contrário: sensação de profundidade
  const insetY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const insetRotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, -4]);

  return (
    <section id="about" className="relative bg-mist py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* fotos */}
        <div ref={ref} className="relative lg:sticky lg:top-28">
          <Reveal y={40}>
            <ParallaxImage
              src={aboutImage}
              alt="Psicóloga Laura Porto"
              strength={8}
              className="aspect-[4/5] w-[88%] rounded-[2rem] shadow-lifted sm:w-[80%] lg:w-[86%]"
              imgClassName="object-[50%_18%]"
            />
          </Reveal>
          <motion.div
            style={{ y: insetY, rotate: insetRotate }}
            className="absolute -bottom-6 right-0 w-[46%] overflow-hidden rounded-2xl border-[5px] border-mist shadow-lifted sm:w-[40%]"
          >
            <img
              src={deskImage}
              alt="Laura Porto estudando manuais clínicos (DSM-5-TR e CID)"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover object-[50%_35%]"
            />
          </motion.div>
        </div>

        {/* texto */}
        <div className="pt-4 lg:pt-10">
          <Kicker className="mb-5">Quem vai te ouvir</Kicker>
          <SectionTitle text="A pessoa por trás do cuidado." accent={["cuidado"]} />
          <Reveal delay={0.15}>
            <p className="mt-6 text-[16px] leading-relaxed text-ink-700 sm:text-lg">
              Sou Psicóloga Clínica, formada pelo UniCEUB e pós-graduada em Análise do
              Comportamento (IBAC) e Neuropsicologia (IPOG). Realizo atendimentos psicológicos
              online voltados para adultos e adolescentes, com a proposta de oferecer um ambiente
              acolhedor, seguro e empático, onde você possa lidar com questões emocionais,
              aprofundar o autoconhecimento e cuidar da sua saúde mental.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-600 sm:text-lg">
              Durante as sessões, busco aliar uma escuta atenta, sensibilidade nas relações e
              embasamento técnico, colaborando com cada pessoa na construção de caminhos alinhados
              aos seus valores e à vida que deseja levar. Vejo a psicoterapia como uma ferramenta
              poderosa de transformação — não apenas para aliviar o sofrimento, mas também para
              ampliar possibilidades e desenvolver recursos diante dos desafios cotidianos.
            </p>
          </Reveal>

          <ul className="mt-9 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {credentials.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 0.06} y={14} className="flex items-center gap-4 py-4">
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-white text-brand shadow-soft">
                  <c.icon size={20} />
                </span>
                <div>
                  <h3 className="font-semibold text-ink-900">{c.title}</h3>
                  <p className="text-sm text-ink-600">{c.description}</p>
                </div>
              </Reveal>
            ))}
            <Reveal as="li" y={14}>
              <a
                href="https://www.instagram.com/laurapbaiao"
                target="_blank"
                rel="noopener"
                className="group flex items-center gap-4 py-4"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-pink-500 to-orange-400 text-white shadow-soft">
                  <Instagram size={20} />
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900">@laurapbaiao</h3>
                  <p className="text-sm text-ink-600">Siga-me no Instagram</p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="text-ink-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                />
              </a>
            </Reveal>
          </ul>

          <Reveal className="mt-9">
            <WhatsButton location="about_cta" label="Agendar com a Laura" className="w-full sm:w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
