/**
 * whatsappTracking.ts — psilauraporto.com
 *
 * 1. Guarda o gclid / gbraid / wbraid da URL quando a pessoa chega pelo anúncio
 *    (vale 90 dias, mesma janela máxima do Google Ads). Não altera a mensagem
 *    do WhatsApp.
 * 2. Quando essa pessoa clica num botão do WhatsApp, manda em segundo plano um
 *    registro do clique para a planilha "Conversões Offline — Laura" (aba
 *    Cliques): só o identificador do anúncio, a página e o tipo de aparelho.
 *    Nada de nome, telefone ou conteúdo da conversa.
 *
 *    A Laura casa o clique com a conversa pelo horário (com 3 a 5 cliques por
 *    dia não há ambiguidade) e marca o Status; a planilha manda a conversão
 *    offline para o Google Ads.
 *
 * Inicializado no main.tsx.
 */

const STORAGE_KEY = 'lp_click_ids';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias
const DEDUPE_MS = 5000; // clique duplo / dois botões seguidos = um registro só

// Web App do Google Apps Script (docs/apps-script/Code.gs), conta adslauraporto
export const LEADS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbyhP1ykjfGi7K6WYQZRo0-65DEvDoUg8GXPT1R871bUKQ3gY97T1fG4LWV3n1lVjGhc/exec';

export type ClickIds = { gclid?: string; gbraid?: string; wbraid?: string; ts: number };

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

export function getClickIds(): ClickIds | null {
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

function aparelho(): 'Celular' | 'Computador' {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Celular' : 'Computador';
}

let ultimoEnvio = 0;

function registrarCliqueWhatsapp(event: MouseEvent): void {
  const alvo = event.target as Element | null;
  const link = alvo?.closest?.('a[href*="wa.me"]');
  if (!link) return;

  const ids = getClickIds();
  if (!ids) return; // só interessa quem veio de anúncio (sem gclid não dá para enviar ao Google)

  const agora = Date.now();
  if (agora - ultimoEnvio < DEDUPE_MS) return;
  ultimoEnvio = agora;

  const payload = {
    tipo: 'clique',
    gclid: ids.gclid ?? '',
    gbraid: ids.gbraid ?? '',
    wbraid: ids.wbraid ?? '',
    pagina: window.location.pathname,
    aparelho: aparelho(),
  };

  try {
    // text/plain evita a pré-verificação CORS; o sendBeacon sobrevive à troca de aba/app
    navigator.sendBeacon(
      LEADS_ENDPOINT,
      new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' }),
    );
  } catch {
    /* nunca atrapalhar o clique no WhatsApp */
  }
}

export function initWhatsappTracking(): void {
  saveClickIdsFromUrl();
  // Fase de captura: registra mesmo que algum componente pare a propagação.
  // Não chama preventDefault: o link abre normalmente.
  document.addEventListener('click', registrarCliqueWhatsapp, true);
}
