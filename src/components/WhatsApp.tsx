import { useWhatsApp } from "@/context/WhatsAppProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import IconeWhats from "./IconeWhats";

// Botão flutuante só aparece depois que a pessoa rolou ~60% da primeira tela.
// Antes disso ele competia com o botão principal do Hero e levava toque acidental
// no celular (cada toque contava como conversão no Google Ads).
const SHOW_AFTER_VIEWPORT_RATIO = 0.6;

export default function WhatsApp() {
  const whatsapp = useWhatsApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER_VIEWPORT_RATIO);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="whatsapp-floating"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          href={whatsapp}
          target="_blank"
          onClick={() => {
            if (typeof window !== "undefined" && window.dataLayer) {
              window.dataLayer.push({
                event: "whatsapp_click",
                click_location: "floating",
              });
            }
          }}
          className="fixed bottom-5 right-5 lg:bottom-8 lg:right-8 block z-[1000]"
          aria-label="Conversar no WhatsApp"
        >
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 p-2.5 lg:p-3 shadow-lifted rounded-full text-white bg-green-500">
            <IconeWhats />
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
