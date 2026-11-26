/**
 * Primitivas de motion compartilhadas pelas seções.
 * Regra: tudo funciona sem hover (celular) e respeita prefers-reduced-motion.
 */
import { cn } from "@/config";
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
import { useRef, type ReactNode } from "react";
import IconeWhats from "../IconeWhats";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Sobe e aparece quando entra na tela. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/**
 * Título de seção: cada palavra sobe de dentro de uma máscara ao entrar na tela.
 * `accent` = palavras destacadas na cor da marca.
 */
export function SectionTitle({
  text,
  accent = [],
  className,
  light = false,
  as: Tag = "h2",
}: {
  text: string;
  accent?: string[];
  className?: string;
  light?: boolean;
  as?: "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <Tag
      className={cn(
        "font-display text-[2.1rem] leading-[1.06] tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.6rem]",
        light ? "text-white" : "text-ink-900",
        className,
      )}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-clip pb-[0.12em] -mb-[0.12em] align-top">
          <motion.span
            className={cn(
              "inline-block",
              accent.includes(w.replace(/[.,!?]/g, "")) && (light ? "text-mint-300" : "text-brand"),
            )}
            initial={{ y: reduce ? 0 : "110%", opacity: reduce ? 0 : 1 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.85, delay: i * 0.045, ease: EASE }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Imagem com parallax interno: a foto se move dentro da moldura ao rolar. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  srcSet,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
  srcSet?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : `-${strength}%`, reduce ? "0%" : `${strength}%`]);
  return (
    <div ref={ref} className={cn("relative overflow-clip", className)}>
      <motion.img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y, scale: 1 + (strength * 2.4) / 100 }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </div>
  );
}

/**
 * Cartão com inclinação 3D e reflexo de luz seguindo o mouse.
 * No toque, só "afunda" levemente — nada depende de hover.
 */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });
  const glareX = useTransform(px, (v) => `${v * 100}%`);
  const glareY = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionValue(0);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        glare.set(1);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
        glare.set(0);
      }}
      whileTap={{ scale: 0.985 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={cn("group relative will-change-transform", className)}
    >
      {children}
      <motion.div
        aria-hidden
        style={{
          opacity: useSpring(glare, { stiffness: 120, damping: 20 }),
          background: useTransform(
            [glareX, glareY] as never,
            ([x, y]: string[]) =>
              `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.55), transparent 45%)`,
          ),
        }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
      />
    </motion.div>
  );
}

/** Botão de WhatsApp padrão (com rastreamento) — variantes clara/escura. */
export function WhatsButton({
  location,
  label = "Agendar no WhatsApp",
  variant = "brand",
  className,
  size = "lg",
}: {
  location: string;
  label?: string;
  variant?: "brand" | "light" | "dark";
  className?: string;
  size?: "md" | "lg";
}) {
  const href = useWhatsApp();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 18 });
  const y = useSpring(0, { stiffness: 220, damping: 18 });
  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener"
      onClick={() => trackWhatsApp(location)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.22);
        y.set((e.clientY - r.top - r.height / 2) * 0.32);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-semibold transition-colors",
        size === "lg" ? "h-[58px] px-8 text-[1.05rem] lg:h-16 lg:text-lg" : "h-12 px-6 text-[15px]",
        variant === "brand" &&
          "bg-brand text-white shadow-[0_18px_36px_-14px_rgba(14,138,106,0.75)] hover:bg-brand-dark",
        variant === "light" && "bg-white text-ink-900 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)]",
        variant === "dark" && "bg-ink-900 text-white hover:bg-ink-800",
        className,
      )}
    >
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[420%]" />
      <span className={cn("relative", size === "lg" ? "h-[22px] w-[22px]" : "h-5 w-5")}>
        <IconeWhats />
      </span>
      <span className="relative">{label}</span>
    </motion.a>
  );
}
