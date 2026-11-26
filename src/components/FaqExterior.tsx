import { FaqItem, FaqLayout } from "./ui/FaqLayout";

export default function FaqExterior() {
  return (
    <FaqLayout title="Perguntas Frequentes" accent={["Frequentes"]}>
          <FaqItem question="Moro em outro país. Ainda assim posso fazer terapia com você?"
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
          <FaqItem question="Como funciona com a diferença de fuso horário?">
            <p>
              Combinamos um horário que faça sentido dentro da sua rotina no
              país onde você mora. Tenho disponibilidade em diferentes
              janelas do dia justamente para me adaptar a pacientes em
              fusos diferentes do Brasil.
            </p>
          </FaqItem>
          <FaqItem question="Preciso de algum aplicativo específico para a sessão?"
          >
            <p>
              As sessões acontecem por uma plataforma de videochamada segura,
              alinhada com você no momento do agendamento. Basta um
              computador ou celular com câmera e microfone.
            </p>
          </FaqItem>
          <FaqItem question="Como funciona o pagamento estando fora do Brasil?"
          >
            <p>
              Conversamos sobre a forma mais prática para a sua situação no
              momento do agendamento, considerando o país onde você está.
            </p>
          </FaqItem>
          <FaqItem question="A terapia à distância é confidencial?">
            <p>
              Sim. O sigilo profissional é garantido pelo Código de Ética
              Profissional do Psicólogo independentemente de onde o
              atendimento acontece — os mesmos princípios de
              confidencialidade valem para sessões presenciais e online.
            </p>
          </FaqItem>
          <FaqItem question="Você já atendeu outros brasileiros que moram fora?"
          >
            <p>
              Sim, atendo brasileiros no exterior lidando com adaptação
              cultural, saudade, ansiedade e outras questões emocionais
              ligadas à experiência de morar fora do país.
            </p>
          </FaqItem>
          <FaqItem question="Você atende apenas questões ligadas à vida no exterior?"
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
    </FaqLayout>
  );
}
