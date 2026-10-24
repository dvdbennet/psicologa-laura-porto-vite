import { useWhatsApp } from "@/context/WhatsAppProvider";
import { motion } from "framer-motion";
import IconeWhats from "./IconeWhats";

export default function WhatsApp() {
  const whatsapp = useWhatsApp();
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 16 }}
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
      className="fixed bottom-8 right-8 block z-[1000]"
      aria-label="Agendar no WhatsApp"
    >
      <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />
      <div className="relative w-14 h-14 lg:w-16 lg:h-16 p-3 shadow-lifted rounded-full text-white bg-green-500">
        <IconeWhats />
      </div>
    </motion.a>
  );
}
