import WhatsAppProvider from "@/context/WhatsAppProvider";
import AboutAdolescente from "../components/AboutAdolescente";
import Approach from "../components/Approach";
import Benefits from "../components/Benefits";
import ComplianceNotice from "../components/ComplianceNotice";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import HeroAdolescente from "../components/HeroAdolescente";
import ImportanciaAdolescente from "../components/ImportanciaAdolescente";
import Navbar from "../components/Navbar";
import ServicesAdolescente from "../components/ServicesAdolescente";
import Testimonials from "../components/Testimonials";
import StickyWhatsBar from "../components/StickyWhatsBar";
import WhatsApp from "../components/WhatsApp";
import seo from "../seo/adolescente.json";
import { useRouteSeo } from "../seo/useRouteSeo";

function Adolescente() {
  useRouteSeo(seo);

  return (
    <WhatsAppProvider message="Olá, Dra. Laura! Vim pelo site e gostaria de saber sobre terapia para adolescente e horários.">
      <div className="bg-mist min-h-screen">
        <Navbar />
        <HeroAdolescente />
        <ImportanciaAdolescente />
        <ServicesAdolescente />
        <AboutAdolescente />
        <Benefits />
        <Approach />
        <Testimonials />
        <Faq />
        <Contact />
        <ComplianceNotice />
        <Footer />
        <WhatsApp desktopOnly />
        <StickyWhatsBar />
      </div>
    </WhatsAppProvider>
  );
}

export default Adolescente;
