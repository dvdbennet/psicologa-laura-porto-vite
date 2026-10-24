import { cn } from "@/config";

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
    <div
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em]",
        light ? "text-emerald-300" : "text-emerald-600",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          light ? "bg-emerald-300/60" : "bg-emerald-500/60",
        )}
      />
      {children}
    </div>
  );
}
