/**
 * Rolagem suave (Lenis) só em aparelhos com mouse. No celular a rolagem nativa
 * é mais rápida e confiável — e é lá que está a conversão.
 */
export async function initSmoothScroll() {
  if (typeof window === "undefined") return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (reduced || !finePointer) return;

  const { default: Lenis } = await import("lenis");
  const lenis = new Lenis({ lerp: 0.1 });
  // links âncora (#services etc.) passam pelo Lenis para não "pular"
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = a?.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    lenis.scrollTo(el as HTMLElement, { offset: -80 });
  });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}
