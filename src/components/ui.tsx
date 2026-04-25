import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "danger" | "success" | "warning" | "secondary";

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  block?: boolean;
};

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-sky-500 text-slate-950 hover:bg-sky-400",
  danger: "bg-rose-500 text-white hover:bg-rose-400",
  success: "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
  warning: "bg-amber-400 text-slate-950 hover:bg-amber-300",
  secondary: "bg-slate-700 text-slate-100 hover:bg-slate-600",
};

export function AppButton({
  className = "",
  variant = "primary",
  block = true,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={[
        "rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-50",
        buttonVariants[variant],
        block ? "w-full" : "",
        className,
      ].join(" ")}
    />
  );
}

export function DataCard({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/70 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 break-words text-base font-medium text-slate-100">{value}</p>
    </div>
  );
}

export function StatusMessage({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "danger" | "warning" | "success";
}) {
  const tones = {
    default: "border-slate-700 bg-slate-800/80 text-slate-200",
    danger: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    warning: "border-amber-400/30 bg-amber-400/10 text-amber-100",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  };

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm ${tones[tone]}`}>
      {children}
    </div>
  );
}
