import Hero from "./Hero";

const HeroExterior = () => (
  <Hero
    chip="Psicoterapia online para brasileiros no exterior"
    title="Longe do Brasil, mas perto de quem te entende."
    accent={["perto", "de", "quem"]}
    lead="Psicoterapia online, em português, com uma psicóloga brasileira e no horário do seu fuso."
    leadMore="Saudade, solidão, cansaço de se adaptar: você não precisa dar conta de tudo isso sozinho, nem em outro idioma."
    location="hero_exterior"
    badge="Qualquer fuso horário"
    trust={[
      { big: "400+", small: "pacientes atendidos" },
      { big: "Seu fuso", small: "horários flexíveis" },
      { big: "100%", small: "em português" },
    ]}
    photoOffset={500}
  />
);

export default HeroExterior;
