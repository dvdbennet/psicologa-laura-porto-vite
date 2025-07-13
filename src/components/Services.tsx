import React from 'react';
import { motion } from 'framer-motion';
import { Video, MapPin, Clock, Users, Brain, Heart } from 'lucide-react';

const services = [
  {
    icon: Brain,
    title: 'Individual Therapy',
    description: 'One-on-one sessions focused on your personal growth and healing journey.',
    features: ['Anxiety & Depression', 'Trauma Recovery', 'Life Transitions', 'Self-Esteem']
  },
  {
    icon: Heart,
    title: 'Couples Therapy',
    description: 'Strengthen your relationship through improved communication and understanding.',
    features: ['Communication Skills', 'Conflict Resolution', 'Intimacy Issues', 'Pre-marital Counseling']
  },
  {
    icon: Users,
    title: 'Group Therapy',
    description: 'Connect with others facing similar challenges in a supportive group setting.',
    features: ['Social Anxiety', 'Grief Support', 'Mindfulness Groups', 'Skills Training']
  }
];

const sessionTypes = [
  {
    icon: Video,
    title: 'Online Sessions',
    description: 'Convenient therapy from the comfort of your home',
    features: ['Secure video platform', 'Flexible scheduling', 'Same quality care', 'No travel required'],
    popular: true
  },
  {
    icon: MapPin,
    title: 'In-Person Sessions',
    description: 'Traditional face-to-face therapy in a welcoming office',
    features: ['Comfortable office space', 'Private parking', 'Central location', 'Personal connection'],
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
            Ofereço uma gama de serviços terapêuticos projetados para atender suas 
            necessidades únicas e apoiar sua jornada em direção ao bem-estar mental.
          </p>
        </motion.div>

        {/* Service Types */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
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
            Choose Your{' '}
            <span className="text-emerald-600 font-medium">Preferred Format</span>
          </h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            I offer both online and in-person sessions to accommodate your 
            preferences and lifestyle needs.
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
              Flexible Scheduling
            </h3>
            <p className="text-slate-600 leading-relaxed">
              I offer evening and weekend appointments to accommodate your busy schedule. 
              Sessions are typically 50 minutes and can be scheduled weekly or bi-weekly 
              based on your needs.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;