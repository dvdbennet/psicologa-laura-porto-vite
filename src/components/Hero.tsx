import { useWhatsApp } from "@/context/WhatsAppProvider";
import { trackWhatsApp } from "@/lib/track";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import hero1200 from "../assets/images/laura-hero-1200.webp";
import hero1800 from "../assets/images/laura-hero-1800.webp";
import hero720 from "../assets/images/laura-hero-720.webp";
import BlobCanvas from "./hero/BlobCanvas";
import IconeWhats from "./IconeWhats";

const EASE = [0.16, 1, 0.3, 1] as const;

export type TrustItem = { big: string; small: string };

const homeTrust: TrustItem[] = [
  { big: "400+", small: "pacientes atendidos" },
  { big: "Adultos", small: "e adolescentes" },
  { big: "Online", small: "todo o Brasil" },
];

/** Título revelado palavra por palavra, cada uma subindo de dentro de uma máscara. */
function RevealTitle({ text, accent }: { text: string; accent: string[] }) {
  const words = text.split(" ");
  return (
    <h1 className="font-display text-ink-900 text-[2.15rem] leading-[1.06] min-[400px]:text-[2.4rem] sm:text-6xl lg:text-[clamp(3rem,9.2svh,4.4rem)] lg:leading-[1.02] tracking-[-0.015em] text-balance">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-clip pb-[0.1em] -mb-[0.1em] align-top">
          <motion.span
            className={`inline-block ${accent.includes(w.replace(/[.,!?]/g, "")) ? "text-brand" : ""}`}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.055, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Botão do WhatsApp com efeito magnético no desktop (no toque ele só "afunda"). */
function MagneticCta({ href, label, location }: { href: string; label: string; location: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });

  return (
    <motion.a
      id="hero-cta"
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsApp(location)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.35);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className="group relative flex h-[58px] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-brand px-8 text-[1.05rem] font-semibold text-white shadow-[0_18px_36px_-14px_rgba(14,138,106,0.75)] sm:w-auto lg:h-16 lg:text-lg"
    >
      {/* brilho que atravessa o botão no hover */}
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
      <span className="relative h-[22px] w-[22px]">
        <IconeWhats />
      </span>
      <span className="relative">{label}</span>
    </motion.a>
  );
}

export type HeroProps = {
  chip?: string;
  title?: string;
  accent?: string[];
  lead?: string;
  leadMore?: string;
  ctaLabel?: string;
  location?: string;
  badge?: string;
  trust?: TrustItem[];
  /** px descontados da altura da tela para a foto no celular (títulos longos pedem mais) */
  photoOffset?: number;
};

