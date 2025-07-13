import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Termos() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="p-16">
        <h1 className="text-3xl font-bold mb-4">Termos de Serviço</h1>
        <p className="mb-4">
          Estes Termos de Serviço regem o uso do nosso site e serviços. Ao
          acessar ou usar nosso site, você concorda em cumprir estes termos. Se
          não concordar com estes termos, não use nosso site.
        </p>
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default Termos;
