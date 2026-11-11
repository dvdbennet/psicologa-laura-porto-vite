import WhatsAppProvider from "@/context/WhatsAppProvider";
import About from "../components/About";
import Approach from "../components/Approach";
import ComplianceNotice from "../components/ComplianceNotice";
import Contact from "../components/Contact";
import FaqBrasilia from "../components/FaqBrasilia";
import Footer from "../components/Footer";
import HeroBrasilia from "../components/HeroBrasilia";
import LocalizacaoBrasilia from "../components/LocalizacaoBrasilia";
import ModalidadesBrasilia from "../components/ModalidadesBrasilia";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import WhatsApp from "../components/WhatsApp";
import seo from "../seo/brasilia.json";
import { useRouteSeo } from "../seo/useRouteSeo";

function Brasilia() {
  useRouteSeo(seo);

  return (
    <WhatsAppProvider
      message="Olá, Dra. Laura! Vim pelo site e gostaria de saber sobre horários para terapia em Brasília."
    >
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <HeroBrasilia />
        <ModalidadesBrasilia />
        <LocalizacaoBrasilia />
        <Services />
        <About />
        <Approach />
        <Testimonials />
        <FaqBrasilia />
        <Contact />
        <ComplianceNotice />
        <Footer />
        <WhatsApp />
      </div>
    </WhatsAppProvider>
  );
}

export default Brasilia;