const Hero = ({
  chip = "CRP 01/28432 · Psicóloga Clínica",
  title = "Cansou de fingir que está tudo bem?",
  accent = ["bem"],
  lead = "Psicoterapia online para entender o que está pesando e voltar a respirar.",
  leadMore = "Ansiedade, tristeza, esgotamento ou conflitos: com escuta atenta, método científico e sigilo.",
  ctaLabel = "Agendar minha sessão",
  location = "hero",
  badge = "Respire. Você chegou.",
  trust = homeTrust,
  photoOffset = 440,
}: HeroProps) => {
  const whatsapp = useWhatsApp();
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // inclinação 3D do arco seguindo o mouse (desktop)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-7, 7]), { stiffness: 120, damping: 20 });
  const rotX = useSpring(useTransform(my, [-1, 1], [6, -6]), { stiffness: 120, damping: 20 });

  // parallax ao rolar: foto desce mais devagar e aproxima levemente
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-10%"]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mx.set((e.clientX / window.innerWidth) * 2 - 1);
        my.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
      className="relative overflow-x-clip bg-mist"
    >
      {/* luz ambiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_60%_at_50%_20%,rgba(127,224,194,0.28),transparent_70%)] lg:bg-[radial-gradient(45%_70%_at_75%_40%,rgba(127,224,194,0.3),transparent_70%)]"
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-x-12 px-5 pb-10 pt-3 sm:px-8 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.05fr_1fr] lg:py-10">
        {/* ---------- FOTO + FORMA 3D ---------- */}
        <div
          className="relative order-1 mx-auto w-full max-w-[420px] lg:order-2 lg:max-w-none"
          style={{ perspective: 1200 }}
        >
          <BlobCanvas className="absolute left-1/2 top-[48%] h-[135%] w-[150%] -translate-x-1/2 -translate-y-1/2 lg:h-[125%] lg:w-[135%]" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d", ["--hero-off" as string]: `${photoOffset}px` }}
            className="relative mx-auto aspect-[3/4] h-[clamp(200px,calc(100svh_-_var(--hero-off)),460px)] max-w-[82%] lg:h-[min(76svh,660px)] lg:max-w-[88%]"
          >
            <div className="absolute inset-0 overflow-clip rounded-t-[999px] rounded-b-[28px] bg-mint-100 shadow-[0_40px_80px_-30px_rgba(15,42,34,0.45)] [mask-image:linear-gradient(#000_78%,transparent)] lg:[mask-image:none]">
              <motion.img
                src={hero1200}
                srcSet={`${hero720} 720w, ${hero1200} 1200w, ${hero1800} 1800w`}
                sizes="(min-width: 1024px) 500px, 82vw"
                alt="Psicóloga Laura Porto sorrindo em seu consultório"
                width={1200}
                height={1600}
                loading="eager"
                // @ts-expect-error -- fetchpriority ainda não está nos tipos do React 18
                fetchpriority="high"
                style={{ y: photoY, scale: photoScale }}
                className="h-full w-full object-cover object-[50%_16%]"
              />
            </div>

            {/* selo flutuante que "respira" junto com a forma (camada à frente no 3D) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, ease: EASE }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute -right-6 bottom-[9%] flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/70 bg-white/80 py-2 pl-2 pr-4 text-[12.5px] font-medium text-ink-800 shadow-soft backdrop-blur-md lg:-right-10 lg:bottom-[22%] lg:text-sm"
            >
              <span className="relative grid h-6 w-6 place-items-center">
                <span className="absolute inset-0 rounded-full bg-mint-300/60 animate-breathe" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-brand" />
              </span>
              {badge}
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- TEXTO + CTA ---------- */}
        <motion.div style={{ y: copyY }} className="relative order-2 -mt-3 lg:order-1 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-3 inline-flex items-center gap-2 text-[13px] font-medium text-ink-600 lg:mb-[min(1.5rem,2.5svh)] lg:rounded-full lg:border lg:border-mint-100 lg:bg-white/70 lg:px-4 lg:py-1.5 lg:text-sm lg:shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {chip}
          </motion.div>

          <RevealTitle text={title} accent={accent} />

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
            className="mt-3 max-w-xl text-[15.5px] leading-relaxed text-ink-600 sm:text-lg lg:mt-[min(1.5rem,2.5svh)]"
          >
            {lead}
            {leadMore && <span className="hidden sm:inline"> {leadMore}</span>}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
            className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-[min(2.25rem,4svh)]"
          >
            <MagneticCta href={whatsapp} label={ctaLabel} location={location} />
            <a
              href="#testimonials"
              className="hidden items-center justify-center gap-2 px-3 py-3 font-medium text-ink-700 transition-colors hover:text-brand sm:inline-flex"
            >
              Ver depoimentos
              <ArrowDown size={16} />
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.95, duration: 0.8 }}
            className="mt-4 grid grid-cols-3 gap-2 lg:mt-[min(3rem,5svh)] lg:max-w-lg lg:border-t lg:border-ink-900/10 lg:pt-6"
          >
            {trust.map((t) => (
              <div key={t.big} className="text-center lg:text-left">
                <dt className="text-[15px] font-semibold text-ink-900 lg:font-display lg:text-2xl lg:font-normal">
                  {t.big}
                </dt>
                <dd className="text-[11.5px] leading-tight text-ink-600 lg:text-sm">{t.small}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
