import WhatsAppProvider from "@/context/WhatsAppProvider";
import About from "../components/About";
import Approach from "../components/Approach";
import Benefits from "../components/Benefits";
import ComplianceNotice from "../components/ComplianceNotice";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import StickyWhatsBar from "../components/StickyWhatsBar";
import WhatsApp from "../components/WhatsApp";

function Home() {
  return (
    <WhatsAppProvider>
      <div className="bg-mist min-h-screen">
        <Navbar />
        <Hero />
        <Services />
        <About />
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

export default Home;
