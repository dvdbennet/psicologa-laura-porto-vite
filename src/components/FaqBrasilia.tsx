import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Kicker from "./ui/Kicker";

export default function FaqBrasilia() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <Kicker className="justify-center mb-4">Perguntas frequentes</Kicker>
          <h2 className="font-display text-4xl md:text-5xl text-ink-900 text-balance">
            Dúvidas sobre terapia em{" "}
            <span className="text-emerald-700">Brasília</span>
          </h2>
        </div>

        <div className="space-y-3">
          <FaqItem index={1} question="Onde fica o consultório em Brasília?">
            <p>
              No Sudoeste, em Brasília - DF. Quando você agendar pelo
              WhatsApp, envio todas as informações para chegar ao
              consultório.
            </p>
          </FaqItem>
          <FaqItem index={2} question="Você também atende online?">
            <p>
              Sim. Além do atendimento presencial no Sudoeste, faço sessões
              online por vídeo para pacientes de todo o Distrito Federal, de
              outros estados e também para brasileiros que moram no
              exterior.
            </p>
            <p>
              A psicoterapia online é regulamentada pelo Conselho Federal de
              Psicologia (Resolução CFP nº 11/2018).
            </p>
          </FaqItem>
          <FaqItem
            index={3}
            question="A terapia online funciona tão bem quanto a presencial?"
          >
            <p>
              Para a maior parte das demandas, sim. A escuta, o método e o
              sigilo são os mesmos — o que muda é só o lugar onde você está.
            </p>
            <p>
              Muitas pessoas escolhem o online pela praticidade de não
              enfrentar trânsito. Outras preferem o consultório. Na primeira
              conversa, avaliamos juntos o que faz mais sentido para você.
            </p>
          </FaqItem>
          <FaqItem index={4} question="Quais são os horários de atendimento?">
            <p>
              De segunda a sexta, das 8h às 20h, e aos sábados, das 10h às
              16h, tanto no presencial quanto no online.
            </p>
          </FaqItem>
          <FaqItem index={5} question="Você aceita convênios?">
            <p>
              O atendimento é particular. Posso emitir nota fiscal para que
              você solicite reembolso ao seu plano de saúde, caso ele ofereça
              essa possibilidade.
            </p>
          </FaqItem>
          <FaqItem index={6} question="Você atende adolescentes?">
            <p>
              Sim. Atendo adultos e adolescentes, presencialmente no
              Sudoeste ou online, sempre com a participação da família
              quando for importante para o processo.
            </p>
          </FaqItem>
          <FaqItem index={7} question="Como agendar a primeira sessão?">
            <p>
              É só clicar em qualquer botão de agendamento desta página e me
              mandar uma mensagem no WhatsApp. Respondo com os horários
              disponíveis e tiro suas dúvidas antes de começarmos.
            </p>
          </FaqItem>
          <FaqItem index={8} question="A terapia é confidencial?">
            <p>
              Sim. O sigilo profissional é garantido pelo Código de Ética
              Profissional do Psicólogo e vale da mesma forma para sessões
              presenciais e online.
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
