import WhatsAppProvider from "@/context/WhatsAppProvider";
import About from "../components/About";
import Approach from "../components/Approach";
import BenefitsExterior from "../components/BenefitsExterior";
import ComplianceNotice from "../components/ComplianceNotice";
import Contact from "../components/Contact";
import FaqExterior from "../components/FaqExterior";
import Footer from "../components/Footer";
import HeroExterior from "../components/HeroExterior";
import Navbar from "../components/Navbar";
import PainPointsExterior from "../components/PainPointsExterior";
import Testimonials from "../components/Testimonials";
import WhatsApp from "../components/WhatsApp";
import seo from "../seo/exterior.json";
import { useRouteSeo } from "../seo/useRouteSeo";

function Exterior() {
  useRouteSeo(seo);

  return (
    <WhatsAppProvider
      message="Olá!

Moro no exterior e gostaria de saber mais sobre o atendimento psicológico online em português, os horários disponíveis considerando meu fuso e os próximos passos para iniciar o processo terapêutico."
    >
      <div className="bg-slate-50 min-h-screen">
        <Navbar />
        <HeroExterior />
        <PainPointsExterior />
        <BenefitsExterior />
        <About />
        <Approach />
        <Testimonials />
        <FaqExterior />
        <Contact />
        <ComplianceNotice />
        <Footer />
        <WhatsApp />
      </div>
    </WhatsAppProvider>
  );
}

export default Exterior;
