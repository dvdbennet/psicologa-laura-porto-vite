import { FaqItem, FaqLayout } from "./ui/FaqLayout";

export default function FaqBrasilia() {
  return (
    <FaqLayout title="Dúvidas sobre terapia em Brasília" accent={["Brasília"]}>
          <FaqItem question="Onde fica o consultório em Brasília?">
            <p>
              No Sudoeste, em Brasília - DF. Quando você agendar pelo
              WhatsApp, envio todas as informações para chegar ao
              consultório.
            </p>
          </FaqItem>
          <FaqItem question="Você também atende online?">
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
          <FaqItem question="A terapia online funciona tão bem quanto a presencial?"
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
          <FaqItem question="Quais são os horários de atendimento?">
            <p>
              De segunda a sexta, das 8h às 20h, e aos sábados, das 10h às
              16h, tanto no presencial quanto no online.
            </p>
          </FaqItem>
          <FaqItem question="Você aceita convênios?">
            <p>
              O atendimento é particular. Posso emitir nota fiscal para que
              você solicite reembolso ao seu plano de saúde, caso ele ofereça
              essa possibilidade.
            </p>
          </FaqItem>
          <FaqItem question="Você atende adolescentes?">
            <p>
              Sim. Atendo adultos e adolescentes, presencialmente no
              Sudoeste ou online, sempre com a participação da família
              quando for importante para o processo.
            </p>
          </FaqItem>
          <FaqItem question="Como agendar a primeira sessão?">
            <p>
              É só clicar em qualquer botão de agendamento desta página e me
              mandar uma mensagem no WhatsApp. Respondo com os horários
              disponíveis e tiro suas dúvidas antes de começarmos.
            </p>
          </FaqItem>
          <FaqItem question="A terapia é confidencial?">
            <p>
              Sim. O sigilo profissional é garantido pelo Código de Ética
              Profissional do Psicólogo e vale da mesma forma para sessões
              presenciais e online.
            </p>
          </FaqItem>
    </FaqLayout>
  );
}
