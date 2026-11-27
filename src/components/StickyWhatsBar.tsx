import { useWhatsApp } from "@/context/WhatsAppProvider";
import { trackWhatsApp } from "@/lib/track";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import IconeWhats from "./IconeWhats";

/**
 * Barra fixa do WhatsApp no celular. Aparece só quando o botão do hero já saiu
 * da tela (rolando para baixo), então nunca há dois botões competindo na mesma
 * tela — o que antes gerava toque acidental contado como conversão.
 */
export default function StickyWhatsBar() {
  const whatsapp = useWhatsApp();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cta = document.getElementById("hero-cta");
    if (!cta) {
      const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const io = new IntersectionObserver(([e]) => {
      setShow(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(cta);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          exit={{ y: "110%" }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="safe-bottom fixed inset-x-0 bottom-0 z-[900] px-3 pt-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-md items-center gap-3 rounded-[22px] border border-white/60 bg-white/85 p-2 pl-4 shadow-[0_-8px_40px_-12px_rgba(15,42,34,0.35)] backdrop-blur-xl">
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-[13.5px] font-semibold text-ink-900">Laura Porto</div>
              <div className="truncate text-[12px] text-ink-600">Resposta pelo WhatsApp</div>
            </div>
            <motion.a
              whileTap={{ scale: 0.96 }}
              href={whatsapp}
              target="_blank"
              rel="noopener"
              onClick={() => trackWhatsApp("sticky_bar_mobile")}
              className="flex h-12 items-center gap-2 rounded-full bg-brand px-5 text-[15px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(14,138,106,0.8)]"
            >
              <span className="h-5 w-5">
                <IconeWhats />
              </span>
              Agendar
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
