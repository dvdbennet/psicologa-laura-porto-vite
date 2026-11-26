import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import CookieBanner from "./components/CookieBanner.tsx";
import "./index.css";
import Adolescente from "./routes/Adolescente.tsx";
import Brasilia from "./routes/Brasilia.tsx";
import Exterior from "./routes/Exterior.tsx";
import Home from "./routes/Home.tsx";
import Privacidade from "./routes/Privacidade.tsx";
import Termos from "./routes/Termos.tsx";
import { initWhatsappTracking } from "./whatsappTracking";

initWhatsappTracking();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacidade" element={<Privacidade />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/adolescente" element={<Adolescente />} />
      <Route path="/exterior" element={<Exterior />} />
      <Route path="/brasilia" element={<Brasilia />} />
    </Routes>
    <CookieBanner />
  </BrowserRouter>,
);
