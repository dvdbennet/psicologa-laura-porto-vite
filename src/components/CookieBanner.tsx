import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // localStorage indisponível: apenas esconde o aviso nesta sessão
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-4 z-[2000] mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-900/95 backdrop-blur px-5 py-4 text-white shadow-lifted border border-white/10">
      <p className="m-0 flex-1 basis-64 text-sm text-white/70">
        Usamos cookies para melhorar sua experiência e analisar o tráfego. Ao
        continuar, você concorda.
      </p>
      <button
        type="button"
        onClick={accept}
        className="flex-none rounded-full bg-emerald-500 px-5 py-2 font-semibold text-white hover:bg-emerald-600 transition-colors"
      >
        Aceitar
      </button>
    </div>
  );
}
