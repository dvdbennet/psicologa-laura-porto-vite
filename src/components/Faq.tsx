import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import Kicker from "./ui/Kicker";

export default function Faq() {
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
          <FaqItem index={1} question="Como posso marcar uma consulta?">
            <p>
              Você pode agendar uma consulta diretamente através do nosso
              site, clicando no botão de AGENDAR.
            </p>
            <p>
              Também vai encontrar todas as minhas redes na seção de contato,
              no rodapé da página.
            </p>
            <p>
              Estarei à disposição para ajudar no processo de agendamento e
              esclarecer qualquer dúvida.
            </p>
          </FaqItem>
          <FaqItem index={2} question="Você aceita convênios?">
            <p>
              No momento, não aceitamos convênios para o pagamento das
              consultas. O atendimento é realizado de forma particular.
            </p>
            <p>
              Se você tiver dúvidas sobre formas de pagamento ou valores,
              fique à vontade para entrar em contato para mais informações.
            </p>
          </FaqItem>
          <FaqItem
            index={3}
            question="O que acontece se eu precisar de uma nota fiscal para reembolso do convênio?"
          >
            <p>
              Embora não aceitemos convênios diretamente, podemos emitir uma
              nota fiscal para que você possa tentar o reembolso junto ao seu
              convênio, caso ele permita esse tipo de procedimento.
              Recomendamos que consulte com o seu convênio sobre as
              possibilidades de reembolso para consultas psicológicas.
            </p>
          </FaqItem>
          <FaqItem
            index={4}
            question="Com que frequência as sessões de terapia são realizadas?"
          >
            <p>
              As sessões de terapia acontecem uma vez por semana, com duração
              de cerca de 50 minutos.
            </p>
          </FaqItem>
          <FaqItem index={5} question="A terapia é confidencial?">
            <p>
              Sim, a terapia é confidencial. A Lei do Sigilo na Psicologia é
              um princípio fundamental que assegura a confidencialidade das
              informações compartilhadas pelo paciente durante o atendimento
              psicológico. No Brasil, o Código de Ética Profissional do
              Psicólogo (Resolução CFP nº 010/2005) estabelece que o
              psicólogo deve manter o sigilo sobre tudo o que for tratado nas
              sessões, exceto em situações específicas previstas por lei,
              como:
            </p>
            <p>
              1. Risco iminente de morte ou de danos graves ao paciente ou a
              terceiros
            </p>
            <p>
              2. Casos em que o paciente autorize expressamente a quebra de
              sigilo.
            </p>
            <p>
              3. Exigência legal ou judicial, como no caso de investigação
              criminal.
            </p>
            <p>
              Esse sigilo é crucial para criar um ambiente de confiança,
              permitindo que o paciente se sinta seguro para compartilhar
              suas emoções, pensamentos e experiências pessoais. Ao garantir
              a confidencialidade, o psicólogo proporciona um espaço livre de
              julgamentos, essencial para que o processo terapêutico seja
              eficaz e ético.
            </p>
            <p>
              Portanto, o sigilo profissional não é apenas uma obrigação
              legal, mas uma parte essencial do respeito e cuidado oferecidos
              na prática psicológica.
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
