import { Mail, MapPin, Phone } from "lucide-react";
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
                <img src="/favicon.ico" alt="" />
              </div>
              <div>
                <div className="text-white font-semibold text-lg">
                  Dra. Laura Porto
                </div>
                <div className="text-slate-400 text-sm">CRP 01/28432</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Oferecendo serviços de psicoterapia compassivos e profissionais
              para ajudá-lo a navegar pelos desafios da vida e alcançar
              crescimento pessoal.
            </p>
            <div className="text-slate-400 text-sm">
              CRP 01/28432 • Conselho Regional de Psicologia do Distrito Federal
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Sobre Dra. Laura
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Serviços
                </a>
              </li>
              <li>
                <a
                  href="#approach"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Minha Abordagem
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Depoimentos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">
              Informação de Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="text-emerald-400" size={18} />
                <span className="text-slate-400">(61) 99991-4224</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-emerald-400" size={18} />
                <span className="text-slate-400">lauraporto.psi@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-emerald-400 mt-1" size={18} />
                <div className="text-slate-400">
                  <div>Sudoeste - Clsw  5 Bloco A, Sala 202</div>
                  <div>Brasília - DF</div>
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
