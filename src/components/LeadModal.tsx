import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getClickIds } from "@/whatsappTracking";
import IconeWhats from "./IconeWhats";

/**
 * Formulário rápido antes do WhatsApp.
 *
 * Intercepta QUALQUER link para wa.me no site: em vez de abrir o WhatsApp direto,
 * abre esta janela. Ao enviar:
 *   1. manda nome/telefone/e-mail + gclid para a planilha (Apps Script)
 *   2. dispara "lead_form_submit" no dataLayer (é ESSE evento que conta conversão no Google Ads)
 *   3. abre o WhatsApp com a mensagem já personalizada com o nome
 *
 * "Prefiro ir direto ao WhatsApp" abre o WhatsApp sem formulário e NÃO conta conversão.
 */

// URL do Web App do Apps Script (termina em /exec). Vazio = não envia para planilha.
const LEADS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyhP1ykjfGi7K6WYQZRo0-65DEvDoUg8GXPT1R871bUKQ3gY97T1fG4LWV3n1lVjGhc/exec";

const LEAD_DONE_KEY = "lp_lead_enviado";
const LEAD_DONE_DAYS = 30;

type Pais = { code: string; ddi: string; flag: string; label: string };
const PAISES: Pais[] = [
  { code: "BR", ddi: "55", flag: "🇧🇷", label: "Brasil" },
  { code: "PT", ddi: "351", flag: "🇵🇹", label: "Portugal" },
  { code: "US", ddi: "1", flag: "🇺🇸", label: "EUA / Canadá" },
  { code: "GB", ddi: "44", flag: "🇬🇧", label: "Reino Unido" },
  { code: "IE", ddi: "353", flag: "🇮🇪", label: "Irlanda" },
  { code: "ES", ddi: "34", flag: "🇪🇸", label: "Espanha" },
  { code: "IT", ddi: "39", flag: "🇮🇹", label: "Itália" },
  { code: "DE", ddi: "49", flag: "🇩🇪", label: "Alemanha" },
  { code: "FR", ddi: "33", flag: "🇫🇷", label: "França" },
  { code: "AU", ddi: "61", flag: "🇦🇺", label: "Austrália" },
  { code: "JP", ddi: "81", flag: "🇯🇵", label: "Japão" },
];

