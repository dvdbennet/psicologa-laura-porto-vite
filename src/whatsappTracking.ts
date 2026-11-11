/**
 * whatsappTracking.ts — psilauraporto.com
 *
 * Guarda o gclid / gbraid / wbraid da URL quando a pessoa chega pelo anúncio
 * (vale 90 dias, mesma janela máxima do Google Ads). Não altera a mensagem do
 * WhatsApp. Será usado pelo formulário pré-WhatsApp / conversões offline.
 *
 * Inicializado no main.tsx.
 */

const STORAGE_KEY = 'lp_click_ids';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000; // 90 dias

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

export function initWhatsappTracking(): void {
  saveClickIdsFromUrl();
}
