import { FaqItem, FaqLayout } from "./ui/FaqLayout";

export default function Faq() {
  return (
    <FaqLayout>
          <FaqItem question="Como posso marcar uma consulta?">
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
          <FaqItem question="Você aceita convênios?">
            <p>
              No momento, não aceitamos convênios para o pagamento das
              consultas. O atendimento é realizado de forma particular.
            </p>
            <p>
              Se você tiver dúvidas sobre formas de pagamento ou valores,
              fique à vontade para entrar em contato para mais informações.
            </p>
          </FaqItem>
          <FaqItem question="O que acontece se eu precisar de uma nota fiscal para reembolso do convênio?"
          >
            <p>
              Embora não aceitemos convênios diretamente, podemos emitir uma
              nota fiscal para que você possa tentar o reembolso junto ao seu
              convênio, caso ele permita esse tipo de procedimento.
              Recomendamos que consulte com o seu convênio sobre as
              possibilidades de reembolso para consultas psicológicas.
            </p>
          </FaqItem>
          <FaqItem question="Com que frequência as sessões de terapia são realizadas?"
          >
            <p>
              As sessões de terapia acontecem uma vez por semana, com duração
              de cerca de 50 minutos.
            </p>
          </FaqItem>
          <FaqItem question="A terapia é confidencial?">
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
    </FaqLayout>
  );
}
