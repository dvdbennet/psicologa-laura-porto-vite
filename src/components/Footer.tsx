import { Heart, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <Heart className="text-white" size={20} />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  Dra. Laura Porto
                </div>
                <div className="text-slate-400 text-sm">CRP 06/123456</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Oferecendo serviços de psicoterapia compassivos e profissionais
              para ajudá-lo a navegar pelos desafios da vida e alcançar
              crescimento pessoal.
            </p>
            <div className="text-slate-400 text-sm">
              CRP 06/123456 • Conselho Regional de Psicologia de São Paulo
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About Dr. Porto
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#approach"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  My Approach
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Testimonials
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-emerald-400" size={18} />
                <span className="text-slate-400">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-emerald-400" size={18} />
                <span className="text-slate-400">laura.porto@email.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-emerald-400 mt-1" size={18} />
                <div className="text-slate-400">
                  <div>123 Wellness Drive, Suite 200</div>
                  <div>Los Angeles, CA 90210</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 Dra. Laura Porto. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <Link
                to="/privacidade"
                className="hover:text-white transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link to="/termos" className="hover:text-white transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
