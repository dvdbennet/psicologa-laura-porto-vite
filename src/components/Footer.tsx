import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router";
import { Reveal, WhatsButton } from "./ui/motion";

const navLinks = [
  { href: "#about", label: "Sobre Dra. Laura" },
  { href: "#services", label: "Serviços" },
  { href: "#approach", label: "Minha Abordagem" },
  { href: "#testimonials", label: "Depoimentos" },
  { href: "#contact", label: "Contato" },
];

const Footer = () => {
  return (
    <footer className="relative overflow-clip bg-ink-900 pb-28 pt-16 text-white lg:pb-10 lg:pt-24">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-brand/25 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="max-w-xl font-display text-[2rem] leading-[1.1] sm:text-5xl">
              Cuidar da mente começa com <span className="text-mint-300">uma conversa.</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <WhatsButton location="footer_cta" label="Agendar no WhatsApp" variant="light" className="w-full sm:w-auto" />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-mint-500 to-brand font-display text-white">
                LP
              </div>
              <div>
                <div className="font-display text-lg text-white">Dra. Laura Porto</div>
                <div className="text-xs text-white/40">CRP 01/28432</div>
              </div>
            </div>
            <p className="mb-5 text-sm leading-relaxed text-white/55">
              Psicoterapia online e presencial para adultos e adolescentes, com escuta acolhedora,
              sigilo e base científica.
            </p>
            <div className="text-xs text-white/40">
              CRP 01/28432 • Conselho Regional de Psicologia do Distrito Federal
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">Navegação</h3>
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center py-1.5 text-[15px] text-white/55 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-mint-300 transition-all duration-300 group-hover:mr-2 group-hover:w-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold text-white">Informação de Contato</h3>
            <div className="space-y-4 text-[15px] text-white/55">
              <div className="flex items-center gap-3">
                <Phone className="text-mint-300" size={16} />
                (61) 99991-4224
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-mint-300" size={16} />
                lauraporto.psi@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-mint-300" size={16} />
                Sudoeste, Brasília - DF
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Dra. Laura Porto. Todos os direitos reservados.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacidade" className="transition-colors hover:text-white">
              Política de Privacidade
            </Link>
            <Link to="/termos" className="transition-colors hover:text-white">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
