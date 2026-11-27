import Hero from "./Hero";

const HeroAdolescente = () => (
  <Hero
    chip="CRP 01/28432 · Terapia para adolescentes"
    title="Seu filho anda diferente e você não sabe como ajudar?"
    accent={["diferente"]}
    lead="Um espaço seguro e com sigilo para o adolescente falar do que é difícil dizer em casa."
    leadMore="Psicoterapia online e presencial em Brasília, com orientação aos responsáveis quando fizer sentido."
    ctaLabel="Agendar uma conversa"
    location="hero_adolescente"
    badge="Um espaço seguro para falar"
    trust={[
      { big: "400+", small: "pacientes atendidos" },
      { big: "Sigilo", small: "ético e profissional" },
      { big: "Online", small: "e presencial no DF" },
    ]}
    photoOffset={540}
  />
);

export default HeroAdolescente;
