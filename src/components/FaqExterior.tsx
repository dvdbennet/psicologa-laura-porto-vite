import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Kicker from "./ui/Kicker";

export default function FaqExterior() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <Kicker className="justify-center mb-4">Dúvidas</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 text-balance">
            Perguntas <span className="text-emerald-700">Frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          <FaqItem
            index={1}
            question="Moro em outro país. Ainda assim posso fazer terapia com você?"
          >
            <p>
              Sim. O atendimento psicológico online é regulamentado pelo
              Conselho Federal de Psicologia (Resolução CFP nº 011/2018) e
              pode ser realizado por vídeo de qualquer lugar do mundo.
            </p>
            <p>
              Você só precisa de uma conexão estável com a internet e um
              espaço com privacidade no horário da sessão.
            </p>
          </FaqItem>
          <FaqItem index={2} question="Como funciona com a diferença de fuso horário?">
            <p>
              Combinamos um horário que faça sentido dentro da sua rotina no
              país onde você mora. Tenho disponibilidade em diferentes
              janelas do dia justamente para me adaptar a pacientes em
              fusos diferentes do Brasil.
            </p>
          </FaqItem>
          <FaqItem
            index={3}
            question="Preciso de algum aplicativo específico para a sessão?"
          >
            <p>
              As sessões acontecem por uma plataforma de videochamada segura,
              alinhada com você no momento do agendamento. Basta um
              computador ou celular com câmera e microfone.
            </p>
          </FaqItem>
          <FaqItem
            index={4}
            question="Como funciona o pagamento estando fora do Brasil?"
          >
            <p>
              Conversamos sobre a forma mais prática para a sua situação no
              momento do agendamento, considerando o país onde você está.
            </p>
          </FaqItem>
          <FaqItem index={5} question="A terapia à distância é confidencial?">
            <p>
              Sim. O sigilo profissional é garantido pelo Código de Ética
              Profissional do Psicólogo independentemente de onde o
              atendimento acontece — os mesmos princípios de
              confidencialidade valem para sessões presenciais e online.
            </p>
          </FaqItem>
          <FaqItem
            index={6}
            question="Você já atendeu outros brasileiros que moram fora?"
          >
            <p>
              Sim, atendo brasileiros no exterior lidando com adaptação
              cultural, saudade, ansiedade e outras questões emocionais
              ligadas à experiência de morar fora do país.
            </p>
          </FaqItem>
          <FaqItem
            index={7}
            question="Você atende apenas questões ligadas à vida no exterior?"
          >
            <p>
              Não. Morar fora é um dos contextos que acolho com atenção
              especial, mas o atendimento vai muito além dele.
            </p>
            <p>
              Também acompanho demandas do dia a dia, como ansiedade, luto,
              conflitos nos relacionamentos, autoestima, esgotamento e
              momentos de transição — estejam ou não relacionadas à mudança
              de país. O que importa é o que você está vivendo agora.
            </p>
          </FaqItem>
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  index,
  question,
  children,
}: {
  index: number;
  question: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-colors ${
        isOpen
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-ink-100 bg-white"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4">
          <span className="font-display text-emerald-300 text-lg leading-none pt-0.5">
            {String(index).padStart(2, "0")}
          </span>
          <h3 className="text-base md:text-lg font-semibold text-ink-900">
            {question}
          </h3>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700"
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-[3.25rem] space-y-3 text-ink-600 text-sm leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
