/**
 * whatsappTracking.ts — psilauraporto.com (Vite + React)
 *
 * O que faz:
 * 1. Quando a pessoa chega pelo anúncio, guarda o gclid / gbraid / wbraid da URL
 *    no localStorage (vale 90 dias, mesma janela máxima do Google Ads).
 * 2. Quando ela clica em QUALQUER link do WhatsApp, gera um código curto
 *    (ex.: LP-7K2Q), coloca esse código no fim da mensagem pronta e manda
 *    código + gclid para a planilha (Apps Script).
 * 3. A Laura vê o código na mensagem. Quando o paciente fecha, ela anota o código
 *    na planilha, e a planilha monta sozinha a linha de upload para o Google Ads.
 *
 * Inicializado no main.tsx.
 */

// Cole aqui a URL do Web App do Apps Script (termina em /exec)
// Enquanto estiver vazio, o código só vai na mensagem (nada é enviado para planilha).
const SHEET_ENDPOINT = '';

const STORAGE_KEY = 'lp_click_ids';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias

type ClickIds = { gclid?: string; gbraid?: string; wbraid?: string; ts: number };

function saveClickIdsFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const ids: ClickIds = {
    gclid: params.get('gclid') ?? undefined,
    gbraid: params.get('gbraid') ?? undefined, // iOS: às vezes vem só gbraid/wbraid
    wbraid: params.get('wbraid') ?? undefined,
    ts: Date.now(),
  };
  if (ids.gclid || ids.gbraid || ids.wbraid) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* navegador anônimo / storage bloqueado: segue sem quebrar o site */
    }
  }
}

function getClickIds(): ClickIds | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const ids = JSON.parse(raw) as ClickIds;
    if (Date.now() - ids.ts > MAX_AGE_MS) return null; // expirado
    return ids;
  } catch {
    return null;
  }
}

// Código curto, sem letras que confundem (0/O, 1/I)
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return `LP-${code}`;
}

function handleWhatsappClick(event: MouseEvent): void {
  const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="wa.me"]');
  if (!link) return;

  const code = generateCode();
  const ids = getClickIds();

  // 1) Coloca o código no fim da mensagem pronta (antes do navegador abrir o link)
  const url = new URL(link.href);
  const original = url.searchParams.get('text') ?? '';
  const base = original.replace(/\n\n\(ref\. LP-[A-Z0-9]{4}\)$/, ''); // evita código duplicado em 2º clique
  url.searchParams.set('text', `${base}\n\n(ref. ${code})`);
  link.href = url.toString();

  // 2) Manda para a planilha sem atrasar a abertura do WhatsApp
  const payload = JSON.stringify({
    code,
    gclid: ids?.gclid ?? '',
    gbraid: ids?.gbraid ?? '',
    wbraid: ids?.wbraid ?? '',
    page: window.location.pathname,
    clickedAt: new Date().toISOString(),
  });
  if (SHEET_ENDPOINT) {
    navigator.sendBeacon(SHEET_ENDPOINT, new Blob([payload], { type: 'text/plain' }));
  }

  // 3) Deixa o código disponível no GTM/GA4 (variável de camada de dados "wa_ref")
  window.dataLayer?.push({ event: 'whatsapp_ref', wa_ref: code, has_gclid: Boolean(ids?.gclid) });
}

export function initWhatsappTracking(): void {
  saveClickIdsFromUrl();
  // "capture: true" roda ANTES do GTM e antes do navegador seguir o link,
  // então o link já sai com o código. A sua tag CONTATOZADA continua funcionando igual.
  document.addEventListener('click', handleWhatsappClick, { capture: true });
}
