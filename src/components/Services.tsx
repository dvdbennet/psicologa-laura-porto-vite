import { motion } from 'framer-motion';
import { Brain, Calendar, Clock, MapPin, User, Video } from 'lucide-react';
import { whatsapp } from '../config';

const services = [
  {
    icon: Brain,
    title: 'Adultos',
    description: 'Atendo adultos que desejam entender melhor suas reações diante das situações do dia a dia, como lidar com emoções intensas, estresse e dificuldades nos relacionamentos. Buscamos juntos reconhecer e trabalhar padrões que precisam ser fortalecidos ou modificados de acordo com cada contexto.',
    features: ['Controle da ansiedade e estresse', 'Desenvolvimento da inteligência emocional', 'Momentos de mudança e crescimento pessoal']
  },
  {
    icon: User,
    title: 'Adolescentes',
    description: 'Um ambiente acolhedor para promover a compreensão de seus comportamentos em questões relacionadas à identidade, vínculos sociais e superação de desafios. Meu objetivo é ampliar habilidades que possibilitem decisões mais alinhadas com seus valores e necessidades.',
    features: ['Descoberta da identidade e fortalecimento da autoestima', 'Relações interpessoais e habilidades de comunicação', 'Pressões acadêmicas e organização para o futuro']
  },

];

const sessionTypes = [
  {
    icon: Video,
    title: 'Online',
    description: 'Formato conveninete do conforto da sua casa',
    features: ['Plataforma de víde segura', 'Flexibilidade', 'Sem trânsito'],
    popular: true
  },
  {
    icon: MapPin,
    title: 'Presencial',
    description: 'Formato tradicional cara a cara',
    features: ['Consultório confortável', 'Bem localizado', 'Conexão pessoal'],
    popular: false
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Serviços de{' '}
            <span className="text-emerald-600 font-medium">Psicoterapia</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Ofereço serviços terapêuticos para adultos e adolescentes, projetados para atender suas
            necessidades únicas e apoiar sua jornada em direção ao bem-estar mental.
          </p>
        </motion.div>

        {/* Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="text-emerald-600" size={32} />
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                {service.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Session Format Options */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-light text-slate-800 mb-4">
            Escolha seu {' '}
            <span className="text-emerald-600 font-medium">Formato Preferido</span>
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Eu ofereço sessões tanto online quanto presenciais, para que você possa escolher o formato que melhor se adapta à sua rotina e preferências.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {sessionTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all ${
                type.popular ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              {type.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6">
                <type.icon className="text-emerald-600" size={32} />
              </div>

              <h3 className="text-2xl font-semibold text-slate-800 mb-4">
                {type.title}
              </h3>

              <p className="text-slate-600 mb-6 leading-relaxed">
                {type.description}
              </p>

              <ul className="space-y-3">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-emerald-50 rounded-2xl p-8 max-w-3xl mx-auto">
            <Clock className="text-emerald-600 mx-auto mb-4" size={48} />
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Duração das Sessões
            </h3>
            <p className="text-slate-600 leading-relaxed">
              As sessões de psicoterapia têm duração de 50 minutos, proporcionando tempo suficiente para explorar suas preocupações e desenvolver estratégias eficazes.
              A frequência recomendada é semanal, mas pode ser ajustada conforme necessário.
            </p>
          </div>
          <motion.a
            target="_blank"
            href={whatsapp()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 mx-auto max-w-xs mt-8 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Calendar size={20} />
            <span>Agendar Consulta</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;