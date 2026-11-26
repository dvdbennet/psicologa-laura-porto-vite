import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, type ReactNode } from "react";
import Kicker from "./Kicker";
import { EASE, Reveal, SectionTitle, WhatsButton } from "./motion";

/**
 * Layout de FAQ compartilhado (Home, e depois /brasilia e /exterior):
 * título + cartão "ainda com dúvida?" fixo à esquerda no desktop, perguntas à direita.
 */
export function FaqLayout({
  title = "Perguntas Frequentes",
  accent = ["Frequentes"],
  ctaLocation = "faq_cta",
  children,
}: {
  title?: string;
  accent?: string[];
  ctaLocation?: string;
  children: ReactNode;
}) {
  return (
    <section id="faq" className="bg-white py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <div className="lg:sticky lg:top-28">
            <Kicker className="mb-5">Dúvidas</Kicker>
            <SectionTitle text={title} accent={accent} />
            <Reveal delay={0.2} className="mt-8 hidden rounded-[1.75rem] bg-mist p-7 lg:block">
              <p className="font-display text-xl text-ink-900">Ainda com alguma dúvida?</p>
              <p className="mt-2 text-ink-600">Me chame no WhatsApp e eu te respondo pessoalmente.</p>
              <WhatsButton location={ctaLocation} label="Perguntar no WhatsApp" size="md" className="mt-6" />
            </Reveal>
          </div>
        </div>
        <div>
          <div className="border-t border-ink-900/10">{children}</div>
          <Reveal className="mt-8 rounded-[1.5rem] bg-mist p-6 lg:hidden">
            <p className="font-display text-lg text-ink-900">Ainda com alguma dúvida?</p>
            <WhatsButton location={ctaLocation} label="Perguntar no WhatsApp" size="md" className="mt-4 w-full" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-ink-900/10">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="group flex w-full items-center justify-between gap-5 py-5 text-left lg:py-6"
      >
        <h3 className="text-[16.5px] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand sm:text-lg">
          {question}
        </h3>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#0E8A6A" : "#F4F8F6" }}
          transition={{ duration: 0.3 }}
          className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-full ${isOpen ? "text-white" : "text-ink-800"}`}
        >
          <Plus size={18} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pb-6 pr-12 text-[15px] leading-relaxed text-ink-600">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
