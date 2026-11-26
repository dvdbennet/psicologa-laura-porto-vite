/** Evento único de conversão: mantém o mesmo formato usado no GTM desde sempre. */
export function trackWhatsApp(clickLocation: string) {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event: "whatsapp_click", click_location: clickLocation });
  }
}
