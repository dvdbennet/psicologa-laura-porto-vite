import Hero from "./Hero";

const HeroBrasilia = () => (
  <Hero
    chip="CRP 01/28432 · Sudoeste, Brasília, DF"
    title="Psicóloga em Brasília"
    accent={["Brasília"]}
    lead="Presencial no Sudoeste ou online. Você não precisa esperar piorar para buscar ajuda."
    leadMore="Ansiedade, cansaço, luto ou conflitos: escuta acolhedora, sigilo e abordagem baseada em evidências."
    location="hero_brasilia"
    badge="Consultório no Sudoeste"
    trust={[
      { big: "400+", small: "pacientes atendidos" },
      { big: "Sudoeste", small: "atendimento presencial" },
      { big: "Online", small: "todo o Brasil" },
    ]}
    photoOffset={460}
  />
);

export default HeroBrasilia;
