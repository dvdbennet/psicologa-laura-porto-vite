import { cn } from "@/config";

export default function Orbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-emerald-200/25 blur-3xl animate-float-slow" />
    </div>
  );
}