function maskBR(digits: string) {
  const d = digits.slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function leadJaEnviado() {
  try {
    const ts = Number(localStorage.getItem(LEAD_DONE_KEY));
    return ts > 0 && Date.now() - ts < LEAD_DONE_DAYS * 864e5;
  } catch {
    return false;
  }
}

function abrirWhatsApp(url: string) {
  const w = window.open(url, "_blank", "noopener");
  if (!w) window.location.href = url;
}

/** Troca o "Olá, Dra. Laura!" inicial por "Olá, Dra. Laura! Sou <Nome>." */
function mensagemComNome(waUrl: string, nome: string) {
  const url = new URL(waUrl);
  const texto = url.searchParams.get("text") ?? "";
  const primeiro = nome.trim().split(/\s+/)[0];
  const novo = texto.startsWith("Olá, Dra. Laura!")
    ? texto.replace("Olá, Dra. Laura!", `Olá, Dra. Laura! Sou ${primeiro}.`)
    : `Olá, Dra. Laura! Sou ${primeiro}. ${texto}`;
  // encodeURIComponent usa %20 para espaço (URLSearchParams usaria "+",
  // que alguns WhatsApps mostram literalmente na mensagem)
  return `${url.origin}${url.pathname}?text=${encodeURIComponent(novo)}`;
}

export default function LeadModal() {
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState<Pais>(PAISES[0]);
  const [tel, setTel] = useState(""); // só dígitos
  const [email, setEmail] = useState("");
  const [aceite, setAceite] = useState(false);
  const [website, setWebsite] = useState(""); // campo invisível anti-robô
  const [erro, setErro] = useState<string | null>(null);
  const nomeRef = useRef<HTMLInputElement>(null);

  // Intercepta cliques em qualquer link do WhatsApp do site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;
      // Quem já preencheu nos últimos 30 dias vai direto (sem contar conversão de novo)
      if (leadJaEnviado()) return;
      e.preventDefault();
      e.stopPropagation(); // impede o GTM de contar o clique como conversão
      setWaUrl(link.href);
      window.dataLayer?.push({ event: "lead_form_open" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Some com a mensagem de erro assim que a pessoa mexe nos campos
  useEffect(() => setErro(null), [nome, tel, email, aceite, pais]);

  // Trava a rolagem da página, foca o primeiro campo e fecha com Esc
  useEffect(() => {
    if (!waUrl) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => nomeRef.current?.focus(), 250);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setWaUrl(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [waUrl]);

  const fechar = () => {
    setWaUrl(null);
    setErro(null);
  };

  const telValido = pais.code === "BR" ? tel.length === 10 || tel.length === 11 : tel.length >= 6 && tel.length <= 14;
  const emailValido = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waUrl) return;
    if (nome.trim().length < 2) return setErro("Escreva seu nome.");
    if (!telValido) return setErro("Confira o número do WhatsApp.");
    if (!emailValido) return setErro("Confira o e-mail (ou deixe em branco).");
    if (!aceite) return setErro("Marque a autorização para continuarmos pelo WhatsApp.");

    const ids = getClickIds();
    const telefone = `+${pais.ddi}${tel}`;
    const telefoneExibicao = pais.code === "BR" ? maskBR(tel) : `+${pais.ddi} ${tel}`;

    if (LEADS_ENDPOINT && !website) {
      navigator.sendBeacon(
        LEADS_ENDPOINT,
        new Blob(
          [
            JSON.stringify({
              nome: nome.trim(),
              telefone,
              telefoneExibicao,
              email: email.trim(),
              consentimento: true,
              gclid: ids?.gclid ?? "",
              gbraid: ids?.gbraid ?? "",
              wbraid: ids?.wbraid ?? "",
              pagina: window.location.pathname,
              website,
            }),
          ],
          { type: "text/plain" },
        ),
      );
    }

    if (!website) window.dataLayer?.push({ event: "lead_form_submit" });
    try {
      localStorage.setItem(LEAD_DONE_KEY, String(Date.now()));
    } catch {
      /* ignora */
    }

    abrirWhatsApp(mensagemComNome(waUrl, nome));
    fechar();
  };

  const irDireto = () => {
    if (!waUrl) return;
    window.dataLayer?.push({ event: "whatsapp_direct" });
    abrirWhatsApp(waUrl);
    fechar();
  };

  const input =
    "w-full rounded-2xl border border-ink-100 bg-white px-5 py-3.5 text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15";

  return (
    <AnimatePresence>
      {waUrl && (
        <motion.div
          key="lead-modal"
          className="fixed inset-0 z-[3000] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-ink-900/55 backdrop-blur-sm" onClick={fechar} />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-[2rem] sm:rounded-[2rem] bg-[#fbfaf8] shadow-lifted"
          >
            <div className="grain-overlay rounded-[inherit]" />
            <div className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-emerald-200/50 blur-3xl" />

            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-ink-600 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <X size={22} />
            </button>

            <form onSubmit={enviar} noValidate className="relative px-6 pb-7 pt-9 sm:px-10 sm:pb-9 sm:pt-11">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Dra. Laura Porto · CRP 01/28432
              </p>
              <h2
                id="lead-modal-title"
                className="font-display text-balance text-center text-3xl sm:text-4xl leading-tight tracking-tight text-ink-900"
              >
                Dê o primeiro passo
              </h2>
              <p className="mx-auto mt-3 max-w-sm text-center text-ink-600">
                Deixe seu contato e continue a conversa com a Dra. Laura no WhatsApp.
              </p>

              <div className="mt-7 space-y-3.5">
                <input
                  ref={nomeRef}
                  className={input}
                  placeholder="Nome completo"
                  autoComplete="name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  aria-label="Nome completo"
                />

                <div className="flex gap-2">
                  <label className="relative flex flex-none items-center gap-1.5 rounded-2xl border border-ink-100 bg-white pl-4 pr-3 text-ink-900 transition focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15">
                    <span className="sr-only">País</span>
                    <span aria-hidden="true" className="text-xl leading-none">{pais.flag}</span>
                    <span aria-hidden="true" className="text-base">+{pais.ddi}</span>
                    <span aria-hidden="true" className="text-xs text-ink-400">▾</span>
                    {/* select invisível por cima: abre a lista nativa do celular */}
                    <select
                      value={pais.code}
                      onChange={(e) => {
                        setPais(PAISES.find((p) => p.code === e.target.value) ?? PAISES[0]);
                        setTel("");
                      }}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    >
                      {PAISES.map((p) => (
                        <option key={p.code} value={p.code}>
                          {p.flag} {p.label} (+{p.ddi})
                        </option>
                      ))}
                    </select>
                  </label>
                  <input
                    className={input}
                    placeholder={pais.code === "BR" ? "(61) 99999-9999" : "Seu WhatsApp"}
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={pais.code === "BR" ? maskBR(tel) : tel}
                    onChange={(e) => setTel(e.target.value.replace(/\D/g, "").slice(0, pais.code === "BR" ? 11 : 14))}
                    aria-label="Seu WhatsApp"
                  />
                </div>

                <input
                  className={input}
                  placeholder="E-mail (opcional)"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="E-mail (opcional)"
                />

                {/* Campo invisível: pessoas não veem, robôs preenchem */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                  name="website"
                />
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink-700">
                <input
                  type="checkbox"
                  checked={aceite}
                  onChange={(e) => setAceite(e.target.checked)}
                  className="mt-0.5 h-5 w-5 flex-none cursor-pointer rounded-md border-ink-100 accent-emerald-600"
                />
                <span>Autorizo a Dra. Laura Porto a entrar em contato comigo pelo WhatsApp sobre o meu atendimento.</span>
              </label>

              <p className="mt-3 flex items-center gap-2 text-xs text-ink-400">
                <ShieldCheck size={15} className="flex-none text-emerald-600" />
                Seus dados ficam só com a Dra. Laura, protegidos por sigilo profissional.
              </p>

              {erro && (
                <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
                  {erro}
                </p>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-glow transition-colors hover:bg-emerald-700"
              >
                <IconeWhats width={22} />
                Continuar no WhatsApp
              </motion.button>

              <div className="mt-5 flex flex-col items-center gap-2 text-sm">
                <button
                  type="button"
                  onClick={irDireto}
                  className="text-ink-400 underline-offset-4 transition hover:text-emerald-700 hover:underline"
                >
                  Prefiro ir direto ao WhatsApp
                </button>
                <a
                  href="/privacidade"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-ink-400 underline underline-offset-4 hover:text-emerald-700"
                >
                  Política de Privacidade
                </a>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
