import { useWhatsApp } from "@/context/WhatsAppProvider";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import IconeWhats from "./IconeWhats";

const links = [
  { href: "#services", label: "Serviços" },
  { href: "#about", label: "Sobre" },
  { href: "#benefits", label: "Benefícios" },
  { href: "#approach", label: "Abordagem" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#faq", label: "Dúvidas" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const whatsapp = useWhatsApp();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setScrolled(doc.scrollTop > 12);
      setProgress(max > 0 ? doc.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`sticky top-0 w-full z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-soft"
          : "bg-white/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 flex items-center justify-center font-display text-white text-lg shadow-glow transition-transform duration-300 group-hover:-rotate-6">
              LP
            </div>
            <div>
              <div className="text-ink-900 font-display text-lg leading-tight">
                Laura Porto
              </div>
              <div className="text-ink-400 text-[11px] tracking-wide uppercase">
                CRP 01/28432
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-9">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-medium text-ink-700 hover:text-emerald-700 transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-emerald-600 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <motion.a
              target="_blank"
              href={whatsapp}
              onClick={() => {
                if (typeof window !== "undefined" && window.dataLayer) {
                  window.dataLayer.push({
                    event: "whatsapp_click",
                    click_location: "navbar_desktop",
                  });
                }
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 bg-ink-900 text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-semibold hover:bg-emerald-700 transition-colors"
            >
              Agendar
              <IconeWhats width={16} />
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-ink-800 p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-ink-100"
            >
              <div className="flex flex-col py-5 gap-1">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-ink-700 hover:text-emerald-700 hover:bg-emerald-50 transition-colors py-3 px-2 rounded-lg text-base"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  target="_blank"
                  href={whatsapp}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.dataLayer) {
                      window.dataLayer.push({
                        event: "whatsapp_click",
                        click_location: "navbar_mobile",
                      });
                    }
                  }}
                  className="mt-3 inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-emerald-700 transition-colors"
                >
                  <IconeWhats width={20} />
                  Agende sua Consulta
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        className="h-[2px] bg-emerald-500 transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </motion.nav>
  );
};

export default Navbar;
