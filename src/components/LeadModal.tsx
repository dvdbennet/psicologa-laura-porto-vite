import { AnimatePresence, motion, useDragControls, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Loader2, Lock, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
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
 *
 * UX:
 * - Celular: "bottom sheet" que sobe de baixo, arrasta para fechar, respeita a área
 *   segura do iPhone e cabe inteiro na tela (sem rolagem em 375×667).
 * - Desktop: janela centralizada.
 * - Nada encosta fora da caixa (sem rolagem horizontal).
 * - Erros aparecem embaixo de cada campo, e o foco vai para o primeiro campo errado.
 * - No celular NÃO abre o teclado sozinho (ele cobriria metade da caixa).
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

type Erros = Partial<Record<"nome" | "tel" | "email" | "aceite", string>>;

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

const isTouch = () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

/** Trava a rolagem da página por trás (funciona também no Safari do iPhone). */
function useScrollLock(ativo: boolean) {
  useEffect(() => {
    if (!ativo) return;
    const y = window.scrollY;
    const { style } = document.body;
    const anterior = { position: style.position, top: style.top, width: style.width, overflow: style.overflow };
    style.position = "fixed";
    style.top = `-${y}px`;
    style.width = "100%";
    style.overflow = "hidden";
    return () => {
      Object.assign(style, anterior);
      window.scrollTo(0, y);
    };
  }, [ativo]);
}

export default function LeadModal() {
  const [waUrl, setWaUrl] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [pais, setPais] = useState<Pais>(PAISES[0]);
  const [tel, setTel] = useState(""); // só dígitos
  const [email, setEmail] = useState("");
  const [aceite, setAceite] = useState(false);
  const [website, setWebsite] = useState(""); // campo invisível anti-robô
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);
  const nomeRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const aceiteRef = useRef<HTMLInputElement>(null);
  const ultimoFoco = useRef<HTMLElement | null>(null);

  const ids = { nome: useId(), tel: useId(), email: useId(), aceite: useId(), titulo: useId(), desc: useId() };
  const reduzirMovimento = useReducedMotion();
  const drag = useDragControls();

  const aberto = waUrl !== null;
  useScrollLock(aberto);

  const fechar = useCallback(() => {
    setWaUrl(null);
    setErros({});
    setEnviando(false);
    ultimoFoco.current?.focus?.();
  }, []);

  // Intercepta cliques em qualquer link do WhatsApp do site
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (!link) return;
      // Quem já preencheu nos últimos 30 dias vai direto (sem contar conversão de novo)
      if (leadJaEnviado()) return;
      e.preventDefault();
      e.stopPropagation(); // impede o GTM de contar o clique como conversão
      ultimoFoco.current = link;
      setWaUrl(link.href);
      window.dataLayer?.push({ event: "lead_form_open" });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Foco inicial (só no desktop: no celular o teclado cobriria a caixa), Esc fecha e Tab fica preso na caixa
  useEffect(() => {
    if (!aberto) return;
    const t = setTimeout(() => {
      if (!isTouch()) nomeRef.current?.focus();
      else dialogRef.current?.focus();
    }, 220);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focaveis = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([tabindex="-1"]), select, a[href]',
      );
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [aberto, fechar]);

  const validar = (): Erros => {
    const e: Erros = {};
    if (nome.trim().length < 2) e.nome = "Como podemos te chamar?";
    const telOk = pais.code === "BR" ? tel.length === 10 || tel.length === 11 : tel.length >= 6 && tel.length <= 14;
    if (!telOk) e.tel = pais.code === "BR" ? "Confira o número com DDD." : "Confira o número.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Confira o e-mail ou deixe em branco.";
    if (!aceite) e.aceite = "Marque para a Dra. Laura poder te responder.";
    return e;
  };

  const enviar = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!waUrl || enviando) return;
    const e = validar();
    setErros(e);
    if (e.nome) return nomeRef.current?.focus();
    if (e.tel) return telRef.current?.focus();
    if (e.email) return emailRef.current?.focus();
    if (e.aceite) return aceiteRef.current?.focus();

    setEnviando(true);
    const clickIds = getClickIds();
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
              gclid: clickIds?.gclid ?? "",
              gbraid: clickIds?.gbraid ?? "",
              wbraid: clickIds?.wbraid ?? "",
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

    // window.open precisa acontecer no mesmo "toque" do usuário (senão o navegador bloqueia)
    abrirWhatsApp(mensagemComNome(waUrl, nome));
    setTimeout(fechar, 400);
  };

  const irDireto = () => {
    if (!waUrl) return;
    window.dataLayer?.push({ event: "whatsapp_direct" });
    abrirWhatsApp(waUrl);
    fechar();
  };

  const campo = (temErro?: string) =>
    [
      "block w-full min-w-0 rounded-xl border bg-white px-4 h-12 [@media(max-height:700px)]:h-11 text-base text-ink-900 placeholder:text-ink-400",
      "outline-none transition-[border-color,box-shadow] duration-150",
      "focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/15",
      temErro ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "border-ink-100",
    ].join(" ");

  const Erro = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p id={id} role="alert" className="mt-0.5 text-[12.5px] leading-tight text-red-600">
        {msg}
      </p>
    ) : null;

  const sheet = reduzirMovimento
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          key="lead-modal"
          className="fixed inset-0 z-[3000] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Fundo escurecido: toque fora fecha */}
          <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px]" onClick={fechar} aria-hidden="true" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={ids.titulo}
            aria-describedby={ids.desc}
            tabIndex={-1}
            {...sheet}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            drag={isTouch() ? "y" : false}
            dragListener={false}
            dragControls={drag}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) fechar();
            }}
            className={[
              "relative w-full max-h-[100dvh] overflow-y-auto overflow-x-hidden overscroll-contain bg-[#fbfaf8] shadow-lifted outline-none",
              // celular: bottom sheet com cantos de cima arredondados e área segura do iPhone
              "rounded-t-[28px] pb-[max(1rem,env(safe-area-inset-bottom))]",
              // desktop: janela centralizada
              "sm:max-w-[440px] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[28px] sm:pb-0",
            ].join(" ")}
          >
            {/* Detalhe de cor dentro da caixa (não vaza: a caixa corta com overflow-hidden) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-emerald-100/70 to-transparent"
            />

            {/* Alça para arrastar e fechar (só celular) */}
            <div
              className="relative flex justify-center pt-2.5 pb-1 sm:hidden touch-none cursor-grab"
              onPointerDown={(e) => drag.start(e)}
            >
              <span className="h-1.5 w-10 rounded-full bg-ink-100" />
            </div>

            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full text-ink-600 transition hover:bg-black/5 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
            >
              <X size={20} />
            </button>

            <form onSubmit={enviar} noValidate className="relative px-5 pt-1 pb-1 sm:px-8 sm:pt-8 sm:pb-6">
              {/* Cabeçalho */}
              <div className="flex items-center gap-3 pr-10">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-emerald-600 font-display text-lg text-white shadow-soft">
                  LP
                </span>
                <div className="min-w-0">
                  <h2 id={ids.titulo} className="font-display text-[22px] leading-tight tracking-tight text-ink-900 sm:text-2xl">
                    Dê o primeiro passo
                  </h2>
                  <p id={ids.desc} className="mt-0.5 text-balance text-[14px] leading-snug text-ink-600">
                    Continue a conversa com a Dra. Laura no WhatsApp.
                  </p>
                </div>
              </div>

              {/* Campos */}
              <div className="mt-4 space-y-2.5">
                <div>
                  <label htmlFor={ids.nome} className="mb-1 block text-[13px] font-semibold text-ink-700">
                    Nome
                  </label>
                  <input
                    id={ids.nome}
                    ref={nomeRef}
                    className={campo(erros.nome)}
                    placeholder="Como prefere ser chamado(a)"
                    autoComplete="name"
                    autoCapitalize="words"
                    enterKeyHint="next"
                    value={nome}
                    onChange={(e) => {
                      setNome(e.target.value);
                      if (erros.nome) setErros((x) => ({ ...x, nome: undefined }));
                    }}
                    aria-invalid={!!erros.nome}
                    aria-describedby={erros.nome ? `${ids.nome}-e` : undefined}
                  />
                  <Erro id={`${ids.nome}-e`} msg={erros.nome} />
                </div>

                <div>
                  <label htmlFor={ids.tel} className="mb-1 block text-[13px] font-semibold text-ink-700">
                    WhatsApp
                  </label>
                  <div className="flex gap-2">
                    <label className="relative flex h-12 [@media(max-height:700px)]:h-11 flex-none items-center gap-1 rounded-xl border border-ink-100 bg-white pl-3 pr-2 text-ink-900 transition focus-within:border-emerald-600 focus-within:ring-4 focus-within:ring-emerald-600/15">
                      <span className="sr-only">País</span>
                      <span aria-hidden="true" className="text-lg leading-none">{pais.flag}</span>
                      <span aria-hidden="true" className="text-[15px] tabular-nums">+{pais.ddi}</span>
                      <ChevronDown aria-hidden="true" size={14} className="text-ink-400" />
                      {/* select nativo por cima, invisível: abre a lista do próprio celular */}
                      <select
                        value={pais.code}
                        onChange={(e) => {
                          setPais(PAISES.find((p) => p.code === e.target.value) ?? PAISES[0]);
                          setTel("");
                        }}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      >
                        {PAISES.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.flag} {p.label} (+{p.ddi})
                          </option>
                        ))}
                      </select>
                    </label>
                    <input
                      id={ids.tel}
                      ref={telRef}
                      className={campo(erros.tel)}
                      placeholder={pais.code === "BR" ? "(61) 99999-9999" : "Número"}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      enterKeyHint="next"
                      value={pais.code === "BR" ? maskBR(tel) : tel}
                      onChange={(e) => {
                        setTel(e.target.value.replace(/\D/g, "").slice(0, pais.code === "BR" ? 11 : 14));
                        if (erros.tel) setErros((x) => ({ ...x, tel: undefined }));
                      }}
                      aria-invalid={!!erros.tel}
                      aria-describedby={erros.tel ? `${ids.tel}-e` : undefined}
                    />
                  </div>
                  <Erro id={`${ids.tel}-e`} msg={erros.tel} />
                </div>

                <div>
                  <label htmlFor={ids.email} className="mb-1 flex items-baseline justify-between text-[13px] font-semibold text-ink-700">
                    E-mail <span className="font-normal text-ink-400">opcional</span>
                  </label>
                  <input
                    id={ids.email}
                    ref={emailRef}
                    className={campo(erros.email)}
                    placeholder="voce@email.com"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    autoCapitalize="none"
                    spellCheck={false}
                    enterKeyHint="done"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (erros.email) setErros((x) => ({ ...x, email: undefined }));
                    }}
                    aria-invalid={!!erros.email}
                    aria-describedby={erros.email ? `${ids.email}-e` : undefined}
                  />
                  <Erro id={`${ids.email}-e`} msg={erros.email} />
                </div>
              </div>

              {/* Campo invisível anti-robô: fora da tela para leitores e pessoas, sem vazar da caixa */}
              <div aria-hidden="true" className="sr-only">
                <input tabIndex={-1} autoComplete="off" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>

              {/* Consentimento: área de toque grande, caixa personalizada */}
              <label
                htmlFor={ids.aceite}
                className={[
                  "mt-3 -mx-1 flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-2 transition-colors",
                  erros.aceite ? "border-red-300 bg-red-50/60" : aceite ? "border-emerald-200 bg-emerald-50/60" : "border-transparent",
                ].join(" ")}
              >
                <span className="relative mt-0.5 flex-none">
                  <input
                    id={ids.aceite}
                    ref={aceiteRef}
                    type="checkbox"
                    checked={aceite}
                    onChange={(e) => {
                      setAceite(e.target.checked);
                      if (erros.aceite) setErros((x) => ({ ...x, aceite: undefined }));
                    }}
                    className="peer sr-only"
                    aria-invalid={!!erros.aceite}
                    aria-describedby={erros.aceite ? `${ids.aceite}-e` : undefined}
                  />
                  <span
                    aria-hidden="true"
                    className={[
                      "grid h-5 w-5 place-items-center rounded-md border-2 transition-colors",
                      "peer-focus-visible:ring-4 peer-focus-visible:ring-emerald-600/20",
                      aceite ? "border-emerald-600 bg-emerald-600 text-white" : erros.aceite ? "border-red-400 bg-white" : "border-ink-400/60 bg-white",
                    ].join(" ")}
                  >
                    {aceite && <Check size={14} strokeWidth={3} />}
                  </span>
                </span>
                <span className="text-[13.5px] leading-snug text-ink-700">
                  Autorizo a Dra. Laura Porto a entrar em contato comigo pelo WhatsApp.
                </span>
              </label>
              <Erro id={`${ids.aceite}-e`} msg={erros.aceite} />

              {/* Ação principal */}
              <motion.button
                type="submit"
                disabled={enviando}
                whileTap={reduzirMovimento ? undefined : { scale: 0.98 }}
                className="mt-3 flex h-14 [@media(max-height:700px)]:h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-emerald-600 px-6 text-[17px] font-semibold text-white shadow-glow transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:opacity-80"
              >
                {enviando ? <Loader2 size={20} className="animate-spin" /> : <IconeWhats width={22} />}
                {enviando ? "Abrindo o WhatsApp…" : "Continuar no WhatsApp"}
              </motion.button>

              {/* Rodapé: confiança + saída alternativa */}
              <p className="mt-2.5 flex flex-wrap items-center justify-center gap-x-1.5 text-[12px] text-ink-400">
                <Lock size={12} aria-hidden="true" />
                Sigilo profissional · CRP 01/28432 ·{" "}
                <a href="/privacidade" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-emerald-700">
                  Privacidade
                </a>
              </p>
              <div className="text-center">
                <button
                  type="button"
                  onClick={irDireto}
                  className="inline-flex h-9 items-center px-3 text-[13px] text-ink-400 underline-offset-4 transition hover:text-emerald-700 hover:underline"
                >
                  Prefiro ir direto ao WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
