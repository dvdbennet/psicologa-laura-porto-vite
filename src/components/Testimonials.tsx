import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Dr. Porto helped me through one of the most difficult periods of my life. Her compassionate approach and practical strategies made all the difference.",
    rating: 5,
    session: "Individual Therapy",
  },
  {
    name: "Michael & Jennifer R.",
    text: "Our couples therapy sessions with Dr. Porto transformed our relationship. We learned to communicate better and reconnect with each other.",
    rating: 5,
    session: "Couples Therapy",
  },
  {
    name: "David L.",
    text: "The online sessions were incredibly convenient and just as effective as in-person therapy. Dr. Porto made me feel comfortable from day one.",
    rating: 5,
    session: "Online Therapy",
  },
  {
    name: "Maria C.",
    text: "I was skeptical about therapy at first, but Dr. Porto's warm and professional approach put me at ease. I've made tremendous progress.",
    rating: 5,
    session: "Individual Therapy",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-slate-800 mb-6">
            Client{" "}
            <span className="text-emerald-600 font-medium">Testimonials</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Read what my clients have to say about their therapy experience and
            the positive changes they've achieved.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <Quote className="text-emerald-200 mb-4" size={32} />

              <p className="text-slate-700 text-lg leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-800">
                    {testimonial.name}
                  </div>
                  <div className="text-emerald-600 text-sm">
                    {testimonial.session}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-emerald-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-slate-800 mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Take the first step toward positive change. Schedule a
              consultation to discuss your goals and how I can support you.
            </p>
            <motion.a
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/5561999914224?text=Ol%C3%A1,%20quero%20marcar%20uma%20consulta.%20Quais%20s%C3%A3o%20as%20disponibilidade%20de%20hor%C3%A1rios?"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Agendar Consulta
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
