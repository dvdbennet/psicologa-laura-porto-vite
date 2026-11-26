import {
  Brain,
  Briefcase,
  Clock,
  GitBranch,
  HeartCrack,
  HeartHandshake,
  Repeat,
  Shield,
  Target,
  Timer,
  User,
  UserCheck,
  UserMinus,
} from "lucide-react";
import { ServicesIndex, type Service } from "./Services";

const services: Service[] = [
  {
    icon: Brain,
    title: "Depressão",
    description:
      "Passar horas fechado no quarto, perder o interesse por amigos e atividades, irritação ou tristeza que não vai embora. Nem sempre é “só uma fase”. Na terapia, o adolescente encontra um espaço seguro para entender o que sente e construir recursos para retomar a rotina.",
    features: [
      "Compreensão do sofrimento emocional",
      "Desenvolvimento de novos recursos internos",
      "Fortalecimento do bem-estar e da qualidade de vida",
    ],
  },
  {
    icon: Clock,
    title: "Ansiedade",
    description:
      "Medo de provas, de apresentar trabalhos, de não ser aceito. Dor de barriga antes da escola, insônia, pensamentos acelerados. Na terapia, o adolescente aprende a reconhecer os gatilhos e a lidar com a ansiedade de forma mais equilibrada.",
    features: [
      "Identificação de gatilhos e padrões de ansiedade",
      "Estratégias para lidar com pensamentos acelerados",
      "Desenvolvimento de maior equilíbrio emocional",
    ],
  },
  {
    icon: User,
    title: "Desafios e Momentos Difíceis",
    description:
      "Mudança de escola, separação dos pais, perdas, o fim de um namoro. Na adolescência, tudo é sentido com mais intensidade. A terapia oferece apoio para atravessar essas fases sem que ele se sinta sozinho.",
    features: [
      "Apoio em momentos de transição ou crise",
      "Desenvolvimento de habilidades emocionais",
      "Fortalecimento do autoconhecimento",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Dificuldades nos Relacionamentos",
    description:
      "Conflitos com os pais, brigas com amigos, exclusão no grupo, dificuldade de se expressar. A terapia ajuda o adolescente a entender seus padrões de relação e a se comunicar de forma mais clara e segura.",
    features: [
      "Melhora na comunicação interpessoal",
      "Desenvolvimento de limites saudáveis",
      "Relações mais equilibradas e conscientes",
    ],
  },
  {
    icon: Briefcase,
    title: "Burnout e Sobrecarga no Contexto Acadêmico",
    description:
      "Vestibular, cobrança por notas, cursos extras e pouco tempo para descansar. Quando o desempenho vira a única medida de valor, o esgotamento aparece. A terapia ajuda a reconhecer esses sinais e a construir uma rotina de estudos mais saudável.",
    features: [
      "Reconhecimento e prevenção do burnout",
      "Desenvolvimento de limites saudáveis",
      "Estratégias para equilíbrio entre vida pessoal e profissional",
    ],
  },
  {
    icon: UserCheck,
    title: "Insegurança e Baixa Autoestima",
    description:
      "Comparação nas redes sociais, insegurança com o corpo, medo de errar na frente dos outros. Na terapia, o adolescente constrói uma visão mais justa de si mesmo e fortalece a confiança para se posicionar.",
    features: [
      "Fortalecimento da autoestima",
      "Compreensão de padrões de autocrítica",
      "Desenvolvimento de maior segurança emocional",
    ],
  },
  {
    icon: Repeat,
    title: "Comportamentos Compulsivos e Vícios",
    description:
      "Horas no celular, jogos que tomam o lugar do sono e dos estudos, os primeiros contatos com álcool. Na terapia, o adolescente entende o que esse comportamento está aliviando e desenvolve formas mais saudáveis de lidar com os impulsos.",
    features: [
      "Compreensão dos gatilhos emocionais",
      "Desenvolvimento de estratégias de autocontrole",
      "Construção de hábitos mais saudáveis",
    ],
  },
  {
    icon: GitBranch,
    title: "Dificuldade em Tomar Decisões",
    description:
      "Escolher curso, profissão, caminho: tudo parece definitivo e assustador. A terapia ajuda o adolescente a entender seus próprios valores e interesses para decidir com mais clareza e menos medo.",
    features: [
      "Maior clareza sobre prioridades e valores",
      "Redução do medo de errar",
      "Desenvolvimento de autonomia nas escolhas",
    ],
  },
  {
    icon: Target,
    title: "Autocobrança e Perfeccionismo",
    description:
      "Chorar por uma nota abaixo do esperado, não se permitir errar, sentir que nunca é suficiente. Na terapia, o adolescente revê essa cobrança e aprende a lidar com as expectativas de forma mais equilibrada.",
    features: [
      "Compreensão dos padrões de autocobrança",
      "Desenvolvimento de autocompaixão",
      "Construção de metas mais realistas",
    ],
  },
  {
    icon: UserMinus,
    title: "Sentimentos de Solidão",
    description:
      "Estar no grupo e, ainda assim, sentir que ninguém entende. Muitos adolescentes guardam isso só para si. A terapia oferece um espaço para falar sem medo de julgamento e fortalecer vínculos verdadeiros.",
    features: [
      "Compreensão das necessidades emocionais",
      "Desenvolvimento de relações mais significativas",
      "Fortalecimento do senso de pertencimento",
    ],
  },
  {
    icon: HeartCrack,
    title: "Medo de Abandono e Rejeição",
    description:
      "Medo de ser excluído, de não ser escolhido, de perder amizades. Isso pode levar o adolescente a se anular para ser aceito. Na terapia, ele entende esses sentimentos e desenvolve formas mais seguras de se relacionar.",
    features: [
      "Identificação de padrões nos relacionamentos",
      "Fortalecimento da segurança emocional",
      "Construção de vínculos mais saudáveis",
    ],
  },
  {
    icon: Timer,
    title: "Procrastinação",
    description:
      "Deixar tudo para a última hora, travar diante das tarefas e depois se sentir culpado. Nem sempre é preguiça. A terapia ajuda a entender o que está por trás do adiamento e a criar estratégias práticas de organização e foco.",
    features: [
      "Identificação de padrões de adiamento",
      "Desenvolvimento de organização e foco",
      "Construção de hábitos mais produtivos",
    ],
  },
  {
    icon: Shield,
    title: "Dificuldade em Impor Limites",
    description:
      "Dificuldade em dizer não aos amigos e em resistir à pressão do grupo para ser aceito. Na terapia, o adolescente aprende a se posicionar com segurança e respeito por si mesmo.",
    features: [
      "Desenvolvimento de comunicação assertiva",
      "Fortalecimento da autonomia emocional",
      "Construção de relações mais saudáveis",
    ],
  },
  {
    icon: Brain,
    title: "Autoconhecimento e Cuidado com a Saúde Mental",
    description:
      "A adolescência é a fase de descobrir quem se é. A terapia é um espaço para fazer isso com apoio: entender as emoções, desenvolver inteligência emocional e crescer com mais segurança.",
    features: [
      "Ampliação do autoconhecimento",
      "Desenvolvimento de inteligência emocional",
      "Promoção de maior equilíbrio e bem-estar psicológico",
    ],
  },
];

const ServicesAdolescente = () => (
  <ServicesIndex
    items={services}
    kicker="Quando procurar ajuda"
    title="Sinais de que vale procurar ajuda"
    accent={["procurar", "ajuda"]}
    intro="Estas são as situações que mais trazem adolescentes à terapia. Se alguma delas descreve o que você vê em casa, vale conversar."
    ctaLabel="Quero conversar sobre isso"
    location="services_adolescente_cta"
  />
);

export default ServicesAdolescente;
