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
import WhatsApp from "../components/WhatsApp";

function Adolescente() {
  return (
    <WhatsAppProvider message="Olá, Dra. Laura! Vim pelo site e gostaria de saber sobre terapia para adolescente e horários.">
      <div className="bg-slate-50 min-h-screen">
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
        <WhatsApp />
      </div>
    </WhatsAppProvider>
  );
}

export default Adolescente;
