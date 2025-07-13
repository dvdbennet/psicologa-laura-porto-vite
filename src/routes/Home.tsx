import About from "../components/About";
import Approach from "../components/Approach";
import ComplianceNotice from "../components/ComplianceNotice";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";

function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Testimonials />
      <Contact />
      <ComplianceNotice />
      <Footer />
    </div>
  );
}

export default Home;
