import { motion } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 z-50"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <div>
              <div className="text-slate-800 font-semibold text-lg">
                Dra. Laura Porto
              </div>
              <div className="text-slate-600 text-xs">CRP 01/28432</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("approach")}
              className="text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Abordagem
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Depoimentos
            </button>
            <motion.a
              target="_blank"
              href="https://wa.me/5561999914224?text=Ol%C3%A1,%20quero%20marcar%20uma%20consulta.%20Quais%20s%C3%A3o%20as%20disponibilidade%20de%20hor%C3%A1rios?"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Agendar
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-slate-200"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-700 hover:text-emerald-600 transition-colors text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-slate-700 hover:text-emerald-600 transition-colors text-left"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("approach")}
                className="text-slate-700 hover:text-emerald-600 transition-colors text-left"
              >
                Abordagem
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-slate-700 hover:text-emerald-600 transition-colors text-left"
              >
                Testemunhos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition-colors w-fit"
              >
              Agende sua Consulta
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
