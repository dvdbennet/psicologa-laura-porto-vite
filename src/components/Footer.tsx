import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";

const navLinks = [
  { href: "#about", label: "Sobre Dra. Laura" },
  { href: "#services", label: "Serviços" },
  { href: "#approach", label: "Minha Abordagem" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#contact", label: "Contato" },
];

const Footer = () => {
  return (
    <footer className="bg-ink-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-display text-white">
                LP
              </div>
              <div>
                <div className="text-white font-display text-lg">
                  Dra. Laura Porto
                </div>
                <div className="text-white/40 text-xs">CRP 01/28432</div>
              </div>
            </div>
            <p className="text-white/50 leading-relaxed mb-6 text-sm">
              Oferecendo serviços de psicoterapia compassivos e profissionais
              para ajudá-lo a navegar pelos desafios da vida e alcançar
              crescimento pessoal.
            </p>
            <div className="text-white/40 text-xs">
              CRP 01/28432 • Conselho Regional de Psicologia do Distrito
              Federal
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">
              Navegação
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-sm uppercase tracking-wide">
              Informação de Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-emerald-400" size={16} />
                <span className="text-white/50 text-sm">
                  (61) 99991-4224
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-emerald-400" size={16} />
                <span className="text-white/50 text-sm">
                  lauraporto.psi@gmail.com
                </span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="text-emerald-400 mt-0.5" size={16} />
                <div className="text-white/50 text-sm">
                  <div>Sudoeste, Brasília - DF</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/40 text-xs">
              © 2024 Dra. Laura Porto. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-6 text-white/40 text-xs">
              <Link to="/privacidade" className="hover:text-white transition-colors">
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
