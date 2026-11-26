import benefitsImage from "../assets/images/benefits-exterior.jpg";
import Benefits from "./Benefits";

const points = [
  "Atendimento 100% em português, sem esforço de tradução emocional.",
  "Psicóloga brasileira que entende a cultura, o humor e as referências que você cresceu com.",
  "Sessões por vídeo com horários flexíveis para se ajustar ao seu fuso.",
  "Abordagem baseada em evidências (Análise do Comportamento), com metas claras.",
  "Sigilo profissional e ética, seguindo o Código de Ética do Psicólogo em qualquer país onde você esteja.",
];

const BenefitsExterior = () => (
  <Benefits
    kicker="Por que eu"
    title="Terapia que fala a sua língua — literalmente"
    accent={["sua", "língua"]}
    question="E se a terapia fosse o único lugar onde você não precisa traduzir nada?"
    intro="Você já faz esforço demais se adaptando a um novo país. Na terapia, você merece ser entendido de primeira, sem tradução e sem precisar explicar de onde vem."
    listIntro="O processo terapêutico ajuda a compreender o que você sente, fortalecer recursos emocionais e construir uma rotina mais leve — mesmo a milhares de quilômetros de casa."
    items={points}
    image={benefitsImage}
    imageAlt="Dra. Laura Porto"
    ctaLabel="Agendar minha sessão online"
    location="benefits_exterior_cta"
  />
);

export default BenefitsExterior;
