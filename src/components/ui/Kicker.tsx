import { cn } from "@/config";

/**
 * Rótulo de seção em pílula, em caixa normal (sem caixa-alta espaçada,
 * que deixa o site com cara de template).
 */
export default function Kicker({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div className={cn("flex", className)}>
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] font-medium",
          light
            ? "border-white/15 bg-white/5 text-mint-300"
            : "border-mint-100 bg-white/70 text-brand",
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full", light ? "bg-mint-300" : "bg-brand")} />
        {children}
      </span>
    </div>
  );
}
