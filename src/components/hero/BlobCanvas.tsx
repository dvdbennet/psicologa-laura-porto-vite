import { useEffect, useRef } from "react";
import type { BlobHandle } from "@/three/BreathingBlob";

/**
 * Canvas da forma 3D. Enquanto o WebGL não carrega (ou se não houver WebGL),
 * fica visível um degradê CSS no mesmo formato, que também "respira" — então
 * a página nunca mostra um buraco vazio.
 */
export default function BlobCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fallbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let handle: BlobHandle | null = null;
    let cancelled = false;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 1023px)").matches;

    const start = async () => {
      try {
        const test = document.createElement("canvas").getContext("webgl2") ||
          document.createElement("canvas").getContext("webgl");
        if (!test) return;
        const { createBreathingBlob } = await import("@/three/BreathingBlob");
        if (cancelled) return;
        handle = createBreathingBlob(canvas, { reducedMotion, mobile });
        canvas.style.opacity = "1";
        if (fallbackRef.current) fallbackRef.current.style.opacity = "0";
      } catch {
        /* sem WebGL: fica o degradê CSS */
      }
    };

    // espera a foto (LCP) e a primeira pintura antes de carregar o 3D
    const ric =
      (window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
    const kick = () => ric(start, { timeout: 1200 });
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });

    const onScroll = () => {
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      handle?.setScrollProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", kick);
      window.removeEventListener("scroll", onScroll);
      handle?.destroy();
    };
  }, []);

  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      <div
        ref={fallbackRef}
        className="absolute inset-[12%] rounded-[46%_54%_52%_48%/48%_44%_56%_52%] blur-md transition-opacity duration-1000 animate-breathe"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #7FE0C2, transparent 60%), radial-gradient(circle at 70% 72%, #2BB39A, transparent 62%), #CFEFE4",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
}
