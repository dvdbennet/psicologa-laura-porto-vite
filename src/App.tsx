import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Approach from './components/Approach';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ComplianceNotice from './components/ComplianceNotice';

function App() {
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

export default App;