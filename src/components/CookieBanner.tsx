import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-accepted";

/**
 * Aviso de cookies compacto: uma linha no rodapé, para não cobrir o botão do
 * WhatsApp no hero do celular (antes ocupava ~1/5 da tela na primeira visita).
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== "true") setVisible(true);
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
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-[2000] px-3 lg:bottom-4 lg:px-4">
      <div className="mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/95 py-2 pl-4 pr-2 text-white shadow-lifted backdrop-blur">
        <p className="m-0 flex-1 text-[12.5px] leading-snug text-white/75">
          Usamos cookies para analisar o tráfego.{" "}
          <a href="/privacidade" className="underline underline-offset-2 hover:text-white">
            Saiba mais
          </a>
        </p>
        <button
          type="button"
          onClick={accept}
          className="h-10 flex-none rounded-full bg-white/10 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/20"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
